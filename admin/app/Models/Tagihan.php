<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tagihan extends Model
{
    use HasFactory;

    protected $table = 'tagihans';
    protected $primaryKey = 'tagihan_id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'tagihan_id',
        'iuran',
        'dedosan',
        'peturunan',
        'created_by',
        'krama_id',
        'tgl',
    ];

    // Relasi: Tagihan dimiliki oleh satu Krama
    public function krama()
    {
        return $this->belongsTo(Krama::class, 'krama_id', 'krama_id');
    }

    // Relasi: Satu Tagihan punya satu Pembayaran
    public function pembayaran()
    {
        return $this->hasOne(Pembayaran::class, 'tagihan_id', 'tagihan_id');
    }
}
