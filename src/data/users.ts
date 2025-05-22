export interface AuthUser {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'manager' | 'employee';
  department: string;
  avatar: string;
  joinDate: string;
  performanceScore: number;
  energyScore: number;
  laptopHours: number;
  awePoints: number;
  position: { x: number; y: number };
  isDarkMode: boolean;
  managerId?: string;
}

export const users: AuthUser[] = [
  {
    id: 'admin1',
    email: 'admin@ecofuelers.com',
    password: 'admin123', // In production, use hashed passwords
    name: 'John Anderson',
    role: 'admin',
    department: 'Executive',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    joinDate: '2023-01-01',
    performanceScore: 95,
    energyScore: 92,
    laptopHours: 6.5,
    awePoints: 850,
    position: { x: 90, y: 10 },
    isDarkMode: true
  },
  {
    id: 'mgr1',
    email: 'manager@ecofuelers.com',
    password: 'manager123',
    name: 'Sarah Williams',
    role: 'manager',
    department: 'Engineering',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    joinDate: '2023-02-15',
    performanceScore: 88,
    energyScore: 85,
    laptopHours: 8.1,
    awePoints: 510,
    position: { x: 25, y: 40 },
    isDarkMode: true
  },
  {
    id: 'emp1',
    email: 'employee@ecofuelers.com',
    password: 'employee123',
    name: 'Alex Johnson',
    role: 'employee',
    department: 'Engineering',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
    joinDate: '2023-03-01',
    performanceScore: 82,
    energyScore: 78,
    laptopHours: 7.2,
    awePoints: 320,
    position: { x: 30, y: 45 },
    isDarkMode: false,
    managerId: 'mgr1'
  }
];