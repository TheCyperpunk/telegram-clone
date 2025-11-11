'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FiHeart, FiMessageSquare, FiShare2, FiMoreHorizontal, FiBookmark, FiSend, FiX, FiDownload, FiMaximize2, FiPlay, FiMusic, FiFile, FiFileText, FiLink, FiPackage, FiShuffle, FiSkipBack, FiPause, FiSkipForward, FiRepeat, FiVolume2 } from 'react-icons/fi';
import ShortsRecommendation from './ShortsRecommendation';

// Sample posts data with different aspect ratios
const posts = [
  {
    id: '1',
    user: {
      name: 'Documentary Films',
      username: 'doc_cinema',
      location: 'Los Angeles, CA',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&auto=format&fit=crop&q=60',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      duration: '12:34',
      caption: '🎬 Ocean Depths: The Last Frontier - New Documentary\n\nExplore the mysterious world beneath the waves. This documentary takes you 3000 feet below the surface to discover creatures never seen before.\n\n🌊 Narrated by David Attenborough\n🎥 4K Ultra HD\n⏱️ Full feature: 90 minutes',
      aspectRatio: 'wide'
    },
    stats: {
      likes: 8934,
      comments: 456,
      shares: 892
    },
    timestamp: '2 hours ago',
    liked: true,
    bookmarked: false
  },
  {
    id: '2',
    user: {
      name: 'Jazz Collective',
      username: 'smooth_jazz',
      location: 'New Orleans, LA',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'audio',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      duration: '5:47',
      title: 'Moonlight Serenade',
      artist: 'The Blue Note Trio',
      coverArt: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&auto=format&fit=crop&q=60',
      caption: '🎷 New Jazz Release: Moonlight Serenade\n\nSmooth jazz vibes for your evening. Recorded live at the Blue Note Club.\n\nFeaturing:\n🎺 Marcus Johnson - Trumpet\n🎹 Lisa Chen - Piano\n🥁 David Brown - Drums\n\nPerfect for relaxing after a long day! 🌙'
    },
    stats: {
      likes: 2341,
      comments: 187,
      shares: 345
    },
    timestamp: '3 hours ago',
    liked: false,
    bookmarked: true
  },
  {
    id: '3',
    user: {
      name: 'Business Analytics',
      username: 'data_insights',
      location: 'London, UK',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'file',
      fileName: 'Q4_Financial_Report_2024.xlsx',
      fileSize: '3.2 MB',
      fileType: 'Excel Spreadsheet',
      fileIcon: 'excel',
      downloadUrl: '#',
      caption: '📊 Q4 Financial Report 2024\n\nComprehensive financial analysis including:\n💰 Revenue breakdown by region\n📈 Year-over-year growth metrics\n💹 Profit margins and forecasts\n📉 Cost analysis\n🎯 KPI dashboard\n\nFull Excel workbook with interactive charts and pivot tables. Download now! 💼'
    },
    stats: {
      likes: 1567,
      comments: 234,
      shares: 456
    },
    timestamp: '4 hours ago',
    liked: true,
    bookmarked: false
  },
  {
    id: '4',
    user: {
      name: 'Photography Masters',
      username: 'photo_pro',
      location: 'Iceland',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'image',
      image: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800&h=1200&auto=format&fit=crop&q=60',
      caption: '🏔️ Aurora Borealis over Icelandic Mountains\n\nCapturing the Northern Lights has been on my bucket list for years. Last night, nature put on the most spectacular show!\n\n📸 Settings:\n• ISO 3200\n• f/2.8\n• 15s exposure\n• 14mm wide angle\n\nPatience and preparation paid off! ✨',
      aspectRatio: 'tall'
    },
    stats: {
      likes: 4567,
      comments: 289,
      shares: 567
    },
    timestamp: '5 hours ago',
    liked: false,
    bookmarked: true
  },
  {
    id: '5',
    user: {
      name: 'Tech News Daily',
      username: 'tech_updates',
      location: 'San Francisco, CA',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'link',
      linkUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      linkTitle: 'Apple Vision Pro 2: Everything We Know So Far',
      linkDescription: 'Apple is reportedly working on the next generation of Vision Pro. Here\'s what to expect: improved display, lighter design, lower price point, and enhanced AR capabilities.',
      linkImage: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=800&auto=format&fit=crop&q=60',
      linkDomain: 'youtube.com',
      caption: '🍎 Apple Vision Pro 2 Rumors!\n\nMajor leaks suggest:\n✨ 40% lighter design\n👁️ 8K per eye display\n💰 Starting at $2,499\n🔋 6-hour battery life\n🎮 Gaming-focused features\n\nFull video breakdown! What features do you want to see? 🤔'
    },
    stats: {
      likes: 5678,
      comments: 432,
      shares: 789
    },
    timestamp: '6 hours ago',
    liked: true,
    bookmarked: false
  },
  {
    id: '6',
    user: {
      name: 'Mobile Dev Pro',
      username: 'app_creator',
      location: 'Bangalore, India',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'apk',
      fileName: 'MindfulMeditation_v3.1.apk',
      fileSize: '52.3 MB',
      appName: 'Mindful Meditation',
      version: 'v3.1.0',
      appIcon: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=200&auto=format&fit=crop&q=60',
      downloadUrl: '#',
      caption: '🧘 Mindful Meditation v3.1 - Major Update!\n\nWhat\'s New:\n✨ 100+ guided meditations\n🎵 Nature sounds library\n📊 Progress tracking & insights\n⏰ Smart reminders\n🌙 Sleep stories\n🎨 Beautiful new UI\n🌍 Offline mode\n\nStart your mindfulness journey today! Free download. 🙏'
    },
    stats: {
      likes: 6789,
      comments: 456,
      shares: 892
    },
    timestamp: '8 hours ago',
    liked: false,
    bookmarked: true
  },
  {
    id: '7',
    user: {
      name: 'Academic Resources',
      username: 'edu_library',
      location: 'Cambridge, UK',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'file',
      fileName: 'Machine_Learning_Fundamentals.pdf',
      fileSize: '15.8 MB',
      fileType: 'PDF Document',
      fileIcon: 'pdf',
      downloadUrl: '#',
      caption: '📚 Machine Learning Fundamentals - Complete Textbook\n\nComprehensive 450-page guide covering:\n🤖 Neural Networks\n📊 Supervised Learning\n🔄 Unsupervised Learning\n🎯 Deep Learning\n📈 Model Optimization\n💡 Real-world Applications\n\nPerfect for students and professionals! Free educational resource. 🎓'
    },
    stats: {
      likes: 8934,
      comments: 567,
      shares: 1234
    },
    timestamp: '10 hours ago',
    liked: true,
    bookmarked: true
  },
  {
    id: '8',
    user: {
      name: 'Urban Photography',
      username: 'city_lights',
      location: 'New York City, NY',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'image',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1400&h=700&auto=format&fit=crop&q=60',
      caption: '🌃 Manhattan Skyline at Dusk\n\nThe city that never sleeps! Captured from Brooklyn Bridge Park during the golden hour.\n\nThe interplay of natural and artificial light creates this magical atmosphere. Love how the buildings reflect the sunset colors!\n\n#NYCPhotography #UrbanLandscape',
      aspectRatio: 'wide'
    },
    stats: {
      likes: 3456,
      comments: 234,
      shares: 456
    },
    timestamp: '12 hours ago',
    liked: false,
    bookmarked: false
  },
  {
    id: '9',
    user: {
      name: 'Cooking Masterclass',
      username: 'chef_tutorials',
      location: 'Paris, France',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&auto=format&fit=crop&q=60',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      duration: '15:42',
      caption: '👨‍🍳 Mastering French Pastry: Croissants from Scratch\n\nLearn the art of making perfect, flaky croissants! This detailed tutorial covers:\n\n🥐 Lamination technique\n🧈 Butter folding method\n⏰ Proofing times\n🌡️ Temperature control\n✨ Professional tips\n\nDifficulty: Advanced | Time: 3 hours\nWatch the full masterclass! 🇫🇷',
      aspectRatio: 'wide'
    },
    stats: {
      likes: 7892,
      comments: 543,
      shares: 892
    },
    timestamp: '14 hours ago',
    liked: true,
    bookmarked: true
  },
  {
    id: '10',
    user: {
      name: 'Business Tools',
      username: 'productivity_hub',
      location: 'Remote',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'file',
      fileName: 'Marketing_Strategy_Template.pptx',
      fileSize: '8.4 MB',
      fileType: 'PowerPoint Presentation',
      fileIcon: 'powerpoint',
      downloadUrl: '#',
      caption: '📊 Marketing Strategy Template 2024\n\nProfessional PowerPoint deck including:\n📈 Market Analysis Framework\n🎯 Target Audience Personas\n💡 Campaign Planning Tools\n📱 Social Media Strategy\n💰 Budget Allocation Templates\n📊 KPI Dashboard\n\n50+ slides ready to customize! Perfect for startups and agencies. 🚀'
    },
    stats: {
      likes: 4567,
      comments: 345,
      shares: 678
    },
    timestamp: '16 hours ago',
    liked: false,
    bookmarked: true
  },
  {
    id: '11',
    user: {
      name: 'Classical Music',
      username: 'symphony_hall',
      location: 'Vienna, Austria',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'audio',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
      duration: '8:23',
      title: 'Symphony No. 9 in D minor',
      artist: 'Vienna Philharmonic Orchestra',
      coverArt: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&auto=format&fit=crop&q=60',
      caption: '🎻 Beethoven\'s 9th Symphony - Live Recording\n\nRecorded live at the Vienna State Opera House.\n\nConductor: Maestro Antonio Rodriguez\nOrchestra: Vienna Philharmonic\nRecording: December 2023\n\nExperience the power of classical music! 🎼'
    },
    stats: {
      likes: 3456,
      comments: 234,
      shares: 456
    },
    timestamp: '18 hours ago',
    liked: true,
    bookmarked: false
  },
  {
    id: '12',
    user: {
      name: 'Wildlife Photography',
      username: 'wild_lens',
      location: 'Serengeti, Tanzania',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'image',
      image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&auto=format&fit=crop&q=60',
      caption: '🦁 The King of the Savannah\n\nSpent 3 days tracking this magnificent male lion. Finally got the perfect shot during golden hour.\n\n📸 Canon EOS R5\n🔭 600mm f/4\n⚡ 1/2000s, ISO 800\n\nWildlife photography requires patience, respect, and a lot of waiting! 🌅',
      aspectRatio: 'square'
    },
    stats: {
      likes: 9876,
      comments: 678,
      shares: 1234
    },
    timestamp: '20 hours ago',
    liked: false,
    bookmarked: true
  },
  {
    id: '13',
    user: {
      name: 'Developer Tools',
      username: 'code_resources',
      location: 'Remote',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'file',
      fileName: 'Full_Stack_Development_Kit.zip',
      fileSize: '245.7 MB',
      fileType: 'ZIP Archive',
      fileIcon: 'zip',
      downloadUrl: '#',
      caption: '💻 Full Stack Development Kit 2024\n\nMassive resource package including:\n📦 React + Next.js templates\n🎨 Tailwind UI components\n🔧 Node.js API boilerplates\n🗄️ Database schemas\n📱 Mobile app starters\n🔐 Authentication systems\n📚 Documentation\n\n100+ ready-to-use code snippets! Perfect for rapid development. 🚀'
    },
    stats: {
      likes: 12456,
      comments: 892,
      shares: 2345
    },
    timestamp: '1 day ago',
    liked: true,
    bookmarked: true
  },
  {
    id: '14',
    user: {
      name: 'Startup News',
      username: 'tech_startups',
      location: 'Silicon Valley, CA',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'link',
      linkUrl: 'https://techcrunch.com',
      linkTitle: 'AI Startup Raises $500M Series C: The Future of Autonomous Vehicles',
      linkDescription: 'Revolutionary AI company secures massive funding round led by top VCs. The technology promises to transform self-driving cars with advanced neural networks and real-time decision making.',
      linkImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=60',
      linkDomain: 'techcrunch.com',
      caption: '🚗 Huge News in AI & Autonomous Vehicles!\n\nKey highlights:\n💰 $500M Series C funding\n🤖 Advanced neural network tech\n🚙 Level 5 autonomy target\n📅 Commercial launch: 2025\n🌍 Global expansion plans\n\nThis could change transportation forever! Read the full story 👇'
    },
    stats: {
      likes: 7654,
      comments: 543,
      shares: 987
    },
    timestamp: '1 day ago',
    liked: false,
    bookmarked: true
  },
  {
    id: '15',
    user: {
      name: 'Fitness Vlog',
      username: 'workout_daily',
      location: 'Miami, FL',
      avatar: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=60',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      duration: '10:15',
      caption: '💪 30-Day Transformation Challenge - Day 1\n\nStarting my fitness journey! Join me for:\n🏋️ Full body workout routine\n🥗 Meal prep guide\n📊 Progress tracking\n💧 Hydration tips\n😴 Recovery strategies\n\nLet\'s get fit together! Drop a 💪 if you\'re in! #FitnessChallenge',
      aspectRatio: 'wide'
    },
    stats: {
      likes: 5432,
      comments: 456,
      shares: 678
    },
    timestamp: '1 day ago',
    liked: true,
    bookmarked: false
  },
  {
    id: '16',
    user: {
      name: 'Travel Vlogger',
      username: 'globe_trotter',
      location: 'Santorini, Greece',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'image',
      image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&h=1200&auto=format&fit=crop&q=60',
      caption: '🇬🇷 Sunset in Santorini - Bucket List Moment!\n\nThe famous blue domes and white-washed buildings against the Aegean Sea. This view never gets old!\n\n📍 Oia Village\n⏰ Best time: 7:30 PM\n💡 Tip: Arrive early to avoid crowds\n\nHave you been to Santorini? Share your experience! ✨',
      aspectRatio: 'tall'
    },
    stats: {
      likes: 6789,
      comments: 432,
      shares: 567
    },
    timestamp: '2 days ago',
    liked: true,
    bookmarked: true
  },
  {
    id: '17',
    user: {
      name: 'Electronic Music',
      username: 'edm_producer',
      location: 'Amsterdam, Netherlands',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'audio',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
      duration: '6:12',
      title: 'Neon Nights - Festival Mix',
      artist: 'DJ Pulse',
      coverArt: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=60',
      caption: '🎧 New EDM Track: Neon Nights (Festival Mix)\n\nDrop this at Tomorrowland last weekend and the crowd went wild!\n\n🎵 Genre: Progressive House\n⚡ BPM: 128\n🎹 Produced in Ableton Live\n🎚️ Mastered by Studio X\n\nPerfect for your workout or party playlist! Turn it up! 🔊'
    },
    stats: {
      likes: 8765,
      comments: 543,
      shares: 987
    },
    timestamp: '2 days ago',
    liked: false,
    bookmarked: false
  },
  {
    id: '18',
    user: {
      name: 'Gaming Studio',
      username: 'indie_game_dev',
      location: 'Seoul, South Korea',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'apk',
      fileName: 'CyberRacer_v2.0.apk',
      fileSize: '189.2 MB',
      appName: 'Cyber Racer 2077',
      version: 'v2.0.0',
      appIcon: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=200&auto=format&fit=crop&q=60',
      downloadUrl: '#',
      caption: '🏎️ Cyber Racer 2077 v2.0 - Massive Update!\n\nWhat\'s New:\n🚗 15 new futuristic vehicles\n🗺️ 3 new neon-lit cities\n🎮 Multiplayer mode (up to 8 players)\n🎨 Ray tracing graphics\n🎵 Electronic soundtrack\n⚡ Performance optimizations\n🏆 New championship mode\n\nThe future of mobile racing is here! Download now! 🔥',
      aspectRatio: 'wide'
    },
    stats: {
      likes: 15678,
      comments: 1234,
      shares: 2345
    },
    timestamp: '3 days ago',
    liked: true,
    bookmarked: true
  },
  {
    id: '19',
    user: {
      name: 'Design Tutorials',
      username: 'ui_ux_master',
      location: 'San Francisco, CA',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'file',
      fileName: 'UI_Design_System_2024.docx',
      fileSize: '4.7 MB',
      fileType: 'Word Document',
      fileIcon: 'word',
      downloadUrl: '#',
      caption: '🎨 Complete UI Design System Documentation\n\nProfessional design system guide including:\n📐 Grid systems & spacing\n🎨 Color palettes & accessibility\n✍️ Typography scales\n🔘 Component library\n📱 Responsive breakpoints\n♿ WCAG compliance\n\n80+ pages of design guidelines! Perfect for design teams. 🚀'
    },
    stats: {
      likes: 5678,
      comments: 432,
      shares: 789
    },
    timestamp: '3 days ago',
    liked: false,
    bookmarked: true
  },
  {
    id: '20',
    user: {
      name: 'Space Exploration',
      username: 'cosmos_daily',
      location: 'Houston, TX',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'link',
      linkUrl: 'https://www.nasa.gov',
      linkTitle: 'NASA Discovers Earth-Like Planet in Habitable Zone',
      linkDescription: 'Astronomers using the James Webb Space Telescope have discovered a potentially habitable exoplanet 100 light-years away. The planet shows signs of water vapor and temperatures suitable for life.',
      linkImage: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&auto=format&fit=crop&q=60',
      linkDomain: 'nasa.gov',
      caption: '🚀 BREAKING: Potentially Habitable Planet Discovered!\n\nKey findings:\n🌍 Similar size to Earth\n💧 Water vapor detected\n🌡️ Temperatures: 0-30°C\n📡 100 light-years away\n🔬 Further study planned\n\nThis could be humanity\'s future home! Read the full NASA report 🌌'
    },
    stats: {
      likes: 23456,
      comments: 1567,
      shares: 3456
    },
    timestamp: '4 days ago',
    liked: true,
    bookmarked: true
  },
  {
    id: '21',
    user: {
      name: 'Food Photography',
      username: 'culinary_shots',
      location: 'Tokyo, Japan',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'image',
      image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=1400&h=700&auto=format&fit=crop&q=60',
      caption: '🍣 Omakase Experience at Sukiyabashi Jiro\n\nA once-in-a-lifetime dining experience! Each piece of sushi is a work of art.\n\n🍱 15-course tasting menu\n👨‍🍳 Chef with 60+ years experience\n⭐ 3 Michelin stars\n💴 Worth every yen\n\nThe precision, quality, and dedication to the craft is unmatched. Pure perfection! 🇯🇵',
      aspectRatio: 'wide'
    },
    stats: {
      likes: 8934,
      comments: 567,
      shares: 892
    },
    timestamp: '4 days ago',
    liked: false,
    bookmarked: false
  },
  {
    id: '22',
    user: {
      name: 'Drone Photography',
      username: 'aerial_views',
      location: 'Dubai, UAE',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop&q=60',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      duration: '3:45',
      caption: '🚁 Dubai from Above - 4K Drone Footage\n\nStunning aerial views of the world\'s most futuristic city!\n\nHighlights:\n🏙️ Burj Khalifa at sunrise\n🏝️ Palm Jumeirah\n🌊 Dubai Marina\n🏜️ Desert landscapes\n\n📹 Shot on DJI Mavic 3 Pro\n🎬 4K 60fps\n\nThe architecture and scale is mind-blowing! 🇦🇪',
      aspectRatio: 'wide'
    },
    stats: {
      likes: 18765,
      comments: 987,
      shares: 1567
    },
    timestamp: '5 days ago',
    liked: true,
    bookmarked: true
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
    <div className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 w-full max-w-2xl mx-auto">
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
        <p className="text-gray-900 text-sm leading-relaxed whitespace-pre-line">
          {post.content.caption}
        </p>
      </div>

      {/* Post Media - Different types */}
      <div className="relative mx-6 mb-4">
        {post.content.type === 'image' && (
          <div 
            className="relative rounded-2xl overflow-hidden cursor-pointer flex items-center justify-center bg-gray-50"
            onClick={onImageClick}
            style={{ maxHeight: '600px' }}
          >
            <Image 
              src={post.content.image} 
              alt="Post content"
              width={800}
              height={600}
              className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
              style={{ maxHeight: '600px', objectFit: 'cover' }}
            />
          </div>
        )}

        {post.content.type === 'video' && (
          <div className="relative rounded-2xl overflow-hidden">
            <div className="relative aspect-video bg-black">
              <Image 
                src={post.content.thumbnail} 
                alt="Video thumbnail"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-40 transition-all cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-white bg-opacity-90 flex items-center justify-center hover:scale-110 transition-transform">
                  <FiPlay size={28} className="text-gray-900 ml-1" />
                </div>
              </div>
              <div className="absolute bottom-3 right-3 bg-black bg-opacity-75 px-2 py-1 rounded text-white text-xs font-semibold">
                {post.content.duration}
              </div>
            </div>
          </div>
        )}

        {post.content.type === 'audio' && (() => {
          // Define color themes for different audio posts
          const audioThemes: Record<string, {
            bg: string;
            glow: string;
            ring: string;
            border: string;
            spinBg: string;
            gradientId: string;
            gradientColors: { start: string; mid: string; end: string };
            progress: string;
            button: string;
            shadow: string;
          }> = {
            '2': { // Jazz - Blue/Cyan theme
              bg: 'from-blue-900 via-cyan-900 to-slate-900',
              glow: 'from-cyan-500/20 via-blue-500/20 to-indigo-500/20',
              ring: 'from-cyan-400 via-blue-500 to-indigo-500',
              border: 'border-cyan-400/30',
              spinBg: 'from-cyan-500/20 via-blue-500/20 to-indigo-500/20',
              gradientId: 'waveGradientBlue',
              gradientColors: { start: '#22D3EE', mid: '#3B82F6', end: '#6366F1' },
              progress: 'from-cyan-400 via-blue-500 to-indigo-500',
              button: 'from-cyan-400 via-blue-500 to-indigo-500',
              shadow: 'shadow-blue-500/50'
            },
            '11': { // Classical - Purple/Violet theme
              bg: 'from-purple-900 via-violet-900 to-fuchsia-900',
              glow: 'from-purple-500/20 via-violet-500/20 to-fuchsia-500/20',
              ring: 'from-purple-400 via-violet-500 to-fuchsia-500',
              border: 'border-purple-400/30',
              spinBg: 'from-purple-500/20 via-violet-500/20 to-fuchsia-500/20',
              gradientId: 'waveGradientPurple',
              gradientColors: { start: '#A78BFA', mid: '#8B5CF6', end: '#D946EF' },
              progress: 'from-purple-400 via-violet-500 to-fuchsia-500',
              button: 'from-purple-400 via-violet-500 to-fuchsia-500',
              shadow: 'shadow-purple-500/50'
            },
            '17': { // EDM - Pink/Orange theme
              bg: 'from-orange-900 via-pink-900 to-rose-900',
              glow: 'from-orange-500/20 via-pink-500/20 to-rose-500/20',
              ring: 'from-orange-400 via-pink-500 to-rose-500',
              border: 'border-pink-400/30',
              spinBg: 'from-orange-500/20 via-pink-500/20 to-rose-500/20',
              gradientId: 'waveGradientPink',
              gradientColors: { start: '#FB923C', mid: '#EC4899', end: '#F43F5E' },
              progress: 'from-orange-400 via-pink-500 to-rose-500',
              button: 'from-orange-400 via-pink-500 to-rose-500',
              shadow: 'shadow-pink-500/50'
            }
          };

          const theme = audioThemes[post.id as string] || audioThemes['2'];

          return (
            <div className={`rounded-2xl overflow-hidden bg-gradient-to-br ${theme.bg} p-8 relative`}>
              {/* Background glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${theme.glow} blur-3xl`}></div>
              
              <div className="relative flex items-center gap-8">
                {/* Circular Waveform Visualization */}
                <div className="relative w-40 h-40 flex-shrink-0">
                  {/* Outer glow ring */}
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${theme.ring} opacity-30 blur-xl animate-pulse`}></div>
                  
                  {/* Main circular waveform */}
                  <div className={`relative w-full h-full rounded-full border-4 ${theme.border} flex items-center justify-center overflow-hidden`}>
                    {/* Animated gradient background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${theme.spinBg} animate-spin`} style={{animationDuration: '8s'}}></div>
                    
                    {/* Circular waveform bars */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                      <defs>
                        <linearGradient id={theme.gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor={theme.gradientColors.start} />
                          <stop offset="50%" stopColor={theme.gradientColors.mid} />
                          <stop offset="100%" stopColor={theme.gradientColors.end} />
                        </linearGradient>
                      </defs>
                      {[...Array(32)].map((_, i) => {
                        const angle = (i * 360) / 32;
                        const height = 15 + Math.sin(i * 0.5) * 8;
                        return (
                          <line
                            key={i}
                            x1="50"
                            y1="35"
                            x2="50"
                            y2={35 - height}
                            stroke={`url(#${theme.gradientId})`}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            transform={`rotate(${angle} 50 50)`}
                            className="animate-pulse"
                            style={{
                              animationDelay: `${i * 0.05}s`,
                              animationDuration: '1.5s'
                            }}
                          />
                        );
                      })}
                    </svg>
                    
                    {/* Center album art */}
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-white/20 shadow-2xl z-10">
                      <Image 
                        src={post.content.coverArt} 
                        alt="Album art"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Track Info and Controls */}
                <div className="flex-1 space-y-6">
                  {/* Track Title and Artist */}
                  <div>
                    <h3 className="text-white font-bold text-2xl mb-1 tracking-tight">{post.content.title}</h3>
                    <p className="text-gray-400 text-sm">{post.content.artist}</p>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="relative h-1.5 bg-gray-700 rounded-full overflow-hidden group cursor-pointer">
                      <div className={`absolute inset-0 bg-gradient-to-r ${theme.progress} w-1/3 rounded-full group-hover:h-2 transition-all`}></div>
                      <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>1:23</span>
                      <span>{post.content.duration}</span>
                    </div>
                  </div>

                  {/* Control Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <button className="text-gray-400 hover:text-white transition-colors">
                        <FiShuffle size={18} />
                      </button>
                      <button className="text-gray-400 hover:text-white transition-colors">
                        <FiSkipBack size={20} />
                      </button>
                      <button className={`w-12 h-12 rounded-full bg-gradient-to-br ${theme.button} flex items-center justify-center hover:scale-110 transition-transform shadow-lg ${theme.shadow}`}>
                        <FiPause size={20} className="text-white" />
                      </button>
                      <button className="text-gray-400 hover:text-white transition-colors">
                        <FiSkipForward size={20} />
                      </button>
                      <button className="text-gray-400 hover:text-white transition-colors">
                        <FiRepeat size={18} />
                      </button>
                    </div>
                    <button className="text-gray-400 hover:text-white transition-colors">
                      <FiVolume2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {post.content.type === 'file' && (
          <div className={`relative rounded-3xl overflow-hidden p-8 cursor-pointer group transition-all duration-500 ${
            post.content.fileIcon === 'pdf' ? 'bg-gradient-to-br from-red-50 via-orange-50 to-red-100' :
            post.content.fileIcon === 'excel' ? 'bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100' :
            post.content.fileIcon === 'word' ? 'bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100' :
            post.content.fileIcon === 'powerpoint' ? 'bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100' :
            post.content.fileIcon === 'zip' ? 'bg-gradient-to-br from-purple-50 via-violet-50 to-purple-100' :
            'bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100'
          }`}>
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,.05)_25%,rgba(0,0,0,.05)_50%,transparent_50%,transparent_75%,rgba(0,0,0,.05)_75%,rgba(0,0,0,.05))] bg-[length:20px_20px]"></div>
            </div>

            {/* Glow effect */}
            <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity ${
              post.content.fileIcon === 'pdf' ? 'bg-red-400' :
              post.content.fileIcon === 'excel' ? 'bg-green-400' :
              post.content.fileIcon === 'word' ? 'bg-blue-400' :
              post.content.fileIcon === 'powerpoint' ? 'bg-orange-400' :
              post.content.fileIcon === 'zip' ? 'bg-purple-400' :
              'bg-gray-400'
            }`}></div>

            <div className="relative flex items-start space-x-6">
              {/* File Icon with 3D effect */}
              <div className="relative group/icon flex-shrink-0">
                {/* Glow behind icon */}
                <div className={`absolute inset-0 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity ${
                  post.content.fileIcon === 'pdf' ? 'bg-gradient-to-br from-red-400 to-orange-500' :
                  post.content.fileIcon === 'excel' ? 'bg-gradient-to-br from-green-400 to-emerald-500' :
                  post.content.fileIcon === 'word' ? 'bg-gradient-to-br from-blue-400 to-indigo-500' :
                  post.content.fileIcon === 'powerpoint' ? 'bg-gradient-to-br from-orange-400 to-amber-500' :
                  post.content.fileIcon === 'zip' ? 'bg-gradient-to-br from-purple-400 to-violet-500' :
                  'bg-gradient-to-br from-gray-400 to-slate-500'
                }`}></div>

                {/* Main icon container */}
                <div className={`relative w-28 h-32 rounded-3xl shadow-2xl transform group-hover:scale-105 group-hover:-rotate-3 transition-all duration-500 overflow-hidden ${
                  post.content.fileIcon === 'pdf' ? 'bg-gradient-to-br from-red-500 via-red-600 to-orange-600' :
                  post.content.fileIcon === 'excel' ? 'bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600' :
                  post.content.fileIcon === 'word' ? 'bg-gradient-to-br from-blue-500 via-indigo-600 to-blue-700' :
                  post.content.fileIcon === 'powerpoint' ? 'bg-gradient-to-br from-orange-500 via-amber-600 to-orange-700' :
                  post.content.fileIcon === 'zip' ? 'bg-gradient-to-br from-purple-500 via-violet-600 to-purple-700' :
                  'bg-gradient-to-br from-gray-500 via-slate-600 to-gray-700'
                }`}>
                  {/* Top fold effect */}
                  <div className="absolute top-0 right-0 w-8 h-8 bg-black/20 transform rotate-45 translate-x-4 -translate-y-4"></div>
                  
                  {/* Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FiFileText size={48} className="text-white drop-shadow-2xl" />
                  </div>

                  {/* File type badge */}
                  <div className="absolute bottom-3 left-0 right-0 flex justify-center">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-bold uppercase rounded-full border border-white/30">
                      {post.content.fileIcon === 'pdf' ? 'PDF' :
                       post.content.fileIcon === 'excel' ? 'XLSX' :
                       post.content.fileIcon === 'word' ? 'DOCX' :
                       post.content.fileIcon === 'powerpoint' ? 'PPTX' :
                       post.content.fileIcon === 'zip' ? 'ZIP' : 'FILE'}
                    </span>
                  </div>

                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-0 group-hover/icon:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>

              {/* File Details */}
              <div className="flex-1 space-y-4">
                {/* File name and type */}
                <div>
                  <h3 className={`font-bold text-xl mb-2 line-clamp-2 transition-colors ${
                    post.content.fileIcon === 'pdf' ? 'text-red-900 group-hover:text-red-600' :
                    post.content.fileIcon === 'excel' ? 'text-green-900 group-hover:text-green-600' :
                    post.content.fileIcon === 'word' ? 'text-blue-900 group-hover:text-blue-600' :
                    post.content.fileIcon === 'powerpoint' ? 'text-orange-900 group-hover:text-orange-600' :
                    post.content.fileIcon === 'zip' ? 'text-purple-900 group-hover:text-purple-600' :
                    'text-gray-900 group-hover:text-gray-600'
                  }`}>{post.content.fileName}</h3>
                  
                  <div className="flex items-center space-x-3 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      post.content.fileIcon === 'pdf' ? 'bg-red-200 text-red-800' :
                      post.content.fileIcon === 'excel' ? 'bg-green-200 text-green-800' :
                      post.content.fileIcon === 'word' ? 'bg-blue-200 text-blue-800' :
                      post.content.fileIcon === 'powerpoint' ? 'bg-orange-200 text-orange-800' :
                      post.content.fileIcon === 'zip' ? 'bg-purple-200 text-purple-800' :
                      'bg-gray-200 text-gray-800'
                    }`}>{post.content.fileType}</span>
                    <span className="text-gray-500 font-semibold">{post.content.fileSize}</span>
                  </div>
                </div>

                {/* File stats */}
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      post.content.fileIcon === 'pdf' ? 'bg-red-500' :
                      post.content.fileIcon === 'excel' ? 'bg-green-500' :
                      post.content.fileIcon === 'word' ? 'bg-blue-500' :
                      post.content.fileIcon === 'powerpoint' ? 'bg-orange-500' :
                      post.content.fileIcon === 'zip' ? 'bg-purple-500' :
                      'bg-gray-500'
                    } animate-pulse`}></div>
                    <span className="text-gray-600 font-medium">Ready to download</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Download progress</span>
                    <span>100%</span>
                  </div>
                  <div className="h-2 bg-white/50 rounded-full overflow-hidden backdrop-blur-sm">
                    <div className={`h-full w-full rounded-full shadow-lg transition-all duration-1000 ${
                      post.content.fileIcon === 'pdf' ? 'bg-gradient-to-r from-red-400 via-orange-400 to-red-500 shadow-red-500/50' :
                      post.content.fileIcon === 'excel' ? 'bg-gradient-to-r from-green-400 via-emerald-400 to-teal-500 shadow-green-500/50' :
                      post.content.fileIcon === 'word' ? 'bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-500 shadow-blue-500/50' :
                      post.content.fileIcon === 'powerpoint' ? 'bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 shadow-orange-500/50' :
                      post.content.fileIcon === 'zip' ? 'bg-gradient-to-r from-purple-400 via-violet-400 to-purple-500 shadow-purple-500/50' :
                      'bg-gradient-to-r from-gray-400 via-slate-400 to-gray-500 shadow-gray-500/50'
                    }`}></div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center space-x-3">
                  <button className={`flex-1 py-3 rounded-xl font-bold text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 ${
                    post.content.fileIcon === 'pdf' ? 'bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700' :
                    post.content.fileIcon === 'excel' ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700' :
                    post.content.fileIcon === 'word' ? 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700' :
                    post.content.fileIcon === 'powerpoint' ? 'bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700' :
                    post.content.fileIcon === 'zip' ? 'bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700' :
                    'bg-gradient-to-r from-gray-500 to-slate-600 hover:from-gray-600 hover:to-slate-700'
                  }`}>
                    <FiDownload size={18} />
                    <span>Download File</span>
                  </button>
                  
                  <button className={`p-3 rounded-xl border-2 hover:scale-110 transition-all duration-300 ${
                    post.content.fileIcon === 'pdf' ? 'border-red-300 text-red-600 hover:bg-red-50' :
                    post.content.fileIcon === 'excel' ? 'border-green-300 text-green-600 hover:bg-green-50' :
                    post.content.fileIcon === 'word' ? 'border-blue-300 text-blue-600 hover:bg-blue-50' :
                    post.content.fileIcon === 'powerpoint' ? 'border-orange-300 text-orange-600 hover:bg-orange-50' :
                    post.content.fileIcon === 'zip' ? 'border-purple-300 text-purple-600 hover:bg-purple-50' :
                    'border-gray-300 text-gray-600 hover:bg-gray-50'
                  }`}>
                    <FiShare2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {post.content.type === 'link' && (
          <a 
            href={post.content.linkUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-blue-400 transition-all"
          >
            <div className="relative aspect-video bg-gray-100">
              <Image 
                src={post.content.linkImage} 
                alt="Link preview"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 bg-white">
              <div className="flex items-start space-x-3">
                <FiLink size={18} className="text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-gray-900 font-semibold text-sm line-clamp-2">{post.content.linkTitle}</h4>
                  <p className="text-gray-500 text-xs mt-1 line-clamp-2">{post.content.linkDescription}</p>
                  <p className="text-blue-600 text-xs mt-2 font-medium">{post.content.linkDomain}</p>
                </div>
              </div>
            </div>
          </a>
        )}

        {post.content.type === 'apk' && (
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 p-8 group cursor-pointer">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)] animate-pulse"></div>
            </div>
            
            {/* Glow effects */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-400/30 to-emerald-500/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-teal-400/20 to-cyan-500/20 rounded-full blur-3xl"></div>

            <div className="relative flex items-start space-x-6">
              {/* App Icon with 3D effect */}
              <div className="relative group/icon">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative w-24 h-24 rounded-3xl overflow-hidden shadow-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <Image 
                    src={post.content.appIcon} 
                    alt="App icon"
                    fill
                    className="object-cover"
                  />
                  {/* Glass reflection */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-50"></div>
                  {/* APK Badge */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white/20">
                    <FiPackage size={14} className="text-white" />
                  </div>
                </div>
              </div>

              {/* App Info */}
              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-white font-bold text-2xl tracking-tight">{post.content.appName}</h3>
                    <span className="px-3 py-1 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs font-bold rounded-full shadow-lg animate-pulse">APK</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <span className="text-green-300 font-semibold">{post.content.version}</span>
                    <span className="text-green-400/60">•</span>
                    <span className="text-green-300">{post.content.fileSize}</span>
                    <span className="text-green-400/60">•</span>
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-400">★</span>
                      <span className="text-green-300 font-medium">4.8</span>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-white/10 backdrop-blur-sm text-green-200 text-xs rounded-full border border-white/20">Free</span>
                  <span className="px-3 py-1 bg-white/10 backdrop-blur-sm text-green-200 text-xs rounded-full border border-white/20">No Ads</span>
                  <span className="px-3 py-1 bg-white/10 backdrop-blur-sm text-green-200 text-xs rounded-full border border-white/20">Safe</span>
                </div>

                {/* Download Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-green-300">
                    <span>Ready to install</span>
                    <span>100%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                    <div className="h-full w-full bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 rounded-full shadow-lg shadow-green-500/50"></div>
                  </div>
                </div>

                {/* Download Button */}
                <button className="w-full py-3.5 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 hover:from-green-500 hover:via-emerald-600 hover:to-teal-600 text-white font-bold rounded-xl shadow-lg shadow-green-500/50 hover:shadow-xl hover:shadow-green-500/60 hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 group/btn">
                  <FiDownload size={20} className="transform group-hover/btn:translate-y-0.5 transition-transform" />
                  <span>Download APK</span>
                </button>
              </div>
            </div>
          </div>
        )}
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
