<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pembayaran extends Model
{
    use HasFactory;

    protected $primaryKey = 'pembayaran_id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'pembayaran_id',
        'tagihan_id',
        'tgl_bayar',
        'jumlah',
        'status',
        'payment_by',
    ];

    public function tagihan()
    {
        return $this->belongsTo(Tagihan::class, 'tagihan_id');
    }
}
