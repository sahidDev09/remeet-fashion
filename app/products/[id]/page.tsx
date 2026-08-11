import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import ProductDetailsClient from './ProductDetailsClient';
import { notFound } from 'next/navigation';
import { products } from '@/lib/products';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = products.find(p => p.id === parseInt(id));
  if (!product) return { title: 'Product Not Found — reMeet' };
  return {
    title: `${product.name} — reMeet Fashion`,
    description: `Buy ${product.name} in ${product.color} for ${product.price} BDT. High quality streetwear by reMeet.`,
  };
}

export default async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const productId = parseInt(id);
  const product = products.find(p => p.id === productId);

  if (!product) {
    notFound();
  }

  // Get related products (exclude current)
  const relatedProducts = products.filter(p => p.id !== productId).slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen selection:bg-black selection:text-white">
      <Navbar />
      <ProductDetailsClient product={product} relatedProducts={relatedProducts} />
      <FooterSection />
    </div>
  );
}
