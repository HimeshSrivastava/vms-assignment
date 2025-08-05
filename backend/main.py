from fastapi import FastAPI, BackgroundTasks, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi import UploadFile, File
from pydantic import BaseModel
from typing import List
import threading
import cv2
from datetime import datetime
import time
import uuid
import os
import json
import glob
import numpy as np 
from models.dummy_model import detect_brightness, detect_red_color

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_DIR = os.path.join(BASE_DIR, "test_files")
os.makedirs(UPLOAD_DIR, exist_ok=True)


RESULTS_DIR = "results"
os.makedirs(RESULTS_DIR, exist_ok=True)

active_streams = {}

class StreamRequest(BaseModel):
    stream_path: str

@app.post("/stop_stream/{stream_id}")
def stop_stream(stream_id: str):
    return {"message": f"Stop requested for {stream_id}"}

def analyze_video(path):
    cap = cv2.VideoCapture(path)
    frame_number = 0
    red_pixels = 0
    total_pixels = 0
    brightness_sum = 0
    processed_frames = 0

    while True:
        ret, frame = cap.read()
        if not ret or frame_number > 100:  
            break

        frame_number += 1
        processed_frames += 1

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        brightness = np.mean(gray)
        brightness_sum += brightness

        red_channel = frame[:, :, 2]
        red_pixels += np.sum(red_channel > 150)
        total_pixels += red_channel.size

    cap.release()

    average_brightness = brightness_sum / processed_frames
    red_pixel_ratio = red_pixels / total_pixels

    result = {
        "stream_id": str(uuid.uuid4()),
        "frame_number": frame_number,
        "brightness": {
            "average_brightness": average_brightness,
            "low_light": str(average_brightness < 50)
        },
        "red_alert": {
            "red_pixel_ratio": red_pixel_ratio,
            "red_alert": str(red_pixel_ratio > 0.3)
        },
        "timestamp": str(datetime.now())
    }

    os.makedirs("results", exist_ok=True)
    result_filename = os.path.splitext(os.path.basename(path))[0] + ".json"
    result_path = os.path.join("results", result_filename)

    with open(result_path, "w") as f:
        json.dump(result, f, indent=4)

    return result

def save_results(stream_id: str, results: dict):
    result_path = os.path.join(RESULTS_DIR, f"{stream_id}.json")
    results["timestamp"] = str(datetime.datetime.now())
    with open(result_path, "w") as f:
        json.dump(results, f, default=str)

def process_stream(stream_id: str, config: StreamRequest):
    model_manager = ModelManager()
    
    if config.stream_type == "video":
        cap = cv2.VideoCapture(config.stream_path)
    elif config.stream_type == "camera":
        cap = cv2.VideoCapture(int(config.stream_path))
    elif config.stream_type == "folder":
        images = glob.glob(os.path.join(config.stream_path, "*.jpg"))
        
    result_path = os.path.join(RESULTS_DIR, f"{stream_id}.json")
    
    try:
        if config.stream_type in ["video", "camera"]:
            while cap.isOpened():
                ret, frame = cap.read()
                if not ret:
                    break
                    
                results = model_manager.run_models(frame, config.selected_models)
                save_results(stream_id, results)
                
        elif config.stream_type == "folder":
            for image_path in images:
                frame = cv2.imread(image_path)
                results = model_manager.run_models(frame, config.selected_models)
                save_results(stream_id, results)
                
    finally:
        if cap:
            cap.release()
        active_streams.pop(stream_id, None)

@app.post("/start_stream")
async def start_stream(request: StreamRequest, background_tasks: BackgroundTasks):
    stream_id = str(uuid.uuid4())
    active_streams[stream_id] = {
        "path": request.stream_path,
        "type": request.stream_type,
        "models": request.selected_models,
        "status": "active",
        "start_time": str(datetime.datetime.now())
    }
    background_tasks.add_task(process_stream, stream_id, request)
    return {"stream_id": stream_id}

@app.post("/upload")
async def upload_video(file: UploadFile = File(...)):
    file_ext = file.filename.split(".")[-1]
    unique_filename = f"{uuid.uuid4()}.{file_ext}"
    
    file_path = os.path.join(UPLOAD_DIR, unique_filename)
    with open(file_path, "wb") as f:
        content = await file.read()
        f.write(content)
    result = analyze_video(file_path)

    return result

@app.get("/results")
def list_all_results():
    result_files = glob.glob("results/*.json")
    all_data = []

    for file_path in result_files:
        with open(file_path, "r") as f:
            data = json.load(f)
            filename = os.path.basename(file_path).replace(".json", "")
            all_data.append({ "filename": filename, "data": data })

    return JSONResponse(content=all_data)
