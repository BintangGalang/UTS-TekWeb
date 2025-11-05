import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaSearch, FaPlus, FaCheckCircle } from "react-icons/fa";

export default function AdminPage() {
  const [nik, setNik] = useState("");
  const [krama, setKrama] = useState(null);
  const [iuran, setIuran] = useState("");
  const [dedosan, setDedosan] = useState("");
  const [peturunan, setPeturunan] = useState("");
  const [tagihans, setTagihans] = useState([]);

  // 🔹 Ambil daftar tagihan
  const fetchTagihan = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/tagihan");
      const data = await res.json();
      setTagihans(data);
    } catch (err) {
      console.error(err);
      toast.error("Gagal memuat data tagihan!");
    }
  };

  useEffect(() => {
    fetchTagihan();
  }, []);

  // 🔍 Cari krama berdasarkan NIK
  const handleCariKrama = async () => {
    if (!nik) {
      toast.error("Masukkan NIK terlebih dahulu!");
      return;
    }

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/krama/${nik}`);
      if (!res.ok) throw new Error("Krama tidak ditemukan");

      const data = await res.json();
      setKrama(data);
      toast.success("Data Krama ditemukan!");
    } catch (err) {
      console.error(err);
      setKrama(null);
      toast.error("Krama tidak ditemukan!");
    }
  };

  // 💾 Simpan tagihan baru
  const handleSimpanTagihan = async () => {
    if (!krama || !iuran || !dedosan || !peturunan) {
      toast.error("Lengkapi semua field sebelum menyimpan!");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/tagihan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          iuran,
          dedosan,
          peturunan,
          created_by: "Admin FE",
          krama_id: krama.krama_id,
          tgl: new Date().toISOString().split("T")[0],
        }),
      });

      if (!response.ok) throw new Error("Gagal menyimpan tagihan!");

      toast.success("Tagihan berhasil ditambahkan!");
      setIuran("");
      setDedosan("");
      setPeturunan("");
      setKrama(null);
      setNik("");
      fetchTagihan();
    } catch (err) {
      console.error(err);
      toast.error("Terjadi kesalahan saat menyimpan tagihan!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-blue-700 mb-6">
          🧾 Admin Page - Buat & Kelola Tagihan
        </h1>

        {/* 🔍 Form Cari Krama */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <input
            type="text"
            placeholder="Masukkan NIK..."
            value={nik}
            onChange={(e) => setNik(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleCariKrama}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg flex items-center gap-2"
          >
            <FaSearch /> Cari
          </button>
        </div>

        {/* 🔹 Info Krama */}
        {krama && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <p><b>Nama:</b> {krama.nama}</p>
            <p><b>NIK:</b> {krama.nik}</p>
            <p><b>Status:</b> {krama.status}</p>
          </div>
        )}

        {/* 🧾 Form Input Tagihan */}
        {krama && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              placeholder="Nama Iuran"
              value={iuran}
              onChange={(e) => setIuran(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
            <input
              type="number"
              placeholder="Dedosan (Rp)"
              value={dedosan}
              onChange={(e) => setDedosan(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
            <input
              type="number"
              placeholder="Peturunan (Rp)"
              value={peturunan}
              onChange={(e) => setPeturunan(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
        )}

        {krama && (
          <button
            onClick={handleSimpanTagihan}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg flex items-center gap-2 mb-8"
          >
            <FaPlus /> Simpan Tagihan
          </button>
        )}

        {/* 📊 Daftar Tagihan */}
        <h2 className="text-lg font-semibold text-gray-700 mb-3">
          📋 Daftar Tagihan
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 text-sm">
            <thead className="bg-blue-100 text-blue-700">
              <tr>
                <th className="border p-2">#</th>
                <th className="border p-2">Krama</th>
                <th className="border p-2">Iuran</th>
                <th className="border p-2">Dedosan</th>
                <th className="border p-2">Peturunan</th>
                <th className="border p-2">Tanggal</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {tagihans.length > 0 ? (
                tagihans.map((t, index) => (
                  <tr key={index} className="text-center hover:bg-gray-50">
                    <td className="border p-2">{index + 1}</td>
                    <td className="border p-2">{t.krama_id}</td>
                    <td className="border p-2">{t.iuran}</td>
                    <td className="border p-2">Rp {Number(t.dedosan).toLocaleString("id-ID")}</td>
                    <td className="border p-2">Rp {Number(t.peturunan).toLocaleString("id-ID")}</td>
                    <td className="border p-2">{t.tgl}</td>
                    <td
                      className={`border p-2 font-semibold ${
                        t.status === "Lunas" ? "text-green-600" : "text-orange-500"
                      }`}
                    >
                      {t.status === "Lunas" ? (
                        <FaCheckCircle className="inline mr-1" />
                      ) : null}
                      {t.status}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-gray-500 p-4">
                    Belum ada tagihan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
