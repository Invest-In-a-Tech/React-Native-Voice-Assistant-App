# Voice Assistant App

This project encompasses a comprehensive voice assistant application using a React Native frontend and a Flask backend. The essence of the app lies in its ability to allow users to interact with an AI assistant through voice. Users can record audio messages, which are then processed by the server for transcription and response generation using OpenAI's GPT-3.5-turbo model. Additionally, the Eleven Labs API is employed to transform these responses into speech. The frontend, developed with React Native, provides a user-friendly interface displaying the conversation and managing audio interactions. The backend, powered by Flask, handles the core functionalities of audio processing, transcription, AI response generation, and speech conversion, ensuring a seamless user experience. Please note that is my first attempt at creating a full-stack application, and I am still learning the ropes. I would appreciate any feedback on how to improve the code and the overall project.


## Expo CLI to create a new React Native project:
	
    npm install -g expo-cli
	expo init VoiceAssistantApp
    cd VoiceAssistantApp
    npm install react-native
    npm install axios
    npm install expo-av
    npm install expo-file-system
    yarn expo start --tunnel

## Use a tool like ngrok to create a secure tunnel to your Flask server:
    
    wget https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-amd64.zip
    sudo apt-get update
	sudo apt-get install unzip
	unzip ngrok-stable-linux-amd64.zip
	sudo mv ngrok /usr/local/bin

### Open a new terminal window or tab. Run the following command to create a tunnel to your Flask server:
    
    ngrok http 5000

## Create a backend server that handles the audio file processing and communicates with the necessary APIs to perform transcription and text-to-speech conversion
   
    Create a new Python file called app.py in a separate folder: You will create a new folder outside the VoiceAssistantApp directory (to keep the server and app code separate). Inside this new folder, create a Python file called app.py. This file will contain the server code that handles incoming requests, processes the audio files, and sends the responses back to the app.
        mkdir backend
        cd backend
        touch app.py
        touch config.py
        touch requirements.txt
        pip install -r requirements.txt
        sudo apt-get install ffmpeg

### Run python server
    
    python app.py

## Overview

This project consists of a React Native voice assistant app and a Flask backend server. The app allows users to record audio messages, which are then sent to the server for transcription and processing. The server uses OpenAI's GPT-3.5-turbo model to generate responses and the Eleven Labs API to convert the responses to speech. The app displays the conversation in a chat-like interface and plays the assistant's audio response.

The React Native app is built using the Expo framework and includes components and helper functions to handle audio recording, conversation display, and API communication. The main functional component, App, manages the state of the conversation and provides controls for starting and stopping audio recording. The ChatBubble component displays individual messages in the conversation. The api.js file contains the API calls for sending the audio file to the backend, while audioRecorder.js handles starting and stopping the recording process.

The Flask backend server is responsible for processing the uploaded audio file, transcribing it, generating a response using OpenAI's GPT-3.5-turbo model, and converting the response to speech using the Eleven Labs API. The server exposes a /transcribe endpoint to handle incoming requests, processes the audio, and returns the transcript, assistant response, and audio URI in a JSON response.

Together, these components create a complete voice assistant application, enabling users to interact with an AI assistant using recorded audio messages and receive responses in both text and audio formats.

 ### This code creates a React Native app that allows users to record audio messages, send them to an API for transcription and processing, and receive a response from an AI assistant. The app uses the Expo framework, and the code is organized into four separate files: App.js, ChatUI.js, api.js, and audioRecorder.js. Here are the steps to create the code:

1. In App.js, import necessary dependencies and components:
    Import React and useState from 'react'.
    Import required components from 'react-native' (View, Text, TouchableOpacity, ScrollView, and StyleSheet).
    Import Audio from 'expo-av' and FileSystem from 'expo-file-system'.
    Import custom helper functions (startAudioRecording, stopAudioRecording, and sendAudioFile) and the ChatBubble component.  

2. Create the App functional component:
    Define the state variables for recording, assistant response, and conversation log.
    Create the requestAudioPermissions function to request the necessary audio permissions.
    Create the startRecording function to start recording audio and set the recording state to true.
    Create the stopRecording function to stop recording audio, process the response from the API, update the conversation log, and play the assistant's response.
    Create the playAssistantResponse function to play the audio response from the assistant.
    Return the main JSX structure, including a ScrollView for displaying the conversation log and a TouchableOpacity component for starting and stopping the recording.
    Define the necessary styles for the components.

3. In ChatUI.js, create the ChatBubble functional component:
    Import React and required components from 'react-native' (View, Text, and StyleSheet).
    Create the JSX structure for the chat bubble, including different styles based on the type (user or assistant).
    Define the necessary styles for the chat bubbles.
    
4. In api.js, set up the API calls:
    Import axios and create an instance with the base URL for the API.
    Create the sendAudioFile function to send the audio file to the API for transcription and processing, and return the response data.

5. In audioRecorder.js, create the audio recording helper functions:
    Import Audio from 'expo-av'.
    Initialize a recordingInstance variable.
    Create the startAudioRecording function to start recording audio with high-quality settings.
    Create the stopAudioRecording function to stop the recording, unload the recording instance, and return the URI of the recorded file.

### In addition to the React Native app code, there is a backend server code written in Python using Flask. The server code handles transcription of the uploaded audio file and generates a response using OpenAI's GPT-3.5-turbo model. It also converts the response text to speech using the Eleven Labs API.

1. Install the necessary Python libraries:
    Install Flask, numpy, openai, pandas, pydub, pygame, pyttsx3, and requests.

2. Set up the backend server:
    Import the required libraries and modules (os, base64, uuid, requests, Flask, secure_filename, AudioSegment, and openai).
    Configure OpenAI and Eleven Labs API keys.
    Create a Flask app instance and initialize the OpenAI API key.
    Define an initial system message for the assistant.

3. Create the transcribe_audio_file function:
    Convert the audio file to a suitable format (single channel, 16000Hz, 2-byte sample width) using pydub.
    Transcribe the audio file using OpenAI's Audio API.
    Generate a response using OpenAI's GPT-3.5-turbo model.
    Convert the text response to speech using the Eleven Labs API.
    Save the generated speech as an MP3 file and encode it as a base64 string.
    Remove the temporary output file.
    Return the transcript, the system message, and the base64-encoded audio URI.

4. Create the /transcribe route for the Flask app:
    Check if the request contains an audio file. If not, return an error.
    Save the uploaded audio file to a temporary location.
    Call the transcribe_audio_file function to process the uploaded audio.
    Remove the temporary audio file.
    Return the transcript, assistant response, and audio URI in a JSON response.

5. Start the Flask app:
    Run the Flask app using the app.run() method.