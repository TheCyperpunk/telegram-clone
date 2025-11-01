'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { 
  HiOutlineHashtag,
  HiOutlineSpeakerWave,
  HiOutlineVideoCamera,
  HiOutlineLockClosed,
  HiOutlinePlus,
  HiOutlineChevronDown,
  HiOutlineChevronRight,
  HiOutlineChevronLeft,
  HiOutlineCog6Tooth,
  HiOutlineBell,
  HiOutlineUserGroup
} from 'react-icons/hi2';

interface Subgroup {
  id: string;
  name: string;
  type: 'text' | 'voice' | 'video';
  isPrivate?: boolean;
  unread?: number;
  members?: number;
  avatar?: string;
  color?: string;
  lastMessage?: {
    sender: string;
    content: string;
    time: string;
  };
}

interface SubgroupsSidebarProps {
  groupName: string;
  groupAvatar: string;
  memberCount: number;
  onSubgroupSelect: (subgroupId: string) => void;
  selectedSubgroup?: string;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export default function SubgroupsSidebar({
  groupName,
  groupAvatar,
  memberCount,
  onSubgroupSelect,
  selectedSubgroup,
  isCollapsed: initialCollapsed = false,
  onToggleCollapse
}: SubgroupsSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);
  const [width, setWidth] = useState(240);
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [subgroups] = useState<Subgroup[]>([
    { 
      id: 'events', 
      name: 'Events', 
      type: 'text', 
      unread: 1, 
      color: '#F97316',
      lastMessage: {
        sender: 'matterbridge: perry',
        content: 'Inviting everyone to come...',
        time: '8:12 AM'
      }
    },
    { 
      id: 'tech-policy', 
      name: 'Tech Policy', 
      type: 'text', 
      color: '#8B5CF6',
      lastMessage: {
        sender: 'A',
        content: 'https://theprint.in/ground-reports/india-billi...',
        time: '2:48 PM'
      }
    },
    { 
      id: 'foss-projects', 
      name: 'FOSS Projects', 
      type: 'text', 
      color: '#EC4899',
      lastMessage: {
        sender: 'Nevil krishna k',
        content: 'Tired of fighting with resume te...',
        time: '1:52 AM'
      }
    },
    { 
      id: 'general', 
      name: 'General', 
      type: 'text', 
      unread: 146, 
      color: '#3B82F6',
      lastMessage: {
        sender: 'Anubhav',
        content: 'But it still very frustrating that ther...',
        time: '12:28 AM'
      }
    },
    { 
      id: 'foss-news', 
      name: 'FOSS news', 
      type: 'text', 
      color: '#10B981',
      lastMessage: {
        sender: 'Fb',
        content: 'very nicely put mate :)',
        time: '9:31 PM'
      }
    },
    { 
      id: 'indiafoss-2025', 
      name: 'IndiaFOSS 2025', 
      type: 'text', 
      unread: 66, 
      color: '#F59E0B',
      lastMessage: {
        sender: 'eliz',
        content: 'Hi, is there any founder, cto, ceo, or some...',
        time: 'Mon'
      }
    },
    { 
      id: 'media-watch', 
      name: 'Media Watch', 
      type: 'text', 
      unread: 4, 
      color: '#14B8A6',
      lastMessage: {
        sender: 'Vivekanandan KS',
        content: 'Reminds me of how someon...',
        time: 'Mon'
      }
    },
    { 
      id: 'hardware', 
      name: 'Hardware', 
      type: 'text', 
      color: '#06B6D4',
      lastMessage: {
        sender: 'Shree',
        content: 'Better chance of working at VGA resolution. ...',
        time: 'Sun'
      }
    },
    { 
      id: 'memes', 
      name: 'Memes', 
      type: 'text', 
      color: '#84CC16',
      lastMessage: {
        sender: 'Jesvin',
        content: 'Yup, the raw apis surprise me regularly. We ...',
        time: 'Fri'
      }
    },
    { 
      id: 'jobs', 
      name: 'Jobs', 
      type: 'text', 
      unread: 7, 
      color: '#EF4444',
      lastMessage: {
        sender: 'Ankush',
        content: 'Help us spread adoption of our FOSS ...',
        time: 'Fri'
      }
    },
    { 
      id: 'stories', 
      name: 'Stories', 
      type: 'text', 
      color: '#A855F7',
      lastMessage: {
        sender: 'Rushabh',
        content: 'https://www.youtube.com/watch?v=c...',
        time: 'Thu'
      }
    },
    { 
      id: 'organisation', 
      name: 'Organisation', 
      type: 'text', 
      color: '#DC2626',
      lastMessage: {
        sender: 'Shree',
        content: 'We wanted to include governance docs in t...',
        time: 'Wed'
      }
    },
    { 
      id: 'foss-help', 
      name: 'FOSS Help', 
      type: 'text', 
      color: '#059669',
      lastMessage: {
        sender: 'Karthik',
        content: "Yes, I'm doing read-only mode wherever p...",
        time: 'Wed'
      }
    },
    { 
      id: 'ai-ml', 
      name: 'AI / ML', 
      type: 'text', 
      color: '#6366F1',
      lastMessage: {
        sender: '',
        content: '',
        time: '9/23/2025'
      }
    },
    { 
      id: 'design', 
      name: 'Design', 
      type: 'text', 
      unread: 2, 
      color: '#D946EF',
      avatar: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=150&auto=format&fit=crop&q=60',
      lastMessage: {
        sender: 'Sarah',
        content: 'Updated the color palette for the new UI',
        time: 'Tue'
      }
    },
    { 
      id: 'random', 
      name: 'Random', 
      type: 'text', 
      color: '#F472B6',
      lastMessage: {
        sender: 'Mike',
        content: 'Anyone seen the latest meme? 😂',
        time: 'Tue'
      }
    },
    { 
      id: 'announcements', 
      name: 'Announcements', 
      type: 'text', 
      color: '#EF4444',
      isPrivate: true,
      lastMessage: {
        sender: 'Admin',
        content: 'Server maintenance scheduled for tomorrow',
        time: 'Mon'
      }
    },
    { 
      id: 'introductions', 
      name: 'Introductions', 
      type: 'text', 
      color: '#10B981',
      lastMessage: {
        sender: 'NewUser',
        content: 'Hey everyone! Excited to join this community',
        time: 'Mon'
      }
    },
    { 
      id: 'resources', 
      name: 'Resources', 
      type: 'text', 
      color: '#8B5CF6',
      avatar: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=150&auto=format&fit=crop&q=60',
      lastMessage: {
        sender: 'Lisa',
        content: 'Added new learning materials to the drive',
        time: 'Sun'
      }
    },
    { 
      id: 'gaming', 
      name: 'Gaming', 
      type: 'text', 
      unread: 12, 
      color: '#EF4444',
      avatar: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=150&auto=format&fit=crop&q=60',
      lastMessage: {
        sender: 'Alex',
        content: 'Anyone up for a game tonight?',
        time: 'Sat'
      }
    },
    { 
      id: 'music', 
      name: 'Music', 
      type: 'text', 
      color: '#EC4899',
      avatar: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=150&auto=format&fit=crop&q=60',
      lastMessage: {
        sender: 'DJ',
        content: 'Check out this new track I found',
        time: 'Sat'
      }
    },
    { 
      id: 'photography', 
      name: 'Photography', 
      type: 'text', 
      color: '#06B6D4',
      avatar: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=150&auto=format&fit=crop&q=60',
      lastMessage: {
        sender: 'Emma',
        content: 'Golden hour shots from yesterday',
        time: 'Fri'
      }
    },
    { 
      id: 'fitness', 
      name: 'Fitness', 
      type: 'text', 
      unread: 3, 
      color: '#84CC16',
      avatar: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=150&auto=format&fit=crop&q=60',
      lastMessage: {
        sender: 'Coach',
        content: 'Morning workout session starts at 6 AM',
        time: 'Fri'
      }
    },
    { 
      id: 'books', 
      name: 'Books', 
      type: 'text', 
      color: '#F59E0B',
      avatar: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=150&auto=format&fit=crop&q=60',
      lastMessage: {
        sender: 'Reader',
        content: 'Just finished "The Pragmatic Programmer"',
        time: 'Thu'
      }
    },
    { 
      id: 'travel', 
      name: 'Travel', 
      type: 'text', 
      color: '#14B8A6',
      avatar: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=150&auto=format&fit=crop&q=60',
      lastMessage: {
        sender: 'Wanderer',
        content: 'Planning a trip to Japan next month',
        time: 'Thu'
      }
    },
    { 
      id: 'food', 
      name: 'Food', 
      type: 'text', 
      unread: 5, 
      color: '#F97316',
      avatar: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=150&auto=format&fit=crop&q=60',
      lastMessage: {
        sender: 'Chef',
        content: 'New recipe: Homemade pasta from scratch',
        time: 'Wed'
      }
    }
  ]);

