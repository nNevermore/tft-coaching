"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function LessonsPageContent() {
  const searchParams = useSearchParams();
  const isSuccess = searchParams.get("success") === "true";

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-white mb-1">
          Moje lekcje
        </h1>
        <p className="text-sm text-slate-400">
          Tutaj znajdziesz historię swoich treningów oraz nadchodzące sesje na
          żywo.
        </p>
      </div>

      {isSuccess && (
        <div className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-slate-200 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <span>🎉</span> Płatność zrealizowana pomyślnie!
          </div>
          <p className="text-sm text-slate-350">
            Dziękujemy za zakup sesji coachingowej. Zgłoszenie zostało pomyślnie
            opłacone i zarejestrowane. Twój trener skontaktuje się z Tobą przez
            Discord w celu ustalenia godziny.
          </p>
        </div>
      )}

      <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 text-center py-16 space-y-4">
        <span className="text-4xl">📚</span>
        <h2 className="text-lg font-bold text-slate-200">
          Brak aktywnych lekcji
        </h2>
        <p className="text-sm text-slate-400 max-w-sm mx-auto">
          Nie masz obecnie żadnych aktywnych ani historycznych lekcji. Przejdź
          do zakładki rezerwacji, aby zamówić sesję z trenerem.
        </p>
      </div>
    </div>
  );
}

export default function LessonsPage() {
  return (
    <Suspense
      fallback={
        <div className="space-y-6">
          <h1 className="text-2xl font-extrabold tracking-tight text-white mb-1">
            Ładowanie...
          </h1>
          <div className="h-40 bg-slate-900/20 rounded-2xl animate-pulse"></div>
        </div>
      }
    >
      <LessonsPageContent />
    </Suspense>
  );
}
