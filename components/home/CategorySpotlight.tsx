'use client';

import Image from 'next/image';
import Link from 'next/link';

const categories = [
  {
    title: 'Hoodies',
    href: '/category/man',
    image: '/images/home/categories/cat_hoodies.png',
  },
  {
    title: 'Outerwear',
    href: '/category/winter',
    image: '/images/home/categories/cat_jackets.png',
  },
  {
    title: 'Sweatshirts',
    href: '/category/tshirt',
    image: '/images/home/categories/cat_sweatshirts.png',
  },
  {
    title: 'Bottoms',
    href: '/category/unisex',
    image: '/images/home/categories/cat_bottoms.png',
  },
  {
    title: 'Footwear',
    href: '/category/eid-collection',
    image: '/images/home/categories/cat_footwear.png',
  },
];

export default function CategorySpotlight() {
  return (
    <section className="relative w-full bg-gradient-to-b from-[#0a2017] to-[#071912] text-white pt-4 pb-20 sm:pb-24 px-4 sm:px-8 overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#1a4a35]/20 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8 sm:mb-10">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Shop By Category
            </h2>
            <span className="h-[2px] w-12 bg-white/30 inline-block hidden sm:inline-block"></span>
          </div>

          <Link
            href="/category/tshirt"
            className="text-xs sm:text-sm font-semibold text-white/80 hover:text-[#a3e635] transition-colors flex items-center gap-1.5 group"
          >
            View All Categories
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* 5 Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {categories.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="relative h-[300px] sm:h-[360px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-white/10 hover:border-[#a3e635]/50 transition-all duration-300 block group"
            >
              {/* Background Category Image */}
              <Image
                src={category.image}
                alt={category.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* Content at bottom left */}
              <div className="absolute bottom-0 left-0 right-0 p-5 z-10 flex flex-col justify-end">
                <h3 className="text-lg sm:text-xl font-extrabold text-white group-hover:text-[#a3e635] transition-colors leading-tight mb-1">
                  {category.title}
                </h3>
                <div className="flex items-center gap-1 text-xs text-white/80 font-medium group-hover:translate-x-1 transition-transform">
                  <span>Shop Now</span>
                  <span>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
