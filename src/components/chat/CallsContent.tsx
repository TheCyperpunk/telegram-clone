'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  HiOutlinePhone, 
  HiOutlineVideoCamera,
  HiOutlinePhoneArrowDownLeft,
  HiOutlinePhoneArrowUpRight,
  HiOutlinePhoneXMark,
  HiOutlineInformationCircle,
  HiOutlineMagnifyingGlass,
  HiOutlineBars3
} from 'react-icons/hi2';

interface CallRecord {
  id: string;
  name?: string;
  number: string;
  type: 'incoming' | 'outgoing' | 'missed';
  callType: 'voice' | 'video';
  timestamp: Date;
  duration?: string;
  avatar?: string;
  isUnknown?: boolean;
}

export default function CallsContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  // Mock call history data
  const callHistory: CallRecord[] = [
    // Recent calls with saved contacts
    {
      id: '1',
      name: 'John Doe',
      number: '+1 555 123-4567',
      type: 'incoming',
      callType: 'voice',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      duration: '5:23',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      number: '+1 555 987-6543',
      type: 'outgoing',
      callType: 'video',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      duration: '12:45',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60'
    },
    {
      id: '3',
      number: '+1 555 6646765',
      type: 'missed',
      callType: 'voice',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      isUnknown: true
    },
    {
      id: '4',
      name: 'Michael Chen',
      number: '+1 555 456-7890',
      type: 'incoming',
      callType: 'voice',
      timestamp: new Date(Date.now() - 10800000), // 3 hours ago
      duration: '2:15',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60'
    },
    {
      id: '5',
      number: '+1 555 5156789',
      type: 'incoming',
      callType: 'voice',
      timestamp: new Date(Date.now() - 14400000), // 4 hours ago
      duration: '1:32',
      isUnknown: true
    },
    {
      id: '6',
      number: '+1 555 5646765',
      type: 'missed',
      callType: 'voice',
      timestamp: new Date(Date.now() - 18000000), // 5 hours ago
      isUnknown: true
    },
    {
      id: '7',
      name: 'Emma Wilson',
      number: '+1 555 321-9876',
      type: 'outgoing',
      callType: 'video',
      timestamp: new Date(Date.now() - 21600000), // 6 hours ago
      duration: '8:30',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=60'
    },
    {
      id: '8',
      number: '+1 555 6646164',
      type: 'incoming',
      callType: 'voice',
      timestamp: new Date(Date.now() - 25200000), // 7 hours ago
      duration: '0:45',
      isUnknown: true
    },
    {
      id: '9',
      number: '+1 555 5152719',
      type: 'missed',
      callType: 'voice',
      timestamp: new Date(Date.now() - 28800000), // 8 hours ago
      isUnknown: true
    },
    {
      id: '10',
      number: '+1 555 5678889',
      type: 'incoming',
      callType: 'voice',
      timestamp: new Date(Date.now() - 86400000), // Yesterday
      duration: '3:21',
      isUnknown: true
    },
    {
      id: '11',
      number: '+1 555 5156987',
      type: 'outgoing',
      callType: 'voice',
      timestamp: new Date(Date.now() - 172800000), // 2 days ago
      duration: '1:15',
      isUnknown: true
    },
    {
      id: '12',
      name: 'David Park',
      number: '+1 555 6575676',
      type: 'incoming',
      callType: 'voice',
      timestamp: new Date(Date.now() - 259200000), // 3 days ago
      duration: '4:52',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60'
    },
    {
      id: '13',
      number: '+1 555 5146183',
      type: 'missed',
      callType: 'voice',
      timestamp: new Date(Date.now() - 345600000), // 4 days ago
      isUnknown: true
    }
  ];

  const filteredCalls = callHistory.filter(call => 
    call.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    call.number.includes(searchQuery)
  );

  const getCallIcon = (call: CallRecord) => {
    const iconClass = call.type === 'missed' ? 'text-red-500' : 
                     call.type === 'incoming' ? 'text-green-500' : 'text-blue-500';
    
    if (call.type === 'incoming') {
      return <HiOutlinePhoneArrowDownLeft size={16} className={iconClass} />;
    } else if (call.type === 'outgoing') {
      return <HiOutlinePhoneArrowUpRight size={16} className={iconClass} />;
    } else {
      return <HiOutlinePhoneXMark size={16} className={iconClass} />;
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
      return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} days ago`;
    }
  };

  const getDisplayName = (call: CallRecord) => {
    if (call.isUnknown) {
      return call.number;
    }
    return call.name || call.number;
  };

  const getSubtitle = (call: CallRecord) => {
    if (call.isUnknown) {
      return formatTimestamp(call.timestamp);
    }
    
    const timeStr = formatTimestamp(call.timestamp);
    if (call.duration) {
      return `${timeStr} • ${call.duration}`;
    }
    return timeStr;
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header with Menu and Search */}
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
              placeholder="Search or start a new chat"
              className="flex-1 py-2 pr-3 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Dropdown Menu */}
      {showMenu && (
        <div ref={menuRef} className="absolute top-14 left-3 bg-white border border-gray-200 rounded-lg shadow-lg z-50 w-56">
          <div className="py-2">
            <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center">
              <HiOutlinePhone className="mr-3" size={16} />
              New Call
            </button>
            <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center">
              <HiOutlineVideoCamera className="mr-3" size={16} />
              New Video Call
            </button>
            <div className="border-t border-gray-100 my-1"></div>
            <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center">
              <HiOutlineBars3 className="mr-3" size={16} />
              Call History
            </button>
            <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center">
              <HiOutlineInformationCircle className="mr-3" size={16} />
              Call Settings
            </button>
          </div>
        </div>
      )}

      {/* Calls List */}
      <div className="flex-1 overflow-y-auto">
        {filteredCalls.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <HiOutlinePhone size={48} className="mb-4 text-gray-300" />
            <h3 className="text-lg font-medium mb-2">No calls found</h3>
            <p className="text-sm text-center">Your call history will appear here</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredCalls.map((call) => (
              <div key={call.id} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="relative">
                    {call.avatar && !call.isUnknown ? (
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <Image 
                          src={call.avatar} 
                          alt={call.name || call.number}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {call.isUnknown ? '?' : (call.name?.[0] || call.number[0])}
                      </div>
                    )}
                  </div>

                  {/* Call Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-medium truncate ${call.type === 'missed' ? 'text-red-600' : 'text-gray-900'}`}>
                        {getDisplayName(call)}
                      </h3>
                      {call.isUnknown && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                          Unknown
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {getCallIcon(call)}
                      <p className="text-sm text-gray-500 truncate">
                        {getSubtitle(call)}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <HiOutlinePhone size={20} className="text-green-600" />
                    </button>
                    {call.callType === 'video' && (
                      <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <HiOutlineVideoCamera size={20} className="text-blue-600" />
                      </button>
                    )}
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <HiOutlineInformationCircle size={20} className="text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
