'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomerGrowthMap() {
  const [selectedCountry, setSelectedCountry] = useState('All Countries');
  const [hoveredCountry, setHoveredCountry] = useState<string | null>('United States');

  const countries = [
    { name: 'United States', flag: '🇺🇸', percentage: 38, count: '20,489', color: 'bg-blue-500', top: '35%', left: '25%' },
    { name: 'United Kingdom', flag: '🇬🇧', percentage: 27, count: '14,560', color: 'bg-indigo-500', top: '26%', left: '46%' },
    { name: 'France', flag: '🇫🇷', percentage: 20, count: '10,780', color: 'bg-sky-500', top: '32%', left: '50%' },
    { name: 'Argentina', flag: '🇦🇷', percentage: 16, count: '8,620', color: 'bg-[#a3e635]', top: '70%', left: '32%' },
    { name: 'Germany', flag: '🇩🇪', percentage: 12, count: '6,470', color: 'bg-amber-400', top: '28%', left: '53%' },
  ];

  return (
    <div className="relative rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col justify-between h-full p-6 bg-[#0d251c]/90 border-white/10 shadow-xl shadow-black/40 text-white">
      {/* Full Card Background World Map Graphic */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center p-2 opacity-25">
        <div className="absolute inset-0 bg-[radial-gradient(#a3e635_1px,transparent_1px)] [background-size:20px_20px] opacity-15" />
        <svg className="w-full h-full text-white fill-current" viewBox="0 0 1000 500">
          <path d="M150 120 Q 220 80 320 110 T 300 250 T 180 220 Z" />
          <path d="M280 270 Q 320 280 340 380 T 290 450 T 260 320 Z" />
          <path d="M480 100 Q 600 80 850 120 T 900 280 T 700 300 T 520 220 Z" />
          <path d="M480 230 Q 560 220 600 320 T 540 430 T 460 300 Z" />
          <path d="M780 340 Q 860 330 880 400 T 800 420 Z" />
        </svg>
      </div>

      {/* Interactive Map Pins Layer */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {countries.map((c) => {
          const isHovered = hoveredCountry === c.name;
          return (
            <div
              key={c.name}
              style={{ top: c.top, left: c.left }}
              className="absolute pointer-events-auto cursor-pointer"
              onMouseEnter={() => setHoveredCountry(c.name)}
            >
              <span className="relative flex h-4 w-4">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${c.color}`} />
                <span className={`relative inline-flex rounded-full h-4 w-4 border-2 border-white ${c.color}`} />
              </span>

              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: -5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="absolute -top-12 -left-14 bg-[#071912] border border-[#a3e635]/40 text-white text-[10px] font-mono px-2.5 py-1 rounded-xl shadow-2xl z-30 whitespace-nowrap"
                >
                  <span className="font-bold block">{c.flag} {c.name}</span>
                  <span className="text-[#a3e635] font-bold">{c.percentage}% ({c.count})</span>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      {/* Card Content Overlay Layer */}
      <div className="relative z-20 flex flex-col justify-between h-full space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold tracking-tight text-white">
              Customer Growth
            </h3>
            <p className="text-[11px] font-mono mt-0.5 text-gray-400">
              of the week based on country
            </p>
          </div>

          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="text-xs font-mono rounded-xl px-2.5 py-1.5 border outline-none transition-all cursor-pointer bg-[#071912] text-white border-white/15"
          >
            <option value="All Countries">country (all)</option>
            {countries.map((c) => (
              <option key={c.name} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Country Progress List Overlay Card at bottom */}
        <div className="p-4 rounded-2xl border backdrop-blur-md space-y-2.5 transition-all bg-[#071912]/80 border-white/10">
          {countries.map((c) => {
            const isHovered = hoveredCountry === c.name;
            return (
              <div
                key={c.name}
                onMouseEnter={() => setHoveredCountry(c.name)}
                className={`p-1.5 rounded-xl transition-all cursor-pointer ${
                  isHovered ? 'bg-white/10' : ''
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{c.flag}</span>
                    <span className="font-semibold text-white">
                      {c.name}
                    </span>
                  </div>
                  <span className="font-bold text-[#a3e635]">
                    {c.percentage}%
                  </span>
                </div>

                <div className="w-full h-2 rounded-full overflow-hidden bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${c.percentage}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className={`h-full rounded-full ${c.color}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
