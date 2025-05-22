import React, { useState } from 'react';
import { Lightbulb, CheckCircle, RefreshCw } from 'lucide-react';
import { calculatePotentialSavings, getEmployeeRecommendations, markRecommendationComplete, isRecommendationCompleted } from '../data/mockData';

interface RecommendationsCardProps {
  className?: string;
  employeeId: string;
}

const RecommendationsCard: React.FC<RecommendationsCardProps> = ({ className = '', employeeId }) => {
  const [showAll, setShowAll] = useState(false);
  const [, setUpdateTrigger] = useState(0); // Force re-render when recommendations are updated
  const allRecommendations = getEmployeeRecommendations(employeeId);
  const recommendations = showAll ? allRecommendations : allRecommendations.slice(0, 3);
  const potentialSavings = calculatePotentialSavings();
  
  const handleMarkCompleted = (index: number) => {
    markRecommendationComplete(employeeId, index);
    setUpdateTrigger(prev => prev + 1); // Force re-render
  };
  
  return (
    <div className={`bg-white rounded-xl shadow-sm overflow-hidden ${className}`}>
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          <h2 className="text-lg font-semibold text-gray-800">Personalized Recommendations</h2>
        </div>
      </div>
      
      <div className="p-4">
        <div className="mb-4 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-lg p-3 border border-emerald-100">
          <h3 className="text-sm font-medium text-gray-800 mb-1">Potential Savings Today</h3>
          <div className="grid grid-cols-3 gap-2 mt-2">
            <div className="text-center">
              <div className="text-sm text-gray-500">Energy</div>
              <div className="font-semibold text-blue-700 mt-0.5">{potentialSavings.energy.toFixed(2)} kWh</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500">CO2</div>
              <div className="font-semibold text-emerald-700 mt-0.5">{potentialSavings.co2.toFixed(2)} kg</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500">Cost</div>
              <div className="font-semibold text-amber-700 mt-0.5">${potentialSavings.cost.toFixed(2)}</div>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          {recommendations.map((recommendation, index) => {
            const isCompleted = isRecommendationCompleted(employeeId, index);
            return (
              <div 
                key={index} 
                className={`p-3 rounded-lg border transition-all ${
                  isCompleted 
                    ? 'bg-emerald-50 border-emerald-100' 
                    : 'bg-white border-gray-200 hover:border-blue-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-1.5 rounded-full flex-shrink-0 ${
                    isCompleted ? 'bg-emerald-100' : 'bg-blue-100'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle size={16} className="text-emerald-600" />
                    ) : (
                      <Lightbulb size={16} className="text-blue-600" />
                    )}
                  </div>
                  <p className="text-sm text-gray-700 flex-1">{recommendation}</p>
                  
                  <button
                    onClick={() => handleMarkCompleted(index)}
                    className={`px-2 py-1 text-xs rounded font-medium transition-all flex items-center gap-1 ${
                      isCompleted
                        ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {isCompleted ? (
                      <>Done</>
                    ) : (
                      <>Mark Done</>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        
        <button 
          onClick={() => setShowAll(!showAll)}
          className="mt-4 w-full py-2 flex items-center justify-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          <RefreshCw size={14} />
          <span>{showAll ? 'Show Less' : 'Load More Recommendations'}</span>
        </button>
      </div>
    </div>
  );
};

export default RecommendationsCard;