'use client';

import { useState, useRef } from 'react';
import { FiSend, FiX } from 'react-icons/fi';
import { HiOutlinePaperClip, HiOutlineFaceSmile, HiOutlineMicrophone } from 'react-icons/hi2';
import { HiPaperAirplane } from 'react-icons/hi2';
import VoiceMessage from './VoiceMessage';
import FileAttachment from './FileAttachment';

interface MessageInputProps {
  onSendMessage: (content: string, attachments?: File[], audioBlob?: Blob) => void;
  onTypingStart?: () => void;
  onTypingEnd?: () => void;
}

export default function MessageInput({ 
  onSendMessage, 
  onTypingStart, 
  onTypingEnd 
}: MessageInputProps) {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle typing events
  const handleTyping = () => {
    if (onTypingStart) {
      onTypingStart();
    }
    
    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    // Set new timeout
    typingTimeoutRef.current = setTimeout(() => {
      if (onTypingEnd) {
        onTypingEnd();
      }
    }, 2000); // Stop typing after 2 seconds of inactivity
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() || attachments.length > 0) {
      onSendMessage(message, attachments.length > 0 ? attachments : undefined);
      setMessage('');
      setAttachments([]);
      
      // Clear typing timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      
      if (onTypingEnd) {
        onTypingEnd();
      }
    }
  };

  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setAttachments(prev => [...prev, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleStartRecording = () => {
    setIsRecording(true);
  };

  const handleStopRecording = (audioBlob: Blob) => {
    setIsRecording(false);
    onSendMessage('', undefined, audioBlob);
  };

  const handleCancelRecording = () => {
    setIsRecording(false);
  };

  const handleEmojiSelect = (emoji: string) => {
    setMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="bg-white border-t border-gray-100 shadow-lg">
      {/* File attachments preview */}
      {attachments.length > 0 && (
        <div className="px-4 pt-4 pb-2">
          <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
            <div className="text-xs font-medium text-blue-700 mb-2">Attachments ({attachments.length})</div>
            <div className="flex flex-wrap gap-2">
              {attachments.map((file, index) => (
                <div key={index} className="bg-white rounded-lg p-2 border border-blue-200 flex items-center gap-2">
                  <HiOutlinePaperClip size={14} className="text-blue-500" />
                  <span className="text-xs text-gray-700 truncate max-w-32">{file.name}</span>
                  <button 
                    onClick={() => handleRemoveFile(index)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <FiX size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Message input form */}
      <div className="px-4 py-3">
        <form onSubmit={handleSubmit} className="flex items-center">
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            onChange={handleFileChange} 
            multiple 
          />
          
          <div className="flex-1 relative">
            <div className="flex items-center bg-white rounded-full px-4 py-1.5 border border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 hover:border-gray-400 transition-all duration-300 shadow-sm hover:shadow-md">
              <button 
                type="button" 
                className="p-1 hover:bg-gray-100 rounded-full transition-all duration-200 mr-3 text-gray-500 hover:text-blue-500"
                onClick={handleFileSelect}
              >
                <HiOutlinePaperClip size={18} />
              </button>
              
              <input
                type="text"
                className="flex-1 bg-transparent border-none outline-none text-gray-900 placeholder-gray-500 text-sm font-normal"
                placeholder={isRecording ? "🎤 Recording..." : "Write a message..."}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  handleTyping();
                }}
                disabled={isRecording}
              />
              
              <button 
                type="button" 
                className="p-1 hover:bg-gray-100 rounded-full transition-all duration-200 mx-2 text-gray-500 hover:text-yellow-500"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                <HiOutlineFaceSmile size={18} />
              </button>
              
              {/* Voice message recording or Send button */}
              {!message.trim() && !attachments.length ? (
                <div className="ml-1">
                  <VoiceMessage 
                    isRecording={isRecording}
                    onStartRecording={handleStartRecording}
                    onStopRecording={handleStopRecording}
                    onCancelRecording={handleCancelRecording}
                  />
                </div>
              ) : (
                <button 
                  type="submit" 
                  className="w-7 h-7 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full flex items-center justify-center ml-1 transition-all duration-300 transform hover:scale-110 shadow-md hover:shadow-lg"
                >
                  <HiPaperAirplane size={12} className="ml-0.5" />
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
      
      {/* Emoji picker */}
      {showEmojiPicker && (
        <div className="absolute bottom-full right-4 mb-2 bg-white rounded-xl shadow-lg border border-gray-200 p-4 z-50">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700">Emojis</span>
            <button 
              className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
              onClick={() => setShowEmojiPicker(false)}
            >
              <FiX size={16} className="text-gray-500" />
            </button>
          </div>
          <div className="grid grid-cols-8 gap-2 w-64">
            {['😀', '😂', '😍', '🥰', '😎', '🙄', '😢', '😡', '👍', '👎', '❤️', '🔥', '🎉', '👏', '🤔', '🙏'].map(emoji => (
              <button 
                key={emoji} 
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 text-lg"
                onClick={() => handleEmojiSelect(emoji)}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}