'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ProductGallery from '@/components/ProductGallery';
import SizeChart from '@/components/SizeChart';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/lib/products';

interface ProductDetailsClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailsClient({ product, relatedProducts }: ProductDetailsClientProps) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [openAccordion, setOpenAccordion] = useState<'desc' | 'shipping' | null>('desc');
  const [isWishlist, setIsWishlist] = useState<boolean>(false);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      color: product.color,
      price: product.price,
      numericPrice: product.numericPrice,
      image: product.image,
      size: selectedSize,
    });
  };

  return (
    <div className="flex flex-col min-h-screen selection:bg-black selection:text-white">
      <main className="flex-grow max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12 mt-20 md:mt-16">
        {/* Breadcrumb */}
        <div className="text-sm text-black/60 mb-8 flex items-center gap-2 font-mono uppercase tracking-widest text-[10px]">
          <Link href="/" className="hover:text-black transition-colors flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Home
          </Link>
          <span className="text-black/30">•</span>
          <Link href="/category/tshirt" className="hover:text-black transition-colors">
            Products
          </Link>
          <span className="text-black/30">•</span>
          <span className="text-black font-bold">{product.name}</span>
        </div>

        {/* Product Top Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Images Gallery Component */}
          <ProductGallery images={[product.image, product.image, product.image]} alt={product.name} />

          {/* Product Info */}
          <div className="flex flex-col py-4">
            <div className="border border-black/10 bg-white/50 rounded-full px-4 py-1.5 text-[10px] font-bold tracking-widest uppercase w-fit mb-6 text-black/60 font-mono">
              reMeet Exclusive
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 uppercase">{product.name}</h1>
            <div className="flex items-baseline gap-4 mb-8">
              <p className="text-2xl font-bold text-[#527661] font-mono">{product.price}</p>
              {product.originalPrice && (
                <p className="text-sm text-black/40 line-through font-mono">{product.originalPrice}</p>
              )}
              {product.discount && (
                <span className="bg-[#527661]/10 text-[#527661] text-xs font-bold font-mono px-2.5 py-1 rounded-full">
                  {product.discount} OFF
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 bg-white/60 border border-black/5 rounded-full px-5 py-3 text-xs text-black/70 mb-10 font-mono">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#527661]"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>Order in <span className="font-bold text-black bg-black/5 px-2 py-0.5 rounded-md">02:30:25</span> to get next day delivery</span>
            </div>

            {/* Size Selector */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-bold tracking-widest uppercase">Select Size</h3>
                <span className="text-[10px] font-mono text-black/50">Selected: <strong className="text-black">{selectedSize}</strong></span>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all duration-300 ${
                      selectedSize === size 
                        ? 'bg-[#527661] text-white shadow-md scale-105' 
                        : 'bg-white/50 text-black hover:bg-white border border-black/10 hover:border-black/30'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-[#131313] text-white rounded-full py-4 text-xs font-bold tracking-widest uppercase hover:bg-[#527661] transition-colors shadow-xl shadow-black/10 flex items-center justify-center gap-2 active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                Add to Cart
              </button>

              <Link 
                href={`/products/${product.id}/try-on`} 
                className="flex-1 bg-[#527661] text-white hover:bg-[#3d5a49] border border-transparent rounded-full py-4 text-xs font-bold tracking-widest uppercase transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                Virtual Trial
              </Link>

              <button 
                onClick={() => setIsWishlist(!isWishlist)}
                className={`w-14 h-14 shrink-0 border rounded-full flex items-center justify-center transition-all ${
                  isWishlist 
                    ? 'bg-red-50 border-red-200 text-red-500' 
                    : 'border-black/10 bg-white/50 text-black hover:bg-white hover:border-black/30'
                }`}
                title="Wishlist"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={isWishlist ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              </button>
            </div>

            {/* Accordions */}
            <div className="border-t border-black/10">
              {/* Description Accordion */}
              <div className="py-5 border-b border-black/10">
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'desc' ? null : 'desc')}
                  className="w-full flex justify-between items-center cursor-pointer group text-left"
                >
                  <h3 className="font-bold text-sm tracking-widest uppercase">Description & Fit</h3>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className={`text-black/40 group-hover:text-black transition-transform duration-300 ${openAccordion === 'desc' ? 'rotate-180' : ''}`}
                  >
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </button>
                {openAccordion === 'desc' && (
                  <p className="mt-4 text-sm text-black/60 leading-relaxed font-mono animate-in fade-in duration-200">
                    Premium heavyweight cotton fabric crafted for maximum comfort and durability. Features relaxed shoulder seams, reinforced collar, and a modern minimal finish designed for everyday urban wear.
                  </p>
                )}
              </div>

              {/* Shipping Accordion */}
              <div className="py-5 border-b border-black/10">
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'shipping' ? null : 'shipping')}
                  className="w-full flex justify-between items-center cursor-pointer group text-left"
                >
                  <h3 className="font-bold text-sm tracking-widest uppercase">Shipping & Delivery</h3>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className={`text-black/40 group-hover:text-black transition-transform duration-300 ${openAccordion === 'shipping' ? 'rotate-180' : ''}`}
                  >
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </button>
                {openAccordion === 'shipping' && (
                  <div className="mt-6 grid grid-cols-2 gap-y-6 gap-x-4 animate-in fade-in duration-200">
                    <div className="flex items-start gap-3">
                      <div className="bg-white border border-black/10 p-2 rounded-full shadow-sm text-[#527661] shrink-0">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                      </div>
                      <div className="font-mono">
                        <p className="text-[10px] uppercase tracking-widest text-black/40 mb-0.5">Discount</p>
                        <p className="text-xs font-bold">Standard Discount</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-white border border-black/10 p-2 rounded-full shadow-sm text-[#527661] shrink-0">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
                      </div>
                      <div className="font-mono">
                        <p className="text-[10px] uppercase tracking-widest text-black/40 mb-0.5">Package</p>
                        <p className="text-xs font-bold">Eco Packaging</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-white border border-black/10 p-2 rounded-full shadow-sm text-[#527661] shrink-0">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                      </div>
                      <div className="font-mono">
                        <p className="text-[10px] uppercase tracking-widest text-black/40 mb-0.5">Delivery Time</p>
                        <p className="text-xs font-bold">2-4 Working Days</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-white border border-black/10 p-2 rounded-full shadow-sm text-[#527661] shrink-0">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                      </div>
                      <div className="font-mono">
                        <p className="text-[10px] uppercase tracking-widest text-black/40 mb-0.5">Coverage</p>
                        <p className="text-xs font-bold">All Bangladesh</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Size Chart Section */}
              <SizeChart />
            </div>

          </div>
        </div>

        {/* Rating & Reviews Section */}
        <div className="mt-20 pt-6 border-t border-black/10">
          <h2 className="text-3xl font-bold mb-12 uppercase tracking-tight">Rating & Reviews</h2>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 xl:gap-24">
            
            {/* Rating summary */}
            <div className="flex flex-col sm:flex-row gap-10 items-start sm:items-center">
              <div className="flex flex-col">
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl md:text-8xl font-bold tracking-tighter">4.9</span>
                  <span className="text-2xl text-black/40 font-mono font-bold">/ 5</span>
                </div>
                <p className="text-black/50 mt-2 font-mono text-sm">(120+ Verified Reviews)</p>
              </div>
              
              <div className="flex-1 w-full max-w-sm flex flex-col gap-3">
                {[
                  { star: 5, width: '92%' },
                  { star: 4, width: '6%' },
                  { star: 3, width: '2%' },
                  { star: 2, width: '0%' },
                  { star: 1, width: '0%' },
                ].map((item) => (
                  <div key={item.star} className="flex items-center gap-4">
                    <div className="flex items-center gap-2 w-12 shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#FBBF24" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                      <span className="font-bold font-mono text-sm">{item.star}</span>
                    </div>
                    <div className="flex-1 h-1.5 bg-black/5 rounded-full overflow-hidden">
                      <div className="h-full bg-[#527661] rounded-full" style={{ width: item.width }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Review Card */}
            <div className="relative">
              <div className="bg-white/80 backdrop-blur-sm border border-black/5 rounded-[32px] p-8 md:p-10 shadow-xl shadow-black/5 flex flex-col gap-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-lg mb-2 uppercase tracking-wide">Tanvir Ahmed</h4>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} width="16" height="16" viewBox="0 0 24 24" fill="#FBBF24" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                      ))}
                    </div>
                  </div>
                  <span className="text-xs font-mono text-black/40">Verified Buyer</span>
                </div>
                <p className="text-black/70 leading-relaxed font-mono text-sm">
                  "Absolutely love this piece! The fabric feels premium, weight is heavy enough for structure, and the virtual try-on accurately predicted the fit. Will order again!"
                </p>
                <div className="mt-2">
                  <div className="w-12 h-12 rounded-full overflow-hidden relative border-2 border-white shadow-sm">
                    <Image src="/assets/tshirt1.jpg" fill className="object-cover" alt="Reviewer" sizes="48px" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* You Might Also Like Section */}
        <div className="mt-20 mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 uppercase tracking-tight">You might also like</h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {relatedProducts.map((item) => (
              <Link href={`/products/${item.id}`} key={item.id} className="flex flex-col group cursor-pointer">
                <div className="relative aspect-[3/4] bg-white/50 rounded-[24px] overflow-hidden mb-6 shadow-sm border border-black/5">
                  <Image src={item.image} fill className="object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-out" alt={item.name} sizes="(max-width: 1024px) 50vw, 25vw" />
                </div>
                <h3 className="font-bold text-sm mb-2 uppercase tracking-wide group-hover:text-[#527661] transition-colors">{item.name}</h3>
                
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} width="12" height="12" viewBox="0 0 24 24" fill="#FBBF24" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    ))}
                  </div>
                  <span className="text-[10px] text-black/50 font-mono font-bold mt-0.5">5.0/5</span>
                </div>
                
                <div className="flex items-center gap-3 font-mono">
                  <span className="font-bold text-[#527661]">{item.price}</span>
                  {item.originalPrice && (
                    <span className="text-xs text-black/30 line-through">{item.originalPrice}</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
