import React, { useState, useMemo } from 'react';
import { Users, Search, ArrowUpRight, ArrowDownRight, Award, Target, ChevronDown, ChevronRight, UserPlus, Download, Filter } from 'lucide-react';
import { User, Department, Role } from '../types/index';
import { users, getUser, getTeamMembers, getTeamMatesForEmployee, getManagerForEmployee, getAllUsers } from '../data/users';
import { useAuth } from '../contexts/AuthContext';
import AddUserModal from '../components/AddUserModal';

const Team: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedManagers, setExpandedManagers] = useState<string[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedRole, setSelectedRole] = useState<Role | 'all'>('all');
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const { user } = useAuth();

  const toggleManager = (managerId: string) => {
    setExpandedManagers(prev => 
      prev.includes(managerId) 
        ? prev.filter(id => id !== managerId)
        : [...prev, managerId]
    );
  };

  const handleAddUser = (userData: any) => {
    // Here you would typically make an API call to add the user
    console.log('Adding new user:', userData);
    // For now, we'll just close the modal
    setIsAddUserModalOpen(false);
  };

  // Get the appropriate list of team members based on the current user's role
  const getVisibleTeamMembers = (): { managers: User[], teamMembers: User[] } => {
    if (!user) return { managers: [], teamMembers: [] };
    
    const currentUser = getUser(user.id);
    if (!currentUser) return { managers: [], teamMembers: [] };

    if (currentUser.role === 'admin') {
      // Admin sees all users
      const allUsers = getAllUsers(currentUser.id);
      return {
        managers: allUsers.filter(u => u.isManager),
        teamMembers: allUsers.filter(u => !u.isManager && u.role !== 'admin')
      };
    } else if (currentUser.isManager) {
      // Manager sees their direct reports
      return {
        managers: [currentUser],
        teamMembers: getTeamMembers(currentUser.id)
      };
    } else {
      // Employee sees their manager and fellow team members
      const manager = getManagerForEmployee(currentUser.id);
      const teamMates = getTeamMatesForEmployee(currentUser.id);
      
      return {
        managers: manager ? [manager] : [],
        teamMembers: teamMates
      };
    }
  };

  const { managers, teamMembers } = getVisibleTeamMembers();

  const filteredTeamMembers = useMemo(() => {
    let filtered = teamMembers;

    // Apply department filter
    if (selectedDepartment !== 'all') {
      filtered = filtered.filter(member => member.department === selectedDepartment);
    }

    // Apply role filter
    if (selectedRole !== 'all') {
      filtered = filtered.filter(member => {
        // Handle both simple role strings and specific job titles
        const memberRole = member.role.toLowerCase();
        return memberRole === selectedRole || 
               (selectedRole === 'manager' && member.isManager) ||
               (selectedRole === 'employee' && !member.isManager && memberRole !== 'admin');
      });
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(member => 
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [teamMembers, selectedDepartment, selectedRole, searchTerm]);

  // Filter managers based on role and department
  const filteredManagers = useMemo(() => {
    let filtered = managers;

    if (selectedDepartment !== 'all') {
      filtered = filtered.filter(manager => manager.department === selectedDepartment);
    }

    if (selectedRole !== 'all') {
      filtered = filtered.filter(manager => {
        const managerRole = manager.role.toLowerCase();
        return managerRole === selectedRole || 
               (selectedRole === 'manager' && manager.isManager);
      });
    }

    return filtered;
  }, [managers, selectedDepartment, selectedRole]);

  const renderUserCard = (user: User, isManager: boolean = false) => (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow ${
      isManager ? 'border-l-4 border-l-emerald-500' : ''
    }`}>
      <div className="flex items-start gap-3">
        <div className="relative w-14 h-14">
          {user.role === 'admin' ? (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
              <Users className="w-3 h-3 text-white" />
            </div>
          ) : null}
          <img
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}&backgroundColor=34d399&textColor=ffffff&size=56`}
            alt={user.name}
            className="w-14 h-14 rounded-full object-cover border-2 border-gray-100"
            style={{ aspectRatio: '1/1' }}
          />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
          <p className="text-sm text-gray-500">{user.department}</p>
          <p className="text-xs text-gray-400">{user.email}</p>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          user.role === 'admin'
            ? 'bg-purple-100 text-purple-700'
            : user.isManager
            ? 'bg-emerald-100 text-emerald-700'
            : 'bg-gray-100 text-gray-700'
        }`}>
          {user.role}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="bg-gray-50 rounded-lg p-2">
          <div className="text-xs text-gray-500 mb-1">Energy Score</div>
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-800">{user.energyScore}</span>
            <span className={`text-xs flex items-center ${
              user.energyScore > 85 ? 'text-emerald-600' : 'text-amber-600'
            }`}>
              {user.energyScore > 85 ? (
                <ArrowUpRight className="w-3 h-3" />
              ) : (
                <ArrowDownRight className="w-3 h-3" />
              )}
            </span>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-2">
          <div className="text-xs text-gray-500 mb-1">Badges</div>
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-800">{user.badges.length}</span>
            <Award className="w-4 h-4 text-purple-500" />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="text-xs text-gray-500 mb-2">Badges & Achievements</div>
        <div className="flex flex-wrap gap-2">
          {user.badges.map((badge, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-1 px-2 py-1 bg-gray-50 rounded-full"
              title={badge}
            >
              <Award className="w-3 h-3 text-emerald-500" />
              <span className="text-xs text-gray-700">{badge}</span>
            </div>
          ))}
        </div>
        <div className="mt-2 text-sm text-gray-700">
          {user.achievements[0] ? (
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-purple-500" />
              <span>{user.achievements[0]}</span>
            </div>
          ) : (
            'No recent achievements'
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-6 max-w-screen-2xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Users className="w-6 h-6 text-emerald-600" />
            <h1 className="text-2xl font-bold text-gray-800">Team Overview</h1>
          </div>
          <div className="flex items-center gap-4">
            {user?.role === 'admin' && (
              <button 
                onClick={() => setIsAddUserModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors"
              >
                <UserPlus size={18} />
                <span>Add User</span>
              </button>
            )}
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search team members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            {user?.role === 'admin' && (
              <>
                <div className="relative">
                  <Filter className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none bg-white"
                  >
                    <option value="all">All Departments</option>
                    {Object.values(Department).map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                <div className="relative">
                  <Filter className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value as Role | 'all')}
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none bg-white"
                  >
                    <option value="all">All Roles</option>
                    <option value="manager">Manager</option>
                    <option value="employee">Employee</option>
                  </select>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {filteredManagers.map(manager => {
          const isExpanded = expandedManagers.includes(manager.id);
          const departmentMembers = filteredTeamMembers.filter(
            member => member.department === manager.department
          );
          
          return (
            <div key={manager.id} className="space-y-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleManager(manager.id)}
                  className="p-1 rounded-md hover:bg-gray-100"
                >
                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                <h2 className="text-lg font-semibold text-gray-800">{manager.department} Team</h2>
                <span className="text-sm text-gray-500">
                  ({departmentMembers.length} members)
                </span>
              </div>
              
              {renderUserCard(manager, true)}
              
              {isExpanded && (
                <div className="ml-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {departmentMembers.map(member => (
                    <div key={member.id} className="relative">
                      <div className="absolute -left-8 top-1/2 w-6 border-t-2 border-gray-200"></div>
                      {renderUserCard(member)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <AddUserModal
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
        onAddUser={handleAddUser}
      />
    </div>
  );
};

export default Team;