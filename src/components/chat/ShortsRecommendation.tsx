'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FiPlay, FiMoreVertical, FiChevronRight } from 'react-icons/fi';

// Sample shorts data with more videos and varied content
const shortsData = [
  {
    id: '1',
    title: 'Tribute To Vadivelu | Gulshan Devaiah As Jimm...',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&auto=format&fit=crop&q=60',
    views: '83K views',
    creator: {
      name: 'Comedy Central',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60'
    },
    stories: [
      { id: '1-1', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&auto=format&fit=crop&q=60' },
      { id: '1-2', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&auto=format&fit=crop&q=60' },
      { id: '1-3', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&auto=format&fit=crop&q=60' },
      { id: '1-4', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&auto=format&fit=crop&q=60' },
      { id: '1-5', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&auto=format&fit=crop&q=60' }
    ]
  },
  {
    id: '2',
    title: '#truedialogue #cat',
    thumbnail: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=400&auto=format&fit=crop&q=60',
    views: '28K views',
    creator: {
      name: 'Pet Lovers',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60'
    },
    stories: [
      { id: '2-1', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=600&auto=format&fit=crop&q=60' },
      { id: '2-2', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&auto=format&fit=crop&q=60' },
      { id: '2-3', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&auto=format&fit=crop&q=60' },
      { id: '2-4', image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=600&auto=format&fit=crop&q=60' },
      { id: '2-5', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=600&auto=format&fit=crop&q=60' }
    ]
  },
  {
    id: '3',
    title: 'SUPPORT THE DEVS!',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=400&auto=format&fit=crop&q=60',
    views: '260K views',
    creator: {
      name: 'Gaming Hub',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60'
    },
    stories: [
      { id: '3-1', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=600&auto=format&fit=crop&q=60' },
      { id: '3-2', image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=600&auto=format&fit=crop&q=60' },
      { id: '3-3', image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=600&auto=format&fit=crop&q=60' },
      { id: '3-4', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=600&auto=format&fit=crop&q=60' },
      { id: '3-5', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=600&auto=format&fit=crop&q=60' }
    ]
  },
  {
    id: '4',
    title: '#vegamon #kerala #love',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=400&auto=format&fit=crop&q=60',
    views: '489K views',
    creator: {
      name: 'Travel Kerala',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=60'
    },
    stories: [
      { id: '4-1', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&auto=format&fit=crop&q=60' },
      { id: '4-2', image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=600&auto=format&fit=crop&q=60' },
      { id: '4-3', image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=600&auto=format&fit=crop&q=60' },
      { id: '4-4', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=600&auto=format&fit=crop&q=60' },
      { id: '4-5', image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=600&auto=format&fit=crop&q=60' }
    ]
  },
  {
    id: '5',
    title: 'The Mum Slap 💀',
    thumbnail: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=400&auto=format&fit=crop&q=60',
    views: '2.8M views',
    creator: {
      name: 'Family Comedy',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=60'
    },
    stories: [
      { id: '5-1', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&auto=format&fit=crop&q=60' },
      { id: '5-2', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&auto=format&fit=crop&q=60' },
      { id: '5-3', image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=600&auto=format&fit=crop&q=60' },
      { id: '5-4', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=600&auto=format&fit=crop&q=60' },
      { id: '5-5', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=600&auto=format&fit=crop&q=60' }
    ]
  },
  {
    id: '6',
    title: 'Amazing Dance Performance',
    thumbnail: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=300&h=400&auto=format&fit=crop&q=60',
    views: '1.2M views',
    creator: {
      name: 'Dance Studio',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60'
    }
  },
  {
    id: '7',
    title: 'Cooking Hacks You Need to Know',
    thumbnail: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=400&auto=format&fit=crop&q=60',
    views: '756K views',
    creator: {
      name: 'Chef Master',
      avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=60'
    }
  },
  {
    id: '8',
    title: 'Street Art Time Lapse',
    thumbnail: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=400&auto=format&fit=crop&q=60',
    views: '432K views',
    creator: {
      name: 'Urban Artist',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=60'
    }
  },
  {
    id: '9',
    title: 'Morning Workout Routine',
    thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=400&auto=format&fit=crop&q=60',
    views: '298K views',
    creator: {
      name: 'Fitness Pro',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=60'
    }
  },
  {
    id: '10',
    title: 'Tech Review: Latest Gadgets',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=400&auto=format&fit=crop&q=60',
    views: '1.1M views',
    creator: {
      name: 'Tech Reviewer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60'
    }
  }
];

export default function ShortsRecommendation({ reverse = false }: { reverse?: boolean }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  
  // Reverse the order if reverse prop is true
  const displayData = reverse ? [...shortsData].reverse() : shortsData;

  return (
    <div className="shorts-recommendation mb-6">
      {/* Shorts Grid - Horizontal Scrollable */}
      <div 
        className="flex overflow-x-auto space-x-6 pl-4 pr-8 pb-2" 
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        
        {displayData.map((short, index) => (
          <div
            key={short.id}
            className={`flex-shrink-0 cursor-pointer group ${index === shortsData.length - 1 ? 'mr-4' : ''}`}
            onMouseEnter={() => setHoveredId(short.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Thumbnail Container */}
            <div className="relative w-60 h-96 rounded-lg overflow-hidden bg-gray-900">
              <Image
                src={short.thumbnail}
                alt={short.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
              {/* Play Button Overlay */}
              <div className={`absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center transition-opacity duration-300 ${
                hoveredId === short.id ? 'opacity-100' : 'opacity-0'
              }`}>
                <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                  <FiPlay size={24} className="text-gray-800 ml-1" />
                </div>
              </div>

              {/* Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent p-4">
                <h3 className="text-white text-sm font-medium leading-tight mb-1" style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical' as any,
                  overflow: 'hidden'
                }}>
                  {short.title}
                </h3>
                <p className="text-gray-300 text-sm">{short.views}</p>
              </div>

              {/* More Options */}
              <button className="absolute top-2 right-2 p-1 hover:bg-black hover:bg-opacity-30 rounded-full transition-colors opacity-0 group-hover:opacity-100">
                <FiMoreVertical size={14} className="text-white" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
