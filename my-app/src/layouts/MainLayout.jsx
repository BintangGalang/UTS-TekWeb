import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <header className="bg-white p-4 shadow">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-lg font-semibold">Pembayaran Iuran Krama Desa</h2>
        </div>
      </header>
      <main className="flex-1 p-6 max-w-5xl mx-auto w-full">
        <Outlet />
      </main>
      <footer className="bg-gray-800 text-white text-center p-4">
        © 2025 Billing Krama Desa
      </footer>
    </div>
  );
}
