'use client';

import MessageReaction from './MessageReaction';
import FileAttachment from './FileAttachment';
import TypingIndicator from './TypingIndicator';
import VoiceMessage from './VoiceMessage';
import LinkPreview from './LinkPreview';
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
      'tech-admin': 'Tech News',
      'design-admin': 'Design Inspiration',
      'photo-admin': 'Photography Tips',
      'cooking-admin': 'Cooking Recipes',
      'fitness-admin': 'Fitness & Health',
      'job-admin': 'Job Opportunities',
      'crypto-admin': 'Crypto Updates',
      'startup-admin': 'Startup News',
      'other-user': 'Michael Chen',
      'current-user': 'You'
    };
    return senderNames[senderId] || senderId;
  };

  const extractLinks = (text: string): string[] => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.match(urlRegex) || [];
  };

  const isImageAttachment = (attachment: any) => attachment.type.startsWith('image/');
  const isVideoAttachment = (attachment: any) => attachment.type.startsWith('video/');
  const isAudioAttachment = (attachment: any) => attachment.type.startsWith('audio/');
  const isDocumentAttachment = (attachment: any) => 
    attachment.type.startsWith('application/') || attachment.type.startsWith('text/');

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
                  className={`relative max-w-md overflow-hidden ${
                    // Voice messages have their own styling, no background needed
                    message.voiceMessage && !message.content
                      ? ''
                      : conversationType === 'channel' && !isOwn
                        ? 'bg-white text-gray-800 shadow-md rounded-lg'
                        : isOwn 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-white text-gray-800 border border-gray-200'
                  } ${
                    // Add padding only for text content, not for media
                    message.content && !message.attachments?.some(a => isImageAttachment(a) || isVideoAttachment(a)) 
                      ? 'px-4 py-3' 
                      : message.audioMessage 
                        ? 'px-4 py-3'
                        : message.voiceMessage 
                          ? 'p-0' 
                          : message.attachments?.some(a => isImageAttachment(a) || isVideoAttachment(a))
                            ? 'p-0'
                            : 'p-0'
                  } ${
                    message.voiceMessage && !message.content
                      ? ''
                      : conversationType === 'channel' && !isOwn
                        ? 'rounded-lg'
                        : isOwn 
                          ? isConsecutive 
                            ? 'rounded-2xl rounded-br-md' 
                            : 'rounded-2xl rounded-br-sm'
                          : isConsecutive 
                            ? 'rounded-2xl rounded-bl-md' 
                            : 'rounded-2xl rounded-bl-sm'
                  } ${message.voiceMessage && !message.content ? '' : 'shadow-sm'}`}
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
                  
                  {/* Link Preview */}
                  {message.linkPreview && (
                    <LinkPreview preview={message.linkPreview} />
                  )}
                  
                  {/* Images - Grid layout for multiple images */}
                  {message.attachments && message.attachments.filter(isImageAttachment).length > 0 && (
                    <div className={conversationType === 'channel' ? 'border-2 border-gray-200 rounded-2xl overflow-hidden' : ''}>
                      <div className={`${
                        message.attachments.filter(isImageAttachment).length === 1 ? '' : 
                        message.attachments.filter(isImageAttachment).length === 2 ? 'grid grid-cols-2 gap-1' :
                        message.attachments.filter(isImageAttachment).length === 3 ? 'grid grid-cols-2 gap-1' :
                        'grid grid-cols-2 gap-1'
                      }`}>
                        {message.attachments.filter(isImageAttachment).map((attachment, idx) => (
                          <div key={attachment.id} className={`relative ${
                            message.attachments!.filter(isImageAttachment).length === 3 && idx === 0 ? 'col-span-2' : ''
                          }`}>
                            <img 
                              src={attachment.url} 
                              alt={attachment.name}
                              className="w-full h-auto max-h-96 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                            />
                          </div>
                        ))}
                      </div>
                      {/* Message content inside container */}
                      {message.content && (
                        <div className="px-3 pt-2 pb-1 bg-white">
                          <p className="text-sm leading-none whitespace-pre-wrap text-gray-900">
                            {message.content.split(/(\bhttps?:\/\/[^\s]+)/g).map((part, index) => {
                              if (part.match(/^https?:\/\//)) {
                                return (
                                  <a
                                    key={index}
                                    href={part}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 underline hover:no-underline"
                                  >
                                    {part}
                                  </a>
                                );
                              }
                              return part;
                            })}
                          </p>
                        </div>
                      )}
                      {/* Views and timestamp inside container for channel images */}
                      {conversationType === 'channel' && (message.views !== undefined || message.createdAt) && (
                        <div className="flex items-center justify-end gap-2 px-3 py-1.5 bg-white">
                          {message.views !== undefined && (
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                              </svg>
                              <span>{message.views >= 1000 ? `${(message.views / 1000).toFixed(1)}K` : message.views}</span>
                            </div>
                          )}
                          {message.createdAt && (
                            <div className="text-xs text-gray-500">
                              {new Date(message.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Videos */}
                  {message.attachments && message.attachments.filter(isVideoAttachment).length > 0 && (
                    <div className="space-y-2">
                      {message.attachments.filter(isVideoAttachment).map((attachment, idx) => (
                        <div key={attachment.id} className={conversationType === 'channel' ? 'border-2 border-gray-200 rounded-2xl overflow-hidden' : ''}>
                          <div className="relative bg-black">
                            <video 
                              src={attachment.url}
                              controls
                              className="w-full max-h-96"
                              poster={attachment.url.replace('.mp4', '-thumb.jpg')}
                            />
                            <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                              {Math.floor(attachment.size / 1048576).toFixed(1)} MB
                            </div>
                          </div>
                          {/* Message content inside container */}
                          {message.content && (
                            <div className="px-3 pt-2 pb-1 bg-white">
                              <p className="text-sm leading-none whitespace-pre-wrap text-gray-900">
                                {message.content.split(/(\bhttps?:\/\/[^\s]+)/g).map((part, index) => {
                                  if (part.match(/^https?:\/\//)) {
                                    return (
                                      <a
                                        key={index}
                                        href={part}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 underline hover:no-underline"
                                      >
                                        {part}
                                      </a>
                                    );
                                  }
                                  return part;
                                })}
                              </p>
                            </div>
                          )}
                          {/* Views and timestamp inside container for channel videos */}
                          {conversationType === 'channel' && (message.views !== undefined || message.createdAt) && (
                            <div className="flex items-center justify-end gap-2 px-3 py-1.5 bg-white">
                              {message.views !== undefined && (
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                                  </svg>
                                  <span>{message.views >= 1000 ? `${(message.views / 1000).toFixed(1)}K` : message.views}</span>
                                </div>
                              )}
                              {message.createdAt && (
                                <div className="text-xs text-gray-500">
                                  {new Date(message.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Message content - show only if no images/videos (otherwise it's inside the container) */}
                  {message.content && !message.voiceMessage && 
                   !(message.attachments && message.attachments.filter(a => isImageAttachment(a) || isVideoAttachment(a)).length > 0) && (
                    <div className={conversationType === 'channel' ? 'border-2 border-gray-200 rounded-2xl overflow-hidden bg-white' : ''}>
                      <p className={`text-sm leading-none whitespace-pre-wrap ${conversationType === 'channel' ? 'text-gray-900 px-3 pt-2 pb-1' : isOwn ? 'text-white' : 'text-gray-900'}`}>
                        {message.content.split(/(\bhttps?:\/\/[^\s]+)/g).map((part, index) => {
                          if (part.match(/^https?:\/\//)) {
                            return (
                              <a
                                key={index}
                                href={part}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`underline hover:no-underline ${conversationType === 'channel' ? 'text-blue-500' : isOwn ? 'text-blue-200' : 'text-blue-500'}`}
                              >
                                {part}
                              </a>
                            );
                          }
                          return part;
                        })}
                      </p>
                      {/* Views and timestamp inside text/link container for channels */}
                      {conversationType === 'channel' && (message.views !== undefined || message.createdAt) && (
                        <div className="flex items-center justify-end gap-2 px-3 py-1.5 bg-white">
                          {message.views !== undefined && (
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                              </svg>
                              <span>{message.views >= 1000 ? `${(message.views / 1000).toFixed(1)}K` : message.views}</span>
                            </div>
                          )}
                          {message.createdAt && (
                            <div className="text-xs text-gray-500">
                              {new Date(message.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Voice message - no title, just player */}
                  {message.voiceMessage && (
                    <VoiceMessage 
                      voiceMessage={message.voiceMessage}
                      isOwn={isOwn}
                      views={message.views}
                      timestamp={message.createdAt}
                      conversationType={conversationType}
                    />
                  )}
                  
                  {/* Audio files - Podcast/Music player style */}
                  {message.audioMessage && (
                    <div className={`${message.content ? 'mt-2' : ''} bg-gray-100 rounded-lg p-4`}>
                      {/* Title */}
                      {message.content && (
                        <div className="flex items-center gap-2 mb-3">
                          <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z"/>
                          </svg>
                          <span className="text-sm font-medium text-gray-700 line-clamp-1">
                            {message.content}
                          </span>
                        </div>
                      )}
                      
                      {/* Audio player */}
                      <audio 
                        src={message.audioMessage.url} 
                        controls 
                        className="w-full"
                        style={{ height: '40px' }}
                      />
                      
                      {/* Duration */}
                      <div className="text-xs text-gray-500 mt-2">
                        Duration: {Math.floor(message.audioMessage.duration / 60)}:
                        {String(Math.floor(message.audioMessage.duration % 60)).padStart(2, '0')}
                      </div>
                    </div>
                  )}
                  
                  {/* Document attachments (PDFs, etc) with single border and metadata inside */}
                  {message.attachments && message.attachments.filter(isDocumentAttachment).length > 0 && (
                    <div className={`${message.content ? 'mt-2' : ''} space-y-2`}>
                      {message.attachments.filter(isDocumentAttachment).map(attachment => (
                        <div key={attachment.id} className="inline-block bg-white rounded-2xl shadow-sm border border-gray-200 p-3">
                          <FileAttachment file={attachment} />
                          {/* Time and views inside the single border */}
                          {conversationType === 'channel' && (
                            <div className="flex items-center justify-end gap-2 mt-2">
                              {message.views && (
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                                  </svg>
                                  <span>{message.views >= 1000 ? `${(message.views / 1000).toFixed(1)}K` : message.views}</span>
                                </div>
                              )}
                              <div className="text-xs text-gray-500">
                                {new Date(message.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Message footer - hide for document attachments, voice messages, images, videos, and text/link messages in channels as they have their own footer */}
                  {!message.attachments?.some(isDocumentAttachment) && !message.voiceMessage && 
                   !(message.attachments && message.attachments.filter(a => isImageAttachment(a) || isVideoAttachment(a)).length > 0) &&
                   !(conversationType === 'channel' && message.content && !message.audioMessage) && (
                  <div className={`flex items-center justify-end gap-2 ${
                    message.content || message.audioMessage 
                      ? 'mt-2' 
                      : 'absolute bottom-2 right-2 bg-black bg-opacity-50 px-2 py-1 rounded'
                  }`}>
                    {/* View count for channels */}
                    {conversationType === 'channel' && message.views && (
                      <div className={`flex items-center gap-1 text-xs ${
                        message.content || message.audioMessage || (message.attachments && message.attachments.filter(a => isImageAttachment(a) || isVideoAttachment(a)).length > 0)
                          ? (isOwn ? 'text-white opacity-80' : 'text-gray-500') 
                          : 'text-white'
                      }`}>
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                        </svg>
                        <span>{message.views >= 1000 ? `${(message.views / 1000).toFixed(1)}K` : message.views}</span>
                      </div>
                    )}
                    
                    <div className={`text-xs ${
                      message.content || message.audioMessage || (message.attachments && message.attachments.filter(a => isImageAttachment(a) || isVideoAttachment(a)).length > 0)
                        ? (isOwn ? 'text-white opacity-80' : 'text-gray-500')
                        : 'text-white'
                    }`}>
                      {new Date(message.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </div>
                    
                    {/* Read receipts - only show for outgoing messages */}
                    {isOwn && (
                      <div className="flex items-center">
                        {message.isRead ? (
                          <FiCheckCircle size={12} className={message.content || message.audioMessage ? 'text-white opacity-80' : 'text-white'} />
                        ) : (
                          <FiCheck size={12} className={message.content || message.audioMessage ? 'text-white opacity-80' : 'text-white'} />
                        )}
                      </div>
                    )}
                  </div>
                  )}
                  
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