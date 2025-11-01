'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FiHeart, FiMessageSquare, FiShare2, FiMoreHorizontal, FiBookmark, FiSend, FiX, FiDownload, FiMaximize2 } from 'react-icons/fi';
import ShortsRecommendation from './ShortsRecommendation';

// Sample posts data with different aspect ratios
const posts = [
  {
    id: '1',
    user: {
      name: 'imozix',
      username: 'imozix',
      location: 'Cairo, Egypt',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'image',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=60',
      caption: 'New illustration ❤️ ... more',
      aspectRatio: 'square'
    },
    stats: {
      likes: 123,
      comments: 15,
      shares: 8
    },
    timestamp: '20 July',
    liked: false,
    bookmarked: false
  },
  {
    id: '2',
    user: {
      name: 'Tech Enthusiasts',
      username: 'tech_hub',
      location: 'San Francisco, CA',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'image',
      image: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=1200&h=600&auto=format&fit=crop&q=60',
      caption: 'The future of AI development is here! 🚀 Exciting times ahead for developers and tech enthusiasts.',
      aspectRatio: 'wide'
    },
    stats: {
      likes: 456,
      comments: 32,
      shares: 18
    },
    timestamp: '2 hours ago',
    liked: true,
    bookmarked: false
  },
  {
    id: '3',
    user: {
      name: 'Photography Hub',
      username: 'photo_masters',
      location: 'New York, NY',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'image',
      image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&auto=format&fit=crop&q=60',
      caption: 'Golden hour magic ✨ Captured this beautiful moment during sunset. What do you think?',
      aspectRatio: 'square'
    },
    stats: {
      likes: 789,
      comments: 45,
      shares: 23
    },
    timestamp: '4 hours ago',
    liked: false,
    bookmarked: true
  },
  {
    id: '4',
    user: {
      name: 'Travel Adventures',
      username: 'wanderlust_official',
      location: 'Bali, Indonesia',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'image',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1200&auto=format&fit=crop&q=60',
      caption: 'Paradise found! 🏝️ This hidden gem in Bali is absolutely breathtaking. Can\'t wait to share more from this incredible journey.',
      aspectRatio: 'tall'
    },
    stats: {
      likes: 1234,
      comments: 67,
      shares: 34
    },
    timestamp: '6 hours ago',
    liked: true,
    bookmarked: false
  },
  {
    id: '5',
    user: {
      name: 'Food Lovers',
      username: 'foodie_paradise',
      location: 'Paris, France',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'image',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1400&h=700&auto=format&fit=crop&q=60',
      caption: 'Homemade pasta night! 🍝 Nothing beats the satisfaction of making fresh pasta from scratch. Recipe in comments!',
      aspectRatio: 'wide'
    },
    stats: {
      likes: 567,
      comments: 28,
      shares: 12
    },
    timestamp: '8 hours ago',
    liked: false,
    bookmarked: true
  },
  {
    id: '6',
    user: {
      name: 'Fitness Journey',
      username: 'fit_life_daily',
      location: 'Los Angeles, CA',
      avatar: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'image',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop&q=60',
      caption: 'Morning workout complete! 💪 Started the day with a 5K run and some strength training. How are you staying active today?',
      aspectRatio: 'square'
    },
    stats: {
      likes: 345,
      comments: 19,
      shares: 7
    },
    timestamp: '10 hours ago',
    liked: true,
    bookmarked: false
  },
  {
    id: '7',
    user: {
      name: 'Architecture Daily',
      username: 'arch_inspiration',
      location: 'Tokyo, Japan',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'image',
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1600&h=800&auto=format&fit=crop&q=60',
      caption: 'Modern architecture meets traditional design 🏗️ This stunning building in Tokyo showcases the perfect blend of old and new.',
      aspectRatio: 'wide'
    },
    stats: {
      likes: 892,
      comments: 41,
      shares: 25
    },
    timestamp: '12 hours ago',
    liked: false,
    bookmarked: false
  },
  {
    id: '8',
    user: {
      name: 'Nature Explorer',
      username: 'wild_wanderer',
      location: 'Patagonia, Chile',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'image',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1400&auto=format&fit=crop&q=60',
      caption: 'Towering peaks of Patagonia 🏔️ Standing at the base of these giants makes you feel so small yet so alive!',
      aspectRatio: 'tall'
    },
    stats: {
      likes: 1567,
      comments: 89,
      shares: 45
    },
    timestamp: '14 hours ago',
    liked: true,
    bookmarked: true
  },
  {
    id: '9',
    user: {
      name: 'Street Art Collective',
      username: 'urban_canvas',
      location: 'Berlin, Germany',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'image',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&auto=format&fit=crop&q=60',
      caption: 'New mural completed! 🎨 Spent 3 days working on this piece. Art has the power to transform spaces and minds.',
      aspectRatio: 'square'
    },
    stats: {
      likes: 723,
      comments: 52,
      shares: 31
    },
    timestamp: '16 hours ago',
    liked: false,
    bookmarked: false
  },
  {
    id: '10',
    user: {
      name: 'Ocean Vibes',
      username: 'sea_soul',
      location: 'Maldives',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'image',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1500&h=750&auto=format&fit=crop&q=60',
      caption: 'Crystal clear waters as far as the eye can see 🌊 Paradise isn\'t a place, it\'s a feeling.',
      aspectRatio: 'wide'
    },
    stats: {
      likes: 2134,
      comments: 156,
      shares: 78
    },
    timestamp: '18 hours ago',
    liked: true,
    bookmarked: true
  },
  {
    id: '11',
    user: {
      name: 'Coffee Culture',
      username: 'brew_master',
      location: 'Melbourne, Australia',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'image',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=1200&auto=format&fit=crop&q=60',
      caption: 'Perfect latte art to start the day ☕ The secret is in the milk temperature and the pour technique.',
      aspectRatio: 'tall'
    },
    stats: {
      likes: 445,
      comments: 23,
      shares: 12
    },
    timestamp: '20 hours ago',
    liked: false,
    bookmarked: false
  },
  {
    id: '12',
    user: {
      name: 'Music Producer',
      username: 'beat_maker',
      location: 'Nashville, TN',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'image',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=600&auto=format&fit=crop&q=60',
      caption: 'Late night studio session 🎵 Working on something special. Music is the universal language that connects us all.',
      aspectRatio: 'wide'
    },
    stats: {
      likes: 678,
      comments: 34,
      shares: 19
    },
    timestamp: '22 hours ago',
    liked: true,
    bookmarked: false
  }
];

