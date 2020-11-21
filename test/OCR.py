import os
import pyrebase
import urllib
import imutils
from PIL import Image
import pytesseract
import cv2
from skimage import io
import io
import json
import numpy as np
import requests
import ocrspace
import firebase_admin
from firebase_admin import credentials
import threading
from google.cloud import texttospeech

# c261a1f71388957

# image_url = storage.child("images/test-image").get_url(None)
# img = io.imread(image_url)
# text = pytesseract.image_to_string(img, lang='eng')
# print(text)


# storage.child("images/test-image").download("img.jpg")
# im3 = Image.open('img.jpg')
# text = pytesseract.image_to_string(im3, lang='eng')
# print(text)


config = {
    'apiKey': "AIzaSyAlmL5SCGZDlu0pieccj_YsxSulPlHTVtg",
    'authDomain': "sem-assignment.firebaseapp.com",
    'databaseURL': "https://sem-assignment.firebaseio.com",
    'projectId': "sem-assignment",
    'storageBucket': "sem-assignment.appspot.com",
    'messagingSenderId': "223151166275",
    'appId': "1:223151166275:web:44879f05fab298831f95f6",
    'serviceAccount': "sem-assignment-firebase-adminsdk-s44fr-4719d5688a.json"
}

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "SEM-Test-7f73d9425337.json"

temp = 0
val = 0
cred = credentials.Certificate('sem-assignment-firebase-adminsdk-s44fr-4719d5688a.json')
firebase_admin.initialize_app(cred)
firebase = pyrebase.initialize_app(config)
storage = firebase.storage()
callback_done = threading.Event()
db = firebase.database()
api = ocrspace.API('e680ab78ba88957')

female1_voice = texttospeech.VoiceSelectionParams(language_code="en-GB",
                                                  ssml_gender=texttospeech.SsmlVoiceGender.FEMALE)
female2_voice = texttospeech.VoiceSelectionParams(language_code="en-AU",
                                                  ssml_gender=texttospeech.SsmlVoiceGender.FEMALE)

male1_voice = texttospeech.VoiceSelectionParams(language_code="en-GB", ssml_gender=texttospeech.SsmlVoiceGender.MALE)
male2_voice = texttospeech.VoiceSelectionParams(language_code="en-AU", ssml_gender=texttospeech.SsmlVoiceGender.MALE)


# audio_config_fast = texttospeech.AudioConfig(audio_encoding=texttospeech.AudioEncoding.MP3, speaking_rate = 1.5)

# c261a1f71388957

# print(db.child("images").get().val())

def stream_handler(event):
    global temp
    global val
    if temp == 0:
        temp += 1
    else:
        # storage.child("images/test-image").download("test-image.jpg")
        # print(api.ocr_file('test-image.jpg'))
        print('entered')
        # image_url = storage.child("images/test-image").get_url(None)
        # print(api.ocr_url(image_url))

        info = db.child("choices").get()
        for choice in info.each():
            if choice.key() == 'language':
                language = choice.val()
            elif choice.key() == 'speed':
                speed = choice.val()
            else:
                voice = choice.val()

        # print("Language: {0}".format(language))
        # print("Speed: {0}".format(speed))
        # print("Voice: {0}".format(voice))

        if speed == "fast":
            audio_config = texttospeech.AudioConfig(audio_encoding=texttospeech.AudioEncoding.MP3, speaking_rate=1.5)
        elif speed == "normal":
            audio_config = texttospeech.AudioConfig(audio_encoding=texttospeech.AudioEncoding.MP3)
        else:
            audio_config = texttospeech.AudioConfig(audio_encoding=texttospeech.AudioEncoding.MP3, speaking_rate=0.7)

        if language == 'french':
            api = ocrspace.API('e680ab78ba88957', language='fre')
            if voice == 'male':
                voice_param = texttospeech.VoiceSelectionParams(language_code="fr-FR",
                                                                ssml_gender=texttospeech.SsmlVoiceGender.MALE)
            else:
                voice_param = texttospeech.VoiceSelectionParams(language_code="fr-FR",
                                                                ssml_gender=texttospeech.SsmlVoiceGender.FEMALE)

        elif language == "english":
            api = ocrspace.API('e680ab78ba88957', language='eng')
            if voice == 'male':
                voice_param = texttospeech.VoiceSelectionParams(language_code="en-GB",
                                                                ssml_gender=texttospeech.SsmlVoiceGender.MALE)
            else:
                voice_param = texttospeech.VoiceSelectionParams(language_code="en-GB",
                                                                ssml_gender=texttospeech.SsmlVoiceGender.FEMALE)
        else:
            api = ocrspace.API('e680ab78ba88957', language='chs')
            if voice == 'male':
                voice_param = texttospeech.VoiceSelectionParams(language_code="cmn-TW",
                                                                ssml_gender=texttospeech.SsmlVoiceGender.MALE)
            else:
                voice_param = texttospeech.VoiceSelectionParams(language_code="cmn-TW",
                                                                ssml_gender=texttospeech.SsmlVoiceGender.FEMALE)

        storage.child("images/test-image").download("test-image.jpg")
        im = cv2.imread("test-image.jpg")
        h, w, c, = im.shape
        foo = Image.open("test-image.jpg")
        foo = foo.resize((w, h), Image.ANTIALIAS)
        foo.save("test-image-c.jpg", quality=80, optimize=True)
        client = texttospeech.TextToSpeechClient()
        # print(api.ocr_file('test-image-c.jpg'))
        text_temp = api.ocr_file('test-image-c.jpg')
        print(text_temp)

        synthesis_input = texttospeech.SynthesisInput(text=text_temp)
        response = client.synthesize_speech(input=synthesis_input, voice=voice_param, audio_config=audio_config)

        # The response's audio_content is binary.
        with open("output.mp3", "wb") as out:
            val = val + 1
            # Write the response to the output file.
            out.write(response.audio_content)
            print('Audio content written to file "output.mp3"')

        results = db.child('value').child("text").set(val)


