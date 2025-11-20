import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiArrowLeft, FiShare2, FiMoreVertical, FiPlay, FiDownload, FiSkipBack, FiSkipForward, FiVolume2, FiRepeat, FiVideo, FiImage, FiFileText, FiMusic } from 'react-icons/fi';

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

const FALLBACK_GRADIENTS = [
  'from-pink-500 via-red-500 to-yellow-500',
  'from-indigo-500 via-purple-500 to-pink-500',
  'from-blue-500 via-cyan-500 to-teal-500',
  'from-amber-500 via-orange-500 to-rose-500',
  'from-emerald-500 via-green-500 to-lime-500',
];

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=60';

const FALLBACK_IMAGES = [
  'https://picsum.photos/seed/pin-1/600/900',
  'https://picsum.photos/seed/pin-2/600/900',
  'https://picsum.photos/seed/pin-3/600/900',
  'https://picsum.photos/seed/pin-4/600/900',
  'https://picsum.photos/seed/pin-5/600/900',
  'https://picsum.photos/seed/pin-6/600/900',
  'https://picsum.photos/seed/pin-7/600/900',
  'https://picsum.photos/seed/pin-8/600/900',
  'https://picsum.photos/seed/pin-9/600/900',
  'https://picsum.photos/seed/pin-10/600/900',
];

const MASONRY_TOPICS = [
  'nature',
  'city',
  'landscape',
  'architecture',
  'technology',
  'travel',
  'abstract',
  'people',
  'art',
  'night',
];

const getMasonryImage = (index: number) => {
  const topic = MASONRY_TOPICS[index % MASONRY_TOPICS.length];
  // Using source.unsplash.com so each sig index gives a different photo but stays stable per card
  return `https://source.unsplash.com/400x600/?${topic}&sig=${index}`;
};

