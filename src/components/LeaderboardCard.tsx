import React from 'react';
import { Trophy, Star, ArrowUp, ArrowDown } from 'lucide-react';
import { getLeaderboard, getUserBadges } from '../data/mockData';
import { useNavigate } from 'react-router-dom';
import InitialsAvatar from './InitialsAvatar';
import UserStats from './UserStats';

interface LeaderboardCardProps {
  className?: string;
}

const LeaderboardCard: React.FC<LeaderboardCardProps> = ({ className = '' }) => {
  const leaderboard = getLeaderboard();
  const navigate = useNavigate();
  
  const changeStatuses = [
    { isUp: true, change: '+5' },
    { isUp: false, change: '-2' },
    { isUp: true, change: '+3' },
    { isUp: true, change: '+1' },
    { isUp: false, change: '-1' },
  ];
  
  return (
    <div className={`bg-white rounded-xl shadow-sm overflow-hidden ${className}`}>
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-semibold text-gray-800">Top Performers</h2>
          </div>
          <button 
            onClick={() => navigate('/leaderboard')}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            View All
          </button>
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        {leaderboard.slice(0, 5).map((employee, index) => {
          const userBadges = getUserBadges(employee.id);
          
          return (
            <div 
              key={employee.id}
              className={`p-3 rounded-lg flex items-center gap-3 ${
                index === 0 ? 'bg-amber-50 border border-amber-100' : 'bg-gray-50 border border-gray-100'
              }`}
            >
              <div className="w-7 h-7 flex items-center justify-center">
                {index === 0 ? (
                  <div className="bg-amber-100 text-amber-600 rounded-full w-6 h-6 flex items-center justify-center">
                    <Trophy size={14} />
                  </div>
                ) : (
                  <div className="text-gray-500 font-medium">{index + 1}</div>
                )}
              </div>
              
              <InitialsAvatar name={employee.name} size="sm" className={index === 0 ? 'border-2 border-amber-300' : ''} />
              
              <div className="flex-1">
                <div className="flex items-center gap-1">
                  <span className="font-medium text-gray-800">{employee.name}</span>
                  {index === 0 && <Star size={14} className="text-amber-500 fill-amber-500" />}
                </div>
                <div className="text-xs text-gray-500">{employee.department}</div>
              </div>
              
              <div>
                <UserStats 
                  badges={userBadges}
                  awePoints={employee.awePoints}
                  size="sm"
                />
                <div className="flex items-center justify-end text-xs mt-1">
                  {changeStatuses[index].isUp ? (
                    <span className="text-emerald-500 flex items-center">
                      <ArrowUp size={12} />
                      {changeStatuses[index].change}
                    </span>
                  ) : (
                    <span className="text-gray-400 flex items-center">
                      <ArrowDown size={12} />
                      {changeStatuses[index].change}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeaderboardCard;