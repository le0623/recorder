import { createContext, useContext, useRef, useState } from 'react';

import { composeStreams } from 'services/composer';

import { useLayout } from './layout';
import { useStreams } from './streams';

type RecordingContextType = {
  isRecording: boolean;
  isPaused: boolean;
  startRecording: () => void;
  stopRecording: () => void;
  pauseRecording: () => void;
  resumeRecording: () => void;
};

const RecordingContext = createContext<RecordingContextType | undefined>(
  undefined,
);

const apiUrl = import.meta.env.VITE_API_URL;

type RecordingProviderProps = {
  children: React.ReactNode;
};

export const RecordingProvider = ({ children }: RecordingProviderProps) => {
  const { layout } = useLayout();
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const { cameraStream, microphoneStream, screenshareStream, tabAudioStream } =
    useStreams();

  const mediaRecorder = useRef<MediaRecorder>();
  const chunkIndex = useRef(0);

  // 🔹 Example metadata (replace with real values)
  const sessionId = useRef(crypto.randomUUID());
  const userName = 'Unkown';
  const userEmail = 'unknown@gmail.com';

  const uploadChunk = async (blob: Blob) => {
    const formData = new FormData();

    formData.append('session', sessionId.current);
    formData.append('name', userName);
    formData.append('email', userEmail);
    formData.append('chunk', blob, `chunk-${chunkIndex.current}.webm`);
    formData.append('index', chunkIndex.current.toString());

    chunkIndex.current++;

    try {
      await fetch(`${apiUrl}/api/upload-chunk`, {
        method: 'POST',
        body: formData,
      });
    } catch (err) {
      console.error('Chunk upload failed', err);
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    chunkIndex.current = 0;

    const composedStream = composeStreams(
      layout === 'screenOnly' ? null : cameraStream,
      microphoneStream,
      layout === 'cameraOnly' ? null : screenshareStream,
      tabAudioStream,
    );
    mediaRecorder.current = new MediaRecorder(composedStream, {
      mimeType: 'video/webm; codecs=vp9',
      videoBitsPerSecond: 8e6,
    });

    // const chunks: Blob[] = []; // optional local backup

    mediaRecorder.current.ondataavailable = async (event) => {
      if (!event.data || event.data.size === 0) return;

      // 🔴 Real-time upload (every second)
      await uploadChunk(event.data);

      // // optional: keep locally for final download
      // chunks.push(event.data);
    };

    // mediaRecorder.current.onstop = () => {
    //   composedStream
    //     .getVideoTracks()
    //     .forEach((composedTrack) => composedTrack.stop());

    //   const blob = new Blob(chunks);

    //   const url = URL.createObjectURL(blob);
    //   const link = document.createElement('a');
    //   link.href = url;
    //   link.download = 'recording.webm';
    //   link.click();

    //   window.URL.revokeObjectURL(url);
    // };

    // 🔴 Emit chunks every 1 second
    mediaRecorder.current.start(1000);
  };

  const stopRecording = () => {
    mediaRecorder.current?.stop();
    setIsRecording(false);
    setIsPaused(false);
  };

  const pauseRecording = () => {
    mediaRecorder.current?.pause();
    setIsPaused(true);
  };

  const resumeRecording = () => {
    setIsPaused(false);
    mediaRecorder.current?.resume();
  };

  return (
    <RecordingContext.Provider
      value={{
        isRecording,
        isPaused,
        startRecording,
        stopRecording,
        pauseRecording,
        resumeRecording,
      }}
    >
      {children}
    </RecordingContext.Provider>
  );
};

export const useRecording = (): RecordingContextType => {
  const context = useContext(RecordingContext);

  if (context === undefined) {
    throw new Error('useRecording must be used within a RecordingProvider');
  }

  return context;
};
