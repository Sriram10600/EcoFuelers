import { Employee, Zone, EnergyData, Achievement, TimeRange, WeeklyChallenge, EcoBadge, TrainingModule, QuizQuestion, Department } from '../types';
import { validateEmissionData } from '../utils/validation';

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

  return pastMonth.map(date => {
    const consumption = random(100, 150);
    const emissions = random(40, 60);
    
    // Validate the generated data
    const validation = validateEmissionData(consumption, emissions);
    if (!validation.isValid) {
      console.error(`Invalid energy data generated for ${date}:`, validation.errors);
      // Return safe default values if validation fails
      return {
        timestamp: date,
        totalConsumption: 100,
        co2Emissions: 40,
        savingsPercentage: 0,
        breakdown: {
          lighting: 30,
          ac: 40,
          laptops: 20,
          other: 10
        }
      };
    }

    return {
      timestamp: date,
      totalConsumption: consumption,
      co2Emissions: emissions,
      savingsPercentage: random(0, 15),
      breakdown: {
        lighting: random(30, 45),
        ac: random(40, 60),
        laptops: random(20, 30),
        other: random(10, 15)
      }
    };
  });
};

export const energyData: EnergyData[] = generateStaticEnergyData();

// Admin
export const admin: Employee = {
  id: 'ADMIN001',
  name: 'Alex Thompson',
  avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
  department: 'Management',
  position: { x: 50, y: 50 },
  laptopHours: 6.5,
  awePoints: 1500,
  email: 'admin@ecofuelers.com',
  role: 'admin',
  joinDate: '2023-01-01',
  performanceScore: 95,
  energyScore: 95,
  badges: ['System Admin', 'Master Controller', 'Data Analyst', 'Energy Expert'],
  achievements: ['Completed system setup', 'Implemented security protocols']
};

// Managers
export const managers: Employee[] = [
  {
    id: 'MGR001',
    name: 'Sarah Wilson',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    department: 'Management',
    position: { x: 25, y: 40 },
    laptopHours: 8.10,
    awePoints: 510,
    email: 'mgr001.management@ecofuelers.com',
    role: 'manager',
    joinDate: '2023-02-15',
    performanceScore: 88,
    energyScore: 85,
    badges: ['Team Leader', 'Energy Champion'],
    achievements: ['Led team to 30% energy reduction']
  },
  {
    id: 'MGR002',
    name: 'Michael Chen',
    avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=150',
    department: 'IT',
    position: { x: 35, y: 30 },
    laptopHours: 7.50,
    awePoints: 480,
    email: 'mgr002.it@ecofuelers.com',
    role: 'manager',
    joinDate: '2023-03-01',
    performanceScore: 92,
    energyScore: 88,
    badges: ['Tech Innovator', 'Energy Optimizer', 'Digital Pioneer'],
    achievements: ['Deployed energy-efficient servers', 'Implemented power management system']
  },
  {
    id: 'MGR003',
    name: 'Emily Rodriguez',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    department: 'Operations',
    position: { x: 45, y: 60 },
    laptopHours: 7.20,
    awePoints: 340,
    email: 'mgr003.operations@ecofuelers.com',
    role: 'manager',
    joinDate: '2023-04-01',
    performanceScore: 90,
    energyScore: 87,
    badges: ['Process Optimizer', 'Sustainability Leader', 'Efficiency Expert'],
    achievements: ['Optimized HVAC schedules', 'Reduced operational energy waste by 20%']
  },
  {
    id: 'mgr4',
    name: 'David Kim',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    department: 'Product',
    position: { x: 50, y: 30 },
    laptopHours: 5.20,
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
    awePoints: 450,
    email: 'lisa.thompson@ecofuelers.com',
    role: 'manager',
    joinDate: '2023-06-01',
    performanceScore: 91,
    energyScore: 86
  }
];

