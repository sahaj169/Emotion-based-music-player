from deepface import DeepFace
import cv2
import os
import PIL.Image as Image
import io
import base64
import sys


file = open(f"datauri{str(sys.argv[1])}.txt", "r")

byte_data = file.read()

b = base64.b64decode(byte_data)

file.close()


image = Image.open(io.BytesIO(b))
image.save(f'emotionimg{str(sys.argv[1])}.png')

img = cv2.imread(f"emotionimg{str(sys.argv[1])}.png")


# prediction of emotion

def predictions(img):
    predictions = DeepFace.analyze(img)
    return predictions['dominant_emotion']

Emotion = predictions(img)
print(Emotion)
# get emotion and delete the image

os.remove(f"emotionimg{str(sys.argv[1])}.png")
os.remove(f"datauri{str(sys.argv[1])}.txt")
