'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';

interface NavItem {
  label: string;
  href: string;
  isHome?: boolean;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/', isHome: true },
  { label: 'Shop', href: '/category/man' },
  { label: 'New Arrivals', href: '/category/tshirt' },
  { label: 'Collections', href: '/category/eid-collection' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isHomePage = pathname === '/';
  // Navbar uses dark hero styling ONLY at the top of the homepage
  const isDarkHeader = isHomePage && !isScrolled;

  const isItemActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href.startsWith('/#')) return false;
    return pathname.startsWith(href);
  };

  // Helper classes based on header mode
  const navContainerStyle = isDarkHeader
    ? 'bg-transparent py-3.5 sm:py-4'
    : 'bg-white/90 backdrop-blur-xl shadow-sm py-3.5 sm:py-4';

  const logoStyle = isDarkHeader ? 'brightness-0 invert' : 'brightness-0';

  const iconBtnStyle = isDarkHeader
    ? 'bg-white/10 backdrop-blur-md text-white hover:bg-white/20 shadow-sm'
    : 'bg-black/5 backdrop-blur-md text-gray-900 hover:bg-black/10 shadow-sm';

  const mobileBurgerStyle = isDarkHeader
    ? 'bg-white/10 backdrop-blur-md text-white hover:bg-white/20'
    : 'bg-black/5 backdrop-blur-md text-gray-900 hover:bg-black/10';

  const centerCapsuleStyle = isDarkHeader
    ? 'bg-black/30 backdrop-blur-md p-1.5 rounded-full shadow-lg'
    : 'bg-gray-100/90 backdrop-blur-md p-1.5 rounded-full shadow-inner';

  const getItemStyle = (active: boolean) => {
    if (isDarkHeader) {
      return active
        ? 'bg-[#a3e635] text-[#071912] font-black shadow-md'
        : 'text-white/80 hover:text-white hover:bg-white/15';
    }
    return active
      ? 'bg-[#0d251c] text-white font-bold shadow-md'
      : 'text-gray-700 hover:text-black hover:bg-white/80';
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 transition-all duration-300 ${navContainerStyle}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left: Brand Logo & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-full transition-all ${mobileBurgerStyle}`}
            aria-label="Toggle Navigation Menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <Link href="/" className="flex items-center gap-2 group">
            <Image 
              src="/assets/remeet_pre_logo.png" 
              alt="reMeet Logo" 
              width={120} 
              height={36} 
              className={`h-7 sm:h-8 w-auto object-contain transition-all duration-300 opacity-95 group-hover:opacity-100 ${logoStyle}`}
            />
          </Link>
        </div>

        {/* Center: Capsule Navbar */}
        <div className={`hidden md:flex items-center transition-all duration-300 ${centerCapsuleStyle}`}>
          {navItems.map((item) => {
            const active = isItemActive(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`relative px-4 py-2 rounded-full text-xs tracking-wide transition-all duration-300 flex items-center gap-1.5 ${getItemStyle(active)}`}
              >
                {item.isHome && (
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                  </svg>
                )}
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Right: Action Icon Buttons */}
        <div className="flex items-center gap-2.5">
          {/* Cart */}
          <button
            onClick={() => setIsCartOpen(true)}
            className={`w-10 h-10 rounded-full flex items-center justify-center relative transition-all group cursor-pointer ${iconBtnStyle}`}
            title="Shopping Bag"
          >
            <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-[#a3e635] text-[#0d251c] rounded-full text-[10px] font-black flex items-center justify-center shadow-md">
              {totalItems > 0 ? totalItems : 1}
            </span>
          </button>

          {/* Wishlist */}
          <button
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all group cursor-pointer ${iconBtnStyle}`}
            title="Wishlist"
          >
            <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
            </svg>
          </button>

          {/* Account */}
          <button
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all group cursor-pointer ${iconBtnStyle}`}
            title="Account"
          >
            <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-[#0d251c] text-white h-full shadow-2xl flex flex-col pt-20 pb-8 px-6 overflow-y-auto z-10">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => {
                const active = isItemActive(item.href);
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-sm font-semibold py-2.5 border-b border-white/10 transition-colors flex items-center justify-between ${
                      active ? 'text-[#a3e635]' : 'text-white/80 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.isHome && <span className="text-xs">🏠</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
