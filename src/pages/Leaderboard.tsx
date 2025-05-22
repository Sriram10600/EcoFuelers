import React from 'react';
import { Trophy, Medal, Star, Zap } from 'lucide-react';
import { getLeaderboard, getUserBadges } from '../data/mockData';
import BadgeIcon from '../components/BadgeIcon';
import InitialsAvatar from '../components/InitialsAvatar';
import { useAuth } from '../contexts/AuthContext';

const Leaderboard: React.FC = () => {
  const { user } = useAuth();
  const leaderboardData = getLeaderboard().slice(0, 10);

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="w-6 h-6 text-yellow-500" />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Top 10 Leaderboard</h1>
          <p className="text-gray-500">Top performers in energy efficiency and sustainability</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Energy Champions Leaderboard
          </h2>
        </div>

        <div className="p-4">
          <div className="space-y-4">
            {leaderboardData.map((employee, index) => {
              const userBadges = getUserBadges(employee.id);
              
              return (
                <div 
                  key={employee.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      {index === 0 ? (
                        <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                          <Trophy className="w-4 h-4 text-yellow-600" />
                        </div>
                      ) : index === 1 ? (
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                          <Medal className="w-4 h-4 text-gray-600" />
                        </div>
                      ) : index === 2 ? (
                        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                          <Star className="w-4 h-4 text-amber-600" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-600">#{index + 1}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <InitialsAvatar name={employee.name} size="sm" />
                      <div>
                        <h3 className="font-medium text-gray-800">{employee.name}</h3>
                        <p className="text-sm text-gray-500">{employee.department}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    {/* Badges */}
                    <div className="flex -space-x-2 hover:space-x-1 transition-all duration-200">
                      {userBadges.map(badge => (
                        <div key={badge.id} className="transform hover:translate-y-[-2px] transition-transform duration-200">
                          <BadgeIcon badge={badge} />
                        </div>
                      ))}
                    </div>

                    <div className="text-right">
                      <div className="text-sm text-gray-500">Energy Score</div>
                      <div className="font-medium text-gray-800">{employee.energyScore}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">AWE Points</div>
                      <div className="font-medium text-emerald-600 flex items-center gap-1">
                        <Zap className="w-4 h-4" />
                        {employee.awePoints}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;