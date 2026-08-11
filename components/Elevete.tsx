import Image from 'next/image';

export default function Elevete() {
  return (
    <section className="relative w-full min-h-[600px] h-[85vh] md:h-screen flex items-center justify-center overflow-hidden my-6">
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes orbit {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes orbit-reverse {
          from { transform: translate(-50%, -50%) rotate(360deg); }
          to { transform: translate(-50%, -50%) rotate(0deg); }
        }
        .animate-orbit {
          animation: orbit 30s linear infinite;
        }
        .animate-orbit-slow {
          animation: orbit 45s linear infinite;
        }
        .animate-orbit-reverse {
          animation: orbit-reverse 40s linear infinite;
        }
      `}</style>

      {/* Orbit Backgrounds */}
      <div className="absolute top-1/2 left-1/2 w-[350px] h-[350px] sm:w-[600px] sm:h-[600px] md:w-[900px] md:h-[900px] border border-[#527661]/10 rounded-full animate-orbit-slow pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 bg-[#527661]/30 rounded-full blur-[1px]"></div>
      </div>
      <div className="absolute top-1/2 left-1/2 w-[280px] h-[280px] sm:w-[480px] sm:h-[480px] md:w-[700px] md:h-[700px] border border-[#527661]/20 rounded-full animate-orbit-reverse border-dashed pointer-events-none z-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-[#527661]/40 rounded-full blur-[1px]"></div>
        <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#527661]/40 rounded-full blur-[1px]"></div>
      </div>
      <div className="absolute top-1/2 left-1/2 w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] md:w-[500px] md:h-[500px] border border-[#527661]/30 rounded-full animate-orbit pointer-events-none z-0">
        <div className="absolute top-[14%] right-[14%] translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-[#527661]/50 rounded-full"></div>
      </div>

      {/* Solid Text Backing */}
      <div className="w-full flex items-center justify-center text-[#527661] text-4xl sm:text-6xl md:text-8xl lg:text-9xl uppercase font-extrabold tracking-tight sm:tracking-wide leading-[1.05] mx-auto text-center relative z-0 select-none px-4">
        Elevate <br /> Beyond the <br /> ordinary.
      </div>

      {/* Floating Garment Icons - Scaled for Mobile/Desktop */}
      <div className="absolute top-[10%] left-[5%] md:left-[12%] opacity-80 animate-float z-10 hidden sm:block" style={{ animationDelay: '0s' }}>
        <Image src="/assets/floating_cap.png" width={140} height={140} alt="Floating Cap" className="w-24 sm:w-36 md:w-44 h-auto rotate-[-15deg] drop-shadow-2xl" />
      </div>
      <div className="absolute top-[12%] right-[5%] md:right-[12%] opacity-80 animate-float z-10 hidden sm:block" style={{ animationDelay: '1s' }}>
        <Image src="/assets/floating_tshirt.png" width={180} height={180} alt="Floating T-shirt" className="w-28 sm:w-40 md:w-52 h-auto rotate-[10deg] drop-shadow-2xl" />
      </div>
      <div className="absolute bottom-[10%] left-[8%] md:left-[15%] opacity-80 animate-float z-10 hidden sm:block" style={{ animationDelay: '2s' }}>
        <Image src="/assets/floating_jacket.png" width={200} height={200} alt="Floating Jacket" className="w-32 sm:w-44 md:w-56 h-auto rotate-[5deg] drop-shadow-2xl" />
      </div>
      <div className="absolute bottom-[12%] right-[8%] md:right-[15%] opacity-80 animate-float z-10 hidden sm:block" style={{ animationDelay: '1.5s' }}>
        <Image src="/assets/floating_sneaker.png" width={160} height={160} alt="Floating Sneaker" className="w-28 sm:w-36 md:w-48 h-auto rotate-[-10deg] drop-shadow-2xl" />
      </div>

      {/* Main Model Image Overlay */}
      <Image 
        src="/assets/elevateMain.png" 
        width={600} 
        height={500} 
        quality={100} 
        unoptimized 
        alt="Elevate Main Model" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 max-w-[280px] sm:max-w-[450px] md:max-w-[550px] lg:max-w-[600px] h-auto object-contain pointer-events-none drop-shadow-xl" 
      />

      {/* Transparent Text Front Layer with Text Stroke */}
      <div className="w-full flex items-center justify-center text-transparent [-webkit-text-stroke:1px_#527661] text-4xl sm:text-6xl md:text-8xl lg:text-9xl uppercase font-extrabold tracking-tight sm:tracking-wide leading-[1.05] mx-auto text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 select-none px-4">
        Elevate <br /> Beyond the <br /> ordinary.
      </div>
    </section>
  );
}
