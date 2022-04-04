import sys
import time
import base64
import cv2
import numpy as np
import face_recognition
message = None
while(True):
    time.sleep(0.01)
    start = time.time()
    try:
        message = input()
    except EOFError:
        message = None
    if(message == None):
        continue
    try:
        [rid, base64_text] = message.split(" ")

        im_bytes = base64.b64decode(base64_text)
        im_arr = np.frombuffer(im_bytes, dtype=np.uint8)
        img = cv2.imdecode(im_arr, flags=cv2.IMREAD_COLOR)
    
        encodings = face_recognition.face_encodings(img)[0]
        im_bytes = encodings.tobytes()
        im_b64 = base64.b64encode(im_bytes)
        print(rid + ' ' + im_b64.decode())
    except BaseException as error:
        print('{} UNKOWN_ERROR {}'.format(rid,error), file=sys.stderr)
    # print(time.time() - start)
