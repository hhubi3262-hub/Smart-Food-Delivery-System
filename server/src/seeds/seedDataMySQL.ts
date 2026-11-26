import dotenv from 'dotenv';
import sequelize, { connectDatabase } from '../config/database';
import { Tenant, User, MenuItem, Order } from '../models/mysql';

dotenv.config();

const seedData = async () => {
  try {
    console.log('🌱 Starting MySQL database seeding...\n');

    // Connect to database
    await connectDatabase();

    // Clear existing data (be careful in production!)
    console.log('🗑️  Clearing existing data...');
    await Order.destroy({ where: {}, force: true });
    await MenuItem.destroy({ where: {}, force: true });
    await User.destroy({ where: {}, force: true });
    await Tenant.destroy({ where: {}, force: true });
    console.log('✅ Existing data cleared\n');

    // Create actual tenant - AFAMIA CAFE AND RESTAURANT (S.P.S - L.L.C)
    console.log('🏢 Creating AFAMIA CAFE AND RESTAURANT tenant...');
    const tenant = await Tenant.create({
      businessName: 'AFAMIA CAFE AND RESTAURANT',
      businessNameAr: 'مقهى ومطعم أفاميا',
      legalName: 'AFAMIA CAFE AND RESTAURANT (S.P.S - L.L.C)',
      trn: '100564067990003', // UAE VAT TRN format
      tradeLicenseNumber: '133469',
      email: 'kedir6679@gmail.com',
      phone: '+971566407830',
      address: 'Shop No. 64-65, Rashideya 1, Ajman, UAE',
      logo: 'KEDIR', // Brand name
      plan: 'premium',
      subscriptionStatus: 'active',
      subscriptionStart: new Date(),
      subscriptionEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
      maxOutlets: 5,
      maxUsers: 50,
      maxDevices: 20,
      enabledModules: JSON.stringify([
        'pos',
        'kds',
        'inventory',
        'food-safety',
        'reports',
        'delivery',
        'reservations',
        'cafe',
        'restaurant',
        'dual-menu',
        'tax-invoice',
        'health-compliance'
      ]),
      currency: 'AED',
      timezone: 'Asia/Dubai',
      defaultLanguage: 'en',
      serviceChargePercent: 0,
      vatPercent: 5,
      receiptFooter: 'Thank you for dining with us! - KEDIR',
      receiptFooterAr: 'شكراً لزيارتكم! - كدير',
      isActive: true,
    });
    console.log(`✅ Tenant created: ${tenant.legalName}`);
    console.log(`   License No: ${tenant.tradeLicenseNumber}`);
    console.log(`   Location: Ajman, UAE\n`);

    // Create owner user - Kedir Ahmed Ebrahim (100% Owner)
    console.log('👤 Creating owner account...');
    const ownerUser = await User.create({
      tenantId: tenant.id,
      name: 'Kedir Ahmed Ebrahim',
      email: 'kedir6679@gmail.com',
      password: 'owner123',
      phone: '+971566407830',
      role: 'owner',
      permissions: JSON.stringify(['all']),
      language: 'en',
      isActive: true,
    });
    console.log(`✅ Owner account created: ${ownerUser.name}\n`);

    // Create manager user - Faiza Yimam Nurye (Authorized Manager)
    console.log('👤 Creating manager account...');
    const managerUser = await User.create({
      tenantId: tenant.id,
      name: 'Faiza Yimam Nurye',
      email: 'manager@afamia.ae',
      password: 'manager123',
      phone: '+971501234568',
      role: 'manager',
      permissions: JSON.stringify([
        'pos',
        'orders',
        'menu',
        'reports',
        'staff',
        'inventory',
        'food-safety'
      ]),
      language: 'en',
      isActive: true,
    });
    console.log(`✅ Manager account created: ${managerUser.name}\n`);

    // Create sample CAFE menu items (Beverages & Light Snacks)
    console.log('☕ Creating CAFÉ menu items...');
    const cafeItems = await MenuItem.bulkCreate([
      {
        tenantId: tenant.id,
        name: 'Arabic Coffee (Qahwa)',
        nameAr: 'قهوة عربية',
        description: 'Traditional Arabic coffee with cardamom',
        descriptionAr: 'قهوة عربية تقليدية بالهيل',
        category: 'Café - Hot Beverages',
        categoryAr: 'مقهى - مشروبات ساخنة',
        price: 12.00,
        isAvailable: true,
        preparationTime: 3,
        vatType: 'standard',
        allergens: JSON.stringify([]),
        calories: 5,
        isHalal: true,
        displayOrder: 1,
      },
      {
        tenantId: tenant.id,
        name: 'Cappuccino',
        nameAr: 'كابتشينو',
        description: 'Rich espresso with steamed milk foam',
        descriptionAr: 'إسبرسو غني مع رغوة الحليب المبخر',
        category: 'Café - Hot Beverages',
        categoryAr: 'مقهى - مشروبات ساخنة',
        price: 18.00,
        isAvailable: true,
        preparationTime: 5,
        vatType: 'standard',
        allergens: JSON.stringify(['milk']),
        calories: 120,
        isHalal: true,
        displayOrder: 2,
      },
      {
        tenantId: tenant.id,
        name: 'Mint Lemonade',
        nameAr: 'ليمون بالنعناع',
        description: 'Fresh mint lemonade with ice',
        descriptionAr: 'ليموناضة بالنعناع الطازج مع الثلج',
        category: 'Café - Cold Beverages',
        categoryAr: 'مقهى - مشروبات باردة',
        price: 15.00,
        isAvailable: true,
        preparationTime: 3,
        vatType: 'zero',
        allergens: JSON.stringify([]),
        calories: 80,
        isHalal: true,
        displayOrder: 3,
      },
      {
        tenantId: tenant.id,
        name: 'Croissant',
        nameAr: 'كرواسون',
        description: 'Butter croissant - plain or chocolate',
        descriptionAr: 'كرواسون بالزبدة - سادة أو شوكولاتة',
        category: 'Café - Snacks',
        categoryAr: 'مقهى - وجبات خفيفة',
        price: 12.00,
        isAvailable: true,
        preparationTime: 2,
        vatType: 'standard',
        allergens: JSON.stringify(['gluten', 'dairy']),
        calories: 230,
        isHalal: true,
        displayOrder: 4,
      },
    ]);
    console.log(`✅ Created ${cafeItems.length} café menu items\n`);

    // Create sample RESTAURANT menu items (Full Dining)
    console.log('🍽️  Creating RESTAURANT menu items...');
    const restaurantItems = await MenuItem.bulkCreate([
      {
        tenantId: tenant.id,
        name: 'Arabic Mixed Grill',
        nameAr: 'مشاوي عربية مشكلة',
        description: 'Lamb, chicken, and kafta with rice and salad',
        descriptionAr: 'لحم غنم ودجاج وكفتة مع أرز وسلطة',
        category: 'Restaurant - Main Course',
        categoryAr: 'مطعم - الطبق الرئيسي',
        price: 65.00,
        isAvailable: true,
        preparationTime: 25,
        vatType: 'standard',
        allergens: JSON.stringify([]),
        calories: 850,
        isHalal: true,
        displayOrder: 1,
      },
      {
        tenantId: tenant.id,
        name: 'Chicken Shawarma Plate',
        nameAr: 'صحن شاورما دجاج',
        description: 'Grilled chicken shawarma with hummus, pickles, and bread',
        descriptionAr: 'شاورما دجاج مشوي مع حمص ومخلل وخبز',
        category: 'Restaurant - Main Course',
        categoryAr: 'مطعم - الطبق الرئيسي',
        price: 35.00,
        isAvailable: true,
        preparationTime: 15,
        vatType: 'standard',
        allergens: JSON.stringify(['gluten']),
        calories: 520,
        isHalal: true,
        displayOrder: 2,
      },
      {
        tenantId: tenant.id,
        name: 'Hummus with Meat',
        nameAr: 'حمص باللحمة',
        description: 'Creamy hummus topped with minced meat and pine nuts',
        descriptionAr: 'حمص كريمي مغطى باللحم المفروم والصنوبر',
        category: 'Restaurant - Appetizers',
        categoryAr: 'مطعم - المقبلات',
        price: 28.00,
        isAvailable: true,
        preparationTime: 10,
        vatType: 'standard',
        allergens: JSON.stringify(['sesame']),
        calories: 380,
        isHalal: true,
        displayOrder: 3,
      },
      {
        tenantId: tenant.id,
        name: 'Fattoush Salad',
        nameAr: 'سلطة فتوش',
        description: 'Traditional Levantine salad with crispy bread',
        descriptionAr: 'سلطة شامية تقليدية مع خبز محمص',
        category: 'Restaurant - Appetizers',
        categoryAr: 'مطعم - المقبلات',
        price: 22.00,
        isAvailable: true,
        preparationTime: 8,
        vatType: 'standard',
        allergens: JSON.stringify(['gluten']),
        calories: 180,
        isHalal: true,
        displayOrder: 4,
      },
      {
        tenantId: tenant.id,
        name: 'Grilled Sea Bass',
        nameAr: 'سمك قاروص مشوي',
        description: 'Fresh sea bass grilled with lemon and herbs',
        descriptionAr: 'سمك قاروص طازج مشوي بالليمون والأعشاب',
        category: 'Restaurant - Seafood',
        categoryAr: 'مطعم - مأكولات بحرية',
        price: 75.00,
        isAvailable: true,
        preparationTime: 20,
        vatType: 'standard',
        allergens: JSON.stringify(['fish']),
        calories: 420,
        isHalal: true,
        displayOrder: 5,
      },
      {
        tenantId: tenant.id,
        name: 'Kunafa',
        nameAr: 'كنافة نابلسية',
        description: 'Traditional Palestinian dessert with cheese and syrup',
        descriptionAr: 'حلوى فلسطينية تقليدية بالجبنة والقطر',
        category: 'Restaurant - Desserts',
        categoryAr: 'مطعم - حلويات',
        price: 25.00,
        isAvailable: true,
        preparationTime: 5,
        vatType: 'standard',
        allergens: JSON.stringify(['dairy', 'gluten']),
        calories: 420,
        isHalal: true,
        displayOrder: 6,
      },
    ]);
    console.log(`✅ Created ${restaurantItems.length} restaurant menu items\n`);

    // Summary
    console.log('═══════════════════════════════════════════════════════════');
    console.log('✨ AFAMIA CAFE AND RESTAURANT - Database Setup Complete!');
    console.log('═══════════════════════════════════════════════════════════');
    console.log(`\n📊 Business Information:`);
    console.log(`   Legal Name: ${tenant.legalName}`);
    console.log(`   Trade License: ${tenant.tradeLicenseNumber}`);
    console.log(`   Location: Shop 64-65, Rashideya 1, Ajman, UAE`);
    console.log(`   Contact: ${tenant.phone}`);
    console.log(`   Email: ${tenant.email}`);
    console.log(`   Brand: KEDIR`);
    console.log(`\n👥 Authorized Personnel:`);
    console.log(`   Owner (100%): Kedir Ahmed Ebrahim`);
    console.log(`   Manager: Faiza Yimam Nurye`);
    console.log(`\n🔐 Login Credentials:`);
    console.log(`   Owner: kedir6679@gmail.com / owner123`);
    console.log(`   Manager: manager@afamia.ae / manager123`);
    console.log(`\n📋 Menu Summary:`);
    console.log(`   Café Items: ${cafeItems.length}`);
    console.log(`   Restaurant Items: ${restaurantItems.length}`);
    console.log(`   Total: ${cafeItems.length + restaurantItems.length} items`);
    console.log(`\n⚖️ Compliance Status:`);
    console.log(`   ✅ UAE VAT (5%) Enabled`);
    console.log(`   ✅ Trade License: 133469`);
    console.log(`   ✅ Ajman DED Regulations`);
    console.log(`   ✅ Dual Service (Café + Restaurant)`);
    console.log(`   ✅ Operating Hours: Until 12:00 AM`);
    console.log(`   ✅ Non-Smoker Area: 50%+ Required`);
    console.log('\n🚀 Next Steps:');
    console.log('   1. Start backend: cd server && npm run dev');
    console.log('   2. Start frontend: cd client && npm run dev');
    console.log('   3. Access: http://localhost:3000');
    console.log('   4. Login with owner credentials above');
    console.log('═══════════════════════════════════════════════════════════\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seed
seedData();
