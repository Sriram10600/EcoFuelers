import React, { useState, useRef, useEffect } from 'react';
import { Leaf, MenuIcon, Settings, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import InitialsAvatar from './InitialsAvatar';

interface HeaderProps {
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-700';
      case 'manager':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };
  
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button 
            onClick={onMenuToggle}
            className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 lg:hidden"
          >
            <MenuIcon size={20} />
          </button>
          
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-emerald-500 to-green-500 w-8 h-8 rounded-md flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-800 hidden sm:block">EcoFuelers</h1>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="relative" ref={menuRef}>
            <button 
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 hover:bg-gray-100 rounded-full p-1 pr-3 transition-all"
            >
              <InitialsAvatar name={user?.name || 'User'} size="sm" />
              <div className="hidden sm:block text-left">
                <span className="text-sm font-medium text-gray-700 block">{user?.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${getRoleBadgeColor(user?.role || 'employee')} capitalize`}>
                  {user?.role}
                </span>
              </div>
            </button>
            
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-10">
                <div className="px-4 py-2 border-b border-gray-100">
                  <div className="font-medium text-gray-800">{user?.name}</div>
                  <div className="text-xs text-gray-500">{user?.email}</div>
                  <div className={`text-xs mt-1 px-2 py-0.5 rounded-full ${getRoleBadgeColor(user?.role || 'employee')} inline-block capitalize`}>
                    {user?.role}
                  </div>
                </div>
                <Link 
                  to="/profile" 
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowUserMenu(false)}
                >
                  <User size={16} />
                  <span>Profile</span>
                </Link>
                <Link 
                  to="/settings" 
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowUserMenu(false)}
                >
                  <Settings size={16} />
                  <span>Settings</span>
                </Link>
                <div className="border-t border-gray-100 my-1"></div>
                <button 
                  onClick={handleSignOut}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                >
                  <LogOut size={16} />
                  <span>Sign out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;