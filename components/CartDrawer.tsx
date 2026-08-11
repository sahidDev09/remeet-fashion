'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    isCartOpen,
    setIsCartOpen,
    totalPrice,
    totalItems,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Slide-over drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-black/10">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold uppercase tracking-wider text-black">
              Your Cart
            </h2>
            <span className="bg-[#527661] text-white text-[10px] font-mono px-2 py-0.5 rounded-full font-bold">
              {totalItems}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
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

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
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
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <p className="text-sm font-bold uppercase tracking-wider text-black mb-1">
                Your cart is empty
              </p>
              <p className="text-xs text-black/50 font-mono mb-6">
                Looks like you haven't added anything yet.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="bg-[#527661] text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full hover:bg-[#3d5a49] transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="flex gap-4 p-3 bg-black/[0.02] border border-black/5 rounded-2xl relative group"
              >
                <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-black/5 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between py-0.5">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-black">
                        {item.name}
                      </h3>
                      <button
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="text-black/30 hover:text-red-500 transition-colors p-1"
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                    <p className="text-[10px] text-black/50 font-mono uppercase mt-0.5">
                      Color: {item.color} | Size: {item.size}
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs font-bold font-mono text-[#527661]">
                      ৳{(item.numericPrice * item.quantity).toLocaleString()}
                    </span>

                    {/* Quantity Selector */}
                    <div className="flex items-center border border-black/10 rounded-full bg-white px-2 py-1 gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                        className="text-black/60 hover:text-black font-bold text-xs w-4 h-4 flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="text-xs font-mono font-bold text-black min-w-[12px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                        className="text-black/60 hover:text-black font-bold text-xs w-4 h-4 flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-black/10 bg-white">
            <div className="space-y-2 mb-4 font-mono text-xs">
              <div className="flex justify-between text-black/60">
                <span>Subtotal</span>
                <span>৳{totalPrice.toLocaleString()} BDT</span>
              </div>
              <div className="flex justify-between text-black/60">
                <span>Shipping</span>
                <span className="text-[#527661] font-bold">Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-black border-t border-black/10 pt-2">
                <span>Total</span>
                <span className="text-[#527661]">৳{totalPrice.toLocaleString()} BDT</span>
              </div>
            </div>

            <button
              onClick={() => alert('Checkout initiated!')}
              className="w-full bg-[#131313] hover:bg-[#527661] text-white font-bold text-xs uppercase tracking-widest py-4 rounded-full transition-colors shadow-lg shadow-black/10 flex items-center justify-center gap-2"
            >
              Checkout Now
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
