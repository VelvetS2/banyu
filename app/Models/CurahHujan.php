<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CurahHujan extends Model
{
    protected $table = 'curah_hujan';

    protected $fillable = ['kecamatan_id', 'curah_hujan', 'waktu'];

    protected $casts = [
        'waktu' => 'datetime',
        'curah_hujan' => 'float',
    ];

    public function kecamatan(): BelongsTo
    {
        return $this->belongsTo(Kecamatan::class);
    }

    public function getStatusAttribute(): array
    {
        return match (true) {
            $this->curah_hujan < 10 => [
                'warna' => 'hijau',
                'label' => 'Tidak hujan / gerimis, aman',
            ],
            $this->curah_hujan <= 20 => [
                'warna' => 'kuning',
                'label' => 'Hujan sedang, pantau kondisi',
            ],
            $this->curah_hujan <= 50 => [
                'warna' => 'oranye',
                'label' => 'Hujan deras, waspada',
            ],
            $this->curah_hujan <= 100 => [
                'warna' => 'merah_muda',
                'label' => 'Hujan sangat lebat, siaga',
            ],
            default => [
                'warna' => 'merah_tua',
                'label' => 'Ekstrem, potensi banjir tinggi',
            ],
        };
    }
}