my_stream = db.child("images").stream(stream_handler)


def list_voices():
    client = texttospeech.TextToSpeechClient()
    # Performs the list voices request
    voices = client.list_voices()
    for voice in voices.voices:
        # Display the voice's name. Example: tpc-vocoded
        print(f"Name: {voice.name}")
        # Display the supported language codes for this voice. Example: "en-US"
        for language_code in voice.language_codes:
            print(f"Supported language: {language_code}")
        ssml_gender = texttospeech.SsmlVoiceGender(voice.ssml_gender)
        # Display the SSML Voice Gender
        print(f"SSML Voice Gender: {ssml_gender.name}")
        # Display the natural sample rate hertz for this voice. Example: 24000
        print(f"Natural Sample Rate Hertz: {voice.natural_sample_rate_hertz}\n")


def role_play():
    # arabic language = ara & arabic.jpg
    # simplified chinese = chs & chinese.jpg

    info = db.child("choices").get()
    for choice in info.each():
        if choice.key() == 'language':
            language = choice.val()
        elif choice.key() == 'speed':
            speed = choice.val()
        else:
            voice = choice.val()


    # print("Language: {0}".format(language))
    # print("Speed: {0}".format(speed))
    # print("Voice: {0}".format(voice))

    if speed == "fast":
        audio_config = texttospeech.AudioConfig(audio_encoding=texttospeech.AudioEncoding.MP3, speaking_rate=1.5)
    elif speed == "normal":
        audio_config = texttospeech.AudioConfig(audio_encoding=texttospeech.AudioEncoding.MP3)
    else:
        audio_config = texttospeech.AudioConfig(audio_encoding=texttospeech.AudioEncoding.MP3, speaking_rate=0.7)


    if language == 'arabic':
        api = ocrspace.API('e680ab78ba88957', language='ara')
        if voice == 'male':
            voice_param =  texttospeech.VoiceSelectionParams(language_code="ar-XA",
                                               ssml_gender=texttospeech.SsmlVoiceGender.MALE)
        else:
            voice_param = texttospeech.VoiceSelectionParams(language_code="ar-XA",
                                               ssml_gender=texttospeech.SsmlVoiceGender.FEMALE)

    elif language == "english":
        api = ocrspace.API('e680ab78ba88957', language='eng')
        if voice == 'male':
            voice_param =  texttospeech.VoiceSelectionParams(language_code="en-GB",
                                               ssml_gender=texttospeech.SsmlVoiceGender.MALE)
        else:
            voice_param = texttospeech.VoiceSelectionParams(language_code="en-GB",
                                               ssml_gender=texttospeech.SsmlVoiceGender.FEMALE)


    else:
        api = ocrspace.API('e680ab78ba88957', language='chs')
        if voice == 'male':
            voice_param =  texttospeech.VoiceSelectionParams(language_code="cmn-TW",
                                               ssml_gender=texttospeech.SsmlVoiceGender.MALE)
        else:
            voice_param = texttospeech.VoiceSelectionParams(language_code="cmn-TW",
                                               ssml_gender=texttospeech.SsmlVoiceGender.FEMALE)


    client = texttospeech.TextToSpeechClient()

    text_temp = api.ocr_file('test-image-c.jpg')
    print(text_temp)

    synthesis_input = texttospeech.SynthesisInput(text=text_temp)
    response = client.synthesize_speech(input=synthesis_input, voice=voice_param, audio_config=audio_config)

    # The response's audio_content is binary.
    with open("output.mp3", "wb") as out:
        # Write the response to the output file.
        out.write(response.audio_content)
        print('Audio content written to file "output.mp3"')


