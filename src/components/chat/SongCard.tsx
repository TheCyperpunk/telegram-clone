'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FiHeart } from 'react-icons/fi';

interface SongCardProps {
  id: string;
  title: string;
  artist: string;
  coverImage: string;
  artistImage: string;
  isLiked?: boolean;
}

export default function SongCard({
  id,
  title,
  artist,
  coverImage,
  artistImage,
  isLiked = false
}: SongCardProps) {
  const [liked, setLiked] = useState(isLiked);

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className="song-card position-relative rounded overflow-hidden">
      {/* Artist Profile Circle */}
      <div className="position-absolute top-2 start-2 z-1">
        <div className="artist-circle rounded-circle overflow-hidden" style={{ width: '30px', height: '30px', border: '2px solid white' }}>
          {artistImage ? (
            <Image
              src={artistImage}
              alt={artist}
              width={30}
              height={30}
              className="object-fit-cover"
            />
          ) : (
            <div className="bg-telegram-blue text-white flex items-center justify-center h-full">
              {artist[0].toUpperCase()}
            </div>
          )}
        </div>
      </div>

      {/* Cover Image */}
      <div className="position-relative" style={{ aspectRatio: '1/1' }}>
        <Image
          src={coverImage}
          alt={title}
          fill
          className="object-fit-cover"
        />
      </div>

      {/* Song Info */}
      <div className="song-info p-2">
        <h6 className="mb-0 text-truncate" style={{ fontSize: '0.9rem' }}>{title}</h6>
        <p className="mb-0 text-muted text-truncate" style={{ fontSize: '0.8rem' }}>{artist}</p>

        {/* Like Button */}
        <button
          className={`btn btn-sm like-button p-0 mt-1 ${liked ? 'text-danger' : 'text-muted'}`}
          onClick={handleLike}
        >
          <FiHeart size={16} fill={liked ? 'currentColor' : 'none'} />
        </button>
      </div>
    </div>
  );
}