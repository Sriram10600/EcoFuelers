import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import EnergyChart from '../components/EnergyChart';
import OfficeMap from '../components/OfficeMap';
import AchievementsPanel from '../components/AchievementsPanel';
import RecommendationsCard from '../components/RecommendationsCard';
import LeaderboardCard from '../components/LeaderboardCard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="p-4 md:p-6 space-y-6 max-w-screen-2xl mx-auto">
      {/* Top Row - Energy Chart and Leaderboard */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <EnergyChart className="xl:col-span-2" />
        <LeaderboardCard />
      </div>
      
      {/* Middle Row - Office Map */}
      <div>
        <OfficeMap />
      </div>
      
      {/* Bottom Row - Recommendations and Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecommendationsCard employeeId={user?.id || ''} />
        <AchievementsPanel />
      </div>
    </div>
  );
};

export default Dashboard;