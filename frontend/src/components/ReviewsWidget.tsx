import { useTranslations } from "next-intl";

interface Review {
  name: string;
  rankFrom: string;
  rankTo: string;
  quote: string;
  rating: number;
}

export default function ReviewsWidget() {
  const t = useTranslations("HomePage");

  const reviews: Review[] = [
    {
      name: "Kamil 'Nidalee' S.",
      rankFrom: "Gold IV",
      rankTo: "Diamond IV",
      quote:
        "Amazing live sessions! The coach instantly pointed out that my roll timings were completely wrong for the meta. In 3 weeks I climbed to Diamond.",
      rating: 5,
    },
    {
      name: "Janek 'TFTguy'",
      rankFrom: "Platinum II",
      rankTo: "Master",
      quote:
        "The VOD review was extremely detailed. A 30-minute video analyzing my positioning and item transitions in Stage 4. Worth every penny.",
      rating: 5,
    },
    {
      name: "Mateusz K.",
      rankFrom: "Silver III",
      rankTo: "Platinum IV",
      quote:
        "Super explanation of basic concepts like loss-streaking and target selectors. Professional attitude and high-quality setup.",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 border-y border-slate-900 bg-slate-950/40 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold tracking-wider text-teal-400 bg-teal-500/10 rounded-full border border-teal-500/20 mb-3">
            ⭐ TRUSTPILOT 4.9 / 5
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {t("reviewsTitle")}
          </h2>
          <p className="mt-4 text-slate-450 text-sm sm:text-base leading-relaxed">
            {t("reviewsSubtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border border-slate-850 bg-slate-900/30 backdrop-blur-sm hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Rating stars */}
                <div className="flex items-center gap-1">
                  {[...Array(review.rating)].map((_, idx) => (
                    <svg
                      key={idx}
                      className="w-4 h-4 fill-amber-400"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm italic text-slate-300 leading-relaxed">
                  &quot;{review.quote}&quot;
                </p>
              </div>

              {/* User details */}
              <div className="flex items-center gap-4 mt-6 pt-6 border-t border-slate-850/60">
                <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-white text-xs">
                  {review.name.split(" ")[0][0]}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-200">
                    {review.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-slate-500 line-through">
                      {review.rankFrom}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                      ➔ {review.rankTo}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
