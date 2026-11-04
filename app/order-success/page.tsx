import Link from 'next/link';
import Navbar from '@/components/common/Navbar';
import FooterSection from '@/components/common/FooterSection';
import { connectToDatabase } from '@/lib/mongodb';
import { OrderModel } from '@/models/Order';

interface OrderSuccessProps {
  searchParams: Promise<{ orderId?: string }>;
}

export default async function OrderSuccessPage({ searchParams }: OrderSuccessProps) {
  const { orderId } = await searchParams;

  let order = null;
  if (orderId) {
    try {
      await connectToDatabase();
      order = await OrderModel.findOne({ orderId }).lean();
    } catch {
      order = null;
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-black">
      <Navbar />

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-16 mt-16 sm:mt-24">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-black/10 shadow-xl text-center">
          {/* Success Check Icon */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#527661]/10 text-[#527661] flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#527661] font-bold block mb-2">
            Order Confirmed
          </span>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mb-3">
            Thank You For Your Order!
          </h1>
          <p className="text-xs sm:text-sm font-mono text-black/60 max-w-md mx-auto mb-8">
            Your streetwear order has been logged into our dispatch system. We will contact you via phone or SMS prior to courier delivery.
          </p>

          {/* Order Details Card */}
          <div className="bg-black/[0.02] border border-black/5 rounded-2xl p-6 text-left space-y-4 mb-8 font-mono text-xs">
            <div className="flex justify-between items-center pb-3 border-b border-black/5">
              <span className="text-black/50">Order Reference:</span>
              <span className="font-bold text-[#527661] text-sm">{orderId || 'RM-CONFIRMED'}</span>
            </div>

            {order && (
              <>
                <div className="flex justify-between text-black/70">
                  <span className="text-black/50">Customer:</span>
                  <span className="font-bold">{order.customer.fullName}</span>
                </div>
                <div className="flex justify-between text-black/70">
                  <span className="text-black/50">Phone:</span>
                  <span>{order.customer.phone}</span>
                </div>
                <div className="flex justify-between text-black/70">
                  <span className="text-black/50">Shipping Destination:</span>
                  <span className="text-right max-w-[200px] truncate">{order.customer.address}, {order.customer.city}</span>
                </div>
                <div className="flex justify-between text-black/70">
                  <span className="text-black/50">Payment Method:</span>
                  <span className="uppercase font-bold">{order.paymentMethod}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-black/5 text-sm font-bold text-black">
                  <span>Total Amount Paid / Due:</span>
                  <span className="text-[#527661]">৳{order.totalAmount.toLocaleString()} BDT</span>
                </div>
              </>
            )}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-[#131313] hover:bg-[#527661] text-white px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-widest transition-colors shadow-lg"
            >
              Back to Home
            </Link>
            <Link
              href="/category/tshirt"
              className="bg-black/5 hover:bg-black/10 text-black px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-widest transition-colors border border-black/10"
            >
              Browse More Pieces
            </Link>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}

