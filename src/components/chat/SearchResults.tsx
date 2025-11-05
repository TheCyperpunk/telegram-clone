'use client';

import { useState } from 'react';
import { HiXMark, HiMagnifyingGlass, HiGlobeAlt, HiPhoto, HiVideoCamera, HiNewspaper, HiMap, HiArrowLeft, HiArrowRight } from 'react-icons/hi2';
import Image from 'next/image';
import { SparklesCore } from '../ui/sparkles';

interface SearchResultsProps {
  searchQuery: string;
  onClose: () => void;
}

export default function SearchResults({ searchQuery, onClose }: SearchResultsProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'images' | 'videos' | 'news' | 'maps'>('all');
  const [activeSearchEngine, setActiveSearchEngine] = useState<'google' | 'bing' | 'yahoo' | 'duckduckgo'>('google');
  const [showVideo, setShowVideo] = useState(false);
  const [openTabs, setOpenTabs] = useState<Array<{id: string, name: string, url: string}>>([
    { id: 'google', name: 'Google', url: 'google.com' },
    { id: 'bing', name: 'Bing', url: 'bing.com' },
    { id: 'yahoo', name: 'Yahoo', url: 'yahoo.com' },
    { id: 'duckduckgo', name: 'DuckDuckGo', url: 'duckduckgo.com' }
  ]);

  const handleCloseTab = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newTabs = openTabs.filter(tab => tab.id !== tabId);
    setOpenTabs(newTabs);
    if (activeSearchEngine === tabId && newTabs.length > 0) {
      setActiveSearchEngine(newTabs[0].id as any);
    }
  };

  // Mock search results data
  const searchResults = {
    mainInfo: {
      title: searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1),
      subtitle: 'Indian state',
      description: `${searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1)} is a state on the Malabar Coast of India. It was formed on 1 November 1956 under the States Reorganisation Act, which unified the country's Malayalam-speaking regions into a single state.`,
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&auto=format&fit=crop&q=60',
      stats: [
        { label: 'Capital', value: 'Thiruvananthapuram' },
        { label: 'Population', value: '33.4 million' },
        { label: 'Area', value: '38,852 km²' },
        { label: 'Formation', value: '1 November 1956' },
        { label: 'Elevation', value: '900 m (3,000 ft)' },
        { label: 'Official Language', value: 'Malayalam' }
      ]
    },
    quickLinks: [
      { name: 'Tourism', icon: '🏖️' },
      { name: 'Geography', icon: '🗺️' },
      { name: 'Economy', icon: '💼' },
      { name: 'Culture', icon: '🎭' },
      { name: 'History', icon: '📜' },
      { name: 'Education', icon: '🎓' }
    ],
    thingsToDo: [
      { title: 'Backwater Tours', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=300&auto=format&fit=crop&q=60', description: 'Experience the serene backwaters' },
      { title: 'Beach Resorts', image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=300&auto=format&fit=crop&q=60', description: 'Relax at pristine beaches' },
      { title: 'Hill Stations', image: 'https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=300&auto=format&fit=crop&q=60', description: 'Visit scenic hill stations' },
      { title: 'Wildlife Safari', image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=300&auto=format&fit=crop&q=60', description: 'Explore wildlife sanctuaries' },
      { title: 'Ayurvedic Spa', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=300&auto=format&fit=crop&q=60', description: 'Traditional wellness treatments' },
      { title: 'Houseboat Stay', image: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=300&auto=format&fit=crop&q=60', description: 'Overnight in luxury houseboats' },
      { title: 'Spice Plantations', image: 'https://images.unsplash.com/photo-1596040033229-a0b3b3f87333?w=300&auto=format&fit=crop&q=60', description: 'Tour aromatic spice gardens' },
      { title: 'Kathakali Dance', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=300&auto=format&fit=crop&q=60', description: 'Watch traditional performances' }
    ],
    peopleAlsoAsk: [
      { question: 'What is special about Kerala?', answer: 'Kerala is known for its palm-lined beaches, backwaters, hill stations, and Ayurvedic treatments.' },
      { question: 'What is the best time to visit Kerala?', answer: 'October to March is the best time to visit Kerala when the weather is pleasant.' },
      { question: 'What language is spoken in Kerala?', answer: 'Malayalam is the official language of Kerala.' },
      { question: 'What is Kerala famous for?', answer: 'Kerala is famous for its backwaters, houseboats, beaches, Ayurveda, spices, and coconut trees.' },
      { question: 'How many days are enough for Kerala?', answer: 'A 7-10 day trip is ideal to explore the major attractions of Kerala including backwaters, hill stations, and beaches.' },
      { question: 'What is the main food of Kerala?', answer: 'Rice is the staple food. Popular dishes include appam, puttu, fish curry, and sadya (traditional feast).' }
    ],
    nearbyPlaces: [
      { name: 'Tamil Nadu', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=200&auto=format&fit=crop&q=60' },
      { name: 'Karnataka', image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=200&auto=format&fit=crop&q=60' },
      { name: 'Goa', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=200&auto=format&fit=crop&q=60' },
      { name: 'Lakshadweep', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=200&auto=format&fit=crop&q=60' }
    ],
    webResults: [
      {
        title: `${searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1)} Tourism`,
        url: 'www.keralatourism.org',
        description: `Welcome to ${searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1)} Tourism - Official Website. Explore panoramic views, snake boat races, religious heritage, coastal beauty, historic forts, culinary wonders, and wellness retreats.`
      },
      {
        title: `${searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1)} - Wikipedia`,
        url: 'en.wikipedia.org › wiki › Kerala',
        description: `${searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1)} is the 13th-most populous state in India. It is divided into 14 districts, with Thiruvananthapuram as the capital.`
      },
      {
        title: `Things to do in ${searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1)}`,
        url: 'www.tripadvisor.com',
        description: `Top attractions in ${searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1)} include backwaters, beaches, hill stations, wildlife sanctuaries, and cultural experiences.`
      },
      {
        title: `Best Places to Visit in ${searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1)} - Lonely Planet`,
        url: 'www.lonelyplanet.com › india › kerala',
        description: `Discover the best places to visit in ${searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1)}, from the tranquil backwaters of Alleppey to the tea plantations of Munnar and the beaches of Kovalam.`
      },
      {
        title: `${searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1)} Travel Guide - National Geographic`,
        url: 'www.nationalgeographic.com › travel › kerala',
        description: `Explore ${searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1)}'s rich biodiversity, traditional art forms, and sustainable tourism practices. Learn about the state's unique ecosystem and cultural heritage.`
      },
      {
        title: `${searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1)} Backwaters - Complete Guide`,
        url: 'www.incredibleindia.org › kerala-backwaters',
        description: `Experience the enchanting backwaters of ${searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1)}. Book houseboat cruises, explore village life, and witness stunning sunsets over the waterways.`
      },
      {
        title: `Ayurveda in ${searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1)} - Wellness Tourism`,
        url: 'www.ayurvedakerala.com',
        description: `Discover authentic Ayurvedic treatments and wellness retreats in ${searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1)}. Traditional therapies, yoga, and meditation in serene natural settings.`
      },
      {
        title: `${searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1)} Cuisine - Food Guide`,
        url: 'www.foodandtravel.com › kerala-cuisine',
        description: `Explore the flavors of ${searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1)} cuisine. From spicy fish curries to coconut-based dishes, discover the state's culinary traditions and famous sadya feast.`
      }
    ],
    images: [
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=300&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=300&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=300&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=300&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=300&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=300&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1596040033229-a0b3b3f87333?w=300&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=300&auto=format&fit=crop&q=60'
    ],
    relatedSearches: [
      `${searchQuery} tourism`,
      `${searchQuery} map`,
      `${searchQuery} weather`,
      `${searchQuery} backwaters`,
      `${searchQuery} beaches`,
      `${searchQuery} culture`,
      `${searchQuery} houseboats`,
      `${searchQuery} ayurveda`,
      `${searchQuery} food`,
      `${searchQuery} festivals`,
      `${searchQuery} hill stations`,
      `${searchQuery} wildlife`
    ]
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 h-full flex flex-col relative overflow-hidden">
      {/* Sparkles Background */}
      <div className="absolute inset-0 z-0">
        <SparklesCore
          background="transparent"
          minSize={0.3}
          maxSize={1.5}
          particleDensity={1500}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40"></div>
      </div>

      {/* Modern Header */}
      <div className="relative z-10 bg-black/40 backdrop-blur-xl">
        {/* Browser Tabs */}
        <div className="flex items-center gap-1 px-4 pt-3">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200 group mr-2"
          >
            <HiArrowLeft size={18} className="text-gray-400 group-hover:text-white transition-colors" />
          </button>
          
          {/* Search Engine Tabs */}
          <div className="flex items-center gap-1 flex-1 overflow-x-auto scrollbar-hide">
            {openTabs.map((tab) => (
              <div
                key={tab.id}
                className={`group flex items-center gap-2 px-3 py-1.5 rounded-t-xl text-xs transition-all duration-200 min-w-fit cursor-pointer ${
                  activeSearchEngine === tab.id
                    ? 'bg-white/10 text-white'
                    : 'bg-transparent text-gray-400 hover:bg-white/5 hover:text-gray-300'
                }`}
              >
                <div 
                  onClick={() => setActiveSearchEngine(tab.id as any)}
                  className="flex flex-col items-start leading-tight flex-1"
                >
                  <span className="font-medium text-[11px]">{tab.name}</span>
                  <span className="text-[9px] text-gray-500">{tab.url}</span>
                </div>
                <button
                  onClick={(e) => handleCloseTab(tab.id, e)}
                  className="p-0.5 hover:bg-white/20 rounded transition-colors"
                >
                  <HiXMark size={11} className="text-gray-400 group-hover:text-white" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Curvy Search Bar */}
        <div className="px-6 py-3">
          <div className="flex items-center gap-3 bg-[#1a1a1a] rounded-full px-5 py-2.5 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:bg-[#202020]">
            <HiMagnifyingGlass size={20} className="text-gray-400 flex-shrink-0" />
            <input 
              type="text" 
              value={searchQuery}
              readOnly
              className="flex-1 outline-none text-sm text-white bg-transparent placeholder-gray-500 font-normal"
              placeholder="Type your search here..."
            />
          </div>
        </div>

        {/* Content Tabs */}
        <div className="px-6 pb-4">
          <div className="flex items-center gap-2 text-sm">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-200 ${
                activeTab === 'all' 
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg shadow-purple-500/50' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <HiGlobeAlt size={16} />
              All
            </button>
            <button
              onClick={() => setActiveTab('images')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-200 ${
                activeTab === 'images' 
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg shadow-purple-500/50' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <HiPhoto size={16} />
              Images
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-200 ${
                activeTab === 'videos' 
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg shadow-purple-500/50' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <HiVideoCamera size={16} />
              Videos
            </button>
            <button
              onClick={() => setActiveTab('news')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-200 ${
                activeTab === 'news' 
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg shadow-purple-500/50' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <HiNewspaper size={16} />
              News
            </button>
            <button
              onClick={() => setActiveTab('maps')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-200 ${
                activeTab === 'maps' 
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg shadow-purple-500/50' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <HiMap size={16} />
              Maps
            </button>

            {/* Profile Button */}
            <button
              onClick={() => setShowVideo(true)}
              className="ml-auto w-12 h-12 rounded-full overflow-hidden border-2 border-white/20 hover:border-purple-500 transition-all duration-200 flex-shrink-0"
            >
              <img 
                src="https://raw.githubusercontent.com/TheCyperpunk/littilelilly-photos/main/Screenshot%202025-10-18%20174437.png"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </button>

            {/* AI Assistant Button */}
            <button
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-700 transition-all duration-200 shadow-lg shadow-purple-500/50"
            >
              AI Assistant
            </button>
          </div>
        </div>
      </div>

      {/* Search Results Content */}
      <div className="flex-1 overflow-y-auto relative z-10 scrollbar-hide">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <p className="text-xs text-gray-400 mb-8 font-medium">About 1,740,000 results</p>

          {activeTab === 'all' && (
            <>
              {/* App Suggestions */}
              <div className="mb-8 relative">
                <div className="grid grid-cols-5 grid-flow-col gap-2 pb-2">
                  {/* Zomato */}
                  <a 
                    href="https://www.zomato.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 min-w-[70px] group cursor-pointer"
                  >
                    <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-lg group-hover:scale-110 transition-transform duration-200">
                      <img src="https://play-lh.googleusercontent.com/WncVeFt-RwuI7ZYN0jfFgCMTQEAvDoXMua7Fr5Tcay-oyjUjdIUAexr9IF1i6efYPg=s512" alt="Zomato" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xs text-gray-300 text-center group-hover:text-white transition-colors">Zomato</span>
                  </a>

                  {/* Uber */}
                  <a 
                    href="https://www.uber.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 min-w-[70px] group cursor-pointer"
                  >
                    <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-lg group-hover:scale-110 transition-transform duration-200">
                      <img src="https://play-lh.googleusercontent.com/VYvJqGnrQiKkbbyLyMeiL-GM3go4tBIA64uVEGQazLXD4p_M3F45kHyt42o_6d5VXA=s512" alt="Uber" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xs text-gray-300 text-center group-hover:text-white transition-colors">Uber</span>
                  </a>

                  {/* MakeMyTrip */}
                  <a 
                    href="https://www.makemytrip.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 min-w-[70px] group cursor-pointer"
                  >
                    <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-lg group-hover:scale-110 transition-transform duration-200">
                      <img src="https://play-lh.googleusercontent.com/Nz5sdWyh7jn4eTy_GSaRBDgaKhLC1pvYywC6fklDOlPGbopmeFN9NkqgKGjsvJMbKVEI=s512" alt="MakeMyTrip" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xs text-gray-300 text-center group-hover:text-white transition-colors">MakeMyTrip</span>
                  </a>

                  {/* Goibibo */}
                  <a 
                    href="https://www.goibibo.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 min-w-[70px] group cursor-pointer"
                  >
                    <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-lg group-hover:scale-110 transition-transform duration-200">
                      <img src="https://play-lh.googleusercontent.com/u9LTV4Jq-sv22KUmIbRLtlbb-bT1dUvBLMCjxQsvsJVQEgRKdr1YWVOGTXNGlri_cO6q=s512" alt="Goibibo" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xs text-gray-300 text-center group-hover:text-white transition-colors">Goibibo</span>
                  </a>

                  {/* Ola */}
                  <a 
                    href="https://www.olacabs.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 min-w-[70px] group cursor-pointer"
                  >
                    <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-lg group-hover:scale-110 transition-transform duration-200">
                      <img src="https://play-lh.googleusercontent.com/KCMTYuiTrKom4Vyf0G4foetVOwhKWzNbHWumV73IXexAIy5TTgZipL52WTt8ICL-oIo=s512" alt="Ola" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xs text-gray-300 text-center group-hover:text-white transition-colors">Ola</span>
                  </a>

                  {/* Swiggy */}
                  <a 
                    href="https://www.swiggy.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 min-w-[70px] group cursor-pointer"
                  >
                    <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-lg group-hover:scale-110 transition-transform duration-200">
                      <img src="https://play-lh.googleusercontent.com/GguSSKNcZdGw624xa9VqH71Sy6B12bHdlINY0RN_CltpzE51NgdFWkxesZuI4joVDrM=s512" alt="Swiggy" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xs text-gray-300 text-center group-hover:text-white transition-colors">Swiggy</span>
                  </a>

                  {/* Uber Eats */}
                  <a 
                    href="https://www.ubereats.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 min-w-[70px] group cursor-pointer"
                  >
                    <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-lg group-hover:scale-110 transition-transform duration-200">
                      <img src="https://play-lh.googleusercontent.com/HJdzprqlCwh_8YNyhMBU6rIaGBGwxHXflZuuqI3iR4US7Jb-bSYiJk_DKV2la9SoBM0K=s512" alt="Uber Eats" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xs text-gray-300 text-center group-hover:text-white transition-colors">Uber Eats</span>
                  </a>

                  {/* TripAdvisor */}
                  <a 
                    href="https://www.tripadvisor.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 min-w-[70px] group cursor-pointer"
                  >
                    <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-lg group-hover:scale-110 transition-transform duration-200">
                      <img src="https://play-lh.googleusercontent.com/DDfeXsEfDPgnOdvwHT_zm4LEcXKUPpQyRkeZUl2APC9rJqX3efpgLDZDd6kQeo4c0ao=s512" alt="TripAdvisor" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xs text-gray-300 text-center group-hover:text-white transition-colors">TripAdvisor</span>
                  </a>

                  {/* Practo */}
                  <a 
                    href="https://www.practo.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 min-w-[70px] group cursor-pointer"
                  >
                    <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-lg group-hover:scale-110 transition-transform duration-200">
                      <img src="https://play-lh.googleusercontent.com/KqeKUXHP336vQkJIhdulZRh4V2IO5hoqak-NBd6Etj3-UjlnKz9unx8Z7XpVlXEMEZs=s512" alt="Practo" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xs text-gray-300 text-center group-hover:text-white transition-colors">Practo</span>
                  </a>

                  {/* 1mg */}
                  <a 
                    href="https://www.1mg.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 min-w-[70px] group cursor-pointer"
                  >
                    <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-lg group-hover:scale-110 transition-transform duration-200">
                      <img src="https://play-lh.googleusercontent.com/aMq-CBYJwX9-gFOhJVdcn8mLk2GI720vjfstdCKk2zuAS6K7b2Qeelb2eJRv-ybwCMo=s512" alt="1mg" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xs text-gray-300 text-center group-hover:text-white transition-colors">1mg</span>
                  </a>

                  {/* PharmEasy */}
                  <a 
                    href="https://pharmeasy.in/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 min-w-[70px] group cursor-pointer"
                  >
                    <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-lg group-hover:scale-110 transition-transform duration-200">
                      <img src="https://play-lh.googleusercontent.com/bp4jknyVZ8yDKhER9thIS1p9MBeU2LABqBX-sO8uaL1h5_keqlgMUmXv-CjfRWaqKw=s512" alt="PharmEasy" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xs text-gray-300 text-center group-hover:text-white transition-colors">PharmEasy</span>
                  </a>

                  {/* Meesho */}
                  <a 
                    href="https://www.meesho.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 min-w-[70px] group cursor-pointer"
                  >
                    <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-lg group-hover:scale-110 transition-transform duration-200">
                      <img src="https://play-lh.googleusercontent.com/YCYtU9DwQDIX1QbDDqF8sQU1CKlWABF-Sbtr3qH_9z9MJ495HsXNe4KkfxFycK9FyAI=s512" alt="Meesho" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xs text-gray-300 text-center group-hover:text-white transition-colors">Meesho</span>
                  </a>

                  {/* Apollo 24|7 */}
                  <a 
                    href="https://www.apollo247.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 min-w-[70px] group cursor-pointer"
                  >
                    <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-lg group-hover:scale-110 transition-transform duration-200">
                      <img src="https://play-lh.googleusercontent.com/K6L_Ixmw0J9oTktAoHyEHvzQIfxEF1CIQ5aE0WHhdUeOgfAmn7KLhe47Q5XxZaXQ0g=s512" alt="Apollo 24|7" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xs text-gray-300 text-center group-hover:text-white transition-colors">Apollo 24|7</span>
                  </a>

                  {/* All Button */}
                  <button 
                    className="flex flex-col items-center gap-2 min-w-[70px] group cursor-pointer"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-gray-800/50 border border-gray-700 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-gray-700/50 transition-all duration-200">
                      <span className="text-white text-xl font-semibold">•••</span>
                    </div>
                    <span className="text-xs text-gray-300 text-center group-hover:text-white transition-colors">All</span>
                  </button>
                </div>
              </div>

              {/* AI Generated Overview */}
              <div className="bg-gradient-to-br from-gray-900/90 to-black/80 backdrop-blur-xl rounded-2xl p-8 mb-8 shadow-2xl">
                {/* AI Label */}
                <div className="mb-4">
                  <span className="text-purple-400 text-sm font-medium">AI</span>
                </div>

                {/* AI Description */}
                <div className="mb-6">
                  <p className="text-white text-base leading-relaxed mb-6">
                    Kerala is a state located on the <span className="font-semibold">southwestern coast of India</span>, known for its unique culture, high social development indicators, and stunning natural beauty, earning it the nickname <span className="font-semibold">&quot;God&apos;s Own Country&quot;</span>. Thiruvananthapuram is its capital city.
                  </p>
                </div>

                {/* Key Aspects Section */}
                <div className="space-y-4 mb-6">
                  <h3 className="text-white text-xl font-bold mb-4">Key Aspects</h3>
                  
                  {/* Geography */}
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <span className="text-white font-semibold text-sm mt-0.5">•</span>
                      <div>
                        <span className="text-white font-semibold text-sm">Geography:</span>
                        <span className="text-gray-300 text-sm ml-1">
                          Kerala is a narrow strip of land bordered by the Laccadive Sea (Arabian Sea) to the west and the Western Ghats mountain range to the east. The diverse landscape includes coastal plains, a network of serene backwaters (canals and lakes), and lush hills with tea, coffee, and spice plantations.
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Culture and History */}
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <span className="text-white font-semibold text-sm mt-0.5">•</span>
                      <div>
                        <span className="text-white font-semibold text-sm">Culture and History:</span>
                        <span className="text-gray-300 text-sm ml-1">
                          The region has a rich history as the &quot;Spice Coast of India,&quot; which attracted traders from around the world for centuries. Kerala&apos;s culture is a vibrant blend of traditions, including classical dance forms like Kathakali and Mohiniyattam, ancient martial arts like Kalaripayattu, and a strong literary heritage in the Malayalam language.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* More Button */}
                <div className="flex justify-end">
                  <button 
                    onClick={() => window.open('https://chatgpt.com/', '_blank')}
                    className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors group"
                  >
                    <span>more</span>
                    <HiArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Main Info Card */}
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 mb-8 shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 group">
                <div className="flex gap-8">
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">{searchResults.mainInfo.title}</h2>
                    <p className="text-sm text-purple-400 mb-4 font-medium">{searchResults.mainInfo.subtitle}</p>
                    <p className="text-sm text-gray-300 leading-relaxed mb-6">{searchResults.mainInfo.description}</p>
                    
                    <div className="grid grid-cols-3 gap-4">
                      {searchResults.mainInfo.stats.map((stat, index) => (
                        <div key={index} className="bg-white/5 rounded-xl p-3 hover:bg-white/10 transition-all duration-200">
                          <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
                          <p className="text-sm font-semibold text-white">{stat.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="w-72 h-56 relative rounded-2xl overflow-hidden flex-shrink-0 shadow-2xl group-hover:shadow-purple-500/50 transition-all duration-300">
                    <Image
                      src={searchResults.mainInfo.image}
                      alt={searchResults.mainInfo.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="mb-8">
                <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {searchResults.quickLinks.map((link, index) => (
                    <button
                      key={index}
                      className="flex items-center gap-2 px-5 py-3 bg-white/5 hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-600 rounded-xl text-sm text-gray-300 hover:text-white transition-all duration-300 backdrop-blur-md shadow-lg hover:shadow-purple-500/50 whitespace-nowrap"
                    >
                      <span className="text-lg">{link.icon}</span>
                      {link.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Images Section */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <HiPhoto className="text-purple-400" />
                  Images of {searchQuery}
                </h3>
                <div className="grid grid-cols-4 gap-3">
                  {searchResults.images.map((image, index) => (
                    <div key={index} className="aspect-video relative rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-purple-500/50">
                      <Image
                        src={image}
                        alt={`${searchQuery} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Things to Do */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4">Things to do in {searchQuery}</h3>
                <div className="grid grid-cols-4 gap-4">
                  {searchResults.thingsToDo.map((thing, index) => (
                    <div key={index} className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-purple-500/30">
                      <div className="aspect-video relative">
                        <Image
                          src={thing.image}
                          alt={thing.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-white mb-1 group-hover:text-purple-300 transition-colors">{thing.title}</h4>
                        <p className="text-xs text-gray-400">{thing.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* People Also Ask */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4">People also ask</h3>
                <div className="space-y-3">
                  {searchResults.peopleAlsoAsk.map((item, index) => (
                    <div key={index} className="bg-white/5 backdrop-blur-md rounded-2xl p-5 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
                      <h4 className="font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">{item.question}</h4>
                      <p className="text-sm text-gray-400">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Web Results */}
              <div className="space-y-4 mb-8">
                {searchResults.webResults.map((result, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-md p-5 rounded-2xl hover:bg-white/10 transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-purple-500/30">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                        <HiGlobeAlt size={16} className="text-white" />
                      </div>
                      <p className="text-xs text-gray-400 group-hover:text-purple-400 transition-colors">{result.url}</p>
                    </div>
                    <h3 className="text-lg font-semibold text-purple-400 group-hover:text-purple-300 mb-2 transition-colors">{result.title}</h3>
                    <p className="text-sm text-gray-300 leading-relaxed">{result.description}</p>
                  </div>
                ))}
              </div>

              {/* Nearby Places */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4">People also search for</h3>
                <div className="grid grid-cols-4 gap-4">
                  {searchResults.nearbyPlaces.map((place, index) => (
                    <div key={index} className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-purple-500/30">
                      <div className="aspect-square relative">
                        <Image
                          src={place.image}
                          alt={place.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-3 text-center">
                        <h4 className="font-semibold text-white group-hover:text-purple-300 transition-colors">{place.name}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Searches */}
              <div className="mt-10 pt-8">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <HiMagnifyingGlass className="text-purple-400" />
                  Related searches
                </h3>
                <div className="flex flex-wrap gap-3">
                  {searchResults.relatedSearches.map((search, index) => (
                    <button
                      key={index}
                      className="px-5 py-2.5 bg-gradient-to-r from-white/10 to-white/5 hover:from-purple-500 hover:to-indigo-600 hover:shadow-purple-500/50 rounded-full text-sm text-gray-300 hover:text-white transition-all duration-300 backdrop-blur-md shadow-lg"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'images' && (
            <div className="grid grid-cols-4 gap-4">
              {[...searchResults.images, ...searchResults.images, ...searchResults.images].map((image, index) => (
                <div key={index} className="aspect-square relative rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer group shadow-xl hover:shadow-purple-500/50">
                  <Image
                    src={image}
                    alt={`${searchQuery} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white text-sm font-medium">Image {index + 1}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {(activeTab === 'videos' || activeTab === 'news' || activeTab === 'maps') && (
            <div className="text-center py-20">
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-12 max-w-md mx-auto shadow-2xl">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-purple-500/50">
                  {activeTab === 'videos' && <HiVideoCamera size={36} className="text-white" />}
                  {activeTab === 'news' && <HiNewspaper size={36} className="text-white" />}
                  {activeTab === 'maps' && <HiMap size={36} className="text-white" />}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Coming Soon</h3>
                <p className="text-gray-400">Results for {activeTab} will be displayed here</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 z-50 bg-black">
          {/* Back Button */}
          <button
            onClick={() => setShowVideo(false)}
            className="absolute top-4 left-4 z-[60] p-3 bg-black/50 hover:bg-black/70 rounded-full transition-colors backdrop-blur-sm"
          >
            <HiArrowLeft size={24} className="text-white" />
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

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
