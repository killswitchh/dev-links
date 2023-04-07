import type { Route } from './types';

export const routes: Route[] = [
  { name: 'Home', path: '/#home', id: 1, active: true, position: 'left' },
  { name: 'Features', path: '/#features', id: 2, active: false, position: 'left' },
  { name: 'Pricing', path: '/#pricing', id: 3, active: false, position: 'left' },
  { name: 'Login / Sign Up', path: '/login', id: 4, active: false, position: 'right' },
];

export const routesLoggedIn: Route[] = [
  { name: 'Links', path: '/admin/links', id: 1, active: true, position: 'left' },
  { name: 'Profile', path: '/admin/profile', id: 3, active: false, position: 'right' },
];
