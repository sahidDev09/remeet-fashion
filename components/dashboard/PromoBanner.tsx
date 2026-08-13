'use client';

import { motion } from 'framer-motion';

export default function PromoBanner() {
  return (
    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0d251c] via-[#133d2d] to-[#071912] border border-[#a3e635]/30 p-6 text-white flex flex-col justify-between h-full min-h-[220px] shadow-xl shadow-black/40 group">
      {/* Animated Liquid Gradient Scrim & Waves */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(163,230,53,0.25),transparent_60%)] pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#a3e635]/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700 pointer-events-none" />

      <div className="relative z-10">
        <span className="text-[10px] font-mono font-bold tracking-widest text-[#a3e635] uppercase block mb-2">
          ⚡ ADVANCED INSIGHTS
        </span>
        <h3 className="text-base font-black leading-tight tracking-tight uppercase">
          See more detail statistic to analyze your decision
        </h3>
      </div>

      <div className="relative z-10 pt-4">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="whitespace-nowrap px-5 py-2.5 rounded-full bg-white text-[#071912] font-black text-xs hover:bg-[#a3e635] transition-colors shadow-lg cursor-pointer inline-flex items-center gap-2"
        >
          <span>See more</span>
          <span>→</span>
        </motion.button>
      </div>
    </div>
  );
}
