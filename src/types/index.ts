import { LucideIcon } from 'lucide-react';

export interface Employee {
  id: string;
  name: string;
  avatar: string;
  department: string;
  position: { x: number; y: number };
  laptopHours: number;
  isDarkMode: boolean;
  awePoints: number;
  email: string;
  role: 'admin' | 'manager' | 'employee';
  managerId?: string;
  joinDate: string;
  performanceScore: number;
  energyScore: number;
}

export interface Zone {
  id: string;
  name: string;
  isActive: boolean;
  employees: string[];
  energyConsumption: number;
  co2Emissions: number;
}

export interface EnergyData {
  timestamp: string;
  totalConsumption: number;
  co2Emissions: number;
  savingsPercentage: number;
  breakdown: {
    lighting: number;
    ac: number;
    laptops: number;
    other: number;
  };
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  points: number;
  isCompleted: boolean;
  icon: string;
}

export interface AnalyticsData {
  date: string;
  actualConsumption: number;
  predictedConsumption: number;
  co2Emissions: number;
  predictedEmissions: number;
  costSavings: number;
  predictedSavings: number;
}

export type TimeRange = 'day' | 'week' | 'month' | 'year';

export interface WeeklyChallenge {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  points: number;
  participants: number;
  completedBy: string[];
  type: 'individual' | 'team';
  category: 'energy' | 'lighting' | 'equipment' | 'behavior';
  progress: number;
  status: 'active' | 'upcoming' | 'completed';
  energySaved: number;
  co2Reduced: number;
}

export interface EcoBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'energy' | 'sustainability' | 'innovation' | 'teamwork';
  level: 'bronze' | 'silver' | 'gold' | 'platinum';
  pointsRequired: number;
  unlockedBy: string[];
  dateCreated: string;
}

export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  type: 'vr' | 'interactive' | 'video';
  duration: number; // in minutes
  category: 'energy' | 'sustainability' | 'safety' | 'equipment';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  completedBy: string[];
  thumbnail: string;
  points: number;
  skills: string[];
  prerequisites?: string[];
  status: 'available' | 'locked' | 'completed';
}