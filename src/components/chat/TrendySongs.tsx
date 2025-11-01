'use client';

import { useState } from 'react';
import SongCard from './SongCard';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

// Sample song data
const sampleSongs = [
  {
    id: '1',
    title: 'The Weekend',
    artist: 'SZA',
    coverImage: '/vercel.svg', // Using placeholder image
    artistImage: '/vercel.svg', // Using placeholder image
    isLiked: true
  },
  {
    id: '2',
    title: 'Havana',
    artist: 'Camila Cabello',
    coverImage: '/next.svg', // Using placeholder image
    artistImage: '/next.svg', // Using placeholder image
    isLiked: false
  },
  {
    id: '3',
    title: 'Lean On',
    artist: 'Major Lazer',
    coverImage: '/globe.svg', // Using placeholder image
    artistImage: '/globe.svg', // Using placeholder image
    isLiked: false
  },
  {
    id: '4',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    coverImage: '/window.svg', // Using placeholder image
    artistImage: '/window.svg', // Using placeholder image
    isLiked: true
  },
  {
    id: '5',
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    coverImage: '/file.svg', // Using placeholder image
    artistImage: '/file.svg', // Using placeholder image
    isLiked: false
  },
  {
    id: '6',
    title: 'Dance Monkey',
    artist: 'Tones and I',
    coverImage: '/vercel.svg', // Using placeholder image
    artistImage: '/vercel.svg', // Using placeholder image
    isLiked: false
  },
  {
    id: '7',
    title: 'Levitating',
    artist: 'Dua Lipa',
    coverImage: '/next.svg', // Using placeholder image
    artistImage: '/next.svg', // Using placeholder image
    isLiked: true
  },
  {
    id: '8',
    title: 'Watermelon Sugar',
    artist: 'Harry Styles',
    coverImage: '/globe.svg', // Using placeholder image
    artistImage: '/globe.svg', // Using placeholder image
    isLiked: false
  },
  {
    id: '9',
    title: 'Stay',
    artist: 'The Kid LAROI',
    coverImage: '/window.svg', // Using placeholder image
    artistImage: '/window.svg', // Using placeholder image
    isLiked: false
  },
  {
    id: '10',
    title: 'Bad Guy',
    artist: 'Billie Eilish',
    coverImage: '/file.svg', // Using placeholder image
    artistImage: '/file.svg', // Using placeholder image
    isLiked: true
  },
  {
    id: '11',
    title: 'Uptown Funk',
    artist: 'Mark Ronson',
    coverImage: '/vercel.svg', // Using placeholder image
    artistImage: '/vercel.svg', // Using placeholder image
    isLiked: false
  },
  {
    id: '12',
    title: 'Despacito',
    artist: 'Luis Fonsi',
    coverImage: '/next.svg', // Using placeholder image
    artistImage: '/next.svg', // Using placeholder image
    isLiked: false
  },
  {
    id: '13',
    title: 'Someone You Loved',
    artist: 'Lewis Capaldi',
    coverImage: '/globe.svg', // Using placeholder image
    artistImage: '/globe.svg', // Using placeholder image
    isLiked: true
  },
  {
    id: '14',
    title: 'Sunflower',
    artist: 'Post Malone',
    coverImage: '/window.svg', // Using placeholder image
    artistImage: '/window.svg', // Using placeholder image
    isLiked: false
  },
  {
    id: '15',
    title: 'Circles',
    artist: 'Post Malone',
    coverImage: '/file.svg', // Using placeholder image
    artistImage: '/file.svg', // Using placeholder image
    isLiked: false
  },
  {
    id: '16',
    title: 'Don\'t Start Now',
    artist: 'Dua Lipa',
    coverImage: '/vercel.svg', // Using placeholder image
    artistImage: '/vercel.svg', // Using placeholder image
    isLiked: true
  },
  {
    id: '17',
    title: 'Memories',
    artist: 'Maroon 5',
    coverImage: '/next.svg', // Using placeholder image
    artistImage: '/next.svg', // Using placeholder image
    isLiked: false
  },
  {
    id: '18',
    title: 'Señorita',
    artist: 'Shawn Mendes',
    coverImage: '/globe.svg', // Using placeholder image
    artistImage: '/globe.svg', // Using placeholder image
    isLiked: false
  },
  {
    id: '19',
    title: 'Savage Love',
    artist: 'Jawsh 685',
    coverImage: '/window.svg', // Using placeholder image
    artistImage: '/window.svg', // Using placeholder image
    isLiked: true
  },
  {
    id: '20',
    title: 'Dynamite',
    artist: 'BTS',
    coverImage: '/file.svg', // Using placeholder image
    artistImage: '/file.svg', // Using placeholder image
    isLiked: false
  },
  {
    id: '21',
    title: 'Positions',
    artist: 'Ariana Grande',
    coverImage: '/vercel.svg', // Using placeholder image
    artistImage: '/vercel.svg', // Using placeholder image
    isLiked: false
  },
  {
    id: '22',
    title: 'Mood',
    artist: '24kGoldn',
    coverImage: '/next.svg', // Using placeholder image
    artistImage: '/next.svg', // Using placeholder image
    isLiked: true
  },
  {
    id: '23',
    title: 'Peaches',
    artist: 'Justin Bieber',
    coverImage: '/globe.svg', // Using placeholder image
    artistImage: '/globe.svg', // Using placeholder image
    isLiked: false
  },
  {
    id: '24',
    title: 'Save Your Tears',
    artist: 'The Weeknd',
    coverImage: '/window.svg', // Using placeholder image
    artistImage: '/window.svg', // Using placeholder image
    isLiked: false
  },
  {
    id: '25',
    title: 'Drivers License',
    artist: 'Olivia Rodrigo',
    coverImage: '/file.svg', // Using placeholder image
    artistImage: '/file.svg', // Using placeholder image
    isLiked: true
  },
  {
    id: '26',
    title: 'Good 4 U',
    artist: 'Olivia Rodrigo',
    coverImage: '/vercel.svg', // Using placeholder image
    artistImage: '/vercel.svg', // Using placeholder image
    isLiked: false
  },
  {
    id: '27',
    title: 'Montero',
    artist: 'Lil Nas X',
    coverImage: '/next.svg', // Using placeholder image
    artistImage: '/next.svg', // Using placeholder image
    isLiked: false
  },
  {
    id: '28',
    title: 'Kiss Me More',
    artist: 'Doja Cat',
    coverImage: '/globe.svg', // Using placeholder image
    artistImage: '/globe.svg', // Using placeholder image
    isLiked: true
  },
  {
    id: '29',
    title: 'Levitating Remix',
    artist: 'Dua Lipa ft. DaBaby',
    coverImage: '/window.svg', // Using placeholder image
    artistImage: '/window.svg', // Using placeholder image
    isLiked: false
  },
  {
    id: '30',
    title: 'Industry Baby',
    artist: 'Lil Nas X',
    coverImage: '/file.svg', // Using placeholder image
    artistImage: '/file.svg', // Using placeholder image
    isLiked: false
  }
];

export default function TrendySongs() {
  const [songs, setSongs] = useState(sampleSongs);

  return (
    <div className="trendy-songs-section h-100 d-flex flex-column">
      {/* Header */}
      <div className="flex justify-between items-center p-3 border-b border-gray-200">
        <h5 className="mb-0 font-bold">Trendy Songs</h5>
        <div className="navigation-buttons">
          <button className="btn-light text-sm rounded-full mr-2 w-8 h-8 flex items-center justify-center">
            <FiChevronLeft size={18} />
          </button>
          <button className="btn-light text-sm rounded-full w-8 h-8 flex items-center justify-center">
            <FiChevronRight size={18} />
          </button>
        </div>
      </div>
      
      {/* Songs Grid */}
      <div className="songs-grid p-3 overflow-auto flex-grow-1">
        <div className="row row-cols-5 g-3">
          {songs.map(song => (
            <div key={song.id} className="col">
              <SongCard
                id={song.id}
                title={song.title}
                artist={song.artist}
                coverImage={song.coverImage}
                artistImage={song.artistImage}
                isLiked={song.isLiked}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}