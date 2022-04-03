import time
import cv2
import mediapipe as mp
import numpy as np
import base64

message = None
while(True):
    time.sleep(0.01)
    try:
          message = input()
    except EOFError:
        message = None
    if(message == None):
        continue
    [rid, base64_text] = message.split(" ")

    im_bytes = base64.b64decode(base64_text)
    im_arr = np.frombuffer(im_bytes, dtype=np.uint8)  
    img = cv2.imdecode(im_arr, flags=cv2.IMREAD_COLOR)
    gray=cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    cv2.imshow('img',img)
    cv2.waitKey(1000)
    # print(rid + ' ' + align_face.decode())

