import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Eye, MousePointer, Package, AlertCircle, Loader2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { MenuItem, Product, Category } from '../types';
import { getCategories, getProducts, buildImageUrl, filterActiveProducts, ApiError } from '../services/api';

interface MenuSectionProps {
  onOrderClick: (item: MenuItem) => void;
}

export function MenuSection({ onOrderClick }: MenuSectionProps) {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<number | 'all'>('all');
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [productsLoading, setProductsLoading] = useState(false);

  // Fetch categories on mount
  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);
        setError(null);
        const apiCategories = await getCategories();
        setCategories(apiCategories);
      } catch (err) {
        console.error('Error fetching categories:', err);
        const apiError = err as ApiError;
        setError(apiError.message || 'Failed to load categories');
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  // Fetch products when category changes
  useEffect(() => {
    async function fetchProducts() {
      try {
        setProductsLoading(true);
        setError(null);
        const params = selectedCategory !== 'all' ? { categoryId: selectedCategory as number } : undefined;
        const apiProducts = await getProducts(params);
        // Filter to show only active products as per API documentation
        const activeProducts = filterActiveProducts(apiProducts);
        setProducts(activeProducts);
      } catch (err) {
        console.error('Error fetching products:', err);
        const apiError = err as ApiError;
        setError(apiError.message || 'Failed to load products');
      } finally {
        setProductsLoading(false);
      }
    }
    fetchProducts();
  }, [selectedCategory]);

  // Convert Product to MenuItem for backward compatibility with existing components
  const convertToMenuItem = (product: Product): MenuItem => {
    return {
      id: String(product.id),
      name: product.name,
      nameEn: product.name, // Backend doesn't have separate English names yet
      description: product.description || '',
      descriptionEn: product.description || '',
      price: Number(product.price), // Cast to number as per API docs
      category: product.category.name,
      image: buildImageUrl(product.image),
      rating: 4.5, // Default values for fields not in backend
      reviewCount: 0,
      views: 0,
      clicks: 0,
      orders: 0,
    };
  };

  const menuItems = products.map(convertToMenuItem);

  const handleItemClick = (item: MenuItem) => {
    // Open order modal when clicking on card
    onOrderClick(item);
  };

  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('menu.title')}
          </h2>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 rounded-lg flex items-center gap-3"
          >
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-red-800 dark:text-red-200 font-medium">
                {error}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="text-sm text-red-600 dark:text-red-400 underline hover:no-underline mt-1"
              >
                {language === 'vi' ? 'Thử lại' : 'Try again'}
              </button>
            </div>
          </motion.div>
        )}

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <div className="flex gap-2 md:gap-3 p-1.5 md:p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-x-auto scrollbar-hide">
            <div className="flex gap-2 md:gap-3 min-w-max px-2">
              {/* All categories button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory('all')}
                className={`px-3 md:px-5 py-1.5 md:py-2 rounded-full transition-all whitespace-nowrap text-sm md:text-base font-medium ${
                  selectedCategory === 'all'
                    ? 'bg-amber-600 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-amber-100 dark:hover:bg-amber-900/30'
                }`}
                disabled={loading}
              >
                {language === 'vi' ? 'Tất cả' : 'All'}
              </motion.button>

              {/* Category buttons */}
              {loading ? (
                <div className="px-5 py-2 text-gray-500 dark:text-gray-400 flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">{language === 'vi' ? 'Đang tải...' : 'Loading...'}</span>
                </div>
              ) : (
                categories.map((category) => (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-3 md:px-5 py-1.5 md:py-2 rounded-full transition-all whitespace-nowrap text-sm md:text-base font-medium ${
                      selectedCategory === category.id
                        ? 'bg-amber-600 text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-amber-100 dark:hover:bg-amber-900/30'
                    }`}
                  >
                    {category.name}
                  </motion.button>
                ))
              )}
            </div>
          </div>
        </motion.div>

        {/* Loading State for Products */}
        {productsLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-12 w-12 text-amber-600 animate-spin" />
              <p className="text-gray-600 dark:text-gray-400">
                {language === 'vi' ? 'Đang tải sản phẩm...' : 'Loading products...'}
              </p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!productsLoading && !error && menuItems.length === 0 && (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-xl text-gray-600 dark:text-gray-400">
                {language === 'vi' ? 'Không có sản phẩm nào' : 'No products available'}
              </p>
            </div>
          </div>
        )}

        {/* Menu Items Grid */}
        {!productsLoading && menuItems.length > 0 && (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8"
          >
            {menuItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group"
            >
              <div
                className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => handleItemClick(item)}
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    src={item.image}
                    alt={language === 'vi' ? item.name : item.nameEn}
                    className="w-full h-40 md:h-48 object-cover"
                  />
                  <div className="absolute top-2 md:top-4 right-2 md:right-4 bg-black/20 backdrop-blur-sm rounded-full p-1.5 md:p-2">
                    <div className="flex items-center gap-1 text-white text-sm">
                      <Star className="h-3 w-3 md:h-4 md:w-4 fill-yellow-400 text-yellow-400" />
                      <span>{item.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
                    {language === 'vi' ? item.name : item.nameEn}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3 md:mb-4 text-sm leading-relaxed line-clamp-2">
                    {language === 'vi' ? item.description : item.descriptionEn}
                  </p>

                  {/* Analytics */}
                  <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      <span>{item.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MousePointer className="h-3 w-3" />
                      <span>{item.clicks}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Package className="h-3 w-3" />
                      <span>{item.orders}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <span className="text-lg md:text-xl font-bold text-amber-600">
                        {item.price.toLocaleString('vi-VN')}₫
                      </span>
                      <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                        {item.reviewCount} {t('menu.reviews')}
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onOrderClick(item);
                      }}
                      className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span className="hidden sm:inline">{t('menu.order')}</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}