import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://monkfish-app-tmvsu.ondigitalocean.app/',
});

export const sendAudioFile = async (audioURI) => {
  const formData = new FormData();
  formData.append('audio', {
    uri: audioURI,
    type: 'audio/wav',
    name: 'audio.wav',
  });

  try {
    const response = await instance.post('/transcribe', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

