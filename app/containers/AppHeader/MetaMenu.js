import { ADMIN, SUPER_ADMIN, MEMBRE } from './Roles';

export const MetaMenu = [
  {
    key: 0,
    label: 'Accueil',
    link: '/',
    allowedRoles: [MEMBRE, ADMIN, SUPER_ADMIN],
  },
  {
    key: 6,
    label: 'Statistiques',
    link: '/statistiques',
    allowedRoles: [MEMBRE, ADMIN, SUPER_ADMIN],
  },
  {
    key: 7,
    label: 'Reporting',
    link: '/reporting',
    allowedRoles: [ADMIN, SUPER_ADMIN],
  },
  {
    key: 1,
    label: 'Utilisateurs',
    link: '/users',
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
    link: '/offres',
    allowedRoles: [MEMBRE, ADMIN, SUPER_ADMIN],
  },
  { key: 4, label: 'Mes Commandes', link: '/commands', allowedRoles: [MEMBRE] },
  {
    key: 5,
    label: 'Mes Commandes Groupés',
    link: '/commands',
    allowedRoles: [ADMIN, SUPER_ADMIN],
  },
];
