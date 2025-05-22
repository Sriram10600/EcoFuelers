import React from 'react';
import { Trophy, Star, ArrowUp, ArrowDown } from 'lucide-react';
import { getLeaderboard } from '../data/mockData';

const Achievements: React.FC = () => {
  const leaderboard = getLeaderboard();
  
  return (
    <div className="p-4 md:p-6 max-w-screen-2xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="w-6 h-6 text-amber-500" />
        <h1 className="text-2xl font-bold text-gray-800">Full Leaderboard</h1>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4">
          <div className="space-y-3">
            {leaderboard.map((employee, index) => (
              <div 
                key={employee.id}
                className={`p-4 rounded-lg ${
                  index === 0 ? 'bg-amber-50 border border-amber-100' : 'bg-gray-50 border border-gray-100'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 flex items-center justify-center">
                    {index === 0 ? (
                      <div className="bg-amber-100 text-amber-600 rounded-full w-8 h-8 flex items-center justify-center">
                        <Trophy size={16} />
                      </div>
                    ) : (
                      <div className="text-gray-500 font-medium text-lg">{index + 1}</div>
                    )}
                  </div>
                  
                  <img 
                    src={employee.avatar} 
                    alt={employee.name} 
                    className={`w-12 h-12 rounded-full object-cover border-2 ${
                      index === 0 ? 'border-amber-300' : 'border-white'
                    }`}
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-800">{employee.name}</span>
                      {index === 0 && <Star size={16} className="text-amber-500 fill-amber-500" />}
                    </div>
                    <div className="text-sm text-gray-500">{employee.department}</div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-bold text-purple-600">{employee.awePoints} points</div>
                    <div className="text-sm text-gray-500">
                      Laptop Usage: {employee.laptopHours.toFixed(2)}h/day
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Achievements;