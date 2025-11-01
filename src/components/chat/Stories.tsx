'use client';

import { useState } from 'react';
import Image from 'next/image';
import StoryCircle from './StoryCircle';
import StoriesModal from './StoriesModal';

// Unsplash photo URLs for stories
const unsplashPhotos = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&auto=format&fit=crop&q=60', // Landscape
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=500&auto=format&fit=crop&q=60', // Nature
  'https://images.unsplash.com/photo-1520962880247-cfaf541c8724?w=500&auto=format&fit=crop&q=60', // Travel
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500&auto=format&fit=crop&q=60', // Mountains
  'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=500&auto=format&fit=crop&q=60', // Forest
  'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=500&auto=format&fit=crop&q=60', // Waterfall
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=500&auto=format&fit=crop&q=60', // Sunset
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=500&auto=format&fit=crop&q=60', // Foggy mountains
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&auto=format&fit=crop&q=60', // Forest path
  'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=500&auto=format&fit=crop&q=60', // Beach
  'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=500&auto=format&fit=crop&q=60', // Mountains lake
  'https://images.unsplash.com/photo-1540206395-68808572332f?w=500&auto=format&fit=crop&q=60'  // Ocean
];

// Unsplash profile photos for avatars
const unsplashProfiles = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60', // Woman profile
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60', // Man profile
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=60', // Woman profile 2
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60', // Man profile 2
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=60', // Woman profile 3
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60', // Man profile 3
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=60', // Woman profile 4
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=60', // Man profile 4
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=60', // Woman profile 5
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=60', // Man profile 5
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=60', // Woman profile 6
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60'  // Man profile 6
];

