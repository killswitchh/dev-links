import type { Route } from './types';

export const routes: Route[] = [
  { name: 'Home', path: '/admin', id: 1, active: true, position: 'left' },
  { name: 'Features', path: '/admin', id: 2, active: false, position: 'left' },
  { name: 'Pricing', path: '/admin', id: 3, active: false, position: 'left' },
  { name: 'Login / Sign Up', path: '/admin/login', id: 4, active: false, position: 'right' },
];

export const routesLoggedIn: Route[] = [
  { name: 'Links', path: '/admin/links', id: 1, active: true, position: 'left' },
  { name: 'Logout', path: '/admin/login', id: 3, active: false, position: 'right' },
];
