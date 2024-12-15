import React from 'react';
import useGetOrders from "@hooks/order/useGetOrders";
import useGetProducts from "@hooks/product/useGetProducts";
import useUsers from "@hooks/users/useGetUsers.jsx";

const Home = () => {
  const { orders } = useGetOrders();
  const { products } = useGetProducts();
  const { users } = useUsers();

  const currentUser = users[0]?.nombreCompleto || "Usuario";

  const latestOrders = orders.slice(-4).reverse();
  const productsByExpiration = [...products].sort((a, b) => new Date(a.expirationDate) - new Date(b.expirationDate)).slice(0, 3);
  const productsByQuantity = [...products].sort((a, b) => a.quantity - b.quantity).slice(0, 3);

  return (
    <div className="p-6 space-y-12">
      <div className="w-full h-48 bg-cover bg-center mb-8 flex items-center justify-center" style={{ backgroundImage: `url('https://t4.ftcdn.net/jpg/09/76/35/89/240_F_976358954_3RPY6ri8sYE81nbum1mGJAEWaS6Jm4Gc.jpg')` }}>
        <h1 className="text-4xl text-white font-bold">Bienvenido, {currentUser}!</h1>
      </div>

      <section>
        <h2 className="text-2xl font-bold text-white bg-[#212121] p-4 rounded-t mb-4">Últimas Órdenes</h2>
        <div className="grid grid-cols-2 gap-4">
          {latestOrders.map((order) => (
            <div key={order.id} className="p-4 bg-white rounded shadow border border-gray-300">
              <h3 className="text-lg font-bold">Pedido #{order.id}</h3>
              <p className={`text-xl font-bold ${order.status === "PENDIENTE" ? "text-red-600" : "text-green-600"}`}>{order.status}</p>
              <p>Mesa: {order.tableNumber}</p>
              <p>Cliente: {order.customer || "N/A"}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white bg-[#212121] p-4 rounded-t mb-4">Productos por Caducar</h2>
        <div className="grid grid-cols-3 gap-4">
          {productsByExpiration.map((product) => (
            <div key={product.id} className="p-4 bg-white rounded shadow border border-gray-300">
              <h3 className="text-lg font-bold">{product.name}</h3>
              <p>Fecha de Expiración: {new Date(product.expirationDate).toLocaleDateString('es-ES')}</p>
              <p>Cantidad: {product.quantity}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white bg-[#212121] p-4 rounded-t mb-4">Productos con Menor Cantidad</h2>
        <div className="grid grid-cols-3 gap-4">
          {productsByQuantity.map((product) => (
            <div key={product.id} className="p-4 bg-white rounded shadow border border-gray-300">
              <h3 className="text-lg font-bold">{product.name}</h3>
              <p>Cantidad: {product.quantity}</p>
              <p>Fecha de Expiración: {new Date(product.expirationDate).toLocaleDateString('es-ES')}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