export default function FeedsContent() {
  const [postsState, setPostsState] = useState(posts);
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
    user: any;
    caption: string;
  } | null>(null);

  const handleLike = (postId: string) => {
    setPostsState(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            liked: !post.liked,
            stats: {
              ...post.stats,
              likes: post.liked ? post.stats.likes - 1 : post.stats.likes + 1
            }
          }
        : post
    ));
  };

  const handleBookmark = (postId: string) => {
    setPostsState(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, bookmarked: !post.bookmarked }
        : post
    ));
  };

  const handleImageClick = (post: any) => {
    setSelectedImage({
      src: post.content.image,
      alt: `${post.user.name}'s post`,
      user: post.user,
      caption: post.content.caption
    });
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <div className="feeds-content h-full overflow-auto bg-gray-50">
      <div className="max-w-7xl mx-auto py-4 px-4">
        {/* Shorts Recommendation */}
        <ShortsRecommendation />
        
        {/* Posts Feed */}
        <div className="space-y-6">
          {postsState.map((post, index) => (
            <>
              <PostCard 
                key={post.id}
                post={post}
                onLike={() => handleLike(post.id)}
                onBookmark={() => handleBookmark(post.id)}
                onImageClick={() => handleImageClick(post)}
                formatNumber={formatNumber}
                isFirst={index === 0}
              />
              {/* Insert Shorts in the middle after 4th post */}
              {index === 3 && (
                <div key="shorts-middle">
                  <ShortsRecommendation reverse={true} />
                </div>
              )}
            </>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <ImageModal 
          image={selectedImage}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

function PostCard({ 
  post, 
  onLike, 
  onBookmark, 
  onImageClick,
  formatNumber,
  isFirst 
}: { 
  post: any;
  onLike: () => void;
  onBookmark: () => void;
  onImageClick: () => void;
  formatNumber: (num: number) => string;
  isFirst: boolean;
}) {
  return (
    <div className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 w-fit mx-auto">
      {/* Post Header */}
      <div className="flex items-center justify-between p-6 pb-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-cyan-500 p-0.5">
              <Image 
                src={post.user.avatar} 
                alt={post.user.name}
                width={44}
                height={44}
                className="rounded-full object-cover w-full h-full bg-white p-0.5"
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-gray-900 text-sm">{post.user.name}</h3>
              <span className="text-gray-400 text-sm">•</span>
              <span className="text-gray-500 text-sm">{post.timestamp}</span>
            </div>
            <p className="text-gray-500 text-xs mt-0.5">{post.user.location}</p>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <FiMoreHorizontal size={18} className="text-gray-500" />
        </button>
      </div>

      {/* Post Content */}
      <div className="px-6 pb-4">
        <p className="text-gray-900 text-sm leading-relaxed">
          {post.content.caption}
        </p>
      </div>

      {/* Post Image */}
      <div className="relative mx-6 mb-4">
        <div 
          className="relative rounded-2xl overflow-hidden cursor-pointer"
          onClick={onImageClick}
          style={{ maxHeight: '600px' }}
        >
          <Image 
            src={post.content.image} 
            alt="Post content"
            width={800}
            height={600}
            className="w-full h-auto object-contain hover:scale-105 transition-transform duration-300 rounded-2xl"
            style={{ maxHeight: '600px' }}
          />
        </div>
      </div>

      {/* Post Actions */}
      <div className="px-6 pb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            <button 
              onClick={onLike}
              className="flex items-center space-x-1 hover:bg-red-50 p-3 rounded-full transition-all duration-200 group"
            >
              <FiHeart 
                size={22} 
                className={`transition-all duration-200 ${
                  post.liked 
                    ? 'text-red-500 fill-current scale-110' 
                    : 'text-gray-700 group-hover:text-red-500 group-hover:scale-110'
                }`}
              />
            </button>
            <button className="flex items-center space-x-1 hover:bg-blue-50 p-3 rounded-full transition-all duration-200 group">
              <FiMessageSquare 
                size={22} 
                className="text-gray-700 group-hover:text-blue-500 group-hover:scale-110 transition-all duration-200" 
              />
            </button>
            <button className="flex items-center space-x-1 hover:bg-green-50 p-3 rounded-full transition-all duration-200 group">
              <FiSend 
                size={22} 
                className="text-gray-700 group-hover:text-green-500 group-hover:scale-110 transition-all duration-200" 
              />
            </button>
          </div>
          <button 
            onClick={onBookmark}
            className="hover:bg-yellow-50 p-3 rounded-full transition-all duration-200 group"
          >
            <FiBookmark 
              size={22} 
              className={`transition-all duration-200 ${
                post.bookmarked 
                  ? 'text-yellow-500 fill-current scale-110' 
                  : 'text-gray-700 group-hover:text-yellow-500 group-hover:scale-110'
              }`}
            />
          </button>
        </div>

        {/* Post Stats */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-1">
            <span className="font-semibold text-sm text-gray-900">
              {formatNumber(post.stats.likes)} likes
            </span>
          </div>
          
          {post.stats.comments > 0 && (
            <button className="text-gray-500 text-sm hover:text-gray-700 transition-colors">
              View all {post.stats.comments} comments
            </button>
          )}
        </div>

        {/* Add Comment */}
        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-2xl">
          <Image 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60" 
            alt="Your avatar"
            width={28}
            height={28}
            className="rounded-full object-cover"
          />
          <div className="flex-1 flex items-center space-x-2">
            <input 
              type="text" 
              placeholder="Add a comment..."
              className="flex-1 text-sm text-gray-700 placeholder-gray-400 bg-transparent border-none outline-none py-1"
            />
            <button className="text-blue-500 text-sm font-semibold hover:text-blue-600 transition-colors px-2 py-1 rounded-lg hover:bg-blue-50">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ImageModal({ 
  image, 
  onClose 
}: { 
  image: {
    src: string;
    alt: string;
    user: any;
    caption: string;
  };
  onClose: () => void;
}) {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="relative max-w-4xl max-h-full w-full h-full flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 text-white">
          <div className="flex items-center space-x-3">
            <Image 
              src={image.user.avatar} 
              alt={image.user.name}
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-sm">{image.user.name}</h3>
              <p className="text-xs text-gray-300">{image.user.location}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              className="p-2 hover:bg-white hover:bg-opacity-10 rounded-full transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                // Download functionality could be added here
              }}
            >
              <FiDownload size={20} />
            </button>
            <button 
              className="p-2 hover:bg-white hover:bg-opacity-10 rounded-full transition-colors"
              onClick={onClose}
            >
              <FiX size={24} />
            </button>
          </div>
        </div>

        {/* Modal Image */}
        <div className="flex-1 flex items-center justify-center">
          <div 
            className="relative max-w-full max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image 
              src={image.src} 
              alt={image.alt}
              width={800}
              height={600}
              className="max-w-full max-h-full object-contain rounded-lg"
              style={{ width: 'auto', height: 'auto' }}
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 text-white">
          <p className="text-sm leading-relaxed">{image.caption}</p>
        </div>
      </div>
    </div>
  );
}
