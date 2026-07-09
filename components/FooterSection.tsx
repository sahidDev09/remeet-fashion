import Image from 'next/image';

export default function FooterSection() {
  return (
    <footer className="relative w-full h-[600px] overflow-hidden flex items-end">
      {/* Background Image */}
      <Image
        src="/assets/footerimg.png"
        alt="Forest background"
        fill
        sizes="100vw"
        className="object-cover brightness-60"
      />

      {/* Top Smooth Edge Gradient */}
      <div className="absolute top-0 inset-x-0 h-48 z-10 pointer-events-none"></div>

      {/* Overlay Gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none"></div>

      {/* Giant Logo */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-full flex justify-center mix-blend-overlay opacity-50 pointer-events-none">
         <Image src="/assets/remeet_footer_logo.png" alt="reMeet" width={800} height={300} className="w-[50vw] max-w-4xl object-contain" />
      </div>

      {/* Footer Content */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-8 pb-12 flex flex-col md:flex-row justify-between items-end text-white">
        
        <div className="flex flex-col">
          <div className="text-[8px] font-mono text-white/50 tracking-widest uppercase mb-4 max-w-[200px]">
            REMEET WAS BORN IN THE WILD, NOT JUST FOR THE COLD, BUT FOR EVERY ENVIRONMENT.
            <br/><br/>
            [ FROM PEAKS TO THE STREETS ]
          </div>
          
          <h3 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-[0.9]">
            Built for the Wild<br/>
            Made for the City<br/>
            Forged to Last
          </h3>
        </div>

        {/* Footer Tags */}
        <div className="w-full md:w-auto mt-8 md:mt-0 hidden sm:flex flex-wrap gap-2 max-w-lg justify-center md:justify-start items-center">
           {['STREETWEAR', 'TECH-WEAR', 'OUTDOOR', 'ALL-WEATHER', 'MINIMALIST', 'URBAN', 'PERFORMANCE', 'GEAR', 'LIFESTYLE', 'ESSENTIALS', 'UTILITY', 'SUSTAINABLE', 'GORE-TEX', 'FLEECE', 'CARGO', 'ACCESSORIES', 'HIKING', 'CLIMATE-READY'].map(tag => (
             <span key={tag} className="text-[10px] font-mono border border-white/20 rounded-full px-3 py-1 bg-white/5 backdrop-blur-md text-white/70 hover:text-white hover:border-white/50 hover:bg-white/10 transition-all cursor-pointer">#{tag}</span>
           ))}
        </div>

        <div className="hidden md:flex flex-col items-end text-[8px] font-mono text-white/50 tracking-widest uppercase text-right mt-8 md:mt-0">
          <span>FOR THOSE WHO</span>
          <span>WANDER. NOT FOR</span>
          <span>THE CROWD</span>
          <div className="mt-4 flex space-x-1 opacity-50">
             {/* Fake barcode */}
             {[...Array(30)].map((_, i) => (
                <div key={i} className={`h-4 bg-white ${Math.random() > 0.5 ? 'w-0.5' : 'w-1'}`}></div>
             ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
