import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/home/dashboard',
    home: true,
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'User',
    icon: 'person-outline',
    link: '/home/user'
  },
  {
    title: 'Product',
    icon: 'globe-2-outline',
    children: [
      {
        title: 'product_list',
        link: '/home/product/product-list',
      },
      {
        title: 'add_category',
        link: '/home/product/add-categories'
      }
    ]
  },


];
