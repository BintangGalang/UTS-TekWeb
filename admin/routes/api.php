<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\KramaController;
use App\Http\Controllers\TagihanController;
use App\Http\Controllers\PembayaranController;
use App\Http\Controllers\AuthController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
});

// Rute Krama
Route::get('/krama', [KramaController::class, 'index']);
Route::get('/krama/{nik}', [KramaController::class, 'showByNIK']);
Route::post('/krama', [KramaController::class, 'store']);
Route::put('/krama/{id}', [KramaController::class, 'update']);
Route::delete('/krama/{id}', [KramaController::class, 'destroy']);

// Rute Tagihan
Route::get('/tagihan', [TagihanController::class, 'index']);
Route::get('/tagihan/krama/{krama_id}', [TagihanController::class, 'showByKrama']);
Route::post('/tagihan', [TagihanController::class, 'store']);
Route::put('/tagihan/{id}', [TagihanController::class, 'update']);
Route::delete('/tagihan/{id}', [TagihanController::class, 'destroy']);

// Rute Pembayaran
Route::get('/pembayaran', [PembayaranController::class, 'index']);
Route::get('/pembayaran/tagihan/{tagihan_id}', [PembayaranController::class, 'showByTagihan']);
Route::post('/pembayaran', [PembayaranController::class, 'store']);
Route::put('/pembayaran/{id}', [PembayaranController::class, 'update']);
Route::delete('/pembayaran/{id}', [PembayaranController::class, 'destroy']);
