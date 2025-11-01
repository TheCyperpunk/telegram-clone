'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FiSearch, FiDownload, FiPlay, FiFile, FiImage, FiVideo, FiMusic, FiMessageSquare, FiLink, FiPaperclip, FiMic, FiPause } from 'react-icons/fi';

interface SavedMessage {
  id: string;
  type: 'text' | 'photo' | 'video' | 'document' | 'audio' | 'link' | 'photo_set' | 'video_set';
  content: string;
  url?: string;
  fileName?: string;
  fileSize?: string;
  duration?: string;
  timestamp: string;
  time: string;
  date?: string;
  thumbnail?: string;
  photos?: string[];
  videos?: { url: string; thumbnail: string; duration: string }[];
  linkPreview?: {
    title: string;
    description: string;
    image?: string;
    domain: string;
  };
}

// Sample saved messages data organized by date
const savedMessagesByDate: Record<string, SavedMessage[]> = {
  'Today': [
    {
      id: '1',
      type: 'photo_set' as const,
      content: 'Mountain hiking adventure - 6 photos',
      timestamp: '11:45 PM',
      time: '11:45 PM',
      photos: [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&auto=format&fit=crop&q=60',
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&auto=format&fit=crop&q=60',
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&auto=format&fit=crop&q=60',
        'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=300&auto=format&fit=crop&q=60',
        'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=300&auto=format&fit=crop&q=60',
        'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=300&auto=format&fit=crop&q=60'
      ]
    },
    {
      id: '2',
      type: 'text' as const,
      content: 'Don\'t forget to submit the project report by tomorrow evening. The deadline is 6 PM sharp!',
      timestamp: '10:30 PM',
      time: '10:30 PM'
    },
    {
      id: '3',
      type: 'audio' as const,
      content: 'Voice message about weekend plans',
      duration: '1:23',
      timestamp: '9:15 PM',
      time: '9:15 PM'
    }
  ],
  'Yesterday': [
    {
      id: '4',
      type: 'video_set' as const,
      content: 'Programming tutorials - 4 videos',
      timestamp: '8:22 PM',
      time: '8:22 PM',
      videos: [
        {
          url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60',
          thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&auto=format&fit=crop&q=60',
          duration: '12:34'
        },
        {
          url: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop&q=60',
          thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=300&auto=format&fit=crop&q=60',
          duration: '18:22'
        },
        {
          url: 'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=800&auto=format&fit=crop&q=60',
          thumbnail: 'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=300&auto=format&fit=crop&q=60',
          duration: '8:45'
        },
        {
          url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&auto=format&fit=crop&q=60',
          thumbnail: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&auto=format&fit=crop&q=60',
          duration: '15:12'
        }
      ]
    },
    {
      id: '5',
      type: 'document' as const,
      content: 'Meeting_Notes_Sept_27.pdf',
      fileName: 'Meeting_Notes_Sept_27.pdf',
      fileSize: '1.2 MB',
      timestamp: '7:45 PM',
      time: '7:45 PM'
    },
    {
      id: '6',
      type: 'photo' as const,
      content: 'Team dinner photos',
      url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=60',
      thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&auto=format&fit=crop&q=60',
      timestamp: '6:30 PM',
      time: '6:30 PM'
    },
    {
      id: '7',
      type: 'link' as const,
      content: 'https://github.com/facebook/react',
      timestamp: '5:15 PM',
      time: '5:15 PM',
      linkPreview: {
        title: 'React - A JavaScript library for building user interfaces',
        description: 'React makes it painless to create interactive UIs. Design simple views for each state in your application.',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=200&auto=format&fit=crop&q=60',
        domain: 'github.com'
      }
    }
  ],
  'September 26': [
    {
      id: '8',
      type: 'photo' as const,
      content: 'Beach vacation photos',
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=60',
      thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&auto=format&fit=crop&q=60',
      timestamp: '1:41 AM',
      time: '1:41 AM'
    },
    {
      id: '9',
      type: 'video' as const,
      content: 'Funny cat compilation',
      url: 'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=800&auto=format&fit=crop&q=60',
      thumbnail: 'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=300&auto=format&fit=crop&q=60',
      duration: '3:45',
      timestamp: '10:20 PM',
      time: '10:20 PM'
    },
    {
      id: '10',
      type: 'document' as const,
      content: 'image 2025-09-25_22-20-27.png',
      fileName: 'image 2025-09-25_22-20-27.png',
      fileSize: '93.6 KB',
      timestamp: '10:20 PM',
      time: '10:20 PM'
    },
    {
      id: '11',
      type: 'link' as const,
      content: 'https://meet.google.com/qab-spue-rfg',
      timestamp: '6:51 PM',
      time: '6:51 PM',
      linkPreview: {
        title: 'Google Meet',
        description: 'Real-time meetings by Google. Using your browser, share your video, desktop, and presentations with teammates and customers.',
        image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&auto=format&fit=crop&q=60',
        domain: 'meet.google.com'
      }
    },
    {
      id: '12',
      type: 'text' as const,
      content: 'Tomorrow 6 AM\nPlease join on time\n\nDon\'t forget to bring your laptops and chargers.',
      timestamp: '6:29 PM',
      time: '6:29 PM'
    },
    {
      id: '13',
      type: 'audio' as const,
      content: 'Important announcement',
      duration: '2:45',
      timestamp: '5:45 PM',
      time: '5:45 PM'
    }
  ],
  'September 25': [
    {
      id: '14',
      type: 'photo' as const,
      content: 'Sunset at the park',
      url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&auto=format&fit=crop&q=60',
      thumbnail: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&auto=format&fit=crop&q=60',
      timestamp: '7:30 PM',
      time: '7:30 PM'
    },
    {
      id: '15',
      type: 'video' as const,
      content: 'JavaScript ES6 Features',
      url: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop&q=60',
      thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=300&auto=format&fit=crop&q=60',
      duration: '18:22',
      timestamp: '4:15 PM',
      time: '4:15 PM'
    },
    {
      id: '16',
      type: 'document' as const,
      content: 'Project_Proposal_Final.docx',
      fileName: 'Project_Proposal_Final.docx',
      fileSize: '2.8 MB',
      timestamp: '2:30 PM',
      time: '2:30 PM'
    },
    {
      id: '17',
      type: 'text' as const,
      content: 'Great job on the presentation today! The client was really impressed with our work. Let\'s celebrate this weekend! 🎉',
      timestamp: '1:45 PM',
      time: '1:45 PM'
    },
    {
      id: '18',
      type: 'link' as const,
      content: 'https://tailwindcss.com/docs',
      timestamp: '11:30 AM',
      time: '11:30 AM',
      linkPreview: {
        title: 'Tailwind CSS Documentation',
        description: 'A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=200&auto=format&fit=crop&q=60',
        domain: 'tailwindcss.com'
      }
    },
    {
      id: '19',
      type: 'audio' as const,
      content: 'Meeting recording - Q3 Review',
      duration: '45:12',
      timestamp: '10:00 AM',
      time: '10:00 AM'
    }
  ],
  'September 24': [
    {
      id: '20',
      type: 'photo' as const,
      content: 'Coffee shop vibes',
      url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop&q=60',
      thumbnail: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&auto=format&fit=crop&q=60',
      timestamp: '9:45 AM',
      time: '9:45 AM'
    },
    {
      id: '21',
      type: 'video' as const,
      content: 'Travel vlog - Paris highlights',
      url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&auto=format&fit=crop&q=60',
      thumbnail: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&auto=format&fit=crop&q=60',
      duration: '8:56',
      timestamp: '8:20 AM',
      time: '8:20 AM'
    },
    {
      id: '22',
      type: 'document' as const,
      content: 'Budget_Analysis_Q3.xlsx',
      fileName: 'Budget_Analysis_Q3.xlsx',
      fileSize: '456 KB',
      timestamp: '7:15 AM',
      time: '7:15 AM'
    }
  ]
};

