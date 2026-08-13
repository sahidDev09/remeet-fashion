'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';

interface LookItem {
  id: number;
  name: string;
  price: string;
  numericPrice: number;
  color: string;
  image: string;
  pinTop: string; // % top position on image
  pinLeft: string; // % left position on image
}

const lookHotspots: LookItem[] = [
  {
    id: 1,
    name: 'ESSENTIAL T-SHIRT',
    price: '৳1,490',
    numericPrice: 1490,
    color: 'WHITE',
    image: '/images/products/tshirt1.jpg',
    pinTop: '35%',
    pinLeft: '48%',
  },
  {
    id: 2,
    name: 'OVERSIZED TEE',
    price: '৳1,890',
    numericPrice: 1890,
    color: 'WASHED BLACK',
    image: '/images/products/tshirt2.jpg',
    pinTop: '55%',
    pinLeft: '32%',
  },
  {
    id: 3,
    name: 'GRAPHIC PRINT TEE',
    price: '৳2,190',
    numericPrice: 2190,
    color: 'VINTAGE GREY',
    image: '/images/products/tshirt3.jpg',
    pinTop: '42%',
    pinLeft: '70%',
  },
];

export default function LookbookSection() {
  const { addToCart } = useCart();
  const [activePin, setActivePin] = useState<LookItem | null>(null);

  return (
    <section className="py-20 px-4 sm:px-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-black/10 pb-6 gap-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#527661] mb-2 block">
            Style Inspiration
          </span>
          <h2 className="text-3xl md:text-5xl font-black uppercase text-black tracking-tight leading-none">
            SHOP THE LOOKBOOK
          </h2>
        </div>
        <p className="text-xs font-mono text-black/50 max-w-sm">
          Click the interactive pins on our models to preview and instantly add items to your cart.
        </p>
      </div>

      <div className="relative w-full h-[550px] md:h-[650px] rounded-[36px] overflow-hidden border border-black/10 shadow-2xl bg-[#131313]">
        {/* Main Background Look Image */}
        <Image
          src="/images/home/lookbook/lookbook_main.png"
          alt="Style Lookbook"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-90"
        />

        {/* Dark Gradient Overlay for Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

        {/* Hotspot Pins */}
        {lookHotspots.map((item) => (
          <div
            key={item.id}
            style={{ top: item.pinTop, left: item.pinLeft }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
          >
            <button
              onClick={() => setActivePin(activePin?.id === item.id ? null : item)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 relative group ${
                activePin?.id === item.id
                  ? 'bg-[#527661] text-white scale-125 ring-4 ring-[#527661]/40'
                  : 'bg-white/90 text-black hover:scale-110 shadow-lg'
              }`}
            >
              {/* Pulse ring animation */}
              <span className="absolute inset-0 rounded-full bg-white/40 animate-ping pointer-events-none" />
              <svg className="w-4 h-4 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
          </div>
        ))}

        {/* Floating Product Quick Add Card Popup */}
        <AnimatePresence>
          {activePin && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-8 left-8 right-8 md:right-auto md:w-[360px] bg-white/95 backdrop-blur-xl border border-black/10 rounded-[28px] p-5 shadow-2xl z-30 flex gap-4 items-center"
            >
              <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-black/5 shrink-0 border border-black/5">
                <Image src={activePin.image} alt={activePin.name} fill className="object-cover" />
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-black">
                      {activePin.name}
                    </h4>
                    <button
                      onClick={() => setActivePin(null)}
                      className="text-black/30 hover:text-black p-1 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="text-[10px] text-black/50 font-mono uppercase mt-0.5">
                    {activePin.color}
                  </p>
                  <p className="text-sm font-bold font-mono text-[#527661] mt-1">
                    {activePin.price}
                  </p>
                </div>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => {
                      addToCart({
                        id: activePin.id,
                        name: activePin.name,
                        color: activePin.color,
                        price: activePin.price,
                        numericPrice: activePin.numericPrice,
                        image: activePin.image,
                        size: 'M',
                      });
                      setActivePin(null);
                    }}
                    className="flex-1 bg-[#527661] hover:bg-[#3d5a49] text-white text-[10px] font-bold uppercase tracking-widest py-2 rounded-full transition-colors flex items-center justify-center gap-1"
                  >
                    Quick Add
                  </button>
                  <Link
                    href={`/products/${activePin.id}`}
                    className="px-3 py-2 border border-black/10 hover:bg-black/5 rounded-full text-[10px] font-mono uppercase text-black"
                  >
                    View
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Static Lookbook Title Overlay */}
        <div className="absolute top-8 left-8 z-10 pointer-events-none">
          <span className="text-[10px] font-mono text-white/60 tracking-[0.3em] uppercase block mb-1">
            Series 04 Lookbook
          </span>
          <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
            URBAN WILDERNESS
          </h3>
        </div>
      </div>
    </section>
  );
}
