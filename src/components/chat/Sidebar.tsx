'use client';

import { useState } from 'react';
import { FiSearch, FiMenu, FiMessageSquare, FiSettings, FiChevronLeft, FiBell, FiMapPin } from 'react-icons/fi';
import FilterTabs from './FilterTabs';

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
  type?: 'private' | 'group' | 'channel' | 'discord' | 'slack' | 'teams';
}

interface SidebarProps {
  conversations: Conversation[];
  currentConversation?: string | null;
  onSelectConversation: (id: string) => void;
}

export default function Sidebar({ conversations, currentConversation, onSelectConversation }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.name.toLowerCase().includes(searchQuery.toLowerCase());

    // Filter based on type if specified
    if (conv.type && activeFilter !== 'all') {
      switch (activeFilter) {
        case 'channels':
          return matchesSearch && conv.type === 'channel';
        case 'groups':
          return matchesSearch && (conv.type === 'group' || conv.type === 'discord' || conv.type === 'slack' || conv.type === 'teams');
        case 'private':
          return matchesSearch && conv.type === 'private';
        default:
          return matchesSearch;
      }
    }

    return matchesSearch;
  });

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
  };

  return (
    <div className={`sidebar flex flex-col h-full ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Header */}
      <div className="sidebar-header flex items-center px-3 py-2 border-b border-gray-200">
        <button className="btn-icon mr-2" aria-label="Menu">
          <FiMenu size={20} color="#707579" />
        </button>
        {!isCollapsed && (
          <div className="search-container flex-grow">
            <div className="input-group bg-gray-50 rounded">
              <span className="input-group-text border-0 bg-gray-50">
                <FiSearch size={18} color="#707579" />
              </span>
              <input
                type="text"
                className="form-control border-0 bg-gray-50 pl-2"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        )}
        <button
          className="btn-icon ml-2"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <FiChevronLeft
            size={20}
            className={`transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {/* Filter Tabs - only show when not collapsed */}
      {!isCollapsed && <FilterTabs onFilterChange={handleFilterChange} />}

      {/* Conversations List */}
      <div className="overflow-auto flex-grow">
        {/* Recent Messages */}
        {filteredConversations.length > 0 && !isCollapsed && (
          <div className="section-header px-3 py-2 text-gray-500 text-sm font-medium">
            Recent Messages
            <div className="text-gray-500 text-sm">Your recent conversations</div>
          </div>
        )}

        {filteredConversations.map((conv) => (
          <ConversationItem
            key={conv._id}
            conversation={conv}
            isActive={currentConversation === conv._id}
            onClick={() => onSelectConversation(conv._id)}
            isCollapsed={isCollapsed}
          />
        ))}

        {filteredConversations.length === 0 && (
          <div className="text-center text-gray-500 p-4">
            <FiMessageSquare size={40} className="mb-2" />
            <p>No conversations found</p>
          </div>
        )}
      </div>

      {/* Settings Button */}
      <div className="p-3 border-t border-gray-200">
        <button className="menu-btn w-full flex items-center">
          <div className="icon">
            <FiSettings size={20} />
          </div>
          {!isCollapsed && <span className="ml-3">Settings</span>}
        </button>
      </div>
    </div>
  );
}

// Conversation Item Component
function ConversationItem({
  conversation,
  isActive,
  onClick,
  isCollapsed
}: {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
  isCollapsed: boolean;
}) {
  return (
    <button
      className={`conversation-item flex items-center px-3 py-2 w-full ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      <div className="relative">
        <div className="conversation-avatar">
          {conversation.avatar ? (
            <img src={conversation.avatar} alt={conversation.name} className="w-full h-full object-cover rounded-full" />
          ) : (
            conversation.name[0].toUpperCase()
          )}
        </div>
        {conversation.isOnline && <div className="online-indicator" />}
      </div>

      {!isCollapsed && (
        <div className="ml-3 flex-grow overflow-hidden">
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center truncate pr-2">
              <span className="font-medium text-gray-900 truncate">{conversation.name}</span>
              {conversation.type === 'channel' && (
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-2xs font-medium bg-blue-600 text-white">CHANNEL</span>
              )}
              {conversation.type === 'group' && (
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-2xs font-medium bg-green-600 text-white">GROUP</span>
              )}
              {conversation.type === 'discord' && (
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-2xs font-medium bg-indigo-600 text-white">
                  <img
                    src="https://play-lh.googleusercontent.com/0oO5sAneb9lJP6l8c6DH4aj6f85qNpplQVHmPmbbBxAukDnlO7DarDW0b-kEIHa8SQ=s96"
                    alt="Discord"
                    className="w-4 h-4 mr-1 rounded-full"
                  />
                  DISCORD
                </span>
              )}
              {conversation.type === 'slack' && (
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-2xs font-medium bg-purple-600 text-white">
                  <img
                    src="https://play-lh.googleusercontent.com/mzJpTCsTW_FuR6YqOPaLHrSEVCSJuXzCljdxnCKhVZMcu6EESZBQTCHxMh8slVtnKqo=w480-h960"
                    alt="Slack"
                    className="w-4 h-4 mr-1 rounded-full"
                  />
                  SLACK
                </span>
              )}
              {conversation.type === 'teams' && (
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-2xs font-medium bg-blue-600 text-white">
                  <img
                    src="https://play-lh.googleusercontent.com/jKU64njy8urP89V1O63eJxMtvWjDGETPlHVIhDv9WZAYzsSxRWyWZkUlBJZj_HbkHA=w480-h960"
                    alt="Teams"
                    className="w-4 h-4 mr-1"
                  />
                  TEAMS
                </span>
              )}
            </div>
            <small className="text-gray-500 ml-1">{conversation.time}</small>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-500 text-sm mb-0 truncate">
              {conversation.lastMessage}
            </p>
            <div className="flex items-center flex-shrink-0">
              {conversation.isPinned && (
                <FiMapPin size={14} className="text-gray-500 mr-1" />
              )}
              {conversation.isMuted && (
                <FiBell size={14} className="text-gray-500 mr-1" />
              )}
              {conversation.unread && (
                <span className="conversation-badge ml-2">
                  {conversation.unread}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* When collapsed, just show the badge */}
      {isCollapsed && conversation.unread && (
        <span className="conversation-badge absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
          {conversation.unread}
        </span>
      )}
    </button>
  );
}