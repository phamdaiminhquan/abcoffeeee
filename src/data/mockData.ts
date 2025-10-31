import { MenuItem, Reward } from '../types';

export const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Cà phê đen đá',
    nameEn: 'Iced Black Coffee',
    description: 'Cà phê đen truyền thống với đá, đậm đà và thơm ngon',
    descriptionEn: 'Traditional black coffee with ice, rich and aromatic',
    price: 25000,
    category: 'coffee',
    image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg',
    rating: 4.5,
    reviewCount: 128,
    views: 1250,
    clicks: 89,
    orders: 45
  },
  {
    id: '2',
    name: 'Cà phê sữa đá',
    nameEn: 'Iced Milk Coffee',
    description: 'Cà phê đen pha với sữa đặc, ngọt ngào và béo ngậy',
    descriptionEn: 'Black coffee mixed with condensed milk, sweet and creamy',
    price: 30000,
    category: 'coffee',
    image: 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg',
    rating: 4.8,
    reviewCount: 203,
    views: 2100,
    clicks: 156,
    orders: 89
  },
  {
    id: '3',
    name: 'Cappuccino',
    nameEn: 'Cappuccino',
    description: 'Espresso với sữa nóng tạo bọt, thơm ngon và mịn màng',
    descriptionEn: 'Espresso with steamed milk foam, aromatic and smooth',
    price: 45000,
    category: 'coffee',
    image: 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg',
    rating: 4.6,
    reviewCount: 95,
    views: 890,
    clicks: 67,
    orders: 34
  },
  {
    id: '4',
    name: 'Trà đào cam sả',
    nameEn: 'Peach Orange Lemongrass Tea',
    description: 'Trà thảo mộc với đào, cam và sả, thanh mát và thơm ngon',
    descriptionEn: 'Herbal tea with peach, orange and lemongrass, refreshing and fragrant',
    price: 35000,
    category: 'tea',
    image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg',
    rating: 4.3,
    reviewCount: 67,
    views: 567,
    clicks: 43,
    orders: 28
  },
  {
    id: '5',
    name: 'Bánh croissant bơ',
    nameEn: 'Butter Croissant',
    description: 'Bánh croissant thơm ngon với lớp bơ mềm mại',
    descriptionEn: 'Delicious croissant with soft butter layers',
    price: 40000,
    category: 'pastry',
    image: 'https://images.pexels.com/photos/2135/food-france-morning-breakfast.jpg',
    rating: 4.4,
    reviewCount: 52,
    views: 445,
    clicks: 34,
    orders: 21
  },
  {
    id: '6',
    name: 'Bánh tiramisu',
    nameEn: 'Tiramisu Cake',
    description: 'Bánh tiramisu truyền thống với cà phê và mascarpone',
    descriptionEn: 'Traditional tiramisu cake with coffee and mascarpone',
    price: 55000,
    category: 'pastry',
    image: 'https://images.pexels.com/photos/4199098/pexels-photo-4199098.jpeg',
    rating: 4.7,
    reviewCount: 89,
    views: 678,
    clicks: 52,
    orders: 31
  }
];

export const rewards: Reward[] = [
  {
    id: '1',
    name: 'Cà phê đen miễn phí',
    nameEn: 'Free Black Coffee',
    description: 'Một ly cà phê đen bất kỳ',
    descriptionEn: 'Any black coffee drink',
    pointsRequired: 100,
    image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg',
    available: true
  },
  {
    id: '2',
    name: 'Bánh ngọt miễn phí',
    nameEn: 'Free Pastry',
    description: 'Một món bánh ngọt bất kỳ',
    descriptionEn: 'Any pastry item',
    pointsRequired: 200,
    image: 'https://images.pexels.com/photos/2135/food-france-morning-breakfast.jpg',
    available: true
  },
  {
    id: '3',
    name: 'Combo đặc biệt',
    nameEn: 'Special Combo',
    description: 'Cà phê + bánh ngọt',
    descriptionEn: 'Coffee + pastry combo',
    pointsRequired: 300,
    image: 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg',
    available: true
  }
];