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

  // Mock data for different media types with platform information
  const mediaData = {
    photos: [
      { url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&auto=format&fit=crop&q=60', platform: 'pinterest', videoId: '912190099547923690' },
      { url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&auto=format&fit=crop&q=60', platform: 'pinterest', videoId: '5066618329889076' },
      { url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&auto=format&fit=crop&q=60', platform: 'instagram', videoId: 'DP0WfWtgXCI' },
      { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60', platform: 'pinterest', videoId: '2111131073162433' },
      { url: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&auto=format&fit=crop&q=60', platform: 'twitter', videoId: '1987991875811528876' },
      { url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&auto=format&fit=crop&q=60', platform: 'pinterest', videoId: '912190099546073047' },
      { url: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=400&auto=format&fit=crop&q=60', platform: 'instagram', videoId: 'CwuwoWUyzip' },
      { url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60', platform: 'pinterest', videoId: '912190099546441807' },
      { url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60', platform: 'twitter', videoId: '1987931778825551978' },
      { url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60', platform: 'pinterest', videoId: '912190099547886508' },
      { url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&auto=format&fit=crop&q=60', platform: 'instagram', videoId: 'DKwulmHSfco' },
      { url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&auto=format&fit=crop&q=60', platform: 'pinterest', videoId: '912190099547916785' }
    ],
    videos: [
      { url: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=400&auto=format&fit=crop&q=60', platform: 'youtube', videoId: 'YoHD9XEInc0' },
      { url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60', platform: 'youtube', videoId: 'zSWdZVtXT7E' },
      { url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60', platform: 'dailymotion', videoId: 'x8q0g1a' },
      { url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60', platform: 'vimeo', videoId: '76979871' },
      { url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&auto=format&fit=crop&q=60', platform: 'ok', videoId: '9284627729025' },
      { url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&auto=format&fit=crop&q=60', platform: 'bilibili', videoId: 'BV1Cj2ABwEkr' }
    ],
    shorts: [
      { url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&auto=format&fit=crop&q=60', platform: 'youtube', videoId: 'abc123' },
      { url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&auto=format&fit=crop&q=60', platform: 'instagram', videoId: 'DP0WfWtgXCI' },
      { url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&auto=format&fit=crop&q=60', platform: 'youtube', videoId: 'def456' },
      { url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&auto=format&fit=crop&q=60', platform: 'instagram', videoId: 'CwuwoWUyzip' },
      { url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&auto=format&fit=crop&q=60', platform: 'rutube', videoId: 'f1e0d8d0b4a3f02601317691df089f37' },
      { url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&auto=format&fit=crop&q=60', platform: 'instagram', videoId: 'DKwulmHSfco' },
      { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60', platform: 'youtube', videoId: 'ghi789' },
      { url: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&auto=format&fit=crop&q=60', platform: 'vk', videoId: '-139315008_456253741' }
    ],
    articles: [
      { url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&auto=format&fit=crop&q=60', platform: 'twitter', videoId: '1987991875811528876' },
      { url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&auto=format&fit=crop&q=60', platform: 'twitter', videoId: '1987931778825551978' },
      { url: 'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=400&auto=format&fit=crop&q=60', platform: 'twitter', videoId: '1987765669069541866' },
      { url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&auto=format&fit=crop&q=60', platform: 'pinterest', videoId: '912190099547923690' },
      { url: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&auto=format&fit=crop&q=60', platform: 'twitter', videoId: '1988121258534252775' },
      { url: 'https://images.unsplash.com/photo-1486312338219-ce68e2c6b696?w=400&auto=format&fit=crop&q=60', platform: 'pinterest', videoId: '5066618329889076' },
      { url: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&auto=format&fit=crop&q=60', platform: 'twitter', videoId: '1987069326965498107' },
      { url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&auto=format&fit=crop&q=60', platform: 'pinterest', videoId: '2111131073162433' },
      { url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&auto=format&fit=crop&q=60', platform: 'twitter', videoId: '1987629425479827930' }
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
      { name: 'Tech Podcast Episode 1.mp3', artist: 'Tech News Team', duration: '45:32', size: '32.1 MB', date: '1 hour ago', icon: '🎵', platform: 'spotify' },
      { name: 'Interview with CEO.wav', artist: 'Business Talk', duration: '28:15', size: '156.7 MB', date: '6 hours ago', icon: '🎙️', platform: 'apple' },
      { name: 'Background Music.mp3', artist: 'Audio Library', duration: '3:42', size: '8.9 MB', date: '2 days ago', icon: '🎶', platform: 'youtube_music' },
      { name: 'Voice Note - Ideas.m4a', artist: 'Team Discussion', duration: '2:18', size: '3.2 MB', date: '3 days ago', icon: '🗣️', platform: 'soundcloud' },
      { name: 'Conference Call Recording.mp3', artist: 'Meeting Audio', duration: '1:12:45', size: '67.4 MB', date: '1 week ago', icon: '📞', platform: 'deezer' },
      { name: 'Product Demo Audio.wav', artist: 'Marketing Team', duration: '15:30', size: '89.2 MB', date: '2 weeks ago', icon: '📢', platform: 'tidal' }
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
        {/* Channel Header with Background Image */}
        <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=1200&h=400&auto=format&fit=crop&q=60)'
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-30" />
          <div className="relative z-10 h-full flex items-end">
            <div className="p-6 ml-8">
              <h1 className="text-2xl font-bold text-white mb-2">{channelName}</h1>
              <p className="text-white text-sm opacity-90">📺 VERIFIED CHANNEL</p>
            </div>
          </div>
        </div>

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
              className={`flex-1 py-3 text-center border-b-2 transition-colors ${activeTab === 'photos'
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
              className={`flex-1 py-3 text-center border-b-2 transition-colors ${activeTab === 'videos'
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
              className={`flex-1 py-3 text-center border-b-2 transition-colors ${activeTab === 'shorts'
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
              className={`flex-1 py-3 text-center border-b-2 transition-colors ${activeTab === 'articles'
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
              className={`flex-1 py-3 text-center border-b-2 transition-colors ${activeTab === 'links'
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
              className={`flex-1 py-3 text-center border-b-2 transition-colors ${activeTab === 'files'
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
              className={`flex-1 py-3 text-center border-b-2 transition-colors ${activeTab === 'audios'
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
            <div className={`grid gap-2 ${activeTab === 'photos' ? 'grid-cols-4' :
              activeTab === 'shorts' ? 'grid-cols-4' :
                activeTab === 'videos' ? 'grid-cols-3' :
                  activeTab === 'links' ? 'grid-cols-2' :
                    activeTab === 'files' ? 'grid-cols-4' :
                      activeTab === 'audios' ? 'grid-cols-4' :
                        'grid-cols-4'
              }`}>
              {currentMedia.map((media, index) => {
                // Handle different media types
                if (activeTab === 'links' && typeof media === 'object' && 'title' in media) {
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
                    <div key={index} className="relative aspect-square bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer flex flex-col items-center justify-center text-center">
                      <HiMusicalNote size={32} className="text-gray-600 mb-2" />
                      <h4 className="font-medium text-xs text-gray-900 truncate w-full mb-1">{media.name}</h4>
                      <div className="text-xs text-gray-600 mb-1">{media.artist}</div>
                      <div className="text-xs text-gray-500">{media.duration}</div>

                      {/* Music Platform Badge */}
                      {'platform' in media && media.platform && (
                        <div className="absolute bottom-2 right-2 px-2 py-1 rounded-full flex items-center text-xs font-bold shadow-lg bg-white">
                          {media.platform === 'spotify' && (
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="#1DB954">
                              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                            </svg>
                          )}
                          {media.platform === 'apple' && (
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="#FA243C">
                              <path d="M23.994 6.124a9.23 9.23 0 0 0-.24 2.19c.01 3.03 1.33 5.65 3.53 7.46.2.16.39.32.57.49-.05.15-.1.31-.16.46-.63 1.78-1.52 3.42-2.67 4.94-1.07 1.4-2.18 2.8-3.93 2.81-1.66.01-2.2-.98-4.1-.99-1.9-.01-2.49.99-4.09.99-1.75.01-2.95-1.51-4.02-2.91-2.2-2.88-3.89-8.14-1.63-11.7 1.12-1.77 3.13-2.89 5.31-2.92 1.66-.03 3.22 1.12 4.23 1.12 1.01 0 2.9-1.38 4.89-1.18.83.03 3.16.34 4.65 2.55-.12.08-2.78 1.63-2.76 4.86zm-6.26-5.82c.89-1.09 1.5-2.6 1.33-4.11-1.29.05-2.85.86-3.77 1.94-.83.96-1.55 2.49-1.36 3.96 1.44.11 2.91-.73 3.8-1.79z" />
                            </svg>
                          )}
                          {media.platform === 'youtube_music' && (
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="#FF0000">
                              <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228s6.228-2.796 6.228-6.228S15.432 5.772 12 5.772zM9.684 15.54V8.46L15.816 12l-6.132 3.54z" />
                            </svg>
                          )}
                          {media.platform === 'soundcloud' && (
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="#FF5500">
                              <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c0-.057-.045-.1-.09-.1m-.899.828c-.06 0-.091.037-.104.094L0 14.479l.165 1.308c0 .055.045.094.09.094s.089-.045.104-.104l.21-1.319-.21-1.334c0-.061-.044-.09-.09-.09m1.83-1.229c-.061 0-.12.045-.12.104l-.21 2.563.225 2.458c0 .06.045.12.119.12.061 0 .105-.061.121-.12l.254-2.474-.254-2.548c-.016-.06-.061-.12-.121-.12m.945-.089c-.075 0-.135.06-.15.135l-.193 2.64.21 2.544c.016.077.075.138.149.138.075 0 .135-.061.15-.15l.24-2.532-.24-2.623c0-.075-.06-.135-.135-.135m.959-.914c-.09 0-.15.074-.165.149l-.195 3.555.21 2.535c.016.09.075.165.164.165.075 0 .15-.074.164-.165l.226-2.535-.226-3.555c0-.09-.074-.165-.164-.165m.975-.449c-.09 0-.165.074-.18.164l-.18 4.004.194 2.47c.016.104.09.18.18.18.104 0 .18-.09.194-.18l.226-2.47-.226-4.004c-.015-.09-.09-.164-.194-.164m.989-.104c-.104 0-.194.09-.209.195l-.165 4.108.18 2.46c.016.104.105.195.209.195s.195-.09.21-.195l.209-2.46-.209-4.108c-.016-.104-.091-.195-.21-.195m1.005.09c-.121 0-.21.089-.225.209l-.165 4.003.18 2.445c.016.119.105.225.225.225.119 0 .225-.105.225-.225l.195-2.445-.196-4.003c0-.12-.105-.209-.225-.209m1.245.045c-.135 0-.24.104-.255.239l-.15 3.923.165 2.414c.015.135.12.255.255.255s.255-.12.255-.255l.195-2.414-.196-3.923c-.015-.135-.119-.239-.254-.239m1.006-.164c-.135 0-.255.119-.255.254l-.164 4.023.164 2.385c.016.135.12.254.255.254.135 0 .254-.119.254-.254l.18-2.385-.18-4.023c0-.135-.119-.254-.254-.254m1.006-.045c-.15 0-.27.119-.285.269l-.15 4.068.15 2.385c.015.15.135.27.285.27.15 0 .27-.12.285-.27l.164-2.385-.164-4.068c-.015-.15-.135-.27-.285-.27m1.02-.074c-.164 0-.285.12-.3.284l-.135 4.142.135 2.355c.015.164.136.3.3.3.165 0 .3-.136.3-.3l.165-2.355-.165-4.142c-.015-.164-.135-.284-.3-.284m1.006-.09c-.18 0-.3.135-.3.3l-.135 4.217.135 2.34c.016.18.135.3.3.3.18 0 .3-.135.315-.3l.15-2.34-.15-4.217c-.015-.165-.135-.3-.3-.3m1.006.15c-.195 0-.345.15-.345.345l-.12 4.05.12 2.295c.016.195.15.345.345.345.194 0 .344-.15.344-.345l.135-2.295-.135-4.05c0-.195-.15-.345-.344-.345m1.02-.24c-.209 0-.359.15-.359.359l-.12 4.29.12 2.28c0 .209.15.359.359.359.21 0 .36-.15.36-.359l.134-2.28-.134-4.29c-.016-.209-.15-.359-.36-.359m1.006.164c-.225 0-.375.165-.375.375l-.105 4.11.105 2.265c.016.225.165.375.375.375.226 0 .375-.165.375-.375l.12-2.265-.12-4.11c0-.21-.164-.375-.375-.375m1.02-.074c-.226 0-.391.164-.406.375l-.09 4.185.09 2.235c.015.225.18.391.406.391.225 0 .39-.181.39-.391l.105-2.235-.105-4.185c0-.226-.165-.375-.39-.375m1.006-.09c-.24 0-.406.18-.421.42l-.075 4.26.075 2.22c.015.24.181.42.421.42.239 0 .42-.18.42-.42l.09-2.22-.09-4.26c-.015-.24-.181-.42-.42-.42z" />
                            </svg>
                          )}
                          {media.platform === 'deezer' && (
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="#A238FF">
                              <path d="M18.81 4.16v3.03h5.19V4.16h-5.19zm0 4.37v3.03h5.19V8.53h-5.19zm0 4.37v3.03h5.19v-3.03h-5.19zm-6.48-8.74v3.03h5.19V4.16h-5.19zm0 4.37v3.03h5.19V8.53h-5.19zm0 4.37v3.03h5.19v-3.03h-5.19zm0 4.37v3.03h5.19v-3.03h-5.19zM6.15 8.53v3.03h5.19V8.53H6.15zm0 4.37v3.03h5.19v-3.03H6.15zm0 4.37v3.03h5.19v-3.03H6.15zM0 12.9v3.03h5.19V12.9H0zm0 4.37v3.03h5.19v-3.03H0z" />
                            </svg>
                          )}
                          {media.platform === 'tidal' && (
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="#000000">
                              <path d="M12.012 3.992L8.008 7.996 4.004 3.992 0 7.996 4.004 12l4.004-4.004L12.012 12l-4.004 4.004 4.004 4.004 4.004-4.004 4.004 4.004 4.004-4.004-4.004-4.004 4.004-4.004-4.004-4.004-4.004 4.004z" />
                            </svg>
                          )}
                        </div>
                      )}
                    </div>
                  );
                }

                // Handle regular media (photos, videos, shorts, articles)
                if (typeof media === 'object' && 'url' in media) {
                  return (
                    <div key={index} className={`relative bg-gray-100 rounded-lg overflow-hidden hover:opacity-90 transition-opacity cursor-pointer ${activeTab === 'photos' ? 'aspect-square' :
                      activeTab === 'shorts' ? 'aspect-[3/4]' :
                        activeTab === 'videos' ? 'aspect-video' :
                          'aspect-square'
                      }`}>
                      <Image
                        src={media.url}
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

                      {/* Platform Badge */}
                      {'platform' in media && media.platform && (
                        <div className={`absolute bottom-2 right-2 px-2 py-1 rounded-full flex items-center text-xs font-bold shadow-lg ${media.platform === 'youtube' ? 'bg-red-600 text-white' :
                          media.platform === 'vimeo' ? 'bg-blue-500 text-white' :
                            media.platform === 'dailymotion' ? 'bg-white text-black' :
                              media.platform === 'rutube' ? 'bg-gradient-to-r from-blue-900 to-red-500 text-white' :
                                media.platform === 'vk' ? 'bg-blue-500 text-white' :
                                  media.platform === 'bilibili' ? 'bg-gradient-to-r from-blue-300 via-blue-500 to-blue-700 text-white' :
                                    media.platform === 'instagram' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' :
                                      media.platform === 'ok' ? 'bg-orange-500 text-white' :
                                        media.platform === 'twitter' ? 'bg-black text-white' :
                                          media.platform === 'pinterest' ? 'bg-red-600 text-white' :
                                            'bg-gray-600 text-white'
                          }`}>
                          {media.platform === 'youtube' && (
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                          )}
                          {media.platform === 'vimeo' && (
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197c1.185-1.044 2.351-2.084 3.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.493 4.797l-.013.01z" />
                            </svg>
                          )}
                          {media.platform === 'dailymotion' && (
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M13.551 11.485c-1.02 0-1.851.36-2.471 1.06V9.133H8.831v11.867h2.25v-1.02c.63.72 1.47 1.08 2.49 1.08 1.8 0 3.17-1.44 3.17-3.78-.01-2.33-1.39-3.795-3.19-3.795zm-.48 5.82c-.9 0-1.65-.69-1.65-1.83v-.18c0-1.14.75-1.83 1.65-1.83.93 0 1.59.75 1.59 1.92 0 1.17-.66 1.92-1.59 1.92zm9.93-9.305h-2.25v11.867h2.25V8.133zm-2.7-3.51c0 .78.63 1.41 1.41 1.41.78 0 1.41-.63 1.41-1.41 0-.78-.63-1.41-1.41-1.41-.78 0-1.41.63-1.41 1.41zM0 12c0 6.627 5.373 12 12 12s12-5.373 12-12S18.627 0 12 0 0 5.373 0 12z" />
                            </svg>
                          )}
                          {media.platform === 'rutube' && <span>RT</span>}
                          {media.platform === 'vk' && (
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.78 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z" />
                            </svg>
                          )}
                          {media.platform === 'bilibili' && (
                            <img
                              src="https://img.utdstc.com/icon/ba9/33d/ba933d0e003c9f53e0fb3de2b0f1a8def6898ce2384850ca3adb1cc332d78241:200"
                              alt="Bilibili"
                              className="w-3 h-3 rounded-sm"
                            />
                          )}
                          {media.platform === 'instagram' && (
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                          )}
                          {media.platform === 'ok' && (
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 3.6c2.324 0 4.2 1.876 4.2 4.2 0 2.324-1.876 4.2-4.2 4.2-2.324 0-4.2-1.876-4.2-4.2 0-2.324 1.876-4.2 4.2-4.2zm0 16.8c-1.907 0-3.637-.656-5.013-1.751l2.362-2.362c.656.328 1.395.513 2.176.513.781 0 1.52-.185 2.176-.513l2.362 2.362C15.637 19.744 13.907 20.4 12 20.4z" />
                            </svg>
                          )}
                          {media.platform === 'twitter' && (
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                          )}
                          {media.platform === 'pinterest' && (
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                            </svg>
                          )}
                        </div>
                      )}
                    </div>
                  );
                }

                return null;
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