export default function SavedMessages() {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [audioProgress, setAudioProgress] = useState<{ [key: string]: number }>({});

  const filterTypes = [
    { id: 'All', label: 'All', icon: FiMessageSquare },
    { id: 'Text', label: 'Text', icon: FiMessageSquare },
    { id: 'Photos', label: 'Photos', icon: FiImage },
    { id: 'Videos', label: 'Videos', icon: FiVideo },
    { id: 'Documents', label: 'Documents', icon: FiFile },
    { id: 'Audio', label: 'Audio', icon: FiMusic }
  ];

  // Audio control functions
  const toggleAudio = (audioId: string) => {
    if (playingAudio === audioId) {
      setPlayingAudio(null);
    } else {
      setPlayingAudio(audioId);
      // Simulate audio progress
      if (!audioProgress[audioId]) {
        setAudioProgress(prev => ({ ...prev, [audioId]: 0 }));
        const interval = setInterval(() => {
          setAudioProgress(prev => {
            const currentProgress = prev[audioId] || 0;
            if (currentProgress >= 100) {
              clearInterval(interval);
              setPlayingAudio(null);
              return prev;
            }
            return { ...prev, [audioId]: currentProgress + 2 };
          });
        }, 100);
      }
    }
  };

  // Flatten all messages for filtering
  const allMessages = Object.entries(savedMessagesByDate).flatMap(([date, messages]) => 
    messages.map(msg => ({ ...msg, date }))
  );

  const filteredMessages = allMessages.filter(item => {
    const matchesFilter = activeFilter === 'All' || 
      (activeFilter === 'Text' && item.type === 'text') ||
      (activeFilter === 'Photos' && (item.type === 'photo' || item.type === 'photo_set')) ||
      (activeFilter === 'Videos' && (item.type === 'video' || item.type === 'video_set')) ||
      (activeFilter === 'Documents' && item.type === 'document') ||
      (activeFilter === 'Audio' && item.type === 'audio');
    
    const matchesSearch = item.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Group filtered messages by date
  const groupedFilteredMessages = filteredMessages.reduce((acc, msg) => {
    const date = msg.date!;
    if (!acc[date]) acc[date] = [];
    acc[date].push(msg);
    return acc;
  }, {} as Record<string, SavedMessage[]>);

  const renderMessage = (message: SavedMessage) => {
    const isPlaying = playingAudio === message.id;
    const progress = audioProgress[message.id] || 0;

    return (
      <div key={message.id} className="flex items-start space-x-3 py-3 px-4 hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-purple-50/30 group transition-all duration-200 rounded-3xl">
        {/* Message Content */}
        <div className="flex-grow min-w-0">
          <div className="max-w-md">
            {message.type === 'text' && (
              <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-3xl p-4 shadow-lg border-2 border-gray-200/60 backdrop-blur-sm">
                <p className="text-gray-900 text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
              </div>
            )}

            {message.type === 'photo' && (
              <div className="relative group/photo">
                <div className="w-72 h-52 rounded-3xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-xl ring-2 ring-gray-200/50 border-2 border-white/50">
                  <Image
                    src={message.thumbnail || message.url || ''}
                    alt={message.content}
                    fill
                    className="object-cover transition-transform duration-300 group-hover/photo:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300" />
                </div>
                {message.content && (
                  <p className="text-sm text-gray-600 mt-2 font-medium">{message.content}</p>
                )}
              </div>
            )}

            {message.type === 'photo_set' && (
              <div className="relative group/photoset">
                <div className="bg-gradient-to-br from-white to-purple-50/30 rounded-3xl p-4 shadow-xl border-2 border-purple-200/60 backdrop-blur-sm">
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {message.photos?.slice(0, 6).map((photo, index) => (
                      <div key={index} className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 ring-1 ring-gray-200/50">
                        <Image
                          src={photo}
                          alt={`Photo ${index + 1}`}
                          fill
                          className="object-cover transition-transform duration-300 group-hover/photoset:scale-105"
                        />
                        {index === 5 && message.photos && message.photos.length > 6 && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">+{message.photos.length - 6}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-700 font-medium">{message.content}</p>
                </div>
              </div>
            )}

            {message.type === 'video_set' && (
              <div className="relative group/videoset">
                <div className="bg-gradient-to-br from-white to-red-50/30 rounded-3xl p-4 shadow-xl border-2 border-red-200/60 backdrop-blur-sm">
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    {message.videos?.slice(0, 4).map((video, index) => (
                      <div key={index} className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 ring-1 ring-gray-200/50">
                        <Image
                          src={video.thumbnail}
                          alt={`Video ${index + 1}`}
                          fill
                          className="object-cover transition-transform duration-300 group-hover/videoset:scale-105"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <div className="w-8 h-8 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                            <FiPlay className="text-gray-800 text-sm ml-0.5" />
                          </div>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm text-white text-xs px-1.5 py-0.5 rounded-full font-medium">
                          {video.duration}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-700 font-medium">{message.content}</p>
                </div>
              </div>
            )}

            {message.type === 'video' && (
              <div className="relative group/video">
                <div className="w-72 h-52 rounded-3xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-xl ring-2 ring-gray-200/50 border-2 border-white/50 relative">
                  <Image
                    src={message.thumbnail || ''}
                    alt={message.content}
                    fill
                    className="object-cover transition-transform duration-300 group-hover/video:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover/video:bg-black/30 transition-colors duration-300">
                    <div className="w-14 h-14 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg ring-1 ring-white/20 group-hover/video:scale-110 transition-transform duration-300">
                      <FiPlay className="text-gray-800 text-xl ml-1" />
                    </div>
                  </div>
                  {message.duration && (
                    <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full font-medium">
                      {message.duration}
                    </div>
                  )}
                </div>
                {message.content && (
                  <p className="text-sm text-gray-600 mt-2 font-medium">{message.content}</p>
                )}
              </div>
            )}

            {message.type === 'document' && (
              <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-3xl p-4 shadow-xl border-2 border-blue-200/60 max-w-xs backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center shadow-sm">
                    <FiFile className="text-blue-600 text-lg" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{message.fileName}</p>
                    <p className="text-xs text-gray-500 font-medium">{message.fileSize}</p>
                    <button className="text-xs text-blue-600 hover:text-blue-800 mt-1.5 font-medium tracking-wide">OPEN WITH</button>
                  </div>
                </div>
              </div>
            )}

            {message.type === 'link' && (
              <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-3xl shadow-xl border-2 border-gray-200/60 max-w-sm overflow-hidden backdrop-blur-sm">
                <div className="p-4">
                  <p className="text-sm text-blue-600 break-all mb-3 font-medium">{message.content}</p>
                </div>
                {message.linkPreview && (
                  <div className="border-t-2 border-gray-200/60">
                    {message.linkPreview.image && (
                      <div className="h-36 bg-gradient-to-br from-gray-100 to-gray-200">
                        <Image
                          src={message.linkPreview.image}
                          alt={message.linkPreview.title}
                          width={400}
                          height={144}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 text-sm mb-2 leading-tight">{message.linkPreview.title}</h4>
                      <p className="text-xs text-gray-600 mb-3 leading-relaxed">{message.linkPreview.description}</p>
                      <p className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded-full inline-block">{message.linkPreview.domain}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {message.type === 'audio' && (
              <div className="bg-gradient-to-br from-white to-green-50/30 rounded-3xl p-4 shadow-xl border-2 border-green-200/60 max-w-xs backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => toggleAudio(message.id)}
                    className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center shadow-sm hover:scale-105 transition-transform duration-200"
                  >
                    {isPlaying ? (
                      <FiPause className="text-green-600 text-lg" />
                    ) : (
                      <FiPlay className="text-green-600 text-lg ml-0.5" />
                    )}
                  </button>
                  <div className="flex-grow">
                    <div className="flex items-center space-x-3">
                      <div className="flex-grow h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded-full">{message.duration}</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-2 font-medium">{message.content}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Timestamp */}
        <div className="flex-shrink-0 text-xs text-gray-500 mt-1 font-medium bg-gradient-to-r from-gray-100/80 to-gray-200/80 px-3 py-1.5 rounded-full shadow-sm">
          {message.time}
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Compact Filter tabs */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/60 p-3 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex space-x-1 bg-gray-100/80 rounded-full p-1 backdrop-blur-sm">
            {filterTypes.map((filter) => {
              const IconComponent = filter.icon;
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    activeFilter === filter.id
                      ? 'bg-white text-blue-600 shadow-sm ring-1 ring-blue-100'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                  }`}
                >
                  <IconComponent className="text-xs" />
                  <span className="hidden sm:inline">{filter.label}</span>
                </button>
              );
            })}
          </div>
          
          {/* Search Icon */}
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
            <FiSearch className="text-gray-600 text-lg" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {Object.keys(groupedFilteredMessages).length > 0 ? (
          <div className="pb-6">
            {Object.entries(groupedFilteredMessages).map(([date, messages]) => (
              <div key={date} className="mb-6">
                {/* Date separator */}
                <div className="flex items-center justify-center py-6">
                  <div className="bg-gradient-to-r from-blue-100 to-purple-100 text-gray-700 text-xs px-4 py-2 rounded-full font-semibold shadow-sm ring-1 ring-gray-200/50 backdrop-blur-sm">
                    {date}
                  </div>
                </div>
                
                {/* Messages for this date */}
                <div className="space-y-2">
                  {messages.map(renderMessage)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4 shadow-sm">
              <FiMessageSquare className="text-2xl text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-700">No saved messages found</h3>
            <p className="text-sm text-center text-gray-500 max-w-xs leading-relaxed">
              {searchQuery ? 'Try adjusting your search terms or clear the filter' : 'Start saving messages from your chats to see them here'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
