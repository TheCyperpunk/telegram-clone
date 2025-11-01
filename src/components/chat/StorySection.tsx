'use client';

import { useState } from 'react';
import StoryCard from './StoryCard';
import StoryCircle from './StoryCircle';

// Unsplash photo URLs for stories
const unsplashPhotos = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&auto=format&fit=crop&q=60', // Landscape
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=500&auto=format&fit=crop&q=60', // Nature
  'https://images.unsplash.com/photo-1520962880247-cfaf541c8724?w=500&auto=format&fit=crop&q=60', // Travel
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500&auto=format&fit=crop&q=60', // Mountains
  'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=500&auto=format&fit=crop&q=60', // Forest
  'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=500&auto=format&fit=crop&q=60', // Waterfall
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=500&auto=format&fit=crop&q=60', // Sunset
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=500&auto=format&fit=crop&q=60' // Foggy mountains
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
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=60' // Man profile 4
];

// Sample story data
const sampleStories = [
  {
    id: '1',
    username: 'john_doe',
    avatar: unsplashProfiles[0],
    imageUrl: unsplashPhotos[0],
    caption: 'Working on a new project! #coding #webdev',
    likes: 42,
    timestamp: '2 hours ago',
    hasLiked: false,
    viewed: false
  },
  {
    id: '2',
    username: 'jane_smith',
    avatar: unsplashProfiles[1],
    imageUrl: unsplashPhotos[1],
    caption: 'Beautiful day at the beach! 🏖️ #summer #vacation',
    likes: 78,
    timestamp: '5 hours ago',
    hasLiked: true,
    viewed: true
  },
  {
    id: '3',
    username: 'tech_enthusiast',
    avatar: unsplashProfiles[2],
    imageUrl: unsplashPhotos[2],
    caption: 'Just got the latest gadget! What do you think? #tech #gadgets',
    likes: 56,
    timestamp: '1 day ago',
    hasLiked: false,
    viewed: false
  },
  {
    id: '4',
    username: 'travel_lover',
    avatar: unsplashProfiles[3],
    imageUrl: unsplashPhotos[3],
    caption: 'Exploring new places! #travel #adventure',
    likes: 120,
    timestamp: '2 days ago',
    hasLiked: false,
    viewed: true
  },
  {
    id: '5',
    username: 'Michael',
    avatar: unsplashProfiles[4],
    imageUrl: unsplashPhotos[4],
    caption: 'Working on some new designs',
    likes: 89,
    timestamp: '3 hours ago',
    hasLiked: false,
    viewed: false
  },
  {
    id: '6',
    username: 'Damian',
    avatar: unsplashProfiles[5],
    imageUrl: unsplashPhotos[5],
    caption: 'Check out this view!',
    likes: 65,
    timestamp: '6 hours ago',
    hasLiked: true,
    viewed: false
  },
  {
    id: '7',
    username: 'Nicole',
    avatar: unsplashProfiles[6],
    imageUrl: unsplashPhotos[6],
    caption: 'New art piece finished today',
    likes: 112,
    timestamp: '1 day ago',
    hasLiked: false,
    viewed: true
  },
  {
    id: '8',
    username: 'Andrew',
    avatar: unsplashProfiles[7],
    imageUrl: unsplashPhotos[7],
    caption: 'Just hiked this amazing trail',
    likes: 74,
    timestamp: '4 hours ago',
    hasLiked: false,
    viewed: false
  }
];

export default function StorySection() {
  const [stories, setStories] = useState(sampleStories);
  const [selectedStory, setSelectedStory] = useState<string | null>(null);

  const handleStoryClick = (storyId: string) => {
    setSelectedStory(storyId);
    // In a real app, you would mark the story as viewed here
  };

  return (
    <div className="story-section h-full flex flex-col">
      {/* Story Circles Row */}
      <div className="story-circles-container p-2 border-b border-gray-200">
        <div className="flex overflow-auto hide-scrollbar py-2">
          {/* Current User Story Circle */}
          <StoryCircle 
            username="You"
            avatar={unsplashProfiles[0]}
            isCurrentUser={true}
            onClick={() => console.log('Add story clicked')}
          />
          
          {/* Other Users' Story Circles */}
          {stories.map(story => (
            <StoryCircle
              key={story.id}
              username={story.username}
              avatar={story.avatar}
              isViewed={story.viewed}
              onClick={() => handleStoryClick(story.id)}
            />
          ))}
        </div>
      </div>
      
      {/* Feed Section */}
      <div className="story-feed overflow-auto flex-grow bg-gray-50">
        <div className="w-full p-0">
          {/* Story Cards */}
          {stories.map(story => (
            <div key={story.id} className="mb-3">
              <StoryCard
                id={story.id}
                username={story.username}
                avatar={story.avatar}
                imageUrl={story.imageUrl}
                storyImage={story.imageUrl} // Add storyImage prop
                caption={story.caption}
                likes={story.likes}
                timestamp={story.timestamp}
                hasLiked={story.hasLiked}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}