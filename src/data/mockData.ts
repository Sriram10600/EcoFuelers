import { Employee, Zone, EnergyData, Achievement, TimeRange } from '../types';

// Generate dates for the past month
const generatePastDates = (days: number) => {
  const dates = [];
  const baseDate = new Date('2025-05-22'); // Fixed date for consistent data
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(baseDate);
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);
  }
  return dates;
};

const pastMonth = generatePastDates(30);

// Generate static energy data for the past month
const generateStaticEnergyData = (): EnergyData[] => {
  const seed = 42; // Use a fixed seed for consistent random numbers
  const random = (min: number, max: number) => {
    seed;
    return Number((min + (Math.random() * (max - min))).toFixed(2));
  };

  return pastMonth.map(date => ({
    timestamp: date,
    totalConsumption: random(100, 150),
    co2Emissions: random(40, 60),
    savingsPercentage: random(0, 15),
    breakdown: {
      lighting: random(30, 45),
      ac: random(40, 60),
      laptops: random(20, 30),
      other: random(10, 15)
    }
  }));
};

export const energyData: EnergyData[] = generateStaticEnergyData();

// Admin
export const admin: Employee = {
  id: 'admin1',
  name: 'John Anderson',
  avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
  department: 'Executive',
  position: { x: 90, y: 10 },
  laptopHours: 6.50,
  isDarkMode: true,
  awePoints: 850,
  email: 'john.anderson@ecofuelers.com',
  role: 'admin',
  joinDate: '2023-01-01',
  performanceScore: 95,
  energyScore: 92
};

// Managers
export const managers: Employee[] = [
  {
    id: 'mgr1',
    name: 'Sarah Williams',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    department: 'Engineering',
    position: { x: 25, y: 40 },
    laptopHours: 8.10,
    isDarkMode: true,
    awePoints: 510,
    email: 'sarah.williams@ecofuelers.com',
    role: 'manager',
    joinDate: '2023-02-15',
    performanceScore: 88,
    energyScore: 85
  },
  {
    id: 'mgr2',
    name: 'Michael Chen',
    avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=150',
    department: 'Design',
    position: { x: 35, y: 30 },
    laptopHours: 7.50,
    isDarkMode: false,
    awePoints: 480,
    email: 'michael.chen@ecofuelers.com',
    role: 'manager',
    joinDate: '2023-03-01',
    performanceScore: 92,
    energyScore: 88
  },
  {
    id: 'mgr3',
    name: 'Emily Rodriguez',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    department: 'Marketing',
    position: { x: 45, y: 60 },
    laptopHours: 7.20,
    isDarkMode: true,
    awePoints: 340,
    email: 'emily.rodriguez@ecofuelers.com',
    role: 'manager',
    joinDate: '2023-04-01',
    performanceScore: 90,
    energyScore: 87
  },
  {
    id: 'mgr4',
    name: 'David Kim',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    department: 'Product',
    position: { x: 50, y: 30 },
    laptopHours: 5.20,
    isDarkMode: true,
    awePoints: 280,
    email: 'david.kim@ecofuelers.com',
    role: 'manager',
    joinDate: '2023-05-01',
    performanceScore: 86,
    energyScore: 89
  },
  {
    id: 'mgr5',
    name: 'Lisa Thompson',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    department: 'Finance',
    position: { x: 30, y: 15 },
    laptopHours: 6.80,
    isDarkMode: false,
    awePoints: 450,
    email: 'lisa.thompson@ecofuelers.com',
    role: 'manager',
    joinDate: '2023-06-01',
    performanceScore: 91,
    energyScore: 86
  }
];

