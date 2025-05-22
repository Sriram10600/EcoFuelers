import { Employee, Zone, EnergyData, Achievement, TimeRange, WeeklyChallenge, EcoBadge, TrainingModule } from '../types';

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
    email: 'manager@ecofuelers.com',
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
    employees: [
      'mgr1',
      ...Array.from({ length: 10 }, (_, i) => `emp-mgr1-${i + 1}`)
    ],
    energyConsumption: 42.50,
    co2Emissions: 18.30
  },
  {
    id: 'zone2',
    name: 'Design Zone',
    isActive: true,
    employees: [
      'mgr2',
      ...Array.from({ length: 10 }, (_, i) => `emp-mgr2-${i + 1}`)
    ],
    energyConsumption: 28.70,
    co2Emissions: 12.10
  },
  {
    id: 'zone3',
    name: 'Marketing Zone',
    isActive: true,
    employees: [
      'mgr3',
      ...Array.from({ length: 10 }, (_, i) => `emp-mgr3-${i + 1}`)
    ],
    energyConsumption: 31.20,
    co2Emissions: 13.50
  },
  {
    id: 'zone4',
    name: 'Product & Finance Zone',
    isActive: true,
    employees: [
      'mgr4',
      'mgr5',
      ...Array.from({ length: 10 }, (_, i) => `emp-mgr4-${i + 1}`),
      ...Array.from({ length: 10 }, (_, i) => `emp-mgr5-${i + 1}`)
    ],
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

  // Define static values for different time periods
  const dailyData = {
    actualConsumption: 150,
    predictedConsumption: 145,
    co2Emissions: 60,
    predictedEmissions: 58,
    costSavings: 50,
    predictedSavings: 52
  };

  const weeklyData = {
    actualConsumption: 130,
    predictedConsumption: 125,
    co2Emissions: 50,
    predictedEmissions: 48,
    costSavings: 60,
    predictedSavings: 62
  };

  const monthlyData = {
    actualConsumption: 110,
    predictedConsumption: 105,
    co2Emissions: 40,
    predictedEmissions: 38,
    costSavings: 70,
    predictedSavings: 72
  };

  for (let i = 365; i >= 0; i--) {
    const date = new Date(baseDate);
    date.setDate(date.getDate() - i);
    
    // Use different static values based on the period
    let values;
    if (i <= 7) {
      values = dailyData;
    } else if (i <= 30) {
      values = weeklyData;
    } else {
      values = monthlyData;
    }

    data.push({
      date: date.toISOString().split('T')[0],
      ...values
    });
  }

  return data;
};

const analyticsData = generateStaticAnalyticsData();

export const getAnalyticsData = (timeRange: TimeRange) => {
  const daysToInclude = timeRange === 'day' ? 1 : timeRange === 'week' ? 7 : 30;
  const today = new Date('2025-05-22'); // Keep using fixed date for consistent data
  const data = [];

  for (let i = daysToInclude - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Use different static values based on the time period for more realistic data
    let baseConsumption, baseCO2, baseSavings;
    
    if (timeRange === 'day') {
      // Hourly data for the day
      baseConsumption = 150;
      baseCO2 = 60;
      baseSavings = 50;
    } else if (timeRange === 'week') {
      // Daily data for the week
      baseConsumption = 130;
      baseCO2 = 50;
      baseSavings = 60;
    } else {
      // Daily data for the month
      baseConsumption = 110;
      baseCO2 = 40;
      baseSavings = 70;
    }

    // Add some variation but keep it deterministic
    const variation = Math.sin(i * Math.PI / daysToInclude) * 0.1 + 1;
    
    data.push({
      date: date.toISOString().split('T')[0],
      actualConsumption: Number((baseConsumption * variation).toFixed(2)),
      predictedConsumption: Number((baseConsumption * variation * 0.95).toFixed(2)),
      co2Emissions: Number((baseCO2 * variation).toFixed(2)),
      predictedEmissions: Number((baseCO2 * variation * 0.95).toFixed(2)),
      costSavings: Number((baseSavings * variation).toFixed(2)),
      predictedSavings: Number((baseSavings * variation * 1.05).toFixed(2))
    });
  }

  return data;
};

// Add new types to handle equipment and behavioral predictions
export interface EquipmentStatus {
  id: string;
  name: string;
  type: 'AC' | 'Lighting' | 'Laptop' | 'Printer';
  location: string;
  lastMaintenance: string;
  efficiency: number;
  predictedMaintenance: string;
  status: 'Optimal' | 'Needs Attention' | 'Maintenance Required';
  energyUsage: number;
  maintenanceReason?: string;
}

