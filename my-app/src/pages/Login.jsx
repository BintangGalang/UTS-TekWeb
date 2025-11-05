import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Lengkapi data login!");

    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login gagal!");

      // Simpan token dan role
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success(`Login berhasil sebagai ${data.role}!`);

      // Arahkan sesuai role
      if (data.role === "admin") navigate("/adminpage");
      else navigate("/dashboard");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-200">
      <div className="bg-white p-8 shadow-lg rounded-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          🔐 Login Sistem Iuran Desa
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all"
          >
            {loading ? "Memproses..." : "Login"}
          </button>
        </form>
        <p className="text-center text-gray-500 text-sm mt-4">
          Admin: <b>admin@desa.com</b> / 12345<br />
          User: <b>user@desa.com</b> / 12345
        </p>
      </div>
    </div>
  );
}
