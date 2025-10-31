import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  language: 'vi' | 'en';
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  vi: {
    // Navigation
    'nav.home': 'Trang chủ',
    'nav.menu': 'Thực đơn',
    'nav.about': 'Về chúng tôi',
    'nav.contact': 'Liên hệ',
    'nav.rewards': 'Đổi thưởng',
    'nav.login': 'Đăng nhập',
    'nav.logout': 'Đăng xuất',
    'nav.signup': 'Đăng ký',
    'demo.switchUser': 'Chuyển người dùng',
    'demo.selectRole': 'Chọn vai trò demo',
    'role.customer': 'Khách hàng',
    'role.staff': 'Nhân viên',
    'role.admin': 'Quản lý',
    
    // Hero Section
    'hero.title': 'Chào mừng đến với Cà Phê Sáng',
    'hero.subtitle': 'Thưởng thức hương vị cà phê đậm đà trong không gian hiện đại',
    'hero.cta': 'Khám phá thực đơn',
    
    // About Section
    'about.title': 'Về Cà Phê Sáng',
    'about.description': 'Chúng tôi là một quán cà phê nhỏ với tình yêu lớn dành cho cà phê. Mỗi tách cà phê được pha chế với tâm huyết và sự chăm sóc tỉ mỉ.',
    
    // Menu Section
    'menu.title': 'Thực đơn',
    'menu.categories.coffee': 'Cà phê',
    'menu.categories.tea': 'Trà',
    'menu.categories.pastry': 'Bánh ngọt',
    'menu.order': 'Đặt món',
    'menu.reviews': 'đánh giá',
    
    // Order
    'order.title': 'Đặt món',
    'order.quantity': 'Số lượng',
    'order.notes': 'Ghi chú',
    'order.total': 'Tổng cộng',
    'order.submit': 'Gửi đơn',
    'order.success': 'Đặt món thành công!',
    
    // Points
    'points.your': 'Điểm của bạn',
    'points.earn': 'Tích điểm mỗi đơn hàng',
    
    // Rewards
    'rewards.title': 'Đổi thưởng',
    'rewards.required': 'điểm',
    'rewards.redeem': 'Đổi thưởng',
    
    // Status
    'status.inStore': 'Đang ở tiệm',
    'status.online': 'Trực tuyến'
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.menu': 'Menu',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.rewards': 'Rewards',
    'nav.login': 'Login',
    'nav.logout': 'Logout',
    'nav.signup': 'Sign Up',
    'demo.switchUser': 'Switch User',
    'demo.selectRole': 'Select Demo Role',
    'role.customer': 'Customer',
    'role.staff': 'Staff',
    'role.admin': 'Admin',
    
    // Hero Section
    'hero.title': 'Welcome to Café Sáng',
    'hero.subtitle': 'Experience rich coffee flavors in a modern space',
    'hero.cta': 'Explore Menu',
    
    // About Section
    'about.title': 'About Café Sáng',
    'about.description': 'We are a small coffee shop with a big love for coffee. Each cup is crafted with passion and meticulous care.',
    
    // Menu Section
    'menu.title': 'Menu',
    'menu.categories.coffee': 'Coffee',
    'menu.categories.tea': 'Tea',
    'menu.categories.pastry': 'Pastry',
    'menu.order': 'Order',
    'menu.reviews': 'reviews',
    
    // Order
    'order.title': 'Place Order',
    'order.quantity': 'Quantity',
    'order.notes': 'Notes',
    'order.total': 'Total',
    'order.submit': 'Submit Order',
    'order.success': 'Order placed successfully!',
    
    // Points
    'points.your': 'Your Points',
    'points.earn': 'Earn points on every order',
    
    // Rewards
    'rewards.title': 'Rewards',
    'rewards.required': 'points',
    'rewards.redeem': 'Redeem',
    
    // Status
    'status.inStore': 'In Store',
    'status.online': 'Online'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<'vi' | 'en'>('vi');

  useEffect(() => {
    const saved = localStorage.getItem('language');
    if (saved && (saved === 'vi' || saved === 'en')) {
      setLanguage(saved as 'vi' | 'en');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(language === 'vi' ? 'en' : 'vi');
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.vi] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}