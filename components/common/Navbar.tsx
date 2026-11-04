'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import SearchModal from '@/components/search/SearchModal';

interface NavItem {
  label: string;
  href: string;
  isHome?: boolean;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/', isHome: true },
  { label: 'Shop', href: '/category/tshirt' },
  { label: 'Men', href: '/category/man' },
  { label: 'Polo Shirts', href: '/category/polo-shirt' },
  { label: 'Collections', href: '/category/eid-collection' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { totalItems, setIsCartOpen } = useCart();
  const { totalWishlistItems, setIsWishlistOpen } = useWishlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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
    <>
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
                src="/images/common/remeet_footer_logo.png" 
                alt="reMeet Logo" 
                width={120} 
                height={36} 
                className={`h-7 sm:h-8 w-auto object-contain transition-all duration-300 opacity-95 group-hover:opacity-100 ${logoStyle}`}
                priority
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
          <div className="flex items-center gap-2">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all group cursor-pointer ${iconBtnStyle}`}
              title="Search Catalog"
              aria-label="Search"
            >
              <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center relative transition-all group cursor-pointer ${iconBtnStyle}`}
              title="Shopping Bag"
              aria-label="Cart"
            >
              <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-[#a3e635] text-[#0d251c] rounded-full text-[10px] font-black flex items-center justify-center shadow-md animate-in zoom-in">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Wishlist */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center relative transition-all group cursor-pointer ${iconBtnStyle}`}
              title="Wishlist"
              aria-label="Wishlist"
            >
              <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
              </svg>
              {totalWishlistItems > 0 && (
                <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-red-500 text-white rounded-full text-[10px] font-black flex items-center justify-center shadow-md animate-in zoom-in">
                  {totalWishlistItems}
                </span>
              )}
            </button>

            {/* Account / Dashboard */}
            <Link
              href="/dashboard"
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all group cursor-pointer ${iconBtnStyle}`}
              title="Store Dashboard / Portal"
              aria-label="Account"
            >
              <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>
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

              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-3">
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full bg-[#a3e635] text-[#071912] font-bold text-xs uppercase tracking-wider py-3 rounded-full text-center"
                >
                  Store Dashboard
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
