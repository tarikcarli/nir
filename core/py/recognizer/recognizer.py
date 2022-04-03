import time
import base64
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
    [rid, face_encode_1, face_encode_2] = message.split(" ")

    face_bytes_1 = base64.b64decode(face_encode_1)
    face_arr_1 = np.frombuffer(face_bytes_1, dtype=np.uint8)
    face_bytes_2 = base64.b64decode(face_encode_2)
    face_arr_2 = np.frombuffer(face_bytes_2, dtype=np.uint8)
    results = face_recognition.compare_faces([face_arr_1], face_arr_2)[0]
    print(rid + ' ' + str(results))
    # print(time.time() - start)
