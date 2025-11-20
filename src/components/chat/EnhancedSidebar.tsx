'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  HiOutlineMagnifyingGlass,
  HiOutlineBars3,
  HiOutlineUserGroup,
  HiOutlineBookmark,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCog6Tooth,
  HiOutlinePhone,
  HiOutlineHashtag,
  HiOutlineBellAlert,
  HiOutlineFolder,
  HiOutlineMoon,
  HiOutlineQuestionMarkCircle,
  HiOutlineArrowRightOnRectangle,
  HiOutlineCheck,
  HiOutlineCheckCircle
} from 'react-icons/hi2';

interface Conversation {
  _id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread?: number;
  avatar?: string;
  isOnline?: boolean;
  isPinned?: boolean;
  isMuted?: boolean;
  type: 'private' | 'group' | 'channel' | 'bot' | 'discord' | 'slack';
}

interface EnhancedSidebarProps {
  conversations: Conversation[];
  currentConversation?: string | null;
  onSelectConversation: (id: string) => void;
  onLogout: () => void;
  activeSection?: string;
}

export default function EnhancedSidebar({
  conversations,
  currentConversation,
  onSelectConversation,
  onLogout,
  activeSection = 'chats'
}: EnhancedSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  // Add back menuItems but with updated options
  const menuItems = [
    { icon: HiOutlineUserGroup, label: 'New Community', action: () => { } },
    { icon: HiOutlineHashtag, label: 'Create Page', action: () => { } },
    { icon: HiOutlinePhone, label: 'Calls', action: () => { } },
    { icon: HiOutlineBookmark, label: 'Saved Messages', action: () => { } },
    { icon: HiOutlineBellAlert, label: 'Notifications', action: () => { } },
    { icon: HiOutlineFolder, label: 'Chat Folders', action: () => { } },
    { icon: HiOutlineMoon, label: 'Night Mode', action: () => { } },
    { icon: HiOutlineCog6Tooth, label: 'Settings', action: () => { } },
    { icon: HiOutlineQuestionMarkCircle, label: 'Help', action: () => { } },
    { icon: HiOutlineArrowRightOnRectangle, label: 'Log Out', action: onLogout }
  ];

  const filteredConversations = conversations.filter(conv => {
    // Filter by search query
    const matchesSearch = conv.name.toLowerCase().includes(searchQuery.toLowerCase());

    // If in explore section, only show channels
    if (activeSection === 'explore') {
      return matchesSearch && conv.type === 'channel';
    }

    // If in bots section, only show bots (exclude channels)
    if (activeSection === 'bots') {
      return matchesSearch && conv.type === 'bot';
    }

    return matchesSearch;
  });

  const pinnedConversations = filteredConversations.filter(conv => conv.isPinned);
  const unpinnedConversations = filteredConversations.filter(conv => !conv.isPinned);

  return (
    <div className="flex flex-col h-full bg-white relative w-full shadow-sm">
      {/* Sidebar Header */}
      <div className="px-3 py-2 border-b border-gray-200 flex items-center bg-white">
        <button
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors mr-2"
          onClick={() => setShowMenu(!showMenu)}
        >
          <HiOutlineBars3 size={20} className="text-gray-600" />
        </button>
        <div className="flex-1 relative">
          <div className="flex items-center bg-gray-50 rounded-lg">
            <span className="pl-3 pr-2">
              <HiOutlineMagnifyingGlass size={16} className="text-gray-400" />
            </span>
            <input
              type="text"
              placeholder="Search conversations..."
              className="flex-1 py-2 pr-3 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Conversations List */}
      <div className="overflow-auto flex-1">
        {/* Recent Messages - All conversations mixed together */}
        {filteredConversations.length > 0 && (
          <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
            Recent Messages
          </div>
        )}

        {/* Show all conversations together */}
        {filteredConversations.map((conv) => (
          <ConversationItem
            key={conv._id}
            conversation={conv}
            isActive={currentConversation === conv._id}
            onClick={() => onSelectConversation(conv._id)}
          />
        ))}

        {filteredConversations.length === 0 && (
          <div className="text-center text-gray-500 p-8">
            <HiOutlineChatBubbleLeftRight size={40} className="mx-auto mb-3 text-gray-400" />
            <p className="text-sm">No conversations found</p>
          </div>
        )}
      </div>

      {/* Sliding Menu */}
      <div
        className={`fixed left-0 top-0 h-full bg-white shadow-lg transition-transform z-50 ${showMenu ? 'translate-x-0' : '-translate-x-full'
          }`}
        style={{
          width: '280px'
        }}
      >
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h6 className="text-lg font-semibold text-gray-900">Menu</h6>
          <button
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => setShowMenu(false)}
          >
            <span className="text-gray-600 text-xl">×</span>
          </button>
        </div>
        <div className="p-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="w-full flex items-center px-3 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors text-gray-700"
              onClick={item.action}
            >
              <span className="mr-3 flex items-center justify-center w-6 h-6">
                <item.icon size={20} />
              </span>
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Avatar Image Component with error handling
function AvatarImage({ src, name }: { src?: string, name: string }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    // Generate a consistent color based on name
    const colors = [
      'from-blue-500 to-blue-600',
      'from-green-500 to-green-600',
      'from-purple-500 to-purple-600',
      'from-pink-500 to-pink-600',
      'from-indigo-500 to-indigo-600',
      'from-red-500 to-red-600',
      'from-yellow-500 to-yellow-600',
      'from-teal-500 to-teal-600'
    ];
    const colorIndex = name.charCodeAt(0) % colors.length;

    return (
      <div className={`w-12 h-12 bg-gradient-to-br ${colors[colorIndex]} rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-md ring-2 ring-gray-200 group-hover:ring-blue-300 transition-all duration-200`}>
        {name[0].toUpperCase()}
      </div>
    );
  }

  return (
    <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-gray-200 group-hover:ring-blue-300 transition-all duration-200 bg-gray-100">
      <img
        src={src}
        alt={name}
        className="w-full h-full object-cover"
        onError={() => setImageError(true)}
        loading="lazy"
      />
    </div>
  );
}

