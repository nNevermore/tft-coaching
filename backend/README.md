# TFT Coaching - Backend API

## Uruchamianie i Zamykanie Projektu

### Uruchomienie backendu:
Wejdź w konsoli (np. bash/terminal) do folderu `backend` i uruchom kontenery w tle:
```bash
cd backend
docker compose up -d
```

> [!TIP]
> Po uruchomieniu kontenerów należy również włączyć serwer WebSockets (Laravel Reverb) wewnątrz kontenera:
> ```bash
> docker exec -d backend-laravel.test-1 php artisan reverb:start
> ```

### Zamknięcie backendu:
Aby wyłączyć i zatrzymać wszystkie kontenery:
```bash
docker compose down
```

---

## Stack Technologiczny

Backend został zaprojektowany z myślą o wysokiej wydajności, niezawodności i zgodności ze standardami nowoczesnego tworzenia oprogramowania:

- **Framework:** [Laravel 12](https://laravel.com) na **PHP 8.4**.
- **Środowisko:** Lokalnie uruchamiany za pomocą **Laravel Sail** (Docker), produkcyjnie wdrażany na VPS (Docker).
- **Baza Danych:** [Turso (libSQL)](https://turso.tech) obsługiwany przez klienta libSQL dla PHP. 
- **Cache, Sesje i Kolejki:** [Redis](https://redis.io) dla optymalizacji wydajności, szybkiej obsługi sesji oraz kolejkowania zadań.
- **WebSockets / Czat:** [Laravel Reverb](https://laravel.com/docs/11.x/reverb) (wbudowany serwer WebSockets o wysokiej przepustowości).
- **Integracje:** Płatności [Stripe](https://stripe.com) (integracja Webhooków) oraz oficjalne **Riot Games API** do pobierania statystyk graczy.

---

## Opis Projektu (Backend)

Backend działa jako dedykowane API dla aplikacji frontendowej zbudowanej w Next.js. Kluczowe odpowiedzialności backendu obejmują:

1. **Riot Games API Proxy:** 
   Wszystkie zapytania do oficjalnego API Riot Games przechodzą przez backend w celu:
   - Ukrycia klucza API przed użytkownikami końcowymi.
   - Cache'owania odpowiedzi w Redis w celu uniknięcia przekroczenia limitów zapytań (Rate Limits) narzuconych przez Riot Games.
2. **System Rezerwacji i Kalendarz Dostępności:**
   Zarządzanie czasem pracy trenerów, wolnymi slotami oraz rezerwacjami dokonywanymi przez klientów.
3. **Obsługa Płatności (Stripe Checkout & Webhooks):**
   Generowanie linków do Stripe Checkout za pośrednictwem API oraz bezpieczne odbieranie zdarzeń Stripe (Webhooków) w celu oznaczania sesji coachingowych jako opłacone.
4. **Komunikacja Real-time (Czat):**
   Obsługa powiadomień i wiadomości czatu na żywo za pomocą Laravel Reverb i drivera Redis.