// Generate employees with matching IDs from users.ts
export const employees: Employee[] = [
  {
    id: 'EMP001',
    name: 'David Wilson',
    email: 'emp001.management@ecofuelers.com',
    department: 'Management',
    role: 'employee',
    managerId: 'MGR001',
    position: { x: Math.random() * 100, y: Math.random() * 100 },
    laptopHours: 7.5,
    awePoints: 320,
    performanceScore: 85,
    energyScore: 85,
    badges: ['Energy Saver', 'Team Player'],
    achievements: ['Implemented paperless workflow', 'Organized green office initiative']
  },
  {
    id: 'EMP002',
    name: 'Lisa Park',
    email: 'emp002.management@ecofuelers.com',
    department: 'Management',
    role: 'employee',
    managerId: 'MGR001',
    position: { x: Math.random() * 100, y: Math.random() * 100 },
    laptopHours: 6.8,
    awePoints: 280,
    performanceScore: 87,
    energyScore: 87,
    badges: ['Project Star', 'Green Ambassador'],
    achievements: ['Led sustainability projects', 'Reduced paper consumption by 30%']
  },
  {
    id: 'EMP003',
    name: 'James Taylor',
    email: 'emp003.management@ecofuelers.com',
    department: 'Management',
    role: 'employee',
    managerId: 'MGR001',
    position: { x: Math.random() * 100, y: Math.random() * 100 },
    laptopHours: 7.2,
    awePoints: 290,
    performanceScore: 82,
    energyScore: 82,
    badges: ['Resource Guardian', 'Eco Warrior'],
    achievements: ['Implemented recycling program', 'Organized energy awareness workshops']
  },
  {
    id: 'EMP004',
    name: 'Anna Martinez',
    email: 'emp004.management@ecofuelers.com',
    department: 'Management',
    role: 'employee',
    managerId: 'MGR001',
    position: { x: Math.random() * 100, y: Math.random() * 100 },
    laptopHours: 7.8,
    awePoints: 310,
    performanceScore: 89,
    energyScore: 89,
    badges: ['Sustainability Champion', 'Green Innovator'],
    achievements: ['Created sustainability guidelines', 'Led green building certification']
  },
  {
    id: 'EMP005',
    name: 'Kevin Zhang',
    email: 'emp005.it@ecofuelers.com',
    department: 'IT',
    role: 'employee',
    managerId: 'MGR002',
    position: { x: Math.random() * 100, y: Math.random() * 100 },
    laptopHours: 7.1,
    awePoints: 270,
    performanceScore: 86,
    energyScore: 86,
    badges: ['Tech Guardian', 'Power Optimizer'],
    achievements: ['Optimized server room cooling', 'Implemented automated power management']
  },
  {
    id: 'EMP006',
    name: 'Rachel Kim',
    email: 'emp006.it@ecofuelers.com',
    department: 'IT',
    role: 'employee',
    managerId: 'MGR002',
    position: { x: Math.random() * 100, y: Math.random() * 100 },
    laptopHours: 6.9,
    awePoints: 260,
    performanceScore: 84,
    energyScore: 84,
    badges: ['Network Ninja', 'Energy Monitor'],
    achievements: ['Optimized network infrastructure', 'Reduced network power consumption']
  },
  {
    id: 'EMP007',
    name: 'Tom Anderson',
    email: 'emp007.it@ecofuelers.com',
    department: 'IT',
    role: 'employee',
    managerId: 'MGR002',
    position: { x: Math.random() * 100, y: Math.random() * 100 },
    laptopHours: 7.3,
    awePoints: 250,
    performanceScore: 83,
    energyScore: 83,
    badges: ['Support Star', 'Green IT Expert'],
    achievements: ['Implemented eco-friendly IT practices', 'Led e-waste recycling program']
  },
  {
    id: 'EMP008',
    name: 'Sofia Patel',
    email: 'emp008.operations@ecofuelers.com',
    department: 'Operations',
    role: 'employee',
    managerId: 'MGR003',
    position: { x: Math.random() * 100, y: Math.random() * 100 },
    laptopHours: 7.4,
    awePoints: 300,
    performanceScore: 88,
    energyScore: 88,
    badges: ['Maintenance Master', 'Energy Expert'],
    achievements: ['Optimized equipment maintenance schedules', 'Reduced equipment energy waste']
  },
  {
    id: 'EMP009',
    name: 'Marcus Johnson',
    email: 'emp009.operations@ecofuelers.com',
    department: 'Operations',
    role: 'employee',
    managerId: 'MGR003',
    position: { x: Math.random() * 100, y: Math.random() * 100 },
    laptopHours: 7.0,
    awePoints: 280,
    performanceScore: 85,
    energyScore: 85,
    badges: ['Building Expert', 'HVAC Specialist'],
    achievements: ['Improved building energy efficiency', 'Implemented smart thermostat program']
  },
  {
    id: 'EMP010',
    name: 'Emma Thompson',
    email: 'emp010.operations@ecofuelers.com',
    department: 'Operations',
    role: 'employee',
    managerId: 'MGR003',
    position: { x: Math.random() * 100, y: Math.random() * 100 },
    laptopHours: 7.6,
    awePoints: 290,
    performanceScore: 87,
    energyScore: 87,
    badges: ['Maintenance Pro', 'Resource Optimizer'],
    achievements: ['Developed preventive maintenance program', 'Reduced maintenance-related energy waste']
  },
  {
    id: 'EMP011',
    name: 'Carlos Rivera',
    email: 'emp011.operations@ecofuelers.com',
    department: 'Operations',
    role: 'employee',
    managerId: 'MGR003',
    position: { x: Math.random() * 100, y: Math.random() * 100 },
    laptopHours: 7.7,
    awePoints: 330,
    performanceScore: 91,
    energyScore: 91,
    badges: ['Energy Master', 'Sustainability Pro'],
    achievements: ['Conducted energy audits', 'Implemented energy monitoring system']
  }
];

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
    completedBy: ['EMP001', 'EMP002', 'MGR001'],
    type: 'individual',
    category: 'lighting',
    progress: 65,
    status: 'active',
    energySaved: 245.5,
    co2Reduced: 98.2
  },
  {
    id: 'wc2',
    title: 'Energy Champions',
    description: 'Reduce energy consumption on all devices for the entire week.',
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
    completedBy: ['EMP003', 'MGR002', 'EMP004'],
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
    unlockedBy: ['ADMIN001', 'MGR001', 'MGR002'],
    dateCreated: '2024-01-01'
  },
  {
    id: 'badge2',
    name: 'Energy Warrior',
    description: 'Maintained optimal energy settings for 30 days straight',
    icon: 'Zap',
    category: 'energy',
    level: 'gold',
    pointsRequired: 750,
    unlockedBy: ['EMP001', 'EMP003', 'EMP005'],
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
    unlockedBy: ['MGR001', 'MGR003', 'ADMIN001'],
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
    unlockedBy: ['EMP002', 'EMP004', 'MGR002'],
    dateCreated: '2024-02-15'
  },
  {
    id: 'badge5',
    name: 'Equipment Efficiency Expert',
    description: 'Maintained optimal equipment settings for 2 months',
    icon: 'Settings',
    category: 'energy',
    level: 'gold',
    pointsRequired: 700,
    unlockedBy: ['EMP008', 'EMP010', 'MGR003'],
    dateCreated: '2024-03-01'
  }
];

