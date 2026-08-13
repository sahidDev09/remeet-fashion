'use client';

import { motion } from 'framer-motion';

const perks = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
      </svg>
    ),
    title: 'AI VIRTUAL TRY-ON',
    subtitle: 'See how garments fit on your photo in seconds before buying.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13"/>
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
        <circle cx="5.5" cy="18.5" r="2.5"/>
        <circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    title: 'EXPRESS DELIVERY',
    subtitle: 'Same day dispatch with 2-4 working day nationwide delivery.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: '350+ GSM HEAVYWEIGHT',
    subtitle: 'Crafted from 100% combed organic cotton for structured luxury.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 14 4 9l5-5"/>
        <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11"/>
      </svg>
    ),
    title: '7-DAY HASSLE-FREE RETURNS',
    subtitle: 'Easy exchanges & 100% money back guarantee.',
  },
];

export default function ValueProps() {
  return (
    <section className="w-full relative z-20 py-8 px-4 sm:px-8 max-w-[1600px] mx-auto">
      <div className="bg-white/70 backdrop-blur-xl border border-black/5 rounded-[28px] p-6 sm:p-8 shadow-xl shadow-black/5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {perks.map((perk, index) => (
            <motion.div
              key={perk.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start gap-4 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#527661]/10 text-[#527661] flex items-center justify-center shrink-0 group-hover:bg-[#527661] group-hover:text-white transition-all duration-300">
                {perk.icon}
              </div>
              <div className="flex flex-col">
                <h3 className="text-xs font-bold uppercase tracking-wider text-black mb-1 font-mono">
                  {perk.title}
                </h3>
                <p className="text-[11px] text-black/50 leading-relaxed font-mono">
                  {perk.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
