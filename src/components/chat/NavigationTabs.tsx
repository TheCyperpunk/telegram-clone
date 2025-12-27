'use client';

import { useState } from 'react';
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineUserGroup,
  HiOutlinePhone,
  HiOutlineRectangleGroup,
  HiOutlineCommandLine,
  HiOutlineBookOpen,
  HiOutlineBookmark,
  HiOutlineGlobeAlt,
  HiOutlineSparkles
} from 'react-icons/hi2';

interface Tab {
  id: string;
  icon: React.ElementType;
  label: string;
  badge?: number;
}

interface NavigationTabsProps {
  onTabChange: (tabId: string) => void;
  onComitClick?: () => void;
}

export default function NavigationTabs({ onTabChange, onComitClick }: NavigationTabsProps) {
  const [activeTab, setActiveTab] = useState('chats');

  const tabs: Tab[] = [
    { id: 'chats', icon: HiOutlineChatBubbleLeftRight, label: 'Chats', badge: 3 },
    { id: 'stories', icon: HiOutlineSparkles, label: 'Stories', badge: 5 },
    { id: 'groups', icon: HiOutlineUserGroup, label: 'Groups' },
    { id: 'calls', icon: HiOutlinePhone, label: 'Calls', badge: 1 },
    { id: 'explore', icon: HiOutlineGlobeAlt, label: 'Explore', badge: 20 },
    { id: 'pages', icon: HiOutlineRectangleGroup, label: 'Channels' },
    { id: 'bots', icon: HiOutlineCommandLine, label: 'Bots' },
    { id: 'saved', icon: HiOutlineBookmark, label: 'Saved' }
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange(tabId);
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="flex items-center px-2">
        <div className="flex overflow-x-auto scrollbar-hide flex-1 h-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`inline-flex items-center px-3 py-2 border-none bg-transparent text-sm font-medium transition-all duration-200 relative whitespace-nowrap group ${activeTab === tab.id ? 'text-blue-600' : 'text-gray-600 hover:text-gray-800'
                }`}
              onClick={() => handleTabClick(tab.id)}
            >
              <div className="flex items-center">
                <tab.icon
                  size={16}
                  className={`mr-1.5 transition-colors duration-200 ${activeTab === tab.id ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'
                    }`}
                />
                <span className="font-medium text-xs">{tab.label}</span>
                {tab.badge && (
                  <span className="ml-1.5 inline-flex items-center justify-center min-w-4 h-4 px-1 bg-red-500 text-white rounded-full text-xs font-semibold">
                    {tab.badge}
                  </span>
                )}
              </div>
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transition-all duration-300" />
              )}
            </button>
          ))}
        </div>

        {/* Animated Circle Button on the right */}
        <div className="flex items-center ml-2">
          <button
            className="relative p-1 group"
            onClick={onComitClick}
          >
            {/* Animated Ring Background with Spinning Shadow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 animate-spin opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            {/* Animated Shadow Layer */}
            <div className="absolute inset-0 rounded-full shadow-md shadow-purple-500/60 animate-spin"></div>
            <div className="absolute inset-0 rounded-full shadow-sm shadow-blue-500/40 animate-spin" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute inset-0 rounded-full shadow-sm shadow-green-500/40 animate-spin" style={{ animationDelay: '1s' }}></div>
            <div className="absolute inset-0.5 rounded-full bg-white"></div>

            {/* Inner Circle with Image (no red background) */}
            <div className="relative w-8 h-8 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrdp9rP2FklrcABioYIBKXVNmcyRF9b2kCPbyMW_ITIk0Tg1Lj3EZWcpu9ZE5PhI6qwT4&usqp=CAU"
                alt="Red Circle"
                className="w-7 h-7 rounded-full object-cover"
              />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}