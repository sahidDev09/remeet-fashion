'use client';

import Image from 'next/image';
import Link from 'next/link';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
  setIsMobileOpen,
}: SidebarProps) {
  const menuItems = [
    { id: 'Overview', label: 'Overview', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
    { id: 'Product', label: 'Product', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
    { id: 'Customer', label: 'Customer', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
    { id: 'Transaction', label: 'Transaction', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { id: 'Statistics', label: 'Statistics', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 'Campaign', label: 'Campaign', badge: 'New', icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A2.5 2.5 0 013 11.2V8.8a2.5 2.5 0 012.436-2.483l1.838-.066a2 2 0 001.9-1.579l.504-2.016A2 2 0 0111.62 1.34l.2.05A2 2 0 0113.5 3.328v1.365' },
    { id: 'Log Activity', label: 'Log Activity', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
  ];

  const supportItems = [
    { id: 'Setting', label: 'Setting', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
    { id: 'Help', label: 'Help', icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  ];

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between p-4 bg-[#091a13] text-[#e2f3eb] border-r border-white/10">
      {/* Top Header & reMeet Logo */}
      <div>
        <div className="flex items-center justify-between px-2 py-3 mb-6">
          <Link href="/" className="flex items-center gap-3 group">
            {isCollapsed ? (
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0d251c] to-[#173d2f] border border-[#a3e635]/40 flex items-center justify-center shadow-md">
                <span className="text-[#a3e635] font-black text-xl tracking-tighter">rM</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Image
                  src="/images/common/remeet_footer_logo.png"
                  alt="reMeet Fashion Logo"
                  width={140}
                  height={40}
                  className="h-7 w-auto object-contain brightness-0 invert"
                />
                <span className="text-[10px] font-mono font-bold tracking-wider text-[#a3e635] bg-[#a3e635]/15 px-2 py-0.5 rounded-full border border-[#a3e635]/30">
                  DASHBOARD
                </span>
              </div>
            )}
          </Link>

          {/* Desktop Collapse Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex p-1.5 rounded-lg text-gray-400 hover:text-[#a3e635] hover:bg-white/5 transition-all cursor-pointer"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            <svg className={`w-5 h-5 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
        </div>

        {/* Menu Section */}
        <div className="space-y-6">
          <div>
            {!isCollapsed && (
              <span className="px-3 text-[10px] font-mono font-bold tracking-widest text-gray-400 uppercase block mb-3">
                MENU
              </span>
            )}
            <nav className="space-y-1">
              {menuItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileOpen(false);
                    }}
                    className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl font-medium text-xs transition-all relative group cursor-pointer ${
                      isActive
                        ? 'bg-[#a3e635] text-[#071912] font-bold shadow-lg shadow-[#a3e635]/20'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <svg className="w-4 h-4 shrink-0 fill-none stroke-current stroke-[2]" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>

                    {!isCollapsed && (
                      <span className="truncate flex-1 text-left">{item.label}</span>
                    )}

                    {!isCollapsed && item.badge && (
                      <span className="px-2 py-0.5 text-[9px] font-bold font-mono uppercase rounded-full bg-red-500 text-white shadow-sm animate-pulse">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Support Section */}
          <div>
            {!isCollapsed && (
              <span className="px-3 text-[10px] font-mono font-bold tracking-widest text-gray-400 uppercase block mb-3">
                SUPPORT
              </span>
            )}
            <nav className="space-y-1">
              {supportItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileOpen(false);
                    }}
                    className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl font-medium text-xs transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#a3e635] text-[#071912] font-bold shadow-lg'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <svg className="w-4 h-4 shrink-0 fill-none stroke-current stroke-[2]" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                    {!isCollapsed && <span className="truncate">{item.label}</span>}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Footer Profile Snippet when extended */}
      {!isCollapsed && (
        <div className="p-3 rounded-2xl border bg-[#0d251c]/60 border-white/10 flex items-center gap-3">
          <div className="relative">
            <Image
              src="/images/home/manifesto/febricsggsm.png"
              alt="Admin Avatar"
              width={36}
              height={36}
              className="rounded-full object-cover border border-[#a3e635]"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#a3e635] border-2 border-[#091a13] rounded-full" />
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold truncate">Sahid Admin</p>
            <p className="text-[10px] text-gray-400 truncate font-mono">admin@remeet.fashion</p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden md:block sticky top-0 h-screen transition-all duration-300 shrink-0 z-30 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}>
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop & Sidebar */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />
          <div className="relative w-72 h-full z-10">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
