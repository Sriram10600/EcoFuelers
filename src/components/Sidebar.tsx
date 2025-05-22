import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  BarChart, 
  Award, 
  Settings, 
  HelpCircle,
  Leaf,
  Gamepad2,
  Brain
} from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onNavigate }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside 
        className={`bg-white border-r border-gray-200 fixed top-0 left-0 bottom-0 w-64 z-30 transition-transform duration-300 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-4 border-b border-gray-200 flex items-center gap-2">
          <div className="bg-gradient-to-r from-emerald-500 to-green-500 w-10 h-10 rounded-md flex items-center justify-center">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-xl text-gray-800">EcoFuelers</h2>
            <p className="text-xs text-gray-500">Renewable Energy Dashboard</p>
          </div>
        </div>
        
        <nav className="p-4 space-y-1">
          <button 
            onClick={() => onNavigate('/')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md font-medium transition-colors ${
              currentPath === '/' 
                ? 'bg-emerald-50 text-emerald-700' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </button>
          
          <button 
            onClick={() => onNavigate('/team')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md font-medium transition-colors ${
              currentPath === '/team' 
                ? 'bg-emerald-50 text-emerald-700' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Users size={18} />
            <span>Team</span>
          </button>
          
          <button 
            onClick={() => onNavigate('/analytics')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md font-medium transition-colors ${
              currentPath === '/analytics' 
                ? 'bg-emerald-50 text-emerald-700' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <BarChart size={18} />
            <span>Analytics</span>
          </button>
          
          <button 
            onClick={() => onNavigate('/leaderboard')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md font-medium transition-colors ${
              currentPath === '/leaderboard' 
                ? 'bg-emerald-50 text-emerald-700' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Award size={18} />
            <span>Leaderboard</span>
          </button>
          
          <button 
            onClick={() => onNavigate('/training')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md font-medium transition-colors ${
              currentPath === '/training' 
                ? 'bg-emerald-50 text-emerald-700' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Gamepad2 size={18} />
            <span>Training & Challenges</span>
          </button>

          <button 
            onClick={() => onNavigate('/quiz')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md font-medium transition-colors ${
              currentPath === '/quiz' 
                ? 'bg-emerald-50 text-emerald-700' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Brain size={18} />
            <span>Energy Quiz</span>
          </button>
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 space-y-1">
          <button
            onClick={() => onNavigate('/settings')}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md font-medium transition-colors ${
              currentPath === '/settings'
                ? 'bg-emerald-50 text-emerald-700'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Settings size={16} />
            <span>Settings</span>
          </button>
          
          <button
            onClick={() => onNavigate('/help')}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md font-medium transition-colors ${
              currentPath === '/help'
                ? 'bg-emerald-50 text-emerald-700'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <HelpCircle size={16} />
            <span>Help & Support</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;