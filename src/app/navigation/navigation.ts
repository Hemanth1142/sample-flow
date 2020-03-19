import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
  {
    id: 'applications',
    title: 'Navigation',
    type: 'group',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        icon: 'dashboard',
        exactMatch: true,
        url: '/'
      },
      {
        id: 'users',
        title: 'Users',
        type: 'item',
        icon: 'person',
        url: 'user'
      },
      {
        id: 'category',
        title: 'Categories',
        type: 'item',
        icon: 'list',
        url: '/category'
      },
      {
        id: 'pages',
        title: 'CMS Pages',
        type: 'item',
        icon: 'view_quilt',
        url: '/pages'
      },
      {
        id: 'reported-videos',
        title: 'Reported Videos',
        type: 'item',
        icon: 'report',
        url: '/reported-videos'
      },
      {
        id: 'reported-users',
        title: 'Reported Users',
        type: 'item',
        icon: 'report',
        url: '/reported-users'
      }
    ]
  }
];
