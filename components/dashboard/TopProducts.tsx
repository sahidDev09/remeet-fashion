'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function TopProducts() {
  const topProducts = [
    {
      id: 1,
      title: 'Heavyweight Oversized Hoodie',
      category: 'Hoodies & Sweats',
      sold: '310+ item sold',
      image: '/images/home/categories/cat_hoodies.png',
      price: '৳ 12,000',
    },
    {
      id: 2,
      title: 'Tech Waterproof Jacket',
      category: 'Outerwear Collection',
      sold: '285+ item sold',
      image: '/images/home/categories/cat_jackets.png',
      price: '৳ 21,000',
    },
    {
      id: 3,
      title: 'Denim Jacket with White Feathers',
      category: 'Special Edition',
      sold: '240+ item sold out',
      image: '/images/home/categories/cat_sweatshirts.png',
      price: '৳ 18,500',
    },
  ];

  return (
    <div className="p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between h-full bg-[#0d251c]/90 border-white/10 shadow-xl shadow-black/30 text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold tracking-tight text-white">
            Top Product
          </h3>
          <p className="text-[11px] font-mono mt-0.5 text-gray-400">
            top 3 of the week based on total sold
          </p>
        </div>
        <button className="text-xs font-bold hover:underline cursor-pointer text-[#a3e635]">
          View more
        </button>
      </div>

      {/* Products Showcase - List Wise Layout */}
      <div className="space-y-3 flex-1 flex flex-col justify-center">
        {topProducts.map((p) => (
          <motion.div
            key={p.id}
            whileHover={{ scale: 1.01, x: 2 }}
            className="p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 group cursor-pointer bg-[#071912] border-white/10 hover:border-[#a3e635]/40"
          >
            {/* Left Image + Details */}
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-black/10 bg-black/10">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="56px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="overflow-hidden">
                <p className="text-xs font-bold truncate transition-colors group-hover:text-[#a3e635]">
                  {p.title}
                </p>
                <p className="text-[10px] font-mono mt-0.5 text-gray-400">
                  {p.category}
                </p>
              </div>
            </div>

            {/* Right Price & Sales Pill */}
            <div className="text-right shrink-0">
              <p className="font-bold text-xs font-mono text-white">
                {p.price}
              </p>
              <span className="inline-block mt-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#a3e635]/15 text-[#a3e635] border border-[#a3e635]/20">
                {p.sold}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
