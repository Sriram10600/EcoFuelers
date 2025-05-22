import React from 'react';
import { Book, Trophy, Medal, Users, Clock, Award } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { trainingModulesMockData, weeklyChallengeMockData, getUserBadges } from '../data/mockData';

const TrainingAndChallenges = () => {
  const { user } = useAuth();
  const userBadges = user ? getUserBadges(user.id) : [];
  const totalAwePoints = user?.awePoints || 0;

  return (
    <div className="p-4 md:p-6 max-w-screen-2xl mx-auto">
      {/* User Stats */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <Award className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Total Badges</h3>
              <p className="text-3xl font-bold text-emerald-600">{userBadges.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Trophy className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">AWE Points</h3>
              <p className="text-3xl font-bold text-blue-600">{totalAwePoints}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Training Modules */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Book className="w-6 h-6 text-emerald-600" />
          <h2 className="text-xl font-bold text-gray-800">Training Modules</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trainingModulesMockData.map(module => (
            <div key={module.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-800">{module.title}</h3>
                <p className="text-sm text-gray-500">{module.description}</p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-gray-500">
                    <Clock size={16} />
                    <span>{module.duration} min</span>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-600">
                    <Trophy size={16} />
                    <span>{module.points} points</span>
                  </div>
                </div>
                <button
                  className={`w-full px-4 py-2 rounded-lg text-sm font-medium ${
                    module.status === 'completed'
                      ? 'bg-emerald-100 text-emerald-700 cursor-default'
                      : module.status === 'locked'
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  }`}
                  disabled={module.status === 'completed' || module.status === 'locked'}
                >
                  {module.status === 'completed'
                    ? 'Completed'
                    : module.status === 'locked'
                    ? 'Locked'
                    : 'Start Training'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Challenges */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Medal className="w-6 h-6 text-emerald-600" />
          <h2 className="text-xl font-bold text-gray-800">Weekly Challenges</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {weeklyChallengeMockData.map(challenge => (
            <div key={challenge.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800">{challenge.title}</h3>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      challenge.status === 'active'
                        ? 'bg-emerald-100 text-emerald-700'
                        : challenge.status === 'completed'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {challenge.status.charAt(0).toUpperCase() + challenge.status.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{challenge.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-gray-500">
                    <Users size={16} />
                    <span>{challenge.participants} participants</span>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-600">
                    <Trophy size={16} />
                    <span>{challenge.points} points</span>
                  </div>
                </div>
                {challenge.status === 'active' && (
                  <div className="mt-2">
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 transition-all duration-500"
                        style={{ width: `${challenge.progress}%` }}
                      />
                    </div>
                    <div className="mt-1 text-xs text-gray-500 text-right">
                      {challenge.progress}% complete
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrainingAndChallenges; 