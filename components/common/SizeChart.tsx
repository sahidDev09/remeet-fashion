"use client";

import { useState } from 'react';

export default function SizeChart() {
  const [unit, setUnit] = useState<'INCH' | 'CM'>('INCH');

  // Multiplier for CM (1 inch = 2.54 cm). Round to 1 decimal place.
  const toCm = (inch: number) => (inch * 2.54).toFixed(1);

  const measurements = [
    { size: 'M', chest: 39, length: 27.5, sleeve: 8.5 },
    { size: 'L', chest: 40.5, length: 28, sleeve: 8.75 },
    { size: 'XL', chest: 43, length: 29, sleeve: 9 },
    { size: '2XL', chest: 45, length: 30, sleeve: 9.25 },
  ];

  return (
    <div className="py-6 w-full">
      <h3 className="font-bold text-sm text-black/80 mb-4">Size chart - In {unit === 'INCH' ? 'inches' : 'cm'} (Expected Deviation &lt; 3%)</h3>
      
      {/* Tabs */}
      <div className="flex gap-2 border-b border-black/10 relative">
        <button 
          onClick={() => setUnit('INCH')}
          className={`px-5 py-2 rounded-t-md font-mono text-xs z-10 -mb-[1px] transition-colors ${unit === 'INCH' ? 'bg-white border border-black/10 border-b-white text-black font-bold' : 'bg-black/5 border border-transparent text-black/60 hover:bg-black/10'}`}
        >
          INCH
        </button>
        <button 
          onClick={() => setUnit('CM')}
          className={`px-5 py-2 rounded-t-md font-mono text-xs z-10 -mb-[1px] transition-colors ${unit === 'CM' ? 'bg-white border border-black/10 border-b-white text-black font-bold' : 'bg-black/5 border border-transparent text-black/60 hover:bg-black/10'}`}
        >
          CM
        </button>
      </div>

      {/* Table */}
      <div className="mt-4 overflow-x-auto overflow-hidden">
        <table className="w-full text-left font-mono text-xs">
          <thead>
            <tr className="bg-black/5 text-black">
              <th className="py-3 px-4 font-bold border-b border-r border-white">Size</th>
              <th className="py-3 px-4 font-bold border-b border-r border-white">Chest (round)</th>
              <th className="py-3 px-4 font-bold border-b border-r border-white">Length</th>
              <th className="py-3 px-4 font-bold border-b border-white">Sleeve</th>
            </tr>
          </thead>
          <tbody className="bg-black/5 text-black/80">
            {measurements.map((m, idx) => (
              <tr key={m.size} className="hover:bg-black/10 transition-colors">
                <td className={`py-2 px-4 border-r border-white ${idx !== measurements.length - 1 ? 'border-b' : ''}`}>{m.size}</td>
                <td className={`py-2 px-4 border-r border-white ${idx !== measurements.length - 1 ? 'border-b' : ''}`}>
                  {unit === 'INCH' ? m.chest : toCm(m.chest)}
                </td>
                <td className={`py-2 px-4 border-r border-white ${idx !== measurements.length - 1 ? 'border-b' : ''}`}>
                  {unit === 'INCH' ? m.length : toCm(m.length)}
                </td>
                <td className={`py-2 px-4 border-white ${idx !== measurements.length - 1 ? 'border-b' : ''}`}>
                  {unit === 'INCH' ? m.sleeve : toCm(m.sleeve)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
