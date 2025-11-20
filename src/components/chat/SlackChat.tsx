'use client';

import React, { useState } from 'react';
import { FiHash, FiLock, FiChevronDown, FiChevronRight, FiSearch, FiPhone, FiInfo, FiStar, FiUsers, FiEdit, FiSmile, FiPaperclip, FiSend, FiAtSign } from 'react-icons/fi';

interface SlackChatProps {
    groupName: string;
    onBack: () => void;
}

interface Channel {
    id: string;
    name: string;
    type: 'public' | 'private';
    category: string;
    unread?: number;
}

interface Message {
    id: string;
    author: string;
    avatar: string;
    content: string;
    timestamp: string;
    reactions?: { emoji: string; count: number }[];
}

const channels: Channel[] = [
    { id: '1', name: 'general', type: 'public', category: 'Channels' },
    { id: '2', name: 'announcements', type: 'public', category: 'Channels' },
    { id: '3', name: 'random', type: 'public', category: 'Channels' },
    { id: '4', name: 'team-updates', type: 'public', category: 'Channels', unread: 3 },
    { id: '5', name: 'project-alpha', type: 'private', category: 'Channels', unread: 1 },
    { id: '6', name: 'design-review', type: 'private', category: 'Channels' },
    { id: '7', name: 'tech-discussion', type: 'public', category: 'Channels' },
    { id: '8', name: 'code-reviews', type: 'public', category: 'Channels', unread: 2 },
    { id: '9', name: 'bug-reports', type: 'public', category: 'Channels' },
    { id: '10', name: 'feature-requests', type: 'public', category: 'Channels' },
    { id: '11', name: 'marketing', type: 'private', category: 'Channels' },
    { id: '12', name: 'sales-team', type: 'private', category: 'Channels', unread: 5 },
    { id: '13', name: 'Sarah Chen', type: 'public', category: 'Direct Messages', unread: 1 },
    { id: '14', name: 'Mike Johnson', type: 'public', category: 'Direct Messages' },
    { id: '15', name: 'Emma Wilson', type: 'public', category: 'Direct Messages', unread: 2 },
];

const sampleMessages: Message[] = [
    {
        id: '1',
        author: 'Admin',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60',
        content: 'Welcome to the takashi group! 🎌',
        timestamp: '09:32 AM'
    },
    {
        id: '2',
        author: 'Admin',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60',
        content: 'A community for sharing knowledge and experiences.',
        timestamp: '09:33 AM'
    },
    {
        id: '3',
        author: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60',
        content: 'Great to be here! Looking forward to collaborating with everyone.',
        timestamp: '09:40 AM',
        reactions: [{ emoji: '👍', count: 3 }, { emoji: '🎉', count: 2 }]
    },
    {
        id: '4',
        author: 'Mike Johnson',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60',
        content: 'Just finished the new feature implementation. Ready for review! 🚀',
        timestamp: '10:15 AM'
    },
    {
        id: '5',
        author: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=60',
        content: 'That\'s awesome! I\'ll take a look at the PR this afternoon.',
        timestamp: '10:18 AM',
        reactions: [{ emoji: '✅', count: 1 }]
    },
    {
        id: '6',
        author: 'David Lee',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60',
        content: 'Quick reminder: Team standup at 2 PM today. Please prepare your updates!',
        timestamp: '11:30 AM'
    },
    {
        id: '7',
        author: 'Lisa Park',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=60',
        content: 'The design mockups are ready. Check them out in the #design-review channel.',
        timestamp: '12:05 PM',
        reactions: [{ emoji: '🎨', count: 4 }, { emoji: '👀', count: 2 }]
    },
    {
        id: '8',
        author: 'Alex Martinez',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=60',
        content: 'Anyone available for a quick code review? Need a second pair of eyes on this refactoring.',
        timestamp: '12:15 PM'
    },
    {
        id: '9',
        author: 'Rachel Kim',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=60',
        content: 'I can help! Send me the link.',
        timestamp: '12:16 PM',
        reactions: [{ emoji: '🙌', count: 1 }]
    },
    {
        id: '10',
        author: 'Tom Anderson',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=60',
        content: 'The deployment to staging went smoothly. All tests are passing! ✨',
        timestamp: '01:20 PM',
        reactions: [{ emoji: '🎉', count: 5 }, { emoji: '🚀', count: 3 }]
    },
    {
        id: '11',
        author: 'Jennifer Lee',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=60',
        content: 'Great work team! Let\'s schedule a demo for tomorrow morning.',
        timestamp: '01:25 PM'
    },
    {
        id: '12',
        author: 'Chris Taylor',
        avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=60',
        content: 'I\'ve updated the documentation with the latest API changes. Please review when you get a chance.',
        timestamp: '02:10 PM',
        reactions: [{ emoji: '📚', count: 2 }]
    },
    {
        id: '13',
        author: 'You',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60',
        content: 'Excited to be part of this group!',
        timestamp: '02:30 PM'
    },
    {
        id: '14',
        author: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60',
        content: 'Welcome! Feel free to ask any questions. We\'re all here to help each other grow.',
        timestamp: '02:32 PM',
        reactions: [{ emoji: '❤️', count: 2 }]
    },
];

