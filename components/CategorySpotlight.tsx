'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const spotlightCategories = [
  {
    slug: 'knitted-polo',
    title: 'KNITTED POLOS',
    subtitle: 'Textured luxury woven for elevated warmth & breathable elegance.',
    image: '/assets/tshirt1.jpg',
    tag: 'Trending Now',
    itemCount: '12 Items',
  },
  {
    slug: 'dropshoulder-tshirt',
    title: 'DROPSHOULDER TEES',
    subtitle: 'Relaxed street silhouettes crafted in 350+ GSM organic cotton.',
    image: '/assets/tshirt2.jpg',
    tag: 'Bestsellers',
    itemCount: '18 Items',
  },
  {
    slug: 'winter',
    title: 'WINTER JACKETS',
    subtitle: 'Weatherproof heavy outerwear built for urban exploration.',
    image: '/assets/featured_woman_coat.png',
    tag: 'New Drop',
    itemCount: '8 Items',
  },
  {
    slug: 'old-money-polo',
    title: 'OLD MONEY SERIES',
    subtitle: 'Understated quiet luxury aesthetics with refined minimalist fits.',
    image: '/assets/tshirt3.jpg',
    tag: 'Limited Edition',
    itemCount: '6 Items',
  },
];

export default function CategorySpotlight() {
  return (
    <section className="py-16 px-4 sm:px-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-black/10 pb-6 gap-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#527661] mb-2 block">
            Curated Collections
          </span>
          <h2 className="text-3xl md:text-5xl font-black uppercase text-black tracking-tight leading-none">
            EXPLORE BY CATEGORY
          </h2>
        </div>
        <Link
          href="/category/tshirt"
          className="text-xs font-mono font-bold uppercase tracking-widest text-[#527661] hover:text-[#3d5a49] flex items-center gap-2 group"
        >
          View All Collections
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {spotlightCategories.map((cat, idx) => (
          <motion.div
            key={cat.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <Link
              href={`/category/${cat.slug}`}
              className="group relative h-[420px] rounded-[32px] overflow-hidden flex flex-col justify-end p-6 border border-black/5 shadow-lg block"
            >
              {/* Background Image */}
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />

              {/* Tag Badge */}
              <div className="absolute top-5 left-5 z-20 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-mono font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                {cat.tag}
              </div>

              {/* Content */}
              <div className="relative z-20 text-white flex flex-col justify-end">
                <span className="text-[10px] font-mono text-white/60 tracking-widest uppercase mb-1">
                  {cat.itemCount}
                </span>
                <h3 className="text-xl font-bold uppercase tracking-tight mb-2 group-hover:text-[#7aa88d] transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-white/70 font-mono leading-relaxed mb-4 line-clamp-2">
                  {cat.subtitle}
                </p>
                <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase text-white group-hover:translate-x-1 transition-transform">
                  Shop Collection <span>→</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
