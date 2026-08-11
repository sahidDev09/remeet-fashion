"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const SparkleIcon = () => (
  <svg className="w-6 h-6 md:w-8 md:h-8 mx-4 md:mx-8 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C12 6.62742 17.3726 12 24 12C17.3726 12 12 17.3726 12 24C12 17.3726 6.62742 12 0 12C6.62742 12 12 6.62742 12 0Z" />
  </svg>
);

const Marquee = () => {
  return (
    <div className="w-full bg-[#527661] text-white py-4 md:py-6 overflow-hidden flex relative z-20">
      <motion.div
        className="flex whitespace-nowrap items-center font-bold text-2xl md:text-4xl tracking-wider uppercase"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: 15, repeat: Infinity }}
      >
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex items-center">
            <span>FASHION</span>
            <SparkleIcon />
            <span>REMEET</span>
            <SparkleIcon />
            <span>COMFORT</span>
            <SparkleIcon />
            <span>ELEGANCE</span>
            <SparkleIcon />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function FeaturedSection() {
  return (
    <section className="w-full relative z-10 flex flex-col">
      <Marquee />

      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 w-full py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-3 auto-rows-[220px] lg:auto-rows-[250px] xl:auto-rows-[280px]">
          
          {/* Card 1: Woman Coat */}
          <div className="col-span-1 row-span-1 md:row-span-2 relative bg-[#131313] group flex flex-col items-center justify-end overflow-hidden rounded-[24px]">
            <div className="absolute inset-0 z-0">
              <Image 
                src="/assets/featured_woman_coat.png" 
                alt="Woman Coat" 
                fill 
                className="object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out" 
                sizes="(max-width: 1024px) 100vw, 25vw"
                priority
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none z-10" />
            <div className="relative z-20 mb-8 w-full flex justify-center">
              <Link href="/category/winter" className="bg-[#527661] text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-[#3d5a49] transition-colors duration-300 shadow-lg w-3/4 max-w-[200px] flex items-center justify-center gap-2">
                Explore Now
              </Link>
            </div>
          </div>

          {/* Card 2: Woman Black Hat */}
          <div className="col-span-1 row-span-1 md:row-span-2 relative bg-[#131313] group flex flex-col items-center justify-end overflow-hidden rounded-[24px]">
            <div className="absolute inset-0 z-0">
              <Image 
                src="/assets/featured_woman_black_hat.png" 
                alt="Woman Black Hat" 
                fill 
                className="object-cover object-top scale-100 group-hover:scale-105 transition-transform duration-700 ease-out" 
                sizes="(max-width: 1024px) 100vw, 25vw"
                priority
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none z-10" />
            <div className="relative z-20 mb-8 w-full flex justify-center">
              <Link href="/category/summer" className="bg-[#527661] text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-[#3d5a49] transition-colors duration-300 shadow-lg w-3/4 max-w-[200px] flex items-center justify-center gap-1">
                Explore Now
              </Link>
            </div>
          </div>

          {/* Card 3: Horizontal Top */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 relative bg-[#131313] group flex items-center h-full overflow-hidden rounded-[24px]">
            <div className="absolute inset-0 z-0">
              <Image 
                src="/assets/featured_woman_winter_tee.png" 
                alt="Woman Winter Tee" 
                fill 
                className="object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out" 
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent pointer-events-none z-10" />
            <div className="relative z-20 w-full flex flex-col items-start pl-8 md:pl-12 pr-4 py-8">
              <span className="text-[10px] md:text-xs uppercase tracking-widest text-white/70 mb-2 md:mb-3">T-Shirt Collection</span>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4 md:mb-5 text-white leading-tight max-w-[250px] lg:max-w-[300px]">
                Stylish Winter T-Shirt for Woman
              </h3>
              <Link href="/category/tshirt" className="bg-[#527661] text-white px-6 md:px-8 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-semibold hover:bg-[#3d5a49] transition-colors duration-300 shadow-lg w-fit flex items-center justify-center gap-2">
                Check Now
              </Link>
            </div>
          </div>

          {/* Card 4: Horizontal Bottom */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 relative bg-[#131313] group flex items-center h-full overflow-hidden rounded-[24px]">
            <div className="absolute inset-0 z-0">
              <Image 
                src="/assets/featured_man_winter_shirt.png" 
                alt="Man Winter Shirt" 
                fill 
                className="object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out" 
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent pointer-events-none z-10" />
            <div className="relative z-20 w-full flex flex-col items-start pl-8 md:pl-12 pr-4 py-8">
              <span className="text-[10px] md:text-xs uppercase tracking-widest text-white/70 mb-2 md:mb-3">Man Collection</span>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4 md:mb-5 text-white leading-tight max-w-[250px] lg:max-w-[300px]">
                Stylish Winter Shirt for Man
              </h3>
              <Link href="/category/man" className="bg-[#527661] text-white px-6 md:px-8 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-semibold hover:bg-[#3d5a49] transition-colors duration-300 shadow-lg w-fit flex items-center justify-center gap-2">
                Check Now
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
