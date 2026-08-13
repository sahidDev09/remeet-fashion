'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function BrandManifesto() {
  return (
    <section className="py-20 px-4 sm:px-8 max-w-[1600px] mx-auto border-t border-black/10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#527661] mb-3 block">
          Our Philosophy
        </span>
        <h2 className="text-4xl md:text-6xl font-black uppercase text-black tracking-tight leading-none mb-6">
          ENGINEERED FOR THE UNTAMED
        </h2>
        <p className="text-black/60 font-mono text-sm leading-relaxed">
          reMeet was born from a refusal to compromise between high-fashion minimalism and raw outdoor durability. Every thread, seam, and silhouette is tested against extreme conditions.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[280px]">
        
        {/* Bento Item 1: Large Feature */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="col-span-1 md:col-span-2 row-span-2 relative rounded-[32px] overflow-hidden bg-[#131313] text-white p-8 md:p-12 flex flex-col justify-between border border-black/5 shadow-xl group"
        >
          <Image
            src="/forest_bg.png"
            alt="Forest Craftsmanship"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="relative z-10">
            <span className="text-xs font-mono text-[#7aa88d] uppercase tracking-widest block mb-2">
              [ CRAFT SPECIFICATION ]
            </span>
            <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-none mb-4">
              350+ GSM Heavyweight Cotton
            </h3>
          </div>

          <div className="relative z-10 max-w-md">
            <p className="text-sm text-white/80 font-mono leading-relaxed mb-6">
              Double-combed long-staple organic cotton fibers pre-shrunk to withstand years of active wear without losing shape, color, or softness.
            </p>
            <div className="flex gap-6 border-t border-white/20 pt-6 font-mono text-xs">
              <div>
                <p className="text-white/50 uppercase text-[9px] mb-1">Durability</p>
                <p className="font-bold text-white text-base">Grade 5/5</p>
              </div>
              <div>
                <p className="text-white/50 uppercase text-[9px] mb-1">Shrinkage</p>
                <p className="font-bold text-white text-base">&lt; 1% Guarantee</p>
              </div>
              <div>
                <p className="text-white/50 uppercase text-[9px] mb-1">Origin</p>
                <p className="font-bold text-white text-base">Ethical Mills</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bento Item 2: Stat Card 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="col-span-1 row-span-1 rounded-[32px] bg-[#527661] text-white p-8 flex flex-col justify-between shadow-lg"
        >
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/70">Sustainability</span>
            <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs">🌿</span>
          </div>
          <div>
            <h4 className="text-5xl font-black font-mono tracking-tighter mb-1">100%</h4>
            <p className="text-xs font-mono text-white/80 uppercase">Recycled &amp; Organic Materials</p>
          </div>
        </motion.div>

        {/* Bento Item 3: Stat Card 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="col-span-1 row-span-1 rounded-[32px] bg-white border border-black/10 text-black p-8 flex flex-col justify-between shadow-lg"
        >
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono uppercase tracking-widest text-black/50">Precision Fit</span>
            <span className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-black text-xs">📏</span>
          </div>
          <div>
            <h4 className="text-5xl font-black font-mono tracking-tighter text-[#527661] mb-1">3D AI</h4>
            <p className="text-xs font-mono text-black/60 uppercase">Real-Time Fitting Accuracy</p>
          </div>
        </motion.div>

        {/* Bento Item 4: Weatherproof Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="col-span-1 md:col-span-2 row-span-1 rounded-[32px] bg-[#1a1a1a] text-white p-8 flex flex-col justify-between relative overflow-hidden group shadow-lg"
        >
          <Image
            src="/mountain_bg.png"
            alt="Mountain All Weather"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover opacity-30 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="relative z-10 flex justify-between items-start">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#7aa88d]">ALL-WEATHER READY</span>
            <span className="bg-white/10 text-white text-[10px] font-mono px-3 py-1 rounded-full uppercase">Tested -10°C to +40°C</span>
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold uppercase tracking-tight mb-2">Designed for Every Environment</h3>
            <p className="text-xs text-white/60 font-mono">From high mountain treks to rainy city commutes.</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
