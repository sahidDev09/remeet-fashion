'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';

export default function WishlistDrawer() {
  const { wishlist, toggleWishlist, isWishlistOpen, setIsWishlistOpen } = useWishlist();
  const { addToCart } = useCart();

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      />

      {/* Slide-over drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-black/10">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold uppercase tracking-wider text-black">
              Wishlist
            </h2>
            <span className="bg-[#527661] text-white text-[10px] font-mono px-2 py-0.5 rounded-full font-bold">
              {wishlist.length}
            </span>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center transition-colors text-black"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {wishlist.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="w-16 h-16 rounded-full bg-black/5 flex items-center justify-center mb-4 text-black/30">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
                  />
                </svg>
              </div>
              <p className="text-sm font-bold uppercase tracking-wider text-black mb-1">
                Your wishlist is empty
              </p>
              <p className="text-xs text-black/50 font-mono mb-6">
                Save your favorite pieces to review or purchase later.
              </p>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="bg-[#527661] text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full hover:bg-[#3d5a49] transition-colors"
              >
                Browse Collection
              </button>
            </div>
          ) : (
            wishlist.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-3 bg-black/[0.02] border border-black/5 rounded-2xl relative group items-center"
              >
                <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-black/5 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start">
                      <Link
                        href={`/products/${item.id}`}
                        onClick={() => setIsWishlistOpen(false)}
                        className="text-xs font-bold uppercase tracking-wider text-black hover:text-[#527661]"
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => toggleWishlist(item)}
                        className="text-black/30 hover:text-red-500 transition-colors p-1"
                        title="Remove"
                      >
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                    <p className="text-[10px] text-black/50 font-mono uppercase mt-0.5">
                      {item.color}
                    </p>
                    <p className="text-xs font-bold font-mono text-[#527661] mt-1">
                      {item.price}
                    </p>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => {
                        addToCart({
                          id: item.id,
                          name: item.name,
                          color: item.color,
                          price: item.price,
                          numericPrice: item.numericPrice,
                          image: item.image,
                          size: item.sizes?.[0] || 'M',
                        });
                        toggleWishlist(item);
                      }}
                      className="flex-1 bg-[#131313] hover:bg-[#527661] text-white text-[10px] font-bold uppercase tracking-widest py-2 rounded-full transition-colors flex items-center justify-center gap-1.5"
                    >
                      Move to Bag
                    </button>
                    <Link
                      href={`/products/${item.id}`}
                      onClick={() => setIsWishlistOpen(false)}
                      className="px-3 py-2 border border-black/10 hover:bg-black/5 rounded-full text-[10px] font-mono uppercase text-black"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

