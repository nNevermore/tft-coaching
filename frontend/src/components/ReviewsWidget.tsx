"use client";

import { useTranslations } from "next-intl";
import React from "react";

interface Review {
  name: string;
  rankFrom: string;
  rankTo: string;
  quote: string;
  rating: number;
}

const REVIEWS: Review[] = [
  {
    name: "Kamil 'Nidalee' S.",
    rankFrom: "Gold IV",
    rankTo: "Diamond IV",
    quote:
      "Amazing live sessions! The coach instantly pointed out that my roll timings were completely wrong.",
    rating: 5,
  },
  {
    name: "Janek 'TFTguy'",
    rankFrom: "Platinum II",
    rankTo: "Master",
    quote:
      "The VOD review was extremely detailed. A 30-minute video analyzing my positioning. Worth every penny.",
    rating: 5,
  },
  {
    name: "Mateusz K.",
    rankFrom: "Silver III",
    rankTo: "Platinum IV",
    quote:
      "Super explanation of basic concepts like loss-streaking and target selectors. Professional attitude.",
    rating: 5,
  },
  {
    name: "Elena 'Star' V.",
    rankFrom: "Gold I",
    rankTo: "Diamond II",
    quote:
      "Incredible insight into the meta. Learned how to pivot properly under pressure.",
    rating: 5,
  },
  {
    name: "Szymon R.",
    rankFrom: "Emerald III",
    rankTo: "Grandmaster",
    quote:
      "Deep tactical analysis. My endgame board strength improved drastically in just 2 sessions.",
    rating: 5,
  },
  {
    name: "Alex T.",
    rankFrom: "Bronze II",
    rankTo: "Gold I",
    quote:
      "Very patient coach. Helped me understand the basics of economy management.",
    rating: 5,
  },
];

const ReviewCard = ({ review }: { review: Review }) => (
  <div className="w-[350px] shrink-0 p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-md hover:border-teal-500/30 transition-all group mx-4">
    <div className="flex items-center gap-1 mb-4">
      {[...Array(review.rating)].map((_, idx) => (
        <svg
          key={idx}
          className="w-3 h-3 fill-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.5)]"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
    <p className="text-xs italic text-slate-300 leading-relaxed mb-6">
      &quot;{review.quote}&quot;
    </p>

    <div className="flex items-center gap-4 pt-4 border-t border-white/5">
      <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center font-black text-white text-[10px] uppercase">
        {review.name.split(" ")[0][0]}
      </div>
      <div>
        <h3 className="text-xs font-black text-white uppercase italic">
          {review.name}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[9px] text-slate-500 line-through font-bold uppercase">
            {review.rankFrom}
          </span>
          <span className="text-[9px] font-black text-teal-400 uppercase tracking-tighter">
            ➔ {review.rankTo}
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default function ReviewsWidget() {
  const t = useTranslations("HomePage");

  // Schema.org Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "TFT-Coaching Elite Program",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "124",
    },
  };

  return (
    <section className="py-24 border-y border-slate-900 bg-slate-950/40 relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Background ambient light */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-teal-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-[10px] font-black text-teal-400 tracking-[0.2em] uppercase">
            Trusted by 500+ Players
          </div>
          <h2 className="text-4xl font-black italic tracking-tighter text-white uppercase leading-none">
            {t("reviewsTitle")}
          </h2>
          <p className="text-slate-400 text-sm font-medium leading-relaxed">
            {t("reviewsSubtitle")}
          </p>
        </div>
      </div>

      {/* INFINITE MARQUEE ROWS */}
      <div className="space-y-8 pointer-events-none">
        {/* Row 1: Right to Left */}
        <div className="flex overflow-hidden group">
          <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
            {[...REVIEWS, ...REVIEWS].map((review, i) => (
              <ReviewCard key={i} review={review} />
            ))}
          </div>
        </div>

        {/* Row 2: Left to Right */}
        <div className="flex overflow-hidden group">
          <div className="flex animate-marquee-reverse group-hover:[animation-play-state:paused]">
            {[...REVIEWS, ...REVIEWS].map((review, i) => (
              <ReviewCard key={i} review={review} />
            ))}
          </div>
        </div>
      </div>

      {/* Edge Fading Gradients */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none z-10"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none z-10"></div>
    </section>
  );
}
