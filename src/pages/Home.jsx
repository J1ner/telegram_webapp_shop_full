import { useState } from "react";
import { products } from "../data/products";
import { useCartStore } from "../store/cartStore";
import { Link } from "react-router-dom";

export default function Home() {
  const { addToCart } = useCartStore();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Все");

  const categories = ["Все", ...new Set(products.map(p => p.category))];

  const filtered = products.filter(p =>
    (category === "Все" || p.category === category) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) ||
     p.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Магазин OLDMANY</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Поиск..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
        >
          {categories.map(cat => <option key={cat}>{cat}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filtered.map(p => (
          <div key={p.id} className="border p-2 rounded shadow">
            <img src={p.image} alt={p.name} className="w-full h-40 object-cover rounded" />
            <h2 className="font-semibold">{p.name}</h2>
            <p className="text-sm">{p.description}</p>
            <p className="font-bold">{p.price} ₽</p>
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded mt-2"
              onClick={() => addToCart(p)}
            >
              В корзину
            </button>
          </div>
        ))}
      </div>

      <Link to="/checkout" className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full shadow">
        Перейти в корзину
      </Link>
    </div>
  );
}
