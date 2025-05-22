import React, { useState, useEffect } from 'react';
import { Map, Users, Lightbulb, Wind, Monitor, Coffee, Laptop, UserPlus, Zap, ThermometerSun, Info } from 'lucide-react';
import { Employee, Zone } from '../types';
import { employees, zones, allEmployees } from '../data/mockData';
import AIPredictions from './AIPredictions';

interface OfficeMapProps {
  className?: string;
}

const OfficeMap: React.FC<OfficeMapProps> = ({ className = '' }) => {
  const [hoveredZone, setHoveredZone] = useState<Zone | null>(null);
  const [optimizationSuggestions, setOptimizationSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const getEmployeesByZone = (zoneId: string): Employee[] => {
    const zone = zones.find(z => z.id === zoneId);
    if (!zone) return [];
    return allEmployees.filter(emp => zone.employees.includes(emp.id));
  };

  // Calculate potential energy savings based on seating optimization
  const calculateSeatingOptimization = () => {
    const suggestions: string[] = [];
    
    // Calculate average employees per zone
    const totalEmployees = zones.reduce((sum, zone) => sum + getEmployeesByZone(zone.id).length, 0);
    const avgEmployeesPerZone = Math.floor(totalEmployees / zones.length);
    
    // Sort zones by efficiency score (dark mode usage)
    const zoneEfficiencies = zones.map(zone => ({
      zone,
      efficiency: calculateZoneEfficiency(zone),
      employees: getEmployeesByZone(zone.id),
      darkModeCount: getEmployeesByZone(zone.id).filter(emp => emp.isDarkMode).length
    }));

    // Find zones with significant imbalances
    zoneEfficiencies.forEach(sourceZone => {
      const excessEmployees = sourceZone.employees.length - avgEmployeesPerZone;
      
      if (excessEmployees > 2) { // If zone has more than average + 2 employees
        // Find zones that could benefit from more employees
        const targetZones = zoneEfficiencies
          .filter(z => 
            z.zone.id !== sourceZone.zone.id && 
            z.employees.length < avgEmployeesPerZone &&
            z.efficiency >= sourceZone.efficiency // Only move to zones with equal or better efficiency
          )
          .sort((a, b) => b.efficiency - a.efficiency);

        if (targetZones.length > 0) {
          const employeesToMove = Math.floor(excessEmployees / 2); // Move half of excess employees
          suggestions.push(
            `Move ${employeesToMove} employee${employeesToMove > 1 ? 's' : ''} from ${sourceZone.zone.name} to ${targetZones[0].zone.name} to balance occupancy and optimize energy usage`
          );
        }
      }

      // Check dark mode distribution
      if (sourceZone.darkModeCount / sourceZone.employees.length < 0.4) { // Less than 40% dark mode usage
        const darkModeZones = zoneEfficiencies
          .filter(z => 
            z.zone.id !== sourceZone.zone.id &&
            z.darkModeCount / z.employees.length > 0.6 // More than 60% dark mode usage
          )
          .sort((a, b) => b.efficiency - a.efficiency);

        if (darkModeZones.length > 0) {
          const suggestedMove = Math.min(2, Math.floor(sourceZone.employees.length * 0.2)); // Move up to 20% or 2 employees
          suggestions.push(
            `Suggest moving ${suggestedMove} employee${suggestedMove > 1 ? 's' : ''} from ${sourceZone.zone.name} to ${darkModeZones[0].zone.name} to improve dark mode adoption`
          );
        }
      }
    });

    setOptimizationSuggestions(suggestions);
  };
  
  const handleOptimizeSeating = () => {
    calculateSeatingOptimization();
  };

  // Zone layout configuration
  const zoneLayout = {
    zone1: { left: '5%', top: '5%', width: '42%', height: '42%', name: 'Engineering Zone' },
    zone2: { left: '53%', top: '5%', width: '42%', height: '42%', name: 'Design Zone' },
    zone3: { left: '5%', top: '53%', width: '42%', height: '42%', name: 'Marketing Zone' },
    zone4: { left: '53%', top: '53%', width: '42%', height: '42%', name: 'Product & Finance Zone' }
  };

  // Calculate zone efficiency score
  const calculateZoneEfficiency = (zone: Zone) => {
    const zoneEmployees = getEmployeesByZone(zone.id);
    const darkModeUsers = zoneEmployees.filter(emp => emp.isDarkMode).length;
    const efficiency = (darkModeUsers / Math.max(zoneEmployees.length, 1)) * 100;
    return efficiency;
  };

  // Zone metrics component
  const ZoneMetrics = ({ zone }: { zone: Zone }) => {
    const efficiency = calculateZoneEfficiency(zone);
    const employeeCount = getEmployeesByZone(zone.id).length;
    const darkModeCount = getEmployeesByZone(zone.id).filter(emp => emp.isDarkMode).length;
    
    return (
      <div className="absolute top-12 left-2 bg-white bg-opacity-90 px-2 py-1.5 rounded-md text-xs space-y-1.5">
        <div className="flex items-center gap-1 text-gray-600">
          <Zap size={12} className="text-yellow-500" />
          <span>{zone.energyConsumption.toFixed(1)} kWh</span>
        </div>
        <div className="flex items-center gap-1 text-gray-600">
          <Wind size={12} className="text-blue-500" />
          <span>{zone.co2Emissions.toFixed(1)} kg CO2</span>
        </div>
        <div className="flex items-center gap-1 text-gray-600 group relative">
          <ThermometerSun size={12} className="text-orange-500" />
          <span>Efficiency: {efficiency.toFixed(0)}%</span>
          <Info size={12} className="text-gray-400 cursor-help" />
          <div className="hidden group-hover:block absolute left-full ml-2 w-48 p-2 bg-gray-800 text-white text-xs rounded shadow-lg">
            Efficiency score based on dark mode usage and energy optimization
          </div>
        </div>
        <div className="flex items-center gap-1 text-gray-600">
          <Users size={12} className="text-indigo-500" />
          <span>{employeeCount} {employeeCount === 1 ? 'Employee' : 'Employees'}</span>
          <span className="text-xs text-gray-500">({darkModeCount} dark mode)</span>
        </div>
      </div>
    );
  };

  // Zone employee count component
  const ZoneEmployeeCount = ({ zone }: { zone: Zone }) => {
    const employeeCount = getEmployeesByZone(zone.id).length;
    const darkModeCount = getEmployeesByZone(zone.id).filter(emp => emp.isDarkMode).length;
    
    return (
      <div className="absolute bottom-4 right-4 bg-white bg-opacity-90 px-3 py-2 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-indigo-500" />
          <div>
            <div className="font-medium text-gray-800">{employeeCount}</div>
            <div className="text-xs text-gray-500">Employees</div>
          </div>
          <div className="ml-2 pl-2 border-l border-gray-200">
            <div className="font-medium text-gray-800">{darkModeCount}</div>
            <div className="text-xs text-gray-500">Dark Mode</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm overflow-hidden ${className}`}>
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Map className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-800">Office Floor Plan</h2>
          </div>
          <button 
            onClick={handleOptimizeSeating}
            className="px-3 py-1.5 text-sm bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition-colors flex items-center gap-1.5"
            disabled={isLoading}
          >
            <UserPlus size={16} />
            <span>Optimize Seating</span>
          </button>
        </div>
      </div>
      
      <div className="space-y-4 p-4">
        {/* Floor Plan */}
        <div>
          {isLoading ? (
            <div className="h-[500px] flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            </div>
          ) : (
            <div className="relative h-[500px] border border-gray-200 rounded-lg overflow-hidden bg-gradient-to-br from-gray-50 to-white">
              {/* Grid lines for visual reference */}
              <div className="absolute inset-0" style={{
                backgroundImage: 'linear-gradient(to right, #f0f0f0 1px, transparent 1px), linear-gradient(to bottom, #f0f0f0 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }} />

              {/* Zones */}
              {zones.map(zone => {
                const layout = zoneLayout[zone.id as keyof typeof zoneLayout];
                return (
                  <div 
                    key={zone.id}
                    onMouseEnter={() => setHoveredZone(zone)}
                    onMouseLeave={() => setHoveredZone(null)}
                    className={`absolute border-2 rounded-lg transition-all duration-300 ${
                      hoveredZone?.id === zone.id 
                        ? 'bg-blue-50 border-blue-400 shadow-lg' 
                        : 'border-gray-200 bg-white bg-opacity-60'
                    }`}
                    style={{
                      left: layout.left,
                      top: layout.top,
                      width: layout.width,
                      height: layout.height,
                    }}
                  >
                    {/* Zone header */}
                    <div className="absolute top-2 left-2 right-2 flex items-center justify-between">
                      <div className="bg-white px-2 py-1 rounded-md shadow-sm">
                        <h3 className="text-sm font-medium text-gray-800">{layout.name}</h3>
                      </div>
                      <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-md shadow-sm">
                        <span className="text-xs text-gray-600">Status:</span>
                        <div className={`h-2 w-2 rounded-full ${zone.isActive ? 'bg-green-500' : 'bg-gray-400'}`} />
                      </div>
                    </div>

                    {/* Zone metrics */}
                    <ZoneMetrics zone={zone} />

                    {/* Zone employee count */}
                    <ZoneEmployeeCount zone={zone} />
                  </div>
                );
              })}
            </div>
          )}

          {/* Optimization suggestions */}
          {optimizationSuggestions.length > 0 && (
            <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
              <h4 className="text-sm font-medium text-emerald-800 mb-2">Optimization Suggestions:</h4>
              <ul className="space-y-1">
                {optimizationSuggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-emerald-700">
                    <UserPlus size={14} className="mt-0.5 flex-shrink-0" />
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Details panel */}
        <div className="p-4 border border-gray-100 bg-gray-50 rounded-xl">
          {hoveredZone ? (
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-800">{hoveredZone.name}</h3>
                <span className={`px-2 py-0.5 text-xs rounded-full ${
                  hoveredZone.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {hoveredZone.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <div className="flex items-center gap-1.5">
                  <Zap size={14} className="text-yellow-500" />
                  <span className="text-gray-500">Energy:</span>
                  <span className="font-medium text-gray-700">{hoveredZone.energyConsumption.toFixed(1)} kWh</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Wind size={14} className="text-blue-500" />
                  <span className="text-gray-500">CO2:</span>
                  <span className="font-medium text-gray-700">{hoveredZone.co2Emissions.toFixed(1)} kg</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ThermometerSun size={14} className="text-orange-500" />
                  <span className="text-gray-500">Efficiency:</span>
                  <span className="font-medium text-gray-700">{calculateZoneEfficiency(hoveredZone).toFixed(0)}%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users size={14} className="text-indigo-500" />
                  <span className="text-gray-500">Employees:</span>
                  <span className="font-medium text-gray-700">{getEmployeesByZone(hoveredZone.id).length}</span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              Hover over a zone to view detailed energy statistics and team information.
            </p>
          )}
        </div>

        {/* AI Predictions */}
        <AIPredictions />
      </div>
    </div>
  );
};

export default OfficeMap;