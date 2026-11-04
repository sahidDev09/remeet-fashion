'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/common/Navbar';
import FooterSection from '@/components/common/FooterSection';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, totalPrice, clearCart } = useCart();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Dhaka');
  const [deliveryArea, setDeliveryArea] = useState<'inside_dhaka' | 'outside_dhaka'>('inside_dhaka');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash' | 'card'>('cod');
  const [bkashTrxId, setBkashTrxId] = useState('');
  const [notes, setNotes] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deliveryFee = deliveryArea === 'outside_dhaka' ? 150 : 80;
  const grandTotal = totalPrice + deliveryFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim()) {
      setError('Please provide your full name.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 10) {
      setError('Please provide a valid 11-digit phone number for courier delivery.');
      return;
    }
    if (!address.trim()) {
      setError('Please enter your complete delivery address.');
      return;
    }
    if (paymentMethod === 'bkash' && !bkashTrxId.trim()) {
      setError('Please provide the bKash Transaction ID after sending payment.');
      return;
    }

    setLoading(true);

    try {
      const formattedItems = cart.map((i) => ({
        productId: i.id,
        name: i.name,
        color: i.color,
        size: i.size,
        price: i.price,
        numericPrice: i.numericPrice,
        quantity: i.quantity,
        image: i.image,
      }));

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: {
            fullName,
            phone,
            email,
            address,
            city,
            notes,
          },
          items: formattedItems,
          deliveryArea,
          paymentMethod,
          bkashTrxId,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        clearCart();
        router.push(`/order-success?orderId=${data.orderId}`);
      } else {
        setError(data.error || 'Failed to place order. Please try again.');
        setLoading(false);
      }
    } catch {
      setError('Network error occurred. Please check your connection and retry.');
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f8fafc] text-black">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-24 text-center">
          <div className="w-20 h-20 rounded-full bg-black/5 flex items-center justify-center mb-6 text-black/30">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tight mb-2">Your Bag is Empty</h1>
          <p className="text-sm font-mono text-black/50 max-w-sm mb-8">
            You must add at least one piece to your shopping bag before proceeding to checkout.
          </p>
          <Link
            href="/category/tshirt"
            className="bg-[#527661] text-white px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#3d5a49] transition-colors shadow-lg"
          >
            Explore Streetwear
          </Link>
        </main>
        <FooterSection />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-black selection:bg-[#527661] selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 mt-16 sm:mt-20">
        {/* Breadcrumb */}
        <div className="text-xs font-mono text-black/40 mb-8 flex items-center gap-2 uppercase tracking-widest text-[10px]">
          <Link href="/" className="hover:text-black">Home</Link>
          <span>•</span>
          <span className="text-black font-bold">Secure Checkout</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Form Details (7 Cols) */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-8 bg-white p-6 sm:p-10 rounded-3xl border border-black/10 shadow-sm">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#527661] font-bold block mb-1">
                Step 1 of 2
              </span>
              <h2 className="text-2xl font-black uppercase tracking-tight text-black">
                Shipping & Contact
              </h2>
            </div>

            {error && (
              <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-xs font-mono">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-black mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Arif Rahman"
                  className="w-full px-4 py-3 rounded-xl border border-black/15 text-sm focus:outline-none focus:border-[#527661] bg-white font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-black mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="017XXXXXXXX"
                  className="w-full px-4 py-3 rounded-xl border border-black/15 text-sm focus:outline-none focus:border-[#527661] bg-white font-medium font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-black mb-2">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-black/15 text-sm focus:outline-none focus:border-[#527661] bg-white font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-black mb-2">
                  City / District *
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Dhaka, Chittagong, Sylhet..."
                  className="w-full px-4 py-3 rounded-xl border border-black/15 text-sm focus:outline-none focus:border-[#527661] bg-white font-medium"
                />
              </div>
            </div>

            {/* Delivery Area Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-black mb-3">
                Delivery Location
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDeliveryArea('inside_dhaka')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    deliveryArea === 'inside_dhaka'
                      ? 'border-[#527661] bg-[#527661]/10 text-[#527661]'
                      : 'border-black/10 hover:border-black/30 text-black/70'
                  }`}
                >
                  <p className="text-xs font-bold uppercase">Inside Dhaka</p>
                  <p className="text-[11px] font-mono mt-0.5">৳80 • 24–48 Hours</p>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryArea('outside_dhaka')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    deliveryArea === 'outside_dhaka'
                      ? 'border-[#527661] bg-[#527661]/10 text-[#527661]'
                      : 'border-black/10 hover:border-black/30 text-black/70'
                  }`}
                >
                  <p className="text-xs font-bold uppercase">Outside Dhaka</p>
                  <p className="text-[11px] font-mono mt-0.5">৳150 • 48–72 Hours</p>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-black mb-2">
                Street Address / House / Road *
              </label>
              <textarea
                required
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House #, Road #, Area, Thana..."
                className="w-full px-4 py-3 rounded-xl border border-black/15 text-sm focus:outline-none focus:border-[#527661] bg-white font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-black mb-2">
                Order Notes (Optional)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Special delivery instructions, gate code, etc."
                className="w-full px-4 py-3 rounded-xl border border-black/15 text-sm focus:outline-none focus:border-[#527661] bg-white font-medium"
              />
            </div>

            {/* Payment Method */}
            <div className="pt-4 border-t border-black/10">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#527661] font-bold block mb-1">
                Step 2 of 2
              </span>
              <h2 className="text-2xl font-black uppercase tracking-tight text-black mb-4">
                Payment Method
              </h2>

              <div className="space-y-3">
                {/* Cash on Delivery */}
                <label className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'cod' ? 'border-[#527661] bg-[#527661]/5' : 'border-black/10'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="accent-[#527661]"
                  />
                  <div className="flex-1">
                    <p className="text-xs font-bold uppercase">Cash on Delivery (COD)</p>
                    <p className="text-[11px] text-black/50 font-mono">Pay with cash when the courier hands over your parcel</p>
                  </div>
                </label>

                {/* bKash / Mobile Banking */}
                <label className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'bkash' ? 'border-[#527661] bg-[#527661]/5' : 'border-black/10'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'bkash'}
                    onChange={() => setPaymentMethod('bkash')}
                    className="accent-[#527661]"
                  />
                  <div className="flex-1">
                    <p className="text-xs font-bold uppercase">bKash / Nagad Wallet</p>
                    <p className="text-[11px] text-black/50 font-mono">Send money to merchant number and provide Transaction ID</p>
                  </div>
                </label>

                {paymentMethod === 'bkash' && (
                  <div className="p-4 rounded-2xl bg-[#527661]/10 border border-[#527661]/20 font-mono text-xs space-y-2">
                    <p className="font-bold text-[#527661]">bKash Personal / Merchant Number: 01700-000000</p>
                    <p className="text-black/60 text-[11px]">Please send ৳{grandTotal.toLocaleString()} BDT and enter your TrxID below:</p>
                    <input
                      type="text"
                      value={bkashTrxId}
                      onChange={(e) => setBkashTrxId(e.target.value)}
                      placeholder="e.g. 9K28XPA8L"
                      className="w-full px-3 py-2 rounded-lg border border-black/20 bg-white font-mono text-xs uppercase"
                    />
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#131313] hover:bg-[#527661] text-white font-bold text-xs uppercase tracking-widest py-4 rounded-full transition-all shadow-xl shadow-black/10 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Processing Order...' : `Confirm Order • ৳${grandTotal.toLocaleString()} BDT`}
            </button>
          </form>

          {/* Right Column: Order Summary (5 Cols) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-black/10 shadow-sm sticky top-28 space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-black pb-3 border-b border-black/10">
              Order Summary ({cart.length} {cart.length === 1 ? 'item' : 'items'})
            </h3>

            {/* Items List */}
            <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex gap-3 items-center">
                  <div className="relative w-14 h-16 rounded-xl overflow-hidden bg-black/5 shrink-0 border border-black/5">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold uppercase tracking-wide truncate">{item.name}</h4>
                    <p className="text-[10px] text-black/50 font-mono uppercase mt-0.5">
                      Size: {item.size} • Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="text-xs font-bold font-mono text-[#527661]">
                    ৳{(item.numericPrice * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2.5 pt-4 border-t border-black/10 font-mono text-xs">
              <div className="flex justify-between text-black/60">
                <span>Subtotal</span>
                <span>৳{totalPrice.toLocaleString()} BDT</span>
              </div>
              <div className="flex justify-between text-black/60">
                <span>Delivery Charge</span>
                <span>৳{deliveryFee} BDT</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-black border-t border-black/10 pt-3">
                <span>Grand Total</span>
                <span className="text-[#527661]">৳{grandTotal.toLocaleString()} BDT</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-black/[0.03] border border-black/5 flex items-center gap-2.5 text-[10px] font-mono text-black/60">
              <svg className="w-4 h-4 text-[#527661] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>100% Guaranteed Original Streetwear & Quality Checked</span>
            </div>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
