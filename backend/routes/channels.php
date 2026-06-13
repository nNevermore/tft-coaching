<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

// --- MISSION INTELLIGENCE CHANNELS ---
Broadcast::channel('missions.{userId}', function ($user, $userId) {
    return (string) $user->id === (string) $userId;
});