export interface BehavioralPattern {
  employeeId: string;
  patterns: {
    forgottenLaptopShutdowns: number;
    averageActiveHours: number;
    darkModeUsage: number;
    peakEnergyHours: string[];
    commonIssues: string[];
    suggestions: string[];
  };
  lastUpdated: string;
  predictedSavings: number;
}

// Generate mock equipment data
export const equipmentStatus: EquipmentStatus[] = [
  {
    id: 'ac-1',
    name: 'AC Unit 1',
    type: 'AC',
    location: 'Engineering Zone',
    lastMaintenance: '2024-01-15',
    efficiency: 85,
    predictedMaintenance: '2024-04-15',
    status: 'Needs Attention',
    energyUsage: 450,
    maintenanceReason: 'Filter replacement needed'
  },
  {
    id: 'ac-2',
    name: 'AC Unit 2',
    type: 'AC',
    location: 'Design Zone',
    lastMaintenance: '2024-02-01',
    efficiency: 92,
    predictedMaintenance: '2024-05-01',
    status: 'Optimal',
    energyUsage: 420
  },
  {
    id: 'light-1',
    name: 'Lighting System 1',
    type: 'Lighting',
    location: 'Marketing Zone',
    lastMaintenance: '2024-01-01',
    efficiency: 78,
    predictedMaintenance: '2024-03-15',
    status: 'Maintenance Required',
    energyUsage: 150,
    maintenanceReason: 'LED replacement and circuit check required'
  },
  {
    id: 'printer-1',
    name: 'Printer Hub',
    type: 'Printer',
    location: 'Product & Finance Zone',
    lastMaintenance: '2024-02-15',
    efficiency: 88,
    predictedMaintenance: '2024-04-30',
    status: 'Optimal',
    energyUsage: 80
  }
];

// Generate behavioral patterns for employees
export const generateBehavioralPatterns = (): BehavioralPattern[] => {
  return allEmployees.map(employee => ({
    employeeId: employee.id,
    patterns: {
      forgottenLaptopShutdowns: Math.floor(Math.random() * 5),
      averageActiveHours: 6 + Math.random() * 4,
      darkModeUsage: employee.isDarkMode ? 85 + Math.random() * 15 : 20 + Math.random() * 30,
      peakEnergyHours: [
        `${8 + Math.floor(Math.random() * 2)}:00`,
        `${13 + Math.floor(Math.random() * 2)}:00`,
        `${15 + Math.floor(Math.random() * 3)}:00`
      ],
      commonIssues: [
        'Frequent screen timeout disabled',
        'High brightness settings',
        'Multiple monitors always on'
      ].slice(0, 1 + Math.floor(Math.random() * 2)),
      suggestions: [
        'Enable automatic screen timeout',
        'Reduce screen brightness during off-peak hours',
        'Use single monitor when possible',
        'Enable dark mode for energy savings',
        'Schedule regular breaks to reduce device usage'
      ].slice(0, 2 + Math.floor(Math.random() * 2))
    },
    lastUpdated: new Date().toISOString(),
    predictedSavings: Math.floor(Math.random() * 50) + 20
  }));
};

export const behavioralPatterns = generateBehavioralPatterns();

// AI Prediction Functions
export const getPredictedMaintenanceSchedule = () => {
  return equipmentStatus
    .filter(equipment => equipment.status !== 'Optimal')
    .sort((a, b) => new Date(a.predictedMaintenance).getTime() - new Date(b.predictedMaintenance).getTime());
};

export const getEmployeeBehavioralInsights = (employeeId: string) => {
  return behavioralPatterns.find(pattern => pattern.employeeId === employeeId);
};

export const getZoneEquipmentStatus = (zoneId: string) => {
  const zone = zones.find(z => z.id === zoneId);
  if (!zone) return [];
  return equipmentStatus.filter(equipment => equipment.location === zone.name);
};

