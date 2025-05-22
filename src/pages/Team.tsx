import React, { useState } from 'react';
import { Users, Search, ArrowUpRight, ArrowDownRight, Battery, Zap, ChevronDown, ChevronRight } from 'lucide-react';
import { Employee } from '../types';
import { allEmployees, managers, getEmployeesByManager } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

const Team: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedManagers, setExpandedManagers] = useState<string[]>([]);
  const { user } = useAuth();
  
  const toggleManager = (managerId: string) => {
    setExpandedManagers(prev => 
      prev.includes(managerId) 
        ? prev.filter(id => id !== managerId)
        : [...prev, managerId]
    );
  };

  // Get the appropriate list of employees based on the current user's role
  const getVisibleEmployees = (): { managers: Employee[], employees: { [key: string]: Employee[] } } => {
    if (!user) return { managers: [], employees: {} };
    
    if (user.role === 'admin') {
      // Admin sees all managers and their employees
      const employeesByManager = managers.reduce((acc, manager) => {
        acc[manager.id] = getEmployeesByManager(manager.id);
        return acc;
      }, {} as { [key: string]: Employee[] });
      
      return {
        managers: managers,
        employees: employeesByManager
      };
    } else if (user.role === 'manager') {
      // Manager sees themselves and their direct reports
      const managerData = managers.find(m => m.email === user.email);
      if (!managerData) return { managers: [], employees: {} };
      
      return {
        managers: [managerData],
        employees: {
          [managerData.id]: getEmployeesByManager(managerData.id)
        }
      };
    } else {
      // Employee sees their manager and fellow team members
      const employeeData = allEmployees.find(e => e.email === user.email);
      if (!employeeData?.managerId) return { managers: [], employees: {} };
      
      const manager = managers.find(m => m.id === employeeData.managerId);
      if (!manager) return { managers: [], employees: {} };
      
      return {
        managers: [manager],
        employees: {
          [manager.id]: getEmployeesByManager(manager.id)
        }
      };
    }
  };

  const { managers: visibleManagers, employees: employeesByManager } = getVisibleEmployees();

  const renderEmployeeCard = (employee: Employee, isManager: boolean = false) => (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow ${
      isManager ? 'border-l-4 border-l-purple-500' : ''
    }`}>
      <div className="flex items-start gap-3">
        <img
          src={employee.avatar}
          alt={employee.name}
          className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
        />
        <div className="flex-1">
          <h3 className="font-medium text-gray-800">{employee.name}</h3>
          <p className="text-sm text-gray-500">{employee.department}</p>
          <p className="text-xs text-gray-400">{employee.email}</p>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          employee.role === 'admin' 
            ? 'bg-purple-100 text-purple-700'
            : employee.role === 'manager'
            ? 'bg-blue-100 text-blue-700'
            : 'bg-gray-100 text-gray-700'
        }`}>
          {employee.role}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="bg-gray-50 rounded-lg p-2">
          <div className="text-xs text-gray-500 mb-1">Performance</div>
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-800">{employee.performanceScore}%</span>
            <span className={`text-xs flex items-center ${
              employee.performanceScore > 85 ? 'text-emerald-600' : 'text-amber-600'
            }`}>
              {employee.performanceScore > 85 ? (
                <ArrowUpRight className="w-3 h-3" />
              ) : (
                <ArrowDownRight className="w-3 h-3" />
              )}
            </span>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-2">
          <div className="text-xs text-gray-500 mb-1">Energy Score</div>
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-800">{employee.energyScore}%</span>
            <span className={`text-xs flex items-center ${
              employee.energyScore > 85 ? 'text-emerald-600' : 'text-amber-600'
            }`}>
              {employee.energyScore > 85 ? (
                <ArrowUpRight className="w-3 h-3" />
              ) : (
                <ArrowDownRight className="w-3 h-3" />
              )}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        <div className="flex items-center gap-1.5">
          <Battery className="w-4 h-4 text-blue-500" />
          <span className="text-gray-600">{employee.laptopHours.toFixed(2)}h/day</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Zap className="w-4 h-4 text-purple-500" />
          <span className="text-gray-600">{employee.awePoints} pts</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-6 max-w-screen-2xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-6 h-6 text-purple-600" />
            <h1 className="text-2xl font-bold text-gray-800">Team Management</h1>
          </div>
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search team members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {visibleManagers.map(manager => {
          const teamMembers = employeesByManager[manager.id] || [];
          const isExpanded = expandedManagers.includes(manager.id);
          
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
              </div>
              
              {renderEmployeeCard(manager, true)}
              
              {isExpanded && (
                <div className="ml-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {teamMembers.map(employee => (
                    <div key={employee.id} className="relative">
                      <div className="absolute -left-8 top-1/2 w-6 border-t-2 border-gray-200"></div>
                      {renderEmployeeCard(employee)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Team;