import React from 'react';
import { Award, Zap } from 'lucide-react';
import { EcoBadge } from '../types';
import BadgeIcon from './BadgeIcon';

interface UserStatsProps {
  badges: EcoBadge[];
  awePoints: number;
  showDetails?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const UserStats: React.FC<UserStatsProps> = ({
  badges,
  awePoints,
  showDetails = false,
  size = 'md',
  className = ''
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          container: 'gap-2',
          text: 'text-xs',
          icon: 14,
          badge: 'w-6 h-6'
        };
      case 'lg':
        return {
          container: 'gap-4',
          text: 'text-base',
          icon: 18,
          badge: 'w-8 h-8'
        };
      default: // md
        return {
          container: 'gap-3',
          text: 'text-sm',
          icon: 16,
          badge: 'w-7 h-7'
        };
    }
  };

  const sizeClasses = getSizeClasses();

  return (
    <div className={`flex items-center ${sizeClasses.container} ${className}`}>
      {/* AWE Points */}
      <div className="flex items-center gap-1.5">
        <div className="p-1.5 bg-purple-100 rounded-full">
          <Zap className="text-purple-600" size={sizeClasses.icon} />
        </div>
        <div>
          <div className={`font-medium text-gray-900 ${sizeClasses.text}`}>
            {awePoints} points
          </div>
          {showDetails && (
            <div className="text-xs text-gray-500">AWE Score</div>
          )}
        </div>
      </div>

      {/* Badges */}
      <div className="flex items-center gap-1.5">
        <div className="p-1.5 bg-amber-100 rounded-full">
          <Award className="text-amber-600" size={sizeClasses.icon} />
        </div>
        <div>
          <div className={`font-medium text-gray-900 ${sizeClasses.text}`}>
            {badges.length} badges
          </div>
          {showDetails && (
            <div className="text-xs text-gray-500">Earned</div>
          )}
        </div>
      </div>

      {/* Badge Icons */}
      {showDetails && badges.length > 0 && (
        <div className="flex -space-x-2 hover:space-x-1 transition-all duration-200 ml-2">
          {badges.map(badge => (
            <div 
              key={badge.id}
              className="transform hover:translate-y-[-2px] transition-transform duration-200"
            >
              <BadgeIcon badge={badge} size={sizeClasses.icon} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserStats; 