import { useLocation, Link } from "react-router-dom";

export default function PaymentResult() {
  const { state } = useLocation();
  const success = state?.success ?? false;

  return (
    <div className="bg-white p-6 rounded shadow">
      {success ? (
        <>
          <h2 className="text-2xl font-bold text-green-600">Pembayaran Berhasil</h2>
          <p className="mt-2">Metode: {state.method}</p>
          <p>Jumlah: Rp {state.amount?.toLocaleString()}</p>
          <p className="mt-4">Terima kasih. Pembayaran terverifikasi.</p>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-orange-600">Invoice Dibuat (Pay Later)</h2>
          <p className="mt-2">Invoice ID: <strong>{state?.invoiceId}</strong></p>
          <p>Jumlah: Rp {state?.amount?.toLocaleString()}</p>
          <p className="mt-4">Status: <strong>Pending</strong>. Pelayan/administrasi akan menagih dan mengubah status setelah pembayaran diterima.</p>
        </>
      )}

      <div className="mt-6">
        <Link to="/" className="text-blue-600 underline">Kembali ke Dashboard</Link>
      </div>
    </div>
  );
}
