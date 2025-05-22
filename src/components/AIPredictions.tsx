import React from 'react';
import { Zap, Clock, AlertTriangle } from 'lucide-react';
import { behavioralPatterns, equipmentStatus } from '../data/mockData';

const AIPredictions = () => {
  // Get employees that need attention (high laptop hours or forgotten shutdowns)
  const employeesNeedingAttention = behavioralPatterns
    .filter(pattern => pattern.patterns.forgottenLaptopShutdowns > 2)
    .slice(0, 3);

  // Get equipment that needs maintenance
  const equipmentNeedingMaintenance = equipmentStatus
    .filter(equipment => equipment.status !== 'Optimal')
    .slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Employee Behavior Insights */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-600" />
            Employee Behavior Insights
          </h2>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            {employeesNeedingAttention.map(insight => (
              <div
                key={insight.employeeId}
                className="p-3 bg-amber-50 rounded-lg border border-amber-100"
              >
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-amber-800">
                      Attention Needed
                    </div>
                    <div className="text-sm text-amber-700 mt-1">
                      <div>Forgotten Shutdowns: {insight.patterns.forgottenLaptopShutdowns}</div>
                      <div>Active Hours: {insight.patterns.averageActiveHours.toFixed(1)}h/day</div>
                      <div className="mt-2">
                        <span className="text-amber-600 font-medium">Suggestions:</span>
                        <ul className="list-disc list-inside mt-1">
                          {insight.patterns.suggestions.map((suggestion, index) => (
                            <li key={index} className="text-amber-700">{suggestion}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Equipment Maintenance Predictions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Zap className="w-5 h-5 text-emerald-600" />
            Equipment Maintenance Predictions
          </h2>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            {equipmentNeedingMaintenance.map(equipment => (
              <div
                key={equipment.id}
                className={`p-3 rounded-lg border ${
                  equipment.status === 'Maintenance Required'
                    ? 'bg-red-50 border-red-100'
                    : 'bg-amber-50 border-amber-100'
                }`}
              >
                <div className="flex items-start gap-3">
                  <AlertTriangle
                    className={`w-5 h-5 ${
                      equipment.status === 'Maintenance Required'
                        ? 'text-red-500'
                        : 'text-amber-500'
                    } mt-0.5`}
                  />
                  <div>
                    <div
                      className={`text-sm font-medium ${
                        equipment.status === 'Maintenance Required'
                          ? 'text-red-800'
                          : 'text-amber-800'
                      }`}
                    >
                      {equipment.name}
                    </div>
                    <div
                      className={`text-sm mt-1 ${
                        equipment.status === 'Maintenance Required'
                          ? 'text-red-700'
                          : 'text-amber-700'
                      }`}
                    >
                      <div>Status: {equipment.status}</div>
                      <div>Efficiency: {equipment.efficiency}%</div>
                      <div>Next Maintenance: {equipment.predictedMaintenance}</div>
                      {equipment.maintenanceReason && (
                        <div className="mt-1">
                          <span className="font-medium">Reason:</span>{' '}
                          {equipment.maintenanceReason}
                        </div>
                      )}
                    </div>
                  </div>
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