import { ADMIN, SUPER_ADMIN, MEMBRE } from './Roles';

export const MetaMenu = [
  {
    key: 1,
    label: 'Utilisateurs',
    link: '/',
    allowedRoles: [ADMIN, SUPER_ADMIN],
  },
  {
    key: 2,
    label: 'Articles',
    link: '/articles',
    allowedRoles: [ADMIN, SUPER_ADMIN],
  },
  {
    key: 3,
    label: 'Offres',
    link: '#',
    allowedRoles: [MEMBRE, ADMIN, SUPER_ADMIN],
  },
  {
    key: 4,
    label: 'Commandes',
    link: '#',
    allowedRoles: [MEMBRE, ADMIN, SUPER_ADMIN],
  },
];
