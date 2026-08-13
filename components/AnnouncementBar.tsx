'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function AnnouncementBar() {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 10) {
        // At the very top — always show
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling UP — show
        setIsVisible(true);
      } else {
        // Scrolling DOWN — hide
        setIsVisible(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isDismissed) return null;

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[60] bg-[#131313] text-white text-[11px] font-mono py-2.5 px-4 overflow-hidden flex items-center justify-between border-b border-white/10 transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="flex-1 overflow-hidden flex items-center justify-center">
        <div className="flex items-center gap-6 whitespace-nowrap">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635] animate-pulse"></span>
            <span>FREE EXPRESS SHIPPING ON ORDERS OVER ৳2,000 BDT</span>
          </span>
          <span className="text-white/30">•</span>
          <span className="flex items-center gap-2">
            <span>AI VIRTUAL TRY-ON IS NOW LIVE</span>
            <Link href="/products/1/try-on" className="underline underline-offset-4 text-[#a3e635] hover:text-white transition-colors font-bold">
              TRY IT NOW →
            </Link>
          </span>
          <span className="text-white/30">•</span>
          <span className="hidden sm:inline-flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded text-[10px]">
            USE CODE <strong className="text-white">REMEET10</strong> FOR 10% OFF
          </span>
        </div>
      </div>

      <button
        onClick={() => setIsDismissed(true)}
        className="text-white/50 hover:text-white p-1 ml-4 transition-colors shrink-0 cursor-pointer"
        title="Close announcement"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