  // Handle mouse resize
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      
      const newWidth = e.clientX - (sidebarRef.current?.getBoundingClientRect().left || 0);
      
      // Collapse if width is less than 120px
      if (newWidth < 120) {
        setIsCollapsed(true);
        setWidth(80);
      } else if (newWidth >= 120 && newWidth <= 400) {
        setIsCollapsed(false);
        setWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'ew-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  const handleMouseDown = () => {
    setIsResizing(true);
  };

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    onToggleCollapse?.();
  };

  // Collapsed view - just icons
  if (isCollapsed) {
    return (
      <div ref={sidebarRef} className="w-20 bg-white border-r border-gray-200 flex flex-col h-full items-center py-3 relative">
        {/* Group Avatar */}
        <div className="mb-3 relative group cursor-pointer">
          <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-gray-200 flex-shrink-0">
            <Image 
              src={groupAvatar}
              alt={groupName}
              width={44}
              height={44}
              className="object-cover w-full h-full"
            />
          </div>
          {memberCount > 0 && (
            <div className="absolute -bottom-1 -right-1 bg-gray-800 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full border border-gray-200">
              {memberCount > 999 ? `${Math.floor(memberCount / 1000)}k` : memberCount}
            </div>
          )}
        </div>

        {/* Subgroups as circles */}
        <div className="flex-1 overflow-y-auto w-full space-y-1.5 px-2">
          {subgroups.map((subgroup) => (
            <div
              key={subgroup.id}
              className="w-full flex items-center justify-center"
            >
              <button
                onClick={() => onSubgroupSelect(subgroup.id)}
                className={`relative ${
                  selectedSubgroup === subgroup.id ? 'ring-2 ring-blue-500 rounded-full' : ''
                }`}
                title={subgroup.name}
              >
                {subgroup.avatar ? (
                  <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0 shadow-md">
                    <Image 
                      src={subgroup.avatar}
                      alt={subgroup.name}
                      width={44}
                      height={44}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ) : (
                  <div 
                    className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-md"
                    style={{ backgroundColor: subgroup.color }}
                  >
                    {subgroup.name[0].toUpperCase()}
                  </div>
                )}
                {subgroup.unread && subgroup.unread > 0 && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                    {subgroup.unread > 99 ? '99+' : subgroup.unread}
                  </div>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Resize Handle */}
        <div
          className="absolute top-0 right-0 w-1 h-full cursor-ew-resize hover:bg-blue-500 transition-colors"
          onMouseDown={handleMouseDown}
        />
      </div>
    );
  }

  // Expanded view
  return (
    <div 
      ref={sidebarRef}
      className="bg-gray-50 border-r border-gray-200 flex flex-col h-full relative"
      style={{ width: `${width}px`, minWidth: '200px', maxWidth: '400px' }}
    >
      {/* Group Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center space-x-3">
          <div className="relative w-10 h-10 flex-shrink-0">
            <Image 
              src={groupAvatar}
              alt={groupName}
              width={40}
              height={40}
              className="rounded-full object-cover w-full h-full"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-sm truncate">{groupName}</h3>
            <div className="flex items-center text-xs text-gray-500">
              <HiOutlineUserGroup size={12} className="mr-1" />
              <span>{memberCount} members</span>
            </div>
          </div>
          <button className="p-1 hover:bg-gray-100 rounded transition-colors">
            <HiOutlineCog6Tooth size={18} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Subgroups List */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-0">
          {subgroups.map((subgroup) => (
            <button
              key={subgroup.id}
              onClick={() => onSubgroupSelect(subgroup.id)}
              className={`w-full px-3 py-2 flex items-start hover:bg-gray-100 transition-colors border-b border-gray-100 ${
                selectedSubgroup === subgroup.id ? 'bg-blue-50 border-l-2 border-blue-500' : ''
              }`}
            >
              <div className="flex items-start space-x-2.5 flex-1 min-w-0">
                {/* Circular Avatar or First Letter */}
                {subgroup.avatar ? (
                  <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 shadow-md">
                    <Image 
                      src={subgroup.avatar}
                      alt={subgroup.name}
                      width={28}
                      height={28}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ) : (
                  <div 
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white font-semibold text-xs flex-shrink-0 shadow-md"
                    style={{ backgroundColor: subgroup.color }}
                  >
                    {subgroup.name[0].toUpperCase()}
                  </div>
                )}
                
                {/* Subgroup Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className={`text-sm font-medium truncate ${
                      selectedSubgroup === subgroup.id ? 'text-blue-600' : 'text-gray-900'
                    }`}>
                      {subgroup.name}
                    </span>
                    <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                      {subgroup.lastMessage?.time}
                    </span>
                  </div>
                  
                  {/* Last Message */}
                  {subgroup.lastMessage && subgroup.lastMessage.content && (
                    <div className="flex items-center text-xs text-gray-600 leading-tight">
                      {subgroup.lastMessage.sender && (
                        <span className="font-medium mr-1">{subgroup.lastMessage.sender}:</span>
                      )}
                      <span className="truncate">{subgroup.lastMessage.content}</span>
                    </div>
                  )}
                </div>
                
                {/* Unread Badge */}
                {subgroup.unread && subgroup.unread > 0 && (
                  <span className="bg-red-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full min-w-[18px] text-center flex-shrink-0">
                    {subgroup.unread > 99 ? '99+' : subgroup.unread}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-3 border-t border-gray-200 bg-white">
        <button className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm font-medium">
          <HiOutlinePlus size={16} />
          <span>Create Subgroup</span>
        </button>
      </div>

      {/* Resize Handle */}
      <div
        className="absolute top-0 right-0 w-1 h-full cursor-ew-resize hover:bg-blue-500 transition-colors"
        onMouseDown={handleMouseDown}
      />
    </div>
  );
}
