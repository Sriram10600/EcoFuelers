import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Gamepad2, 
  Trophy, 
  Calendar, 
  Users, 
  Zap, 
  Award, 
  Timer,
  GraduationCap,
  Lock,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { 
  getCurrentWeeklyChallenge, 
  getUpcomingChallenges,
  getAvailableTrainingModules,
  getUserBadges
} from '../data/mockData';

const Training: React.FC = () => {
  const { user } = useAuth();
  const currentChallenge = getCurrentWeeklyChallenge();
  const upcomingChallenges = getUpcomingChallenges();
  const trainingModules = getAvailableTrainingModules(user?.id || '');
  const userBadges = getUserBadges(user?.id || '');

  return (
    <div className="p-4 md:p-6 max-w-screen-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Training & Challenges</h1>
          <p className="text-gray-500">Level up your sustainability skills and compete in eco-challenges</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium flex items-center gap-1.5">
            <Trophy size={16} />
            <span>{userBadges.length} Badges Earned</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Weekly Challenges */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Challenge */}
          {currentChallenge && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Gamepad2 className="w-5 h-5 text-emerald-500" />
                  Current Challenge
                </h2>
              </div>
              <div className="p-4">
                <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800">{currentChallenge.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{currentChallenge.description}</p>
                    </div>
                    <div className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                      {currentChallenge.points} points
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-sm text-gray-500">Participants</div>
                      <div className="font-medium text-gray-800 flex items-center justify-center gap-1">
                        <Users size={16} className="text-blue-500" />
                        {currentChallenge.participants}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-500">Energy Saved</div>
                      <div className="font-medium text-gray-800 flex items-center justify-center gap-1">
                        <Zap size={16} className="text-yellow-500" />
                        {currentChallenge.energySaved} kWh
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-500">CO2 Reduced</div>
                      <div className="font-medium text-gray-800">
                        {currentChallenge.co2Reduced} kg
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-500">Progress</div>
                      <div className="font-medium text-gray-800">
                        {currentChallenge.progress}%
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="w-full bg-emerald-200 rounded-full h-2">
                      <div 
                        className="bg-emerald-500 rounded-full h-2 transition-all duration-500"
                        style={{ width: `${currentChallenge.progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Upcoming Challenges */}
                <div className="mt-4">
                  <h3 className="font-medium text-gray-800 mb-3">Upcoming Challenges</h3>
                  <div className="space-y-3">
                    {upcomingChallenges.map(challenge => (
                      <div 
                        key={challenge.id}
                        className="p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-800">{challenge.title}</h4>
                            <p className="text-sm text-gray-500 mt-0.5">{challenge.description}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                              {challenge.points} points
                            </div>
                            <Calendar size={16} className="text-gray-400" />
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
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-purple-500" />
                Training Modules
              </h2>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {trainingModules.map(module => (
                  <div 
                    key={module.id}
                    className={`rounded-lg border ${
                      module.status === 'locked' 
                        ? 'border-gray-200 bg-gray-50' 
                        : module.status === 'completed'
                          ? 'border-emerald-200 bg-emerald-50'
                          : 'border-purple-200 bg-purple-50'
                    } p-4`}
                  >
                    <div className="flex items-start gap-3">
                      <img 
                        src={module.thumbnail} 
                        alt={module.title}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <h3 className="font-medium text-gray-800">{module.title}</h3>
                          {module.status === 'locked' ? (
                            <Lock size={16} className="text-gray-400" />
                          ) : module.status === 'completed' ? (
                            <CheckCircle size={16} className="text-emerald-500" />
                          ) : (
                            <ArrowRight size={16} className="text-purple-500" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{module.description}</p>
                        <div className="mt-2 flex items-center gap-3 text-sm">
                          <div className="flex items-center gap-1 text-gray-500">
                            <Timer size={14} />
                            {module.duration} min
                          </div>
                          <div className="flex items-center gap-1 text-gray-500">
                            <Award size={14} />
                            {module.points} points
                          </div>
                        </div>
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