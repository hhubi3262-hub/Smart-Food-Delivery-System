import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  FiTrendingUp,
  FiDollarSign,
  FiShoppingBag,
  FiUsers,
  FiCalendar,
  FiBarChart2,
  FiPieChart,
  FiActivity,
  FiPackage,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
} from 'react-icons/fi';

interface DashboardStats {
  todayOrders: number;
  todayRevenue: number;
  todayReservations: number;
  pendingOrders: number;
  totalCustomers: number;
  monthRevenue: number;
}

const ManagerDashboard = () => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    todayOrders: 0,
    todayRevenue: 0,
    todayReservations: 0,
    pendingOrders: 0,
    totalCustomers: 0,
    monthRevenue: 0,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    // Simulate API call
    setTimeout(() => {
      setStats({
        todayOrders: 45,
        todayRevenue: 3250.50,
        todayReservations: 12,
        pendingOrders: 8,
        totalCustomers: 1247,
        monthRevenue: 48750.00,
      });
      setLoading(false);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-gold-50">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-500 to-gold-500 flex items-center justify-center animate-pulse">
            <FiBarChart2 className="text-4xl text-white" />
          </div>
          <p className="text-xl font-semibold text-gray-700">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-gold-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold mb-2">Manager Dashboard</h1>
              <p className="text-primary-100 text-lg">Welcome back! Here's what's happening today.</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-primary-100">Current Date</p>
              <p className="text-2xl font-bold">{new Date().toLocaleDateString('en-AE', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<FiShoppingBag />}
            title="Today's Orders"
            value={stats.todayOrders}
            subtitle="+8 from yesterday"
            color="primary"
            trend="up"
          />
          <StatCard
            icon={<FiDollarSign />}
            title="Today's Revenue"
            value={`AED ${stats.todayRevenue.toFixed(2)}`}
            subtitle="+12% vs average"
            color="secondary"
            trend="up"
          />
          <StatCard
            icon={<FiCalendar />}
            title="Reservations"
            value={stats.todayReservations}
            subtitle="3 upcoming"
            color="gold"
          />
          <StatCard
            icon={<FiUsers />}
            title="Total Customers"
            value={stats.totalCustomers}
            subtitle="+24 this week"
            color="primary"
            trend="up"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Sales Chart */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Sales Overview</h3>
                <p className="text-gray-500 text-sm">Last 7 days performance</p>
              </div>
              <FiBarChart2 className="text-3xl text-primary-600" />
            </div>
            <div className="space-y-4">
              {[
                { day: 'Monday', sales: 85, color: 'from-primary-400 to-primary-600' },
                { day: 'Tuesday', sales: 72, color: 'from-primary-400 to-primary-600' },
                { day: 'Wednesday', sales: 93, color: 'from-primary-400 to-primary-600' },
                { day: 'Thursday', sales: 67, color: 'from-primary-400 to-primary-600' },
                { day: 'Friday', sales: 100, color: 'from-gold-400 to-gold-600' },
                { day: 'Saturday', sales: 96, color: 'from-gold-400 to-gold-600' },
                { day: 'Sunday', sales: 88, color: 'from-secondary-400 to-secondary-600' },
              ].map((item) => (
                <div key={item.day} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">{item.day}</span>
                    <span className="font-bold text-primary-600">AED {(item.sales * 45).toFixed(0)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-1000 shadow-md`}
                      style={{ width: `${item.sales}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Status */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Order Status</h3>
                <p className="text-gray-500 text-sm">Real-time order tracking</p>
              </div>
              <FiActivity className="text-3xl text-secondary-600" />
            </div>
            <div className="space-y-4">
              <OrderStatusItem
                status="Pending"
                count={8}
                icon={<FiClock />}
                color="bg-yellow-100 text-yellow-700"
              />
              <OrderStatusItem
                status="Preparing"
                count={15}
                icon={<FiPackage />}
                color="bg-blue-100 text-blue-700"
              />
              <OrderStatusItem
                status="Ready"
                count={6}
                icon={<FiCheckCircle />}
                color="bg-purple-100 text-purple-700"
              />
              <OrderStatusItem
                status="Completed"
                count={45}
                icon={<FiCheckCircle />}
                color="bg-secondary-100 text-secondary-700"
              />
              <OrderStatusItem
                status="Cancelled"
                count={2}
                icon={<FiAlertCircle />}
                color="bg-red-100 text-red-700"
              />
            </div>
          </div>
        </div>

        {/* Revenue Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FiPieChart className="text-primary-600" />
              Order Types
            </h3>
            <div className="space-y-3">
              {[
                { type: 'Dine-in', percentage: 60, color: 'bg-primary-500' },
                { type: 'Takeaway', percentage: 25, color: 'bg-gold-500' },
                { type: 'Delivery', percentage: 15, color: 'bg-secondary-500' },
              ].map((item) => (
                <div key={item.type}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{item.type}</span>
                    <span className="font-bold">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${item.color} h-2 rounded-full transition-all duration-1000`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FiDollarSign className="text-secondary-600" />
              Payment Methods
            </h3>
            <div className="space-y-3">
              {[
                { method: 'Cash', percentage: 45, color: 'bg-secondary-500' },
                { method: 'Card', percentage: 40, color: 'bg-primary-500' },
                { method: 'Online', percentage: 15, color: 'bg-gold-500' },
              ].map((item) => (
                <div key={item.method}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{item.method}</span>
                    <span className="font-bold">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${item.color} h-2 rounded-full transition-all duration-1000`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary-600 to-gold-500 rounded-2xl shadow-lg p-6 text-white">
            <h3 className="text-lg font-bold mb-2">This Month</h3>
            <p className="text-4xl font-bold mb-2">AED {stats.monthRevenue.toFixed(0)}</p>
            <p className="text-primary-100 text-sm mb-4">Total Revenue</p>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="flex justify-between text-sm">
                <span>Average/Day</span>
                <span className="font-bold">AED {(stats.monthRevenue / 30).toFixed(0)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Orders</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Order #</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Customer</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Items</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Time</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 'AFM23001', customer: 'Ahmed Ali', type: 'Dine-in', items: 3, amount: 125.50, status: 'Completed', time: '2 min ago' },
                  { id: 'AFM23002', customer: 'Sara Mohammed', type: 'Takeaway', items: 2, amount: 85.00, status: 'Ready', time: '5 min ago' },
                  { id: 'AFM23003', customer: 'John Smith', type: 'Delivery', items: 5, amount: 205.75, status: 'Preparing', time: '8 min ago' },
                  { id: 'AFM23004', customer: 'Fatima Hassan', type: 'Dine-in', items: 4, amount: 178.25, status: 'Pending', time: '10 min ago' },
                  { id: 'AFM23005', customer: 'Michael Brown', type: 'Takeaway', items: 1, amount: 45.00, status: 'Completed', time: '15 min ago' },
                ].map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="py-4 px-4 font-mono text-sm font-semibold text-primary-600">{order.id}</td>
                    <td className="py-4 px-4 font-medium">{order.customer}</td>
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                        {order.type}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">{order.items}</td>
                    <td className="py-4 px-4 font-bold text-primary-600">AED {order.amount}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === 'Completed' ? 'bg-secondary-100 text-secondary-700' :
                        order.status === 'Ready' ? 'bg-purple-100 text-purple-700' :
                        order.status === 'Preparing' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-500 text-sm">{order.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({
  icon,
  title,
  value,
  subtitle,
  color,
  trend,
}: {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  subtitle: string;
  color: string;
  trend?: 'up' | 'down';
}) => {
  const colorClasses = {
    primary: 'from-primary-500 to-primary-600',
    secondary: 'from-secondary-500 to-secondary-600',
    gold: 'from-gold-500 to-gold-600',
  }[color];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex justify-between items-start mb-4">
        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colorClasses} flex items-center justify-center text-white text-2xl shadow-lg`}>
          {icon}
        </div>
        {trend && (
          <span className={`flex items-center gap-1 text-sm font-semibold ${
            trend === 'up' ? 'text-secondary-600' : 'text-red-600'
          }`}>
            <FiTrendingUp className={trend === 'down' ? 'rotate-180' : ''} />
            {trend === 'up' ? 'Up' : 'Down'}
          </span>
        )}
      </div>
      <h3 className="text-gray-500 text-sm font-medium mb-2">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
      <p className="text-gray-600 text-sm">{subtitle}</p>
    </div>
  );
};

const OrderStatusItem = ({
  status,
  count,
  icon,
  color,
}: {
  status: string;
  count: number;
  icon: React.ReactNode;
  color: string;
}) => (
  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-xl`}>
        {icon}
      </div>
      <span className="font-medium text-gray-900">{status}</span>
    </div>
    <span className="text-2xl font-bold text-gray-900">{count}</span>
  </div>
);

export default ManagerDashboard;
