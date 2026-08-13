'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardAuth from '@/components/dashboard/DashboardAuth';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import KpiCards from '@/components/dashboard/KpiCards';
import RevenueChart from '@/components/dashboard/RevenueChart';
import CustomerGrowthMap from '@/components/dashboard/CustomerGrowthMap';
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import TopProducts from '@/components/dashboard/TopProducts';
import PromoBanner from '@/components/dashboard/PromoBanner';

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState('Overview');
  const [timeRange, setTimeRange] = useState('Last weeks');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check session auth state on client
    const authSession = sessionStorage.getItem('remeet_dashboard_authenticated');
    setIsAuthenticated(authSession === 'true');
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('remeet_dashboard_authenticated');
    setIsAuthenticated(false);
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#071912] flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-[#a3e635] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <DashboardAuth onAuthenticate={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen flex w-full font-sans bg-[#071912] text-[#e2f3eb]">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        isMobileOpen={isMobileMenuOpen}
        setIsMobileOpen={setIsMobileMenuOpen}
      />

      {/* Main Dashboard Scrollable Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <Header
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onLogout={handleLogout}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        />

        {/* Content Container */}
        <div className="p-4 sm:p-8 space-y-6 max-w-[1600px] mx-auto w-full">
          {/* Active Tab Header Context */}
          {activeTab !== 'Overview' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-2xl border flex items-center justify-between bg-[#0d251c] border-white/10"
            >
              <div>
                <span className="text-[10px] font-mono text-[#a3e635] uppercase font-bold tracking-widest">
                  SECTION VIEW
                </span>
                <h2 className="text-xl font-black uppercase">{activeTab} Management</h2>
              </div>
              <button
                onClick={() => setActiveTab('Overview')}
                className="px-3 py-1.5 rounded-xl bg-[#a3e635] text-[#071912] font-bold text-xs hover:bg-[#b5f54f] cursor-pointer"
              >
                ← Back to Overview
              </button>
            </motion.div>
          )}

          {/* KPI Metrics Cards */}
          <KpiCards timeRange={timeRange} />

          {/* Main Charts Row: Revenue Growth (7 cols) + Customer Growth Map (5 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-7 flex flex-col">
              <RevenueChart timeRange={timeRange} />
            </div>
            <div className="lg:col-span-5 flex flex-col">
              <CustomerGrowthMap />
            </div>
          </div>

          {/* Bottom Row: Top Transactions Table (5 cols) + Top Products (4 cols) + Promo Banner (3 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-6 xl:col-span-5 flex flex-col">
              <RecentTransactions searchQuery={searchQuery} />
            </div>
            <div className="lg:col-span-6 xl:col-span-4 flex flex-col">
              <TopProducts />
            </div>
            <div className="lg:col-span-12 xl:col-span-3 flex flex-col">
              <PromoBanner />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
