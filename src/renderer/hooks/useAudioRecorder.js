import { useState, useEffect } from 'react';

export function useAudioRecorder() {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const newMediaRecorder = new MediaRecorder(stream);
        newMediaRecorder.start();
        newMediaRecorder.addEventListener("dataavailable", event => {
          setAudioChunks(prevAudioChunks => [...prevAudioChunks, event.data]);
        });
        setMediaRecorder(newMediaRecorder);
        setIsRecording(true);
      })
      .catch(err => console.error("getUserMedia failed:", err));
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const playRecording = () => {
    const audioBlob = new Blob(audioChunks);
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
  };

  useEffect(() => {
    return () => {
      // Clean up on unmount
      if (mediaRecorder) {
        mediaRecorder.stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [mediaRecorder]);

  return { isRecording, startRecording, stopRecording, playRecording };
}