// Weekly Challenges
export const weeklyChallengeMockData: WeeklyChallenge[] = [
  {
    id: 'wc1',
    title: 'Natural Light Week',
    description: 'Use natural light instead of artificial lighting whenever possible during work hours.',
    startDate: '2024-03-18',
    endDate: '2024-03-24',
    points: 100,
    participants: 45,
    completedBy: ['emp-mgr1-1', 'emp-mgr2-3', 'mgr1'],
    type: 'individual',
    category: 'lighting',
    progress: 65,
    status: 'active',
    energySaved: 245.5,
    co2Reduced: 98.2
  },
  {
    id: 'wc2',
    title: 'Dark Mode Champions',
    description: 'Keep dark mode enabled on all devices for the entire week.',
    startDate: '2024-03-25',
    endDate: '2024-03-31',
    points: 150,
    participants: 32,
    completedBy: [],
    type: 'team',
    category: 'energy',
    progress: 0,
    status: 'upcoming',
    energySaved: 0,
    co2Reduced: 0
  },
  {
    id: 'wc3',
    title: 'Equipment Efficiency',
    description: 'Ensure all equipment is properly shut down at the end of each day.',
    startDate: '2024-03-11',
    endDate: '2024-03-17',
    points: 120,
    participants: 52,
    completedBy: ['emp-mgr3-2', 'mgr2', 'emp-mgr1-4'],
    type: 'individual',
    category: 'equipment',
    progress: 100,
    status: 'completed',
    energySaved: 320.8,
    co2Reduced: 128.3
  }
];

// Eco Badges
export const ecoBadgesMockData: EcoBadge[] = [
  {
    id: 'badge1',
    name: 'Energy Pioneer',
    description: 'Reduced energy consumption by 20% for 3 consecutive weeks',
    icon: 'Zap',
    category: 'energy',
    level: 'platinum',
    pointsRequired: 1000,
    unlockedBy: ['emp-mgr1-1', 'mgr1', 'admin1'],
    dateCreated: '2024-01-01'
  },
  {
    id: 'badge2',
    name: 'Dark Mode Warrior',
    description: 'Used dark mode for 30 days straight',
    icon: 'Moon',
    category: 'energy',
    level: 'gold',
    pointsRequired: 750,
    unlockedBy: ['emp-mgr2-3', 'mgr2', 'emp-mgr1-1'],
    dateCreated: '2024-01-15'
  },
  {
    id: 'badge3',
    name: 'Team Sustainability Champion',
    description: 'Led team to achieve 25% energy reduction',
    icon: 'Users',
    category: 'teamwork',
    level: 'platinum',
    pointsRequired: 1000,
    unlockedBy: ['mgr1', 'mgr3', 'admin1'],
    dateCreated: '2024-02-01'
  },
  {
    id: 'badge4',
    name: 'Innovation Master',
    description: 'Proposed 5 implemented energy-saving ideas',
    icon: 'Lightbulb',
    category: 'innovation',
    level: 'gold',
    pointsRequired: 800,
    unlockedBy: ['emp-mgr3-2', 'emp-mgr1-4', 'mgr2'],
    dateCreated: '2024-02-15'
  },
  {
    id: 'badge5',
    name: 'Natural Light Advocate',
    description: 'Utilized natural light for 90% of working hours',
    icon: 'Sun',
    category: 'sustainability',
    level: 'silver',
    pointsRequired: 500,
    unlockedBy: ['emp-mgr2-1', 'emp-mgr3-3', 'mgr4'],
    dateCreated: '2024-02-20'
  },
  {
    id: 'badge6',
    name: 'Equipment Efficiency Expert',
    description: 'Maintained optimal equipment settings for 2 months',
    icon: 'Settings',
    category: 'energy',
    level: 'gold',
    pointsRequired: 700,
    unlockedBy: ['mgr5', 'emp-mgr4-2', 'admin1'],
    dateCreated: '2024-03-01'
  },
  {
    id: 'badge7',
    name: 'Zero Waste Pioneer',
    description: 'Achieved zero waste for 30 consecutive days',
    icon: 'Trash',
    category: 'sustainability',
    level: 'platinum',
    pointsRequired: 1000,
    unlockedBy: ['mgr2', 'emp-mgr1-2'],
    dateCreated: '2024-03-05'
  },
  {
    id: 'badge8',
    name: 'Energy Mentor',
    description: 'Helped 5 colleagues improve their energy scores',
    icon: 'GraduationCap',
    category: 'teamwork',
    level: 'silver',
    pointsRequired: 600,
    unlockedBy: ['emp-mgr3-1', 'mgr1', 'mgr4'],
    dateCreated: '2024-03-10'
  },
  {
    id: 'badge9',
    name: 'Carbon Footprint Reducer',
    description: 'Reduced carbon emissions by 30%',
    icon: 'Leaf',
    category: 'sustainability',
    level: 'gold',
    pointsRequired: 800,
    unlockedBy: ['admin1', 'mgr3', 'emp-mgr2-4'],
    dateCreated: '2024-03-15'
  },
  {
    id: 'badge10',
    name: 'Challenge Champion',
    description: 'Won 5 weekly energy challenges',
    icon: 'Trophy',
    category: 'innovation',
    level: 'platinum',
    pointsRequired: 1000,
    unlockedBy: ['mgr1', 'emp-mgr1-1'],
    dateCreated: '2024-03-20'
  },
  {
    id: 'badge11',
    name: 'Eco-Innovation Star',
    description: 'Implemented 3 new eco-friendly office practices',
    icon: 'Star',
    category: 'innovation',
    level: 'gold',
    pointsRequired: 750,
    unlockedBy: ['emp-mgr4-3', 'mgr2', 'mgr5'],
    dateCreated: '2024-03-25'
  },
  {
    id: 'badge12',
    name: 'Energy Data Analyst',
    description: 'Provided valuable insights from energy consumption data',
    icon: 'BarChart',
    category: 'innovation',
    level: 'silver',
    pointsRequired: 500,
    unlockedBy: ['emp-mgr2-2', 'mgr3'],
    dateCreated: '2024-03-30'
  },
  {
    id: 'badge13',
    name: 'Sustainability Ambassador',
    description: 'Promoted eco-friendly practices across departments',
    icon: 'Globe',
    category: 'teamwork',
    level: 'platinum',
    pointsRequired: 1000,
    unlockedBy: ['admin1', 'mgr4', 'emp-mgr1-3'],
    dateCreated: '2024-04-01'
  },
  {
    id: 'badge14',
    name: 'Green Technology Pioneer',
    description: 'Early adopter of new energy-saving technologies',
    icon: 'Cpu',
    category: 'innovation',
    level: 'gold',
    pointsRequired: 800,
    unlockedBy: ['mgr5', 'emp-mgr3-4'],
    dateCreated: '2024-04-05'
  },
  {
    id: 'badge15',
    name: 'Team Energy Guardian',
    description: 'Maintained lowest team energy consumption for 3 months',
    icon: 'Shield',
    category: 'teamwork',
    level: 'platinum',
    pointsRequired: 1000,
    unlockedBy: ['mgr1', 'mgr2', 'admin1'],
    dateCreated: '2024-04-10'
  }
];

