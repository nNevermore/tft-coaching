<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Str;

class Mission extends Model
{
    protected $table = 'mission';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id', 'student_id', 'specialist_id', 'type', 'status', 'scheduled_at', 'stripe_transaction_id', 'amount_paid'
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

    public function student(): BelongsTo
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    public function specialist(): BelongsTo
    {
        return $this->belongsTo(Specialist::class);
    }

    public function intelReport(): HasOne
    {
        return $this->hasOne(IntelReport::class);
    }
}
