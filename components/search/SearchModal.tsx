'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/lib/products';
import type { Product } from '@/types/product';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setQuery(''), 0);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Keyboard shortcut ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const searchResults: Product[] = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products.filter((p) => {
      const matchName = p.name.toLowerCase().includes(q);
      const matchColor = p.color.toLowerCase().includes(q);
      const matchCategory = p.categories.some((c) => c.toLowerCase().includes(q));
      const matchDesc = p.description?.toLowerCase().includes(q);
      return matchName || matchColor || matchCategory || matchDesc;
    });
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-start justify-center pt-16 sm:pt-24 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-black/10 overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Search Header */}
        <div className="flex items-center px-6 py-4 border-b border-black/10 gap-3">
          <svg
            className="w-5 h-5 text-black/40"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search streetwear, polo, tees, colors..."
            className="flex-1 text-sm md:text-base outline-none bg-transparent placeholder:text-black/40 text-black font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-black/40 hover:text-black p-1 font-mono"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-black/60 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Quick Filter Suggestions when query is empty */}
        {!query && (
          <div className="p-6">
            <span className="text-[10px] font-mono font-bold tracking-widest text-black/40 uppercase block mb-3">
              Popular Searches
            </span>
            <div className="flex flex-wrap gap-2">
              {['Oversized', 'Knitted Polo', 'Old Money', 'White', 'Summer', 'Heavyweight'].map(
                (term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3.5 py-1.5 rounded-full bg-black/5 hover:bg-[#527661] hover:text-white text-xs font-mono transition-all text-black/70"
                  >
                    #{term}
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {/* Results Area */}
        {query && (
          <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
            {searchResults.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-sm font-bold text-black uppercase tracking-wider mb-1">
                  No products found
                </p>
                <p className="text-xs text-black/40 font-mono">
                  Try searching for &quot;Tee&quot;, &quot;Polo&quot;, &quot;White&quot;, or &quot;Oversized&quot;
                </p>
              </div>
            ) : (
              searchResults.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  onClick={onClose}
                  className="flex items-center gap-4 p-3 rounded-2xl hover:bg-black/5 transition-colors group"
                >
                  <div className="relative w-14 h-16 rounded-xl overflow-hidden bg-black/5 shrink-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold uppercase tracking-wide text-black group-hover:text-[#527661] truncate">
                      {product.name}
                    </h4>
                    <p className="text-[10px] text-black/40 font-mono uppercase mt-0.5">
                      {product.color} • {product.categories.slice(0, 2).join(', ')}
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#527661] shrink-0">
                    {product.price}
                  </span>
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