// Generate related content similar to Pinterest
const generateRelatedContent = (currentPost: Post) => {
  const contentData = [
    {
      title: 'Amazing sunset photography',
      username: 'photographer_pro',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&auto=format&fit=crop&q=60',
      height: 280
    },
    {
      title: 'Street art collection',
      username: 'art_lover',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&auto=format&fit=crop&q=60',
      height: 320
    },
    {
      title: 'Modern architecture',
      username: 'travel_diary',
      image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=400&auto=format&fit=crop&q=60',
      height: 350
    },
    {
      title: 'Nature landscapes',
      username: 'nature_explorer',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&auto=format&fit=crop&q=60',
      height: 300
    },
    {
      title: 'Urban exploration',
      username: 'design_guru',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&auto=format&fit=crop&q=60',
      height: 380
    },
    {
      title: 'Creative portraits',
      username: 'portrait_master',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60',
      height: 420
    },
    {
      title: 'Travel destinations',
      username: 'art_lover',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&auto=format&fit=crop&q=60',
      height: 290
    },
    {
      title: 'Food photography',
      username: 'food_explorer',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&auto=format&fit=crop&q=60',
      height: 340
    },
    {
      title: 'Minimalist design',
      username: 'design_guru',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&auto=format&fit=crop&q=60',
      height: 260
    },
    {
      title: 'Abstract patterns',
      username: 'design_guru',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&auto=format&fit=crop&q=60',
      height: 310
    },
    {
      title: 'Street photography magic',
      username: 'photographer_pro',
      image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&auto=format&fit=crop&q=60',
      height: 360
    },
    {
      title: 'Vintage meets modern',
      username: 'vintage_lover',
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&auto=format&fit=crop&q=60',
      height: 330
    },
    {
      title: 'Digital art exploration',
      username: 'digital_artist',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&auto=format&fit=crop&q=60',
      height: 400
    },
    {
      title: 'Geometric patterns everywhere',
      username: 'pattern_lover',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&auto=format&fit=crop&q=60',
      height: 270
    },
    {
      title: 'Color palette inspiration',
      username: 'color_master',
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&auto=format&fit=crop&q=60',
      height: 320
    },
    {
      title: 'Workspace goals achieved',
      username: 'workspace_pro',
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&auto=format&fit=crop&q=60',
      height: 290
    },
    {
      title: 'Fashion forward thinking',
      username: 'fashion_guru',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&auto=format&fit=crop&q=60',
      height: 380
    },
    {
      title: 'Product design perfection',
      username: 'product_designer',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&auto=format&fit=crop&q=60',
      height: 350
    },
    {
      title: 'Typography in the wild',
      username: 'type_lover',
      image: 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=400&auto=format&fit=crop&q=60',
      height: 310
    },
    {
      title: 'Sustainable design matters',
      username: 'eco_designer',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&auto=format&fit=crop&q=60',
      height: 340
    },
    // Additional content to fill empty space
    {
      title: 'Coffee culture vibes',
      username: 'coffee_addict',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&auto=format&fit=crop&q=60',
      height: 250
    },
    {
      title: 'City skyline views',
      username: 'urban_explorer',
      image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=400&auto=format&fit=crop&q=60',
      height: 300
    },
    {
      title: 'Mountain adventures',
      username: 'mountain_lover',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&auto=format&fit=crop&q=60',
      height: 380
    },
    {
      title: 'Ocean waves serenity',
      username: 'ocean_dreamer',
      image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&auto=format&fit=crop&q=60',
      height: 320
    },
    {
      title: 'Book lover paradise',
      username: 'bookworm_life',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop&q=60',
      height: 350
    },
    {
      title: 'Gaming setup goals',
      username: 'gamer_zone',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&auto=format&fit=crop&q=60',
      height: 280
    },
    {
      title: 'Fashion inspiration',
      username: 'style_guru',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&auto=format&fit=crop&q=60',
      height: 360
    },
    {
      title: 'Travel memories',
      username: 'wanderlust_soul',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&auto=format&fit=crop&q=60',
      height: 290
    },
    {
      title: 'Creative workspace',
      username: 'creator_studio',
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&auto=format&fit=crop&q=60',
      height: 310
    },
    {
      title: 'Nature photography',
      username: 'wildlife_pro',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&auto=format&fit=crop&q=60',
      height: 340
    },
    {
      title: 'Urban street art',
      username: 'street_artist',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&auto=format&fit=crop&q=60',
      height: 270
    },
    {
      title: 'Modern lifestyle',
      username: 'lifestyle_inspo',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&auto=format&fit=crop&q=60',
      height: 330
    },
    {
      title: 'Artistic expression',
      username: 'art_enthusiast',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&auto=format&fit=crop&q=60',
      height: 300
    },
    {
      title: 'Weekend adventures',
      username: 'weekend_vibes',
      image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=400&auto=format&fit=crop&q=60',
      height: 370
    },
    {
      title: 'Inspiration everywhere',
      username: 'creative_mind',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&auto=format&fit=crop&q=60',
      height: 260
    },
    {
      title: 'Daily moments',
      username: 'moment_catcher',
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&auto=format&fit=crop&q=60',
      height: 280
    },
    {
      title: 'Dream destinations',
      username: 'dream_traveler',
      image: 'https://images.unsplash.com/photo-1513475382585-dfb367046420?w=400&auto=format&fit=crop&q=60',
      height: 320
    },
    {
      title: 'Creative process',
      username: 'process_sharer',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60',
      height: 350
    },
    {
      title: 'Life in color',
      username: 'colorful_life',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&auto=format&fit=crop&q=60',
      height: 310
    },
    {
      title: 'Simple pleasures',
      username: 'simple_joys',
      image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&auto=format&fit=crop&q=60',
      height: 290
    },
    {
      title: 'Creative vision',
      username: 'visionary_art',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&auto=format&fit=crop&q=60',
      height: 340
    },
    {
      title: 'Urban jungle',
      username: 'city_wild',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&auto=format&fit=crop&q=60',
      height: 270
    },
    {
      title: 'Peaceful moments',
      username: 'serenity_seeker',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop&q=60',
      height: 360
    },
    {
      title: 'Adventure awaits',
      username: 'adventure_time',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&auto=format&fit=crop&q=60',
      height: 300
    },
    {
      title: 'Art and soul',
      username: 'soulful_art',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&auto=format&fit=crop&q=60',
      height: 330
    },
    {
      title: 'Beautiful chaos',
      username: 'chaos_beauty',
      image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=400&auto=format&fit=crop&q=60',
      height: 280
    },
    {
      title: 'Dream big',
      username: 'dream_chaser',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&auto=format&fit=crop&q=60',
      height: 320
    },
    {
      title: 'Stay curious',
      username: 'curious_mind',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&auto=format&fit=crop&q=60',
      height: 350
    },
    {
      title: 'Find your path',
      username: 'path_finder',
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&auto=format&fit=crop&q=60',
      height: 290
    },
    {
      title: 'Create magic',
      username: 'magic_maker',
      image: 'https://images.unsplash.com/photo-1513475382585-dfb367046420?w=400&auto=format&fit=crop&q=60',
      height: 310
    },
    {
      title: 'Explore more',
      username: 'explorer_heart',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60',
      height: 340
    },
    {
      title: 'Never stop',
      username: 'unstoppable',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&auto=format&fit=crop&q=60',
      height: 270
    },
    {
      title: 'Keep going',
      username: 'persistent_soul',
      image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&auto=format&fit=crop&q=60',
      height: 300
    },
    {
      title: 'Inspire others',
      username: 'inspiration_source',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&auto=format&fit=crop&q=60',
      height: 330
    },
    {
      title: 'Make it happen',
      username: 'action_taker',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&auto=format&fit=crop&q=60',
      height: 280
    },
    {
      title: 'Live fully',
      username: 'life_lover',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop&q=60',
      height: 360
    },
    {
      title: 'Love deeply',
      username: 'heart_full',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&auto=format&fit=crop&q=60',
      height: 310
    },
    {
      title: 'Laugh often',
      username: 'joy_spreader',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&auto=format&fit=crop&q=60',
      height: 250
    },
    {
      title: 'Learn always',
      username: 'eternal_student',
      image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=400&auto=format&fit=crop&q=60',
      height: 320
    },
    {
      title: 'Grow daily',
      username: 'growth_mindset',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&auto=format&fit=crop&q=60',
      height: 340
    },
    {
      title: 'Shine bright',
      username: 'light_shiner',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&auto=format&fit=crop&q=60',
      height: 290
    },
    {
      title: 'Be yourself',
      username: 'authentic_self',
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&auto=format&fit=crop&q=60',
      height: 350
    },
    {
      title: 'Stay positive',
      username: 'positive_vibes',
      image: 'https://images.unsplash.com/photo-1513475382585-dfb367046420?w=400&auto=format&fit=crop&q=60',
      height: 310
    },
    {
      title: 'Spread kindness',
      username: 'kindness_hero',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60',
      height: 330
    },
    {
      title: 'Embrace change',
      username: 'change_embracer',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&auto=format&fit=crop&q=60',
      height: 270
    },
    {
      title: 'Find balance',
      username: 'balance_seeker',
      image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&auto=format&fit=crop&q=60',
      height: 300
    },
    {
      title: 'Trust the journey',
      username: 'journey_truster',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&auto=format&fit=crop&q=60',
      height: 360
    },
    {
      title: 'Enjoy the ride',
      username: 'ride_enjoyer',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&auto=format&fit=crop&q=60',
      height: 280
    },
    {
      title: 'Celebrate small wins',
      username: 'win_celebrator',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop&q=60',
      height: 320
    },
    {
      title: 'Dream without limits',
      username: 'limitless_dreamer',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&auto=format&fit=crop&q=60',
      height: 340
    },
    {
      title: 'Make today count',
      username: 'day_maker',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&auto=format&fit=crop&q=60',
      height: 290
    },
    {
      title: 'Choose happiness',
      username: 'happiness_chooser',
      image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=400&auto=format&fit=crop&q=60',
      height: 310
    },
    {
      title: 'Create your story',
      username: 'story_creator',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&auto=format&fit=crop&q=60',
      height: 350
    },
    {
      title: 'Write your future',
      username: 'future_writer',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&auto=format&fit=crop&q=60',
      height: 300
    },
    {
      title: 'Paint your dreams',
      username: 'dream_painter',
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&auto=format&fit=crop&q=60',
      height: 330
    },
    {
      title: 'Build your world',
      username: 'world_builder',
      image: 'https://images.unsplash.com/photo-1513475382585-dfb367046420?w=400&auto=format&fit=crop&q=60',
      height: 270
    },
    {
      title: 'Design your life',
      username: 'life_designer',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60',
      height: 310
    },
    {
      title: 'Craft your legacy',
      username: 'legacy_crafter',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&auto=format&fit=crop&q=60',
      height: 340
    },
    {
      title: 'Shape your destiny',
      username: 'destiny_shaper',
      image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&auto=format&fit=crop&q=60',
      height: 280
    },
    {
      title: 'Define your purpose',
      username: 'purpose_definer',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&auto=format&fit=crop&q=60',
      height: 320
    },
    {
      title: 'Live with passion',
      username: 'passion_liver',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&auto=format&fit=crop&q=60',
      height: 300
    },
    {
      title: 'Love what you do',
      username: 'work_lover',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop&q=60',
      height: 360
    },
    {
      title: 'Do what you love',
      username: 'love_doer',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&auto=format&fit=crop&q=60',
      height: 310
    },
    {
      title: 'Follow your heart',
      username: 'heart_follower',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&auto=format&fit=crop&q=60',
      height: 270
    },
    {
      title: 'Listen to your soul',
      username: 'soul_listener',
      image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=400&auto=format&fit=crop&q=60',
      height: 340
    },
    {
      title: 'Trust your instincts',
      username: 'instinct_truster',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&auto=format&fit=crop&q=60',
      height: 290
    },
    {
      title: 'Believe in yourself',
      username: 'self_believer',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&auto=format&fit=crop&q=60',
      height: 320
    },
    {
      title: 'Never give up',
      username: 'never_giveup',
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&auto=format&fit=crop&q=60',
      height: 350
    },
    {
      title: 'Keep pushing forward',
      username: 'forward_pusher',
      image: 'https://images.unsplash.com/photo-1513475382585-dfb367046420?w=400&auto=format&fit=crop&q=60',
      height: 300
    },
    {
      title: 'Rise above challenges',
      username: 'challenge_riser',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60',
      height: 330
    },
    {
      title: 'Overcome obstacles',
      username: 'obstacle_overcomer',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&auto=format&fit=crop&q=60',
      height: 280
    },
    {
      title: 'Turn pain into power',
      username: 'pain_transformer',
      image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&auto=format&fit=crop&q=60',
      height: 310
    },
    {
      title: 'Find strength in struggle',
      username: 'struggle_strength',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&auto=format&fit=crop&q=60',
      height: 340
    },
    {
      title: 'Grow through pain',
      username: 'pain_grower',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&auto=format&fit=crop&q=60',
      height: 300
    },
    {
      title: 'Learn from failure',
      username: 'failure_learner',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop&q=60',
      height: 270
    },
    {
      title: 'Embrace imperfections',
      username: 'imperfection_embracer',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&auto=format&fit=crop&q=60',
      height: 320
    },
    {
      title: 'Find beauty in flaws',
      username: 'flaw_beauty',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&auto=format&fit=crop&q=60',
      height: 290
    },
    {
      title: 'See magic in ordinary',
      username: 'ordinary_magic',
      image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=400&auto=format&fit=crop&q=60',
      height: 350
    },
    {
      title: 'Appreciate little things',
      username: 'little_appreciator',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&auto=format&fit=crop&q=60',
      height: 310
    },
    {
      title: 'Gratitude attitude',
      username: 'gratitude_giver',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&auto=format&fit=crop&q=60',
      height: 280
    },
    {
      title: 'Count your blessings',
      username: 'blessing_counter',
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&auto=format&fit=crop&q=60',
      height: 340
    },
    {
      title: 'Stay humble',
      username: 'humble_stayer',
      image: 'https://images.unsplash.com/photo-1513475382585-dfb367046420?w=400&auto=format&fit=crop&q=60',
      height: 300
    },
    {
      title: 'Be kind always',
      username: 'kindness_spreader',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60',
      height: 330
    },
    {
      title: 'Help others grow',
      username: 'growth_helper',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&auto=format&fit=crop&q=60',
      height: 270
    },
    {
      title: 'Lift others up',
      username: 'uplift_lifter',
      image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&auto=format&fit=crop&q=60',
      height: 320
    },
    {
      title: 'Share your light',
      username: 'light_sharer',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&auto=format&fit=crop&q=60',
      height: 350
    },
    {
      title: 'Make a difference',
      username: 'difference_maker',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&auto=format&fit=crop&q=60',
      height: 290
    },
    {
      title: 'Leave your mark',
      username: 'mark_leaver',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop&q=60',
      height: 310
    },
    {
      title: 'Change the world',
      username: 'world_changer',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&auto=format&fit=crop&q=60',
      height: 340
    },
    {
      title: 'Start with you',
      username: 'self_starter',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&auto=format&fit=crop&q=60',
      height: 300
    },
    {
      title: 'Lead by example',
      username: 'example_leader',
      image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=400&auto=format&fit=crop&q=60',
      height: 270
    },
    {
      title: 'Inspire change',
      username: 'change_inspirer',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&auto=format&fit=crop&q=60',
      height: 330
    },
    {
      title: 'Be the reason',
      username: 'reason_be',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&auto=format&fit=crop&q=60',
      height: 280
    },
    {
      title: 'Someone smiles today',
      username: 'smile_creator',
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&auto=format&fit=crop&q=60',
      height: 320
    },
    {
      title: 'Make hearts happy',
      username: 'heart_happiness',
      image: 'https://images.unsplash.com/photo-1513475382585-dfb367046420?w=400&auto=format&fit=crop&q=60',
      height: 350
    },
    {
      title: 'Spread love always',
      username: 'love_spreader',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60',
      height: 310
    },
    {
      title: 'Peace begins with you',
      username: 'peace_beginner',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&auto=format&fit=crop&q=60',
      height: 290
    },
    {
      title: 'Joy is contagious',
      username: 'joy_contagious',
      image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&auto=format&fit=crop&q=60',
      height: 330
    },
    {
      title: 'Hope never dies',
      username: 'hope_keeper',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&auto=format&fit=crop&q=60',
      height: 300
    },
    {
      title: 'Faith moves mountains',
      username: 'faith_mover',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&auto=format&fit=crop&q=60',
      height: 360
    },
    {
      title: 'Love conquers all',
      username: 'love_conqueror',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop&q=60',
      height: 320
    },
    {
      title: 'Unity is strength',
      username: 'unity_builder',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&auto=format&fit=crop&q=60',
      height: 280
    },
    {
      title: 'Together we rise',
      username: 'together_riser',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&auto=format&fit=crop&q=60',
      height: 310
    },
    {
      title: 'Stronger together',
      username: 'strength_together',
      image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=400&auto=format&fit=crop&q=60',
      height: 340
    },
    {
      title: 'One world one love',
      username: 'world_love',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&auto=format&fit=crop&q=60',
      height: 300
    },
    {
      title: 'We are one',
      username: 'oneness_be',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&auto=format&fit=crop&q=60',
      height: 270
    },
    {
      title: 'Humanity first',
      username: 'humanity_first',
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&auto=format&fit=crop&q=60',
      height: 330
    },
    {
      title: 'Compassion matters',
      username: 'compassion_giver',
      image: 'https://images.unsplash.com/photo-1513475382585-dfb367046420?w=400&auto=format&fit=crop&q=60',
      height: 350
    },
    {
      title: 'Empathy heals',
      username: 'empathy_healer',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60',
      height: 290
    },
    {
      title: 'Understanding connects',
      username: 'understanding_connector',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&auto=format&fit=crop&q=60',
      height: 310
    },
    {
      title: 'Acceptance liberates',
      username: 'acceptance_liberator',
      image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&auto=format&fit=crop&q=60',
      height: 340
    },
    {
      title: 'Forgiveness frees',
      username: 'forgiveness_freer',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&auto=format&fit=crop&q=60',
      height: 280
    },
    {
      title: 'Let go and grow',
      username: 'letting_goer',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&auto=format&fit=crop&q=60',
      height: 320
    },
    {
      title: 'Release and renew',
      username: 'release_renewer',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop&q=60',
      height: 300
    },
    {
      title: 'Surrender and soar',
      username: 'surrender_soarer',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&auto=format&fit=crop&q=60',
      height: 360
    },
    {
      title: 'Trust the process',
      username: 'process_truster',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&auto=format&fit=crop&q=60',
      height: 310
    },
    {
      title: 'Honor the journey',
      username: 'journey_honorer',
      image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=400&auto=format&fit=crop&q=60',
      height: 290
    },
    {
      title: 'Cherish every moment',
      username: 'moment_cherisher',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&auto=format&fit=crop&q=60',
      height: 330
    },
    {
      title: 'Live in the now',
      username: 'now_liver',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&auto=format&fit=crop&q=60',
      height: 350
    },
    {
      title: 'Be present always',
      username: 'presence_be',
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&auto=format&fit=crop&q=60',
      height: 300
    },
    {
      title: 'Mindfulness matters',
      username: 'mindfulness_master',
      image: 'https://images.unsplash.com/photo-1513475382585-dfb367046420?w=400&auto=format&fit=crop&q=60',
      height: 280
    },
    {
      title: 'Conscious living',
      username: 'conscious_liver',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60',
      height: 320
    },
    {
      title: 'Intentional choices',
      username: 'intentional_chooser',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&auto=format&fit=crop&q=60',
      height: 310
    },
    {
      title: 'Purposeful actions',
      username: 'purposeful_actor',
      image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&auto=format&fit=crop&q=60',
      height: 340
    },
    {
      title: 'Meaningful connections',
      username: 'connection_maker',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&auto=format&fit=crop&q=60',
      height: 270
    },
    {
      title: 'Authentic relationships',
      username: 'authentic_relator',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&auto=format&fit=crop&q=60',
      height: 300
    },
    {
      title: 'Deep conversations',
      username: 'deep_talker',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop&q=60',
      height: 360
    },
    {
      title: 'Heart to hearts',
      username: 'heart_sharer',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&auto=format&fit=crop&q=60',
      height: 310
    },
    {
      title: 'Soul connections',
      username: 'soul_connector',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&auto=format&fit=crop&q=60',
      height: 290
    },
    {
      title: 'True friendships',
      username: 'true_friend',
      image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=400&auto=format&fit=crop&q=60',
      height: 330
    },
    {
      title: 'Lifelong bonds',
      username: 'bond_builder',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&auto=format&fit=crop&q=60',
      height: 350
    },
    {
      title: 'Unbreakable ties',
      username: 'tie_strengthener',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&auto=format&fit=crop&q=60',
      height: 300
    },
    {
      title: 'Family forever',
      username: 'family_forever',
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&auto=format&fit=crop&q=60',
      height: 280
    },
    {
      title: 'Home is where',
      username: 'home_finder',
      image: 'https://images.unsplash.com/photo-1513475382585-dfb367046420?w=400&auto=format&fit=crop&q=60',
      height: 320
    },
    {
      title: 'Heart belongs',
      username: 'heart_belonger',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60',
      height: 310
    },
    {
      title: 'Love grows here',
      username: 'love_grower',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&auto=format&fit=crop&q=60',
      height: 340
    },
    {
      title: 'Together is better',
      username: 'together_better',
      image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&auto=format&fit=crop&q=60',
      height: 270
    },
    {
      title: 'United we stand',
      username: 'unity_stand',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&auto=format&fit=crop&q=60',
      height: 300
    },
    {
      title: 'Divided we fall',
      username: 'division_avoider',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&auto=format&fit=crop&q=60',
      height: 360
    },
    {
      title: 'Stand for something',
      username: 'stand_taker',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop&q=60',
      height: 310
    },
    {
      title: 'Fall for anything',
      username: 'principle_keeper',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&auto=format&fit=crop&q=60',
      height: 290
    },
    {
      title: 'Speak your truth',
      username: 'truth_speaker',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&auto=format&fit=crop&q=60',
      height: 330
    },
    {
      title: 'Live your values',
      username: 'value_liver',
      image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=400&auto=format&fit=crop&q=60',
      height: 350
    },
    {
      title: 'Walk your talk',
      username: 'walk_talker',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&auto=format&fit=crop&q=60',
      height: 300
    },
    {
      title: 'Practice what you preach',
      username: 'practice_preacher',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&auto=format&fit=crop&q=60',
      height: 280
    },
    {
      title: 'Actions speak louder',
      username: 'action_speaker',
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&auto=format&fit=crop&q=60',
      height: 320
    },
    {
      title: 'Be the change',
      username: 'change_be',
      image: 'https://images.unsplash.com/photo-1513475382585-dfb367046420?w=400&auto=format&fit=crop&q=60',
      height: 310
    },
    {
      title: 'You wish to see',
      username: 'wish_seer',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60',
      height: 340
    },
    {
      title: 'Start the ripple',
      username: 'ripple_starter',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&auto=format&fit=crop&q=60',
      height: 270
    },
    {
      title: 'Create the wave',
      username: 'wave_creator',
      image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&auto=format&fit=crop&q=60',
      height: 300
    },
    {
      title: 'Influence positively',
      username: 'positive_influencer',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&auto=format&fit=crop&q=60',
      height: 360
    },
    {
      title: 'Impact greatly',
      username: 'great_impactor',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&auto=format&fit=crop&q=60',
      height: 310
    },
    {
      title: 'Leave footprints',
      username: 'footprint_leaver',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop&q=60',
      height: 290
    },
    {
      title: 'Of kindness',
      username: 'kindness_footprint',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&auto=format&fit=crop&q=60',
      height: 330
    },
    {
      title: 'Build bridges',
      username: 'bridge_builder',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&auto=format&fit=crop&q=60',
      height: 350
    },
    {
      title: 'Not walls',
      username: 'wall_breaker',
      image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=400&auto=format&fit=crop&q=60',
      height: 300
    },
    {
      title: 'Open doors',
      username: 'door_opener',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&auto=format&fit=crop&q=60',
      height: 280
    },
    {
      title: 'Close divides',
      username: 'divide_closer',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&auto=format&fit=crop&q=60',
      height: 320
    },
    {
      title: 'Heal the world',
      username: 'world_healer',
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&auto=format&fit=crop&q=60',
      height: 340
    },
    {
      title: 'Make it better',
      username: 'better_maker',
      image: 'https://images.unsplash.com/photo-1513475382585-dfb367046420?w=400&auto=format&fit=crop&q=60',
      height: 270
    },
    {
      title: 'Plant seeds',
      username: 'seed_planter',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60',
      height: 300
    },
    {
      title: 'Of hope',
      username: 'hope_seeder',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&auto=format&fit=crop&q=60',
      height: 360
    },
    {
      title: 'Water with love',
      username: 'love_waterer',
      image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&auto=format&fit=crop&q=60',
      height: 310
    },
    {
      title: 'Watch them grow',
      username: 'growth_watcher',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&auto=format&fit=crop&q=60',
      height: 290
    },
    {
      title: 'Nurture dreams',
      username: 'dream_nurturer',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&auto=format&fit=crop&q=60',
      height: 330
    },
    {
      title: 'Support visions',
      username: 'vision_supporter',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop&q=60',
      height: 350
    },
    {
      title: 'Empower others',
      username: 'power_empowerer',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&auto=format&fit=crop&q=60',
      height: 300
    },
    {
      title: 'Enable potential',
      username: 'potential_enabler',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&auto=format&fit=crop&q=60',
      height: 280
    },
    {
      title: 'Unlock greatness',
      username: 'greatness_unlocker',
      image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=400&auto=format&fit=crop&q=60',
      height: 320
    },
    {
      title: 'Reveal brilliance',
      username: 'brilliance_revealer',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&auto=format&fit=crop&q=60',
      height: 340
    },
    {
      title: 'Shine the light',
      username: 'light_shiner',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&auto=format&fit=crop&q=60',
      height: 270
    },
    {
      title: 'On hidden talents',
      username: 'talent_revealer',
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&auto=format&fit=crop&q=60',
      height: 310
    },
    {
      title: 'Celebrate uniqueness',
      username: 'uniqueness_celebrator',
      image: 'https://images.unsplash.com/photo-1513475382585-dfb367046420?w=400&auto=format&fit=crop&q=60',
      height: 350
    },
    {
      title: 'Honor differences',
      username: 'difference_honorer',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60',
      height: 290
    },
    {
      title: 'Embrace diversity',
      username: 'diversity_embracer',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&auto=format&fit=crop&q=60',
      height: 330
    },
    {
      title: 'Welcome all',
      username: 'all_welcomer',
      image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&auto=format&fit=crop&q=60',
      height: 300
    },
    {
      title: 'Include everyone',
      username: 'everyone_includer',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&auto=format&fit=crop&q=60',
      height: 360
    },
    {
      title: 'Belonging matters',
      username: 'belonging_matterer',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&auto=format&fit=crop&q=60',
      height: 310
    },
    {
      title: 'Connection is key',
      username: 'connection_key',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop&q=60',
      height: 280
    },
    {
      title: 'Community counts',
      username: 'community_counter',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&auto=format&fit=crop&q=60',
      height: 320
    },
    {
      title: 'Together we thrive',
      username: 'together_thriver',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&auto=format&fit=crop&q=60',
      height: 340
    },
    {
      title: 'Stronger united',
      username: 'united_strong',
      image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=400&auto=format&fit=crop&q=60',
      height: 300
    },
    {
      title: 'Divided we struggle',
      username: 'division_struggler',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&auto=format&fit=crop&q=60',
      height: 350
    },
    {
      title: 'Unity brings peace',
      username: 'peace_bringer',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&auto=format&fit=crop&q=60',
      height: 290
    },
    {
      title: 'Peace creates harmony',
      username: 'harmony_creator',
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&auto=format&fit=crop&q=60',
      height: 330
    },
    {
      title: 'Harmony breeds joy',
      username: 'joy_breeder',
      image: 'https://images.unsplash.com/photo-1513475382585-dfb367046420?w=400&auto=format&fit=crop&q=60',
      height: 310
    },
    {
      title: 'Joy spreads love',
      username: 'love_spreader',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60',
      height: 350
    },
    {
      title: 'Love heals all',
      username: 'all_healer',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&auto=format&fit=crop&q=60',
      height: 300
    },
    {
      title: 'Healing begins within',
      username: 'within_beginner',
      image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&auto=format&fit=crop&q=60',
      height: 360
    },
    {
      title: 'Inner peace first',
      username: 'peace_first',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&auto=format&fit=crop&q=60',
      height: 280
    },
    {
      title: 'Self-love matters',
      username: 'selflove_matterer',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&auto=format&fit=crop&q=60',
      height: 320
    },
    {
      title: 'Care for yourself',
      username: 'self_carer',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop&q=60',
      height: 340
    },
    {
      title: 'Nurture your soul',
      username: 'soul_nurturer',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&auto=format&fit=crop&q=60',
      height: 300
    },
    {
      title: 'Feed your spirit',
      username: 'spirit_feeder',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&auto=format&fit=crop&q=60',
      height: 290
    },
    {
      title: 'Rest when needed',
      username: 'rest_taker',
      image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=400&auto=format&fit=crop&q=60',
      height: 330
    },
    {
      title: 'Pause and breathe',
      username: 'pause_breather',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&auto=format&fit=crop&q=60',
      height: 350
    },
    {
      title: 'Slow down often',
      username: 'slow_downer',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&auto=format&fit=crop&q=60',
      height: 280
    },
    {
      title: 'Reflect regularly',
      username: 'regular_reflector',
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&auto=format&fit=crop&q=60',
      height: 320
    },
    {
      title: 'Journal your thoughts',
      username: 'thought_journal',
      image: 'https://images.unsplash.com/photo-1513475382585-dfb367046420?w=400&auto=format&fit=crop&q=60',
      height: 310
    },
    {
      title: 'Process your feelings',
      username: 'feeling_processor',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60',
      height: 340
    },
    {
      title: 'Understand yourself',
      username: 'self_understander',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&auto=format&fit=crop&q=60',
      height: 270
    },
    {
      title: 'Know your worth',
      username: 'worth_knower',
      image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&auto=format&fit=crop&q=60',
      height: 300
    },
    {
      title: 'Value your voice',
      username: 'voice_valuer',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&auto=format&fit=crop&q=60',
      height: 360
    },
    {
      title: 'Honor your story',
      username: 'story_honorer',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&auto=format&fit=crop&q=60',
      height: 280
    },
    {
      title: 'Own your truth',
      username: 'truth_owner',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop&q=60',
      height: 320
    },
    {
      title: 'Stand in your power',
      username: 'power_stander',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&auto=format&fit=crop&q=60',
      height: 340
    },
    {
      title: 'Claim your space',
      username: 'space_claimer',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&auto=format&fit=crop&q=60',
      height: 300
    },
    {
      title: 'Take your place',
      username: 'place_taker',
      image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=400&auto=format&fit=crop&q=60',
      height: 290
    },
    {
      title: 'Show up fully',
      username: 'full_shower',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&auto=format&fit=crop&q=60',
      height: 330
    },
    {
      title: 'Be unapologetically',
      username: 'unapologetic_be',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&auto=format&fit=crop&q=60',
      height: 350
    },
    {
      title: 'You in all your glory',
      username: 'glory_be',
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&auto=format&fit=crop&q=60',
      height: 310
    },
    {
      title: 'Shine your light bright',
      username: 'bright_shiner',
      image: 'https://images.unsplash.com/photo-1513475382585-dfb367046420?w=400&auto=format&fit=crop&q=60',
      height: 280
    },
    {
      title: 'The world needs',
      username: 'world_needer',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60',
      height: 320
    },
    {
      title: 'Exactly who you are',
      username: 'exact_be',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&auto=format&fit=crop&q=60',
      height: 340
    },
    {
      title: 'Perfectly imperfect',
      username: 'perfectly_imperfect',
      image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&auto=format&fit=crop&q=60',
      height: 290
    },
    // Extended content to fill both columns completely
    {
      title: 'Coffee culture vibes',
      username: 'coffee_addict',
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&auto=format&fit=crop&q=60',
      height: 280
    },
    {
      title: 'Vintage meets modern',
      username: 'vintage_lover',
      image: 'https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?w=400&auto=format&fit=crop&q=60',
      height: 320
    },
    {
      title: 'Product design perfection',
      username: 'product_designer',
      image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&auto=format&fit=crop&q=60',
      height: 260
    },
    {
      title: 'Typography in the wild',
      username: 'type_lover',
      image: 'https://images.unsplash.com/photo-1544568100-847a948585b9?w=400&auto=format&fit=crop&q=60',
      height: 380
    },
    {
      title: 'Find strength in struggle',
      username: 'struggle_strength',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&auto=format&fit=crop&q=60',
      height: 300
    },
    {
      title: 'You wish to see',
      username: 'wish_seer',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&auto=format&fit=crop&q=60',
      height: 340
    },
    {
      title: 'Be the change',
      username: 'change_be',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60',
      height: 270
    },
    {
      title: 'Learn from failure',
      username: 'failure_learner',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60',
      height: 310
    },
    {
      title: 'Create the wave',
      username: 'wave_creator',
      image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&auto=format&fit=crop&q=60',
      height: 290
    },
    {
      title: 'Embrace imperfections',
      username: 'imperfection_embracer',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60',
      height: 320
    },
    {
      title: 'Influence positively',
      username: 'positive_influencer',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=400&auto=format&fit=crop&q=60',
      height: 280
    },
    {
      title: 'Creative portraits',
      username: 'portrait_master',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60',
      height: 360
    },
    {
      title: 'Ocean dreams',
      username: 'ocean_dreamer',
      image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&auto=format&fit=crop&q=60',
      height: 300
    },
    {
      title: 'Mountain sunrise',
      username: 'mountain_watcher',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&auto=format&fit=crop&q=60',
      height: 350
    },
    {
      title: 'Urban exploration',
      username: 'urban_explorer',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60',
      height: 310
    },
    {
      title: 'Nature therapy',
      username: 'nature_healer',
      image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&auto=format&fit=crop&q=60',
      height: 330
    },
    {
      title: 'Digital art journey',
      username: 'digital_artist',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&auto=format&fit=crop&q=60',
      height: 270
    },
    {
      title: 'Street photography',
      username: 'street_photographer',
      image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=400&auto=format&fit=crop&q=60',
      height: 290
    },
    {
      title: 'Minimalist living',
      username: 'minimalist_life',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&auto=format&fit=crop&q=60',
      height: 320
    },
    {
      title: 'Food photography',
      username: 'food_stylist',
      image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&auto=format&fit=crop&q=60',
      height: 260
    },
    {
      title: 'Travel memories',
      username: 'memory_keeper',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop&q=60',
      height: 340
    },
    {
      title: 'Fashion forward',
      username: 'fashion_trend',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&auto=format&fit=crop&q=60',
      height: 300
    },
    {
      title: 'Wellness journey',
      username: 'wellness_warrior',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&auto=format&fit=crop&q=60',
      height: 280
    },
    {
      title: 'Tech innovations',
      username: 'tech_enthusiast',
      image: 'https://images.unsplash.com/photo-1513475382585-dfb367046420?w=400&auto=format&fit=crop&q=60',
      height: 310
    },
    {
      title: 'Home decor ideas',
      username: 'decor_inspo',
      image: 'https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?w=400&auto=format&fit=crop&q=60',
      height: 330
    },
    {
      title: 'Fitness motivation',
      username: 'fit_inspiration',
      image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&auto=format&fit=crop&q=60',
      height: 350
    },
    {
      title: 'Book recommendations',
      username: 'bookworm_life',
      image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&auto=format&fit=crop&q=60',
      height: 270
    },
    {
      title: 'DIY projects',
      username: 'diy_crafter',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&auto=format&fit=crop&q=60',
      height: 290
    },
    {
      title: 'Garden inspiration',
      username: 'garden_dreamer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60',
      height: 320
    },
    {
      title: 'Pet photography',
      username: 'pet_photographer',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60',
      height: 300
    },
    {
      title: 'Sunset chaser',
      username: 'sunset_hunter',
      image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&auto=format&fit=crop&q=60',
      height: 340
    },
    {
      title: 'Creative writing',
      username: 'word_weaver',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&auto=format&fit=crop&q=60',
      height: 280
    },
    {
      title: 'Music production',
      username: 'beat_creator',
      image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=400&auto=format&fit=crop&q=60',
      height: 310
    },
    {
      title: 'Handmade crafts',
      username: 'craft_lover',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&auto=format&fit=crop&q=60',
      height: 330
    },
    {
      title: 'Interior design',
      username: 'space_designer',
      image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&auto=format&fit=crop&q=60',
      height: 270
    },
    {
      title: 'Lifestyle blogger',
      username: 'life_blogger',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop&q=60',
      height: 300
    },
    {
      title: 'Art collector',
      username: 'art_curator',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&auto=format&fit=crop&q=60',
      height: 350
    },
    {
      title: 'Vintage finds',
      username: 'vintage_hunter',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&auto=format&fit=crop&q=60',
      height: 290
    },
    {
      title: 'Sustainable living',
      username: 'eco_warrior',
      image: 'https://images.unsplash.com/photo-1513475382585-dfb367046420?w=400&auto=format&fit=crop&q=60',
      height: 320
    },
    {
      title: 'Mindful moments',
      username: 'mindfulness_guru',
      image: 'https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?w=400&auto=format&fit=crop&q=60',
      height: 260
    },
    {
      title: 'Adventure stories',
      username: 'story_teller',
      image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&auto=format&fit=crop&q=60',
      height: 340
    },
    {
      title: 'Culinary adventures',
      username: 'food_explorer',
      image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&auto=format&fit=crop&q=60',
      height: 280
    },
    {
      title: 'Morning rituals',
      username: 'morning_person',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&auto=format&fit=crop&q=60',
      height: 310
    },
    {
      title: 'Night owl creativity',
      username: 'night_creator',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60',
      height: 330
    },
    {
      title: 'Weekend vibes',
      username: 'weekend_warrior',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60',
      height: 300
    },
    {
      title: 'Holiday memories',
      username: 'holiday_maker',
      image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&auto=format&fit=crop&q=60',
      height: 350
    },
    {
      title: 'Rainy day comfort',
      username: 'rain_lover',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&auto=format&fit=crop&q=60',
      height: 270
    },
    {
      title: 'Spring awakening',
      username: 'spring_enthusiast',
      image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=400&auto=format&fit=crop&q=60',
      height: 290
    },
    {
      title: 'Summer adventures',
      username: 'summer_lover',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&auto=format&fit=crop&q=60',
      height: 320
    },
    {
      title: 'Autumn colors',
      username: 'autumn_fan',
      image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&auto=format&fit=crop&q=60',
      height: 340
    },
    {
      title: 'Winter wonderland',
      username: 'winter_magic',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop&q=60',
      height: 280
    },
    {
      title: 'City lights',
      username: 'city_explorer',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&auto=format&fit=crop&q=60',
      height: 310
    },
    {
      title: 'Countryside escape',
      username: 'country_life',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&auto=format&fit=crop&q=60',
      height: 330
    },
    {
      title: 'Beach therapy',
      username: 'beach_bum',
      image: 'https://images.unsplash.com/photo-1513475382585-dfb367046420?w=400&auto=format&fit=crop&q=60',
      height: 300
    },
    {
      title: 'Forest bathing',
      username: 'forest_wanderer',
      image: 'https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?w=400&auto=format&fit=crop&q=60',
      height: 350
    },
    {
      title: 'Desert dreams',
      username: 'desert_roamer',
      image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&auto=format&fit=crop&q=60',
      height: 290
    },
    {
      title: 'River reflections',
      username: 'river_thinker',
      image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&auto=format&fit=crop&q=60',
      height: 320
    },
    {
      title: 'Lake serenity',
      username: 'lake_lover',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&auto=format&fit=crop&q=60',
      height: 270
    },
    {
      title: 'Sky gazing',
      username: 'sky_watcher',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60',
      height: 310
    },
    {
      title: 'Cloud watching',
      username: 'cloud_dreamer',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60',
      height: 330
    },
    {
      title: 'Star gazing',
      username: 'star_seeker',
      image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&auto=format&fit=crop&q=60',
      height: 340
    },
    {
      title: 'Moon magic',
      username: 'moon_child',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&auto=format&fit=crop&q=60',
      height: 280
    },
    {
      title: 'Golden hour',
      username: 'golden_hunter',
      image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=400&auto=format&fit=crop&q=60',
      height: 300
    },
    {
      title: 'Blue hour beauty',
      username: 'blue_hour_fan',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&auto=format&fit=crop&q=60',
      height: 350
    },
    {
      title: 'Macro wonders',
      username: 'macro_master',
      image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&auto=format&fit=crop&q=60',
      height: 290
    },
    {
      title: 'Abstract expressions',
      username: 'abstract_thinker',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop&q=60',
      height: 320
    },
    {
      title: 'Color theory',
      username: 'color_expert',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&auto=format&fit=crop&q=60',
      height: 270
    },
    {
      title: 'Texture exploration',
      username: 'texture_lover',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&auto=format&fit=crop&q=60',
      height: 310
    },
    {
      title: 'Pattern play',
      username: 'pattern_designer',
      image: 'https://images.unsplash.com/photo-1513475382585-dfb367046420?w=400&auto=format&fit=crop&q=60',
      height: 340
    },
    {
      title: 'Light and shadow',
      username: 'light_chaser',
      image: 'https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?w=400&auto=format&fit=crop&q=60',
      height: 300
    },
    {
      title: 'Reflection stories',
      username: 'reflection_seeker',
      image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&auto=format&fit=crop&q=60',
      height: 280
    },
    {
      title: 'Motion capture',
      username: 'motion_artist',
      image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&auto=format&fit=crop&q=60',
      height: 360
    },
    {
      title: 'Still life art',
      username: 'still_life_pro',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&auto=format&fit=crop&q=60',
      height: 290
    },
    {
      title: 'Documentary moments',
      username: 'docu_storyteller',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60',
      height: 330
    },
    {
      title: 'Candid captures',
      username: 'candid_master',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60',
      height: 310
    },
    {
      title: 'Portrait stories',
      username: 'portrait_teller',
      image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&auto=format&fit=crop&q=60',
      height: 350
    },
    {
      title: 'Landscape poetry',
      username: 'landscape_poet',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&auto=format&fit=crop&q=60',
      height: 280
    },
    {
      title: 'Architectural details',
      username: 'architecture_lover',
      image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=400&auto=format&fit=crop&q=60',
      height: 320
    },
    {
      title: 'Industrial beauty',
      username: 'industrial_fan',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&auto=format&fit=crop&q=60',
      height: 300
    },
    {
      title: 'Vintage aesthetics',
      username: 'vintage_aesthete',
      image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&auto=format&fit=crop&q=60',
      height: 340
    },
    {
      title: 'Modern simplicity',
      username: 'modern_minimal',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop&q=60',
      height: 270
    },
    {
      title: 'Eclectic style',
      username: 'eclectic_vibes',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&auto=format&fit=crop&q=60',
      height: 310
    },
    // Additional content for perfect balance
    {
      title: 'Meaningful connections',
      username: 'connection_maker',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&auto=format&fit=crop&q=60',
      height: 280
    },
    {
      title: 'Authentic relationships',
      username: 'authentic_relator',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60',
      height: 320
    },
    {
      title: 'Be unapologetically',
      username: 'unapologetic_be',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60',
      height: 290
    },
    {
      title: 'You in all your glory',
      username: 'glory_be',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60',
      height: 340
    },
    {
      title: 'Follow your heart',
      username: 'heart_follower',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&auto=format&fit=crop&q=60',
      height: 300
    },
    {
      title: 'Do what you love',
      username: 'love_doer',
      image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&auto=format&fit=crop&q=60',
      height: 270
    },
    {
      title: 'Street photography',
      username: 'street_photographer',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop&q=60',
      height: 310
    },
    {
      title: 'Urban exploration',
      username: 'urban_explorer',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&auto=format&fit=crop&q=60',
      height: 330
    },
    {
      title: 'Coffee moments',
      username: 'coffee_moments',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&auto=format&fit=crop&q=60',
      height: 260
    },
    {
      title: 'Daily inspiration',
      username: 'daily_inspo',
      image: 'https://images.unsplash.com/photo-1513475382585-dfb367046420?w=400&auto=format&fit=crop&q=60',
      height: 350
    },
    {
      title: 'Creative process',
      username: 'creative_process',
      image: 'https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?w=400&auto=format&fit=crop&q=60',
      height: 280
    },
    {
      title: 'Mindful living',
      username: 'mindful_living',
      image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&auto=format&fit=crop&q=60',
      height: 300
    },
    {
      title: 'Weekend vibes',
      username: 'weekend_vibes',
      image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&auto=format&fit=crop&q=60',
      height: 320
    },
    {
      title: 'Morning rituals',
      username: 'morning_rituals',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&auto=format&fit=crop&q=60',
      height: 290
    },
    {
      title: 'Evening calm',
      username: 'evening_calm',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60',
      height: 310
    },
    {
      title: 'Nature therapy',
      username: 'nature_therapy',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60',
      height: 340
    },
    {
      title: 'Digital detox',
      username: 'digital_detox',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60',
      height: 270
    },
    {
      title: 'Simple pleasures',
      username: 'simple_pleasures',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&auto=format&fit=crop&q=60',
      height: 300
    },
    {
      title: 'Gratitude practice',
      username: 'gratitude_practice',
      image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&auto=format&fit=crop&q=60',
      height: 280
    },
    {
      title: 'Self reflection',
      username: 'self_reflection',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop&q=60',
      height: 330
    },
    {
      title: 'Personal growth',
      username: 'personal_growth',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&auto=format&fit=crop&q=60',
      height: 290
    },
    {
      title: 'Life lessons',
      username: 'life_lessons',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&auto=format&fit=crop&q=60',
      height: 320
    },
    {
      title: 'Wisdom sharing',
      username: 'wisdom_sharing',
      image: 'https://images.unsplash.com/photo-1513475382585-dfb367046420?w=400&auto=format&fit=crop&q=60',
      height: 310
    },
    {
      title: 'Story telling',
      username: 'story_telling',
      image: 'https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?w=400&auto=format&fit=crop&q=60',
      height: 350
    },
    {
      title: 'Memory keeping',
      username: 'memory_keeping',
      image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&auto=format&fit=crop&q=60',
      height: 260
    },
    {
      title: 'Dream chasing',
      username: 'dream_chasing',
      image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&auto=format&fit=crop&q=60',
      height: 340
    },
    {
      title: 'Goal setting',
      username: 'goal_setting',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&auto=format&fit=crop&q=60',
      height: 280
    },
    {
      title: 'Future planning',
      username: 'future_planning',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60',
      height: 300
    },
    {
      title: 'Vision boarding',
      username: 'vision_boarding',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60',
      height: 330
    },
    {
      title: 'Manifestation',
      username: 'manifestation',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60',
      height: 270
    },
    {
      title: 'Positive energy',
      username: 'positive_energy',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&auto=format&fit=crop&q=60',
      height: 310
    },
    {
      title: 'Good vibes',
      username: 'good_vibes',
      image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&auto=format&fit=crop&q=60',
      height: 290
    },
    {
      title: 'Happy moments',
      username: 'happy_moments',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop&q=60',
      height: 320
    },
    {
      title: 'Joy spreading',
      username: 'joy_spreading',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&auto=format&fit=crop&q=60',
      height: 280
    },
    {
      title: 'Smile maker',
      username: 'smile_maker',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&auto=format&fit=crop&q=60',
      height: 300
    },
    // Massive content addition to completely fill both columns
    {
      title: 'City skyline views',
      username: 'urban_explorer',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&auto=format&fit=crop&q=60',
      height: 280
    },
    {
      title: 'Ocean waves',
      username: 'ocean_lover',
      image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&auto=format&fit=crop&q=60',
      height: 320
    },
    {
      title: 'Adventure awaits',
      username: 'adventure_time',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&auto=format&fit=crop&q=60',
      height: 290
    },
    {
      title: 'Art and soul',
      username: 'soulful_art',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&auto=format&fit=crop&q=60',
      height: 340
    },
    {
      title: 'Coffee culture',
      username: 'coffee_addict',
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&auto=format&fit=crop&q=60',
      height: 260
    },
    {
      title: 'Street art collection',
      username: 'art_lover',
      image: 'https://images.unsplash.com/photo-1544568100-847a948585b9?w=400&auto=format&fit=crop&q=60',
      height: 350
    },
    {
      title: 'Urban jungle',
      username: 'city_wild',
      image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=400&auto=format&fit=crop&q=60',
      height: 300
    },
    {
      title: 'Stay positive',
      username: 'positive_vibes',
      image: 'https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?w=400&auto=format&fit=crop&q=60',
      height: 310
    },
    {
      title: 'Dream big',
      username: 'dream_chaser',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&auto=format&fit=crop&q=60',
      height: 330
    },
    {
      title: 'Create magic',
      username: 'magic_maker',
      image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&auto=format&fit=crop&q=60',
      height: 270
    },
    {
      title: 'Find balance',
      username: 'balance_seeker',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&auto=format&fit=crop&q=60',
      height: 290
    },
    {
      title: 'Peaceful moments',
      username: 'serenity_seeker',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&auto=format&fit=crop&q=60',
      height: 320
    },
    {
      title: 'Beautiful chaos',
      username: 'chaos_beauty',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop&q=60',
      height: 280
    },
    {
      title: 'Life in color',
      username: 'colorful_life',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&auto=format&fit=crop&q=60',
      height: 350
    },
    {
      title: 'Simple joys',
      username: 'simple_joys',
      image: 'https://images.unsplash.com/photo-1513475382585-dfb367046420?w=400&auto=format&fit=crop&q=60',
      height: 300
    },
    {
      title: 'Creative vision',
      username: 'visionary_art',
      image: 'https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?w=400&auto=format&fit=crop&q=60',
      height: 310
    },
    {
      title: 'Dream destinations',
      username: 'dream_traveler',
      image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&auto=format&fit=crop&q=60',
      height: 270
    },
    {
      title: 'Wanderlust',
      username: 'wanderlust_soul',
      image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&auto=format&fit=crop&q=60',
      height: 330
    },
    {
      title: 'Explore more',
      username: 'explorer_heart',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&auto=format&fit=crop&q=60',
      height: 290
    },
    {
      title: 'Never stop',
      username: 'unstoppable',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60',
      height: 320
    },
    {
      title: 'Keep going',
      username: 'persistent_soul',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60',
      height: 280
    },
    {
      title: 'Inspire others',
      username: 'inspiration_source',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60',
      height: 340
    },
    {
      title: 'Make it happen',
      username: 'action_taker',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&auto=format&fit=crop&q=60',
      height: 300
    },
    {
      title: 'Live fully',
      username: 'life_lover',
      image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&auto=format&fit=crop&q=60',
      height: 310
    },
    {
      title: 'Love deeply',
      username: 'heart_full',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop&q=60',
      height: 270
    },
    {
      title: 'Laugh often',
      username: 'joy_spreader',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&auto=format&fit=crop&q=60',
      height: 330
    },
    {
      title: 'Learn always',
      username: 'eternal_student',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&auto=format&fit=crop&q=60',
      height: 290
    },
    {
      title: 'Grow daily',
      username: 'growth_mindset',
      image: 'https://images.unsplash.com/photo-1513475382585-dfb367046420?w=400&auto=format&fit=crop&q=60',
      height: 320
    },
    {
      title: 'Shine bright',
      username: 'light_shiner',
      image: 'https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?w=400&auto=format&fit=crop&q=60',
      height: 280
    },
    {
      title: 'Stay curious',
      username: 'curious_mind',
      image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&auto=format&fit=crop&q=60',
      height: 350
    },
    {
      title: 'Find your path',
      username: 'path_finder',
      image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&auto=format&fit=crop&q=60',
      height: 300
    },
    {
      title: 'Trust the journey',
      username: 'journey_truster',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&auto=format&fit=crop&q=60',
      height: 310
    },
    {
      title: 'Enjoy the ride',
      username: 'ride_enjoyer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60',
      height: 270
    },
    {
      title: 'Celebrate small wins',
      username: 'win_celebrator',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60',
      height: 330
    },
    {
      title: 'Perfectly imperfect',
      username: 'perfectly_imperfect',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60',
      height: 290
    },
    {
      title: 'Exact moments',
      username: 'exact_be',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&auto=format&fit=crop&q=60',
      height: 340
    }
  ];

  const relatedPosts = contentData.map((item, i) => ({
    id: `related-${i}`,
    ...item,
  }));

  return relatedPosts;
};

