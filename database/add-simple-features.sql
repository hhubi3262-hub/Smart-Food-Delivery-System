-- ============================================================================
-- AFAMIA CAFE - Simple Additional Features
-- Adding: Notifications, Hall Booking
-- ============================================================================

USE afamia_restaurant;

-- ============================================================================
-- Table: Notifications
-- ============================================================================
CREATE TABLE IF NOT EXISTS notifications (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  userId INT UNSIGNED NOT NULL,
  type ENUM('order', 'payment', 'reservation', 'inventory', 'system', 'kitchen') NOT NULL,
  title VARCHAR(200) NOT NULL,
  titleAr VARCHAR(200) DEFAULT NULL,
  titleAm VARCHAR(200) DEFAULT NULL,
  message TEXT NOT NULL,
  messageAr TEXT DEFAULT NULL,
  messageAm TEXT DEFAULT NULL,
  data JSON DEFAULT NULL,
  isRead BOOLEAN DEFAULT FALSE,
  readAt TIMESTAMP NULL DEFAULT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_unread (userId, isRead),
  INDEX idx_type (type),
  INDEX idx_created (createdAt)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- Table: Halls
-- ============================================================================
CREATE TABLE IF NOT EXISTS halls (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  nameAr VARCHAR(100) NOT NULL,
  nameAm VARCHAR(100) DEFAULT NULL,
  capacity INT NOT NULL,
  sizeSqm DECIMAL(10,2) DEFAULT NULL,
  description TEXT DEFAULT NULL,
  descriptionAr TEXT DEFAULT NULL,
  descriptionAm TEXT DEFAULT NULL,
  features JSON DEFAULT NULL,
  hourlyRate DECIMAL(10,2) NOT NULL,
  dailyRate DECIMAL(10,2) DEFAULT NULL,
  imageUrls JSON DEFAULT NULL,
  isAvailable BOOLEAN DEFAULT TRUE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_available (isAvailable),
  INDEX idx_capacity (capacity)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- Table: Hall Bookings
-- ============================================================================
CREATE TABLE IF NOT EXISTS hall_bookings (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  bookingNumber VARCHAR(50) UNIQUE NOT NULL,
  hallId INT UNSIGNED NOT NULL,
  customerId INT UNSIGNED NOT NULL,
  bookingDate DATE NOT NULL,
  startTime TIME NOT NULL,
  endTime TIME NOT NULL,
  guestCount INT NOT NULL,
  eventType VARCHAR(100) DEFAULT NULL,
  specialRequests TEXT DEFAULT NULL,
  totalAmount DECIMAL(10,2) NOT NULL,
  depositAmount DECIMAL(10,2) DEFAULT 0.00,
  depositPaid BOOLEAN DEFAULT FALSE,
  paymentStatus ENUM('pending', 'deposit_paid', 'fully_paid', 'refunded') DEFAULT 'pending',
  status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
  confirmedBy INT UNSIGNED DEFAULT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (hallId) REFERENCES halls(id) ON DELETE RESTRICT,
  FOREIGN KEY (customerId) REFERENCES customers(id) ON DELETE CASCADE,
  FOREIGN KEY (confirmedBy) REFERENCES users(id) ON DELETE SET NULL,
  UNIQUE INDEX idx_booking_number (bookingNumber),
  INDEX idx_hall_date (hallId, bookingDate),
  INDEX idx_customer (customerId),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- Seed Sample Data
-- ============================================================================

-- Insert sample halls
INSERT INTO halls (name, nameAr, nameAm, capacity, sizeSqm, hourlyRate, dailyRate, features, isAvailable) VALUES
('Grand Ballroom', 'القاعة الكبرى', 'ታላቅ አዳራሽ', 200, 300.00, 500.00, 3500.00, JSON_ARRAY('stage', 'sound_system', 'projector', 'air_conditioning', 'kitchen_access'), TRUE),
('Conference Hall', 'قاعة المؤتمرات', 'የስብሰባ አዳራሽ', 50, 100.00, 200.00, 1200.00, JSON_ARRAY('projector', 'whiteboard', 'air_conditioning', 'wifi'), TRUE),
('Private Dining Room', 'غرفة الطعام الخاصة', 'የግል መመገቢያ ክፍል', 30, 60.00, 150.00, 800.00, JSON_ARRAY('air_conditioning', 'sound_system', 'private_entrance'), TRUE);

COMMIT;

SELECT 'Simple features tables created successfully!' AS Status;
