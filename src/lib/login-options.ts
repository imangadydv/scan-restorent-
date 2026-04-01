import type { LucideIcon } from 'lucide-react';
import { Shield, User, ChefHat, Utensils } from 'lucide-react';

export type DemoLoginOption = {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  email: string;
  password: string;
  role: string;
};

export const demoLoginOptions: DemoLoginOption[] = [
  {
    title: 'Super Admin',
    description: 'Full platform access',
    icon: Shield,
    path: '/superadmin',
    email: 'superadmin@tap2menu.com',
    password: 'admin123',
    role: 'superadmin',
  },
  {
    title: 'Restaurant Manager',
    description: 'Manage restaurant operations',
    icon: User,
    path: '/dashboard',
    email: 'admin@spicegarden.com',
    password: 'admin123',
    role: 'admin',
  },
  {
    title: 'Kitchen Staff',
    description: 'View and manage orders',
    icon: ChefHat,
    path: '/kitchen',
    email: 'kitchen@spicegarden.com',
    password: 'admin123',
    role: 'kitchen',
  },
  {
    title: 'Waiter',
    description: 'Take and serve orders',
    icon: Utensils,
    path: '/waiter',
    email: 'waiter1@spicegarden.com',
    password: 'admin123',
    role: 'waiter',
  },
];
