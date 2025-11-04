'use client';

import { useState } from 'react';
import { HiPhoto, HiVideoCamera, HiPlay, HiDocument, HiXMark, HiLink, HiFolder, HiMusicalNote } from 'react-icons/hi2';
import { HiOutlineHeart, HiOutlineBookmark, HiOutlineShare } from 'react-icons/hi2';
import Image from 'next/image';

interface MediaGalleryProps {
  channelName: string;
  onClose: () => void;
}

export default function MediaGallery({ channelName, onClose }: MediaGalleryProps) {
  const [activeTab, setActiveTab] = useState<'photos' | 'videos' | 'shorts' | 'articles' | 'links' | 'files' | 'audios'>('photos');

  // Mock data for different media types
  const mediaData = {
    photos: [
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&auto=format&fit=crop&q=60'
    ],
    videos: [
      'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&auto=format&fit=crop&q=60'
    ],
    shorts: [
      'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&auto=format&fit=crop&q=60'
    ],
    articles: [
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1486312338219-ce68e2c6b696?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&auto=format&fit=crop&q=60'
    ],
    links: [
      { url: 'https://github.com/vercel/next.js', title: 'Next.js - The React Framework', description: 'Production-ready React framework with hybrid static & server rendering', favicon: '🚀' },
      { url: 'https://tailwindcss.com', title: 'Tailwind CSS', description: 'A utility-first CSS framework for rapid UI development', favicon: '🎨' },
      { url: 'https://react.dev', title: 'React Documentation', description: 'Learn React - A JavaScript library for building user interfaces', favicon: '⚛️' },
      { url: 'https://typescript.org', title: 'TypeScript', description: 'TypeScript extends JavaScript by adding types', favicon: '📘' },
      { url: 'https://nodejs.org', title: 'Node.js', description: 'JavaScript runtime built on Chrome V8 JavaScript engine', favicon: '💚' }
    ],
    files: [
      { name: 'Project_Requirements.pdf', size: '2.4 MB', type: 'PDF', date: '2 hours ago', icon: '📄' },
      { name: 'Design_Mockups.sketch', size: '15.7 MB', type: 'Sketch', date: '1 day ago', icon: '🎨' },
      { name: 'API_Documentation.docx', size: '1.2 MB', type: 'Word', date: '3 days ago', icon: '📝' },
      { name: 'Database_Schema.sql', size: '856 KB', type: 'SQL', date: '1 week ago', icon: '🗄️' },
      { name: 'User_Guide.zip', size: '4.3 MB', type: 'Archive', date: '1 week ago', icon: '📦' },
      { name: 'Screenshots.zip', size: '12.1 MB', type: 'Archive', date: '2 weeks ago', icon: '📸' },
      { name: 'Meeting_Notes.txt', size: '45 KB', type: 'Text', date: '3 weeks ago', icon: '📋' }
    ],
    audios: [
      { name: 'Tech Podcast Episode 1.mp3', artist: 'Tech News Team', duration: '45:32', size: '32.1 MB', date: '1 hour ago', icon: '🎵' },
      { name: 'Interview with CEO.wav', artist: 'Business Talk', duration: '28:15', size: '156.7 MB', date: '6 hours ago', icon: '🎙️' },
      { name: 'Background Music.mp3', artist: 'Audio Library', duration: '3:42', size: '8.9 MB', date: '2 days ago', icon: '🎶' },
      { name: 'Voice Note - Ideas.m4a', artist: 'Team Discussion', duration: '2:18', size: '3.2 MB', date: '3 days ago', icon: '🗣️' },
      { name: 'Conference Call Recording.mp3', artist: 'Meeting Audio', duration: '1:12:45', size: '67.4 MB', date: '1 week ago', icon: '📞' },
      { name: 'Product Demo Audio.wav', artist: 'Marketing Team', duration: '15:30', size: '89.2 MB', date: '2 weeks ago', icon: '📢' }
    ]
  };

  // Category highlights data
  const highlights = [
    { name: 'Photos', icon: HiPhoto },
    { name: 'Videos', icon: HiVideoCamera },
    { name: 'Short Videos', icon: HiPlay },
    { name: 'Articles', icon: HiDocument },
    { name: 'Shared Links', icon: HiOutlineShare },
    { name: 'Favorites', icon: HiOutlineHeart },
    { name: 'Saved', icon: HiOutlineBookmark }
  ];

  const currentMedia = mediaData[activeTab] || [];

  return (
    <div className="bg-white h-full flex flex-col">
      <div className="flex-1 overflow-y-auto">
        {/* Stats Section */}
        <div className="px-6 py-4">
          <div className="flex items-center justify-center gap-8 mb-4">
            <div className="text-center">
              <div className="text-2xl font-semibold text-gray-900">{mediaData.photos.length + mediaData.videos.length + mediaData.shorts.length + mediaData.articles.length + mediaData.links.length + mediaData.files.length + mediaData.audios.length}</div>
              <div className="text-sm text-gray-500">media files</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-gray-900">12.5K</div>
              <div className="text-sm text-gray-500">subscribers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-gray-900">1.2K</div>
              <div className="text-sm text-gray-500">views today</div>
            </div>
          </div>
        </div>


        {/* Tab Navigation */}
        <div className="border-t border-gray-200">
          <div className="flex px-6">
            <button
              onClick={() => setActiveTab('photos')}
              className={`flex-1 py-3 text-center border-b-2 transition-colors ${
                activeTab === 'photos'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-400'
              }`}
            >
              <div className="text-xs font-medium tracking-wide flex items-center justify-center gap-1">
                <HiPhoto size={14} />
                PHOTOS ({mediaData.photos.length})
              </div>
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`flex-1 py-3 text-center border-b-2 transition-colors ${
                activeTab === 'videos'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-400'
              }`}
            >
              <div className="text-xs font-medium tracking-wide flex items-center justify-center gap-1">
                <HiVideoCamera size={14} />
                VIDEOS ({mediaData.videos.length})
              </div>
            </button>
            <button
              onClick={() => setActiveTab('shorts')}
              className={`flex-1 py-3 text-center border-b-2 transition-colors ${
                activeTab === 'shorts'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-400'
              }`}
            >
              <div className="text-xs font-medium tracking-wide flex items-center justify-center gap-1">
                <HiPlay size={14} />
                SHORTS ({mediaData.shorts.length})
              </div>
            </button>
            <button
              onClick={() => setActiveTab('articles')}
              className={`flex-1 py-3 text-center border-b-2 transition-colors ${
                activeTab === 'articles'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-400'
              }`}
            >
              <div className="text-xs font-medium tracking-wide flex items-center justify-center gap-1">
                <HiDocument size={14} />
                ARTICLES ({mediaData.articles.length})
              </div>
            </button>
            <button
              onClick={() => setActiveTab('links')}
              className={`flex-1 py-3 text-center border-b-2 transition-colors ${
                activeTab === 'links'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-400'
              }`}
            >
              <div className="text-xs font-medium tracking-wide flex items-center justify-center gap-1">
                <HiLink size={14} />
                LINKS ({mediaData.links.length})
              </div>
            </button>
            <button
              onClick={() => setActiveTab('files')}
              className={`flex-1 py-3 text-center border-b-2 transition-colors ${
                activeTab === 'files'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-400'
              }`}
            >
              <div className="text-xs font-medium tracking-wide flex items-center justify-center gap-1">
                <HiFolder size={14} />
                FILES ({mediaData.files.length})
              </div>
            </button>
            <button
              onClick={() => setActiveTab('audios')}
              className={`flex-1 py-3 text-center border-b-2 transition-colors ${
                activeTab === 'audios'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-400'
              }`}
            >
              <div className="text-xs font-medium tracking-wide flex items-center justify-center gap-1">
                <HiMusicalNote size={14} />
                AUDIOS ({mediaData.audios.length})
              </div>
            </button>
          </div>
        </div>

        {/* Media Grid */}
        <div className="px-6 py-4">
          {currentMedia.length > 0 ? (
            <div className={`grid gap-2 ${
              activeTab === 'photos' ? 'grid-cols-4' : 
              activeTab === 'shorts' ? 'grid-cols-4' : 
              activeTab === 'videos' ? 'grid-cols-3' : 
              activeTab === 'links' ? 'grid-cols-2' :
              activeTab === 'files' ? 'grid-cols-4' :
              activeTab === 'audios' ? 'grid-cols-4' :
              'grid-cols-4'
            }`}>
              {currentMedia.map((media, index) => {
                // Handle different media types
                if (activeTab === 'links' && typeof media === 'object' && 'url' in media) {
                  return (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-start gap-3">
                        <HiLink size={24} className="text-gray-600 flex-shrink-0 mt-1" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm text-gray-900 truncate">{media.title}</h4>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{media.description}</p>
                          <p className="text-xs text-blue-600 mt-2 truncate">{media.url}</p>
                        </div>
                      </div>
                    </div>
                  );
                }
                
                if (activeTab === 'files' && typeof media === 'object' && 'name' in media && 'type' in media) {
                  return (
                    <div key={index} className="aspect-square bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer flex flex-col items-center justify-center text-center">
                      <HiFolder size={32} className="text-gray-600 mb-2" />
                      <h4 className="font-medium text-xs text-gray-900 truncate w-full mb-1">{media.name}</h4>
                      <div className="text-xs text-gray-500 mb-1">{media.type}</div>
                      <div className="text-xs text-gray-400">{media.size}</div>
                    </div>
                  );
                }
                
                if (activeTab === 'audios' && typeof media === 'object' && 'name' in media && 'artist' in media) {
                  return (
                    <div key={index} className="aspect-square bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer flex flex-col items-center justify-center text-center">
                      <HiMusicalNote size={32} className="text-gray-600 mb-2" />
                      <h4 className="font-medium text-xs text-gray-900 truncate w-full mb-1">{media.name}</h4>
                      <div className="text-xs text-gray-600 mb-1">{media.artist}</div>
                      <div className="text-xs text-gray-500">{media.duration}</div>
                    </div>
                  );
                }
                
                // Handle regular media (photos, videos, shorts, articles)
                return (
                  <div key={index} className={`relative bg-gray-100 rounded-lg overflow-hidden hover:opacity-90 transition-opacity cursor-pointer ${
                    activeTab === 'photos' ? 'aspect-square' :
                    activeTab === 'shorts' ? 'aspect-[3/4]' :
                    activeTab === 'videos' ? 'aspect-video' :
                    'aspect-square'
                  }`}>
                    <Image
                      src={media as string}
                      alt={`${activeTab} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    {(activeTab === 'videos' || activeTab === 'shorts') && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black bg-opacity-50 rounded-full p-2">
                          <HiPlay size={16} className="text-white ml-0.5" />
                        </div>
                      </div>
                    )}
                    {activeTab === 'articles' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black bg-opacity-50 rounded-full p-2">
                          <HiDocument size={16} className="text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                {activeTab === 'photos' && <HiPhoto size={48} className="mx-auto" />}
                {activeTab === 'videos' && <HiVideoCamera size={48} className="mx-auto" />}
                {activeTab === 'shorts' && <HiPlay size={48} className="mx-auto" />}
                {activeTab === 'articles' && <HiDocument size={48} className="mx-auto" />}
                {activeTab === 'links' && <HiLink size={48} className="mx-auto" />}
                {activeTab === 'files' && <HiFolder size={48} className="mx-auto" />}
                {activeTab === 'audios' && <HiMusicalNote size={48} className="mx-auto" />}
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No {activeTab} found
              </h3>
              <p className="text-gray-500">
                This channel hasn't shared any {activeTab} yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
