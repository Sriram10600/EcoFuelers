import React from 'react';
import { Award, Check } from 'lucide-react';
import { Achievement } from '../types';
import { achievements } from '../data/mockData';
import * as LucideIcons from 'lucide-react';

interface AchievementsPanelProps {
  className?: string;
}

const AchievementsPanel: React.FC<AchievementsPanelProps> = ({ className = '' }) => {
  // Filter achievements into completed and in-progress
  const completedAchievements = achievements.filter(a => a.isCompleted);
  const inProgressAchievements = achievements.filter(a => !a.isCompleted);
  
  // Calculate total points earned
  const totalEarnedPoints = completedAchievements.reduce((sum, a) => sum + a.points, 0);
  const totalPossiblePoints = achievements.reduce((sum, a) => sum + a.points, 0);
  
  const renderAchievement = (achievement: Achievement) => {
    // Dynamic icon component based on the icon name from the data
    const IconComponent = LucideIcons[achievement.icon as keyof typeof LucideIcons] || LucideIcons.Award;
    
    return (
      <div 
        key={achievement.id}
        className={`p-3 rounded-lg flex items-start gap-3 transition-all ${
          achievement.isCompleted 
            ? 'bg-emerald-50 border border-emerald-100' 
            : 'bg-gray-50 border border-gray-100'
        }`}
      >
        <div className={`p-2 rounded-full ${
          achievement.isCompleted ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-500'
        }`}>
          <IconComponent size={16} />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-800">{achievement.title}</h3>
            <div className="flex items-center">
              <span className={`text-sm font-medium ${
                achievement.isCompleted ? 'text-emerald-600' : 'text-gray-500'
              }`}>
                {achievement.points} pts
              </span>
              {achievement.isCompleted && (
                <Check size={16} className="ml-1 text-emerald-500" />
              )}
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">{achievement.description}</p>
        </div>
      </div>
    );
  };
  
  return (
    <div className={`bg-white rounded-xl shadow-sm overflow-hidden ${className}`}>
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-purple-600" />
          <h2 className="text-lg font-semibold text-gray-800">Achievements & Rewards</h2>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-500">Your Awe Points</div>
          <div className="text-2xl font-bold text-purple-600">{totalEarnedPoints} <span className="text-sm text-gray-400">/ {totalPossiblePoints}</span></div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div 
            className="bg-purple-600 h-2.5 rounded-full transition-all duration-1000 ease-out" 
            style={{ width: `${(totalEarnedPoints / totalPossiblePoints) * 100}%` }}
          />
        </div>
        
        <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Completed</h3>
            {completedAchievements.length > 0 ? (
              <div className="space-y-2">
                {completedAchievements.map(renderAchievement)}
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">No achievements completed yet.</p>
            )}
          </div>
          
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">In Progress</h3>
            <div className="space-y-2">
              {inProgressAchievements.map(renderAchievement)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementsPanel;