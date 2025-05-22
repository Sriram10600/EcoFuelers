export enum Department {
  Management = 'Management',
  IT = 'IT',
  Operations = 'Operations'
}

export type Role = 'admin' | 'manager' | 'employee';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  department: Department;
  isManager: boolean;
  avatar?: string;
  badges: string[];
  achievements: string[];
  energyScore: number;
  joinDate: string;
  permissions: {
    canViewAllData: boolean;
    canEditUsers: boolean;
    canManageRoles: boolean;
    canViewAnalytics: boolean;
    canExportData: boolean;
  };
  teamMembers?: string[];  // Only for managers
  managerId?: string;      // Only for non-managers
}

export type TimeRange = 'day' | 'week' | 'month';

export interface AnalyticsData {
  date: string;
  actualConsumption: number;
  predictedConsumption: number;
  co2Emissions: number;
  predictedEmissions: number;
  costSavings: number;
  predictedSavings: number;
} 