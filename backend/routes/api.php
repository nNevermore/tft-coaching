<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/status', function () {
    $dbConnected = false;
    try {
        \Illuminate\Support\Facades\DB::connection()->getPdo();
        $dbConnected = true;
    } catch (\Exception $e) {
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
