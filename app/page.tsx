import Navbar from '@/components/common/Navbar';
import HeroSection from '@/components/home/HeroSection';
import FeaturedSection from '@/components/home/FeaturedSection';
import ProductList from '@/components/home/ProductList';
import LookbookSection from '@/components/home/LookbookSection';
import BrandManifesto from '@/components/home/BrandManifesto';
import Elevete from '@/components/home/Elevete';
import CustomerReviews from '@/components/home/CustomerReviews';
import NewsletterSection from '@/components/home/NewsletterSection';
import FooterSection from '@/components/common/FooterSection';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen selection:bg-[#527661] selection:text-white">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        <FeaturedSection />
        <ProductList />
        <LookbookSection />
        <BrandManifesto />
        <Elevete />
        <CustomerReviews />
        <NewsletterSection />
      </main>

      <FooterSection />
    </div>
  );
}
