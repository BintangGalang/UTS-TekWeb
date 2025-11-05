export default function ProductCard({ product, onAdd }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold">{product.title}</h3>
      <p className="text-sm text-gray-600">{product.description}</p>
      <div className="mt-3 flex justify-between items-center">
        <div className="text-lg font-bold">Rp {product.amount.toLocaleString()}</div>
        <button
          onClick={() => onAdd(product)}
          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
        >
          Tambah
        </button>
      </div>
    </div>
  );
}