// Enhanced Conversation Item Component with real images and features
function ConversationItem({
  conversation,
  isActive,
  onClick
}: {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={`w-full p-3 text-left hover:bg-gray-50 transition-all duration-200 border-none bg-transparent group ${isActive ? 'bg-blue-50 border-r-3 border-blue-500' : ''
        }`}
      onClick={onClick}
    >
      <div className="flex items-center">
        {/* Enhanced Avatar with real images */}
        <div className="relative mr-3 flex-shrink-0">
          <AvatarImage
            src={conversation.avatar}
            name={conversation.name}
          />

          {/* Online Status Indicator */}
          {conversation.isOnline && (
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 border-2 border-white rounded-full shadow-sm"></div>
          )}

          {/* Pinned Indicator */}
          {conversation.isPinned && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center shadow-sm">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-1">
            <div className="flex items-center truncate pr-2 flex-1">
              <span className={`font-semibold truncate ${conversation.unread ? 'text-gray-900' : 'text-gray-800'
                }`}>
                {conversation.name}
              </span>

              {/* Type Badges */}
              {conversation.type === 'channel' && (
                <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full font-medium flex items-center">
                  <HiOutlineHashtag size={10} className="mr-1" />
                  Channel
                </span>
              )}
              {conversation.type === 'discord' && (
                <span className="ml-2 px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs rounded-full font-medium flex items-center">
                  <img
                    src="https://play-lh.googleusercontent.com/0oO5sAneb9lJP6l8c6DH4aj6f85qNpplQVHmPmbbBxAukDnlO7DarDW0b-kEIHa8SQ=s96"
                    alt="Discord"
                    className="w-3 h-3 mr-1 rounded-full"
                  />
                  Discord
                </span>
              )}
              {conversation.type === 'slack' && (
                <span className="ml-2 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full font-medium flex items-center">
                  <img
                    src="https://play-lh.googleusercontent.com/mzJpTCsTW_FuR6YqOPaLHrSEVCSJuXzCljdxnCKhVZMcu6EESZBQTCHxMh8slVtnKqo=w480-h960"
                    alt="Slack"
                    className="w-3 h-3 mr-1 rounded-full"
                  />
                  Slack
                </span>
              )}
              {conversation.type === 'group' && (
                <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-600 text-xs rounded-full font-medium flex items-center">
                  <HiOutlineUserGroup size={10} className="mr-1" />
                  Group
                </span>
              )}
            </div>

            {/* Time and Status */}
            <div className="flex items-center flex-shrink-0">
              <small className="text-xs text-blue-600 font-medium">
                {conversation.time}
              </small>
            </div>
          </div>

          <div className="flex justify-between items-center">
            {/* Last Message */}
            <p className={`text-sm mb-0 truncate pr-2 flex-1 ${conversation.unread ? 'text-gray-700 font-medium' : 'text-gray-500'
              }`}>
              {conversation.lastMessage}
            </p>

            {/* Status Icons */}
            <div className="flex items-center gap-1 flex-shrink-0">
              {conversation.isMuted && (
                <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center">
                  <HiOutlineBellAlert size={12} className="text-gray-400" />
                </div>
              )}

              {conversation.unread && (
                <div className="min-w-5 h-5 px-1.5 bg-red-500 text-white rounded-full text-xs font-semibold flex items-center justify-center shadow-sm">
                  {conversation.unread > 99 ? '99+' : conversation.unread}
                </div>
              )}

              {/* Read Receipt for sent messages */}
              {!conversation.unread && conversation.type === 'private' && (
                <HiOutlineCheckCircle size={14} className="text-blue-500" />
              )}
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}