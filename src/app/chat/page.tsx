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
        content: '🎧 Design podcast: Interview with top UI designers',
        senderId: 'design-admin',
        createdAt: new Date(Date.now() - 25200000),
        isRead: true,
        audioMessage: {
          url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
          duration: 240
        }
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
      }
    ]
  });
  const [activeSection, setActiveSection] = useState('chats');
  const [filteredConversations, setFilteredConversations] = useState<any[]>([]);
  const [exploreFilter, setExploreFilter] = useState('explore');

  // Mock conversations data (replace with API call later)
  const conversations = [
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
      type: 'group',
      unread: 2,
      avatar: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=150&auto=format&fit=crop&q=60'
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

  // Filter conversations based on active section
  useEffect(() => {
    switch(activeSection) {
      case 'groups':
        setFilteredConversations(conversations.filter(conv => conv.type === 'group'));
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

          {/* Subgroups Sidebar - Shows when a group is selected */}
          {showSubgroups && currentChat && (
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
            {activeSection === 'saved' ? (
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