'use client';

import { useState } from 'react';
import { FiSmile } from 'react-icons/fi';

interface Reaction {
  emoji: string;
  count: number;
  userIds: string[];
}

interface MessageReactionProps {
  reactions: Reaction[];
  messageId: string;
  currentUserId: string;
  onAddReaction: (messageId: string, emoji: string) => void;
}

const commonEmojis = ['👍', '❤️', '😂', '😮', '😢', '👏'];

export default function MessageReaction({ 
  reactions, 
  messageId, 
  currentUserId, 
  onAddReaction 
}: MessageReactionProps) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleReactionClick = (emoji: string) => {
    onAddReaction(messageId, emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="message-reactions">
      {/* Display existing reactions */}
      <div className="flex flex-wrap">
        {reactions.map((reaction, index) => (
          <button 
            key={`${reaction.emoji}-${index}`}
            className={`reaction-badge ${reaction.userIds.includes(currentUserId) ? 'active' : ''}`}
            onClick={() => handleReactionClick(reaction.emoji)}
          >
            <span>{reaction.emoji}</span>
            <span className="reaction-count">{reaction.count}</span>
          </button>
        ))}
      </div>

      {/* Add reaction button */}
      <div className="relative">
        <button 
          className="btn-icon reaction-add-btn"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          <FiSmile size={16} />
        </button>

        {/* Emoji picker */}
        {showEmojiPicker && (
          <div className="emoji-picker-container">
            <div className="emoji-picker">
              {commonEmojis.map(emoji => (
                <button 
                  key={emoji} 
                  className="emoji-btn"
                  onClick={() => handleReactionClick(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}