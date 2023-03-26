import type { Route } from './types'

export const routes: Route[] = [
  { name: 'Home', path: '/', id: 1, active: true, position: 'left' },
  { name: 'Features', path: '/', id: 2, active: false, position: 'left' },
  { name: 'Pricing', path: '/', id: 3, active: false, position: 'left' },
  { name: 'Login / Sign Up', path: '/login', id: 4, active: false, position: 'right' },
  { name: 'Create', path: '/admin', id: 5, active: false, position: 'left' },
]

export const routesLoggedIn: Route[] = [
  { name: 'Links', path: '/links', id: 1, active: true, position: 'left' },
  { name: 'Create', path: '/create', id: 2, active: false, position: 'left' },
  { name: 'Logout', path: '/login', id: 3, active: false, position: 'right' },
]
