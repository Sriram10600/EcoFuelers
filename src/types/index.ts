import { LucideIcon } from 'lucide-react';

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  role: 'admin' | 'manager' | 'employee';
  managerId?: string;
  position: { x: number; y: number };
  laptopHours: number;
  awePoints: number;
  performanceScore: number;
  energyScore: number;
  badges: string[];
  achievements: string[];
  avatar?: string;
  joinDate?: string;
}

export enum Department {
  Management = 'Management',
  IT = 'IT',
  Operations = 'Operations',
  Design = 'Design',
  Finance = 'Finance',
  Marketing = 'Marketing',
  Executive = 'Executive'
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
  duration: number;
  category: 'energy' | 'sustainability' | 'safety' | 'equipment';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  completedBy: string[];
  points: number;
  skills: string[];
  prerequisites?: string[];
  status: 'available' | 'locked' | 'completed';
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  timeTaken: number;
  correctAnswers: number;
  incorrectAnswers: number;
}

export interface QuizAttempt {
  questionId: string;
  selectedAnswer: number;
  isCorrect: boolean;
  timeTaken: number;
}

export interface AuthUser extends Omit<User, 'password'> {
  awePoints: number;
  performanceScore: number;
  position: { x: number; y: number };
  laptopHours: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'manager' | 'employee';
  department: string;
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
  teamMembers?: string[];
  managerId?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface EmissionDataValidation {
  minConsumption: number;
  maxConsumption: number;
  minEmissions: number;
  maxEmissions: number;
}

export interface CreditTransaction {
  id: string;
  userId: string;
  amount: number;
  type: 'award' | 'conversion';
  status: 'pending' | 'completed' | 'failed';
  timestamp: string;
  reason?: string;
  retryCount: number;
}

export interface GamePreventionRules {
  minTimeBetweenActions: number; // in milliseconds
  maxActionsPerHour: number;
  cooldownPeriod: number; // in milliseconds
  suspiciousPatternThreshold: number;
}