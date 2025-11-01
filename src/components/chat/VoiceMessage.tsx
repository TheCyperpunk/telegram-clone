'use client';

import { useState, useRef, useEffect } from 'react';
import { FiPlay, FiPause, FiMic, FiStopCircle } from 'react-icons/fi';

interface VoiceMessageProps {
  audioUrl?: string;
  duration?: number;
  isRecording?: boolean;
  onStartRecording?: () => void;
  onStopRecording?: (audioBlob: Blob) => void;
  onCancelRecording?: () => void;
}

export default function VoiceMessage({
  audioUrl,
  duration = 0,
  isRecording = false,
  onStartRecording,
  onStopRecording,
  onCancelRecording
}: VoiceMessageProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordingPermission, setRecordingPermission] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Format time in mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle audio playback
  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;
      
      const handleTimeUpdate = () => {
        setCurrentTime(audio.currentTime);
      };
      
      const handleEnded = () => {
        setIsPlaying(false);
        setCurrentTime(0);
      };
      
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('ended', handleEnded);
      
      return () => {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, [audioRef]);

  // Handle recording timer
  useEffect(() => {
    if (isRecording) {
      setRecordingTime(0);
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRecording]);

  // Request microphone permission
  const requestMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setRecordingPermission(true);
      return stream;
    } catch (err) {
      console.error('Error accessing microphone:', err);
      return null;
    }
  };

  // Start recording
  const startRecording = async () => {
    const stream = await requestMicrophonePermission();
    if (!stream) return;
    
    chunksRef.current = [];
    const mediaRecorder = new MediaRecorder(stream);
    
    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunksRef.current.push(e.data);
      }
    };
    
    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
      if (onStopRecording) {
        onStopRecording(audioBlob);
      }
    };
    
    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start();
    
    if (onStartRecording) {
      onStartRecording();
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  // Cancel recording
  const cancelRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
    
    if (onCancelRecording) {
      onCancelRecording();
    }
  };

  // Toggle play/pause
  const togglePlayPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    
    setIsPlaying(!isPlaying);
  };

  // Calculate progress percentage
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="voice-message">
      {audioUrl ? (
        // Playback UI
        <div className="flex items-center bg-gray-100 rounded-full px-3 py-2 min-w-48">
          <audio ref={audioRef} src={audioUrl} preload="metadata" />
          
          <button 
            className="w-6 h-6 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 transition-all duration-200"
            onClick={togglePlayPause}
          >
            {isPlaying ? <FiPause size={12} /> : <FiPlay size={12} />}
          </button>
          
          <div className="flex-1 relative">
            <div className="h-1 bg-gray-300 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 transition-all duration-100"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="text-xs text-gray-600 mt-1">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>
        </div>
      ) : isRecording ? (
        // Recording UI - matches the type bar design
        <div className="flex items-center bg-red-50 rounded-full px-4 py-1.5 border border-red-200 min-w-64">
          <div className="flex items-center mr-3">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-2"></div>
            <FiMic size={16} className="text-red-500" />
          </div>
          
          <div className="flex-1 text-sm text-gray-700 font-medium">
            Recording... {formatTime(recordingTime)}
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              className="w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110"
              onClick={stopRecording}
            >
              <FiStopCircle size={14} />
            </button>
            
            <button 
              className="px-3 py-1 text-xs font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-all duration-200"
              onClick={cancelRecording}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        // Record button
        <button 
          className="w-7 h-7 hover:bg-gray-100 text-gray-500 hover:text-red-500 rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110"
          onClick={startRecording}
          disabled={!recordingPermission && navigator.mediaDevices === undefined}
        >
          <FiMic size={16} />
        </button>
      )}
    </div>
  );
}