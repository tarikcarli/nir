import sys
import time
import base64
import cv2
import numpy as np

face_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
eye_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + "haarcascade_eye.xml")

message = None
while(True):
    time.sleep(0.01)
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
    
    faces = face_cascade.detectMultiScale(gray, 1.1, 4)
    if(len(faces) == 0):
        print(rid + ' ' + 'NO_FACE_FOUND', file=sys.stderr)
        continue
    # if(len(faces) > 1):
    #     print(rid + ' ' + 'MULTIPLE_FACE_FOUND', file=sys.stderr)
    #     continue

    (x, y,  w,  h) = faces[0]
    # cv2.rectangle(img, (x, y), (x+w, y+h), (0, 255, 0), 3)
    
    roi_gray=gray[y:(y+h), x:(x+w)]
    # roi_color=img[y:(y+h), x:(x+w)]
    
    eyes = eye_cascade.detectMultiScale(roi_gray, 1.1, 4)
    if(len(eyes) != 2):
        print(rid + ' ' + 'NO_EYES_FOUND', file=sys.stderr)
        continue
    index=0
    for (ex , ey,  ew,  eh) in eyes:
        if index == 0:
            eye_1 = (ex, ey, ew, eh)
        elif index == 1:
            eye_2 = (ex, ey, ew, eh)
        # cv2.rectangle(roi_color, (ex,ey) ,(ex+ew, ey+eh), (0,0,255), 3)
        index = index + 1
    
    if eye_1[0] < eye_2[0]:
        left_eye = eye_1
        right_eye = eye_2
    else:
        left_eye = eye_2
        right_eye = eye_1
    
    left_eye_center = (int(left_eye[0] + (left_eye[2] / 2)), int(left_eye[1] + (left_eye[3] / 2)))
    left_eye_x = left_eye_center[0] 
    left_eye_y = left_eye_center[1]
    
    right_eye_center = (int(right_eye[0] + (right_eye[2]/2)), int(right_eye[1] + (right_eye[3]/2)))
    right_eye_x = right_eye_center[0]
    right_eye_y = right_eye_center[1]
    
    # cv2.circle(roi_color, left_eye_center, 5, (255, 0, 0) , -1)
    # cv2.circle(roi_color, right_eye_center, 5, (255, 0, 0) , -1)
    # cv2.line(roi_color,right_eye_center, left_eye_center,(0,200,200),3)
    
    if left_eye_y > right_eye_y:
        A = (right_eye_x, left_eye_y)
        direction = -1 
    else:
        A = (left_eye_x, right_eye_y)
        direction = 1 

    # cv2.circle(roi_color, A, 5, (255, 0, 0) , -1)
    
    # cv2.line(roi_color,right_eye_center, left_eye_center,(0,200,200),3)
    # cv2.line(roi_color,left_eye_center, A,(0,200,200),3)
    # cv2.line(roi_color,right_eye_center, A,(0,200,200),3)
    
    delta_x = right_eye_x - left_eye_x
    delta_y = right_eye_y - left_eye_y
    angle=np.arctan(delta_y/delta_x)
    angle = (angle * 180) / np.pi
    
    h, w = img.shape[:2]
    center = (w // 2, h // 2)
    M = cv2.getRotationMatrix2D(center, (angle), 1.0)
    rotated = cv2.warpAffine(img, M, (w, h))
    gray = cv2.cvtColor(rotated, cv2.COLOR_BGR2GRAY)

    faces = face_cascade.detectMultiScale(gray, 1.1, 4)

    if(len(faces) == 0):
        print(rid + ' ' + 'NO_FACE_FOUND', file=sys.stderr)
        continue
    # if(len(faces) > 1):
    #     print(rid + ' ' + 'MULTIPLE_FACE_FOUND', file=sys.stderr)
    #     continue

    (x, y,  w,  h) = faces[0]
    # cv2.rectangle(img, (x, y), (x+w, y+h), (0, 255, 0), 3)
        

    # roi_gray=gray[y:(y+h), x:(x+w)]
    roi_color=rotated[y:(y+h), x:(x+w)]
    # cv2.imshow('img', roi_color)
    # cv2.waitKey(1000)
    _, im_arr = cv2.imencode('.jpg', roi_color)
    im_bytes = im_arr.tobytes()
    im_b64 = base64.b64encode(im_bytes)
    print(rid + ' ' + im_b64.decode())
    # print(time.time() - start)
