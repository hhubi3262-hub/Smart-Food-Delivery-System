-- ============================================================================
-- AFAMIA CAFE AND RESTAURANT - Complete Database Schema
-- Brand: KEDIR | License: 133469 | Ajman, UAE
-- Database: MySQL 8.0+
-- Character Set: utf8mb4_unicode_ci
-- ============================================================================

-- Create Database
CREATE DATABASE IF NOT EXISTS afamia_restaurant 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE afamia_restaurant;

-- ============================================================================
-- Table 1: Roles
-- ============================================================================
CREATE TABLE roles (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  display_name VARCHAR(100) NOT NULL,
  permissions JSON DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default roles
INSERT INTO roles (id, name, display_name, permissions) VALUES
(1, 'superadmin', 'Super Administrator', '["all"]'),
(2, 'owner', 'Business Owner', '["all"]'),
(3, 'manager', 'Manager', '["menu", "orders", "reservations", "staff", "inventory", "reports"]'),
(4, 'cashier', 'Cashier', '["orders", "payments"]'),
(5, 'chef', 'Chef', '["kitchen", "menu"]'),
(6, 'waiter', 'Waiter', '["orders", "tables", "reservations"]'),
(7, 'customer', 'Customer', '["orders", "reservations", "reviews"]');

-- ============================================================================
-- Table 2: Users
-- ============================================================================
CREATE TABLE users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role_id INT UNSIGNED NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) DEFAULT NULL,
  avatar VARCHAR(500) DEFAULT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMP NULL DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE RESTRICT,
  INDEX idx_email (email),
  INDEX idx_role (role_id),
  INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- Table 3: Customers
