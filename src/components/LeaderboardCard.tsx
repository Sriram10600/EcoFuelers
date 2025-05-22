import React from 'react';
import { Trophy, Star, ArrowUp, ArrowDown } from 'lucide-react';
import { getLeaderboard } from '../data/mockData';
import { useNavigate } from 'react-router-dom';

interface LeaderboardCardProps {
  className?: string;
}

const LeaderboardCard: React.FC<LeaderboardCardProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const leaderboard = getLeaderboard();
  
  const changeStatuses = [
    { change: 2, isUp: true },
    { change: 0, isUp: false },
    { change: 1, isUp: true },
    { change: 2, isUp: false },
    { change: 1, isUp: false },
    { change: 3, isUp: true },
  ];
  
  return (
    <div className={`bg-white rounded-xl shadow-sm overflow-hidden ${className}`}>
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          <h2 className="text-lg font-semibold text-gray-800">Sustainability Leaders</h2>
        </div>
      </div>
      
      <div className="p-4">
        <div className="grid gap-2">
          {leaderboard.slice(0, 5).map((employee, index) => (
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
              
              <img 
                src={employee.avatar} 
                alt={employee.name} 
                className={`w-9 h-9 rounded-full object-cover border-2 ${index === 0 ? 'border-amber-300' : 'border-white'}`}
              />
              
              <div className="flex-1">
                <div className="flex items-center gap-1">
                  <span className="font-medium text-gray-800">{employee.name}</span>
                  {index === 0 && <Star size={14} className="text-amber-500 fill-amber-500" />}
                </div>
                <div className="text-xs text-gray-500">{employee.department}</div>
              </div>
              
              <div className="text-right">
                <div className="font-bold text-purple-600">{employee.awePoints}</div>
                <div className="flex items-center justify-end text-xs mt-0.5">
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
          ))}
        </div>
        
        <button 
          onClick={() => navigate('/leaderboard')}
          className="mt-4 w-full py-2 text-sm font-medium text-gray-600 hover:text-gray-800 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
        >
          View Full Leaderboard
        </button>
      </div>
    </div>
  );
};

export default LeaderboardCard;