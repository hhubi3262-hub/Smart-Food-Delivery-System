export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin' | 'staff';
  phone?: string;
}

export interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  available: boolean;
  preparationTime?: number;
}

export interface OrderItem {
  menuItem: MenuItem | string;
  quantity: number;
  price: number;
}

export interface Order {
  _id: string;
  user: User | string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  deliveryAddress?: string;
  deliveryCoordinates?: {
    lat: number;
    lng: number;
  };
  deliveryFee?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Reservation {
  _id: string;
  user: User | string;
  date: string;
  time: string;
  numberOfGuests: number;
  specialRequests?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}
