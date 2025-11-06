'use client';

import { FiMenu } from 'react-icons/fi';
import { HiOutlinePhone, HiOutlineVideoCamera, HiOutlineEllipsisVertical, HiOutlineMagnifyingGlass, HiOutlineBell, HiStar, HiXMark } from 'react-icons/hi2';
import Image from 'next/image';

interface ChatHeaderProps {
  name: string;
  status?: string;
  isOnline?: boolean;
  isTyping?: boolean;
  avatar?: string;
  memberCount?: number;
  lastSeen?: string;
  onMenuClick: () => void;
  onProfileClick?: () => void;
  onStarClick?: () => void;
  showMediaGallery?: boolean;
  conversationType?: 'private' | 'group' | 'channel' | 'bot';
}

export default function ChatHeader({ 
  name, 
  status = 'offline', 
  isOnline = false, 
  isTyping = false,
  avatar,
  memberCount,
  lastSeen,
  onMenuClick,
  onProfileClick,
  onStarClick,
  showMediaGallery = false,
  conversationType = 'private'
}: ChatHeaderProps) {
  const handleStarClick = () => {
    if (onStarClick) {
      onStarClick();
    }
  };
  return (
    <div className="bg-white border-b border-gray-100 shadow-sm">
      <div className="px-4 py-2 flex items-center justify-between">
        <div 
          className="flex items-center cursor-pointer hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors duration-200"
          onClick={onProfileClick}
        >
          <button 
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors duration-200 md:hidden mr-2"
            onClick={(e) => {
              e.stopPropagation();
              onMenuClick();
            }}
          >
            <FiMenu size={18} className="text-gray-600" />
          </button>
          
          <div className="relative mr-3">
            {avatar ? (
              <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-blue-100 shadow-md">
                <Image 
                  src={avatar} 
                  alt={name}
                  width={36}
                  height={36}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold shadow-md text-sm">
                {name[0]?.toUpperCase()}
              </div>
            )}
            {isOnline && (
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full shadow-sm"></div>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900 text-sm">{name}</h3>
              {!showMediaGallery && conversationType === 'channel' && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStarClick();
                  }}
                  className="px-2 py-1 ml-1 bg-yellow-100 hover:bg-yellow-200 rounded-lg transition-all duration-200 text-yellow-600 hover:text-yellow-700 hover:scale-105 shadow-sm hover:shadow-md border border-yellow-200"
                >
                  <HiStar size={14} />
                </button>
              )}
              {!showMediaGallery && memberCount && (
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                  {memberCount} members
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 leading-tight">
              {isTyping ? (
                <span className="text-blue-500 font-medium flex items-center gap-1">
                  <span className="w-1 h-1 bg-blue-500 rounded-full animate-bounce"></span>
                  <span className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></span>
                  <span className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                  <span className="ml-1">typing</span>
                </span>
              ) : isOnline ? (
                <span className="text-green-600 font-medium">online</span>
              ) : lastSeen ? (
                `last seen ${lastSeen}`
              ) : (
                status
              )}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {showMediaGallery ? (
            <button 
              onClick={handleStarClick}
              className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 text-gray-600 hover:text-red-600 hover:scale-110"
            >
              <HiXMark size={18} />
            </button>
          ) : (
            <>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 text-gray-600 hover:text-blue-600 hover:scale-110">
                <HiOutlineMagnifyingGlass size={18} />
              </button>
              {conversationType !== 'channel' && conversationType !== 'bot' && (
                <>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 text-gray-600 hover:text-yellow-600 hover:scale-110">
                    <HiOutlineBell size={18} />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 text-gray-600 hover:text-green-600 hover:scale-110">
                    <HiOutlinePhone size={18} />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 text-gray-600 hover:text-blue-600 hover:scale-110">
                    <HiOutlineVideoCamera size={18} />
                  </button>
                </>
              )}
              <button className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 text-gray-600 hover:scale-110">
                <HiOutlineEllipsisVertical size={18} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}