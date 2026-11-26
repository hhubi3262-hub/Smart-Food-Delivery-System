# 🚀 AFAMIA CAFE - Deployment Checklist

## Pre-Deployment Checklist

### 1. System Requirements
- [ ] Node.js 18+ installed
- [ ] MySQL 8+ installed (or XAMPP)
- [ ] Git installed
- [ ] npm or yarn installed
- [ ] 4GB+ RAM available
- [ ] 10GB+ disk space

### 2. Environment Setup
- [ ] MySQL server running
- [ ] Port 3000 available (Frontend)
- [ ] Port 5000 available (Backend)
- [ ] Port 3306 available (MySQL)

### 3. Configuration Files
- [ ] `.env` file created in `afamia-full-system/server/`
- [ ] Database credentials configured
- [ ] JWT secret generated
- [ ] Restaurant details updated

---

## Local Deployment Steps

### Step 1: Database Setup ✅
```bash
# Run the setup script
./setup-database.bat

# Or manually:
mysql -u root -p
CREATE DATABASE afamia_db;
USE afamia_db;
SOURCE afamia-full-system/database/schema.sql;
SOURCE afamia-full-system/database/add-simple-features.sql;
```

**Verify:**
- [ ] Database `afamia_db` created
- [ ] All tables imported (users, menu_items, orders, etc.)
- [ ] Sample data loaded (40 menu items)

---

### Step 2: Backend Setup ✅
```bash
cd afamia-full-system/server
npm install
npm run build
npm run dev
```

**Verify:**
- [ ] Server starts without errors
- [ ] API accessible at http://localhost:5000
- [ ] Database connection successful
- [ ] Check: `curl http://localhost:5000/api/v1/menu`

**Expected Response:**
```json
{
  "success": true,
  "data": [...menu items...],
  "total": 40
}
```

---

### Step 3: Frontend Setup ✅
```bash
cd client
npm install
npm run dev
```

**Verify:**
- [ ] Vite dev server starts
- [ ] App opens at http://localhost:3000
- [ ] No console errors
- [ ] Logo displays correctly

---

### Step 4: Integration Testing ✅

#### Test Menu Loading
- [ ] Navigate to `/menu`
- [ ] 40 menu items display
- [ ] Images load correctly
- [ ] Filtering works
- [ ] Search functionality works

#### Test Order System
- [ ] Add items to cart
- [ ] Fill customer details
- [ ] Select payment method
- [ ] Click "Send Order"
- [ ] WhatsApp opens with formatted order

#### Test Cashier POS
- [ ] Navigate to `/cashier`
- [ ] Add items to cart
- [ ] Process payment
- [ ] Receipt generates with QR code
- [ ] WhatsApp receipt option works

#### Test Theme System
- [ ] Click theme icon
- [ ] Switch to Night Mode
- [ ] Verify dark background
- [ ] Test all 6 themes
- [ ] Theme persists on reload

#### Test Multi-language
- [ ] Switch to Arabic
- [ ] Switch to Amharic
- [ ] Switch back to English
- [ ] Verify translations

---

## Cloud Deployment Steps

### Option A: Quick Deploy (Vercel + Railway + PlanetScale)

#### 1. Database (PlanetScale)
- [ ] Create account at planetscale.com
- [ ] Create database `afamia-production`
- [ ] Import schema
- [ ] Get connection string
- [ ] Save credentials securely

#### 2. Backend (Railway)
- [ ] Create account at railway.app
- [ ] Connect GitHub repository
- [ ] Set root directory: `afamia-full-system/server`
- [ ] Add environment variables
- [ ] Deploy backend
- [ ] Get API URL
- [ ] Test API endpoint

#### 3. Frontend (Vercel)
- [ ] Create account at vercel.com
- [ ] Connect GitHub repository
- [ ] Set root directory: `client`
- [ ] Add environment variable: `VITE_API_URL`
- [ ] Deploy frontend
- [ ] Get frontend URL
- [ ] Test complete flow

