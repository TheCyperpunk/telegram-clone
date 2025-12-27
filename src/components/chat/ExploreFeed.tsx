'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiHeart, FiMessageSquare, FiShare2, FiMoreHorizontal, FiMusic, FiVideo, FiFileText, FiMoreVertical, FiCamera, FiPlay, FiCopy } from 'react-icons/fi';
import ContentDetailPage from './ContentDetailPage';
import ExploreFilterTabs from './ExploreFilterTabs';
import FeedsContent from './FeedsContent';
import PagesContent from './PagesContent';

// Unsplash photo URLs for posts with different dimensions and orientations
// Unsplash photo URLs - Curated list of reliable high-quality images
const unsplashPhotos = [
  // Nature & Landscapes
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&auto=format&fit=crop&q=60',

  // Architecture & Urban
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&auto=format&fit=crop&q=60',

  // Technology & Work
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1504384308090-c54be3852f33?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=60',

  // Lifestyle & People
  'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&auto=format&fit=crop&q=60',

  // Food & Drink
  'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1499028344343-cd17bfa55a08?w=800&auto=format&fit=crop&q=60',

  // Arts & Abstract
  'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1515405295579-ba7b45403062?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&auto=format&fit=crop&q=60',

  // Animals
  'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=800&auto=format&fit=crop&q=60'
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

// Sample usernames
const usernames = [
  'john_doe', 'travel_lover', 'photo_enthusiast', 'nature_explorer',
  'city_wanderer', 'food_critic', 'art_admirer', 'music_fan',
  'adventure_seeker', 'sunset_chaser', 'urban_photographer', 'coffee_addict'
];

// Sample post captions without hashtags
const captions = [
  'Exploring new places',
  'The view was worth the climb',
  'Lost in the moment',
  'City lights and urban nights',
  'Delicious finds in hidden corners',
  'Music that speaks to the soul',
  'Art is everywhere if you look closely',
  'Morning coffee and good vibes',
  'Weekend getaway to recharge',
  'Architecture that tells stories',
  'Creative process in action',
  'Modern minimalism at its finest',
  'Fashion forward thinking',
  'Workspace goals achieved',
  'Abstract thoughts visualized',
  'Street photography magic',
  'Product design perfection',
  'Branding that speaks volumes',
  'Typography in the wild',
  'Color palette inspiration',
  'Geometric patterns everywhere',
  'Vintage meets modern',
  'Sustainable design matters',
  'Digital art exploration',
  'Motion graphics in progress',
  'Festival vibes and energy',
  'Cute moments captured',
  'Home sweet home',
  'Dream car collection',
  'Perfect weekend drive'
];

// Post types
type PostType = 'photo' | 'photos' | 'video' | 'short_video' | 'music' | 'article';

// Post interface
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
  type: PostType;
  title?: string; // For articles and music
  duration?: string; // For videos and music
  source?: string; // For articles
  height: number; // For masonry layout
  aspectRatio: 'square' | 'portrait' | 'landscape' | 'tall' | 'wide'; // Different aspect ratios
  platform?: string; // For social media platforms
  videoId?: string; // For video platforms
}

