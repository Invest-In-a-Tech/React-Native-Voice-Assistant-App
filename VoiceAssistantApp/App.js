import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { startAudioRecording, stopAudioRecording } from './audioRecorder';
import { sendAudioFile } from './api';
import ChatBubble from './ChatUI';

const App = () => {
  const [recording, setRecording] = useState(false);
  const [assistantResponse, setAssistantResponse] = useState(null);
  const [conversationLog, setConversationLog] = useState([]);

  const requestAudioPermissions = async () => {
    const { status } = await Audio.requestPermissionsAsync();
    return status === 'granted';
  };

  const startRecording = async () => {
    const hasPermission = await requestAudioPermissions();
    if (!hasPermission) {
      console.error('Audio recording permissions denied');
      return;
    }

    setRecording(true);
    await startAudioRecording();
  };

  const stopRecording = async () => {
    setRecording(false);
    const audioURI = await stopAudioRecording();
    const response = await sendAudioFile(audioURI);
    setAssistantResponse(response);
    setConversationLog((prevConversationLog) => [
      ...prevConversationLog,
      { type: 'user', content: response.userInput },
      { type: 'assistant', content: response.assistantResponse },
    ]);
    await playAssistantResponse(response.audioURI);
  };

  const playAssistantResponse = async (audioURI) => {
    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync({ uri: audioURI });
      await soundObject.playAsync();
    } catch (error) {
      console.error('Error while playing assistant response:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {conversationLog.map((entry, index) => (
          <ChatBubble
            key={index}
            type={entry.type}
            content={entry.content}
          />
        ))}
      </ScrollView>
      <TouchableOpacity
        onPress={recording ? stopRecording : startRecording}
        style={styles.recordButton}
      >
        <Text style={styles.recordButtonText}>
          {recording ? 'Stop Recording' : 'Start Recording'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  scrollView: {
    width: '100%',
    paddingTop: 40, // Add padding at the top of the chat  
  },
  recordButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 25,
    marginVertical: 10,
  },
  recordButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default App;