---

### Option B: VPS Deploy (Full Control)

#### 1. Server Setup
- [ ] Purchase VPS (DigitalOcean/Linode)
- [ ] SSH access configured
- [ ] Domain name pointed to server
- [ ] Firewall configured

#### 2. Install Software
- [ ] Node.js 18+
- [ ] MySQL 8+
- [ ] Nginx
- [ ] PM2
- [ ] Git
- [ ] Certbot (SSL)

#### 3. Deploy Application
- [ ] Clone repository
- [ ] Setup database
- [ ] Configure backend
- [ ] Build frontend
- [ ] Configure Nginx
- [ ] Setup SSL certificate
- [ ] Start with PM2

#### 4. Post-Deployment
- [ ] Setup monitoring
- [ ] Configure backups
- [ ] Test all features
- [ ] Load testing
- [ ] Security audit

---

## Post-Deployment Configuration

### 1. Update Restaurant Information
**Files to edit:**
- [ ] `client/src/pages/Order.tsx` - Restaurant details
- [ ] `client/src/pages/Cashier.tsx` - Receipt info
- [ ] `client/public/logo.jpg` - Your logo

**Update these values:**
```typescript
restaurantName: 'AFAMIA CAFE & RESTAURANT'
restaurantAddress: 'Shop 64-65, Rashideya 1, Ajman, UAE'
restaurantPhone: '+971566407830'
restaurantLocation: '25.4052,55.5136'
restaurantLicense: '133469'
```

### 2. Configure WhatsApp Business
- [ ] Verify phone number +971566407830
- [ ] Setup WhatsApp Business Profile
- [ ] Add business hours
- [ ] Add menu link
- [ ] Test message delivery

### 3. Add Real Menu Items
**Via Admin Dashboard:**
- [ ] Login to `/dashboard`
- [ ] Navigate to Menu Management
- [ ] Add/Edit menu items
- [ ] Upload real food images
- [ ] Set prices in AED
- [ ] Enable/disable items

**Or via Database:**
```sql
INSERT INTO menu_items (name, nameAr, nameAm, price, description, categoryId, imageUrl, isAvailable)
VALUES ('Your Dish', 'الطبق', 'ምግብ', 50.00, 'Description', 1, 'image-url', 1);
```

### 4. Setup Payment Methods
- [ ] Configure card payment gateway (optional)
- [ ] Setup cash handling procedures
- [ ] Train staff on POS system

### 5. Security Configuration
- [ ] Change all default passwords
- [ ] Enable HTTPS/SSL
- [ ] Setup firewall rules
- [ ] Configure CORS properly
- [ ] Enable rate limiting
- [ ] Setup backup automation

---

## Testing Checklist

### Functional Testing
- [ ] User registration works
- [ ] User login works
- [ ] Menu browsing works
- [ ] Cart management works
- [ ] Order placement works
- [ ] WhatsApp integration works
- [ ] Cashier POS works
- [ ] Receipt generation works
- [ ] QR code scannable
- [ ] Theme switching works
- [ ] Language switching works
- [ ] Admin dashboard accessible

### Performance Testing
- [ ] Page load time < 3 seconds
- [ ] API response time < 500ms
- [ ] Images optimized
- [ ] Database queries optimized
- [ ] Mobile performance good

### Mobile Testing
- [ ] Test on iPhone (Safari)
- [ ] Test on Android (Chrome)
- [ ] Test on WhatsApp browser
- [ ] Responsive design works
- [ ] Touch interactions work
- [ ] QR code scanning works

### Security Testing
- [ ] SQL injection protected
- [ ] XSS attack protected
- [ ] CSRF protected
- [ ] Authentication secure
- [ ] Authorization working
- [ ] Sensitive data encrypted
- [ ] HTTPS enabled

---

## Monitoring Setup

### Backend Monitoring
```bash
# Setup PM2 monitoring
pm2 monit

# View logs
pm2 logs afamia-backend

# Setup email alerts
pm2 install pm2-logrotate
```

