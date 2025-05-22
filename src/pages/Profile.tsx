import React from 'react';
import { Award, Zap, Battery } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import InitialsAvatar from '../components/InitialsAvatar';
import UserStats from '../components/UserStats';
import { getUserBadges } from '../data/mockData';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const userBadges = getUserBadges(user?.id || '');

  return (
    <div className="p-4 md:p-6 max-w-screen-xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <InitialsAvatar name={user?.name || ''} size="lg" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{user?.name}</h1>
              <p className="text-gray-500">{user?.email}</p>
              <div className="mt-2">
                <span className={`text-xs px-2 py-1 rounded-full capitalize ${
                  user?.role === 'admin' 
                    ? 'bg-purple-100 text-purple-700'
                    : user?.role === 'manager'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {user?.role}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Stats */}
          <div>
            <UserStats 
              badges={userBadges}
              awePoints={user?.awePoints || 0}
              showDetails
              size="lg"
              className="mb-6"
            />

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
                      <div className="text-gray-900">{user?.performanceScore}%</div>
                      <div className={`text-sm ${user?.performanceScore >= 85 ? 'text-green-600' : 'text-yellow-600'}`}>
                        {user?.performanceScore >= 85 ? 'Excellent' : 'Good'}
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
                      <div className="text-gray-900">{user?.energyScore}%</div>
                      <div className={`text-sm ${user?.energyScore >= 85 ? 'text-green-600' : 'text-yellow-600'}`}>
                        {user?.energyScore >= 85 ? 'Excellent' : 'Good'}
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
                    <div className="text-gray-900">{user?.laptopHours?.toFixed(2)} hours/day</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements Panel */}
          <div>
            {/* Add your AchievementsPanel component here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 