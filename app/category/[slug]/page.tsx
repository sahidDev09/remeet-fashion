import Navbar from '@/components/Navbar';
import CategoryContent from '@/components/CategoryContent';
import FooterSection from '@/components/FooterSection';
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
        {/* Category Hero Banner & Breadcrumbs */}
        <section className="bg-gradient-to-b from-[#527661]/10 via-transparent to-transparent py-10 md:py-16 border-b border-black/5">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
            {/* Breadcrumb */}
            <div className="text-xs text-black/50 mb-6 flex items-center gap-2 font-mono uppercase tracking-widest text-[10px]">
              <Link href="/" className="hover:text-black transition-colors flex items-center gap-1">
                Home
              </Link>
              <span className="text-black/30">•</span>
              <span className="text-black/30">Category</span>
              <span className="text-black/30">•</span>
              <span className="text-black font-bold">{category.title}</span>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#527661] mb-2 block">
                  Collection
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase text-black tracking-tight leading-none">
                  {category.title}
                </h1>
              </div>
              <p className="text-black/60 max-w-md font-mono text-xs leading-relaxed">
                {category.description}
              </p>
            </div>
          </div>
        </section>

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

      <FooterSection />
    </div>
  );
}
