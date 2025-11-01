'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FiUsers, FiMessageSquare, FiTrendingUp, FiPlus } from 'react-icons/fi';

// Sample community data
const communities = [
  {
    id: '1',
    name: 'Tech Enthusiasts',
    description: 'Discuss the latest in technology, programming, and innovation',
    members: 15420,
    image: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=300&auto=format&fit=crop&q=60',
    category: 'Technology',
    trending: true
  },
  {
    id: '2',
    name: 'Travel Adventures',
    description: 'Share your travel experiences and discover new destinations',
    members: 8930,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&auto=format&fit=crop&q=60',
    category: 'Travel',
    trending: false
  },
  {
    id: '3',
    name: 'Photography Hub',
    description: 'Showcase your photography skills and learn from others',
    members: 12750,
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&auto=format&fit=crop&q=60',
    category: 'Arts',
    trending: true
  },
  {
    id: '4',
    name: 'Fitness & Health',
    description: 'Your journey to a healthier lifestyle starts here',
    members: 6840,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&auto=format&fit=crop&q=60',
    category: 'Health',
    trending: false
  },
  {
    id: '5',
    name: 'Food Lovers',
    description: 'Recipes, restaurant reviews, and culinary adventures',
    members: 9650,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&auto=format&fit=crop&q=60',
    category: 'Food',
    trending: true
  },
  {
    id: '6',
    name: 'Book Club',
    description: 'Discuss books, share recommendations, and connect with readers',
    members: 4320,
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&auto=format&fit=crop&q=60',
    category: 'Literature',
    trending: false
  }
];

export default function CommunityContent() {
  const [joinedCommunities, setJoinedCommunities] = useState<string[]>([]);

  const handleJoinCommunity = (communityId: string) => {
    if (joinedCommunities.includes(communityId)) {
      setJoinedCommunities(prev => prev.filter(id => id !== communityId));
    } else {
      setJoinedCommunities(prev => [...prev, communityId]);
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <div className="community-content h-full overflow-auto bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Discover Communities</h3>
          <p className="text-gray-600 text-sm">Join communities that match your interests</p>
        </div>

        {/* Trending Communities */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <FiTrendingUp className="text-orange-500 mr-2" size={20} />
            <h4 className="text-md font-semibold text-gray-900">Trending Communities</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {communities.filter(community => community.trending).map(community => (
              <CommunityCard 
                key={community.id}
                community={community}
                isJoined={joinedCommunities.includes(community.id)}
                onJoin={() => handleJoinCommunity(community.id)}
                formatNumber={formatNumber}
              />
            ))}
          </div>
        </div>

        {/* All Communities */}
        <div>
          <div className="flex items-center mb-4">
            <FiUsers className="text-blue-500 mr-2" size={20} />
            <h4 className="text-md font-semibold text-gray-900">All Communities</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {communities.map(community => (
              <CommunityCard 
                key={community.id}
                community={community}
                isJoined={joinedCommunities.includes(community.id)}
                onJoin={() => handleJoinCommunity(community.id)}
                formatNumber={formatNumber}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CommunityCard({ 
  community, 
  isJoined, 
  onJoin, 
  formatNumber 
}: { 
  community: any;
  isJoined: boolean;
  onJoin: () => void;
  formatNumber: (num: number) => string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Community Image */}
      <div className="relative h-32">
        <Image 
          src={community.image} 
          alt={community.name}
          fill
          className="object-cover"
        />
        {community.trending && (
          <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Trending
          </div>
        )}
      </div>

      {/* Community Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h5 className="font-semibold text-gray-900 mb-1">{community.name}</h5>
            <span className="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
              {community.category}
            </span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {community.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-500 text-sm">
            <FiUsers size={16} className="mr-1" />
            <span>{formatNumber(community.members)} members</span>
          </div>
          
          <button
            onClick={onJoin}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              isJoined 
                ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {isJoined ? 'Joined' : 'Join'}
          </button>
        </div>
      </div>
    </div>
  );
}
