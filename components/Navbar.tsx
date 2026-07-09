'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef, useCallback } from 'react';
import gsap from 'gsap';

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
  { label: 'Man', href: '/category/man' },
  { label: 'Unisex', href: '/category/unisex' },
  {
    label: 'Polo Shirt',
    href: '/category/polo-shirt',
    children: [
      { label: 'Knitted Polo', href: '/category/knitted-polo' },
      { label: 'Old Money Polo', href: '/category/old-money-polo' },
    ],
  },
  {
    label: 'T-Shirt',
    href: '/category/tshirt',
    children: [
      { label: 'Dropshoulder T-Shirt', href: '/category/dropshoulder-tshirt' },
      { label: 'reMeet Edition', href: '/category/remeet-edition' },
      { label: 'Sports T-Shirt', href: '/category/sports-tshirt' },
      { label: 'Premium Solid', href: '/category/premium-solid' },
    ],
  },
  { label: 'Summer', href: '/category/summer' },
  { label: 'Winter', href: '/category/winter' },
  { label: 'Eid Collection', href: '/category/eid-collection' },
];

export default function Navbar() {
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const closeTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const tweens = useRef<Record<string, gsap.core.Tween>>({});

  const openDropdown = useCallback((label: string) => {
    // Clear any pending close timer
    if (closeTimers.current[label]) {
      clearTimeout(closeTimers.current[label]);
      delete closeTimers.current[label];
    }

    const dropdown = dropdownRefs.current[label];
    const children = dropdown?.querySelectorAll('.dropdown-item');
    if (!dropdown) return;

    // Kill any running tween
    tweens.current[label]?.kill();

    // Make visible and animate in
    gsap.set(dropdown, { display: 'block', pointerEvents: 'auto' });

    tweens.current[label] = gsap.to(dropdown, {
      opacity: 1,
      y: 0,
      scaleY: 1,
      duration: 0.35,
      ease: 'power3.out',
    });

    // Stagger animate children
    if (children && children.length > 0) {
      gsap.fromTo(
        children,
        { opacity: 0, x: -8 },
        { opacity: 1, x: 0, duration: 0.3, stagger: 0.05, ease: 'power2.out', delay: 0.1 }
      );
    }

    // Animate the arrow on the trigger
    const arrow = itemRefs.current[label]?.querySelector('.dropdown-arrow');
    if (arrow) {
      gsap.to(arrow, { rotation: 180, duration: 0.3, ease: 'power2.out' });
    }
  }, []);

  const closeDropdown = useCallback((label: string) => {
    // Delay close to allow cursor to move to dropdown
    closeTimers.current[label] = setTimeout(() => {
      const dropdown = dropdownRefs.current[label];
      if (!dropdown) return;

      tweens.current[label]?.kill();

      tweens.current[label] = gsap.to(dropdown, {
        opacity: 0,
        y: -8,
        scaleY: 0.95,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set(dropdown, { display: 'none', pointerEvents: 'none' });
        },
      });

      // Reverse arrow
      const arrow = itemRefs.current[label]?.querySelector('.dropdown-arrow');
      if (arrow) {
        gsap.to(arrow, { rotation: 0, duration: 0.25, ease: 'power2.in' });
      }
    }, 80);
  }, []);

  return (
    <nav className="fixed top-0 z-50 w-full px-8 py-6 bg-gradient-to-r from-green-100/90 to-white/90 backdrop-blur-md border-b border-black/5 transition-all">
      <div className="flex justify-between items-center text-black/80 text-xs font-mono tracking-widest uppercase">
        <Link href="/" className="flex-shrink-0 flex items-center">
          <Image 
            src="/assets/remeet_pre_logo.png" 
            alt="reMeet Logo" 
            width={120} 
            height={40} 
            className="h-8 w-auto object-contain scale-[1.2] origin-left"
          />
        </Link>

        <div className="hidden md:flex space-x-8 items-center">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && openDropdown(item.label)}
              onMouseLeave={() => item.children && closeDropdown(item.label)}
            >
              <Link
                href={item.href}
                ref={(el) => {
                  if (item.children) itemRefs.current[item.label] = el;
                }}
                className="hover:text-[#527661] transition-colors flex items-center gap-1"
              >
                {item.label}
                {item.children && (
                  <span className="dropdown-arrow inline-block text-[10px] origin-center">⇂</span>
                )}
              </Link>

              {item.children && (
                <div
                  ref={(el) => {
                    dropdownRefs.current[item.label] = el;
                  }}
                  className="absolute top-full left-0 pt-3 min-w-[220px] z-50"
                  style={{ display: 'none', opacity: 0, transform: 'translateY(-8px) scaleY(0.95)', pointerEvents: 'none', transformOrigin: 'top center' }}
                >
                  <div className="bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-black/5 py-2 overflow-hidden">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="dropdown-item block px-5 py-2.5 text-[11px] tracking-wider text-black/70 hover:text-[#527661] hover:bg-green-50/60 hover:pl-7 transition-all duration-200"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <button className="hover:text-[#527661] transition-colors p-2 bg-black/5 rounded backdrop-blur-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
          <button className="hover:text-[#527661] transition-colors p-2 bg-black/5 rounded backdrop-blur-sm relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-[#527661] text-white text-[8px] font-bold">
              0
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}
