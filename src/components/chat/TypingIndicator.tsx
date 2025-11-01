'use client';

export default function TypingIndicator({ username }: { username: string }) {
  return (
    <div className="typing-indicator">
      <span className="username">{username}</span> is typing
      <span className="dots">
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </span>
    </div>
  );
}