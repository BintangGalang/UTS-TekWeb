<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pembayaran;
use App\Models\Tagihan;
use Illuminate\Support\Str;

class PembayaranController extends Controller
{
    // 🔹 Menambahkan data pembayaran
    public function store(Request $request)
    {
        $request->validate([
            'tagihan_id' => 'required|exists:tagihans,tagihan_id',
            'jumlah' => 'required|numeric',
            'status' => 'required',
            'payment_by' => 'nullable'
        ]);

        $pembayaran = Pembayaran::create([
            'pembayaran_id' => Str::uuid(), // ✅ Laravel buat ID otomatis
            'tagihan_id' => $request->tagihan_id,
            'tgl_bayar' => now(),
            'jumlah' => $request->jumlah,
            'status' => $request->status,
            'payment_by' => $request->payment_by,
        ]);

        // ✅ (opsional) update status tagihan jadi “Lunas”
        Tagihan::where('tagihan_id', $request->tagihan_id)
            ->update(['status' => 'Lunas']);

        return response()->json([
            'message' => 'Pembayaran berhasil dibuat',
            'data' => $pembayaran
        ]);
    }
}
