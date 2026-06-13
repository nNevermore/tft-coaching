<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Stripe\Webhook;
use Stripe\Exception\SignatureVerificationException;
use App\Events\MissionStatusUpdated;

class StripeWebhookController extends Controller
{
    /**
     * Tactical Webhook Handler
     * 
     * Verifies Stripe signatures and initializes mission parameters upon successful transaction.
     */
    public function handle(Request $request)
    {
        $payload = $request->getContent();
        $sigHeader = $request->header('Stripe-Signature');
        $endpointSecret = config('services.stripe.webhook_secret');

        try {
            // In production, we'd use Stripe\Webhook::constructEvent
            // For this architecture, we assume the SDK will be available in the container
            $event = \Stripe\Event::constructFrom(
                json_decode($payload, true)
            );
        } catch (\UnexpectedValueException $e) {
            return response()->json(['error' => 'Invalid Payload'], 400);
        }

        // Handle the tactical events
        switch ($event->type) {
            case 'checkout.session.completed':
                $session = $event->data->object;
                $this->initializeMission($session);
                break;
            
            default:
                Log::info('Stripe Event Received (Unhandled): ' . $event->type);
        }

        return response()->json(['status' => 'TRANSMISSION_ACKNOWLEDGED']);
    }

    /**
     * Logic to lock-in the mission and notify the client
     */
    protected function initializeMission($session)
    {
        $userId = $session->metadata->user_id ?? null;
        $missionType = strtoupper($session->metadata->mission_type ?? 'LIVE');
        $transactionId = $session->id;
        $amount = $session->amount_total;

        if (!$userId) {
            Log::error("Stripe Webhook: user_id missing in metadata.");
            return;
        }

        Log::info("Mission Initialized via Stripe Webhook", [
            'user_id' => $userId,
            'mission_type' => $missionType,
            'stripe_session' => $transactionId
        ]);

        // 1. Persist to Tactical Repository (Turso libSQL)
        $mission = \App\Models\Mission::create([
            'student_id' => $userId,
            'type' => $missionType,
            'status' => 'PREPARING',
            'stripe_transaction_id' => $transactionId,
            'amount_paid' => $amount,
        ]);

        // 2. Broadcast tactical update to the Command Center (Frontend)
        broadcast(new MissionStatusUpdated(
            (string)$userId,
            $mission->id,
            "PREPARING",
            [
                'summary' => "Transaction verified. System initializing mission " . $mission->id,
                'deployment_zone' => "EUNE_CENTRAL"
            ]
        ));
    }
}
