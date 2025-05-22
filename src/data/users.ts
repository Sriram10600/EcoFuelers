import { User, Department } from '../types';

// Helper function to create default permissions
const getDefaultPermissions = (role: 'admin' | 'manager' | 'employee') => ({
  canViewAllData: role === 'admin',
  canEditUsers: role === 'admin',
  canManageRoles: role === 'admin',
  canViewAnalytics: role === 'admin' || role === 'manager',
  canExportData: role === 'admin' || role === 'manager'
});

export const users: User[] = [
  {
    id: 'ADMIN001',
    name: 'Alex Thompson',
    email: 'admin@ecofuelers.com',
    password: 'admin@123',
    role: 'admin',
    department: Department.Management,
    isManager: false,
    badges: ['System Admin', 'Master Controller', 'Data Analyst', 'Energy Expert'],
    achievements: ['Completed system setup', 'Implemented security protocols'],
    energyScore: 95,
    joinDate: '2023-01-01',
    permissions: getDefaultPermissions('admin')
  },
  {
    id: 'MGR001',
    name: 'Sarah Wilson',
    email: 'mgr001.management@ecofuelers.com',
    password: 'mgr001@123',
    role: 'manager',
    department: Department.Management,
    isManager: true,
    badges: ['Team Leader', 'Energy Champion'],
    achievements: ['Led team to 30% energy reduction'],
    energyScore: 88,
    joinDate: '2023-02-15',
    permissions: getDefaultPermissions('manager'),
    teamMembers: ['EMP001', 'EMP002', 'EMP003', 'EMP004']
  },
  {
    id: 'MGR002',
    name: 'Michael Chen',
    email: 'mgr002.it@ecofuelers.com',
    password: 'mgr002@123',
    department: Department.IT,
    role: 'manager',
    energyScore: 88,
    badges: ['Tech Innovator', 'Energy Optimizer', 'Digital Pioneer'],
    achievements: ['Deployed energy-efficient servers', 'Implemented power management system'],
    isManager: true,
    teamMembers: ['EMP005', 'EMP006', 'EMP007'],
    joinDate: '2023-03-01',
    permissions: getDefaultPermissions('manager')
  },
  {
    id: 'MGR003',
    name: 'Emily Rodriguez',
    email: 'mgr003.operations@ecofuelers.com',
    password: 'mgr003@123',
    department: Department.Operations,
    role: 'manager',
    energyScore: 90,
    badges: ['Process Optimizer', 'Sustainability Leader', 'Efficiency Expert'],
    achievements: ['Optimized HVAC schedules', 'Reduced operational energy waste by 20%'],
    isManager: true,
    teamMembers: ['EMP008', 'EMP009', 'EMP010', 'EMP011'],
    joinDate: '2023-03-15',
    permissions: getDefaultPermissions('manager')
  },

  // Employees
  {
    id: 'EMP001',
    name: 'David Wilson',
    email: 'emp001.management@ecofuelers.com',
    password: 'emp001@123',
    department: Department.Management,
    role: 'employee',
    energyScore: 85,
    badges: ['Energy Saver', 'Team Player'],
    achievements: ['Implemented paperless workflow', 'Organized green office initiative'],
    isManager: false,
    managerId: 'MGR001',
    joinDate: '2023-04-01',
    permissions: getDefaultPermissions('employee')
  },
  {
    id: 'EMP002',
    name: 'Lisa Park',
    email: 'emp002.management@ecofuelers.com',
    password: 'emp002@123',
    department: Department.Management,
    role: 'employee',
    energyScore: 87,
    badges: ['project star', 'green ambassador'],
    achievements: ['led sustainability projects', 'reduced paper consumption by 30%'],
    isManager: false,
    managerId: 'MGR001',
    joinDate: '2023-04-01',
    permissions: getDefaultPermissions('employee')
  },
  {
    id: 'EMP003',
    name: 'James Taylor',
    email: 'emp003.management@ecofuelers.com',
    password: 'emp003@123',
    department: Department.Management,
    role: 'employee',
    energyScore: 82,
    badges: ['resource guardian', 'eco warrior'],
    achievements: ['implemented recycling program', 'organized energy awareness workshops'],
    isManager: false,
    managerId: 'MGR001',
    joinDate: '2023-04-01',
    permissions: getDefaultPermissions('employee')
  },
  {
    id: 'EMP004',
    name: 'Anna Martinez',
    email: 'emp004.management@ecofuelers.com',
    password: 'emp004@123',
    department: Department.Management,
    role: 'employee',
    energyScore: 89,
    badges: ['sustainability champion', 'green innovator'],
    achievements: ['created sustainability guidelines', 'led green building certification'],
    isManager: false,
    managerId: 'MGR001',
    joinDate: '2023-04-01',
    permissions: getDefaultPermissions('employee')
  },
  {
    id: 'EMP005',
    name: 'Kevin Zhang',
    email: 'emp005.it@ecofuelers.com',
    password: 'emp005@123',
    department: Department.IT,
    role: 'employee',
    energyScore: 86,
    badges: ['tech guardian', 'power optimizer'],
    achievements: ['optimized server room cooling', 'implemented automated power management'],
    isManager: false,
    managerId: 'MGR002',
    joinDate: '2023-04-01',
    permissions: getDefaultPermissions('employee')
  },
  {
    id: 'EMP006',
    name: 'Rachel Kim',
    email: 'emp006.it@ecofuelers.com',
    password: 'emp006@123',
    department: Department.IT,
    role: 'employee',
    energyScore: 84,
    badges: ['network ninja', 'energy monitor'],
    achievements: ['optimized network infrastructure', 'reduced network power consumption'],
    isManager: false,
    managerId: 'MGR002',
    joinDate: '2023-04-01',
    permissions: getDefaultPermissions('employee')
  },
  {
    id: 'EMP007',
    name: 'Tom Anderson',
    email: 'emp007.it@ecofuelers.com',
    password: 'emp007@123',
    department: Department.IT,
    role: 'employee',
    energyScore: 83,
    badges: ['support star', 'green it expert'],
    achievements: ['implemented eco-friendly it practices', 'led e-waste recycling program'],
    isManager: false,
    managerId: 'MGR002',
    joinDate: '2023-04-01',
    permissions: getDefaultPermissions('employee')
  },
  {
    id: 'EMP008',
    name: 'Sofia Patel',
    email: 'emp008.operations@ecofuelers.com',
    password: 'emp008@123',
    department: Department.Operations,
    role: 'employee',
    energyScore: 88,
    badges: ['maintenance master', 'energy expert'],
    achievements: ['optimized equipment maintenance schedules', 'reduced equipment energy waste'],
    isManager: false,
    managerId: 'MGR003',
    joinDate: '2023-04-01',
    permissions: getDefaultPermissions('employee')
  },
  {
    id: 'EMP009',
    name: 'Marcus Johnson',
    email: 'emp009.operations@ecofuelers.com',
    password: 'emp009@123',
    department: Department.Operations,
    role: 'employee',
    energyScore: 85,
    badges: ['building expert', 'hvac specialist'],
    achievements: ['improved building energy efficiency', 'implemented smart thermostat program'],
    isManager: false,
    managerId: 'MGR003',
    joinDate: '2023-04-01',
    permissions: getDefaultPermissions('employee')
  },
  {
    id: 'EMP010',
    name: 'Emma Thompson',
    email: 'emp010.operations@ecofuelers.com',
    password: 'emp010@123',
    department: Department.Operations,
    role: 'employee',
    energyScore: 87,
    badges: ['maintenance pro', 'resource optimizer'],
    achievements: ['developed preventive maintenance program', 'reduced maintenance-related energy waste'],
    isManager: false,
    managerId: 'MGR003',
    joinDate: '2023-04-01',
    permissions: getDefaultPermissions('employee')
  },
  {
    id: 'EMP011',
    name: 'Carlos Rivera',
    email: 'emp011.operations@ecofuelers.com',
    password: 'emp011@123',
    department: Department.Operations,
    role: 'employee',
    energyScore: 91,
    badges: ['energy master', 'sustainability pro'],
    achievements: ['conducted energy audits', 'implemented energy monitoring system'],
    isManager: false,
    managerId: 'MGR003',
    joinDate: '2023-04-01',
    permissions: getDefaultPermissions('employee')
  }
];

