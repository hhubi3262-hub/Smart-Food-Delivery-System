import Tenant from './Tenant';
import User from './User';
import MenuItem from './MenuItem';
import Order from './Order';

// Define associations
Tenant.hasMany(User, { foreignKey: 'tenantId', as: 'users' });
User.belongsTo(Tenant, { foreignKey: 'tenantId', as: 'tenant' });

Tenant.hasMany(MenuItem, { foreignKey: 'tenantId', as: 'menuItems' });
MenuItem.belongsTo(Tenant, { foreignKey: 'tenantId', as: 'tenant' });

Tenant.hasMany(Order, { foreignKey: 'tenantId', as: 'orders' });
Order.belongsTo(Tenant, { foreignKey: 'tenantId', as: 'tenant' });

User.hasMany(Order, { foreignKey: 'createdBy', as: 'ordersCreated' });
Order.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });

export { Tenant, User, MenuItem, Order };

export default {
  Tenant,
  User,
  MenuItem,
  Order,
};
