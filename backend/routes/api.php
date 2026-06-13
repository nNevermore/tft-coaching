<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\RiotProxyController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// --- TACTICAL RIOT PROXY ---
Route::prefix('riot')->group(function () {
    Route::get('/intel', [RiotProxyController::class, 'getIntel']);
    Route::get('/match/{matchId}', [RiotProxyController::class, 'getMatchReport']);
});

// --- TACTICAL COMMS (WebSockets) ---
Route::post('/tactical/trigger-update', [App\Http\Controllers\Api\TacticalBroadcastController::class, 'triggerUpdate']);

// --- SECURE PAYMENT GATEWAY (Stripe) ---
Route::post('/stripe/webhook', [App\Http\Controllers\Api\StripeWebhookController::class, 'handle']);

Route::get('/status', function () {
    $dbConnected = false;
    try {
        \Illuminate\Support\Facades\DB::connection()->getPdo();
        $dbConnected = true;
    } catch (\Throwable $e) {
        \Illuminate\Support\Facades\Log::error('Database connection test failed: ' . $e->getMessage(), [
            'exception' => $e
        ]);
        // Silently fail, dbConnected remains false
    }

    return response()->json([
        'status' => 'ok',
        'environment' => config('app.env'),
        'php_version' => PHP_VERSION,
        'database_connected' => $dbConnected,
        'timestamp' => now()->toIso8601String(),
    ]);
});