export const getUser = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

export const getUsersByDepartment = (department: Department): User[] => {
  return users.filter(user => user.department === department);
};

export const getManagers = (): User[] => {
  return users.filter(user => user.isManager);
};

export const getTeamMembers = (managerId: string): User[] => {
  const manager = users.find(user => user.id === managerId);
  if (!manager || !manager.isManager) return [];
  
  return users.filter(user => 
    user.department === manager.department && 
    !user.isManager && 
    user.role !== 'admin'
  );
};

export const getTopPerformers = (limit: number = 5): User[] => {
  return [...users]
    .sort((a, b) => b.energyScore - a.energyScore)
    .slice(0, limit);
};

export const searchUsers = (query: string): User[] => {
  const lowercaseQuery = query.toLowerCase();
  return users.filter(user => 
    user.name.toLowerCase().includes(lowercaseQuery) ||
    user.email.toLowerCase().includes(lowercaseQuery) ||
    user.role.toLowerCase().includes(lowercaseQuery)
  );
};

export const validateCredentials = (email: string, password: string): User | null => {
  const user = users.find(u => u.email === email && u.password === password);
  return user || null;
};

export const getTeamMatesForEmployee = (employeeId: string): User[] => {
  const employee = users.find(user => user.id === employeeId);
  if (!employee) return [];
  
  return users.filter(user => 
    user.department === employee.department && 
    user.id !== employeeId &&
    user.role !== 'admin'
  );
};

export const getManagerForEmployee = (employeeId: string): User | undefined => {
  const employee = users.find(user => user.id === employeeId);
  if (!employee) return undefined;
  
  return users.find(user => 
    user.department === employee.department && 
    user.isManager
  );
};

export const getAllUsers = (requestingUserId: string): User[] => {
  const requestingUser = getUser(requestingUserId);
  if (!requestingUser) return [];

  // If admin, return all users
  if (requestingUser.role === 'admin') {
    return users;
  }

  // If manager, return team members
  if (requestingUser.isManager) {
    return getTeamMembers(requestingUser.id);
  }

  // If employee, return team mates
  return getTeamMatesForEmployee(requestingUser.id);
};