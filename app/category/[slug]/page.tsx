import Navbar from '@/components/Navbar';
import CategoryContent from '@/components/CategoryContent';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductsByCategory, getCategoryInfo } from '@/lib/products';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryInfo(slug);
  if (!category) return { title: 'Not Found — reMeet' };
  return {
    title: `${category.title} — reMeet Fashion`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategoryInfo(slug);

  if (!category) {
    notFound();
  }

  const categoryProducts = getProductsByCategory(slug);

  return (
    <div className="flex flex-col min-h-screen selection:bg-black selection:text-white">
      <Navbar />

      <main className="flex-grow mt-20">
        {/* Main Content: Sidebar Filters + Product Grid */}
        <section className="py-8 md:py-12">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
            <CategoryContent
              products={categoryProducts}
              categoryTitle={category.title}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
