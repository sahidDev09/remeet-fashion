import AnnouncementBar from '@/components/AnnouncementBar';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ValueProps from '@/components/ValueProps';
import CategorySpotlight from '@/components/CategorySpotlight';
import FeaturedSection from '@/components/FeaturedSection';
import ProductList from '@/components/ProductList';
import LookbookSection from '@/components/LookbookSection';
import BrandManifesto from '@/components/BrandManifesto';
import Elevete from '@/components/Elevete';
import CustomerReviews from '@/components/CustomerReviews';
import NewsletterSection from '@/components/NewsletterSection';
import FooterSection from '@/components/FooterSection';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen selection:bg-[#527661] selection:text-white">
      <AnnouncementBar />
      <Navbar />
      
      <main className="flex-grow pt-8">
        <HeroSection />
        <ValueProps />
        <CategorySpotlight />
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
