import { Review } from '../types';

export const mockReviews: Review[] = [
  {
    id: 'rv-01',
    userName: 'Quang Hưng Nguyễn',
    userAvatar: 'https://i.pravatar.cc/80?img=12',
    rating: 5,
    comment: 'Quán không gian thoải mái, đồ uống ổn và phục vụ thân thiện. Mình sẽ quay lại nhiều lần nữa.',
    images: [
      'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/245535/pexels-photo-245535.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1813466/pexels-photo-1813466.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/942802/pexels-photo-942802.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    date: '2025-03-12'
  },
  {
    id: 'rv-02',
    userName: 'Minh Châu',
    userAvatar: 'https://i.pravatar.cc/80?img=32',
    rating: 4,
    comment: 'Mình thích không gian bên ngoài, buổi tối có đèn rất chill. Nước hơi ngọt so với khẩu vị của mình nhưng vẫn ổn.',
    images: [],
    date: '2025-04-02'
  },
  {
    id: 'rv-03',
    userName: 'Trà My',
    userAvatar: 'https://i.pravatar.cc/80?img=45',
    rating: 5,
    comment: 'Nhân viên rất nhiệt tình, cà phê ngon và có nhiều góc sống ảo. Rất thích món cold brew của quán!',
    images: [
      'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/185801/pexels-photo-185801.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    date: '2025-01-22'
  },
  {
    id: 'rv-04',
    userName: 'Tuấn Kiệt',
    userAvatar: 'https://i.pravatar.cc/80?img=18',
    rating: 4.5,
    comment: 'Giá ổn, menu đa dạng. Nếu quán mở thêm nhạc acoustic thì tuyệt vời!',
    images: [],
    date: '2024-12-18'
  }
];
