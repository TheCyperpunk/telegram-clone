'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FiMoreHorizontal, FiHeart, FiMessageSquare, FiSend, FiBookmark } from 'react-icons/fi';

interface StoryCardProps {
  id?: string;
  username: string;
  avatar: string;
  imageUrl?: string;
  storyImage?: string; // Added storyImage prop
  caption?: string;
  likes?: number;
  timestamp?: string;
  hasLiked?: boolean;
}

export default function StoryCard({
  id,
  username,
  avatar,
  imageUrl,
  storyImage, // Added storyImage prop
  caption = 'Beautiful view!', // Default caption
  likes = 0,
  timestamp = 'Just now',
  hasLiked = false
}: StoryCardProps) {
  const [liked, setLiked] = useState(hasLiked);
  const [likeCount, setLikeCount] = useState(likes);
  
  // Use storyImage if provided, otherwise fall back to imageUrl
  const displayImage = storyImage || imageUrl || avatar;
  
  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  // If only username and avatar are provided (from Stories.tsx), render simplified card
  if (!id && !imageUrl && storyImage) {
    return (
      <div className="story-card relative rounded overflow-hidden shadow-sm bg-white transition-all hover-effect">
        {/* Background Image */}
        <div className="relative" style={{ aspectRatio: '1/1.2' }}>
          <div className="w-full h-full bg-gray-50 flex items-center justify-center">
            <Image 
              src={storyImage} 
              alt={username} 
              fill 
              className="object-cover"
            />
          </div>
          
          {/* User Profile Circle */}
          <div className="absolute top-2 left-2">
            <div className="rounded-full overflow-hidden" style={{ width: '40px', height: '40px', border: '2px solid white' }}>
              <Image 
                src={avatar} 
                alt={username} 
                width={40} 
                height={40} 
                className="object-cover"
              />
            </div>
          </div>
        </div>
        
        {/* Username */}
        <div className="p-2">
          <p className="mb-0 truncate font-medium" style={{ fontSize: '0.9rem' }}>{username}</p>
        </div>
      </div>
    );
  }

  // Full story card with interactions
  return (
    <div className="story-card bg-white rounded shadow-sm mb-4">
      {/* Card Header */}
      <div className="flex items-center p-3">
        <div className="relative">
          <div className="avatar-container rounded-full overflow-hidden" style={{ width: '40px', height: '40px' }}>
            {avatar ? (
              <Image 
                src={avatar} 
                alt={username} 
                width={40} 
                height={40} 
                className="object-cover"
              />
            ) : (
              <div className="bg-telegram-blue text-white flex items-center justify-center h-full">
                {username[0].toUpperCase()}
              </div>
            )}
          </div>
          <div className="online-indicator absolute bottom-0 right-0 bg-green-500 rounded-full" style={{ width: '10px', height: '10px', border: '2px solid white' }} />
        </div>
        <div className="ml-3">
          <h6 className="mb-0 font-medium">{username}</h6>
          <small className="text-gray-500">{timestamp}</small>
        </div>
        <button className="btn-icon ml-auto">
          <FiMoreHorizontal size={20} />
        </button>
      </div>
      
      {/* Card Image */}
      <div className="relative" style={{ aspectRatio: '4/5' }}>
        <Image 
          src={displayImage} 
          alt={caption} 
          fill 
          className="object-fit-cover"
        />
      </div>
      
      {/* Card Actions */}
      <div className="p-3">
        <div className="flex mb-2">
          <button 
            className={`btn-icon ${liked ? 'text-red-500' : ''}`}
            onClick={handleLike}
          >
            <FiHeart size={24} fill={liked ? 'currentColor' : 'none'} />
          </button>
          <button className="btn-icon">
            <FiMessageSquare size={24} />
          </button>
          <button className="btn-icon">
            <FiSend size={24} />
          </button>
          <button className="btn-icon ml-auto">
            <FiBookmark size={24} />
          </button>
        </div>
        
        {/* Likes */}
        <div className="mb-2">
          <strong>{likeCount} likes</strong>
        </div>
        
        {/* Caption */}
        <p className="mb-1">
          <strong className="mr-2">{username}</strong>
          {caption}
        </p>
        
        {/* Comments */}
        <button className="text-gray-500 p-0 text-sm bg-transparent border-none hover:text-gray-700 transition-colors duration-150">
          View all comments
        </button>
      </div>
    </div>
  );
}