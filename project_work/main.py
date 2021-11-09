import cv2
import mediapipe as mp
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
import time

# cap = cv2.VideoCapture(0)
# mpHands = mp.solutions.hands
# hands = mpHands.Hands()
# mpDraw = mp.solutions.drawing_utils
#
# mp.solutions.drawing_utils.
#
# while True:
#     success, img = cap.read()
#
#     imgRGB = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
#     results = hands.process(imgRGB)
#     # print(results.multi_hand_landmarks)
#     if results.multi_hand_landmarks:
#         for handLms in results.multi_hand_landmarks:
#             mpDraw.draw_landmarks(img, handLms)
#     #if results.multi_hand_landmarks:
#     #    for handLms in results.multi_hand_landmarks:
#     #        mpDraw.draw_landmarks(img, imgRGB)
#
#     cv2.imshow("Image", img)
#     cv2.waitKey(1)


mpHands = mp.solutions.hands
hands = mpHands.Hands(max_num_hands=1, min_detection_confidence=0.7)
mpDraw = mp.solutions.drawing_utils
