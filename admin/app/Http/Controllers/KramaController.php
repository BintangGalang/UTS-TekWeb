<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Krama;

class KramaController extends Controller
{
    // 🔹 Menampilkan semua krama
    public function index()
    {
        $data = Krama::all();
        return response()->json($data);
    }

    // 🔹 Menampilkan krama berdasarkan NIK
    public function showByNIK($nik)
    {
        $krama = Krama::where('nik', $nik)->first();
        if (!$krama) {
            return response()->json(['message' => 'Krama tidak ditemukan'], 404);
        }
        return response()->json($krama);
    }

    // 🔹 Tambah krama baru
    public function store(Request $request)
    {
        $validate = $request->validate([
            'krama_id' => 'required|unique:kramas',
            'nik' => 'required|unique:kramas',
            'nama' => 'required',
            'gender' => 'required',
            'status' => 'required',
        ]);

        $krama = Krama::create($validate);
        return response()->json(['message' => 'Krama berhasil ditambahkan', 'data' => $krama]);
    }

    // 🔹 Update data krama
    public function update(Request $request, $id)
    {
        $krama = Krama::find($id);
        if (!$krama) return response()->json(['message' => 'Krama tidak ditemukan'], 404);

        $krama->update($request->all());
        return response()->json(['message' => 'Data krama diperbarui', 'data' => $krama]);
    }

    // 🔹 Hapus krama
    public function destroy($id)
    {
        $krama = Krama::find($id);
        if (!$krama) return response()->json(['message' => 'Krama tidak ditemukan'], 404);

        $krama->delete();
        return response()->json(['message' => 'Krama dihapus']);
    }
}
