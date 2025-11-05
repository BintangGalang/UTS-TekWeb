import React from "react";
import { useCart } from "../utils/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, totalAmount, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">🛒 Keranjang Kosong</h2>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition-all"
        >
          Kembali ke Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 flex items-center gap-2">
          🛍️ Keranjang Pembayaran
        </h2>

        <table className="w-full border-collapse mb-6">
          <thead>
            <tr className="bg-blue-600 text-white text-left">
              <th className="p-3">Nama Iuran</th>
              <th className="p-3 text-right">Jumlah</th>
              <th className="p-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, i) => (
              <tr
                key={i}
                className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50 transition-all`}
              >
                <td className="p-3">{item.title}</td>
                <td className="p-3 text-right text-green-600 font-semibold">
                  Rp {item.amount.toLocaleString("id-ID")}
                </td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md transition-all"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Total */}
        <div className="flex justify-between items-center border-t pt-4">
          <h3 className="text-lg font-semibold text-gray-700">Total Pembayaran:</h3>
          <p className="text-2xl font-bold text-green-700">
            Rp {totalAmount.toLocaleString("id-ID")}
          </p>
        </div>

        {/* Tombol Aksi */}
        <div className="flex justify-end mt-6 gap-3">
          <button
            onClick={clearCart}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-2 rounded-lg transition-all"
          >
            Kosongkan
          </button>
          <button
            onClick={() => navigate("/checkout")}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow-md transition-all"
          >
            Lanjut Pembayaran
          </button>
        </div>
      </div>
    </div>
  );
}
