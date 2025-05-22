import React, { useState } from 'react';
import { Leaf, MenuIcon, BellIcon, Settings, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { signOut } = useAuth();
  const navigate = useNavigate();
  
  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
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
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <button className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 relative">
              <BellIcon size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 hover:bg-gray-100 rounded-full p-1 pr-2 transition-all"
            >
              <img 
                src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150" 
                alt="User avatar"
                className="w-8 h-8 rounded-full object-cover border border-gray-200"
              />
              <span className="text-sm font-medium text-gray-700 hidden sm:block">Alex Johnson</span>
            </button>
            
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-10">
                <div className="px-4 py-2 border-b border-gray-100">
                  <div className="font-medium text-gray-800">Alex Johnson</div>
                  <div className="text-xs text-gray-500">alex.johnson@ecofuelers.com</div>
                </div>
                <a href="#" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <User size={16} />
                  <span>Profile</span>
                </a>
                <a href="#" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <Settings size={16} />
                  <span>Settings</span>
                </a>
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