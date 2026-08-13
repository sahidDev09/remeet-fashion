"use client";

import Image from 'next/image';
import { useState, useRef, MouseEvent } from 'react';

export default function ProductGallery({ images, alt }: { images: string[], alt: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [backgroundPosition, setBackgroundPosition] = useState('0% 0%');
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    const xPx = e.clientX - left;
    const yPx = e.clientY - top;
    setCursorPos({ x: xPx, y: yPx });

    const x = (xPx / width) * 100;
    const y = (yPx / height) * 100;
    setBackgroundPosition(`${x}% ${y}%`);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image with Zoom */}
      <div 
        ref={imageContainerRef}
        className="relative aspect-[4/5] bg-white/50 rounded-3xl overflow-hidden w-full shadow-sm border border-black/5 group cursor-crosshair"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <Image 
          src={images[currentIndex]} 
          fill 
          className="object-cover mix-blend-multiply transition-opacity duration-300" 
          alt={alt} 
          priority 
          sizes="(max-width: 1024px) 100vw, 50vw" 
        />
        
        {/* Zoomed Image Overlay (Masked) */}
        {isZoomed && (
          <div 
            className="absolute inset-0 z-10 pointer-events-none bg-white"
            style={{
              backgroundImage: `url(${images[currentIndex]})`,
              backgroundPosition,
              backgroundSize: '250%',
              backgroundRepeat: 'no-repeat',
              WebkitMaskImage: `radial-gradient(circle 180px at ${cursorPos.x}px ${cursorPos.y}px, black 99%, transparent 100%)`,
              maskImage: `radial-gradient(circle 180px at ${cursorPos.x}px ${cursorPos.y}px, black 99%, transparent 100%)`
            }}
          />
        )}
        
        {/* Magnifying Glass Ring */}
        {isZoomed && (
          <div 
            className="absolute z-20 pointer-events-none rounded-full border border-black/10 shadow-xl bg-white/5 backdrop-blur-[1px]"
            style={{
              width: '360px',
              height: '360px',
              left: `${cursorPos.x - 180}px`,
              top: `${cursorPos.y - 180}px`,
            }}
          />
        )}

        {/* Navigation Arrows */}
        <button 
          onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-20 hover:bg-white hover:scale-110 shadow-sm border border-black/10 text-black"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); handleNext(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-20 hover:bg-white hover:scale-110 shadow-sm border border-black/10 text-black"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-3 gap-4">
        {images.map((img, idx) => (
          <div 
            key={idx} 
            onClick={() => setCurrentIndex(idx)}
            className={`relative aspect-[4/5] bg-white/50 rounded-2xl overflow-hidden shadow-sm border cursor-pointer transition-all ${currentIndex === idx ? 'border-black/40 border-2' : 'border-black/5 hover:border-black/20'}`}
          >
            <Image src={img} fill className="object-cover mix-blend-multiply" alt={`${alt} Thumbnail ${idx + 1}`} sizes="(max-width: 1024px) 33vw, 16vw" />
          </div>
        ))}
      </div>
    </div>
  );
}
