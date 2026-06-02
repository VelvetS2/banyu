<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class KabupatenKota extends Model
{
    protected $table = 'kabupaten_kota';

    protected $fillable = ['nama'];

    public function kecamatan(): HasMany
    {
        return $this->hasMany(Kecamatan::class);
    }
}
