-- ============================================
-- Afamia CRMS Database Setup for XAMPP/MySQL
-- ============================================

-- Create database
CREATE DATABASE IF NOT EXISTS afamia_crms
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

-- Use the database
USE afamia_crms;

-- Grant privileges (for development only)
GRANT ALL PRIVILEGES ON afamia_crms.* TO 'root'@'localhost';
FLUSH PRIVILEGES;

-- Show database info
SELECT 
  'Database created successfully!' as status,
  'afamia_crms' as database_name,
  'utf8mb4' as charset,
  'Ready for Sequelize sync' as next_step;
