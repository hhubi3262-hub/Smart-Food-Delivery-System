# 📁 AFAMIA CAFE - Clean Folder Structure

## Final Organized Structure

```
AFAMA CAFFE AND RESTORANT/
│
├── 📂 client/                      # Frontend Application (React + TypeScript + Vite)
│   ├── public/
│   │   ├── logo.jpg               # Restaurant logo
│   │   ├── images/
│   │   └── videos/                # Marketing videos
│   ├── src/
│   │   ├── components/            # Reusable UI components
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Logo.tsx
│   │   │   ├── ThemeSwitcher.tsx
│   │   │   └── LanguageSwitcher.tsx
│   │   ├── pages/                 # Page components
│   │   │   ├── Home.tsx
│   │   │   ├── Menu.tsx
│   │   │   ├── Order.tsx
│   │   │   ├── Cashier.tsx       # POS System with QR receipts
│   │   │   ├── Gallery.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   └── ...
│   │   ├── context/               # React Context
│   │   │   ├── ThemeContext.tsx  # 6 themes including dark mode
│   │   │   └── LanguageContext.tsx  # EN/AR/AM support
│   │   ├── services/
│   │   │   └── api.ts            # Axios API calls
│   │   ├── styles/
│   │   │   └── index.css         # Global styles & theme CSS
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── tsconfig.json
│
├── 📂 server/                      # Backend API (Node.js + Express + TypeScript)
│   ├── src/
│   │   ├── controllers/           # Business logic
│   │   │   ├── auth.controller.ts
│   │   │   ├── menu.controller.ts
│   │   │   ├── order.controller.ts
│   │   │   ├── dashboard.controller.ts
│   │   │   └── ...
│   │   ├── models/                # Database models
│   │   │   ├── MenuItem.model.ts
│   │   │   ├── Order.model.ts
│   │   │   ├── User.model.ts
│   │   │   └── ...
│   │   ├── routes/                # API endpoints
│   │   │   ├── auth.routes.ts
│   │   │   ├── menu.routes.ts
│   │   │   ├── order.routes.ts
│   │   │   └── ...
│   │   ├── middleware/            # Auth, validation, error handling
│   │   │   ├── auth.middleware.ts
│   │   │   ├── validation.middleware.ts
│   │   │   └── error.middleware.ts
│   │   ├── config/
│   │   │   └── database.ts       # MySQL connection
│   │   ├── app.ts                # Express app setup
│   │   └── server.ts             # Server entry point
│   ├── dist/                      # Compiled JavaScript (generated)
│   ├── .env                       # Environment variables (not in Git)
│   ├── .env.development          # Development config template
│   ├── .env.production           # Production config template
│   ├── package.json
│   └── tsconfig.json
│
├── 📂 database/                    # MySQL Database
│   ├── schema.sql                # Database structure & tables
│   └── add-simple-features.sql   # Sample data (40 menu items)
│
├── 📂 .git/                        # Git version control
│
├── 📂 .vscode/                     # VS Code settings (optional)
│
├── 📄 .gitignore                   # Git ignore rules
├── 📄 .env.example                 # Environment template
│
├── 📄 README.md                    # Main documentation
├── 📄 DEPLOYMENT_CHECKLIST.md      # Step-by-step deployment guide
├── 📄 FOLDER_STRUCTURE.md          # This file
│
├── 📄 deploy-local.bat             # Quick local deployment script
├── 📄 setup-database.bat           # Database setup script
│
└── 📄 AFAMIA_API.postman_collection.json  # API testing collection

```

---

## 📊 Folder Statistics

