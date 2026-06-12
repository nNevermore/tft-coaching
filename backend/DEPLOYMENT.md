# Wdrożenie produkcyjne (Docker VPS)

Instrukcja wdrożenia i aktualizacji aplikacji backendowej **TFT Coaching** na serwerze VPS (Ubuntu 24.04 LTS) przy użyciu kontenerów Docker.

---

## 1. Przygotowanie serwera (wykonywane raz)

### Krok 1: Instalacja Docker & Docker Compose
Zaloguj się na serwer przez SSH i uruchom poniższe polecenie, aby zainstalować silnik Docker oraz wtyczkę Docker Compose:

```bash
sudo apt update && sudo apt upgrade -y && \
sudo apt install -y ca-certificates curl gnupg && \
sudo install -m 0755 -d /etc/apt/keyrings && \
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc && \
sudo chmod a+r /etc/apt/keyrings/docker.asc && \
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null && \
sudo apt update && \
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

### Krok 2: Klonowanie repozytorium
Stwórz folder aplikacji i sklonuj publiczne repozytorium z GitHuba:

```bash
sudo mkdir -p /var/www/tft-coaching
sudo chown -R $USER:$USER /var/www/tft-coaching
git clone https://github.com/nNevermore/tft-coaching.git /var/www/tft-coaching
```

---

## 2. Pierwsze uruchomienie aplikacji

### Krok 1: Utworzenie pliku konfiguracyjnego `.env`
Przejdź do katalogu backendu na VPS:
```bash
cd /var/www/tft-coaching/backend
```

Utwórz i edytuj produkcyjny plik środowiskowy `.env`:
```bash
nano .env
```

**Wklej poniższą zawartość (uzupełnij wartościami):**
```env
APP_NAME="TFT Coaching"
APP_ENV=production
APP_DEBUG=false
# Jeśli używasz IPv6, adres IP musi być w nawiasach kwadratowych, np. http://[2a01:4f9:3100:1fef::140]
# Najlepiej wpisać docelową domenę, nawet jeśli jeszcze nie jest podpięta, np. http://api.twojadomena.pl (lub http://localhost)
APP_URL=http://<TWOJ_ADRES_IP_LUB_DOMENA>

# Puste pole - klucz wygenerujemy w Kroku 3
APP_KEY=

DB_CONNECTION=libsql
TURSO_DB_URL=libsql://tft-coaching-db-bartoszwoj.aws-eu-west-1.turso.io
TURSO_DB_TOKEN=<TOKEN_PRODUKCYJNY_Z_TURSO>

# Inne ustawienia środowiskowe (np. klucze poczty itp.)
```

### Krok 2: Uruchomienie kontenera Docker
Uruchom aplikację w tle. Docker automatycznie pobierze obrazy, zainstaluje zależności Composer, zbuduje pliki frontowe przez Vite (wewnątrz kontenera) i wystawi serwer:

```bash
docker compose -f compose.prod.yaml up -d --build
```

### Krok 3: Konfiguracja aplikacji i klucza szyfrującego
W kontenerach Docker plik `.env` nie jest wklejany bezpośrednio do obrazu (ze względów bezpieczeństwa). Zamiast tego zmienne są wstrzykiwane przez system z pliku `.env` na VPS. Z tego powodu wygeneruj klucz szyfrujący, dopisz go na serwerze i zrestartuj kontenery:

1. Wyświetl nowo wygenerowany klucz szyfrujący w konsoli:
   ```bash
   docker exec -it tft-coaching-backend php artisan key:generate --show
   ```
2. Skopiuj wyświetlony klucz (np. `base64:sOmEKkEy...`).
3. Otwórz plik `.env` na VPS:
   ```bash
   nano .env
   ```
   Dopisz/zastąp linię:
   ```env
   APP_KEY=<SKOPIOWANY_KLUCZ>
   ```
4. Zapisz plik (`Ctrl+O`, `Enter`, `Ctrl+X`) i zrestartuj kontener, aby wczytać klucz:
   ```bash
   docker compose -f compose.prod.yaml up -d
   ```
5. Uruchom migracje bazy danych:
   ```bash
   docker exec -it tft-coaching-backend php artisan migrate --force
   ```

---

## 3. Aktualizacja projektu (kolejne wdrożenia)

Gdy wprowadzisz zmiany w kodzie na lokalnym komputerze i wypchniesz je na GitHuba, na serwerze VPS wykonaj następujące polecenia:

```bash
cd /var/www/tft-coaching
git pull
docker compose -f backend/compose.prod.yaml up -d --build
```

Docker automatycznie:
1. Pobierze nowe pliki z repozytorium.
2. Zbuduje nowy obraz w tle (zaktualizuje zależności, skompiluje pliki).
3. Podmieni działający kontener na nowy **bez przestojów** w działaniu aplikacji.

---

## 4. Konfiguracja domeny i SSL (Opcjonalnie)

Aby podpiąć własną domenę (np. `api.tft-coaching.pl`) i zabezpieczyć ruch przez HTTPS (SSL):
1. **DNS**: Dodaj rekord typu **A** (skierowany na IPv4 VPS) lub rekord typu **AAAA** (skierowany na IPv6 VPS) u swojego rejestratora domeny.
2. **UFW & SSL**: Skonfiguruj zaporę oraz zainstaluj darmowy certyfikat SSL za pomocą Certbota na poziomie systemu VPS (działającego jako reverse-proxy do portu kontenera).
