import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Lock, Mail, Phone, UserPlus, LogIn } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { login, register } = useAuth();
  const { language } = useLanguage();
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    email: 'demo@cafe.com',
    password: 'demo',
    fullName: '',
    phone: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = language === 'vi' ? 'Email là bắt buộc' : 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = language === 'vi' ? 'Email không hợp lệ' : 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = language === 'vi' ? 'Mật khẩu là bắt buộc' : 'Password is required';
    }

    if (isRegistering) {
      if (!formData.fullName) {
        newErrors.fullName = language === 'vi' ? 'Họ tên là bắt buộc' : 'Full name is required';
      }

      if (!formData.phone) {
        newErrors.phone = language === 'vi' ? 'Số điện thoại là bắt buộc' : 'Phone number is required';
      } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ''))) {
        newErrors.phone = language === 'vi' ? 'Số điện thoại không hợp lệ' : 'Invalid phone number';
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = language === 'vi' ? 'Mật khẩu không khớp' : 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      let success = false;
      
      if (isRegistering) {
        success = await register(formData.email, formData.password, formData.fullName, formData.phone);
        if (success) {
          alert(language === 'vi' ? 'Đăng ký thành công!' : 'Registration successful!');
        } else {
          alert(language === 'vi' ? 'Đăng ký thất bại!' : 'Registration failed!');
        }
      } else {
        success = await login(formData.email, formData.password);
        if (!success) {
          alert(language === 'vi' ? 'Đăng nhập thất bại!' : 'Login failed!');
        }
      }
      
      if (success) {
        onClose();
        resetForm();
      }
    } catch (error) {
      alert(language === 'vi' ? 'Có lỗi xảy ra!' : 'An error occurred!');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      email: 'demo@cafe.com',
      password: 'demo',
      fullName: '',
      phone: '',
      confirmPassword: ''
    });
    setErrors({});
    setIsRegistering(false);
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    setErrors({});
    if (!isRegistering) {
      // Switching to register mode, clear demo data
      setFormData({
        email: '',
        password: '',
        fullName: '',
        phone: '',
        confirmPassword: ''
      });
    } else {
      // Switching to login mode, restore demo data
      setFormData({
        email: 'demo@cafe.com',
        password: 'demo',
        fullName: '',
        phone: '',
        confirmPassword: ''
      });
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-md max-h-[90vh] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {isRegistering 
                  ? (language === 'vi' ? 'Đăng ký' : 'Sign Up')
                  : (language === 'vi' ? 'Đăng nhập' : 'Login')
                }
              </h2>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 max-h-[calc(90vh-8rem)] overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-4">
                {isRegistering && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {language === 'vi' ? 'Họ tên' : 'Full Name'}
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className={`w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-gray-900 dark:text-white ${
                          errors.fullName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        placeholder={language === 'vi' ? 'Nhập họ tên của bạn' : 'Enter your full name'}
                      />
                    </div>
                    {errors.fullName && (
                      <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                    )}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-gray-900 dark:text-white ${
                        errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder={language === 'vi' ? 'Nhập email của bạn' : 'Enter your email'}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {isRegistering && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {language === 'vi' ? 'Số điện thoại' : 'Phone Number'}
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-gray-900 dark:text-white ${
                          errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        placeholder={language === 'vi' ? 'Nhập số điện thoại' : 'Enter phone number'}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'vi' ? 'Mật khẩu' : 'Password'}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className={`w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-gray-900 dark:text-white ${
                        errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder={language === 'vi' ? 'Nhập mật khẩu' : 'Enter password'}
                    />
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                  )}
                </div>

                {isRegistering && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {language === 'vi' ? 'Xác nhận mật khẩu' : 'Confirm Password'}
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className={`w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-gray-900 dark:text-white ${
                          errors.confirmPassword ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        placeholder={language === 'vi' ? 'Nhập lại mật khẩu' : 'Confirm your password'}
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                    )}
                  </div>
                )}

                {!isRegistering && (
                  <div className="text-sm text-gray-600 dark:text-gray-400 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg space-y-2">
                    <div className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
                      {language === 'vi' ? 'Tài khoản Demo:' : 'Demo Accounts:'}
                    </div>
                    <div className="grid grid-cols-1 gap-2 text-xs">
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setFormData({ ...formData, email: 'demo@cafe.com', password: 'demo' });
                        }}
                        className="bg-white dark:bg-gray-700 p-2 rounded border-l-2 border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-left"
                      >
                        <div className="font-medium text-blue-600 dark:text-blue-400">
                          {language === 'vi' ? 'Khách hàng:' : 'Customer:'}
                        </div>
                        <div>demo@cafe.com / demo</div>
                      </motion.button>
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setFormData({ ...formData, email: 'staff@cafe.com', password: 'staff' });
                        }}
                        className="bg-white dark:bg-gray-700 p-2 rounded border-l-2 border-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors text-left"
                      >
                        <div className="font-medium text-green-600 dark:text-green-400">
                          {language === 'vi' ? 'Nhân viên:' : 'Staff:'}
                        </div>
                        <div>staff@cafe.com / staff</div>
                      </motion.button>
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setFormData({ ...formData, email: 'admin@cafe.com', password: 'admin' });
                        }}
                        className="bg-white dark:bg-gray-700 p-2 rounded border-l-2 border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors text-left"
                      >
                        <div className="font-medium text-purple-600 dark:text-purple-400">
                          {language === 'vi' ? 'Quản lý:' : 'Admin:'}
                        </div>
                        <div>admin@cafe.com / admin</div>
                      </motion.button>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 italic">
                      {language === 'vi' 
                        ? '💡 Nhấn vào tài khoản để điền tự động' 
                        : '💡 Click on account to auto-fill'
                      }
                    </div>
                  </div>
                )}

                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50"
                >
                  {isRegistering ? (
                    <UserPlus className="h-4 w-4" />
                  ) : (
                    <LogIn className="h-4 w-4" />
                  )}
                  {isLoading 
                    ? (language === 'vi' ? 'Đang xử lý...' : 'Processing...')
                    : isRegistering
                      ? (language === 'vi' ? 'Đăng ký' : 'Sign Up')
                      : (language === 'vi' ? 'Đăng nhập' : 'Login')
                  }
                </motion.button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={toggleMode}
                  className="text-amber-600 hover:text-amber-700 font-medium transition-colors"
                >
                  {isRegistering
                    ? (language === 'vi' ? 'Đã có tài khoản? Đăng nhập' : 'Already have an account? Login')
                    : (language === 'vi' ? 'Chưa có tài khoản? Đăng ký' : "Don't have an account? Sign Up")
                  }
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}