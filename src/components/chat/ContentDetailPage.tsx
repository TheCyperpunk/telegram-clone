import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiArrowLeft, FiHeart, FiMessageSquare, FiShare2, FiMoreVertical, FiPlay, FiDownload, FiBookmark } from 'react-icons/fi';

interface Post {
  id: string;
  username: string;
  avatar: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  shares: number;
  time: string;
  type: 'photo' | 'photos' | 'video' | 'short_video' | 'music' | 'article';
  title?: string;
  duration?: string;
  source?: string;
  height: number;
  aspectRatio: 'square' | 'portrait' | 'landscape' | 'tall' | 'wide';
  platform?: string;
  videoId?: string;
}

interface ContentDetailPageProps {
  post: Post;
  onBack: () => void;
  onUserClick?: (username: string) => void;
}

// Generate related content similar to Pinterest
const generateRelatedContent = (currentPost: Post) => {
  const relatedPosts = Array.from({ length: 20 }, (_, i) => ({
    id: `related-${i}`,
    image: `https://images.unsplash.com/photo-${1500000000000 + i}?w=400&h=${200 + Math.floor(Math.random() * 300)}&auto=format&fit=crop&q=60`,
    title: [
      'Amazing sunset photography',
      'Street art collection',
      'Modern architecture',
      'Nature landscapes',
      'Urban exploration',
      'Creative portraits',
      'Travel destinations',
      'Food photography',
      'Minimalist design',
      'Abstract patterns'
    ][i % 10],
    username: ['photographer_pro', 'art_lover', 'travel_diary', 'food_explorer', 'design_guru'][i % 5],
    height: 200 + Math.floor(Math.random() * 300)
  }));
  return relatedPosts;
};

