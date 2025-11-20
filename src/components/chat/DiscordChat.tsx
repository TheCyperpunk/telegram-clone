'use client';

import React, { useState } from 'react';
import { FiHash, FiVolume2, FiSettings, FiSearch, FiAtSign, FiInbox, FiHelpCircle, FiSmile, FiPlus, FiPaperclip, FiMic, FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { HiHashtag, HiSpeakerWave } from 'react-icons/hi2';

interface DiscordChatProps {
    groupName: string;
    onBack: () => void;
}

interface Channel {
    id: string;
    name: string;
    type: 'text' | 'voice';
    category: string;
}

interface Message {
    id: string;
    author: string;
    avatar: string;
    content: string;
    timestamp: string;
    role?: string;
}

const channels: Channel[] = [
    { id: '1', name: 'general', type: 'text', category: 'TEXT CHANNELS' },
    { id: '2', name: 'strategy', type: 'text', category: 'TEXT CHANNELS' },
    { id: '3', name: 'tactics', type: 'text', category: 'TEXT CHANNELS' },
    { id: '4', name: 'philosophy', type: 'text', category: 'TEXT CHANNELS' },
    { id: '5', name: 'training', type: 'text', category: 'TEXT CHANNELS' },
    { id: '6', name: 'resources', type: 'text', category: 'TEXT CHANNELS' },
    { id: '7', name: 'announcements', type: 'text', category: 'TEXT CHANNELS' },
    { id: '8', name: 'General Voice', type: 'voice', category: 'VOICE CHANNELS' },
    { id: '9', name: 'Strategy Room', type: 'voice', category: 'VOICE CHANNELS' },
    { id: '10', name: 'Training Dojo', type: 'voice', category: 'VOICE CHANNELS' },
    { id: '11', name: 'Meditation Hall', type: 'voice', category: 'VOICE CHANNELS' },
];

const members = [
    { id: '1', name: 'Admin', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60', status: 'online', role: 'Admin' },
    { id: '2', name: 'Warrior_01', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60', status: 'online', role: 'Member' },
    { id: '3', name: 'Strategist', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60', status: 'online', role: 'Member' },
    { id: '4', name: 'Samurai_Master', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=60', status: 'online', role: 'Moderator' },
    { id: '5', name: 'Ninja_Shadow', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60', status: 'idle', role: 'Member' },
    { id: '6', name: 'Ronin_Blade', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=60', status: 'online', role: 'Member' },
    { id: '7', name: 'Zen_Master', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=60', status: 'online', role: 'Moderator' },
    { id: '8', name: 'Katana_Knight', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=60', status: 'idle', role: 'Member' },
    { id: '9', name: 'Shogun_Commander', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=60', status: 'online', role: 'Member' },
    { id: '10', name: 'Bushido_Warrior', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=60', status: 'online', role: 'Member' },
    { id: '11', name: 'Silent_Assassin', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=60', status: 'offline', role: 'Member' },
    { id: '12', name: 'Dragon_Slayer', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60', status: 'idle', role: 'Member' },
    { id: '13', name: 'Honor_Guard', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60', status: 'offline', role: 'Member' },
    { id: '14', name: 'Swift_Strike', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60', status: 'online', role: 'Member' },
    { id: '15', name: 'Iron_Will', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=60', status: 'offline', role: 'Member' },
];

const sampleMessages: Message[] = [
    {
        id: '1',
        author: 'Admin',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60',
        content: 'Welcome to the samurai group! 🗡️',
        timestamp: '09:32 AM',
        role: 'Admin'
    },
    {
        id: '2',
        author: 'Admin',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60',
        content: 'This is a place for warriors and strategists to discuss tactics and philosophy.',
        timestamp: '09:33 AM',
        role: 'Admin'
    },
    {
        id: '3',
        author: 'Samurai_Master',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=60',
        content: 'The way of the warrior is found in death. Meditation on inevitable death should be performed daily.',
        timestamp: '09:35 AM',
        role: 'Moderator'
    },
    {
        id: '4',
        author: 'Zen_Master',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=60',
        content: 'True strength comes from within. A calm mind is sharper than any blade.',
        timestamp: '09:37 AM',
        role: 'Moderator'
    },
    {
        id: '5',
        author: 'Warrior_01',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60',
        content: 'I\'ve been studying the art of Iaido. The precision required is incredible!',
        timestamp: '09:40 AM'
    },
    {
        id: '6',
        author: 'Strategist',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60',
        content: 'Has anyone read "The Book of Five Rings" by Miyamoto Musashi? Essential reading for strategy.',
        timestamp: '09:42 AM'
    },
    {
        id: '7',
        author: 'Ronin_Blade',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=60',
        content: 'Yes! The Water Book chapter is my favorite. "Think lightly of yourself and deeply of the world."',
        timestamp: '09:44 AM'
    },
    {
        id: '8',
        author: 'Shogun_Commander',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=60',
        content: 'Training session tonight at 8 PM in the Training Dojo voice channel. Who\'s in?',
        timestamp: '09:46 AM'
    },
    {
        id: '9',
        author: 'Bushido_Warrior',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=60',
        content: 'Count me in! 🥋',
        timestamp: '09:47 AM'
    },
    {
        id: '10',
        author: 'Swift_Strike',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60',
        content: 'I\'ll be there. Been working on my kata forms.',
        timestamp: '09:48 AM'
    },
    {
        id: '11',
        author: 'Ninja_Shadow',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60',
        content: 'The seven virtues of Bushido: Integrity, Respect, Courage, Honor, Compassion, Honesty, and Loyalty.',
        timestamp: '09:50 AM'
    },
    {
        id: '12',
        author: 'Katana_Knight',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=60',
        content: 'Just finished sharpening my training sword. The discipline required is meditative.',
        timestamp: '09:52 AM'
    },
    {
        id: '13',
        author: 'You',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60',
        content: 'Looking forward to great discussions here!',
        timestamp: '09:54 AM'
    },
    {
        id: '14',
        author: 'Samurai_Master',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=60',
        content: 'Welcome! Feel free to share your thoughts and experiences. We grow stronger together.',
        timestamp: '09:55 AM',
        role: 'Moderator'
    },
];

export default function DiscordChat({ groupName, onBack }: DiscordChatProps) {
    const [selectedChannel, setSelectedChannel] = useState('general');
    const [messages, setMessages] = useState<Message[]>(sampleMessages);
    const [messageInput, setMessageInput] = useState('');
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['TEXT CHANNELS', 'VOICE CHANNELS']));

    const toggleCategory = (category: string) => {
        const newExpanded = new Set(expandedCategories);
        if (newExpanded.has(category)) {
            newExpanded.delete(category);
        } else {
            newExpanded.add(category);
        }
        setExpandedCategories(newExpanded);
    };

    const handleSendMessage = () => {
        if (messageInput.trim()) {
            const newMessage: Message = {
                id: Date.now().toString(),
                author: 'You',
                avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60',
                content: messageInput,
                timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
            };
            setMessages([...messages, newMessage]);
            setMessageInput('');
        }
    };

    const groupedChannels = channels.reduce((acc, channel) => {
        if (!acc[channel.category]) {
            acc[channel.category] = [];
        }
        acc[channel.category].push(channel);
        return acc;
    }, {} as Record<string, Channel[]>);

    return (
        <div className="flex h-full bg-[#36393f] text-gray-100">
            {/* Server/Channel Sidebar */}
            <div className="w-60 bg-[#2f3136] flex flex-col">
                {/* Server Header */}
                <div className="h-12 px-4 flex items-center justify-between border-b border-black/20 shadow-md cursor-pointer hover:bg-[#34373c]">
                    <h2 className="font-semibold text-white">{groupName}</h2>
                    <FiChevronDown size={18} className="text-gray-400" />
                </div>

                {/* Channels List */}
                <div className="flex-1 overflow-y-auto pt-4">
                    {Object.entries(groupedChannels).map(([category, categoryChannels]) => (
                        <div key={category} className="mb-2">
                            {/* Category Header */}
                            <div
                                className="px-2 py-1 flex items-center justify-between cursor-pointer hover:text-gray-200 text-xs font-semibold text-gray-400 uppercase tracking-wide"
                                onClick={() => toggleCategory(category)}
                            >
                                <div className="flex items-center gap-1">
                                    {expandedCategories.has(category) ? (
                                        <FiChevronDown size={12} />
                                    ) : (
                                        <FiChevronRight size={12} />
                                    )}
                                    <span>{category}</span>
                                </div>
                            </div>

                            {/* Channels */}
                            {expandedCategories.has(category) && (
                                <div className="mt-1">
                                    {categoryChannels.map((channel) => (
                                        <div
                                            key={channel.id}
                                            onClick={() => setSelectedChannel(channel.name)}
                                            className={`px-2 py-1.5 mx-2 rounded flex items-center gap-2 cursor-pointer transition-colors ${selectedChannel === channel.name
                                                ? 'bg-[#42464d] text-white'
                                                : 'text-gray-400 hover:bg-[#3a3d44] hover:text-gray-200'
                                                }`}
                                        >
                                            {channel.type === 'text' ? (
                                                <FiHash size={20} className="text-gray-400" />
                                            ) : (
                                                <FiVolume2 size={20} className="text-gray-400" />
                                            )}
                                            <span className="text-sm font-medium">{channel.name}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* User Profile Bar */}
                <div className="h-14 bg-[#292b2f] px-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60"
                                alt="User"
                                className="w-8 h-8 rounded-full"
                            />
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#292b2f]"></div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold text-white">You</span>
                            <span className="text-xs text-gray-400">#0001</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-1 hover:bg-[#3a3d44] rounded">
                            <FiMic size={18} className="text-gray-400 hover:text-gray-200" />
                        </button>
                        <button className="p-1 hover:bg-[#3a3d44] rounded">
                            <FiSettings size={18} className="text-gray-400 hover:text-gray-200" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col">
                {/* Channel Header */}
                <div className="h-12 px-4 flex items-center justify-between border-b border-black/20 shadow-md bg-[#36393f]">
                    <div className="flex items-center gap-2">
                        <FiHash size={24} className="text-gray-400" />
                        <span className="font-semibold text-white">{selectedChannel}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-1 hover:bg-[#3a3d44] rounded">
                            <FiInbox size={20} className="text-gray-400 hover:text-gray-200" />
                        </button>
                        <button className="p-1 hover:bg-[#3a3d44] rounded">
                            <FiSearch size={20} className="text-gray-400 hover:text-gray-200" />
                        </button>
                        <button className="p-1 hover:bg-[#3a3d44] rounded" onClick={onBack}>
                            <FiHelpCircle size={20} className="text-gray-400 hover:text-gray-200" />
                        </button>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                    {messages.map((message, index) => {
                        const showAvatar = index === 0 || messages[index - 1].author !== message.author;

                        return (
                            <div key={message.id} className={`flex gap-4 ${showAvatar ? 'mt-4' : 'mt-0.5'} hover:bg-[#32353b] px-2 py-0.5 rounded`}>
                                {showAvatar ? (
                                    <img
                                        src={message.avatar}
                                        alt={message.author}
                                        className="w-10 h-10 rounded-full flex-shrink-0"
                                    />
                                ) : (
                                    <div className="w-10 flex-shrink-0"></div>
                                )}
                                <div className="flex-1">
                                    {showAvatar && (
                                        <div className="flex items-baseline gap-2 mb-1">
                                            <span className="font-semibold text-white hover:underline cursor-pointer">
                                                {message.author}
                                            </span>
                                            {message.role && (
                                                <span className="text-xs bg-blue-600 text-white px-1 rounded">
                                                    {message.role}
                                                </span>
                                            )}
                                            <span className="text-xs text-gray-500">{message.timestamp}</span>
                                        </div>
                                    )}
                                    <p className="text-gray-100 text-sm leading-relaxed">{message.content}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Message Input */}
                <div className="px-4 pb-6">
                    <div className="bg-[#40444b] rounded-lg flex items-center px-4 py-3">
                        <button className="p-1 hover:bg-[#4a4d54] rounded">
                            <FiPlus size={20} className="text-gray-400 hover:text-gray-200" />
                        </button>
                        <input
                            type="text"
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder={`Message #${selectedChannel}`}
                            className="flex-1 bg-transparent border-none outline-none text-gray-100 placeholder-gray-500 px-3 text-sm"
                        />
                        <div className="flex items-center gap-2">
                            <button className="p-1 hover:bg-[#4a4d54] rounded">
                                <FiSmile size={20} className="text-gray-400 hover:text-gray-200" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Members Sidebar */}
            <div className="w-60 bg-[#2f3136] overflow-y-auto">
                <div className="p-4">
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                        Members — {members.length}
                    </h3>
                    <div className="space-y-1">
                        {members.map((member) => (
                            <div
                                key={member.id}
                                className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-[#3a3d44] cursor-pointer group"
                            >
                                <div className="relative">
                                    <img
                                        src={member.avatar}
                                        alt={member.name}
                                        className="w-8 h-8 rounded-full"
                                    />
                                    <div
                                        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#2f3136] ${member.status === 'online'
                                            ? 'bg-green-500'
                                            : member.status === 'idle'
                                                ? 'bg-yellow-500'
                                                : 'bg-gray-500'
                                            }`}
                                    ></div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1">
                                        <span className="text-sm font-medium text-gray-300 group-hover:text-white truncate">
                                            {member.name}
                                        </span>
                                    </div>
                                    {member.role !== 'Member' && (
                                        <span className="text-xs text-gray-500">{member.role}</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