// Generate 10 employees for each manager with fixed laptop hours
export const employees: Employee[] = managers.flatMap(manager => 
  Array.from({ length: 10 }, (_, i) => ({
    id: `emp-${manager.id}-${i + 1}`,
    name: `Employee ${i + 1}`,
    avatar: `https://images.pexels.com/photos/${1000000 + i}/pexels-photo-${1000000 + i}.jpeg?auto=compress&cs=tinysrgb&w=150`,
    department: manager.department,
    position: { x: Math.random() * 100, y: Math.random() * 100 },
    laptopHours: Number((5 + Math.random() * 4).toFixed(2)),
    isDarkMode: Math.random() > 0.5,
    awePoints: Math.floor(Math.random() * 300) + 100,
    email: `employee${i + 1}.${manager.department.toLowerCase()}@ecofuelers.com`,
    role: 'employee' as const,
    managerId: manager.id,
    joinDate: `2023-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
    performanceScore: Math.floor(Math.random() * 30) + 70,
    energyScore: Math.floor(Math.random() * 30) + 70
  }))
);

// Combine all employees for the admin view
export const allEmployees = [admin, ...managers, ...employees];

// Helper function to get employees by manager ID
export const getEmployeesByManager = (managerId: string): Employee[] => {
  return employees.filter(emp => emp.managerId === managerId);
};

// Helper function to get user by ID
export const getUserById = (userId: string): Employee | undefined => {
  return allEmployees.find(emp => emp.id === userId);
};

export const zones: Zone[] = [
  {
    id: 'zone1',
    name: 'Engineering Zone',
    isActive: true,
    employees: ['1', '4'],
    energyConsumption: 42.50,
    co2Emissions: 18.30
  },
  {
    id: 'zone2',
    name: 'Design Zone',
    isActive: true,
    employees: ['2'],
    energyConsumption: 28.70,
    co2Emissions: 12.10
  },
  {
    id: 'zone3',
    name: 'Marketing Zone',
    isActive: true,
    employees: ['3'],
    energyConsumption: 31.20,
    co2Emissions: 13.50
  },
  {
    id: 'zone4',
    name: 'Product & Finance Zone',
    isActive: true,
    employees: ['5', '6'],
    energyConsumption: 36.90,
    co2Emissions: 15.80
  }
];

export const achievements: Achievement[] = [
  {
    id: 'a1',
    title: 'Energy Saver',
    description: 'Reduced energy consumption by 10%',
    points: 100,
    isCompleted: true,
    icon: 'Zap'
  },
  {
    id: 'a2',
    title: 'Dark Mode Master',
    description: 'Used dark mode for 30 days straight',
    points: 75,
    isCompleted: false,
    icon: 'Moon'
  },
  {
    id: 'a3',
    title: 'Collaboration Champion',
    description: 'Optimized seating proximity with 5+ colleagues',
    points: 150,
    isCompleted: true,
    icon: 'Users'
  },
  {
    id: 'a4',
    title: 'Carbon Crusher',
    description: 'Reduced CO2 emissions by 15%',
    points: 120,
    isCompleted: false,
    icon: 'Leaf'
  },
  {
    id: 'a5',
    title: 'First Steps',
    description: 'Complete your first week of energy monitoring',
    points: 50,
    isCompleted: true,
    icon: 'Footprints'
  },
  {
    id: 'a6',
    title: 'Optimization Guru',
    description: 'Followed 10 energy-saving recommendations',
    points: 100,
    isCompleted: false,
    icon: 'Lightbulb'
  }
];

export const getWeeklyEnergyData = (): EnergyData[] => {
  return energyData;
};

export const getDailyEnergyData = (): EnergyData => {
  return energyData[energyData.length - 1];
};

const allRecommendations = [
  'Consider moving closer to colleagues in your department to optimize AC usage',
  'Switch to dark mode to reduce screen energy consumption by up to 30%',
  'Adjust your laptop screen brightness to 70% for optimal energy savings',
  'Enable sleep mode after 5 minutes of inactivity',
  'Join the "Shared Space" initiative to reduce overall energy usage',
  'Use natural lighting when possible during daytime hours',
  'Participate in the office energy-saving challenge',
  'Update to energy-efficient equipment',
  'Optimize your workspace layout for better air circulation',
  'Schedule regular equipment maintenance',
  'Use power strips to eliminate phantom energy usage',
  'Implement a "Last Out, Lights Out" policy',
  'Share energy-saving tips with colleagues',
  'Monitor and report energy waste'
];

// Store completed recommendations in localStorage
const getCompletedRecommendations = () => {
  const stored = localStorage.getItem('completedRecommendations');
  return stored ? JSON.parse(stored) : {};
};

const saveCompletedRecommendations = (data: { [key: string]: number[] }) => {
  localStorage.setItem('completedRecommendations', JSON.stringify(data));
};

export const getEmployeeRecommendations = (employeeId: string): string[] => {
  return allRecommendations;
};

export const markRecommendationComplete = (employeeId: string, index: number) => {
  const completedRecommendations = getCompletedRecommendations();
  if (!completedRecommendations[employeeId]) {
    completedRecommendations[employeeId] = [];
  }
  if (!completedRecommendations[employeeId].includes(index)) {
    completedRecommendations[employeeId].push(index);
    saveCompletedRecommendations(completedRecommendations);
  }
};

export const isRecommendationCompleted = (employeeId: string, index: number): boolean => {
  const completedRecommendations = getCompletedRecommendations();
  return completedRecommendations[employeeId]?.includes(index) || false;
};

export const getLeaderboard = (): Employee[] => {
  return [...allEmployees].sort((a, b) => b.awePoints - a.awePoints);
};

export const calculatePotentialSavings = (): { energy: number; co2: number; cost: number } => {
  return {
    energy: 42.30,
    co2: 18.50,
    cost: 12.70
  };
};

// Generate static analytics data
const generateStaticAnalyticsData = () => {
  const data = [];
  const baseDate = new Date('2025-05-22');
  const baseConsumption = 150;
  const baseCO2 = 60;
  const baseSavings = 50;

  for (let i = 365; i >= 0; i--) {
    const date = new Date(baseDate);
    date.setDate(date.getDate() - i);
    
    const trend = 1 - (i / 365) * 0.2;
    const random = 0.9 + (Math.sin(i) * 0.1); // Using sin for deterministic "randomness"
    
    const actualConsumption = Number((baseConsumption * trend * random).toFixed(2));
    const predictedConsumption = Number((actualConsumption * (0.95 + Math.cos(i) * 0.05)).toFixed(2));
    const co2Emissions = Number((baseCO2 * trend * random).toFixed(2));
    const predictedEmissions = Number((co2Emissions * (0.95 + Math.cos(i) * 0.05)).toFixed(2));
    const costSavings = Number((baseSavings * (1 - trend) * random).toFixed(2));
    const predictedSavings = Number((costSavings * (1.05 + Math.cos(i) * 0.05)).toFixed(2));

    data.push({
      date: date.toISOString().split('T')[0],
      actualConsumption,
      predictedConsumption,
      co2Emissions,
      predictedEmissions,
      costSavings,
      predictedSavings
    });
  }

  return data;
};

const analyticsData = generateStaticAnalyticsData();

export const getAnalyticsData = (timeRange: TimeRange) => {
  const daysToInclude = timeRange === 'week' ? 7 : timeRange === 'month' ? 30 : 365;
  return analyticsData.slice(-daysToInclude);
};