<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Krama extends Model
{
    use HasFactory;

    protected $primaryKey = 'krama_id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'krama_id',
        'nik',
        'nama',
        'gender',
        'status',
    ];
}
