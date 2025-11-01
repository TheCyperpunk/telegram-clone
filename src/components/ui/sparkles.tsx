"use client";
import React from "react";

interface SparklesCoreProps {
  id?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  className?: string;
  particleColor?: string;
}

export const SparklesCore = (props: SparklesCoreProps) => {
  const {
    background,
    minSize,
    maxSize,
    particleDensity,
    className,
    particleColor,
  } = props;

  return (
    <div className={`${className} relative`}>
      <style jsx>{`
        @keyframes sparkleFloat {
          0% {
            transform: translateY(0px) translateX(0px) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
            transform: scale(1);
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) translateX(50px) scale(0);
            opacity: 0;
          }
        }
        
        @keyframes sparkleFloatReverse {
          0% {
            transform: translateY(0px) translateX(0px) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
            transform: scale(1);
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-80px) translateX(-30px) scale(0);
            opacity: 0;
          }
        }
        
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.2;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        
        @keyframes drift {
          0% {
            transform: translateX(0px) translateY(0px);
          }
          33% {
            transform: translateX(30px) translateY(-30px);
          }
          66% {
            transform: translateX(-20px) translateY(20px);
          }
          100% {
            transform: translateX(0px) translateY(0px);
          }
        }
      `}</style>
      <div
        style={{
          background: background || "transparent",
        }}
        className="absolute inset-0 h-full w-full overflow-hidden"
      >
        {/* Moving sparkle particles */}
        {Array.from({ length: Math.floor((particleDensity || 100) / 20) }).map((_, i) => {
          const animationType = Math.random();
          const animationClass = 
            animationType < 0.3 ? 'sparkleFloat' :
            animationType < 0.6 ? 'sparkleFloatReverse' :
            animationType < 0.8 ? 'twinkle' : 'drift';
          
          return (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${(minSize || 0.4) + Math.random() * ((maxSize || 1) - (minSize || 0.4))}px`,
                height: `${(minSize || 0.4) + Math.random() * ((maxSize || 1) - (minSize || 0.4))}px`,
                background: particleColor || "#FFFFFF",
                borderRadius: "50%",
                animation: `${animationClass} ${3 + Math.random() * 4}s infinite linear`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: Math.random() * 0.8 + 0.2,
                boxShadow: `0 0 ${2 + Math.random() * 4}px ${particleColor || "#FFFFFF"}`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
