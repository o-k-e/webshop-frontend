export type NavLinkItem = {
    to: string;
    label: string;
    requireAuth?: boolean;
    guestOnly?: boolean;
    role?: 'user' | 'admin';
  };
  
  export const USER_NAV_LINKS: NavLinkItem[] = [
    { to: '/', label: 'Home' },
    { to: '/cart', label: 'Cart' },
    { to: '/profile', label: 'My Profile', requireAuth: true },
    { to: '/logout', label: 'Logout', requireAuth: true },
    { to: '/login', label: 'Login', guestOnly: true },
  ];
  
  export const ADMIN_NAV_LINKS: NavLinkItem[] = [
    { to: '/admin', label: 'Dashboard', requireAuth: true, role: 'admin' },
    { to: '/admin/products/create-product', label: 'New Product', requireAuth: true, role: 'admin'},
    { to: '/admin/products', label: 'Manage Products', requireAuth: true, role: 'admin'},
    { to: '/admin/users', label: 'Manage Users', requireAuth: true, role: 'admin'},
    { to: '/logout', label: 'Logout', requireAuth: true },
    { to: '/login', label: 'Login', guestOnly: true },
  ];