-- ============================================================================
CREATE TABLE customers (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED UNIQUE NOT NULL,
  address TEXT DEFAULT NULL,
  city VARCHAR(100) DEFAULT NULL,
  postal_code VARCHAR(20) DEFAULT NULL,
  loyalty_points INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- Table 4: Staff
-- ============================================================================
CREATE TABLE staff (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED UNIQUE NOT NULL,
  employee_id VARCHAR(50) UNIQUE NOT NULL,
  position VARCHAR(100) NOT NULL,
  hire_date DATE NOT NULL,
  health_card_expiry DATE DEFAULT NULL,
  food_safety_cert_expiry DATE DEFAULT NULL,
  pic_cert_expiry DATE DEFAULT NULL,
  emergency_contact VARCHAR(20) DEFAULT NULL,
  emergency_name VARCHAR(100) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_employee_id (employee_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- Table 5: Menu Categories
-- ============================================================================
CREATE TABLE menu_categories (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  name_ar VARCHAR(100) NOT NULL,
  type ENUM('restaurant', 'cafe') NOT NULL,
  description TEXT DEFAULT NULL,
  description_ar TEXT DEFAULT NULL,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_type (type),
  INDEX idx_active (is_active),
  INDEX idx_display_order (display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- Table 6: Menu Items
-- ============================================================================
CREATE TABLE menu_items (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  category_id INT UNSIGNED NOT NULL,
  name VARCHAR(200) NOT NULL,
  name_ar VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  image_url VARCHAR(500) DEFAULT NULL,
  is_available BOOLEAN DEFAULT TRUE,
  is_recommended BOOLEAN DEFAULT FALSE,
  is_popular BOOLEAN DEFAULT FALSE,
  preparation_time INT DEFAULT 15,
  allergens TEXT DEFAULT NULL,
  calories INT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES menu_categories(id) ON DELETE CASCADE,
  INDEX idx_category (category_id),
  INDEX idx_available (is_available),
  INDEX idx_recommended (is_recommended),
  INDEX idx_popular (is_popular)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- Table 7: Tables
-- ============================================================================
CREATE TABLE tables (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  table_number VARCHAR(10) UNIQUE NOT NULL,
  capacity INT NOT NULL,
  section VARCHAR(50) DEFAULT NULL,
  status ENUM('available', 'occupied', 'reserved') DEFAULT 'available',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- Table 8: Reservations
-- ============================================================================
CREATE TABLE reservations (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  customer_id INT UNSIGNED NOT NULL,
  table_id INT UNSIGNED DEFAULT NULL,
  reservation_date DATE NOT NULL,
  reservation_time TIME NOT NULL,
  guest_count INT NOT NULL,
  special_requests TEXT DEFAULT NULL,
  status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
  confirmed_by INT UNSIGNED DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
  FOREIGN KEY (table_id) REFERENCES tables(id) ON DELETE SET NULL,
  FOREIGN KEY (confirmed_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_customer (customer_id),
  INDEX idx_date (reservation_date),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- Table 9: Orders
-- ============================================================================
CREATE TABLE orders (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  customer_id INT UNSIGNED NOT NULL,
  order_type ENUM('dine-in', 'takeaway', 'delivery') NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  vat_amount DECIMAL(10,2) NOT NULL,
  delivery_fee DECIMAL(10,2) DEFAULT 0.00,
  total_amount DECIMAL(10,2) NOT NULL,
  status ENUM('pending', 'confirmed', 'preparing', 'ready', 'delivered', 'completed', 'cancelled') DEFAULT 'pending',
  payment_method ENUM('cash', 'card', 'stripe') NOT NULL,
  payment_status ENUM('pending', 'paid', 'refunded') DEFAULT 'pending',
  delivery_address TEXT DEFAULT NULL,
  notes TEXT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE RESTRICT,
  UNIQUE INDEX idx_order_number (order_number),
  INDEX idx_customer (customer_id),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- Table 10: Order Items
-- ============================================================================
CREATE TABLE order_items (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  order_id INT UNSIGNED NOT NULL,
  menu_item_id INT UNSIGNED NOT NULL,
  quantity INT NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  special_instructions TEXT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (menu_item_id) REFERENCES menu_items(id) ON DELETE RESTRICT,
  INDEX idx_order (order_id),
  INDEX idx_menu_item (menu_item_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- Table 11: Invoices
-- ============================================================================
CREATE TABLE invoices (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  invoice_number VARCHAR(50) UNIQUE NOT NULL,
  order_id INT UNSIGNED NOT NULL,
  customer_name VARCHAR(200) NOT NULL,
  customer_email VARCHAR(255) DEFAULT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  vat_amount DECIMAL(10,2) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  pdf_url VARCHAR(500) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE RESTRICT,
  UNIQUE INDEX idx_invoice_number (invoice_number),
  INDEX idx_order (order_id),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- Table 12: Reviews
-- ============================================================================
CREATE TABLE reviews (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  customer_id INT UNSIGNED NOT NULL,
  order_id INT UNSIGNED DEFAULT NULL,
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT DEFAULT NULL,
  is_approved BOOLEAN DEFAULT FALSE,
  admin_reply TEXT DEFAULT NULL,
  replied_by INT UNSIGNED DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE SET NULL,
  FOREIGN KEY (replied_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_customer (customer_id),
  INDEX idx_approved (is_approved),
  INDEX idx_rating (rating)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- Table 13: Inventory
-- ============================================================================
CREATE TABLE inventory (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  name_ar VARCHAR(200) NOT NULL,
  category VARCHAR(100) NOT NULL,
  unit VARCHAR(50) NOT NULL,
  quantity DECIMAL(10,2) NOT NULL,
  min_quantity DECIMAL(10,2) DEFAULT 0,
  unit_cost DECIMAL(10,2) DEFAULT 0,
  expiry_date DATE DEFAULT NULL,
  supplier_id INT UNSIGNED DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_category (category),
  INDEX idx_expiry (expiry_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- Table 14: Suppliers
-- ============================================================================
CREATE TABLE suppliers (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  name_ar VARCHAR(200) NOT NULL,
  contact_person VARCHAR(100) DEFAULT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255) DEFAULT NULL,
  address TEXT DEFAULT NULL,
  license_number VARCHAR(100) DEFAULT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- Table 15: Stock Movements
-- ============================================================================
CREATE TABLE stock_movements (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  inventory_id INT UNSIGNED NOT NULL,
  movement_type ENUM('in', 'out') NOT NULL,
  quantity DECIMAL(10,2) NOT NULL,
  reference_type VARCHAR(50) DEFAULT NULL,
  reference_id INT UNSIGNED DEFAULT NULL,
  notes TEXT DEFAULT NULL,
  created_by INT UNSIGNED NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (inventory_id) REFERENCES inventory(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE RESTRICT,
  INDEX idx_inventory (inventory_id),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- Table 16: Documents
-- ============================================================================
CREATE TABLE documents (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  document_type VARCHAR(100) NOT NULL,
  file_url VARCHAR(500) NOT NULL,
  entity_type VARCHAR(50) NOT NULL,
  entity_id INT UNSIGNED NOT NULL,
  expiry_date DATE DEFAULT NULL,
  uploaded_by INT UNSIGNED NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE RESTRICT,
  INDEX idx_entity (entity_type, entity_id),
  INDEX idx_expiry (expiry_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- Table 17: Notifications
-- ============================================================================
CREATE TABLE notifications (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED NOT NULL,
  title VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  type ENUM('info', 'success', 'warning', 'error') DEFAULT 'info',
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user (user_id),
  INDEX idx_read (is_read)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- Table 18: Settings
-- ============================================================================
CREATE TABLE settings (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  setting_key VARCHAR(100) UNIQUE NOT NULL,
  setting_value TEXT NOT NULL,
  setting_type VARCHAR(50) DEFAULT 'string',
  description TEXT DEFAULT NULL,
  updated_by INT UNSIGNED DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL,
  UNIQUE INDEX idx_key (setting_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert business settings
INSERT INTO settings (setting_key, setting_value, setting_type, description) VALUES
('business_name', 'AFAMIA CAFE AND RESTAURANT (S.P.S - L.L.C)', 'string', 'Legal business name'),
('brand_name', 'KEDIR', 'string', 'Brand name'),
('license_number', '133469', 'string', 'Trade license number'),
('business_phone', '+971566407830', 'string', 'Business phone number'),
('business_email', 'kedir6679@gmail.com', 'string', 'Business email'),
('business_address', 'Shop No. 64-65, Rashideya 1, Ajman, UAE', 'string', 'Business address'),
('vat_rate', '5', 'number', 'VAT percentage'),
('operating_hours_end', '00:00', 'string', 'Daily closing time'),
('owner_name', 'Kedir Ahmed Ebrahim', 'string', 'Business owner name'),
('manager_name', 'Faiza Yimam Nurye', 'string', 'Manager name');

-- ============================================================================
-- Table 19: Gallery
-- ============================================================================
CREATE TABLE gallery (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  title_ar VARCHAR(200) DEFAULT NULL,
  image_url VARCHAR(500) NOT NULL,
  category VARCHAR(100) DEFAULT NULL,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  uploaded_by INT UNSIGNED NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE RESTRICT,
  INDEX idx_active (is_active),
  INDEX idx_category (category),
  INDEX idx_display_order (display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- Table 20: Business Licenses
-- ============================================================================
CREATE TABLE business_licenses (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  license_type VARCHAR(100) NOT NULL,
  license_number VARCHAR(100) NOT NULL,
  issue_date DATE NOT NULL,
  expiry_date DATE NOT NULL,
  issuing_authority VARCHAR(200) NOT NULL,
  document_url VARCHAR(500) DEFAULT NULL,
  status ENUM('active', 'expired', 'renewed') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_expiry (expiry_date),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert main business license
INSERT INTO business_licenses (license_type, license_number, issue_date, expiry_date, issuing_authority, status) VALUES
('Trade License', '133469', '2024-01-01', '2024-12-31', 'Department of Economic Development - Ajman', 'active');

-- ============================================================================
-- End of Schema
-- ============================================================================
