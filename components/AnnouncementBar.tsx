'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-[#131313] text-white text-[11px] font-mono py-2.5 px-4 relative z-50 overflow-hidden flex items-center justify-between border-b border-white/10">
      <div className="flex-1 overflow-hidden flex items-center justify-center">
        <div className="flex items-center gap-6 whitespace-nowrap animate-pulse">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#527661]"></span>
            <span>FREE EXPRESS SHIPPING ON ORDERS OVER ৳2,000 BDT</span>
          </span>
          <span className="text-white/30">•</span>
          <span className="flex items-center gap-2">
            <span>AI VIRTUAL TRY-ON IS NOW LIVE</span>
            <Link href="/products/1/try-on" className="underline underline-offset-4 text-[#7aa88d] hover:text-white transition-colors font-bold">
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
        onClick={() => setIsVisible(false)}
        className="text-white/50 hover:text-white p-1 ml-4 transition-colors shrink-0"
        title="Close announcement"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
