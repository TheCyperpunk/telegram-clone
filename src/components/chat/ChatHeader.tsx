'use client';

import { FiMenu } from 'react-icons/fi';
import { HiOutlinePhone, HiOutlineVideoCamera, HiOutlineEllipsisVertical, HiOutlineMagnifyingGlass, HiOutlineBell, HiStar, HiArrowLeft } from 'react-icons/hi2';
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
          {showMediaGallery ? (
            <button 
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors duration-200 mr-2"
              onClick={(e) => {
                e.stopPropagation();
                handleStarClick();
              }}
            >
              <HiArrowLeft size={20} className="text-gray-600" />
            </button>
          ) : (
            <button 
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors duration-200 md:hidden mr-2"
              onClick={(e) => {
                e.stopPropagation();
                onMenuClick();
              }}
            >
              <FiMenu size={18} className="text-gray-600" />
            </button>
          )}
          
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
                  className="relative group"
                >
                  <div className="relative">
                    {/* Sparkle effects */}
                    <div className="absolute -top-1 -left-1 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-75"></div>
                    <div className="absolute -top-1 -right-1 w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-75" style={{animationDelay: '0.3s'}}></div>
                    <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-pink-400 rounded-full animate-ping opacity-75" style={{animationDelay: '0.6s'}}></div>
                    <div className="absolute -bottom-1 -right-1 w-1 h-1 bg-cyan-400 rounded-full animate-ping opacity-75" style={{animationDelay: '0.9s'}}></div>
                    
                    {/* Main star with gradient */}
                    <div className="relative p-1 hover:scale-125 transition-transform duration-300 ease-out">
                      <svg 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        className="drop-shadow-lg group-hover:drop-shadow-2xl transition-all duration-300 animate-pulse"
                      >
                        <defs>
                          <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#60A5FA" />
                            <stop offset="50%" stopColor="#A78BFA" />
                            <stop offset="100%" stopColor="#EC4899" />
                          </linearGradient>
                        </defs>
                        {/* Star border/stroke */}
                        <path 
                          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                          fill="none"
                          stroke="url(#starGradient)"
                          strokeWidth="1.5"
                          strokeLinejoin="round"
                          className="opacity-80"
                        />
                        {/* Star fill */}
                        <path 
                          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                          fill="url(#starGradient)"
                          className="group-hover:animate-spin"
                          style={{animationDuration: '2s'}}
                        />
                      </svg>
                    </div>
                  </div>
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
          {!showMediaGallery && (
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