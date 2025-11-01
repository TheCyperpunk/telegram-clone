'use client';

import MessageReaction from './MessageReaction';
import FileAttachment from './FileAttachment';
import TypingIndicator from './TypingIndicator';
import { FiCheck, FiCheckCircle } from 'react-icons/fi';

interface Message {
  _id: string;
  content: string;
  senderId: string;
  createdAt: Date;
  isRead?: boolean;
  reactions?: {
    emoji: string;
    count: number;
    userIds: string[];
  }[];
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
}

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
  typingUsers?: { userId: string; username: string }[];
  conversationType?: 'private' | 'group' | 'channel' | 'bot';
}

export default function MessageList({ messages, currentUserId, typingUsers = [], conversationType = 'private' }: MessageListProps) {

  const handleAddReaction = (messageId: string, emoji: string) => {
    // This would be implemented with a real API call in a production app
    console.log(`Adding reaction ${emoji} to message ${messageId}`);
  };

  const getSenderDisplayName = (senderId: string) => {
    const senderNames: { [key: string]: string } = {
      'admin-user': 'Admin',
      'alice-dev': 'Alice Cooper',
      'bob-designer': 'Bob Wilson',
      'charlie-lead': 'Charlie Brown',
      'project-admin': 'Project Team',
      'tech-bot': 'Tech News Bot',
      'other-user': 'Michael Chen',
      'current-user': 'You'
    };
    return senderNames[senderId] || senderId;
  };

  const getSenderColor = (senderId: string) => {
    const colors = [
      'from-red-400 to-pink-400',
      'from-blue-400 to-indigo-400', 
      'from-green-400 to-emerald-400',
      'from-yellow-400 to-orange-400',
      'from-purple-400 to-violet-400',
      'from-teal-400 to-cyan-400'
    ];
    const index = senderId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
    return colors[index];
  };

  return (
    <div className="flex-1 overflow-auto custom-scrollbar bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        {messages.map((message, index) => {
          const isConsecutive = index > 0 && messages[index - 1].senderId === message.senderId;
          const isOwn = message.senderId === currentUserId;
          
          return (
            <div
              key={message._id}
              className={`flex ${isOwn ? 'justify-end' : 'justify-start'} ${isConsecutive ? 'mt-1' : 'mt-4'}`}
            >
              <div className={`flex ${isOwn ? 'flex-row-reverse' : 'flex-row'} items-end max-w-lg`}>
                {/* Avatar for incoming messages */}
                {!isOwn && !isConsecutive && (conversationType === 'group' || conversationType === 'channel') && (
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-semibold mr-3 mb-1">
                    {getSenderDisplayName(message.senderId)[0]?.toUpperCase() || 'U'}
                  </div>
                )}
                {!isOwn && !isConsecutive && conversationType === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-sm font-semibold mr-3 mb-1">
                    🤖
                  </div>
                )}
                {!isOwn && !isConsecutive && conversationType === 'private' && (
                  <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm font-semibold mr-3 mb-1">
                    {getSenderDisplayName(message.senderId)[0]?.toUpperCase() || 'U'}
                  </div>
                )}
                
                <div
                  className={`relative px-4 py-3 max-w-md ${
                    isOwn 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-white text-gray-800 border border-gray-200'
                  } ${
                    isOwn 
                      ? isConsecutive 
                        ? 'rounded-2xl rounded-br-md' 
                        : 'rounded-2xl rounded-br-sm'
                      : isConsecutive 
                        ? 'rounded-2xl rounded-bl-md' 
                        : 'rounded-2xl rounded-bl-sm'
                  } shadow-sm`}
                >
                  
                  {/* Sender name for group chats and channels */}
                  {!isOwn && !isConsecutive && (conversationType === 'group' || conversationType === 'channel') && (
                    <div className="text-xs font-semibold text-blue-600 mb-1">
                      {getSenderDisplayName(message.senderId)}
                    </div>
                  )}
                  {!isOwn && !isConsecutive && conversationType === 'bot' && (
                    <div className="text-xs font-semibold text-gray-600 mb-1 flex items-center gap-1">
                      🤖 {getSenderDisplayName(message.senderId)}
                    </div>
                  )}
                  
                  {/* Message content */}
                  {message.content && (
                    <p className={`text-sm leading-relaxed ${isOwn ? 'text-white' : 'text-gray-900'}`}>
                      {message.content}
                    </p>
                  )}
                  
                  {/* File attachments */}
                  {message.attachments && message.attachments.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {message.attachments.map(attachment => (
                        <FileAttachment key={attachment.id} file={attachment} />
                      ))}
                    </div>
                  )}
                  
                  {/* Voice message */}
                  {message.audioMessage && (
                    <div className="mt-2 p-3 bg-gray-100 rounded-lg">
                      <audio 
                        src={message.audioMessage.url} 
                        controls 
                        className="w-full h-8"
                      />
                      <div className="text-xs text-gray-500 mt-1">
                        Duration: {Math.floor(message.audioMessage.duration / 60)}:
                        {String(Math.floor(message.audioMessage.duration % 60)).padStart(2, '0')}
                      </div>
                    </div>
                  )}
                  
                  {/* Message footer */}
                  <div className={`flex items-center justify-end mt-2 gap-1 ${message.content ? 'mt-2' : 'mt-0'}`}>
                    <div className={`text-xs ${isOwn ? 'text-blue-100' : 'text-gray-500'}`}>
                      {new Date(message.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </div>
                    
                    {/* Read receipts - only show for outgoing messages */}
                    {isOwn && (
                      <div className="flex items-center">
                        {message.isRead ? (
                          <FiCheckCircle size={12} className="text-blue-200" />
                        ) : (
                          <FiCheck size={12} className="text-blue-200" />
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* Message reactions */}
                  {message.reactions && message.reactions.length > 0 && (
                    <div className="mt-2">
                      <MessageReaction 
                        reactions={message.reactions}
                        messageId={message._id}
                        currentUserId={currentUserId}
                        onAddReaction={handleAddReaction}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        
        {/* Typing indicators */}
        {typingUsers.length > 0 && (
          <div className="flex justify-start mt-4">
            <div className="flex items-end">
              <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white text-sm font-semibold mr-3 mb-1">
                T
              </div>
              <div className="bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-200">
                {typingUsers.map(user => (
                  <TypingIndicator key={user.userId} username={user.username} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}