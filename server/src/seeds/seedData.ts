import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDatabase } from '../config/database';
import Tenant from '../models/Tenant';
import Outlet from '../models/Outlet';
import Table from '../models/Table';

dotenv.config();

const seedData = async () => {
  try {
    console.log('🌱 Starting database seeding...\n');

    // Connect to database
    await connectDatabase();

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Tenant.deleteMany({});
    await Outlet.deleteMany({});
    await Table.deleteMany({});
    console.log('✅ Existing data cleared\n');

    // Create demo tenant
    console.log('🏢 Creating demo tenant...');
    const tenant = await Tenant.create({
      businessName: 'Afamia Café & Restaurant',
      businessNameAr: 'مقهى ومطعم أفاميا',
      legalName: 'Afamia Food Services LLC',
      trn: '100123456700003',
      tradeLicenseNumber: 'DED-123456',
      email: 'info@afamia.ae',
      phone: '+971501234567',
      address: 'Dubai Marina, Dubai, UAE',
      plan: 'premium',
      subscriptionStatus: 'trial',
      subscriptionStart: new Date(),
      subscriptionEnd: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days trial
      trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      maxOutlets: 3,
      maxUsers: 20,
      maxDevices: 10,
      enabledModules: [
        'pos',
        'kds',
        'inventory',
        'food-safety',
        'reports',
        'delivery',
        'reservations',
        'aggregators'
      ],
      settings: {
        currency: 'AED',
        timezone: 'Asia/Dubai',
        defaultLanguage: 'en',
        serviceChargePercent: 0,
        vatPercent: 5,
        receiptFooter: 'Thank you for dining with us!',
        receiptFooterAr: 'شكراً لزيارتكم!'
      },
      isActive: true
    });
    console.log(`✅ Tenant created: ${tenant.businessName}\n`);

    // Create demo outlet
    console.log('🏪 Creating demo outlet...');
    const outlet = await Outlet.create({
      tenantId: tenant._id,
      name: 'Dubai Marina Branch',
      nameAr: 'فرع دبي مارينا',
      address: 'Shop 12, Marina Walk, Dubai Marina, Dubai',
      phone: '+971501234567',
      email: 'marina@afamia.ae',
      coordinates: {
        lat: 25.0804,
        lng: 55.1396
      },
      openingHours: [
        { day: 'Monday', open: '08:00', close: '23:00', isClosed: false },
        { day: 'Tuesday', open: '08:00', close: '23:00', isClosed: false },
        { day: 'Wednesday', open: '08:00', close: '23:00', isClosed: false },
        { day: 'Thursday', open: '08:00', close: '00:00', isClosed: false },
        { day: 'Friday', open: '08:00', close: '01:00', isClosed: false },
        { day: 'Saturday', open: '08:00', close: '01:00', isClosed: false },
        { day: 'Sunday', open: '08:00', close: '23:00', isClosed: false }
      ],
      settings: {
        maxTables: 30,
        enableDineIn: true,
        enableTakeaway: true,
        enableDelivery: true,
        deliveryRadius: 10,
        deliveryFeePerKm: 3,
        minDeliveryAmount: 30
      },
      isActive: true
    });
    console.log(`✅ Outlet created: ${outlet.name}\n`);

    // Create demo tables
    console.log('🪑 Creating demo tables...');
    const tables = [];
    
    // Indoor section
    for (let i = 1; i <= 10; i++) {
      tables.push({
        tenantId: tenant._id,
        outletId: outlet._id,
        tableNumber: `T${i}`,
        section: 'Indoor',
        capacity: i % 3 === 0 ? 6 : (i % 2 === 0 ? 4 : 2),
        status: 'available',
        position: { x: (i % 5) * 100, y: Math.floor(i / 5) * 100 },
        shape: 'rectangle',
        isActive: true
      });
    }
    
    // Outdoor section
    for (let i = 11; i <= 15; i++) {
      tables.push({
        tenantId: tenant._id,
        outletId: outlet._id,
        tableNumber: `T${i}`,
        section: 'Outdoor',
        capacity: 4,
        status: 'available',
        position: { x: ((i - 11) % 5) * 100, y: 300 },
        shape: 'circle',
        isActive: true
      });
    }

    await Table.insertMany(tables);
    console.log(`✅ Created ${tables.length} tables\n`);

    // Summary
    console.log('═══════════════════════════════════════');
    console.log('✨ Database seeding completed successfully!');
    console.log('═══════════════════════════════════════');
    console.log(`\n📊 Summary:`);
    console.log(`   Tenant: ${tenant.businessName}`);
    console.log(`   TRN: ${tenant.trn}`);
    console.log(`   Outlet: ${outlet.name}`);
    console.log(`   Tables: ${tables.length}`);
    console.log(`   Trial ends: ${tenant.trialEndsAt?.toLocaleDateString()}`);
    console.log('\n🚀 You can now start the server with: npm run dev');
    console.log('\n📝 Note: Create users through the admin panel or auth API');
    console.log('═══════════════════════════════════════\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seed
seedData();