// Social media content from FeedsContent
const socialMediaContent = [
  // YouTube Videos (Long videos - wide aspect ratio)
  {
    id: 'youtube-1',
    username: 'tech_reviewer',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60',
    image: 'https://img.youtube.com/vi/iDqSKfIQ-q4/maxresdefault.jpg',
    caption: '🎥 Amazing Tech Review!',
    likes: 15234,
    comments: 892,
    shares: 2341,
    time: '1 hour ago',
    type: 'video' as PostType,
    height: 180,
    aspectRatio: 'wide' as const,
    duration: '8:45',
    videoId: 'iDqSKfIQ-q4',
    platform: 'youtube'
  },
  {
    id: 'youtube-2',
    username: 'music_lover',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60',
    image: 'https://img.youtube.com/vi/nb_fFj_0rq8/maxresdefault.jpg',
    caption: '🎵 Epic Music Video!',
    likes: 23456,
    comments: 1234,
    shares: 3456,
    time: '2 hours ago',
    type: 'video' as PostType,
    height: 180,
    aspectRatio: 'wide' as const,
    duration: '4:32',
    videoId: 'nb_fFj_0rq8',
    platform: 'youtube'
  },

  // YouTube Shorts (Short videos - tall aspect ratio)
  {
    id: 'youtube-short-1',
    username: 'trending_shorts',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60',
    image: 'https://img.youtube.com/vi/mWbxOjykArw/maxresdefault.jpg',
    caption: '🔥 Trending Short!',
    likes: 45678,
    comments: 2341,
    shares: 5678,
    time: '30 minutes ago',
    type: 'short_video' as PostType,
    height: 450,
    aspectRatio: 'tall' as const,
    duration: '0:45',
    videoId: 'mWbxOjykArw',
    platform: 'youtube'
  },
  {
    id: 'youtube-short-2',
    username: 'dance_vibes',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=60',
    image: 'https://img.youtube.com/vi/QWpDDHw0PMc/maxresdefault.jpg',
    caption: '💃 Smooth Moves!',
    likes: 52341,
    comments: 2987,
    shares: 6543,
    time: '2 hours ago',
    type: 'short_video' as PostType,
    height: 450,
    aspectRatio: 'tall' as const,
    duration: '0:58',
    videoId: 'QWpDDHw0PMc',
    platform: 'youtube'
  },

  // Vimeo Videos (Professional content - wide aspect ratio)
  {
    id: 'vimeo-1',
    username: 'creative_pro',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60',
    image: 'https://vumbnail.com/347119375.jpg',
    caption: '🎬 Professional Video Production',
    likes: 8934,
    comments: 456,
    shares: 1234,
    time: '3 hours ago',
    type: 'video' as PostType,
    height: 180,
    aspectRatio: 'wide' as const,
    duration: '6:12',
    videoId: '347119375',
    platform: 'vimeo'
  },
  {
    id: 'vimeo-2',
    username: 'motion_designer',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=60',
    image: 'https://vumbnail.com/897818060.jpg',
    caption: '⚡ Motion Graphics Demo',
    likes: 15678,
    comments: 923,
    shares: 3456,
    time: '6 hours ago',
    type: 'video' as PostType,
    height: 180,
    aspectRatio: 'wide' as const,
    duration: '3:45',
    videoId: '897818060',
    platform: 'vimeo'
  },

  // Dailymotion Videos (Wide aspect ratio)
  {
    id: 'dailymotion-1',
    username: 'dailymotion_pro',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60',
    image: 'https://www.dailymotion.com/thumbnail/video/x9fo68m',
    caption: '🎬 Amazing Dailymotion Content!',
    likes: 7892,
    comments: 345,
    shares: 1123,
    time: '2 hours ago',
    type: 'video' as PostType,
    height: 180,
    aspectRatio: 'wide' as const,
    duration: '5:23',
    videoId: 'x9fo68m',
    platform: 'dailymotion'
  },
  {
    id: 'dailymotion-2',
    username: 'cinema_francais',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=60',
    image: 'https://www.dailymotion.com/thumbnail/video/x9oafl0',
    caption: '🎬 French Cinema Excellence',
    likes: 15678,
    comments: 892,
    shares: 3456,
    time: '6 hours ago',
    type: 'video' as PostType,
    height: 180,
    aspectRatio: 'wide' as const,
    duration: '7:18',
    videoId: 'x9oafl0',
    platform: 'dailymotion'
  },

  // Rutube Shorts (Portrait aspect ratio)
  {
    id: 'rutube-short-1',
    username: 'rutubeshorts',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60',
    image: 'https://pic.rutubelist.ru/video/f1/e0/f1e0d8d0b4a3f02601317691df089f37.jpg',
    caption: '🎬 Amazing Rutube Short!',
    likes: 38456,
    comments: 723,
    shares: 1012,
    time: '4 days ago',
    type: 'short_video' as PostType,
    height: 420,
    aspectRatio: 'tall' as const,
    duration: '0:52',
    videoId: 'f1e0d8d0b4a3f02601317691df089f37',
    platform: 'rutube'
  },
  {
    id: 'rutube-short-2',
    username: 'rutubeviral',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60',
    image: 'https://pic.rutubelist.ru/video/05/10/051066708b2e900f8e1de8765c300387.jpg',
    caption: '🔥 Viral Short!',
    likes: 67890,
    comments: 1234,
    shares: 2345,
    time: '5 days ago',
    type: 'short_video' as PostType,
    height: 420,
    aspectRatio: 'tall' as const,
    duration: '0:38',
    videoId: '051066708b2e900f8e1de8765c300387',
    platform: 'rutube'
  },

  // VK Videos (Landscape aspect ratio)
  {
    id: 'vk-video-1',
    username: 'vkcreator',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60',
    image: 'https://images.unsplash.com/photo-1574267432644-f610f5b7e4d1?w=800&auto=format&fit=crop&q=60',
    caption: '🎬 Amazing VK Video!',
    likes: 34567,
    comments: 678,
    shares: 890,
    time: '20 hours ago',
    type: 'video' as PostType,
    height: 200,
    aspectRatio: 'landscape' as const,
    duration: '4:15',
    videoId: '-59336195_456239378',
    platform: 'vk'
  },
  {
    id: 'vk-video-2',
    username: 'vktrending',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&auto=format&fit=crop&q=60',
    caption: '🔥 Trending Now!',
    likes: 63789,
    comments: 1234,
    shares: 2345,
    time: '1 day ago',
    type: 'video' as PostType,
    height: 200,
    aspectRatio: 'landscape' as const,
    duration: '3:42',
    videoId: '-222693769_456239541',
    platform: 'vk'
  },

  // Bilibili Videos (Wide aspect ratio)
  {
    id: 'bilibili-1',
    username: 'bilibilicreator',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60',
    image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&auto=format&fit=crop&q=60',
    caption: '🎬 Amazing Bilibili Video!',
    likes: 56789,
    comments: 1234,
    shares: 2345,
    time: '1 day ago',
    type: 'video' as PostType,
    height: 180,
    aspectRatio: 'wide' as const,
    duration: '6:30',
    videoId: 'BV1bzCcBoE26',
    platform: 'bilibili'
  },

  // Instagram Reels (Portrait aspect ratio)
  {
    id: 'instagram-reel-1',
    username: 'travelexplorer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&auto=format&fit=crop&q=60',
    caption: '🌴 Paradise Found!',
    likes: 67890,
    comments: 1345,
    shares: 2134,
    time: '19 hours ago',
    type: 'short_video' as PostType,
    height: 400,
    aspectRatio: 'portrait' as const,
    duration: '0:30',
    videoId: 'C4FvChHvcqi',
    platform: 'instagram'
  },

  // Regular Photos (Various aspect ratios)
  {
    id: 'photo-1',
    username: 'photo_pro',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=60',
    image: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800&h=1200&auto=format&fit=crop&q=60',
    caption: '🏔️ Aurora Borealis over Icelandic Mountains',
    likes: 12456,
    comments: 234,
    shares: 567,
    time: '5 hours ago',
    type: 'photo' as PostType,
    height: 380,
    aspectRatio: 'tall' as const
  },
  {
    id: 'photo-2',
    username: 'city_lights',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=60',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1400&h=700&auto=format&fit=crop&q=60',
    caption: '🌃 Manhattan Skyline at Dusk',
    likes: 8765,
    comments: 123,
    shares: 345,
    time: '8 hours ago',
    type: 'photo' as PostType,
    height: 160,
    aspectRatio: 'wide' as const
  },
  {
    id: 'photo-3',
    username: 'travel_diaries',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=60',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&h=1200&auto=format&fit=crop&q=60',
    caption: '🇬🇷 Sunset in Santorini',
    likes: 15432,
    comments: 456,
    shares: 789,
    time: '12 hours ago',
    type: 'photo' as PostType,
    height: 380,
    aspectRatio: 'tall' as const
  },

  // OK.ru Videos
  {
    id: 'ok-1',
    username: 'OKContent',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop&q=60',
    caption: '🎬 Viral OK Content',
    likes: 45678,
    comments: 892,
    shares: 1234,
    time: '2 days ago',
    type: 'video' as PostType,
    height: 200,
    aspectRatio: 'landscape' as const,
    duration: '3:45',
    videoId: '9284627729025',
    platform: 'ok'
  },
  {
    id: 'ok-2',
    username: 'OKTrending',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60',
    image: 'https://images.unsplash.com/photo-1492619875027-88519f0782b9?w=800&auto=format&fit=crop&q=60',
    caption: '🔥 Amazing Moments',
    likes: 67890,
    comments: 1456,
    shares: 2345,
    time: '1 day ago',
    type: 'video' as PostType,
    height: 200,
    aspectRatio: 'landscape' as const,
    duration: '4:20',
    videoId: '10680389208622',
    platform: 'ok'
  },
  {
    id: 'ok-3',
    username: 'OKViral',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=60',
    caption: '📹 Must Watch!',
    likes: 34567,
    comments: 678,
    shares: 890,
    time: '3 days ago',
    type: 'video' as PostType,
    height: 200,
    aspectRatio: 'landscape' as const,
    duration: '2:30',
    videoId: '7475662490142',
    platform: 'ok'
  },
  {
    id: 'ok-4',
    username: 'OKHits',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60',
    image: 'https://images.unsplash.com/photo-1492724441997-cd780d836b39?w=800&auto=format&fit=crop&q=60',
    caption: '🎥 Trending Now',
    likes: 56789,
    comments: 1234,
    shares: 1678,
    time: '4 days ago',
    type: 'video' as PostType,
    height: 200,
    aspectRatio: 'landscape' as const,
    duration: '5:15',
    videoId: '8251410876978',
    platform: 'ok'
  },
  {
    id: 'ok-5',
    username: 'OKBest',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=60',
    caption: '✨ Epic Content',
    likes: 78901,
    comments: 2345,
    shares: 3456,
    time: '5 days ago',
    type: 'video' as PostType,
    height: 200,
    aspectRatio: 'landscape' as const,
    duration: '3:00',
    videoId: '8251402357298',
    platform: 'ok'
  },

  // Twitter/X Posts
  {
    id: 'twitter-1',
    username: 'harbour_ind_cap',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60', // Data analytics dashboard
    caption: '📊 Industry Insights',
    likes: 12345,
    comments: 234,
    shares: 456,
    time: '6 hours ago',
    type: 'photo' as PostType,
    height: 250,
    aspectRatio: 'square' as const,
    platform: 'twitter'
  },
  {
    id: 'twitter-2',
    username: 'TechUpdates',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=60',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=60', // Tech workspace
    caption: '🚀 Breaking Tech News',
    likes: 23456,
    comments: 567,
    shares: 890,
    time: '12 hours ago',
    type: 'video' as PostType,
    height: 200,
    aspectRatio: 'landscape' as const,
    duration: '1:45',
    videoId: '1987991875811528876',
    platform: 'twitter'
  },
  {
    id: 'twitter-3',
    username: 'DOTmeetups',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=60',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60', // Conference/meetup
    caption: '🎯 Community Event',
    likes: 34567,
    comments: 678,
    shares: 901,
    time: '1 day ago',
    type: 'photo' as PostType,
    height: 250,
    aspectRatio: 'square' as const,
    platform: 'twitter'
  },
  {
    id: 'twitter-4',
    username: 'WTFxZo',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=60',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=60', // Digital/futuristic
    caption: '😱 Mind Blown!',
    likes: 45678,
    comments: 890,
    shares: 1234,
    time: '2 days ago',
    type: 'photo' as PostType,
    height: 250,
    aspectRatio: 'square' as const,
    platform: 'twitter'
  },
  {
    id: 'twitter-5',
    username: 'TrendingNow',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60',
    image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&auto=format&fit=crop&q=60', // Social media concept
    caption: '🔥 Viral Tweet',
    likes: 56789,
    comments: 1234,
    shares: 2345,
    time: '3 days ago',
    type: 'video' as PostType,
    height: 200,
    aspectRatio: 'landscape' as const,
    duration: '0:45',
    videoId: '1987931778825551978',
    platform: 'twitter'
  },
  {
    id: 'twitter-6',
    username: 'NewsBreaker',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=60',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop&q=60', // News/journalism
    caption: '📰 Latest Updates',
    likes: 67890,
    comments: 1456,
    shares: 2678,
    time: '4 days ago',
    type: 'video' as PostType,
    height: 200,
    aspectRatio: 'landscape' as const,
    duration: '1:20',
    videoId: '1987765669069541866',
    platform: 'twitter'
  },

  // Bilibili Video
  {
    id: 'bilibili-new-1',
    username: 'BilibiliCreator',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60',
    image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&auto=format&fit=crop&q=60',
    caption: '🎬 Epic Bilibili Content',
    likes: 89012,
    comments: 2345,
    shares: 3456,
    time: '1 day ago',
    type: 'video' as PostType,
    height: 180,
    aspectRatio: 'wide' as const,
    duration: '8:45',
    videoId: 'BV1Cj2ABwEkr',
    platform: 'bilibili'
  },

  // Reddit Post
  {
    id: 'reddit-1',
    username: 'NothingTech',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop&q=60',
    caption: '📱 Nothing 2a - 1 Year Experience',
    likes: 12345,
    comments: 456,
    shares: 789,
    time: '8 hours ago',
    type: 'article' as PostType,
    height: 200,
    aspectRatio: 'landscape' as const,
    title: 'Nothing 2a Review',
    source: 'reddit.com'
  },

  // Instagram Reels
  {
    id: 'instagram-new-1',
    username: 'InstaCreator',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60',
    image: 'https://images.unsplash.com/photo-1492619875027-88519f0782b9?w=800&auto=format&fit=crop&q=60',
    caption: '✨ Amazing Reel',
    likes: 78901,
    comments: 1567,
    shares: 2345,
    time: '10 hours ago',
    type: 'short_video' as PostType,
    height: 400,
    aspectRatio: 'portrait' as const,
    duration: '0:28',
    videoId: 'DP0WfWtgXCI',
    platform: 'instagram'
  },
  {
    id: 'instagram-new-2',
    username: 'ReelMaster',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=60',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=60',
    caption: '🎥 Trending Reel',
    likes: 90123,
    comments: 2345,
    shares: 3456,
    time: '14 hours ago',
    type: 'short_video' as PostType,
    height: 400,
    aspectRatio: 'portrait' as const,
    duration: '0:35',
    videoId: 'CwuwoWUyzip',
    platform: 'instagram'
  },
  {
    id: 'instagram-new-3',
    username: 'ViralReels',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=60',
    image: 'https://images.unsplash.com/photo-1492724441997-cd780d836b39?w=800&auto=format&fit=crop&q=60',
    caption: '🔥 Must Watch Reel',
    likes: 101234,
    comments: 3456,
    shares: 4567,
    time: '18 hours ago',
    type: 'short_video' as PostType,
    height: 400,
    aspectRatio: 'portrait' as const,
    duration: '0:42',
    videoId: 'DKwulmHSfco',
    platform: 'instagram'
  },

  // Pinterest Pins
  {
    id: 'pinterest-1',
    username: 'PinInspiration',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=60',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=60',
    caption: '📌 Beautiful Design',
    likes: 23456,
    comments: 345,
    shares: 567,
    time: '1 day ago',
    type: 'photo' as PostType,
    height: 380,
    aspectRatio: 'tall' as const,
    videoId: '912190099547923690',
    platform: 'pinterest'
  },
  {
    id: 'pinterest-2',
    username: 'CreativeIdeas',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=60',
    caption: '🎨 Artistic Vision',
    likes: 34567,
    comments: 456,
    shares: 678,
    time: '2 days ago',
    type: 'photo' as PostType,
    height: 380,
    aspectRatio: 'tall' as const,
    videoId: '5066618329889076',
    platform: 'pinterest'
  },
  {
    id: 'pinterest-3',
    username: 'DesignLovers',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=60',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&auto=format&fit=crop&q=60',
    caption: '✨ Stunning Pin',
    likes: 45678,
    comments: 567,
    shares: 789,
    time: '3 days ago',
    type: 'photo' as PostType,
    height: 380,
    aspectRatio: 'tall' as const,
    videoId: '2111131073162433',
    platform: 'pinterest'
  },
  {
    id: 'pinterest-4',
    username: 'PinPerfect',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=60',
    image: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&auto=format&fit=crop&q=60',
    caption: '🌟 Inspiration Board',
    likes: 56789,
    comments: 678,
    shares: 890,
    time: '4 days ago',
    type: 'photo' as PostType,
    height: 380,
    aspectRatio: 'tall' as const,
    videoId: '912190099546073047',
    platform: 'pinterest'
  },
  {
    id: 'pinterest-5',
    username: 'TrendyPins',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=60',
    image: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&auto=format&fit=crop&q=60',
    caption: '💡 Creative Ideas',
    likes: 67890,
    comments: 789,
    shares: 901,
    time: '5 days ago',
    type: 'photo' as PostType,
    height: 380,
    aspectRatio: 'tall' as const,
    videoId: '912190099546441807',
    platform: 'pinterest'
  },
  {
    id: 'pinterest-6',
    username: 'PinStyle',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=60',
    caption: '🏛️ Architecture Pin',
    likes: 78901,
    comments: 890,
    shares: 1012,
    time: '6 days ago',
    type: 'photo' as PostType,
    height: 380,
    aspectRatio: 'tall' as const,
    videoId: '912190099547886508',
    platform: 'pinterest'
  },
  {
    id: 'pinterest-7',
    username: 'PinCollection',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=60',
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&auto=format&fit=crop&q=60',
    caption: '🌆 Urban Beauty',
    likes: 89012,
    comments: 901,
    shares: 1123,
    time: '1 week ago',
    type: 'photo' as PostType,
    height: 380,
    aspectRatio: 'tall' as const,
    videoId: '912190099547916785',
    platform: 'pinterest'
  },
  {
    id: 'pinterest-8',
    username: 'PinArt',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=60',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=60',
    caption: '🎭 Creative Expression',
    likes: 90123,
    comments: 1012,
    shares: 1234,
    time: '1 week ago',
    type: 'photo' as PostType,
    height: 380,
    aspectRatio: 'tall' as const,
    videoId: '3166662232566124',
    platform: 'pinterest'
  },

  // VK Videos
  {
    id: 'vk-new-1',
    username: 'VKCreative',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60',
    image: 'https://images.unsplash.com/photo-1574267432644-f610f5b7e4d1?w=800&auto=format&fit=crop&q=60',
    caption: '🎬 VK Exclusive',
    likes: 45678,
    comments: 789,
    shares: 1012,
    time: '1 day ago',
    type: 'video' as PostType,
    height: 200,
    aspectRatio: 'landscape' as const,
    duration: '5:30',
    videoId: '-139315008_456253741',
    platform: 'vk'
  },
  {
    id: 'vk-new-2',
    username: 'VKTrends',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&auto=format&fit=crop&q=60',
    caption: '🔥 Trending VK',
    likes: 56789,
    comments: 890,
    shares: 1234,
    time: '2 days ago',
    type: 'video' as PostType,
    height: 200,
    aspectRatio: 'landscape' as const,
    duration: '4:15',
    videoId: '-49388814_456317476',
    platform: 'vk'
  },

  // Rutube Video
  {
    id: 'rutube-new-1',
    username: 'RutubeHits',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60',
    image: 'https://pic.rutubelist.ru/video/6c/9b/6c9ba68fed4cd8cfdbc077d99f5e1a65.jpg',
    caption: '🎥 Rutube Featured',
    likes: 67890,
    comments: 1234,
    shares: 2345,
    time: '1 day ago',
    type: 'video' as PostType,
    height: 200,
    aspectRatio: 'landscape' as const,
    duration: '6:20',
    videoId: '6c9ba68fed4cd8cfdbc077d99f5e1a65',
    platform: 'rutube'
  }
];