// Training Modules
export const trainingModulesMockData: TrainingModule[] = [
  {
    id: 'tm1',
    title: 'Office Energy Efficiency VR Tour',
    description: 'Take a virtual tour of an energy-efficient office and learn best practices.',
    type: 'vr',
    duration: 20,
    category: 'energy',
    difficulty: 'beginner',
    completedBy: ['emp-mgr1-1', 'mgr1'],
    thumbnail: 'https://images.pexels.com/photos/7915357/pexels-photo-7915357.jpeg?auto=compress&cs=tinysrgb&w=300',
    points: 100,
    skills: ['energy efficiency', 'sustainability awareness'],
    status: 'available'
  },
  {
    id: 'tm2',
    title: 'Advanced Equipment Management',
    description: 'Learn how to optimize energy usage of office equipment through VR simulation.',
    type: 'vr',
    duration: 30,
    category: 'equipment',
    difficulty: 'advanced',
    completedBy: ['mgr2'],
    thumbnail: 'https://images.pexels.com/photos/8728560/pexels-photo-8728560.jpeg?auto=compress&cs=tinysrgb&w=300',
    points: 150,
    skills: ['equipment optimization', 'energy management'],
    prerequisites: ['tm1'],
    status: 'locked'
  },
  {
    id: 'tm3',
    title: 'Sustainable Office Practices',
    description: 'Interactive course on daily sustainable practices in the office.',
    type: 'interactive',
    duration: 15,
    category: 'sustainability',
    difficulty: 'intermediate',
    completedBy: ['emp-mgr2-3', 'emp-mgr1-4'],
    thumbnail: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=300',
    points: 75,
    skills: ['sustainability', 'workplace efficiency'],
    status: 'available'
  }
];

// Helper functions for the new features
export const getCurrentWeeklyChallenge = () => {
  return weeklyChallengeMockData.find(challenge => challenge.status === 'active');
};

export const getUpcomingChallenges = () => {
  return weeklyChallengeMockData.filter(challenge => challenge.status === 'upcoming');
};

export const getUserBadges = (userId: string) => {
  return ecoBadgesMockData.filter(badge => badge.unlockedBy.includes(userId));
};

export const getAvailableTrainingModules = (userId: string) => {
  const completedModules = new Set(
    trainingModulesMockData
      .filter(module => module.completedBy.includes(userId))
      .map(module => module.id)
  );

  return trainingModulesMockData.map(module => ({
    ...module,
    status: module.completedBy.includes(userId)
      ? 'completed'
      : module.prerequisites?.some(prereq => !completedModules.has(prereq))
        ? 'locked'
        : 'available'
  }));
};