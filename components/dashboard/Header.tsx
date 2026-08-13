'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  timeRange: string;
  setTimeRange: (range: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onLogout: () => void;
  onOpenMobileMenu: () => void;
}

export default function Header({
  timeRange,
  setTimeRange,
  searchQuery,
  setSearchQuery,
  onLogout,
  onOpenMobileMenu,
}: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState('Aug 06 - Aug 13, 2026');

  const timeRanges = ['Last 24 hour', 'Last weeks', 'Last month', 'Last year'];

  const notifications = [
    { id: 1, title: 'New High Value Order #25466', time: '5m ago', unread: true, amount: '৳ 2,34,900' },
    { id: 2, title: 'Hoodie Stock Alert (< 15 items left)', time: '1h ago', unread: true, amount: 'Inventory' },
    { id: 3, title: 'Campaign "Eid Special" Launched', time: '3h ago', unread: true, amount: '+18% CTR' },
    { id: 4, title: 'Monthly Revenue Target Surpassed!', time: '1d ago', unread: false, amount: '৳ 6,12,839' },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="sticky top-0 z-20 transition-colors duration-300 bg-[#071912]/90 border-b border-white/10 backdrop-blur-xl px-4 sm:px-8 py-4">
      <div className="flex flex-col gap-4">
        {/* Top Row: Title, Mobile Menu, Search Bar, Notifications, Profile */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenMobileMenu}
              className="md:hidden p-2 rounded-xl bg-white/10 hover:bg-white/15 text-white cursor-pointer"
              aria-label="Open Mobile Navigation"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <div className="flex items-center gap-3">
                
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
                  Dashboard
                </h1>
              </div>
              <p className="text-[11px] font-mono text-gray-400 hidden sm:block mt-0.5">
                Real-time reMeet E-commerce & Retail Performance (BDT ৳)
              </p>
            </div>
          </div>

          {/* Right Action Section */}
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative hidden md:block w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search anything..."
                className="w-full text-xs rounded-xl pl-9 pr-4 py-2.5 outline-none transition-all bg-[#0d251c] text-white placeholder-gray-400 border border-white/10 focus:border-[#a3e635]"
              />
              <svg className="w-4 h-4 text-gray-400 absolute left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2.5 text-gray-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowProfileMenu(false);
                }}
                className="relative p-2.5 rounded-xl transition-all cursor-pointer bg-[#0d251c] hover:bg-white/10 text-gray-200"
                title="Notifications"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white font-bold text-[10px] flex items-center justify-center border-2 border-[#071912]">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-80 rounded-2xl shadow-2xl p-4 border z-50 bg-[#091a13] border-white/10 text-white"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-2">
                      <span className="font-bold text-xs font-mono uppercase tracking-wider">Notifications</span>
                      <span className="text-[10px] bg-[#a3e635]/20 text-[#a3e635] px-2 py-0.5 rounded-full font-mono font-bold">
                        {unreadCount} New
                      </span>
                    </div>

                    <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`p-2.5 rounded-xl text-xs flex items-start justify-between gap-2 transition-colors ${
                            n.unread
                              ? 'bg-white/5 border border-[#a3e635]/30'
                              : 'opacity-60'
                          }`}
                        >
                          <div>
                            <p className="font-medium text-xs leading-tight">{n.title}</p>
                            <span className="text-[10px] text-gray-400 mt-1 block">{n.time}</span>
                          </div>
                          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/20 text-[#a3e635]">
                            {n.amount}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Admin Avatar & Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowProfileMenu(!showProfileMenu);
                  setShowNotifications(false);
                }}
                className="flex items-center gap-2.5 p-1 rounded-full hover:ring-2 hover:ring-[#a3e635]/40 transition-all cursor-pointer"
              >
                <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-[#a3e635]">
                  <Image
                    src="/images/home/manifesto/febricsggsm.png"
                    alt="Admin Avatar"
                    fill
                    className="object-cover"
                  />
                </div>
              </button>

              {/* Profile Dropdown */}
              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-56 rounded-2xl shadow-2xl p-3 border z-50 bg-[#091a13] border-white/10 text-white"
                  >
                    <div className="p-2 border-b border-white/10 mb-2">
                      <p className="font-bold text-xs">Sahid (Store Admin)</p>
                      <p className="text-[10px] font-mono text-gray-400">admin@remeet.fashion</p>
                    </div>

                    <div className="space-y-1">
                      <button className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-white/10 flex items-center gap-2">
                        <span>👤</span> Account Settings
                      </button>
                      <button className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-white/10 flex items-center gap-2">
                        <span>🛡️</span> Security & Audit
                      </button>
                      <button
                        onClick={onLogout}
                        className="w-full text-left px-3 py-2 text-xs rounded-xl text-red-400 hover:bg-red-500/10 flex items-center gap-2 font-bold cursor-pointer"
                      >
                        <span>🚪</span> Log Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Bottom Row: Time Filter Tabs & Date Filter Button */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/5">
          {/* Time Tabs */}
          <div className="inline-flex p-1 rounded-xl gap-1 text-xs font-medium bg-[#0d251c]">
            {timeRanges.map((range) => {
              const active = timeRange === range;
              return (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1.5 rounded-lg transition-all text-xs font-medium cursor-pointer ${
                    active
                      ? 'bg-[#a3e635] text-[#071912] font-bold shadow-md'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {range}
                </button>
              );
            })}
          </div>

          {/* Filter by Date Range */}
          <div className="relative">
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer bg-[#0d251c] text-white border-white/10 hover:border-[#a3e635]/50"
            >
              <span>📅 Filter by date range</span>
              <span className="text-[10px] text-gray-400">({selectedDate})</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Date Range Selector Dropdown */}
            <AnimatePresence>
              {showDatePicker && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute right-0 mt-2 w-64 p-3 rounded-2xl shadow-xl border z-40 text-xs bg-[#091a13] border-white/10 text-white"
                >
                  <p className="font-bold text-xs mb-2 font-mono">Select Range:</p>
                  <div className="space-y-1.5">
                    {['Aug 06 - Aug 13, 2026', 'Jul 01 - Jul 31, 2026', 'Q2 2026 Summary', 'Custom Year to Date'].map((d) => (
                      <button
                        key={d}
                        onClick={() => {
                          setSelectedDate(d);
                          setShowDatePicker(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#a3e635]/20 ${
                          selectedDate === d ? 'font-bold text-[#a3e635]' : ''
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
