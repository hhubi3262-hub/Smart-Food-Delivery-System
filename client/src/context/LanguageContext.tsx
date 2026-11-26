import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar' | 'am';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

// Translations
const translations = {
  en: {
    common: {
      welcome: 'Welcome',
      login: 'Login',
      logout: 'Logout',
      register: 'Register',
      email: 'Email',
      password: 'Password',
      phone: 'Phone',
      name: 'Name',
      submit: 'Submit',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      back: 'Back',
      loading: 'Loading...',
      search: 'Search',
      filter: 'Filter',
      all: 'All',
      available: 'Available',
      unavailable: 'Unavailable',
      price: 'Price',
      total: 'Total',
      status: 'Status',
    },
    nav: {
      home: 'Home',
      menu: 'Menu',
      orders: 'Orders',
      reservations: 'Reservations',
      dashboard: 'Dashboard',
      contact: 'Contact',
    },
    home: {
      title: 'AFAMIA CAFE & RESTAURANT',
      subtitle: 'Authentic Ethiopian & Middle Eastern Cuisine',
      description: 'Experience the rich flavors of Ethiopia and the Middle East',
      cta: 'View Menu',
      tagline: 'Where Tradition Meets Taste',
      location: 'Shop 64-65, Rashideya 1, Ajman, UAE',
    },
    menu: {
      title: 'Our Menu',
      subtitle: 'Delicious food crafted with love',
      addToCart: 'Add to Cart',
      soldOut: 'Sold Out',
      categories: {
        all: 'All',
        coffee: 'Coffee',
        tea: 'Tea',
        coldBeverages: 'Cold Beverages',
        breakfast: 'Breakfast',
        appetizers: 'Appetizers',
        mainCourses: 'Main Courses',
        sandwiches: 'Sandwiches',
        desserts: 'Desserts',
      },
      noItems: 'No menu items found',
      loading: 'Loading menu...',
    },
    orders: {
      title: 'Orders',
      myOrders: 'My Orders',
      orderNumber: 'Order',
      noOrders: 'No orders yet',
      newOrder: 'Create New Order',
      orderDetails: 'Order Details',
      orderStatus: {
        pending: 'Pending',
        confirmed: 'Confirmed',
        preparing: 'Preparing',
        ready: 'Ready',
        delivered: 'Delivered',
        completed: 'Completed',
        cancelled: 'Cancelled',
      },
    },
    reservations: {
      title: 'Reservations',
      makeReservation: 'Make a Reservation',
      date: 'Date',
      time: 'Time',
      guests: 'Number of Guests',
      specialRequests: 'Special Requests',
      noReservations: 'No reservations yet',
      bookTable: 'Book a Table',
      yourReservations: 'Your Reservations',
    },
    dashboard: {
      title: 'Dashboard',
      welcomeBack: 'Welcome back',
      stats: {
        totalOrders: 'Total Orders',
        revenue: 'Revenue',
        customers: 'Customers',
        growth: 'Growth',
      },
      quickActions: {
        createOrder: 'Create Order',
        viewMenu: 'View Menu',
        reservations: 'Reservations',
      },
      recentActivity: 'Recent Activity',
      systemStatus: 'System Status',
    },
    auth: {
      signIn: 'Sign In',
      signUp: 'Sign Up',
      signOut: 'Sign Out',
      createAccount: 'Create your account',
      alreadyHaveAccount: 'Already have an account?',
      dontHaveAccount: "Don't have an account?",
      fullName: 'Full Name',
      phoneNumber: 'Phone Number',
      emailAddress: 'Email Address',
      enterPassword: 'Enter Password',
      forgotPassword: 'Forgot password?',
    },
    business: {
      name: 'AFAMIA CAFE AND RESTAURANT',
      brand: 'KEDIR',
      license: 'License No: 133469',
      location: 'Shop 64-65, Rashideya 1, Ajman, UAE',
      phone: '+971 56 640 7830',
      owner: 'Kedir Ahmed Ebrahim',
      manager: 'Faiza Yimam Nurye',
    },
  },
  ar: {
    common: {
      welcome: 'مرحباً',
      login: 'تسجيل الدخول',
      logout: 'تسجيل الخروج',
      register: 'التسجيل',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      phone: 'الهاتف',
      name: 'الاسم',
      submit: 'إرسال',
      cancel: 'إلغاء',
      save: 'حفظ',
      delete: 'حذف',
      edit: 'تعديل',
      back: 'رجوع',
      loading: 'جاري التحميل...',
      search: 'بحث',
      filter: 'تصفية',
      all: 'الكل',
      available: 'متاح',
      unavailable: 'غير متاح',
      price: 'السعر',
      total: 'المجموع',
      status: 'الحالة',
    },
    nav: {
      home: 'الرئيسية',
      menu: 'القائمة',
      orders: 'الطلبات',
      reservations: 'الحجوزات',
      dashboard: 'لوحة التحكم',
      contact: 'اتصل بنا',
    },
    home: {
      title: 'مقهى ومطعم أفاميا',
      subtitle: 'المطبخ الإثيوبي والشرق أوسطي الأصيل',
      description: 'استمتع بالنكهات الغنية من إثيوبيا والشرق الأوسط',
      cta: 'عرض القائمة',
      tagline: 'حيث يلتقي التقليد بالذوق',
      location: 'محل 64-65، الراشدية 1، عجمان، الإمارات',
    },
    menu: {
      title: 'قائمتنا',
      subtitle: 'طعام لذيذ مصنوع بحب',
      addToCart: 'أضف إلى السلة',
      soldOut: 'نفذ',
      categories: {
        all: 'الكل',
        coffee: 'قهوة',
        tea: 'شاي',
        coldBeverages: 'مشروبات باردة',
        breakfast: 'فطور',
        appetizers: 'مقبلات',
        mainCourses: 'أطباق رئيسية',
        sandwiches: 'سندويشات',
        desserts: 'حلويات',
      },
      noItems: 'لا توجد عناصر في القائمة',
      loading: 'جاري تحميل القائمة...',
    },
    orders: {
      title: 'الطلبات',
      myOrders: 'طلباتي',
      orderNumber: 'طلب',
      noOrders: 'لا توجد طلبات بعد',
      newOrder: 'إنشاء طلب جديد',
      orderDetails: 'تفاصيل الطلب',
      orderStatus: {
        pending: 'قيد الانتظار',
        confirmed: 'مؤكد',
        preparing: 'قيد التحضير',
        ready: 'جاهز',
        delivered: 'تم التوصيل',
        completed: 'مكتمل',
        cancelled: 'ملغي',
      },
    },
    reservations: {
      title: 'الحجوزات',
      makeReservation: 'إجراء حجز',
      date: 'التاريخ',
      time: 'الوقت',
      guests: 'عدد الضيوف',
      specialRequests: 'طلبات خاصة',
      noReservations: 'لا توجد حجوزات بعد',
      bookTable: 'احجز طاولة',
      yourReservations: 'حجوزاتك',
    },
    dashboard: {
      title: 'لوحة التحكم',
      welcomeBack: 'مرحباً بعودتك',
      stats: {
        totalOrders: 'إجمالي الطلبات',
        revenue: 'الإيرادات',
        customers: 'العملاء',
        growth: 'النمو',
      },
      quickActions: {
        createOrder: 'إنشاء طلب',
        viewMenu: 'عرض القائمة',
        reservations: 'الحجوزات',
      },
      recentActivity: 'النشاط الأخير',
      systemStatus: 'حالة النظام',
    },
    auth: {
      signIn: 'تسجيل الدخول',
      signUp: 'إنشاء حساب',
      signOut: 'تسجيل الخروج',
      createAccount: 'إنشاء حسابك',
      alreadyHaveAccount: 'لديك حساب بالفعل؟',
      dontHaveAccount: 'ليس لديك حساب؟',
      fullName: 'الاسم الكامل',
      phoneNumber: 'رقم الهاتف',
      emailAddress: 'عنوان البريد الإلكتروني',
      enterPassword: 'أدخل كلمة المرور',
      forgotPassword: 'نسيت كلمة المرور؟',
    },
    business: {
      name: 'مقهى ومطعم أفاميا',
      brand: 'كدير',
      license: 'رخصة رقم: 133469',
      location: 'محل 64-65، الراشدية 1، عجمان، الإمارات',
      phone: '+971 56 640 7830',
      owner: 'كدير أحمد إبراهيم',
      manager: 'فايزة يمام نوري',
    },
  },
  am: {
    common: {
      welcome: 'እንኳን ደህና መጡ',
      login: 'ግባ',
      logout: 'ውጣ',
      register: 'ይመዝገቡ',
      email: 'ኢሜይል',
      password: 'የይለፍ ቃል',
      phone: 'ስልክ',
      name: 'ስም',
      submit: 'ላክ',
      cancel: 'ሰርዝ',
      save: 'አስቀምጥ',
      delete: 'ሰርዝ',
      edit: 'አስተካክል',
      back: 'ተመለስ',
      loading: 'በመጫን ላይ...',
      search: 'ፈልግ',
      filter: 'አጣራ',
      all: 'ሁሉም',
      available: 'ይገኛል',
      unavailable: 'አይገኝም',
      price: 'ዋጋ',
      total: 'ጠቅላላ',
      status: 'ሁኔታ',
    },
    nav: {
      home: 'መነሻ',
      menu: 'ምናሌ',
      orders: 'ትዕዛዞች',
      reservations: 'ቦታ መያዝ',
      dashboard: 'ዳሽቦርድ',
      contact: 'አግኙን',
    },
    home: {
      title: 'አፋሚያ ካፌ እና ሬስቶራንት',
      subtitle: 'የእውነተኛ ኢትዮጵያ እና የመካከለኛው ምስራቅ ምግብ',
      description: 'የኢትዮጵያን እና የመካከለኛው ምስራቅን ሀብታም ጣዕም ይለማመዱ',
      cta: 'ምናሌ ይመልከቱ',
      tagline: 'ባህል ከጣዕም ጋር የሚገናኝበት',
      location: 'ሱቅ 64-65፣ ራሺዲያ 1፣ አጅማን፣ ዩኤኢ',
    },
    menu: {
      title: 'የእኛ ምናሌ',
      subtitle: 'በፍቅር የተሰራ ጣፋጭ ምግብ',
      addToCart: 'ወደ ጋሪ ጨምር',
      soldOut: 'ተሽጧል',
      categories: {
        all: 'ሁሉም',
        coffee: 'ቡና',
        tea: 'ሻይ',
        coldBeverages: 'ቀዝቃዛ መጠጦች',
        breakfast: 'ቁርስ',
        appetizers: 'ጀማሪዎች',
        mainCourses: 'ዋና ምግቦች',
        sandwiches: 'ሳንድዊችዎች',
        desserts: 'ጣፋጮች',
      },
      noItems: 'ምንም የምናሌ ንጥሎች አልተገኙም',
      loading: 'ምናሌ በመጫን ላይ...',
    },
    orders: {
      title: 'ትዕዛዞች',
      myOrders: 'የእኔ ትዕዛዞች',
      orderNumber: 'ትዕዛዝ',
      noOrders: 'ገና ትዕዛዞች የሉም',
      newOrder: 'አዲስ ትዕዛዝ ይፍጠሩ',
      orderDetails: 'የትዕዛዝ ዝርዝር',
      orderStatus: {
        pending: 'በመጠባበቅ ላይ',
        confirmed: 'ተረጋግጧል',
        preparing: 'በዝግጅት ላይ',
        ready: 'ዝግጁ',
        delivered: 'ደርሷል',
        completed: 'ተጠናቋል',
        cancelled: 'ተሰርዟል',
      },
    },
    reservations: {
      title: 'ቦታ መያዝ',
      makeReservation: 'ቦታ ያዙ',
      date: 'ቀን',
      time: 'ሰዓት',
      guests: 'የእንግዶች ብዛት',
      specialRequests: 'ልዩ ጥያቄዎች',
      noReservations: 'ገና ምንም ቦታ አልተያዘም',
      bookTable: 'ጠረጴዛ ይያዙ',
      yourReservations: 'የእርስዎ ቦታዎች',
    },
    dashboard: {
      title: 'ዳሽቦርድ',
      welcomeBack: 'እንኳን እንደገና መጡ',
      stats: {
        totalOrders: 'ጠቅላላ ትዕዛዞች',
        revenue: 'ገቢ',
        customers: 'ደንበኞች',
        growth: 'እድገት',
      },
      quickActions: {
        createOrder: 'ትዕዛዝ ፍጠር',
        viewMenu: 'ምናሌ ይመልከቱ',
        reservations: 'ቦታ መያዝ',
      },
      recentActivity: 'የቅርብ ጊዜ እንቅስቃሴ',
      systemStatus: 'የስርዓት ሁኔታ',
    },
    auth: {
      signIn: 'ግባ',
      signUp: 'ይመዝገቡ',
      signOut: 'ውጣ',
      createAccount: 'መለያዎን ይፍጠሩ',
      alreadyHaveAccount: 'ቀድሞውኑ መለያ አለዎት?',
      dontHaveAccount: 'መለያ የለዎትም?',
      fullName: 'ሙሉ ስም',
      phoneNumber: 'ስልክ ቁጥር',
      emailAddress: 'የኢሜይል አድራሻ',
      enterPassword: 'የይለፍ ቃል ያስገቡ',
      forgotPassword: 'የይለፍ ቃልዎን ረስተዋል?',
    },
    business: {
      name: 'አፋሚያ ካፌ እና ሬስቶራንት',
      brand: 'ከድር',
      license: 'ፈቃድ ቁጥር: 133469',
      location: 'ሱቅ 64-65፣ ራሺዲያ 1፣ አጅማን፣ ዩኤኢ',
      phone: '+971 56 640 7830',
      owner: 'ከድር አህመድ ኢብራሂም',
      manager: 'ፋይዛ ይማም ኑሪ',
    },
  },
};