export default function SlackChat({ groupName, onBack }: SlackChatProps) {
    const [selectedChannel, setSelectedChannel] = useState('general');
    const [messages, setMessages] = useState<Message[]>(sampleMessages);
    const [messageInput, setMessageInput] = useState('');
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['Channels', 'Direct Messages']));

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
        <div className="flex h-full bg-white text-gray-900">
            {/* Slack Sidebar */}
            <div className="w-64 bg-[#3f0e40] text-white flex flex-col">
                {/* Workspace Header */}
                <div className="h-14 px-4 flex items-center justify-between border-b border-white/10 cursor-pointer hover:bg-white/5">
                    <div className="flex items-center gap-2">
                        <h2 className="font-bold text-lg">{groupName}</h2>
                        <FiChevronDown size={16} />
                    </div>
                    <button className="p-1.5 hover:bg-white/10 rounded">
                        <FiEdit size={18} />
                    </button>
                </div>

                {/* Navigation Items */}
                <div className="flex-1 overflow-y-auto py-2">
                    <div className="px-3 py-1">
                        <div className="flex items-center gap-2 px-2 py-1 hover:bg-white/10 rounded cursor-pointer text-sm">
                            <FiUsers size={16} />
                            <span>Threads</span>
                        </div>
                        <div className="flex items-center gap-2 px-2 py-1 hover:bg-white/10 rounded cursor-pointer text-sm">
                            <FiAtSign size={16} />
                            <span>Mentions & reactions</span>
                        </div>
                        <div className="flex items-center gap-2 px-2 py-1 hover:bg-white/10 rounded cursor-pointer text-sm">
                            <FiStar size={16} />
                            <span>Saved items</span>
                        </div>
                    </div>

                    {/* Channels */}
                    {Object.entries(groupedChannels).map(([category, categoryChannels]) => (
                        <div key={category} className="mt-4">
                            <div
                                className="px-3 py-1 flex items-center justify-between cursor-pointer hover:bg-white/5"
                                onClick={() => toggleCategory(category)}
                            >
                                <div className="flex items-center gap-1 text-sm font-medium">
                                    {expandedCategories.has(category) ? (
                                        <FiChevronDown size={14} />
                                    ) : (
                                        <FiChevronRight size={14} />
                                    )}
                                    <span>{category}</span>
                                </div>
                            </div>

                            {expandedCategories.has(category) && (
                                <div className="mt-1">
                                    {categoryChannels.map((channel) => (
                                        <div
                                            key={channel.id}
                                            onClick={() => setSelectedChannel(channel.name)}
                                            className={`px-3 py-1 flex items-center justify-between cursor-pointer ${selectedChannel === channel.name
                                                    ? 'bg-[#1164a3] text-white'
                                                    : 'hover:bg-white/10'
                                                }`}
                                        >
                                            <div className="flex items-center gap-2 text-sm">
                                                {channel.type === 'public' && category === 'Channels' ? (
                                                    <FiHash size={16} className="opacity-70" />
                                                ) : channel.type === 'private' ? (
                                                    <FiLock size={16} className="opacity-70" />
                                                ) : (
                                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                )}
                                                <span>{channel.name}</span>
                                            </div>
                                            {channel.unread && (
                                                <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-semibold">
                                                    {channel.unread}
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* User Profile */}
                <div className="h-12 px-3 flex items-center gap-2 border-t border-white/10 hover:bg-white/5 cursor-pointer">
                    <img
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60"
                        alt="User"
                        className="w-8 h-8 rounded"
                    />
                    <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold truncate">You</div>
                        <div className="text-xs opacity-70 flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>Active</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col bg-white">
                {/* Channel Header */}
                <div className="h-14 px-4 flex items-center justify-between border-b border-gray-200">
                    <div className="flex items-center gap-2">
                        <FiHash size={20} className="text-gray-600" />
                        <span className="font-bold text-lg">{selectedChannel}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="p-2 hover:bg-gray-100 rounded">
                            <FiPhone size={18} className="text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded">
                            <FiUsers size={18} className="text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded">
                            <FiSearch size={18} className="text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded" onClick={onBack}>
                            <FiInfo size={18} className="text-gray-600" />
                        </button>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto px-4 py-4">
                    {messages.map((message, index) => {
                        const showAvatar = index === 0 || messages[index - 1].author !== message.author;

                        return (
                            <div key={message.id} className={`flex gap-3 ${showAvatar ? 'mt-4' : 'mt-1'} hover:bg-gray-50 px-2 py-1 rounded`}>
                                {showAvatar ? (
                                    <img
                                        src={message.avatar}
                                        alt={message.author}
                                        className="w-9 h-9 rounded flex-shrink-0"
                                    />
                                ) : (
                                    <div className="w-9 flex-shrink-0"></div>
                                )}
                                <div className="flex-1 min-w-0">
                                    {showAvatar && (
                                        <div className="flex items-baseline gap-2 mb-1">
                                            <span className="font-bold text-sm text-gray-900 hover:underline cursor-pointer">
                                                {message.author}
                                            </span>
                                            <span className="text-xs text-gray-500">{message.timestamp}</span>
                                        </div>
                                    )}
                                    <p className="text-sm text-gray-900 leading-relaxed">{message.content}</p>
                                    {message.reactions && message.reactions.length > 0 && (
                                        <div className="flex gap-1 mt-1">
                                            {message.reactions.map((reaction, idx) => (
                                                <button
                                                    key={idx}
                                                    className="inline-flex items-center gap-1 px-2 py-0.5 bg-white border border-gray-300 rounded-full text-xs hover:border-blue-500 hover:bg-blue-50"
                                                >
                                                    <span>{reaction.emoji}</span>
                                                    <span className="text-gray-700">{reaction.count}</span>
                                                </button>
                                            ))}
                                            <button className="inline-flex items-center justify-center w-6 h-6 bg-white border border-gray-300 rounded-full text-xs hover:border-blue-500 hover:bg-blue-50">
                                                <FiSmile size={14} className="text-gray-500" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Message Input */}
                <div className="px-4 pb-4">
                    <div className="border border-gray-300 rounded-lg overflow-hidden">
                        <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-200">
                            <button className="p-1 hover:bg-gray-100 rounded">
                                <FiSmile size={18} className="text-gray-600" />
                            </button>
                            <button className="p-1 hover:bg-gray-100 rounded">
                                <FiPaperclip size={18} className="text-gray-600" />
                            </button>
                            <button className="p-1 hover:bg-gray-100 rounded">
                                <FiAtSign size={18} className="text-gray-600" />
                            </button>
                        </div>
                        <div className="flex items-end gap-2 px-3 py-2">
                            <textarea
                                value={messageInput}
                                onChange={(e) => setMessageInput(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSendMessage();
                                    }
                                }}
                                placeholder={`Message #${selectedChannel}`}
                                className="flex-1 bg-transparent border-none outline-none text-sm resize-none"
                                rows={1}
                                style={{ minHeight: '24px', maxHeight: '120px' }}
                            />
                            <button
                                onClick={handleSendMessage}
                                className="p-2 bg-green-600 hover:bg-green-700 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={!messageInput.trim()}
                            >
                                <FiSend size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
