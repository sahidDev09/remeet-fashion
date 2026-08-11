'use client';

import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/lib/products';
import { useCart } from '@/context/CartContext';

export default function ProductList() {
  const { addToCart } = useCart();

  return (
    <section id="products" className="py-10 border-t border-black/10">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8">
        
        <div className="flex justify-between items-end mb-16 border-b border-black/10 pb-8">
          <div className="flex items-center space-x-12">
            <h2 className="text-3xl font-bold uppercase tracking-tight text-black">NEW COLLECTION</h2>
            <div className="hidden md:flex flex-col text-[8px] font-mono text-black/50 tracking-widest uppercase">
              <span>[ NEW COLLECTION ]</span>
              <span>[ SERIES 04 ]</span>
              <span>[ SUMMER ]</span>
            </div>
            <div className="hidden lg:flex flex-col text-[8px] font-mono text-black/50 tracking-widest uppercase">
              <span>PREMIUM T-SHIRTS</span>
              <span>EVERYDAY WEAR</span>
              <span>SUMMER ESSENTIALS</span>
            </div>
          </div>
          <Link 
            href="/category/tshirt" 
            className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-white px-6 py-2 rounded-full bg-[#527661] hover:bg-[#3d5a49] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
            </svg>
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-16">
          {products.map((product) => (
            <div key={product.id} className="group flex flex-col">
              <Link href={`/products/${product.id}`} className="cursor-pointer">
                <div 
                  className="relative aspect-[3/4] mb-4 bg-white/10 p-1 transition-transform duration-300"
                  style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 85%, 85% 100%, 0 100%, 0 15%)' }}
                >
                  <div 
                    className="relative w-full h-full bg-white/5 overflow-hidden"
                    style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 85%, 85% 100%, 0 100%, 0 15%)' }}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-110 opacity-90 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-100"
                    />
                    {product.discount && (
                      <div className="absolute top-0 right-0 bg-[#527661] text-white text-[10px] font-bold px-3 py-1.5 tracking-widest z-10" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 15% 100%)' }}>
                        {product.discount} OFF
                      </div>
                    )}
                  </div>
                </div>
              </Link>
              <div className="flex flex-col text-black mt-3 h-full justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                      <Link href={`/products/${product.id}`} className="hover:text-[#527661] transition-colors">
                        <h3 className="text-xs font-bold tracking-widest uppercase mb-1">{product.name}</h3>
                      </Link>
                      <span className="text-[10px] text-black/60 tracking-wider uppercase font-mono">{product.color}</span>
                    </div>
                    <button 
                      onClick={() => addToCart({
                        id: product.id,
                        name: product.name,
                        color: product.color,
                        price: product.price,
                        numericPrice: product.numericPrice,
                        image: product.image,
                        size: product.sizes[0] || 'M',
                      })}
                      title="Add to Cart"
                      className="bg-[#527661] text-white p-2 rounded-full hover:bg-[#3d5a49] transition-colors shadow-sm ml-2 shrink-0 active:scale-95"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="flex items-baseline space-x-3 pt-3 mt-3 border-t border-black/10">
                  <span className="text-base text-[#527661] font-bold tracking-wider font-mono">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-xs text-black/40 line-through tracking-widest font-mono">{product.originalPrice}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
