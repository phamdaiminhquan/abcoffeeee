import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, Bike } from 'lucide-react';


export function ContactSection() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Cảm ơn bạn đã liên hệ!');
    setFormData({ name: '', email: '', message: '' });
  };

  const openingHours = '6:00 - 22:00';

  const computeOpenStatus = (): { text: string; colorClass: string } => {
    const now = new Date();
    const minutes = now.getHours() * 60 + now.getMinutes();
    const OPEN_START = 6 * 60;   // 06:00
    const NEAR_CLOSE = 21 * 60;  // 21:00
    const OPEN_END = 22 * 60;    // 22:00
    if (minutes >= OPEN_START && minutes < NEAR_CLOSE) {
      return { text: 'Mở cửa', colorClass: 'text-green-500' };
    }
    if (minutes >= NEAR_CLOSE && minutes < OPEN_END) {
      return { text: 'Sắp đóng cửa', colorClass: 'text-yellow-500' };
    }
    return { text: 'Đã đóng cửa', colorClass: 'text-red-500' };
  };

  const [openStatus, setOpenStatus] = useState<{ text: string; colorClass: string }>(() => computeOpenStatus());

  useEffect(() => {
    const id = setInterval(() => {
      setOpenStatus(computeOpenStatus());
    }, 60 * 1000);
    return () => clearInterval(id);
  }, []);

  const contactInfo = [
    { icon: Phone, title: 'Điện thoại', value: '(+84) 774 707 972' },
    { icon: Mail, title: 'Email', value: 'hello@gmail.com' },
    {
      icon: Clock, title: 'Giờ mở cửa', value: (
        <span>
          <span className={openStatus.colorClass}>{openStatus.text}</span>
          <span className="ml-2 text-gray-600 dark:text-gray-400">({openingHours})</span>
        </span>
      )
    },
    { icon: MapPin, title: 'Địa chỉ', value: 'ấp Dốc Mơ (ngã tư đường Đại Lộ, phía sau nhà thờ Dốc Mơ), xã Thống Nhất, tỉnh Đồng Nai' },
  ];

  return (
    <section className="section-wrap bg-white dark:bg-black">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-gray-900 dark:text-white mb-4 md:mb-6">
            Liên hệ với chúng tôi
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400">
            Chúng tôi luôn sẵn sàng lắng nghe ý kiến của bạn
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-xl md:text-2xl font-bold font-display text-gray-900 dark:text-white mb-6 md:mb-8">
              Thông tin liên hệ
            </h3>

            <div className="space-y-4 md:space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-gray-50 dark:bg-gray-900 rounded-lg"
                >
                  <div className="flex-shrink-0">
                    <info.icon className="h-5 w-5 md:h-6 md:w-6 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm md:text-base">
                      {info.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                      {info.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Embedded Google Map */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative mt-6 md:mt-8 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden"
            >
              <div className="h-48 md:h-64">
                <iframe
                  title="Bản đồ AB Coffee"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d692.2068757361234!2d107.16544721710066!3d11.060100459256905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174f1f6b020b207%3A0xfd646183c56967cd!2sAB%20Coffee!5e0!3m2!1svi!2s!4v1761963792284!5m2!1svi!2s"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full border-0"
                />
              </div>

              <div className="p-4 md:p-5 bg-white relative dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
                <a
                  href="https://maps.app.goo.gl/LCCSgcGf8A2GD4nQ8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm md:text-base min-h-[44px] btn-shine focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900"
                  aria-label="Mở Google Maps dẫn đường tới AB Coffee"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-4 w-4"
                    aria-hidden={true}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 10.5C21 16.5 12 22.5 12 22.5C12 22.5 3 16.5 3 10.5C3 7.18629 5.68629 4.5 9 4.5C10.7083 4.5 12.2917 5.24632 13.5 6.46373C14.7083 5.24632 16.2917 4.5 18 4.5C21.3137 4.5 24 7.18629 24 10.5C24 16.5 15 22.5 15 22.5C15 22.5 6 16.5 6 10.5"
                    />
                  </svg>
                  Xem đường đi
                </a>

                {/* Decorative bike illustration */}
                <div
                  className="pointer-events-none absolute top-7 right-7 md:right-4 flex items-center gap-2 z-10"
                  aria-hidden="true"
                >
                  <div className="flex gap-1">
                    <motion.span
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: [0, 1, 0], x: [8, 0, -8] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
                      className="block h-0.5 w-4 md:w-6 bg-amber-500 rounded"
                    />
                    <motion.span
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: [0, 1, 0], x: [8, 0, -8] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.25 }}
                      className="block h-0.5 w-3 md:w-5 bg-amber-500/80 rounded"
                    />
                    <motion.span
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: [0, 1, 0], x: [8, 0, -8] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                      className="block h-0.5 w-2 md:w-4 bg-amber-500/60 rounded"
                    />
                  </div>
                  <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: [0, -6, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                    className="text-amber-600"
                  >
                    <Bike className="h-6 w-6 md:h-8 md:w-8" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-xl md:text-2xl font-bold font-display text-gray-900 dark:text-white mb-6 md:mb-8">
              Gửi tin nhắn
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <motion.div
                whileFocus={{ scale: 1.02 }}
                className="transition-transform"
              >
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
                  Họ tên
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-gray-900 dark:text-white"
                  required
                />
              </motion.div>

              <motion.div
                whileFocus={{ scale: 1.02 }}
                className="transition-transform"
              >
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-gray-900 dark:text-white"
                  required
                />
              </motion.div>

              <motion.div
                whileFocus={{ scale: 1.02 }}
                className="transition-transform"
              >
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
                  Tin nhắn
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-gray-900 dark:text-white resize-none"
                  required
                />
              </motion.div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full flex items-center justify-center gap-2 px-4 md:px-6 py-3 text-white font-semibold rounded-lg text-sm md:text-base btn-premium min-h-[44px]"
              >
                <Send className="h-4 w-4" />
                Gửi tin nhắn
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}