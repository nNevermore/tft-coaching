<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class IntelReport extends Model
{
    protected $table = 'intel_report';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id', 'mission_id', 'summary', 'comp_tags', 'vod_url'
    ];

    protected $casts = [
        'comp_tags' => 'array',
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

    public function mission(): BelongsTo
    {
        return $this->belongsTo(Mission::class);
    }
}
