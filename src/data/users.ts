import { User } from '../types';

export interface AuthUser {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'manager' | 'employee';
  department: string;
  avatar: string;
}

export const users: AuthUser[] = [
  {
    id: 'admin1',
    email: 'admin@ecofuelers.com',
    password: 'admin123', // In production, use hashed passwords
    name: 'John Anderson',
    role: 'admin',
    department: 'Executive',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: 'mgr1',
    email: 'manager@ecofuelers.com',
    password: 'manager123',
    name: 'Sarah Williams',
    role: 'manager',
    department: 'Engineering',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: 'emp1',
    email: 'employee@ecofuelers.com',
    password: 'employee123',
    name: 'Alex Johnson',
    role: 'employee',
    department: 'Engineering',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150'
  }
];