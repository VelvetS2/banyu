<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('curah_hujan', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kecamatan_id')->constrained('kecamatan')->onDelete('cascade');
            $table->float('curah_hujan')->comment('mm/jam');
            $table->timestamp('waktu');
            $table->timestamps();

            $table->index(['kecamatan_id', 'waktu']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('curah_hujan');
    }
};
