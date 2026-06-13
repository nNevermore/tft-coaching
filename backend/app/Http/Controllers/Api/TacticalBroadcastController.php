<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Events\MissionStatusUpdated;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TacticalBroadcastController extends Controller
{
    /**
     * Manually trigger a mission update (for testing/trener actions)
     * 
     * POST /api/tactical/trigger-update
     */
    public function triggerUpdate(Request $request): JsonResponse
    {
        $request->validate([
            'user_id' => 'required',
            'mission_id' => 'required',
            'status' => 'required|in:PREPARING,IN_PROGRESS,ACCOMPLISHED,VOD_UPLOADED'
        ]);

        broadcast(new MissionStatusUpdated(
            $request->user_id,
            $request->mission_id,
            $request->status,
            ['summary' => 'Tactical update triggered via Manual Override.']
        ));

        return response()->json([
            'status' => 'TRANSMISSION_SENT',
            'target' => "missions.{$request->user_id}"
        ]);
    }
}
