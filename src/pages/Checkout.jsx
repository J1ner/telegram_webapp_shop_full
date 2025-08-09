import { useCartStore } from "../store/cartStore";
import axios from "axios";

export default function Checkout() {
  const { cart, clearCart } = useCartStore();

  const handleOrder = async (e) => {
    e.preventDefault();
    const form = e.target;
    const order = {
      name: form.name.value,
      phone: form.phone.value,
      address: form.address.value,
      items: cart
    };
    await axios.post("https://YOUR_BACKEND_URL/order", order);
    alert("Заказ отправлен!");
    clearCart();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Оформление заказа</h1>
      {cart.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <form onSubmit={handleOrder} className="flex flex-col gap-2">
          <input type="text" name="name" placeholder="Имя" className="border p-2 rounded" required />
          <input type="text" name="phone" placeholder="Телефон" className="border p-2 rounded" required />
          <input type="text" name="address" placeholder="Адрес" className="border p-2 rounded" required />
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            Подтвердить заказ
          </button>
        </form>
      )}
    </div>
  );
}
