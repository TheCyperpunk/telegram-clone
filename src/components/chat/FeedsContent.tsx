'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Script from 'next/script';
import { FiHeart, FiMessageSquare, FiShare2, FiMoreHorizontal, FiBookmark, FiSend, FiX, FiDownload, FiMaximize2, FiPlay, FiMusic, FiFile, FiFileText, FiLink, FiPackage, FiShuffle, FiSkipBack, FiPause, FiSkipForward, FiRepeat, FiVolume2 } from 'react-icons/fi';
import ShortsRecommendation from './ShortsRecommendation';

// Sample posts data - manually ordered for optimal content distribution
// Pattern: Image → Video → Link → Audio → Multi-Images → File → Image → APK → Video → File → Image → Link → Multi-Videos → Audio → File → Image → Video → File → Multi-Images → Audio → APK → Link → Image → File → Video
const posts = [
  {  // 1. Image - Aurora
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
  {  // 2. Audio
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
  {  // 3. Link
    id: '5',
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
  {  // 4. Multi-Images (10 photos)
    id: '23',
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
  },
  {
    id: '23',
    user: {
      name: 'Travel Memories',
      username: 'wanderlust_diary',
      location: 'Bali, Indonesia',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'images',
      images: [
        'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=60',
        'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=800&auto=format&fit=crop&q=60',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=60',
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&auto=format&fit=crop&q=60',
        'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&auto=format&fit=crop&q=60',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=60',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=60',
        'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&auto=format&fit=crop&q=60',
        'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&auto=format&fit=crop&q=60',
        'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800&auto=format&fit=crop&q=60'
      ],
      caption: '🌴 Bali Adventures - 10 Days of Paradise!\n\nFrom sunrise at Mount Batur to sunset beach clubs, this trip was absolutely incredible. Swipe through for the highlights!\n\n📍 Locations:\n• Ubud Rice Terraces\n• Tanah Lot Temple\n• Nusa Penida\n• Seminyak Beach\n• Tegalalang\n\n#BaliLife #TravelDiaries',
      aspectRatio: 'square'
    },
    stats: {
      likes: 12456,
      comments: 892,
      shares: 1234
    },
    timestamp: '3 hours ago',
    liked: true,
    bookmarked: true
  },
  {
    id: '24',
    user: {
      name: 'Concert Highlights',
      username: 'live_music_fan',
      location: 'Madison Square Garden, NYC',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'videos',
      videos: [
        { thumbnail: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&auto=format&fit=crop&q=60', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '0:45' },
        { thumbnail: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&auto=format&fit=crop&q=60', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '1:12' },
        { thumbnail: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&auto=format&fit=crop&q=60', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '0:58' },
        { thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop&q=60', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '1:30' },
        { thumbnail: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=60', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '0:52' },
        { thumbnail: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&auto=format&fit=crop&q=60', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '1:05' }
      ],
      caption: '🎸 Best Night Ever! Concert Highlights\n\nThe energy was INSANE! Here are the best moments from last night\'s show.\n\n🎤 Setlist highlights\n🔥 Epic guitar solos\n⚡ Crowd going wild\n✨ Light show perfection\n\nWho else was there? Drop a 🤘 below!',
      aspectRatio: 'square'
    },
    stats: {
      likes: 8765,
      comments: 543,
      shares: 892
    },
    timestamp: '7 hours ago',
    liked: false,
    bookmarked: false
  },
  {
    id: '25',
    user: {
      name: 'Food Adventures',
      username: 'foodie_explorer',
      location: 'Tokyo, Japan',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'images',
      images: [
        'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&auto=format&fit=crop&q=60',
        'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=60',
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=60',
        'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&auto=format&fit=crop&q=60',
        'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&auto=format&fit=crop&q=60',
        'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800&auto=format&fit=crop&q=60',
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=60',
        'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800&auto=format&fit=crop&q=60'
      ],
      caption: '🍱 Tokyo Food Tour - 8 Must-Try Dishes!\n\nSpent the week eating my way through Tokyo. Every meal was an experience!\n\n🍣 Fresh sushi at Tsukiji\n🍜 Authentic ramen\n🥟 Handmade gyoza\n🍛 Curry rice perfection\n🍲 Hot pot heaven\n🥘 Tempura delights\n\nWhich one would you try first? 🇯🇵',
      aspectRatio: 'square'
    },
    stats: {
      likes: 9876,
      comments: 654,
      shares: 1123
    },
    timestamp: '12 hours ago',
    liked: true,
    bookmarked: true
  },
  {
    id: '26',
    user: {
      name: 'Tech Reviews',
      username: 'tech_reviewer',
      location: 'Silicon Valley, CA',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'youtube',
      youtubeId: 'iDqSKfIQ-q4',
      youtubeUrl: 'https://youtu.be/iDqSKfIQ-q4?si=VKPtS28FSSV3a5MK',
      caption: '🎥 Amazing Tech Review!\n\nCheck out this incredible video - watch it right here without leaving the app!\n\n👍 Like if you enjoyed it\n💬 Drop your thoughts in comments',
      aspectRatio: 'wide'
    },
    stats: {
      likes: 15234,
      comments: 892,
      shares: 2341
    },
    timestamp: '1 hour ago',
    liked: false,
    bookmarked: false
  },
  {
    id: '27',
    user: {
      name: 'Music Vibes',
      username: 'music_lover',
      location: 'Los Angeles, CA',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'youtube',
      youtubeId: 'nb_fFj_0rq8',
      youtubeUrl: 'https://youtu.be/nb_fFj_0rq8?si=1g33L0LiGA5Dt-9v',
      caption: '🎵 Epic Music Video!\n\nThis song is on repeat! Watch the full video here.\n\n🔥 Absolute banger\n🎧 Turn up the volume',
      aspectRatio: 'wide'
    },
    stats: {
      likes: 23456,
      comments: 1234,
      shares: 3456
    },
    timestamp: '2 hours ago',
    liked: true,
    bookmarked: true
  },
  {
    id: 'vimeo1',
    user: {
      name: 'Creative Studios',
      username: 'creative_pro',
      location: 'New York, NY',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'vimeo',
      vimeoId: '347119375',
      vimeoUrl: 'https://vimeo.com/347119375',
      autoplay: 0,
      muted: 0,
      caption: '🎬 Professional Video Production\n\nCheck out this amazing creative work! High-quality cinematography and storytelling.\n\n✨ Professional grade\n🎥 Cinematic quality\n🎨 Creative excellence',
      aspectRatio: 'wide'
    },
    stats: {
      likes: 8934,
      comments: 456,
      shares: 1234
    },
    timestamp: '3 hours ago',
    liked: false,
    bookmarked: true
  },
  {
    id: 'vimeo2',
    user: {
      name: 'Digital Arts',
      username: 'digital_creator',
      location: 'Los Angeles, CA',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'vimeo',
      vimeoId: '897767595',
      vimeoUrl: 'https://vimeo.com/897767595?autoplay=1&muted=1&stream_id=Y2xpcHN8NTEwMzIwMjF8aWQ6ZGVzY3xbXQ%3D%3D',
      autoplay: 1,
      muted: 1,
      caption: '🎨 Digital Art Showcase\n\nLatest digital artwork with stunning visual effects. Auto-plays with sound muted for better experience.\n\n🌟 Visual masterpiece\n💫 Digital innovation\n🎭 Artistic expression',
      aspectRatio: 'wide'
    },
    stats: {
      likes: 12567,
      comments: 789,
      shares: 2345
    },
    timestamp: '5 hours ago',
    liked: true,
    bookmarked: false
  },
  {
    id: 'vimeo3',
    user: {
      name: 'Motion Graphics',
      username: 'motion_designer',
      location: 'London, UK',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'vimeo',
      vimeoId: '897818060',
      vimeoUrl: 'https://vimeo.com/897818060?autoplay=1&muted=1&stream_id=Y2xpcHN8NTEwMzIwMjF8aWQ6ZGVzY3xbXQ%3D%3D',
      autoplay: 1,
      muted: 1,
      caption: '⚡ Motion Graphics Demo\n\nSmooth animations and dynamic transitions. Perfect example of modern motion design.\n\n🔥 Fluid animations\n⭐ Professional quality\n🎯 Design excellence',
      aspectRatio: 'wide'
    },
    stats: {
      likes: 15678,
      comments: 923,
      shares: 3456
    },
    timestamp: '6 hours ago',
    liked: false,
    bookmarked: true
  },
  {
    id: 'vimeo4',
    user: {
      name: 'Film Production',
      username: 'film_maker',
      location: 'Toronto, Canada',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'vimeo',
      vimeoId: '701057180',
      vimeoUrl: 'https://vimeo.com/701057180?autoplay=1&muted=1&stream_id=Y2xpcHN8NTEwMzIwMjF8aWQ6ZGVzY3xbXQ%3D%3D',
      autoplay: 1,
      muted: 1,
      caption: '🎬 Independent Film Trailer\n\nExclusive preview of our upcoming independent film. Cinematic storytelling at its finest.\n\n🎭 Compelling narrative\n📽️ Independent cinema\n🌟 Award potential',
      aspectRatio: 'wide'
    },
    stats: {
      likes: 9876,
      comments: 567,
      shares: 1890
    },
    timestamp: '8 hours ago',
    liked: true,
    bookmarked: true
  },
  {
    id: 'vimeo5',
    user: {
      name: 'Visual Effects',
      username: 'vfx_artist',
      location: 'Vancouver, Canada',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'vimeo',
      vimeoId: '761155134',
      vimeoUrl: 'https://vimeo.com/761155134?autoplay=1&muted=1&stream_id=Y2xpcHN8NTEwMzIwMjF8aWQ6ZGVzY3xbXQ%3D%3D',
      autoplay: 1,
      muted: 1,
      caption: '💫 VFX Breakdown Reel\n\nBehind the scenes of our latest visual effects work. See how movie magic is made!\n\n🎥 VFX breakdown\n✨ Movie magic\n🔬 Technical artistry',
      aspectRatio: 'wide'
    },
    stats: {
      likes: 18234,
      comments: 1123,
      shares: 4567
    },
    timestamp: '10 hours ago',
    liked: false,
    bookmarked: false
  },
  {
    id: 'dailymotion1',
    user: {
      name: 'Dailymotion Creator',
      username: 'dailymotion_pro',
      location: 'Paris, France',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'dailymotion',
      dailymotionId: 'x9fo68m',
      dailymotionUrl: 'https://www.dailymotion.com/video/x9fo68m',
      caption: '🎬 Amazing Dailymotion Content!\n\nCheck out this incredible video content from Dailymotion. High-quality entertainment at its finest.\n\n✨ Premium content\n🎥 Professional quality\n🌟 Must watch',
      aspectRatio: 'wide'
    },
    stats: {
      likes: 7892,
      comments: 345,
      shares: 1123
    },
    timestamp: '2 hours ago',
    liked: true,
    bookmarked: false
  },
  {
    id: 'dailymotion2',
    user: {
      name: 'Media Studio',
      username: 'media_studio_fr',
      location: 'Lyon, France',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'dailymotion',
      dailymotionId: 'x9lzp5y',
      dailymotionUrl: 'https://www.dailymotion.com/video/x9lzp5y',
      caption: '🎨 Creative Showcase\n\nDiscover amazing creative content and artistic expression. A journey through visual storytelling.\n\n🎭 Artistic vision\n💫 Creative excellence\n🎪 Visual masterpiece',
      aspectRatio: 'wide'
    },
    stats: {
      likes: 12456,
      comments: 678,
      shares: 2234
    },
    timestamp: '4 hours ago',
    liked: false,
    bookmarked: true
  },
  {
    id: 'dailymotion3',
    user: {
      name: 'French Cinema',
      username: 'cinema_francais',
      location: 'Cannes, France',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'dailymotion',
      dailymotionId: 'x9oafl0',
      dailymotionUrl: 'https://www.dailymotion.com/video/x9oafl0',
      caption: '🎬 French Cinema Excellence\n\nExperience the beauty of French cinematography. Award-winning content from talented filmmakers.\n\n🏆 Award winning\n🎭 Cinematic art\n🇫🇷 French excellence',
      aspectRatio: 'wide'
    },
    stats: {
      likes: 15678,
      comments: 892,
      shares: 3456
    },
    timestamp: '6 hours ago',
    liked: true,
    bookmarked: true
  },
  {
    id: 'dailymotion4',
    user: {
      name: 'Documentary Hub',
      username: 'docu_hub',
      location: 'Marseille, France',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'dailymotion',
      dailymotionId: 'x9cvdfs',
      dailymotionUrl: 'https://www.dailymotion.com/video/x9cvdfs',
      caption: '📺 Documentary Special\n\nInsightful documentary content that explores fascinating topics. Educational and entertaining.\n\n📚 Educational\n🔍 Investigative\n🌍 Eye-opening',
      aspectRatio: 'wide'
    },
    stats: {
      likes: 9876,
      comments: 456,
      shares: 1789
    },
    timestamp: '8 hours ago',
    liked: false,
    bookmarked: false
  },
  {
    id: 'dailymotion5',
    user: {
      name: 'Entertainment Plus',
      username: 'entertainment_plus',
      location: 'Nice, France',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'dailymotion',
      dailymotionId: 'x9rlloi',
      dailymotionUrl: 'https://www.dailymotion.com/video/x9rlloi',
      caption: '🎪 Entertainment Extravaganza\n\nThe ultimate entertainment experience! Fun, laughter, and amazing performances all in one place.\n\n🎭 Live entertainment\n🎪 Spectacular show\n🌟 Pure fun',
      aspectRatio: 'wide'
    },
    stats: {
      likes: 21345,
      comments: 1234,
      shares: 4567
    },
    timestamp: '12 hours ago',
    liked: true,
    bookmarked: true
  },
  {
    id: '28',
    user: {
      name: 'Gaming Zone',
      username: 'pro_gamer',
      location: 'Tokyo, Japan',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'youtube',
      youtubeId: 'K5I-hA-X788',
      youtubeUrl: 'https://youtu.be/K5I-hA-X788?si=MQVT8LxERiR91ByS',
      caption: '🎮 Insane Gaming Moments!\n\nYou won\'t believe what happened in this match! Watch till the end.\n\n⚡ Epic gameplay\n🏆 Pro moves',
      aspectRatio: 'wide'
    },
    stats: {
      likes: 18765,
      comments: 987,
      shares: 2134
    },
    timestamp: '3 hours ago',
    liked: false,
    bookmarked: true
  },
  {
    id: '29',
    user: {
      name: 'Travel Diaries',
      username: 'world_explorer',
      location: 'Paris, France',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'youtube',
      youtubeId: 'FPnrFuzuXo0',
      youtubeUrl: 'https://youtu.be/FPnrFuzuXo0?si=coWdK0gxusgXi_2m',
      caption: '✈️ Travel Vlog - Hidden Gems!\n\nDiscovered the most beautiful places! Come explore with me.\n\n🌍 Wanderlust\n📸 Breathtaking views',
      aspectRatio: 'wide'
    },
    stats: {
      likes: 12987,
      comments: 765,
      shares: 1876
    },
    timestamp: '4 hours ago',
    liked: true,
    bookmarked: false
  },
  {
    id: '30',
    user: {
      name: 'Lifestyle Vlogs',
      username: 'daily_vibes',
      location: 'New York, NY',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'youtube',
      youtubeId: 'wg1MCgq-nHI',
      youtubeUrl: 'https://youtu.be/wg1MCgq-nHI?si=8CJlT323EgEI2oZ3',
      caption: '🌟 Day in My Life!\n\nFollow along for a day of adventures, coffee, and good vibes!\n\n☕ Morning routine\n🎨 Creative work\n🌆 City exploration',
      aspectRatio: 'wide'
    },
    stats: {
      likes: 16543,
      comments: 892,
      shares: 2109
    },
    timestamp: '5 hours ago',
    liked: false,
    bookmarked: true
  },
  {
    id: '31',
    user: {
      name: 'Viral Shorts',
      username: 'trending_shorts',
      location: 'Mumbai, India',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'youtube-short',
      youtubeId: 'mWbxOjykArw',
      youtubeUrl: 'https://youtube.com/shorts/mWbxOjykArw?si=if7XVPN1jdz68yUW',
      caption: '🔥 Trending Short!\n\nThis is going viral! Watch now!\n\n⚡ Quick & entertaining\n👀 Must watch',
      aspectRatio: 'tall'
    },
    stats: {
      likes: 45678,
      comments: 2341,
      shares: 5678
    },
    timestamp: '30 minutes ago',
    liked: true,
    bookmarked: false
  },
  {
    id: '32',
    user: {
      name: 'Comedy Central',
      username: 'laugh_hub',
      location: 'Los Angeles, CA',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'youtube-short',
      youtubeId: 'FQiYPO1WmQc',
      youtubeUrl: 'https://youtube.com/shorts/FQiYPO1WmQc?si=xhk01XJOBtqtyzBe',
      caption: '😂 Hilarious Moment!\n\nCan\'t stop laughing at this! Share with friends!\n\n🤣 Comedy gold\n😆 Too funny',
      aspectRatio: 'tall'
    },
    stats: {
      likes: 38765,
      comments: 1876,
      shares: 4321
    },
    timestamp: '1 hour ago',
    liked: false,
    bookmarked: true
  },
  {
    id: '33',
    user: {
      name: 'Dance Moves',
      username: 'dance_vibes',
      location: 'Seoul, South Korea',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'youtube-short',
      youtubeId: 'QWpDDHw0PMc',
      youtubeUrl: 'https://youtube.com/shorts/QWpDDHw0PMc?si=8dQNoUKhuSk7VY7s',
      caption: '💃 Smooth Moves!\n\nCheck out these incredible dance skills!\n\n🎵 Rhythm perfect\n✨ Amazing talent',
      aspectRatio: 'tall'
    },
    stats: {
      likes: 52341,
      comments: 2987,
      shares: 6543
    },
    timestamp: '2 hours ago',
    liked: true,
    bookmarked: true
  },
  {
    id: '34',
    user: {
      name: 'Life Hacks',
      username: 'quick_tips',
      location: 'London, UK',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'youtube-short',
      youtubeId: 'cXB9MiFPs5k',
      youtubeUrl: 'https://youtube.com/shorts/cXB9MiFPs5k?si=MvGkClsY_sHmS25y',
      caption: '💡 Mind-Blowing Hack!\n\nThis will change your life! Try it now!\n\n🔧 Super useful\n⭐ Game changer',
      aspectRatio: 'tall'
    },
    stats: {
      likes: 41234,
      comments: 2156,
      shares: 5432
    },
    timestamp: '3 hours ago',
    liked: false,
    bookmarked: false
  },
  {
    id: '35',
    user: {
      name: 'Food Shorts',
      username: 'quick_recipes',
      location: 'Paris, France',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'youtube-short',
      youtubeId: 'snGl5ns_-Rg',
      youtubeUrl: 'https://youtube.com/shorts/snGl5ns_-Rg?si=AgaGBb_Z_DGM2RKX',
      caption: '🍳 Quick Recipe!\n\nMake this delicious dish in under 60 seconds!\n\n👨‍🍳 Easy to follow\n😋 Tasty results',
      aspectRatio: 'tall'
    },
    stats: {
      likes: 36789,
      comments: 1654,
      shares: 4567
    },
    timestamp: '4 hours ago',
    liked: true,
    bookmarked: true
  },
  {
    id: '36',
    user: {
      name: 'Tech Insights',
      username: 'saxenasaheb',
      location: 'India',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'twitter',
      tweetId: '1987765669069541866',
      tweetUrl: 'https://x.com/saxenasaheb/status/1987765669069541866?s=20',
      username: 'saxenasaheb',
      caption: '🐦 Interesting tweet from @saxenasaheb\n\nCheck out this insightful post on X (Twitter)!\n\n💡 Great perspective\n🔄 Worth sharing',
      aspectRatio: 'square'
    },
    stats: {
      likes: 8934,
      comments: 456,
      shares: 1234
    },
    timestamp: '1 hour ago',
    liked: false,
    bookmarked: true
  },
  {
    id: '37',
    user: {
      name: 'AI Updates',
      username: 'higgsfield_ai',
      location: 'San Francisco, CA',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'twitter',
      tweetId: '1987991875811528876',
      tweetUrl: 'https://x.com/higgsfield_ai/status/1987991875811528876?s=20',
      username: 'higgsfield_ai',
      caption: '🤖 AI News from @higgsfield_ai\n\nLatest developments in artificial intelligence!\n\n🚀 Innovation\n🧠 Cutting edge',
      aspectRatio: 'square'
    },
    stats: {
      likes: 15678,
      comments: 892,
      shares: 2345
    },
    timestamp: '2 hours ago',
    liked: true,
    bookmarked: false
  },
  {
    id: '38',
    user: {
      name: 'DOT Meetups',
      username: 'DOTmeetups',
      location: 'Global',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'twitter',
      tweetId: '1987629425479827930',
      tweetUrl: 'https://x.com/DOTmeetups/status/1987629425479827930?s=20',
      username: 'DOTmeetups',
      caption: '🎯 Community Update from @DOTmeetups\n\nExciting meetup announcements!\n\n🤝 Networking\n📅 Events',
      aspectRatio: 'square'
    },
    stats: {
      likes: 6543,
      comments: 321,
      shares: 987
    },
    timestamp: '3 hours ago',
    liked: false,
    bookmarked: true
  },
  {
    id: '39',
    user: {
      name: 'WTF Zone',
      username: 'WTFxZo',
      location: 'Internet',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'twitter',
      tweetId: '1987069326965498107',
      tweetUrl: 'https://x.com/WTFxZo/status/1987069326965498107?s=20',
      username: 'WTFxZo',
      caption: '😱 Viral Tweet from @WTFxZo\n\nYou won\'t believe this!\n\n🤯 Mind-blowing\n🔥 Trending',
      aspectRatio: 'square'
    },
    stats: {
      likes: 23456,
      comments: 1567,
      shares: 3456
    },
    timestamp: '4 hours ago',
    liked: true,
    bookmarked: true
  },
  {
    id: '40',
    user: {
      name: 'Tech Trends',
      username: 'Adam_Tehc',
      location: 'Silicon Valley, CA',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'twitter',
      tweetId: '1987931778825551978',
      tweetUrl: 'https://x.com/Adam_Tehc/status/1987931778825551978?s=20',
      username: 'Adam_Tehc',
      caption: '💻 Tech Insights from @Adam_Tehc\n\nLatest in technology and innovation!\n\n⚡ Breaking news\n📱 Tech updates',
      aspectRatio: 'square'
    },
    stats: {
      likes: 12345,
      comments: 678,
      shares: 1890
    },
    timestamp: '5 hours ago',
    liked: false,
    bookmarked: false
  },
  {
    id: '41',
    user: {
      name: 'Investment News',
      username: 'harbour_ind_cap',
      location: 'Mumbai, India',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'twitter',
      tweetId: '1988121258534252775',
      tweetUrl: 'https://x.com/harbour_ind_cap/status/1988121258534252775?s=20',
      username: 'harbour_ind_cap',
      caption: '📈 Market Update from @harbour_ind_cap\n\nImportant investment insights!\n\n💰 Finance\n📊 Markets',
      aspectRatio: 'square'
    },
    stats: {
      likes: 9876,
      comments: 543,
      shares: 1654
    },
    timestamp: '6 hours ago',
    liked: true,
    bookmarked: true
  },
  {
    id: '42',
    user: {
      name: 'Sangeeth Karunakaran',
      username: 'sangeeth-karunakaran',
      location: 'India',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'linkedin',
      postUrl: 'https://www.linkedin.com/posts/sangeeth-karunakaran-a60984293_web3-hackathon-shardeum-activity-7366180911576485890-CoQL',
      caption: '🚀 Web3 Hackathon Update!\n\nExciting developments in blockchain and Web3 space!\n\n#Web3 #Hackathon #Shardeum',
      aspectRatio: 'square'
    },
    stats: {
      likes: 12456,
      comments: 234,
      shares: 567
    },
    timestamp: '2 hours ago',
    liked: true,
    bookmarked: false
  },
  {
    id: '43',
    user: {
      name: 'Google Cloud',
      username: 'google-cloud',
      location: 'Global',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'linkedin-iframe',
      embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7389404230379540480',
      postUrl: 'https://www.linkedin.com/posts/google-cloud_at-the-google-public-sector-summit-we-discussed-activity-7389404230379540480-0Nn_',
      imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80',
      iframeHeight: 600,
      iframeWidth: 504,
      caption: '💡 Google Public Sector Summit!\n\nAt the Google Public Sector Summit, we discussed innovation and technology!\n\n#GoogleCloud #PublicSector #Innovation',
      aspectRatio: 'square'
    },
    stats: {
      likes: 8934,
      comments: 187,
      shares: 345
    },
    timestamp: '3 hours ago',
    liked: false,
    bookmarked: true
  },
  {
    id: '44',
    user: {
      name: 'Google Public Sector',
      username: 'google-public-sector',
      location: 'Washington, DC',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'linkedin-iframe',
      embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7358576198085419010',
      postUrl: 'https://www.linkedin.com/posts/google-public-sector_last-week-we-hosted-our-first-ever-google-activity-7358576198085419010-QePe',
      imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format&fit=crop&q=80',
      iframeHeight: 600,
      iframeWidth: 504,
      caption: '📄 First Ever Google Public Sector Summit!\n\nLast week we hosted our first ever summit!\n\n#GooglePublicSector #Summit #Innovation',
      aspectRatio: 'square'
    },
    stats: {
      likes: 15678,
      comments: 456,
      shares: 892
    },
    timestamp: '4 hours ago',
    liked: true,
    bookmarked: true
  },
  {
    id: '45',
    user: {
      name: 'Karen Dahut',
      username: 'karen-dahut',
      location: 'Washington, DC',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'linkedin-iframe',
      embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7389088842630348800',
      postUrl: 'https://www.linkedin.com/posts/karen-dahut-24135811_ahead-of-google-public-sector-summit-tomorrow-activity-7389088842630348800-SQGn',
      imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=80',
      iframeHeight: 600,
      iframeWidth: 504,
      caption: '🎯 Ahead of Google Public Sector Summit!\n\nExcited for tomorrow\'s summit!\n\n#GooglePublicSector #Summit #Leadership',
      aspectRatio: 'square'
    },
    stats: {
      likes: 11234,
      comments: 321,
      shares: 654
    },
    timestamp: '5 hours ago',
    liked: false,
    bookmarked: false
  },
  {
    id: '46',
    user: {
      name: 'LinkedIn Featured',
      username: 'linkedin_featured',
      location: 'Global',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'linkedin-iframe',
      embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7276295273490870275?collapsed=1',
      postUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7276295273490870275',
      imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=80',
      iframeHeight: 263,
      iframeWidth: 504,
      caption: '🎓 Featured LinkedIn Post!\n\nCheck out this amazing post!\n\n#LinkedIn #Featured #Professional',
      aspectRatio: 'square'
    },
    stats: {
      likes: 9567,
      comments: 198,
      shares: 432
    },
    timestamp: '6 hours ago',
    liked: true,
    bookmarked: true
  },
  {
    id: '47',
    user: {
      name: 'Design Inspiration',
      username: 'design_hub',
      location: 'New York, NY',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'pinterest-iframe',
      pinId: '912190099547923690',
      embedUrl: 'https://assets.pinterest.com/ext/embed.html?id=912190099547923690',
      iframeHeight: 903,
      iframeWidth: 450,
      caption: '📌 Creative Design Ideas!\n\nAmazing design inspiration for your next project!\n\n#Design #Inspiration #Creative',
      aspectRatio: 'tall'
    },
    stats: {
      likes: 18934,
      comments: 456,
      shares: 1234
    },
    timestamp: '2 hours ago',
    liked: false,
    bookmarked: true
  },
  {
    id: '48',
    user: {
      name: 'Home Decor',
      username: 'home_style',
      location: 'Los Angeles, CA',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'pinterest-iframe',
      pinId: '3166662232566124',
      embedUrl: 'https://assets.pinterest.com/ext/embed.html?id=3166662232566124',
      iframeHeight: 900,
      iframeWidth: 450,
      caption: '🏠 Home Decor Trends!\n\nBeautiful home decor ideas and interior design inspiration!\n\n#HomeDecor #InteriorDesign',
      aspectRatio: 'tall'
    },
    stats: {
      likes: 22456,
      comments: 567,
      shares: 1456
    },
    timestamp: '3 hours ago',
    liked: true,
    bookmarked: false
  },
  {
    id: '49',
    user: {
      name: 'Fashion Trends',
      username: 'fashion_daily',
      location: 'Paris, France',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'pinterest-iframe',
      pinId: '912190099547886508',
      embedUrl: 'https://assets.pinterest.com/ext/embed.html?id=912190099547886508',
      iframeHeight: 774,
      iframeWidth: 450,
      caption: '👗 Fashion Forward!\n\nLatest fashion trends and style inspiration!\n\n#Fashion #Style #Trends',
      aspectRatio: 'tall'
    },
    stats: {
      likes: 31234,
      comments: 789,
      shares: 2123
    },
    timestamp: '4 hours ago',
    liked: false,
    bookmarked: false
  },
  {
    id: '50',
    user: {
      name: 'Food Photography',
      username: 'foodie_pics',
      location: 'Tokyo, Japan',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'pinterest-iframe',
      pinId: '912190099546073047',
      embedUrl: 'https://assets.pinterest.com/ext/embed.html?id=912190099546073047',
      iframeHeight: 354,
      iframeWidth: 450,
      caption: '🍽️ Food Photography Goals!\n\nDelicious food photography and culinary inspiration!\n\n#FoodPhotography #Foodie',
      aspectRatio: 'tall'
    },
    stats: {
      likes: 27890,
      comments: 678,
      shares: 1890
    },
    timestamp: '5 hours ago',
    liked: true,
    bookmarked: true
  },
  {
    id: '51',
    user: {
      name: 'Travel Inspiration',
      username: 'wanderlust_pins',
      location: 'Bali, Indonesia',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'pinterest-iframe',
      pinId: '912190099547916785',
      embedUrl: 'https://assets.pinterest.com/ext/embed.html?id=912190099547916785',
      iframeHeight: 900,
      iframeWidth: 450,
      caption: '✈️ Travel Destinations!\n\nAmazing travel destinations and wanderlust inspiration!\n\n#Travel #Wanderlust #Adventure',
      aspectRatio: 'tall'
    },
    stats: {
      likes: 35678,
      comments: 890,
      shares: 2567
    },
    timestamp: '6 hours ago',
    liked: false,
    bookmarked: false
  },
  {
    id: '52',
    user: {
      name: 'DIY Projects',
      username: 'diy_crafts',
      location: 'New York, NY',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'pinterest-iframe',
      pinId: '5066618329889076',
      embedUrl: 'https://assets.pinterest.com/ext/embed.html?id=5066618329889076',
      iframeHeight: 900,
      iframeWidth: 450,
      caption: '🔨 DIY Craft Ideas!\n\nCreative DIY projects and handmade crafts!\n\n#DIY #Crafts #Handmade',
      aspectRatio: 'tall'
    },
    stats: {
      likes: 19567,
      comments: 456,
      shares: 1345
    },
    timestamp: '6 hours ago',
    liked: true,
    bookmarked: false
  },
  {
    id: '53',
    user: {
      name: 'Fitness Motivation',
      username: 'fit_life',
      location: 'Miami, FL',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'pinterest-iframe',
      pinId: '2111131073162433',
      embedUrl: 'https://assets.pinterest.com/ext/embed.html?id=2111131073162433',
      iframeHeight: 900,
      iframeWidth: 450,
      caption: '💪 Fitness Goals!\n\nWorkout routines and fitness motivation!\n\n#Fitness #Workout #Health',
      aspectRatio: 'tall'
    },
    stats: {
      likes: 24567,
      comments: 678,
      shares: 1678
    },
    timestamp: '7 hours ago',
    liked: false,
    bookmarked: true
  },
  {
    id: '55',
    user: {
      name: 'Pinterest Featured',
      username: 'pinterest_picks',
      location: 'San Francisco, CA',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'pinterest-iframe',
      pinId: '912190099546441807',
      embedUrl: 'https://assets.pinterest.com/ext/embed.html?id=912190099546441807',
      pinUrl: 'https://pin.it/2oyPGg72y',
      iframeHeight: 900,
      iframeWidth: 450,
      caption: '📌 Featured Pinterest Pin!\n\nCheck out this amazing pin!\n\n#Pinterest #Featured #Inspiration',
      aspectRatio: 'tall'
    },
    stats: {
      likes: 42567,
      comments: 1234,
      shares: 3456
    },
    timestamp: '9 hours ago',
    liked: true,
    bookmarked: true
  },
  {
    id: '56',
    user: {
      name: 'r/midjourney',
      username: 'midjourney',
      location: 'Reddit',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'reddit',
      postUrl: 'https://www.reddit.com/r/midjourney/comments/1cpcw7i/anime_food/',
      subreddit: 'midjourney',
      title: 'Anime Food',
      imageUrl: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&auto=format&fit=crop&q=80',
      caption: '🍜 Anime Food Art!\n\nBeautiful AI-generated anime food illustrations!\n\n#Midjourney #AnimeFood #AIArt',
      aspectRatio: 'square'
    },
    stats: {
      likes: 12456,
      comments: 234,
      shares: 567
    },
    timestamp: '10 hours ago',
    liked: false,
    bookmarked: false
  },
  {
    id: '57',
    user: {
      name: 'r/midjourney',
      username: 'midjourney',
      location: 'Reddit',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'reddit',
      postUrl: 'https://www.reddit.com/r/midjourney/comments/1o77tr3/siberian_brutalism/',
      subreddit: 'midjourney',
      title: 'Siberian Brutalism',
      imageUrl: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&auto=format&fit=crop&q=80',
      caption: '🏢 Siberian Brutalism!\n\nStunning brutalist architecture from Siberia!\n\n#Midjourney #Brutalism #Architecture',
      aspectRatio: 'square'
    },
    stats: {
      likes: 15678,
      comments: 345,
      shares: 789
    },
    timestamp: '11 hours ago',
    liked: true,
    bookmarked: true
  },
  {
    id: '58',
    user: {
      name: 'r/starterpacks',
      username: 'starterpacks',
      location: 'Reddit',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'reddit',
      postUrl: 'https://www.reddit.com/r/starterpacks/comments/it2bfk/new_laptop_starter_pack/',
      subreddit: 'starterpacks',
      title: 'New Laptop Starter Pack',
      imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=80',
      caption: '💻 New Laptop Starter Pack!\n\nEverything you need when you get a new laptop!\n\n#StarterPack #Laptop #Relatable',
      aspectRatio: 'square'
    },
    stats: {
      likes: 23456,
      comments: 567,
      shares: 1234
    },
    timestamp: '12 hours ago',
    liked: false,
    bookmarked: true
  },
  {
    id: '59',
    user: {
      name: 'r/NothingTech',
      username: 'NothingTech',
      location: 'Reddit',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'reddit',
      postUrl: 'https://www.reddit.com/r/NothingTech/comments/1mc0tl0/nothing_2a_1_year_of_experience_for_me/',
      subreddit: 'NothingTech',
      title: 'Nothing 2a - 1 Year of Experience for Me',
      imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80',
      caption: '📱 Nothing 2a Review!\n\nMy experience after 1 year with Nothing 2a!\n\n#NothingPhone #TechReview #Android',
      aspectRatio: 'square'
    },
    stats: {
      likes: 8934,
      comments: 198,
      shares: 456
    },
    timestamp: '13 hours ago',
    liked: true,
    bookmarked: false
  },
  {
    id: '60',
    user: {
      name: 'r/GamingLaptops',
      username: 'GamingLaptops',
      location: 'Reddit',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'reddit',
      postUrl: 'https://www.reddit.com/r/GamingLaptops/comments/1n8wqyx/new_gaming_beast_asus_rog_strix_g16/',
      subreddit: 'GamingLaptops',
      title: 'New Gaming Beast - ASUS ROG Strix G16',
      imageUrl: 'https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?w=800&auto=format&fit=crop&q=80',
      caption: '🎮 New Gaming Beast!\n\nJust got the ASUS ROG Strix G16 gaming laptop!\n\n#GamingLaptop #ASUS #ROG',
      aspectRatio: 'square'
    },
    stats: {
      likes: 19567,
      comments: 432,
      shares: 876
    },
    timestamp: '14 hours ago',
    liked: false,
    bookmarked: true
  },
  {
    id: '61',
    user: {
      name: 'Tech Insider',
      username: 'techinsider',
      location: 'San Francisco, CA',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'instagram-reel',
      reelUrl: 'https://www.instagram.com/reel/CwuwoWUyzip/',
      embedUrl: 'https://www.instagram.com/reel/CwuwoWUyzip/embed',
      caption: '🎥 Amazing Tech Innovation!\n\nCheck out this incredible technology showcase!\n\n#Tech #Innovation #Instagram',
      aspectRatio: 'portrait'
    },
    stats: {
      likes: 45678,
      comments: 892,
      shares: 1234
    },
    timestamp: '15 hours ago',
    liked: true,
    bookmarked: false
  },
  {
    id: '62',
    user: {
      name: 'Creative Studio',
      username: 'creativestudio',
      location: 'New York, NY',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'instagram-reel',
      reelUrl: 'https://www.instagram.com/reel/DMOxFSqyg4P/',
      embedUrl: 'https://www.instagram.com/reel/DMOxFSqyg4P/embed',
      caption: '✨ Creative Design Process!\n\nWatch how we bring ideas to life!\n\n#Design #Creative #Process',
      aspectRatio: 'portrait'
    },
    stats: {
      likes: 38945,
      comments: 654,
      shares: 987
    },
    timestamp: '16 hours ago',
    liked: false,
    bookmarked: true
  },
  {
    id: '63',
    user: {
      name: 'Digital Artist',
      username: 'digitalartist',
      location: 'Los Angeles, CA',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'instagram-reel',
      reelUrl: 'https://www.instagram.com/reel/DLg7en1xAR3/',
      embedUrl: 'https://www.instagram.com/reel/DLg7en1xAR3/embed',
      caption: '🎨 Digital Art Magic!\n\nCreating stunning digital artwork!\n\n#DigitalArt #Artist #Creative',
      aspectRatio: 'portrait'
    },
    stats: {
      likes: 52341,
      comments: 1023,
      shares: 1567
    },
    timestamp: '17 hours ago',
    liked: true,
    bookmarked: true
  },
  {
    id: '64',
    user: {
      name: 'Lifestyle Vlogger',
      username: 'lifestylevlogger',
      location: 'Miami, FL',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'instagram-reel',
      reelUrl: 'https://www.instagram.com/reel/DKwulmHSfco/',
      embedUrl: 'https://www.instagram.com/reel/DKwulmHSfco/embed',
      caption: '🌟 Daily Lifestyle Vlog!\n\nA day in my life - follow along!\n\n#Lifestyle #Vlog #DailyLife',
      aspectRatio: 'portrait'
    },
    stats: {
      likes: 41234,
      comments: 789,
      shares: 1098
    },
    timestamp: '18 hours ago',
    liked: false,
    bookmarked: false
  },
  {
    id: '65',
    user: {
      name: 'Travel Explorer',
      username: 'travelexplorer',
      location: 'Bali, Indonesia',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'instagram-reel',
      reelUrl: 'https://www.instagram.com/reel/C4FvChHvcqi/',
      embedUrl: 'https://www.instagram.com/reel/C4FvChHvcqi/embed',
      caption: '🌴 Paradise Found!\n\nExploring the most beautiful destinations!\n\n#Travel #Adventure #Paradise',
      aspectRatio: 'portrait'
    },
    stats: {
      likes: 67890,
      comments: 1345,
      shares: 2134
    },
    timestamp: '19 hours ago',
    liked: true,
    bookmarked: true
  },
  {
    id: '66',
    user: {
      name: 'VK Video Creator',
      username: 'vkcreator',
      location: 'Moscow, Russia',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'vk-video',
      videoUrl: 'https://vk.com/video-59336195_456239378',
      embedUrl: 'https://vk.com/video_ext.php?oid=-59336195&id=456239378&hd=2',
      caption: '🎬 Amazing VK Video!\n\nCheck out this incredible content!\n\n#VK #Video #Content',
      aspectRatio: 'landscape'
    },
    stats: {
      likes: 34567,
      comments: 678,
      shares: 890
    },
    timestamp: '20 hours ago',
    liked: false,
    bookmarked: false
  },
  {
    id: '67',
    user: {
      name: 'VK Entertainment',
      username: 'vkentertainment',
      location: 'St. Petersburg, Russia',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'vk-video',
      videoUrl: 'https://vk.com/video-55429817_456240171',
      embedUrl: 'https://vk.com/video_ext.php?oid=-55429817&id=456240171&hd=2',
      caption: '🎥 Entertainment Special!\n\nAmazing entertainment content from VK!\n\n#Entertainment #VK #Fun',
      aspectRatio: 'landscape'
    },
    stats: {
      likes: 28934,
      comments: 512,
      shares: 723
    },
    timestamp: '21 hours ago',
    liked: true,
    bookmarked: false
  },
  {
    id: '68',
    user: {
      name: 'VK Video Hub',
      username: 'vkvideohub',
      location: 'Kazan, Russia',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'vk-video',
      videoUrl: 'https://vkvideo.ru/video-49388814_456317476',
      embedUrl: 'https://vk.com/video_ext.php?oid=-49388814&id=456317476&hd=2',
      caption: '📹 VK Video Hub!\n\nDiscover amazing video content!\n\n#VKVideo #Content #Discover',
      aspectRatio: 'landscape'
    },
    stats: {
      likes: 42156,
      comments: 834,
      shares: 1123
    },
    timestamp: '22 hours ago',
    liked: true,
    bookmarked: true
  },
  {
    id: '69',
    user: {
      name: 'VK Media Studio',
      username: 'vkmediastudio',
      location: 'Novosibirsk, Russia',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'vk-video',
      videoUrl: 'https://vkvideo.ru/video-139315008_456253741',
      embedUrl: 'https://vk.com/video_ext.php?oid=-139315008&id=456253741&hd=2',
      caption: '🎞️ Media Studio Production!\n\nProfessional video production!\n\n#MediaStudio #VK #Production',
      aspectRatio: 'landscape'
    },
    stats: {
      likes: 37892,
      comments: 645,
      shares: 967
    },
    timestamp: '23 hours ago',
    liked: false,
    bookmarked: true
  },
  {
    id: '70',
    user: {
      name: 'VK Creative Channel',
      username: 'vkcreative',
      location: 'Yekaterinburg, Russia',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'vk-video',
      videoUrl: 'https://vkvideo.ru/video-228951940_456240438',
      embedUrl: 'https://vk.com/video_ext.php?oid=-228951940&id=456240438&hd=2',
      caption: '✨ Creative Content!\n\nCreative and inspiring video content!\n\n#Creative #VK #Inspiration',
      aspectRatio: 'landscape'
    },
    stats: {
      likes: 51234,
      comments: 923,
      shares: 1456
    },
    timestamp: '1 day ago',
    liked: true,
    bookmarked: false
  },
  {
    id: '71',
    user: {
      name: 'VK Trending',
      username: 'vktrending',
      location: 'Samara, Russia',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'vk-video',
      videoUrl: 'https://vkvideo.ru/video-222693769_456239541',
      embedUrl: 'https://vk.com/video_ext.php?oid=-222693769&id=456239541&hd=2',
      caption: '🔥 Trending Now!\n\nThe hottest trending video on VK!\n\n#Trending #VK #Viral',
      aspectRatio: 'landscape'
    },
    stats: {
      likes: 63789,
      comments: 1234,
      shares: 2345
    },
    timestamp: '1 day ago',
    liked: true,
    bookmarked: true
  },
  {
    id: '72',
    user: {
      name: 'Yandex Video',
      username: 'yandexvideo',
      location: 'Moscow, Russia',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'yandex-video',
      videoUrl: 'https://yandex.ru/video/preview/6063754357796700980',
      embedUrl: 'https://frontend.vh.yandex.ru/player/6063754357796700980',
      thumbnailUrl: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&auto=format&fit=crop&q=80',
      caption: '🎬 Featured Yandex Video!\n\nWatch this amazing content on Yandex!\n\n#Yandex #Video #Featured',
      aspectRatio: 'landscape'
    },
    stats: {
      likes: 48923,
      comments: 876,
      shares: 1234
    },
    timestamp: '1 day ago',
    liked: true,
    bookmarked: false
  },
  {
    id: '73',
    user: {
      name: 'Yandex Series',
      username: 'yandexseries',
      location: 'St. Petersburg, Russia',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'yandex-video',
      videoUrl: 'https://yandex.ru/video/preview/1424978529204184602',
      embedUrl: 'https://frontend.vh.yandex.ru/player/1424978529204184602',
      thumbnailUrl: 'https://images.unsplash.com/photo-1574267432644-f610f5b7e4d1?w=800&auto=format&fit=crop&q=80',
      caption: '📺 Series Episode - Season 1 Episode 1!\n\nBinge-watch the latest series!\n\n#YandexSeries #Episode1 #Season1',
      aspectRatio: 'landscape'
    },
    stats: {
      likes: 56234,
      comments: 1023,
      shares: 1567
    },
    timestamp: '1 day ago',
    liked: false,
    bookmarked: true
  },
  {
    id: '74',
    user: {
      name: 'Yandex Shows',
      username: 'yandexshows',
      location: 'Kazan, Russia',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'yandex-video',
      videoUrl: 'https://yandex.ru/video/preview/3267579061883441438',
      embedUrl: 'https://frontend.vh.yandex.ru/player/3267579061883441438',
      thumbnailUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&auto=format&fit=crop&q=80',
      caption: '🎭 Season 1 Episode 2!\n\nContinue watching the exciting series!\n\n#YandexShows #Episode2 #Trending',
      aspectRatio: 'landscape'
    },
    stats: {
      likes: 61345,
      comments: 1234,
      shares: 1890
    },
    timestamp: '2 days ago',
    liked: true,
    bookmarked: true
  },
  {
    id: '75',
    user: {
      name: 'Yandex Entertainment',
      username: 'yandexentertainment',
      location: 'Novosibirsk, Russia',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'yandex-video',
      videoUrl: 'https://yandex.ru/video/preview/15038949769967315651',
      embedUrl: 'https://frontend.vh.yandex.ru/player/15038949769967315651',
      thumbnailUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&auto=format&fit=crop&q=80',
      caption: '🌟 Season 3 Episode 3!\n\nThe plot thickens in this episode!\n\n#YandexEntertainment #Season3 #MustWatch',
      aspectRatio: 'landscape'
    },
    stats: {
      likes: 72456,
      comments: 1456,
      shares: 2134
    },
    timestamp: '2 days ago',
    liked: true,
    bookmarked: false
  },
  {
    id: '76',
    user: {
      name: 'Yandex Premium',
      username: 'yandexpremium',
      location: 'Yekaterinburg, Russia',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'yandex-video',
      videoUrl: 'https://yandex.ru/video/preview/484807682868749558',
      embedUrl: 'https://frontend.vh.yandex.ru/player/484807682868749558',
      thumbnailUrl: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&auto=format&fit=crop&q=80',
      caption: '🎥 Season 3 Special!\n\nExclusive premium content!\n\n#YandexPremium #Season3 #Exclusive',
      aspectRatio: 'landscape'
    },
    stats: {
      likes: 83567,
      comments: 1678,
      shares: 2456
    },
    timestamp: '2 days ago',
    liked: false,
    bookmarked: true
  },
  {
    id: '77',
    user: {
      name: 'OK Video Channel',
      username: 'okvideo',
      location: 'Moscow, Russia',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'ok-video',
      videoUrl: 'https://ok.ru/video/7475662490142',
      embedUrl: 'https://ok.ru/videoembed/7475662490142?nochat=1',
      caption: '🎬 Amazing OK Video!\n\nWatch this incredible content!\n\n#OK #Video #Trending',
      aspectRatio: 'landscape'
    },
    stats: {
      likes: 45678,
      comments: 892,
      shares: 1234
    },
    timestamp: '2 days ago',
    liked: true,
    bookmarked: false
  },
  {
    id: '78',
    user: {
      name: 'OK Entertainment',
      username: 'okentertainment',
      location: 'St. Petersburg, Russia',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'ok-video',
      videoUrl: 'https://ok.ru/video/8251402357298',
      embedUrl: 'https://ok.ru/videoembed/8251402357298?nochat=1',
      caption: '🎥 Entertainment Special!\n\nAmazing entertainment from OK!\n\n#Entertainment #OK #Fun',
      aspectRatio: 'landscape'
    },
    stats: {
      likes: 52341,
      comments: 1023,
      shares: 1567
    },
    timestamp: '3 days ago',
    liked: false,
    bookmarked: true
  },
  {
    id: '79',
    user: {
      name: 'OK Media Hub',
      username: 'okmediahub',
      location: 'Kazan, Russia',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'ok-video',
      videoUrl: 'https://ok.ru/video/8251410876978',
      embedUrl: 'https://ok.ru/videoembed/8251410876978?nochat=1',
      caption: '📹 OK Media Hub!\n\nDiscover amazing video content!\n\n#OKVideo #Content #Discover',
      aspectRatio: 'landscape'
    },
    stats: {
      likes: 48923,
      comments: 956,
      shares: 1345
    },
    timestamp: '3 days ago',
    liked: true,
    bookmarked: false
  },
  {
    id: '80',
    user: {
      name: 'OK Creative Studio',
      username: 'okcreative',
      location: 'Novosibirsk, Russia',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'ok-video',
      videoUrl: 'https://ok.ru/video/9284627729025',
      embedUrl: 'https://ok.ru/videoembed/9284627729025?nochat=1',
      caption: '✨ Creative Content!\n\nCreative and inspiring video!\n\n#Creative #OK #Inspiration',
      aspectRatio: 'landscape'
    },
    stats: {
      likes: 61234,
      comments: 1178,
      shares: 1890
    },
    timestamp: '3 days ago',
    liked: true,
    bookmarked: true
  },
  {
    id: '81',
    user: {
      name: 'OK Trending',
      username: 'oktrending',
      location: 'Yekaterinburg, Russia',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'ok-video',
      videoUrl: 'https://ok.ru/video/10680389208622',
      embedUrl: 'https://ok.ru/videoembed/10680389208622?nochat=1',
      caption: '🔥 Trending Now!\n\nThe hottest trending video on OK!\n\n#Trending #OK #Viral',
      aspectRatio: 'landscape'
    },
    stats: {
      likes: 73456,
      comments: 1456,
      shares: 2234
    },
    timestamp: '4 days ago',
    liked: false,
    bookmarked: true
  },
  {
    id: '82',
    user: {
      name: 'Rutube Shorts',
      username: 'rutubeshorts',
      location: 'Moscow, Russia',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'rutube-short',
      videoUrl: 'https://rutube.ru/shorts/f1e0d8d0b4a3f02601317691df089f37/',
      embedUrl: 'https://rutube.ru/play/embed/f1e0d8d0b4a3f02601317691df089f37',
      caption: '🎬 Amazing Rutube Short!\n\nWatch this incredible short video!\n\n#Rutube #Shorts #Trending',
      aspectRatio: 'portrait'
    },
    stats: {
      likes: 38456,
      comments: 723,
      shares: 1012
    },
    timestamp: '4 days ago',
    liked: true,
    bookmarked: false
  },
  {
    id: '83',
    user: {
      name: 'Rutube Creative',
      username: 'rutubecreative',
      location: 'St. Petersburg, Russia',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'rutube-short',
      videoUrl: 'https://rutube.ru/shorts/df1d04df56e1ad0e426769c8d792892c/',
      embedUrl: 'https://rutube.ru/play/embed/df1d04df56e1ad0e426769c8d792892c',
      caption: '✨ Creative Short!\n\nCreative and inspiring content!\n\n#Rutube #Creative #Short',
      aspectRatio: 'portrait'
    },
    stats: {
      likes: 42789,
      comments: 856,
      shares: 1234
    },
    timestamp: '5 days ago',
    liked: false,
    bookmarked: true
  },
  {
    id: '84',
    user: {
      name: 'Rutube Entertainment',
      username: 'rutubeentertainment',
      location: 'Kazan, Russia',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'rutube-short',
      videoUrl: 'https://rutube.ru/shorts/6c9ba68fed4cd8cfdbc077d99f5e1a65/',
      embedUrl: 'https://rutube.ru/play/embed/6c9ba68fed4cd8cfdbc077d99f5e1a65',
      caption: '🎥 Entertainment Short!\n\nAmazing entertainment content!\n\n#Entertainment #Rutube #Fun',
      aspectRatio: 'portrait'
    },
    stats: {
      likes: 51234,
      comments: 967,
      shares: 1456
    },
    timestamp: '5 days ago',
    liked: true,
    bookmarked: true
  },
  {
    id: '85',
    user: {
      name: 'Rutube Viral',
      username: 'rutubeviral',
      location: 'Novosibirsk, Russia',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'rutube-short',
      videoUrl: 'https://rutube.ru/shorts/051066708b2e900f8e1de8765c300387/',
      embedUrl: 'https://rutube.ru/play/embed/051066708b2e900f8e1de8765c300387',
      caption: '🔥 Viral Short!\n\nThis is going viral!\n\n#Viral #Rutube #Trending',
      aspectRatio: 'portrait'
    },
    stats: {
      likes: 67890,
      comments: 1234,
      shares: 2345
    },
    timestamp: '5 days ago',
    liked: true,
    bookmarked: false
  },
  {
    id: '86',
    user: {
      name: 'Rutube Trends',
      username: 'rutubetrends',
      location: 'Yekaterinburg, Russia',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'rutube-short',
      videoUrl: 'https://rutube.ru/shorts/1755b9c57fe52f83f60ba01b286dc2a2/',
      embedUrl: 'https://rutube.ru/play/embed/1755b9c57fe52f83f60ba01b286dc2a2',
      caption: '📱 Trending Short!\n\nThe hottest trending short!\n\n#Trending #Rutube #Hot',
      aspectRatio: 'portrait'
    },
    stats: {
      likes: 73456,
      comments: 1345,
      shares: 2567
    },
    timestamp: '6 days ago',
    liked: false,
    bookmarked: true
  },
  {
    id: '87',
    user: {
      name: 'Rutube Video Hub',
      username: 'rutubevideohub',
      location: 'Moscow, Russia',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'rutube-video',
      videoUrl: 'https://rutube.ru/video/d643115af97745e8aeee98ede1e4b6a3/',
      embedUrl: 'https://rutube.ru/play/embed/d643115af97745e8aeee98ede1e4b6a3',
      caption: '🎬 Featured Rutube Video!\n\nWatch this amazing full-length video!\n\n#Rutube #Video #Featured',
      aspectRatio: 'landscape'
    },
    stats: {
      likes: 56789,
      comments: 1023,
      shares: 1678
    },
    timestamp: '6 days ago',
    liked: true,
    bookmarked: true
  },
  {
    id: '88',
    user: {
      name: 'Rutube Channel',
      username: 'rutubechannel',
      location: 'St. Petersburg, Russia',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'rutube-video',
      videoUrl: 'https://rutube.ru/video/b3cabb1b4a890e765e7e486412167fcd/',
      embedUrl: 'https://rutube.ru/play/embed/b3cabb1b4a890e765e7e486412167fcd',
      caption: '📺 Rutube Channel Video!\n\nExclusive channel content!\n\n#RutubeChannel #Video #Exclusive',
      aspectRatio: 'landscape'
    },
    stats: {
      likes: 48923,
      comments: 892,
      shares: 1456
    },
    timestamp: '1 week ago',
    liked: false,
    bookmarked: false
  },
  {
    id: '89',
    user: {
      name: 'Rutube Media',
      username: 'rutubemedia',
      location: 'Kazan, Russia',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'rutube-video',
      videoUrl: 'https://rutube.ru/video/87385fda6ce5034c8526fc71eef3007f/',
      embedUrl: 'https://rutube.ru/play/embed/87385fda6ce5034c8526fc71eef3007f',
      caption: '🎥 Rutube Media Production!\n\nProfessional media content!\n\n#RutubeMedia #Production #Quality',
      aspectRatio: 'landscape'
    },
    stats: {
      likes: 61234,
      comments: 1178,
      shares: 1890
    },
    timestamp: '1 week ago',
    liked: true,
    bookmarked: true
  },
  {
    id: '90',
    user: {
      name: 'Rutube Studio',
      username: 'rutubestudio',
      location: 'Novosibirsk, Russia',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'rutube-video',
      videoUrl: 'https://rutube.ru/video/81ec7180ed706ad0abb581835001edd8/',
      embedUrl: 'https://rutube.ru/play/embed/81ec7180ed706ad0abb581835001edd8',
      caption: '✨ Studio Production!\n\nHigh-quality studio content!\n\n#RutubeStudio #Quality #Professional',
      aspectRatio: 'landscape'
    },
    stats: {
      likes: 54321,
      comments: 1001,
      shares: 1723
    },
    timestamp: '1 week ago',
    liked: true,
    bookmarked: false
  },
  {
    id: '91',
    user: {
      name: 'Rutube Premium',
      username: 'rutubepremium',
      location: 'Yekaterinburg, Russia',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'rutube-video',
      videoUrl: 'https://rutube.ru/video/7eb987424e714fd8edde1f23e8705e2c/',
      embedUrl: 'https://rutube.ru/play/embed/7eb987424e714fd8edde1f23e8705e2c',
      caption: '🌟 Premium Content!\n\nExclusive premium video!\n\n#RutubePremium #Exclusive #Premium',
      aspectRatio: 'landscape'
    },
    stats: {
      likes: 78901,
      comments: 1456,
      shares: 2234
    },
    timestamp: '1 week ago',
    liked: false,
    bookmarked: true
  },
  {
    id: '92',
    user: {
      name: 'Bilibili Creator',
      username: 'bilibilicreator',
      location: 'Shanghai, China',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'bilibili-video',
      videoUrl: 'https://www.bilibili.com/video/BV1bzCcBoE26',
      embedUrl: 'https://player.bilibili.com/player.html?isOutside=true&aid=115525225027386&bvid=BV1bzCcBoE26&cid=33888143917&p=1',
      caption: '🎬 Amazing Bilibili Video!\n\nWatch this incredible content!\n\n#Bilibili #Video #Trending',
      aspectRatio: 'landscape'
    },
    stats: {
      likes: 89234,
      comments: 1567,
      shares: 2345
    },
    timestamp: '1 week ago',
    liked: true,
    bookmarked: false
  },
  {
    id: '93',
    user: {
      name: 'Bilibili Entertainment',
      username: 'bilibilienter',
      location: 'Beijing, China',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'bilibili-video',
      videoUrl: 'https://www.bilibili.com/video/BV1Ti1nBEEVU',
      embedUrl: 'https://player.bilibili.com/player.html?isOutside=true&aid=115494640162246&bvid=BV1Ti1nBEEVU&cid=33706871494&p=1',
      caption: '🎥 Entertainment Special!\n\nAmazing entertainment from Bilibili!\n\n#Entertainment #Bilibili #Fun',
      aspectRatio: 'landscape'
    },
    stats: {
      likes: 76543,
      comments: 1345,
      shares: 2012
    },
    timestamp: '1 week ago',
    liked: false,
    bookmarked: true
  },
  {
    id: '94',
    user: {
      name: 'Bilibili Media',
      username: 'bilibilimedia',
      location: 'Guangzhou, China',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'bilibili-video',
      videoUrl: 'https://www.bilibili.com/video/BV1Cj2ABwEkr',
      embedUrl: 'https://player.bilibili.com/player.html?isOutside=true&aid=115502642957201&bvid=BV1Cj2ABwEkr&cid=33759297844&p=1',
      caption: '📹 Bilibili Media Hub!\n\nDiscover amazing video content!\n\n#BilibiliMedia #Content #Discover',
      aspectRatio: 'landscape'
    },
    stats: {
      likes: 92456,
      comments: 1678,
      shares: 2567
    },
    timestamp: '2 weeks ago',
    liked: true,
    bookmarked: true
  },
  {
    id: '95',
    user: {
      name: 'Bilibili Studio',
      username: 'bilibilistudio',
      location: 'Shenzhen, China',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'bilibili-video',
      videoUrl: 'https://www.bilibili.com/video/BV142yaB7ELR',
      embedUrl: 'https://player.bilibili.com/player.html?isOutside=true&aid=115463367561088&bvid=BV142yaB7ELR&cid=33540146683&p=1',
      caption: '✨ Studio Production!\n\nHigh-quality studio content!\n\n#BilibiliStudio #Quality #Professional',
      aspectRatio: 'landscape'
    },
    stats: {
      likes: 84567,
      comments: 1456,
      shares: 2234
    },
    timestamp: '2 weeks ago',
    liked: true,
    bookmarked: false
  },
  {
    id: '96',
    user: {
      name: 'Bilibili Trending',
      username: 'bilbilitrending',
      location: 'Chengdu, China',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'bilibili-video',
      videoUrl: 'https://www.bilibili.com/video/BV142yaB7ELR',
      embedUrl: 'https://player.bilibili.com/player.html?isOutside=true&aid=115463367561088&bvid=BV142yaB7ELR&cid=33540146683&p=1',
      caption: '🔥 Trending Now!\n\nThe hottest trending video on Bilibili!\n\n#Trending #Bilibili #Viral',
      aspectRatio: 'landscape'
    },
    stats: {
      likes: 98765,
      comments: 1789,
      shares: 2890
    },
    timestamp: '2 weeks ago',
    liked: false,
    bookmarked: true
  },
  {
    id: '97',
    user: {
      name: 'Travel With Abhay',
      username: 'travelwithabhay',
      location: 'India',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60'
    },
    content: {
      type: 'instagram-reel',
      reelUrl: 'https://www.instagram.com/travelwithabhay/reel/DP0WfWtgXCI/',
      embedUrl: 'https://www.instagram.com/p/DP0WfWtgXCI/embed',
      caption: '✈️ Travel Adventures!\n\nExplore the world with amazing travel content!\n\n#Travel #Adventure #Explore #TravelWithAbhay',
      aspectRatio: 'portrait'
    },
    stats: {
      likes: 125678,
      comments: 2345,
      shares: 3456
    },
    timestamp: '2 weeks ago',
    liked: true,
    bookmarked: true
  }
];

// Shuffle array function using Fisher-Yates algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function FeedsContent() {
  const [postsState, setPostsState] = useState(() => shuffleArray(posts));
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
    <>
      {/* Twitter Widget Script */}
      <Script 
        src="https://platform.twitter.com/widgets.js" 
        strategy="lazyOnload"
        onLoad={() => {
          // Reload Twitter widgets when script loads
          if (typeof window !== 'undefined' && (window as any).twttr) {
            (window as any).twttr.widgets.load();
          }
        }}
      />
      
      {/* Pinterest Widget Script */}
      <Script 
        src="https://assets.pinterest.com/js/pinit.js" 
        strategy="lazyOnload"
        onLoad={() => {
          // Reload Pinterest widgets when script loads
          if (typeof window !== 'undefined' && (window as any).PinUtils) {
            (window as any).PinUtils.build();
          }
        }}
      />
      
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
    </>
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

        {post.content.type === 'images' && (
          <div className="grid grid-cols-3 gap-1 rounded-2xl overflow-hidden">
            {post.content.images.map((img: string, index: number) => (
              <div 
                key={index}
                className="relative aspect-square bg-gray-100 overflow-hidden group cursor-pointer"
                onClick={() => setSelectedImage({
                  src: img,
                  alt: `Image ${index + 1}`,
                  user: post.user,
                  caption: post.content.caption
                })}
              >
                <Image 
                  src={img} 
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {/* Download icon overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <FiDownload size={20} className="text-white" />
                  </div>
                </div>
                {/* Image counter on first image */}
                {index === 0 && post.content.images.length > 1 && (
                  <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-semibold">
                    1/{post.content.images.length}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {post.content.type === 'videos' && (
          <div className="grid grid-cols-3 gap-1 rounded-2xl overflow-hidden">
            {post.content.videos.map((video: any, index: number) => (
              <div 
                key={index}
                className="relative aspect-square bg-black overflow-hidden group cursor-pointer"
              >
                <Image 
                  src={video.thumbnail} 
                  alt={`Video ${index + 1}`}
                  fill
                  className="object-cover"
                />
                {/* Play button overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FiPlay size={20} className="text-gray-900 ml-0.5" />
                  </div>
                </div>
                {/* Duration badge */}
                <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded text-white text-xs font-semibold">
                  {video.duration}
                </div>
                {/* Video counter on first video */}
                {index === 0 && post.content.videos.length > 1 && (
                  <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded-full text-white text-xs font-semibold">
                    1/{post.content.videos.length}
                  </div>
                )}
              </div>
            ))}
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

        {post.content.type === 'youtube' && (
          <div className="relative rounded-2xl overflow-hidden bg-black shadow-xl">
            <div className="relative aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${post.content.youtubeId}?rel=0&modestbranding=1&autoplay=0`}
                title="YouTube video player"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
                style={{ border: 'none' }}
              />
            </div>
            {/* YouTube branding badge */}
            <div className="absolute top-3 right-3 bg-red-600 px-3 py-1 rounded-md flex items-center gap-2 shadow-lg">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span className="text-white text-xs font-bold">YouTube</span>
            </div>
          </div>
        )}

        {post.content.type === 'youtube-short' && (
          <div className="relative rounded-2xl overflow-hidden bg-black shadow-xl mx-auto" style={{ maxWidth: '400px' }}>
            <div className="relative" style={{ aspectRatio: '9/16' }}>
              <iframe
                src={`https://www.youtube.com/embed/${post.content.youtubeId}?rel=0&modestbranding=1&autoplay=0`}
                title="YouTube Shorts player"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
                style={{ border: 'none' }}
              />
            </div>
            {/* YouTube Shorts branding badge */}
            <div className="absolute top-3 right-3 bg-red-600 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span className="text-white text-xs font-bold">Shorts</span>
            </div>
            {/* Shorts indicator icon */}
            <div className="absolute bottom-3 left-3 bg-white/10 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 20H14V4H10V20ZM4 20H8V12H4V20ZM16 9V20H20V9H16Z"/>
              </svg>
              <span className="text-white text-xs font-semibold">Short</span>
            </div>
          </div>
        )}

        {post.content.type === 'twitter' && (
          <div className="relative">
            <blockquote className="twitter-tweet" data-theme="light" data-dnt="true">
              <a href={`https://twitter.com/${post.content.username}/status/${post.content.tweetId}`}>
                Loading tweet from @{post.content.username}...
              </a>
            </blockquote>
          </div>
        )}

        {post.content.type === 'linkedin' && (
          <div className="relative rounded-2xl overflow-hidden bg-white shadow-xl border border-gray-200">
            <iframe 
              src={`https://www.linkedin.com/embed/feed/update/${post.content.postUrl.split('/').pop()}`}
              height="600" 
              width="100%" 
              frameBorder="0" 
              allowFullScreen={true}
              title="LinkedIn Post"
              className="w-full"
            />
            {/* LinkedIn branding badge */}
            <div className="absolute top-3 right-3 bg-blue-600 px-3 py-1.5 rounded-md flex items-center gap-2 shadow-lg z-10">
              <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span className="text-white text-xs font-bold">LinkedIn</span>
            </div>
          </div>
        )}

        {post.content.type === 'linkedin-iframe' && (
          <div className="relative rounded-2xl overflow-hidden bg-white shadow-xl border border-gray-200">
            <a 
              href={post.content.postUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:opacity-90 transition-opacity"
            >
              <div className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded flex items-center justify-center">
                    <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 mb-1">{post.user.name}</h3>
                    <p className="text-sm text-gray-600">{post.user.location}</p>
                    <p className="text-xs text-gray-500 mt-1">{post.timestamp}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-gray-800 whitespace-pre-line leading-relaxed">{post.content.caption}</p>
                </div>

                {post.content.imageUrl && (
                  <div className="mb-4 rounded-lg overflow-hidden">
                    <img 
                      src={post.content.imageUrl} 
                      alt={post.user.name}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                      </svg>
                      <span className="font-semibold">{post.stats.likes.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span>{post.stats.comments}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                      <span>{post.stats.shares}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-blue-600 font-semibold text-sm">
                    <span>View on LinkedIn</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>
            
            {/* LinkedIn branding badge */}
            <div className="absolute top-3 right-3 bg-blue-600 px-3 py-1.5 rounded-md flex items-center gap-2 shadow-lg z-10">
              <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span className="text-white text-xs font-bold">LinkedIn</span>
            </div>
          </div>
        )}

        {post.content.type === 'reddit' && (
          <div className="relative rounded-2xl overflow-hidden bg-white shadow-xl border border-gray-200 p-6">
            <a 
              href={post.content.postUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:opacity-90 transition-opacity"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="flex-shrink-0 w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-orange-600">r/{post.content.subreddit}</span>
                    <span className="text-xs text-gray-500">• {post.timestamp}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{post.content.title}</h3>
                </div>
              </div>

              {post.content.imageUrl && (
                <div className="mb-4 rounded-xl overflow-hidden">
                  <img 
                    src={post.content.imageUrl} 
                    alt={post.content.title}
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}
              
              <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-100">
                <p className="text-gray-700 whitespace-pre-line">{post.content.caption}</p>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                    </svg>
                    <span className="font-semibold">{post.stats.likes.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>{post.stats.comments}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    <span>{post.stats.shares}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-orange-600 font-semibold">
                  <span>View on Reddit</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </div>
            </a>
            
            {/* Reddit branding badge */}
            <div className="absolute top-3 right-3 bg-orange-600 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
              <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
              </svg>
              <span className="text-white text-xs font-bold">Reddit</span>
            </div>
          </div>
        )}

        {post.content.type === 'instagram-reel' && (
          <div className="relative rounded-2xl overflow-hidden bg-white shadow-xl border border-gray-200 mx-auto" style={{ maxWidth: '400px' }}>
            <div className="relative" style={{ paddingBottom: '177.78%' }}>
              <iframe 
                src={post.content.embedUrl}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 0
                }}
                frameBorder="0" 
                scrolling="no"
                allowTransparency={true}
                allow="encrypted-media"
                title="Instagram Reel"
              />
            </div>
            {/* Instagram branding badge */}
            <div className="absolute top-3 right-3 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg z-10">
              <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span className="text-white text-xs font-bold">Instagram</span>
            </div>
          </div>
        )}

        {post.content.type === 'vk-video' && (
          <div className="relative rounded-2xl overflow-hidden bg-white shadow-xl border border-gray-200">
            <div className="relative" style={{ paddingBottom: '56.25%' }}>
              <iframe 
                src={`${post.content.embedUrl}&autoplay=0`}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 0
                }}
                frameBorder="0" 
                allowFullScreen
                allow="encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;"
                title="VK Video"
              />
            </div>
            {/* VK branding badge */}
            <div className="absolute top-3 right-3 bg-blue-500 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg z-10">
              <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.78 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z"/>
              </svg>
              <span className="text-white text-xs font-bold">VK</span>
            </div>
          </div>
        )}

        {post.content.type === 'ok-video' && (
          <div className="relative rounded-2xl overflow-hidden bg-white shadow-xl border border-gray-200">
            <div className="relative" style={{ paddingBottom: '56.25%' }}>
              <iframe 
                src={`${post.content.embedUrl}&autoplay=0`}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 0
                }}
                frameBorder="0" 
                allowFullScreen
                title="OK Video"
              />
            </div>
            {/* OK branding badge */}
            <div className="absolute top-3 right-3 bg-orange-500 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg z-10">
              <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 18.5c-3.59 0-6.5-2.91-6.5-6.5s2.91-6.5 6.5-6.5 6.5 2.91 6.5 6.5-2.91 6.5-6.5 6.5zm0-11c-2.485 0-4.5 2.015-4.5 4.5s2.015 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.015-4.5-4.5-4.5z"/>
              </svg>
              <span className="text-white text-xs font-bold">OK</span>
            </div>
          </div>
        )}

        {post.content.type === 'rutube-short' && (
          <div className="relative rounded-2xl overflow-hidden bg-white shadow-xl border border-gray-200 mx-auto" style={{ maxWidth: '400px' }}>
            <div className="relative" style={{ paddingBottom: '177.78%' }}>
              <iframe 
                src={`${post.content.embedUrl}?autoplay=0`}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 0
                }}
                frameBorder="0" 
                allowFullScreen
                allow="clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                title="Rutube Short"
              />
            </div>
            {/* Rutube branding badge */}
            <div className="absolute top-3 right-3 rounded-full shadow-lg z-10 overflow-hidden" style={{ background: 'linear-gradient(135deg, #1e3a8a 50%, #ef4444 50%)' }}>
              <div className="px-3 py-1.5 flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                </svg>
                <span className="text-white text-xs font-bold">Rutube</span>
              </div>
            </div>
          </div>
        )}

        {post.content.type === 'rutube-video' && (
          <div className="relative rounded-2xl overflow-hidden bg-white shadow-xl border border-gray-200">
            <div className="relative" style={{ paddingBottom: '56.25%' }}>
              <iframe 
                src={`${post.content.embedUrl}?autoplay=0`}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 0
                }}
                frameBorder="0" 
                allowFullScreen
                allow="clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                title="Rutube Video"
              />
            </div>
            {/* Rutube branding badge */}
            <div className="absolute top-3 right-3 rounded-full shadow-lg z-10 overflow-hidden" style={{ background: 'linear-gradient(135deg, #1e3a8a 50%, #ef4444 50%)' }}>
              <div className="px-3 py-1.5 flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                </svg>
                <span className="text-white text-xs font-bold">Rutube</span>
              </div>
            </div>
          </div>
        )}

        {post.content.type === 'bilibili-video' && (
          <div className="relative rounded-2xl overflow-hidden bg-white shadow-xl border border-gray-200">
            <div className="relative" style={{ paddingBottom: '56.25%' }}>
              <iframe 
                src={`${post.content.embedUrl}&autoplay=0&muted=1`}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 0
                }}
                scrolling="no"
                frameBorder="0" 
                allowFullScreen
                title="Bilibili Video"
              />
            </div>
            {/* Bilibili branding badge */}
            <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-300 via-blue-500 to-blue-700 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg z-10">
              <img 
                src="https://img.utdstc.com/icon/ba9/33d/ba933d0e003c9f53e0fb3de2b0f1a8def6898ce2384850ca3adb1cc332d78241:200" 
                alt="Bilibili" 
                className="w-3.5 h-3.5 rounded-sm"
              />
              <span className="text-white text-xs font-bold">Bilibili</span>
            </div>
          </div>
        )}

        {post.content.type === 'vimeo' && (
          <div className="relative rounded-2xl overflow-hidden bg-white shadow-xl border border-gray-200">
            <div className="relative" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src={`https://player.vimeo.com/video/${post.content.vimeoId}?autoplay=${post.content.autoplay || 0}&muted=${post.content.muted || 0}`}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 0
                }}
                frameBorder="0"
                allowFullScreen
                allow="autoplay; fullscreen; picture-in-picture"
                title="Vimeo Video"
              />
            </div>
            {/* Vimeo branding badge */}
            <div className="absolute top-3 right-3 bg-blue-500 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg z-10">
              <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197c1.185-1.044 2.351-2.084 3.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.493 4.797l-.013.01z"/>
              </svg>
              <span className="text-white text-xs font-bold">Vimeo</span>
            </div>
          </div>
        )}

        {post.content.type === 'dailymotion' && (
          <div className="relative rounded-2xl overflow-hidden bg-white shadow-xl border border-gray-200">
            <div className="relative" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src={`https://www.dailymotion.com/embed/video/${post.content.dailymotionId}?autoplay=0&mute=1`}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 0
                }}
                frameBorder="0"
                allowFullScreen
                allow="fullscreen; picture-in-picture"
                title="Dailymotion Video"
              />
            </div>
            {/* Dailymotion branding badge */}
            <div className="absolute top-3 right-3 bg-white px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg z-10">
              <svg className="w-3.5 h-3.5 text-black" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.551 11.485c-1.02 0-1.734.714-1.734 1.734s.714 1.734 1.734 1.734 1.734-.714 1.734-1.734-.714-1.734-1.734-1.734zM24 4.571v14.857C24 21.714 22.286 24 20 24H4c-2.286 0-4-2.286-4-4V4c0-2.286 1.714-4 4-4h16c2.286 0 4 1.714 4 4v.571zM9.143 12c0-2.571 2.286-4.571 4.857-4.571S18.857 9.429 18.857 12s-2.286 4.571-4.857 4.571S9.143 14.571 9.143 12z"/>
              </svg>
              <span className="text-black text-xs font-bold">Dailymotion</span>
            </div>
          </div>
        )}

        {post.content.type === 'yandex-video' && (
          <div className="relative rounded-2xl overflow-hidden bg-white shadow-xl border border-gray-200">
            <a 
              href={post.content.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="relative" style={{ paddingBottom: '56.25%' }}>
                {post.content.thumbnailUrl && (
                  <img 
                    src={post.content.thumbnailUrl}
                    alt="Video thumbnail"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                {/* Dark overlay on hover */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300"></div>
                
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-red-600 bg-opacity-90 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-opacity-100 transition-all duration-300">
                    <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>

                {/* Duration badge (optional) */}
                <div className="absolute bottom-3 right-3 bg-black bg-opacity-75 px-2 py-1 rounded text-white text-xs font-semibold">
                  HD
                </div>
              </div>
              
              <div className="p-4 bg-white">
                <p className="text-gray-800 font-medium mb-2 line-clamp-2">{post.content.caption}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                      </svg>
                      <span className="font-semibold">{post.stats.likes.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>{post.stats.comments.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-red-600 font-semibold text-sm group-hover:gap-2 transition-all">
                    <span>Watch</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>
            
            {/* Yandex branding badge */}
            <div className="absolute top-3 right-3 rounded-full shadow-lg z-10 overflow-hidden flex items-center">
              <div className="bg-red-600 px-2 py-1.5 flex items-center">
                <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.73 19.75V4.26h-1.35c-3.56 0-5.53 1.47-5.53 4.36 0 2.45 1.23 3.85 3.46 5.01l-4.06 6.12h2.72l3.57-5.42c-.71-.27-1.26-.55-1.69-.86l4.88.01v6.27h2zm-1.35-7.74V6.01c1.97 0 3.1.78 3.1 2.69 0 1.8-1.03 2.88-3.1 3.31z"/>
                </svg>
              </div>
              <div className="bg-gray-900 px-2 py-1.5">
                <span className="text-white text-xs font-bold">andex</span>
              </div>
            </div>
          </div>
        )}

        {post.content.type === 'pinterest' && (
          <div className="relative rounded-2xl overflow-hidden bg-white shadow-xl mx-auto" style={{ maxWidth: '500px' }}>
            <a 
              data-pin-do="embedPin" 
              data-pin-width="medium"
              href={post.content.pinUrl}
              className="block"
            >
              <div className="p-8 text-center">
                <div className="animate-pulse">
                  <div className="w-16 h-16 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-8 h-8 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  <p className="text-gray-600">Loading Pinterest Pin...</p>
                </div>
              </div>
            </a>
            {/* Pinterest branding badge */}
            <div className="absolute top-3 right-3 bg-red-600 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg z-10">
              <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
              </svg>
              <span className="text-white text-xs font-bold">Pinterest</span>
            </div>
          </div>
        )}

        {post.content.type === 'pinterest-iframe' && (() => {
          const iframeHeight = post.content.iframeHeight || 900;
          const iframeWidth = post.content.iframeWidth || 450;
          
          return (
            <div className="relative mx-auto rounded-2xl overflow-hidden bg-white shadow-xl" style={{ width: '100%', maxWidth: `${iframeWidth}px` }}>
              <iframe 
                src={post.content.embedUrl}
                height={iframeHeight}
                width={iframeWidth}
                frameBorder="0" 
                scrolling="no"
                title="Pinterest Pin"
                className="w-full"
                style={{ pointerEvents: 'auto' }}
              />
              {/* Pinterest branding badge */}
              <div className="absolute top-3 right-3 bg-red-600 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg z-10">
                <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                </svg>
                <span className="text-white text-xs font-bold">Pinterest</span>
              </div>
            </div>
          );
        })()}

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
