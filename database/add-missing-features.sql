-- ============================================================================
-- AFAMIA CAFE - Additional Features from Design Diagrams
-- Adding: Notifications, Hall Booking, Inventory Tracking
-- ============================================================================

USE afamia_restaurant;

-- ============================================================================
-- Table: Notifications (For real-time alerts to all roles)
-- ============================================================================
CREATE TABLE IF NOT EXISTS notifications (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED NOT NULL,
  type ENUM('order', 'payment', 'reservation', 'inventory', 'system', 'kitchen') NOT NULL,
  title VARCHAR(200) NOT NULL,
  title_ar VARCHAR(200) DEFAULT NULL,
  title_am VARCHAR(200) DEFAULT NULL,
  message TEXT NOT NULL,
  message_ar TEXT DEFAULT NULL,
  message_am TEXT DEFAULT NULL,
  data JSON DEFAULT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP NULL DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_unread (user_id, is_read),
  INDEX idx_type (type),
  INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- Table: Halls (For event booking - wedding, parties, conferences)
-- ============================================================================
CREATE TABLE IF NOT EXISTS halls (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  name_ar VARCHAR(100) NOT NULL,
  name_am VARCHAR(100) DEFAULT NULL,
  capacity INT NOT NULL,
  size_sqm DECIMAL(10,2) DEFAULT NULL,
  description TEXT DEFAULT NULL,
  description_ar TEXT DEFAULT NULL,
  description_am TEXT DEFAULT NULL,
  features JSON DEFAULT NULL, -- ['projector', 'sound_system', 'stage', etc]
  hourly_rate DECIMAL(10,2) NOT NULL,
  daily_rate DECIMAL(10,2) DEFAULT NULL,
  image_urls JSON DEFAULT NULL,
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_available (is_available),
  INDEX idx_capacity (capacity)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- Table: Hall Bookings
-- ============================================================================
CREATE TABLE IF NOT EXISTS hall_bookings (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  booking_number VARCHAR(50) UNIQUE NOT NULL,
  hall_id INT UNSIGNED NOT NULL,
  customer_id INT UNSIGNED NOT NULL,
  booking_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  guest_count INT NOT NULL,
  event_type VARCHAR(100) DEFAULT NULL, -- Wedding, Birthday, Corporate, etc
  special_requests TEXT DEFAULT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  deposit_amount DECIMAL(10,2) DEFAULT 0.00,
  deposit_paid BOOLEAN DEFAULT FALSE,
  payment_status ENUM('pending', 'deposit_paid', 'fully_paid', 'refunded') DEFAULT 'pending',
  status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
  confirmed_by INT UNSIGNED DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (hall_id) REFERENCES halls(id) ON DELETE RESTRICT,
  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
  FOREIGN KEY (confirmed_by) REFERENCES users(id) ON DELETE SET NULL,
  UNIQUE INDEX idx_booking_number (booking_number),
  INDEX idx_hall_date (hall_id, booking_date),
  INDEX idx_customer (customer_id),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- Table: Inventory (For tracking stock and daily depletion)
-- ============================================================================
CREATE TABLE IF NOT EXISTS inventory (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  itemName VARCHAR(200) NOT NULL,
  itemNameAr VARCHAR(200) DEFAULT NULL,
  itemNameAm VARCHAR(200) DEFAULT NULL,
  category VARCHAR(100) NOT NULL, -- 'ingredient', 'beverage', 'packaging', 'supply'
  unit VARCHAR(50) NOT NULL, -- 'kg', 'litre', 'pieces', etc
  currentStock DECIMAL(10,2) NOT NULL DEFAULT 0,
  minimumStock DECIMAL(10,2) NOT NULL,
  reorderPoint DECIMAL(10,2) NOT NULL,
  unitCost DECIMAL(10,2) NOT NULL,
  supplier VARCHAR(200) DEFAULT NULL,
  lastRestockDate DATE DEFAULT NULL,
  lastRestockQuantity DECIMAL(10,2) DEFAULT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_category (category),
  INDEX idx_low_stock (currentStock, minimumStock)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- Table: Inventory Transactions (Daily depletion tracking)
-- ============================================================================
CREATE TABLE IF NOT EXISTS inventory_transactions (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  inventory_id INT UNSIGNED NOT NULL,
  transaction_type ENUM('restock', 'usage', 'adjustment', 'waste') NOT NULL,
  quantity DECIMAL(10,2) NOT NULL,
  unit_cost DECIMAL(10,2) DEFAULT NULL,
  total_cost DECIMAL(10,2) DEFAULT NULL,
  reference_type VARCHAR(50) DEFAULT NULL, -- 'order', 'manual', 'automatic'
  reference_id INT UNSIGNED DEFAULT NULL,
  notes TEXT DEFAULT NULL,
  performed_by INT UNSIGNED DEFAULT NULL,
  transaction_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (inventory_id) REFERENCES inventory(id) ON DELETE CASCADE,
  FOREIGN KEY (performed_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_inventory (inventory_id),
  INDEX idx_date (transaction_date),
  INDEX idx_type (transaction_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- Table: Daily Sales Report (Goods sold tracking)
-- ============================================================================
CREATE TABLE IF NOT EXISTS daily_sales_reports (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  report_date DATE UNIQUE NOT NULL,
  total_orders INT DEFAULT 0,
  total_revenue DECIMAL(10,2) DEFAULT 0.00,
  cash_sales DECIMAL(10,2) DEFAULT 0.00,
  card_sales DECIMAL(10,2) DEFAULT 0.00,
  online_sales DECIMAL(10,2) DEFAULT 0.00,
  dine_in_orders INT DEFAULT 0,
  takeaway_orders INT DEFAULT 0,
  delivery_orders INT DEFAULT 0,
  total_customers INT DEFAULT 0,
  new_customers INT DEFAULT 0,
  average_order_value DECIMAL(10,2) DEFAULT 0.00,
  total_discounts DECIMAL(10,2) DEFAULT 0.00,
  total_vat DECIMAL(10,2) DEFAULT 0.00,
  generated_by INT UNSIGNED DEFAULT NULL,
  generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (generated_by) REFERENCES users(id) ON DELETE SET NULL,
  UNIQUE INDEX idx_report_date (report_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- Seed Sample Data
-- ============================================================================

-- Insert sample halls
INSERT INTO halls (name, name_ar, name_am, capacity, size_sqm, hourly_rate, daily_rate, features, is_available) VALUES
('Grand Ballroom', 'القاعة الكبرى', 'ታላቅ አዳራሽ', 200, 300.00, 500.00, 3500.00, '["stage", "sound_system", "projector", "air_conditioning", "kitchen_access"]', TRUE),
('Conference Hall', 'قاعة المؤتمرات', 'የስብሰባ አዳራሽ', 50, 100.00, 200.00, 1200.00, '["projector", "whiteboard", "air_conditioning", "wifi"]', TRUE),
('Private Dining Room', 'غرفة الطعام الخاصة', 'የግል መመገቢያ ክፍል', 30, 60.00, 150.00, 800.00, '["air_conditioning", "sound_system", "private_entrance"]', TRUE);

-- Insert sample inventory items
INSERT INTO inventory (itemName, itemNameAr, itemNameAm, category, unit, currentStock, minimumStock, reorderPoint, unitCost, supplier) VALUES
('Coffee Beans - Arabica', 'حبوب القهوة - أرابيكا', 'የቡና ፍሬ - አረቢካ', 'ingredient', 'kg', 50.00, 10.00, 15.00, 35.00, 'Ethiopian Coffee Traders'),
('Fresh Milk', 'حليب طازج', 'ትኩስ ወተት', 'ingredient', 'litre', 100.00, 20.00, 30.00, 5.00, 'Al Ain Dairy'),
('Flour', 'دقيق', 'ዱቄት', 'ingredient', 'kg', 150.00, 30.00, 50.00, 3.50, 'Dubai Flour Mills'),
('Tomatoes', 'طماطم', 'ቲማቲም', 'ingredient', 'kg', 40.00, 10.00, 15.00, 4.00, 'Local Market'),
('Chicken Breast', 'صدر دجاج', 'የዶሮ ደረት', 'ingredient', 'kg', 60.00, 15.00, 20.00, 18.00, 'Al Watania Poultry'),
('Olive Oil', 'زيت زيتون', 'የዘይት', 'ingredient', 'litre', 30.00, 5.00, 10.00, 25.00, 'Mediterranean Imports'),
('Sugar', 'سكر', 'ስኳር', 'ingredient', 'kg', 200.00, 40.00, 60.00, 2.50, 'Emirates Sugar'),
('Paper Cups', 'أكواب ورقية', 'የወረቀት ኩባያ', 'packaging', 'pieces', 5000, 1000, 1500, 0.10, 'Packaging Supplies LLC'),
('Takeaway Boxes', 'صناديق الوجبات', 'የማንሸራተት ሳጥን', 'packaging', 'pieces', 2000, 500, 800, 0.50, 'Packaging Supplies LLC'),
('Cleaning Supplies', 'مواد التنظيف', 'የማጽዳት እቃዎች', 'supply', 'set', 50, 10, 15, 45.00, 'Hygiene Pro');

COMMIT;

-- ============================================================================
-- Success Message
-- ============================================================================
SELECT 'Additional features tables created successfully!' AS Status;