export default function ContentDetailPage({ post, onBack, onUserClick }: ContentDetailPageProps) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [relatedContent] = useState(() => generateRelatedContent(post));

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getMainContentHeight = () => {
    switch (post.aspectRatio) {
      case 'tall':
        return 'h-[600px]';
      case 'portrait':
        return 'h-[500px]';
      case 'square':
        return 'h-[400px]';
      case 'landscape':
        return 'h-[350px]';
      case 'wide':
        return 'h-[300px]';
      default:
        return 'h-[400px]';
    }
  };

  const renderMainContent = () => {
    const contentHeight = getMainContentHeight();
    
    // Video content with embedded players
    if (post.platform === 'youtube' && (post.type === 'video' || post.type === 'short_video')) {
      return (
        <div className={`w-full ${contentHeight} bg-black rounded-2xl overflow-hidden`}>
          <iframe
            src={`https://www.youtube.com/embed/${post.videoId}?autoplay=0&rel=0&modestbranding=1`}
            title="YouTube video player"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full"
            style={{ border: 'none' }}
          />
        </div>
      );
    }

    if (post.platform === 'vimeo' && post.type === 'video') {
      return (
        <div className={`w-full ${contentHeight} bg-black rounded-2xl overflow-hidden`}>
          <iframe
            src={`https://player.vimeo.com/video/${post.videoId}?autoplay=0&muted=0`}
            frameBorder="0"
            allowFullScreen
            allow="autoplay; fullscreen; picture-in-picture"
            title="Vimeo Video"
            className="w-full h-full"
            style={{ border: 'none' }}
          />
        </div>
      );
    }

    if (post.platform === 'dailymotion' && post.type === 'video') {
      return (
        <div className={`w-full ${contentHeight} bg-black rounded-2xl overflow-hidden`}>
          <iframe
            src={`https://www.dailymotion.com/embed/video/${post.videoId}?autoplay=0&mute=1`}
            frameBorder="0"
            allowFullScreen
            allow="fullscreen; picture-in-picture"
            title="Dailymotion Video"
            className="w-full h-full"
            style={{ border: 'none' }}
          />
        </div>
      );
    }

    if (post.platform === 'rutube' && post.type === 'short_video') {
      return (
        <div className={`w-full ${contentHeight} bg-black rounded-2xl overflow-hidden`}>
          <iframe
            src={`https://rutube.ru/play/embed/${post.videoId}?autoplay=0`}
            frameBorder="0"
            allowFullScreen
            allow="clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            title="Rutube Short"
            className="w-full h-full"
            style={{ border: 'none' }}
          />
        </div>
      );
    }

    if (post.platform === 'vk' && post.type === 'video') {
      return (
        <div className={`w-full ${contentHeight} bg-black rounded-2xl overflow-hidden`}>
          <iframe
            src={`https://vk.com/video_ext.php?oid=${post.videoId?.split('_')[0]}&id=${post.videoId?.split('_')[1]}&hd=2&autoplay=0`}
            frameBorder="0"
            allowFullScreen
            allow="clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            title="VK Video"
            className="w-full h-full"
            style={{ border: 'none' }}
          />
        </div>
      );
    }

    if (post.platform === 'bilibili' && post.type === 'video') {
      return (
        <div className={`w-full ${contentHeight} bg-black rounded-2xl overflow-hidden`}>
          <iframe
            src={`https://player.bilibili.com/player.html?bvid=${post.videoId}&autoplay=0&muted=1`}
            scrolling="no"
            frameBorder="0"
            allowFullScreen
            title="Bilibili Video"
            className="w-full h-full"
            style={{ border: 'none' }}
          />
        </div>
      );
    }

    // Instagram Reel
    if (post.platform === 'instagram' && post.type === 'short_video') {
      return (
        <div 
          className={`w-full ${contentHeight} bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center cursor-pointer hover:from-purple-600 hover:to-pink-600 transition-all duration-300`}
          onClick={() => window.open(`https://www.instagram.com/reel/${post.videoId}/`, '_blank')}
        >
          <div className="text-center text-white">
            <svg className="w-20 h-20 mx-auto mb-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.40z"/>
            </svg>
            <p className="text-xl font-bold mb-2">Instagram Reel</p>
            <p className="text-sm opacity-75">Click to view on Instagram</p>
            {post.duration && <p className="text-lg font-semibold mt-2">{post.duration}</p>}
          </div>
        </div>
      );
    }

    // Regular photo content
    if (post.type === 'photo' || post.type === 'photos') {
      return (
        <div className={`w-full ${contentHeight} relative rounded-2xl overflow-hidden bg-gray-100`}>
          <Image 
            src={post.image} 
            alt={post.caption} 
            fill 
            className="object-cover"
          />
        </div>
      );
    }

    // Article content
    if (post.type === 'article') {
      return (
        <div className={`w-full ${contentHeight} bg-white rounded-2xl border border-gray-200 p-6 overflow-y-auto`}>
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              A
            </div>
            <div className="ml-3">
              <h3 className="font-bold text-lg">{post.title}</h3>
              <p className="text-gray-500 text-sm">{post.source}</p>
            </div>
          </div>
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">{post.caption}</p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">This is a preview of the article. Click to read the full content on the original website.</p>
            </div>
          </div>
        </div>
      );
    }

    // Music content
    if (post.type === 'music') {
      return (
        <div className={`w-full ${contentHeight} bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center text-white`}>
          <div className="text-center">
            <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-6">
              <FiPlay size={48} className="ml-2" />
            </div>
            <h3 className="text-2xl font-bold mb-2">{post.title}</h3>
            <p className="text-lg opacity-75">@{post.username}</p>
            {post.duration && <p className="text-sm opacity-50 mt-2">{post.duration}</p>}
          </div>
        </div>
      );
    }

    // Default video content with play overlay
    return (
      <div className={`w-full ${contentHeight} relative rounded-2xl overflow-hidden bg-gray-100`}>
        <Image 
          src={post.image} 
          alt={post.caption} 
          fill 
          className="object-cover"
        />
        {(post.type === 'video' || post.type === 'short_video') && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <div className="w-20 h-20 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all duration-300 cursor-pointer">
              <FiPlay size={32} className="text-gray-800 ml-1" />
            </div>
          </div>
        )}
        {post.duration && (
          <div className="absolute bottom-4 right-4 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
            {post.duration}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header with back button and user info */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-3"
            >
              <FiArrowLeft size={20} />
            </button>
            <div className="flex items-center">
              <Image 
                src={post.avatar} 
                alt={post.username} 
                width={32} 
                height={32} 
                className="rounded-full"
              />
              <div className="ml-3">
                <p className="font-semibold cursor-pointer hover:underline" onClick={() => onUserClick?.(post.username)}>
                  @{post.username}
                </p>
                <p className="text-gray-500 text-sm">{post.time}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <FiDownload size={20} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <FiShare2 size={20} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <FiMoreVertical size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Main Content */}
          <div className="w-full">
            <div className="sticky top-24">
              {renderMainContent()}
              
              {/* Content Info Below Main Content */}
              <div className="mt-6 space-y-4">
                {/* Title */}
                <h1 className="text-2xl font-bold">{post.title || post.caption}</h1>
                
                {/* Stats */}
                <div className="flex items-center space-x-8">
                  <div className="text-center">
                    <p className="text-xl font-bold">{formatNumber(post.likes)}</p>
                    <p className="text-gray-500 text-sm">Likes</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold">{formatNumber(post.comments)}</p>
                    <p className="text-gray-500 text-sm">Comments</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold">{formatNumber(post.shares)}</p>
                    <p className="text-gray-500 text-sm">Shares</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button 
                    onClick={() => setLiked(!liked)}
                    className={`w-full flex items-center justify-center py-3 px-4 rounded-full font-semibold transition-all duration-300 ${
                      liked 
                        ? 'bg-red-500 text-white hover:bg-red-600' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <FiHeart size={20} className={`mr-2 ${liked ? 'fill-current' : ''}`} />
                    Like
                  </button>
                  
                  <button className="w-full flex items-center justify-center py-3 px-4 rounded-full font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-300">
                    <FiMessageSquare size={20} className="mr-2" />
                    Comment
                  </button>
                  
                  <button 
                    onClick={() => setBookmarked(!bookmarked)}
                    className={`w-full flex items-center justify-center py-3 px-4 rounded-full font-semibold transition-all duration-300 ${
                      bookmarked 
                        ? 'bg-blue-500 text-white hover:bg-blue-600' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <FiBookmark size={20} className={`mr-2 ${bookmarked ? 'fill-current' : ''}`} />
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Related Content (Pinterest Style) */}
          <div className="w-full">
            <h3 className="text-lg font-semibold mb-4">More to explore</h3>
            <div className="columns-2 gap-4 space-y-4">
              {relatedContent.map((item) => (
                <div key={item.id} className="break-inside-avoid mb-4">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
                    <div style={{ height: `${item.height}px` }} className="relative overflow-hidden">
                      <Image 
                        src={item.image} 
                        alt={item.title} 
                        fill 
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-3">
                      <h4 className="font-semibold text-sm mb-1 line-clamp-2">{item.title}</h4>
                      <p className="text-gray-500 text-xs">@{item.username}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Related Content */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-6">More like this</h3>
          <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
            {relatedContent.slice(10).map((item) => (
              <div key={`bottom-${item.id}`} className="break-inside-avoid mb-4">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <div style={{ height: `${item.height}px` }} className="relative overflow-hidden">
                    <Image 
                      src={item.image} 
                      alt={item.title} 
                      fill 
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3">
                    <h4 className="font-semibold text-sm mb-1 line-clamp-2">{item.title}</h4>
                    <p className="text-gray-500 text-xs">@{item.username}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
