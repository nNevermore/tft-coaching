<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class Availability extends Model
{
    protected $table = 'availability';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id', 'specialist_id', 'start_time', 'end_time', 'is_booked'
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = (string) Str::uuid();
            }
        });
    }

    public function specialist(): BelongsTo
    {
        return $this->belongsTo(Specialist::class);
    }
}
