Write-Host "🚀 Rozpoczynanie wdrażania na serwer Mikrus..." -ForegroundColor Cyan

# Krok 1: Wypchnięcie zmian do GitHuba (opcjonalne, odkomentuj jeśli chcesz)
# Write-Host "📦 Wypychanie zmian na GitHub..." -ForegroundColor Yellow
# git push

# Krok 2: Połączenie przez SSH i przebudowanie kontenerów
Write-Host "🔌 Łączenie z VPS i aktualizacja aplikacji..." -ForegroundColor Yellow
ssh -p 10140 root@norbert140.mikrus.xyz "cd /var/www/tft-coaching && git pull && docker compose -f backend/compose.prod.yaml up -d --build"

Write-Host "✅ Wdrożenie zakończone sukcesem!" -ForegroundColor Green
