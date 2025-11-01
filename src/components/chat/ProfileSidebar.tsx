'use client';

import { useState } from 'react';
import Image from 'next/image';
import { 
  HiOutlinePhone, 
  HiOutlineVideoCamera, 
  HiOutlineEllipsisVertical,
  HiOutlineBell,
  HiOutlineUserMinus,
  HiOutlineArchiveBox,
  HiOutlineExclamationTriangle,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
  HiOutlineDocument,
  HiOutlinePhoto,
  HiOutlineLink,
  HiOutlineMusicalNote
} from 'react-icons/hi2';

interface ProfileSidebarProps {
  isVisible: boolean;
  onClose: () => void;
  contact: {
    name: string;
    username?: string;
    phone?: string;
    bio?: string;
    avatar?: string;
    isOnline?: boolean;
    lastSeen?: string;
    mutualContacts?: number;
  };
}

export default function ProfileSidebar({ isVisible, onClose, contact }: ProfileSidebarProps) {
  const [showMedia, setShowMedia] = useState(true);
  const [showFiles, setShowFiles] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  const [showMusic, setShowMusic] = useState(false);

  // Mock media data
  const mediaItems = [
    { id: 1, type: 'image', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop', date: '2 days ago' },
    { id: 2, type: 'image', url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=150&h=150&fit=crop', date: '3 days ago' },
    { id: 3, type: 'image', url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=150&h=150&fit=crop', date: '1 week ago' },
    { id: 4, type: 'image', url: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=150&h=150&fit=crop', date: '1 week ago' },
    { id: 5, type: 'image', url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=150&h=150&fit=crop', date: '2 weeks ago' },
    { id: 6, type: 'image', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=150&h=150&fit=crop', date: '2 weeks ago' },
  ];

  const fileItems = [
    { id: 1, name: 'Project_Proposal.pdf', size: '2.4 MB', date: '3 days ago', type: 'pdf' },
    { id: 2, name: 'Meeting_Notes.docx', size: '1.2 MB', date: '1 week ago', type: 'doc' },
    { id: 3, name: 'Budget_2024.xlsx', size: '856 KB', date: '2 weeks ago', type: 'excel' },
  ];

  const linkItems = [
    { id: 1, title: 'GitHub Repository', url: 'https://github.com/user/project', date: '2 days ago' },
    { id: 2, title: 'Design System Documentation', url: 'https://figma.com/design-system', date: '1 week ago' },
    { id: 3, title: 'API Documentation', url: 'https://api-docs.example.com', date: '2 weeks ago' },
  ];

  const musicItems = [
    { id: 1, title: 'Bohemian Rhapsody', artist: 'Queen', duration: '5:55', date: '1 day ago' },
    { id: 2, title: 'Imagine', artist: 'John Lennon', duration: '3:07', date: '3 days ago' },
    { id: 3, title: 'Hotel California', artist: 'Eagles', duration: '6:30', date: '1 week ago' },
  ];

  if (!isVisible) return null;

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Contact Info</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <HiOutlineEllipsisVertical size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Profile Section */}
        <div className="text-center mb-6">
          <div className="relative inline-block mb-4">
            {contact.avatar ? (
              <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-blue-100 shadow-lg">
                <Image 
                  src={contact.avatar} 
                  alt={contact.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                {contact.name[0]?.toUpperCase()}
              </div>
            )}
            {contact.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-3 border-white rounded-full"></div>
            )}
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-1">{contact.name}</h3>
          {contact.username && (
            <p className="text-sm text-gray-500 mb-2">@{contact.username}</p>
          )}
          <p className="text-sm text-gray-500">
            {contact.isOnline ? 'online' : contact.lastSeen ? `last seen ${contact.lastSeen}` : 'offline'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          <button className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2 hover:bg-green-200 transition-colors">
              <HiOutlinePhone size={20} className="text-green-600" />
            </div>
            <span className="text-xs text-gray-600">Call</span>
          </button>
          <button className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2 hover:bg-blue-200 transition-colors">
              <HiOutlineVideoCamera size={20} className="text-blue-600" />
            </div>
            <span className="text-xs text-gray-600">Video</span>
          </button>
        </div>

        {/* Bio */}
        {contact.bio && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Bio</h4>
            <p className="text-sm text-gray-600 leading-relaxed">{contact.bio}</p>
          </div>
        )}

        {/* Contact Details */}
        <div className="space-y-3">
          {contact.phone && (
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-1">Phone</h4>
              <p className="text-sm text-blue-600 cursor-pointer hover:underline">{contact.phone}</p>
            </div>
          )}
          {contact.mutualContacts && (
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-1">Mutual Contacts</h4>
              <p className="text-sm text-gray-600">{contact.mutualContacts} contacts</p>
            </div>
          )}
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-6">
        {/* Settings */}
        <div className="p-4 border-b border-gray-100">
          <div className="space-y-2">
            <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left">
              <HiOutlineBell size={20} className="text-gray-600" />
              <span className="text-sm text-gray-700">Notifications</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left">
              <HiOutlineArchiveBox size={20} className="text-gray-600" />
              <span className="text-sm text-gray-700">Archive Chat</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left">
              <HiOutlineUserMinus size={20} className="text-red-500" />
              <span className="text-sm text-red-500">Block Contact</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left">
              <HiOutlineExclamationTriangle size={20} className="text-red-500" />
              <span className="text-sm text-red-500">Report Contact</span>
            </button>
          </div>
        </div>

        {/* Media Section */}
        <div className="border-b border-gray-100">
          <button 
            onClick={() => setShowMedia(!showMedia)}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <HiOutlinePhoto size={20} className="text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Media</span>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {mediaItems.length}
              </span>
            </div>
            {showMedia ? <HiOutlineChevronUp size={16} /> : <HiOutlineChevronDown size={16} />}
          </button>
          
          {showMedia && (
            <div className="px-4 pb-4">
              <div className="grid grid-cols-3 gap-2">
                {mediaItems.map((item) => (
                  <div key={item.id} className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                    <Image 
                      src={item.url} 
                      alt="Media"
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              {mediaItems.length > 6 && (
                <button className="w-full mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View All Media
                </button>
              )}
            </div>
          )}
        </div>

        {/* Files Section */}
        <div className="border-b border-gray-100">
          <button 
            onClick={() => setShowFiles(!showFiles)}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <HiOutlineDocument size={20} className="text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Files</span>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {fileItems.length}
              </span>
            </div>
            {showFiles ? <HiOutlineChevronUp size={16} /> : <HiOutlineChevronDown size={16} />}
          </button>
          
          {showFiles && (
            <div className="px-4 pb-4 space-y-2">
              {fileItems.map((file) => (
                <div key={file.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <HiOutlineDocument size={20} className="text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                    <p className="text-xs text-gray-500">{file.size} • {file.date}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Links Section */}
        <div className="border-b border-gray-100">
          <button 
            onClick={() => setShowLinks(!showLinks)}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <HiOutlineLink size={20} className="text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Links</span>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {linkItems.length}
              </span>
            </div>
            {showLinks ? <HiOutlineChevronUp size={16} /> : <HiOutlineChevronDown size={16} />}
          </button>
          
          {showLinks && (
            <div className="px-4 pb-4 space-y-2">
              {linkItems.map((link) => (
                <div key={link.id} className="p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <p className="text-sm font-medium text-blue-600 hover:underline truncate">{link.title}</p>
                  <p className="text-xs text-gray-500 truncate">{link.url}</p>
                  <p className="text-xs text-gray-400">{link.date}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Music Section */}
        <div>
          <button 
            onClick={() => setShowMusic(!showMusic)}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <HiOutlineMusicalNote size={20} className="text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Music</span>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {musicItems.length}
              </span>
            </div>
            {showMusic ? <HiOutlineChevronUp size={16} /> : <HiOutlineChevronDown size={16} />}
          </button>
          
          {showMusic && (
            <div className="px-4 pb-4 space-y-2">
              {musicItems.map((music) => (
                <div key={music.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <HiOutlineMusicalNote size={20} className="text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{music.title}</p>
                    <p className="text-xs text-gray-500">{music.artist} • {music.duration}</p>
                  </div>
                  <span className="text-xs text-gray-400">{music.date}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
