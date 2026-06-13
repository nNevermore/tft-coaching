<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

/**
 * Class RiotApiService
 * 
 * Tactical Gateway for Riot Games API. 
 * Handles rate-limiting through caching and secure header injection.
 */
class RiotApiService
{
    protected string $apiKey;
    protected string $region;
    protected string $routingValue;

    public function __construct()
    {
        $this->apiKey = config('services.riot.key');
        $this->region = config('services.riot.region', 'eun1'); // Default EUNE
        $this->routingValue = config('services.riot.routing', 'europe'); // Default Europe
    }

    /**
     * Get Summoner details by Riot ID (GameName#TagLine)
     */
    public function getSummonerByRiotId(string $gameName, string $tagLine): array
    {
        $cacheKey = "riot_account_{$gameName}_{$tagLine}";

        return Cache::remember($cacheKey, now()->addHours(24), function () use ($gameName, $tagLine) {
            $response = Http::withHeader('X-Riot-Token', $this->apiKey)
                ->get("https://{$this->routingValue}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{$gameName}/{$tagLine}");

            if ($response->failed()) {
                Log::error("Riot API Account Lookup Failed", [
                    'status' => $response->status(),
                    'id' => "{$gameName}#{$tagLine}"
                ]);
                throw new \Exception("Tactical Lookup Error: Subject not found.");
            }

            return $response->json();
        });
    }

    /**
     * Get League (Rank) stats by PUUID
     */
    public function getLeagueStats(string $puuid): array
    {
        $cacheKey = "riot_league_{$puuid}";

        return Cache::remember($cacheKey, now()->addMinutes(30), function () use ($puuid) {
            // First get summoner ID from PUUID (Riot legacy requirement)
            $summonerResponse = Http::withHeader('X-Riot-Token', $this->apiKey)
                ->get("https://{$this->region}.api.riotgames.com/tft/summoner/v1/summoners/by-puuid/{$puuid}");

            if ($summonerResponse->failed()) return [];

            $summonerId = $summonerResponse->json()['id'];

            // Get TFT League entries
            $leagueResponse = Http::withHeader('X-Riot-Token', $this->apiKey)
                ->get("https://{$this->region}.api.riotgames.com/tft/league/v1/entries/by-summoner/{$summonerId}");

            return $leagueResponse->json();
        });
    }

    /**
     * Get Match History (IDs)
     */
    public function getMatchIds(string $puuid, int $count = 10): array
    {
        $cacheKey = "riot_matches_ids_{$puuid}_{$count}";

        return Cache::remember($cacheKey, now()->addMinutes(5), function () use ($puuid, $count) {
            $response = Http::withHeader('X-Riot-Token', $this->apiKey)
                ->get("https://{$this->routingValue}.api.riotgames.com/tft/match/v1/matches/by-puuid/{$puuid}/ids", [
                    'count' => $count
                ]);

            return $response->json() ?? [];
        });
    }

    /**
     * Get Specific Match Data
     */
    public function getMatchData(string $matchId): array
    {
        return Cache::remember("riot_match_data_{$matchId}", now()->addDays(7), function () use ($matchId) {
            $response = Http::withHeader('X-Riot-Token', $this->apiKey)
                ->get("https://{$this->routingValue}.api.riotgames.com/tft/match/v1/matches/{$matchId}");

            return $response->json();
        });
    }
}
