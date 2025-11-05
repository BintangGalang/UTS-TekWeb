import React, { useState } from "react";
import { useCart } from "../utils/CartContext";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaQrcode, FaWallet } from "react-icons/fa";

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, totalAmount, clearCart } = useCart();

  const tagihan = location.state?.tagihan || null; // tagihan dari sistem
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔹 Hitung total (jika tagihan dari sistem)
  const total = tagihan ? Number(tagihan.dedosan) + Number(tagihan.peturunan) : totalAmount;

  const handlePayment = async () => {
    if (!selectedMethod) {
      toast.error("Pilih metode pembayaran terlebih dahulu!");
      return;
    }

    setLoading(true);

    try {
      // 🔸 Jika bayar tagihan dari sistem
      if (tagihan) {
        const response = await fetch("http://127.0.0.1:8000/api/pembayaran", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tagihan_id: tagihan.tagihan_id,
            jumlah: total,
            status: selectedMethod === "qris" ? "Lunas" : "Menunggu Pembayaran",
            payment_by: "User Frontend",
          }),
        });

        if (!response.ok) throw new Error("Gagal menyimpan pembayaran!");

        toast.success(
          selectedMethod === "qris"
            ? "Pembayaran berhasil melalui QRIS! 🎉"
            : "Tagihan tercatat, silakan bayar ke pelayan desa 🙏"
        );
      } else {
        // 🔸 Pembayaran dari Cart (iuran tambahan)
        clearCart();
        toast.success("Pembayaran iuran tambahan berhasil!");
      }

     setTimeout(() => {
      clearCart();
      toast.success("Pembayaran selesai, kembali ke dashboard!");
      navigate("/dashboard", { replace: true });

    }, 1500);

    } catch (err) {
      console.error(err);
      toast.error("Terjadi kesalahan saat memproses pembayaran!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-blue-700 mb-6">💳 Checkout Pembayaran</h2>

        {/* Ringkasan Pembayaran */}
        <div className="mb-6 border-b pb-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            🧾 Ringkasan Pembayaran
          </h3>
          {tagihan ? (
            <ul className="text-gray-700">
              <li><b>Iuran:</b> {tagihan.iuran}</li>
              <li><b>Dedosan:</b> Rp {Number(tagihan.dedosan).toLocaleString("id-ID")}</li>
              <li><b>Peturunan:</b> Rp {Number(tagihan.peturunan).toLocaleString("id-ID")}</li>
              <li><b>Total:</b> <span className="text-green-700 font-semibold">Rp {total.toLocaleString("id-ID")}</span></li>
            </ul>
          ) : (
            <>
              <ul className="divide-y divide-gray-100">
                {cartItems.map((item, index) => (
                  <li key={index} className="flex justify-between py-2">
                    <span>{item.title}</span>
                    <span className="font-semibold text-green-700">
                      Rp {item.amount.toLocaleString("id-ID")}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between mt-3">
                <h4 className="text-lg font-semibold text-gray-700">Total:</h4>
                <p className="text-2xl font-bold text-green-700">
                  Rp {totalAmount.toLocaleString("id-ID")}
                </p>
              </div>
            </>
          )}
        </div>

        {/* Metode Pembayaran */}
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          🏦 Pilih Metode Pembayaran
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div
            onClick={() => setSelectedMethod("qris")}
            className={`cursor-pointer border-2 rounded-xl p-5 flex flex-col items-center justify-center transition-all ${
              selectedMethod === "qris"
                ? "border-green-500 bg-green-50"
                : "border-gray-200 hover:border-green-400"
            }`}
          >
            <FaQrcode size={40} className="text-green-600 mb-3" />
            <h4 className="font-semibold text-gray-700">QRIS (Langsung Bayar)</h4>
            <p className="text-sm text-gray-500 text-center">
              Gunakan aplikasi e-wallet untuk scan QR
            </p>
          </div>

          <div
            onClick={() => setSelectedMethod("paylater")}
            className={`cursor-pointer border-2 rounded-xl p-5 flex flex-col items-center justify-center transition-all ${
              selectedMethod === "paylater"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-blue-400"
            }`}
          >
            <FaWallet size={40} className="text-blue-600 mb-3" />
            <h4 className="font-semibold text-gray-700">Pay Later (Bayar ke Pelayan)</h4>
            <p className="text-sm text-gray-500 text-center">
              Bayar langsung ke petugas atau bendesa
            </p>
          </div>
        </div>

        {selectedMethod === "qris" && (
          <div className="bg-gray-50 border p-5 rounded-xl mb-6 text-center">
            <h4 className="font-semibold text-gray-700 mb-2">🔳 Scan Kode QR Berikut:</h4>
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=QRIS-PEMBAYARAN-KRAMA"
              alt="QRIS"
              className="mx-auto my-3 border p-2 rounded-lg bg-white"
            />
            <p className="text-gray-500 text-sm">
              Silakan scan menggunakan aplikasi e-wallet Anda.
            </p>
          </div>
        )}

        {/* Tombol Aksi */}
        <div className="flex justify-between">
          <button
            onClick={() => navigate(tagihan ? "/" : "/cart")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-2 rounded-lg transition-all"
          >
            ← Kembali
          </button>
          <button
            onClick={handlePayment}
            disabled={loading}
            className={`px-6 py-2 rounded-lg text-white shadow-md transition-all ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Memproses..." : "Bayar Sekarang"}
          </button>
        </div>
      </div>
    </div>
  );
}
