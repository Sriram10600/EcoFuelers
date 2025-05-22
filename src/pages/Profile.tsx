import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Calendar, Award, Zap, Battery, Building } from 'lucide-react';

const Profile: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-700';
      case 'manager':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-xl shadow-sm">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-start gap-6">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 rounded-xl object-cover border-2 border-gray-100"
            />
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <div className="mt-1 flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleBadgeColor(user.role)} capitalize`}>
                  {user.role}
                </span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-500">{user.department}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <div className="text-gray-900">{user.email}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-50 rounded-lg">
                  <Building className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Department</div>
                  <div className="text-gray-900">{user.department}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Join Date</div>
                  <div className="text-gray-900">{new Date(user.joinDate).toLocaleDateString()}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Performance Metrics</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-50 rounded-lg">
                  <Award className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Performance Score</div>
                  <div className="flex items-center gap-2">
                    <div className="text-gray-900">{user.performanceScore}%</div>
                    <div className={`text-sm ${user.performanceScore >= 85 ? 'text-green-600' : 'text-yellow-600'}`}>
                      {user.performanceScore >= 85 ? 'Excellent' : 'Good'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-50 rounded-lg">
                  <Zap className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Energy Score</div>
                  <div className="flex items-center gap-2">
                    <div className="text-gray-900">{user.energyScore}%</div>
                    <div className={`text-sm ${user.energyScore >= 85 ? 'text-green-600' : 'text-yellow-600'}`}>
                      {user.energyScore >= 85 ? 'Excellent' : 'Good'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Battery className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Average Laptop Hours</div>
                  <div className="text-gray-900">{user.laptopHours.toFixed(2)} hours/day</div>
                </div>
              </div>
            </div>
          </div>

          {/* AWE Points */}
          <div className="sm:col-span-2">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-purple-100">Total AWE Points</div>
                  <div className="text-3xl font-bold mt-1">{user.awePoints} points</div>
                </div>
                <div className="p-3 bg-white bg-opacity-20 rounded-xl">
                  <Award className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 