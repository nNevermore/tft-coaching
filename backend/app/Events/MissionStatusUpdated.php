<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

/**
 * Class MissionStatusUpdated
 * 
 * Tactical Event broadcasted when a mission state changes.
 * Target: Student Dashboard (Private Channel)
 */
class MissionStatusUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(
        public string $userId,
        public string $missionId,
        public string $newStatus,
        public array $intelData = []
    ) {}

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel("missions.{$this->userId}"),
        ];
    }

    /**
     * Tactical event name for the frontend listener.
     */
    public function broadcastAs(): string
    {
        return 'mission.updated';
    }

    /**
     * Payload for the broadcast.
     */
    public function broadcastWith(): array
    {
        return [
            'mission_id' => $this->missionId,
            'status' => $this->newStatus,
            'intel' => $this->intelData,
            'timestamp' => now()->toIso8601String(),
            'signal_strength' => 'OPTIMAL',
        ];
    }
}