// YouTube Movie Trailers provided by user
const youtubeTrailers = [
  { id: 'YoHD9XEInc0', title: 'Inception - Official Trailer' },
  { id: 'zSWdZVtXT7E', title: 'Interstellar - Official Trailer' },
  { id: 'EXeTwQWrcwY', title: 'The Dark Knight - Trailer' },
  { id: '5PSNL1qE6VY', title: 'Avatar - Official Trailer' },
  { id: 'TcMBFSGVi1c', title: 'Avengers: Endgame - Official Trailer' },
  { id: '6ZfuNTqbHE8', title: 'Avengers: Infinity War - Trailer' },
  { id: 'L3pk_TBkihU', title: 'Spider-Man: No Way Home - Trailer' },
  { id: 'OiTiKOy59o4', title: 'Joker - Final Trailer' },
  { id: 'n9xhJrPXop4', title: 'Dune - Official Trailer' },
  { id: 'hEJnMQG9ev8', title: 'Mad Max: Fury Road - Trailer' },
  { id: 'RFinNxS5KN4', title: 'Jurassic Park - Trailer' },
  { id: '9ix7TUGVYIo', title: 'The Matrix - Trailer' },
  { id: '2AUmvWm5ZDQ', title: 'Gladiator - Trailer' },
  { id: 'wb49-oV0F78', title: 'Mission: Impossible - Fallout' },
  { id: 'mqqft2x_Aa4', title: 'The Batman - Main Trailer' },
  { id: 'dxWvtMOGAhw', title: 'Oppenheimer - New Trailer' },
  { id: 'Lt-U_t2pUHI', title: 'Blade Runner 2049 - Trailer' },
  { id: 'NbFAl6u6Q_c', title: 'Cyberpunk 2077 - Cinematic Trailer' },
  { id: 'sGbxmsDFVnE', title: 'Stranger Things 4 - Trailer' },
  { id: 'LoebZZ8K5N0', title: 'The Witcher - Main Trailer' }
];

