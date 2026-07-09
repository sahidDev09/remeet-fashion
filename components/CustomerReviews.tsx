"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Review {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  product: string;
  date: string;
  verified: boolean;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Arif Rahman",
    avatar: "https://i.pravatar.cc/100?img=11",
    rating: 5,
    text: "The Urban Vanguard Tee is hands down the most comfortable streetwear piece I've ever owned. The fabric quality is insane and the fit is just perfect.",
    product: "Urban Vanguard Tee",
    date: "2 weeks ago",
    verified: true,
  },
  {
    id: 2,
    name: "Nusrat Jahan",
    avatar: "https://i.pravatar.cc/100?img=5",
    rating: 5,
    text: "I ordered the winter coat and it arrived within 2 days! The quality exceeded my expectations. reMeet is my go-to brand now for premium streetwear.",
    product: "Winter Elegance Coat",
    date: "1 month ago",
    verified: true,
  },
  {
    id: 3,
    name: "Tanvir Hossain",
    avatar: "https://i.pravatar.cc/100?img=12",
    rating: 4,
    text: "The minimalist designs are so versatile. I wear my reMeet pieces to campus and to hangouts — always get compliments. Absolutely worth every taka.",
    product: "Classic Logo Hoodie",
    date: "3 weeks ago",
    verified: true,
  },
  {
    id: 4,
    name: "Fariha Tasnim",
    avatar: "https://i.pravatar.cc/100?img=9",
    rating: 5,
    text: "Finally a brand that understands Bangladeshi weather AND keeps things stylish. The breathable fabrics are a game-changer. Love the sustainable approach too!",
    product: "Eco Breeze T-Shirt",
    date: "1 week ago",
    verified: true,
  },
  {
    id: 5,
    name: "Sakib Ahmed",
    avatar: "https://i.pravatar.cc/100?img=15",
    rating: 5,
    text: "Ordered matching outfits with my friends and we looked absolutely fire. The color consistency across pieces is remarkable. reMeet just hits different.",
    product: "Squad Essentials Pack",
    date: "5 days ago",
    verified: true,
  },
  {
    id: 6,
    name: "Mithila Khan",
    avatar: "https://i.pravatar.cc/100?img=20",
    rating: 4,
    text: "I was skeptical about ordering online but the virtual try-on feature sold me. The jacket fits exactly as shown. Incredible technology and amazing quality!",
    product: "Tech-Wear Cargo Jacket",
    date: "2 weeks ago",
    verified: true,
  },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? "text-amber-500" : "text-[#527661]/20"}`}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" />
      </svg>
    ))}
  </div>
);

const ReviewCard = ({
  review,
  index,
}: {
  review: Review;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
    className="group relative flex-shrink-0 w-[340px] md:w-[380px]"
  >
    <div className="relative h-full bg-[#527661]/20 backdrop-blur-3xl border border-[#527661]/20 rounded-[28px] p-7 flex flex-col gap-5 overflow-hidden transition-all duration-500 hover:bg-[#527661]/40 hover:shadow-[0_8px_40px_rgba(82,118,97,0.2)]">
      {/* Brush stroke pattern - same as hero section */}
      <div className="absolute inset-0 overflow-hidden rounded-[28px] pointer-events-none opacity-[0.04]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={`brush-review-${index}`} width="100" height="20" patternUnits="userSpaceOnUse">
              <path d="M0,10 Q25,0 50,10 T100,10" fill="none" stroke="#527661" strokeWidth="6" strokeLinecap="round"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#brush-review-${index})`}/>
        </svg>
      </div>

      {/* Subtle gradient glow on hover */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/0 group-hover:bg-white/10 rounded-full blur-3xl transition-all duration-700 pointer-events-none" />

      {/* Quote mark */}
      <div className="absolute top-5 right-6 text-[#527661]/15 text-6xl font-serif leading-none select-none z-10">
        &ldquo;
      </div>

      {/* Stars + verified */}
      <div className="relative z-10 flex items-center justify-between">
        <StarRating rating={review.rating} />
        {review.verified && (
          <span className="flex items-center gap-1 text-[10px] font-medium text-[#527661] bg-[#527661]/10 rounded-full px-2.5 py-1 uppercase tracking-wider border border-[#527661]/20">
            <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
            Verified
          </span>
        )}
      </div>

      {/* Review text */}
      <p className="relative z-10 text-black/80 text-[15px] leading-relaxed flex-grow">
        {review.text}
      </p>

      {/* Product tag */}
      <div className="relative z-10 flex items-center gap-2">
        <span className="text-[10px] font-mono text-[#527661] bg-[#527661]/10 rounded-full px-3 py-1 border border-[#527661]/15">
          {review.product}
        </span>
      </div>

      {/* Divider */}
      <div className="relative z-10 w-full h-px bg-gradient-to-r from-transparent via-[#527661]/15 to-transparent" />

      {/* Author */}
      <div className="relative z-10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#527661]/30 flex-shrink-0">
          <img
            src={review.avatar}
            alt={review.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="text-black/85 font-semibold text-sm">{review.name}</p>
          <p className="text-black/45 text-xs">{review.date}</p>
        </div>
      </div>
    </div>
  </motion.div>
);

export default function CustomerReviews() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll);
      checkScroll();
      return () => el.removeEventListener("scroll", checkScroll);
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = direction === "left" ? -400 : 400;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="w-full  py-10 md:py-18 overflow-hidden border-t border-black/5">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#527661] mb-3 block">
              What People Say
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black tracking-tight leading-[1.05]">
              Loved by the
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#527661] to-[#7aa88d]">
                Community
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-6"
          >
            {/* Stats */}
            <div className="flex items-center gap-8 mr-4">
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-black text-black">4.9</p>
                <p className="text-[10px] text-black/40 uppercase tracking-wider mt-1">
                  Avg Rating
                </p>
              </div>
              <div className="w-px h-10 bg-black/10" />
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-black text-black">2.4k+</p>
                <p className="text-[10px] text-black/40 uppercase tracking-wider mt-1">
                  Reviews
                </p>
              </div>
            </div>

            {/* Nav arrows */}
            <div className="flex gap-2">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className="w-11 h-11 rounded-full border border-black/10 flex items-center justify-center text-black/40 hover:text-black hover:border-[#527661]/50 hover:bg-[#527661]/10 transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed bg-white"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className="w-11 h-11 rounded-full border border-black/10 flex items-center justify-center text-black/40 hover:text-black hover:border-[#527661]/50 hover:bg-[#527661]/10 transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed bg-white"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scrollable Review Cards */}
        <div className="relative">

          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto hide-scrollbar pb-4 -mx-4 px-4"
          >
            {reviews.map((review, i) => (
              <ReviewCard key={review.id} review={review} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
