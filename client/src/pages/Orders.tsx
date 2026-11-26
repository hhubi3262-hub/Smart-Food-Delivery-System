import { useEffect, useState } from 'react';
import { ordersAPI } from '../services/api';
import { toast } from 'react-toastify';

const Orders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await ordersAPI.getAll();
      setOrders(response.data.data || []);
    } catch (error) {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Orders</h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-bold mb-2">No orders yet</h2>
            <p className="text-gray-600">Orders will appear here once customers start ordering</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const OrderCard = ({ order }: { order: any }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-xl font-bold">Order #{order._id?.slice(-6)}</h3>
        <p className="text-gray-600 text-sm">{new Date(order.createdAt).toLocaleString()}</p>
      </div>
      <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-semibold">
        {order.status}
      </span>
    </div>
    <div className="text-2xl font-bold text-orange-600">
      AED {order.totalAmount}
    </div>
  </div>
);

export default Orders;
