"use client";

import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden font-sans pt-20 pb-10 px-4 sm:px-8 flex flex-col items-center">
      
      {/* Top Text Background */}
      <div className="w-full max-w-7xl mx-auto flex justify-between items-center relative z-10 px-4 md:px-12 pt-8 pb-4">
        {/* Decorative brush stroke background */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-12 bg-[#527661]/20 rounded-full blur-xl -z-10"></div>
        
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-gray-800 tracking-tighter uppercase flex items-baseline gap-2">
          <span className="font-serif italic font-medium lowercase text-2xl sm:text-3xl md:text-5xl">Own the</span> EDGE
        </h1>
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-gray-800 tracking-tighter uppercase flex items-baseline gap-2">
          <span className="font-serif italic font-medium lowercase text-2xl sm:text-3xl md:text-5xl">Keep the</span> VIBE
        </h1>
      </div>

      {/* Main Green Card */}
      <div className="relative w-full max-w-7xl mx-auto bg-[#527661] rounded-[40px] mt-8 p-8 md:p-12 min-h-[600px] flex flex-col md:flex-row justify-between items-stretch z-20">
        
        {/* Subtle brush stroke pattern in the background */}
        <div className="absolute inset-0 overflow-hidden rounded-[40px] pointer-events-none opacity-20">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="brush" width="100" height="20" patternUnits="userSpaceOnUse">
                <path d="M0,10 Q25,0 50,10 T100,10" fill="none" stroke="#ffffff" strokeWidth="8" strokeLinecap="round"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#brush)"/>
          </svg>
        </div>

        {/* Main Subject Image - Bottom attached, top overflowing */}
        <div className="absolute left-1/2 transform -translate-x-1/2 -top-24 sm:-top-32 bottom-0 w-[320px] sm:w-[500px] md:w-[750px] lg:w-[900px] z-10 pointer-events-none flex justify-center items-end">
          <div className="relative w-full h-full">
            <Image
              src="/assets/heroModels.png" 
              alt="Main Model"
              fill
              className="object-contain object-bottom drop-shadow-2xl"
              priority
            />
          </div>
        </div>

        {/* Left Content */}
        <div className="relative z-30 flex flex-col justify-between max-w-sm">
          <div>
            <p className="text-white/90 text-sm font-semibold mb-4 tracking-wide">New Arrivals</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white leading-[1.1] mb-6">
              Where Art Meets<br/>your Style
            </h2>
            <p className="text-white/90 text-base sm:text-lg mb-8 leading-relaxed">
              Step into the future of<br/>streetwear today.
            </p>
            
            <Link 
              href="/category/tshirt" 
              className="bg-white text-[#527661] px-6 py-3 rounded-full font-semibold flex items-center gap-3 hover:bg-gray-50 transition-colors shadow-sm w-fit group"
            >
              New Drops
              <span className="bg-[#527661] text-white rounded-full p-1 w-6 h-6 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                </svg>
              </span>
            </Link>
          </div>

          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 mt-12 flex flex-col gap-3 w-[240px] border border-white/30">
            <div className="flex -space-x-3">
               {[1,2,3,4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-[#527661] overflow-hidden bg-gray-200">
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="avatar" className="w-full h-full object-cover" />
                  </div>
               ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                </svg>
              </span>
              <p className="text-white text-xs font-medium leading-tight">
                Rated 5 Stars by<br/>The Vybe Tribe
              </p>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="relative z-30 flex flex-col justify-between items-end max-w-sm mt-12 md:mt-0">
          
          <div className="flex gap-6 sm:gap-8 text-white/90">
            <div className="flex flex-col items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
              </svg>
              <span className="text-xs text-center font-medium">Future<br/>Threads</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385c.148.621-.531 1.114-1.075.793L12 18.57a.563.563 0 00-.546 0l-4.78 2.532c-.544.321-1.223-.172-1.075-.793l1.285-5.385a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
              <span className="text-xs text-center font-medium">Unique<br/>Designs</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs text-center font-medium">Limited<br/>Drops</span>
            </div>
          </div>

          <div className="flex flex-col items-center mt-12 w-[240px]">
            <h3 className="text-white font-bold mb-4 tracking-wide">Best Selling</h3>
            <Link href="/products/1" className="bg-white rounded-[24px] p-2 w-full shadow-xl hover:scale-105 transition-transform group cursor-pointer block">
              <div className="rounded-[20px] overflow-hidden bg-gray-100 aspect-[4/5] relative mb-4">
                <Image 
                  src="/assets/hrimitaModel2.jpeg" 
                  alt="Featured Product" 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="px-2 pb-2 text-center">
                <h4 className="text-gray-800 font-bold text-[15px]">Urban Vanguard Tee</h4>
                <p className="text-gray-500 text-xs mt-1 mb-4">Unmatched comfort.</p>
                <div className="flex justify-center">
                  <div className="bg-[#527661] text-white text-sm font-semibold py-1.5 px-4 rounded-full flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    ৳1,490 BDT
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

      </div>
      
    </section>
  );
}
