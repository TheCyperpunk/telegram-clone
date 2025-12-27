'use client';

import { useState } from 'react';
import { FiVideo, FiPhone, FiMoreHorizontal, FiSend, FiPaperclip, FiSmile, FiGift, FiX } from 'react-icons/fi';
import { HiOutlineUserGroup, HiOutlineBell, HiOutlineSearch } from 'react-icons/hi';

interface TeamsChatProps {
    groupName: string;
    onBack: () => void;
}

export default function TeamsChat({ groupName, onBack }: TeamsChatProps) {
    const [messageInput, setMessageInput] = useState('');
    const [activeTab, setActiveTab] = useState('chat');

    // Sample channels/chats
    const chats = [
        { id: '1', name: 'Babak Shammas (You)', time: '11:32 AM', preview: 'Yeah, that sounds great', pinned: true, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60' },
        { id: '2', name: 'Tech Meetup Team', time: '11:28 AM', preview: 'You: Just received the meeting notes...', pinned: true, avatar: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=150&auto=format&fit=crop&q=60' },
        { id: '3', name: 'Cassandra Dunn', time: '6/2', preview: 'Ok. I\'ll send an update later.', unread: 0, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60' },
        { id: '4', name: 'Aadi Kapoor', time: '6/2', preview: 'You: Great work!', unread: 0, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60' },
        { id: '5', name: 'Eric Ishida', time: '11:40 AM', preview: 'Sure, I\'ll set up something for next week t...', unread: 0, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60' },
        { id: '6', name: 'Project Yosemite', time: '4:22 PM', preview: 'Marie: GIF', unread: 0, avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=60' },
        { id: '7', name: 'Will Little', time: '11:42 AM', preview: 'I don\'t see that being an issue. Can you ta...', unread: 0, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=60' },
        { id: '8', name: 'Marie Beaudouin', time: '11:40 AM', preview: 'Ohhh I see, yes let me fix that!', unread: 0, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=60' },
        { id: '9', name: 'Design Team', time: 'Yesterday', preview: 'Sarah: The new mockups are ready', unread: 0, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=60' },
        { id: '10', name: 'Marketing Sync', time: 'Yesterday', preview: 'Kevin: Let\'s schedule a review meeting', unread: 0, avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=60' },
        { id: '11', name: 'Development Updates', time: 'Monday', preview: 'Alex: Sprint planning completed', unread: 0, avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&auto=format&fit=crop&q=60' },
        { id: '12', name: 'Client Feedback', time: 'Monday', preview: 'Jessica: They loved the presentation!', unread: 0, avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&auto=format&fit=crop&q=60' },
    ];

    // Sample messages
    const messages = [
        {
            id: '1',
            author: 'Babak Shammas',
            time: 'Wednesday 11:25 AM',
            content: 'Of course! I\'ll forward you the meeting notes which have all internal timelines for the Fabrikam project. I can set up a call to go through it and confirm we are on track.',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60'
        },
        {
            id: '2',
            author: 'Babak Shammas',
            time: 'Wednesday 11:25 AM',
            content: 'Let me know what time works best for you today.',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60'
        },
        {
            id: '3',
            author: 'You',
            time: 'Wednesday 11:28 AM',
            content: 'I\'m available today after 2pm',
            reactions: [{ emoji: '👍', count: 1 }],
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60',
            isOwn: true
        },
        {
            id: '4',
            author: 'You',
            time: 'Wednesday 11:28 AM',
            content: 'After 2:30pm today works for me. Thanks!',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60',
            isOwn: true
        },
        {
            id: '5',
            author: 'You',
            time: 'Wednesday 11:28 AM',
            content: 'Just received the meeting notes. Will review before we meet.',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60',
            isOwn: true
        },
        {
            id: '6',
            author: 'Babak Shammas',
            time: 'Wednesday 11:28 AM',
            content: 'I\'m thinking we should likely include paid name here since she\'s the PMM leading this project. Can you add her to the meeting you set up?',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60'
        },
        {
            id: '7',
            author: 'You',
            time: 'Wednesday 11:30 AM',
            content: 'Absolutely! I\'ll send her a meeting invite right away.',
            reactions: [{ emoji: '✅', count: 1 }],
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60',
            isOwn: true
        },
        {
            id: '8',
            author: 'Babak Shammas',
            time: 'Wednesday 11:32 AM',
            content: 'Perfect! Also, can you share the latest design files? I want to review them before our call.',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60'
        },
        {
            id: '9',
            author: 'You',
            time: 'Wednesday 11:33 AM',
            content: 'Sure thing! I\'ll upload them to the Files tab in a few minutes.',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60',
            isOwn: true
        },
        {
            id: '10',
            author: 'Babak Shammas',
            time: '9:35 AM',
            content: 'Hey Serena! I\'ll schedule the meeting for next week. Sound good?',
            reactions: [{ emoji: '😊', count: 1 }],
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60'
        },
    ];

    const handleSendMessage = () => {
        if (messageInput.trim()) {
            // Handle message sending
            setMessageInput('');
        }
    };

    return (
        <div className="flex h-full bg-white">
            {/* Left Sidebar - Chat List */}
            <div className="w-80 border-r border-gray-200 flex flex-col">
                {/* Sidebar Header */}
                <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-sm font-semibold text-gray-900">Chat</h2>
                        <div className="flex items-center gap-2">
                            <button className="p-1.5 hover:bg-gray-100 rounded">
                                <HiOutlineSearch size={18} className="text-gray-600" />
                            </button>
                            <button className="p-1.5 hover:bg-gray-100 rounded">
                                <FiMoreHorizontal size={18} className="text-gray-600" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Pinned Section */}
                <div className="flex-1 overflow-y-auto">
                    <div className="px-3 py-2">
                        <div className="text-xs font-semibold text-gray-500 mb-2">Pinned</div>
                        {chats.filter(c => c.pinned).map(chat => (
                            <button
                                key={chat.id}
                                className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                <img
                                    src={chat.avatar}
                                    alt={chat.name}
                                    className="w-8 h-8 rounded-full flex-shrink-0 object-cover"
                                />
                                <div className="flex-1 min-w-0 text-left">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-semibold text-gray-900 truncate">{chat.name}</span>
                                        <span className="text-xs text-gray-500 ml-2">{chat.time}</span>
                                    </div>
                                    <p className="text-xs text-gray-600 truncate">{chat.preview}</p>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Recent Section */}
                    <div className="px-3 py-2">
                        <div className="text-xs font-semibold text-gray-500 mb-2">Recent</div>
                        {chats.filter(c => !c.pinned).map(chat => (
                            <button
                                key={chat.id}
                                className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                <img
                                    src={chat.avatar}
                                    alt={chat.name}
                                    className="w-8 h-8 rounded-full flex-shrink-0 object-cover"
                                />
                                <div className="flex-1 min-w-0 text-left">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-900 truncate">{chat.name}</span>
                                        <span className="text-xs text-gray-500 ml-2">{chat.time}</span>
                                    </div>
                                    <p className="text-xs text-gray-600 truncate">{chat.preview}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col">
                {/* Chat Header */}
                <div className="h-14 border-b border-gray-200 flex items-center justify-between px-4">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onBack}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <FiX size={20} className="text-gray-600" />
                        </button>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                                B
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-gray-900">Babak Shammas</h3>
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="text-xs text-gray-600">online</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Header Actions */}
                    <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <FiVideo size={20} className="text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <FiPhone size={20} className="text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <HiOutlineUserGroup size={20} className="text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <FiMoreHorizontal size={20} className="text-gray-600" />
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200">
                    <div className="flex gap-6 px-4">
                        <button
                            onClick={() => setActiveTab('chat')}
                            className={`py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'chat'
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Chat
                        </button>
                        <button
                            onClick={() => setActiveTab('files')}
                            className={`py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'files'
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Files
                        </button>
                        <button
                            onClick={() => setActiveTab('notes')}
                            className={`py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'notes'
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Notes
                        </button>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                    <div className="max-w-4xl mx-auto space-y-4">
                        {/* Date Divider */}
                        <div className="flex items-center gap-3 my-6">
                            <div className="flex-1 h-px bg-gray-300"></div>
                            <span className="text-xs font-medium text-gray-500">Today</span>
                            <div className="flex-1 h-px bg-gray-300"></div>
                        </div>

                        {messages.map((message, index) => {
                            const showAvatar = index === 0 || messages[index - 1].author !== message.author;

                            return (
                                <div key={message.id} className={`flex gap-3 ${message.isOwn ? 'justify-end' : ''}`}>
                                    {!message.isOwn && showAvatar && (
                                        <img
                                            src={message.avatar}
                                            alt={message.author}
                                            className="w-8 h-8 rounded-full flex-shrink-0"
                                        />
                                    )}
                                    {!message.isOwn && !showAvatar && <div className="w-8"></div>}

                                    <div className={`flex-1 max-w-2xl ${message.isOwn ? 'flex flex-col items-end' : ''}`}>
                                        {showAvatar && (
                                            <div className="flex items-baseline gap-2 mb-1">
                                                <span className="text-sm font-semibold text-gray-900">{message.author}</span>
                                                <span className="text-xs text-gray-500">{message.time}</span>
                                            </div>
                                        )}

                                        <div className={`inline-block px-4 py-2 rounded-lg ${message.isOwn
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-white border border-gray-200 text-gray-900'
                                            }`}>
                                            <p className="text-sm">{message.content}</p>
                                        </div>

                                        {message.reactions && message.reactions.length > 0 && (
                                            <div className="flex gap-1 mt-1">
                                                {message.reactions.map((reaction, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="flex items-center gap-1 px-2 py-0.5 bg-white border border-gray-200 rounded-full text-xs"
                                                    >
                                                        <span>{reaction.emoji}</span>
                                                        <span className="text-gray-600">{reaction.count}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Message Input */}
                <div className="border-t border-gray-200 p-4 bg-white">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-end gap-2">
                            <div className="flex-1 border border-gray-300 rounded-lg focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                                <textarea
                                    value={messageInput}
                                    onChange={(e) => setMessageInput(e.target.value)}
                                    placeholder="Type a message"
                                    className="w-full px-3 py-2 resize-none outline-none rounded-lg"
                                    rows={1}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSendMessage();
                                        }
                                    }}
                                />
                                <div className="flex items-center justify-between px-3 pb-2">
                                    <div className="flex items-center gap-1">
                                        <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                                            <FiPaperclip size={16} className="text-gray-600" />
                                        </button>
                                        <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                                            <FiSmile size={16} className="text-gray-600" />
                                        </button>
                                        <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                                            <FiGift size={16} className="text-gray-600" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={handleSendMessage}
                                disabled={!messageInput.trim()}
                                className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <FiSend size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
