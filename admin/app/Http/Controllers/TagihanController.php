<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tagihan;
use Illuminate\Support\Str;

class TagihanController extends Controller
{
    // 🔹 Menampilkan semua tagihan (dengan data krama)
    public function index()
    {
        $data = Tagihan::with('krama')->orderBy('created_at', 'desc')->get();
        return response()->json($data);
    }

    // 🔹 Menampilkan tagihan berdasarkan krama_id
    public function showByKrama($krama_id)
    {
    $tagihan = Tagihan::where('krama_id', $krama_id)
        ->where('status', '!=', 'Lunas')
        ->get();

    return response()->json($tagihan);
    }


    // 🔹 Menambahkan tagihan baru
    public function store(Request $request)
    {
        $validate = $request->validate([
            'iuran' => 'required|string',
            'dedosan' => 'required|numeric',
            'peturunan' => 'required|numeric',
            'krama_id' => 'required|exists:kramas,krama_id',
            'tgl' => 'required|date',
        ]);

        // 🔸 Buat ID unik otomatis
        $validate['tagihan_id'] = Str::uuid()->toString();
        $validate['created_by'] = $request->created_by ?? 'Admin FE';
        $validate['status'] = 'Belum Lunas';

        $tagihan = Tagihan::create($validate);

        return response()->json([
            'message' => 'Tagihan berhasil ditambahkan ✅',
            'data' => $tagihan
        ], 201);
    }

    // 🔹 Update tagihan
    public function update(Request $request, $id)
    {
        $tagihan = Tagihan::where('tagihan_id', $id)->first();

        if (!$tagihan) {
            return response()->json(['message' => 'Tagihan tidak ditemukan'], 404);
        }

        $tagihan->update($request->all());

        return response()->json([
            'message' => 'Tagihan berhasil diperbarui ✅',
            'data' => $tagihan
        ]);
    }

    // 🔹 Hapus tagihan
    public function destroy($id)
    {
        $tagihan = Tagihan::where('tagihan_id', $id)->first();

        if (!$tagihan) {
            return response()->json(['message' => 'Tagihan tidak ditemukan'], 404);
        }

        $tagihan->delete();

        return response()->json(['message' => 'Tagihan berhasil dihapus 🗑️']);
    }
}
