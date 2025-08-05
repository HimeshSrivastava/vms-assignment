import cv2
import os

def create_test_video():
    test_files_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'test_files')
    os.makedirs(test_files_dir, exist_ok=True)
    
    video_path = os.path.join(test_files_dir, 'test.mp4')
    
    cap = cv2.VideoCapture(0)
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(video_path, fourcc, 20.0, (640,480))
    
    print("Recording test video (5 seconds)...")
    frames_recorded = 0
    
    while frames_recorded < 100:  
        ret, frame = cap.read()
        if ret:
            out.write(frame)
            cv2.imshow('Recording Test Video', frame)
            frames_recorded += 1
            
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break
    
    cap.release()
    out.release()
    cv2.destroyAllWindows()
    
    print(f"Test video created at: {video_path}")
    return video_path

if __name__ == "__main__":
    create_test_video()