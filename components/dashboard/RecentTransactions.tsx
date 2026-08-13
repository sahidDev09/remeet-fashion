'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface RecentTransactionsProps {
  searchQuery: string;
}

export default function RecentTransactions({ searchQuery }: RecentTransactionsProps) {
  const [selectedTransaction, setSelectedTransaction] = useState<any | null>(null);

  const transactions = [
    {
      id: '#23442',
      customer: 'Jenny Wilson',
      email: 'jenny.w@example.com',
      avatar: '/images/home/manifesto/febricsggsm.png',
      location: 'United States',
      item: 'Leather crop top & pants',
      date: '12 Jan',
      amount: '৳ 2,34,900',
      status: 'Completed',
    },
    {
      id: '#25466',
      customer: 'Sarah Connor',
      email: 'sarah.c@example.com',
      avatar: '/images/home/manifesto/febricsggsm.png',
      location: 'United States',
      item: 'Female Tote Bag',
      date: '3 Jan',
      amount: '৳ 2,34,900',
      status: 'Completed',
    },
    {
      id: '#28910',
      customer: 'Marcus Vance',
      email: 'marcus.v@example.com',
      avatar: '/images/home/manifesto/febricsggsm.png',
      location: 'United Kingdom',
      item: 'New Luxury Necklace',
      date: '4 Jan',
      amount: '৳ 2,04,700',
      status: 'Processing',
    },
    {
      id: '#31045',
      customer: 'Aria Thorne',
      email: 'aria.t@example.com',
      avatar: '/images/home/manifesto/febricsggsm.png',
      location: 'France',
      item: 'Shoes Leather',
      date: '2 Jan',
      amount: '৳ 1,93,900',
      status: 'Completed',
    },
  ];

  const filteredTransactions = transactions.filter(
    (t) =>
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between h-full bg-[#0d251c]/90 border-white/10 shadow-xl shadow-black/30 text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold tracking-tight text-white">
            Top Transaction
          </h3>
          <p className="text-[11px] font-mono mt-0.5 text-gray-400">
            of the week based on total purchase (BDT ৳)
          </p>
        </div>
        <button
          onClick={() => setSelectedTransaction(transactions[0])}
          className="text-xs font-bold text-[#a3e635] hover:underline cursor-pointer"
        >
          View detail
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs font-mono">
          <thead>
            <tr className="border-b border-white/10 text-gray-400">
              <th className="py-2.5 px-3 font-semibold">Customer ID</th>
              <th className="py-2.5 px-3 font-semibold">First Item</th>
              <th className="py-2.5 px-3 font-semibold">Date</th>
              <th className="py-2.5 px-3 font-semibold">Purchase</th>
              <th className="py-2.5 px-3 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-6 text-center text-gray-400 font-mono text-xs">
                  No transactions matching search "{searchQuery}"
                </td>
              </tr>
            ) : (
              filteredTransactions.map((t) => (
                <tr
                  key={t.id}
                  className={`transition-colors group ${
                    selectedTransaction?.id === t.id ? 'bg-[#a3e635]/10' : 'hover:bg-white/5'
                  }`}
                >
                  <td className="py-3 px-3 font-bold text-current">{t.id}</td>
                  <td className="py-3 px-3 truncate max-w-[140px] text-gray-300">
                    {t.item}
                  </td>
                  <td className="py-3 px-3 text-gray-400">{t.date}</td>
                  <td className="py-3 px-3 font-bold text-[#a3e635]">{t.amount}</td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => setSelectedTransaction(t)}
                      className="whitespace-nowrap px-4 py-1.5 rounded-full font-bold text-xs bg-[#a3e635] text-[#071912] hover:bg-[#b5f54f] transition-all shadow-sm cursor-pointer inline-flex items-center justify-center"
                    >
                      See detail
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Customer Detail Modal / Popover */}
      <AnimatePresence>
        {selectedTransaction && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTransaction(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="relative z-10 w-full max-w-md p-6 rounded-3xl border shadow-2xl bg-[#091a13] border-white/10 text-white"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-[#a3e635] relative">
                    <Image src={selectedTransaction.avatar} alt="Avatar" fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{selectedTransaction.customer}</h4>
                    <p className="text-[11px] font-mono text-gray-400">📍 {selectedTransaction.location}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTransaction(null)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs font-mono">
                <div className="flex justify-between p-2.5 rounded-xl bg-white/5">
                  <span className="text-gray-400">Transaction ID</span>
                  <span className="font-bold text-[#a3e635]">{selectedTransaction.id}</span>
                </div>

                <div className="flex justify-between p-2.5 rounded-xl bg-white/5">
                  <span className="text-gray-400">Purchased Item</span>
                  <span className="font-bold text-current">{selectedTransaction.item}</span>
                </div>

                <div className="flex justify-between p-2.5 rounded-xl bg-white/5">
                  <span className="text-gray-400">Total Purchase</span>
                  <span className="font-bold text-[#a3e635]">{selectedTransaction.amount}</span>
                </div>

                <div className="flex justify-between p-2.5 rounded-xl bg-white/5">
                  <span className="text-gray-400">Status</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">
                    {selectedTransaction.status}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <button
                  onClick={() => setSelectedTransaction(null)}
                  className="w-full py-2.5 rounded-xl bg-[#a3e635] text-[#071912] font-bold text-xs hover:bg-[#b5f54f] transition-all cursor-pointer"
                >
                  Close Receipt
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
