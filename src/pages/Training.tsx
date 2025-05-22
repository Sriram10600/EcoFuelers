import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Trophy, 
  Calendar, 
  Users, 
  Zap, 
  Award,
  Star,
  GraduationCap
} from 'lucide-react';
import { 
  getCurrentWeeklyChallenge, 
  getUpcomingChallenges,
  getAvailableTrainingModules,
  getUserBadges,
  getUserById
} from '../data/mockData';
import UserStats from '../components/UserStats';

const Training: React.FC = () => {
  const { user } = useAuth();
  const currentChallenge = getCurrentWeeklyChallenge();
  const upcomingChallenges = getUpcomingChallenges();
  const trainingModules = getAvailableTrainingModules(user?.id || '');
  const userBadges = getUserBadges(user?.id || '');
  
  // Debug logs
  console.log('Current user:', user);
  console.log('Employee data:', getUserById(user?.id || ''));

  return (
    <div className="p-4 md:p-6 max-w-screen-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Training & Challenges</h1>
            <p className="text-gray-500">Level up your sustainability skills and compete in eco-challenges</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* AWE Points Card */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-full">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-sm text-purple-600 font-medium">Total AWE Points</div>
                <div className="text-2xl font-bold text-purple-700">{user?.awePoints || 0}</div>
              </div>
            </div>
          </div>

          {/* Badges Card */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 border border-amber-200">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-100 rounded-full">
                <Award className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <div className="text-sm text-amber-600 font-medium">Badges Earned</div>
                <div className="text-2xl font-bold text-amber-700">{userBadges.length}</div>
              </div>
            </div>
            {userBadges.length > 0 && (
              <div className="mt-3 flex -space-x-2">
                {userBadges.slice(0, 5).map((badge, index) => (
                  <div 
                    key={badge.id}
                    className="w-8 h-8 rounded-full bg-white border-2 border-amber-200 flex items-center justify-center"
                    style={{ zIndex: 5 - index }}
                  >
                    <span className="text-xs text-amber-600">{badge.icon.charAt(0)}</span>
                  </div>
                ))}
                {userBadges.length > 5 && (
                  <div className="w-8 h-8 rounded-full bg-amber-100 border-2 border-amber-200 flex items-center justify-center">
                    <span className="text-xs text-amber-600">+{userBadges.length - 5}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Progress Card */}
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-100 rounded-full">
                <Trophy className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <div className="text-sm text-emerald-600 font-medium">Completed Modules</div>
                <div className="text-2xl font-bold text-emerald-700">
                  {trainingModules.filter(m => m.status === 'completed').length}/{trainingModules.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Weekly Challenges */}
        <div className="lg:col-span-1">
          {/* Current Challenge */}
          {currentChallenge && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800">Current Challenge</h2>
              </div>
              <div className="p-6">
                <div className="bg-emerald-50 rounded-lg p-6 border border-emerald-100">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">{currentChallenge.title}</h3>
                      <p className="text-base text-gray-600 mt-2">{currentChallenge.description}</p>
                    </div>
                    <div className="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-base">
                      {currentChallenge.points} points
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mt-6">
                    <div className="text-center">
                      <div className="text-base text-gray-500">Participants</div>
                      <div className="text-xl font-medium text-gray-800 mt-1">{currentChallenge.participants}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-base text-gray-500">Energy Saved</div>
                      <div className="text-xl font-medium text-gray-800 mt-1">{currentChallenge.energySaved} kWh</div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="w-full bg-emerald-200 rounded-full h-3">
                      <div 
                        className="bg-emerald-500 rounded-full h-3 transition-all duration-500"
                        style={{ width: `${currentChallenge.progress}%` }}
                      />
                    </div>
                    <div className="mt-2 text-sm text-right text-gray-500">
                      {currentChallenge.progress}% Complete
                    </div>
                  </div>
                </div>

                {/* Upcoming Challenges */}
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Upcoming Challenges</h3>
                  <div className="space-y-4">
                    {upcomingChallenges.map(challenge => (
                      <div 
                        key={challenge.id}
                        className="p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-base font-medium text-gray-800">{challenge.title}</h4>
                            <p className="text-sm text-gray-500 mt-1">{challenge.description}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                              {challenge.points} points
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Training Modules */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">Training Modules</h2>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                {trainingModules.map(module => (
                  <div 
                    key={module.id}
                    className={`rounded-lg border ${
                      module.status === 'locked' 
                        ? 'border-gray-200 bg-gray-50' 
                        : module.status === 'completed'
                          ? 'border-emerald-200 bg-emerald-50'
                          : 'border-purple-200 bg-purple-50'
                    } p-3`}
                  >
                    <div>
                      <h3 className="font-medium text-gray-800 text-sm">{module.title}</h3>
                      <p className="text-xs text-gray-600 mt-1">{module.description}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span>{module.duration} min</span>
                          <span>{module.points} points</span>
                        </div>
                        <span className={`text-xs font-medium ${
                          module.status === 'locked' 
                            ? 'text-gray-400'
                            : module.status === 'completed'
                              ? 'text-emerald-600'
                              : 'text-purple-600'
                        }`}>
                          {module.status.charAt(0).toUpperCase() + module.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Training; 