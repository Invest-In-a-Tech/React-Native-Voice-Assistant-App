import { Audio } from "expo-av";

let recordingInstance = null;

export const startAudioRecording = async () => {
  try {
    const recording = new Audio.Recording();
    await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
    await recording.startAsync();
    recordingInstance = recording;
  } catch (error) {
    console.error("Error while starting audio recording:", error);
  }
};

export const stopAudioRecording = async () => {
  try {
    if (recordingInstance) {
      await recordingInstance.stopAndUnloadAsync();
      const uri = recordingInstance.getURI();
      recordingInstance = null;
      return uri;
    }
  } catch (error) {
    console.error("Error while stopping audio recording:", error);
  }
};