// Dailymotion Videos provided by user
const dailymotionVideos = [
  'x8q0g1a', 'x8p2f3m', 'x8h2p7l', 'x8l9z8v', 'x8m6t8k',
  'x8o1mcz', 'x8k8xsu', 'x8gyr4n', 'x8r6f0o', 'x8mjqsa',
  'x8o7n28'
];

// Generate posts with mixed social media content
const generatePosts = (): Post[] => {
  const postTypes: PostType[] = ['photo', 'photos', 'video', 'short_video', 'music', 'article'];
  const timeAgo = ['Just now', '5m ago', '10m ago', '15m ago', '30m ago', '1h ago', '2h ago', '3h ago', 'Yesterday', '2d ago'];

  const regularPosts = Array.from({ length: 120 }, (_, i) => {
    const type = postTypes[i % 6];
    const randomUsername = usernames[Math.floor(Math.random() * usernames.length)];
    const randomCaption = captions[Math.floor(Math.random() * captions.length)];
    const randomLikes = Math.floor(Math.random() * 50000) + 100;
    const randomComments = Math.floor(Math.random() * 1000) + 10;
    const randomShares = Math.floor(Math.random() * 500) + 5;

    // Define different aspect ratios with corresponding heights
    const aspectRatios: Array<{ ratio: 'square' | 'portrait' | 'landscape' | 'tall' | 'wide', height: number }> = [
      { ratio: 'square', height: 250 },      // 1:1 ratio
      { ratio: 'portrait', height: 320 },    // 3:4 ratio
      { ratio: 'landscape', height: 200 },   // 4:3 ratio
      { ratio: 'tall', height: 400 },        // 2:3 ratio (tall)
      { ratio: 'wide', height: 160 },        // 16:9 ratio (wide)
    ];

    const selectedAspect = aspectRatios[Math.floor(Math.random() * aspectRatios.length)];

    const post: Post = {
      id: `post-${i + 1}`,
      username: randomUsername,
      avatar: unsplashProfiles[i % unsplashProfiles.length],
      image: unsplashPhotos[i % unsplashPhotos.length],
      caption: randomCaption,
      likes: randomLikes,
      comments: randomComments,
      shares: randomShares,
      time: timeAgo[i % timeAgo.length],
      type: type,
      height: selectedAspect.height + Math.floor(Math.random() * 50), // Add some variation
      aspectRatio: selectedAspect.ratio
    };

    // Add type-specific properties
    if (type === 'video') {
      // Long videos (1-10 minutes)
      post.duration = `${Math.floor(Math.random() * 10) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`;
    } else if (type === 'short_video') {
      // Short videos (15-60 seconds)
      post.duration = `0:${Math.floor(Math.random() * 46) + 15}`;
    } else if (type === 'music') {
      post.title = `Track ${i + 1} - ${randomUsername}'s Playlist`;
    } else if (type === 'article') {
      post.title = `${randomCaption.split(' ').slice(0, 3).join(' ')}...`;
      post.source = `${randomUsername}.blog`;
    }

    return post;
  });

  // Convert YouTube trailers to Posts
  const trailerPosts: Post[] = youtubeTrailers.map((trailer, index) => ({
    id: `trailer-${index}`,
    username: 'MovieTrailers',
    avatar: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=150&auto=format&fit=crop&q=60', // Cinema icon/image
    image: `https://img.youtube.com/vi/${trailer.id}/maxresdefault.jpg`,
    caption: trailer.title,
    likes: Math.floor(Math.random() * 100000) + 5000,
    comments: Math.floor(Math.random() * 5000) + 100,
    shares: Math.floor(Math.random() * 10000) + 500,
    time: `${Math.floor(Math.random() * 12) + 1} months ago`,
    type: 'video',
    height: 180,
    aspectRatio: 'wide',
    duration: '2:30', // Approx duration
    videoId: trailer.id,
    platform: 'youtube'
  }));

  // Convert Dailymotion videos to Posts
  const dailymotionPosts: Post[] = dailymotionVideos.map((id, index) => ({
    id: `dm-${index}`,
    username: 'DailymotionHits',
    avatar: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=150&auto=format&fit=crop&q=60', // Video icon/image
    image: `https://www.dailymotion.com/thumbnail/video/${id}`,
    caption: `Featured Video #${index + 1}`,
    likes: Math.floor(Math.random() * 50000) + 1000,
    comments: Math.floor(Math.random() * 2000) + 50,
    shares: Math.floor(Math.random() * 5000) + 100,
    time: `${Math.floor(Math.random() * 30) + 1} days ago`,
    type: 'video',
    height: 180,
    aspectRatio: 'wide',
    duration: '5:00', // Approx duration
    videoId: id,
    platform: 'dailymotion'
  }));

  // Mix social media content with regular posts randomly
  const allPosts = [...regularPosts, ...socialMediaContent, ...trailerPosts, ...dailymotionPosts];

  // Shuffle the array to mix content randomly
  for (let i = allPosts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allPosts[i], allPosts[j]] = [allPosts[j], allPosts[i]];
  }

  return allPosts;
};