// Helper function to get user badges
export const getUserBadges = (userId: string): EcoBadge[] => {
  return ecoBadgesMockData.filter(badge => badge.unlockedBy.includes(userId));
};

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
    completedBy: ['EMP001', 'MGR001'],
    thumbnail: 'https://images.pexels.com/photos/7915357/pexels-photo-7915357.jpeg?auto=compress&cs=tinysrgb&w=300',
    points: 100,
    status: 'completed'
  },
  {
    id: 'tm2',
    title: 'Smart Device Management',
    description: 'Learn how to optimize your device settings for maximum energy efficiency.',
    type: 'interactive',
    duration: 15,
    category: 'equipment',
    difficulty: 'beginner',
    completedBy: ['EMP002', 'EMP003', 'MGR002'],
    thumbnail: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=300',
    points: 75,
    status: 'available'
  },
  {
    id: 'tm3',
    title: 'Advanced HVAC Operations',
    description: 'Deep dive into HVAC systems and their optimal usage patterns.',
    type: 'video',
    duration: 30,
    category: 'equipment',
    difficulty: 'advanced',
    completedBy: ['MGR003', 'EMP008'],
    thumbnail: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=300',
    points: 150,
    status: 'locked'
  },
  {
    id: 'tm4',
    title: 'Sustainable Office Practices',
    description: 'Learn everyday practices to create a more sustainable workplace.',
    type: 'interactive',
    duration: 25,
    category: 'sustainability',
    difficulty: 'intermediate',
    completedBy: ['EMP004', 'EMP005', 'MGR001'],
    thumbnail: 'https://images.pexels.com/photos/3182755/pexels-photo-3182755.jpeg?auto=compress&cs=tinysrgb&w=300',
    points: 120,
    status: 'completed'
  }
];