| Folder | Purpose | File Count | Size |
|--------|---------|------------|------|
| **client/** | Frontend React App | ~100 files | ~5MB |
| **server/** | Backend API | ~80 files | ~3MB |
| **database/** | SQL Scripts | 2 files | ~200KB |
| **Total** | Complete System | ~180+ files | ~8MB |

---

## 🎯 Key Directories Explained

### Frontend (`client/`)
- **Built with**: React 18, TypeScript, Vite, Tailwind CSS
- **Features**: 
  - 6 Color themes (including full dark mode)
  - Trilingual (English, Arabic, Amharic)
  - Real restaurant logo
  - Professional animations
  - QR code receipts
  - WhatsApp integration

### Backend (`server/`)
- **Built with**: Node.js 18, Express, TypeScript, MySQL
- **Features**:
  - RESTful API
  - JWT authentication
  - Role-based access
  - Input validation
  - Error handling
  - CORS configured

### Database (`database/`)
- **Type**: MySQL 8+
- **Tables**: 
  - users
  - menu_items (40 items)
  - orders
  - reservations
  - reviews
  - categories
  - staff
- **Sample Data**: 40 Ethiopian & International dishes

---

## 🚀 Quick Start Commands

### Full Local Deployment (Automated)
```bash
# Run everything at once
./deploy-local.bat
```

### Manual Setup

**1. Database**
```bash
./setup-database.bat
# Or manually:
mysql -u root -p
CREATE DATABASE afamia_db;
USE afamia_db;
SOURCE database/schema.sql;
SOURCE database/add-simple-features.sql;
```

**2. Backend**
```bash
cd server
npm install
npm run dev
# Runs on http://localhost:5000
```

**3. Frontend**
```bash
cd client
npm install
npm run dev
# Runs on http://localhost:3000
```

---

## 📝 Important Files

### Configuration Files
- **server/.env** - Backend environment variables (not in Git)
- **server/.env.development** - Development config template
- **server/.env.production** - Production config template
- **.env.example** - General environment template

### Deployment Files
- **deploy-local.bat** - Automated local deployment
- **setup-database.bat** - Database initialization
- **DEPLOYMENT_CHECKLIST.md** - Complete deployment guide

### Documentation Files
- **README.md** - Project overview & installation
- **FOLDER_STRUCTURE.md** - This file
- **AFAMIA_API.postman_collection.json** - API testing

---

## 🗂️ File Organization Rules

### ✅ KEEP These Files:
- All source code in `client/` and `server/`
- Database scripts in `database/`
- Configuration templates (.env.example, .env.development, .env.production)
- Documentation (README.md, DEPLOYMENT_CHECKLIST.md)
- Deployment scripts (.bat files)
- .gitignore

### ❌ DO NOT COMMIT:
- **server/.env** (contains secrets)
- **node_modules/** (in both client and server)
- **dist/** or **build/** (generated files)
- **.vscode/** (personal settings)
- **uploads/** (user uploaded files)
- **.DS_Store** (Mac files)
- **Thumbs.db** (Windows files)

### 🗑️ REMOVED (Cleaned Up):
- ❌ afamia-website/ (old static site)
- ❌ Duplicate client/ and server/ folders at root
- ❌ Old documentation files (MYSQL_SETUP.md, PROJECT_STATUS.md, etc.)
- ❌ Test WhatsApp files (AFAMIA_WHATSAPP_*.txt)
- ❌ Redundant README files in subdirectories

---

## 🔄 Git Structure

### Branches
```
main (default)
  └── production-ready code
```

### .gitignore Highlights
```gitignore
# Dependencies
node_modules/

# Environment
.env
.env.local

# Build
dist/
build/

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Logs
*.log
```

---

## 📦 NPM Packages Summary

### Frontend Dependencies (client/package.json)
```json
{
  "dependencies": {
    "react": "^18.x",
    "react-router-dom": "^6.x",
    "axios": "^1.x",
    "react-icons": "^4.x",
    "qrcode.react": "^3.x",
    "react-toastify": "^9.x"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.x",
    "typescript": "^5.x",
    "tailwindcss": "^3.x",
    "vite": "^4.x"
  }
}
```

### Backend Dependencies (server/package.json)
```json
{
  "dependencies": {
    "express": "^4.x",
    "mysql2": "^3.x",
    "bcryptjs": "^2.x",
    "jsonwebtoken": "^9.x",
    "dotenv": "^16.x",
    "cors": "^2.x"
  },
  "devDependencies": {
    "typescript": "^5.x",
    "@types/node": "^20.x",
    "@types/express": "^4.x",
    "nodemon": "^3.x",
    "ts-node": "^10.x"
  }
}
```

---

## 🎨 Code Style

### TypeScript
- **Frontend**: React functional components with hooks
- **Backend**: Express controllers with async/await
- **Types**: Strong typing, interfaces, enums

### CSS
- **Framework**: Tailwind CSS 3
- **Custom Styles**: Global CSS with theme variables
- **Responsive**: Mobile-first approach

### File Naming
- **Components**: PascalCase (e.g., `ThemeSwitcher.tsx`)
- **Pages**: PascalCase (e.g., `Cashier.tsx`)
- **Utils**: camelCase (e.g., `api.ts`)
- **Types**: PascalCase (e.g., `MenuItem.ts`)

---

## 🔧 Development Workflow

### Daily Development
1. Pull latest changes: `git pull origin main`
2. Start backend: `cd server && npm run dev`
3. Start frontend: `cd client && npm run dev`
4. Make changes
5. Test locally
6. Commit: `git add . && git commit -m "feature: description"`
7. Push: `git push origin main`

### Adding New Features
1. Create feature branch (optional): `git checkout -b feature/new-feature`
2. Develop and test
3. Build for production: `npm run build`
4. Merge to main
5. Deploy

---

## 📊 Production Build

### Frontend Build
```bash
cd client
npm run build
# Output: client/dist/
```

### Backend Build
```bash
cd server
npm run build
# Output: server/dist/
```

---

## 🌐 URLs & Ports

| Service | Local URL | Production |
|---------|-----------|------------|
| Frontend | http://localhost:3000 | https://yourdomain.com |
| Backend API | http://localhost:5000 | https://api.yourdomain.com |
| MySQL | localhost:3306 | your-db-host:3306 |
| Cashier POS | http://localhost:3000/cashier | https://yourdomain.com/cashier |

---

## ✅ Structure Verification Checklist

- [x] Single client folder (no duplicates)
- [x] Single server folder (no duplicates)
- [x] Database scripts in dedicated folder
- [x] Environment templates present
- [x] Deployment scripts updated
- [x] Documentation consolidated
- [x] Old/redundant files removed
- [x] .gitignore properly configured
- [x] All paths in scripts updated
- [x] README.md accurate

---

## 📈 Next Steps After Cleaning

1. **Verify Everything Works**
   ```bash
   ./deploy-local.bat
   ```

2. **Test All Features**
   - Menu loading
   - Order placement
   - Cashier POS
   - Theme switching
   - WhatsApp integration

3. **Commit Clean Structure**
   ```bash
   git add .
   git commit -m "refactor: clean folder structure and remove duplicates"
   git push origin main
   ```

4. **Deploy to Production**
   - Follow DEPLOYMENT_CHECKLIST.md
   - Use cleaned structure for deployment

---

## 🎉 Benefits of Clean Structure

✅ **No duplicate files** - Clear single source of truth  
✅ **Organized by purpose** - Easy to navigate  
✅ **Smaller repository** - Faster cloning  
✅ **Better performance** - Less confusion  
✅ **Easier deployment** - Clearer paths  
✅ **Professional** - Industry standard structure  

---

**Structure Cleaned On:** $(date)  
**Total Size:** ~8MB (down from ~110MB with duplicates)  
**Ready for Deployment:** ✅ YES

**Made with ❤️ for AFAMIA CAFE & RESTAURANT**  
**Dubai/Ajman, UAE 🇦🇪**