### Frontend Monitoring
- [ ] Setup Google Analytics
- [ ] Setup error tracking (Sentry)
- [ ] Monitor uptime (UptimeRobot)

### Database Monitoring
- [ ] Setup automated backups
- [ ] Monitor disk space
- [ ] Monitor query performance
- [ ] Setup alerts for errors

---

## Backup Strategy

### Automated Daily Backups
```bash
# Database backup
mysqldump -u root -p afamia_db > backup_$(date +%Y%m%d).sql

# Code backup
git push origin main

# File backup (images, uploads)
tar -czf uploads_backup_$(date +%Y%m%d).tar.gz public/uploads
```

### Backup Checklist
- [ ] Database backed up daily
- [ ] Code in GitHub (version control)
- [ ] Images backed up weekly
- [ ] .env files backed up securely
- [ ] Backup restoration tested

---

## Launch Checklist

### Pre-Launch (1 week before)
- [ ] All features tested
- [ ] Staff trained on system
- [ ] Menu finalized
- [ ] Prices confirmed
- [ ] Marketing materials ready
- [ ] Social media prepared

### Launch Day
- [ ] System fully deployed
- [ ] Monitoring active
- [ ] Support team ready
- [ ] Marketing campaign live
- [ ] Customer support prepared

### Post-Launch (1 week after)
- [ ] Monitor orders daily
- [ ] Respond to customer feedback
- [ ] Fix any bugs immediately
- [ ] Optimize performance
- [ ] Collect user feedback

---

## Support Contacts

### Technical Issues
- **Developer**: Mubarek Mohammed
- **GitHub**: https://github.com/mubarekmohammed961-dotcom
- **Repository**: caffe-and-restorant

### Restaurant
- **Phone**: +971 56 640 7830
- **Address**: Shop 64-65, Rashideya 1, Ajman, UAE
- **Location**: Dubai/Ajman, UAE

---

## Quick Commands Reference

### Start Everything (Local)
```bash
# Run deployment script
./deploy-local.bat
```

### Backend Only
```bash
cd afamia-full-system/server
npm run dev
```

### Frontend Only
```bash
cd client
npm run dev
```

### Database Reset
```bash
mysql -u root -p afamia_db < afamia-full-system/database/schema.sql
```

### Production Build
```bash
# Backend
cd afamia-full-system/server
npm run build
npm start

# Frontend
cd client
npm run build
# Serve dist/ folder
```

---

## Troubleshooting

### Common Issues

**Issue**: Database connection failed
**Solution**: 
1. Check MySQL is running
2. Verify credentials in `.env`
3. Test connection: `mysql -u root -p`

**Issue**: Port already in use
**Solution**:
1. Find process: `netstat -ano | findstr :5000`
2. Kill process or change port in `.env`

**Issue**: Menu items not loading
**Solution**:
1. Check backend API: `curl http://localhost:5000/api/v1/menu`
2. Verify database has data: `SELECT COUNT(*) FROM menu_items;`
3. Check browser console for errors

**Issue**: WhatsApp not opening
**Solution**:
1. Verify phone number format: +971XXXXXXXXX
2. Check order format in console
3. Test WhatsApp link manually

---

## Success Criteria ✅

Your deployment is successful when:
- ✅ Frontend loads without errors
- ✅ Backend API responds
- ✅ Database connected and populated
- ✅ Menu displays 40 items
- ✅ Orders can be placed
- ✅ WhatsApp integration works
- ✅ Cashier POS functional
- ✅ Receipts generate with QR codes
- ✅ All 6 themes work
- ✅ Mobile responsive
- ✅ Performance acceptable
- ✅ Security configured

---

**🎉 Congratulations! Your AFAMIA CAFE system is deployed!**

**Visit**: http://localhost:3000 (local) or https://yourdomain.com (production)

**Made with ❤️ for AFAMIA CAFE & RESTAURANT**  
**Dubai/Ajman, UAE 🇦🇪**
