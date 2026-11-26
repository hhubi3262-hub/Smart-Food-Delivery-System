# 🍽️ AFAMIA CAFE AND RESTAURANT - Complete Management System

<div align="center">

![KEDIR Brand](https://via.placeholder.com/200x80/D4AF37/000000?text=KEDIR)

**Modern Restaurant Management System**

[![License](https://img.shields.io/badge/license-Proprietary-red.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-18.x-brightgreen.svg)](https://nodejs.org)
[![React](https://img.shields.io/badge/react-18.x-blue.svg)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/typescript-5.x-blue.svg)](https://www.typescriptlang.org)

**Legal Name:** AFAMIA CAFE AND RESTAURANT (S.P.S - L.L.C)  
**Brand:** KEDIR  
**License No:** 133469  
**Location:** Shop No. 64-65, Rashideya 1, Ajman, UAE  
**Owner:** Kedir Ahmed Ebrahim  
**Manager:** Faiza Yimam Nurye

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [License](#license)

---

## 🌟 Overview

A **production-ready**, **enterprise-grade** restaurant management system with:

- ✅ **Public Website** - Modern, responsive, bilingual
- ✅ **Online Ordering** - Cart, checkout, payment integration
- ✅ **Table Reservations** - Real-time availability
- ✅ **Admin Panel** - Complete management dashboard
- ✅ **Staff Management** - Roles, shifts, compliance
- ✅ **Inventory System** - Stock tracking, alerts
- ✅ **VAT Invoicing** - UAE compliant tax invoices
- ✅ **Multi-Language** - English & Arabic with RTL
- ✅ **Notifications** - Email & WhatsApp
- ✅ **Analytics** - Sales, orders, customer insights

---

## ✨ Features

### 🌐 Module 1: Public Website
- Modern homepage with hero section
- Featured dishes and drinks
- About us page
- Complete menu (Restaurant & Cafe)
- Image gallery
- Contact form
- Google Maps integration
- WhatsApp quick chat
- Compliance information page

### 🍽️ Module 2: Menu Management
- Dual menu system (Restaurant & Cafe)
- Categories and subcategories
- Search and filter
- Bilingual content (EN/AR)
- Image upload (Cloudinary)
- Availability toggle
- Recommended & popular items
- Allergen information
- Pricing with VAT

### 📅 Module 3: Reservations
- Date and time picker
- Guest count selection
- Table assignment
- Special requests
- Status tracking (Pending/Confirmed/Cancelled)
- Email & WhatsApp confirmations
- Admin approval system

### 🛒 Module 4: Online Ordering
- Add to cart
- Quantity management
- Delivery/Pickup/Dine-in options
- Checkout process
- Payment integration (Stripe + Cash)
- Order tracking
- Status updates
- Customer order history

### 👨‍💼 Module 5: Admin Dashboard
- Real-time analytics
- Sales reports
- Order management
- Reservation management
- Menu CRUD operations
- Staff management
- Inventory control
- Invoice generation
- Customer reviews moderation

### 👥 Module 6: Staff Management
- Role-based access control
- Staff profiles
- Health card upload
- Food safety certificates
- Shift scheduling
- Attendance tracking
- Performance metrics

### ⚖️ Module 7: Compliance
- Trade License display (133469)
- Legal entity information
- Operating hours enforcement
- Health certification tracking
- Document management
- Inspection records
- Regulatory alerts

### 🧾 Module 8: Tax Invoice System
- VAT compliant invoices
- PDF generation
- Email delivery
- Print functionality
- Invoice history
- Tax reports

### 📦 Module 9: Inventory Management
- Ingredient tracking
- Stock levels
- Low stock alerts
- Expiry date monitoring
- Supplier management
- Stock movement logs
- Cost tracking

### ⭐ Module 10: Customer Reviews
- Rating system (1-5 stars)
- Written reviews
- Admin moderation
- Reply system
- Display on website

### 📞 Module 11: Contact System
- Contact form
- WhatsApp integration (+971 56 640 7830)
- Email (kedir6679@gmail.com)
- Google Maps location
- Business hours display

### 🔔 Module 12: Notifications
- Email notifications (Nodemailer)
- WhatsApp notifications
- Order confirmations
- Reservation confirmations
- Status updates
- Promotional messages

### 🔐 Module 13: Authentication
- JWT-based authentication
- Role-based access control
- Login/Register
- Forgot password
- Password reset
- Session management

### 🌍 Module 14: Multi-Language
- English interface
- Arabic interface
- RTL support
- Localized dates/times
- Content translation

### 📊 Module 15: Analytics
- Daily/Weekly/Monthly reports
- Sales analytics
- Order analytics
- Customer growth
- Popular items
- Revenue tracking
- Profit margins

### 🔒 Module 16: Security
- Helmet (HTTP headers)
- Rate limiting
- Input validation
- XSS protection
- CSRF protection
- Password hashing
- SQL injection prevention
- Audit logging

---

## 🛠️ Tech Stack

### Frontend
```
React 18.2          - UI Library
TypeScript 5.3      - Type Safety
Vite               - Build Tool
Tailwind CSS 3.3   - Styling
ShadCN UI          - Component Library
Framer Motion      - Animations
Zustand            - State Management
React Query        - Data Fetching
React Router v6    - Routing
Axios              - HTTP Client
React Hook Form    - Form Handling
Zod                - Schema Validation
i18next            - Internationalization
```

### Backend
```
Node.js 18+        - Runtime
Express.js 4.18    - Web Framework
TypeScript 5.3     - Type Safety
Sequelize 6.35     - ORM
MySQL 8.0          - Database
JWT                - Authentication
Bcrypt             - Password Hashing
Multer             - File Upload
Cloudinary         - Image Storage
Nodemailer         - Email Service
PDFKit             - PDF Generation
Stripe             - Payment Processing
Winston            - Logging
```

### External Services
```
Cloudinary         - Image/Video Storage
Stripe             - Payment Gateway
Google Maps        - Location Services
WhatsApp API       - Messaging
SMTP Server        - Email Delivery
```

### DevOps
```
Vercel             - Frontend Hosting
Railway/Render     - Backend Hosting
Neon/Railway       - Database Hosting
GitHub Actions     - CI/CD
```

---

## 📁 Project Structure

```
afamia-restaurant-system/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── layouts/       # Layout components
│   │   ├── hooks/         # Custom hooks
│   │   ├── services/      # API services
│   │   ├── store/         # Zustand stores
│   │   ├── utils/         # Utilities
│   │   ├── types/         # TypeScript types
│   │   └── styles/        # Global styles
│   └── public/            # Static assets
│
├── server/                 # Node.js Backend
│   ├── src/
│   │   ├── models/        # Database models
│   │   ├── controllers/   # Route controllers
│   │   ├── services/      # Business logic
│   │   ├── middleware/    # Express middleware
│   │   ├── routes/        # API routes
│   │   ├── utils/         # Utilities
│   │   ├── validators/    # Input validation
│   │   ├── config/        # Configuration
│   │   └── types/         # TypeScript types
│   └── uploads/           # Temporary uploads
│
├── database/              # Database files
│   ├── migrations/        # DB migrations
│   └── schema.sql         # SQL schema
│
├── docs/                  # Documentation
│   ├── API_DOCS.md
│   ├── DEPLOYMENT.md
│   └── USER_MANUAL.md
│
└── scripts/               # Utility scripts
```

---

## 🚀 Installation

### Prerequisites
- Node.js 18+ 
- MySQL 8.0+ or PostgreSQL 14+
- npm or yarn
- Git

### Step 1: Clone Repository
```bash
git clone https://github.com/your-org/afamia-restaurant.git
cd afamia-restaurant
```

### Step 2: Install Dependencies

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd client
npm install
```

### Step 3: Environment Setup

Copy `.env.example` to `.env` and configure:

```bash
# Root directory
cp .env.example .env

# Edit with your credentials
nano .env  # or use your preferred editor
```

### Step 4: Database Setup

**Create Database:**
```sql
CREATE DATABASE afamia_restaurant CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

**Run Migrations:**
```bash
cd server
npm run migrate
```

**Seed Database:**
```bash
npm run seed
```

### Step 5: Start Development Servers

**Terminal 1 (Backend):**
```bash
cd server
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd client
npm run dev
```

### Step 6: Access Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000
- **Admin Panel:** http://localhost:5173/admin

---

## ⚙️ Configuration

### Environment Variables

See `.env.example` for all available configuration options.

**Critical Settings:**
```env
# Database
DB_HOST=localhost
DB_NAME=afamia_restaurant
DB_USER=root
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your_super_secret_key

# Business
BUSINESS_LICENSE=133469
BUSINESS_PHONE=+971566407830
BUSINESS_EMAIL=kedir6679@gmail.com

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLIC_KEY=pk_test_...

# Email
SMTP_HOST=smtp.gmail.com
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
```

---

## 📖 Usage

### Admin Access

**Default Admin Credentials:**
```
Email: kedir6679@gmail.com
Password: owner123

(Change immediately after first login)
```

### Creating Menu Items

1. Login to admin panel
2. Navigate to Menu Management
3. Click "Add Item"
4. Fill in details (English & Arabic)
5. Upload image
6. Set price and VAT type
7. Save

### Managing Orders

1. Orders appear in real-time
2. Update status as order progresses
3. Send notifications automatically
4. Generate invoice on completion

### Staff Management

1. Add staff members
2. Assign roles and permissions
3. Upload health certificates
4. Track attendance and shifts

---

## 📡 API Documentation

### Base URL
```
Development: http://localhost:5000/api/v1
Production: https://api.afamia.ae/api/v1
```

### Authentication
```http
POST /auth/register
POST /auth/login
POST /auth/forgot-password
POST /auth/reset-password
GET  /auth/me
```

### Menu
```http
GET    /menu
GET    /menu/categories
GET    /menu/:id
POST   /menu          (Admin only)
PUT    /menu/:id      (Admin only)
DELETE /menu/:id      (Admin only)
```

### Orders
```http
GET    /orders
GET    /orders/:id
POST   /orders
PATCH  /orders/:id/status
DELETE /orders/:id
```

### Reservations
```http
GET    /reservations
POST   /reservations
PATCH  /reservations/:id
DELETE /reservations/:id
```

**Full API documentation:** [API_DOCS.md](docs/API_DOCS.md)

---

## 🚢 Deployment

### Frontend (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd client
vercel --prod
```

### Backend (Railway)

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

### Database (Neon PostgreSQL)

1. Create account at [neon.tech](https://neon.tech)
2. Create new project
3. Copy connection string
4. Update `.env` with connection string

**Detailed deployment guide:** [DEPLOYMENT.md](docs/DEPLOYMENT.md)

---

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e

# Coverage report
npm run test:coverage
```

---

## 🔧 Maintenance

### Database Backup
```bash
# Automated daily backups
npm run backup:db

# Manual backup
mysqldump -u root -p afamia_restaurant > backup.sql
```

### Logs
```bash
# View application logs
tail -f logs/app.log

# View error logs
tail -f logs/error.log
```

---

## 📝 License

**Proprietary License**

Copyright © 2024 AFAMIA CAFE AND RESTAURANT (S.P.S - L.L.C)

All rights reserved. This software and associated documentation files are the proprietary property of AFAMIA CAFE AND RESTAURANT.

---

## 👥 Team

**Owner:** Kedir Ahmed Ebrahim  
**Manager:** Faiza Yimam Nurye  
**Contact:** kedir6679@gmail.com  
**Phone:** +971 56 640 7830

---

## 📞 Support

For technical support or inquiries:

- **Email:** kedir6679@gmail.com
- **Phone:** +971 56 640 7830
- **WhatsApp:** +971 56 640 7830
- **Location:** Shop 64-65, Rashideya 1, Ajman, UAE

---

## 🙏 Acknowledgments

Built with modern technologies and best practices for:
- **AFAMIA CAFE AND RESTAURANT (S.P.S - L.L.C)**
- **Brand: KEDIR**
- **License No: 133469**
- **Ajman, United Arab Emirates**

---

<div align="center">

**Made with ❤️ for the Food & Beverage Industry**

[![Follow](https://img.shields.io/badge/Follow-@KEDIR-D4AF37?style=social)]()

</div>
