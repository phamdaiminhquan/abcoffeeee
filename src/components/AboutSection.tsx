import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Heart, Users, Award } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function AboutSection() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Coffee,
      title: 'Cà phê chất lượng',
      titleEn: 'Quality Coffee',
      description: 'Hạt cà phê được chọn lọc kỹ càng từ những vùng trồng nổi tiếng',
      descriptionEn: 'Carefully selected coffee beans from renowned growing regions'
    },
    {
      icon: Heart,
      title: 'Pha chế tâm huyết',
      titleEn: 'Crafted with Passion',
      description: 'Mỗi ly cà phê được pha chế với tình yêu và sự tỉ mỉ',
      descriptionEn: 'Every cup is crafted with love and attention to detail'
    },
    {
      icon: Users,
      title: 'Không gian ấm cúng',
      titleEn: 'Cozy Atmosphere',
      description: 'Môi trường thân thiện, lý tưởng cho việc thư giãn và làm việc',
      descriptionEn: 'Friendly environment, perfect for relaxation and work'
    },
    {
      icon: Award,
      title: 'Dịch vụ tận tâm',
      titleEn: 'Dedicated Service',
      description: 'Đội ngũ nhân viên nhiệt tình, luôn sẵn sàng phục vụ',
      descriptionEn: 'Enthusiastic staff, always ready to serve'
    }
  ];

  return (
    <section className="py-12 md:py-20 px-4 bg-white dark:bg-black">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
            {t('about.title')}
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {t('about.description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group"
            >
              <div className="text-center p-4 md:p-6 bg-gray-50 dark:bg-gray-900 rounded-xl md:rounded-2xl hover:shadow-lg transition-all duration-300">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full mb-3 md:mb-4"
                >
                  <feature.icon className="h-6 w-6 md:h-8 md:w-8 text-amber-600" />
                </motion.div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2 md:mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Coffee Shop Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mt-8 md:mt-16 relative overflow-hidden rounded-2xl md:rounded-3xl"
        >
          <img
            src="https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Không gian quán cà phê"
            className="w-full h-48 md:h-64 lg:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}