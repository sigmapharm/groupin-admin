import { ADMIN, SUPER_ADMIN, MEMBRE } from './Roles';

export const MetaMenu = [
  {
    key: 0,
    label: 'tableau de bord',
    link: '/dashboard',
    allowedRoles: [MEMBRE, ADMIN, SUPER_ADMIN],
  },
  {
    key: 1,
    label: 'Utilisateurs',
    link: '/users',
    allowedRoles: [ADMIN, SUPER_ADMIN],
  },

  {
    key: 3,
    label: 'Offres',
    link: '/offres',
    allowedRoles: [MEMBRE, ADMIN, SUPER_ADMIN],
  },
  {
    key: 5,
    label: 'Commandes Groupés',
    link: '/commands',
    allowedRoles: [ADMIN, SUPER_ADMIN],
  },
  {
    key: 6,
    label: 'Statistiques',
    link: '/statistiques',
    allowedRoles: [SUPER_ADMIN],
  },
  {
    key: 7,
    label: 'Reporting',
    link: '/reporting',
    allowedRoles: [ADMIN, SUPER_ADMIN],
  },

  { key: 4, label: 'Mes Commandes', link: '/commands', allowedRoles: [MEMBRE] },
];

export const dropDownMenuList = [
  {
    key: 2,
    label: 'Articles',
    link: '/articles',
    allowedRoles: [ADMIN, SUPER_ADMIN],
  },
  {
    key: 8,
    label: 'Pharmacies',
    link: '/pharmacies',
    allowedRoles: [ADMIN, SUPER_ADMIN],
  },
  {
    key: 10,
    label: 'Laboratoires',
    link: '/laboratoires',
    allowedRoles: [ADMIN, SUPER_ADMIN],
  },
  {
    key: 9,
    label: 'Grossistes',
    link: '/provider',
    allowedRoles: [ADMIN, SUPER_ADMIN],
  },
  {
    key: 11,
    label: 'Alert',
    link: '/alerts',
    allowedRoles: [ADMIN, SUPER_ADMIN],
  },
  {
    key: 12,
    label: 'Ads',
    link: '/ads',
    allowedRoles: [ADMIN, SUPER_ADMIN],
  },
  {
    key: 13,
    label: 'pharmacie analytique',
    link: '/pharmacies/analytics',
    allowedRoles: [ADMIN, SUPER_ADMIN],
  },
  {
    key: 14,
    label: 'labos analytique',
    link: '/labos/analytics',
    allowedRoles: [ADMIN, SUPER_ADMIN],
  },
];

export const mobileMenu = [
  {
    key: 0,
    label: 'Dashboard',
    link: '/dashboard',
    allowedRoles: [MEMBRE, ADMIN, SUPER_ADMIN],
  },
  {
    key: 1,
    label: 'Utilisateurs',
    link: '/users',
    allowedRoles: [ADMIN, SUPER_ADMIN],
  },

  {
    key: 3,
    label: 'Offres',
    link: '/offres',
    allowedRoles: [MEMBRE, ADMIN, SUPER_ADMIN],
  },
  {
    key: 5,
    label: 'Commandes Groupés',
    link: '/commands',
    allowedRoles: [ADMIN, SUPER_ADMIN],
  },
  {
    key: 6,
    label: 'Statistiques',
    link: '/statistiques',
    allowedRoles: [SUPER_ADMIN],
  },
  {
    key: 7,
    label: 'Reporting',
    link: '/reporting',
    allowedRoles: [ADMIN, SUPER_ADMIN],
  },

  { key: 4, label: 'Mes Commandes', link: '/commands', allowedRoles: [MEMBRE] },
  {
    key: 2,
    label: 'Articles',
    link: '/articles',
    allowedRoles: [ADMIN, SUPER_ADMIN],
  },
  {
    key: 8,
    label: 'Pharmacies',
    link: '/pharmacies',
    allowedRoles: [ADMIN, SUPER_ADMIN],
  },
  {
    key: 10,
    label: 'Laboratoires',
    link: '/laboratoires',
    allowedRoles: [ADMIN, SUPER_ADMIN],
  },
  {
    key: 9,
    label: 'Grossistes',
    link: '/provider',
    allowedRoles: [ADMIN, SUPER_ADMIN],
  },
];
