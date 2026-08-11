import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import Link from 'next/link';
import TryOnInterface from './TryOnInterface';
import { notFound } from 'next/navigation';
import { products } from '@/lib/products';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = products.find(p => p.id === parseInt(id));
  if (!product) return { title: 'Try-On Not Found — reMeet' };
  return {
    title: `Virtual Try-On: ${product.name} — reMeet`,
    description: `Try on ${product.name} virtually using AI-powered fitting technology.`,
  };
}

export default async function TryOnPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen selection:bg-black selection:text-white">
      <Navbar />

      <main className="flex-grow w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12 mt-10 md:mt-24">
        {/* Breadcrumb */}
        <div className="max-w-[1400px] mx-auto text-sm text-black/50 mb-6 flex items-center gap-2 font-mono uppercase tracking-widest text-[9px]">
          <Link href="/" className="hover:text-black transition-colors flex items-center gap-1.5">
            Home
          </Link>
          <span className="text-black/20">•</span>
          <Link href={`/products/${product.id}`} className="hover:text-black transition-colors">
            {product.name}
          </Link>
          <span className="text-black/20">•</span>
          <span className="text-black font-bold">Virtual Try-On</span>
        </div>

        <TryOnInterface initialProduct={product} allProducts={products} />

      </main>

      <FooterSection />
    </div>
  );
}