// Helper functions for the new features
export const getCurrentWeeklyChallenge = () => {
  return weeklyChallengeMockData.find(challenge => challenge.status === 'active');
};

export const getUpcomingChallenges = () => {
  return weeklyChallengeMockData.filter(challenge => challenge.status === 'upcoming');
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

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'What is the most energy-efficient way to cool your workspace?',
    options: [
      'Open windows and use natural ventilation when possible',
      'Run the AC at maximum power',
      'Keep windows open while AC is running',
      'Use a personal fan with AC at maximum'
    ],
    correctAnswer: 0,
    explanation: 'Natural ventilation through windows when weather permits is the most energy-efficient cooling method, reducing the need for artificial cooling.',
    points: 10,
    category: 'behavior',
    difficulty: 'easy'
  },
  {
    id: 'q2',
    question: 'Which practice saves the most energy for computer usage?',
    options: [
      'Keeping the computer on sleep mode',
      'Using dark mode all the time',
      'Shutting down completely when not in use',
      'Using a screensaver'
    ],
    correctAnswer: 2,
    explanation: 'Completely shutting down your computer when not in use saves the most energy, as even sleep mode consumes some power.',
    points: 15,
    category: 'equipment',
    difficulty: 'easy'
  },
  {
    id: 'q3',
    question: 'What percentage of energy can be saved by using dark mode on OLED screens?',
    options: [
      'Up to 20%',
      'Up to 40%',
      'Up to 60%',
      'Up to 80%'
    ],
    correctAnswer: 1,
    explanation: 'Dark mode can save up to 40% of energy consumption on OLED screens, as these screens don\'t need to power pixels to display black.',
    points: 20,
    category: 'equipment',
    difficulty: 'medium'
  },
  {
    id: 'q4',
    question: 'Which lighting option is most energy-efficient?',
    options: [
      'Fluorescent bulbs',
      'Halogen bulbs',
      'LED bulbs',
      'Incandescent bulbs'
    ],
    correctAnswer: 2,
    explanation: 'LED bulbs are the most energy-efficient lighting option, using up to 75% less energy and lasting 25 times longer than incandescent lighting.',
    points: 15,
    category: 'equipment',
    difficulty: 'easy'
  },
  {
    id: 'q5',
    question: 'What is the optimal temperature range for office AC in summer?',
    options: [
      '18-20°C (64-68°F)',
      '20-22°C (68-72°F)',
      '23-26°C (73-79°F)',
      '27-30°C (81-86°F)'
    ],
    correctAnswer: 2,
    explanation: '23-26°C (73-79°F) is the optimal range for office AC in summer, balancing comfort and energy efficiency.',
    points: 20,
    category: 'behavior',
    difficulty: 'medium'
  },
  {
    id: 'q6',
    question: 'Which of these actions has the largest impact on energy conservation?',
    options: [
      'Using dark mode',
      'Turning off lights in empty rooms',
      'Using a laptop instead of desktop',
      'Using power strips for equipment'
    ],
    correctAnswer: 1,
    explanation: 'Turning off lights in empty rooms has the largest immediate impact on energy conservation, as lighting can account for up to 40% of energy use in offices.',
    points: 15,
    category: 'behavior',
    difficulty: 'medium'
  },
  {
    id: 'q7',
    question: 'How much energy does a computer in sleep mode use compared to when fully powered?',
    options: [
      'About 1-3%',
      'About 5-10%',
      'About 20-30%',
      'About 40-50%'
    ],
    correctAnswer: 0,
    explanation: 'A computer in sleep mode typically uses only 1-3% of the power it consumes when fully operational.',
    points: 25,
    category: 'equipment',
    difficulty: 'hard'
  },
  {
    id: 'q8',
    question: 'Which sustainable practice has the highest impact on office energy consumption?',
    options: [
      'Using recycled paper',
      'Implementing motion sensor lights',
      'Using energy-efficient appliances',
      'Having plants in the office'
    ],
    correctAnswer: 2,
    explanation: 'Using energy-efficient appliances has the highest impact on office energy consumption, potentially reducing energy use by 30-50%.',
    points: 20,
    category: 'sustainability',
    difficulty: 'medium'
  },
  {
    id: 'q9',
    question: 'What is the most effective way to use natural light in the office?',
    options: [
      'Keep blinds fully open all day',
      'Use adjustable blinds to control glare',
      'Close blinds and use artificial light',
      'Remove blinds completely'
    ],
    correctAnswer: 1,
    explanation: 'Using adjustable blinds to control glare while maximizing natural light is the most effective way to balance lighting needs and energy efficiency.',
    points: 20,
    category: 'behavior',
    difficulty: 'medium'
  },
  {
    id: 'q10',
    question: 'Which factor contributes most to unnecessary energy waste in offices?',
    options: [
      'Old light bulbs',
      'Equipment left on standby',
      'Inefficient AC systems',
      'Manual thermostats'
    ],
    correctAnswer: 1,
    explanation: 'Equipment left on standby (phantom power) is one of the largest contributors to unnecessary energy waste in offices, accounting for up to 10% of electricity usage.',
    points: 25,
    category: 'sustainability',
    difficulty: 'hard'
  }
];

