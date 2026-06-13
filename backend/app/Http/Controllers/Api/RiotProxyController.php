<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\RiotApiService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RiotProxyController extends Controller
{
    public function __construct(
        protected RiotApiService $riotService
    ) {}

    /**
     * Get Tactical Intel (Rank & Recent Activity)
     * 
     * GET /api/riot/intel?riotId=Name#Tag
     */
    public function getIntel(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'riotId' => 'required|string|contains:#'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'Invalid Tactical ID format.'], 422);
        }

        try {
            [$gameName, $tagLine] = explode('#', $request->query('riotId'));
            
            // 1. Resolve Identity
            $account = $this->riotService->getSummonerByRiotId($gameName, $tagLine);
            $puuid = $account['puuid'];

            // 2. Fetch Combat Stats (Rank)
            $stats = $this->riotService->getLeagueStats($puuid);
            
            // 3. Fetch Recent Operations (Match History)
            $matchIds = $this->riotService->getMatchIds($puuid, 5);

            return response()->json([
                'identity' => [
                    'gameName' => $gameName,
                    'tagLine' => $tagLine,
                    'puuid' => $puuid
                ],
                'rank_intel' => $stats,
                'recent_operations' => $matchIds,
                'timestamp' => now()->toIso8601String(),
                'status' => 'SECURE_SIGNAL'
            ]);

        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Signal Lost: ' . $e->getMessage(),
                'trace_id' => bin2hex(random_bytes(4))
            ], 500);
        }
    }

    /**
     * Detail Match Report
     * 
     * GET /api/riot/match/{matchId}
     */
    public function getMatchReport(string $matchId): JsonResponse
    {
        try {
            $data = $this->riotService->getMatchData($matchId);
            return response()->json($data);
        } catch (\Throwable $e) {
            return response()->json(['error' => 'Data Corrupted.'], 500);
        }
    }
}
