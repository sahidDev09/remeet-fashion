'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { title: 'Hoodies',     href: '/category/man',            image: '/assets/cat_hoodies.png' },
  { title: 'Outerwear',   href: '/category/winter',         image: '/assets/cat_jackets.png' },
  { title: 'Sweatshirts', href: '/category/tshirt',         image: '/assets/cat_sweatshirts.png' },
  { title: 'Bottoms',     href: '/category/unisex',         image: '/assets/cat_bottoms.png' },
  { title: 'Footwear',    href: '/category/eid-collection', image: '/assets/cat_footwear.png' },
];

export default function HeroSection() {
  const sectionRef   = useRef<HTMLElement>(null);
  const sublabelRef  = useRef<HTMLDivElement>(null);
  const titleRef     = useRef<HTMLHeadingElement>(null);
  const subtitleRef  = useRef<HTMLParagraphElement>(null);
  const ctasRef      = useRef<HTMLDivElement>(null);
  const badgesRef    = useRef<HTMLDivElement>(null);
  const catHeaderRef = useRef<HTMLDivElement>(null);
  const catGridRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const to = { opacity: 1, x: 0, y: 0, scale: 1, clearProps: 'all' };

      // ── HERO: sub-label slides in from left ──────────────────────
      gsap.fromTo(
        sublabelRef.current,
        { x: -60, opacity: 0 },
        { ...to, duration: 0.9, ease: 'power3.out', delay: 0.1 },
      );

      // ── HERO: h1 fades + rises ────────────────────────────────────
      gsap.fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        { ...to, duration: 1, ease: 'power4.out', delay: 0.25 },
      );

      // ── HERO: subtitle ───────────────────────────────────────────
      gsap.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { ...to, duration: 0.8, ease: 'power3.out', delay: 0.5 },
      );

      // ── HERO: CTAs stagger ───────────────────────────────────────
      if (ctasRef.current) {
        gsap.fromTo(
          Array.from(ctasRef.current.children),
          { y: 25, opacity: 0 },
          { ...to, duration: 0.7, stagger: 0.15, ease: 'power3.out', delay: 0.7 },
        );
      }

      // ── HERO: badges stagger ─────────────────────────────────────
      if (badgesRef.current) {
        gsap.fromTo(
          Array.from(badgesRef.current.children),
          { y: 20, opacity: 0 },
          { ...to, duration: 0.6, stagger: 0.1, ease: 'power2.out', delay: 0.95 },
        );
      }

      // ── CATEGORY: header scrolls in ──────────────────────────────
      if (catHeaderRef.current) {
        gsap.fromTo(
          Array.from(catHeaderRef.current.children),
          { y: 20, opacity: 0 },
          {
            ...to,
            duration: 0.4,
            stagger: 0.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: catHeaderRef.current,
              start: 'top 98%',
              toggleActions: 'play none none none',
            },
          },
        );
      }

      // ── CATEGORY: cards staggered slide-up with scale ────────────
      if (catGridRef.current) {
        gsap.fromTo(
          Array.from(catGridRef.current.children),
          { y: 30, opacity: 0, scale: 0.96 },
          {
            ...to,
            duration: 0.45,
            stagger: 0.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: catGridRef.current,
              start: 'top 98%',
              toggleActions: 'play none none none',
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full text-white overflow-hidden">

      {/* ── BG IMAGE ─────────────────────────────────────────────── */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/modelbg.png"
          alt="Hero Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-right"
          quality={100}
        />
      </div>

      {/* ── HERO CONTENT ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-8 pt-36 sm:pt-44 pb-20 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column – Content */}
          <div className="lg:col-span-7 flex flex-col justify-center">

            {/* Sub-label */}
            <div ref={sublabelRef} className="flex items-center gap-3 mb-5">
              <span className="text-[#a3e635] font-mono font-bold uppercase tracking-[0.3em]">
                NEW SEASON COLLECTION
              </span>
              <span className="h-[1px] w-10 bg-[#a3e635]/60 inline-block" />
            </div>

            {/* Main Title */}
            <h1
              ref={titleRef}
              className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[1.05] mb-6 text-white"
            >
              Elevate Your <br className="hidden sm:block" />
              Everyday{' '}
              <Image
                src="/assets/style.png"
                alt="Style."
                height={100}
                width={300}
                className="inline-block align-middle h-[1.5em] w-auto"
              />
            </h1>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="text-white/70 text-sm font-mono leading-relaxed max-w-md mb-8 tracking-wide"
            >
              Modern fits. Premium fabrics. <br />
              Made to move with you.
            </p>

            {/* CTAs */}
            <div ref={ctasRef} className="flex flex-wrap items-center gap-6 mb-12">
              <Link
                href="/category/man"
                className="bg-[#a3e635] hover:bg-[#b4f92c] text-[#071912] font-black text-sm uppercase px-8 py-4 rounded-full transition-all shadow-lg shadow-[#a3e635]/25 flex items-center gap-2 hover:scale-105 cursor-pointer tracking-wider"
              >
                SHOP NOW
                <svg className="w-4 h-4 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>

              <button
                onClick={() => alert('Watch Lookbook Video')}
                className="flex items-center gap-3.5 group cursor-pointer text-left"
              >
                <div className="w-12 h-12 rounded-full bg-white text-[#071912] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 rounded fill-current ml-0.5" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-bold text-xs uppercase tracking-widest leading-tight group-hover:text-[#a3e635] transition-colors">
                    Watch Lookbook
                  </p>
                  <p className="text-white/60 text-[10px] font-mono leading-tight mt-0.5 tracking-wider">Play Video</p>
                </div>
              </button>
            </div>

            {/* Feature Badges */}
            <div ref={badgesRef} className="pt-8 border-t border-white/10 flex flex-wrap items-center gap-6 sm:gap-10 text-white/90 text-xs">

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#a3e635]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-white text-xs uppercase tracking-widest leading-tight">Premium</p>
                  <p className="text-white/60 text-[10px] font-mono leading-tight">Quality</p>
                </div>
              </div>

              <div className="h-7 w-[1px] bg-white/15 hidden sm:block" />

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#a3e635]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-white text-xs uppercase tracking-widest leading-tight">Easy Returns</p>
                  <p className="text-white/60 text-[10px] font-mono leading-tight">7 Days</p>
                </div>
              </div>

              <div className="h-7 w-[1px] bg-white/15 hidden sm:block" />

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#a3e635]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-white text-xs uppercase tracking-widest leading-tight">Free Shipping</p>
                  <p className="text-white/60 text-[10px] font-mono leading-tight">On Orders $50+</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ── CATEGORY SPOTLIGHT (inline, bottom of hero) ──────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pb-16 sm:pb-20">

        {/* Subtle divider */}
        <div className="w-full h-px bg-white/10 mb-10" />

        {/* Header Row */}
        <div ref={catHeaderRef} className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Shop By Category
            </h2>
            <span className="h-[2px] w-10 bg-[#a3e635]/60 inline-block hidden sm:inline-block" />
          </div>
          <Link
            href="/category/tshirt"
            className="text-xs sm:text-sm font-semibold text-white/70 hover:text-[#a3e635] transition-colors flex items-center gap-1.5 group"
          >
            View All
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* Category Cards */}
        <div ref={catGridRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="relative h-[220px] sm:h-[280px] rounded-2xl overflow-hidden border border-white/10 hover:border-[#a3e635]/50 shadow-lg transition-all duration-300 group block"
            >
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                <h3 className="text-base sm:text-lg font-extrabold text-white group-hover:text-[#a3e635] transition-colors leading-tight mb-0.5">
                  {cat.title}
                </h3>
                <div className="flex items-center gap-1 text-xs text-white/70 font-medium group-hover:translate-x-1 transition-transform">
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
