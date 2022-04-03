import time
import base64
import cv2
import numpy as np
import dlib

detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor("shape_predictor_68_face_landmarks.dat")

message = None
while(True):
    time.sleep(0.1)
    # start = time.time()
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
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = detector(gray)
    face = faces[0]
    x1 = face.left() # left point
    y1 = face.top() # top point
    x2 = face.right() # right point
    y2 = face.bottom() # bottom point
    # Draw a rectangle
    cv2.rectangle(img=img, pt1=(x1, y1), pt2=(x2, y2), color=(0, 255, 0), thickness=4)
    
    landmarks = predictor(image=gray, box=face)
    for n in range(0, 68):
        x = landmarks.part(n).x
        y = landmarks.part(n).y
        cv2.circle(img=img, center=(x, y), radius=3, color=(0, 255, 0), thickness=-1)

    
    cv2.imshow('img', img)
    cv2.waitKey(1000)
    # _, im_arr = cv2.imencode('.jpg', roi_color)
    # im_bytes = im_arr.tobytes()
    # im_b64 = base64.b64encode(im_bytes)
    # print(rid + ' ' + im_b64.decode())
    # print(time.time() - start)
