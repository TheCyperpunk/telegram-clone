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
  voiceMessage?: {
    url: string;
    duration: number;
    waveform?: number[];
  };
  isOwn?: boolean;
  views?: number;
  timestamp?: Date;
  conversationType?: 'private' | 'group' | 'channel' | 'bot';
}

export default function VoiceMessage({
  audioUrl,
  duration = 0,
  isRecording = false,
  onStartRecording,
  onStopRecording,
  onCancelRecording,
  voiceMessage,
  isOwn = false,
  views,
  timestamp,
  conversationType
}: VoiceMessageProps) {
  // Use voiceMessage props if provided
  const effectiveAudioUrl = voiceMessage?.url || audioUrl;
  const effectiveDuration = voiceMessage?.duration || duration;
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
      
      const handleLoadedMetadata = () => {
        // Reset current time when new audio loads
        setCurrentTime(0);
        setIsPlaying(false);
      };
      
      const handlePlay = () => {
        setIsPlaying(true);
      };
      
      const handlePause = () => {
        setIsPlaying(false);
      };
      
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);
      
      return () => {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
      };
    }
  }, [effectiveAudioUrl]);

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
  const togglePlayPause = async () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Error playing audio:', error);
        setIsPlaying(false);
      }
    }
  };

  // Calculate progress percentage
  const progressPercentage = effectiveDuration > 0 ? (currentTime / effectiveDuration) * 100 : 0;

  // Generate waveform if not provided
  const generateWaveform = () => {
    if (voiceMessage?.waveform) return voiceMessage.waveform;
    // Generate random waveform for demo
    return Array.from({ length: 40 }, () => Math.random() * 80 + 20);
  };

  const waveform = generateWaveform();

  return (
    <div className="voice-message w-full">
      {effectiveAudioUrl ? (
        // Playback UI - Telegram style with curved border and white background
        <div className={`rounded-3xl border bg-white ${
          isOwn ? 'border-white border-opacity-30' : 'border-gray-200'
        }`}>
          <audio ref={audioRef} src={effectiveAudioUrl} preload="metadata" />
          
          {/* Top section: Play button and waveform */}
          <div className="flex items-center gap-3 px-3 pt-4 pb-0.5">
            {/* Play/Pause Button */}
            <button 
              className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 shadow-md ${
                isOwn ? 'bg-white text-blue-500 hover:bg-blue-50' : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
              onClick={togglePlayPause}
            >
              {isPlaying ? <FiPause size={16} /> : <FiPlay size={16} className="ml-0.5" />}
            </button>
            
            {/* Waveform and Time */}
            <div className="flex-1 flex flex-col gap-0.5 min-w-0">
              {/* Waveform visualization */}
              <div className="flex items-center gap-[3px] h-4">
                {waveform.map((height, idx) => {
                  const progress = (currentTime / effectiveDuration) * 100;
                  const barProgress = (idx / waveform.length) * 100;
                  const isActive = barProgress <= progress;
                  
                  return (
                    <div 
                      key={idx}
                      className={`w-[2px] rounded-full transition-all ${
                        isOwn 
                          ? isActive ? 'bg-white' : 'bg-white opacity-40'
                          : isActive ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                      style={{ 
                        height: `${height}%`,
                        maxHeight: '16px'
                      }}
                    />
                  );
                })}
              </div>
              
              {/* Time display */}
              <div className="flex items-center justify-between px-1">
                <span className={`text-[11px] font-medium ${isOwn ? 'text-white opacity-90' : 'text-gray-600'}`}>
                  {formatTime(currentTime)}
                </span>
                <span className={`text-[11px] ${isOwn ? 'text-white opacity-70' : 'text-gray-500'}`}>
                  {formatTime(effectiveDuration)}
                </span>
              </div>
            </div>
          </div>
          
          {/* Bottom section: Views and timestamp - only show if provided */}
          {(views !== undefined || timestamp) && (
            <div className="flex items-center justify-end gap-2 px-3 pb-2 pt-1">
              {conversationType === 'channel' && views !== undefined && (
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                  </svg>
                  <span>{views >= 1000 ? `${(views / 1000).toFixed(1)}K` : views}</span>
                </div>
              )}
              {timestamp && (
                <div className="text-xs text-gray-500">
                  {new Date(timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              )}
            </div>
          )}
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