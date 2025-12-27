'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ChatHeader from '@/components/chat/ChatHeader';
import MessageList from '@/components/chat/MessageList';
import MessageInput from '@/components/chat/MessageInput';
import Sidebar from '@/components/chat/Sidebar';
import { FiMenu } from 'react-icons/fi';
import { HiOutlineArrowRightOnRectangle } from 'react-icons/hi2';
import EnhancedSidebar from '@/components/chat/EnhancedSidebar';
import NavigationTabs from '@/components/chat/NavigationTabs';
import Stories from '@/components/chat/Stories';
import ExploreFeed from '@/components/chat/ExploreFeed';
import ExploreFilterTabs from '@/components/chat/ExploreFilterTabs';
import ProfileSidebar from '@/components/chat/ProfileSidebar';
import CallsContent from '@/components/chat/CallsContent';
import SavedMessages from '@/components/chat/SavedMessages';
import Comit from '@/components/chat/Comit';
import SubgroupsSidebar from '@/components/chat/SubgroupsSidebar';
import MediaGallery from '@/components/chat/MediaGallery';
import DiscordChat from '@/components/chat/DiscordChat';
import SlackChat from '@/components/chat/SlackChat';
import TeamsChat from '@/components/chat/TeamsChat';

interface Message {
  _id: string;
  content: string;
  senderId: string;
  createdAt: Date;
  isRead?: boolean;
  attachments?: {
    id: string;
    name: string;
    type: string;
    size: number;
    url: string;
  }[];
  audioMessage?: {
    url: string;
    duration: number;
  };
  voiceMessage?: {
    url: string;
    duration: number;
    waveform?: number[];
  };
  linkPreview?: {
    url: string;
    title?: string;
    description?: string;
    image?: string;
    siteName?: string;
  };
  views?: number;
}

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
}

export default function ChatPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showProfileSidebar, setShowProfileSidebar] = useState(false);
  const [showMediaGallery, setShowMediaGallery] = useState(false);
  const [showComit, setShowComit] = useState(false);
  const [currentChat, setCurrentChat] = useState<string | null>(null);
  const [showSubgroups, setShowSubgroups] = useState(false);
  const [selectedSubgroup, setSelectedSubgroup] = useState<string | undefined>(undefined);
  const [messages, setMessages] = useState<{ [key: string]: Message[] }>({
    // Personal Chat Messages
    '1': [
      {
        _id: '1',
        content: 'Hey! How are you doing today? 👋',
        senderId: 'other-user',
        createdAt: new Date(Date.now() - 7200000),
        isRead: true
      },
      {
        _id: '2',
        content: 'I\'m doing great! Just finished working on the new Telegram clone project. The UI is looking amazing! 🚀',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 6600000),
        isRead: true
      },
      {
        _id: '3',
        content: 'That sounds awesome! I\'d love to see it in action.',
        senderId: 'other-user',
        createdAt: new Date(Date.now() - 6000000),
        isRead: true
      },
      {
        _id: '4',
        content: 'Are you free for a call later? We could discuss the features and maybe do some pair programming 💻',
        senderId: 'other-user',
        createdAt: new Date(Date.now() - 5400000),
        isRead: true
      },
      {
        _id: '5',
        content: 'Sure! I\'ll be free around 3 PM. Let me know what works for you 😊',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 4800000),
        isRead: true
      }
    ],
    // Group Chat Messages
    '2': [
      {
        _id: 'g1',
        content: 'Welcome to the Web Dev Group! 🚀',
        senderId: 'admin-user',
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
        isRead: true
      },
      {
        _id: 'g2',
        content: 'Thanks for adding me! Excited to be here 😊',
        senderId: 'alice-dev',
        createdAt: new Date(Date.now() - 82800000),
        isRead: true
      },
      {
        _id: 'g3',
        content: 'Check out this new framework I found: https://nextjs.org/docs',
        senderId: 'bob-designer',
        createdAt: new Date(Date.now() - 7200000),
        isRead: true
      },
      {
        _id: 'g4',
        content: 'That looks interesting! Has anyone tried it in production?',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 3600000),
        isRead: true
      },
      {
        _id: 'g5',
        content: 'We\'ve been using it for 6 months now. Highly recommend! 👍',
        senderId: 'charlie-lead',
        createdAt: new Date(Date.now() - 1800000),
        isRead: false
      }
    ],
    // Project Alpha Team Messages
    '7': [
      {
        _id: 'p1',
        content: 'Good morning team! Ready for today\'s sprint review? 📋',
        senderId: 'david-pm',
        createdAt: new Date(Date.now() - 28800000), // 8 hours ago
        isRead: true
      },
      {
        _id: 'p2',
        content: 'Yes! I\'ve prepared the demo for the new authentication feature',
        senderId: 'sarah-dev',
        createdAt: new Date(Date.now() - 25200000),
        isRead: true
      },
      {
        _id: 'p3',
        content: 'Great work on the UI improvements, Sarah! The new design looks amazing 🎨',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 21600000),
        isRead: true
      },
      {
        _id: 'p4',
        content: 'Thanks! I\'ll also show the mobile responsive updates',
        senderId: 'sarah-dev',
        createdAt: new Date(Date.now() - 18000000),
        isRead: true
      },
      {
        _id: 'p5',
        content: 'Meeting at 3pm tomorrow. Conference room B is booked 📅',
        senderId: 'david-pm',
        createdAt: new Date(Date.now() - 3600000),
        isRead: false
      }
    ],
    // Gaming Squad Messages
    '8': [
      {
        _id: 'gs1',
        content: 'Who\'s ready for some Valorant tonight? 🎮',
        senderId: 'ryan-gamer',
        createdAt: new Date(Date.now() - 14400000), // 4 hours ago
        isRead: true
      },
      {
        _id: 'gs2',
        content: 'Count me in! What time are we starting?',
        senderId: 'mike-player',
        createdAt: new Date(Date.now() - 12600000),
        isRead: true
      },
      {
        _id: 'gs3',
        content: 'I\'m in too! Been practicing my aim all week 🎯',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 10800000),
        isRead: true
      },
      {
        _id: 'gs4',
        content: 'Let\'s start at 8 PM. I\'ll create the lobby',
        senderId: 'ryan-gamer',
        createdAt: new Date(Date.now() - 9000000),
        isRead: true
      },
      {
        _id: 'gs5',
        content: 'Perfect! See you all at 8. Don\'t forget your headsets 🎧',
        senderId: 'alex-teammate',
        createdAt: new Date(Date.now() - 7200000),
        isRead: true
      },
      {
        _id: 'gs6',
        content: 'Anyone up for a game tonight? 🕹️',
        senderId: 'ryan-gamer',
        createdAt: new Date(Date.now() - 10800000),
        isRead: false
      }
    ],
    // Events Subgroup
    'events': [
      {
        _id: 'ev1',
        content: 'Hey everyone! Planning a gaming tournament next weekend 🏆',
        senderId: 'matterbridge',
        createdAt: new Date(Date.now() - 86400000),
        isRead: true
      },
      {
        _id: 'ev2',
        content: 'Inviting everyone to come and participate! Prizes for top 3 winners',
        senderId: 'perry',
        createdAt: new Date(Date.now() - 82800000),
        isRead: true
      },
      {
        _id: 'ev3',
        content: 'Count me in! What games are we playing?',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 79200000),
        isRead: true
      },
      {
        _id: 'ev4',
        content: 'Valorant, CS:GO, and League of Legends. Registration opens tomorrow!',
        senderId: 'perry',
        createdAt: new Date(Date.now() - 75600000),
        isRead: false
      }
    ],
    // Tech Policy Subgroup
    'tech-policy': [
      {
        _id: 'tp1',
        content: 'Did you guys see the new gaming regulations being proposed?',
        senderId: 'A',
        createdAt: new Date(Date.now() - 172800000),
        isRead: true
      },
      {
        _id: 'tp2',
        content: 'https://theprint.in/ground-reports/india-billi...',
        senderId: 'A',
        createdAt: new Date(Date.now() - 169200000),
        isRead: true
      },
      {
        _id: 'tp3',
        content: 'This could affect how we organize tournaments. Need to review the guidelines',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 165600000),
        isRead: true
      },
      {
        _id: 'tp4',
        content: 'I\'ll compile a summary document for everyone to review',
        senderId: 'A',
        createdAt: new Date(Date.now() - 162000000),
        isRead: false
      }
    ],
    // FOSS Projects Subgroup
    'foss-projects': [
      {
        _id: 'fp1',
        content: 'Working on an open-source game server manager 🎮',
        senderId: 'Nevil krishna k',
        createdAt: new Date(Date.now() - 259200000),
        isRead: true
      },
      {
        _id: 'fp2',
        content: 'Tired of fighting with resume templates. Built my own using LaTeX',
        senderId: 'Nevil krishna k',
        createdAt: new Date(Date.now() - 255600000),
        isRead: true
      },
      {
        _id: 'fp3',
        content: 'That\'s awesome! Can you share the repo?',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 252000000),
        isRead: true
      },
      {
        _id: 'fp4',
        content: 'Sure! github.com/nevilk/game-server-manager - contributions welcome!',
        senderId: 'Nevil krishna k',
        createdAt: new Date(Date.now() - 248400000),
        isRead: false
      }
    ],
    // General Subgroup
    'general': [
      {
        _id: 'gn1',
        content: 'Morning everyone! Ready for today\'s scrims? ☀️',
        senderId: 'Anubhav',
        createdAt: new Date(Date.now() - 43200000),
        isRead: true
      },
      {
        _id: 'gn2',
        content: 'But it still very frustrating that there\'s so much lag during peak hours',
        senderId: 'Anubhav',
        createdAt: new Date(Date.now() - 39600000),
        isRead: true
      },
      {
        _id: 'gn3',
        content: 'Yeah, we need to find a better server host. Current one is terrible',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 36000000),
        isRead: true
      },
      {
        _id: 'gn4',
        content: 'I\'ll look into some alternatives this week. AWS or Azure might work better',
        senderId: 'Anubhav',
        createdAt: new Date(Date.now() - 32400000),
        isRead: false
      }
    ],
    // FOSS News Subgroup
    'foss-news': [
      {
        _id: 'fn1',
        content: 'New open-source game engine released! 🚀',
        senderId: 'Fb',
        createdAt: new Date(Date.now() - 129600000),
        isRead: true
      },
      {
        _id: 'fn2',
        content: 'Godot 4.0 is getting amazing reviews from indie developers',
        senderId: 'Fb',
        createdAt: new Date(Date.now() - 126000000),
        isRead: true
      },
      {
        _id: 'fn3',
        content: 'very nicely put mate :)',
        senderId: 'Fb',
        createdAt: new Date(Date.now() - 122400000),
        isRead: true
      },
      {
        _id: 'fn4',
        content: 'Should we consider switching our project to Godot?',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 118800000),
        isRead: false
      }
    ],
    // IndiaFOSS 2025 Subgroup
    'indiafoss-2025': [
      {
        _id: 'if1',
        content: 'IndiaFOSS 2025 conference dates announced! 📅',
        senderId: 'eliz',
        createdAt: new Date(Date.now() - 345600000),
        isRead: true
      },
      {
        _id: 'if2',
        content: 'Hi, is there any founder, cto, ceo, or someone from leadership attending?',
        senderId: 'eliz',
        createdAt: new Date(Date.now() - 342000000),
        isRead: true
      },
      {
        _id: 'if3',
        content: 'I\'m planning to attend! Would love to network with gaming industry leaders',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 338400000),
        isRead: true
      },
      {
        _id: 'if4',
        content: 'Great! Let\'s organize a gaming squad meetup at the conference',
        senderId: 'eliz',
        createdAt: new Date(Date.now() - 334800000),
        isRead: false
      }
    ],
    // Media Watch Subgroup
    'media-watch': [
      {
        _id: 'mw1',
        content: 'New article about esports growth in India 📰',
        senderId: 'Vivekanandan KS',
        createdAt: new Date(Date.now() - 432000000),
        isRead: true
      },
      {
        _id: 'mw2',
        content: 'Reminds me of how someone predicted this boom 5 years ago',
        senderId: 'Vivekanandan KS',
        createdAt: new Date(Date.now() - 428400000),
        isRead: true
      },
      {
        _id: 'mw3',
        content: 'The market has grown 300% since then. Incredible growth!',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 424800000),
        isRead: true
      },
      {
        _id: 'mw4',
        content: 'We should capitalize on this trend. Time to go pro? 🎯',
        senderId: 'Vivekanandan KS',
        createdAt: new Date(Date.now() - 421200000),
        isRead: false
      }
    ],
    // Hardware Subgroup
    'hardware': [
      {
        _id: 'hw1',
        content: 'Just upgraded my GPU to RTX 4090! 💪',
        senderId: 'Shree',
        createdAt: new Date(Date.now() - 518400000),
        isRead: true
      },
      {
        _id: 'hw2',
        content: 'Better chance of working at VGA resolution. Old cards struggling with 4K',
        senderId: 'Shree',
        createdAt: new Date(Date.now() - 514800000),
        isRead: true
      },
      {
        _id: 'hw3',
        content: 'What\'s your FPS on max settings now?',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 511200000),
        isRead: true
      },
      {
        _id: 'hw4',
        content: 'Hitting 240+ FPS on Valorant, 144+ on Cyberpunk maxed out!',
        senderId: 'Shree',
        createdAt: new Date(Date.now() - 507600000),
        isRead: false
      }
    ],
    // Memes Subgroup
    'memes': [
      {
        _id: 'mm1',
        content: 'When your teammate says "I got this" and dies immediately 😂',
        senderId: 'Jesvin',
        createdAt: new Date(Date.now() - 604800000),
        isRead: true
      },
      {
        _id: 'mm2',
        content: 'Yup, the raw apis surprise me regularly. We need better error handling lol',
        senderId: 'Jesvin',
        createdAt: new Date(Date.now() - 601200000),
        isRead: true
      },
      {
        _id: 'mm3',
        content: '*posts meme about lag spikes during clutch moments*',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 597600000),
        isRead: true
      },
      {
        _id: 'mm4',
        content: 'Too real! This happened to me yesterday in ranked 😭',
        senderId: 'Jesvin',
        createdAt: new Date(Date.now() - 594000000),
        isRead: false
      }
    ],
    // Jobs Subgroup
    'jobs': [
      {
        _id: 'jb1',
        content: 'Looking for game testers for our new project! 🎮',
        senderId: 'Ankush',
        createdAt: new Date(Date.now() - 691200000),
        isRead: true
      },
      {
        _id: 'jb2',
        content: 'Help us spread adoption of our FOSS gaming platform. Remote position available!',
        senderId: 'Ankush',
        createdAt: new Date(Date.now() - 687600000),
        isRead: true
      },
      {
        _id: 'jb3',
        content: 'What are the requirements? I might be interested!',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 684000000),
        isRead: true
      },
      {
        _id: 'jb4',
        content: 'Experience with Unity/Unreal, passion for gaming, and good communication skills',
        senderId: 'Ankush',
        createdAt: new Date(Date.now() - 680400000),
        isRead: false
      }
    ],
    // React Developers Messages
    '17': [
      {
        _id: 'rd1',
        content: 'Has anyone tried the new React 18 concurrent features yet?',
        senderId: 'mike-react',
        createdAt: new Date(Date.now() - 10800000), // 3 hours ago
        isRead: true
      },
      {
        _id: 'rd2',
        content: 'Yes! The automatic batching is a game changer for performance 🚀',
        senderId: 'emma-frontend',
        createdAt: new Date(Date.now() - 9000000),
        isRead: true
      },
      {
        _id: 'rd3',
        content: 'I\'m still learning about Suspense. Any good tutorials?',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 7200000),
        isRead: true
      },
      {
        _id: 'rd4',
        content: 'Check out the official React docs. They have great examples now',
        senderId: 'tom-senior',
        createdAt: new Date(Date.now() - 5400000),
        isRead: true
      },
      {
        _id: 'rd5',
        content: 'New React 18 features are amazing! The concurrent rendering is so smooth',
        senderId: 'mike-react',
        createdAt: new Date(Date.now() - 7200000),
        isRead: false
      }
    ],
    // Design Team Messages
    '18': [
      {
        _id: 'dt1',
        content: 'I\'ve updated our design system with the new color palette 🎨',
        senderId: 'sarah-designer',
        createdAt: new Date(Date.now() - 18000000), // 5 hours ago
        isRead: true
      },
      {
        _id: 'dt2',
        content: 'Love the new colors! Much more modern and accessible',
        senderId: 'lisa-ux',
        createdAt: new Date(Date.now() - 16200000),
        isRead: true
      },
      {
        _id: 'dt3',
        content: 'The contrast ratios look perfect. Great work Sarah! ✨',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 14400000),
        isRead: true
      },
      {
        _id: 'dt4',
        content: 'Should we schedule a design review meeting for next week?',
        senderId: 'sarah-designer',
        createdAt: new Date(Date.now() - 12600000),
        isRead: true
      },
      {
        _id: 'dt5',
        content: 'Updated the color palette. Please review and let me know your thoughts 🎯',
        senderId: 'sarah-designer',
        createdAt: new Date(Date.now() - 14400000),
        isRead: false
      }
    ],
    // Channel Messages
    '6': [
      {
        _id: 'c1',
        content: '🚀 Project Alpha Team - Weekly Update #15\n\n✅ Completed:\n• User authentication system\n• Database optimization\n• UI/UX improvements\n\n🔄 In Progress:\n• API integration\n• Testing phase\n\n📅 Next Week:\n• Deploy to staging\n• Performance testing',
        senderId: 'project-admin',
        createdAt: new Date(Date.now() - 86400000),
        isRead: true
      },
      {
        _id: 'c2',
        content: '📊 Performance Metrics Update:\n\n• Page load time: 1.2s (-0.3s)\n• API response time: 150ms (-50ms)\n• User satisfaction: 94% (+5%)\n\nGreat work team! 🎉',
        senderId: 'project-admin',
        createdAt: new Date(Date.now() - 43200000),
        isRead: true
      },
      {
        _id: 'c3',
        content: '🎯 Meeting Tomorrow at 3 PM\n\nTopics:\n• Sprint review\n• Q4 planning\n• New feature discussions\n\nZoom link will be shared 30 mins before.',
        senderId: 'project-admin',
        createdAt: new Date(Date.now() - 7200000),
        isRead: false
      }
    ],
    // Bot Messages
    '9': [
      {
        _id: 'b1',
        content: '🤖 Welcome to Tech News Bot!\n\nI can help you with:\n• Latest tech news\n• Programming tutorials\n• Industry updates\n• Job opportunities\n\nType /help for more commands.',
        senderId: 'tech-bot',
        createdAt: new Date(Date.now() - 86400000),
        isRead: true
      },
      {
        _id: 'b2',
        content: '/news',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 3600000),
        isRead: true
      },
      {
        _id: 'b3',
        content: '📰 Latest Tech News:\n\n1. 🚀 SpaceX launches new satellite constellation\n2. 💻 Microsoft announces new AI features\n3. 🔐 Google enhances security protocols\n4. 📱 Apple releases iOS 18 beta\n5. ⚡ Tesla unveils new charging technology\n\nType /details [number] for more info.',
        senderId: 'tech-bot',
        createdAt: new Date(Date.now() - 3540000),
        isRead: true
      },
      {
        _id: 'b4',
        content: '/details 2',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 1800000),
        isRead: true
      },
      {
        _id: 'b5',
        content: '🤖 Microsoft AI Features Update:\n\n• Enhanced Copilot integration\n• New machine learning models\n• Improved natural language processing\n• Better code completion\n• Advanced data analysis tools\n\nRelease date: Q1 2024\nMore info: https://microsoft.com/ai-updates',
        senderId: 'tech-bot',
        createdAt: new Date(Date.now() - 1740000),
        isRead: false
      }
    ],
    // Calendar Bot Messages
    '36': [
      {
        _id: 'cal1',
        content: '📅 Welcome to Calendar Bot!\n\nI can help you manage your schedule:\n• View upcoming events\n• Set reminders\n• Schedule meetings\n• Get daily summaries\n\nType /today to see today\'s schedule.',
        senderId: 'calendar-bot',
        createdAt: new Date(Date.now() - 172800000), // 2 days ago
        isRead: true
      },
      {
        _id: 'cal2',
        content: '🔔 Reminder: Team standup meeting in 15 minutes\n\n📍 Location: Conference Room A\n⏰ Time: 10:00 AM\n👥 Attendees: 8 people',
        senderId: 'calendar-bot',
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
        isRead: true
      },
      {
        _id: 'cal3',
        content: '/today',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 14400000), // 4 hours ago
        isRead: true
      },
      {
        _id: 'cal4',
        content: '📋 Today\'s Schedule - November 22, 2025\n\n9:00 AM - Coffee with Sarah\n10:30 AM - Project review meeting\n2:00 PM - Client presentation\n4:30 PM - Team retrospective\n\nYou have 4 events scheduled today.',
        senderId: 'calendar-bot',
        createdAt: new Date(Date.now() - 14340000),
        isRead: true
      },
      {
        _id: 'cal5',
        content: '✨ New event added: "Lunch with Alex"\n\n📅 Date: Tomorrow, November 23\n⏰ Time: 12:30 PM\n📍 Location: Downtown Cafe\n\nWould you like to set a reminder?',
        senderId: 'calendar-bot',
        createdAt: new Date(Date.now() - 7200000), // 2 hours ago
        isRead: true
      },
      {
        _id: 'cal6',
        content: '🎯 Upcoming This Week:\n\nMonday: 3 meetings\nTuesday: 2 meetings\nWednesday: 4 meetings\nThursday: 1 meeting\nFriday: Team happy hour 🎉\n\nStay organized!',
        senderId: 'calendar-bot',
        createdAt: new Date(Date.now() - 3600000), // 1 hour ago
        isRead: false
      },
      {
        _id: 'cal7',
        content: '⚠️ Meeting conflict detected!\n\n"Client Call" and "Design Review" are both scheduled for 3:00 PM tomorrow.\n\nWould you like to reschedule one of them?',
        senderId: 'calendar-bot',
        createdAt: new Date(Date.now() - 1800000), // 30 minutes ago
        isRead: false
      }
    ],
    // File Bot Messages
    '74': [
      {
        _id: 'file1',
        content: '📁 Welcome to File Bot!\n\nI can help you manage your files:\n• Upload and download files\n• Share files with others\n• Organize your storage\n• Convert file formats\n• Compress large files\n\nType /storage to check your usage.',
        senderId: 'file-bot',
        createdAt: new Date(Date.now() - 259200000), // 3 days ago
        isRead: true
      },
      {
        _id: 'file2',
        content: '✅ File uploaded successfully!\n\n📄 Name: Project_Proposal.docx\n📊 Size: 2.4 MB\n📅 Date: Nov 19, 2025\n🔗 Share link: files.app/abc123\n\nThe file is now available in your cloud storage.',
        senderId: 'file-bot',
        createdAt: new Date(Date.now() - 172800000), // 2 days ago
        isRead: true
      },
      {
        _id: 'file3',
        content: '📤 Upload: Report.pdf\n\n⏳ Uploading... 45%\n📊 Size: 5.8 MB\n⚡ Speed: 1.2 MB/s\n⏱️ Time remaining: 4 seconds',
        senderId: 'file-bot',
        createdAt: new Date(Date.now() - 172740000),
        isRead: true
      },
      {
        _id: 'file4',
        content: '✨ Upload complete!\n\n📄 Report.pdf uploaded successfully\n📊 Size: 5.8 MB\n🔗 Link: files.app/report-2025',
        senderId: 'file-bot',
        createdAt: new Date(Date.now() - 172680000),
        isRead: true
      },
      {
        _id: 'file5',
        content: '/storage',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
        isRead: true
      },
      {
        _id: 'file6',
        content: '💾 Storage Usage Report\n\n📊 Used: 8.5 GB / 15 GB (57%)\n📁 Files: 247 items\n📷 Images: 3.2 GB\n📄 Documents: 2.8 GB\n🎵 Media: 1.9 GB\n📦 Other: 0.6 GB\n\n✨ 6.5 GB available',
        senderId: 'file-bot',
        createdAt: new Date(Date.now() - 86340000),
        isRead: true
      },
      {
        _id: 'file7',
        content: '🔄 File conversion started\n\n📄 Converting: presentation.pptx → presentation.pdf\n⏳ Processing...\n\nYou\'ll be notified when it\'s ready.',
        senderId: 'file-bot',
        createdAt: new Date(Date.now() - 43200000), // 12 hours ago
        isRead: true
      },
      {
        _id: 'file8',
        content: '✅ Conversion complete!\n\n📄 presentation.pdf is ready\n📊 Size: 3.1 MB (reduced from 4.7 MB)\n🔗 Download: files.app/presentation-pdf',
        senderId: 'file-bot',
        createdAt: new Date(Date.now() - 43140000),
        isRead: true
      },
      {
        _id: 'file9',
        content: '🗜️ File compression complete!\n\n📦 Original: images_backup.zip (125 MB)\n📦 Compressed: images_backup_compressed.zip (87 MB)\n💡 Saved: 38 MB (30% reduction)\n\nDownload the compressed version?',
        senderId: 'file-bot',
        createdAt: new Date(Date.now() - 14400000), // 4 hours ago
        isRead: true
      },
      {
        _id: 'file10',
        content: '🔗 File shared successfully!\n\n📄 Budget_2025.xlsx\n👥 Shared with: team@company.com\n🔐 Permission: View only\n⏰ Expires: 7 days\n\nRecipients have been notified.',
        senderId: 'file-bot',
        createdAt: new Date(Date.now() - 7200000), // 2 hours ago
        isRead: false
      },
      {
        _id: 'file11',
        content: '⚠️ Storage Alert!\n\nYou\'re using 85% of your storage (12.8 GB / 15 GB)\n\n💡 Suggestions:\n• Delete old files\n• Compress large files\n• Upgrade to 50 GB plan\n\nManage storage now?',
        senderId: 'file-bot',
        createdAt: new Date(Date.now() - 3600000), // 1 hour ago
        isRead: false
      },
      {
        _id: 'file12',
        content: '🔍 Duplicate files found!\n\n📄 vacation_photo.jpg (3 copies)\n📄 meeting_notes.docx (2 copies)\n💾 Total wasted space: 15.3 MB\n\nWould you like to remove duplicates?',
        senderId: 'file-bot',
        createdAt: new Date(Date.now() - 1800000), // 30 minutes ago
        isRead: false
      }
    ],
    // Stock Bot Messages
    '35': [
      {
        _id: 'stock1',
        content: '📈 Welcome to Stock Bot!\n\nI provide real-time stock market updates:\n• Live stock prices\n• Market indices\n• Portfolio tracking\n• Price alerts\n• Market news\n\nType /watchlist to see your stocks.',
        senderId: 'stock-bot',
        createdAt: new Date(Date.now() - 259200000), // 3 days ago
        isRead: true
      },
      {
        _id: 'stock2',
        content: '📊 Market Open Update\n\n🔔 US Markets opened strong today!\n\nDow Jones: +0.8% ↗️\nS&P 500: +1.2% ↗️\nNASDAQ: +1.5% ↗️\n\nTech stocks leading the rally.',
        senderId: 'stock-bot',
        createdAt: new Date(Date.now() - 172800000), // 2 days ago
        isRead: true
      },
      {
        _id: 'stock3',
        content: '🎯 Price Alert!\n\n📈 AAPL (Apple Inc.)\nPrice: $175.43 (+$2.15)\nChange: +1.24% ↗️\n\nYour target price of $175 has been reached!',
        senderId: 'stock-bot',
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
        isRead: true
      },
      {
        _id: 'stock4',
        content: '/watchlist',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 43200000), // 12 hours ago
        isRead: true
      },
      {
        _id: 'stock5',
        content: '📋 Your Watchlist\n\n📈 AAPL: $175.43 (+1.24%)\n📉 TSLA: $242.18 (-0.85%)\n📈 MSFT: $378.91 (+2.10%)\n📈 GOOGL: $141.52 (+0.95%)\n📉 AMZN: $151.23 (-0.42%)\n\nPortfolio Value: $45,230\nToday\'s Change: +$892 (+2.01%)',
        senderId: 'stock-bot',
        createdAt: new Date(Date.now() - 43140000),
        isRead: true
      },
      {
        _id: 'stock6',
        content: '⚠️ Volatility Alert!\n\n📊 TSLA (Tesla Inc.)\nCurrent: $242.18\nVolatility: High ⚡\n\nStock has moved 5% in the last hour. Consider reviewing your position.',
        senderId: 'stock-bot',
        createdAt: new Date(Date.now() - 14400000), // 4 hours ago
        isRead: true
      },
      {
        _id: 'stock7',
        content: '💰 Dividend Announcement\n\n🏢 MSFT (Microsoft)\nDividend: $0.68 per share\nEx-Date: Nov 25, 2025\nPayment Date: Dec 12, 2025\n\nYour estimated payout: $136',
        senderId: 'stock-bot',
        createdAt: new Date(Date.now() - 7200000), // 2 hours ago
        isRead: false
      },
      {
        _id: 'stock8',
        content: '📉 Market Close Summary\n\nDow Jones: 35,421 (+0.65%)\nS&P 500: 4,582 (+0.92%)\nNASDAQ: 14,258 (+1.18%)\n\n🌟 Top Gainers:\n• NVDA: +5.2%\n• AMD: +4.8%\n• META: +3.1%\n\n📉 Top Losers:\n• NFLX: -2.4%\n• PYPL: -1.9%',
        senderId: 'stock-bot',
        createdAt: new Date(Date.now() - 3600000), // 1 hour ago
        isRead: false
      },
      {
        _id: 'stock9',
        content: '🔔 Earnings Alert!\n\n📊 AAPL Earnings Report\nDate: Tomorrow, 4:30 PM EST\nExpected EPS: $1.39\nConsensus: Beat expected\n\nAnalysts predict strong iPhone sales. Set a reminder?',
        senderId: 'stock-bot',
        createdAt: new Date(Date.now() - 1800000), // 30 minutes ago
        isRead: false
      },
      {
        _id: 'stock10',
        content: '📈 Analyst Upgrade\n\n🏢 GOOGL (Alphabet Inc.)\nRating: Buy → Strong Buy\nPrice Target: $165 (+16%)\nAnalyst: Goldman Sachs\n\nCitation: "AI initiatives showing strong momentum"',
        senderId: 'stock-bot',
        createdAt: new Date(Date.now() - 900000), // 15 minutes ago
        isRead: false
      }
    ],
    // News Bot Messages
    '33': [
      {
        _id: 'news1',
        content: '📰 Welcome to News Bot!\n\nStay updated with breaking news:\n• World news\n• Technology\n• Business\n• Sports\n• Entertainment\n\nType /topics to customize your feed.',
        senderId: 'news-bot',
        createdAt: new Date(Date.now() - 259200000), // 3 days ago
        isRead: true
      },
      {
        _id: 'news2',
        content: '🚨 BREAKING NEWS\n\nTech stocks surge 5% today as AI sector shows strong growth\n\n📊 Major tech companies report record earnings driven by artificial intelligence investments.\n\n🔗 Read more: techcrunch.com/ai-boom-2025',
        senderId: 'news-bot',
        createdAt: new Date(Date.now() - 172800000), // 2 days ago
        isRead: true
      },
      {
        _id: 'news3',
        content: '🌍 World News\n\nClimate summit reaches historic agreement\n\n150+ nations commit to carbon neutrality by 2040. Renewable energy investments to triple.\n\n📍 Location: Geneva, Switzerland\n⏰ Updated: 2 hours ago',
        senderId: 'news-bot',
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
        isRead: true
      },
      {
        _id: 'news4',
        content: '💻 Tech News\n\nOpenAI announces GPT-5 with breakthrough capabilities\n\n🤖 Key Features:\n• 10x faster processing\n• Multimodal understanding\n• 99% accuracy improvement\n• Real-time learning\n\nPublic beta starts next month.',
        senderId: 'news-bot',
        createdAt: new Date(Date.now() - 43200000), // 12 hours ago
        isRead: true
      },
      {
        _id: 'news5',
        content: '⚽ Sports Update\n\n🏆 Champions League Final\n\nReal Madrid 2 - 1 Manchester City\n\n⚽ Goals:\n• Benzema 23\'\n• Haaland 67\'\n• Vinicius Jr. 89\'\n\nReal Madrid wins their 15th European title!',
        senderId: 'news-bot',
        createdAt: new Date(Date.now() - 28800000), // 8 hours ago
        isRead: true
      },
      {
        _id: 'news6',
        content: '💼 Business News\n\nAmazon acquires major robotics company for $8.5B\n\n🤖 Deal includes:\n• Advanced warehouse automation\n• AI-powered logistics\n• 2,000+ patents\n\nExpected to revolutionize delivery systems.',
        senderId: 'news-bot',
        createdAt: new Date(Date.now() - 14400000), // 4 hours ago
        isRead: true
      },
      {
        _id: 'news7',
        content: '/topics',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 10800000), // 3 hours ago
        isRead: true
      },
      {
        _id: 'news8',
        content: '⚙️ Your News Topics\n\nCurrently following:\n✅ Technology\n✅ Business\n✅ Science\n✅ Sports\n\nAvailable topics:\n• Politics\n• Entertainment\n• Health\n• Environment\n\nReply with topic name to add/remove.',
        senderId: 'news-bot',
        createdAt: new Date(Date.now() - 10740000),
        isRead: true
      },
      {
        _id: 'news9',
        content: '🎬 Entertainment\n\nNew Marvel movie breaks box office records\n\n"Avengers: Secret Wars" earns $350M opening weekend\n\n🎥 Records broken:\n• Biggest opening ever\n• Highest Thursday previews\n• Best international debut\n\nCritics rating: 94% 🍅',
        senderId: 'news-bot',
        createdAt: new Date(Date.now() - 7200000), // 2 hours ago
        isRead: false
      },
      {
        _id: 'news10',
        content: '🔬 Science Breakthrough\n\nScientists discover potential cure for Alzheimer\'s\n\n🧬 Clinical trials show:\n• 85% improvement rate\n• Minimal side effects\n• Reverses early symptoms\n\nFDA fast-track approval expected.\n\n📖 Published in: Nature Medicine',
        senderId: 'news-bot',
        createdAt: new Date(Date.now() - 3600000), // 1 hour ago
        isRead: false
      },
      {
        _id: 'news11',
        content: '🚨 BREAKING: Major tech outage resolved\n\nGlobal internet services restored after 2-hour disruption\n\n📊 Impact:\n• 40M users affected\n• Services: Social media, cloud\n• Cause: Network infrastructure\n\nAll systems now operational.',
        senderId: 'news-bot',
        createdAt: new Date(Date.now() - 1800000), // 30 minutes ago
        isRead: false
      },
      {
        _id: 'news12',
        content: '🌟 Trending Now\n\n1️⃣ AI Revolution in Healthcare\n2️⃣ Electric Vehicle Sales Soar\n3️⃣ Space Tourism Opens to Public\n4️⃣ Quantum Computing Milestone\n5️⃣ Renewable Energy Breakthrough\n\nTap any headline for full story.',
        senderId: 'news-bot',
        createdAt: new Date(Date.now() - 900000), // 15 minutes ago
        isRead: false
      }
    ],
    // Analytics Bot Messages
    '71': [
      {
        _id: 'analytics1',
        content: '📊 Welcome to Analytics Bot!\n\nI provide insights on your data:\n• Website traffic\n• User engagement\n• Conversion rates\n• Performance metrics\n• Custom reports\n\nType /dashboard to see your stats.',
        senderId: 'analytics-bot',
        createdAt: new Date(Date.now() - 259200000), // 3 days ago
        isRead: true
      },
      {
        _id: 'analytics2',
        content: '📈 Weekly Report - Nov 15-22\n\n👥 Total Visitors: 45,230 (+15%)\n📄 Page Views: 128,450 (+22%)\n⏱️ Avg. Session: 4m 32s (+8%)\n🎯 Bounce Rate: 32% (-5%)\n\n🌟 Best performing page:\n/products (+45% traffic)',
        senderId: 'analytics-bot',
        createdAt: new Date(Date.now() - 172800000), // 2 days ago
        isRead: true
      },
      {
        _id: 'analytics3',
        content: '🚀 Traffic Spike Alert!\n\n📊 Current visitors: 1,247\n⚡ 340% above average\n\nTop sources:\n• Social Media: 45%\n• Direct: 28%\n• Search: 18%\n• Referral: 9%\n\nYour content is trending!',
        senderId: 'analytics-bot',
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
        isRead: true
      },
      {
        _id: 'analytics4',
        content: '/dashboard',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 43200000), // 12 hours ago
        isRead: true
      },
      {
        _id: 'analytics5',
        content: '📊 Real-Time Dashboard\n\n🟢 Active Users: 342\n📍 Top Countries:\n• USA: 45%\n• UK: 18%\n• Canada: 12%\n• India: 10%\n• Others: 15%\n\n💻 Devices:\n• Mobile: 58%\n• Desktop: 35%\n• Tablet: 7%',
        senderId: 'analytics-bot',
        createdAt: new Date(Date.now() - 43140000),
        isRead: true
      },
      {
        _id: 'analytics6',
        content: '🎯 Conversion Funnel Update\n\n📈 This Week\'s Performance:\n\n1️⃣ Landing Page: 10,000 visitors\n2️⃣ Product View: 6,500 (65%)\n3️⃣ Add to Cart: 2,600 (40%)\n4️⃣ Checkout: 1,820 (70%)\n5️⃣ Purchase: 1,456 (80%)\n\n💰 Conversion Rate: 14.56% (+2.3%)',
        senderId: 'analytics-bot',
        createdAt: new Date(Date.now() - 14400000), // 4 hours ago
        isRead: true
      },
      {
        _id: 'analytics7',
        content: '⚠️ Performance Alert\n\n🐌 Page load time increased\n\nAverage: 3.2s (was 2.1s)\nAffected pages: /checkout, /cart\n\n💡 Recommendation:\n• Optimize images\n• Enable caching\n• Minify CSS/JS\n\nImpact: -12% conversion',
        senderId: 'analytics-bot',
        createdAt: new Date(Date.now() - 7200000), // 2 hours ago
        isRead: false
      },
      {
        _id: 'analytics8',
        content: '🎉 Milestone Achieved!\n\n🏆 100,000 Total Users\n\nGrowth Timeline:\n• 50K: 6 months ago\n• 75K: 3 months ago\n• 100K: Today!\n\n📈 Growth Rate: 67% increase\n\nCongratulations on this achievement!',
        senderId: 'analytics-bot',
        createdAt: new Date(Date.now() - 3600000), // 1 hour ago
        isRead: false
      },
      {
        _id: 'analytics9',
        content: '📱 Mobile App Analytics\n\n📊 This Month:\n• Downloads: 12,450 (+28%)\n• Active Users: 8,920 (+15%)\n• Avg. Session: 8m 45s\n• Retention (Day 7): 42%\n• Rating: 4.6 ⭐ (2,340 reviews)\n\n🔥 Most used features:\n1. Dashboard\n2. Notifications\n3. Search',
        senderId: 'analytics-bot',
        createdAt: new Date(Date.now() - 1800000), // 30 minutes ago
        isRead: false
      },
      {
        _id: 'analytics10',
        content: '💡 AI Insights\n\n🤖 Predicted trends for next week:\n\n📈 Expected traffic: +18%\n🎯 Best posting time: 2-4 PM\n💰 Revenue forecast: $45,200\n\n⚡ Recommendations:\n• Increase ad spend by 15%\n• Focus on mobile optimization\n• Launch email campaign on Tuesday',
        senderId: 'analytics-bot',
        createdAt: new Date(Date.now() - 900000), // 15 minutes ago
        isRead: false
      }
    ],
    // Image Bot Messages
    '76': [
      {
        _id: 'image1',
        content: '🖼️ Welcome to Image Bot!\n\nI can help you with images:\n• Compress images\n• Resize & crop\n• Format conversion\n• Apply filters\n• Remove backgrounds\n\nSend me an image to get started!',
        senderId: 'image-bot',
        createdAt: new Date(Date.now() - 259200000), // 3 days ago
        isRead: true
      },
      {
        _id: 'image2',
        content: '✅ Image compressed successfully!\n\n📸 vacation_photo.jpg\n\n📊 Results:\n• Original: 4.2 MB\n• Compressed: 850 KB\n• Savings: 80% reduction\n• Quality: 95% maintained\n\n🔗 Download: images.app/compressed-abc123',
        senderId: 'image-bot',
        createdAt: new Date(Date.now() - 172800000), // 2 days ago
        isRead: true
      },
      {
        _id: 'image3',
        content: '🎨 Filter Applied: Vintage\n\n📸 portrait_2025.jpg\n\n✨ Adjustments made:\n• Sepia tone: +40%\n• Contrast: +15%\n• Vignette: Medium\n• Grain: Light\n\nLove it? Save or try another filter!',
        senderId: 'image-bot',
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
        isRead: true
      },
      {
        _id: 'image4',
        content: '🔄 Batch Processing Started\n\n📁 Processing 24 images...\n\n⏳ Progress: 12/24 (50%)\n⚡ Speed: 2.5 images/sec\n⏱️ Time remaining: ~5 seconds\n\nOperation: Resize to 1920x1080',
        senderId: 'image-bot',
        createdAt: new Date(Date.now() - 43200000), // 12 hours ago
        isRead: true
      },
      {
        _id: 'image5',
        content: '✨ Batch Processing Complete!\n\n📊 Summary:\n• Total images: 24\n• Successfully processed: 24\n• Failed: 0\n• Total time: 9.6 seconds\n• Space saved: 18.5 MB\n\n📦 Download ZIP: images.app/batch-xyz789',
        senderId: 'image-bot',
        createdAt: new Date(Date.now() - 43140000),
        isRead: true
      },
      {
        _id: 'image6',
        content: '🎭 Background Removed!\n\n📸 product_shot.png\n\n✅ Results:\n• Background: Transparent\n• Format: PNG with alpha\n• Resolution: 2400x2400\n• File size: 1.2 MB\n\nPerfect for e-commerce! 🛍️',
        senderId: 'image-bot',
        createdAt: new Date(Date.now() - 14400000), // 4 hours ago
        isRead: true
      },
      {
        _id: 'image7',
        content: '📐 Image Resized\n\n📸 banner_image.jpg\n\nOriginal: 4000x3000\nNew size: 1920x1080\n\n✅ Optimizations:\n• Aspect ratio: Maintained\n• Quality: High (90%)\n• Format: JPEG\n• Size: 2.1 MB → 450 KB',
        senderId: 'image-bot',
        createdAt: new Date(Date.now() - 7200000), // 2 hours ago
        isRead: false
      },
      {
        _id: 'image8',
        content: '🔄 Format Conversion Complete\n\n📸 logo_design.psd\n\nConverted to:\n✅ PNG (transparent)\n✅ JPG (web optimized)\n✅ SVG (vector)\n✅ WebP (modern format)\n\n📦 All formats ready for download!',
        senderId: 'image-bot',
        createdAt: new Date(Date.now() - 3600000), // 1 hour ago
        isRead: false
      },
      {
        _id: 'image9',
        content: '🎨 AI Enhancement Applied\n\n📸 old_photo_1985.jpg\n\n✨ Improvements:\n• Upscaled: 2x resolution\n• Noise reduction: Applied\n• Color restoration: Enhanced\n• Sharpness: +25%\n\nYour photo looks brand new! 🌟',
        senderId: 'image-bot',
        createdAt: new Date(Date.now() - 1800000), // 30 minutes ago
        isRead: false
      },
      {
        _id: 'image10',
        content: '📊 Monthly Usage Report\n\n🖼️ November 2025:\n\n• Images processed: 1,247\n• Total saved: 2.8 GB\n• Most used: Compression (45%)\n• Avg. processing: 1.2s\n\n🎉 You\'re in top 10% of users!\n\nPremium features available.',
        senderId: 'image-bot',
        createdAt: new Date(Date.now() - 900000), // 15 minutes ago
        isRead: false
      }
    ],
    // GitHub Bot Messages
    '13': [
      {
        _id: 'github1',
        content: '🐙 Welcome to GitHub Bot!\n\nStay updated with your repositories:\n• Pull requests\n• Issues & bugs\n• Code reviews\n• Commits\n• Releases\n\nType /repos to see your projects.',
        senderId: 'github-bot',
        createdAt: new Date(Date.now() - 259200000), // 3 days ago
        isRead: true
      },
      {
        _id: 'github2',
        content: '🔔 New Pull Request\n\n📦 Repository: telegram-clone\n👤 Author: @sarah-dev\n🏷️ #142: Feature/user-auth\n\n📝 Changes:\n• 12 files changed\n• +456 -123 lines\n• 3 commits\n\n✅ All checks passed\n🔗 Review: github.com/pr/142',
        senderId: 'github-bot',
        createdAt: new Date(Date.now() - 172800000), // 2 days ago
        isRead: true
      },
      {
        _id: 'github3',
        content: '⭐ Your repo is trending!\n\n📦 awesome-react-components\n\n🌟 Stars: 1,247 (+89 today)\n🍴 Forks: 234 (+12)\n👀 Watchers: 456 (+23)\n\n🔥 Trending #3 in JavaScript\n\nCongratulations! 🎉',
        senderId: 'github-bot',
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
        isRead: true
      },
      {
        _id: 'github4',
        content: '🐛 New Issue Opened\n\n📦 Repository: web-dashboard\n👤 Reporter: @john_doe\n🏷️ #89: Login button not working\n\n🔴 Priority: High\n🏷️ Labels: bug, authentication\n\n💬 "Users unable to login on mobile devices"\n\n🔗 View: github.com/issues/89',
        senderId: 'github-bot',
        createdAt: new Date(Date.now() - 43200000), // 12 hours ago
        isRead: true
      },
      {
        _id: 'github5',
        content: '/repos',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 28800000), // 8 hours ago
        isRead: true
      },
      {
        _id: 'github6',
        content: '📚 Your Repositories\n\n1️⃣ telegram-clone\n   ⭐ 234 | 🍴 45 | 🔄 3 open PRs\n\n2️⃣ awesome-react-components\n   ⭐ 1,247 | 🍴 234 | 🐛 5 issues\n\n3️⃣ web-dashboard\n   ⭐ 89 | 🍴 12 | ✅ All clear\n\n4️⃣ api-server\n   ⭐ 156 | 🍴 28 | 🔄 1 open PR',
        senderId: 'github-bot',
        createdAt: new Date(Date.now() - 28740000),
        isRead: true
      },
      {
        _id: 'github7',
        content: '✅ Pull Request Merged!\n\n📦 telegram-clone\n🏷️ #142: Feature/user-auth\n👤 Merged by: @team-lead\n\n🎉 Changes deployed to main branch\n\n📊 Stats:\n• Files: 12\n• Additions: +456\n• Deletions: -123\n• Commits: 3',
        senderId: 'github-bot',
        createdAt: new Date(Date.now() - 14400000), // 4 hours ago
        isRead: true
      },
      {
        _id: 'github8',
        content: '🚀 New Release Published\n\n📦 web-dashboard v2.5.0\n\n✨ What\'s New:\n• Dark mode support\n• Performance improvements\n• Bug fixes (12 issues)\n• New analytics dashboard\n\n📥 Downloads: 234\n🔗 Release notes: github.com/releases/v2.5.0',
        senderId: 'github-bot',
        createdAt: new Date(Date.now() - 7200000), // 2 hours ago
        isRead: false
      },
      {
        _id: 'github9',
        content: '⚠️ Security Alert\n\n📦 Repository: api-server\n🔒 Vulnerability detected\n\nPackage: lodash@4.17.15\nSeverity: Moderate\nCVE: CVE-2021-23337\n\n💡 Fix available: Update to 4.17.21\n\n🔧 Run: npm update lodash',
        senderId: 'github-bot',
        createdAt: new Date(Date.now() - 3600000), // 1 hour ago
        isRead: false
      },
      {
        _id: 'github10',
        content: '💬 Code Review Requested\n\n📦 telegram-clone\n🏷️ #145: Fix/message-rendering\n👤 Author: @alex-dev\n\n📝 Comment from @code-reviewer:\n"LGTM! Just one minor suggestion on line 42. Consider using useMemo for better performance."\n\n🔗 Review: github.com/pr/145',
        senderId: 'github-bot',
        createdAt: new Date(Date.now() - 1800000), // 30 minutes ago
        isRead: false
      },
      {
        _id: 'github11',
        content: '🔥 GitHub Actions: Build Failed\n\n📦 Repository: web-dashboard\n🌿 Branch: feature/new-ui\n⚙️ Workflow: CI/CD Pipeline\n\n❌ Failed step: Run tests\nError: 3 tests failing\n\n📝 Logs available\n🔗 View: github.com/actions/run/12345',
        senderId: 'github-bot',
        createdAt: new Date(Date.now() - 900000), // 15 minutes ago
        isRead: false
      }
    ],
    // Security Bot Messages
    '72': [
      {
        _id: 'security1',
        content: '🔐 Welcome to Security Bot!\n\nI help protect your account:\n• Login alerts\n• Security scans\n• Password strength\n• 2FA management\n• Suspicious activity\n\nType /security to check your status.',
        senderId: 'security-bot',
        createdAt: new Date(Date.now() - 259200000), // 3 days ago
        isRead: true
      },
      {
        _id: 'security2',
        content: '✅ Security Scan Complete\n\n🛡️ Your Account Status:\n\n✅ Password: Strong\n✅ 2FA: Enabled\n✅ Recovery Email: Verified\n✅ Login History: Normal\n⚠️ Last Password Change: 45 days ago\n\n💡 Recommendation: Update password every 60 days',
        senderId: 'security-bot',
        createdAt: new Date(Date.now() - 172800000), // 2 days ago
        isRead: true
      },
      {
        _id: 'security3',
        content: '🚨 New Login Detected!\n\n📱 Device: Chrome on Windows\n📍 Location: New York, USA\n🕐 Time: Nov 21, 2025 at 2:45 PM\n🌐 IP: 192.168.1.105\n\n✅ Was this you?\n\nIf not, secure your account immediately!',
        senderId: 'security-bot',
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
        isRead: true
      },
      {
        _id: 'security4',
        content: '⚠️ Suspicious Activity Alert\n\n🔍 Detected:\n• 5 failed login attempts\n• Location: Unknown (VPN detected)\n• Time: Today at 3:20 AM\n\n🔒 Action taken:\n• Account temporarily locked\n• Verification email sent\n\nPlease verify your identity.',
        senderId: 'security-bot',
        createdAt: new Date(Date.now() - 43200000), // 12 hours ago
        isRead: true
      },
      {
        _id: 'security5',
        content: '/security',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 28800000), // 8 hours ago
        isRead: true
      },
      {
        _id: 'security6',
        content: '🔐 Security Dashboard\n\n🛡️ Protection Level: High\n\n✅ Active Sessions: 3\n• Chrome (Windows) - Current\n• Safari (iPhone) - 2 hours ago\n• Firefox (Mac) - Yesterday\n\n🔑 Recent Activity:\n• Password changed: 45 days ago\n• 2FA verified: Today\n• Email updated: 3 months ago',
        senderId: 'security-bot',
        createdAt: new Date(Date.now() - 28740000),
        isRead: true
      },
      {
        _id: 'security7',
        content: '🔔 2FA Code Request\n\nVerification code: 847392\n\n⏰ Valid for: 5 minutes\n📱 Requested from: iPhone 14 Pro\n📍 Location: San Francisco, CA\n\nDon\'t share this code with anyone!',
        senderId: 'security-bot',
        createdAt: new Date(Date.now() - 14400000), // 4 hours ago
        isRead: true
      },
      {
        _id: 'security8',
        content: '⚡ Security Update Available\n\n🆕 New Features:\n• Biometric authentication\n• Enhanced encryption\n• Real-time threat detection\n• Secure backup codes\n\n📥 Update now for better protection!',
        senderId: 'security-bot',
        createdAt: new Date(Date.now() - 7200000), // 2 hours ago
        isRead: false
      },
      {
        _id: 'security9',
        content: '🎉 Security Milestone!\n\n🏆 Account Age: 1 Year\n\n📊 Your Security Stats:\n• Zero breaches: ✅\n• 2FA uptime: 100%\n• Password strength: Excellent\n• Avg. response time: 2 minutes\n\nKeep up the great security habits!',
        senderId: 'security-bot',
        createdAt: new Date(Date.now() - 3600000), // 1 hour ago
        isRead: false
      },
      {
        _id: 'security10',
        content: '⚠️ Data Breach Alert\n\n🔍 Your email found in recent breach:\nWebsite: oldservice.com\nDate: Nov 2025\nData exposed: Email, Username\n\n✅ Your password is safe (different)\n\n💡 Recommendation:\n• Change password on oldservice.com\n• Enable 2FA if available',
        senderId: 'security-bot',
        createdAt: new Date(Date.now() - 1800000), // 30 minutes ago
        isRead: false
      }
    ],
    // Travel Bot Messages
    '42': [
      {
        _id: 'travel1',
        content: '✈️ Welcome to Travel Bot!\n\nFind amazing travel deals:\n• Flight bookings\n• Hotel reservations\n• Travel packages\n• Destination guides\n• Price alerts\n\nType /destinations to explore!',
        senderId: 'travel-bot',
        createdAt: new Date(Date.now() - 259200000), // 3 days ago
        isRead: true
      },
      {
        _id: 'travel2',
        content: '🔥 Flash Deal Alert!\n\n✈️ New York to Paris\n\n💰 Price: $299 (Save $450!)\n📅 Dates: Dec 15-22, 2025\n🎫 Seats: 12 remaining\n⏰ Expires: 6 hours\n\n🏨 Hotel included:\n• 4-star near Eiffel Tower\n• Breakfast included\n\nBook now!',
        senderId: 'travel-bot',
        createdAt: new Date(Date.now() - 172800000), // 2 days ago
        isRead: true
      },
      {
        _id: 'travel3',
        content: '🌴 Top Destinations This Month\n\n1️⃣ Bali, Indonesia 🏝️\n   From $450 | 5★ Resorts\n\n2️⃣ Tokyo, Japan 🗼\n   From $680 | Cultural Tours\n\n3️⃣ Barcelona, Spain 🏖️\n   From $520 | Beach & City\n\n4️⃣ Dubai, UAE 🏙️\n   From $590 | Luxury Stays\n\nTap to see details!',
        senderId: 'travel-bot',
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
        isRead: true
      },
      {
        _id: 'travel4',
        content: '📍 Destination Spotlight: Maldives\n\n🏝️ Paradise Awaits!\n\n🌟 Highlights:\n• Crystal clear waters\n• Overwater bungalows\n• World-class diving\n• Romantic getaways\n\n💰 Packages from $1,299\n📅 Best time: Nov-Apr\n⭐ Rating: 4.9/5 (12,450 reviews)',
        senderId: 'travel-bot',
        createdAt: new Date(Date.now() - 43200000), // 12 hours ago
        isRead: true
      },
      {
        _id: 'travel5',
        content: '🎫 Your Booking Confirmed!\n\n✈️ Flight Details:\nRoute: LAX → LHR\nDate: Dec 10, 2025\nTime: 6:45 PM\nFlight: BA 269\nSeat: 12A (Window)\n\n🏨 Hotel: The Savoy London\nCheck-in: Dec 10\nCheck-out: Dec 15\nRoom: Deluxe King\n\n📧 Confirmation sent to email',
        senderId: 'travel-bot',
        createdAt: new Date(Date.now() - 28800000), // 8 hours ago
        isRead: true
      },
      {
        _id: 'travel6',
        content: '⏰ Price Drop Alert!\n\n🎯 Your Saved Search:\nLos Angeles → Tokyo\n\nWas: $850\nNow: $620 💰\nSavings: $230 (27% off)\n\n📅 Available dates:\n• Jan 15-22\n• Feb 5-12\n• Mar 10-17\n\nPrices may increase soon!',
        senderId: 'travel-bot',
        createdAt: new Date(Date.now() - 14400000), // 4 hours ago
        isRead: true
      },
      {
        _id: 'travel7',
        content: '🗺️ Travel Itinerary: Europe Tour\n\nDay 1-3: Paris 🇫🇷\n• Eiffel Tower\n• Louvre Museum\n• Seine River Cruise\n\nDay 4-6: Rome 🇮🇹\n• Colosseum\n• Vatican City\n• Trevi Fountain\n\nDay 7-9: Barcelona 🇪🇸\n• Sagrada Familia\n• Park Güell\n• Beach time\n\n💰 Total: $2,450 per person',
        senderId: 'travel-bot',
        createdAt: new Date(Date.now() - 7200000), // 2 hours ago
        isRead: false
      },
      {
        _id: 'travel8',
        content: '✅ Check-in Reminder\n\n✈️ Flight Tomorrow!\n\nFlight: BA 269 to London\nDeparture: 6:45 PM\nTerminal: 4\nGate: Opens 3 hours before\n\n📱 Mobile boarding pass ready\n🎒 Baggage allowance: 2 bags\n\n💡 Arrive 3 hours early for international flights',
        senderId: 'travel-bot',
        createdAt: new Date(Date.now() - 3600000), // 1 hour ago
        isRead: false
      },
      {
        _id: 'travel9',
        content: '🌟 Travel Rewards Update\n\n🎁 Your Points: 15,420\n\n🏆 Tier: Gold Member\n\nBenefits unlocked:\n✅ Priority boarding\n✅ Free seat selection\n✅ 2x points on bookings\n✅ Lounge access\n\n💰 Points value: $308\nNext tier: Platinum (20,000 pts)',
        senderId: 'travel-bot',
        createdAt: new Date(Date.now() - 1800000), // 30 minutes ago
        isRead: false
      },
      {
        _id: 'travel10',
        content: '📸 Travel Inspiration\n\n🌅 Santorini, Greece\n\n"Sunset views that take your breath away"\n\n⭐ Must-do:\n• Watch sunset in Oia\n• Wine tasting tours\n• Blue dome churches\n• Volcanic beach\n\n💰 From $890 | 5 nights\n📅 Best: Apr-Oct\n\n🔖 Save for later?',
        senderId: 'travel-bot',
        createdAt: new Date(Date.now() - 900000), // 15 minutes ago
        isRead: false
      }
    ],
    // Link Bot Messages
    '77': [
      {
        _id: 'link1',
        content: '🔗 Welcome to Link Bot!\n\nI generate link previews:\n• Website previews\n• Social media posts\n• Video thumbnails\n• Article summaries\n• QR codes\n\nSend me a link to get started!',
        senderId: 'link-bot',
        createdAt: new Date(Date.now() - 259200000), // 3 days ago
        isRead: true
      },
      {
        _id: 'link2',
        content: '📰 Link Preview Generated\n\n🔗 techcrunch.com/ai-breakthrough\n\n📌 Title:\n"AI Achieves Human-Level Performance in Complex Tasks"\n\n📝 Description:\nResearchers announce major breakthrough in artificial intelligence, demonstrating human-level performance across multiple domains...\n\n📸 Thumbnail: ✅\n⏱️ Read time: 5 min',
        senderId: 'link-bot',
        createdAt: new Date(Date.now() - 172800000), // 2 days ago
        isRead: true
      },
      {
        _id: 'link3',
        content: '🎥 YouTube Video Preview\n\n🔗 youtube.com/watch?v=abc123\n\n📺 Title:\n"How to Build a React App in 2025"\n\n👤 Channel: Code Academy\n⏱️ Duration: 24:35\n👁️ Views: 1.2M\n👍 Likes: 45K\n📅 Published: 2 days ago\n\n🎬 Click to watch',
        senderId: 'link-bot',
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
        isRead: true
      },
      {
        _id: 'link4',
        content: '📱 QR Code Generated\n\n🔗 For: https://mywebsite.com\n\n✅ QR Code Features:\n• High resolution\n• Error correction: Medium\n• Format: PNG\n• Size: 512x512px\n\n📥 Download: qr.app/abc123\n\n💡 Perfect for business cards!',
        senderId: 'link-bot',
        createdAt: new Date(Date.now() - 43200000), // 12 hours ago
        isRead: true
      },
      {
        _id: 'link5',
        content: '🛍️ Product Link Preview\n\n🔗 amazon.com/product/xyz\n\n📦 Product:\niPhone 15 Pro Max - 256GB\n\n💰 Price: $999.99\n⭐ Rating: 4.8/5 (12,340 reviews)\n📦 In Stock: Yes\n🚚 Shipping: Free 2-day\n\n🎯 Deal: Save $200 today!',
        senderId: 'link-bot',
        createdAt: new Date(Date.now() - 28800000), // 8 hours ago
        isRead: true
      },
      {
        _id: 'link6',
        content: '📊 GitHub Repository Preview\n\n🔗 github.com/user/awesome-project\n\n📚 Repository:\nawesome-react-components\n\n⭐ Stars: 12.5K\n🍴 Forks: 2.3K\n📝 Description:\nA curated list of awesome React components and libraries\n\n💻 Language: JavaScript\n📅 Updated: 2 hours ago',
        senderId: 'link-bot',
        createdAt: new Date(Date.now() - 14400000), // 4 hours ago
        isRead: true
      },
      {
        _id: 'link7',
        content: '🎵 Spotify Track Preview\n\n🔗 spotify.com/track/xyz123\n\n🎵 Song:\n"Bohemian Rhapsody"\n\n🎤 Artist: Queen\n💿 Album: A Night at the Opera\n⏱️ Duration: 5:55\n🔥 Popularity: 98/100\n\n🎧 Listen now on Spotify',
        senderId: 'link-bot',
        createdAt: new Date(Date.now() - 7200000), // 2 hours ago
        isRead: false
      },
      {
        _id: 'link8',
        content: '🌐 Website Analytics\n\n🔗 Link: mywebsite.com/blog\n\n📊 Performance:\n• Load time: 1.2s ⚡\n• Mobile friendly: ✅\n• SSL secure: ✅\n• SEO score: 95/100\n\n📈 Estimated traffic:\n• Monthly visits: 45K\n• Bounce rate: 32%\n• Avg. session: 4m 20s',
        senderId: 'link-bot',
        createdAt: new Date(Date.now() - 3600000), // 1 hour ago
        isRead: false
      },
      {
        _id: 'link9',
        content: '📸 Instagram Post Preview\n\n🔗 instagram.com/p/abc123\n\n👤 User: @travel_explorer\n❤️ Likes: 12.5K\n💬 Comments: 234\n📅 Posted: 3 hours ago\n\n📝 Caption:\n"Sunset vibes in Santorini 🌅✨"\n\n🏷️ Tags: #travel #greece #sunset',
        senderId: 'link-bot',
        createdAt: new Date(Date.now() - 1800000), // 30 minutes ago
        isRead: false
      },
      {
        _id: 'link10',
        content: '🔐 Short Link Created\n\n🔗 Original:\nhttps://verylongwebsiteurl.com/article/2025/...\n\n✂️ Shortened:\nshort.link/abc123\n\n📊 Features:\n• Custom alias available\n• Click tracking: Enabled\n• Expiry: Never\n• Password: Optional\n\n📈 Track clicks in real-time!',
        senderId: 'link-bot',
        createdAt: new Date(Date.now() - 900000), // 15 minutes ago
        isRead: false
      }
    ],
    // Password Bot Messages
    '47': [
      {
        _id: 'password1',
        content: '🔑 Welcome to Password Bot!\n\nI help manage your passwords:\n• Generate secure passwords\n• Password strength checker\n• Breach monitoring\n• Password vault\n• Auto-fill support\n\nType /generate for a new password!',
        senderId: 'password-bot',
        createdAt: new Date(Date.now() - 259200000), // 3 days ago
        isRead: true
      },
      {
        _id: 'password2',
        content: '🔐 Secure Password Generated\n\nPassword: K9#mX2$pL8@v4Tn\n\n✅ Strength: Very Strong\n\n📊 Analysis:\n• Length: 16 characters\n• Uppercase: ✅\n• Lowercase: ✅\n• Numbers: ✅\n• Symbols: ✅\n• Entropy: 95 bits\n\n⏱️ Time to crack: 2 billion years\n\n💾 Save to vault?',
        senderId: 'password-bot',
        createdAt: new Date(Date.now() - 172800000), // 2 days ago
        isRead: true
      },
      {
        _id: 'password3',
        content: '⚠️ Weak Password Detected\n\nWebsite: myaccount.com\nPassword: password123\n\n🔴 Strength: Very Weak\n\n❌ Issues:\n• Too common\n• No symbols\n• Dictionary word\n• Easily guessable\n\n💡 Generate a stronger password?\n\n⏱️ Time to crack: 2 seconds',
        senderId: 'password-bot',
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
        isRead: true
      },
      {
        _id: 'password4',
        content: '/generate',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 43200000), // 12 hours ago
        isRead: true
      },
      {
        _id: 'password5',
        content: '🎲 Custom Password Options\n\nChoose your preferences:\n\n📏 Length:\n• 12 characters (Recommended)\n• 16 characters (Very Strong)\n• 20 characters (Maximum)\n\n🔤 Include:\n✅ Uppercase (A-Z)\n✅ Lowercase (a-z)\n✅ Numbers (0-9)\n✅ Symbols (!@#$%)\n\n🚫 Exclude:\n• Ambiguous (0,O,l,1)\n\nGenerate now?',
        senderId: 'password-bot',
        createdAt: new Date(Date.now() - 43140000),
        isRead: true
      },
      {
        _id: 'password6',
        content: '💾 Password Vault Summary\n\n🔐 Stored Passwords: 47\n\n📊 Security Status:\n✅ Strong: 32 (68%)\n⚠️ Medium: 12 (26%)\n🔴 Weak: 3 (6%)\n\n🔄 Reused passwords: 5\n⏰ Old passwords (>90 days): 8\n\n💡 Action needed:\n• Update 3 weak passwords\n• Change 5 reused passwords',
        senderId: 'password-bot',
        createdAt: new Date(Date.now() - 28800000), // 8 hours ago
        isRead: true
      },
      {
        _id: 'password7',
        content: '🚨 Data Breach Alert!\n\n⚠️ Password compromised:\nWebsite: oldsite.com\nUsername: user@email.com\n\n🔍 Found in breach:\nDate: Nov 2025\nRecords: 2.5M accounts\n\n✅ Action taken:\n• Password flagged\n• Notification sent\n\n🔑 Change password immediately!\nNew password generated: Ready',
        senderId: 'password-bot',
        createdAt: new Date(Date.now() - 14400000), // 4 hours ago
        isRead: true
      },
      {
        _id: 'password8',
        content: '🔄 Password Updated Successfully\n\nWebsite: banking.com\nOld password: ••••••••\nNew password: ••••••••••••••••\n\n✅ Strength: Very Strong\n📅 Last changed: Just now\n🔔 Next reminder: 60 days\n\n💾 Saved to vault\n🔐 Encrypted with AES-256',
        senderId: 'password-bot',
        createdAt: new Date(Date.now() - 7200000), // 2 hours ago
        isRead: false
      },
      {
        _id: 'password9',
        content: '🎯 Password Health Report\n\n📊 Overall Score: 85/100 (Good)\n\n✅ Strengths:\n• Most passwords are strong\n• Regular updates\n• 2FA enabled on 80% accounts\n\n⚠️ Improvements:\n• 5 reused passwords\n• 3 weak passwords\n• 8 passwords >90 days old\n\n📈 Last month: 78/100 (+7)',
        senderId: 'password-bot',
        createdAt: new Date(Date.now() - 3600000), // 1 hour ago
        isRead: false
      },
      {
        _id: 'password10',
        content: '🔐 Passphrase Generated\n\nPassphrase:\n"Correct-Horse-Battery-Staple-2025"\n\n✅ Strength: Very Strong\n\n📊 Details:\n• Words: 5\n• Separator: Hyphen\n• Number: Included\n• Length: 37 characters\n• Memorable: ✅\n• Entropy: 89 bits\n\n💡 Easy to remember, hard to crack!',
        senderId: 'password-bot',
        createdAt: new Date(Date.now() - 1800000), // 30 minutes ago
        isRead: false
      }
    ],
    // Shopping Bot Messages
    '43': [
      {
        _id: 'shopping1',
        content: '🛍️ Welcome to Shopping Bot!\n\nFind the best deals:\n• Product search\n• Price tracking\n• Deal alerts\n• Wishlist management\n• Order tracking\n\nType /deals to see today\'s offers!',
        senderId: 'shopping-bot',
        createdAt: new Date(Date.now() - 259200000), // 3 days ago
        isRead: true
      },
      {
        _id: 'shopping2',
        content: '🔥 Daily Deals - Black Friday Preview!\n\n1️⃣ iPhone 15 Pro: $999 (20% off)\n   Was: $1,249 | Save: $250\n\n2️⃣ AirPods Pro: $179 (28% off)\n   Was: $249 | Save: $70\n\n3️⃣ MacBook Air M2: $899 (25% off)\n   Was: $1,199 | Save: $300\n\n⏰ Ends in 6 hours!\n🚚 Free shipping on all items',
        senderId: 'shopping-bot',
        createdAt: new Date(Date.now() - 172800000), // 2 days ago
        isRead: true
      },
      {
        _id: 'shopping3',
        content: '📦 Order Shipped!\n\nOrder #12345\n\n📱 iPhone 15 Pro - 256GB\nColor: Titanium Blue\nPrice: $999.00\n\n🚚 Shipping Details:\nCarrier: FedEx\nTracking: FDX123456789\nEstimated Delivery: Nov 24, 2025\n\n📍 Track your package in real-time!',
        senderId: 'shopping-bot',
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
        isRead: true
      },
      {
        _id: 'shopping4',
        content: '💰 Price Drop Alert!\n\n🎯 Your Wishlist Item:\nSony WH-1000XM5 Headphones\n\nWas: $399.99\nNow: $299.99 💸\nSavings: $100 (25% off)\n\n⭐ Rating: 4.8/5 (8,450 reviews)\n📦 In Stock: Yes\n🚚 Free Shipping\n\nBuy now before price increases!',
        senderId: 'shopping-bot',
        createdAt: new Date(Date.now() - 43200000), // 12 hours ago
        isRead: true
      },
      {
        _id: 'shopping5',
        content: '/deals',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 28800000), // 8 hours ago
        isRead: true
      },
      {
        _id: 'shopping6',
        content: '🎁 Today\'s Top Deals\n\n💻 Electronics:\n• iPad Air: $499 (17% off)\n• Samsung TV 55": $599 (33% off)\n• PS5 Console: $449 (10% off)\n\n👕 Fashion:\n• Nike Sneakers: $79 (35% off)\n• Levi\'s Jeans: $39 (50% off)\n\n🏠 Home:\n• Dyson Vacuum: $299 (40% off)\n• Instant Pot: $79 (45% off)\n\nTap any item for details!',
        senderId: 'shopping-bot',
        createdAt: new Date(Date.now() - 28740000),
        isRead: true
      },
      {
        _id: 'shopping7',
        content: '⭐ Product Recommendation\n\nBased on your browsing:\n\n📱 Samsung Galaxy S24 Ultra\n\n💰 Price: $1,099 (15% off)\n⭐ Rating: 4.7/5 (5,230 reviews)\n\n✨ Features:\n• 200MP Camera\n• S Pen included\n• 5000mAh battery\n• 1TB storage option\n\n🎯 Why you\'ll love it:\nSimilar to iPhone 15 Pro but with S Pen!',
        senderId: 'shopping-bot',
        createdAt: new Date(Date.now() - 14400000), // 4 hours ago
        isRead: true
      },
      {
        _id: 'shopping8',
        content: '🎉 Cashback Earned!\n\n💰 Your Rewards:\n\nRecent Purchase:\niPhone 15 Pro - $999\n\nCashback: $49.95 (5%)\nBonus Points: 999 pts\n\n🏆 Total Rewards Balance:\n• Cash: $127.50\n• Points: 12,450 pts\n\nRedeem anytime for discounts!',
        senderId: 'shopping-bot',
        createdAt: new Date(Date.now() - 7200000), // 2 hours ago
        isRead: false
      },
      {
        _id: 'shopping9',
        content: '📦 Delivery Update\n\n✅ Package Delivered!\n\nOrder #12345\niPhone 15 Pro - 256GB\n\n📍 Delivered to: Front Door\n📸 Photo proof available\n⏰ Time: Today at 2:30 PM\n\nEnjoy your new device! 🎉\n\nRate your delivery experience?',
        senderId: 'shopping-bot',
        createdAt: new Date(Date.now() - 3600000), // 1 hour ago
        isRead: false
      },
      {
        _id: 'shopping10',
        content: '🛒 Cart Reminder\n\n⚠️ Items in your cart:\n\n1. AirPods Pro - $179\n2. iPhone Case - $29\n3. Screen Protector - $15\n\nTotal: $223\nSavings: $76 (25% off)\n\n⏰ Deals expire in 3 hours!\n\n💳 Complete checkout now?',
        senderId: 'shopping-bot',
        createdAt: new Date(Date.now() - 1800000), // 30 minutes ago
        isRead: false
      }
    ],
    // Learning Bot Messages
    '44': [
      {
        _id: 'learning1',
        content: '📚 Welcome to Learning Bot!\n\nExpand your knowledge:\n• Online courses\n• Skill tracking\n• Certifications\n• Study reminders\n• Progress reports\n\nType /courses to explore!',
        senderId: 'learning-bot',
        createdAt: new Date(Date.now() - 259200000), // 3 days ago
        isRead: true
      },
      {
        _id: 'learning2',
        content: '🎓 Course Completed!\n\n✅ JavaScript: Async/Await\n\n📊 Your Results:\n• Final Score: 95%\n• Time: 4 hours 30 mins\n• Exercises: 24/25 correct\n• Rank: Top 5%\n\n🏆 Certificate earned!\n📥 Download: learn.app/cert/js-async\n\nReady for the next lesson?',
        senderId: 'learning-bot',
        createdAt: new Date(Date.now() - 172800000), // 2 days ago
        isRead: true
      },
      {
        _id: 'learning3',
        content: '🔔 Daily Learning Reminder\n\n📖 Today\'s Lesson:\nReact Hooks - useEffect\n\n⏱️ Duration: 45 minutes\n📊 Progress: 60% complete\n\n🎯 Learning Streak: 12 days 🔥\n\nDon\'t break your streak!\nStart lesson now?',
        senderId: 'learning-bot',
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
        isRead: true
      },
      {
        _id: 'learning4',
        content: '🌟 Recommended Courses\n\nBased on your interests:\n\n1️⃣ Advanced React Patterns\n   ⭐ 4.9/5 | 12 hours | $49\n\n2️⃣ Node.js Masterclass\n   ⭐ 4.8/5 | 20 hours | $59\n\n3️⃣ TypeScript Deep Dive\n   ⭐ 4.9/5 | 15 hours | $54\n\n🎁 Bundle discount: Save 30%\nEnroll in all 3 for $119!',
        senderId: 'learning-bot',
        createdAt: new Date(Date.now() - 43200000), // 12 hours ago
        isRead: true
      },
      {
        _id: 'learning5',
        content: '/courses',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 28800000), // 8 hours ago
        isRead: true
      },
      {
        _id: 'learning6',
        content: '📚 Your Active Courses\n\n1️⃣ React Advanced (60% complete)\n   Next: Custom Hooks\n   Due: 3 days\n\n2️⃣ Python for Data Science (35%)\n   Next: Pandas Basics\n   Due: 1 week\n\n3️⃣ AWS Cloud Practitioner (80%)\n   Next: Final Exam\n   Due: 2 days\n\n🎯 Overall Progress: 58%\n⏰ Study time this week: 8h 45m',
        senderId: 'learning-bot',
        createdAt: new Date(Date.now() - 28740000),
        isRead: true
      },
      {
        _id: 'learning7',
        content: '🎯 Quiz Time!\n\nReact Hooks - Quick Quiz\n\nQuestion 1/5:\nWhat does useEffect do?\n\nA) Manages state\nB) Handles side effects\nC) Creates refs\nD) Memoizes values\n\n⏰ Time limit: 30 seconds\n💡 Hint: Think lifecycle methods\n\nReply with A, B, C, or D',
        senderId: 'learning-bot',
        createdAt: new Date(Date.now() - 14400000), // 4 hours ago
        isRead: true
      },
      {
        _id: 'learning8',
        content: '✅ Correct Answer!\n\nB) Handles side effects ✓\n\n📊 Quiz Progress: 4/5\nScore: 100% so far\n\nFinal Question:\nWhen does useEffect cleanup run?\n\nA) Before component mounts\nB) After every render\nC) Before component unmounts\nD) Only on first render\n\n⏰ 30 seconds remaining...',
        senderId: 'learning-bot',
        createdAt: new Date(Date.now() - 14340000),
        isRead: true
      },
      {
        _id: 'learning9',
        content: '🏆 Achievement Unlocked!\n\n🎖️ "Speed Learner"\nComplete 5 lessons in one day\n\n📊 Your Stats:\n• Courses completed: 12\n• Certificates earned: 8\n• Study hours: 145\n• Current streak: 12 days\n\n🌟 Level: Intermediate → Advanced\n\nKeep up the great work!',
        senderId: 'learning-bot',
        createdAt: new Date(Date.now() - 7200000), // 2 hours ago
        isRead: false
      },
      {
        _id: 'learning10',
        content: '📈 Weekly Progress Report\n\nWeek of Nov 15-22, 2025\n\n⏰ Study Time: 12h 30m (+2h)\n✅ Lessons Completed: 8\n🎯 Quizzes Passed: 6/6 (100%)\n📚 Courses Active: 3\n\n🔥 Streak: 12 days\n🏆 Rank: Top 10% globally\n\n💡 Next Goal:\nComplete React course by Nov 25\n\nYou\'re doing amazing! 🌟',
        senderId: 'learning-bot',
        createdAt: new Date(Date.now() - 3600000), // 1 hour ago
        isRead: false
      }
    ],
    // Task Bot Messages
    '37': [
      {
        _id: 'task1',
        content: '✅ Welcome to Task Bot!\n\nStay organized and productive:\n• Create tasks\n• Set reminders\n• Track progress\n• Manage deadlines\n• Team collaboration\n\nType /tasks to see your list!',
        senderId: 'task-bot',
        createdAt: new Date(Date.now() - 259200000), // 3 days ago
        isRead: true
      },
      {
        _id: 'task2',
        content: '🔔 Task Reminder\n\n📋 Task: "Review code"\n\n⏰ Due: Today at 5:00 PM\n🏷️ Priority: High\n📁 Project: Web Dashboard\n\n⚠️ Due in 2 hours!\n\n✅ Mark as complete?\n⏰ Snooze for 30 mins?',
        senderId: 'task-bot',
        createdAt: new Date(Date.now() - 172800000), // 2 days ago
        isRead: true
      },
      {
        _id: 'task3',
        content: '✅ Task Completed!\n\n📋 "Review code" marked as done\n\n⏱️ Completed: On time\n📊 Time spent: 1h 30m\n🎯 Quality: Excellent\n\n🏆 Productivity Streak: 5 days\n\nGreat job! 🎉\n\nNext task: "Update documentation"',
        senderId: 'task-bot',
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
        isRead: true
      },
      {
        _id: 'task4',
        content: '📊 Daily Summary\n\nToday\'s Tasks:\n\n✅ Completed: 5\n⏰ Pending: 3\n🔴 Overdue: 1\n\n🎯 Completion Rate: 83%\n⏱️ Total Time: 6h 45m\n\n🔥 Most Productive:\n2:00 PM - 4:00 PM\n\nTomorrow\'s tasks: 4 scheduled',
        senderId: 'task-bot',
        createdAt: new Date(Date.now() - 43200000), // 12 hours ago
        isRead: true
      },
      {
        _id: 'task5',
        content: '/tasks',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 28800000), // 8 hours ago
        isRead: true
      },
      {
        _id: 'task6',
        content: '📋 Your Task List\n\n🔴 High Priority:\n• Fix login bug (Due: Today)\n• Client presentation (Due: Tomorrow)\n\n🟡 Medium Priority:\n• Update documentation (Due: Nov 25)\n• Code review PR #142 (Due: Nov 24)\n\n🟢 Low Priority:\n• Refactor old code (Due: Nov 30)\n• Update dependencies (Due: Dec 1)\n\n📊 Total: 6 tasks\n⏰ 2 due today',
        senderId: 'task-bot',
        createdAt: new Date(Date.now() - 28740000),
        isRead: true
      },
      {
        _id: 'task7',
        content: '⚠️ Overdue Task Alert!\n\n📋 Task: "Submit expense report"\n\n🔴 Status: 2 days overdue\n📅 Original Due: Nov 20, 2025\n🏷️ Priority: Medium\n\n💡 Action needed:\nPlease complete or reschedule\n\n⏰ Reschedule?\n✅ Mark as complete?',
        senderId: 'task-bot',
        createdAt: new Date(Date.now() - 14400000), // 4 hours ago
        isRead: true
      },
      {
        _id: 'task8',
        content: '🎯 New Task Assigned\n\n📋 Task: "Prepare Q4 report"\n\n👤 Assigned by: @manager\n📅 Due: Nov 28, 2025\n🏷️ Priority: High\n📁 Project: Finance\n\n📝 Description:\nCompile Q4 financial data and create presentation for board meeting.\n\n✅ Accept task?',
        senderId: 'task-bot',
        createdAt: new Date(Date.now() - 7200000), // 2 hours ago
        isRead: false
      },
      {
        _id: 'task9',
        content: '🏆 Productivity Milestone!\n\n🎉 100 Tasks Completed!\n\n📊 Your Stats:\n• Total tasks: 100\n• On-time: 92 (92%)\n• Average time: 2h 15m\n• Longest streak: 15 days\n\n🌟 Achievements:\n✅ Early Bird (10 tasks before 9 AM)\n✅ Night Owl (5 tasks after 8 PM)\n✅ Speed Demon (20 tasks in 1 day)\n\nKeep crushing it! 💪',
        senderId: 'task-bot',
        createdAt: new Date(Date.now() - 3600000), // 1 hour ago
        isRead: false
      },
      {
        _id: 'task10',
        content: '📅 Weekly Planning\n\nUpcoming Week (Nov 23-30):\n\nMonday:\n• Team standup (9:00 AM)\n• Fix login bug (High)\n\nTuesday:\n• Client presentation (2:00 PM)\n• Code review (Low)\n\nWednesday:\n• Update docs (Medium)\n\nThursday-Friday:\n• Q4 report prep (High)\n\n💡 Tip: Block 2 hours daily for deep work',
        senderId: 'task-bot',
        createdAt: new Date(Date.now() - 1800000), // 30 minutes ago
        isRead: false
      }
    ],
    // Poll Bot Messages
    '49': [
      {
        _id: 'poll1',
        content: '📊 Welcome to Poll Bot!\n\nCreate and manage polls:\n• Quick polls\n• Multiple choice\n• Anonymous voting\n• Real-time results\n• Export data\n\nType /create to make a poll!',
        senderId: 'poll-bot',
        createdAt: new Date(Date.now() - 259200000), // 3 days ago
        isRead: true
      },
      {
        _id: 'poll2',
        content: '📊 Poll Results: Remote Work Preference\n\n❓ Question: "Do you prefer remote work?"\n\n✅ Yes: 65% (1,247 votes)\n❌ No: 20% (384 votes)\n🤔 Maybe: 15% (288 votes)\n\n👥 Total Votes: 1,919\n⏰ Poll Duration: 24 hours\n📅 Ended: Nov 20, 2025\n\nMajority prefers remote work! 🏠',
        senderId: 'poll-bot',
        createdAt: new Date(Date.now() - 172800000), // 2 days ago
        isRead: true
      },
      {
        _id: 'poll3',
        content: '🗳️ New Poll Created!\n\n📋 Title: "Best Programming Language 2025"\n\n🔘 Options:\nA) JavaScript\nB) Python\nC) TypeScript\nD) Rust\nE) Go\n\n⏰ Duration: 48 hours\n👥 Anonymous: Yes\n🔗 Share: poll.app/prog-2025\n\nVote now! 🚀',
        senderId: 'poll-bot',
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
        isRead: true
      },
      {
        _id: 'poll4',
        content: '📊 Live Poll Update\n\n"Best Programming Language 2025"\n\n🥇 Python: 42% (845 votes)\n🥈 JavaScript: 28% (563 votes)\n🥉 TypeScript: 18% (362 votes)\n4️⃣ Rust: 8% (161 votes)\n5️⃣ Go: 4% (80 votes)\n\n👥 Total: 2,011 votes\n⏰ 24 hours remaining\n\nPython leading! 🐍',
        senderId: 'poll-bot',
        createdAt: new Date(Date.now() - 43200000), // 12 hours ago
        isRead: true
      },
      {
        _id: 'poll5',
        content: '/create',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 28800000), // 8 hours ago
        isRead: true
      },
      {
        _id: 'poll6',
        content: '✨ Create Your Poll\n\nStep 1: Enter your question\n\nExample:\n"What\'s your favorite framework?"\n\n💡 Tips:\n• Keep it clear and concise\n• Avoid bias in wording\n• Make it relevant to audience\n\nType your question below:',
        senderId: 'poll-bot',
        createdAt: new Date(Date.now() - 28740000),
        isRead: true
      },
      {
        _id: 'poll7',
        content: '📊 Poll Settings\n\nQuestion: "What\'s your favorite framework?"\n\n⚙️ Configure:\n\n⏰ Duration:\n• 1 hour\n• 6 hours\n• 24 hours ✓\n• 48 hours\n• 1 week\n\n👤 Voting:\n• Public\n• Anonymous ✓\n\n🔄 Allow changes: Yes ✓\n\nReady to publish?',
        senderId: 'poll-bot',
        createdAt: new Date(Date.now() - 14400000), // 4 hours ago
        isRead: true
      },
      {
        _id: 'poll8',
        content: '🎉 Poll Published!\n\n📋 "What\'s your favorite framework?"\n\nOptions:\n• React\n• Vue\n• Angular\n• Svelte\n\n🔗 Share link: poll.app/framework-2025\n👥 Votes so far: 0\n⏰ Ends: Nov 23, 2:00 PM\n\nShare with your network! 📢',
        senderId: 'poll-bot',
        createdAt: new Date(Date.now() - 7200000), // 2 hours ago
        isRead: false
      },
      {
        _id: 'poll9',
        content: '🔔 Poll Milestone!\n\n"What\'s your favorite framework?"\n\n🎯 100 votes reached!\n\nCurrent Results:\n🥇 React: 58% (58 votes)\n🥈 Vue: 24% (24 votes)\n🥉 Svelte: 12% (12 votes)\n4️⃣ Angular: 6% (6 votes)\n\n⏰ 22 hours remaining\nKeep voting! 🚀',
        senderId: 'poll-bot',
        createdAt: new Date(Date.now() - 3600000), // 1 hour ago
        isRead: false
      },
      {
        _id: 'poll10',
        content: '📈 Poll Analytics\n\nYour Polls This Month:\n\n📊 Total Created: 12\n👥 Total Votes: 8,450\n⭐ Avg. Participation: 704 votes\n🏆 Most Popular:\n"Remote Work Preference" (1,919 votes)\n\n📍 Top Locations:\n• USA: 45%\n• UK: 18%\n• India: 15%\n\n🎯 Engagement Rate: 87%',
        senderId: 'poll-bot',
        createdAt: new Date(Date.now() - 1800000), // 30 minutes ago
        isRead: false
      }
    ],
    // Email Bot Messages
    '73': [
      {
        _id: 'email1',
        content: '📧 Welcome to Email Bot!\n\nManage your inbox efficiently:\n• Email summaries\n• Smart filters\n• Quick replies\n• Unsubscribe helper\n• Priority inbox\n\nType /inbox to check emails!',
        senderId: 'email-bot',
        createdAt: new Date(Date.now() - 259200000), // 3 days ago
        isRead: true
      },
      {
        _id: 'email2',
        content: '📬 You have 12 unread emails\n\n🔴 High Priority (3):\n• Client proposal deadline\n• Team meeting reschedule\n• Security alert\n\n🟡 Medium Priority (5):\n• Newsletter: Tech Weekly\n• Invoice #12345\n• Project update\n\n🟢 Low Priority (4):\n• Promotional offers\n• Social notifications\n\nView inbox?',
        senderId: 'email-bot',
        createdAt: new Date(Date.now() - 172800000), // 2 days ago
        isRead: true
      },
      {
        _id: 'email3',
        content: '🚨 Important Email Alert\n\nFrom: client@company.com\nSubject: Urgent: Proposal Deadline\n\n📝 Summary:\nClient requesting final proposal by EOD tomorrow. Needs pricing details and timeline confirmation.\n\n⏰ Action Required: 24 hours\n🏷️ Category: Work\n\n💬 Quick Replies:\n• Confirm receipt\n• Request extension\n• Send proposal',
        senderId: 'email-bot',
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
        isRead: true
      },
      {
        _id: 'email4',
        content: '✅ Email Sent Successfully\n\nTo: client@company.com\nSubject: Re: Proposal Deadline\n\n📧 Message:\n"Thank you for your email. I\'ll send the complete proposal by 5 PM tomorrow with all requested details."\n\n⏰ Sent: Nov 21, 3:45 PM\n📎 Attachments: 0\n✓ Read receipt: Enabled\n\nTracking delivery...',
        senderId: 'email-bot',
        createdAt: new Date(Date.now() - 43200000), // 12 hours ago
        isRead: true
      },
      {
        _id: 'email5',
        content: '/inbox',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 28800000), // 8 hours ago
        isRead: true
      },
      {
        _id: 'email6',
        content: '📥 Inbox Overview\n\n📊 Today\'s Stats:\n• Received: 24 emails\n• Sent: 8 emails\n• Unread: 12\n• Starred: 3\n\n📁 By Category:\n• Work: 15\n• Personal: 5\n• Newsletters: 3\n• Promotions: 1\n\n⏰ Response Time: 2h 15m avg\n✅ Inbox Zero: 50% this week',
        senderId: 'email-bot',
        createdAt: new Date(Date.now() - 28740000),
        isRead: true
      },
      {
        _id: 'email7',
        content: '🗑️ Cleanup Suggestions\n\n💡 Found 45 emails to clean:\n\n📰 Newsletters (never opened): 23\n🛍️ Promotions (expired): 12\n📧 Old threads (>30 days): 10\n\n💾 Space to save: 125 MB\n\n🔘 Actions:\n• Unsubscribe from 5 lists\n• Archive old threads\n• Delete promotions\n\nClean up now?',
        senderId: 'email-bot',
        createdAt: new Date(Date.now() - 14400000), // 4 hours ago
        isRead: true
      },
      {
        _id: 'email8',
        content: '✨ Smart Filter Created\n\n🎯 Filter Name: "Client Emails"\n\nRules:\n• From: *@client.com\n• Auto-label: Important\n• Notify: Immediately\n• Star: Yes\n\n📊 Applied to:\n• 15 existing emails\n• All future emails\n\nFilter active! ✅',
        senderId: 'email-bot',
        createdAt: new Date(Date.now() - 7200000), // 2 hours ago
        isRead: false
      },
      {
        _id: 'email9',
        content: '📧 Email Digest - Morning\n\n🌅 Good morning!\n\nOvernight Activity:\n• 8 new emails\n• 2 require response\n• 1 meeting invite\n\n🔥 Top Priority:\n"Q4 Budget Review" from CFO\n\n📅 Today\'s Meetings:\n• 10:00 AM - Team Standup\n• 2:00 PM - Client Call\n\nHave a productive day! ☕',
        senderId: 'email-bot',
        createdAt: new Date(Date.now() - 3600000), // 1 hour ago
        isRead: false
      },
      {
        _id: 'email10',
        content: '🎉 Inbox Achievement!\n\n🏆 Inbox Zero Reached!\n\nYou\'ve cleared all emails! 🎊\n\n📊 Stats:\n• Emails processed: 24\n• Time taken: 45 minutes\n• Avg. response: 1m 30s\n\n🌟 Streak: 3 days\n\n💡 Tip: Set aside 30 mins daily for email management.\n\nKeep it up! 💪',
        senderId: 'email-bot',
        createdAt: new Date(Date.now() - 1800000), // 30 minutes ago
        isRead: false
      }
    ],
    // Hashtag Bot Messages
    '78': [
      {
        _id: 'hashtag1',
        content: '🏷️ Welcome to Hashtag Bot!\n\nDiscover trending topics:\n• Trending hashtags\n• Topic analysis\n• Hashtag suggestions\n• Performance tracking\n• Viral content\n\nType /trending to explore!',
        senderId: 'hashtag-bot',
        createdAt: new Date(Date.now() - 259200000), // 3 days ago
        isRead: true
      },
      {
        _id: 'hashtag2',
        content: '🔥 Trending Now - Global\n\n1️⃣ #TechNews (2.5M posts)\n   📈 +340% in 24h\n\n2️⃣ #AI (1.8M posts)\n   📈 +215% in 24h\n\n3️⃣ #WebDev (950K posts)\n   📈 +180% in 24h\n\n4️⃣ #Crypto (720K posts)\n   📈 +125% in 24h\n\n5️⃣ #Startup (580K posts)\n   📈 +95% in 24h\n\n⏰ Updated: 5 mins ago',
        senderId: 'hashtag-bot',
        createdAt: new Date(Date.now() - 172800000), // 2 days ago
        isRead: true
      },
      {
        _id: 'hashtag3',
        content: '📊 Hashtag Analysis: #TechNews\n\n📈 Performance:\n• Total Posts: 2.5M\n• Growth: +340% (24h)\n• Engagement: 15.2M interactions\n• Reach: 45M users\n\n🌍 Top Locations:\n• USA: 35%\n• India: 18%\n• UK: 12%\n\n⏰ Peak Times:\n• 9 AM - 11 AM EST\n• 2 PM - 4 PM EST\n\n💡 Related: #AI #Innovation #Tech',
        senderId: 'hashtag-bot',
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
        isRead: true
      },
      {
        _id: 'hashtag4',
        content: '💡 Hashtag Suggestions\n\nFor your post about "React Tutorial":\n\n🎯 Recommended:\n#React #JavaScript #WebDev\n#Frontend #Coding #Programming\n\n📊 Performance Estimate:\n• Reach: 50K-100K\n• Engagement: 2K-5K\n• Best time: 2 PM EST\n\n🔥 Trending Related:\n#ReactJS #TypeScript #NextJS\n\nUse 5-10 hashtags for best results!',
        senderId: 'hashtag-bot',
        createdAt: new Date(Date.now() - 43200000), // 12 hours ago
        isRead: true
      },
      {
        _id: 'hashtag5',
        content: '/trending',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 28800000), // 8 hours ago
        isRead: true
      },
      {
        _id: 'hashtag6',
        content: '🌟 Trending by Category\n\n💻 Technology:\n#AI #ChatGPT #TechNews #Coding\n\n💼 Business:\n#Startup #Entrepreneur #Marketing\n\n🎨 Design:\n#UIUXDesign #GraphicDesign #Figma\n\n🏋️ Fitness:\n#Workout #HealthyLiving #Fitness\n\n🎮 Gaming:\n#Gaming #Esports #PlayStation\n\nTap category for details!',
        senderId: 'hashtag-bot',
        createdAt: new Date(Date.now() - 28740000),
        isRead: true
      },
      {
        _id: 'hashtag7',
        content: '🚀 Viral Alert!\n\n🔥 #AIRevolution is going viral!\n\n📊 Stats (Last hour):\n• Posts: +15K\n• Growth: +890%\n• Engagement: 2.5M\n• Impressions: 12M\n\n💬 Top Post:\n"AI just changed everything..."\n❤️ 125K likes | 🔄 45K shares\n\n⏰ Jump on this trend now!\n\n💡 Suggested: Create content about AI innovations',
        senderId: 'hashtag-bot',
        createdAt: new Date(Date.now() - 14400000), // 4 hours ago
        isRead: true
      },
      {
        _id: 'hashtag8',
        content: '📈 Your Hashtag Performance\n\nLast 7 Days:\n\n🏆 Best Performing:\n#JavaScript (250K reach)\n#WebDev (180K reach)\n#React (145K reach)\n\n📊 Total Stats:\n• Posts: 24\n• Avg. Reach: 95K\n• Engagement Rate: 8.5%\n• New Followers: +450\n\n🎯 Improvement: +35% vs last week\n\nKeep using trending tags! 🚀',
        senderId: 'hashtag-bot',
        createdAt: new Date(Date.now() - 7200000), // 2 hours ago
        isRead: false
      },
      {
        _id: 'hashtag9',
        content: '🎨 Hashtag Strategy Tips\n\n💡 Best Practices:\n\n1️⃣ Mix popular & niche tags\n   • 3-4 trending (1M+ posts)\n   • 3-4 medium (100K-1M)\n   • 2-3 niche (10K-100K)\n\n2️⃣ Research competitors\n   • See what works for them\n\n3️⃣ Post at peak times\n   • Check analytics\n\n4️⃣ Create branded hashtags\n   • Build community\n\n5️⃣ Track performance\n   • Adjust strategy',
        senderId: 'hashtag-bot',
        createdAt: new Date(Date.now() - 3600000), // 1 hour ago
        isRead: false
      },
      {
        _id: 'hashtag10',
        content: '🔮 Predicted Trends - Tomorrow\n\nBased on AI analysis:\n\n📈 Rising Fast:\n#BlackFriday (Expected: +500%)\n#CyberMonday (Expected: +420%)\n#HolidayShopping (Expected: +380%)\n\n💻 Tech Trends:\n#GPT5 (Expected: +250%)\n#QuantumComputing (Expected: +180%)\n\n💡 Get ahead: Create content now!\n\n⏰ Best posting time: 8 AM EST',
        senderId: 'hashtag-bot',
        createdAt: new Date(Date.now() - 1800000), // 30 minutes ago
        isRead: false
      }
    ],
    // Backup Bot Messages
    '50': [
      {
        _id: 'backup1',
        content: '💾 Welcome to Backup Bot!\n\nProtect your data:\n• Automatic backups\n• Cloud storage\n• Version history\n• Quick restore\n• Encryption\n\nType /status to check backups!',
        senderId: 'backup-bot',
        createdAt: new Date(Date.now() - 259200000), // 3 days ago
        isRead: true
      },
      {
        _id: 'backup2',
        content: '✅ Daily Backup Completed\n\n📅 Date: Nov 20, 2025\n⏰ Time: 2:00 AM\n\n📊 Backup Details:\n• Files: 12,450\n• Size: 8.5 GB\n• Duration: 12 minutes\n• Status: Success ✓\n\n☁️ Stored in: Cloud Storage\n🔐 Encryption: AES-256\n\n📍 Location: us-east-1\n🔄 Next backup: Tonight at 2:00 AM',
        senderId: 'backup-bot',
        createdAt: new Date(Date.now() - 172800000), // 2 days ago
        isRead: true
      },
      {
        _id: 'backup3',
        content: '🔄 Backup in Progress\n\n⏳ Current Status:\n\n📁 Files backed up: 8,234/12,450\n📊 Progress: 66%\n💾 Size: 5.6 GB / 8.5 GB\n⚡ Speed: 45 MB/s\n⏱️ Time remaining: ~4 minutes\n\n📂 Current folder:\n/Documents/Projects/2025\n\nPlease don\'t turn off your device...',
        senderId: 'backup-bot',
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
        isRead: true
      },
      {
        _id: 'backup4',
        content: '⚠️ Backup Warning\n\n🔴 Issue Detected:\nLow storage space on backup drive\n\n💾 Current Status:\n• Used: 95 GB / 100 GB\n• Available: 5 GB\n• Next backup size: ~8.5 GB\n\n💡 Actions needed:\n• Delete old backups\n• Upgrade storage\n• Change backup location\n\nResolve before next backup!',
        senderId: 'backup-bot',
        createdAt: new Date(Date.now() - 43200000), // 12 hours ago
        isRead: true
      },
      {
        _id: 'backup5',
        content: '/status',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 28800000), // 8 hours ago
        isRead: true
      },
      {
        _id: 'backup6',
        content: '📊 Backup Status Report\n\n🟢 System Status: Healthy\n\n📅 Last Backup:\n• Date: Nov 21, 2025 at 2:00 AM\n• Status: Success ✓\n• Size: 8.5 GB\n\n📈 Backup History (7 days):\n✅ Mon: Success\n✅ Tue: Success\n✅ Wed: Success\n✅ Thu: Success\n✅ Fri: Success\n✅ Sat: Success\n✅ Sun: Success\n\n🎯 Success Rate: 100%\n💾 Total Storage: 59.5 GB',
        senderId: 'backup-bot',
        createdAt: new Date(Date.now() - 28740000),
        isRead: true
      },
      {
        _id: 'backup7',
        content: '🔄 Restore Available\n\n📁 File Versions Found:\n\nproject_report.docx\n\n📅 Version History:\n• Nov 22, 10:00 AM (Current)\n• Nov 22, 8:00 AM\n• Nov 21, 5:00 PM\n• Nov 21, 2:00 PM\n• Nov 20, 11:00 AM\n\n💾 Size: 2.4 MB\n📍 Location: /Documents/Work\n\nSelect version to restore?',
        senderId: 'backup-bot',
        createdAt: new Date(Date.now() - 14400000), // 4 hours ago
        isRead: true
      },
      {
        _id: 'backup8',
        content: '✅ File Restored Successfully\n\nproject_report.docx\n\n📅 Restored Version:\nNov 21, 5:00 PM\n\n📍 Restored to:\n/Documents/Work/Restored/\n\n💾 Size: 2.4 MB\n⏰ Time: 3 seconds\n\n✨ Original file preserved\n🔐 Integrity verified\n\nFile ready to use! 📄',
        senderId: 'backup-bot',
        createdAt: new Date(Date.now() - 7200000), // 2 hours ago
        isRead: false
      },
      {
        _id: 'backup9',
        content: '🎉 Backup Milestone!\n\n🏆 1 Year of Backups!\n\n📊 Your Stats:\n• Total Backups: 365\n• Success Rate: 99.7%\n• Data Protected: 3.1 TB\n• Files Backed Up: 4.5M\n• Restores: 12\n\n🌟 Achievements:\n✅ Perfect Month (30/30)\n✅ Zero Data Loss\n✅ Quick Restore (<5 min)\n\nYour data is safe! 🛡️',
        senderId: 'backup-bot',
        createdAt: new Date(Date.now() - 3600000), // 1 hour ago
        isRead: false
      },
      {
        _id: 'backup10',
        content: '⚙️ Backup Settings Updated\n\n✅ Changes Applied:\n\n📅 Schedule:\n• Frequency: Daily → Hourly\n• Time: 2:00 AM → Every hour\n\n📁 Included Folders:\n• Documents ✓\n• Pictures ✓\n• Videos ✓\n• Desktop ✓ (New)\n\n☁️ Storage:\n• Upgraded: 100 GB → 500 GB\n\n🔐 Encryption: AES-256 ✓\n\nNext backup: In 45 minutes',
        senderId: 'backup-bot',
        createdAt: new Date(Date.now() - 1800000), // 30 minutes ago
        isRead: false
      }
    ],
    // Joke Bot Messages
    '46': [
      {
        _id: 'joke1',
        content: '😂 Welcome to Joke Bot!\n\nBrighten your day with humor:\n• Daily jokes\n• Programming jokes\n• Dad jokes\n• Puns\n• Random humor\n\nType /joke for a laugh!',
        senderId: 'joke-bot',
        createdAt: new Date(Date.now() - 259200000), // 3 days ago
        isRead: true
      },
      {
        _id: 'joke2',
        content: '🤣 Joke of the Day\n\nWhy don\'t scientists trust atoms?\n\nBecause they make up everything! 🔬\n\n⭐ Rating: 4.5/5\n😂 Laughs: 12,450\n🔄 Shares: 3,240\n\nLike this joke? 👍',
        senderId: 'joke-bot',
        createdAt: new Date(Date.now() - 172800000), // 2 days ago
        isRead: true
      },
      {
        _id: 'joke3',
        content: '💻 Programming Joke\n\nWhy do programmers prefer dark mode?\n\nBecause light attracts bugs! 🐛\n\n😄 Category: Tech Humor\n⭐ Rating: 4.8/5\n\n💡 Fun fact: 87% of developers agree!\n\nWant another? Type /joke',
        senderId: 'joke-bot',
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
        isRead: true
      },
      {
        _id: 'joke4',
        content: '👨 Dad Joke Alert!\n\nI\'m reading a book about anti-gravity.\n\nIt\'s impossible to put down! 📚\n\n😆 Groan Level: Maximum\n👨‍👧‍👦 Dad Approved: ✓\n⭐ Rating: 4.2/5\n\n🎯 Perfect for: Family dinners\n\nShare with your dad! 👍',
        senderId: 'joke-bot',
        createdAt: new Date(Date.now() - 43200000), // 12 hours ago
        isRead: true
      },
      {
        _id: 'joke5',
        content: '/joke',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 28800000), // 8 hours ago
        isRead: true
      },
      {
        _id: 'joke6',
        content: '🎭 Random Joke\n\nWhat do you call a bear with no teeth?\n\nA gummy bear! 🐻\n\n😂 Category: Animal Jokes\n⭐ Rating: 4.6/5\n👶 Kid-Friendly: Yes\n\n💬 "This made my day!" - User123\n\nRate this joke:\n⭐⭐⭐⭐⭐',
        senderId: 'joke-bot',
        createdAt: new Date(Date.now() - 28740000),
        isRead: true
      },
      {
        _id: 'joke7',
        content: '🎯 Pun Time!\n\nI used to hate facial hair...\n\nBut then it grew on me! 🧔\n\n😄 Pun Level: Expert\n⭐ Rating: 4.3/5\n🎪 Groan Factor: High\n\n💡 Did you know?\nPuns are the highest form of humor!\n\nWant more puns? 🤔',
        senderId: 'joke-bot',
        createdAt: new Date(Date.now() - 14400000), // 4 hours ago
        isRead: true
      },
      {
        _id: 'joke8',
        content: '🤓 Nerd Joke\n\nThere are 10 types of people in the world:\n\nThose who understand binary, and those who don\'t! 💾\n\n😂 Category: Math/CS\n⭐ Rating: 4.9/5\n🎓 Nerd Approved: ✓\n\n01001000 01000001 01001000 01000001',
        senderId: 'joke-bot',
        createdAt: new Date(Date.now() - 7200000), // 2 hours ago
        isRead: false
      },
      {
        _id: 'joke9',
        content: '🎉 Joke Stats - This Week\n\n📊 Your Activity:\n• Jokes viewed: 45\n• Favorites: 12\n• Shared: 8\n• Avg. rating given: 4.5⭐\n\n🏆 Most Popular:\n"Why do programmers prefer dark mode?"\n\n😂 Total laughs: 156K\n🔥 Trending: Tech jokes\n\nKeep laughing! 😄',
        senderId: 'joke-bot',
        createdAt: new Date(Date.now() - 3600000), // 1 hour ago
        isRead: false
      },
      {
        _id: 'joke10',
        content: '🌟 Premium Joke Collection\n\n🎭 Unlock exclusive content:\n\n✨ Features:\n• 1000+ premium jokes\n• No ads\n• Custom categories\n• Daily fresh jokes\n• Early access\n\n💰 Price: $2.99/month\n\n🎁 Special offer:\n7-day free trial!\n\nUpgrade now? 🚀',
        senderId: 'joke-bot',
        createdAt: new Date(Date.now() - 1800000), // 30 minutes ago
        isRead: false
      }
    ],
    // Fitness Bot Messages
    '40': [
      {
        _id: 'fitness1',
        content: '💪 Welcome to Fitness Bot!\n\nYour personal fitness companion:\n• Workout tracking\n• Calorie counter\n• Exercise plans\n• Progress reports\n• Motivation\n\nType /workout to start!',
        senderId: 'fitness-bot',
        createdAt: new Date(Date.now() - 259200000), // 3 days ago
        isRead: true
      },
      {
        _id: 'fitness2',
        content: '🎯 Daily Goal Progress\n\n📊 Today\'s Stats:\n\n🚶 Steps: 8,234 / 10,000\n   Progress: 82% (1,766 to go)\n\n🔥 Calories Burned: 420 / 500\n   Progress: 84% (80 to go)\n\n⏱️ Active Minutes: 45 / 60\n   Progress: 75% (15 to go)\n\n💧 Water: 6 / 8 glasses\n\nKeep pushing! 💪',
        senderId: 'fitness-bot',
        createdAt: new Date(Date.now() - 172800000), // 2 days ago
        isRead: true
      },
      {
        _id: 'fitness3',
        content: '🏋️ Workout Completed!\n\n✅ Upper Body Strength\n\n📊 Session Summary:\n• Duration: 45 minutes\n• Calories: 320 burned\n• Exercises: 8\n• Sets completed: 24\n\n💪 Exercises:\n• Push-ups: 3x15\n• Bench press: 3x10\n• Bicep curls: 3x12\n• Tricep dips: 3x10\n\nGreat job! 🎉',
        senderId: 'fitness-bot',
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
        isRead: true
      },
      {
        _id: 'fitness4',
        content: '🔔 Workout Reminder\n\n⏰ Time for your workout!\n\n📋 Today\'s Plan:\nLeg Day - Lower Body\n\n🎯 Exercises:\n• Squats: 3x12\n• Lunges: 3x10 each\n• Leg press: 3x15\n• Calf raises: 3x20\n\n⏱️ Estimated: 40 minutes\n💪 Difficulty: Moderate\n\nReady to start? 🚀',
        senderId: 'fitness-bot',
        createdAt: new Date(Date.now() - 43200000), // 12 hours ago
        isRead: true
      },
      {
        _id: 'fitness5',
        content: '/workout',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 28800000), // 8 hours ago
        isRead: true
      },
      {
        _id: 'fitness6',
        content: '📚 Workout Library\n\nChoose your focus:\n\n💪 Strength Training\n• Upper Body\n• Lower Body\n• Full Body\n• Core\n\n🏃 Cardio\n• HIIT\n• Running\n• Cycling\n\n🧘 Flexibility\n• Yoga\n• Stretching\n• Mobility\n\n⏱️ Duration: 15-60 mins\n🎯 All fitness levels',
        senderId: 'fitness-bot',
        createdAt: new Date(Date.now() - 28740000),
        isRead: true
      },
      {
        _id: 'fitness7',
        content: '🍎 Nutrition Tip\n\n💡 Today\'s Advice:\n\nProtein intake is crucial for muscle recovery!\n\n🎯 Recommended:\n• 0.8-1g per lb of body weight\n• Spread throughout the day\n• Within 2 hours post-workout\n\n🥗 Good sources:\n• Chicken breast\n• Greek yogurt\n• Eggs\n• Protein shakes\n\nTrack your macros! 📊',
        senderId: 'fitness-bot',
        createdAt: new Date(Date.now() - 14400000), // 4 hours ago
        isRead: true
      },
      {
        _id: 'fitness8',
        content: '🏆 Achievement Unlocked!\n\n🎉 "Week Warrior"\nCompleted 7 workouts in 7 days!\n\n📊 Your Stats:\n• Total workouts: 7\n• Calories burned: 2,450\n• Active time: 5h 15m\n• Avg. heart rate: 142 bpm\n\n🔥 Streak: 7 days\n⭐ Level: Intermediate → Advanced\n\nKeep it up! 💪',
        senderId: 'fitness-bot',
        createdAt: new Date(Date.now() - 7200000), // 2 hours ago
        isRead: false
      },
      {
        _id: 'fitness9',
        content: '📈 Weekly Progress Report\n\nWeek of Nov 15-22, 2025\n\n🎯 Goals Met:\n✅ Workouts: 7/5 (140%)\n✅ Steps: 72,450/70,000\n✅ Calories: 3,200/3,000\n\n📊 Improvements:\n• Weight: -2.5 lbs\n• Body fat: -1.2%\n• Muscle mass: +0.8 lbs\n\n🏆 Rank: Top 15% globally\n\nAmazing progress! 🌟',
        senderId: 'fitness-bot',
        createdAt: new Date(Date.now() - 3600000), // 1 hour ago
        isRead: false
      },
      {
        _id: 'fitness10',
        content: '💧 Hydration Check\n\n⚠️ You\'re behind on water!\n\n💦 Today\'s Intake:\n• Current: 4 glasses\n• Goal: 8 glasses\n• Remaining: 4 glasses\n\n⏰ Time: 3:00 PM\n\n💡 Tip:\nDrink 1 glass every hour until bedtime!\n\n🎯 Benefits:\n• Better performance\n• Faster recovery\n• More energy\n\nStay hydrated! 💙',
        senderId: 'fitness-bot',
        createdAt: new Date(Date.now() - 1800000), // 30 minutes ago
        isRead: false
      }
    ],
    // Music Bot Messages
    '38': [
      {
        _id: 'music1',
        content: '🎵 Welcome to Music Bot!\n\nYour personal DJ:\n• Song recommendations\n• Playlist creation\n• Now playing\n• Music discovery\n• Lyrics search\n\nType /play to start listening!',
        senderId: 'music-bot',
        createdAt: new Date(Date.now() - 259200000), // 3 days ago
        isRead: true
      },
      {
        _id: 'music2',
        content: '🎧 Now Playing\n\n🎵 "Bohemian Rhapsody"\n🎤 Artist: Queen\n💿 Album: A Night at the Opera\n⏱️ Duration: 5:55\n📅 Released: 1975\n\n🔊 Volume: 75%\n🔁 Repeat: Off\n🔀 Shuffle: On\n\n❤️ 2.5M likes\n⭐ Rating: 4.9/5\n\n⏮️ ⏯️ ⏭️',
        senderId: 'music-bot',
        createdAt: new Date(Date.now() - 172800000), // 2 days ago
        isRead: true
      },
      {
        _id: 'music3',
        content: '🎼 Playlist Created!\n\n📝 "Workout Motivation"\n\n🎵 Tracks Added: 25\n⏱️ Duration: 1h 42m\n🎯 Genre: Rock, Hip-Hop, EDM\n\n🔥 Top Tracks:\n1. Eye of the Tiger - Survivor\n2. Lose Yourself - Eminem\n3. Thunderstruck - AC/DC\n4. Till I Collapse - Eminem\n5. We Will Rock You - Queen\n\n🔗 Share playlist? 📢',
        senderId: 'music-bot',
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
        isRead: true
      },
      {
        _id: 'music4',
        content: '🌟 Recommended For You\n\nBased on your listening:\n\n🎵 Similar Artists:\n• Pink Floyd\n• Led Zeppelin\n• The Beatles\n• The Rolling Stones\n\n🎼 Playlists:\n• Classic Rock Essentials\n• 70s Rock Anthems\n• Guitar Legends\n\n💿 New Releases:\n• Arctic Monkeys - New Album\n\nExplore now! 🎧',
        senderId: 'music-bot',
        createdAt: new Date(Date.now() - 43200000), // 12 hours ago
        isRead: true
      },
      {
        _id: 'music5',
        content: '/play',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 28800000), // 8 hours ago
        isRead: true
      },
      {
        _id: 'music6',
        content: '🎵 What would you like to hear?\n\n🎯 Quick Options:\n\n🔥 Trending Now\n• Top 50 Global\n• Viral Hits\n• New Releases\n\n🎭 By Mood:\n• Chill & Relax\n• Party Time\n• Focus & Study\n• Workout Energy\n\n🎸 By Genre:\n• Rock\n• Pop\n• Hip-Hop\n• Electronic\n• Jazz\n\nTap to play! 🎧',
        senderId: 'music-bot',
        createdAt: new Date(Date.now() - 28740000),
        isRead: true
      },
      {
        _id: 'music7',
        content: '📊 Your Music Stats\n\nThis Month:\n\n⏱️ Listening Time: 45h 30m\n🎵 Songs Played: 890\n🎤 Top Artist: Queen (12h)\n💿 Top Album: Greatest Hits\n🎼 Top Genre: Rock (65%)\n\n🔥 Most Played:\n"Bohemian Rhapsody" (47 plays)\n\n🌍 You\'re in top 5% of Queen fans!\n\nKeep rocking! 🎸',
        senderId: 'music-bot',
        createdAt: new Date(Date.now() - 14400000), // 4 hours ago
        isRead: true
      },
      {
        _id: 'music8',
        content: '🎤 Lyrics\n\n🎵 "Bohemian Rhapsody" - Queen\n\n🎼 Current verse:\n\n"Is this the real life?\nIs this just fantasy?\nCaught in a landslide,\nNo escape from reality..."\n\n📝 View full lyrics?\n🎯 Sing along mode: On\n⏱️ Synced: Yes\n\n🎤 Karaoke mode available! 🎉',
        senderId: 'music-bot',
        createdAt: new Date(Date.now() - 7200000), // 2 hours ago
        isRead: false
      },
      {
        _id: 'music9',
        content: '🎁 Discover Weekly\n\n🌟 Your personalized playlist!\n\n🎵 30 new songs just for you\n⏱️ Updated every Monday\n🎯 Based on your taste\n\n🔥 This week\'s picks:\n1. "Stairway to Heaven" - Led Zeppelin\n2. "Hotel California" - Eagles\n3. "Dream On" - Aerosmith\n\n💡 95% match with your taste\n\nStart listening! 🎧',
        senderId: 'music-bot',
        createdAt: new Date(Date.now() - 3600000), // 1 hour ago
        isRead: false
      },
      {
        _id: 'music10',
        content: '🎉 Concert Alert!\n\n🎸 Queen + Adam Lambert\n\n📍 Location: Madison Square Garden, NYC\n📅 Date: Dec 15, 2025\n⏰ Time: 8:00 PM\n\n🎫 Tickets:\n• General: $89\n• VIP: $299\n• Meet & Greet: $599\n\n🔥 Selling fast!\n⏰ 234 tickets left\n\n🎟️ Get tickets now?\n\nDon\'t miss out! 🌟',
        senderId: 'music-bot',
        createdAt: new Date(Date.now() - 1800000), // 30 minutes ago
        isRead: false
      }
    ],
    // Quiz Bot Messages
    '48': [
      {
        _id: 'quiz1',
        content: '🎯 Welcome to Quiz Bot!\n\nTest your knowledge:\n• Trivia quizzes\n• Subject tests\n• Daily challenges\n• Leaderboards\n• Achievements\n\nType /quiz to start playing!',
        senderId: 'quiz-bot',
        createdAt: new Date(Date.now() - 259200000), // 3 days ago
        isRead: true
      },
      {
        _id: 'quiz2',
        content: '🧠 Daily Quiz Challenge\n\n📚 Category: General Knowledge\n⏱️ Time: 60 seconds\n❓ Questions: 10\n\nQuestion 1/10:\nWhat is the capital of France?\n\nA) London\nB) Berlin\nC) Paris\nD) Madrid\n\n⏰ Time remaining: 60s\n\nReply with A, B, C, or D',
        senderId: 'quiz-bot',
        createdAt: new Date(Date.now() - 172800000), // 2 days ago
        isRead: true
      },
      {
        _id: 'quiz3',
        content: '✅ Correct!\n\nC) Paris is correct! 🎉\n\n📊 Progress: 1/10\n⭐ Score: 100 points\n🔥 Streak: 1\n\nQuestion 2/10:\nWho painted the Mona Lisa?\n\nA) Vincent van Gogh\nB) Leonardo da Vinci\nC) Pablo Picasso\nD) Michelangelo\n\n⏰ Time: 55s remaining',
        senderId: 'quiz-bot',
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
        isRead: true
      },
      {
        _id: 'quiz4',
        content: '🎊 Quiz Completed!\n\n📊 Final Results:\n\n✅ Correct: 8/10\n❌ Wrong: 2/10\n⭐ Score: 800 points\n⏱️ Time: 4m 23s\n🎯 Accuracy: 80%\n\n🏆 Rank: #234 globally\n🔥 Streak: 5 days\n\n💡 You beat 78% of players!\n\nPlay again? 🎮',
        senderId: 'quiz-bot',
        createdAt: new Date(Date.now() - 43200000), // 12 hours ago
        isRead: true
      },
      {
        _id: 'quiz5',
        content: '/quiz',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 28800000), // 8 hours ago
        isRead: true
      },
      {
        _id: 'quiz6',
        content: '🎮 Choose Your Quiz\n\n📚 Categories:\n\n🌍 General Knowledge\n💻 Technology & Science\n🎬 Movies & Entertainment\n⚽ Sports\n📖 History\n🎨 Art & Literature\n🔢 Math & Logic\n🌟 Pop Culture\n\n🏆 Difficulty:\n• Easy (100 pts/question)\n• Medium (200 pts/question)\n• Hard (300 pts/question)\n\nSelect category to begin!',
        senderId: 'quiz-bot',
        createdAt: new Date(Date.now() - 28740000),
        isRead: true
      },
      {
        _id: 'quiz7',
        content: '🏆 Leaderboard - This Week\n\n👑 Top Players:\n\n1️⃣ QuizMaster99 - 15,420 pts\n2️⃣ BrainiacPro - 14,850 pts\n3️⃣ YOU - 12,340 pts 🎉\n4️⃣ SmartCookie - 11,920 pts\n5️⃣ TriviaKing - 10,450 pts\n\n📊 Your Stats:\n• Quizzes: 24\n• Win Rate: 83%\n• Avg. Score: 850 pts\n\nClimb to #1! 🚀',
        senderId: 'quiz-bot',
        createdAt: new Date(Date.now() - 14400000), // 4 hours ago
        isRead: true
      },
      {
        _id: 'quiz8',
        content: '🎯 Achievement Unlocked!\n\n🏅 "Perfect Score"\nGet 10/10 on a quiz\n\n🎊 Rewards:\n• +500 bonus points\n• Exclusive badge\n• Unlock Hard mode\n\n📊 Your Achievements:\n✅ First Quiz (Complete 1 quiz)\n✅ Quiz Novice (10 quizzes)\n✅ Perfect Score (10/10)\n🔒 Quiz Master (100 quizzes)\n🔒 Legendary (1000 quizzes)\n\nKeep playing! 🌟',
        senderId: 'quiz-bot',
        createdAt: new Date(Date.now() - 7200000), // 2 hours ago
        isRead: false
      },
      {
        _id: 'quiz9',
        content: '📈 Weekly Report\n\nWeek of Nov 15-22, 2025\n\n📊 Performance:\n• Quizzes Played: 24\n• Total Points: 18,450\n• Avg. Score: 768 pts\n• Best Category: Technology (92%)\n• Improvement: +15% vs last week\n\n🏆 Highlights:\n• 3 perfect scores\n• 5-day streak\n• Reached top 3\n\n🎯 Next Goal: Reach #1!\n\nYou\'re doing amazing! 🌟',
        senderId: 'quiz-bot',
        createdAt: new Date(Date.now() - 3600000), // 1 hour ago
        isRead: false
      },
      {
        _id: 'quiz10',
        content: '🎁 Special Event!\n\n🌟 Weekend Quiz Marathon\n\nNov 23-24, 2025\n\n🏆 Prizes:\n• 1st Place: $100 gift card\n• 2nd Place: $50 gift card\n• 3rd Place: $25 gift card\n• Top 10: Premium badge\n\n📋 Rules:\n• Unlimited quizzes\n• Best 10 scores count\n• All categories\n\n⏰ Starts in 2 days!\n\nRegister now? 🎮',
        senderId: 'quiz-bot',
        createdAt: new Date(Date.now() - 1800000), // 30 minutes ago
        isRead: false
      }
    ],
    // QR Code Bot Messages
    '75': [
      {
        _id: 'qr1',
        content: '📱 Welcome to QR Code Bot!\n\nGenerate & scan QR codes:\n• Create QR codes\n• Scan codes\n• Custom designs\n• Bulk generation\n• Analytics\n\nType /generate to create a QR!',
        senderId: 'qr-bot',
        createdAt: new Date(Date.now() - 259200000), // 3 days ago
        isRead: true
      },
      {
        _id: 'qr2',
        content: '✅ QR Code Generated!\n\n🔗 Content: https://mywebsite.com\n\n📊 Details:\n• Type: URL\n• Size: 512x512px\n• Format: PNG\n• Error Correction: High (30%)\n• Color: Black & White\n\n📥 Download: qr.app/abc123\n\n📊 Scans: 0\n⏰ Created: Just now\n\nShare your QR code! 📢',
        senderId: 'qr-bot',
        createdAt: new Date(Date.now() - 172800000), // 2 days ago
        isRead: true
      },
      {
        _id: 'qr3',
        content: '🎨 Custom QR Code Created\n\n✨ Design Options Applied:\n\n🎨 Style: Rounded\n🌈 Colors:\n• Foreground: #FF6B6B\n• Background: #FFFFFF\n📸 Logo: Uploaded ✓\n🖼️ Frame: Modern\n\n📊 Specifications:\n• Resolution: 1024x1024\n• Format: SVG (scalable)\n• File size: 45 KB\n\nPerfect for branding! 🎯',
        senderId: 'qr-bot',
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
        isRead: true
      },
      {
        _id: 'qr4',
        content: '📊 QR Code Analytics\n\nCode: mywebsite.com\n\n📈 Performance (7 days):\n• Total Scans: 1,247\n• Unique Users: 892\n• Avg. Daily: 178 scans\n\n🌍 Top Locations:\n• USA: 45%\n• UK: 18%\n• Canada: 12%\n• India: 10%\n\n📱 Devices:\n• Mobile: 78%\n• Desktop: 22%\n\n⏰ Peak time: 2-4 PM EST',
        senderId: 'qr-bot',
        createdAt: new Date(Date.now() - 43200000), // 12 hours ago
        isRead: true
      },
      {
        _id: 'qr5',
        content: '/generate',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 28800000), // 8 hours ago
        isRead: true
      },
      {
        _id: 'qr6',
        content: '🎯 What type of QR code?\n\n📋 Choose content type:\n\n🔗 URL/Website\n📧 Email\n📱 Phone Number\n📝 Text Message\n📍 Location\n📇 vCard (Contact)\n📶 WiFi Network\n💳 Payment\n📱 App Store Link\n\n💡 Most popular: URL (65%)\n\nSelect type to continue...',
        senderId: 'qr-bot',
        createdAt: new Date(Date.now() - 28740000),
        isRead: true
      },
      {
        _id: 'qr7',
        content: '📶 WiFi QR Code Generated\n\n🔐 Network Details:\n• SSID: MyHomeWiFi\n• Password: ••••••••\n• Security: WPA2\n\n✅ Features:\n• Auto-connect enabled\n• Hidden SSID support\n• Guest network ready\n\n📱 Usage:\nScan to connect instantly!\n\n💡 Perfect for:\n• Home guests\n• Office visitors\n• Cafes & restaurants',
        senderId: 'qr-bot',
        createdAt: new Date(Date.now() - 14400000), // 4 hours ago
        isRead: true
      },
      {
        _id: 'qr8',
        content: '📦 Bulk QR Generation Complete\n\n✅ Generated: 100 codes\n\n📊 Summary:\n• Type: Product URLs\n• Format: PNG\n• Size: 512x512 each\n• Total size: 4.2 MB\n\n📥 Download Options:\n• ZIP archive\n• Individual files\n• CSV with URLs\n\n💼 Use case:\n• Product labels\n• Inventory tracking\n• Marketing campaign\n\nDownload now? 📥',
        senderId: 'qr-bot',
        createdAt: new Date(Date.now() - 7200000), // 2 hours ago
        isRead: false
      },
      {
        _id: 'qr9',
        content: '🔍 QR Code Scanned!\n\n📱 Scan Result:\n\nType: URL\nContent: https://promo.app/sale\n\n✅ Safe: Verified\n🔐 HTTPS: Secure\n⚠️ Shortened: No\n\n🎯 Action Options:\n• Open in browser\n• Copy link\n• Share\n• Save for later\n\n💡 Scan history saved\n\nWhat would you like to do?',
        senderId: 'qr-bot',
        createdAt: new Date(Date.now() - 3600000), // 1 hour ago
        isRead: false
      },
      {
        _id: 'qr10',
        content: '📈 Monthly Report\n\nNovember 2025\n\n📊 Your Activity:\n• QR Codes Created: 45\n• Total Scans: 12,450\n• Unique Users: 8,920\n• Avg. Scans/Code: 277\n\n🏆 Best Performing:\n"Product Launch" - 3,240 scans\n\n🌟 Achievement:\nTop 10% of users!\n\n💎 Upgrade to Premium:\n• Unlimited codes\n• Advanced analytics\n• Custom branding\n\nTry free for 7 days! 🚀',
        senderId: 'qr-bot',
        createdAt: new Date(Date.now() - 1800000), // 30 minutes ago
        isRead: false
      }
    ],
    // Voice Bot Messages
    '41': [
      {
        _id: 'voice1',
        content: '🎤 Welcome to Voice Bot!\n\nVoice-powered features:\n• Voice messages\n• Speech-to-text\n• Text-to-speech\n• Voice commands\n• Language support\n\nSend a voice message to start!',
        senderId: 'voice-bot',
        createdAt: new Date(Date.now() - 259200000), // 3 days ago
        isRead: true
      },
      {
        _id: 'voice2',
        content: '🎙️ Voice Message Received\n\n⏱️ Duration: 0:45\n📊 Size: 1.2 MB\n🔊 Quality: High\n\n📝 Transcription:\n"Hey, can you help me schedule a meeting for tomorrow at 2 PM with the team?"\n\n✅ Transcription Accuracy: 98%\n🌍 Language: English (US)\n\n💬 Reply with voice or text?',
        senderId: 'voice-bot',
        createdAt: new Date(Date.now() - 172800000), // 2 days ago
        isRead: true
      },
      {
        _id: 'voice3',
        content: '🔊 Text-to-Speech Generated\n\n📝 Text:\n"Your meeting has been scheduled for tomorrow at 2 PM."\n\n🎤 Voice Settings:\n• Voice: Female (Sarah)\n• Language: English (US)\n• Speed: Normal\n• Pitch: Medium\n\n⏱️ Duration: 0:04\n📥 Download audio\n▶️ Play now\n\nVoice sounds natural! 🌟',
        senderId: 'voice-bot',
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
        isRead: true
      },
      {
        _id: 'voice4',
        content: '🎯 Voice Command Detected\n\n🎤 You said:\n"Set a reminder for 5 PM"\n\n✅ Command Recognized:\n• Action: Set Reminder\n• Time: 5:00 PM today\n• Confidence: 95%\n\n⏰ Reminder created!\n\n💡 Try these commands:\n• "Call [name]"\n• "Send message to [name]"\n• "What\'s the weather?"\n• "Play music"',
        senderId: 'voice-bot',
        createdAt: new Date(Date.now() - 43200000), // 12 hours ago
        isRead: true
      },
      {
        _id: 'voice5',
        content: '🎤 [Voice Message]',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 28800000), // 8 hours ago
        isRead: true
      },
      {
        _id: 'voice6',
        content: '📝 Transcription Complete\n\nYour voice message:\n\n"Can you translate this to Spanish: Hello, how are you today?"\n\n✅ Transcribed successfully\n⏱️ Processing time: 2 seconds\n🎯 Accuracy: 99%\n\n🌍 Translation requested:\nEnglish → Spanish\n\n💬 Result:\n"Hola, ¿cómo estás hoy?"\n\n🔊 Play Spanish audio?',
        senderId: 'voice-bot',
        createdAt: new Date(Date.now() - 28740000),
        isRead: true
      },
      {
        _id: 'voice7',
        content: '🌍 Language Support\n\nAvailable languages:\n\n🗣️ Speech Recognition:\n• English (US, UK, AU)\n• Spanish\n• French\n• German\n• Chinese (Mandarin)\n• Japanese\n• Hindi\n• Arabic\n• +50 more\n\n🔊 Text-to-Speech:\n• 40+ languages\n• 100+ voices\n• Male & Female options\n\nChange language in settings! ⚙️',
        senderId: 'voice-bot',
        createdAt: new Date(Date.now() - 14400000), // 4 hours ago
        isRead: true
      },
      {
        _id: 'voice8',
        content: '🎙️ Voice Quality Enhanced\n\n✨ AI Enhancement Applied:\n\n🔧 Improvements:\n• Noise reduction: ✅\n• Echo cancellation: ✅\n• Volume normalization: ✅\n• Clarity boost: ✅\n\n📊 Before/After:\n• Clarity: 65% → 95%\n• Background noise: -40dB\n• Quality score: 8.5/10\n\n🎧 Listen to enhanced version?\n\nPerfect for podcasts! 🎙️',
        senderId: 'voice-bot',
        createdAt: new Date(Date.now() - 7200000), // 2 hours ago
        isRead: false
      },
      {
        _id: 'voice9',
        content: '📊 Voice Usage Stats\n\nThis Month:\n\n🎤 Voice Messages:\n• Sent: 145\n• Received: 203\n• Total duration: 2h 34m\n• Avg. length: 0:42\n\n📝 Transcriptions: 89\n🔊 Text-to-Speech: 56\n🎯 Voice Commands: 234\n\n🌟 Most used:\n"Set reminder" (45 times)\n\n⚡ You\'re a power user! 🚀',
        senderId: 'voice-bot',
        createdAt: new Date(Date.now() - 3600000), // 1 hour ago
        isRead: false
      },
      {
        _id: 'voice10',
        content: '🎁 Premium Voice Features\n\n✨ Unlock advanced features:\n\n🌟 Benefits:\n• Unlimited voice messages\n• 100+ premium voices\n• Real-time translation\n• Voice cloning (beta)\n• Priority processing\n• No ads\n\n💰 Pricing:\n• Monthly: $4.99\n• Yearly: $49.99 (save 17%)\n\n🎁 Special offer:\n50% off first month!\n\nUpgrade now? 🚀',
        senderId: 'voice-bot',
        createdAt: new Date(Date.now() - 1800000), // 30 minutes ago
        isRead: false
      }
    ],
    // Meditation Bot Messages
    '39': [
      {
        _id: 'meditation1',
        content: '🧘 Welcome to Meditation Bot!\n\nFind your inner peace:\n• Guided meditations\n• Breathing exercises\n• Sleep sounds\n• Mindfulness tips\n• Progress tracking\n\nType /meditate to begin!',
        senderId: 'meditation-bot',
        createdAt: new Date(Date.now() - 259200000), // 3 days ago
        isRead: true
      },
      {
        _id: 'meditation2',
        content: '🌅 Good Morning Meditation\n\n☀️ Start your day mindfully\n\n⏱️ Duration: 10 minutes\n🎯 Focus: Energy & Positivity\n🎵 Background: Gentle piano\n\n📋 Session includes:\n• Body scan (2 min)\n• Breathing exercise (3 min)\n• Positive affirmations (3 min)\n• Gentle stretch (2 min)\n\n🧘 Ready to begin?\n\nFind a quiet space... 🌿',
        senderId: 'meditation-bot',
        createdAt: new Date(Date.now() - 172800000), // 2 days ago
        isRead: true
      },
      {
        _id: 'meditation3',
        content: '✅ Session Complete!\n\n🧘 Morning Meditation\n\n📊 Session Summary:\n• Duration: 10:00\n• Completed: 100%\n• Focus: Excellent\n• Heart rate: 62 bpm (calm)\n\n🌟 Benefits achieved:\n✓ Reduced stress\n✓ Increased focus\n✓ Better mood\n\n🔥 Streak: 7 days\n⭐ Total sessions: 45\n\nGreat job! 🎉',
        senderId: 'meditation-bot',
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
        isRead: true
      },
      {
        _id: 'meditation4',
        content: '🌬️ Breathing Exercise\n\n💨 4-7-8 Technique\n\nPerfect for:\n• Reducing anxiety\n• Better sleep\n• Quick relaxation\n\n📋 Instructions:\n1. Inhale through nose (4 sec)\n2. Hold breath (7 sec)\n3. Exhale through mouth (8 sec)\n4. Repeat 4 times\n\n⏱️ Duration: 2 minutes\n\n🎯 Ready? Let\'s breathe...\n\nInhale... 1... 2... 3... 4...',
        senderId: 'meditation-bot',
        createdAt: new Date(Date.now() - 43200000), // 12 hours ago
        isRead: true
      },
      {
        _id: 'meditation5',
        content: '/meditate',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 28800000), // 8 hours ago
        isRead: true
      },
      {
        _id: 'meditation6',
        content: '🎯 Choose Your Session\n\n🌅 By Time of Day:\n• Morning Energy (10 min)\n• Midday Reset (5 min)\n• Evening Wind Down (15 min)\n• Sleep Meditation (20 min)\n\n🎯 By Goal:\n• Stress Relief\n• Focus & Productivity\n• Anxiety Management\n• Better Sleep\n• Self-Love\n\n⏱️ Duration:\n• Quick (5 min)\n• Standard (10-15 min)\n• Deep (20-30 min)\n\nWhat do you need today? 🌿',
        senderId: 'meditation-bot',
        createdAt: new Date(Date.now() - 28740000),
        isRead: true
      },
      {
        _id: 'meditation7',
        content: '🌙 Sleep Sounds\n\n😴 Fall asleep peacefully\n\n🎵 Available sounds:\n• Rain & Thunder ☔\n• Ocean Waves 🌊\n• Forest Ambience 🌲\n• White Noise 📻\n• Campfire 🔥\n• Piano Lullaby 🎹\n\n⏱️ Timer options:\n• 15 minutes\n• 30 minutes\n• 1 hour\n• Until morning\n\n🔊 Volume: Adjustable\n\nSelect your sound... 💤',
        senderId: 'meditation-bot',
        createdAt: new Date(Date.now() - 14400000), // 4 hours ago
        isRead: true
      },
      {
        _id: 'meditation8',
        content: '🏆 Milestone Achieved!\n\n🎉 7-Day Streak!\n\nYou\'ve meditated every day this week!\n\n📊 Your Progress:\n• Total sessions: 52\n• Total time: 8h 40m\n• Avg. session: 10 min\n• Favorite: Morning Energy\n\n🌟 Benefits noticed:\n• 85% better sleep\n• 70% less stress\n• 90% improved focus\n\n🎁 Reward unlocked:\nPremium session access!\n\nKeep going! 💪',
        senderId: 'meditation-bot',
        createdAt: new Date(Date.now() - 7200000), // 2 hours ago
        isRead: false
      },
      {
        _id: 'meditation9',
        content: '💡 Mindfulness Tip\n\n🌿 Daily Practice:\n\n"Take 3 conscious breaths"\n\nWhenever you feel stressed:\n1. Pause what you\'re doing\n2. Close your eyes\n3. Take 3 deep breaths\n4. Notice how you feel\n\n⏱️ Takes only 30 seconds\n✨ Instant calm\n\n🎯 Try it now:\nBreathe in... Hold... Breathe out...\n\n💚 Small moments, big impact\n\nSet daily reminder? 🔔',
        senderId: 'meditation-bot',
        createdAt: new Date(Date.now() - 3600000), // 1 hour ago
        isRead: false
      },
      {
        _id: 'meditation10',
        content: '📈 Weekly Wellness Report\n\nWeek of Nov 15-22, 2025\n\n🧘 Meditation Stats:\n• Sessions: 7/7 days ✓\n• Total time: 1h 10m\n• Avg. heart rate: 65 bpm\n• Stress reduction: 68%\n\n😴 Sleep Quality:\n• Avg. sleep: 7h 45m\n• Quality score: 8.5/10\n• Improvement: +15%\n\n🎯 Goals:\n✅ Daily meditation\n✅ Better sleep\n⏳ 30-day streak (23 days)\n\nYou\'re thriving! 🌟',
        senderId: 'meditation-bot',
        createdAt: new Date(Date.now() - 1800000), // 30 minutes ago
        isRead: false
      }
    ],
    // Crypto Bot Messages
    '45': [
      {
        _id: 'crypto1',
        content: '₿ Welcome to Crypto Bot!\n\nYour crypto companion:\n• Live prices\n• Portfolio tracking\n• Price alerts\n• Market news\n• Trading signals\n\nType /prices to see markets!',
        senderId: 'crypto-bot',
        createdAt: new Date(Date.now() - 259200000), // 3 days ago
        isRead: true
      },
      {
        _id: 'crypto2',
        content: '📊 Crypto Market Update\n\n🔥 Top Cryptocurrencies:\n\n₿ Bitcoin (BTC)\n$42,350 (+5.2%) 📈\n24h High: $42,890\n24h Low: $40,120\nVolume: $28.5B\n\n⟠ Ethereum (ETH)\n$2,245 (+3.8%) 📈\n24h High: $2,280\n24h Low: $2,150\nVolume: $12.3B\n\n🌟 Market Cap: $1.85T\n😊 Fear & Greed: 68 (Greed)',
        senderId: 'crypto-bot',
        createdAt: new Date(Date.now() - 172800000), // 2 days ago
        isRead: true
      },
      {
        _id: 'crypto3',
        content: '🚨 Price Alert!\n\n₿ Bitcoin (BTC)\n\nPrice: $42,350\nChange: +5.2% (24h)\n\n🎯 Your Alert: $42,000\n✅ Target Reached!\n\nCurrent Status:\n• Above resistance: $42,000\n• Next target: $45,000\n• Support level: $40,000\n\n💡 Suggestion:\nConsider taking profits or setting stop-loss\n\nView chart? 📈',
        senderId: 'crypto-bot',
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
        isRead: true
      },
      {
        _id: 'crypto4',
        content: '💼 Your Portfolio\n\n📊 Total Value: $15,420\n📈 24h Change: +$892 (+6.1%)\n\n🪙 Holdings:\n\n₿ BTC: 0.25 ($10,587)\n• +5.2% today\n• Cost basis: $38,000\n• Profit: +11.4%\n\n⟠ ETH: 2.0 ($4,490)\n• +3.8% today\n• Cost basis: $2,100\n• Profit: +6.9%\n\n🔷 SOL: 15 ($343)\n• +8.2% today\n\nBest performer: SOL 🚀',
        senderId: 'crypto-bot',
        createdAt: new Date(Date.now() - 43200000), // 12 hours ago
        isRead: true
      },
      {
        _id: 'crypto5',
        content: '/prices',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 28800000), // 8 hours ago
        isRead: true
      },
      {
        _id: 'crypto6',
        content: '💰 Live Crypto Prices\n\n🔝 Top 10 by Market Cap:\n\n1. ₿ BTC: $42,350 (+5.2%)\n2. ⟠ ETH: $2,245 (+3.8%)\n3. 💵 USDT: $1.00 (0.0%)\n4. 🔷 BNB: $312 (+2.1%)\n5. 🔷 SOL: $98.50 (+8.2%)\n6. 🔷 XRP: $0.62 (+4.5%)\n7. 🔷 ADA: $0.48 (+6.1%)\n8. 🔷 DOGE: $0.085 (+12.3%)\n9. 💵 USDC: $1.00 (0.0%)\n10. 🔷 AVAX: $38.20 (+7.8%)\n\n⏰ Updated: Just now\n🔄 Refresh every 30s',
        senderId: 'crypto-bot',
        createdAt: new Date(Date.now() - 28740000),
        isRead: true
      },
      {
        _id: 'crypto7',
        content: '📰 Crypto News Flash\n\n🔥 Breaking:\n\n"Bitcoin ETF sees record $2.5B inflow"\n\n📊 Impact:\n• BTC price surges 5%\n• Institutional interest rising\n• Market sentiment: Bullish\n\n💡 Analysis:\nHistorically, large ETF inflows precede price rallies. Watch for $45K resistance.\n\n🔗 Read more: cryptonews.com/btc-etf\n\n⏰ 2 hours ago',
        senderId: 'crypto-bot',
        createdAt: new Date(Date.now() - 14400000), // 4 hours ago
        isRead: true
      },
      {
        _id: 'crypto8',
        content: '🎯 Trading Signal\n\n⟠ Ethereum (ETH/USD)\n\n📊 Technical Analysis:\n• Trend: Bullish 📈\n• RSI: 68 (Overbought soon)\n• MACD: Bullish crossover\n• Support: $2,150\n• Resistance: $2,300\n\n💡 Signal: BUY\nEntry: $2,240 - $2,260\nTarget 1: $2,350 (+4.5%)\nTarget 2: $2,500 (+11%)\nStop Loss: $2,100 (-6%)\n\n⚠️ Risk: Medium\n🎯 Confidence: 75%\n\nNot financial advice! DYOR',
        senderId: 'crypto-bot',
        createdAt: new Date(Date.now() - 7200000), // 2 hours ago
        isRead: false
      },
      {
        _id: 'crypto9',
        content: '🔔 Market Alert!\n\n🚀 Altcoin Season Detected\n\n📊 Indicators:\n• Altcoin Market Cap: +12%\n• BTC Dominance: 48% (↓2%)\n• Top 100 Avg: +8.5%\n\n🔥 Trending Coins:\n• SOL: +8.2%\n• DOGE: +12.3%\n• AVAX: +7.8%\n• LINK: +9.1%\n\n💡 Strategy:\nAltcoins typically outperform BTC during this phase. Diversify wisely!\n\n⏰ Duration: 2-4 weeks (estimated)',
        senderId: 'crypto-bot',
        createdAt: new Date(Date.now() - 3600000), // 1 hour ago
        isRead: false
      },
      {
        _id: 'crypto10',
        content: '📈 Weekly Performance Report\n\nWeek of Nov 15-22, 2025\n\n💼 Portfolio:\n• Starting: $14,200\n• Current: $15,420\n• Profit: +$1,220 (+8.6%)\n\n🏆 Best Trades:\n• SOL: +15.2%\n• ETH: +6.9%\n• BTC: +5.2%\n\n📊 Market Stats:\n• Total trades: 8\n• Win rate: 75%\n• Avg. gain: 6.2%\n\n🎯 vs Market:\nYou beat BTC by +3.4%!\n\nKeep it up! 🚀',
        senderId: 'crypto-bot',
        createdAt: new Date(Date.now() - 1800000), // 30 minutes ago
        isRead: false
      }
    ],
    // Sarah Johnson Messages
    '4': [
      {
        _id: 'sarah1',
        content: 'Hey! Are you free to discuss the new mobile app design? 📱',
        senderId: 'sarah-johnson',
        createdAt: new Date(Date.now() - 259200000), // 3 days ago
        isRead: true
      },
      {
        _id: 'sarah2',
        content: 'Sure! I have some time now. What\'s on your mind?',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 258000000),
        isRead: true
      },
      {
        _id: 'sarah3',
        content: 'I\'ve been working on the profile screen and wanted your feedback on these two options.',
        senderId: 'sarah-johnson',
        createdAt: new Date(Date.now() - 172800000), // 2 days ago
        isRead: true
      },
      {
        _id: 'sarah4',
        content: '',
        senderId: 'sarah-johnson',
        createdAt: new Date(Date.now() - 172740000),
        isRead: true,
        attachments: [
          {
            id: 'sarah-img-1',
            name: 'profile-option-a.jpg',
            type: 'image/jpeg',
            size: 1456789,
            url: 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'sarah-img-2',
            name: 'profile-option-b.jpg',
            type: 'image/jpeg',
            size: 1567890,
            url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'sarah5',
        content: 'I really like Option A! The layout feels cleaner. Maybe we can adjust the accent color slightly?',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 172680000),
        isRead: true
      },
      {
        _id: 'sarah6',
        content: 'Good point! I\'ll try a softer blue. Also, here are the updated requirements for the settings page.',
        senderId: 'sarah-johnson',
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
        isRead: true
      },
      {
        _id: 'sarah7',
        content: '',
        senderId: 'sarah-johnson',
        createdAt: new Date(Date.now() - 86340000),
        isRead: true,
        attachments: [
          {
            id: 'sarah-doc-1',
            name: 'Settings-Page-Requirements-v2.pdf',
            type: 'application/pdf',
            size: 4567890,
            url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
          }
        ]
      },
      {
        _id: 'sarah8',
        content: 'Thanks! I\'ll take a look. Do we have a deadline for this?',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 86280000),
        isRead: true
      },
      {
        _id: 'sarah9',
        content: 'Ideally by Friday. I recorded a quick explanation of the complex privacy settings.',
        senderId: 'sarah-johnson',
        createdAt: new Date(Date.now() - 43200000), // 12 hours ago
        isRead: true
      },
      {
        _id: 'sarah10',
        content: '',
        senderId: 'sarah-johnson',
        createdAt: new Date(Date.now() - 43140000),
        isRead: true,
        voiceMessage: {
          url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
          duration: 95,
          waveform: [0.3, 0.6, 0.4, 0.8, 0.5, 0.7, 0.4, 0.9, 0.6, 0.3, 0.5, 0.8, 0.4, 0.7, 0.5, 0.9, 0.3, 0.6, 0.4, 0.8]
        }
      },
      {
        _id: 'sarah11',
        content: 'Got it. The explanation helps a lot. I\'ll start working on the implementation tomorrow.',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 43080000),
        isRead: true
      },
      {
        _id: 'sarah12',
        content: 'Awesome! Let me know if you need anything else. Oh, check out this cool animation library I found.',
        senderId: 'sarah-johnson',
        createdAt: new Date(Date.now() - 14400000), // 4 hours ago
        isRead: true
      },
      {
        _id: 'sarah13',
        content: 'https://framer.com/motion',
        senderId: 'sarah-johnson',
        createdAt: new Date(Date.now() - 14340000),
        isRead: true,
        linkPreview: {
          url: 'https://framer.com/motion',
          title: 'Framer Motion',
          description: 'A production-ready motion library for React.',
          image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60',
          siteName: 'Framer'
        }
      },
      {
        _id: 'sarah14',
        content: 'This looks perfect for the transitions! I\'ll play around with it.',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 14280000),
        isRead: true
      },
      {
        _id: 'sarah15',
        content: 'Great! See you at the standup meeting.',
        senderId: 'sarah-johnson',
        createdAt: new Date(Date.now() - 3600000), // 1 hour ago
        isRead: false
      },
      {
        _id: 'sarah16',
        content: '',
        senderId: 'sarah-johnson',
        createdAt: new Date(Date.now() - 1800000), // 30 minutes ago
        isRead: false,
        voiceMessage: {
          url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
          duration: 45,
          waveform: [0.5, 0.3, 0.7, 0.4, 0.8, 0.6, 0.9, 0.5, 0.7, 0.4, 0.8, 0.6, 0.9, 0.5, 0.7, 0.4, 0.8, 0.6, 0.9, 0.5]
        }
      }
    ],
    // Michael Chen Messages
    '5': [
      {
        _id: 'michael1',
        content: 'Hey! How have you been? Long time no see! 👋',
        senderId: 'michael-chen',
        createdAt: new Date(Date.now() - 259200000), // 3 days ago
        isRead: true
      },
      {
        _id: 'michael2',
        content: 'I\'ve been great! Just wrapped up a big project at work. How about you?',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 258000000),
        isRead: true
      },
      {
        _id: 'michael3',
        content: 'That\'s awesome! I\'m doing well too. Actually, I wanted to share some photos from my recent trip to Japan 🇯🇵',
        senderId: 'michael-chen',
        createdAt: new Date(Date.now() - 172800000), // 2 days ago
        isRead: true
      },
      {
        _id: 'michael4',
        content: '',
        senderId: 'michael-chen',
        createdAt: new Date(Date.now() - 172740000),
        isRead: true,
        attachments: [
          {
            id: 'michael-img-1',
            name: 'tokyo-skyline.jpg',
            type: 'image/jpeg',
            size: 3456789,
            url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'michael-img-2',
            name: 'mount-fuji.jpg',
            type: 'image/jpeg',
            size: 4123456,
            url: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'michael-img-3',
            name: 'kyoto-temple.jpg',
            type: 'image/jpeg',
            size: 3789012,
            url: 'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'michael5',
        content: 'Wow! These are stunning! 😍 The view of Mount Fuji is incredible!',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 172680000),
        isRead: true
      },
      {
        _id: 'michael6',
        content: 'Thanks! It was an amazing experience. I also put together a travel guide document with all the places I visited, restaurants, and tips. Let me send it to you!',
        senderId: 'michael-chen',
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
        isRead: true
      },
      {
        _id: 'michael7',
        content: '',
        senderId: 'michael-chen',
        createdAt: new Date(Date.now() - 86340000),
        isRead: true,
        attachments: [
          {
            id: 'michael-doc-1',
            name: 'Japan-Travel-Guide-2025.pdf',
            type: 'application/pdf',
            size: 5678901,
            url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
          },
          {
            id: 'michael-doc-2',
            name: 'Tokyo-Restaurant-List.docx',
            type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            size: 234567,
            url: '#'
          }
        ]
      },
      {
        _id: 'michael8',
        content: 'This is perfect! I\'ve been planning a trip to Japan next year. This will be super helpful! 🙏',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 86280000),
        isRead: true
      },
      {
        _id: 'michael9',
        content: 'Glad I could help! Oh, and I recorded a voice message about the best time to visit and some insider tips that aren\'t in the document.',
        senderId: 'michael-chen',
        createdAt: new Date(Date.now() - 43200000), // 12 hours ago
        isRead: true
      },
      {
        _id: 'michael10',
        content: '',
        senderId: 'michael-chen',
        createdAt: new Date(Date.now() - 43140000),
        isRead: true,
        voiceMessage: {
          url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
          duration: 180,
          waveform: [0.2, 0.4, 0.6, 0.8, 0.5, 0.7, 0.3, 0.9, 0.4, 0.6, 0.8, 0.5, 0.7, 0.3, 0.6, 0.8, 0.4, 0.7, 0.5, 0.9]
        }
      },
      {
        _id: 'michael11',
        content: 'Thanks for the voice message! Really appreciate all the tips. The cherry blossom season sounds perfect! 🌸',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 43080000),
        isRead: true
      },
      {
        _id: 'michael12',
        content: 'You\'re welcome! Also, I have some presentation slides from a photography workshop I attended in Kyoto. Might be useful if you\'re into photography!',
        senderId: 'michael-chen',
        createdAt: new Date(Date.now() - 28800000), // 8 hours ago
        isRead: true
      },
      {
        _id: 'michael13',
        content: '',
        senderId: 'michael-chen',
        createdAt: new Date(Date.now() - 28740000),
        isRead: true,
        attachments: [
          {
            id: 'michael-ppt-1',
            name: 'Photography-Workshop-Kyoto.pptx',
            type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            size: 8901234,
            url: '#'
          },
          {
            id: 'michael-img-4',
            name: 'workshop-certificate.jpg',
            type: 'image/jpeg',
            size: 1234567,
            url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'michael14',
        content: 'Awesome! I\'d love to check that out. Your photos are always so professional! 📸',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 28680000),
        isRead: true
      },
      {
        _id: 'michael15',
        content: 'Haha, thanks! I\'ve been practicing a lot. By the way, are you free this weekend? We should catch up over coffee!',
        senderId: 'michael-chen',
        createdAt: new Date(Date.now() - 14400000), // 4 hours ago
        isRead: true
      },
      {
        _id: 'michael16',
        content: 'That sounds great! Saturday afternoon works for me. The usual place?',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 14340000),
        isRead: true
      },
      {
        _id: 'michael17',
        content: 'Perfect! Saturday at 2 PM at Brew & Bean. See you then! ☕',
        senderId: 'michael-chen',
        createdAt: new Date(Date.now() - 7200000), // 2 hours ago
        isRead: true
      },
      {
        _id: 'michael18',
        content: 'Looking forward to it! 😊',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 7140000),
        isRead: true
      },
      {
        _id: 'michael19',
        content: '',
        senderId: 'michael-chen',
        createdAt: new Date(Date.now() - 3600000), // 1 hour ago
        isRead: false,
        voiceMessage: {
          url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
          duration: 45,
          waveform: [0.3, 0.5, 0.7, 0.4, 0.6, 0.8, 0.5, 0.7, 0.3, 0.6, 0.4, 0.8, 0.5, 0.7, 0.6, 0.4, 0.8, 0.5, 0.7, 0.3]
        }
      },
      {
        _id: 'michael20',
        content: 'Oh, and I almost forgot! Here are a few more photos from the trip - the food was incredible! 🍜🍱',
        senderId: 'michael-chen',
        createdAt: new Date(Date.now() - 1800000), // 30 minutes ago
        isRead: false,
        attachments: [
          {
            id: 'michael-img-5',
            name: 'ramen-tokyo.jpg',
            type: 'image/jpeg',
            size: 2345678,
            url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'michael-img-6',
            name: 'sushi-platter.jpg',
            type: 'image/jpeg',
            size: 2789012,
            url: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&auto=format&fit=crop&q=60'
          }
        ]
      }
    ],
    // Emma Wilson Messages
    '106': [
      {
        _id: 'emma1',
        content: 'Hi! Thanks for your help with the project yesterday. You\'re a lifesaver! 🙌',
        senderId: 'emma-wilson',
        createdAt: new Date(Date.now() - 172800000), // 2 days ago
        isRead: true
      },
      {
        _id: 'emma2',
        content: 'No problem at all, Emma! Happy to help. How is the design coming along?',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 172740000),
        isRead: true
      },
      {
        _id: 'emma3',
        content: 'It\'s going great! I just finished the new dashboard mockups. Want to take a look?',
        senderId: 'emma-wilson',
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
        isRead: true
      },
      {
        _id: 'emma4',
        content: '',
        senderId: 'emma-wilson',
        createdAt: new Date(Date.now() - 86340000),
        isRead: true,
        attachments: [
          {
            id: 'emma-img-1',
            name: 'dashboard-dark-mode.jpg',
            type: 'image/jpeg',
            size: 2456789,
            url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'emma-img-2',
            name: 'mobile-app-ui.jpg',
            type: 'image/jpeg',
            size: 1890123,
            url: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'emma5',
        content: 'These look amazing! 🎨 The dark mode contrast is perfect. I really like the chart visualizations.',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 86280000),
        isRead: true
      },
      {
        _id: 'emma6',
        content: 'Thanks! I was worried about the color palette, but I think it works. Here are the full specs and assets if you want to dig deeper.',
        senderId: 'emma-wilson',
        createdAt: new Date(Date.now() - 43200000), // 12 hours ago
        isRead: true
      },
      {
        _id: 'emma7',
        content: '',
        senderId: 'emma-wilson',
        createdAt: new Date(Date.now() - 43140000),
        isRead: true,
        attachments: [
          {
            id: 'emma-doc-1',
            name: 'Project-Phoenix-Design-System.pdf',
            type: 'application/pdf',
            size: 8901234,
            url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
          },
          {
            id: 'emma-zip-1',
            name: 'icons-and-assets.zip',
            type: 'application/zip',
            size: 15678901,
            url: '#'
          }
        ]
      },
      {
        _id: 'emma8',
        content: 'Got them! I\'ll review the design system document tonight. By the way, did you get a chance to look at the user flow?',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 43080000),
        isRead: true
      },
      {
        _id: 'emma9',
        content: 'Yes! I actually have some thoughts on the onboarding flow. Easier to explain via voice.',
        senderId: 'emma-wilson',
        createdAt: new Date(Date.now() - 28800000), // 8 hours ago
        isRead: true
      },
      {
        _id: 'emma10',
        content: '',
        senderId: 'emma-wilson',
        createdAt: new Date(Date.now() - 28740000),
        isRead: true,
        voiceMessage: {
          url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
          duration: 125,
          waveform: [0.2, 0.5, 0.8, 0.4, 0.6, 0.9, 0.3, 0.7, 0.5, 0.8, 0.4, 0.6, 0.9, 0.3, 0.7, 0.5, 0.8, 0.4, 0.6, 0.2]
        }
      },
      {
        _id: 'emma11',
        content: 'That makes total sense. Simplifying the sign-up steps will definitely improve conversion. I\'ll update the flow diagram.',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 28680000),
        isRead: true
      },
      {
        _id: 'emma12',
        content: 'Great! Also, check out this inspiration board I found. Might be useful for the landing page.',
        senderId: 'emma-wilson',
        createdAt: new Date(Date.now() - 14400000), // 4 hours ago
        isRead: true
      },
      {
        _id: 'emma13',
        content: '',
        senderId: 'emma-wilson',
        createdAt: new Date(Date.now() - 14340000),
        isRead: true,
        attachments: [
          {
            id: 'emma-img-3',
            name: 'landing-page-inspo.jpg',
            type: 'image/jpeg',
            size: 3456789,
            url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'emma14',
        content: 'Love the typography here! We should definitely try something similar.',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 14280000),
        isRead: true
      },
      {
        _id: 'emma15',
        content: 'Right? It\'s so clean. Anyway, are we still on for the team lunch tomorrow?',
        senderId: 'emma-wilson',
        createdAt: new Date(Date.now() - 7200000), // 2 hours ago
        isRead: false
      },
      {
        _id: 'emma16',
        content: 'Absolutely! 12:30 at the Italian place?',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 7140000),
        isRead: true
      },
      {
        _id: 'emma17',
        content: 'Perfect! See you then. 🍕🍝',
        senderId: 'emma-wilson',
        createdAt: new Date(Date.now() - 3600000), // 1 hour ago
        isRead: false
      },
      {
        _id: 'emma18',
        content: '',
        senderId: 'emma-wilson',
        createdAt: new Date(Date.now() - 1800000), // 30 minutes ago
        isRead: false,
        voiceMessage: {
          url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
          duration: 30,
          waveform: [0.4, 0.6, 0.3, 0.7, 0.5, 0.8, 0.4, 0.6, 0.3, 0.7, 0.5, 0.8, 0.4, 0.6, 0.3, 0.7, 0.5, 0.8, 0.4, 0.6]
        }
      }
    ],
    // Samurai Group Messages
    '101': [
      {
        _id: 'sam1',
        content: 'Welcome to the samurai group! 🗡️',
        senderId: 'admin-user',
        createdAt: new Date(Date.now() - 300000),
        isRead: true
      },
      {
        _id: 'sam2',
        content: 'This is a place for warriors and strategists to discuss tactics and philosophy.',
        senderId: 'admin-user',
        createdAt: new Date(Date.now() - 240000),
        isRead: true
      },
      {
        _id: 'sam3',
        content: 'Looking forward to great discussions here!',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 180000),
        isRead: true
      }
    ],
    // Takashi Group Messages
    '102': [
      {
        _id: 'tak1',
        content: 'Welcome to the takashi group! 🎌',
        senderId: 'admin-user',
        createdAt: new Date(Date.now() - 300000),
        isRead: true
      },
      {
        _id: 'tak2',
        content: 'A community for sharing knowledge and experiences.',
        senderId: 'admin-user',
        createdAt: new Date(Date.now() - 240000),
        isRead: true
      },
      {
        _id: 'tak3',
        content: 'Excited to be part of this group!',
        senderId: user?._id || 'current-user',
        createdAt: new Date(Date.now() - 180000),
        isRead: true
      }
    ],
    // Tech News Channel (ID: 3)
    '3': [
      {
        _id: 'tech1',
        content: `🚀 Breaking: OpenAI announces GPT-5 with revolutionary multimodal capabilities!

The new model can process text, images, audio, and video simultaneously, marking a significant leap in AI technology. Early benchmarks show 40% improvement over GPT-4 in reasoning tasks.

Read the full announcement and technical details in the image below.`,
        senderId: 'tech-admin',
        createdAt: new Date(Date.now() - 3600000),
        isRead: false,
        views: 133200,
        attachments: [
          {
            id: 'tech-img-1',
            name: 'gpt5-announcement.jpg',
            type: 'image/jpeg',
            size: 2456789,
            url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'tech2',
        content: `🎥 GPT-5 Demo Video - Must Watch!

This 10-minute demo showcases real-world applications including:
• Real-time video analysis
• Advanced code generation
• Multi-language translation
• Creative content creation

Watch the full demo below:`,
        senderId: 'tech-admin',
        createdAt: new Date(Date.now() - 7200000),
        isRead: true,
        views: 89400,
        attachments: [
          {
            id: 'tech-vid-1',
            name: 'gpt5-demo.mp4',
            type: 'video/mp4',
            size: 15678900,
            url: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      },
      {
        _id: 'tech3',
        content: '',
        senderId: 'tech-admin',
        createdAt: new Date(Date.now() - 14400000),
        isRead: true,
        views: 52300,
        attachments: [
          {
            id: 'tech-pdf-1',
            name: 'iOS18-Features.pdf',
            type: 'application/pdf',
            size: 3456789,
            url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
          }
        ]
      },
      {
        _id: 'tech4',
        content: '',
        senderId: 'tech-admin',
        createdAt: new Date(Date.now() - 21600000),
        isRead: true,
        views: 45800,
        voiceMessage: {
          url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
          duration: 135,
          waveform: [30, 45, 60, 75, 65, 50, 40, 55, 70, 80, 75, 60, 45, 35, 50, 65, 75, 85, 70, 55, 40, 45, 60, 75, 80, 70, 55, 45, 35, 50, 65, 75, 70, 60, 50, 40, 55, 70, 65, 50]
        }
      },
      {
        _id: 'tech5',
        content: '💻 Microsoft unveils new Surface lineup at tech conference',
        senderId: 'tech-admin',
        createdAt: new Date(Date.now() - 28800000),
        isRead: true,
        views: 28500,
        attachments: [
          {
            id: 'tech-img-2',
            name: 'surface-lineup.jpg',
            type: 'image/jpeg',
            size: 1987654,
            url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'tech6',
        content: '',
        senderId: 'tech-admin',
        createdAt: new Date(Date.now() - 28800000),
        isRead: true,
        views: 45800,
        voiceMessage: {
          url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
          duration: 135,
          waveform: [30, 45, 60, 75, 50, 40, 55, 70, 65, 50, 45, 60, 80, 70, 55, 45, 50, 65, 75, 60, 50, 45, 55, 70, 65, 50, 60, 75, 70, 55, 45, 50, 60, 70, 65, 55, 50, 60, 70, 65]
        }
      },
      {
        _id: 'tech7',
        content: 'What are your thoughts on the latest AI developments? Share your opinions in the comments!',
        senderId: 'tech-admin',
        createdAt: new Date(Date.now() - 32400000),
        isRead: true,
        views: 28500
      },
      {
        _id: 'tech8',
        content: 'https://twitter.com/Zeon1818/status/1743277884213805253?s=35',
        senderId: 'tech-admin',
        createdAt: new Date(Date.now() - 36000000),
        isRead: true,
        views: 32100
      },
      {
        _id: 'tech9',
        content: `🤖 Google Gemini Ultra Surpasses GPT-4 in Benchmark Tests

Google's latest AI model, Gemini Ultra, has achieved groundbreaking results across multiple benchmarks:

📊 Key Performance Metrics:
• 90.0% on MMLU (Massive Multitask Language Understanding)
• 59.4% on MATH (challenging math problems)
• 62.4% on HumanEval (code generation)
• Native multimodal processing (text, image, audio, video)

🎯 Unique Features:
• 1 million token context window
• Real-time video understanding
• Advanced reasoning capabilities
• Seamless integration with Google Workspace

Available now in Google AI Studio and Vertex AI.

Full technical report and benchmarks:`,
        senderId: 'tech-admin',
        createdAt: new Date(Date.now() - 39600000),
        isRead: false,
        views: 156700,
        attachments: [
          {
            id: 'tech-img-3',
            name: 'gemini-ultra-benchmarks.jpg',
            type: 'image/jpeg',
            size: 2678901,
            url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'tech-img-4',
            name: 'gemini-performance-chart.jpg',
            type: 'image/jpeg',
            size: 2345678,
            url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'tech10',
        content: `🚗 Tesla's Full Self-Driving v12 - Neural Network Revolution

Tesla has released FSD v12, marking a complete shift to end-to-end neural networks:

🧠 What's New:
• No more hand-coded rules - pure AI decision making
• Trained on millions of hours of driving data
• Smoother, more human-like driving behavior
• Improved handling of edge cases
• Better city street navigation

📹 Watch the comprehensive review and real-world testing:`,
        senderId: 'tech-admin',
        createdAt: new Date(Date.now() - 43200000),
        isRead: true,
        views: 134500,
        attachments: [
          {
            id: 'tech-vid-2',
            name: 'tesla-fsd-v12-review.mp4',
            type: 'video/mp4',
            size: 23456789,
            url: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      },
      {
        _id: 'tech11',
        content: `💾 Quantum Computing Breakthrough: IBM's 1000+ Qubit Processor

IBM has unveiled the Condor processor with 1,121 qubits, pushing quantum computing into a new era:

⚛️ Technical Achievements:
• 1,121 superconducting qubits
• Improved error correction
• 3x faster gate operations
• Enhanced coherence times
• Modular architecture for scaling

🔬 Potential Applications:
• Drug discovery and molecular simulation
• Financial modeling and risk analysis
• Cryptography and security
• Climate modeling
• Materials science

Download the full technical whitepaper:`,
        senderId: 'tech-admin',
        createdAt: new Date(Date.now() - 46800000),
        isRead: true,
        views: 112300,
        attachments: [
          {
            id: 'tech-pdf-2',
            name: 'ibm-quantum-condor-whitepaper.pdf',
            type: 'application/pdf',
            size: 5678901,
            url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
          }
        ]
      },
      {
        _id: 'tech12',
        content: '',
        senderId: 'tech-admin',
        createdAt: new Date(Date.now() - 50400000),
        isRead: true,
        views: 98700,
        voiceMessage: {
          url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
          duration: 195,
          waveform: [35, 50, 65, 80, 70, 55, 45, 60, 75, 85, 80, 65, 50, 40, 55, 70, 80, 90, 75, 60, 45, 50, 65, 80, 85, 75, 60, 50, 40, 55, 70, 80, 75, 65, 55, 45, 60, 75, 70, 55]
        }
      },
      {
        _id: 'tech13',
        content: `🍎 Apple Vision Pro: Spatial Computing Era Begins

Apple's Vision Pro launches next month, redefining mixed reality:

✨ Groundbreaking Features:
• Dual 4K micro-OLED displays (23 million pixels)
• M2 + R1 chip for real-time processing
• Eye tracking with 12 cameras
• Spatial audio with 6 microphones
• Pass-through AR with 12ms latency
• visionOS with 600+ optimized apps

💰 Pricing & Availability:
• Starting at $3,499
• Pre-orders open January 19
• Ships February 2
• US launch first, global rollout Q2

Hands-on review and app ecosystem overview:`,
        senderId: 'tech-admin',
        createdAt: new Date(Date.now() - 54000000),
        isRead: true,
        views: 187600,
        attachments: [
          {
            id: 'tech-vid-3',
            name: 'vision-pro-hands-on.mp4',
            type: 'video/mp4',
            size: 19876543,
            url: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      },
      {
        _id: 'tech14',
        content: `🔋 Solid-State Battery Breakthrough: 1000-Mile Range EVs Coming

Toyota announces major breakthrough in solid-state battery technology:

⚡ Revolutionary Specs:
• 1,000+ mile range on single charge
• 10-minute fast charging (0-80%)
• 50% lighter than lithium-ion
• No thermal runaway risk
• 20+ year lifespan
• -40°C to 100°C operating range

🚗 Production Timeline:
• Prototype vehicles: 2025
• Limited production: 2027
• Mass production: 2028-2030
• Expected to revolutionize EV adoption

Technical specifications and chemistry details:`,
        senderId: 'tech-admin',
        createdAt: new Date(Date.now() - 57600000),
        isRead: true,
        views: 203400,
        attachments: [
          {
            id: 'tech-img-5',
            name: 'solid-state-battery-tech.jpg',
            type: 'image/jpeg',
            size: 2567890,
            url: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'tech-img-6',
            name: 'ev-range-comparison.jpg',
            type: 'image/jpeg',
            size: 2234567,
            url: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'tech15',
        content: `🌐 Starlink Achieves 5 Million Subscribers Worldwide

SpaceX's satellite internet service hits major milestone:

📡 Network Stats:
• 5 million active subscribers
• 5,000+ satellites in orbit
• 100+ Mbps average speeds
• 20-40ms latency
• Coverage in 60+ countries
• 99.9% uptime

🚀 Expansion Plans:
• Gen2 satellites with laser links
• Direct-to-cell service (partnership with T-Mobile)
• Maritime and aviation connectivity
• Starship launches for rapid deployment

Impact on global internet accessibility and digital divide:

Read the full report:`,
        senderId: 'tech-admin',
        createdAt: new Date(Date.now() - 61200000),
        isRead: true,
        views: 145600,
        attachments: [
          {
            id: 'tech-pdf-3',
            name: 'starlink-global-impact-report.pdf',
            type: 'application/pdf',
            size: 4567890,
            url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
          }
        ]
      },
      {
        _id: 'tech16',
        content: `🧬 CRISPR Gene Therapy Cures Sickle Cell Disease

FDA approves first CRISPR-based treatment for genetic disease:

🔬 Medical Breakthrough:
• First FDA-approved CRISPR therapy
• 95% success rate in clinical trials
• One-time treatment, lifelong cure
• Edits patient's own stem cells
• No donor matching required

💊 Treatment Process:
• Stem cells harvested from patient
• CRISPR editing performed ex vivo
• Modified cells reinfused
• 4-6 week hospital stay
• Full recovery in 3-6 months

🏥 Availability & Cost:
• Approved for ages 12+
• $2.2 million per treatment
• Insurance coverage varies
• Expanding to beta-thalassemia

This marks the beginning of the gene therapy revolution.

Clinical trial results and patient testimonials:`,
        senderId: 'tech-admin',
        createdAt: new Date(Date.now() - 64800000),
        isRead: true,
        views: 167800,
        attachments: [
          {
            id: 'tech-vid-4',
            name: 'crispr-therapy-explained.mp4',
            type: 'video/mp4',
            size: 17654321,
            url: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      },
      {
        _id: 'tech17',
        content: '',
        senderId: 'tech-admin',
        createdAt: new Date(Date.now() - 68400000),
        isRead: true,
        views: 87600,
        voiceMessage: {
          url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
          duration: 210,
          waveform: [30, 45, 60, 75, 65, 50, 40, 55, 70, 80, 75, 60, 45, 35, 50, 65, 75, 85, 70, 55, 40, 45, 60, 75, 80, 70, 55, 45, 35, 50, 65, 75, 70, 60, 50, 40, 55, 70, 65, 50]
        }
      },
      {
        _id: 'tech18',
        content: `🤝 Microsoft & OpenAI Partnership Expands: $10B Investment

Microsoft deepens commitment to AI leadership with massive investment:

💰 Investment Details:
• $10 billion over multiple years
• Azure exclusive cloud provider
• Integration across Microsoft products
• Joint AI research initiatives
• Revenue sharing agreement

🎯 Strategic Goals:
• Copilot in all Microsoft 365 apps
• Azure AI infrastructure expansion
• Enterprise AI solutions
• Gaming AI integration (Xbox)
• Bing search enhancement

📊 Market Impact:
• Microsoft stock +35% YTD
• Azure AI revenue up 200%
• 1M+ businesses using Copilot
• Competition with Google intensifies

Analysis and future implications:`,
        senderId: 'tech-admin',
        createdAt: new Date(Date.now() - 72000000),
        isRead: true,
        views: 134500,
        attachments: [
          {
            id: 'tech-img-7',
            name: 'microsoft-openai-partnership.jpg',
            type: 'image/jpeg',
            size: 2456789,
            url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'tech-img-8',
            name: 'ai-market-share.jpg',
            type: 'image/jpeg',
            size: 2123456,
            url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60'
          }
        ]
      }
    ],
    // Design Inspiration Channel (ID: 10)
    '10': [
      {
        _id: 'design1',
        content: `🎨 Weekly Design Inspiration: Minimalist UI Trends 2024

This week we explore the rise of minimalist design in modern applications. Key trends include:

• Clean typography with generous whitespace
• Subtle animations and micro-interactions
• Monochromatic color schemes
• Focus on user experience over decoration

Swipe through the images below for examples from top designers.`,
        senderId: 'design-admin',
        createdAt: new Date(Date.now() - 1800000),
        isRead: false,
        attachments: [
          {
            id: 'design-img-1',
            name: 'minimalist-ui-trends.jpg',
            type: 'image/jpeg',
            size: 1876543,
            url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'design-img-2',
            name: 'modern-dashboard.jpg',
            type: 'image/jpeg',
            size: 2134567,
            url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'design2',
        content: 'Beautiful color palette for modern web apps 🌈\n\nPrimary: #667eea\nSecondary: #764ba2\nAccent: #f093fb\n\nPerfect for gradients!',
        senderId: 'design-admin',
        createdAt: new Date(Date.now() - 5400000),
        isRead: true,
        attachments: [
          {
            id: 'design-img-3',
            name: 'color-palette.png',
            type: 'image/png',
            size: 987654,
            url: 'https://images.unsplash.com/photo-1525909002-1b05e0c869d8?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'design3',
        content: '📐 Figma Design System Template - Download now!',
        senderId: 'design-admin',
        createdAt: new Date(Date.now() - 10800000),
        isRead: true,
        attachments: [
          {
            id: 'design-file-1',
            name: 'design-system-template.fig',
            type: 'application/octet-stream',
            size: 5678900,
            url: 'https://www.figma.com/file/example'
          }
        ]
      },
      {
        _id: 'design4',
        content: '✨ Top 10 UI/UX portfolios showcase video',
        senderId: 'design-admin',
        createdAt: new Date(Date.now() - 18000000),
        isRead: true,
        attachments: [
          {
            id: 'design-vid-1',
            name: 'portfolio-showcase.mp4',
            type: 'video/mp4',
            size: 12345678,
            url: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      },
      {
        _id: 'design5',
        content: '',
        senderId: 'design-admin',
        createdAt: new Date(Date.now() - 25200000),
        isRead: true,
        voiceMessage: {
          url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
          duration: 240,
          waveform: [25, 40, 55, 70, 60, 45, 35, 50, 65, 75, 70, 55, 40, 30, 45, 60, 70, 80, 65, 50, 35, 40, 55, 70, 75, 65, 50, 40, 30, 45, 60, 70, 65, 55, 45, 35, 50, 65, 60, 45]
        }
      },
      {
        _id: 'design6',
        content: `🌟 Glassmorphism Design Trend: The Future of UI

Glassmorphism is taking over modern UI design! This aesthetic combines transparency, blur effects, and vibrant colors for stunning visual depth.

Key characteristics:
• Frosted glass effect with backdrop blur
• Semi-transparent backgrounds with subtle borders
• Layered depth and hierarchy
• Vibrant color gradients underneath
• Soft shadows for elevation
• Works beautifully in dark mode

Popular use cases:
• Dashboard cards and widgets
• Navigation bars and menus
• Modal dialogs and overlays
• Mobile app interfaces
• Landing page hero sections

Design tools and resources: https://glassmorphism.com`,
        senderId: 'design-admin',
        createdAt: new Date(Date.now() - 28800000),
        isRead: false,
        views: 123400,
        attachments: [
          {
            id: 'design-img-4',
            name: 'glassmorphism-examples.jpg',
            type: 'image/jpeg',
            size: 2567890,
            url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'design-img-5',
            name: 'glass-ui-components.jpg',
            type: 'image/jpeg',
            size: 2345678,
            url: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'design7',
        content: `🎯 Typography Masterclass: Choosing the Perfect Font Pairing

Typography can make or break your design! Learn how to pair fonts like a professional designer.

Font pairing principles:
• Contrast is key - Pair serif with sans-serif
• Limit to 2-3 fonts maximum per project
• Establish clear hierarchy (headings, body, captions)
• Consider readability and accessibility
• Match font personality to brand identity

Top font combinations 2024:
• Playfair Display + Source Sans Pro
• Montserrat + Merriweather
• Raleway + Lora
• Inter + Crimson Text
• Poppins + Lato

Typography resources:
• Google Fonts library
• Adobe Fonts collection
• Font pairing tools (Fontjoy, Typewolf)
• Web typography best practices

Complete typography guide and font pairing examples:`,
        senderId: 'design-admin',
        createdAt: new Date(Date.now() - 32400000),
        isRead: true,
        views: 145600,
        attachments: [
          {
            id: 'design-pdf-1',
            name: 'typography-masterclass.pdf',
            type: 'application/pdf',
            size: 4567890,
            url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
          }
        ]
      },
      {
        _id: 'design8',
        content: '',
        senderId: 'design-admin',
        createdAt: new Date(Date.now() - 36000000),
        isRead: true,
        views: 98700,
        attachments: [
          {
            id: 'design-vid-2',
            name: 'animation-principles-tutorial.mp4',
            type: 'video/mp4',
            size: 19876543,
            url: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      },
      {
        _id: 'design9',
        content: `🎨 Color Psychology in UI Design: Emotions & User Behavior

Colors evoke emotions and influence user decisions! Master color psychology to create impactful designs.

Color meanings and applications:
• Blue - Trust, security, professionalism (Banks, tech)
• Red - Urgency, passion, excitement (Sales, food)
• Green - Growth, health, nature (Wellness, finance)
• Yellow - Optimism, warmth, attention (Warnings, highlights)
• Purple - Luxury, creativity, wisdom (Premium brands)
• Orange - Energy, enthusiasm, friendliness (CTAs, social)
• Black - Sophistication, elegance, power (Luxury, fashion)
• White - Simplicity, cleanliness, minimalism (Tech, healthcare)

Color theory essentials:
• Color wheel and complementary colors
• Analogous and triadic color schemes
• 60-30-10 rule for color distribution
• Accessibility and contrast ratios (WCAG)
• Cultural considerations in color choice

Color palette generators and tools:`,
        senderId: 'design-admin',
        createdAt: new Date(Date.now() - 39600000),
        isRead: true,
        views: 134500,
        attachments: [
          {
            id: 'design-img-6',
            name: 'color-psychology-chart.jpg',
            type: 'image/jpeg',
            size: 2456789,
            url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'design-img-7',
            name: 'color-wheel-guide.jpg',
            type: 'image/jpeg',
            size: 2234567,
            url: 'https://images.unsplash.com/photo-1525909002-1b05e0c869d8?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'design-img-8',
            name: 'ui-color-examples.jpg',
            type: 'image/jpeg',
            size: 2123456,
            url: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'design10',
        content: '',
        senderId: 'design-admin',
        createdAt: new Date(Date.now() - 43200000),
        isRead: true,
        views: 87600,
        voiceMessage: {
          url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
          duration: 210,
          waveform: [30, 45, 60, 75, 65, 50, 40, 55, 70, 80, 75, 60, 45, 35, 50, 65, 75, 85, 70, 55, 40, 45, 60, 75, 80, 70, 55, 45, 35, 50, 65, 75, 70, 60, 50, 40, 55, 70, 65, 50]
        }
      },
      {
        _id: 'design11',
        content: `📱 Mobile-First Design: Best Practices for 2024

Mobile devices account for 60%+ of web traffic! Design mobile-first for better user experiences.

Mobile-first principles:
• Start with smallest screen, scale up (progressive enhancement)
• Touch-friendly targets (minimum 44x44px)
• Thumb-friendly navigation zones
• Simplified navigation and content hierarchy
• Fast loading times and performance optimization
• Responsive images and adaptive layouts

Mobile UX essentials:
• Bottom navigation for easy thumb reach
• Swipe gestures and intuitive interactions
• Minimal form fields with smart defaults
• Clear CTAs and visual feedback
• Offline functionality considerations
• Native app patterns vs web conventions

Testing and optimization:
• Test on real devices, not just emulators
• Various screen sizes and orientations
• Different network conditions (3G, 4G, 5G)
• Accessibility features (VoiceOver, TalkBack)

Mobile design patterns and component library:`,
        senderId: 'design-admin',
        createdAt: new Date(Date.now() - 46800000),
        isRead: true,
        views: 112300,
        attachments: [
          {
            id: 'design-vid-3',
            name: 'mobile-first-design-guide.mp4',
            type: 'video/mp4',
            size: 18765432,
            url: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      },
      {
        _id: 'design12',
        content: `✨ Micro-interactions: The Secret to Delightful UX

Small animations and interactions create memorable user experiences! Master micro-interactions for engaging designs.

Types of micro-interactions:
• Button hover states and click feedback
• Loading animations and progress indicators
• Form validation and error messages
• Toggle switches and checkbox animations
• Pull-to-refresh and swipe gestures
• Notification badges and alerts
• Skeleton screens and content loading
• Success confirmations and celebrations

Design principles:
• Keep animations under 300ms for responsiveness
• Use easing functions for natural motion
• Provide clear visual feedback
• Don't overdo it - subtlety is key
• Ensure accessibility (respect prefers-reduced-motion)

Tools for creating micro-interactions:
• Framer Motion (React animations)
• Lottie (JSON-based animations)
• CSS animations and transitions
• GSAP (GreenSock Animation Platform)
• Principle (prototyping tool)

Micro-interaction examples and code snippets:`,
        senderId: 'design-admin',
        createdAt: new Date(Date.now() - 50400000),
        isRead: true,
        views: 156700,
        attachments: [
          {
            id: 'design-img-9',
            name: 'micro-interactions-examples.jpg',
            type: 'image/jpeg',
            size: 2567890,
            url: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'design-img-10',
            name: 'animation-principles.jpg',
            type: 'image/jpeg',
            size: 2345678,
            url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'design13',
        content: `🎭 Dark Mode Design: Creating Beautiful Night Themes

Dark mode is no longer optional! Learn to design stunning dark themes that users love.

Dark mode benefits:
• Reduced eye strain in low-light environments
• Battery savings on OLED screens
• Modern, premium aesthetic
• Better focus on content
• Accessibility for light-sensitive users

Design considerations:
• Don't just invert colors - redesign thoughtfully
• Use true black (#000000) sparingly
• Prefer dark grays (#121212, #1E1E1E)
• Reduce contrast for comfortable reading
• Adjust color saturation and brightness
• Test in various lighting conditions

Color adjustments:
• Desaturate bright colors slightly
• Increase elevation with lighter surfaces
• Use shadows and borders carefully
• Maintain sufficient contrast ratios (WCAG)
• Consider color blindness accessibility

Implementation tips:
• CSS custom properties for theme switching
• System preference detection (prefers-color-scheme)
• User toggle with persistent preference
• Smooth transitions between modes

Dark mode design system and color palettes:`,
        senderId: 'design-admin',
        createdAt: new Date(Date.now() - 54000000),
        isRead: true,
        views: 103400,
        attachments: [
          {
            id: 'design-pdf-2',
            name: 'dark-mode-design-guide.pdf',
            type: 'application/pdf',
            size: 3789012,
            url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
          }
        ]
      }
    ],
    // Photography Tips Channel (ID: 14)
    '14': [
      {
        _id: 'photo1',
        content: `📸 Golden Hour Photography Masterclass

Learn the secrets of capturing stunning golden hour shots! This comprehensive guide covers:

🌅 Best times for golden hour photography
📷 Optimal camera settings and techniques
🎨 Composition tips for dramatic lighting
✨ Post-processing workflow

Check out these beautiful examples below to inspire your next shoot!`,
        senderId: 'photo-admin',
        createdAt: new Date(Date.now() - 2700000),
        isRead: false,
        attachments: [
          {
            id: 'photo-img-1',
            name: 'golden-hour-sunset.jpg',
            type: 'image/jpeg',
            size: 3456789,
            url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'photo-img-2',
            name: 'golden-hour-landscape.jpg',
            type: 'image/jpeg',
            size: 2987654,
            url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'photo2',
        content: 'Perfect camera settings for sunset shots:\n\n📷 ISO: 100-400\n⏱️ Shutter: 1/250s\n🔍 Aperture: f/8-f/11\n\nTry these and share your results!',
        senderId: 'photo-admin',
        createdAt: new Date(Date.now() - 9000000),
        isRead: true,
        attachments: [
          {
            id: 'photo-pdf-1',
            name: 'camera-settings-guide.pdf',
            type: 'application/pdf',
            size: 1234567,
            url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
          }
        ]
      },
      {
        _id: 'photo3',
        content: '🎥 Video tutorial: Portrait photography lighting techniques',
        senderId: 'photo-admin',
        createdAt: new Date(Date.now() - 16200000),
        isRead: true,
        attachments: [
          {
            id: 'photo-vid-1',
            name: 'portrait-lighting-tutorial.mp4',
            type: 'video/mp4',
            size: 18765432,
            url: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      },
      {
        _id: 'photo4',
        content: '🌅 Amazing sunrise shots from our community members!',
        senderId: 'photo-admin',
        createdAt: new Date(Date.now() - 25200000),
        isRead: true,
        attachments: [
          {
            id: 'photo-img-3',
            name: 'sunrise-1.jpg',
            type: 'image/jpeg',
            size: 2345678,
            url: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'photo-img-4',
            name: 'sunrise-2.jpg',
            type: 'image/jpeg',
            size: 2567890,
            url: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'photo-img-5',
            name: 'sunrise-3.jpg',
            type: 'image/jpeg',
            size: 2123456,
            url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&auto=format&fit=crop&q=60'
          }
        ]
      }
    ],
    // Cooking Recipes Channel (ID: 16)
    '16': [
      {
        _id: 'cook1',
        content: `🍝 Easy Pasta Carbonara Recipe (15 mins)

Authentic Italian carbonara made simple! This classic Roman dish requires just 5 ingredients:

✓ Spaghetti
✓ Eggs
✓ Pancetta
✓ Pecorino Romano
✓ Black pepper

No cream needed! Follow our step-by-step guide for restaurant-quality results at home. Perfect for busy weeknights!`,
        senderId: 'cooking-admin',
        createdAt: new Date(Date.now() - 3600000),
        isRead: false,
        attachments: [
          {
            id: 'cook-img-1',
            name: 'pasta-carbonara.jpg',
            type: 'image/jpeg',
            size: 1876543,
            url: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'cook2',
        content: 'Ingredients:\n• 400g spaghetti\n• 200g pancetta\n• 4 eggs\n• 100g parmesan\n• Black pepper\n\nFull recipe video below!',
        senderId: 'cooking-admin',
        createdAt: new Date(Date.now() - 10800000),
        isRead: true,
        attachments: [
          {
            id: 'cook-vid-1',
            name: 'carbonara-recipe.mp4',
            type: 'video/mp4',
            size: 14567890,
            url: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      },
      {
        _id: 'cook3',
        content: '🥗 Healthy meal prep ideas for the week!',
        senderId: 'cooking-admin',
        createdAt: new Date(Date.now() - 18000000),
        isRead: true,
        attachments: [
          {
            id: 'cook-pdf-1',
            name: 'meal-prep-guide.pdf',
            type: 'application/pdf',
            size: 2345678,
            url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
          },
          {
            id: 'cook-img-2',
            name: 'meal-prep-containers.jpg',
            type: 'image/jpeg',
            size: 1567890,
            url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'cook4',
        content: '🍰 Baking tips: How to make the perfect chocolate cake',
        senderId: 'cooking-admin',
        createdAt: new Date(Date.now() - 28800000),
        isRead: true,
        attachments: [
          {
            id: 'cook-img-3',
            name: 'chocolate-cake-step1.jpg',
            type: 'image/jpeg',
            size: 1234567,
            url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'cook-img-4',
            name: 'chocolate-cake-final.jpg',
            type: 'image/jpeg',
            size: 1456789,
            url: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&auto=format&fit=crop&q=60'
          }
        ]
      }
    ],
    // Fitness & Health Channel (ID: 15)
    '15': [
      {
        _id: 'fit1',
        content: `💪 30-Day Workout Challenge Starts Tomorrow!

Join thousands of members in our most popular fitness challenge! 

🎯 What you'll achieve:
• Build strength and endurance
• Lose weight and tone muscles
• Develop healthy habits
• Join a supportive community

No equipment needed! All workouts can be done at home. Download the full challenge calendar below.`,
        senderId: 'fitness-admin',
        createdAt: new Date(Date.now() - 1800000),
        isRead: false,
        attachments: [
          {
            id: 'fit-img-1',
            name: '30-day-challenge-poster.jpg',
            type: 'image/jpeg',
            size: 2345678,
            url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'fit2',
        content: 'Day 1 Workout Plan:\n\n🏃 Warm-up: 5 min jog\n💪 Push-ups: 3x15\n🦵 Squats: 3x20\n🧘 Plank: 3x60s\n\nLet\'s do this together! 🔥',
        senderId: 'fitness-admin',
        createdAt: new Date(Date.now() - 7200000),
        isRead: true,
        attachments: [
          {
            id: 'fit-pdf-1',
            name: 'day1-workout-plan.pdf',
            type: 'application/pdf',
            size: 987654,
            url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
          }
        ]
      },
      {
        _id: 'fit3',
        content: '🎥 Full body workout video (No equipment needed)',
        senderId: 'fitness-admin',
        createdAt: new Date(Date.now() - 14400000),
        isRead: true,
        attachments: [
          {
            id: 'fit-vid-1',
            name: 'fullbody-workout.mp4',
            type: 'video/mp4',
            size: 16789012,
            url: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      },
      {
        _id: 'fit4',
        content: '🥤 Nutrition tip: Best post-workout smoothie recipes',
        senderId: 'fitness-admin',
        createdAt: new Date(Date.now() - 21600000),
        isRead: true,
        attachments: [
          {
            id: 'fit-pdf-2',
            name: 'smoothie-recipes.pdf',
            type: 'application/pdf',
            size: 1567890,
            url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
          },
          {
            id: 'fit-img-2',
            name: 'healthy-smoothies.jpg',
            type: 'image/jpeg',
            size: 1876543,
            url: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'fit5',
        content: '🎧 Workout motivation podcast',
        senderId: 'fitness-admin',
        createdAt: new Date(Date.now() - 28800000),
        isRead: true,
        audioMessage: {
          url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
          duration: 300
        }
      }
    ],
    // Job Opportunities Channel (ID: 11)
    '11': [
      {
        _id: 'job1',
        content: `💼 Senior React Developer - Remote ($120k-$150k)

🏢 Company: Leading Tech Startup (Series B)
📍 Location: Fully Remote (US/EU)
💰 Salary: $120k-$150k + equity

Requirements:
• 5+ years React experience
• TypeScript proficiency
• Experience with Next.js
• Strong problem-solving skills

Benefits: Health insurance, unlimited PTO, home office stipend

Download the full job description PDF below. Apply by end of week!`,
        senderId: 'job-admin',
        createdAt: new Date(Date.now() - 3600000),
        isRead: false,
        attachments: [
          {
            id: 'job-pdf-1',
            name: 'react-developer-jd.pdf',
            type: 'application/pdf',
            size: 876543,
            url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
          }
        ]
      },
      {
        _id: 'job2',
        content: '🚀 Top Tech Companies Hiring Now!',
        senderId: 'job-admin',
        createdAt: new Date(Date.now() - 7200000),
        isRead: true,
        attachments: [
          {
            id: 'job-img-1',
            name: 'hiring-companies.jpg',
            type: 'image/jpeg',
            size: 1567890,
            url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'job3',
        content: `🎯 Product Manager - AI/ML Products ($140k-$180k)

🏢 Company: Fortune 500 Tech Giant
📍 Location: San Francisco, CA / Hybrid
💰 Salary: $140k-$180k + bonus + RSUs

Key Responsibilities:
• Lead AI product roadmap and strategy
• Work with ML engineers and data scientists
• Define product requirements and KPIs
• Stakeholder management and communication
• Market research and competitive analysis
• Go-to-market strategy execution

Requirements:
• 7+ years product management experience
• Technical background (CS/Engineering preferred)
• Experience with AI/ML products
• Strong analytical and communication skills
• MBA preferred but not required

Benefits: Full health coverage, 401k matching, stock options, learning budget

Apply now: https://careers.techgiant.com/pm-ai-ml`,
        senderId: 'job-admin',
        createdAt: new Date(Date.now() - 10800000),
        isRead: false,
        views: 89400,
        attachments: [
          {
            id: 'job-img-2',
            name: 'product-manager-role.jpg',
            type: 'image/jpeg',
            size: 2345678,
            url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'job-img-3',
            name: 'ai-ml-products.jpg',
            type: 'image/jpeg',
            size: 2123456,
            url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'job4',
        content: '',
        senderId: 'job-admin',
        createdAt: new Date(Date.now() - 14400000),
        isRead: true,
        views: 67800,
        attachments: [
          {
            id: 'job-vid-1',
            name: 'interview-tips-2024.mp4',
            type: 'video/mp4',
            size: 18765432,
            url: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      },
      {
        _id: 'job5',
        content: `💻 Full Stack Engineer - Fintech Startup ($100k-$140k)

🏢 Company: Fast-Growing Fintech Startup (Series A)
📍 Location: Remote (Americas timezone)
💰 Salary: $100k-$140k + equity (0.1-0.5%)

Tech Stack:
• Frontend: React, TypeScript, Tailwind CSS
• Backend: Node.js, Express, PostgreSQL
• Cloud: AWS (Lambda, RDS, S3)
• DevOps: Docker, Kubernetes, CI/CD

What You'll Do:
• Build and maintain payment processing systems
• Develop customer-facing web applications
• Optimize database queries and API performance
• Collaborate with product and design teams
• Participate in code reviews and architecture decisions

Requirements:
• 3+ years full stack development experience
• Strong JavaScript/TypeScript skills
• Experience with SQL databases
• Understanding of security best practices
• Fintech or payment systems experience (bonus)

Perks: Remote-first culture, flexible hours, annual retreats, latest tech gear

Full job description and application:`,
        senderId: 'job-admin',
        createdAt: new Date(Date.now() - 18000000),
        isRead: true,
        views: 112300,
        attachments: [
          {
            id: 'job-pdf-2',
            name: 'fullstack-engineer-jd.pdf',
            type: 'application/pdf',
            size: 1234567,
            url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
          }
        ]
      },
      {
        _id: 'job6',
        content: `📊 Data Scientist - Healthcare Analytics ($130k-$170k)

🏢 Company: Healthcare Technology Leader
📍 Location: Boston, MA / Remote Hybrid
💰 Salary: $130k-$170k + comprehensive benefits

Role Overview:
Build predictive models and analytics solutions to improve patient outcomes and healthcare delivery.

Key Responsibilities:
• Develop machine learning models for patient risk prediction
• Analyze large healthcare datasets (EHR, claims data)
• Create data visualizations and dashboards
• Collaborate with clinical teams and stakeholders
• Present findings to executive leadership

Required Skills:
• PhD or Master's in Statistics, CS, or related field
• 5+ years data science experience
• Python (pandas, scikit-learn, TensorFlow)
• SQL and big data technologies (Spark, Hadoop)
• Healthcare domain knowledge preferred
• Strong communication and storytelling skills

Benefits: Comprehensive health insurance, 401k match, professional development, impact-driven mission

Healthcare analytics career opportunities:`,
        senderId: 'job-admin',
        createdAt: new Date(Date.now() - 21600000),
        isRead: true,
        views: 98700,
        attachments: [
          {
            id: 'job-img-4',
            name: 'data-science-healthcare.jpg',
            type: 'image/jpeg',
            size: 2456789,
            url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'job-img-5',
            name: 'analytics-dashboard.jpg',
            type: 'image/jpeg',
            size: 2234567,
            url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'job-img-6',
            name: 'healthcare-tech.jpg',
            type: 'image/jpeg',
            size: 2012345,
            url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'job7',
        content: '',
        senderId: 'job-admin',
        createdAt: new Date(Date.now() - 25200000),
        isRead: true,
        views: 76800,
        voiceMessage: {
          url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
          duration: 195,
          waveform: [35, 50, 65, 80, 70, 55, 45, 60, 75, 85, 80, 65, 50, 40, 55, 70, 80, 90, 75, 60, 45, 50, 65, 80, 85, 75, 60, 50, 40, 55, 70, 80, 75, 65, 55, 45, 60, 75, 70, 55]
        }
      },
      {
        _id: 'job8',
        content: `🎨 UX/UI Designer - SaaS Platform ($90k-$130k)

🏢 Company: B2B SaaS Startup (Growing Fast!)
📍 Location: Remote (Global)
💰 Salary: $90k-$130k based on experience

What You'll Design:
• Enterprise dashboard and analytics interfaces
• Mobile-responsive web applications
• Design system and component library
• User onboarding flows and experiences
• Marketing website and landing pages

Your Toolkit:
• Figma (primary design tool)
• User research and usability testing
• Prototyping and interaction design
• Design systems and atomic design
• Collaboration with developers

Requirements:
• 4+ years UX/UI design experience
• Strong portfolio showcasing SaaS products
• Experience with enterprise software design
• Understanding of frontend development (HTML/CSS)
• Excellent communication skills

Why Join Us:
• Shape product direction and user experience
• Work with talented cross-functional team
• Remote-first company culture
• Professional growth opportunities
• Competitive salary and equity

Portfolio review and application process:`,
        senderId: 'job-admin',
        createdAt: new Date(Date.now() - 28800000),
        isRead: true,
        views: 103400,
        attachments: [
          {
            id: 'job-vid-2',
            name: 'design-portfolio-tips.mp4',
            type: 'video/mp4',
            size: 17654321,
            url: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      },
      {
        _id: 'job9',
        content: `⚙️ DevOps Engineer - Cloud Infrastructure ($110k-$150k)

🏢 Company: Enterprise Cloud Solutions Provider
📍 Location: Austin, TX / Remote Flexible
💰 Salary: $110k-$150k + performance bonus

Infrastructure You'll Manage:
• Multi-cloud environments (AWS, Azure, GCP)
• Kubernetes clusters and container orchestration
• CI/CD pipelines (Jenkins, GitLab CI, GitHub Actions)
• Infrastructure as Code (Terraform, CloudFormation)
• Monitoring and observability (Prometheus, Grafana, ELK)

Key Responsibilities:
• Design and implement scalable cloud architectures
• Automate deployment and infrastructure provisioning
• Ensure system reliability and uptime (99.9% SLA)
• Security hardening and compliance
• Incident response and troubleshooting
• Mentor junior engineers

Required Experience:
• 5+ years DevOps/SRE experience
• Strong Linux/Unix administration skills
• Scripting (Python, Bash, Go)
• Container technologies (Docker, Kubernetes)
• Cloud certifications (AWS/Azure/GCP) preferred

Benefits: Flexible work arrangements, learning budget, conference attendance, stock options

DevOps career path and certifications guide:`,
        senderId: 'job-admin',
        createdAt: new Date(Date.now() - 32400000),
        isRead: true,
        views: 87600,
        attachments: [
          {
            id: 'job-pdf-3',
            name: 'devops-career-guide.pdf',
            type: 'application/pdf',
            size: 3456789,
            url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
          }
        ]
      },
      {
        _id: 'job10',
        content: `🚀 Engineering Manager - Mobile Apps ($150k-$200k)

🏢 Company: Top Consumer Tech Company
📍 Location: Seattle, WA / Hybrid
💰 Salary: $150k-$200k + equity + bonus

Lead Our Mobile Team:
• Manage team of 8-12 iOS and Android engineers
• Drive technical roadmap and architecture decisions
• Foster culture of innovation and excellence
• Partner with product and design leadership
• Recruit and develop top engineering talent

Mobile Tech Stack:
• iOS: Swift, SwiftUI, UIKit
• Android: Kotlin, Jetpack Compose
• Cross-platform: React Native (some projects)
• Backend integration: GraphQL, REST APIs
• Analytics: Firebase, Amplitude

What We're Looking For:
• 8+ years software engineering experience
• 3+ years engineering management experience
• Deep mobile development expertise (iOS/Android)
• Track record of shipping successful apps
• Strong leadership and mentoring skills
• Excellent communication and stakeholder management

Why This Role:
• Lead products used by millions of users
• Work with cutting-edge mobile technologies
• Competitive compensation and benefits
• Career growth opportunities
• Collaborative and inclusive culture

Application and interview process details:`,
        senderId: 'job-admin',
        createdAt: new Date(Date.now() - 36000000),
        isRead: true,
        views: 134500,
        attachments: [
          {
            id: 'job-img-7',
            name: 'engineering-manager-role.jpg',
            type: 'image/jpeg',
            size: 2456789,
            url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'job-img-8',
            name: 'mobile-development-team.jpg',
            type: 'image/jpeg',
            size: 2234567,
            url: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&auto=format&fit=crop&q=60'
          }
        ]
      }
    ],
    // Crypto Updates Channel (ID: 12)
    '12': [
      {
        _id: 'crypto1',
        content: `₿ Bitcoin breaks $50,000! Market analysis inside

🚀 BTC surges past $50k for the first time since 2021!

Key factors driving the rally:
• Institutional adoption increasing
• Bitcoin ETF approvals
• Halving event approaching
• Weakening US dollar

Analysts predict potential run to $75k by Q2 2024. See the detailed price chart and technical analysis below.`,
        senderId: 'crypto-admin',
        createdAt: new Date(Date.now() - 1800000),
        isRead: false,
        attachments: [
          {
            id: 'crypto-img-1',
            name: 'bitcoin-chart.jpg',
            type: 'image/jpeg',
            size: 1876543,
            url: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'crypto2',
        content: '📈 Top 10 Cryptocurrencies to Watch',
        senderId: 'crypto-admin',
        createdAt: new Date(Date.now() - 5400000),
        isRead: true,
        attachments: [
          {
            id: 'crypto-vid-1',
            name: 'crypto-analysis.mp4',
            type: 'video/mp4',
            size: 13456789,
            url: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      },
      {
        _id: 'crypto3',
        content: `🔗 Ethereum 2.0 Update: The Merge Success & What's Next

Ethereum's transition to Proof-of-Stake is complete! Here's what this means for the network and ETH holders.

Ethereum 2.0 highlights:
• 99.95% reduction in energy consumption
• Improved network security and decentralization
• Staking rewards: 4-5% APY for validators
• Faster transaction finality
• Foundation for future scaling (sharding)
• Deflationary tokenomics with EIP-1559
• Layer 2 solutions gaining traction (Arbitrum, Optimism)

ETH price targets and network statistics: https://ethereum.org/roadmap`,
        senderId: 'crypto-admin',
        createdAt: new Date(Date.now() - 9000000),
        isRead: false,
        views: 145600,
        attachments: [
          {
            id: 'crypto-img-2',
            name: 'ethereum-merge-infographic.jpg',
            type: 'image/jpeg',
            size: 2567890,
            url: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'crypto-img-3',
            name: 'eth-staking-rewards.jpg',
            type: 'image/jpeg',
            size: 2234567,
            url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'crypto4',
        content: `💎 DeFi Deep Dive: Yield Farming & Liquidity Mining Explained

Decentralized Finance is revolutionizing traditional banking! Learn how to earn passive income through DeFi protocols.

DeFi opportunities:
• Liquidity pools - Provide liquidity, earn fees
• Yield farming - Maximize returns across protocols
• Staking - Lock tokens for rewards
• Lending platforms (Aave, Compound)
• DEX trading (Uniswap, PancakeSwap)
• Impermanent loss explained
• Risk management strategies

Complete DeFi guide and protocol comparison:`,
        senderId: 'crypto-admin',
        createdAt: new Date(Date.now() - 12600000),
        isRead: true,
        views: 123400,
        attachments: [
          {
            id: 'crypto-pdf-1',
            name: 'defi-complete-guide.pdf',
            type: 'application/pdf',
            size: 5678901,
            url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
          }
        ]
      },
      {
        _id: 'crypto5',
        content: '',
        senderId: 'crypto-admin',
        createdAt: new Date(Date.now() - 16200000),
        isRead: true,
        views: 98700,
        attachments: [
          {
            id: 'crypto-vid-2',
            name: 'nft-market-analysis.mp4',
            type: 'video/mp4',
            size: 19876543,
            url: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      },
      {
        _id: 'crypto6',
        content: `🎨 NFT Market Update: Blue-Chip Collections & Emerging Trends

The NFT space is evolving beyond JPEGs! Discover the latest trends in digital ownership and collectibles.

NFT market insights:
• Blue-chip collections (BAYC, CryptoPunks, Azuki)
• Gaming NFTs and play-to-earn mechanics
• Music NFTs and artist royalties
• Real-world asset tokenization (RWAs)
• NFT marketplaces (OpenSea, Blur, Magic Eden)
• Utility-focused NFTs vs pure collectibles
• NFT lending and financialization

NFT floor prices and volume analytics:`,
        senderId: 'crypto-admin',
        createdAt: new Date(Date.now() - 19800000),
        isRead: true,
        views: 134500,
        attachments: [
          {
            id: 'crypto-img-4',
            name: 'nft-blue-chip-collections.jpg',
            type: 'image/jpeg',
            size: 2456789,
            url: 'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'crypto-img-5',
            name: 'nft-marketplace-stats.jpg',
            type: 'image/jpeg',
            size: 2345678,
            url: 'https://images.unsplash.com/photo-1644361566696-3d442b5b482a?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'crypto-img-6',
            name: 'gaming-nfts.jpg',
            type: 'image/jpeg',
            size: 2123456,
            url: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'crypto7',
        content: '',
        senderId: 'crypto-admin',
        createdAt: new Date(Date.now() - 23400000),
        isRead: true,
        views: 87600,
        voiceMessage: {
          url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
          duration: 225,
          waveform: [30, 45, 60, 75, 65, 50, 40, 55, 70, 80, 75, 60, 45, 35, 50, 65, 75, 85, 70, 55, 40, 45, 60, 75, 80, 70, 55, 45, 35, 50, 65, 75, 70, 60, 50, 40, 55, 70, 65, 50]
        }
      },
      {
        _id: 'crypto8',
        content: `⚡ Layer 2 Solutions: Scaling Ethereum for Mass Adoption

Layer 2 networks are solving Ethereum's scalability challenges! Lower fees, faster transactions, same security.

Layer 2 ecosystem:
• Optimistic Rollups (Arbitrum, Optimism)
• ZK-Rollups (zkSync, StarkNet, Polygon zkEVM)
• Sidechains vs Layer 2 differences
• Bridge security and cross-chain transfers
• Gas fee comparisons - L1 vs L2
• DApp migration to Layer 2
• Future of Ethereum scaling (Danksharding)

Layer 2 TVL rankings and ecosystem growth:`,
        senderId: 'crypto-admin',
        createdAt: new Date(Date.now() - 27000000),
        isRead: true,
        views: 112300,
        attachments: [
          {
            id: 'crypto-vid-3',
            name: 'layer2-explained.mp4',
            type: 'video/mp4',
            size: 18765432,
            url: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      },
      {
        _id: 'crypto9',
        content: `🔐 Crypto Security Best Practices: Protect Your Assets

Security is paramount in crypto! Learn essential practices to keep your digital assets safe from hackers and scams.

Security essentials:
• Hardware wallets vs software wallets (Ledger, Trezor)
• Seed phrase security - Never share, offline storage
• Multi-signature wallets for large holdings
• Identifying phishing attacks and scams
• Smart contract audits - DYOR before investing
• Two-factor authentication (2FA) setup
• Cold storage for long-term holdings
• Common attack vectors and how to avoid them

Wallet security checklist and recovery guide:`,
        senderId: 'crypto-admin',
        createdAt: new Date(Date.now() - 30600000),
        isRead: true,
        views: 156700,
        attachments: [
          {
            id: 'crypto-img-7',
            name: 'hardware-wallet-guide.jpg',
            type: 'image/jpeg',
            size: 2456789,
            url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'crypto-img-8',
            name: 'security-best-practices.jpg',
            type: 'image/jpeg',
            size: 2234567,
            url: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'crypto10',
        content: `🌐 Web3 Revolution: The Decentralized Internet

Web3 is transforming how we interact online! Explore the technologies building the next generation of the internet.

Web3 fundamentals:
• Decentralized identity and authentication
• IPFS and decentralized storage (Filecoin, Arweave)
• DAOs - Decentralized Autonomous Organizations
• Token-gated communities and social tokens
• Web3 social media (Lens Protocol, Farcaster)
• Decentralized domain names (ENS, Unstoppable Domains)
• The creator economy in Web3

Web3 ecosystem map and adoption metrics:`,
        senderId: 'crypto-admin',
        createdAt: new Date(Date.now() - 34200000),
        isRead: true,
        views: 103400,
        attachments: [
          {
            id: 'crypto-pdf-2',
            name: 'web3-ecosystem-guide.pdf',
            type: 'application/pdf',
            size: 4789012,
            url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
          }
        ]
      },
      {
        _id: 'crypto11',
        content: `📊 Altcoin Season: Top Performers & Hidden Gems

Altcoins are heating up! Discover which alternative cryptocurrencies are leading the market and potential moonshots.

Altcoin highlights:
• Solana (SOL) - High-speed blockchain ecosystem
• Polygon (MATIC) - Ethereum scaling leader
• Chainlink (LINK) - Oracle network dominance
• Avalanche (AVAX) - DeFi and gaming platform
• Cosmos (ATOM) - Interoperability protocol
• Emerging L1s - Aptos, Sui, Sei
• Meme coins vs utility tokens

Altcoin market cap rankings and performance:`,
        senderId: 'crypto-admin',
        createdAt: new Date(Date.now() - 37800000),
        isRead: true,
        views: 145600,
        attachments: [
          {
            id: 'crypto-img-9',
            name: 'altcoin-performance-chart.jpg',
            type: 'image/jpeg',
            size: 2567890,
            url: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'crypto-img-10',
            name: 'top-altcoins-2024.jpg',
            type: 'image/jpeg',
            size: 2345678,
            url: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=800&auto=format&fit=crop&q=60'
          }
        ]
      }
    ],
    // Startup News Channel (ID: 51)
    '51': [
      {
        _id: 'startup1',
        content: `🚀 Top 10 Startups to Watch in 2024

Our annual list of the most promising startups disrupting their industries:

1. AI-powered healthcare diagnostics
2. Sustainable energy solutions
3. Fintech innovations
4. EdTech platforms
5. Climate tech ventures

These companies have raised over $500M combined and are solving real-world problems. Full profiles and investment details in the image below!`,
        senderId: 'startup-admin',
        createdAt: new Date(Date.now() - 2700000),
        isRead: false,
        attachments: [
          {
            id: 'startup-img-1',
            name: 'top-startups-2024.jpg',
            type: 'image/jpeg',
            size: 2345678,
            url: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'startup2',
        content: '💰 Funding Rounds This Week',
        senderId: 'startup-admin',
        createdAt: new Date(Date.now() - 9000000),
        isRead: true,
        attachments: [
          {
            id: 'startup-pdf-1',
            name: 'funding-report.pdf',
            type: 'application/pdf',
            size: 1567890,
            url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
          }
        ]
      },
      {
        _id: 'startup3',
        content: `🤖 AI Startup Boom: The Next Wave of Innovation

Artificial Intelligence startups are attracting record-breaking investments! Here's what's driving the AI revolution in 2024.

AI startup highlights:
• OpenAI competitors raising billions in funding
• Generative AI tools for enterprise (Anthropic, Cohere)
• AI-powered coding assistants and developer tools
• Healthcare AI diagnostics and drug discovery
• Autonomous vehicles reaching new milestones
• AI chip manufacturers (beyond NVIDIA)
• Ethical AI and safety-focused startups

AI market analysis and investment trends: https://techcrunch.com/ai-startups-2024`,
        senderId: 'startup-admin',
        createdAt: new Date(Date.now() - 12600000),
        isRead: false,
        views: 134500,
        attachments: [
          {
            id: 'startup-img-2',
            name: 'ai-startup-landscape.jpg',
            type: 'image/jpeg',
            size: 2567890,
            url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'startup-img-3',
            name: 'ai-investment-chart.jpg',
            type: 'image/jpeg',
            size: 2234567,
            url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'startup4',
        content: '',
        senderId: 'startup-admin',
        createdAt: new Date(Date.now() - 16200000),
        isRead: true,
        views: 89400,
        attachments: [
          {
            id: 'startup-vid-1',
            name: 'founder-interview-series.mp4',
            type: 'video/mp4',
            size: 19876543,
            url: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      },
      {
        _id: 'startup5',
        content: `💡 Startup Founder's Guide: From Idea to Series A

Essential insights for aspiring entrepreneurs! Learn the key steps to building a successful startup from scratch.

Startup journey roadmap:
• Validating your idea - Market research and MVP
• Building your founding team - Co-founders and early hires
• Product-market fit - Iterating based on feedback
• Fundraising strategies - Pre-seed to Series A
• Pitch deck essentials - What investors want to see
• Legal structure and equity distribution
• Growth hacking and customer acquisition

Complete startup playbook and resources:`,
        senderId: 'startup-admin',
        createdAt: new Date(Date.now() - 19800000),
        isRead: true,
        views: 112300,
        attachments: [
          {
            id: 'startup-pdf-2',
            name: 'startup-founders-playbook.pdf',
            type: 'application/pdf',
            size: 5678901,
            url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
          }
        ]
      },
      {
        _id: 'startup6',
        content: `🌱 Climate Tech: Startups Saving the Planet

Climate technology is the fastest-growing startup sector! These companies are tackling climate change with innovative solutions.

Climate tech innovations:
• Carbon capture and storage technologies
• Renewable energy optimization (solar, wind)
• Electric vehicle charging infrastructure
• Sustainable agriculture and food tech
• Circular economy and recycling solutions
• Green hydrogen production
• Climate risk assessment platforms

Investment opportunities and impact metrics:`,
        senderId: 'startup-admin',
        createdAt: new Date(Date.now() - 23400000),
        isRead: true,
        views: 98700,
        attachments: [
          {
            id: 'startup-img-4',
            name: 'climate-tech-startups.jpg',
            type: 'image/jpeg',
            size: 2456789,
            url: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'startup-img-5',
            name: 'renewable-energy-innovation.jpg',
            type: 'image/jpeg',
            size: 2345678,
            url: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'startup-img-6',
            name: 'sustainable-tech.jpg',
            type: 'image/jpeg',
            size: 2123456,
            url: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'startup7',
        content: '',
        senderId: 'startup-admin',
        createdAt: new Date(Date.now() - 27000000),
        isRead: true,
        views: 67800,
        voiceMessage: {
          url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
          duration: 240,
          waveform: [35, 50, 65, 80, 70, 55, 45, 60, 75, 85, 80, 65, 50, 40, 55, 70, 80, 90, 75, 60, 45, 50, 65, 80, 85, 75, 60, 50, 40, 55, 70, 80, 75, 65, 55, 45, 60, 75, 70, 55]
        }
      },
      {
        _id: 'startup8',
        content: `💳 Fintech Revolution: Banking's Digital Transformation

Financial technology startups are reshaping how we manage money! From neobanks to crypto, here's what's disrupting finance.

Fintech trends 2024:
• Neobanks and digital-only banking (Chime, Revolut)
• Buy Now Pay Later (BNPL) evolution
• Embedded finance and Banking-as-a-Service
• Cryptocurrency and blockchain infrastructure
• AI-powered personal finance management
• Cross-border payments and remittances
• RegTech and compliance automation

Fintech investment landscape and regulatory updates:`,
        senderId: 'startup-admin',
        createdAt: new Date(Date.now() - 30600000),
        isRead: true,
        views: 103400,
        attachments: [
          {
            id: 'startup-vid-2',
            name: 'fintech-trends-2024.mp4',
            type: 'video/mp4',
            size: 18765432,
            url: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      },
      {
        _id: 'startup9',
        content: `🎓 EdTech Innovations: The Future of Learning

Education technology is transforming how we learn! These startups are making education more accessible, personalized, and effective.

EdTech breakthroughs:
• AI tutors and personalized learning paths
• Virtual reality classrooms and immersive learning
• Microlearning and skill-based platforms
• Corporate training and upskilling solutions
• Language learning apps (Duolingo, Babbel)
• STEM education for kids and teens
• Credentialing and certification platforms

EdTech market growth and adoption rates:`,
        senderId: 'startup-admin',
        createdAt: new Date(Date.now() - 34200000),
        isRead: true,
        views: 87600,
        attachments: [
          {
            id: 'startup-img-7',
            name: 'edtech-innovation.jpg',
            type: 'image/jpeg',
            size: 2456789,
            url: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'startup-img-8',
            name: 'online-learning-platform.jpg',
            type: 'image/jpeg',
            size: 2234567,
            url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'startup10',
        content: `🏥 HealthTech: Digital Health Revolution

Healthcare technology startups are improving patient outcomes and reducing costs! From telemedicine to AI diagnostics, health is going digital.

HealthTech innovations:
• Telemedicine platforms (Teladoc, Amwell)
• AI-powered diagnostics and imaging analysis
• Wearable health monitors and IoT devices
• Mental health apps and digital therapy
• Genomics and personalized medicine
• Healthcare data analytics and interoperability
• Remote patient monitoring systems

HealthTech funding trends and regulatory landscape:`,
        senderId: 'startup-admin',
        createdAt: new Date(Date.now() - 37800000),
        isRead: true,
        views: 94500,
        attachments: [
          {
            id: 'startup-img-9',
            name: 'healthtech-startups.jpg',
            type: 'image/jpeg',
            size: 2567890,
            url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'startup-img-10',
            name: 'digital-health-devices.jpg',
            type: 'image/jpeg',
            size: 2345678,
            url: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&auto=format&fit=crop&q=60'
          }
        ]
      }
    ],

    // Photography Tips Channel (ID: 52)
    '52': [
      {
        _id: 'photo1',
        content: `📸 Golden Hour Photography Masterclass

Learn the secrets of capturing stunning golden hour photos! This comprehensive guide covers:
• Best camera settings for warm light
• Composition techniques for dramatic shots
• Post-processing tips for enhanced colors

Check out these amazing examples:`,
        senderId: 'photo-admin',
        createdAt: new Date(Date.now() - 3600000),
        isRead: false,
        views: 45200,
        attachments: [
          {
            id: 'photo-img-1',
            name: 'golden-hour-1.jpg',
            type: 'image/jpeg',
            size: 2345678,
            url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'photo-img-2',
            name: 'golden-hour-2.jpg',
            type: 'image/jpeg',
            size: 1987654,
            url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'photo-img-3',
            name: 'golden-hour-3.jpg',
            type: 'image/jpeg',
            size: 2156789,
            url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'photo2',
        content: '',
        senderId: 'photo-admin',
        createdAt: new Date(Date.now() - 7200000),
        isRead: true,
        views: 32100,
        attachments: [
          {
            id: 'photo-pdf-1',
            name: 'photography-guide.pdf',
            type: 'application/pdf',
            size: 4567890,
            url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
          }
        ]
      },
      {
        _id: 'photo3',
        content: `📷 Camera Settings 101: Understanding the Exposure Triangle

Master the fundamentals of photography! Learn how aperture, shutter speed, and ISO work together to create perfectly exposed images.

Exposure triangle essentials:
• Aperture (f-stop) - Depth of field control
• Shutter Speed - Motion blur and freeze action
• ISO - Light sensitivity and grain
• Balancing all three for perfect exposure
• Manual mode vs auto modes
• Common scenarios and recommended settings
• Practice exercises for beginners

Complete camera settings cheat sheet: https://photography101.com/exposure-guide`,
        senderId: 'photo-admin',
        createdAt: new Date(Date.now() - 10800000),
        isRead: false,
        views: 89400,
        attachments: [
          {
            id: 'photo-img-4',
            name: 'exposure-triangle-diagram.jpg',
            type: 'image/jpeg',
            size: 2456789,
            url: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'photo-img-5',
            name: 'aperture-comparison.jpg',
            type: 'image/jpeg',
            size: 2234567,
            url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'photo4',
        content: '',
        senderId: 'photo-admin',
        createdAt: new Date(Date.now() - 14400000),
        isRead: true,
        views: 67800,
        attachments: [
          {
            id: 'photo-vid-1',
            name: 'portrait-photography-tutorial.mp4',
            type: 'video/mp4',
            size: 19876543,
            url: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      },
      {
        _id: 'photo5',
        content: `🌃 Night Photography: Capturing the Stars and City Lights

Unlock the magic of night photography! From astrophotography to urban nightscapes, learn to shoot in low light conditions.

Night photography techniques:
• Long exposure fundamentals (30 sec to minutes)
• Star trails and Milky Way photography
• Light painting techniques
• City lights and urban nightscapes
• Tripod essentials and stability
• Focus techniques in the dark
• Noise reduction in post-processing

Night photography gear guide and location tips:`,
        senderId: 'photo-admin',
        createdAt: new Date(Date.now() - 18000000),
        isRead: true,
        views: 103400,
        attachments: [
          {
            id: 'photo-img-6',
            name: 'milky-way-photography.jpg',
            type: 'image/jpeg',
            size: 2678901,
            url: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'photo-img-7',
            name: 'city-night-lights.jpg',
            type: 'image/jpeg',
            size: 2456789,
            url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'photo-img-8',
            name: 'star-trails-example.jpg',
            type: 'image/jpeg',
            size: 2345678,
            url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'photo6',
        content: '',
        senderId: 'photo-admin',
        createdAt: new Date(Date.now() - 21600000),
        isRead: true,
        views: 45600,
        voiceMessage: {
          url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
          duration: 210,
          waveform: [30, 45, 60, 75, 65, 50, 40, 55, 70, 80, 75, 60, 45, 35, 50, 65, 75, 85, 70, 55, 40, 45, 60, 75, 80, 70, 55, 45, 35, 50, 65, 75, 70, 60, 50, 40, 55, 70, 65, 50]
        }
      },
      {
        _id: 'photo7',
        content: `🎨 Composition Rules: Creating Visually Stunning Images

Transform your photos from snapshots to masterpieces! Learn the essential composition techniques used by professional photographers.

Composition techniques:
• Rule of Thirds - Classic composition guide
• Leading Lines - Guiding the viewer's eye
• Framing - Using natural frames
• Symmetry and Patterns - Visual harmony
• Negative Space - Less is more
• Depth and Layers - Creating dimension
• Breaking the rules creatively

Composition examples and practice challenges:`,
        senderId: 'photo-admin',
        createdAt: new Date(Date.now() - 25200000),
        isRead: true,
        views: 94500,
        attachments: [
          {
            id: 'photo-vid-2',
            name: 'composition-techniques-demo.mp4',
            type: 'video/mp4',
            size: 18765432,
            url: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      },
      {
        _id: 'photo8',
        content: `📱 Mobile Photography: Pro Results from Your Smartphone

You don't need expensive gear to take amazing photos! Master smartphone photography with these professional techniques.

Mobile photography tips:
• Understanding your phone's camera features
• HDR, Portrait Mode, and Night Mode explained
• Third-party camera apps (ProCam, Halide)
• Mobile editing apps (Lightroom Mobile, VSCO, Snapseed)
• Composition tips for phone photography
• Accessories: Lenses, tripods, gimbals
• Instagram-worthy photo techniques

Mobile photography workflow and editing guide:`,
        senderId: 'photo-admin',
        createdAt: new Date(Date.now() - 28800000),
        isRead: true,
        views: 112300,
        attachments: [
          {
            id: 'photo-pdf-2',
            name: 'mobile-photography-masterclass.pdf',
            type: 'application/pdf',
            size: 4789012,
            url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
          }
        ]
      },
      {
        _id: 'photo9',
        content: `🎞️ Post-Processing Workflow: From RAW to Stunning Final Image

Editing is where good photos become great! Learn professional post-processing techniques in Lightroom and Photoshop.

Post-processing essentials:
• RAW vs JPEG - Why shoot RAW?
• Lightroom workflow - Import to export
• Basic adjustments - Exposure, contrast, white balance
• Color grading and tone curves
• Local adjustments - Dodging and burning
• Sharpening and noise reduction
• Photoshop for advanced editing
• Presets and batch processing

Complete editing tutorial and preset collection:`,
        senderId: 'photo-admin',
        createdAt: new Date(Date.now() - 32400000),
        isRead: true,
        views: 87600,
        attachments: [
          {
            id: 'photo-img-9',
            name: 'before-after-editing.jpg',
            type: 'image/jpeg',
            size: 2567890,
            url: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'photo-img-10',
            name: 'lightroom-interface.jpg',
            type: 'image/jpeg',
            size: 2234567,
            url: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'photo10',
        content: `🏞️ Landscape Photography: Capturing Nature's Beauty

Create breathtaking landscape photos! From mountains to seascapes, learn the techniques for stunning outdoor photography.

Landscape photography tips:
• Best times to shoot - Golden hour, blue hour
• Weather conditions and dramatic skies
• Foreground interest and depth
• Hyperfocal distance for sharp landscapes
• Filters: Polarizer, ND, graduated ND
• Panorama stitching techniques
• Location scouting and planning

Landscape photography gear and location guide:`,
        senderId: 'photo-admin',
        createdAt: new Date(Date.now() - 36000000),
        isRead: true,
        views: 98700,
        attachments: [
          {
            id: 'photo-img-11',
            name: 'mountain-landscape.jpg',
            type: 'image/jpeg',
            size: 2789012,
            url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'photo-img-12',
            name: 'seascape-long-exposure.jpg',
            type: 'image/jpeg',
            size: 2456789,
            url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&auto=format&fit=crop&q=60'
          }
        ]
      }
    ],

    // Fitness & Health Channel (ID: 53)
    '53': [
      {
        _id: 'fitness1',
        content: `💪 30-Day Workout Challenge Starts Tomorrow!

Join thousands of fitness enthusiasts in our most popular challenge yet! 

What's included:
• Daily workout videos (15-45 minutes)
• Nutrition meal plans
• Progress tracking sheets
• Community support group

Are you ready to transform your life? 🔥`,
        senderId: 'fitness-admin',
        createdAt: new Date(Date.now() - 1800000),
        isRead: false,
        views: 78900,
        attachments: [
          {
            id: 'fitness-vid-1',
            name: 'workout-preview.mp4',
            type: 'video/mp4',
            size: 12345678,
            url: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      },
      {
        _id: 'fitness2',
        content: '',
        senderId: 'fitness-admin',
        createdAt: new Date(Date.now() - 5400000),
        isRead: true,
        views: 23400,
        voiceMessage: {
          url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
          duration: 180,
          waveform: [25, 40, 55, 70, 60, 45, 35, 50, 65, 75, 70, 55, 40, 30, 45, 60, 70, 80, 65, 50, 35, 40, 55, 70, 75, 65, 50, 40, 30, 45, 60, 70, 65, 55, 45, 35, 50, 65, 60, 45]
        }
      },
      {
        _id: 'fitness3',
        content: `🏃‍♀️ Beginner's Guide to Running: From Couch to 5K

Start your running journey the right way! This comprehensive guide will take you from complete beginner to running your first 5K in just 8 weeks.

Running essentials:
• Week-by-week training plan with rest days
• Proper running form and breathing techniques
• Choosing the right running shoes
• Preventing common injuries (shin splints, runner's knee)
• Warm-up and cool-down routines
• Nutrition and hydration strategies

Download the complete 8-week training plan: https://runningstart.com/couch-to-5k`,
        senderId: 'fitness-admin',
        createdAt: new Date(Date.now() - 9000000),
        isRead: false,
        views: 112300,
        attachments: [
          {
            id: 'fitness-img-1',
            name: 'running-form-guide.jpg',
            type: 'image/jpeg',
            size: 2345678,
            url: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'fitness-img-2',
            name: 'running-shoes-comparison.jpg',
            type: 'image/jpeg',
            size: 2123456,
            url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'fitness4',
        content: `🧘‍♀️ Yoga for Flexibility and Stress Relief

Discover the transformative power of yoga! Perfect for beginners and experienced practitioners alike.

Yoga benefits and practices:
• Morning yoga flow (20 minutes) - Energize your day
• Evening relaxation sequence - Better sleep
• Flexibility improvement poses
• Stress reduction and mindfulness
• Breathing exercises (Pranayama)
• Yoga for back pain relief

Yoga mat recommendations and pose modifications:`,
        senderId: 'fitness-admin',
        createdAt: new Date(Date.now() - 12600000),
        isRead: true,
        views: 94500,
        attachments: [
          {
            id: 'fitness-vid-2',
            name: 'morning-yoga-flow.mp4',
            type: 'video/mp4',
            size: 17654321,
            url: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      },
      {
        _id: 'fitness5',
        content: `🥗 Nutrition 101: Eating for Optimal Health

Fuel your body right! Learn the fundamentals of nutrition and create a sustainable, healthy eating plan.

Nutrition fundamentals:
• Macronutrients explained - Protein, carbs, fats
• Micronutrients and vitamins - What you need
• Meal timing and frequency
• Hydration guidelines - How much water?
• Reading nutrition labels correctly
• Healthy snack ideas and meal prep
• Supplements: What works and what doesn't

Evidence-based nutrition guide and meal planning:`,
        senderId: 'fitness-admin',
        createdAt: new Date(Date.now() - 16200000),
        isRead: true,
        views: 103400,
        attachments: [
          {
            id: 'fitness-pdf-1',
            name: 'nutrition-guide-complete.pdf',
            type: 'application/pdf',
            size: 5678901,
            url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
          }
        ]
      },
      {
        _id: 'fitness6',
        content: `💪 Strength Training for Beginners: Build Muscle Safely

Start building strength the right way! This guide covers everything you need to know about resistance training.

Strength training basics:
• Progressive overload principles
• Major compound exercises (squats, deadlifts, bench press)
• Proper form and technique videos
• Sets, reps, and rest periods explained
• Home workouts vs gym training
• Recovery and muscle growth
• Common mistakes to avoid

Full-body workout routine and exercise library:`,
        senderId: 'fitness-admin',
        createdAt: new Date(Date.now() - 19800000),
        isRead: true,
        views: 87600,
        attachments: [
          {
            id: 'fitness-img-3',
            name: 'strength-training-exercises.jpg',
            type: 'image/jpeg',
            size: 2567890,
            url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'fitness-img-4',
            name: 'proper-squat-form.jpg',
            type: 'image/jpeg',
            size: 2234567,
            url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'fitness-img-5',
            name: 'deadlift-technique.jpg',
            type: 'image/jpeg',
            size: 2012345,
            url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'fitness7',
        content: '',
        senderId: 'fitness-admin',
        createdAt: new Date(Date.now() - 23400000),
        isRead: true,
        views: 56700,
        voiceMessage: {
          url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
          duration: 195,
          waveform: [35, 50, 65, 80, 70, 55, 45, 60, 75, 85, 80, 65, 50, 40, 55, 70, 80, 90, 75, 60, 45, 50, 65, 80, 85, 75, 60, 50, 40, 55, 70, 80, 75, 65, 55, 45, 60, 75, 70, 55]
        }
      },
      {
        _id: 'fitness8',
        content: `😴 Sleep Optimization: The Foundation of Health

Quality sleep is crucial for fitness, recovery, and overall health. Learn how to optimize your sleep for better results.

Sleep optimization strategies:
• Sleep hygiene best practices
• Ideal sleep duration by age
• Creating the perfect sleep environment
• Pre-sleep routine for better rest
• Managing stress and anxiety
• Sleep tracking and analysis
• Supplements: Melatonin, magnesium, and more

Sleep improvement guide and bedtime routine:`,
        senderId: 'fitness-admin',
        createdAt: new Date(Date.now() - 27000000),
        isRead: true,
        views: 76800,
        attachments: [
          {
            id: 'fitness-img-6',
            name: 'sleep-environment-setup.jpg',
            type: 'image/jpeg',
            size: 2345678,
            url: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'fitness-img-7',
            name: 'sleep-tracking-data.jpg',
            type: 'image/jpeg',
            size: 1987654,
            url: 'https://images.unsplash.com/photo-1495364141860-b0d03eccd065?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'fitness9',
        content: `🏊‍♂️ HIIT Workouts: Maximum Results in Minimum Time

High-Intensity Interval Training delivers incredible results in short workout sessions. Perfect for busy schedules!

HIIT workout benefits:
• 20-minute full-body HIIT routine
• Tabata protocol explained (20 sec on, 10 sec off)
• Fat burning and metabolic boost
• No equipment needed - Bodyweight exercises
• HIIT vs steady-state cardio
• Recovery between sessions
• Beginner, intermediate, and advanced variations

Complete HIIT workout library and timer app:`,
        senderId: 'fitness-admin',
        createdAt: new Date(Date.now() - 30600000),
        isRead: true,
        views: 98700,
        attachments: [
          {
            id: 'fitness-vid-3',
            name: 'hiit-workout-demo.mp4',
            type: 'video/mp4',
            size: 18765432,
            url: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      },
      {
        _id: 'fitness10',
        content: `🧠 Mental Health & Fitness: The Mind-Body Connection

Physical fitness and mental health are deeply connected. Learn how to nurture both for complete wellness.

Mental wellness strategies:
• Exercise for anxiety and depression relief
• Mindfulness and meditation practices
• Stress management techniques
• Building healthy habits and routines
• Social connection and community
• Setting realistic fitness goals
• Overcoming motivation challenges

Mental health resources and support:`,
        senderId: 'fitness-admin',
        createdAt: new Date(Date.now() - 34200000),
        isRead: true,
        views: 89400,
        attachments: [
          {
            id: 'fitness-img-8',
            name: 'meditation-practice.jpg',
            type: 'image/jpeg',
            size: 2234567,
            url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'fitness-img-9',
            name: 'mindfulness-exercises.jpg',
            type: 'image/jpeg',
            size: 2012345,
            url: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&auto=format&fit=crop&q=60'
          }
        ]
      }
    ],

    // Cooking Recipes Channel (ID: 54)
    '54': [
      {
        _id: 'cooking1',
        content: `🍝 Easy Pasta Recipes for Beginners

Master these 5 simple pasta dishes that anyone can make! Perfect for busy weeknights or impressing guests.

Featured recipes:
• Classic Carbonara (15 mins)
• Aglio e Olio (10 mins)  
• Pesto Pasta (12 mins)
• Marinara Magic (20 mins)
• Creamy Mushroom (18 mins)

Full recipe collection: https://cookingmadeasy.com/pasta-basics`,
        senderId: 'cooking-admin',
        createdAt: new Date(Date.now() - 2700000),
        isRead: false,
        views: 56700,
        attachments: [
          {
            id: 'cooking-img-1',
            name: 'pasta-collection.jpg',
            type: 'image/jpeg',
            size: 1876543,
            url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'cooking-img-2',
            name: 'carbonara-recipe.jpg',
            type: 'image/jpeg',
            size: 1654321,
            url: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'cooking2',
        content: `🥗 Healthy Meal Prep Ideas for the Week

Save time and eat healthy with these meal prep recipes! Prepare everything on Sunday and enjoy nutritious meals all week long.

Meal prep essentials:
• Mediterranean Quinoa Bowls - Protein-packed lunch
• Grilled Chicken & Veggies - Versatile dinner base
• Overnight Oats - 5 flavor variations
• Mason Jar Salads - Fresh and crisp all week
• Energy Balls - Healthy snack option
• Portion control and storage tips

Meal prep guide and shopping list: https://healthyeating.com/meal-prep-101`,
        senderId: 'cooking-admin',
        createdAt: new Date(Date.now() - 5400000),
        isRead: false,
        views: 89400,
        attachments: [
          {
            id: 'cooking-img-3',
            name: 'meal-prep-containers.jpg',
            type: 'image/jpeg',
            size: 2345678,
            url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'cooking-img-4',
            name: 'quinoa-bowls.jpg',
            type: 'image/jpeg',
            size: 2123456,
            url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'cooking3',
        content: '',
        senderId: 'cooking-admin',
        createdAt: new Date(Date.now() - 9000000),
        isRead: true,
        views: 67800,
        attachments: [
          {
            id: 'cooking-vid-1',
            name: 'baking-bread-tutorial.mp4',
            type: 'video/mp4',
            size: 18765432,
            url: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      },
      {
        _id: 'cooking4',
        content: `🍰 Decadent Desserts: From Simple to Spectacular

Satisfy your sweet tooth with these irresistible dessert recipes! From quick treats to show-stopping creations.

Sweet sensations:
• Classic Chocolate Lava Cake (25 mins)
• No-Bake Cheesecake (15 mins + chill time)
• Tiramisu - Italian perfection
• Crème Brûlée - Restaurant-quality at home
• Fruit Tarts - Beautiful and delicious
• Baking tips and temperature guide

Dessert recipe collection and techniques:`,
        senderId: 'cooking-admin',
        createdAt: new Date(Date.now() - 12600000),
        isRead: true,
        views: 94500,
        attachments: [
          {
            id: 'cooking-pdf-1',
            name: 'dessert-masterclass.pdf',
            type: 'application/pdf',
            size: 4567890,
            url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
          }
        ]
      },
      {
        _id: 'cooking5',
        content: `🌮 Global Cuisine: Mexican Street Food at Home

Bring the vibrant flavors of Mexico to your kitchen! Learn to make authentic street food favorites with easy-to-find ingredients.

Mexican favorites:
• Tacos al Pastor - Marinated pork perfection
• Elote (Mexican Street Corn) - Grilled and creamy
• Quesadillas - Crispy and cheesy
• Guacamole - Fresh and authentic
• Salsa Verde & Roja - Homemade sauces
• Churros - Sweet cinnamon treats

Spice guide and ingredient substitutions:`,
        senderId: 'cooking-admin',
        createdAt: new Date(Date.now() - 16200000),
        isRead: true,
        views: 78900,
        attachments: [
          {
            id: 'cooking-img-5',
            name: 'tacos-al-pastor.jpg',
            type: 'image/jpeg',
            size: 2567890,
            url: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'cooking-img-6',
            name: 'mexican-street-corn.jpg',
            type: 'image/jpeg',
            size: 2234567,
            url: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'cooking-img-7',
            name: 'fresh-guacamole.jpg',
            type: 'image/jpeg',
            size: 1987654,
            url: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'cooking6',
        content: '',
        senderId: 'cooking-admin',
        createdAt: new Date(Date.now() - 19800000),
        isRead: true,
        views: 45600,
        voiceMessage: {
          url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
          duration: 225,
          waveform: [30, 45, 60, 75, 65, 50, 40, 55, 70, 80, 75, 60, 45, 35, 50, 65, 75, 85, 70, 55, 40, 45, 60, 75, 80, 70, 55, 45, 35, 50, 65, 75, 70, 60, 50, 40, 55, 70, 65, 50]
        }
      },
      {
        _id: 'cooking7',
        content: `🍜 Asian Comfort Food: Ramen, Pho & More

Master the art of Asian noodle soups! These warming, flavorful dishes are easier to make than you think.

Noodle soup favorites:
• Tonkotsu Ramen - Rich pork bone broth
• Vietnamese Pho - Aromatic beef noodle soup
• Thai Tom Yum - Spicy and sour perfection
• Korean Jjajangmyeon - Black bean noodles
• Broth-making techniques and shortcuts
• Toppings and garnish ideas

Asian pantry essentials and where to buy:`,
        senderId: 'cooking-admin',
        createdAt: new Date(Date.now() - 23400000),
        isRead: true,
        views: 103400,
        attachments: [
          {
            id: 'cooking-vid-2',
            name: 'ramen-from-scratch.mp4',
            type: 'video/mp4',
            size: 19876543,
            url: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      },
      {
        _id: 'cooking8',
        content: `🥘 One-Pot Wonders: Minimal Cleanup, Maximum Flavor

Delicious meals with easy cleanup! These one-pot recipes are perfect for busy weeknights when you don't want to do dishes.

One-pot favorites:
• Chicken & Rice Casserole - Comfort food classic
• Vegetarian Chili - Hearty and healthy
• Seafood Paella - Spanish showstopper
• Beef Stew - Slow-cooked perfection
• Creamy Tuscan Chicken - Restaurant-quality
• Dutch oven and slow cooker tips

Time-saving cooking techniques:`,
        senderId: 'cooking-admin',
        createdAt: new Date(Date.now() - 27000000),
        isRead: true,
        views: 87600,
        attachments: [
          {
            id: 'cooking-img-8',
            name: 'one-pot-paella.jpg',
            type: 'image/jpeg',
            size: 2456789,
            url: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'cooking-img-9',
            name: 'chicken-casserole.jpg',
            type: 'image/jpeg',
            size: 2123456,
            url: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'cooking9',
        content: `🌱 Plant-Based Cooking: Vegan Recipes That Everyone Will Love

Discover delicious plant-based meals that even meat-lovers will enjoy! Healthy, sustainable, and incredibly flavorful.

Vegan favorites:
• Cauliflower Buffalo Wings - Crispy and spicy
• Jackfruit Pulled "Pork" - Surprisingly meaty texture
• Cashew Mac & Cheese - Creamy comfort food
• Lentil Bolognese - Hearty pasta sauce
• Buddha Bowls - Colorful and nutritious
• Protein sources and nutritional tips

Plant-based pantry guide and substitutions:`,
        senderId: 'cooking-admin',
        createdAt: new Date(Date.now() - 30600000),
        isRead: true,
        views: 76800,
        attachments: [
          {
            id: 'cooking-img-10',
            name: 'vegan-buddha-bowl.jpg',
            type: 'image/jpeg',
            size: 2345678,
            url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'cooking-img-11',
            name: 'cauliflower-wings.jpg',
            type: 'image/jpeg',
            size: 2012345,
            url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&auto=format&fit=crop&q=60'
          }
        ]
      }
    ],

    // Travel Destinations Channel (ID: 55)
    '55': [
      {
        _id: 'travel1',
        content: `🌴 Hidden Gems in Southeast Asia

Discover breathtaking destinations away from the crowds! Our travel experts have curated the most stunning hidden spots across Southeast Asia.

Must-visit locations:
• Secret beaches in Philippines 🏖️
• Mountain villages in Vietnam 🏔️
• Temple ruins in Cambodia 🏛️
• Floating markets in Thailand 🛶

Complete travel guide with maps and tips below:`,
        senderId: 'travel-admin',
        createdAt: new Date(Date.now() - 3600000),
        isRead: false,
        views: 89200,
        attachments: [
          {
            id: 'travel-img-1',
            name: 'hidden-beach.jpg',
            type: 'image/jpeg',
            size: 2987654,
            url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'travel-img-2',
            name: 'mountain-village.jpg',
            type: 'image/jpeg',
            size: 2654321,
            url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'travel-img-3',
            name: 'temple-ruins.jpg',
            type: 'image/jpeg',
            size: 2345678,
            url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'travel-img-4',
            name: 'floating-market.jpg',
            type: 'image/jpeg',
            size: 2123456,
            url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'travel2',
        content: '',
        senderId: 'travel-admin',
        createdAt: new Date(Date.now() - 7200000),
        isRead: true,
        views: 34500,
        attachments: [
          {
            id: 'travel-pdf-1',
            name: 'southeast-asia-guide.pdf',
            type: 'application/pdf',
            size: 5678901,
            url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
          }
        ]
      },
      {
        _id: 'travel3',
        content: `🗼 European City Break: Paris, Rome & Barcelona

Experience the magic of Europe's most iconic cities! From art and architecture to cuisine and culture, these destinations offer unforgettable experiences.

City highlights:
• Paris - Eiffel Tower, Louvre, Montmartre charm
• Rome - Colosseum, Vatican, ancient history
• Barcelona - Gaudí architecture, beaches, tapas culture
• Best time to visit and avoiding crowds
• Budget tips and money-saving strategies
• Must-try local dishes and restaurants

European travel itinerary and booking guide: https://eurotravel.com/city-breaks`,
        senderId: 'travel-admin',
        createdAt: new Date(Date.now() - 10800000),
        isRead: false,
        views: 112300,
        attachments: [
          {
            id: 'travel-img-5',
            name: 'paris-eiffel-tower.jpg',
            type: 'image/jpeg',
            size: 2678901,
            url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'travel-img-6',
            name: 'rome-colosseum.jpg',
            type: 'image/jpeg',
            size: 2456789,
            url: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'travel4',
        content: '',
        senderId: 'travel-admin',
        createdAt: new Date(Date.now() - 14400000),
        isRead: true,
        views: 67800,
        attachments: [
          {
            id: 'travel-vid-1',
            name: 'japan-travel-vlog.mp4',
            type: 'video/mp4',
            size: 21234567,
            url: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      },
      {
        _id: 'travel5',
        content: `🏔️ Adventure Travel: Trekking & Outdoor Experiences

For the thrill-seekers and nature lovers! Discover the world's most spectacular trekking routes and outdoor adventures.

Epic adventures:
• Inca Trail to Machu Picchu (Peru) - Ancient ruins trek
• Everest Base Camp (Nepal) - Himalayan adventure
• Patagonia W Trek (Chile/Argentina) - Glaciers and mountains
• Kilimanjaro Summit (Tanzania) - Africa's highest peak
• Torres del Paine (Chile) - Dramatic landscapes
• Annapurna Circuit (Nepal) - Cultural immersion

Preparation guide and gear recommendations:`,
        senderId: 'travel-admin',
        createdAt: new Date(Date.now() - 18000000),
        isRead: true,
        views: 94500,
        attachments: [
          {
            id: 'travel-img-7',
            name: 'machu-picchu-trek.jpg',
            type: 'image/jpeg',
            size: 2789012,
            url: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'travel-img-8',
            name: 'mountain-trekking.jpg',
            type: 'image/jpeg',
            size: 2567890,
            url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'travel-img-9',
            name: 'patagonia-landscape.jpg',
            type: 'image/jpeg',
            size: 2345678,
            url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'travel6',
        content: '',
        senderId: 'travel-admin',
        createdAt: new Date(Date.now() - 21600000),
        isRead: true,
        views: 45600,
        voiceMessage: {
          url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
          duration: 255,
          waveform: [25, 40, 55, 70, 60, 45, 35, 50, 65, 75, 70, 55, 40, 30, 45, 60, 70, 80, 65, 50, 35, 40, 55, 70, 75, 65, 50, 40, 30, 45, 60, 70, 65, 55, 45, 35, 50, 65, 60, 45]
        }
      },
      {
        _id: 'travel7',
        content: `🏝️ Island Paradise: Maldives, Bali & Seychelles

Escape to tropical paradise! These stunning island destinations offer crystal-clear waters, pristine beaches, and ultimate relaxation.

Island getaway highlights:
• Maldives - Overwater bungalows and marine life
• Bali - Temples, rice terraces, and beach clubs
• Seychelles - Granite boulders and turquoise waters
• Best resorts and budget accommodations
• Water activities - Diving, snorkeling, surfing
• Local culture and cuisine experiences

Island hopping itineraries and resort booking:`,
        senderId: 'travel-admin',
        createdAt: new Date(Date.now() - 25200000),
        isRead: true,
        views: 103400,
        attachments: [
          {
            id: 'travel-vid-2',
            name: 'maldives-resort-tour.mp4',
            type: 'video/mp4',
            size: 19876543,
            url: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      },
      {
        _id: 'travel8',
        content: `🎒 Budget Travel Tips: See the World Without Breaking the Bank

Travel doesn't have to be expensive! Learn how to explore amazing destinations on a budget with our money-saving strategies.

Budget travel hacks:
• Flight deals - Use price alerts and flexible dates
• Accommodation - Hostels, Airbnb, house-sitting
• Food - Street food, local markets, self-catering
• Transportation - Public transit, walking tours
• Free activities - Museums, parks, festivals
• Travel credit cards - Points and rewards
• Off-season travel - Lower prices, fewer crowds

Budget destination recommendations and cost breakdowns:`,
        senderId: 'travel-admin',
        createdAt: new Date(Date.now() - 28800000),
        isRead: true,
        views: 87600,
        attachments: [
          {
            id: 'travel-pdf-2',
            name: 'budget-travel-guide.pdf',
            type: 'application/pdf',
            size: 4567890,
            url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
          }
        ]
      },
      {
        _id: 'travel9',
        content: `🌍 Solo Travel Guide: Empowering Adventures Alone

Traveling solo is one of life's most rewarding experiences! Discover the joys of independent travel and destinations perfect for solo adventurers.

Solo travel essentials:
• Safety tips and precautions for solo travelers
• Best destinations for solo travel (Iceland, New Zealand, Japan)
• Meeting other travelers - Hostels, tours, apps
• Overcoming loneliness and embracing solitude
• Solo female travel considerations
• Building confidence through independent exploration

Solo traveler community and safety resources:`,
        senderId: 'travel-admin',
        createdAt: new Date(Date.now() - 32400000),
        isRead: true,
        views: 76800,
        attachments: [
          {
            id: 'travel-img-10',
            name: 'solo-traveler-mountain.jpg',
            type: 'image/jpeg',
            size: 2456789,
            url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'travel-img-11',
            name: 'solo-travel-beach.jpg',
            type: 'image/jpeg',
            size: 2234567,
            url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&auto=format&fit=crop&q=60'
          }
        ]
      }
    ],

    // Book Club Channel (ID: 56)
    '56': [
      {
        _id: 'book1',
        content: `📚 This Month's Pick: "Atomic Habits" by James Clear

Join our discussion of this life-changing book about building good habits and breaking bad ones.

Key takeaways we'll explore:
• The 1% better principle
• Habit stacking techniques
• Environment design for success
• The plateau of latent potential

Discussion starts this weekend! Audio summary below:`,
        senderId: 'book-admin',
        createdAt: new Date(Date.now() - 5400000),
        isRead: false,
        views: 23400,
        attachments: [
          {
            id: 'book-img-1',
            name: 'atomic-habits-cover.jpg',
            type: 'image/jpeg',
            size: 1234567,
            url: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'book2',
        content: '',
        senderId: 'book-admin',
        createdAt: new Date(Date.now() - 9000000),
        isRead: true,
        views: 18700,
        voiceMessage: {
          url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
          duration: 240,
          waveform: [35, 50, 65, 80, 70, 55, 45, 60, 75, 85, 80, 65, 50, 40, 55, 70, 80, 90, 75, 60, 45, 50, 65, 80, 85, 75, 60, 50, 40, 55, 70, 80, 75, 65, 55, 45, 60, 75, 70, 55]
        }
      },
      {
        _id: 'book3',
        content: `📖 Classic Literature Deep Dive: "Pride and Prejudice"

Rediscover Jane Austen's masterpiece! We're exploring themes of class, marriage, and social commentary that remain relevant 200+ years later.

Discussion themes:
• Elizabeth Bennet - Proto-feminist heroine
• Social class and marriage in Regency England
• Austen's wit and satirical commentary
• Character development and growth
• Modern adaptations and cultural impact
• Why this book endures through generations

Reading guide and historical context: https://classiclit.com/pride-prejudice-guide`,
        senderId: 'book-admin',
        createdAt: new Date(Date.now() - 12600000),
        isRead: false,
        views: 45600,
        attachments: [
          {
            id: 'book-img-2',
            name: 'pride-prejudice-cover.jpg',
            type: 'image/jpeg',
            size: 2345678,
            url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'book-img-3',
            name: 'jane-austen-portrait.jpg',
            type: 'image/jpeg',
            size: 1987654,
            url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'book4',
        content: `🌟 Sci-Fi Spotlight: "Project Hail Mary" by Andy Weir

From the author of "The Martian" comes another thrilling space adventure! Join us for a discussion of this page-turner about humanity's last hope.

What we loved:
• Compelling protagonist and character development
• Hard science fiction done right
• Unexpected friendship and humor
• Problem-solving and ingenuity
• Emotional depth beneath the science
• Satisfying plot twists and resolution

Book club meeting this Thursday at 7 PM EST:`,
        senderId: 'book-admin',
        createdAt: new Date(Date.now() - 16200000),
        isRead: true,
        views: 67800,
        attachments: [
          {
            id: 'book-pdf-1',
            name: 'scifi-reading-list.pdf',
            type: 'application/pdf',
            size: 3456789,
            url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
          }
        ]
      },
      {
        _id: 'book5',
        content: '',
        senderId: 'book-admin',
        createdAt: new Date(Date.now() - 19800000),
        isRead: true,
        views: 34200,
        attachments: [
          {
            id: 'book-vid-1',
            name: 'author-interview-highlights.mp4',
            type: 'video/mp4',
            size: 17654321,
            url: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      },
      {
        _id: 'book6',
        content: `🔍 Mystery & Thriller Month: Agatha Christie Marathon

Celebrate the Queen of Mystery! We're reading three classic Christie novels and discussing her enduring influence on the mystery genre.

Christie classics to read:
• "Murder on the Orient Express" - Iconic locked-room mystery
• "And Then There Were None" - Masterclass in suspense
• "The Murder of Roger Ackroyd" - Revolutionary plot twist
• Hercule Poirot vs Miss Marple - Character analysis
• Christie's influence on modern crime fiction
• Adaptations across film and TV

Mystery writing techniques and plot structure:`,
        senderId: 'book-admin',
        createdAt: new Date(Date.now() - 23400000),
        isRead: true,
        views: 78900,
        attachments: [
          {
            id: 'book-img-4',
            name: 'agatha-christie-collection.jpg',
            type: 'image/jpeg',
            size: 2567890,
            url: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'book-img-5',
            name: 'mystery-books-shelf.jpg',
            type: 'image/jpeg',
            size: 2234567,
            url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'book-img-6',
            name: 'vintage-mystery-covers.jpg',
            type: 'image/jpeg',
            size: 1876543,
            url: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'book7',
        content: '',
        senderId: 'book-admin',
        createdAt: new Date(Date.now() - 27000000),
        isRead: true,
        views: 23400,
        voiceMessage: {
          url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
          duration: 210,
          waveform: [30, 45, 60, 75, 65, 50, 40, 55, 70, 80, 75, 60, 45, 35, 50, 65, 75, 85, 70, 55, 40, 45, 60, 75, 80, 70, 55, 45, 35, 50, 65, 75, 70, 60, 50, 40, 55, 70, 65, 50]
        }
      },
      {
        _id: 'book8',
        content: `📚 Diverse Voices: Contemporary Authors You Should Read

Expand your reading horizons with these powerful contemporary voices offering fresh perspectives and compelling storytelling.

Must-read contemporary authors:
• Chimamanda Ngozi Adichie - "Americanah" (Nigerian perspective)
• Ocean Vuong - "On Earth We're Briefly Gorgeous" (Poetic prose)
• Min Jin Lee - "Pachinko" (Korean diaspora epic)
• Colson Whitehead - "The Underground Railroad" (Historical reimagining)
• Jesmyn Ward - "Sing, Unburied, Sing" (Southern Gothic)
• Tommy Orange - "There There" (Native American voices)

Diversity in literature and representation matters:`,
        senderId: 'book-admin',
        createdAt: new Date(Date.now() - 30600000),
        isRead: true,
        views: 89400,
        attachments: [
          {
            id: 'book-vid-2',
            name: 'diverse-authors-panel.mp4',
            type: 'video/mp4',
            size: 19876543,
            url: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      },
      {
        _id: 'book9',
        content: `💡 Book Recommendations by Mood

Can't decide what to read next? Let your current mood guide you! Here are our curated recommendations for every emotional state.

Reading by mood:
• Need comfort? - "The House in the Cerulean Sea" (wholesome fantasy)
• Feeling adventurous? - "The Name of the Wind" (epic fantasy)
• Want to cry? - "A Little Life" (emotional devastation)
• Need inspiration? - "Educated" (memoir of transformation)
• Craving suspense? - "Gone Girl" (psychological thriller)
• Seeking wisdom? - "Meditations" by Marcus Aurelius (philosophy)

Book recommendation quiz and reading tracker:`,
        senderId: 'book-admin',
        createdAt: new Date(Date.now() - 34200000),
        isRead: true,
        views: 67800,
        attachments: [
          {
            id: 'book-img-7',
            name: 'cozy-reading-nook.jpg',
            type: 'image/jpeg',
            size: 2456789,
            url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'book-img-8',
            name: 'book-stack-coffee.jpg',
            type: 'image/jpeg',
            size: 2123456,
            url: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&auto=format&fit=crop&q=60'
          }
        ]
      }
    ],

    // Music Discovery Channel (ID: 57)
    '57': [
      {
        _id: 'music1',
        content: `🎵 New Indie Artists You Should Know

Discover fresh sounds from emerging indie artists making waves in 2024! Our curated playlist features the most promising new talents.

Featured artists:
• Luna Waves - Dreamy synthpop
• The Midnight Garden - Folk rock
• Neon Pulse - Electronic indie
• Velvet Skies - Alternative rock

Listen to our exclusive playlist: https://spotify.com/indie-discoveries-2024`,
        senderId: 'music-admin',
        createdAt: new Date(Date.now() - 4500000),
        isRead: false,
        views: 34200,
        attachments: [
          {
            id: 'music-img-1',
            name: 'indie-artists-2024.jpg',
            type: 'image/jpeg',
            size: 1987654,
            url: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'music-img-2',
            name: 'playlist-cover.jpg',
            type: 'image/jpeg',
            size: 1654321,
            url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'music2',
        content: `🎸 Genre Spotlight: The Rise of Hyperpop

Hyperpop is exploding in popularity, blending electronic music with pop sensibilities and experimental production. Dive into this boundary-pushing genre!

Hyperpop essentials:
• 100 gecs - Chaotic energy and glitchy production
• Charli XCX - Pop perfection meets avant-garde
• SOPHIE - Revolutionary production (RIP)
• A.G. Cook - PC Music mastermind
• Dorian Electra - Genre-fluid experimentation
• Arca - Experimental electronic artistry

Hyperpop playlist and production techniques: https://musictheory.com/hyperpop-guide`,
        senderId: 'music-admin',
        createdAt: new Date(Date.now() - 9000000),
        isRead: false,
        views: 67800,
        attachments: [
          {
            id: 'music-img-3',
            name: 'hyperpop-artists.jpg',
            type: 'image/jpeg',
            size: 2345678,
            url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'music-img-4',
            name: 'electronic-music-production.jpg',
            type: 'image/jpeg',
            size: 2123456,
            url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'music3',
        content: '',
        senderId: 'music-admin',
        createdAt: new Date(Date.now() - 12600000),
        isRead: true,
        views: 56700,
        attachments: [
          {
            id: 'music-vid-1',
            name: 'live-session-acoustic.mp4',
            type: 'video/mp4',
            size: 19876543,
            url: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      },
      {
        _id: 'music4',
        content: `🌍 World Music Exploration: Global Sounds to Discover

Expand your musical horizons with incredible artists from around the world. From Afrobeats to K-pop, discover the diverse sounds shaping global music.

Global music highlights:
• Burna Boy - Afrobeats superstar (Nigeria)
• Rosalía - Flamenco fusion innovator (Spain)
• BTS - K-pop global phenomenon (South Korea)
• Anoushka Shankar - Sitar virtuoso (India/UK)
• Bomba Estéreo - Cumbia electronica (Colombia)
• Tinariwen - Desert blues masters (Mali)

World music playlist and cultural context:`,
        senderId: 'music-admin',
        createdAt: new Date(Date.now() - 16200000),
        isRead: true,
        views: 89400,
        attachments: [
          {
            id: 'music-pdf-1',
            name: 'world-music-guide.pdf',
            type: 'application/pdf',
            size: 4567890,
            url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
          }
        ]
      },
      {
        _id: 'music5',
        content: `🎧 Music Production 101: Creating Your First Track

Want to make your own music? Start your production journey with this beginner-friendly guide to music creation and essential tools.

Production essentials:
• DAW choices - Ableton Live, FL Studio, Logic Pro
• MIDI controllers - Keyboard and pad controllers
• Audio interface - Quality sound input/output
• Studio monitors - Accurate sound reproduction
• VST plugins - Synths, effects, and samples
• Music theory basics - Scales, chords, progressions

Production tutorials and free resources:`,
        senderId: 'music-admin',
        createdAt: new Date(Date.now() - 19800000),
        isRead: true,
        views: 94500,
        attachments: [
          {
            id: 'music-img-5',
            name: 'music-production-studio.jpg',
            type: 'image/jpeg',
            size: 2567890,
            url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'music-img-6',
            name: 'daw-interface.jpg',
            type: 'image/jpeg',
            size: 2345678,
            url: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'music-img-7',
            name: 'midi-controller-setup.jpg',
            type: 'image/jpeg',
            size: 1987654,
            url: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'music6',
        content: '',
        senderId: 'music-admin',
        createdAt: new Date(Date.now() - 23400000),
        isRead: true,
        views: 45600,
        voiceMessage: {
          url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
          duration: 245,
          waveform: [25, 40, 55, 70, 60, 45, 35, 50, 65, 75, 70, 55, 40, 30, 45, 60, 70, 80, 65, 50, 35, 40, 55, 70, 75, 65, 50, 40, 30, 45, 60, 70, 65, 55, 45, 35, 50, 65, 60, 45]
        }
      },
      {
        _id: 'music7',
        content: `🎤 Concert & Festival Guide: Must-See Live Shows 2024

Live music is back and better than ever! Don't miss these incredible concerts and festivals happening this year.

Festival lineup highlights:
• Coachella - April (Indio, CA) - Headliners: Bad Bunny, Blackpink
• Glastonbury - June (UK) - Elton John, Arctic Monkeys
• Lollapalooza - August (Chicago) - Billie Eilish, The 1975
• Tomorrowland - July (Belgium) - EDM paradise
• Austin City Limits - October (Texas) - Diverse lineup
• Primavera Sound - June (Barcelona) - Indie heaven

Ticket info and festival survival tips:`,
        senderId: 'music-admin',
        createdAt: new Date(Date.now() - 27000000),
        isRead: true,
        views: 103400,
        attachments: [
          {
            id: 'music-vid-2',
            name: 'festival-highlights-2024.mp4',
            type: 'video/mp4',
            size: 18765432,
            url: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      },
      {
        _id: 'music8',
        content: `📻 Throwback Thursday: 90s Hip-Hop Golden Era

Take a trip back to the golden age of hip-hop! Explore the albums and artists that defined a generation and continue to influence music today.

90s hip-hop essentials:
• Nas - "Illmatic" (1994) - Lyrical masterpiece
• The Notorious B.I.G. - "Ready to Die" (1994)
• Wu-Tang Clan - "Enter the Wu-Tang" (1993)
• A Tribe Called Quest - "The Low End Theory" (1991)
• Dr. Dre - "The Chronic" (1992) - G-funk revolution
• Lauryn Hill - "The Miseducation" (1998)

Hip-hop history and cultural impact analysis:`,
        senderId: 'music-admin',
        createdAt: new Date(Date.now() - 30600000),
        isRead: true,
        views: 87600,
        attachments: [
          {
            id: 'music-img-8',
            name: '90s-hiphop-culture.jpg',
            type: 'image/jpeg',
            size: 2456789,
            url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'music-img-9',
            name: 'vinyl-collection.jpg',
            type: 'image/jpeg',
            size: 2234567,
            url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'music9',
        content: `🎹 Jazz Appreciation: Modern Masters Keeping the Tradition Alive

Jazz continues to evolve while honoring its rich history. Discover contemporary jazz artists pushing boundaries and redefining the genre.

Modern jazz innovators:
• Kamasi Washington - Spiritual jazz epic scale
• Robert Glasper - Jazz meets hip-hop and R&B
• Esperanza Spalding - Bass virtuoso and vocalist
• Thundercat - Funk fusion bass mastery
• Snarky Puppy - Collective improvisation excellence
• Nubya Garcia - UK jazz scene leader

Jazz playlist and improvisation techniques:`,
        senderId: 'music-admin',
        createdAt: new Date(Date.now() - 34200000),
        isRead: true,
        views: 67800,
        attachments: [
          {
            id: 'music-img-10',
            name: 'jazz-performance.jpg',
            type: 'image/jpeg',
            size: 2345678,
            url: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'music-img-11',
            name: 'jazz-instruments.jpg',
            type: 'image/jpeg',
            size: 2123456,
            url: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&auto=format&fit=crop&q=60'
          }
        ]
      }
    ],

    // Gaming News Channel (ID: 58)
    '58': [
      {
        _id: 'gaming1',
        content: `🎮 Top 5 Games Releasing This Month

Get ready for an incredible month of gaming! Here are the most anticipated releases that will dominate your free time.

Must-play releases:
1. Cyber Legends 2077 - Futuristic RPG
2. Ocean Explorer - Underwater adventure
3. Racing Thunder - High-speed action
4. Mystery Manor - Puzzle adventure
5. Space Conquest - Strategy simulation

Full reviews and gameplay footage:`,
        senderId: 'gaming-admin',
        createdAt: new Date(Date.now() - 6300000),
        isRead: false,
        views: 67800,
        attachments: [
          {
            id: 'gaming-vid-1',
            name: 'top-games-preview.mp4',
            type: 'video/mp4',
            size: 18765432,
            url: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      },
      {
        _id: 'gaming1b',
        content: '',
        senderId: 'gaming-admin',
        createdAt: new Date(Date.now() - 6290000),
        isRead: false,
        views: 67800,
        attachments: [
          {
            id: 'gaming-img-1',
            name: 'cyber-legends.jpg',
            type: 'image/jpeg',
            size: 2345678,
            url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'gaming-img-2',
            name: 'ocean-explorer.jpg',
            type: 'image/jpeg',
            size: 2123456,
            url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'gaming2',
        content: `🏆 Esports Championship Finals: Epic Showdown

The biggest esports tournament of the year concludes this weekend! Watch the world's best teams compete for glory and a $5 million prize pool.

Championship highlights:
• League of Legends World Championship - Finals Sunday
• CS:GO Major - Semifinals Saturday
• Valorant Champions Tour - Grand Finals
• Dota 2 International - Bracket Stage
• Fortnite World Cup - Solo & Duo Finals

Live stream schedule and viewing guide: https://esports.com/championships`,
        senderId: 'gaming-admin',
        createdAt: new Date(Date.now() - 10800000),
        isRead: false,
        views: 112300,
        attachments: [
          {
            id: 'gaming-img-3',
            name: 'esports-championship.jpg',
            type: 'image/jpeg',
            size: 2567890,
            url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'gaming-img-4',
            name: 'esports-arena.jpg',
            type: 'image/jpeg',
            size: 2345678,
            url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'gaming3',
        content: `🕹️ Retro Gaming Revival: Classic Consoles Making a Comeback

Nostalgia meets modern technology! Discover the classic games being remastered and the retro consoles experiencing a renaissance.

Retro gaming trends:
• Nintendo Switch Online - Expanding classic library
• PlayStation Plus Premium - PS1/PS2 classics
• Sega Genesis Mini 2 - 60 classic games included
• Atari 2600+ - Modern remake of the legend
• PC remasters - Enhanced graphics and performance
• Speedrunning community - Classic game competitions

Retro game recommendations and emulation guide:`,
        senderId: 'gaming-admin',
        createdAt: new Date(Date.now() - 14400000),
        isRead: true,
        views: 78900,
        attachments: [
          {
            id: 'gaming-pdf-1',
            name: 'retro-gaming-guide.pdf',
            type: 'application/pdf',
            size: 4567890,
            url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
          }
        ]
      },
      {
        _id: 'gaming4',
        content: '',
        senderId: 'gaming-admin',
        createdAt: new Date(Date.now() - 18000000),
        isRead: true,
        views: 67800,
        attachments: [
          {
            id: 'gaming-vid-2',
            name: 'gaming-setup-tour.mp4',
            type: 'video/mp4',
            size: 21234567,
            url: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      },
      {
        _id: 'gaming5',
        content: `🎯 Gaming Hardware Guide: Building the Ultimate Setup

Level up your gaming experience with the latest hardware recommendations. From budget builds to high-end rigs, we've got you covered.

Hardware recommendations 2024:
• GPU: RTX 4080 / AMD RX 7900 XTX
• CPU: Intel i9-14900K / AMD Ryzen 9 7950X3D
• RAM: 32GB DDR5 6000MHz
• Storage: 2TB NVMe Gen 4 SSD
• Monitor: 1440p 240Hz or 4K 144Hz
• Peripherals: Mechanical keyboard, gaming mouse

Build guides and performance benchmarks:`,
        senderId: 'gaming-admin',
        createdAt: new Date(Date.now() - 21600000),
        isRead: true,
        views: 94500,
        attachments: [
          {
            id: 'gaming-img-5',
            name: 'gaming-pc-build.jpg',
            type: 'image/jpeg',
            size: 2678901,
            url: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'gaming-img-6',
            name: 'gaming-peripherals.jpg',
            type: 'image/jpeg',
            size: 2456789,
            url: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'gaming-img-7',
            name: 'rgb-gaming-setup.jpg',
            type: 'image/jpeg',
            size: 2234567,
            url: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'gaming6',
        content: '',
        senderId: 'gaming-admin',
        createdAt: new Date(Date.now() - 25200000),
        isRead: true,
        views: 45600,
        voiceMessage: {
          url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-18.mp3',
          duration: 270,
          waveform: [30, 45, 60, 75, 65, 50, 40, 55, 70, 80, 75, 60, 45, 35, 50, 65, 75, 85, 70, 55, 40, 45, 60, 75, 80, 70, 55, 45, 35, 50, 65, 75, 70, 60, 50, 40, 55, 70, 65, 50]
        }
      },
      {
        _id: 'gaming7',
        content: `🌟 Indie Game Spotlight: Hidden Gems Worth Playing

Support independent developers and discover unique gaming experiences! These indie titles prove you don't need AAA budgets to create masterpieces.

Must-play indie games:
• "Hollow Knight: Silksong" - Metroidvania perfection
• "Hades II" - Roguelike excellence continues
• "Stray Gods" - Musical RPG innovation
• "Sea of Stars" - Turn-based RPG nostalgia
• "Cocoon" - Puzzle adventure artistry
• "Pizza Tower" - Fast-paced platforming chaos

Indie game recommendations and developer interviews:`,
        senderId: 'gaming-admin',
        createdAt: new Date(Date.now() - 28800000),
        isRead: true,
        views: 87600,
        attachments: [
          {
            id: 'gaming-vid-3',
            name: 'indie-game-showcase.mp4',
            type: 'video/mp4',
            size: 17654321,
            url: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      },
      {
        _id: 'gaming8',
        content: `🎮 Console Wars 2024: PS5 vs Xbox Series X vs Nintendo Switch

The battle for gaming supremacy continues! Compare the latest consoles and exclusive titles to decide which platform is right for you.

Console comparison:
• PlayStation 5 - Exclusive powerhouses (Spider-Man 2, God of War)
• Xbox Series X - Game Pass value champion
• Nintendo Switch - Portable innovation (Zelda, Mario)
• Performance specs and backwards compatibility
• Online services and subscription models
• Upcoming exclusive releases

Console buying guide and game library analysis:`,
        senderId: 'gaming-admin',
        createdAt: new Date(Date.now() - 32400000),
        isRead: true,
        views: 103400,
        attachments: [
          {
            id: 'gaming-img-8',
            name: 'console-comparison.jpg',
            type: 'image/jpeg',
            size: 2567890,
            url: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'gaming-img-9',
            name: 'ps5-exclusives.jpg',
            type: 'image/jpeg',
            size: 2345678,
            url: 'https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'gaming9',
        content: `🚀 VR Gaming Revolution: The Future is Immersive

Virtual reality gaming has evolved beyond gimmicks into truly transformative experiences. Explore the latest VR titles and hardware pushing boundaries.

VR gaming highlights:
• Meta Quest 3 - Standalone VR leader
• PlayStation VR2 - Console VR excellence
• Valve Index - PC VR precision
• "Half-Life: Alyx" - VR storytelling masterpiece
• "Beat Saber" - Rhythm game phenomenon
• Fitness VR - Gaming meets exercise

VR setup guides and game recommendations:`,
        senderId: 'gaming-admin',
        createdAt: new Date(Date.now() - 36000000),
        isRead: true,
        views: 76800,
        attachments: [
          {
            id: 'gaming-img-10',
            name: 'vr-gaming-setup.jpg',
            type: 'image/jpeg',
            size: 2456789,
            url: 'https://images.unsplash.com/photo-1617802690658-1173a812650d?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'gaming-img-11',
            name: 'vr-headset-comparison.jpg',
            type: 'image/jpeg',
            size: 2234567,
            url: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&auto=format&fit=crop&q=60'
          }
        ]
      }
    ],

    // Fashion Trends Channel (ID: 59)
    '59': [
      {
        _id: 'fashion1',
        content: `👗 Spring 2024 Fashion Forecast

Get ahead of the trends with our comprehensive spring fashion guide! From runway to street style, we've got you covered.

Key trends to watch:
• Pastel power - Soft hues dominate
• Oversized blazers - Power dressing returns
• Sustainable fabrics - Eco-conscious fashion
• Vintage revival - 90s nostalgia continues
• Bold accessories - Statement pieces shine

Style inspiration gallery:`,
        senderId: 'fashion-admin',
        createdAt: new Date(Date.now() - 7200000),
        isRead: false,
        views: 45600,
        attachments: [
          {
            id: 'fashion-img-1',
            name: 'spring-trends-1.jpg',
            type: 'image/jpeg',
            size: 2456789,
            url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'fashion-img-2',
            name: 'spring-trends-2.jpg',
            type: 'image/jpeg',
            size: 2234567,
            url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'fashion-img-3',
            name: 'spring-trends-3.jpg',
            type: 'image/jpeg',
            size: 2345678,
            url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'fashion2',
        content: `✨ Sustainable Fashion Revolution: Eco-Friendly Style Guide

Fashion meets sustainability! Discover how to build a stylish wardrobe while minimizing your environmental impact and supporting ethical brands.

Sustainable fashion principles:
• Quality over quantity - Invest in timeless pieces
• Secondhand shopping - Thrift and vintage treasures
• Ethical brands - Support fair labor practices
• Natural fabrics - Organic cotton, linen, hemp
• Circular fashion - Rent, swap, and recycle
• Capsule wardrobe - 30-40 versatile pieces

Eco-friendly brand directory and styling tips: https://sustainablefashion.com/guide`,
        senderId: 'fashion-admin',
        createdAt: new Date(Date.now() - 10800000),
        isRead: false,
        views: 78900,
        attachments: [
          {
            id: 'fashion-img-4',
            name: 'sustainable-fashion.jpg',
            type: 'image/jpeg',
            size: 2567890,
            url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'fashion-img-5',
            name: 'eco-friendly-wardrobe.jpg',
            type: 'image/jpeg',
            size: 2345678,
            url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'fashion3',
        content: '',
        senderId: 'fashion-admin',
        createdAt: new Date(Date.now() - 14400000),
        isRead: true,
        views: 56700,
        attachments: [
          {
            id: 'fashion-vid-1',
            name: 'runway-highlights-2024.mp4',
            type: 'video/mp4',
            size: 18765432,
            url: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      },
      {
        _id: 'fashion4',
        content: `👔 Men's Fashion Essentials: Building the Perfect Wardrobe

Elevate your style game with these timeless menswear pieces and modern trends. From casual to formal, master the art of dressing well.

Wardrobe essentials:
• Tailored suit - Navy or charcoal gray
• White Oxford shirt - Classic versatility
• Dark denim jeans - Well-fitted and quality
• Leather dress shoes - Oxfords or brogues
• Casual sneakers - Clean white or minimalist
• Leather jacket - Timeless cool factor
• Quality watch - Investment piece

Styling guides and fit recommendations:`,
        senderId: 'fashion-admin',
        createdAt: new Date(Date.now() - 18000000),
        isRead: true,
        views: 89400,
        attachments: [
          {
            id: 'fashion-pdf-1',
            name: 'mens-style-guide.pdf',
            type: 'application/pdf',
            size: 4567890,
            url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
          }
        ]
      },
      {
        _id: 'fashion5',
        content: `💄 Beauty Trends 2024: Makeup & Skincare Innovations

Stay ahead of the beauty curve with the latest makeup techniques, skincare breakthroughs, and wellness trends transforming the industry.

Beauty trends to try:
• Clean beauty movement - Non-toxic ingredients
• Skin minimalism - "No-makeup" makeup look
• Bold lips return - Classic red and berry tones
• Glass skin - Korean skincare influence
• Sustainable packaging - Refillable products
• Personalized skincare - AI-powered routines

Product recommendations and tutorial videos:`,
        senderId: 'fashion-admin',
        createdAt: new Date(Date.now() - 21600000),
        isRead: true,
        views: 94500,
        attachments: [
          {
            id: 'fashion-img-6',
            name: 'beauty-trends-2024.jpg',
            type: 'image/jpeg',
            size: 2456789,
            url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'fashion-img-7',
            name: 'skincare-routine.jpg',
            type: 'image/jpeg',
            size: 2234567,
            url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'fashion-img-8',
            name: 'makeup-trends.jpg',
            type: 'image/jpeg',
            size: 1987654,
            url: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'fashion6',
        content: '',
        senderId: 'fashion-admin',
        createdAt: new Date(Date.now() - 25200000),
        isRead: true,
        views: 45600,
        voiceMessage: {
          url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3',
          duration: 230,
          waveform: [25, 40, 55, 70, 60, 45, 35, 50, 65, 75, 70, 55, 40, 30, 45, 60, 70, 80, 65, 50, 35, 40, 55, 70, 75, 65, 50, 40, 30, 45, 60, 70, 65, 55, 45, 35, 50, 65, 60, 45]
        }
      },
      {
        _id: 'fashion7',
        content: `👠 Accessory Trends: Statement Pieces That Transform Outfits

The right accessories can elevate any look from basic to extraordinary. Discover this season's must-have pieces and how to style them.

Trending accessories:
• Chunky gold jewelry - Bold chains and hoops
• Mini bags - Micro purses make a statement
• Platform shoes - 70s revival continues
• Oversized sunglasses - Retro glamour
• Silk scarves - Versatile styling options
• Bucket hats - Street style staple

Accessory styling tips and shopping guide:`,
        senderId: 'fashion-admin',
        createdAt: new Date(Date.now() - 28800000),
        isRead: true,
        views: 67800,
        attachments: [
          {
            id: 'fashion-vid-2',
            name: 'accessory-styling-guide.mp4',
            type: 'video/mp4',
            size: 15678901,
            url: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      },
      {
        _id: 'fashion8',
        content: `🌟 Celebrity Style Breakdown: Red Carpet to Street Style

Get inspired by celebrity fashion choices and learn how to recreate their iconic looks on any budget.

Style icons to watch:
• Zendaya - Risk-taking fashion chameleon
• Timothée Chalamet - Modern menswear icon
• Rihanna - Trendsetter extraordinaire
• Harry Styles - Gender-fluid fashion pioneer
• Blake Lively - Classic Hollywood glamour
• Bad Bunny - Bold streetwear influence

Celebrity look-alikes and budget alternatives:`,
        senderId: 'fashion-admin',
        createdAt: new Date(Date.now() - 32400000),
        isRead: true,
        views: 112300,
        attachments: [
          {
            id: 'fashion-img-9',
            name: 'celebrity-red-carpet.jpg',
            type: 'image/jpeg',
            size: 2678901,
            url: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'fashion-img-10',
            name: 'street-style-inspiration.jpg',
            type: 'image/jpeg',
            size: 2456789,
            url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'fashion-img-11',
            name: 'celebrity-casual-looks.jpg',
            type: 'image/jpeg',
            size: 2123456,
            url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'fashion9',
        content: `🛍️ Fashion Week Highlights: Global Runway Trends

From Paris to New York, Milan to London - discover the trends that will define fashion for the next season straight from the world's top runways.

Fashion Week key takeaways:
• Paris - Romantic maximalism and couture craftsmanship
• New York - Practical luxury and American sportswear
• Milan - Italian elegance meets modern innovation
• London - Avant-garde experimentation and sustainability
• Tokyo - Street style fusion and technical fabrics

Designer collections and trend forecasts:`,
        senderId: 'fashion-admin',
        createdAt: new Date(Date.now() - 36000000),
        isRead: true,
        views: 87600,
        attachments: [
          {
            id: 'fashion-img-12',
            name: 'fashion-week-paris.jpg',
            type: 'image/jpeg',
            size: 2567890,
            url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'fashion-img-13',
            name: 'runway-collection.jpg',
            type: 'image/jpeg',
            size: 2345678,
            url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&auto=format&fit=crop&q=60'
          }
        ]
      }
    ],

    // Art & Culture Channel (ID: 62)
    '62': [
      {
        _id: 'art1',
        content: `🎨 Virtual Museum Tours This Weekend

Explore world-class art collections from the comfort of your home! We've partnered with leading museums to bring you exclusive virtual experiences.

Featured exhibitions:
• Louvre - Renaissance Masters
• MoMA - Contemporary Abstracts  
• Tate Modern - Digital Art Revolution
• Guggenheim - Impressionist Collection

Join live guided tours with expert curators:`,
        senderId: 'art-admin',
        createdAt: new Date(Date.now() - 8100000),
        isRead: false,
        views: 28900,
        attachments: [
          {
            id: 'art-img-1',
            name: 'virtual-tour-1.jpg',
            type: 'image/jpeg',
            size: 2567890,
            url: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'art-img-2',
            name: 'virtual-tour-2.jpg',
            type: 'image/jpeg',
            size: 2345678,
            url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'art2',
        content: `🏛️ Ancient Civilizations: Rediscovered Treasures

Archaeological discoveries continue to reshape our understanding of ancient cultures. Explore the latest findings that reveal the sophistication of our ancestors.

Recent discoveries:
• Egyptian tomb with intact hieroglyphic scrolls
• Mayan astronomical calculator in Guatemala
• Roman villa with pristine mosaics in Britain
• Viking trading post artifacts in Greenland
• Mesopotamian cuneiform tablets revealing new stories
• Chinese Terracotta Army expansion discovery

Archaeological insights and cultural significance: https://ancientcultures.com/discoveries`,
        senderId: 'art-admin',
        createdAt: new Date(Date.now() - 12600000),
        isRead: false,
        views: 67800,
        attachments: [
          {
            id: 'art-img-3',
            name: 'ancient-artifacts.jpg',
            type: 'image/jpeg',
            size: 2345678,
            url: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'art-img-4',
            name: 'archaeological-site.jpg',
            type: 'image/jpeg',
            size: 1987654,
            url: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'art-img-5',
            name: 'hieroglyphic-scrolls.jpg',
            type: 'image/jpeg',
            size: 2123456,
            url: 'https://images.unsplash.com/photo-1471919743851-c4df8b6ee133?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'art3',
        content: '',
        senderId: 'art-admin',
        createdAt: new Date(Date.now() - 16200000),
        isRead: true,
        views: 45600,
        attachments: [
          {
            id: 'art-vid-1',
            name: 'renaissance-art-documentary.mp4',
            type: 'video/mp4',
            size: 19876543,
            url: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      },
      {
        _id: 'art4',
        content: `🎭 Theater Revival: Broadway's Triumphant Return

The theater world is experiencing a renaissance! From innovative productions to classic revivals, Broadway and global theater scenes are more vibrant than ever.

Must-see productions:
• "Hamilton" - Revolutionary musical storytelling
• "The Lion King" - Spectacular visual artistry
• "Phantom of the Opera" - Timeless romantic drama
• "Chicago" - Jazz-age musical perfection
• "Wicked" - Reimagined fairy tale magic
• New experimental works pushing boundaries

Behind-the-scenes insights and ticket booking guide:`,
        senderId: 'art-admin',
        createdAt: new Date(Date.now() - 19800000),
        isRead: true,
        views: 89200,
        attachments: [
          {
            id: 'art-pdf-1',
            name: 'theater-season-guide.pdf',
            type: 'application/pdf',
            size: 4567890,
            url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
          }
        ]
      },
      {
        _id: 'art5',
        content: `🎼 Classical Music Masterpieces: A Journey Through Time

Discover the emotional power and technical brilliance of classical compositions that have moved audiences for centuries. From Baroque to Contemporary.

Essential listening:
• Bach - Brandenburg Concertos (Baroque precision)
• Mozart - Symphony No. 40 (Classical elegance)
• Beethoven - Symphony No. 9 (Romantic power)
• Chopin - Nocturnes (Romantic intimacy)
• Debussy - Clair de Lune (Impressionist beauty)
• Stravinsky - The Rite of Spring (Modern revolution)

Composer biographies and listening guides:`,
        senderId: 'art-admin',
        createdAt: new Date(Date.now() - 23400000),
        isRead: true,
        views: 56700,
        attachments: [
          {
            id: 'art-img-6',
            name: 'classical-composers.jpg',
            type: 'image/jpeg',
            size: 2456789,
            url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'art-img-7',
            name: 'orchestra-performance.jpg',
            type: 'image/jpeg',
            size: 2234567,
            url: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'art6',
        content: '',
        senderId: 'art-admin',
        createdAt: new Date(Date.now() - 27000000),
        isRead: true,
        views: 38900,
        voiceMessage: {
          url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3',
          duration: 240,
          waveform: [30, 45, 60, 75, 65, 50, 40, 55, 70, 80, 75, 60, 45, 35, 50, 65, 75, 85, 70, 55, 40, 45, 60, 75, 80, 70, 55, 45, 35, 50, 65, 75, 70, 60, 50, 40, 55, 70, 65, 50]
        }
      },
      {
        _id: 'art7',
        content: `🖼️ Contemporary Art Movements: Pushing Boundaries

Modern artists continue to challenge conventions and explore new mediums. Discover the movements shaping today's art world and tomorrow's masterpieces.

Current art movements:
• Digital Art & NFTs - Blockchain-based creativity
• Bio Art - Living organisms as artistic medium
• Street Art Evolution - From graffiti to galleries
• Interactive Installations - Audience participation art
• Eco Art - Environmental consciousness in creation
• AI-Generated Art - Machine learning creativity

Gallery exhibitions and artist spotlights:`,
        senderId: 'art-admin',
        createdAt: new Date(Date.now() - 30600000),
        isRead: true,
        views: 73400,
        attachments: [
          {
            id: 'art-img-8',
            name: 'contemporary-art-gallery.jpg',
            type: 'image/jpeg',
            size: 2567890,
            url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'art-img-9',
            name: 'digital-art-installation.jpg',
            type: 'image/jpeg',
            size: 2345678,
            url: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'art-img-10',
            name: 'street-art-mural.jpg',
            type: 'image/jpeg',
            size: 1876543,
            url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'art8',
        content: `📚 Literary Classics: Timeless Stories That Shape Culture

Literature has the power to transport us across time and space. Explore the books that have influenced generations and continue to resonate today.

Essential reading list:
• "1984" by George Orwell - Dystopian masterpiece
• "To Kill a Mockingbird" by Harper Lee - Social justice
• "One Hundred Years of Solitude" by García Márquez - Magical realism
• "Pride and Prejudice" by Jane Austen - Social commentary
• "The Great Gatsby" by F. Scott Fitzgerald - American Dream
• "Beloved" by Toni Morrison - Historical trauma and healing

Book club discussions and author interviews:`,
        senderId: 'art-admin',
        createdAt: new Date(Date.now() - 34200000),
        isRead: true,
        views: 67800,
        attachments: [
          {
            id: 'art-img-11',
            name: 'classic-literature.jpg',
            type: 'image/jpeg',
            size: 2234567,
            url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'art-img-12',
            name: 'library-books.jpg',
            type: 'image/jpeg',
            size: 1987654,
            url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60'
          }
        ]
      }
    ],

    // Movie Reviews Channel (ID: 60)
    '60': [
      {
        _id: 'movie1',
        content: `🎬 Oscar Nominations 2024 Predictions

Awards season is heating up! Our film critics have analyzed this year's contenders and made their predictions for the major categories.

Top contenders:
• Best Picture: "The Artist's Journey"
• Best Director: Christopher Nolan
• Best Actor: Ryan Gosling
• Best Actress: Margot Robbie
• Best Cinematography: "Dune: Part Two"

Full analysis and trailer compilation:`,
        senderId: 'movie-admin',
        createdAt: new Date(Date.now() - 9000000),
        isRead: false,
        views: 52300,
        attachments: [
          {
            id: 'movie-vid-1',
            name: 'oscar-predictions-2024.mp4',
            type: 'video/mp4',
            size: 16789012,
            url: 'https://www.w3schools.com/html/mov_bbb.mp4'
          },
          {
            id: 'movie-img-1',
            name: 'oscar-nominees.jpg',
            type: 'image/jpeg',
            size: 2456789,
            url: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'movie2',
        content: `🎥 Summer Blockbuster Preview: Must-Watch Films

Get ready for an epic summer at the movies! From superhero spectacles to heartfelt dramas, this season promises unforgettable cinematic experiences.

Summer 2024 releases:
• "Guardians of the Galaxy Vol. 4" - May 3rd (Action/Comedy)
• "Mission: Impossible 8" - June 28th (Action/Thriller)
• "Barbie 2" - July 19th (Comedy/Fantasy)
• "Oppenheimer: The Aftermath" - August 9th (Historical Drama)
• "Spider-Man: Beyond the Multiverse" - August 23rd (Superhero)

Ticket pre-sales and theater finder: https://movietickets.com/summer2024`,
        senderId: 'movie-admin',
        createdAt: new Date(Date.now() - 12600000),
        isRead: false,
        views: 89400,
        attachments: [
          {
            id: 'movie-img-2',
            name: 'summer-blockbusters.jpg',
            type: 'image/jpeg',
            size: 2567890,
            url: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'movie-img-3',
            name: 'movie-theater-crowd.jpg',
            type: 'image/jpeg',
            size: 2345678,
            url: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'movie-img-4',
            name: 'blockbuster-posters.jpg',
            type: 'image/jpeg',
            size: 1987654,
            url: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'movie3',
        content: `⭐ Film Critic's Choice: Hidden Gems You Missed

Not all great films get blockbuster marketing. Discover these critically acclaimed indie films and international cinema masterpieces that deserve your attention.

Underrated masterpieces:
• "The Quiet Revolution" - French drama (9.2/10)
• "Echoes of Tomorrow" - Sci-fi indie (8.8/10)
• "Paper Dreams" - Japanese animation (9.5/10)
• "The Last Lighthouse" - Irish drama (8.9/10)
• "Midnight in Mumbai" - Bollywood thriller (9.0/10)

Where to stream and festival screenings:`,
        senderId: 'movie-admin',
        createdAt: new Date(Date.now() - 16200000),
        isRead: true,
        views: 67800,
        attachments: [
          {
            id: 'movie-pdf-1',
            name: 'indie-film-guide.pdf',
            type: 'application/pdf',
            size: 4567890,
            url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
          }
        ]
      },
      {
        _id: 'movie4',
        content: '',
        senderId: 'movie-admin',
        createdAt: new Date(Date.now() - 19800000),
        isRead: true,
        views: 56700,
        attachments: [
          {
            id: 'movie-vid-2',
            name: 'cinematography-masterclass.mp4',
            type: 'video/mp4',
            size: 19876543,
            url: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      },
      {
        _id: 'movie5',
        content: `🍿 Classic Cinema Retrospective: Timeless Masterpieces

Journey through film history with these iconic movies that shaped cinema and continue to inspire filmmakers today.

Essential classics to watch:
• "The Godfather" (1972) - Crime drama perfection
• "2001: A Space Odyssey" (1968) - Sci-fi visionary
• "Citizen Kane" (1941) - Technical innovation
• "Seven Samurai" (1954) - Epic storytelling
• "Casablanca" (1942) - Romantic classic
• "Psycho" (1960) - Thriller masterclass

Film history context and director insights:`,
        senderId: 'movie-admin',
        createdAt: new Date(Date.now() - 23400000),
        isRead: true,
        views: 78300,
        attachments: [
          {
            id: 'movie-img-5',
            name: 'classic-cinema-collection.jpg',
            type: 'image/jpeg',
            size: 2456789,
            url: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'movie-img-6',
            name: 'vintage-film-reels.jpg',
            type: 'image/jpeg',
            size: 2234567,
            url: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'movie6',
        content: '',
        senderId: 'movie-admin',
        createdAt: new Date(Date.now() - 27000000),
        isRead: true,
        views: 45600,
        voiceMessage: {
          url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3',
          duration: 250,
          waveform: [30, 45, 60, 75, 65, 50, 40, 55, 70, 80, 75, 60, 45, 35, 50, 65, 75, 85, 70, 55, 40, 45, 60, 75, 80, 70, 55, 45, 35, 50, 65, 75, 70, 60, 50, 40, 55, 70, 65, 50]
        }
      },
      {
        _id: 'movie7',
        content: `🎭 Director Spotlight: Visionary Filmmakers Shaping Modern Cinema

Explore the unique styles and groundbreaking works of directors who are redefining what cinema can be in the 21st century.

Contemporary masters:
• Denis Villeneuve - Sci-fi epic storytelling (Dune, Arrival)
• Greta Gerwig - Character-driven narratives (Barbie, Lady Bird)
• Jordan Peele - Social horror innovation (Get Out, Nope)
• Bong Joon-ho - Genre-blending mastery (Parasite)
• Chloé Zhao - Intimate epic scale (Nomadland, Eternals)
• Taika Waititi - Comedy with heart (Thor, Jojo Rabbit)

Director filmographies and upcoming projects:`,
        senderId: 'movie-admin',
        createdAt: new Date(Date.now() - 30600000),
        isRead: true,
        views: 94500,
        attachments: [
          {
            id: 'movie-img-7',
            name: 'modern-directors.jpg',
            type: 'image/jpeg',
            size: 2678901,
            url: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'movie-img-8',
            name: 'film-set-behind-scenes.jpg',
            type: 'image/jpeg',
            size: 2456789,
            url: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'movie-img-9',
            name: 'director-at-work.jpg',
            type: 'image/jpeg',
            size: 2123456,
            url: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'movie8',
        content: `📺 Streaming Wars: Best Original Content This Month

Navigate the overwhelming world of streaming services with our curated picks of the best original films and series available now.

Top streaming picks:
• Netflix: "The Crown" Season 6 finale
• Apple TV+: "Foundation" Season 3 premiere
• Disney+: "Loki" Season 2 conclusion
• Amazon Prime: "The Boys" Season 4
• HBO Max: "The Last of Us" Season 2
• Paramount+: "Star Trek: Strange New Worlds"

Subscription value analysis and free trial guide:`,
        senderId: 'movie-admin',
        createdAt: new Date(Date.now() - 34200000),
        isRead: true,
        views: 87600,
        attachments: [
          {
            id: 'movie-vid-3',
            name: 'streaming-highlights-reel.mp4',
            type: 'video/mp4',
            size: 17654321,
            url: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      },
      {
        _id: 'movie9',
        content: `🎞️ Film Genre Deep Dive: Evolution of Horror Cinema

From silent era scares to modern psychological terror, explore how horror has evolved and why it remains one of cinema's most enduring genres.

Horror evolution timeline:
• Classic Gothic (1920s-1940s) - Universal Monsters
• Psychological Horror (1960s-1970s) - Hitchcock era
• Slasher Films (1980s) - Halloween, Friday the 13th
• J-Horror Influence (1990s-2000s) - The Ring, The Grudge
• Elevated Horror (2010s-present) - Get Out, Hereditary
• Folk Horror Revival - Midsommar, The Witch

Horror film recommendations and analysis:`,
        senderId: 'movie-admin',
        createdAt: new Date(Date.now() - 37800000),
        isRead: true,
        views: 73400,
        attachments: [
          {
            id: 'movie-img-10',
            name: 'horror-cinema-evolution.jpg',
            type: 'image/jpeg',
            size: 2567890,
            url: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'movie-img-11',
            name: 'classic-horror-posters.jpg',
            type: 'image/jpeg',
            size: 2345678,
            url: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&auto=format&fit=crop&q=60'
          }
        ]
      }
    ],

    // Science Daily Channel (ID: 61)
    '61': [
      {
        _id: 'science1',
        content: `🔬 Breakthrough in Quantum Computing

Scientists at MIT have achieved a major milestone in quantum computing, successfully demonstrating quantum supremacy with a 1000-qubit processor.

Key achievements:
• 1000-qubit quantum processor
• 99.9% fidelity in quantum operations
• Breakthrough in error correction
• Potential for real-world applications

This could revolutionize cryptography, drug discovery, and AI development.

Research paper and technical details:`,
        senderId: 'science-admin',
        createdAt: new Date(Date.now() - 10800000),
        isRead: false,
        views: 73400,
        attachments: [
          {
            id: 'science-pdf-1',
            name: 'quantum-computing-breakthrough.pdf',
            type: 'application/pdf',
            size: 6789012,
            url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
          },
          {
            id: 'science-img-1',
            name: 'quantum-processor.jpg',
            type: 'image/jpeg',
            size: 2789012,
            url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'science2',
        content: `🧬 CRISPR Gene Therapy Success: Curing Genetic Blindness

Groundbreaking clinical trial results show CRISPR gene editing successfully restored vision in patients with inherited blindness, marking a new era in genetic medicine.

Clinical trial results:
• 15 patients with Leber congenital amaurosis treated
• 80% showed significant vision improvement
• No serious adverse effects reported
• Treatment effects lasting 12+ months
• FDA fast-track approval expected
• Potential for treating 1000+ genetic diseases

Gene therapy revolution and future applications: https://geneticmedicine.org/crispr-breakthrough`,
        senderId: 'science-admin',
        createdAt: new Date(Date.now() - 14400000),
        isRead: false,
        views: 89200,
        attachments: [
          {
            id: 'science-img-2',
            name: 'crispr-gene-editing.jpg',
            type: 'image/jpeg',
            size: 2456789,
            url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'science-img-3',
            name: 'genetic-therapy-lab.jpg',
            type: 'image/jpeg',
            size: 2234567,
            url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'science3',
        content: '',
        senderId: 'science-admin',
        createdAt: new Date(Date.now() - 18000000),
        isRead: true,
        views: 67800,
        attachments: [
          {
            id: 'science-vid-1',
            name: 'mars-rover-discovery.mp4',
            type: 'video/mp4',
            size: 21234567,
            url: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      },
      {
        _id: 'science4',
        content: `🌍 Climate Science Update: Antarctic Ice Sheet Stability

New satellite data reveals concerning changes in Antarctic ice dynamics, with implications for global sea level rise projections and climate modeling.

Key findings:
• West Antarctic ice sheet losing 150 billion tons annually
• Thwaites Glacier retreat accelerating (doomsday glacier)
• Sea level rise projections increased by 30cm by 2100
• Tipping point may be closer than previously thought
• Ocean warming driving ice shelf collapse
• Urgent need for emission reductions

Climate research data and mitigation strategies:`,
        senderId: 'science-admin',
        createdAt: new Date(Date.now() - 21600000),
        isRead: true,
        views: 94500,
        attachments: [
          {
            id: 'science-pdf-2',
            name: 'antarctic-ice-study.pdf',
            type: 'application/pdf',
            size: 5678901,
            url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
          }
        ]
      },
      {
        _id: 'science5',
        content: `🧠 Neuroscience Breakthrough: Memory Transfer Between Brains

Researchers have successfully transferred memories between lab mice using optogenetics, opening new possibilities for treating memory disorders and understanding consciousness.

Experimental results:
• Memory engrams successfully identified and isolated
• Optogenetic stimulation recreated specific memories
• 70% accuracy in memory transfer between subjects
• No damage to existing neural pathways
• Potential applications for Alzheimer's treatment
• Ethical considerations for human applications

Memory research implications and future studies:`,
        senderId: 'science-admin',
        createdAt: new Date(Date.now() - 25200000),
        isRead: true,
        views: 78300,
        attachments: [
          {
            id: 'science-img-4',
            name: 'brain-neural-network.jpg',
            type: 'image/jpeg',
            size: 2567890,
            url: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'science-img-5',
            name: 'optogenetics-lab.jpg',
            type: 'image/jpeg',
            size: 2345678,
            url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'science-img-6',
            name: 'memory-engram-visualization.jpg',
            type: 'image/jpeg',
            size: 1987654,
            url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'science6',
        content: '',
        senderId: 'science-admin',
        createdAt: new Date(Date.now() - 28800000),
        isRead: true,
        views: 45600,
        voiceMessage: {
          url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3',
          duration: 285,
          waveform: [35, 50, 65, 80, 70, 55, 45, 60, 75, 85, 80, 65, 50, 40, 55, 70, 80, 90, 75, 60, 45, 50, 65, 80, 85, 75, 60, 50, 40, 55, 70, 80, 75, 65, 55, 45, 60, 75, 70, 55]
        }
      },
      {
        _id: 'science7',
        content: `⚛️ Nuclear Fusion Milestone: Net Energy Gain Achieved

The National Ignition Facility has achieved nuclear fusion ignition, producing more energy than was directly input into the reaction - a historic breakthrough for clean energy.

Fusion breakthrough details:
• 2.05 megajoules of energy output vs 2.05 MJ input
• First controlled fusion reaction with net energy gain
• Proof of concept for fusion power generation
• Potential for unlimited clean energy
• Still decades from commercial viability
• International collaboration accelerating research

Fusion energy timeline and investment opportunities:`,
        senderId: 'science-admin',
        createdAt: new Date(Date.now() - 32400000),
        isRead: true,
        views: 112300,
        attachments: [
          {
            id: 'science-img-7',
            name: 'fusion-reactor-chamber.jpg',
            type: 'image/jpeg',
            size: 2678901,
            url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'science-img-8',
            name: 'laser-fusion-setup.jpg',
            type: 'image/jpeg',
            size: 2456789,
            url: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'science8',
        content: `🚀 Space Exploration: James Webb Telescope Discovers Earth-like Exoplanet

The James Webb Space Telescope has identified an Earth-sized exoplanet in the habitable zone with signs of water vapor and potentially life-supporting conditions.

Exoplanet discovery:
• TOI-715b located 137 light-years away
• Earth-sized planet in habitable zone
• Water vapor detected in atmosphere
• Moderate temperatures suitable for liquid water
• Rocky composition similar to Earth
• Follow-up observations planned for biosignatures

Astrobiology implications and search for life:`,
        senderId: 'science-admin',
        createdAt: new Date(Date.now() - 36000000),
        isRead: true,
        views: 87600,
        attachments: [
          {
            id: 'science-vid-2',
            name: 'exoplanet-discovery-animation.mp4',
            type: 'video/mp4',
            size: 18765432,
            url: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      },
      {
        _id: 'science9',
        content: `🦠 Antibiotic Resistance Solution: AI Discovers New Drug Class

Artificial intelligence has identified a completely new class of antibiotics effective against drug-resistant bacteria, potentially solving the antibiotic resistance crisis.

AI drug discovery breakthrough:
• Novel antibiotic class targeting resistant bacteria
• 99% effectiveness against MRSA and other superbugs
• AI screened 100 million molecular compounds
• Minimal side effects in preliminary trials
• Fast-track development approved by FDA
• Could save millions of lives annually

Pharmaceutical AI revolution and drug development:`,
        senderId: 'science-admin',
        createdAt: new Date(Date.now() - 39600000),
        isRead: true,
        views: 76800,
        attachments: [
          {
            id: 'science-img-9',
            name: 'ai-drug-discovery.jpg',
            type: 'image/jpeg',
            size: 2345678,
            url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'science-img-10',
            name: 'antibiotic-research-lab.jpg',
            type: 'image/jpeg',
            size: 2234567,
            url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&auto=format&fit=crop&q=60'
          }
        ]
      }
    ],

    // Productivity Hacks Channel (ID: 63)
    '63': [
      {
        _id: 'productivity1',
        content: `⏰ Time Management Tips from CEOs

Learn how top executives manage their time and maximize productivity. These proven strategies can transform your daily routine.

CEO strategies revealed:
• The 2-minute rule (Tim Cook)
• Time blocking method (Elon Musk)
• Priority matrix (Warren Buffett)
• Energy management (Oprah Winfrey)
• Digital minimalism (Bill Gates)

Exclusive CEO interviews and productivity toolkit:`,
        senderId: 'productivity-admin',
        createdAt: new Date(Date.now() - 12600000),
        isRead: false,
        views: 89100,
        attachments: [
          {
            id: 'productivity-img-1',
            name: 'ceo-productivity-tips.jpg',
            type: 'image/jpeg',
            size: 2123456,
            url: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'productivity-img-2',
            name: 'time-blocking-template.jpg',
            type: 'image/jpeg',
            size: 1876543,
            url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'productivity2',
        content: '',
        senderId: 'productivity-admin',
        createdAt: new Date(Date.now() - 16200000),
        isRead: true,
        views: 45600,
        voiceMessage: {
          url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
          duration: 195,
          waveform: [40, 55, 70, 85, 75, 60, 50, 65, 80, 90, 85, 70, 55, 45, 60, 75, 85, 95, 80, 65, 50, 55, 70, 85, 90, 80, 65, 55, 45, 60, 75, 85, 80, 70, 60, 50, 65, 80, 75, 60]
        }
      },
      {
        _id: 'productivity3',
        content: `🧠 Deep Work: Mastering Focus in a Distracted World

In our hyperconnected age, the ability to focus deeply has become a superpower. Learn how to cultivate deep work habits and eliminate distractions.

Deep work principles:
• Create distraction-free environments
• Schedule deep work blocks (90-120 minutes)
• Use the Pomodoro Technique for shorter tasks
• Implement digital detox periods
• Practice single-tasking vs multitasking
• Build focus stamina gradually

Focus enhancement techniques and apps: https://deepwork.com/focus-guide`,
        senderId: 'productivity-admin',
        createdAt: new Date(Date.now() - 19800000),
        isRead: false,
        views: 76800,
        attachments: [
          {
            id: 'productivity-img-3',
            name: 'deep-work-setup.jpg',
            type: 'image/jpeg',
            size: 2345678,
            url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'productivity-img-4',
            name: 'focus-techniques.jpg',
            type: 'image/jpeg',
            size: 1987654,
            url: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'productivity4',
        content: '',
        senderId: 'productivity-admin',
        createdAt: new Date(Date.now() - 23400000),
        isRead: true,
        views: 52300,
        attachments: [
          {
            id: 'productivity-pdf-1',
            name: 'productivity-systems-guide.pdf',
            type: 'application/pdf',
            size: 4567890,
            url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
          }
        ]
      },
      {
        _id: 'productivity5',
        content: `📱 Digital Minimalism: Reclaim Your Attention

Technology should serve you, not control you. Learn how to optimize your digital tools and eliminate digital clutter for maximum productivity.

Digital minimalism strategies:
• Audit your apps and uninstall time-wasters
• Turn off non-essential notifications
• Use website blockers during focus time
• Implement phone-free zones and times
• Practice the 30-30-30 rule for screen breaks
• Batch process emails and messages

Recommended productivity apps and digital wellness tools:`,
        senderId: 'productivity-admin',
        createdAt: new Date(Date.now() - 27000000),
        isRead: true,
        views: 89400,
        attachments: [
          {
            id: 'productivity-vid-1',
            name: 'digital-minimalism-setup.mp4',
            type: 'video/mp4',
            size: 15678901,
            url: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      },
      {
        _id: 'productivity6',
        content: `🎯 Goal Setting & Achievement System

Transform your dreams into reality with a proven goal-setting framework. Learn how to set, track, and achieve ambitious goals consistently.

SMART-ER goal framework:
• Specific - Clear and well-defined objectives
• Measurable - Quantifiable progress indicators
• Achievable - Realistic yet challenging
• Relevant - Aligned with your values and vision
• Time-bound - Clear deadlines and milestones
• Exciting - Goals that motivate and inspire you
• Reviewed - Regular progress check-ins

90-day sprint planning and habit tracking systems:`,
        senderId: 'productivity-admin',
        createdAt: new Date(Date.now() - 30600000),
        isRead: true,
        views: 67200,
        attachments: [
          {
            id: 'productivity-img-5',
            name: 'goal-setting-framework.jpg',
            type: 'image/jpeg',
            size: 2456789,
            url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'productivity-img-6',
            name: 'habit-tracker-template.jpg',
            type: 'image/jpeg',
            size: 2123456,
            url: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'productivity-img-7',
            name: '90-day-sprint-planner.jpg',
            type: 'image/jpeg',
            size: 1876543,
            url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'productivity7',
        content: '',
        senderId: 'productivity-admin',
        createdAt: new Date(Date.now() - 34200000),
        isRead: true,
        views: 41800,
        voiceMessage: {
          url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3',
          duration: 260,
          waveform: [35, 50, 65, 80, 70, 55, 45, 60, 75, 85, 80, 65, 50, 40, 55, 70, 80, 90, 75, 60, 45, 50, 65, 80, 85, 75, 60, 50, 40, 55, 70, 80, 75, 65, 55, 45, 60, 75, 70, 55]
        }
      },
      {
        _id: 'productivity8',
        content: `⚡ Energy Management: Peak Performance All Day

Productivity isn't just about time management—it's about energy management. Learn how to optimize your physical and mental energy for sustained high performance.

Energy optimization strategies:
• Identify your chronotype (morning lark vs night owl)
• Schedule demanding tasks during peak energy hours
• Use ultradian rhythms (90-120 minute cycles)
• Take strategic breaks and micro-recoveries
• Optimize nutrition for sustained energy
• Exercise for cognitive enhancement
• Prioritize sleep quality over quantity

Circadian rhythm optimization and energy tracking:`,
        senderId: 'productivity-admin',
        createdAt: new Date(Date.now() - 37800000),
        isRead: true,
        views: 78500,
        attachments: [
          {
            id: 'productivity-img-8',
            name: 'energy-management-chart.jpg',
            type: 'image/jpeg',
            size: 2345678,
            url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'productivity-img-9',
            name: 'circadian-rhythm-guide.jpg',
            type: 'image/jpeg',
            size: 2234567,
            url: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&auto=format&fit=crop&q=60'
          }
        ]
      }
    ],

    // Pet Care Channel (ID: 64)
    '64': [
      {
        _id: 'pet1',
        content: `🐕 Essential Tips for New Dog Owners

Bringing home a new puppy? Here's everything you need to know for the first month to ensure your furry friend is happy and healthy.

Essential checklist:
• Puppy-proofing your home
• Feeding schedules and nutrition
• Training basics and house rules
• Vaccination timeline
• Socialization tips

Complete new owner guide and training videos:`,
        senderId: 'pet-admin',
        createdAt: new Date(Date.now() - 14400000),
        isRead: false,
        views: 34200,
        attachments: [
          {
            id: 'pet-img-1',
            name: 'puppy-care-guide.jpg',
            type: 'image/jpeg',
            size: 2234567,
            url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'pet-img-2',
            name: 'puppy-training.jpg',
            type: 'image/jpeg',
            size: 1987654,
            url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'pet1b',
        content: '',
        senderId: 'pet-admin',
        createdAt: new Date(Date.now() - 14390000),
        isRead: false,
        views: 34200,
        attachments: [
          {
            id: 'pet-vid-1',
            name: 'puppy-training-basics.mp4',
            type: 'video/mp4',
            size: 14567890,
            url: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      },
      {
        _id: 'pet2',
        content: `🐱 Cat Care Essentials: Creating a Happy Feline Home

Cats have unique needs and behaviors. Learn how to provide the best care for your feline friend and understand their mysterious ways!

Cat care fundamentals:
• Litter box setup and maintenance (1 box per cat + 1 extra)
• Proper nutrition - Age-appropriate food choices
• Environmental enrichment - Scratching posts, toys, perches
• Regular grooming and nail trimming
• Understanding cat body language and communication
• Indoor vs outdoor considerations

Cat behavior guide and health tips: https://felinecare.com/essentials`,
        senderId: 'pet-admin',
        createdAt: new Date(Date.now() - 18000000),
        isRead: false,
        views: 67800,
        attachments: [
          {
            id: 'pet-img-3',
            name: 'cat-care-essentials.jpg',
            type: 'image/jpeg',
            size: 2345678,
            url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'pet-img-4',
            name: 'cat-enrichment-setup.jpg',
            type: 'image/jpeg',
            size: 1876543,
            url: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'pet3',
        content: `🏥 Pet Health: Preventive Care and Warning Signs

Prevention is the best medicine! Learn how to keep your pets healthy and recognize early warning signs of common health issues.

Preventive care schedule:
• Annual wellness exams and vaccinations
• Monthly flea, tick, and heartworm prevention
• Dental care - Daily brushing and annual cleanings
• Weight management and exercise routines
• Spaying/neutering benefits and timing
• Senior pet care considerations (7+ years)

Emergency warning signs to watch for:
• Difficulty breathing or excessive panting
• Vomiting or diarrhea lasting more than 24 hours
• Loss of appetite for more than 2 days
• Lethargy or unusual behavior changes
• Difficulty urinating or defecating

Veterinary care guide and emergency resources:`,
        senderId: 'pet-admin',
        createdAt: new Date(Date.now() - 21600000),
        isRead: true,
        views: 89400,
        attachments: [
          {
            id: 'pet-pdf-1',
            name: 'pet-health-checklist.pdf',
            type: 'application/pdf',
            size: 3456789,
            url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
          }
        ]
      },
      {
        _id: 'pet4',
        content: '',
        senderId: 'pet-admin',
        createdAt: new Date(Date.now() - 25200000),
        isRead: true,
        views: 45600,
        attachments: [
          {
            id: 'pet-vid-2',
            name: 'pet-grooming-tutorial.mp4',
            type: 'video/mp4',
            size: 16789012,
            url: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      },
      {
        _id: 'pet5',
        content: `🎾 Exercise and Mental Stimulation for Happy Pets

Physical exercise and mental stimulation are crucial for your pet's well-being. Discover fun activities to keep your furry friends engaged and healthy!

Exercise needs by pet type:
• Dogs: 30 minutes to 2+ hours daily (breed dependent)
• Cats: 10-15 minutes of active play, 2-3 sessions daily
• Small pets: Species-specific exercise requirements

Mental stimulation ideas:
• Puzzle feeders and treat-dispensing toys
• Hide and seek games with treats
• Training sessions - teach new tricks
• Rotating toy selection to maintain interest
• Interactive play with laser pointers (cats)
• Snuffle mats for natural foraging behavior

DIY enrichment activities and exercise routines:`,
        senderId: 'pet-admin',
        createdAt: new Date(Date.now() - 28800000),
        isRead: true,
        views: 73200,
        attachments: [
          {
            id: 'pet-img-5',
            name: 'dog-exercise-activities.jpg',
            type: 'image/jpeg',
            size: 2456789,
            url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'pet-img-6',
            name: 'cat-puzzle-toys.jpg',
            type: 'image/jpeg',
            size: 2123456,
            url: 'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'pet-img-7',
            name: 'diy-pet-enrichment.jpg',
            type: 'image/jpeg',
            size: 1987654,
            url: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'pet6',
        content: '',
        senderId: 'pet-admin',
        createdAt: new Date(Date.now() - 32400000),
        isRead: true,
        views: 38900,
        voiceMessage: {
          url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3',
          duration: 220,
          waveform: [25, 40, 55, 70, 60, 45, 35, 50, 65, 75, 70, 55, 40, 30, 45, 60, 70, 80, 65, 50, 35, 40, 55, 70, 75, 65, 50, 40, 30, 45, 60, 70, 65, 55, 45, 35, 50, 65, 60, 45]
        }
      },
      {
        _id: 'pet7',
        content: `🍖 Pet Nutrition: Feeding Your Pet for Optimal Health

Proper nutrition is the foundation of good health. Learn how to choose the right food and establish healthy feeding habits for your pets.

Nutrition guidelines:
• Life stage feeding - Puppy/kitten, adult, senior formulas
• Quality ingredients - Look for named meat sources
• Portion control - Measure food to prevent obesity
• Feeding schedules - Consistent meal times
• Treats should be less than 10% of daily calories
• Fresh water available 24/7

Foods to avoid (toxic to pets):
• Chocolate, grapes, raisins, onions, garlic
• Xylitol (artificial sweetener)
• Avocado, macadamia nuts
• Alcohol and caffeine

Feeding guides and nutrition calculators:`,
        senderId: 'pet-admin',
        createdAt: new Date(Date.now() - 36000000),
        isRead: true,
        views: 67800,
        attachments: [
          {
            id: 'pet-img-8',
            name: 'pet-nutrition-guide.jpg',
            type: 'image/jpeg',
            size: 2345678,
            url: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'pet-img-9',
            name: 'healthy-pet-food.jpg',
            type: 'image/jpeg',
            size: 2234567,
            url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&auto=format&fit=crop&q=60'
          }
        ]
      }
    ],

    // Real Estate Channel (ID: 65)
    '65': [
      {
        _id: 'realestate1',
        content: `🏠 Housing Market Trends Q1 2024

The real estate market continues to evolve with new trends emerging. Our analysts break down what buyers and sellers need to know.

Market highlights:
• Average home prices up 3.2%
• Inventory levels improving
• Interest rates stabilizing
• First-time buyer programs expanding
• Sustainable housing demand rising

Comprehensive market report and regional analysis:`,
        senderId: 'realestate-admin',
        createdAt: new Date(Date.now() - 16200000),
        isRead: false,
        views: 67800,
        attachments: [
          {
            id: 'realestate-pdf-1',
            name: 'q1-2024-market-report.pdf',
            type: 'application/pdf',
            size: 4567890,
            url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
          },
          {
            id: 'realestate-img-1',
            name: 'housing-trends-chart.jpg',
            type: 'image/jpeg',
            size: 2345678,
            url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'realestate2',
        content: `💰 First-Time Home Buyer's Complete Guide

Ready to buy your first home? Navigate the complex process with confidence using our step-by-step guide designed specifically for first-time buyers.

Essential steps for first-time buyers:
• Check your credit score and improve if needed
• Calculate how much house you can afford
• Get pre-approved for a mortgage
• Find a qualified real estate agent
• Start house hunting with realistic expectations
• Make competitive offers in today's market
• Navigate the inspection and closing process

Mortgage calculator and buyer resources: https://firsttimehomebuyer.com/guide`,
        senderId: 'realestate-admin',
        createdAt: new Date(Date.now() - 19800000),
        isRead: false,
        views: 89400,
        attachments: [
          {
            id: 'realestate-img-2',
            name: 'first-time-buyer-checklist.jpg',
            type: 'image/jpeg',
            size: 2234567,
            url: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'realestate-img-3',
            name: 'mortgage-process.jpg',
            type: 'image/jpeg',
            size: 1987654,
            url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'realestate3',
        content: '',
        senderId: 'realestate-admin',
        createdAt: new Date(Date.now() - 23400000),
        isRead: true,
        views: 56700,
        attachments: [
          {
            id: 'realestate-vid-1',
            name: 'home-inspection-walkthrough.mp4',
            type: 'video/mp4',
            size: 18765432,
            url: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      },
      {
        _id: 'realestate4',
        content: `🏡 Investment Property Analysis: What to Look For

Real estate investing can build long-term wealth when done right. Learn how to analyze potential investment properties like a pro.

Key investment metrics:
• Cash flow analysis - Income vs expenses
• Cap rate calculation - Annual return percentage
• Cash-on-cash return - ROI on invested capital
• 1% rule - Monthly rent should equal 1% of price
• Location analysis - Growth potential and demographics
• Property condition and renovation costs

Investment property calculator and market analysis tools:`,
        senderId: 'realestate-admin',
        createdAt: new Date(Date.now() - 27000000),
        isRead: true,
        views: 73200,
        attachments: [
          {
            id: 'realestate-img-4',
            name: 'investment-property-analysis.jpg',
            type: 'image/jpeg',
            size: 2456789,
            url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'realestate-img-5',
            name: 'rental-property-roi.jpg',
            type: 'image/jpeg',
            size: 2123456,
            url: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'realestate5',
        content: '',
        senderId: 'realestate-admin',
        createdAt: new Date(Date.now() - 30600000),
        isRead: true,
        views: 45300,
        voiceMessage: {
          url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
          duration: 280,
          waveform: [30, 45, 60, 75, 65, 50, 40, 55, 70, 80, 75, 60, 45, 35, 50, 65, 75, 85, 70, 55, 40, 45, 60, 75, 80, 70, 55, 45, 35, 50, 65, 75, 70, 60, 50, 40, 55, 70, 65, 50]
        }
      },
      {
        _id: 'realestate6',
        content: `🏘️ Neighborhood Analysis: Finding the Perfect Location

Location is everything in real estate! Learn how to research and evaluate neighborhoods to make informed buying or investing decisions.

What to research about neighborhoods:
• School district ratings and performance
• Crime statistics and safety trends
• Property value appreciation history
• Local amenities and walkability scores
• Future development plans and zoning
• Transportation and commute options
• Demographics and community vibe

Neighborhood research tools and resources:`,
        senderId: 'realestate-admin',
        createdAt: new Date(Date.now() - 34200000),
        isRead: true,
        views: 67800,
        attachments: [
          {
            id: 'realestate-pdf-2',
            name: 'neighborhood-analysis-checklist.pdf',
            type: 'application/pdf',
            size: 3456789,
            url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
          }
        ]
      },
      {
        _id: 'realestate7',
        content: `📈 Real Estate Market Predictions 2024-2025

What's ahead for the real estate market? Our experts analyze current trends and provide forecasts for the next 18 months.

Market predictions:
• Interest rates expected to stabilize around 6.5-7%
• Inventory levels will continue improving gradually
• Price growth to slow but remain positive (2-4%)
• First-time buyer activity to increase with new programs
• Luxury market showing resilience in major metros
• Commercial real estate facing continued challenges

Regional market breakdowns and investment opportunities:`,
        senderId: 'realestate-admin',
        createdAt: new Date(Date.now() - 37800000),
        isRead: true,
        views: 94500,
        attachments: [
          {
            id: 'realestate-img-6',
            name: 'market-predictions-chart.jpg',
            type: 'image/jpeg',
            size: 2567890,
            url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'realestate-img-7',
            name: 'regional-market-map.jpg',
            type: 'image/jpeg',
            size: 2345678,
            url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'realestate-img-8',
            name: 'interest-rate-trends.jpg',
            type: 'image/jpeg',
            size: 1876543,
            url: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&auto=format&fit=crop&q=60'
          }
        ]
      }
    ],

    // Mental Health Channel (ID: 69)
    '69': [
      {
        _id: 'mental1',
        content: `🧠 Stress Management Techniques That Actually Work

In today's fast-paced world, stress has become a constant companion. Here are evidence-based techniques that can help you regain control and find inner peace.

Proven stress-busters:
• Deep breathing exercises (4-7-8 technique)
• Progressive muscle relaxation
• Mindfulness meditation (just 10 minutes daily)
• Journaling for emotional release
• Nature walks and outdoor therapy
• Digital detox periods

Remember: It's okay to not be okay. Seeking help is a sign of strength, not weakness. 💙

Guided meditation and relaxation resources:`,
        senderId: 'mental-admin',
        createdAt: new Date(Date.now() - 3600000),
        isRead: false,
        views: 89200,
        attachments: [
          {
            id: 'mental-img-1',
            name: 'stress-relief-techniques.jpg',
            type: 'image/jpeg',
            size: 2234567,
            url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'mental-img-2',
            name: 'meditation-guide.jpg',
            type: 'image/jpeg',
            size: 1987654,
            url: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'mental-img-3',
            name: 'nature-therapy.jpg',
            type: 'image/jpeg',
            size: 2123456,
            url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'mental2',
        content: '',
        senderId: 'mental-admin',
        createdAt: new Date(Date.now() - 5400000),
        isRead: false,
        views: 45600,
        voiceMessage: {
          url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
          duration: 300,
          waveform: [20, 35, 50, 65, 55, 40, 30, 45, 60, 70, 65, 50, 35, 25, 40, 55, 65, 75, 60, 45, 30, 35, 50, 65, 70, 60, 45, 35, 25, 40, 55, 65, 60, 50, 40, 30, 45, 60, 55, 40]
        }
      },
      {
        _id: 'mental3',
        content: `💚 Building Healthy Boundaries: A Self-Care Essential

Learning to say "no" and setting boundaries isn't selfish—it's necessary for your mental well-being. Here's how to protect your energy and prioritize your needs.

Boundary-setting strategies:
• Identify your limits and values
• Practice saying "no" without guilt
• Communicate clearly and kindly
• Start small with low-stakes situations
• Remember: You can't pour from an empty cup

Helpful resources and boundary scripts: https://mentalhealth.org/boundaries-guide`,
        senderId: 'mental-admin',
        createdAt: new Date(Date.now() - 9000000),
        isRead: true,
        views: 67300,
        attachments: [
          {
            id: 'mental-img-4',
            name: 'healthy-boundaries.jpg',
            type: 'image/jpeg',
            size: 2345678,
            url: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'mental-img-5',
            name: 'self-care-routine.jpg',
            type: 'image/jpeg',
            size: 1876543,
            url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'mental4',
        content: `🌱 Understanding Anxiety: You're Not Alone

Anxiety affects millions of people worldwide. Understanding what you're experiencing is the first step toward healing and recovery.

Common anxiety symptoms:
• Racing thoughts and worry spirals
• Physical symptoms (rapid heartbeat, sweating)
• Avoidance behaviors
• Sleep disturbances
• Difficulty concentrating

Coping strategies that help:
• Grounding techniques (5-4-3-2-1 method)
• Breathing exercises
• Regular exercise and movement
• Limiting caffeine and alcohol
• Professional therapy (CBT, DBT)

Crisis resources and professional help guide:`,
        senderId: 'mental-admin',
        createdAt: new Date(Date.now() - 12600000),
        isRead: true,
        views: 78900,
        attachments: [
          {
            id: 'mental-pdf-1',
            name: 'anxiety-management-guide.pdf',
            type: 'application/pdf',
            size: 3456789,
            url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
          },
          {
            id: 'mental-img-6',
            name: 'anxiety-coping-strategies.jpg',
            type: 'image/jpeg',
            size: 2567890,
            url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'mental5',
        content: `🎯 Daily Mental Health Check-In

Take a moment to pause and check in with yourself. Your mental health matters every single day, not just during Mental Health Awareness Month.

Quick self-assessment questions:
• How am I feeling right now?
• What do I need most today?
• Have I been kind to myself lately?
• What's one thing I'm grateful for?
• Do I need to reach out for support?

Remember: Progress isn't always linear. Some days will be harder than others, and that's completely normal. 🤗

Interactive mood tracking and wellness tips:`,
        senderId: 'mental-admin',
        createdAt: new Date(Date.now() - 16200000),
        isRead: true,
        views: 52400,
        attachments: [
          {
            id: 'mental-vid-1',
            name: 'daily-mindfulness-routine.mp4',
            type: 'video/mp4',
            size: 12345678,
            url: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      },
      {
        _id: 'mental6',
        content: `💙 Sleep and Mental Health: The Vital Connection

Quality sleep is fundamental to mental well-being. Poor sleep can worsen anxiety, depression, and stress levels, while good sleep hygiene can significantly improve your mood and cognitive function.

Sleep hygiene tips:
• Maintain consistent sleep schedule
• Create a relaxing bedtime routine
• Limit screen time before bed
• Keep bedroom cool and dark
• Avoid caffeine late in the day
• Practice relaxation techniques

Sleep improvement strategies and bedtime routines:`,
        senderId: 'mental-admin',
        createdAt: new Date(Date.now() - 19800000),
        isRead: true,
        views: 41200,
        attachments: [
          {
            id: 'mental-img-7',
            name: 'sleep-hygiene-tips.jpg',
            type: 'image/jpeg',
            size: 2234567,
            url: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'mental-img-8',
            name: 'bedtime-routine.jpg',
            type: 'image/jpeg',
            size: 1987654,
            url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'mental-img-9',
            name: 'peaceful-bedroom.jpg',
            type: 'image/jpeg',
            size: 2123456,
            url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'mental7',
        content: '',
        senderId: 'mental-admin',
        createdAt: new Date(Date.now() - 23400000),
        isRead: true,
        views: 34800,
        voiceMessage: {
          url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
          duration: 420,
          waveform: [25, 40, 55, 70, 60, 45, 35, 50, 65, 75, 70, 55, 40, 30, 45, 60, 70, 80, 65, 50, 35, 40, 55, 70, 75, 65, 50, 40, 30, 45, 60, 70, 65, 55, 45, 35, 50, 65, 60, 45]
        }
      }
    ],

    // Gardening Tips Channel (ID: 66)
    '66': [
      {
        _id: 'garden1',
        content: `🌱 Best Plants for Indoor Spaces

Transform your home into a green oasis! These low-maintenance plants are perfect for beginners and thrive in indoor environments.

Top indoor plants for beginners:
• Snake Plant - Tolerates low light and neglect
• Pothos - Fast-growing and air-purifying
• ZZ Plant - Drought-tolerant and glossy leaves
• Peace Lily - Beautiful white flowers
• Rubber Tree - Statement plant with large leaves
• Spider Plant - Easy propagation and pet-friendly

Complete care guides and placement tips:`,
        senderId: 'garden-admin',
        createdAt: new Date(Date.now() - 3600000),
        isRead: false,
        views: 67800,
        attachments: [
          {
            id: 'garden-img-1',
            name: 'indoor-plants-collection.jpg',
            type: 'image/jpeg',
            size: 2345678,
            url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'garden-img-2',
            name: 'snake-plant-care.jpg',
            type: 'image/jpeg',
            size: 1987654,
            url: 'https://images.unsplash.com/photo-1463320726281-696a485928c7?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'garden-img-3',
            name: 'pothos-propagation.jpg',
            type: 'image/jpeg',
            size: 2123456,
            url: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'garden2',
        content: `🥕 Vegetable Garden Planning for Spring

Ready to grow your own food? Here's how to plan and plant a productive vegetable garden that will feed your family all season long.

Spring planting schedule:
• Cool season crops - Lettuce, spinach, peas (March)
• Warm season prep - Tomatoes, peppers (start indoors)
• Root vegetables - Carrots, radishes, beets
• Herbs - Basil, cilantro, parsley
• Succession planting - Plant lettuce every 2 weeks

Garden layout planning and companion planting guide: https://vegetablegarden.com/spring-planning`,
        senderId: 'garden-admin',
        createdAt: new Date(Date.now() - 7200000),
        isRead: false,
        views: 89200,
        attachments: [
          {
            id: 'garden-img-4',
            name: 'vegetable-garden-layout.jpg',
            type: 'image/jpeg',
            size: 2456789,
            url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'garden-img-5',
            name: 'spring-seedlings.jpg',
            type: 'image/jpeg',
            size: 2234567,
            url: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'garden3',
        content: '',
        senderId: 'garden-admin',
        createdAt: new Date(Date.now() - 10800000),
        isRead: true,
        views: 45600,
        attachments: [
          {
            id: 'garden-pdf-1',
            name: 'organic-gardening-guide.pdf',
            type: 'application/pdf',
            size: 4567890,
            url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
          }
        ]
      },
      {
        _id: 'garden4',
        content: `🌸 Container Gardening: Small Space, Big Harvest

Don't have a yard? No problem! Container gardening lets you grow beautiful plants and fresh food in any small space.

Container gardening essentials:
• Choose the right containers - Drainage is key
• Select appropriate plants for container size
• Use quality potting mix (never garden soil)
• Watering schedule - Containers dry out faster
• Fertilizing routine - Monthly liquid fertilizer
• Seasonal plant rotation

Container garden setup and plant recommendations:`,
        senderId: 'garden-admin',
        createdAt: new Date(Date.now() - 14400000),
        isRead: true,
        views: 78300,
        attachments: [
          {
            id: 'garden-vid-1',
            name: 'container-garden-setup.mp4',
            type: 'video/mp4',
            size: 16789012,
            url: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      },
      {
        _id: 'garden5',
        content: `🦋 Creating a Pollinator-Friendly Garden

Support local wildlife while enjoying beautiful blooms! These plants will attract bees, butterflies, and other beneficial pollinators to your garden.

Pollinator favorites:
• Lavender - Aromatic and drought-tolerant
• Bee Balm - Native wildflower favorite
• Sunflowers - Seeds feed birds too
• Marigolds - Natural pest deterrent
• Zinnias - Colorful and easy to grow
• Native wildflowers - Best for local pollinators

Pollinator garden design and seasonal blooming schedule:`,
        senderId: 'garden-admin',
        createdAt: new Date(Date.now() - 18000000),
        isRead: true,
        views: 56700,
        attachments: [
          {
            id: 'garden-img-6',
            name: 'pollinator-garden.jpg',
            type: 'image/jpeg',
            size: 2567890,
            url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'garden-img-7',
            name: 'butterfly-on-flower.jpg',
            type: 'image/jpeg',
            size: 1876543,
            url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'garden-img-8',
            name: 'bee-on-lavender.jpg',
            type: 'image/jpeg',
            size: 2123456,
            url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'garden6',
        content: '',
        senderId: 'garden-admin',
        createdAt: new Date(Date.now() - 21600000),
        isRead: true,
        views: 34200,
        voiceMessage: {
          url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
          duration: 195,
          waveform: [25, 40, 55, 70, 60, 45, 35, 50, 65, 75, 70, 55, 40, 30, 45, 60, 70, 80, 65, 50, 35, 40, 55, 70, 75, 65, 50, 40, 30, 45, 60, 70, 65, 55, 45, 35, 50, 65, 60, 45]
        }
      },
      {
        _id: 'garden7',
        content: `💧 Smart Watering Techniques for Healthy Plants

Proper watering is the key to gardening success! Learn when, how, and how much to water different types of plants for optimal growth.

Watering wisdom:
• Deep, infrequent watering is better than shallow, frequent
• Water early morning to reduce evaporation
• Check soil moisture with finger test
• Mulch to retain moisture and suppress weeds
• Different plants have different water needs
• Adjust watering based on weather and season

Irrigation systems and water-saving tips:`,
        senderId: 'garden-admin',
        createdAt: new Date(Date.now() - 25200000),
        isRead: true,
        views: 67400,
        attachments: [
          {
            id: 'garden-img-9',
            name: 'drip-irrigation-system.jpg',
            type: 'image/jpeg',
            size: 2345678,
            url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'garden-img-10',
            name: 'watering-techniques.jpg',
            type: 'image/jpeg',
            size: 1987654,
            url: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop&q=60'
          }
        ]
      }
    ],

    // Car Enthusiasts Channel (ID: 67)
    '67': [
      {
        _id: 'car1',
        content: `🚗 Electric Vehicles Comparison 2024

The EV revolution is here! We've tested the latest electric vehicles to bring you the most comprehensive comparison of range, performance, and value.

Top EV picks for 2024:
• Tesla Model S Plaid - 405 mile range
• BMW iX - Luxury SUV with 324 mile range
• Ford Mustang Mach-E - 314 mile range
• Hyundai Ioniq 6 - 305 mile range
• Mercedes EQS - Premium sedan 453 mile range

Full test drive reviews and charging infrastructure guide:`,
        senderId: 'car-admin',
        createdAt: new Date(Date.now() - 3600000),
        isRead: false,
        views: 78900,
        attachments: [
          {
            id: 'car-img-1',
            name: 'ev-comparison-2024.jpg',
            type: 'image/jpeg',
            size: 2456789,
            url: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'car-img-2',
            name: 'tesla-model-s.jpg',
            type: 'image/jpeg',
            size: 2234567,
            url: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'car-img-3',
            name: 'charging-station.jpg',
            type: 'image/jpeg',
            size: 1987654,
            url: 'https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'car2',
        content: '',
        senderId: 'car-admin',
        createdAt: new Date(Date.now() - 5400000),
        isRead: false,
        views: 56700,
        attachments: [
          {
            id: 'car-vid-1',
            name: 'ev-test-drive-review.mp4',
            type: 'video/mp4',
            size: 18765432,
            url: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      },
      {
        _id: 'car3',
        content: `🏁 Classic Car Restoration: 1967 Mustang Project

Follow our 6-month restoration journey of a barn-find 1967 Ford Mustang Fastback. From rust bucket to road warrior!

Restoration highlights:
• Engine rebuild - 289 V8 restoration
• Body work - Rust repair and paint
• Interior restoration - Original pony interior
• Suspension upgrade - Modern handling
• Electrical system overhaul

Before and after photos + restoration tips: https://classiccarrestoration.com/mustang67`,
        senderId: 'car-admin',
        createdAt: new Date(Date.now() - 9000000),
        isRead: true,
        views: 89200,
        attachments: [
          {
            id: 'car-img-4',
            name: 'mustang-before-restoration.jpg',
            type: 'image/jpeg',
            size: 2345678,
            url: 'https://images.unsplash.com/photo-1494905998402-395d579af36f?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'car-img-5',
            name: 'mustang-after-restoration.jpg',
            type: 'image/jpeg',
            size: 2567890,
            url: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'car4',
        content: '',
        senderId: 'car-admin',
        createdAt: new Date(Date.now() - 12600000),
        isRead: true,
        views: 45600,
        attachments: [
          {
            id: 'car-pdf-1',
            name: 'car-maintenance-guide.pdf',
            type: 'application/pdf',
            size: 5678901,
            url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
          }
        ]
      },
      {
        _id: 'car5',
        content: `🏎️ Track Day Essentials: Preparing Your Car for the Circuit

Ready to take your car to the track? Here's everything you need to know about track day preparation, safety requirements, and performance modifications.

Track day checklist:
• Safety inspection - Brakes, tires, fluids
• Helmet and safety gear requirements
• Performance modifications - Brake pads, tires
• Insurance considerations
• Track etiquette and flag signals
• Post-track inspection routine

Track day survival guide and performance tips:`,
        senderId: 'car-admin',
        createdAt: new Date(Date.now() - 16200000),
        isRead: true,
        views: 67300,
        attachments: [
          {
            id: 'car-img-6',
            name: 'track-day-preparation.jpg',
            type: 'image/jpeg',
            size: 2123456,
            url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'car-img-7',
            name: 'racing-helmet-gear.jpg',
            type: 'image/jpeg',
            size: 1876543,
            url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'car6',
        content: '',
        senderId: 'car-admin',
        createdAt: new Date(Date.now() - 19800000),
        isRead: true,
        views: 34200,
        voiceMessage: {
          url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
          duration: 240,
          waveform: [35, 50, 65, 80, 70, 55, 45, 60, 75, 85, 80, 65, 50, 40, 55, 70, 80, 90, 75, 60, 45, 50, 65, 80, 85, 75, 60, 50, 40, 55, 70, 80, 75, 65, 55, 45, 60, 75, 70, 55]
        }
      },
      {
        _id: 'car7',
        content: `🔧 DIY Car Maintenance: Save Money and Learn Your Car

Don't let simple maintenance break the bank! Learn these essential DIY skills that every car owner should know.

DIY maintenance basics:
• Oil change procedure and intervals
• Brake pad replacement guide
• Air filter and cabin filter changes
• Tire rotation and pressure checks
• Battery maintenance and replacement
• Fluid level monitoring

Tool recommendations and step-by-step guides:`,
        senderId: 'car-admin',
        createdAt: new Date(Date.now() - 23400000),
        isRead: true,
        views: 52800,
        attachments: [
          {
            id: 'car-vid-2',
            name: 'diy-oil-change-tutorial.mp4',
            type: 'video/mp4',
            size: 15678901,
            url: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      },
      {
        _id: 'car8',
        content: `🏆 Car Show Highlights: Best of 2024

From classic muscle cars to cutting-edge supercars, here are the standout vehicles from this year's major automotive shows.

Show stoppers:
• McLaren 750S - Track-focused supercar
• Porsche 911 GT3 RS - Ultimate track weapon
• Chevrolet Corvette Z06 - American supercar
• Ferrari 296 GTB - Hybrid V6 masterpiece
• Lamborghini Revuelto - V12 hybrid beast

Exclusive show photos and specs:`,
        senderId: 'car-admin',
        createdAt: new Date(Date.now() - 27000000),
        isRead: true,
        views: 94500,
        attachments: [
          {
            id: 'car-img-8',
            name: 'mclaren-750s.jpg',
            type: 'image/jpeg',
            size: 2678901,
            url: 'https://images.unsplash.com/photo-1544829099-b9a0c5303bea?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'car-img-9',
            name: 'porsche-gt3-rs.jpg',
            type: 'image/jpeg',
            size: 2456789,
            url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'car-img-10',
            name: 'ferrari-296-gtb.jpg',
            type: 'image/jpeg',
            size: 2345678,
            url: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format&fit=crop&q=60'
          }
        ]
      }
    ],

    // Language Learning Channel (ID: 68)
    '68': [
      {
        _id: 'lang1',
        content: `🇪🇸 Spanish for Beginners - Lesson 5: Family & Relationships

¡Hola estudiantes! Today we're learning essential vocabulary for talking about family and relationships. This is one of the most useful topics for everyday conversations.

Vocabulary highlights:
• La familia - family
• Los padres - parents
• Los hermanos - siblings
• El esposo/la esposa - husband/wife
• Los abuelos - grandparents
• Los primos - cousins

Practice exercises and pronunciation guide: https://spanishlearning.com/lesson5`,
        senderId: 'lang-admin',
        createdAt: new Date(Date.now() - 3600000),
        isRead: false,
        views: 67800,
        attachments: [
          {
            id: 'lang-img-1',
            name: 'spanish-family-vocabulary.jpg',
            type: 'image/jpeg',
            size: 2234567,
            url: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'lang-img-2',
            name: 'family-tree-spanish.jpg',
            type: 'image/jpeg',
            size: 1987654,
            url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'lang2',
        content: '',
        senderId: 'lang-admin',
        createdAt: new Date(Date.now() - 5400000),
        isRead: false,
        views: 45200,
        voiceMessage: {
          url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
          duration: 180,
          waveform: [30, 45, 60, 75, 65, 50, 40, 55, 70, 80, 75, 60, 45, 35, 50, 65, 75, 85, 70, 55, 40, 45, 60, 75, 80, 70, 55, 45, 35, 50, 65, 75, 70, 60, 50, 40, 55, 70, 65, 50]
        }
      },
      {
        _id: 'lang3',
        content: `📚 Language Learning Tips: How to Stay Motivated

Learning a new language is a marathon, not a sprint! Here are proven strategies to maintain momentum and achieve fluency.

Motivation boosters:
• Set small, achievable daily goals
• Use spaced repetition for vocabulary
• Find a language exchange partner
• Watch movies with subtitles
• Join online communities
• Celebrate small victories

Study resources and apps comparison:`,
        senderId: 'lang-admin',
        createdAt: new Date(Date.now() - 9000000),
        isRead: true,
        views: 89100,
        attachments: [
          {
            id: 'lang-img-3',
            name: 'study-schedule-template.jpg',
            type: 'image/jpeg',
            size: 2345678,
            url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'lang3b',
        content: '',
        senderId: 'lang-admin',
        createdAt: new Date(Date.now() - 8990000),
        isRead: true,
        views: 89100,
        attachments: [
          {
            id: 'lang-pdf-1',
            name: 'language-learning-guide.pdf',
            type: 'application/pdf',
            size: 4567890,
            url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
          }
        ]
      },
      {
        _id: 'lang4',
        content: `🎬 Learn Spanish Through Movies & TV Shows

Immerse yourself in authentic Spanish content! Here are beginner-friendly shows and movies that will boost your listening skills and cultural understanding.

Recommended for beginners:
• Extra en Español - Comedy series
• Destinos - Educational drama
• El Libro de la Vida - Animated movie
• Coco - Disney movie (Spanish dub)
• Casa de Papel - Advanced thriller

Movie night learning techniques:`,
        senderId: 'lang-admin',
        createdAt: new Date(Date.now() - 12600000),
        isRead: true,
        views: 56300,
        attachments: [
          {
            id: 'lang-vid-1',
            name: 'spanish-pronunciation-guide.mp4',
            type: 'video/mp4',
            size: 15678901,
            url: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      },
      {
        _id: 'lang5',
        content: `🗣️ Common Spanish Phrases for Travel

Planning a trip to a Spanish-speaking country? These essential phrases will help you navigate airports, hotels, restaurants, and local interactions with confidence.

Must-know travel phrases:
• ¿Habla inglés? - Do you speak English?
• No hablo español muy bien - I don't speak Spanish very well
• ¿Cuánto cuesta? - How much does it cost?
• ¿Dónde está el baño? - Where is the bathroom?
• La cuenta, por favor - The check, please
• ¿Me puede ayudar? - Can you help me?

Printable phrasebook and cultural tips:`,
        senderId: 'lang-admin',
        createdAt: new Date(Date.now() - 16200000),
        isRead: true,
        views: 73400,
        attachments: [
          {
            id: 'lang-img-4',
            name: 'travel-phrases-spanish.jpg',
            type: 'image/jpeg',
            size: 2456789,
            url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'lang-img-5',
            name: 'spanish-speaking-countries.jpg',
            type: 'image/jpeg',
            size: 2123456,
            url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=60'
          }
        ]
      }
    ],

    // DIY Projects Channel (ID: 70)
    '70': [
      {
        _id: 'diy1',
        content: `🔨 Weekend Home Improvement Ideas

Transform your space with these amazing DIY projects! Perfect for beginners and experienced makers alike. Each project includes step-by-step instructions and material lists.

Featured projects this weekend:
• Floating shelves installation (2 hours)
• Custom coffee table build (4 hours)
• Bathroom vanity makeover (6 hours)
• Kitchen backsplash upgrade (3 hours)
• Outdoor deck staining (1 day)

Complete tutorial videos and blueprints below:`,
        senderId: 'diy-admin',
        createdAt: new Date(Date.now() - 3600000),
        isRead: false,
        views: 45600,
        attachments: [
          {
            id: 'diy-vid-1',
            name: 'floating-shelves-tutorial.mp4',
            type: 'video/mp4',
            size: 15678901,
            url: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      },
      {
        _id: 'diy1b',
        content: '',
        senderId: 'diy-admin',
        createdAt: new Date(Date.now() - 3590000),
        isRead: false,
        views: 45600,
        attachments: [
          {
            id: 'diy-img-1',
            name: 'floating-shelves-before-after.jpg',
            type: 'image/jpeg',
            size: 2345678,
            url: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'diy-img-2',
            name: 'coffee-table-build.jpg',
            type: 'image/jpeg',
            size: 2123456,
            url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'diy-img-3',
            name: 'bathroom-vanity-makeover.jpg',
            type: 'image/jpeg',
            size: 1987654,
            url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'diy2',
        content: `🪚 Essential Tools Every DIY Beginner Needs

Starting your DIY journey? Here's the complete toolkit that will handle 90% of home improvement projects. We've tested hundreds of tools to bring you the best value recommendations.

Must-have tools:
• Cordless drill with bits set
• Circular saw or miter saw
• Level (24-inch recommended)
• Measuring tape (25-foot)
• Safety equipment (glasses, gloves)
• Stud finder and screwdriver set

Tool buying guide and safety tips: https://diytools.com/beginner-guide`,
        senderId: 'diy-admin',
        createdAt: new Date(Date.now() - 7200000),
        isRead: false,
        views: 32100,
        attachments: [
          {
            id: 'diy-img-4',
            name: 'essential-tools-collection.jpg',
            type: 'image/jpeg',
            size: 2456789,
            url: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'diy-img-5',
            name: 'tool-organization-tips.jpg',
            type: 'image/jpeg',
            size: 1876543,
            url: 'https://images.unsplash.com/photo-1609205807107-171c2e71e7e7?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'diy3',
        content: '',
        senderId: 'diy-admin',
        createdAt: new Date(Date.now() - 10800000),
        isRead: true,
        views: 28700,
        attachments: [
          {
            id: 'diy-pdf-1',
            name: 'diy-project-blueprints.pdf',
            type: 'application/pdf',
            size: 5678901,
            url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
          }
        ]
      },
      {
        _id: 'diy4',
        content: `🎨 Budget-Friendly Room Makeover Challenge

Transform any room for under $200! Our community members share their incredible before-and-after transformations using creative DIY solutions.

Popular makeover ideas:
• Paint accent walls with geometric patterns
• Upcycle furniture with chalk paint
• Create custom artwork and wall decor
• Install peel-and-stick wallpaper
• Add plants and lighting upgrades

Join our monthly makeover challenge and win prizes! 🏆`,
        senderId: 'diy-admin',
        createdAt: new Date(Date.now() - 14400000),
        isRead: true,
        views: 56800,
        attachments: [
          {
            id: 'diy-img-6',
            name: 'room-makeover-before.jpg',
            type: 'image/jpeg',
            size: 2234567,
            url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'diy-img-7',
            name: 'room-makeover-after.jpg',
            type: 'image/jpeg',
            size: 2345678,
            url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'diy-img-8',
            name: 'geometric-wall-pattern.jpg',
            type: 'image/jpeg',
            size: 1987654,
            url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'diy-img-9',
            name: 'upcycled-furniture.jpg',
            type: 'image/jpeg',
            size: 2123456,
            url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        _id: 'diy5',
        content: '',
        senderId: 'diy-admin',
        createdAt: new Date(Date.now() - 18000000),
        isRead: true,
        views: 19500,
        voiceMessage: {
          url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
          duration: 210,
          waveform: [30, 45, 60, 75, 65, 50, 40, 55, 70, 80, 75, 60, 45, 35, 50, 65, 75, 85, 70, 55, 40, 45, 60, 75, 80, 70, 55, 45, 35, 50, 65, 75, 70, 60, 50, 40, 55, 70, 65, 50]
        }
      },
      {
        _id: 'diy6',
        content: `🌱 Outdoor DIY Projects for Spring

Get your outdoor space ready for the season! These projects will enhance your backyard, patio, or garden area with style and functionality.

Spring outdoor projects:
• Build a raised garden bed
• Create a fire pit area
• Install outdoor string lighting
• Construct a pergola or gazebo
• Design a water feature
• Build outdoor furniture

Weather-resistant materials guide and seasonal tips:`,
        senderId: 'diy-admin',
        createdAt: new Date(Date.now() - 21600000),
        isRead: true,
        views: 41200,
        attachments: [
          {
            id: 'diy-vid-2',
            name: 'raised-garden-bed-build.mp4',
            type: 'video/mp4',
            size: 18765432,
            url: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      },
      {
        _id: 'diy6b',
        content: '',
        senderId: 'diy-admin',
        createdAt: new Date(Date.now() - 21590000),
        isRead: true,
        views: 41200,
        attachments: [
          {
            id: 'diy-img-10',
            name: 'fire-pit-construction.jpg',
            type: 'image/jpeg',
            size: 2567890,
            url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&auto=format&fit=crop&q=60'
          },
          {
            id: 'diy-img-11',
            name: 'outdoor-string-lights.jpg',
            type: 'image/jpeg',
            size: 2345678,
            url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&auto=format&fit=crop&q=60'
          }
        ]
      }
    ]
  });
  const [activeSection, setActiveSection] = useState('chats');
  const [filteredConversations, setFilteredConversations] = useState<any[]>([]);
  const [exploreFilter, setExploreFilter] = useState('explore');


  // Shuffle utility function
  const shuffleArray = (array: any[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Mock conversations data (replace with API call later)
  const conversationsData = [
    // Private messages
    {
      _id: '1',
      name: 'John Doe',
      lastMessage: 'Hey, how are you?',
      time: '10:30 AM',
      unread: 2,
      isOnline: true,
      type: 'private',
      isPinned: true,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '4',
      name: 'Sarah Johnson',
      lastMessage: 'Did you see the latest design?',
      time: '9:15 AM',
      unread: 1,
      isOnline: true,
      type: 'private',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '5',
      name: 'Michael Chen',
      lastMessage: 'Let me know when you\'re free to talk',
      time: 'Yesterday',
      isOnline: false,
      type: 'private',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '6',
      name: 'Emma Wilson',
      lastMessage: 'Thanks for your help!',
      time: '2 days ago',
      isOnline: false,
      type: 'private',
      isMuted: true,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=60'
    },

    // Groups
    {
      _id: '2',
      name: 'Web Dev Group',
      lastMessage: 'Alice: Check out this new framework!',
      time: 'Yesterday',
      isOnline: false,
      type: 'group',
      unread: 5,
      avatar: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '7',
      name: 'Project Alpha Team',
      lastMessage: 'David: Meeting at 3pm tomorrow',
      time: '11:45 AM',
      type: 'group',
      unread: 3,
      avatar: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '8',
      name: 'Gaming Squad',
      lastMessage: 'Ryan: Anyone up for a game tonight?',
      time: '3 hours ago',
      type: 'group',
      isPinned: true,
      avatar: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '9',
      name: 'Travel Enthusiasts',
      lastMessage: 'Sophie: Just booked my flight to Bali!',
      time: 'Monday',
      type: 'group',
      isMuted: true,
      avatar: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '17',
      name: 'React Developers',
      lastMessage: 'Mike: New React 18 features are amazing!',
      time: '2 hours ago',
      type: 'group',
      unread: 7,
      avatar: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '18',
      name: 'Design Team',
      lastMessage: 'Sarah: Updated the color palette',
      time: '4 hours ago',
      type: 'group',
      unread: 2,
      avatar: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '19',
      name: 'Startup Founders',
      lastMessage: 'Alex: Funding round completed!',
      time: '6 hours ago',
      type: 'group',
      unread: 12,
      isPinned: true,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '20',
      name: 'Photography Club',
      lastMessage: 'Emma: Check out my latest shots!',
      time: '8 hours ago',
      type: 'group',
      unread: 4,
      avatar: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '21',
      name: 'Fitness Buddies',
      lastMessage: 'Tom: Morning workout at 6 AM?',
      time: '10 hours ago',
      type: 'group',
      unread: 1,
      avatar: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '22',
      name: 'Book Club',
      lastMessage: 'Lisa: Finished reading the new novel',
      time: 'Yesterday',
      type: 'group',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '23',
      name: 'Music Lovers',
      lastMessage: 'Jake: New album dropped today!',
      time: 'Yesterday',
      type: 'group',
      unread: 8,
      avatar: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '24',
      name: 'Cooking Enthusiasts',
      lastMessage: 'Maria: Recipe for tonight\'s dinner',
      time: '2 days ago',
      type: 'group',
      unread: 3,
      avatar: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '25',
      name: 'Movie Night',
      lastMessage: 'Chris: Marvel marathon this weekend?',
      time: '2 days ago',
      type: 'group',
      unread: 6,
      isPinned: true,
      avatar: 'https://images.unsplash.com/photo-1489599904472-c2d6e1d8957d?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '26',
      name: 'Tech Meetup',
      lastMessage: 'Kevin: Next meetup location confirmed',
      time: '3 days ago',
      type: 'teams',
      unread: 2,
      avatar: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '101',
      name: 'samurai',
      lastMessage: 'Welcome to the samurai group!',
      time: 'Just now',
      type: 'discord',
      avatar: 'https://images.unsplash.com/photo-1555952517-2e8e729e0b44?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '102',
      name: 'takashi',
      lastMessage: 'Welcome to the takashi group!',
      time: 'Just now',
      type: 'slack',
      avatar: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '27',
      name: 'Coffee Addicts',
      lastMessage: 'Anna: Found a new coffee shop!',
      time: '3 days ago',
      type: 'group',
      unread: 5,
      avatar: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '28',
      name: 'Language Exchange',
      lastMessage: 'Pierre: French lesson at 7 PM',
      time: '4 days ago',
      type: 'group',
      unread: 1,
      avatar: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '29',
      name: 'Crypto Traders',
      lastMessage: 'Mark: Bitcoin hitting new highs!',
      time: '4 days ago',
      type: 'group',
      unread: 15,
      isMuted: true,
      avatar: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '30',
      name: 'Pet Owners',
      lastMessage: 'Lucy: My cat did the funniest thing!',
      time: '5 days ago',
      type: 'group',
      unread: 9,
      avatar: 'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '31',
      name: 'Home Gardening',
      lastMessage: 'Bob: Tomatoes are finally ripe!',
      time: '5 days ago',
      type: 'group',
      unread: 2,
      avatar: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '32',
      name: 'DIY Projects',
      lastMessage: 'Jenny: Finished my bookshelf project',
      time: '1 week ago',
      type: 'group',
      avatar: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=150&auto=format&fit=crop&q=60'
    },

    // Channels
    {
      _id: '3',
      name: 'Tech News',
      lastMessage: 'Latest updates in AI development',
      time: '2:15 PM',
      type: 'channel',
      isMuted: true,
      avatar: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '10',
      name: 'Design Inspiration',
      lastMessage: 'Weekly UI/UX trends and resources',
      time: 'Today',
      type: 'channel',
      unread: 1,
      avatar: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '11',
      name: 'Job Opportunities',
      lastMessage: 'New remote positions available',
      time: 'Yesterday',
      type: 'channel',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '12',
      name: 'Crypto Updates',
      lastMessage: 'Market analysis and predictions',
      time: 'Sunday',
      type: 'channel',
      isPinned: true,
      avatar: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '51',
      name: 'Startup News',
      lastMessage: 'Top 10 startups to watch in 2024',
      time: '3:45 PM',
      type: 'channel',
      unread: 5,
      avatar: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '52',
      name: 'Photography Tips',
      lastMessage: 'Golden hour photography techniques',
      time: '2:30 PM',
      type: 'channel',
      unread: 3,
      avatar: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '53',
      name: 'Fitness & Health',
      lastMessage: '30-day workout challenge starts tomorrow!',
      time: '1:15 PM',
      type: 'channel',
      unread: 8,
      avatar: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '54',
      name: 'Cooking Recipes',
      lastMessage: 'Easy pasta recipes for beginners',
      time: 'Today',
      type: 'channel',
      unread: 2,
      avatar: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '55',
      name: 'Travel Destinations',
      lastMessage: 'Hidden gems in Southeast Asia',
      time: 'Today',
      type: 'channel',
      unread: 12,
      avatar: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '56',
      name: 'Book Club',
      lastMessage: 'This month\'s pick: "Atomic Habits"',
      time: 'Yesterday',
      type: 'channel',
      avatar: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '57',
      name: 'Music Discovery',
      lastMessage: 'New indie artists you should know',
      time: 'Yesterday',
      type: 'channel',
      unread: 4,
      avatar: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '58',
      name: 'Gaming News',
      lastMessage: 'Top 5 games releasing this month',
      time: 'Yesterday',
      type: 'channel',
      unread: 15,
      avatar: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '59',
      name: 'Fashion Trends',
      lastMessage: 'Spring 2024 fashion forecast',
      time: 'Sunday',
      type: 'channel',
      unread: 6,
      avatar: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '60',
      name: 'Movie Reviews',
      lastMessage: 'Oscar nominations 2024 predictions',
      time: 'Sunday',
      type: 'channel',
      avatar: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '61',
      name: 'Science Daily',
      lastMessage: 'Breakthrough in quantum computing',
      time: 'Saturday',
      type: 'channel',
      unread: 7,
      avatar: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '62',
      name: 'Art & Culture',
      lastMessage: 'Virtual museum tours this weekend',
      time: 'Saturday',
      type: 'channel',
      unread: 3,
      avatar: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '63',
      name: 'Productivity Hacks',
      lastMessage: 'Time management tips from CEOs',
      time: 'Friday',
      type: 'channel',
      unread: 9,
      avatar: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '64',
      name: 'Pet Care',
      lastMessage: 'Essential tips for new dog owners',
      time: 'Friday',
      type: 'channel',
      unread: 2,
      avatar: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '65',
      name: 'Real Estate',
      lastMessage: 'Housing market trends Q1 2024',
      time: 'Thursday',
      type: 'channel',
      avatar: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '66',
      name: 'Gardening Tips',
      lastMessage: 'Best plants for indoor spaces',
      time: 'Thursday',
      type: 'channel',
      unread: 4,
      avatar: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '67',
      name: 'Car Enthusiasts',
      lastMessage: 'Electric vehicles comparison 2024',
      time: 'Wednesday',
      type: 'channel',
      unread: 11,
      avatar: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '68',
      name: 'Language Learning',
      lastMessage: 'Spanish for beginners - Lesson 5',
      time: 'Wednesday',
      type: 'channel',
      unread: 5,
      avatar: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '69',
      name: 'Mental Health',
      lastMessage: 'Stress management techniques',
      time: 'Tuesday',
      type: 'channel',
      avatar: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '70',
      name: 'DIY Projects',
      lastMessage: 'Weekend home improvement ideas',
      time: 'Tuesday',
      type: 'channel',
      unread: 6,
      avatar: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=150&auto=format&fit=crop&q=60'
    },

    // Bots
    {
      _id: '13',
      name: 'GitHub Bot',
      lastMessage: 'New pull request: Feature/user-auth',
      time: '1 hour ago',
      type: 'bot',
      unread: 1,
      avatar: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '14',
      name: 'Weather Bot',
      lastMessage: 'Today\'s forecast: 72°F, Sunny',
      time: 'This morning',
      type: 'bot',
      avatar: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '15',
      name: 'Reminder Bot',
      lastMessage: 'Meeting with client at 2:00 PM',
      time: 'Yesterday',
      type: 'bot',
      isPinned: true,
      avatar: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '16',
      name: 'Translator Bot',
      lastMessage: 'Translation complete: 5 messages',
      time: 'Last week',
      type: 'bot',
      isMuted: true,
      avatar: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '33',
      name: 'News Bot',
      lastMessage: 'Breaking: Tech stocks surge 5% today',
      time: '30 minutes ago',
      type: 'bot',
      unread: 3,
      avatar: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '34',
      name: 'Crypto Bot',
      lastMessage: 'Bitcoin: $45,230 (+2.5%)',
      time: '45 minutes ago',
      type: 'bot',
      unread: 1,
      avatar: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '35',
      name: 'Stock Bot',
      lastMessage: 'AAPL closed at $175.43 (+1.2%)',
      time: '1 hour ago',
      type: 'bot',
      avatar: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '36',
      name: 'Calendar Bot',
      lastMessage: 'You have 3 meetings tomorrow',
      time: '2 hours ago',
      type: 'bot',
      unread: 1,
      avatar: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '37',
      name: 'Task Bot',
      lastMessage: 'Task "Review code" is due today',
      time: '3 hours ago',
      type: 'bot',
      unread: 2,
      avatar: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '38',
      name: 'Music Bot',
      lastMessage: 'Now playing: "Bohemian Rhapsody"',
      time: '4 hours ago',
      type: 'bot',
      avatar: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '39',
      name: 'Quiz Bot',
      lastMessage: 'Daily quiz: What is the capital of France?',
      time: '5 hours ago',
      type: 'bot',
      unread: 1,
      avatar: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '40',
      name: 'Fitness Bot',
      lastMessage: 'Daily goal: 10,000 steps (8,234 completed)',
      time: '6 hours ago',
      type: 'bot',
      avatar: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '41',
      name: 'Recipe Bot',
      lastMessage: 'Recipe suggestion: Chicken Tikka Masala',
      time: '7 hours ago',
      type: 'bot',
      unread: 1,
      avatar: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '42',
      name: 'Travel Bot',
      lastMessage: 'Flight to NYC: $299 (Best deal!)',
      time: '8 hours ago',
      type: 'bot',
      avatar: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '43',
      name: 'Shopping Bot',
      lastMessage: 'iPhone 15 Pro: $999 (20% off)',
      time: '9 hours ago',
      type: 'bot',
      unread: 2,
      avatar: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '44',
      name: 'Learning Bot',
      lastMessage: 'JavaScript lesson: Async/Await completed',
      time: '10 hours ago',
      type: 'bot',
      avatar: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '45',
      name: 'Meditation Bot',
      lastMessage: 'Time for your 10-minute mindfulness session',
      time: '11 hours ago',
      type: 'bot',
      unread: 1,
      avatar: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '46',
      name: 'Joke Bot',
      lastMessage: 'Why don\'t scientists trust atoms? Because they make up everything!',
      time: '12 hours ago',
      type: 'bot',
      avatar: 'https://images.unsplash.com/photo-1527219525722-f9767a7f2884?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '47',
      name: 'Password Bot',
      lastMessage: 'Generated secure password: K9#mX2$pL8@v',
      time: '13 hours ago',
      type: 'bot',
      avatar: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '48',
      name: 'QR Code Bot',
      lastMessage: 'QR code generated for your WiFi password',
      time: '14 hours ago',
      type: 'bot',
      avatar: 'https://images.unsplash.com/photo-1606868306217-dbf5046868d2?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '49',
      name: 'Poll Bot',
      lastMessage: 'Poll results: 65% prefer remote work',
      time: '15 hours ago',
      type: 'bot',
      unread: 1,
      avatar: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '50',
      name: 'Backup Bot',
      lastMessage: 'Daily backup completed successfully',
      time: 'Yesterday',
      type: 'bot',
      avatar: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '71',
      name: 'Analytics Bot',
      lastMessage: 'Website traffic: +15% this week',
      time: 'Yesterday',
      type: 'bot',
      unread: 3,
      avatar: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '72',
      name: 'Security Bot',
      lastMessage: 'New login detected from Chrome on Windows',
      time: 'Yesterday',
      type: 'bot',
      unread: 1,
      avatar: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '73',
      name: 'Email Bot',
      lastMessage: 'You have 12 unread emails',
      time: '2 days ago',
      type: 'bot',
      avatar: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '74',
      name: 'File Bot',
      lastMessage: 'Document "Report.pdf" uploaded to cloud',
      time: '2 days ago',
      type: 'bot',
      unread: 2,
      avatar: 'https://images.unsplash.com/photo-1544396821-4dd40b938ad3?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '75',
      name: 'Voice Bot',
      lastMessage: 'Voice message transcribed: "Call me later"',
      time: '3 days ago',
      type: 'bot',
      avatar: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '76',
      name: 'Image Bot',
      lastMessage: 'Image compressed: 2.5MB → 850KB',
      time: '3 days ago',
      type: 'bot',
      avatar: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '77',
      name: 'Link Bot',
      lastMessage: 'Link preview generated for github.com/user/repo',
      time: '4 days ago',
      type: 'bot',
      avatar: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=150&auto=format&fit=crop&q=60'
    },
    {
      _id: '78',
      name: 'Hashtag Bot',
      lastMessage: 'Trending: #TechNews #AI #WebDev',
      time: '4 days ago',
      type: 'bot',
      unread: 2,
      avatar: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=150&auto=format&fit=crop&q=60'
    }
  ];

  // Shuffle the conversations array to randomize order
  const conversations = shuffleArray(conversationsData);

  // Filter conversations based on active section
  useEffect(() => {
    switch (activeSection) {
      case 'groups':
        setFilteredConversations(conversations.filter(conv => ['group', 'discord', 'slack', 'teams'].includes(conv.type)));
        break;
      case 'pages':
        setFilteredConversations(conversations.filter(conv => conv.type === 'channel'));
        break;
      case 'explore':
        setFilteredConversations(conversations.filter(conv => conv.type === 'channel'));
        break;
      case 'bots':
        setFilteredConversations(conversations.filter(conv => conv.type === 'bot'));
        break;
      case 'saved':
        // For saved messages, we could filter by isPinned or create a separate type
        setFilteredConversations(conversations.filter(conv => conv.isPinned));
        break;
      case 'chats':
        // For chats, we'll handle the categorization in the EnhancedSidebar component
        setFilteredConversations(conversations);
        break;
      default:
        setFilteredConversations(conversations);
        break;
    }
  }, [activeSection]);

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (!res.ok) {
          router.push('/');
          return;
        }
        const data = await res.json();
        setUser(data.user);
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/');
      }
    };

    checkAuth();
  }, [router]);

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;

    const newMessage: Message = {
      _id: Date.now().toString(),
      content,
      senderId: user?._id || 'current-user',
      createdAt: new Date(),
      isRead: false
    };

    // Send to subgroup if one is selected, otherwise to the main chat
    const targetChat = selectedSubgroup || currentChat;
    if (!targetChat) return;

    setMessages(prev => ({
      ...prev,
      [targetChat]: [...(prev[targetChat] || []), newMessage]
    }));
  };

  const handleSelectConversation = (id: string) => {
    setCurrentChat(id);
    // Show subgroups sidebar if it's a group conversation
    const conversation = conversations.find(c => c._id === id);
    if (conversation?.type === 'group') {
      setShowSubgroups(true);
      // Reset selected subgroup when switching groups
      setSelectedSubgroup(undefined);
    } else {
      setShowSubgroups(false);
      setSelectedSubgroup(undefined);
    }
    // On mobile, hide sidebar when conversation is selected
    if (window.innerWidth < 768) {
      setShowSidebar(false);
    }
  };

  const handleSubgroupSelect = (subgroupId: string) => {
    setSelectedSubgroup(subgroupId);
  };

  const handleLeaveChannel = () => {
    if (currentChat) {
      const channelName = conversations.find(c => c._id === currentChat)?.name || 'channel';
      if (confirm(`Are you sure you want to leave ${channelName}?`)) {
        // Clear current chat
        setCurrentChat(null);
        // You can add API call here to leave channel on backend
        alert(`You have left ${channelName}`);
      }
    }
  };

  const handleStartBot = () => {
    if (currentChat) {
      const botName = conversations.find(c => c._id === currentChat)?.name || 'bot';
      // Send /start command to bot
      handleSendMessage('/start');
      alert(`Started conversation with ${botName}`);
    }
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const toggleProfileSidebar = () => {
    setShowProfileSidebar(!showProfileSidebar);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      // Clear cookie on client side
      document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleTabChange = (tabId: string) => {
    setActiveSection(tabId);
    // Reset current chat when switching tabs
    if (currentChat) {
      setCurrentChat(null);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen flex">
      {showComit ? (
        /* Full Screen Comit Store */
        <div className="w-full h-full">
          <Comit onBack={() => setShowComit(false)} />
        </div>
      ) : (
        <>
          {/* Mobile Menu Button */}
          <button
            className="btn-light md:hidden fixed top-0 left-0 m-2 z-30"
            onClick={toggleSidebar}
          >
            <FiMenu size={24} />
          </button>

          {/* Sidebar */}
          <div
            className={`${showSidebar ? 'flex' : 'hidden'} md:flex flex-col border-r border-gray-200 bg-white`}
            style={{ width: '350px', minWidth: '350px' }}
          >
            {activeSection === 'calls' ? (
              <CallsContent />
            ) : (
              <EnhancedSidebar
                conversations={filteredConversations}
                currentConversation={currentChat}
                onSelectConversation={handleSelectConversation}
                onLogout={handleLogout}
                activeSection={activeSection}
              />
            )}
          </div>

          {/* Subgroups Sidebar - Shows when a group is selected (but not for Discord/Slack chat) */}
          {showSubgroups && currentChat && currentChat !== '101' && currentChat !== '102' && currentChat !== '26' && (
            <SubgroupsSidebar
              groupName={conversations.find(c => c._id === currentChat)?.name || ''}
              groupAvatar={conversations.find(c => c._id === currentChat)?.avatar || ''}
              memberCount={156}
              onSubgroupSelect={handleSubgroupSelect}
              selectedSubgroup={selectedSubgroup}
            />
          )}

          {/* Chat Area */}
          <div className="flex-grow flex flex-col">
            {/* Navigation Tabs */}
            <NavigationTabs
              onTabChange={handleTabChange}
              onComitClick={() => setShowComit(true)}
            />

            {currentChat ? (
              <>
                {/* Discord-style interface for samurai group */}
                {currentChat === '101' ? (
                  <DiscordChat
                    groupName="samurai"
                    onBack={() => setCurrentChat(null)}
                  />
                ) : currentChat === '102' ? (
                  /* Slack-style interface for takashi group */
                  <SlackChat
                    groupName="takashi"
                    onBack={() => setCurrentChat(null)}
                  />
                ) : currentChat === '26' ? (
                  /* Microsoft Teams-style interface for Tech Meetup group */
                  <TeamsChat
                    groupName="Tech Meetup"
                    onBack={() => setCurrentChat(null)}
                  />
                ) : activeSection === 'saved' ? (
                  <SavedMessages />
                ) : activeSection === 'explore' ? (
                  <div className="h-full flex flex-col">
                    <ExploreFilterTabs
                      onFilterChange={(filterId: string) => {
                        setExploreFilter(filterId);
                        setCurrentChat(null);
                      }}
                      activeFilter=""
                    />
                    <ChatHeader
                      name={conversations.find(c => c._id === currentChat)?.name || ''}
                      status="Online"
                      isOnline={true}
                      isTyping={false}
                      avatar={conversations.find(c => c._id === currentChat)?.avatar}
                      memberCount={conversations.find(c => c._id === currentChat)?.type === 'group' ? 156 : undefined}
                      lastSeen="recently"
                      onMenuClick={toggleSidebar}
                      onProfileClick={toggleProfileSidebar}
                      onStarClick={() => setShowMediaGallery(!showMediaGallery)}
                      showMediaGallery={showMediaGallery}
                      conversationType={conversations.find(c => c._id === currentChat)?.type as 'private' | 'group' | 'channel' | 'bot' || 'private'}
                    />
                    <div className="message-list-container flex-grow overflow-auto">
                      {showMediaGallery ? (
                        <MediaGallery
                          channelName={conversations.find(c => c._id === currentChat)?.name || 'Channel'}
                          onClose={() => setShowMediaGallery(false)}
                        />
                      ) : (
                        <MessageList
                          messages={messages[currentChat] || []}
                          currentUserId={user._id}
                          conversationType={conversations.find(c => c._id === currentChat)?.type as 'private' | 'group' | 'channel' | 'bot' || 'private'}
                        />
                      )}
                    </div>
                    {!showMediaGallery && (
                      conversations.find(c => c._id === currentChat)?.type === 'channel' ? (
                        <div className="bg-gray-100 border-t border-gray-300 shadow-lg px-4 py-3 flex justify-center">
                          <button
                            onClick={handleLeaveChannel}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                          >
                            Leave Channel
                          </button>
                        </div>
                      ) : conversations.find(c => c._id === currentChat)?.type === 'bot' ? (
                        <div className="bg-gray-100 border-t border-gray-300 shadow-lg px-4 py-3 flex justify-center">
                          <button
                            onClick={handleStartBot}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                          >
                            Start
                          </button>
                        </div>
                      ) : (
                        <MessageInput onSendMessage={handleSendMessage} />
                      )
                    )}
                  </div>
                ) : (
                  <>
                    <ChatHeader
                      name={selectedSubgroup
                        ? (selectedSubgroup.charAt(0).toUpperCase() + selectedSubgroup.slice(1)).replace(/-/g, ' ')
                        : conversations.find(c => c._id === currentChat)?.name || ''}
                      status="Online"
                      isOnline={true}
                      isTyping={false}
                      avatar={conversations.find(c => c._id === currentChat)?.avatar}
                      memberCount={conversations.find(c => c._id === currentChat)?.type === 'group' ? 156 : undefined}
                      lastSeen="recently"
                      onMenuClick={toggleSidebar}
                      onProfileClick={toggleProfileSidebar}
                      onStarClick={() => setShowMediaGallery(!showMediaGallery)}
                      showMediaGallery={showMediaGallery}
                      conversationType={conversations.find(c => c._id === currentChat)?.type as 'private' | 'group' | 'channel' | 'bot' || 'private'}
                    />
                    <div className="message-list-container flex-grow overflow-auto">
                      {showMediaGallery ? (
                        <MediaGallery
                          channelName={selectedSubgroup
                            ? (selectedSubgroup.charAt(0).toUpperCase() + selectedSubgroup.slice(1)).replace(/-/g, ' ')
                            : conversations.find(c => c._id === currentChat)?.name || 'Channel'}
                          onClose={() => setShowMediaGallery(false)}
                        />
                      ) : (
                        <MessageList
                          messages={selectedSubgroup ? (messages[selectedSubgroup] || []) : (messages[currentChat] || [])}
                          currentUserId={user._id}
                          conversationType={conversations.find(c => c._id === currentChat)?.type as 'private' | 'group' | 'channel' | 'bot' || 'private'}
                        />
                      )}
                    </div>
                    {!showMediaGallery && (
                      conversations.find(c => c._id === currentChat)?.type === 'channel' ? (
                        <div className="bg-gray-100 border-t border-gray-300 shadow-lg px-4 py-3 flex justify-center">
                          <button
                            onClick={handleLeaveChannel}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                          >
                            Leave Channel
                          </button>
                        </div>
                      ) : conversations.find(c => c._id === currentChat)?.type === 'bot' ? (
                        <div className="bg-gray-100 border-t border-gray-300 shadow-lg px-4 py-3 flex justify-center">
                          <button
                            onClick={handleStartBot}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                          >
                            Start
                          </button>
                        </div>
                      ) : (
                        <MessageInput onSendMessage={handleSendMessage} />
                      )
                    )}
                  </>
                )}
              </>
            ) : (
              <div className="h-full flex flex-col">
                {activeSection === 'chats' && (
                  <div className="text-gray-500 p-20 text-center">
                    <h5>Select a conversation</h5>
                    <p>Choose a chat from the sidebar to start messaging</p>
                  </div>
                )}
                {activeSection === 'stories' && <Stories />}
                {activeSection === 'explore' && (
                  <ExploreFeed
                    activeFilter={exploreFilter}
                    onFilterChange={(filterId: string) => setExploreFilter(filterId)}
                  />
                )}
                {activeSection === 'groups' && (
                  <div className="text-gray-500 p-20 text-center">
                    <h5>Join or create groups</h5>
                    <p>Connect with people who share your interests</p>
                  </div>
                )}
                {activeSection === 'calls' && (
                  <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                    <div className="text-center max-w-md mx-auto p-8">
                      <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-semibold text-gray-800 mb-4">xmo</h3>
                      <p className="text-gray-600 mb-4">
                        Send and receive messages without keeping your phone online.
                      </p>
                      <p className="text-sm text-gray-500">
                        Use xmo on up to 4 linked devices and 1 phone at the same time.
                      </p>
                    </div>
                  </div>
                )}
                {activeSection === 'pages' && (
                  <div className="text-gray-500 p-20 text-center">
                    <h5>Discover interesting pages</h5>
                    <p>Follow pages to stay updated</p>
                  </div>
                )}
                {activeSection === 'bots' && (
                  <div className="text-gray-500 p-20 text-center">
                    <h5>Find useful bots and commands</h5>
                    <p>Enhance your chat experience</p>
                  </div>
                )}
                {activeSection === 'saved' && (
                  <div className="text-gray-500 p-20 text-center">
                    <h5>View your saved messages</h5>
                    <p>Access important information anytime</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}

      {/* Profile Sidebar */}
      {!showComit && currentChat && (
        <ProfileSidebar
          isVisible={showProfileSidebar}
          onClose={() => setShowProfileSidebar(false)}
          contact={{
            name: conversations.find(c => c._id === currentChat)?.name || '',
            username: conversations.find(c => c._id === currentChat)?.name?.toLowerCase().replace(' ', '') || '',
            phone: '+1 (555) 123-4567',
            bio: 'Software developer passionate about creating amazing user experiences. Love hiking, photography, and good coffee ☕',
            avatar: conversations.find(c => c._id === currentChat)?.avatar,
            isOnline: conversations.find(c => c._id === currentChat)?.isOnline || false,
            lastSeen: conversations.find(c => c._id === currentChat)?.time || 'recently',
            mutualContacts: 12
          }}
        />
      )}

    </div>
  );
}