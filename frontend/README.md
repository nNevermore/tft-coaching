# TFT-Coaching - Frontend App

Aplikacja kliencka platformy **TFT-Coaching**, zbudowana przy użyciu najnowszych standardów ekosystemu React i Next.js. Projekt kładzie szczególny nacisk na wydajność Edge, ścisłe typowanie oraz profesjonalny, gamingowy UX/UI.

---

## 🛠️ Stack Technologiczny (Frontend)

- **Framework:** **Next.js 16+** (App Router, Turbopack) oraz **React 19** (z pełnym wykorzystaniem Server Components).
- **Język:** **TypeScript** w trybie rygorystycznym (`strict`), z walidacją struktur danych w locie przez **Zod**.
- **Lokalizacja (i18n):** **next-intl** z automatycznym wykrywaniem języka przeglądarki i routingiem w oparciu o prefiksy (`/[locale]/...`).
- **Autoryzacja:** **NextAuth.js** zintegrowany z OAuth Riot Games (Riot Sign On - RSO) oraz systemem kont testowych dla ról: `Coach`, `Student`, `Admin`.
- **Stylizacja:** **Tailwind CSS v4** ze zoptymalizowanymi motywami e-sportowymi, efektami glassmorphism i mikro-animacjami.
- **Baza Danych na Krawędzi (Edge):** **Drizzle ORM** komunikujący się bezpośrednio z rozproszoną bazą **Turso (libSQL)**.
- **SEO:** Dynamiczne generowanie nagłówków `Metadata` dla poszczególnych wersji językowych oraz automatyczna sitemapa (`sitemap.ts`).

---

## 🚀 Uruchomienie Deweloperskie

### 1. Instalacja zależności

```bash
npm install
```

### 2. Konfiguracja zmiennych środowiskowych

Skopiuj szablon zmiennych środowiskowych i uzupełnij klucze:

```bash
cp .env.example .env
```

### 3. Uruchomienie serwera deweloperskiego

```bash
npm run dev
```

Aplikacja będzie dostępna pod adresem: `http://localhost:3000`.

---

## 🛡️ Zestaw Narzędzi Weryfikacyjnych (Quality Assurance)

W projekcie stosujemy automatyczne polecenia sprawdzające, które weryfikują jakość kodu przed wdrożeniem:

- **`npm run check:types`**: Uruchamia kompilator TypeScript (`tsc --noEmit --pretty`) w celu wykrycia błędów typowania.
- **`npm run check:i18n`**: Korzysta z **i18n-check** do statycznej analizy plików tłumaczeń, wykrywając brakujące lub nieużywane klucze w językach PL/EN.
- **`npm run check:deps`**: Wykorzystuje **Knip** do automatycznego wyszukiwania martwego kodu, nieużywanych eksportów oraz nadmiarowych zależności `npm`.
- **`npm run lint:fix`**: Szybki linter oparty o **Ultracite** (wykorzystujący Rustowy **Oxlint** oraz **ESLint 9** / **Prettier** / **Stylelint**) do automatycznego formatowania i poprawy struktury kodu.
- **`npm run build`**: Kompiluje produkcyjnie projekt, sprawdzając poprawność wszystkich tras dynamicznych oraz optymalizację obrazów/kodów.

---

## 🧪 Testy

Aplikacja ma skonfigurowane środowisko testowe dla testów jednostkowych i e2e:

- **Testy jednostkowe/integracyjne:** [Vitest](https://vitest.dev) (`npm run test`).
- **Testy E2E (End-to-End):** [Playwright](https://playwright.dev) (`npm run test:e2e`).
