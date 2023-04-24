import os
import base64
import uuid
import requests
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from pydub import AudioSegment
import openai
import config

app = Flask(__name__)
openai.api_key = config.OPENAI_API_KEY

messages = [
    {"role": "system", "content": "You are a helpful assistant. Keep your responses to all inputs less than 50 words. Do not say you are an AI language model. If you don't under the request, say 'I don't understand'. If you are asked to do something you can't do, say 'I can't do that'."},
]

def transcribe_audio_file(audio_file_path):
    audio_file = AudioSegment.from_file(audio_file_path)
    audio_file = audio_file.set_channels(1).set_frame_rate(16000).set_sample_width(2)
    audio_file.export("temp_audio.wav", format="wav")

    with open("temp_audio.wav", "rb") as f:
        transcript = openai.Audio.transcribe("whisper-1", f)

    messages.append({"role": "user", "content": transcript["text"]})

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages
    )

    system_message = response["choices"][0]["message"]["content"]

    url = f"https://api.elevenlabs.io/v1/text-to-speech/{config.ADVISOR_VOICE_ID}/stream"
    data = {
        "text": system_message.replace('"', ''),
        "voice_settings": {
            "stability": 0.75,
            "similarity_boost": 0.75
        }
    }

    r = requests.post(url, headers={'xi-api-key': config.ELEVEN_LABS_API_KEY}, json=data)

    output_filename = f"reply_{uuid.uuid4()}.mp3"
    with open(output_filename, "wb") as output:
        output.write(r.content)

    with open(output_filename, "rb") as output_file:
        base64_audio = base64.b64encode(output_file.read()).decode("utf-8")

    os.remove(output_filename)

    return transcript["text"], system_message, f'data:audio/mp3;base64,{base64_audio}'

@app.route('/transcribe', methods=['POST'])
def transcribe():
    if 'audio' not in request.files:
        return jsonify({'error': 'No audio file in the request'}), 400

    file = request.files['audio']
    filename = secure_filename(file.filename)
    filepath = os.path.join('/tmp', filename)
    file.save(filepath)

    user_input, system_message, audio_base64 = transcribe_audio_file(filepath)
    os.remove(filepath)

    return jsonify({'userInput': user_input, 'assistantResponse': system_message, 'audioURI': audio_base64})

if __name__ == '__main__':
    app.run()