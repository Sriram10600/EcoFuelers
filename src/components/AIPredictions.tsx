import React from 'react';
import { 
  Wrench, 
  AlertTriangle, 
  Calendar, 
  Battery, 
  Zap, 
  Clock, 
  CheckCircle2, 
  XCircle,
  BrainCircuit
} from 'lucide-react';
import { 
  equipmentStatus, 
  getPredictedMaintenanceSchedule, 
  getEmployeeBehavioralInsights,
  behavioralPatterns
} from '../data/mockData';

const AIPredictions: React.FC = () => {
  const maintenanceNeeded = getPredictedMaintenanceSchedule();
  const overallEfficiency = equipmentStatus.reduce((acc, curr) => acc + curr.efficiency, 0) / equipmentStatus.length;
  
  // Get top behavioral insights
  const topBehavioralInsights = behavioralPatterns
    .filter(pattern => pattern.patterns.forgottenLaptopShutdowns > 2 || pattern.patterns.darkModeUsage < 50)
    .slice(0, 3);

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <BrainCircuit className="w-5 h-5 text-purple-600" />
          <h2 className="text-lg font-semibold text-gray-800">AI Predictive Analytics</h2>
        </div>
      </div>

      <div className="p-4">
        {/* Equipment Maintenance Predictions */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-800 mb-3 flex items-center gap-2">
            <Wrench className="w-4 h-4 text-blue-500" />
            Predictive Maintenance
          </h3>
          
          <div className="space-y-3">
            {maintenanceNeeded.map(equipment => (
              <div 
                key={equipment.id}
                className="bg-gray-50 rounded-lg p-3 border border-gray-100"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium text-gray-800">{equipment.name}</div>
                    <div className="text-sm text-gray-500">{equipment.location}</div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    equipment.status === 'Maintenance Required' 
                      ? 'bg-red-100 text-red-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {equipment.status}
                  </div>
                </div>
                
                <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Due: {new Date(equipment.predictedMaintenance).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Battery className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Efficiency: {equipment.efficiency}%</span>
                  </div>
                </div>
                
                {equipment.maintenanceReason && (
                  <div className="mt-2 flex items-start gap-1.5 text-sm text-gray-600">
                    <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                    {equipment.maintenanceReason}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-center gap-2 text-sm">
            <div className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
              Overall Equipment Efficiency: {overallEfficiency.toFixed(0)}%
            </div>
          </div>
        </div>

        {/* Behavioral Predictions */}
        <div>
          <h3 className="text-sm font-medium text-gray-800 mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4 text-emerald-500" />
            Behavioral Insights & Predictions
          </h3>

          <div className="space-y-3">
            {topBehavioralInsights.map(insight => (
              <div 
                key={insight.employeeId}
                className="bg-gray-50 rounded-lg p-3 border border-gray-100"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span className="font-medium text-gray-800">
                      Active Hours: {insight.patterns.averageActiveHours.toFixed(1)}h/day
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Potential Savings: {insight.predictedSavings}kWh/month
                  </div>
                </div>

                <div className="space-y-1.5">
                  {insight.patterns.commonIssues.map((issue, index) => (
                    <div key={index} className="flex items-center gap-1.5 text-sm">
                      <XCircle className="w-4 h-4 text-red-500" />
                      <span className="text-gray-600">{issue}</span>
                    </div>
                  ))}
                  {insight.patterns.suggestions.map((suggestion, index) => (
                    <div key={index} className="flex items-center gap-1.5 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span className="text-gray-600">{suggestion}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-2 flex items-center gap-2">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    insight.patterns.darkModeUsage > 70
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    Dark Mode: {insight.patterns.darkModeUsage.toFixed(0)}%
                  </div>
                  {insight.patterns.forgottenLaptopShutdowns > 0 && (
                    <div className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                      {insight.patterns.forgottenLaptopShutdowns} forgotten shutdowns
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPredictions; 