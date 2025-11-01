'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiX, FiChevronLeft, FiChevronRight, FiPause, FiPlay } from 'react-icons/fi';

interface Story {
  id: string;
  image: string;
  duration?: number;
}

interface StoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  stories: Story[];
  initialStoryIndex?: number;
  userName: string;
  userAvatar: string;
}

export default function StoriesModal({
  isOpen,
  onClose,
  stories,
  initialStoryIndex = 0,
  userName,
  userAvatar
}: StoriesModalProps) {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(initialStoryIndex);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  const storyDuration = 5000; // 5 seconds per story

  useEffect(() => {
    if (!isOpen || isPaused) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Move to next story
          if (currentStoryIndex < stories.length - 1) {
            setCurrentStoryIndex(currentStoryIndex + 1);
            return 0;
          } else {
            // Close modal when all stories are done
            onClose();
            return 0;
          }
        }
        return prev + (100 / (storyDuration / 100));
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isOpen, currentStoryIndex, stories.length, isPaused, onClose]);

  useEffect(() => {
    setProgress(0);
  }, [currentStoryIndex]);

  const goToNextStory = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      setProgress(0);
    } else {
      onClose();
    }
  };

  const goToPrevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
      setProgress(0);
    }
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
    setIsPlaying(!isPlaying);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowRight') goToNextStory();
    if (e.key === 'ArrowLeft') goToPrevStory();
    if (e.key === ' ') {
      e.preventDefault();
      togglePause();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, currentStoryIndex]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50">
      <div className="relative w-full max-w-md h-full max-h-screen bg-black rounded-lg overflow-hidden">
        {/* Progress bars */}
        <div className="absolute top-4 left-4 right-4 flex space-x-1 z-20">
          {stories.map((_, index) => (
            <div key={index} className="flex-1 h-1 bg-white bg-opacity-30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-100 ease-linear"
                style={{
                  width: index < currentStoryIndex ? '100%' : 
                         index === currentStoryIndex ? `${progress}%` : '0%'
                }}
              />
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="absolute top-8 left-4 right-4 flex items-center justify-between z-20 mt-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
              <Image
                src={userAvatar}
                alt={userName}
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-white font-medium text-sm">{userName}</h3>
              <p className="text-white text-opacity-70 text-xs">2 hours ago</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={togglePause}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
            >
              {isPlaying ? (
                <FiPause size={18} className="text-white" />
              ) : (
                <FiPlay size={18} className="text-white" />
              )}
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
            >
              <FiX size={20} className="text-white" />
            </button>
          </div>
        </div>

        {/* Story Image */}
        <div className="relative w-full h-full">
          <Image
            src={stories[currentStoryIndex]?.image}
            alt={`Story ${currentStoryIndex + 1}`}
            fill
            className="object-cover"
            priority
          />
          
          {/* Navigation areas */}
          <div className="absolute inset-0 flex">
            {/* Left tap area */}
            <div 
              className="flex-1 cursor-pointer"
              onClick={goToPrevStory}
            />
            {/* Right tap area */}
            <div 
              className="flex-1 cursor-pointer"
              onClick={goToNextStory}
            />
          </div>

          {/* Navigation buttons */}
          {currentStoryIndex > 0 && (
            <button
              onClick={goToPrevStory}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full transition-colors"
            >
              <FiChevronLeft size={20} className="text-white" />
            </button>
          )}
          
          {currentStoryIndex < stories.length - 1 && (
            <button
              onClick={goToNextStory}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full transition-colors"
            >
              <FiChevronRight size={20} className="text-white" />
            </button>
          )}
        </div>

        {/* Story counter */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 px-3 py-1 rounded-full">
          <span className="text-white text-sm">
            {currentStoryIndex + 1} / {stories.length}
          </span>
        </div>
      </div>
    </div>
  );
}
