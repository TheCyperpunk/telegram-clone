'use client';

import Image from 'next/image';

interface StoryCircleProps {
  username: string;
  avatar: string;
  isViewed?: boolean;
  isCurrentUser?: boolean;
  // Number of stories this user has. The ring will be split into this many segments.
  storyCount?: number;
  onClick?: () => void;
}

export default function StoryCircle({
  username,
  avatar,
  isViewed = false,
  isCurrentUser = false,
  storyCount = 1,
  onClick
}: StoryCircleProps) {
  // Build a conic-gradient string to create N segments with small gaps
  const buildSegmentedRing = (n: number, color: string, gapDeg = 6) => {
    const safeN = Math.max(1, Math.min(20, Math.floor(n))); // clamp for safety
    const slice = 360 / safeN;
    const seg = Math.max(0, slice - gapDeg);
    const parts: string[] = [];
    for (let i = 0; i < safeN; i++) {
      const start = i * slice;
      const end = start + seg;
      parts.push(`${color} ${start}deg ${end}deg`, `transparent ${end}deg ${start + slice}deg`);
    }
    return `conic-gradient(${parts.join(', ')})`;
  };

  const ringColor = '#9CA3AF'; // Grey for recent stories
  const ringBackground = buildSegmentedRing(storyCount, ringColor);

  return (
    <div 
      className="flex flex-col items-center min-w-[80px] cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative mb-1">
        {/* Segmented border ring */}
        <div
          className={`w-16 h-16 rounded-full p-0.5 transition-all duration-200 group-hover:scale-110`}
          style={{ background: ringBackground }}
        >
          {/* Inner white ring */}
          <div className="w-full h-full bg-white rounded-full p-0.5">
            {/* Avatar container */}
            <div className="w-full h-full rounded-full overflow-hidden">
              {avatar ? (
                <Image 
                  src={avatar} 
                  alt={username} 
                  width={56} 
                  height={56} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-blue-500 text-white flex items-center justify-center text-lg font-semibold">
                  {username[0]?.toUpperCase()}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Add button for current user */}
        {isCurrentUser && (
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg z-10">
            <span className="text-white text-sm font-bold leading-none">+</span>
          </div>
        )}
      </div>
      
      {/* Username */}
      <span className="text-xs text-gray-700 text-center truncate w-full font-medium leading-tight">
        {isCurrentUser ? 'Your story' : username}
      </span>
    </div>
  );
}