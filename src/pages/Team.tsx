import React, { useState } from 'react';
import { Users, Search, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { User, Department } from '../types/index';
import { getAllUsers, getUser } from '../data/users';
import { useAuth } from '../contexts/AuthContext';
import AddUserModal from '../components/AddUserModal';
import InitialsAvatar from '../components/InitialsAvatar';
import UserStats from '../components/UserStats';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddUser: (userData: { name: string; email: string; department: Department; role: 'admin' | 'manager' | 'employee' }) => void;
}

const Team = () => {
  const { user } = useAuth();
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Get team members based on user role
  const getFilteredTeamMembers = () => {
    if (!user) return [];
    return getAllUsers(user.id);
  };

  const teamMembers = getFilteredTeamMembers();
  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddUser = (userData: { name: string; email: string; department: Department; role: 'admin' | 'manager' | 'employee' }) => {
    // Handle adding new user logic here
    setShowAddModal(false);
  };

  const renderUserCard = (member: User) => {
    const isManager = member.isManager;
    
    return (
      <div
        key={member.id}
        className={`bg-white rounded-xl shadow-sm border border-gray-200 p-4 ${
          isManager ? 'border-purple-200' : ''
        }`}
      >
        <div className="flex items-start gap-4">
          <InitialsAvatar 
            name={member.name} 
            size="lg"
            className={isManager ? 'border-2 border-purple-300' : ''}
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-gray-800">{member.name}</h3>
              {isManager && (
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                  Manager
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500">{member.department}</p>
            <div className="mt-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Energy Score:</span>
                <span className="font-medium text-blue-600">{member.energyScore}</span>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {member.badges.map((badge: string, index: number) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 md:p-6 max-w-screen-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Team</h1>
          <p className="text-gray-500">Manage your team members and their roles</p>
        </div>
        {user?.role === 'admin' && (
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Add Member
          </button>
        )}
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search by name or department..."
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMembers.map(member => renderUserCard(member))}
      </div>

      {showAddModal && (
        <AddUserModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAddUser={handleAddUser}
        />
      )}
    </div>
  );
};

export default Team;