import React from 'react';

interface InitialsAvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const InitialsAvatar: React.FC<InitialsAvatarProps> = ({ name, size = 'md', className = '' }) => {
  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const getSizeClasses = (size: 'sm' | 'md' | 'lg') => {
    switch (size) {
      case 'sm':
        return 'w-8 h-8 text-sm';
      case 'lg':
        return 'w-14 h-14 text-xl';
      default:
        return 'w-10 h-10 text-base';
    }
  };

  const getRandomColor = (name: string) => {
    const colors = [
      'bg-blue-100 text-blue-600',
      'bg-emerald-100 text-emerald-600',
      'bg-purple-100 text-purple-600',
      'bg-amber-100 text-amber-600',
      'bg-rose-100 text-rose-600',
      'bg-indigo-100 text-indigo-600',
    ];
    
    // Use name to generate consistent color for each user
    const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
    return colors[index];
  };

  return (
    <div 
      className={`rounded-full flex items-center justify-center font-medium ${getSizeClasses(size)} ${getRandomColor(name)} ${className}`}
    >
      {getInitials(name)}
    </div>
  );
};

export default InitialsAvatar; 