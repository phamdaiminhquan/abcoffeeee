import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { rewards } from '../data/mockData';
import { useState } from 'react';

export function RewardsSection() {
  const { language, t } = useLanguage();
  const { user, updateUserPoints } = useAuth();
  const [isRedeeming, setIsRedeeming] = useState<string | null>(null);

  const handleRedeem = (rewardId: string, pointsRequired: number) => {
    if (!user || user.points < pointsRequired || isRedeeming) return;
    
    setIsRedeeming(rewardId);
    
    // Simulate API call delay
    setTimeout(() => {
      // Deduct points from user
      const newPoints = user.points - pointsRequired;
      updateUserPoints(newPoints);
      
      // Show success message
      alert(`${language === 'vi' ? 'Đổi thưởng thành công!' : 'Reward redeemed successfully!'}\n${language === 'vi' ? `Điểm còn lại: ${newPoints}` : `Remaining points: ${newPoints}`}`);
      
      setIsRedeeming(null);
    }, 1000);
  };

  return (
    <section className="py-12 md:py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('rewards.title')}
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400">
            {t('points.earn')}
          </p>
        </motion.div>

        {user && (
          <div className="text-center mb-8 md:mb-12 stable-layout">
            <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-8 py-3 md:py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full shadow-lg user-info-stable">
              <Star className="h-5 w-5 md:h-6 md:w-6 fill-current" />
              <span className="text-lg md:text-xl font-bold stable-text points-display">
                {t('points.your')}: {user.points}
              </span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {rewards.map((reward, index) => (
            <motion.div
              key={reward.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="relative overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    src={reward.image}
                    alt={language === 'vi' ? reward.name : reward.nameEn}
                    className="w-full h-40 md:h-48 object-cover"
                  />
                  <div className="absolute top-2 md:top-4 right-2 md:right-4 bg-black/20 backdrop-blur-sm rounded-full px-2 md:px-3 py-1">
                    <span className="text-white text-sm font-semibold">
                      {reward.pointsRequired} {t('rewards.required')}
                    </span>
                  </div>
                </div>

                <div className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {language === 'vi' ? reward.name : reward.nameEn}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 md:mb-6 text-sm">
                    {language === 'vi' ? reward.description : reward.descriptionEn}
                  </p>

                  {user ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleRedeem(reward.id, reward.pointsRequired)}
                      disabled={user.points < reward.pointsRequired || isRedeeming === reward.id}
                      className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-colors ${
                        user.points >= reward.pointsRequired && isRedeeming !== reward.id
                          ? 'bg-amber-600 text-white hover:bg-amber-700'
                          : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      } text-sm md:text-base`}
                    >
                      <Gift className="h-4 w-4" />
                      {isRedeeming === reward.id 
                        ? (language === 'vi' ? 'Đang đổi...' : 'Redeeming...')
                        : t('rewards.redeem')
                      }
                    </motion.button>
                  ) : (
                    <div className="text-center text-gray-500 dark:text-gray-400 text-sm py-3">
                      {language === 'vi' ? 'Đăng nhập để đổi thưởng' : 'Login to redeem rewards'}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}