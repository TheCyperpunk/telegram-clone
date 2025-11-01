'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FiBookOpen, FiUsers, FiTrendingUp, FiCheck } from 'react-icons/fi';

// Sample pages data
const pages = [
  {
    id: '1',
    name: 'Tech Daily',
    description: 'Latest technology news, reviews, and insights from industry experts',
    followers: 125000,
    image: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=300&auto=format&fit=crop&q=60',
    category: 'Technology',
    verified: true,
    trending: true
  },
  {
    id: '2',
    name: 'Travel Stories',
    description: 'Inspiring travel stories and destination guides from around the world',
    followers: 89000,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&auto=format&fit=crop&q=60',
    category: 'Travel',
    verified: true,
    trending: false
  },
  {
    id: '3',
    name: 'Design Inspiration',
    description: 'Creative design ideas, tutorials, and showcases for designers',
    followers: 67000,
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&auto=format&fit=crop&q=60',
    category: 'Design',
    verified: false,
    trending: true
  },
  {
    id: '4',
    name: 'Healthy Living',
    description: 'Tips, recipes, and advice for maintaining a healthy lifestyle',
    followers: 54000,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&auto=format&fit=crop&q=60',
    category: 'Health',
    verified: true,
    trending: false
  },
  {
    id: '5',
    name: 'Culinary Arts',
    description: 'Professional cooking techniques, recipes, and food culture',
    followers: 78000,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&auto=format&fit=crop&q=60',
    category: 'Food',
    verified: true,
    trending: true
  },
  {
    id: '6',
    name: 'Book Reviews',
    description: 'In-depth book reviews, author interviews, and reading recommendations',
    followers: 32000,
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&auto=format&fit=crop&q=60',
    category: 'Literature',
    verified: false,
    trending: false
  }
];

export default function PagesContent() {
  const [followedPages, setFollowedPages] = useState<string[]>([]);

  const handleFollowPage = (pageId: string) => {
    if (followedPages.includes(pageId)) {
      setFollowedPages(prev => prev.filter(id => id !== pageId));
    } else {
      setFollowedPages(prev => [...prev, pageId]);
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <div className="pages-content h-full overflow-auto bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        {/* Empty state or other content can go here */}
        <div className="text-center py-20 text-gray-500">
          <p>Channels content</p>
        </div>
      </div>
    </div>
  );
}

function PageCard({ 
  page, 
  isFollowed, 
  onFollow, 
  formatNumber 
}: { 
  page: any;
  isFollowed: boolean;
  onFollow: () => void;
  formatNumber: (num: number) => string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Page Image */}
      <div className="relative h-32">
        <Image 
          src={page.image} 
          alt={page.name}
          fill
          className="object-cover"
        />
        {page.trending && (
          <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Trending
          </div>
        )}
      </div>

      {/* Page Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <div className="flex items-center mb-1">
              <h5 className="font-semibold text-gray-900">{page.name}</h5>
              {page.verified && (
                <div className="ml-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <FiCheck className="text-white" size={10} />
                </div>
              )}
            </div>
            <span className="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
              {page.category}
            </span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {page.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-500 text-sm">
            <FiUsers size={16} className="mr-1" />
            <span>{formatNumber(page.followers)} followers</span>
          </div>
          
          <button
            onClick={onFollow}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              isFollowed 
                ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {isFollowed ? 'Following' : 'Follow'}
          </button>
        </div>
      </div>
    </div>
  );
}
