"use client";
import React from "react";
import { SparklesCore } from "./sparkles";
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';

interface SparklesPreviewProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function SparklesPreview({ searchQuery, onSearchChange }: SparklesPreviewProps) {
  return (
    <div className="h-80 w-full bg-black flex flex-col items-center justify-center overflow-hidden relative px-4">
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center text-white relative z-20 mb-8">
        Comit
      </h1>
      
      {/* Search Bar */}
      <div className="relative z-20 w-full max-w-2xl flex items-center gap-3">
        <div className="flex items-center bg-black border border-gray-600 rounded-full shadow-lg h-12 flex-1">
          <div className="flex items-center flex-1 px-4 py-2">
            <HiOutlineMagnifyingGlass size={18} className="text-gray-400 mr-3" />
            <input
              type="text"
              placeholder="Type your message here..."
              className="flex-1 border-none outline-none bg-transparent text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-0"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <div className="pr-1">
            <button className="bg-gradient-to-r from-purple-500 via-purple-600 to-indigo-600 text-white px-6 py-2 font-medium hover:from-purple-600 hover:via-purple-700 hover:to-indigo-700 transition-all duration-300 rounded-full flex items-center justify-center h-10">
              Submit
            </button>
          </div>
        </div>
        
        {/* Profile Image - Outside search bar */}
        <div className="w-12 h-12 rounded-full overflow-hidden border border-white flex-shrink-0">
          <img 
            src="https://raw.githubusercontent.com/TheCyperpunk/littilelilly-photos/main/Screenshot%202025-10-18%20174437.png"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      <div className="absolute inset-0 w-full h-full">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1.5}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
        
        {/* Additional floating elements */}
        <div className="absolute inset-0 w-full h-full">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`floating-${i}`}
              className="absolute animate-bounce"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${20 + Math.random() * 60}%`,
                width: `${2 + Math.random() * 3}px`,
                height: `${2 + Math.random() * 3}px`,
                background: i % 2 === 0 ? "#60A5FA" : "#A78BFA",
                borderRadius: "50%",
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
                boxShadow: `0 0 ${4 + Math.random() * 6}px currentColor`,
              }}
            />
          ))}
        </div>

        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-black/20"></div>
      </div>
    </div>
  );
}
