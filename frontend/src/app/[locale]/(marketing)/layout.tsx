import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import { setRequestLocale } from "next-intl/server";

export default async function MarketingLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col relative overflow-hidden font-[family-name:var(--font-geist-sans)]">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 -translate-y-1/4 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <Navbar />
      {children}
      <CookieBanner />
      <Footer />
    </div>
  );
}