interface ExploreFeedProps {
  activeFilter?: string;
  onFilterChange?: (filterId: string) => void;
}

export default function ExploreFeed({ activeFilter: externalFilter, onFilterChange: externalOnFilterChange }: ExploreFeedProps = {}) {
  const [posts, setPosts] = useState<Post[]>(generatePosts());
  const [internalFilter, setInternalFilter] = useState('explore');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showDetailPage, setShowDetailPage] = useState(false);

  const activeFilter = externalFilter || internalFilter;
  const handleFilterChange = externalOnFilterChange || setInternalFilter;

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setShowDetailPage(true);
  };

  const handleBackFromDetail = () => {
    setShowDetailPage(false);
    setSelectedPost(null);
  };

  const handleUserClick = (username: string) => {
    // Handle user profile navigation
    console.log('Navigate to user profile:', username);
  };

  const renderContent = () => {
    switch (activeFilter) {
      case 'all':
        return <FeedsContent />;
      case 'pages':
        return <PagesContent />;
      case 'explore':
      default:
        return (
          <div className="posts-container overflow-auto flex-1 bg-gray-50">
            <div className="w-full py-4">
              <div className="max-w-7xl mx-auto px-4">
                <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4">
                  {posts.map((post) => (
                    <PinterestCard key={post.id} post={post} formatNumber={formatNumber} onPostClick={handlePostClick} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  // Show detail page if a post is selected
  if (showDetailPage && selectedPost) {
    return (
      <ContentDetailPage
        post={selectedPost}
        onBack={handleBackFromDetail}
        onUserClick={handleUserClick}
      />
    );
  }

  return (
    <div className="explore-feed h-full flex flex-col bg-gray-50">
      <ExploreFilterTabs
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
      />
      {renderContent()}
    </div>
  );
}

// Fallback images for broken thumbnails
const fallbackImages = [
  'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop&q=60', // Tech
  'https://images.unsplash.com/photo-1492619875027-88519f0782b9?w=800&auto=format&fit=crop&q=60', // Music
  'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=60', // Camera
  'https://images.unsplash.com/photo-1492724441997-cd780d836b39?w=800&auto=format&fit=crop&q=60', // Abstract
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=60', // Gaming
  'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&auto=format&fit=crop&q=60', // Anime
];

// PinterestCard Component with robust image handling
function PinterestCard({ post, formatNumber, onPostClick }: { post: Post, formatNumber: (num: number) => string, onPostClick?: (post: Post) => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imgSrc, setImgSrc] = useState(post.image);

  useEffect(() => {
    setImgSrc(post.image);
  }, [post.image]);

  const handleImageError = () => {
    // Pick a fallback based on post ID hash to be consistent but varied
    const hash = post.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    setImgSrc(fallbackImages[hash % fallbackImages.length]);
  };

  return (
    <div
      className="pinterest-card bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer mb-4 break-inside-avoid"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onPostClick?.(post)}
    >
      {/* Image/Video Container */}
      <div className="relative group">
        <div style={{ height: `${post.height}px` }} className="relative overflow-hidden">
          {/* Show thumbnails for all videos - click navigates to detail page */}
          {(post as any).platform && (post.type === 'video' || post.type === 'short_video') ? (
            <>
              <img
                src={imgSrc}
                alt={post.caption}
                onError={handleImageError}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />



              {/* Play Button Overlay - Center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-black/60 rounded-full flex items-center justify-center hover:bg-black/80 transition-all duration-300">
                  <FiPlay size={24} className="text-white ml-1" />
                </div>
              </div>
            </>
          ) : (
            // Default image for regular posts
            <>
              <img
                src={imgSrc}
                alt={post.caption}
                onError={handleImageError}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Play button overlay for videos without platform */}
              {(post.type === 'video' || post.type === 'short_video') && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-black bg-opacity-70 rounded-full flex items-center justify-center hover:bg-opacity-90 transition-all duration-300">
                    <FiPlay size={24} className="text-white ml-1" />
                  </div>
                </div>
              )}
            </>
          )}

          {/* Hover Overlay */}
          <div className={`absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'} pointer-events-none`}>
            {/* Top Actions - Three Dot Menu */}
            <div className="absolute top-3 right-3 pointer-events-auto">
              <button
                className="p-2 rounded-full bg-white bg-opacity-90 shadow-md hover:scale-110 transition-all duration-200 text-gray-700"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <FiMoreVertical size={16} />
              </button>
            </div>
          </div>

          {/* Type Indicator */}
          {post.type !== 'photo' && (
            <div className="absolute top-3 left-3 bg-black bg-opacity-75 text-white rounded-lg px-2 py-1 flex items-center text-xs">
              {post.type === 'video' && (
                <>
                  <FiVideo size={12} className="mr-1" />
                  <span>{post.duration}</span>
                </>
              )}
              {post.type === 'short_video' && (
                <>
                  <FiPlay size={12} className="mr-1" />
                  <span>{post.duration}</span>
                </>
              )}
              {post.type === 'music' && (
                <>
                  <FiMusic size={12} />
                </>
              )}
              {post.type === 'photos' && (
                <>
                  <FiCopy size={12} className="mr-1" />
                  <span>1/{Math.floor(Math.random() * 5) + 2}</span>
                </>
              )}
              {post.type === 'article' && (
                <>
                  <FiFileText size={12} className="mr-1" />
                  <span>Article</span>
                </>
              )}
            </div>
          )}

          {/* Platform Badge for Social Media Content */}
          {(post as any).platform && (
            <div className={`absolute bottom-3 right-3 px-2 py-1 rounded-full flex items-center text-xs font-bold shadow-lg ${(post as any).platform === 'youtube' ? 'bg-red-600 text-white' :
              (post as any).platform === 'vimeo' ? 'bg-blue-500 text-white' :
                (post as any).platform === 'dailymotion' ? 'bg-white text-black' :
                  (post as any).platform === 'rutube' ? 'bg-gradient-to-r from-blue-900 to-red-500 text-white' :
                    (post as any).platform === 'vk' ? 'bg-blue-500 text-white' :
                      (post as any).platform === 'bilibili' ? 'bg-gradient-to-r from-blue-300 via-blue-500 to-blue-700 text-white' :
                        (post as any).platform === 'instagram' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' :
                          (post as any).platform === 'ok' ? 'bg-orange-500 text-white' :
                            (post as any).platform === 'twitter' ? 'bg-black text-white' :
                              (post as any).platform === 'pinterest' ? 'bg-red-600 text-white' :
                                'bg-gray-600 text-white'
              }`}>
              {(post as any).platform === 'youtube' && (
                <>
                  <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  <span>YT</span>
                </>
              )}
              {(post as any).platform === 'vimeo' && (
                <>
                  <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197c1.185-1.044 2.351-2.084 3.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.493 4.797l-.013.01z" />
                  </svg>
                  <span>VM</span>
                </>
              )}
              {(post as any).platform === 'dailymotion' && (
                <>
                  <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.551 11.485c-1.02 0-1.734.714-1.734 1.734s.714 1.734 1.734 1.734 1.734-.714 1.734-1.734-.714-1.734-1.734-1.734zM24 4.571v14.857C24 21.714 22.286 24 20 24H4c-2.286 0-4-2.286-4-4V4c0-2.286 1.714-4 4-4h16c2.286 0 4 1.714 4 4v.571zM9.143 12c0-2.571 2.286-4.571 4.857-4.571S18.857 9.429 18.857 12s-2.286 4.571-4.857 4.571S9.143 14.571 9.143 12z" />
                  </svg>
                  <span>DM</span>
                </>
              )}
              {(post as any).platform === 'rutube' && (
                <>
                  <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                  </svg>
                  <span>RT</span>
                </>
              )}
              {(post as any).platform === 'vk' && (
                <>
                  <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.78 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z" />
                  </svg>
                  <span>VK</span>
                </>
              )}
              {(post as any).platform === 'bilibili' && (
                <>
                  <img
                    src="https://img.utdstc.com/icon/ba9/33d/ba933d0e003c9f53e0fb3de2b0f1a8def6898ce2384850ca3adb1cc332d78241:200"
                    alt="Bilibili"
                    className="w-3 h-3 mr-1 rounded-sm"
                  />
                  <span>BL</span>
                </>
              )}
              {(post as any).platform === 'instagram' && (
                <>
                  <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  <span>IG</span>
                </>
              )}
              {(post as any).platform === 'ok' && (
                <>
                  <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 3.6c2.324 0 4.2 1.876 4.2 4.2 0 2.324-1.876 4.2-4.2 4.2-2.324 0-4.2-1.876-4.2-4.2 0-2.324 1.876-4.2 4.2-4.2zm0 16.8c-1.907 0-3.637-.656-5.013-1.751l2.362-2.362c.656.328 1.395.513 2.176.513.781 0 1.52-.185 2.176-.513l2.362 2.362C15.637 19.744 13.907 20.4 12 20.4z" />
                  </svg>
                  <span>OK</span>
                </>
              )}
              {(post as any).platform === 'twitter' && (
                <>
                  <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <span>X</span>
                </>
              )}
              {(post as any).platform === 'pinterest' && (
                <>
                  <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                  </svg>
                  <span>PIN</span>
                </>
              )}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

// Post Card Component
function PostCard({ post, formatNumber }: { post: Post, formatNumber: (num: number) => string }) {
  const [liked, setLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="post-card bg-white mb-4 shadow-sm rounded-xl overflow-hidden">
      {/* Post Header */}
      <div className="post-header flex items-center p-3">
        <div className="avatar-container mr-2">
          <div className="rounded-full overflow-hidden" style={{ width: '40px', height: '40px' }}>
            <Image
              src={post.avatar}
              alt={post.username}
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
        </div>
        <div className="flex-grow">
          <p className="mb-0 font-medium">{post.username}</p>
          <p className="mb-0 text-gray-500 text-sm">{post.time}</p>
        </div>
        <button className="btn-icon">
          <FiMoreHorizontal size={20} />
        </button>
      </div>

      {/* Post Content */}
      <div className="post-content relative">
        {/* Media Container */}
        <div style={{ width: '100%', height: '630px', position: 'relative' }}>
          <Image
            src={post.image}
            alt={post.caption}
            fill
            className="object-fit-cover"
          />

          {/* Overlay for Video/Music */}
          {(post.type === 'video' || post.type === 'short_video' || post.type === 'music') && (
            <div
              className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
              style={{ background: 'rgba(0,0,0,0.3)', cursor: 'pointer' }}
              onClick={handlePlayPause}
            >
              {(post.type === 'video' || post.type === 'short_video') && (
                <div className="text-white">
                  {isPlaying ? (
                    <div className="p-4 rounded-full bg-black bg-opacity-50">
                      {post.type === 'video' ? <FiVideo size={40} /> : <FiPlay size={40} />}
                    </div>
                  ) : (
                    <div className="p-4 rounded-full bg-black bg-opacity-50">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>
                  )}
                </div>
              )}
              {post.type === 'music' && (
                <div className="text-white">
                  {isPlaying ? (
                    <div className="p-4 rounded-full bg-black bg-opacity-50">
                      <FiMusic size={40} />
                    </div>
                  ) : (
                    <div className="p-4 rounded-full bg-black bg-opacity-50">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Type Indicator */}
          {post.type !== 'photo' && (
            <div className="post-type-indicator absolute top-0 right-0 m-3 bg-black bg-opacity-75 text-white rounded-full px-3 py-2 flex items-center">
              {post.type === 'video' && (
                <>
                  <FiVideo size={16} className="mr-2" />
                  <span>{post.duration}</span>
                </>
              )}
              {post.type === 'short_video' && (
                <>
                  <FiPlay size={16} className="mr-2" />
                  <span>{post.duration}</span>
                </>
              )}
              {post.type === 'music' && (
                <>
                  <FiMusic size={16} />
                </>
              )}
              {post.type === 'photos' && (
                <>
                  <FiCopy size={16} className="mr-2" />
                  <span>1/{Math.floor(Math.random() * 5) + 2}</span>
                </>
              )}
              {post.type === 'article' && (
                <>
                  <FiFileText size={16} className="mr-2" />
                  <span>Article</span>
                </>
              )}
            </div>
          )}
        </div>

        {/* Title for Music and Article */}
        {(post.type === 'music' || post.type === 'article') && post.title && (
          <div className="p-3 border-b border-gray-200">
            <h6 className="mb-0 font-bold">{post.title}</h6>
            {post.type === 'article' && post.source && (
              <p className="mb-0 text-gray-500 text-sm">Source: {post.source}</p>
            )}
          </div>
        )}
      </div>

      {/* Post Actions */}
      <div className="post-actions flex p-3 border-b border-gray-200">
        <div className="flex gap-3">
          <button
            className={`btn-icon ${liked ? 'text-red-500' : ''}`}
            onClick={handleLike}
          >
            <FiHeart size={24} className={liked ? 'filled-heart' : ''} />
          </button>
          <button className="btn-icon">
            <FiMessageSquare size={24} />
          </button>
          <button className="btn-icon">
            <FiShare2 size={24} />
          </button>
        </div>
      </div>

      {/* Post Stats */}
      <div className="post-stats p-3">
        <p className="mb-2 font-medium">{formatNumber(post.likes)} likes</p>
        <p className="mb-2 truncate">
          <span className="font-medium">{post.username}</span> {post.caption}
        </p>
        <p className="mb-0 text-gray-500 text-sm">
          View all {formatNumber(post.comments)} comments
        </p>
      </div>
    </div>
  );
}