// Sample story data - expanded to 12 stories with Unsplash photos
const sampleStories = [
  {
    id: '1',
    username: 'Your story',
    avatar: unsplashProfiles[0],
    storyImage: unsplashPhotos[0],
    isCurrentUser: true,
    viewed: false,
    storyCount: 3,
    stories: [
      { id: '1-1', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=600&auto=format&fit=crop&q=60' },
      { id: '1-2', image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=600&auto=format&fit=crop&q=60' },
      { id: '1-3', image: 'https://images.unsplash.com/photo-1520962880247-cfaf541c8724?w=400&h=600&auto=format&fit=crop&q=60' }
    ]
  },
  {
    id: '2',
    username: 'Sonya',
    avatar: unsplashProfiles[1],
    storyImage: unsplashPhotos[1],
    viewed: true,
    storyCount: 2,
    stories: [
      { id: '2-1', image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=600&auto=format&fit=crop&q=60' },
      { id: '2-2', image: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&h=600&auto=format&fit=crop&q=60' }
    ]
  },
  {
    id: '3',
    username: 'Adam',
    avatar: unsplashProfiles[2],
    storyImage: unsplashPhotos[2],
    viewed: false,
    storyCount: 4,
    stories: [
      { id: '3-1', image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&h=600&auto=format&fit=crop&q=60' },
      { id: '3-2', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=600&auto=format&fit=crop&q=60' },
      { id: '3-3', image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=600&auto=format&fit=crop&q=60' },
      { id: '3-4', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=600&auto=format&fit=crop&q=60' }
    ]
  },
  {
    id: '4',
    username: 'Andrew',
    avatar: unsplashProfiles[3],
    storyImage: unsplashPhotos[3],
    viewed: true,
    storyCount: 1,
    stories: [
      { id: '4-1', image: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=400&h=600&auto=format&fit=crop&q=60' }
    ]
  },
  {
    id: '5',
    username: 'Nicole',
    avatar: unsplashProfiles[4],
    storyImage: unsplashPhotos[4],
    viewed: false,
    storyCount: 5,
    stories: [
      { id: '5-1', image: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=400&h=600&auto=format&fit=crop&q=60' },
      { id: '5-2', image: 'https://images.unsplash.com/photo-1540206395-68808572332f?w=400&h=600&auto=format&fit=crop&q=60' },
      { id: '5-3', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&auto=format&fit=crop&q=60' },
      { id: '5-4', image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=600&auto=format&fit=crop&q=60' },
      { id: '5-5', image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=600&auto=format&fit=crop&q=60' }
    ]
  },
  {
    id: '6',
    username: 'Ashley',
    avatar: unsplashProfiles[5],
    storyImage: unsplashPhotos[5],
    viewed: false,
    storyCount: 2,
    stories: [
      { id: '6-1', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=600&auto=format&fit=crop&q=60' },
      { id: '6-2', image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=600&auto=format&fit=crop&q=60' }
    ]
  },
  {
    id: '7',
    username: 'Michael',
    avatar: unsplashProfiles[6],
    storyImage: unsplashPhotos[6],
    viewed: true,
    storyCount: 3,
    stories: [
      { id: '7-1', image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=600&auto=format&fit=crop&q=60' },
      { id: '7-2', image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=600&auto=format&fit=crop&q=60' },
      { id: '7-3', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=600&auto=format&fit=crop&q=60' }
    ]
  },
  {
    id: '8',
    username: 'Damian',
    avatar: unsplashProfiles[7],
    storyImage: unsplashPhotos[7],
    viewed: false,
    storyCount: 1,
    stories: [
      { id: '8-1', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=600&auto=format&fit=crop&q=60' }
    ]
  },
  {
    id: '9',
    username: 'Emma',
    avatar: unsplashProfiles[8],
    storyImage: unsplashPhotos[8],
    viewed: false,
    storyCount: 4,
    stories: [
      { id: '9-1', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&auto=format&fit=crop&q=60' },
      { id: '9-2', image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=600&auto=format&fit=crop&q=60' },
      { id: '9-3', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&auto=format&fit=crop&q=60' },
      { id: '9-4', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&auto=format&fit=crop&q=60' }
    ]
  },
  {
    id: '10',
    username: 'James',
    avatar: unsplashProfiles[9],
    storyImage: unsplashPhotos[9],
    viewed: true,
    storyCount: 2,
    stories: [
      { id: '10-1', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=600&auto=format&fit=crop&q=60' },
      { id: '10-2', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=600&auto=format&fit=crop&q=60' }
    ]
  },
  {
    id: '11',
    username: 'Olivia',
    avatar: unsplashProfiles[10],
    storyImage: unsplashPhotos[10],
    viewed: false,
    storyCount: 6,
    stories: [
      { id: '11-1', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&auto=format&fit=crop&q=60' },
      { id: '11-2', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&auto=format&fit=crop&q=60' },
      { id: '11-3', image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=600&auto=format&fit=crop&q=60' },
      { id: '11-4', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=600&auto=format&fit=crop&q=60' },
      { id: '11-5', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&auto=format&fit=crop&q=60' },
      { id: '11-6', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&auto=format&fit=crop&q=60' }
    ]
  },
  {
    id: '12',
    username: 'William',
    avatar: unsplashProfiles[11],
    storyImage: unsplashPhotos[11],
    viewed: true,
    storyCount: 1,
    stories: [
      { id: '12-1', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&auto=format&fit=crop&q=60' }
    ]
  }
];

// Generate 30 story cards for the grid with Unsplash photos (excluding "Your story")
const otherStories = sampleStories.filter(story => !story.isCurrentUser);
const storyCards = Array.from({ length: 30 }, (_, i) => ({
  id: `card-${i + 1}`,
  username: otherStories[i % otherStories.length].username,
  avatar: otherStories[i % otherStories.length].avatar,
  storyImage: unsplashPhotos[(i % otherStories.length) + 1], // +1 to skip first photo used by "Your story"
  storyCount: otherStories[i % otherStories.length].storyCount,
  viewed: otherStories[i % otherStories.length].viewed
}));

export default function Stories() {
  const [stories, setStories] = useState(sampleStories);
  const [selectedStory, setSelectedStory] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStoryClick = (story: any) => {
    if (story.stories) {
      setSelectedStory(story);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStory(null);
  };
  
  return (
    <div className="stories-container h-full w-full flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Story Circles Row - Horizontal scrollable row of story circles */}
      <div className="story-circles-container px-4 py-2 bg-white border-b border-gray-100 shadow-sm">
        {/* Recent label */}
        <div className="mb-1">
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">recent</p>
        </div>
        <div className="flex overflow-x-auto scrollbar-hide space-x-4">
          {stories.map(story => (
            <StoryCircle
              key={story.id}
              username={story.username}
              avatar={story.avatar}
              isViewed={story.viewed}
              isCurrentUser={story.isCurrentUser || false}
              storyCount={story.storyCount || 1}
              onClick={() => handleStoryClick(story)}
            />
          ))}
        </div>
      </div>
      
      {/* Story Grid - Main content area with story cards */}
      <div className="story-grid-container overflow-auto flex-1 p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {storyCards.map((story, index) => (
            <div 
              key={story.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <StoryCard 
                username={story.username}
                avatar={story.avatar}
                storyImage={story.storyImage}
                storyCount={story.storyCount}
                isViewed={story.viewed}
                onClick={() => {
                  // Find the corresponding story from otherStories
                  const matchingStory = otherStories.find(s => s.username === story.username);
                  if (matchingStory) {
                    handleStoryClick(matchingStory);
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Stories Modal */}
      {selectedStory && (
        <StoriesModal
          isOpen={isModalOpen}
          onClose={closeModal}
          stories={selectedStory.stories || []}
          userName={selectedStory.username}
          userAvatar={selectedStory.avatar}
        />
      )}
    </div>
  );
}

// Enhanced Story Card Component with hover effects
function StoryCard({ username, avatar, storyImage, storyCount = 1, isViewed = false, onClick }: { 
  username: string, 
  avatar: string, 
  storyImage: string,
  storyCount?: number,
  isViewed?: boolean,
  onClick?: () => void
}) {
  // Build a conic-gradient string to create N segments with small gaps
  const buildSegmentedRing = (n: number, color: string, gapDeg = 6) => {
    const safeN = Math.max(1, Math.min(20, Math.floor(n))); // clamp for safety
    const slice = 360 / safeN;
    const seg = Math.max(0, slice - gapDeg);
    const parts: string[] = [];
    for (let i = 0; i < safeN; i++) {
      const start = i * slice;
      const end = start + seg;
      parts.push(`${color} ${start}deg ${end}deg`, `transparent ${end}deg ${start + slice}deg`);
    }
    return `conic-gradient(${parts.join(', ')})`;
  };

  const ringColor = '#FF3B30'; // Red for all stories
  const ringBackground = buildSegmentedRing(storyCount, ringColor);
  return (
    <div 
      className="story-card group relative rounded-xl overflow-hidden shadow-md bg-white transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer"
      onClick={onClick}
    >
      {/* Background Image */}
      <div className="relative aspect-[4/5]">
        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          <Image 
            src={storyImage} 
            alt={username} 
            fill 
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* User Profile Circle with Segmented Ring */}
        <div className="absolute top-3 left-3 transform transition-transform duration-300 group-hover:scale-110">
          <div 
            className="w-10 h-10 rounded-full p-0.5"
            style={{ background: ringBackground }}
          >
            <div className="w-full h-full bg-white rounded-full p-0.5">
              <div className="w-full h-full rounded-full overflow-hidden">
                <Image 
                  src={avatar} 
                  alt={username} 
                  width={32} 
                  height={32} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          {/* Username overlay on the right side */}
          <div className="absolute top-1/2 left-full transform -translate-y-1/2 ml-2 z-20">
            <span className="text-xs font-medium whitespace-nowrap text-white drop-shadow-lg">
              {username}
            </span>
          </div>
        </div>

        {/* Play button overlay on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm">
            <div className="w-0 h-0 border-l-[8px] border-l-gray-800 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
}