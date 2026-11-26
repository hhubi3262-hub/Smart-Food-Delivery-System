@echo off
echo ========================================
echo AFAMIA CAFE - Database Setup Script
echo ========================================
echo.

set /p DB_PASSWORD="Enter MySQL root password: "

echo.
echo Creating database...
mysql -u root -p%DB_PASSWORD% -e "CREATE DATABASE IF NOT EXISTS afamia_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

echo.
echo Importing schema...
mysql -u root -p%DB_PASSWORD% afamia_db < "database\schema.sql"

echo.
echo Importing sample data...
mysql -u root -p%DB_PASSWORD% afamia_db < "database\add-simple-features.sql"

echo.
echo Verifying tables...
mysql -u root -p%DB_PASSWORD% -e "USE afamia_db; SHOW TABLES;"

echo.
echo ========================================
echo Database setup complete!
echo ========================================
echo.
echo Database Name: afamia_db
echo Tables created successfully
echo.
pause
