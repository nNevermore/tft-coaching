<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Specialists Table
        Schema::create('specialist', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('user_id');
            $table->string('rank');
            $table->string('specialty');
            $table->string('win_rate');
            $table->integer('hourly_rate');
            $table->integer('vod_rate');
            $table->enum('status', ['ONLINE', 'OFFLINE', 'IN_COMBAT'])->default('OFFLINE');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('user')->onDelete('cascade');
        });

        // Availability Table
        Schema::create('availability', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('specialist_id');
            $table->timestamp('start_time');
            $table->timestamp('end_time');
            $table->boolean('is_booked')->default(false);
            $table->timestamps();

            $table->foreign('specialist_id')->references('id')->on('specialist')->onDelete('cascade');
        });

        // Missions Table
        Schema::create('mission', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('student_id');
            $table->string('specialist_id')->nullable();
            $table->enum('type', ['LIVE', 'VOD']);
            $table->enum('status', ['AWAITING_PAYMENT', 'PREPARING', 'IN_PROGRESS', 'ACCOMPLISHED', 'ABORTED'])->default('AWAITING_PAYMENT');
            $table->timestamp('scheduled_at')->nullable();
            $table->string('stripe_transaction_id')->nullable();
            $table->integer('amount_paid')->nullable();
            $table->timestamps();

            $table->foreign('student_id')->references('id')->on('user')->onDelete('cascade');
            $table->foreign('specialist_id')->references('id')->on('specialist')->onDelete('set null');
        });

        // Intel Reports Table
        Schema::create('intel_report', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('mission_id');
            $table->text('summary');
            $table->text('comp_tags')->nullable(); // JSON string
            $table->string('vod_url')->nullable();
            $table->timestamps();

            $table->foreign('mission_id')->references('id')->on('mission')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('intel_report');
        Schema::dropIfExists('mission');
        Schema::dropIfExists('availability');
        Schema::dropIfExists('specialist');
    }
};