export default function ContentDetailPage({ post, onBack, onUserClick }: ContentDetailPageProps) {
  const [relatedContent] = useState(() => generateRelatedContent(post));
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setFailedImages(prev => ({ ...prev, [id]: true }));
  };

  // Filter content based on active filter
  const filteredContent = activeFilter === 'all'
    ? relatedContent
    : relatedContent.filter(item => {
      switch (activeFilter) {
        case 'photo':
          return !item.title?.toLowerCase().includes('video') &&
            !item.title?.toLowerCase().includes('film') &&
            !item.title?.toLowerCase().includes('music');
        case 'video':
        case 'short_video':
          return item.title?.toLowerCase().includes('video') ||
            item.title?.toLowerCase().includes('film');
        case 'article':
          return item.title?.toLowerCase().includes('article') ||
            item.title?.toLowerCase().includes('blog');
        case 'music':
          return item.title?.toLowerCase().includes('music') ||
            item.title?.toLowerCase().includes('song');
        default:
          return true;
      }
    });

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

  const getContentDimensions = (item: any, index: number) => {
    // Determine aspect ratio based on title keywords
    const title = item.title?.toLowerCase() || '';
    const isVideo = title.includes('video') || title.includes('film');
    const isShort = title.includes('short') || title.includes('reel') || title.includes('tiktok');
    const isPortrait = title.includes('portrait') || title.includes('story');
    const isLandscape = title.includes('landscape') || title.includes('panorama');
    const isAudio = title.includes('music') || title.includes('song') || title.includes('audio');
    const isArticle = title.includes('article') || title.includes('blog') || title.includes('news');
    const isMultiple = title.includes('collection') || title.includes('gallery') || title.includes('album');

    let height = item.height || 280;
    let colSpan = 1;
    let rowSpan = 1;

    // Short videos and reels - tall portrait format
    if (isShort) {
      height = 420;
      colSpan = 1;
      rowSpan = 2;
    }
    // Long videos - portrait format
    else if (isVideo && !isShort) {
      height = 380;
      colSpan = 1;
      rowSpan = 1.8;
    }
    // Portrait photos - tall format
    else if (isPortrait) {
      height = 360;
      colSpan = 1;
      rowSpan = 1.6;
    }
    // Landscape photos - wide format
    else if (isLandscape) {
      height = 240;
      colSpan = 1.5;
      rowSpan = 1;
    }
    // Audio/Music - square format
    else if (isAudio) {
      height = 280;
      colSpan = 1;
      rowSpan = 1;
    }
    // Articles - tall format with content
    else if (isArticle) {
      height = 340;
      colSpan = 1;
      rowSpan = 1.5;
    }
    // Multiple photos - larger grid item
    else if (isMultiple) {
      height = 300;
      colSpan = 1.2;
      rowSpan = 1.2;
    }
    // Regular photos - varied sizes for visual interest
    else {
      const variation = index % 5;
      if (variation === 0) {
        height = 320;
        colSpan = 1;
        rowSpan = 1.2;
      } else if (variation === 1) {
        height = 280;
        colSpan = 1;
        rowSpan = 1;
      } else if (variation === 2) {
        height = 300;
        colSpan = 1;
        rowSpan = 1.1;
      } else if (variation === 3) {
        height = 260;
        colSpan = 1;
        rowSpan = 0.9;
      } else {
        height = 340;
        colSpan = 1;
        rowSpan = 1.3;
      }
    }

    return { height, colSpan, rowSpan };
  };

  const getContentTypeInfo = (item: any, index: number) => {
    // Use index-based pattern to create a diverse mix of content types
    // This ensures we have videos, articles, music, and photos distributed throughout
    const pattern = index % 8;

    if (pattern === 0 || pattern === 4) {
      // Videos - 25% of content
      const minutes = Math.floor(Math.random() * 10);
      const seconds = Math.floor(Math.random() * 60);
      return {
        type: 'video',
        icon: FiPlay,
        badge: null,
        duration: `${minutes}:${seconds.toString().padStart(2, '0')}`
      };
    } else if (pattern === 1) {
      // Audio/Music - 12.5% of content
      return {
        type: 'audio',
        icon: FiMusic,
        badge: null,
        duration: null
      };
    } else if (pattern === 2) {
      // Articles - 12.5% of content
      return {
        type: 'article',
        icon: FiFileText,
        badge: 'Article',
        duration: null
      };
    } else if (pattern === 3 || pattern === 5) {
      // Photo collections - 25% of content
      const total = Math.floor(Math.random() * 4) + 2; // 2-5 photos
      return {
        type: 'photos',
        icon: FiImage,
        badge: `1/${total}`,
        duration: null
      };
    } else {
      // Regular single photos - 25% of content
      return {
        type: 'photo',
        icon: null,
        badge: null,
        duration: null
      };
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
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.40z" />
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
        <div className={`w-full ${contentHeight} bg-white rounded-2xl border border-gray-200 overflow-hidden`}>
          {/* Article Image */}
          <div className="w-full h-48 relative bg-gray-100">
            <Image
              src={post.image}
              alt={post.title || post.caption}
              fill
              className="object-cover"
            />
          </div>
          {/* Article Content */}
          <div className="p-6">
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
        </div>
      );
    }

    // Music content
    if (post.type === 'music') {
      return (
        <div className={`w-full ${contentHeight} bg-gradient-to-r from-[#1b2d4f] via-[#164064] to-[#0b5c7d] rounded-2xl p-6 flex items-center text-white`}>
          <div className="flex items-center w-full space-x-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-blue-500/20 flex items-center justify-center">
                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white/40">
                  <Image
                    src={post.image || FALLBACK_IMAGE}
                    alt={post.title || post.caption}
                    width={112}
                    height={112}
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="absolute inset-0 rounded-full border border-white/10" />
            </div>

            <div className="flex-1">
              <h3 className="text-2xl font-semibold">{post.title || 'Unknown Track'}</h3>
              <p className="text-sm text-blue-100 mt-1">
                {post.caption || `@${post.username}`}
              </p>

              <div className="mt-4">
                <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full w-1/3 bg-gradient-to-r from-sky-400 to-indigo-400" />
                </div>
                <div className="flex justify-between text-xs text-blue-100 mt-2">
                  <span>1:23</span>
                  <span>{post.duration || '5:47'}</span>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between text-blue-100">
                <div className="flex items-center space-x-4 text-xl">
                  <FiSkipBack />
                  <FiRepeat />
                </div>
                <button className="w-14 h-14 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center shadow-lg shadow-sky-500/40">
                  <FiPlay size={26} className="ml-0.5" />
                </button>
                <div className="flex items-center space-x-4 text-xl">
                  <FiSkipForward />
                  <FiVolume2 />
                </div>
              </div>
            </div>
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
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header with back button and user info */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
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

      {/* Pinterest-style Layout with Main Content on Left */}
      <div className="overflow-auto flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Content Type Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {['all', 'photo', 'video', 'short_video', 'article', 'music'].map((type) => (
              <button
                key={type}
                onClick={() => setActiveFilter(type)}
                className={`px-4 py-2 rounded-full border transition-colors text-sm font-medium ${activeFilter === type
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:text-gray-900'
                  }`}
              >
                {type === 'short_video' ? 'Shorts' : type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          {/* Unified Pinterest-style Masonry Grid - Mixed Together */}
          <div className="mt-8">
            {/* Main Content Card - Pinterest Style */}
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-8 max-w-2xl mx-auto">
              {renderMainContent()}

              {/* Content Info Below Main Content */}
              <div className="mt-6">
                <h1 className="text-2xl font-bold text-gray-900">{post.title || post.caption}</h1>
              </div>
            </div>

            {/* Masonry Grid using CSS columns to avoid empty gaps */}
            <div className="columns-5 gap-3 space-y-3">
              {filteredContent.map((item, index) => {
                const { height } = getContentDimensions(item, index);
                const contentInfo = getContentTypeInfo(item, index);
                // Derive a unique placeholder image per card using picsum + item id
                const src = `https://picsum.photos/seed/${item.id}/600/900`;

                return (
                  <div
                    key={item.id}
                    className="mb-3 break-inside-avoid bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  >
                    <div
                      style={{
                        height: `${height}px`
                      }}
                      className="relative overflow-hidden bg-gray-100"
                    >
                      <img
                        src={src}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />

                      {/* Content Type Badge - Top Left */}
                      {(contentInfo.icon || contentInfo.badge) && (
                        <div className="absolute top-2 left-2 bg-black/80 text-white px-2 py-1.5 rounded-md flex items-center gap-1.5 text-xs font-medium">
                          {contentInfo.icon && <contentInfo.icon size={12} />}
                          {contentInfo.badge && <span>{contentInfo.badge}</span>}
                        </div>
                      )}

                      {/* Duration Badge - Top Right (for videos) */}
                      {contentInfo.duration && (
                        <div className="absolute top-2 right-2 bg-black/80 text-white px-2 py-1.5 rounded-md text-xs font-medium">
                          {contentInfo.duration}
                        </div>
                      )}

                      {/* Play Button Overlay - Center (for videos) */}
                      {contentInfo.type === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 bg-black/60 rounded-full flex items-center justify-center hover:bg-black/80 transition-all">
                            <FiPlay size={24} className="text-white ml-1" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
