'use client';

import { motion } from 'framer-motion';

interface KpiCardsProps {
  timeRange: string;
}

export default function KpiCards({ timeRange }: KpiCardsProps) {
  // Dynamic metrics depending on time range selection
  const kpiData = [
    {
      id: 'revenue',
      title: 'Total Revenue',
      value: '৳ 6,12,839',
      trend: '+16%',
      isPositive: true,
      subtext: `vs ${timeRange === 'Last 24 hour' ? 'yesterday' : 'last 7 days'}`,
      iconBg: 'bg-[#a3e635]/15 text-[#a3e635]',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: 'customer',
      title: 'Total Customer',
      value: '5,13,456',
      trend: '-0.4%',
      isPositive: false,
      subtext: `vs ${timeRange === 'Last 24 hour' ? 'yesterday' : 'last 7 days'}`,
      iconBg: 'bg-amber-500/15 text-amber-400',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      id: 'transaction',
      title: 'Total Transaction',
      value: '6,37,902',
      trend: '+8%',
      isPositive: true,
      subtext: `vs ${timeRange === 'Last 24 hour' ? 'yesterday' : 'last 7 days'}`,
      iconBg: 'bg-emerald-500/15 text-emerald-400',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
    },
    {
      id: 'product',
      title: 'Total Product',
      value: '2,56,600',
      trend: '+2%',
      isPositive: true,
      subtext: `vs ${timeRange === 'Last 24 hour' ? 'yesterday' : 'last 7 days'}`,
      iconBg: 'bg-cyan-500/15 text-cyan-400',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpiData.map((kpi, idx) => (
        <motion.div
          key={kpi.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: idx * 0.1 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="relative p-5 rounded-2xl border transition-all duration-300 overflow-hidden bg-[#0d251c]/90 border-white/10 shadow-lg shadow-black/40 text-white"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-[#a3e635]/5 blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className={`p-2.5 rounded-xl ${kpi.iconBg}`}>
                {kpi.icon}
              </div>
              <span className="text-xs font-semibold tracking-wide uppercase font-mono text-gray-400">
                {kpi.title}
              </span>
            </div>
          </div>

          <div className="flex items-baseline justify-between mt-2">
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {kpi.value}
            </h3>

            <div className={`flex items-center gap-1 text-xs font-bold font-mono px-2 py-0.5 rounded-full ${
              kpi.isPositive
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                : 'bg-rose-500/15 text-rose-400 border border-rose-500/20'
            }`}>
              <span>{kpi.isPositive ? '↗' : '↘'}</span>
              <span>{kpi.trend}</span>
            </div>
          </div>

          <p className="text-[11px] font-mono mt-2 text-gray-400">
            {kpi.subtext}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
