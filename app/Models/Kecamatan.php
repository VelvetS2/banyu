<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Kecamatan extends Model
{
    protected $table = 'kecamatan';

    protected $fillable = ['kabupaten_kota_id', 'nama_kecamatan'];

    public function kabupatenKota(): BelongsTo
    {
        return $this->belongsTo(KabupatenKota::class);
    }

    public function curahHujan(): HasMany
    {
        return $this->hasMany(CurahHujan::class);
    }

    public function curahHujanTerbaru(): HasMany
    {
        return $this->curahHujan()->latest('waktu');
    }
}
