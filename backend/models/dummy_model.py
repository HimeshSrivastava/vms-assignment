# backend/models/dummy_model.py
import cv2

def detect_brightness(frame):
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    avg_brightness = gray.mean()
    return {
        "average_brightness": avg_brightness,
        "low_light": avg_brightness < 60
    }

def detect_red_color(frame):
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    lower_red1 = (0, 120, 70)
    upper_red1 = (10, 255, 255)
    lower_red2 = (170, 120, 70)
    upper_red2 = (180, 255, 255)
    
    mask1 = cv2.inRange(hsv, lower_red1, upper_red1)
    mask2 = cv2.inRange(hsv, lower_red2, upper_red2)
    mask = mask1 | mask2

    red_pixel_ratio = (mask > 0).sum() / (frame.shape[0] * frame.shape[1])
    return {
        "red_pixel_ratio": red_pixel_ratio,
        "red_alert": red_pixel_ratio > 0.3
    }
