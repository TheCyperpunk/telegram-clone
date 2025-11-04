'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HiArrowLeft, HiEllipsisHorizontal, HiPhoto, HiVideoCamera, HiPlay, HiDocument } from 'react-icons/hi2';
import { HiOutlineHeart, HiOutlineBookmark, HiOutlineShare } from 'react-icons/hi2';
import Image from 'next/image';

export default function MediaGalleryPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'photos' | 'videos' | 'shorts' | 'articles'>('photos');

  // Mock data for different media types
  const mediaData = {
    photos: [
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&auto=format&fit=crop&q=60'
    ],
    videos: [
      'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60'
    ],
    shorts: [
      'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&auto=format&fit=crop&q=60'
    ],
    articles: [
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&auto=format&fit=crop&q=60'
    ]
  };

  // Category highlights data
  const highlights = [
    { name: 'Photos', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=100&auto=format&fit=crop&q=60', icon: HiPhoto },
    { name: 'Videos', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=100&auto=format&fit=crop&q=60', icon: HiVideoCamera },
    { name: 'Short Videos', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100&auto=format&fit=crop&q=60', icon: HiPlay },
    { name: 'Articles', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60', icon: HiDocument },
    { name: 'Shared Links', image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=100&auto=format&fit=crop&q=60', icon: HiOutlineShare },
    { name: 'Favorites', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=100&auto=format&fit=crop&q=60', icon: HiOutlineHeart },
    { name: 'Saved', image: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=100&auto=format&fit=crop&q=60', icon: HiOutlineBookmark }
  ];

  const currentMedia = mediaData[activeTab] || [];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <HiArrowLeft size={24} className="text-gray-900" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Tech News Channel</h1>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <HiEllipsisHorizontal size={24} className="text-gray-900" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Profile Section */}
        <div className="px-6 py-8">
          <div className="flex items-start gap-8 mb-6">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 flex-shrink-0">
              <Image
                src="https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=150&auto=format&fit=crop&q=60"
                alt="Channel Avatar"
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-8 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-semibold text-gray-900">{mediaData.photos.length + mediaData.videos.length + mediaData.shorts.length + mediaData.articles.length}</div>
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

              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Tech News Channel</h2>
                <p className="text-sm text-blue-600 mb-3">📺 VERIFIED CHANNEL</p>
                <p className="text-gray-700 leading-relaxed max-w-2xl">
                  Stay updated with the latest technology news, reviews, and insights. We share breaking tech news, product reviews, tutorials, and industry analysis to keep you informed about the digital world.
                </p>
                <p className="text-sm text-blue-600 mt-2">🔗 technews.com</p>
              </div>

              <div className="flex gap-3">
                <button className="bg-blue-500 text-white py-2 px-6 rounded-lg font-medium text-sm hover:bg-blue-600 transition-colors">
                  Subscribe
                </button>
                <button className="bg-gray-100 text-gray-900 py-2 px-6 rounded-lg font-medium text-sm hover:bg-gray-200 transition-colors">
                  Share Channel
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="px-6 mb-8">
          <div className="flex gap-6 overflow-x-auto pb-2">
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <div key={index} className="flex flex-col items-center min-w-0 cursor-pointer hover:opacity-80 transition-opacity">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-gray-200 mb-2 relative bg-gradient-to-br from-blue-50 to-purple-50">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon size={28} className="text-gray-600" />
                    </div>
                  </div>
                  <span className="text-sm text-gray-700 text-center truncate w-20 font-medium">
                    {highlight.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-t border-gray-200">
          <div className="flex px-6">
            <button
              onClick={() => setActiveTab('photos')}
              className={`flex-1 py-4 text-center border-b-2 transition-colors ${
                activeTab === 'photos'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-400'
              }`}
            >
              <div className="text-sm font-medium tracking-wide flex items-center justify-center gap-2">
                <HiPhoto size={18} />
                PHOTOS ({mediaData.photos.length})
              </div>
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`flex-1 py-4 text-center border-b-2 transition-colors ${
                activeTab === 'videos'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-400'
              }`}
            >
              <div className="text-sm font-medium tracking-wide flex items-center justify-center gap-2">
                <HiVideoCamera size={18} />
                VIDEOS ({mediaData.videos.length})
              </div>
            </button>
            <button
              onClick={() => setActiveTab('shorts')}
              className={`flex-1 py-4 text-center border-b-2 transition-colors ${
                activeTab === 'shorts'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-400'
              }`}
            >
              <div className="text-sm font-medium tracking-wide flex items-center justify-center gap-2">
                <HiPlay size={18} />
                SHORT VIDEOS ({mediaData.shorts.length})
              </div>
            </button>
            <button
              onClick={() => setActiveTab('articles')}
              className={`flex-1 py-4 text-center border-b-2 transition-colors ${
                activeTab === 'articles'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-400'
              }`}
            >
              <div className="text-sm font-medium tracking-wide flex items-center justify-center gap-2">
                <HiDocument size={18} />
                ARTICLES ({mediaData.articles.length})
              </div>
            </button>
          </div>
        </div>

        {/* Media Grid */}
        <div className="px-6 py-6">
          {currentMedia.length > 0 ? (
            <div className="grid grid-cols-4 gap-2">
              {currentMedia.map((media, index) => (
                <div key={index} className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden hover:opacity-90 transition-opacity cursor-pointer">
                  <Image
                    src={media}
                    alt={`${activeTab} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  {(activeTab === 'videos' || activeTab === 'shorts') && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black bg-opacity-50 rounded-full p-2">
                        <HiPlay size={20} className="text-white ml-0.5" />
                      </div>
                    </div>
                  )}
                  {activeTab === 'articles' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black bg-opacity-50 rounded-full p-2">
                        <HiDocument size={20} className="text-white" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                {activeTab === 'photos' && <HiPhoto size={64} className="mx-auto" />}
                {activeTab === 'videos' && <HiVideoCamera size={64} className="mx-auto" />}
                {activeTab === 'shorts' && <HiPlay size={64} className="mx-auto" />}
                {activeTab === 'articles' && <HiDocument size={64} className="mx-auto" />}
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
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
