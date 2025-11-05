import React, { useState } from "react";
import { useBilling } from "../utils/BillingContext";
import { useCart } from "../utils/CartContext";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { FaShoppingCart } from "react-icons/fa";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { getTagihanByKrama } = useBilling();
  const { addToCart, cartItems } = useCart();

  const [nik, setNik] = useState("");
  const [krama, setKrama] = useState(null);
  const [tagihan, setTagihan] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔄 Jika dari halaman checkout kembali ke dashboard, refresh data otomatis
  React.useEffect(() => {
    if (location.state?.refresh && krama) {
      handleCariNik();
    }
  }, [location.state]);

  // 🔍 Cari Krama berdasarkan NIK
  const handleCariNik = async () => {
    if (!nik.trim()) {
      toast.error("Masukkan NIK terlebih dahulu!");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`http://127.0.0.1:8000/api/krama/${nik}`);
      if (!res.ok) {
        setKrama(null);
        setTagihan([]);
        toast.error("Krama tidak ditemukan!");
        setLoading(false);
        return;
      }

      const data = await res.json();
      setKrama(data);

      const tagihanData = await getTagihanByKrama(data.krama_id);

      // 🔹 Filter hanya tagihan dengan status !== "Lunas"
      const belumLunas = tagihanData.filter(
        (t) => t.status?.toLowerCase() !== "lunas"
      );

      setTagihan(belumLunas);

      if (belumLunas.length === 0) {
        toast.success("Semua tagihan sudah lunas 🎉");
      } else {
        toast.success(`Data krama ditemukan: ${data.nama}`);
      }
    } catch (err) {
      toast.error("Terjadi kesalahan saat mengambil data!");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setKrama(null);
    setNik("");
    setTagihan([]);
  };

  // 🛒 Tambahkan tagihan ke cart
  const handleAddToCart = (t) => {
    const total = Number(t.dedosan) + Number(t.peturunan);
    addToCart({
      id: t.tagihan_id,
      title: t.iuran,
      amount: total,
      tagihan_id: t.tagihan_id,
    });
    toast.success(`"${t.iuran}" ditambahkan ke keranjang!`);
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6 relative">
        {/* 🛒 Tombol Cart */}
        <button
          onClick={() => navigate("/cart")}
          className="absolute top-4 right-4 bg-blue-600 text-white rounded-full p-3 shadow-md hover:bg-blue-700 transition-all flex items-center justify-center"
          title="Lihat Keranjang"
        >
          <FaShoppingCart size={20} />
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
              {cartItems.length}
            </span>
          )}
        </button>

        <h2 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2">
          🔍 Cari Data Krama Berdasarkan NIK
        </h2>

        {/* Input Pencarian */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            value={nik}
            onChange={(e) => setNik(e.target.value)}
            placeholder="Masukkan NIK..."
            className="border border-blue-300 p-3 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleCariNik}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg transition-all shadow-sm disabled:opacity-50"
          >
            {loading ? "Mencari..." : "Cari"}
          </button>
          {krama && (
            <button
              onClick={handleReset}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-3 rounded-lg transition-all shadow-sm"
            >
              Reset
            </button>
          )}
        </div>

        {/* Data Krama */}
        {krama && (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-lg mb-6">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
              👤 Data Krama
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700">
              <p>
                <strong>NIK:</strong> {krama.nik}
              </p>
              <p>
                <strong>Nama:</strong> {krama.nama}
              </p>
              <p>
                <strong>Status:</strong> {krama.status}
              </p>
              <p>
                <strong>Alamat:</strong> {krama.alamat || "-"}
              </p>
            </div>
          </div>
        )}

        {/* Tagihan dari Database */}
        {tagihan.length > 0 && (
          <div className="overflow-x-auto mt-10">
            <h3 className="text-lg font-semibold text-green-700 mb-3">
              💰 Tagihan dari Sistem
            </h3>
            <table className="min-w-full border-collapse overflow-hidden rounded-lg shadow-sm">
              <thead>
                <tr className="bg-green-600 text-white text-left">
                  <th className="p-3">Iuran</th>
                  <th className="p-3">Dedosan</th>
                  <th className="p-3">Peturunan</th>
                  <th className="p-3">Tanggal</th>
                  <th className="p-3 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {tagihan.map((t, index) => (
                  <tr
                    key={t.tagihan_id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-green-50 transition-all`}
                  >
                    <td className="p-3">{t.iuran}</td>
                    <td className="p-3 text-gray-700">
                      Rp {Number(t.dedosan).toLocaleString("id-ID")}
                    </td>
                    <td className="p-3 text-gray-700">
                      Rp {Number(t.peturunan).toLocaleString("id-ID")}
                    </td>
                    <td className="p-3">{t.tgl}</td>
                    <td className="p-3 text-center flex gap-2 justify-center">
                      <button
                        onClick={() =>
                          navigate("/checkout", {
                            state: { tagihan: t, refresh: true },
                          })
                        }
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-sm transition-all"
                      >
                        Bayar
                      </button>
                      <button
                        onClick={() => handleAddToCart(t)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow-sm transition-all"
                      >
                        + Keranjang
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pesan Jika Tidak Ada Tagihan */}
        {krama && tagihan.length === 0 && (
          <p className="text-center text-gray-500 mt-6">
            ✅ Semua tagihan untuk krama ini sudah lunas.
          </p>
        )}
      </div>
    </div>
  );
}
