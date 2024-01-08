
# Voice Assistant App

## Project Overview

This project integrates a React Native frontend with a Flask backend to create a voice assistant app. Users can interact with the AI assistant through voice commands. The app records audio messages, sends them to the backend for transcription, and receives responses generated using OpenAI's GPT-3.5-turbo model. The Eleven Labs API is used for text-to-speech conversion, enhancing user experience with both text and audio feedback.

*Please note that was my first attempt at creating a full-stack application, and I am still learning the ropes. I would appreciate any feedback on how to improve the code and the overall project.*

## Getting Started

### Prerequisites

- Node.js and npm
- Python 3 and pip
- Expo CLI
- ngrok (for tunneling)

### Installation

1. **React Native App Setup:**
   ```shell
   npm install -g expo-cli
   expo init VoiceAssistantApp
   cd VoiceAssistantApp
   npm install react-native axios expo-av expo-file-system
   yarn expo start --tunnel
   ```

2. **Flask Server Setup:**
   ```shell
   mkdir backend
   cd backend
   touch app.py config.py requirements.txt
   pip install -r requirements.txt
   sudo apt-get install ffmpeg
   ```
3. **ngrok Setup:**
   ```shell
   wget https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-amd64.zip
   sudo apt-get update
   sudo apt-get install unzip
   unzip ngrok-stable-linux-amd64.zip
   sudo mv ngrok /usr/local/bin
   ```

### Running the Application

1. **Start the React Native app:**
   Navigate to the `VoiceAssistantApp` directory and run:
   ```shell
   expo start
   ```

2. **Set Up ngrok Tunnel:**
   In a new terminal, execute:
   ```shell
   ngrok http 5000
   ```

3. **Run the Flask Server:**
   Navigate to the `backend` directory and run:
   ```shell
   python app.py
   ```

## Features

- **Voice Recording:** Users can record their voice directly in the app.
- **Transcription and Response Generation:** The backend server transcribes the audio and uses OpenAI's GPT-3.5-turbo model for generating responses.
- **Text-to-Speech Conversion:** Responses are converted to speech using the Eleven Labs API.

## Contributing

Feedback and contributions are welcome. Please read our contributing guidelines for more information.