export const getRandomQuizQuestions = (count: number = 5): QuizQuestion[] => {
  const shuffled = [...quizQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Mock team members data
const teamMembers: Employee[] = [
  {
    id: 'emp-mgr1-1',
    name: 'John Manager',
    email: 'john.manager@ecofuelers.com',
    department: 'Engineering',
    role: 'manager',
    position: { x: 0, y: 0 },
    laptopHours: 8,
    awePoints: 1200,
    performanceScore: 92,
    energyScore: 88,
    badges: ['Energy Pioneer', 'Dark Mode Warrior'],
    achievements: ['Reduced team energy consumption by 15%']
  },
  {
    id: 'emp-mgr1-2',
    name: 'Sarah Lead',
    email: 'sarah.lead@ecofuelers.com',
    department: 'Design',
    role: 'manager',
    position: { x: 1, y: 0 },
    laptopHours: 7,
    awePoints: 980,
    performanceScore: 88,
    energyScore: 85,
    badges: ['Team Sustainability Champion'],
    achievements: ['Led design team to paperless workflow']
  },
  // Add more team members as needed
];

// Mock departments data
const departments: Department[] = [
  {
    id: 'dept-1',
    name: 'Engineering',
    description: 'Software development and infrastructure'
  },
  {
    id: 'dept-2',
    name: 'Design',
    description: 'UI/UX and product design'
  },
  {
    id: 'dept-3',
    name: 'Operations',
    description: 'Business operations and support'
  },
  // Add more departments as needed
];

export const getTeamMembers = (): Employee[] => {
  return teamMembers;
};

export const getDepartments = (): Department[] => {
  return departments;
};

// Track user actions for anti-gaming
const userActions: Map<string, { timestamp: number; type: string }[]> = new Map();

export const trackUserAction = (userId: string, actionType: string) => {
  const actions = userActions.get(userId) || [];
  actions.push({
    timestamp: Date.now(),
    type: actionType
  });
  userActions.set(userId, actions);
};

export const getUserActions = (userId: string) => {
  return userActions.get(userId) || [];
};