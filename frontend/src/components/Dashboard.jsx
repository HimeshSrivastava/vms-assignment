import React, { useState, useRef } from "react";
import axios from "axios";
import StreamList from "./StreamList";
import { Box } from '@mui/material';
import AlertPanel from "./AlertPanel";

const RecordVideo = () => {
  const [recording, setRecording] = useState(false);
  const [videoURL, setVideoURL] = useState("");
  const [analysisResult, setAnalysisResult] = useState("");
  const mediaRecorderRef = useRef(null);
  const videoRef = useRef(null);
  const chunks = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
    mediaRecorderRef.current = new MediaRecorder(stream);

    mediaRecorderRef.current.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunks.current.push(e.data);
      }
    };

    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(chunks.current, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      setVideoURL(url);
      uploadVideo(blob);
      chunks.current = [];
    };

    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  const uploadVideo = async (blob) => {
    const formData = new FormData();
    formData.append("file", blob, "recorded_video.webm");

    try {
      const response = await axios.post("http://localhost:8000/upload", formData);
      console.log("Video uploaded successfully", response.data);
      setAnalysisResult(response.data); 
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  return (
<Box display="flex" gap={4} p={2}>
  <Box flex={1}>
    <StreamList />
  </Box>
  <Box flex={1}>
    <video ref={videoRef} autoPlay muted width={400} />
    <div>
      {!recording ? (
        <button onClick={startRecording}>Start Recording</button>
      ) : (
        <button onClick={stopRecording}>Stop Recording</button>
      )}
      {analysisResult && (
        <pre className="text-left bg-gray-100 p-4 rounded-md">
          {JSON.stringify(analysisResult, null, 2)}
        </pre>
      )}
    </div>
    {videoURL && <video src={videoURL} controls width={400} />}
  </Box>
   <Box flex={1}>
        <h1>AlertPanel </h1>
        {analysisResult && (
          <pre className="text-left bg-gray-100 p-4 rounded-md">
          {JSON.stringify(analysisResult.red_alert, null, 2)}
        </pre>
        )}
      </Box>
</Box>
  );
};

export default RecordVideo;
