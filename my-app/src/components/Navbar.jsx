import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

export default function Navbar() {
  const { items, total } = useCart();
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold text-xl">KramaBilling</Link>
        <div className="flex items-center gap-4">
          <Link to="/" className="hover:underline">Dashboard</Link>
          <Link to="/cart" className="hover:underline">Cart ({items.length})</Link>
          <div className="text-sm">Total: Rp {total.toLocaleString()}</div>
        </div>
      </div>
    </nav>
  );
}
