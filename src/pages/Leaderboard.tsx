import React from 'react';
import { Trophy, Medal, Star, Zap } from 'lucide-react';
import { getLeaderboard, getUserBadges } from '../data/mockData';
import BadgeIcon from '../components/BadgeIcon';

const Leaderboard: React.FC = () => {
  const leaderboardData = getLeaderboard();

  return (
    <div className="p-4 md:p-6 max-w-screen-xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Energy Champions Leaderboard
          </h2>
        </div>

        <div className="p-4">
          <div className="space-y-4">
            {leaderboardData.slice(0, 10).map((employee, index) => {
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
                      <img 
                        src={employee.avatar} 
                        alt={employee.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
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