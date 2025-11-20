'use client';

import { useState, useEffect, useRef } from 'react';
import {
  HiOutlineArrowLeft,
  HiOutlineMagnifyingGlass,
  HiOutlineEllipsisVertical,
  HiOutlineStar
} from 'react-icons/hi2';
import { SparklesPreview } from '../ui/sparkles-preview';
import { SparklesCore } from '../ui/sparkles';
import SearchResults from './SearchResults';

interface App {
  id: string;
  name: string;
  category: string;
  icon: string;
  website: string;
  description?: string;
  rank?: number;
}

interface ComitProps {
  onBack: () => void;
}

export default function Comit({ onBack }: ComitProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [showVideo, setShowVideo] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setSubmittedQuery(searchQuery);
      setShowSearchResults(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleCloseSearch = () => {
    setShowSearchResults(false);
    setSearchQuery('');
    setSubmittedQuery('');
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const scrollTop = scrollContainer.scrollTop;
      // Fix header when scrolled past 100px
      setIsHeaderFixed(scrollTop > 100);
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Set global function for SparklesPreview to call
    (window as any).openProfileVideo = () => setShowVideo(true);
    return () => {
      delete (window as any).openProfileVideo;
    };
  }, []);

  // Apps organized by categories
  const appCategories = {
    tools: [
      {
        id: 't1',
        name: 'Eclipse',
        category: 'Tools',
        icon: 'https://play-lh.googleusercontent.com/ZI21NMObsjB7DbPU_EXRymHJL3HQpfsrB2N4CWb-diXm4xjl_13mmetYQZvcpgGf-64=s512',
        website: 'https://www.eclipse.org',
        description: 'Development environment'
      },
      {
        id: 't2',
        name: 'VS Code',
        category: 'Tools',
        icon: 'https://play-lh.googleusercontent.com/2MNE5VSfjoQhL9NBbptUi8DcPFpPBQMz7M2EHK6mFwVn8xQldL7SmH3Kt_ZNSt2D0Q=s512',
        website: 'https://code.visualstudio.com',
        description: 'Code editor'
      },
      {
        id: 't3',
        name: 'Postman',
        category: 'Tools',
        icon: 'https://play-lh.googleusercontent.com/aMq-CBYJwX9-gFOhJVdcn8mLk2GI720vjfstdCKk2zuAS6K7b2Qeelb2eJRv-ybwCMo=s512',
        website: 'https://www.postman.com',
        description: 'API testing tool'
      },
      {
        id: 't4',
        name: 'Docker',
        category: 'Tools',
        icon: 'https://play-lh.googleusercontent.com/KqeKUXHP336vQkJIhdulZRh4V2IO5hoqak-NBd6Etj3-UjlnKz9unx8Z7XpVlXEMEZs=s512',
        website: 'https://www.docker.com',
        description: 'Containerization platform'
      },
      {
        id: 't5',
        name: 'Termux',
        category: 'Tools',
        icon: 'https://play-lh.googleusercontent.com/eoJ5ai-O0xbFPOgQS-97wIJ1Jb-aNvTHcqi7rnBH4AXpAbSl_5ii44BebhoGzAHxBtI=s512',
        website: 'https://termux.com',
        description: 'Terminal emulator for Android'
      },
      {
        id: 't6',
        name: 'Acode',
        category: 'Tools',
        icon: 'https://play-lh.googleusercontent.com/aiPbIq8Pg8V-WV8sRlRJt02scWZrEEGuN_h8VxKfJrB10RYUxQpn1F5Y3WGCjgaZI4c=s512',
        website: 'https://acode.foxdebug.com',
        description: 'Code editor for mobile'
      },
      {
        id: 't7',
        name: 'AIDE',
        category: 'Tools',
        icon: 'https://play-lh.googleusercontent.com/KE_qe2jHeX3mVsPVP3ceuVPgDKL8uN1LuNRblXnAnYrdtlqwryKWeTbAiiqFGVX72cw=s512',
        website: 'https://www.android-ide.com',
        description: 'Android IDE'
      },
      {
        id: 't8',
        name: 'Sublime Text',
        category: 'Tools',
        icon: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d2/Sublime_Text_3_logo.png/256px-Sublime_Text_3_logo.png',
        website: 'https://www.sublimetext.com',
        description: 'Text editor'
      },
      {
        id: 't9',
        name: 'Android Studio',
        category: 'Tools',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Android_Studio_Icon_%282014-2019%29.svg/512px-Android_Studio_Icon_%282014-2019%29.svg.png',
        website: 'https://developer.android.com/studio',
        description: 'Android development IDE'
      },
      {
        id: 't10',
        name: 'Xcode',
        category: 'Tools',
        icon: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Xcode_14_icon.png/256px-Xcode_14_icon.png',
        website: 'https://developer.apple.com/xcode',
        description: 'iOS development IDE'
      },
      {
        id: 't11',
        name: 'IntelliJ IDEA',
        category: 'Tools',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/IntelliJ_IDEA_Icon.svg/512px-IntelliJ_IDEA_Icon.svg.png',
        website: 'https://www.jetbrains.com/idea',
        description: 'Java IDE'
      },
      {
        id: 't12',
        name: 'Eclipse',
        category: 'Tools',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Eclipse-Luna-Logo.svg/512px-Eclipse-Luna-Logo.svg.png',
        website: 'https://www.eclipse.org',
        description: 'Development environment'
      }
    ],
    entertainment: [
      {
        id: 'e1',
        name: 'Netflix',
        category: 'Entertainment',
        icon: 'https://play-lh.googleusercontent.com/yzjoC50KOfHh5pvp71rXYPhjduQS5HTH7C0WcAbz8gIbHtEAF1tkeNt6B3e4QXykAHU=s512',
        website: 'https://www.netflix.com',
        description: 'Streaming platform'
      },
      {
        id: 'e2',
        name: 'Disney+',
        category: 'Entertainment',
        icon: 'https://play-lh.googleusercontent.com/d2zqBFBEymSZKaVg_dRo1gh3hBFn7_Kl9rO74xkDmnJeLgDW0MoJD3cUx0QzZN6jdsg=s512',
        website: 'https://www.disneyplus.com',
        description: 'Disney streaming service'
      },
      {
        id: 'e3',
        name: 'Prime Video',
        category: 'Entertainment',
        icon: 'https://play-lh.googleusercontent.com/TMRXNJnv0fN8wEkH6-GHE-7V8w-7IfPetHVTcPf5cu2vgv6EAEjzbgklrYzDKnHZZNo=s512',
        website: 'https://www.primevideo.com',
        description: 'Amazon streaming'
      },
      {
        id: 'e5',
        name: 'Hotstar',
        category: 'Entertainment',
        icon: 'https://play-lh.googleusercontent.com/QH7CrHPQBIaXF4a5hx9bU81CEMQVF6b3mRr9p2okEYXbi2cKOtKMpPqQuHDEEURcHdY=s512',
        website: 'https://www.hotstar.com',
        description: 'Disney+ Hotstar streaming'
      },
      {
        id: 'e6',
        name: 'JioCinema',
        category: 'Entertainment',
        icon: 'https://play-lh.googleusercontent.com/u83Yol1SUHThoOE_D9D4ozpaf_44-xLO6llyVugLUmvPPFvP827CcICppA2Nm-aWiQ=s512',
        website: 'https://www.jiocinema.com',
        description: 'Jio streaming platform'
      },
      {
        id: 'e7',
        name: 'SonyLIV',
        category: 'Entertainment',
        icon: 'https://play-lh.googleusercontent.com/yv4W2I4cJGQgWHYLmjCq_MhUsrYtk_xNkZnTS0Z9xhpcXhWHIZRgVJeXmdh6bE4InLi6=s512',
        website: 'https://www.sonyliv.com',
        description: 'Sony streaming service'
      }
    ],
    ai: [
      {
        id: 'ai1',
        name: 'ChatGPT',
        category: 'AI',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/512px-ChatGPT_logo.svg.png',
        website: 'https://chat.openai.com',
        description: 'AI conversational assistant'
      },
      {
        id: 'ai2',
        name: 'Google Gemini',
        category: 'AI',
        icon: 'https://www.gstatic.com/lamda/images/gemini_favicon_f069958c85030456e93de685481c559f160ea06b.png',
        website: 'https://gemini.google.com',
        description: 'Google AI model'
      },
      {
        id: 'ai3',
        name: 'Claude',
        category: 'AI',
        icon: 'https://claude.ai/favicon.ico',
        website: 'https://claude.ai',
        description: 'Anthropic AI assistant'
      },
      {
        id: 'ai4',
        name: 'Perplexity',
        category: 'AI',
        icon: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/perplexity-ai-icon.png',
        website: 'https://www.perplexity.ai',
        description: 'AI search engine'
      }
    ],
    videoEditor: [
      {
        id: 'v1',
        name: 'Adobe Premiere Pro',
        category: 'Video Editor',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Adobe_Premiere_Pro_CC_icon.svg/512px-Adobe_Premiere_Pro_CC_icon.svg.png',
        website: 'https://www.adobe.com/products/premiere.html',
        description: 'Professional video editing'
      },
      {
        id: 'v2',
        name: 'DaVinci Resolve',
        category: 'Video Editor',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/DaVinci_Resolve_17_logo.svg/512px-DaVinci_Resolve_17_logo.svg.png',
        website: 'https://www.blackmagicdesign.com/products/davinciresolve',
        description: 'Free video editor'
      },
      {
        id: 'v3',
        name: 'Final Cut Pro',
        category: 'Video Editor',
        icon: 'https://play-lh.googleusercontent.com/7RIeDBEnjVVn3d1yr441p7u0BK9eT8E6P9i__XYTcJAzOe7sqVgJp7pmlypqY9NBqjI=s512',
        website: 'https://www.apple.com/final-cut-pro',
        description: 'Mac video editing'
      },
      {
        id: 'v4',
        name: 'CapCut',
        category: 'Video Editor',
        icon: 'https://play-lh.googleusercontent.com/obRvW02OTYLzJuvic1ZbVDVXLXzI0Vt_JGOjlxZ92XMdBF_i3kqU92u9SgHvJ5pySdM=s512',
        website: 'https://www.capcut.com',
        description: 'Mobile video editor'
      },
      {
        id: 'v5',
        name: 'KineMaster',
        category: 'Video Editor',
        icon: 'https://play-lh.googleusercontent.com/FFxE9ItZHrvaibDLEavm430a_tzrYm2QabBoTRMf3kbRm_Aw51aRCE61cTEminGm4YE5g09ZMC3pqxDIGd3Wr38=s512',
        website: 'https://www.kinemaster.com',
        description: 'Professional mobile video editor'
      },
      {
        id: 'v6',
        name: 'InShot',
        category: 'Video Editor',
        icon: 'https://play-lh.googleusercontent.com/_1CV99jklLbXuun-6E7eCPR-sKKeZc602rhw_QHZz-qm7xrPdgWsJVc7NtFkkliI8No=s512',
        website: 'https://www.inshot.com',
        description: 'Video editor & maker'
      },
      {
        id: 'v7',
        name: 'PowerDirector',
        category: 'Video Editor',
        icon: 'https://play-lh.googleusercontent.com/B5cNBA15IxjCT-8UTXEWgiPcGkJ1C07iHKwm2Hbs8xR3PnJvZ0swTag3abdC_Fj5OfnP=s512',
        website: 'https://www.cyberlink.com/products/powerdirector-mobile',
        description: 'Video editing app'
      }
    ],
    education: [
      {
        id: 'ed1',
        name: 'Coursera',
        category: 'Education',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Coursera-Logo_600x600.svg/512px-Coursera-Logo_600x600.svg.png',
        website: 'https://www.coursera.org',
        description: 'Online learning platform'
      },
      {
        id: 'ed2',
        name: 'Udemy',
        category: 'Education',
        icon: 'https://www.udemy.com/staticx/udemy/images/v7/apple-touch-icon.png',
        website: 'https://www.udemy.com',
        description: 'Online course marketplace'
      },
      {
        id: 'ed3',
        name: 'Codecademy',
        category: 'Education',
        icon: 'https://play-lh.googleusercontent.com/YCYtU9DwQDIX1QbDDqF8sQU1CKlWABF-Sbtr3qH_9z9MJ495HsXNe4KkfxFycK9FyAI=s512',
        website: 'https://www.codecademy.com',
        description: 'Learn to code online'
      },
      {
        id: 'ed4',
        name: 'edX',
        category: 'Education',
        icon: 'https://www.edx.org/cdn-cgi/image/width=192,height=192/images/logos/edx-logo-elm.svg',
        website: 'https://www.edx.org',
        description: 'University courses online'
      },
      {
        id: 'ed5',
        name: 'Duolingo',
        category: 'Education',
        icon: 'https://play-lh.googleusercontent.com/K6L_Ixmw0J9oTktAoHyEHvzQIfxEF1CIQ5aE0WHhdUeOgfAmn7KLhe47Q5XxZaXQ0g=s512',
        website: 'https://www.duolingo.com',
        description: 'Language learning app'
      },
      {
        id: 'ed6',
        name: 'Khan Academy',
        category: 'Education',
        icon: 'https://play-lh.googleusercontent.com/NYVFtcwG7Z4jhL09qXTX8-rVl5UL7FvmwKBruhHT0zDhvicJ5zrsnD_v8T5h_rUQoXI=s512',
        website: 'https://www.khanacademy.org',
        description: 'Free online courses'
      },
      {
        id: 'ed7',
        name: 'Skillshare',
        category: 'Education',
        icon: 'https://play-lh.googleusercontent.com/DDfeXsEfDPgnOdvwHT_zm4LEcXKUPpQyRkeZUl2APC9rJqX3efpgLDZDd6kQeo4c0ao=s512',
        website: 'https://www.skillshare.com',
        description: 'Creative learning platform'
      }
    ],
    socialMedia: [
      {
        id: 's1',
        name: 'Instagram',
        category: 'Social Media',
        icon: 'https://play-lh.googleusercontent.com/bp4jknyVZ8yDKhER9thIS1p9MBeU2LABqBX-sO8uaL1h5_keqlgMUmXv-CjfRWaqKw=s512',
        website: 'https://www.instagram.com',
        description: 'Photo & video sharing'
      },
      {
        id: 's2',
        name: 'Twitter',
        category: 'Social Media',
        icon: 'https://play-lh.googleusercontent.com/UiUbpQjyTs24NtBNPF7nt2QiZeR49C7HQOjqnf8Tovaa535uO9zyNOgx56xg9rJYbw=s512',
        website: 'https://twitter.com',
        description: 'Social media platform'
      },
      {
        id: 's3',
        name: 'LinkedIn',
        category: 'Social Media',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/512px-LinkedIn_logo_initials.png',
        website: 'https://www.linkedin.com',
        description: 'Professional network'
      },
      {
        id: 's4',
        name: 'Threads',
        category: 'Social Media',
        icon: 'https://play-lh.googleusercontent.com/G6jK9S77RN0laf9_6nhDo3AVxbRP9SgMmt8ZmQjKQ2hibn9xhOY-W5YFn_7stJD1CA=s512',
        website: 'https://www.threads.net',
        description: 'Text-based social app'
      },
      {
        id: 's5',
        name: 'Snapchat',
        category: 'Social Media',
        icon: 'https://play-lh.googleusercontent.com/JfQNUnohpuq5IP65WN9C109VjLjDEj2tZYlPtComLznQfGeeoesubOaHGBcpZdXKuHU=s512',
        website: 'https://www.snapchat.com',
        description: 'Multimedia messaging'
      },
      {
        id: 's6',
        name: 'TikTok',
        category: 'Social Media',
        icon: 'https://play-lh.googleusercontent.com/aVjdteVY_xlCwid80msaf592DS_EankaMdhE67d8Tqk3lkXfbECqAmrZC9pnmczY8oA=s512',
        website: 'https://www.tiktok.com',
        description: 'Short video platform'
      }
    ],
    budgetingTools: [
      {
        id: 'b1',
        name: 'Mint',
        category: 'Budgeting Tools',
        icon: 'https://play-lh.googleusercontent.com/zqRsL-qJ4Pb1aXpNrtgRrh0l3HrYbQh4pFan5pT7lVHqffkifM-jkFrQ2_99Pk93upuJ=s512',
        website: 'https://www.mint.com',
        description: 'Personal finance tracker'
      },
      {
        id: 'b2',
        name: 'YNAB',
        category: 'Budgeting Tools',
        icon: 'https://play-lh.googleusercontent.com/yQ9eV7PTqiVewifNdqxKkf0fj881AMTjID1WXy1l6kABqaNPumSquaoQoq1GrFRpCpg=s512',
        website: 'https://www.youneedabudget.com',
        description: 'Budget planning app'
      },
      {
        id: 'b3',
        name: 'PayPal',
        category: 'Budgeting Tools',
        icon: 'https://play-lh.googleusercontent.com/EJDtYUFdaIuZiONXKeInnNAbzQfa0D6BIHrc-HRG5ZuvJcQmZY2aK7bG8zx5GeQHA2Hn=s512',
        website: 'https://www.paypal.com',
        description: 'Digital payments'
      },
      {
        id: 'b4',
        name: 'Stripe',
        category: 'Budgeting Tools',
        icon: 'https://play-lh.googleusercontent.com/D1POO3HtYVgSW65yv3JLMrr8F7L9RcYUfEw_ug3BhMhMgN0b2fZ414cYkmSwVRr737aY=s512',
        website: 'https://stripe.com',
        description: 'Payment processing'
      },
      {
        id: 'b5',
        name: 'Google Pay',
        category: 'Budgeting Tools',
        icon: 'https://play-lh.googleusercontent.com/F-a2SnwTUq-XTY8w7zmHL24Eoom7-kU7OVbeKn7TE6qkz0qjjck1J_O20MyrHKS_TA=s512',
        website: 'https://pay.google.com',
        description: 'Digital wallet & payments'
      },
      {
        id: 'b6',
        name: 'PhonePe',
        category: 'Budgeting Tools',
        icon: 'https://play-lh.googleusercontent.com/_JHHb9kqy1HaWsjktpyLM3C15XBxK4VT4E2W1FxleRkUD-kXM6d6Ut2VO8HgZLn6=s512',
        website: 'https://www.phonepe.com',
        description: 'Digital payments app'
      },
      {
        id: 'b7',
        name: 'Paytm',
        category: 'Budgeting Tools',
        icon: 'https://play-lh.googleusercontent.com/U4upbzbmwZ6bqixKLSj90KxBZK7tSOKs0-S0ec-oO3qV-02LjrcRKzqHOjvnJa58nDo=s512',
        website: 'https://paytm.com',
        description: 'Digital payments & wallet'
      },
      {
        id: 'b8',
        name: 'CRED',
        category: 'Budgeting Tools',
        icon: 'https://play-lh.googleusercontent.com/xAc1esc0WwVXD378_7KucrdzbP2PPoN0X5oJK1P0k5QN4ZoWcAY0GOcN1fvfV5qmn2wUSwbHssms8n8cGqic5Q=s512',
        website: 'https://cred.club',
        description: 'Credit card bill payments'
      },
      {
        id: 'b9',
        name: 'Quicken',
        category: 'Budgeting Tools',
        icon: 'https://play-lh.googleusercontent.com/6ZG4yvJTwWZiqykiOhn84BPvz8ousDnyGUb4lVN2-NWsGGsywrppt8aOrG6ft-96Pes=s512',
        website: 'https://www.quicken.com',
        description: 'Personal finance management'
      },
      {
        id: 'b10',
        name: 'PocketGuard',
        category: 'Budgeting Tools',
        icon: 'https://play-lh.googleusercontent.com/NauVLWM7Xz368P1sTQzunzxZ6klhtjZ-_3f0L510IddTKM5CA5w5gyFgp1hVkuqy1w=s512',
        website: 'https://pocketguard.com',
        description: 'Budget tracking app'
      }
    ],
    communication: [
      {
        id: 'c1',
        name: 'Discord',
        category: 'Communication',
        icon: 'https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png',
        website: 'https://discord.com',
        description: 'Voice, video and text chat'
      },
      {
        id: 'c2',
        name: 'Slack',
        category: 'Communication',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/512px-Slack_icon_2019.svg.png',
        website: 'https://slack.com',
        description: 'Team collaboration hub'
      },
      {
        id: 'c3',
        name: 'Microsoft Teams',
        category: 'Communication',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg/512px-Microsoft_Office_Teams_%282018%E2%80%93present%29.svg.png',
        website: 'https://www.microsoft.com/teams',
        description: 'Team collaboration'
      },
      {
        id: 'c4',
        name: 'WhatsApp',
        category: 'Communication',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/512px-WhatsApp.svg.png',
        website: 'https://www.whatsapp.com',
        description: 'Messaging app'
      },
      {
        id: 'c5',
        name: 'Telegram',
        category: 'Communication',
        icon: 'https://play-lh.googleusercontent.com/dM5-i3KcZF_0CFY4137PUqtciXoQShxPrcJMJ4BIuZ1SXiUqEjoJC3YlrOu2Yn7tld0=s512',
        website: 'https://telegram.org',
        description: 'Cloud-based messaging'
      },
      {
        id: 'c6',
        name: 'Signal',
        category: 'Communication',
        icon: 'https://play-lh.googleusercontent.com/z7tBHt7NfM5HGQmeBuH5xrf0IYAeqOic8hbl2IlNq-yrH9QeRq_mKq5RBJkkR-pXGA=s512',
        website: 'https://signal.org',
        description: 'Private messaging'
      }
    ],
    gaming: [
      {
        id: 'g1',
        name: 'PUBG Mobile',
        category: 'Gaming',
        icon: 'https://play-lh.googleusercontent.com/2brb0qH7pQnRfNzyCmwJETEHbHRgjzOYcsZARW3mLSngx9eJhORbfMlOlSQRk1rfvLLO=s512',
        website: 'https://pubgmobile.com',
        description: 'Battle royale game'
      },
      {
        id: 'g2',
        name: 'Free Fire',
        category: 'Gaming',
        icon: 'https://play-lh.googleusercontent.com/wB94iV1SoRgouM_L2Eq8LaWFBB-E247NkLajtA1r9-Ux7KnojQMauwORuB81OUEJ3u0=s512',
        website: 'https://ff.garena.com',
        description: 'Survival shooter game'
      },
      {
        id: 'g3',
        name: 'Call of Duty Mobile',
        category: 'Gaming',
        icon: 'https://play-lh.googleusercontent.com/Jaw57u6LQJNeqKfjJER9MM5On66ZXopBk3rrShag1BBZrX6cZdxxIMGf8nYA_Av0meA=s512',
        website: 'https://www.callofduty.com/mobile',
        description: 'First-person shooter'
      },
      {
        id: 'g4',
        name: 'Among Us',
        category: 'Gaming',
        icon: 'https://play-lh.googleusercontent.com/GvXOu1RClvMqLyE8jwz1VaWAV0UsMcYPkOwkCruUXvkcUkVFjH8ryxqeFkLj8q6m154=s512',
        website: 'https://www.innersloth.com/games/among-us',
        description: 'Social deduction game'
      },
      {
        id: 'g5',
        name: 'Clash of Clans',
        category: 'Gaming',
        icon: 'https://play-lh.googleusercontent.com/60xEQOHONQbKePKRpslsDvdYZwt-NS4BERIXD7Y7v5S2Ffs6Hs4CohziSvWYE6axXqA=s512',
        website: 'https://supercell.com/en/games/clashofclans',
        description: 'Strategy game'
      },
      {
        id: 'g6',
        name: 'Clash Royale',
        category: 'Gaming',
        icon: 'https://play-lh.googleusercontent.com/1QZTNQwKvfM3pRDCaqv3r2X_U5dTWQBlLeN3th7oXG0BfYibsOmKhiGpc6HHdY2i2oE=s512',
        website: 'https://supercell.com/en/games/clashroyale',
        description: 'Real-time strategy'
      },
      {
        id: 'g7',
        name: 'Candy Crush Saga',
        category: 'Gaming',
        icon: 'https://play-lh.googleusercontent.com/dJAXyPsNXcrdKRmeU49_UoErCheQ8dpG3tPEqsYYIdRaXHjDoMpn94AewG4V1qCLqK0=s512',
        website: 'https://king.com/game/candycrush',
        description: 'Match-3 puzzle game'
      },
      {
        id: 'g8',
        name: 'Subway Surfers',
        category: 'Gaming',
        icon: 'https://play-lh.googleusercontent.com/4xm2gKUVF0UD7l0lxT2X-zM9fNL-FhF4UHRFBO037CFQOoeyE8M1RBjjKj3QDgiw4Hc=s512',
        website: 'https://www.subwaysurfers.com',
        description: 'Endless runner game'
      },
      {
        id: 'g9',
        name: 'PowerDirector',
        category: 'Gaming',
        icon: 'https://play-lh.googleusercontent.com/B5cNBA15IxjCT-8UTXEWgiPcGkJ1C07iHKwm2Hbs8xR3PnJvZ0swTag3abdC_Fj5OfnP=s512',
        website: 'https://www.cyberlink.com/products/powerdirector-mobile',
        description: 'Video editing game'
      },
      {
        id: 'g10',
        name: 'Ludo King',
        category: 'Gaming',
        icon: 'https://play-lh.googleusercontent.com/kq3qnAAbROh3-Xw1AmvxdG4n8I4VjV_BLLhw1kT3FQWXmP8DBM0GEx3G7Ayc8fj1c_o=s512',
        website: 'https://www.ludoking.com',
        description: 'Board game'
      },
      {
        id: 'g11',
        name: 'Temple Run',
        category: 'Gaming',
        icon: 'https://play-lh.googleusercontent.com/xj4AYs3IX_hcELMoicEJj2B4MpbpGQP2TW8klh6b9Ipv6ljNsrlROwpQS_seqQ74oT9HxtKrOiTsKHLPseYx=s512',
        website: 'https://www.templerun.com',
        description: 'Endless running'
      },
      {
        id: 'g12',
        name: 'Hill Climb Racing',
        category: 'Gaming',
        icon: 'https://play-lh.googleusercontent.com/cd5BevWohRqLwsI2_i3k4YIVtcO57cIZCs6l20H1Hcdj0P2rFEcX_7QtgKbTM3Sn_A=s512',
        website: 'https://www.fingersoft.com',
        description: 'Racing game'
      },
      {
        id: 'g13',
        name: 'Garena Free Fire MAX',
        category: 'Gaming',
        icon: 'https://play-lh.googleusercontent.com/XAQ7c8MRAvy_mOUw8EGS3tQsn95MY7gJxtj-sSoVZ6OYJmjvt7KaGGDyT85UTRpLxL6d=s512',
        website: 'https://ff.garena.com',
        description: 'Battle royale enhanced'
      },
      {
        id: 'g14',
        name: 'Plants vs Zombies',
        category: 'Gaming',
        icon: 'https://play-lh.googleusercontent.com/BpBwU2lrwrmkSuNQ-uTX2VDt-90wF3ORFEk7rHIqb4B9drHoIwmzA95Tt80uX7tOoBtl=s512',
        website: 'https://www.ea.com/games/plants-vs-zombies',
        description: 'Tower defense'
      },
      {
        id: 'g15',
        name: 'Angry Birds',
        category: 'Gaming',
        icon: 'https://play-lh.googleusercontent.com/L0JfyWa6L3i_aYfeBtYI6oa-9wnuBznfIvWgp2asAL-O7VJDk4Kjqm8ShIa_c07LM8jqh_-R3-icMr-cvcUO=s512',
        website: 'https://www.angrybirds.com',
        description: 'Physics puzzle'
      },
      {
        id: 'g16',
        name: 'Fruit Ninja',
        category: 'Gaming',
        icon: 'https://play-lh.googleusercontent.com/XHAMg2tievEEjzTo91f7bCtBjjX6svmgDcPYFKCd3iHSqzG3wd3BajNZftOyjfMg4g=s512',
        website: 'https://fruitninja.com',
        description: 'Fruit slicing game'
      },
      {
        id: 'g17',
        name: 'Cut the Rope',
        category: 'Gaming',
        icon: 'https://play-lh.googleusercontent.com/aTgKh70bgIYCMvMdkcsDVNYi0XAnNPd0JXEu5pO20z1m2HhWiiIMX_ulwsCFK3F24d0=s512',
        website: 'https://www.cuttherope.net',
        description: 'Physics puzzle'
      },
      {
        id: 'g18',
        name: 'Jetpack Joyride',
        category: 'Gaming',
        icon: 'https://play-lh.googleusercontent.com/XECQOnSu6nDDUeROQF2JeckhiZSHm4kiwRGSVkdO-rpuBrZD90c-SDdBGQSNwK2riyI=s512',
        website: 'https://halfbrick.com/games/jetpack-joyride',
        description: 'Endless runner'
      },
      {
        id: 'g19',
        name: 'Doodle Jump',
        category: 'Gaming',
        icon: 'https://play-lh.googleusercontent.com/obRvW02OTYLzJuvic1ZbVDVXLXzI0Vt_JGOjlxZ92XMdBF_i3kqU92u9SgHvJ5pySdM=s512',
        website: 'https://www.doodlejump.com',
        description: 'Platform jumping'
      },
      {
        id: 'g20',
        name: 'Geometry Dash',
        category: 'Gaming',
        icon: 'https://play-lh.googleusercontent.com/lm6Rk4Qc3eXUIxC8qkFCj46Bho6fbi6Lu3TwWuS3JNU2bBEcNU61arw_wG5wA0c-4IE=s512',
        website: 'https://www.robtopgames.com',
        description: 'Rhythm platformer'
      }
    ],
    shopping: [
      {
        id: 'sh1',
        name: 'Amazon',
        category: 'Shopping',
        icon: 'https://play-lh.googleusercontent.com/ZLs7Qq0ypc2Fy5iUbpTyIwNDn1BeNyaiXuF1iqnDH_k_z-aYGZFjZPS0Jfa1VAavDg=s512',
        website: 'https://www.amazon.com',
        description: 'Online marketplace'
      },
      {
        id: 'sh2',
        name: 'Flipkart',
        category: 'Shopping',
        icon: 'https://play-lh.googleusercontent.com/Z0m6mj_Xt1athoKi_3i_PhqjjXDWZHqy9ev36Wnca43AnNQBjvEOMApn9TwxPa1vXQ=s512',
        website: 'https://www.flipkart.com',
        description: 'Indian e-commerce'
      },
      {
        id: 'sh3',
        name: 'Myntra',
        category: 'Shopping',
        icon: 'https://play-lh.googleusercontent.com/jEzoDhwCHfCBoFMmP5Umh6Ma-ZfVX8kOT4N4SAP7KEd-R-ssu-SbXEp3qHUP7PghWhjt=s512',
        website: 'https://www.myntra.com',
        description: 'Fashion shopping'
      },
      {
        id: 'sh4',
        name: 'Meesho',
        category: 'Shopping',
        icon: 'https://play-lh.googleusercontent.com/dQRKhi30KpzG3gww3TdVLzyIAVuOAWylnAcgnEUxqfpm2A8dEt2sgApVvtKAy-DO8aI=s512',
        website: 'https://www.meesho.com',
        description: 'Social commerce'
      },
      {
        id: 'sh5',
        name: 'Ajio',
        category: 'Shopping',
        icon: 'https://play-lh.googleusercontent.com/m8sS0x1-yScLCN_0mGtxWlRpp6rEd8z71c23RbeAD0KA3rS6GPpDp25VxQfjHRFAXJE=s512',
        website: 'https://www.ajio.com',
        description: 'Fashion & lifestyle'
      }
    ],
    music: [
      {
        id: 'm1',
        name: 'Spotify',
        category: 'Music',
        icon: 'https://play-lh.googleusercontent.com/YJMYAJMY2ACAu5AjvQMaYZZwe9GJqqlMXNlrQoal1cc3leiVxNzOQJ7eA1FoTJ9aqQ=s512',
        website: 'https://open.spotify.com',
        description: 'Music streaming'
      },
      {
        id: 'm2',
        name: 'JioSaavn',
        category: 'Music',
        icon: 'https://play-lh.googleusercontent.com/VDbagKaMfrrbSEOzS-Rpv4mB7WLXMjIJiyhZVkPtyLyicRfRtgxZY1K5XQ4WVeiZJSM=s512',
        website: 'https://www.jiosaavn.com',
        description: 'Indian music streaming'
      },
      {
        id: 'm3',
        name: 'Gaana',
        category: 'Music',
        icon: 'https://play-lh.googleusercontent.com/Rm67YlsqllSHBDkjolUUg48GgHneqaV70BeUwAG7k8WAJ-X7ZIf2gPBCb9VVrgYAl1E=s512',
        website: 'https://gaana.com',
        description: 'Bollywood music'
      },
      {
        id: 'm4',
        name: 'YouTube Music',
        category: 'Music',
        icon: 'https://play-lh.googleusercontent.com/UWL2zfGC3tIy-0Z86E9Oa8BjJAFSgwpDNuAQurKYBqE-bZSEO3BIYHzX-MTGy7b1pvw=s512',
        website: 'https://music.youtube.com',
        description: 'YouTube music service'
      }
    ],
    productivity: [
      {
        id: 'p1',
        name: 'Microsoft Office',
        category: 'Productivity',
        icon: 'https://play-lh.googleusercontent.com/fbQ_Bu7iMqDnX06u7TLdJhyvEDFHaeLCD4GrCn-W7F5CWb69hFZwppXInq0lbnmxyor3=s512',
        website: 'https://www.office.com',
        description: 'Office suite'
      },
      {
        id: 'p2',
        name: 'Google Drive',
        category: 'Productivity',
        icon: 'https://play-lh.googleusercontent.com/xo4FYiZICYNOsyPGLiJBLAjK4uTmMCkfaFN4nrP8yROQJX8UtybXo2t_82hdGplXViP4=s512',
        website: 'https://drive.google.com',
        description: 'Cloud storage'
      },
      {
        id: 'p3',
        name: 'Adobe Acrobat',
        category: 'Productivity',
        icon: 'https://play-lh.googleusercontent.com/0IdG4GLN7T73OrfRWwb3M1dyuFPmuAftPepnHS6p8qoTGvXXeHKHQY54-B8OXEbAZGI=s512',
        website: 'https://acrobat.adobe.com',
        description: 'PDF editor'
      },
      {
        id: 'p4',
        name: 'Evernote',
        category: 'Productivity',
        icon: 'https://play-lh.googleusercontent.com/4S1nfdKsH_1tJodkHrBHimqlCTE6qx6z22zpMyPaMc_Rlr1EdSFDI1I6UEVMnokG5zI=s512',
        website: 'https://evernote.com',
        description: 'Note-taking app'
      },
      {
        id: 'p5',
        name: 'Todoist',
        category: 'Productivity',
        icon: 'https://play-lh.googleusercontent.com/OrUaV91RmXIKGDHb1oPrd8iQA7IWeu0sh3BSAb0piFHM4gakutty9377Zn1BTMSYeQ=s512',
        website: 'https://todoist.com',
        description: 'Task management'
      },
      {
        id: 'p6',
        name: 'Any.do',
        category: 'Productivity',
        icon: 'https://play-lh.googleusercontent.com/kUp29R5cztQ343bdiwuNnwuVoABToyP6ks5fXScz_8HKPXtoT4w8tIgBHQ5HsnT-cz8=s512',
        website: 'https://www.any.do',
        description: 'To-do list app'
      },
      {
        id: 'p7',
        name: 'Forest',
        category: 'Productivity',
        icon: 'https://play-lh.googleusercontent.com/6iyA2zVz5PyyMjK5SIxdUhrb7oh9cYVXJ93q6DZkmx07Er1o90PXYeo6mzL4VC2Gj9s=s512',
        website: 'https://www.forestapp.cc',
        description: 'Focus & productivity'
      },
      {
        id: 'p8',
        name: 'RescueTime',
        category: 'Productivity',
        icon: 'https://play-lh.googleusercontent.com/gkR1VdIYye2VQ_HXcp-1cy4NpNCO7HTcEk1u-_6BFLk5Y47w-QY_6OInsRoX0oVDKg=s512',
        website: 'https://www.rescuetime.com',
        description: 'Time tracking'
      },
      {
        id: 'p9',
        name: 'Toggl Track',
        category: 'Productivity',
        icon: 'https://play-lh.googleusercontent.com/dbGOx0rBa74lwuwkP2A9q9LHD5FIP4DPI1cCp5idVLJRkcSR6tWJ40jY_3isdlDZZsvQ=s512',
        website: 'https://toggl.com',
        description: 'Time tracking tool'
      },
      {
        id: 'p10',
        name: 'Clockify',
        category: 'Productivity',
        icon: 'https://play-lh.googleusercontent.com/Zwh4ahhTMsXk0fzpxY30JVnFIDfQViTCej0lNllmrKAMDWsbJVVDPLSnSQStde1tXO0=s512',
        website: 'https://clockify.me',
        description: 'Free time tracker'
      }
    ],
    food: [
      {
        id: 'f1',
        name: 'Zomato',
        category: 'Food',
        icon: 'https://play-lh.googleusercontent.com/WncVeFt-RwuI7ZYN0jfFgCMTQEAvDoXMua7Fr5Tcay-oyjUjdIUAexr9IF1i6efYPg=s512',
        website: 'https://www.zomato.com',
        description: 'Food delivery'
      },
      {
        id: 'f2',
        name: 'Swiggy',
        category: 'Food',
        icon: 'https://play-lh.googleusercontent.com/GguSSKNcZdGw624xa9VqH71Sy6B12bHdlINY0RN_CltpzE51NgdFWkxesZuI4joVDrM=s512',
        website: 'https://www.swiggy.com',
        description: 'Food delivery service'
      },
      {
        id: 'f3',
        name: 'Uber Eats',
        category: 'Food',
        icon: 'https://play-lh.googleusercontent.com/HJdzprqlCwh_8YNyhMBU6rIaGBGwxHXflZuuqI3iR4US7Jb-bSYiJk_DKV2la9SoBM0K=s512',
        website: 'https://www.ubereats.com',
        description: 'Food delivery platform'
      }
    ],
    travel: [
      {
        id: 'tr1',
        name: 'Ola',
        category: 'Travel',
        icon: 'https://play-lh.googleusercontent.com/KCMTYuiTrKom4Vyf0G4foetVOwhKWzNbHWumV73IXexAIy5TTgZipL52WTt8ICL-oIo=s512',
        website: 'https://www.olacabs.com',
        description: 'Ride booking'
      },
      {
        id: 'tr2',
        name: 'Uber',
        category: 'Travel',
        icon: 'https://play-lh.googleusercontent.com/VYvJqGnrQiKkbbyLyMeiL-GM3go4tBIA64uVEGQazLXD4p_M3F45kHyt42o_6d5VXA=s512',
        website: 'https://www.uber.com',
        description: 'Ride sharing'
      },
      {
        id: 'tr3',
        name: 'MakeMyTrip',
        category: 'Travel',
        icon: 'https://play-lh.googleusercontent.com/Nz5sdWyh7jn4eTy_GSaRBDgaKhLC1pvYywC6fklDOlPGbopmeFN9NkqgKGjsvJMbKVEI=s512',
        website: 'https://www.makemytrip.com',
        description: 'Travel booking'
      },
      {
        id: 'tr4',
        name: 'Goibibo',
        category: 'Travel',
        icon: 'https://play-lh.googleusercontent.com/u9LTV4Jq-sv22KUmIbRLtlbb-bT1dUvBLMCjxQsvsJVQEgRKdr1YWVOGTXNGlri_cO6q=s512',
        website: 'https://www.goibibo.com',
        description: 'Flight & hotel booking'
      }
    ],
    health: [
      {
        id: 'h1',
        name: 'Practo',
        category: 'Health',
        icon: 'https://play-lh.googleusercontent.com/EfEaKlzehq-PISSu-e0OrUVu-yupexFsaLoBJbAcxQs6O6wL3MVmKAXp-i-hUdqW2j4=s512',
        website: 'https://www.practo.com',
        description: 'Healthcare platform'
      },
      {
        id: 'h2',
        name: '1mg',
        category: 'Health',
        icon: 'https://play-lh.googleusercontent.com/bNSDmFT0WsnRZupS4f2IT8_LuTWdrH29nda_OXOz9hs4Aq0PmY4eDs4Vk-dNccEilUWo=s512',
        website: 'https://www.1mg.com',
        description: 'Online pharmacy'
      },
      {
        id: 'h3',
        name: 'PharmEasy',
        category: 'Health',
        icon: 'https://play-lh.googleusercontent.com/Cf6rGlvAZJx2iG4c5f5H5N5XWGKFk5XZ_uz0A0YIIyuFPFybIfQaxSlDIQyU2W8btfv6=s512',
        website: 'https://pharmeasy.in',
        description: 'Medicine delivery'
      },
      {
        id: 'h4',
        name: 'Apollo 24|7',
        category: 'Health',
        icon: 'https://play-lh.googleusercontent.com/Vqqu0aemZVG4dp3KpYmBAsBh05veUYp7WySqpES3d-B6p_RaqyNCtUv65T8LTcVQvV8M=s512',
        website: 'https://www.apollo247.com',
        description: 'Healthcare services'
      }
    ],
    news: [
      {
        id: 'n1',
        name: 'Google News',
        category: 'News',
        icon: 'https://play-lh.googleusercontent.com/xkc1KD4fmch-GKlTZfsXKDvLwW91sYzsI527lM0wVFPYmZb_g-CbfVu7C1mEQ7b2V64=s512',
        website: 'https://news.google.com',
        description: 'News aggregator'
      },
      {
        id: 'n2',
        name: 'Times of India',
        category: 'News',
        icon: 'https://play-lh.googleusercontent.com/p3LCMJf00ayFFIj8BuJ1ECvQjhSZxvRaDzf14xlJt_J5LPsrL8ZXlb5gSHwCCBQRxBw=s512',
        website: 'https://timesofindia.indiatimes.com',
        description: 'Indian news'
      },
      {
        id: 'n3',
        name: 'Inshorts',
        category: 'News',
        icon: 'https://play-lh.googleusercontent.com/nC95iM2f4dXas2K5x-heZ_uUVH9oc-mnlQF9phleiU2Kfk_Z1Rmwrbwv0QOdwQ__T4A=s512',
        website: 'https://inshorts.com',
        description: '60-word news summaries'
      },
      {
        id: 'n4',
        name: 'BBC News',
        category: 'News',
        icon: 'https://play-lh.googleusercontent.com/ohrWQzCBzWWE0xYk23TNdO4V1YBXyMMIqLvI61FDAPda-Jkt7Re4V5gmG-JqOFsXq-Y=s512',
        website: 'https://www.bbc.com/news',
        description: 'International news'
      },
      {
        id: 'n5',
        name: 'CNN',
        category: 'News',
        icon: 'https://play-lh.googleusercontent.com/jpfmbnNbNL0IFNUS0MihgihqcGyQtktDFgY-ewUjcTLsXExJ-189gg_UnnmwptQ2nVQ=s512',
        website: 'https://www.cnn.com',
        description: 'Breaking news'
      },
      {
        id: 'n6',
        name: 'Reuters',
        category: 'News',
        icon: 'https://play-lh.googleusercontent.com/ltH2zTXQd6P4jR8eEkb9AbJ-Ay3s1RiSymj-pYUGmD-A6US8Qr2py5ii_Jpc0D1JT5M=s512',
        website: 'https://www.reuters.com',
        description: 'Global news agency'
      }
    ],
    lifestyle: [
      {
        id: 'l1',
        name: 'Pinterest',
        category: 'Lifestyle',
        icon: 'https://play-lh.googleusercontent.com/lxl3CQLYmbY7kHtMn3ehz06ebEIIxYOETf8hlWPNW6L3ZPxuhSrnIq-4k5T89gd4gA=s512',
        website: 'https://www.pinterest.com',
        description: 'Visual discovery'
      },
      {
        id: 'l2',
        name: 'Tumblr',
        category: 'Lifestyle',
        icon: 'https://play-lh.googleusercontent.com/UqI2srdnIkeI7yAHijIPMEzqmtSTc04ZwCovoVawlPSOp4lX1ie8Dler5qgGXTIX-g=s512',
        website: 'https://www.tumblr.com',
        description: 'Microblogging platform'
      },
      {
        id: 'l3',
        name: 'Reddit',
        category: 'Lifestyle',
        icon: 'https://play-lh.googleusercontent.com/i9K3JA1Sfpzk3NYWmlOQjDww04g3JhD45dYLdwgpXgqlZcHN5HYCVvfPLfHvB_TrPxw=s512',
        website: 'https://www.reddit.com',
        description: 'Social news'
      },
      {
        id: 'l4',
        name: 'Quora',
        category: 'Lifestyle',
        icon: 'https://play-lh.googleusercontent.com/uYzGHrVcuVc-Et80ReIxKiLTmwFgHFI7Isn8DGvLcIYSCh3kqiXUIqRYDnZcNhJmIA=s512',
        website: 'https://www.quora.com',
        description: 'Q&A platform'
      },
      {
        id: 'l5',
        name: 'Clubhouse',
        category: 'Lifestyle',
        icon: 'https://play-lh.googleusercontent.com/RBUyWdycKSK15xSN6RtUFkmeAiRlb5EFDcERcm_4uPEmr35RqiU2r1Zrn7VZQuKmhmU=s512',
        website: 'https://www.clubhouse.com',
        description: 'Audio chat rooms'
      },
      {
        id: 'l6',
        name: 'BeReal',
        category: 'Lifestyle',
        icon: 'https://play-lh.googleusercontent.com/PwWpRbfcwSi8pZ9eXEnd6SOFEoXhaZHVFKmDtezhiJ0NI5G8Uy2ocBfjgQr1RSzUw-0=s512',
        website: 'https://bereal.com',
        description: 'Authentic social sharing'
      },
      {
        id: 'l7',
        name: 'Bumble',
        category: 'Lifestyle',
        icon: 'https://play-lh.googleusercontent.com/LN5-oJgFvaXMp1BBW7m56gb3hIJaz32iRgznvieQ02jzYejNat1vUj0tIZNknakC9u4=s512',
        website: 'https://bumble.com',
        description: 'Dating app'
      },
      {
        id: 'l8',
        name: 'Tinder',
        category: 'Lifestyle',
        icon: 'https://play-lh.googleusercontent.com/nXCY9Did341stoQEhCEH5wJW2FBybZYbpiYl2J-eCajYOXZ_XXXHX1ptjATuA0zayg=s512',
        website: 'https://tinder.com',
        description: 'Dating app'
      },
      {
        id: 'l9',
        name: 'Hinge',
        category: 'Lifestyle',
        icon: 'https://play-lh.googleusercontent.com/-89jp_kyNBg9_FBFXjKJlwqbLOBG9yiG6LJCLx2rOiqeSBPztO17D-x_ao5aF4DsTY4=s512',
        website: 'https://hinge.co',
        description: 'Dating app'
      },
      {
        id: 'l10',
        name: 'Coffee Meets Bagel',
        category: 'Lifestyle',
        icon: 'https://play-lh.googleusercontent.com/4bwCchtw-smim1ea5_HK5fAlDrw4P3HX-SrchF0EkBhk860VPVA48QBKmyE_M0XAD7CV=s512',
        website: 'https://coffeemeetsbagel.com',
        description: 'Quality dating'
      },
      {
        id: 'l11',
        name: 'OkCupid',
        category: 'Lifestyle',
        icon: 'https://play-lh.googleusercontent.com/9E_9erPqls3yWgVokNevGGahIxzecFSYvnUAMtVMpES1sieGjZXW4s9ybpJPNP42CZ6h=s512',
        website: 'https://www.okcupid.com',
        description: 'Dating with personality'
      }
    ],
    photography: [
      {
        id: 'ph1',
        name: 'VSCO',
        category: 'Photography',
        icon: 'https://play-lh.googleusercontent.com/8W0X_YPilF1Rn82UqNdrH1hIwSiqdQGNlrEp3pwAstF-fdgLMv1_5TXcilBQThZ35w=s512',
        website: 'https://vsco.co',
        description: 'Photo editing'
      },
      {
        id: 'ph2',
        name: 'Lightroom',
        category: 'Photography',
        icon: 'https://play-lh.googleusercontent.com/5OakTGi4lpF4Qbs-eRmh8xVCU24X8R7IiM9IcF4jTpcHJ3KSgdJPVNTFlvjLjtGxxgE=s512',
        website: 'https://www.adobe.com/products/photoshop-lightroom.html',
        description: 'Professional photo editing'
      },
      {
        id: 'ph3',
        name: 'Snapseed',
        category: 'Photography',
        icon: 'https://play-lh.googleusercontent.com/XMLLn1jT_ZWXibSKV3bzORq-nESxhKKsv5E8wNFXXphm81i45nTVmzvR1WGGp0E4k4U=s512',
        website: 'https://snapseed.online',
        description: 'Google photo editor'
      },
      {
        id: 'ph4',
        name: 'PicsArt',
        category: 'Photography',
        icon: 'https://play-lh.googleusercontent.com/Tue--Mp3Abr2XJrNUmhqVBJhRFdLugUaU60GfRzpyBE3jrZ3ynrXxZDJ8SmgT5RrVeI=s512',
        website: 'https://picsart.com',
        description: 'Creative photo editing'
      },
      {
        id: 'ph5',
        name: 'Canva',
        category: 'Photography',
        icon: 'https://play-lh.googleusercontent.com/nkbOovQtDY7YD8JLIJXJnbD8zXnzixv50yaN9JYo9sCgjCUT-tyvNXJTLrxZ25oxwFiu=s512',
        website: 'https://www.canva.com',
        description: 'Design platform'
      },
      {
        id: 'ph6',
        name: 'Photoshop Express',
        category: 'Photography',
        icon: 'https://play-lh.googleusercontent.com/lql-v5JBq7UFMLQALnvZCX6r1X_Av8rVfrkzuv_fdjzEv88ucl4f5iCFfiN9isEc1TE=s512',
        website: 'https://www.adobe.com/products/photoshop-express.html',
        description: 'Quick photo fixes'
      },
      {
        id: 'ph7',
        name: 'Facetune',
        category: 'Photography',
        icon: 'https://play-lh.googleusercontent.com/LtYWiZTW8vf0qFeDKNYFzfRwRfXtAXlYGPN3HXKubDAoQZkN4FE75HJEeZ8zFsV11A=s512',
        website: 'https://www.facetuneapp.com',
        description: 'Portrait editing'
      }
    ]
  };

  // Flatten all apps for search functionality
  const allApps = Object.values(appCategories).flat();

  const filteredApps = allApps.filter((app: App) =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter categories based on search
  const getFilteredCategories = () => {
    if (!searchQuery) return appCategories;

    const filtered: typeof appCategories = {} as typeof appCategories;
    Object.entries(appCategories).forEach(([key, apps]) => {
      const filteredCategoryApps = apps.filter((app: App) =>
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (filteredCategoryApps.length > 0) {
        (filtered as any)[key] = filteredCategoryApps;
      }
    });
    return filtered;
  };

  const filteredCategories = getFilteredCategories();

  // Show search results if user submitted a search
  if (showSearchResults) {
    return <SearchResults searchQuery={submittedQuery} onClose={handleCloseSearch} />;
  }

  return (
    <div className="h-full bg-black flex flex-col relative overflow-hidden">
      {/* Full Page Sparkles Background */}
      <div className="absolute inset-0 z-0">
        <SparklesCore
          background="transparent"
          minSize={0.2}
          maxSize={2.0}
          particleDensity={2500}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      {/* Animated Sparkles Background */}
      <div className="absolute inset-0 z-1 overflow-hidden">
        <SparklesCore
          background="transparent"
          minSize={0.3}
          maxSize={1.2}
          particleDensity={800}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />

        {/* Additional floating sparkle elements with animation */}
        <div className="absolute inset-0 w-full h-full">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={`floating-sparkle-${i}`}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
                background: i % 3 === 0 ? "#60A5FA" : i % 3 === 1 ? "#A78BFA" : "#FFFFFF",
                borderRadius: "50%",
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
                boxShadow: `0 0 ${6 + Math.random() * 10}px currentColor`,
                opacity: 0.6 + Math.random() * 0.4,
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .grid-cols-20 {
          grid-template-columns: repeat(12, minmax(0, 1fr));
        }
        @media (max-width: 1920px) {
          .grid-cols-20 {
            grid-template-columns: repeat(15, minmax(0, 1fr));
          }
        }
        @media (max-width: 1536px) {
          .grid-cols-20 {
            grid-template-columns: repeat(12, minmax(0, 1fr));
          }
        }
        @media (max-width: 1280px) {
          .grid-cols-20 {
            grid-template-columns: repeat(10, minmax(0, 1fr));
          }
        }
        @media (max-width: 1024px) {
          .grid-cols-20 {
            grid-template-columns: repeat(8, minmax(0, 1fr));
          }
        }
        @media (max-width: 768px) {
          .grid-cols-20 {
            grid-template-columns: repeat(6, minmax(0, 1fr));
          }
        }
        @media (max-width: 640px) {
          .grid-cols-20 {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
        }
      `}</style>

      {/* Sparkles Header with Integrated Search */}
      <div className={`relative z-10 transition-all duration-300 ${isHeaderFixed ? 'fixed top-0 left-0 right-0 bg-black/95 backdrop-blur-md' : ''
        }`}>
        <div className={isHeaderFixed ? 'h-16' : ''}>
          {isHeaderFixed ? (
            // Compact fixed header
            <div className="flex items-center px-4 py-2 h-16">
              <button
                onClick={onBack}
                className="p-2 hover:bg-white/10 rounded-full transition-colors mr-3"
              >
                <HiOutlineArrowLeft size={20} className="text-white" />
              </button>

              <div className="flex-1 max-w-2xl mx-auto flex items-center gap-3">
                <div className="flex items-center bg-black border border-gray-600 rounded-full shadow-lg h-10 flex-1">
                  <div className="flex items-center flex-1 px-3 py-1">
                    <HiOutlineMagnifyingGlass size={16} className="text-gray-400 mr-2" />
                    <input
                      type="text"
                      placeholder="Type your message here..."
                      className="flex-1 border-none outline-none bg-transparent text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-0"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                  </div>
                  <div className="pr-1">
                    <button
                      onClick={handleSearch}
                      className="bg-gradient-to-r from-purple-500 via-purple-600 to-indigo-600 text-white px-5 py-1.5 font-medium hover:from-purple-600 hover:via-purple-700 hover:to-indigo-700 transition-all duration-300 rounded-full flex items-center justify-center h-8 text-sm"
                    >
                      Submit
                    </button>
                  </div>
                </div>

                {/* Profile Image - Outside search bar */}
                <button
                  onClick={() => setShowVideo(true)}
                  className="w-10 h-10 rounded-full overflow-hidden border border-white flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <img
                    src="https://raw.githubusercontent.com/TheCyperpunk/littilelilly-photos/main/Screenshot%202025-10-18%20174437.png"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </button>
              </div>

              <button className="p-2 hover:bg-white/10 rounded-full transition-colors ml-3">
                <HiOutlineEllipsisVertical size={20} className="text-white" />
              </button>
            </div>
          ) : (
            // Full SparklesPreview header
            <>
              <SparklesPreview
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onSubmit={handleSearch}
                onKeyPress={handleKeyPress}
              />
              {/* Back Button Overlay */}
              <button
                onClick={onBack}
                className="absolute top-4 left-4 p-2 hover:bg-white/20 rounded-full transition-colors z-30"
              >
                <HiOutlineArrowLeft size={20} className="text-white" />
              </button>

              {/* Menu Button Overlay */}
              <button className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors z-30">
                <HiOutlineEllipsisVertical size={20} className="text-white" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-auto px-4 py-4 relative z-10 scrollbar-hide"
        style={{ paddingTop: isHeaderFixed ? '64px' : '0' }}
      >
        {/* All Apps Grid - First 4 complete rows (48 apps) */}
        {!searchQuery && (
          <div className="mb-8 space-y-8">
            {/* Render each category section */}
            {Array.from({ length: 4 }).map((_, sectionIndex) => {
              const startIndex = sectionIndex * 12;
              const sectionApps = allApps.slice(startIndex, startIndex + 12);

              return sectionApps.length > 0 ? (
                <div key={sectionIndex} className="group/section relative">
                  {/* Category Header */}
                  <h3 className="text-lg font-semibold text-white mb-4 px-2">
                    {sectionApps[0]?.category || ''}
                  </h3>

                  {/* Apps Row with Chevron */}
                  <div className="relative">
                    <div className="grid grid-cols-12 gap-4">
                      {sectionApps.map((app: App) => (
                        <a
                          key={app.id}
                          href={app.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-col items-center p-4 hover:bg-white/10 rounded-xl transition-all cursor-pointer group backdrop-blur-sm"
                        >
                          <div className="w-20 h-20 rounded-2xl overflow-hidden mb-3 shadow-lg group-hover:shadow-xl transition-shadow ring-1 ring-white/20">
                            <img
                              src={app.icon}
                              alt={app.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(app.name)}&background=random&size=128`;
                              }}
                            />
                          </div>
                          <h3 className="font-medium text-white text-sm text-center line-clamp-2 leading-tight group-hover:text-blue-400 transition-colors">
                            {app.name}
                          </h3>
                        </a>
                      ))}
                    </div>

                    {/* Chevron Button - Visible on hover */}
                    <button className="absolute -right-2 top-8 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center opacity-0 group-hover/section:opacity-100 transition-opacity z-10">
                      <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              ) : null;
            })}
          </div>
        )}

        {/* Top Apps Section - Google Play Store Style */}
        {!searchQuery && (
          <div className="mb-8 px-6 py-6 group/topsection">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white">Top Apps</h2>
            </div>

            <div className="flex items-center gap-2 relative">
              <div className="flex-1 space-y-6">
                {/* Row 1 */}
                <div className="grid grid-cols-3 gap-20">
                  {/* Perplexity */}
                  <a
                    href="https://www.perplexity.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 transition-all group"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg ring-1 ring-white/20">
                        <img
                          src="https://play-lh.googleusercontent.com/7ynvVIRdhJNAngCg_GI7i8TtH8BqkJYmffeUHsG-mJOdzt1XLvGmbsKuc5Q1SInBjDKN=s128"
                          alt="Perplexity"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white text-sm group-hover:text-blue-400">Perplexity - Ask Anything</h3>
                        <p className="text-xs text-gray-400">Productivity</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs text-white">4.1</span>
                          <HiOutlineStar className="w-3 h-3 text-white fill-current" />
                        </div>
                      </div>
                    </div>
                  </a>

                  {/* Meesho */}
                  <a
                    href="https://www.meesho.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 transition-all group"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg ring-1 ring-white/20">
                        <img
                          src="https://play-lh.googleusercontent.com/hmSutR7gJSEwYXaQvomDG6SqagGD-xl4qUzAWxVIu59PW9QLAfC8dFTTxnKZpfO7F3gP_FxLjHAtAcBsjEWIvw=s128"
                          alt="Meesho"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white text-sm group-hover:text-blue-400">Meesho: Online Shopping App</h3>
                        <p className="text-xs text-gray-400">Shopping</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs text-white">4.4</span>
                          <HiOutlineStar className="w-3 h-3 text-white fill-current" />
                        </div>
                      </div>
                    </div>
                  </a>

                  {/* Flipkart */}
                  <a
                    href="https://www.flipkart.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 transition-all group"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg ring-1 ring-white/20">
                        <img
                          src="https://play-lh.googleusercontent.com/1BHCGbGs0agclOUPWcqPYvSBudOd_TbGITUReVMKYZswq_zjWW8-lc0QIUOt0PX3mg=s128"
                          alt="Flipkart"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white text-sm group-hover:text-blue-400">Flipkart Online Shopping App</h3>
                        <p className="text-xs text-gray-400">Shopping</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs text-white">4.3</span>
                          <HiOutlineStar className="w-3 h-3 text-white fill-current" />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-3 gap-20">
                  {/* ChatGPT */}
                  <a
                    href="https://chat.openai.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 transition-all group"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg ring-1 ring-white/20">
                        <img
                          src="https://play-lh.googleusercontent.com/BU9zFJE8KWxqUg_xJoP9LysB7sxB5inY8CZPpCg6z-WEyAIRfgBsEtnsO-y88zPmqgk=s128"
                          alt="ChatGPT"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white text-sm group-hover:text-blue-400">ChatGPT</h3>
                        <p className="text-xs text-gray-400">Productivity</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs text-white">4.5</span>
                          <HiOutlineStar className="w-3 h-3 text-white fill-current" />
                        </div>
                      </div>
                    </div>
                  </a>

                  {/* Story TV */}
                  <a
                    href="https://www.storytv.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 transition-all group"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg ring-1 ring-white/20">
                        <img
                          src="https://play-lh.googleusercontent.com/HJdzprqlCwh_8YNyhMBU6rIaGBGwxHXflZuuqI3iR4US7Jb-bSYiJk_DKV2la9SoBM0K=s128"
                          alt="Story TV"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white text-sm group-hover:text-blue-400">Story TV - Watch Short Dramas</h3>
                        <p className="text-xs text-gray-400">Entertainment</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs text-white">4.4</span>
                          <HiOutlineStar className="w-3 h-3 text-white fill-current" />
                        </div>
                      </div>
                    </div>
                  </a>

                  {/* Navi */}
                  <a
                    href="https://www.navi.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 transition-all group"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg ring-1 ring-white/20">
                        <img
                          src="https://play-lh.googleusercontent.com/BZSkyLJNJnqp91FtE1iSskcsalt9oJiepU_GEgr_bB5hVg5x8CUzHLoMmc2lNzm16Q=s128"
                          alt="Navi"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white text-sm group-hover:text-blue-400">Navi: UPI, Investments & Loans</h3>
                        <p className="text-xs text-gray-400">Finance</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs text-white">4.5</span>
                          <HiOutlineStar className="w-3 h-3 text-white fill-current" />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-3 gap-20">
                  {/* Google Gemini */}
                  <a
                    href="https://gemini.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 transition-all group"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg ring-1 ring-white/20">
                        <img
                          src="https://play-lh.googleusercontent.com/wpnNPYIrdHC3Q_bcFXGpwoMvFvvvQnZJHmFKzumq5ZTRZKIzfxURAUGOMqhPhVxnggY=s128"
                          alt="Google Gemini"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white text-sm group-hover:text-blue-400">Google Gemini</h3>
                        <p className="text-xs text-gray-400">Productivity</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs text-white">4.3</span>
                          <HiOutlineStar className="w-3 h-3 text-white fill-current" />
                        </div>
                      </div>
                    </div>
                  </a>

                  {/* Kuku TV */}
                  <a
                    href="https://www.kukutv.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 transition-all group"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg ring-1 ring-white/20">
                        <img
                          src="https://play-lh.googleusercontent.com/XyRQ3Jjq4pSaAv0XtVnLcUPfkPDrRULoAhRUeOxR53xgxrGVR1Lde2UcnJgZvRFodyN4=s128"
                          alt="Kuku TV"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white text-sm group-hover:text-blue-400">Kuku TV: Reel Shows & Movies</h3>
                        <p className="text-xs text-gray-400">Entertainment</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs text-white">4.2</span>
                          <HiOutlineStar className="w-3 h-3 text-white fill-current" />
                        </div>
                      </div>
                    </div>
                  </a>

                  {/* Seekho */}
                  <a
                    href="https://www.seekho.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 transition-all group"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg ring-1 ring-white/20">
                        <img
                          src="https://play-lh.googleusercontent.com/Fm5PDRimTL_KsWyIRcTv9h0JLrTkDOMwh18SE819OXjEZhlwMYBHJXxUZ8eOBudxCsHC=s128"
                          alt="Seekho"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white text-sm group-hover:text-blue-400">Seekho: Short Learning Videos</h3>
                        <p className="text-xs text-gray-400">Education</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs text-white">4.5</span>
                          <HiOutlineStar className="w-3 h-3 text-white fill-current" />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Chevron Button - Visible on hover */}
              <button className="absolute -right-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center opacity-0 group-hover/topsection:opacity-100 transition-opacity z-10">
                <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* All Apps Grid - Rows 5-9 (60 apps) */}
        {!searchQuery && (
          <div className="mb-8 space-y-8">
            {/* Render each category section */}
            {Array.from({ length: 5 }).map((_, sectionIndex) => {
              const startIndex = 48 + (sectionIndex * 12);
              const sectionApps = allApps.slice(startIndex, startIndex + 12);

              return sectionApps.length > 0 ? (
                <div key={sectionIndex} className="group/section relative">
                  {/* Category Header */}
                  <h3 className="text-lg font-semibold text-white mb-4 px-2">
                    {sectionApps[0]?.category || ''}
                  </h3>

                  {/* Apps Row with Chevron */}
                  <div className="relative">
                    <div className="grid grid-cols-12 gap-4">
                      {sectionApps.map((app: App) => (
                        <a
                          key={app.id}
                          href={app.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-col items-center p-4 hover:bg-white/10 rounded-xl transition-all cursor-pointer group backdrop-blur-sm"
                        >
                          <div className="w-20 h-20 rounded-2xl overflow-hidden mb-3 shadow-lg group-hover:shadow-xl transition-shadow ring-1 ring-white/20">
                            <img
                              src={app.icon}
                              alt={app.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(app.name)}&background=random&size=128`;
                              }}
                            />
                          </div>
                          <h3 className="font-medium text-white text-sm text-center line-clamp-2 leading-tight group-hover:text-blue-400 transition-colors">
                            {app.name}
                          </h3>
                        </a>
                      ))}
                    </div>

                    {/* Chevron Button - Visible on hover */}
                    <button className="absolute -right-2 top-8 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center opacity-0 group-hover/section:opacity-100 transition-opacity z-10">
                      <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              ) : null;
            })}
          </div>
        )}

        {/* Top Apps Section 2 - Trending Apps */}
        {!searchQuery && (
          <div className="mb-8 px-6 py-6 group/trending">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white">Trending Apps</h2>
            </div>

            <div className="flex items-center gap-2 relative">
              <div className="flex-1 space-y-6">
                {/* Row 1 */}
                <div className="grid grid-cols-3 gap-20">
                  {/* Duolingo */}
                  <a
                    href="https://www.duolingo.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 transition-all group"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg ring-1 ring-white/20">
                        <img
                          src="https://play-lh.googleusercontent.com/VIohTA3wyJgKJ-SZzoJeYuykxyVFCbSmXFAjefIGQybY57FX44VCHyVa3CTOZROzWLbMc-VFwL4CEDj47LeRpM0=s128"
                          alt="Duolingo"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white text-sm group-hover:text-blue-400">Duolingo: Language Lessons</h3>
                        <p className="text-xs text-gray-400">Education</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs text-white">4.6</span>
                          <HiOutlineStar className="w-3 h-3 text-white fill-current" />
                        </div>
                      </div>
                    </div>
                  </a>

                  {/* Babbel */}
                  <a
                    href="https://www.babbel.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 transition-all group"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg ring-1 ring-white/20">
                        <img
                          src="https://play-lh.googleusercontent.com/tw_coGKgk1K_zO-Ypf9zBKV1s-KT3dYN1MIUxIqtnbfmON5x_YmuoAr31gE4oSfJHNtA-aStTd-qe9R8S6NVyA=s128"
                          alt="Babbel"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white text-sm group-hover:text-blue-400">Babbel: Learn Languages</h3>
                        <p className="text-xs text-gray-400">Education</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs text-white">4.5</span>
                          <HiOutlineStar className="w-3 h-3 text-white fill-current" />
                        </div>
                      </div>
                    </div>
                  </a>

                  {/* Busuu */}
                  <a
                    href="https://www.busuu.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 transition-all group"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg ring-1 ring-white/20">
                        <img
                          src="https://play-lh.googleusercontent.com/y41gjEtJou9NtXTqRjWzdJuhAYnv6tEemLxzz6M17aK_2t3rbbUDvcuA6F8ON_mYnSA=s128"
                          alt="Busuu"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white text-sm group-hover:text-blue-400">Busuu: Language Learning</h3>
                        <p className="text-xs text-gray-400">Education</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs text-white">4.5</span>
                          <HiOutlineStar className="w-3 h-3 text-white fill-current" />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-3 gap-20">
                  {/* Memrise */}
                  <a
                    href="https://www.memrise.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 transition-all group"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg ring-1 ring-white/20">
                        <img
                          src="https://play-lh.googleusercontent.com/5lYhpcJj9qhv9SHkSxt8wSZUTHoEhSzHDxPYmJK9ys66l3u-2Dmg2jhOWjGgUDiiVaIX=s128"
                          alt="Memrise"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white text-sm group-hover:text-blue-400">Memrise: Learn Languages</h3>
                        <p className="text-xs text-gray-400">Education</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs text-white">4.4</span>
                          <HiOutlineStar className="w-3 h-3 text-white fill-current" />
                        </div>
                      </div>
                    </div>
                  </a>

                  {/* Rosetta Stone */}
                  <a
                    href="https://www.rosettastone.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 transition-all group"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg ring-1 ring-white/20">
                        <img
                          src="https://play-lh.googleusercontent.com/U8BnooNvAVuT1ggQB64-mldIbmDcE7en_n742R0ukvOwfDhGJgLsoh0LOQtBN6y-feFI=s128"
                          alt="Rosetta Stone"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white text-sm group-hover:text-blue-400">Rosetta Stone: Learn Languages</h3>
                        <p className="text-xs text-gray-400">Education</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs text-white">4.6</span>
                          <HiOutlineStar className="w-3 h-3 text-white fill-current" />
                        </div>
                      </div>
                    </div>
                  </a>

                  {/* Mondly */}
                  <a
                    href="https://www.mondly.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 transition-all group"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg ring-1 ring-white/20">
                        <img
                          src="https://play-lh.googleusercontent.com/XvJS0AkNz2BGpuWhTnNsO_PDUFXs_lUnKF6OIxyCz_PMAuUgb3A8ra_7IshTWAqYzws=s128"
                          alt="Mondly"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white text-sm group-hover:text-blue-400">Mondly: Learn Languages</h3>
                        <p className="text-xs text-gray-400">Education</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs text-white">4.5</span>
                          <HiOutlineStar className="w-3 h-3 text-white fill-current" />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-3 gap-20">
                  {/* HelloTalk */}
                  <a
                    href="https://www.hellotalk.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 transition-all group"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg ring-1 ring-white/20">
                        <img
                          src="https://play-lh.googleusercontent.com/kMTuBBwXZ-zjg_WB-QB4ZfzM4Tv84vJ4iKcrNeUvHDQqImle6XzdRkrQinfrpcBejHs=s128"
                          alt="HelloTalk"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white text-sm group-hover:text-blue-400">HelloTalk: Language Learning</h3>
                        <p className="text-xs text-gray-400">Education</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs text-white">4.3</span>
                          <HiOutlineStar className="w-3 h-3 text-white fill-current" />
                        </div>
                      </div>
                    </div>
                  </a>

                  {/* Tandem */}
                  <a
                    href="https://www.tandem.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 transition-all group"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg ring-1 ring-white/20">
                        <img
                          src="https://play-lh.googleusercontent.com/kweybiMo_yZEBNmGCmh3fyRVXQQ5lIJQB4z_jaECV_tpqEW8GqhFjEFmxbtRL8TrFic=s128"
                          alt="Tandem"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white text-sm group-hover:text-blue-400">Tandem: Language Exchange</h3>
                        <p className="text-xs text-gray-400">Education</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs text-white">4.4</span>
                          <HiOutlineStar className="w-3 h-3 text-white fill-current" />
                        </div>
                      </div>
                    </div>
                  </a>

                  {/* Drops */}
                  <a
                    href="https://languagedrops.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 transition-all group"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg ring-1 ring-white/20">
                        <img
                          src="https://play-lh.googleusercontent.com/hlR8pZ9sR_t_37uhF2KZNhOp1goV2pGGu4Vg-d2gzOkv5e6pLSklryGLvKkLbvAITOU=s128"
                          alt="Drops"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white text-sm group-hover:text-blue-400">Drops: Learn Languages</h3>
                        <p className="text-xs text-gray-400">Education</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs text-white">4.7</span>
                          <HiOutlineStar className="w-3 h-3 text-white fill-current" />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Chevron Button - Visible on hover */}
              <button className="absolute -right-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center opacity-0 group-hover/trending:opacity-100 transition-opacity z-10">
                <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* All Apps Grid - Remaining apps after row 9 */}
        {!searchQuery && (
          <div className="space-y-8 mb-8">
            {/* Render each category section */}
            {Array.from({ length: Math.ceil((allApps.length - 108) / 12) }).map((_, sectionIndex) => {
              const startIndex = 108 + (sectionIndex * 12);
              const endIndex = Math.min(108 + ((sectionIndex + 1) * 12), allApps.length);
              const sectionApps = allApps.slice(startIndex, endIndex);

              return sectionApps.length > 0 ? (
                <div key={sectionIndex} className="group/section relative">
                  {/* Category Header */}
                  <h3 className="text-lg font-semibold text-white mb-4 px-2">
                    {sectionApps[0]?.category || ''}
                  </h3>

                  {/* Apps Row with Chevron */}
                  <div className="relative">
                    <div className="grid grid-cols-12 gap-4">
                      {sectionApps.map((app: App) => (
                        <a
                          key={app.id}
                          href={app.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-col items-center p-4 hover:bg-white/10 rounded-xl transition-all cursor-pointer group backdrop-blur-sm"
                        >
                          <div className="w-20 h-20 rounded-2xl overflow-hidden mb-3 shadow-lg group-hover:shadow-xl transition-shadow ring-1 ring-white/20">
                            <img
                              src={app.icon}
                              alt={app.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(app.name)}&background=random&size=128`;
                              }}
                            />
                          </div>
                          <h3 className="font-medium text-white text-sm text-center line-clamp-2 leading-tight group-hover:text-blue-400 transition-colors">
                            {app.name}
                          </h3>
                        </a>
                      ))}
                    </div>

                    {/* Chevron Button - Visible on hover */}
                    <button className="absolute -right-2 top-8 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center opacity-0 group-hover/section:opacity-100 transition-opacity z-10">
                      <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              ) : null;
            })}
          </div>
        )}

        {/* Top Apps Section 3 - Featured Apps */}
        {!searchQuery && (
          <div className="mb-8 px-6 py-6 group/featured">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white">Featured Apps</h2>
            </div>

            <div className="flex items-center gap-2 relative">
              <div className="flex-1 space-y-6">
                {/* Row 1 */}
                <div className="grid grid-cols-3 gap-20">
                  {/* Truecaller */}
                  <a
                    href="https://www.truecaller.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 transition-all group"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg ring-1 ring-white/20">
                        <img
                          src="https://play-lh.googleusercontent.com/8V1fwYBnseZxjoyPtG1Xk8pUH_L6e6IWQqBuvW9DIoG72rackUixnuSNdXRYbC2zSg=s512"
                          alt="Truecaller"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white text-sm group-hover:text-blue-400">Truecaller: Caller ID & Block</h3>
                        <p className="text-xs text-gray-400">Communication</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs text-white">4.4</span>
                          <HiOutlineStar className="w-3 h-3 text-white fill-current" />
                        </div>
                      </div>
                    </div>
                  </a>

                  {/* PhonePe */}
                  <a
                    href="https://www.phonepe.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 transition-all group"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg ring-1 ring-white/20">
                        <img
                          src="https://play-lh.googleusercontent.com/zjeY6g7sVb33qgw5DhdiTK7PDpEP2bml8EG78E3seqAOpqGtHd-QCxiXIi1UaapFahzi=s512"
                          alt="PhonePe"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white text-sm group-hover:text-blue-400">PhonePe: UPI, Recharge & Bills</h3>
                        <p className="text-xs text-gray-400">Finance</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs text-white">4.3</span>
                          <HiOutlineStar className="w-3 h-3 text-white fill-current" />
                        </div>
                      </div>
                    </div>
                  </a>

                  {/* Google Pay */}
                  <a
                    href="https://pay.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 transition-all group"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg ring-1 ring-white/20">
                        <img
                          src="https://play-lh.googleusercontent.com/oaiVWSRYgpBXe71Y6YKpn2dDiuAddqQVsaWG47ocOp70e2r6YxHVmPnTAFFvI3O524E=s512"
                          alt="Google Pay"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white text-sm group-hover:text-blue-400">Google Pay: Save, Pay, Manage</h3>
                        <p className="text-xs text-gray-400">Finance</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs text-white">4.2</span>
                          <HiOutlineStar className="w-3 h-3 text-white fill-current" />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-3 gap-20">
                  {/* Paytm */}
                  <a
                    href="https://paytm.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 transition-all group"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg ring-1 ring-white/20">
                        <img
                          src="https://play-lh.googleusercontent.com/YNxwUNwBOkzhtbJ0-UiMfSaLAFT9fDVYL7L2JQDCosBnb50Z9g2AFuOffBLwnYs_Gdw=s512"
                          alt="Paytm"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white text-sm group-hover:text-blue-400">Paytm: Secure UPI Payments</h3>
                        <p className="text-xs text-gray-400">Finance</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs text-white">4.1</span>
                          <HiOutlineStar className="w-3 h-3 text-white fill-current" />
                        </div>
                      </div>
                    </div>
                  </a>

                  {/* Amazon */}
                  <a
                    href="https://www.amazon.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 transition-all group"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg ring-1 ring-white/20">
                        <img
                          src="https://play-lh.googleusercontent.com/et2mBcPlX10BHjyvlUCf90wAPbdIuaB_o1JhI4q3wHXcEq8MwKfsOYwpRW7aG2iXr_K05LVq6_LqUsNUWUt9BhM=s512"
                          alt="Amazon"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white text-sm group-hover:text-blue-400">Amazon Shopping: Online Shop</h3>
                        <p className="text-xs text-gray-400">Shopping</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs text-white">4.3</span>
                          <HiOutlineStar className="w-3 h-3 text-white fill-current" />
                        </div>
                      </div>
                    </div>
                  </a>

                  {/* Flipkart */}
                  <a
                    href="https://www.flipkart.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 transition-all group"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg ring-1 ring-white/20">
                        <img
                          src="https://play-lh.googleusercontent.com/WyYlaMAxFNM39qOTX-rz0W2PzixHDzbZqQ2I_YXSF2U3mUOOVyZMjSyon4pHNVdlGIQ=s512"
                          alt="Flipkart"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white text-sm group-hover:text-blue-400">Flipkart Online Shopping App</h3>
                        <p className="text-xs text-gray-400">Shopping</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs text-white">4.4</span>
                          <HiOutlineStar className="w-3 h-3 text-white fill-current" />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-3 gap-20">
                  {/* Swiggy */}
                  <a
                    href="https://www.swiggy.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 transition-all group"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg ring-1 ring-white/20">
                        <img
                          src="https://play-lh.googleusercontent.com/dVQlfnQ_Fp-wNfKv2eI9XxbLymV6oGW_0ywIw3pxhYyKhjC0Lk8y6Ru_-sUc1fq2akADzAN7QWn8nPvcw6Ck=s512"
                          alt="Swiggy"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white text-sm group-hover:text-blue-400">Swiggy: Food Delivery & Dining</h3>
                        <p className="text-xs text-gray-400">Food & Drink</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs text-white">4.3</span>
                          <HiOutlineStar className="w-3 h-3 text-white fill-current" />
                        </div>
                      </div>
                    </div>
                  </a>

                  {/* Zomato */}
                  <a
                    href="https://www.zomato.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 transition-all group"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg ring-1 ring-white/20">
                        <img
                          src="https://play-lh.googleusercontent.com/_kVKkT2tpzYd1cCD6uOndMrOU6hKRG-Cg_JVoq81xySw6Z-qwmEjXX8djamC8sf5ILf32ij6zqOksx62HOND=s512"
                          alt="Zomato"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white text-sm group-hover:text-blue-400">Zomato: Food Delivery & Dining</h3>
                        <p className="text-xs text-gray-400">Food & Drink</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs text-white">4.2</span>
                          <HiOutlineStar className="w-3 h-3 text-white fill-current" />
                        </div>
                      </div>
                    </div>
                  </a>

                  {/* Uber */}
                  <a
                    href="https://www.uber.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 transition-all group"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg ring-1 ring-white/20">
                        <img
                          src="https://play-lh.googleusercontent.com/RKTQ5wMcBGFsggPYhbi1mNnQ-wOn_7eY1qznj-TEve72FrTCf5u0_80Yr7U_tznYpIU=s512"
                          alt="Uber"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white text-sm group-hover:text-blue-400">Uber: Request a Ride</h3>
                        <p className="text-xs text-gray-400">Travel & Local</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs text-white">4.1</span>
                          <HiOutlineStar className="w-3 h-3 text-white fill-current" />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Chevron Button - Visible on hover */}
              <button className="absolute -right-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center opacity-0 group-hover/featured:opacity-100 transition-opacity z-10">
                <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Search Results Grid */}
        {searchQuery && (
          <div className="grid grid-cols-20 gap-4 auto-rows-max">
            {allApps.filter((app: App) =>
              app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              app.category.toLowerCase().includes(searchQuery.toLowerCase())
            ).map((app: App) => (
              <a
                key={app.id}
                href={app.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-4 hover:bg-white/10 rounded-xl transition-all cursor-pointer group w-24 backdrop-blur-sm"
              >
                <div className="w-20 h-20 rounded-2xl overflow-hidden mb-3 shadow-lg group-hover:shadow-xl transition-shadow ring-1 ring-white/20">
                  <img
                    src={app.icon}
                    alt={app.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(app.name)}&background=random&size=128`;
                    }}
                  />
                </div>
                <h3 className="font-medium text-white text-sm text-center line-clamp-2 leading-tight group-hover:text-blue-400 transition-colors">
                  {app.name}
                </h3>
              </a>
            ))}
          </div>
        )}

        {/* No Results */}
        {searchQuery && allApps.filter((app: App) =>
          app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          app.category.toLowerCase().includes(searchQuery.toLowerCase())
        ).length === 0 && (
            <div className="text-center py-12 relative z-10">
              <div className="text-gray-400 mb-4">
                <HiOutlineMagnifyingGlass size={48} className="mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">No apps found</h3>
              <p className="text-gray-400">Try searching for something else</p>
            </div>
          )}
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 z-50 bg-black">
          {/* Back Button */}
          <button
            onClick={() => setShowVideo(false)}
            className="absolute top-4 left-4 z-[60] p-3 bg-black/50 hover:bg-black/70 rounded-full transition-colors backdrop-blur-sm"
          >
            <HiOutlineArrowLeft size={24} className="text-white" />
          </button>

          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/PmPrgy5933M?autoplay=1&controls=0&showinfo=0&rel=0&modestbranding=1&loop=1&playlist=PmPrgy5933M&iv_load_policy=3&disablekb=1&fs=0&vq=hd720"
            allow="autoplay; fullscreen"
            allowFullScreen
            style={{ pointerEvents: 'none' }}
          />
        </div>
      )}
    </div>
  );
}
