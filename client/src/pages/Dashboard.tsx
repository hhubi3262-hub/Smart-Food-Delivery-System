import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiDollarSign, FiUsers, FiTrendingUp } from 'react-icons/fi';
import { authAPI } from '../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await authAPI.getCurrentUser();
        setUser(response.data.user);
      } catch (error) {
        console.error('Failed to fetch user:', error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name || 'User'}! 👋
          </h1>
          <p className="text-gray-600 mt-2">
            Here's what's happening with your restaurant today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<FiShoppingCart className="text-3xl text-blue-600" />}
            title="Total Orders"
            value="156"
            change="+12%"
            positive={true}
          />
          <StatCard
            icon={<FiDollarSign className="text-3xl text-green-600" />}
            title="Revenue"
            value="AED 45,230"
            change="+8%"
            positive={true}
          />
          <StatCard
            icon={<FiUsers className="text-3xl text-purple-600" />}
            title="Customers"
            value="892"
            change="+23%"
            positive={true}
          />
          <StatCard
            icon={<FiTrendingUp className="text-3xl text-orange-600" />}
            title="Growth"
            value="24%"
            change="+5%"
            positive={true}
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <QuickAction
            title="Create Order"
            description="Start a new order for dine-in or takeaway"
            icon="🛒"
            color="bg-blue-500"
            onClick={() => navigate('/orders')}
          />
          <QuickAction
            title="View Menu"
            description="Manage menu items and pricing"
            icon="📋"
            color="bg-green-500"
            onClick={() => navigate('/menu')}
          />
          <QuickAction
            title="Reservations"
            description="Manage table reservations"
            icon="📅"
            color="bg-purple-500"
            onClick={() => navigate('/reservations')}
          />
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <ActivityItem
              icon="🛒"
              title="New Order #1234"
              time="5 minutes ago"
              status="pending"
            />
            <ActivityItem
              icon="📅"
              title="Table Reservation - Smith"
              time="15 minutes ago"
              status="confirmed"
            />
            <ActivityItem
              icon="💰"
              title="Payment Received - AED 450"
              time="1 hour ago"
              status="completed"
            />
            <ActivityItem
              icon="🍔"
              title="Menu Item Added - Shawarma"
              time="2 hours ago"
              status="completed"
            />
          </div>
        </div>

        {/* System Status */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">System Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <SystemStatus label="Backend" status="Operational" />
            <SystemStatus label="Database" status="Connected" />
            <SystemStatus label="Payments" status="Ready" />
            <SystemStatus label="KDS" status="Online" />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, change, positive }: any) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="flex items-center justify-between mb-4">
      <div>{icon}</div>
      <span className={`text-sm font-semibold ${positive ? 'text-green-600' : 'text-red-600'}`}>
        {change}
      </span>
    </div>
    <h3 className="text-gray-600 text-sm mb-1">{title}</h3>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
  </div>
);

const QuickAction = ({ title, description, icon, color, onClick }: any) => (
  <div
    onClick={onClick}
    className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition"
  >
    <div className={`${color} w-12 h-12 rounded-lg flex items-center justify-center text-2xl mb-4`}>
      {icon}
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

const ActivityItem = ({ icon, title, time, status }: any) => (
  <div className="flex items-center justify-between py-3 border-b last:border-b-0">
    <div className="flex items-center space-x-3">
      <span className="text-2xl">{icon}</span>
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-500">{time}</p>
      </div>
    </div>
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
      status === 'completed' ? 'bg-green-100 text-green-800' :
      status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
      'bg-yellow-100 text-yellow-800'
    }`}>
      {status}
    </span>
  </div>
);

const SystemStatus = ({ label, status }: any) => (
  <div className="flex items-center justify-between">
    <span className="text-gray-600">{label}:</span>
    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
      {status}
    </span>
  </div>
);

export default Dashboard;
