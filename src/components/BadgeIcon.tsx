import React from 'react';
import { 
  Zap, 
  Moon, 
  Users, 
  Lightbulb,
  Trophy,
  Star,
  Award
} from 'lucide-react';
import { EcoBadge } from '../types';

interface BadgeIconProps {
  badge: EcoBadge;
  size?: number;
}

const BadgeIcon: React.FC<BadgeIconProps> = ({ badge, size = 16 }) => {
  const getLevelColor = (level: EcoBadge['level']) => {
    switch (level) {
      case 'platinum':
        return 'text-purple-500 bg-purple-100';
      case 'gold':
        return 'text-amber-500 bg-amber-100';
      case 'silver':
        return 'text-gray-500 bg-gray-100';
      case 'bronze':
        return 'text-orange-500 bg-orange-100';
      default:
        return 'text-gray-500 bg-gray-100';
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap':
        return <Zap size={size} />;
      case 'Moon':
        return <Moon size={size} />;
      case 'Users':
        return <Users size={size} />;
      case 'Lightbulb':
        return <Lightbulb size={size} />;
      case 'Trophy':
        return <Trophy size={size} />;
      case 'Star':
        return <Star size={size} />;
      default:
        return <Award size={size} />;
    }
  };

  return (
    <div className="group relative">
      <div 
        className={`w-7 h-7 rounded-full flex items-center justify-center ${getLevelColor(badge.level)}`}
      >
        {getIcon(badge.icon)}
      </div>
      
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block w-48 z-10">
        <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 shadow-lg">
          <div className="font-medium mb-1">{badge.name}</div>
          <div className="text-gray-300 text-[11px]">{badge.description}</div>
          <div className="mt-1 text-[11px] flex items-center gap-1">
            <Award size={12} className="text-yellow-400" />
            <span className="capitalize">{badge.level}</span>
          </div>
        </div>
        <div className="w-2 h-2 bg-gray-900 transform rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
      </div>
    </div>
  );
};

export default BadgeIcon; 