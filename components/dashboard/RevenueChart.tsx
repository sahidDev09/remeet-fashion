'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RevenueChartProps {
  timeRange: string;
}

export default function RevenueChart({ timeRange }: RevenueChartProps) {
  const [hoveredDay, setHoveredDay] = useState<string | null>('Wed');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [activeSeries, setActiveSeries] = useState<'both' | 'website' | 'ecommerce'>('both');

  const chartData = [
    { day: 'Sun', website: 520, ecommerce: 390, total: '৳ 91,000' },
    { day: 'Mon', website: 760, ecommerce: 640, total: '৳ 1,40,000' },
    { day: 'Tue', website: 850, ecommerce: 680, total: '৳ 1,53,000' },
    { day: 'Wed', website: 940, ecommerce: 670, total: '৳ 82,729' },
    { day: 'Thu', website: 610, ecommerce: 480, total: '৳ 1,09,000' },
    { day: 'Fri', website: 980, ecommerce: 890, total: '৳ 1,87,000' },
    { day: 'Sat', website: 950, ecommerce: 720, total: '৳ 1,67,000' },
  ];

  const maxVal = 1000;

  return (
    <div className="p-6 rounded-2xl border transition-all duration-300 relative flex flex-col justify-between h-full bg-[#0d251c]/90 border-white/10 shadow-xl shadow-black/30 text-white">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold tracking-tight text-white">
              Revenue Growth <span className="text-xs font-mono font-normal text-gray-400">(BDT ৳)</span>
            </h3>
          </div>
          <p className="text-[11px] font-mono mt-0.5 text-gray-400">
            of the week on website and compared with e-commerce
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Legend Toggles */}
          <div className="flex items-center gap-2 text-xs font-mono">
            <button
              onClick={() => setActiveSeries(activeSeries === 'website' ? 'both' : 'website')}
              className={`flex items-center gap-1.5 px-2 py-1 rounded-lg border transition-all ${
                activeSeries === 'website' || activeSeries === 'both'
                  ? 'border-[#a3e635] text-[#a3e635]'
                  : 'border-transparent text-gray-400'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#a3e635]" />
              <span>Website</span>
            </button>

            <button
              onClick={() => setActiveSeries(activeSeries === 'ecommerce' ? 'both' : 'ecommerce')}
              className={`flex items-center gap-1.5 px-2 py-1 rounded-lg border transition-all ${
                activeSeries === 'ecommerce' || activeSeries === 'both'
                  ? 'border-cyan-400 text-cyan-400'
                  : 'border-transparent text-gray-400'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              <span>E-commerce</span>
            </button>
          </div>

          <button
            onClick={() => setShowDetailModal(true)}
            className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
            title="Zoom Detail View"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
            </svg>
          </button>

          <button
            onClick={() => setShowDetailModal(true)}
            className="text-xs font-bold text-[#a3e635] hover:underline cursor-pointer"
          >
            View detail
          </button>
        </div>
      </div>

      {/* Chart Canvas Area */}
      <div className="relative h-64 w-full flex items-end pt-8 pb-6">
        {/* Y-Axis Gridlines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[10px] font-mono text-gray-400/60">
          {[1000, 800, 600, 400, 200, 0].map((val) => (
            <div key={val} className="flex items-center gap-2">
              <span className="w-8 text-right">{val}</span>
              <div className="flex-1 border-b border-dashed border-gray-500/20" />
            </div>
          ))}
        </div>

        {/* Bars Container */}
        <div className="relative w-full h-full ml-10 flex items-end justify-between px-2 sm:px-6 z-10">
          {chartData.map((item) => {
            const isHovered = hoveredDay === item.day;
            const webHeight = `${(item.website / maxVal) * 100}%`;
            const ecomHeight = `${(item.ecommerce / maxVal) * 100}%`;

            return (
              <div
                key={item.day}
                onMouseEnter={() => setHoveredDay(item.day)}
                className="relative flex-1 h-full flex flex-col items-center justify-end group cursor-pointer"
              >
                {/* Interactive Tooltip Card */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.9 }}
                      className="absolute -top-12 z-30 bg-[#071912] text-white border border-[#a3e635]/40 text-[11px] font-mono px-3 py-1.5 rounded-xl shadow-xl whitespace-nowrap pointer-events-none text-center"
                    >
                      <span className="text-gray-400 block text-[9px]">Total revenue ({item.day})</span>
                      <span className="text-[#a3e635] font-bold text-xs">{item.total}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Bars Pair */}
                <div className="flex items-end gap-1 sm:gap-2 h-full w-full justify-center px-1">
                  {(activeSeries === 'both' || activeSeries === 'website') && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: webHeight }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className={`w-3 sm:w-4 rounded-t-md transition-all duration-300 ${
                        isHovered ? 'bg-[#b8f54c] shadow-lg shadow-[#a3e635]/40' : 'bg-[#a3e635]'
                      }`}
                    />
                  )}

                  {(activeSeries === 'both' || activeSeries === 'ecommerce') && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: ecomHeight }}
                      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                      className={`w-3 sm:w-4 rounded-t-md transition-all duration-300 ${
                        isHovered ? 'bg-cyan-300 shadow-lg shadow-cyan-400/40' : 'bg-cyan-500'
                      }`}
                    />
                  )}
                </div>

                {/* X-Axis Label */}
                <span className={`mt-3 text-xs font-mono transition-colors ${
                  isHovered ? 'text-[#a3e635] font-bold' : 'text-gray-400'
                }`}>
                  {item.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {showDetailModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDetailModal(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative z-10 w-full max-w-xl p-6 rounded-3xl border shadow-2xl bg-[#091a13] border-white/10 text-white"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div>
                  <h3 className="font-bold text-lg">Revenue Growth Analytics Breakdown (BDT ৳)</h3>
                  <p className="text-xs text-gray-400 font-mono">Detailed comparisons across channels in Taka</p>
                </div>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="text-gray-400 hover:text-white p-1"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-gray-400">Total Website Revenue</span>
                    <p className="text-xl font-bold text-[#a3e635] mt-1">৳ 5,37,000</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-gray-400">Total E-Commerce Channel</span>
                    <p className="text-xl font-bold text-cyan-400 mt-1">৳ 4,46,000</p>
                  </div>
                </div>

                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-white/10 text-gray-400">
                      <th className="py-2">Day</th>
                      <th className="py-2">Website</th>
                      <th className="py-2">E-Commerce</th>
                      <th className="py-2 text-right">Combined Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chartData.map((d) => (
                      <tr key={d.day} className="border-b border-white/5">
                        <td className="py-2 font-bold">{d.day}</td>
                        <td className="py-2 text-[#a3e635]">৳ {d.website * 100}</td>
                        <td className="py-2 text-cyan-400">৳ {d.ecommerce * 100}</td>
                        <td className="py-2 text-right font-bold">{d.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 text-right">
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="px-5 py-2 rounded-xl bg-[#a3e635] text-[#071912] font-bold text-xs hover:bg-[#b5f54f] transition-all cursor-pointer"
                >
                  Close Analytics
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
