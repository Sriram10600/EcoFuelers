import React, { useState } from 'react';
import { Map, Users, Lightbulb, Wind } from 'lucide-react';
import { Employee, Zone } from '../types';
import { employees, zones } from '../data/mockData';

interface OfficeMapProps {
  className?: string;
}

const OfficeMap: React.FC<OfficeMapProps> = ({ className = '' }) => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [hoveredZone, setHoveredZone] = useState<Zone | null>(null);
  
  const getEmployeesByZone = (zoneId: string): Employee[] => {
    const zone = zones.find(z => z.id === zoneId);
    if (!zone) return [];
    return employees.filter(emp => zone.employees.includes(emp.id));
  };
  
  const handleOptimizeSeating = () => {
    // In a real app, this would trigger an algorithm to optimize seating
    alert('Seating optimization recommendations generated!');
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
            className="px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors flex items-center gap-1.5"
          >
            <Users size={16} />
            <span>Optimize Seating</span>
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="relative h-[400px] border border-gray-200 rounded-lg overflow-hidden">
          {/* Office floor plan background */}
          <div className="absolute inset-0 bg-gray-50">
            {/* Zone outlines */}
            {zones.map(zone => (
              <div 
                key={zone.id}
                onMouseEnter={() => setHoveredZone(zone)}
                onMouseLeave={() => setHoveredZone(null)}
                className={`absolute border-2 rounded-md transition-all duration-300 ${
                  hoveredZone?.id === zone.id ? 'bg-blue-50 border-blue-400' : 'border-gray-300 bg-white bg-opacity-60'
                }`}
                style={{
                  left: `${zone.id === 'zone1' ? 10 : zone.id === 'zone2' ? 10 : zone.id === 'zone3' ? 55 : 55}%`,
                  top: `${zone.id === 'zone1' ? 10 : zone.id === 'zone2' ? 55 : zone.id === 'zone3' ? 10 : 55}%`,
                  width: '40%',
                  height: '40%',
                }}
              >
                <div className="absolute top-2 left-2 text-xs font-medium text-gray-700">
                  {zone.name}
                </div>
                
                {/* Show zone status */}
                <div className="absolute bottom-2 right-2 flex items-center gap-1.5">
                  <Lightbulb size={14} className={zone.isActive ? "text-yellow-500" : "text-gray-400"} />
                  <Wind size={14} className={zone.isActive ? "text-blue-500" : "text-gray-400"} />
                </div>
                
                {/* Energy consumption indicator */}
                <div className="absolute bottom-2 left-2 text-xs">
                  <span className="text-gray-500">{zone.energyConsumption.toFixed(1)} kWh</span>
                </div>
              </div>
            ))}
            
            {/* Employee markers */}
            {employees.map(employee => (
              <div 
                key={employee.id}
                onClick={() => setSelectedEmployee(employee)}
                className={`absolute w-12 h-12 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 cursor-pointer ${
                  selectedEmployee?.id === employee.id ? 'scale-110' : 'scale-100'
                }`}
                style={{
                  left: `${employee.position.x}%`,
                  top: `${employee.position.y}%`,
                }}
              >
                <div className={`w-full h-full rounded-full overflow-hidden border-2 ${
                  selectedEmployee?.id === employee.id ? 'border-blue-500' : 'border-white'
                }`}>
                  <img 
                    src={employee.avatar} 
                    alt={employee.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full shadow flex items-center justify-center">
                  <div className={`w-3 h-3 rounded-full ${employee.isDarkMode ? 'bg-indigo-500' : 'bg-yellow-500'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Employee or Zone details panel */}
      <div className="p-4 border-t border-gray-100 bg-gray-50">
        {selectedEmployee ? (
          <div className="flex items-start gap-3">
            <img 
              src={selectedEmployee.avatar} 
              alt={selectedEmployee.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <div>
              <h3 className="font-medium text-gray-800">{selectedEmployee.name}</h3>
              <p className="text-sm text-gray-500">{selectedEmployee.department}</p>
              <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-500">Laptop:</span>
                  <span className="font-medium text-gray-700">{selectedEmployee.laptopHours}h/day</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-500">Mode:</span>
                  <span className="font-medium text-gray-700">{selectedEmployee.isDarkMode ? 'Dark' : 'Light'}</span>
                </div>
                <div className="flex items-center gap-1.5 col-span-2 mt-1">
                  <span className="text-gray-500">Awe Points:</span>
                  <span className="font-medium text-emerald-600">{selectedEmployee.awePoints}</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setSelectedEmployee(null)}
              className="ml-auto text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
        ) : hoveredZone ? (
          <div>
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-800">{hoveredZone.name}</h3>
              <span className={`px-2 py-0.5 text-xs rounded-full ${
                hoveredZone.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {hoveredZone.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
              <div className="flex items-center gap-1.5">
                <span className="text-gray-500">Energy:</span>
                <span className="font-medium text-gray-700">{hoveredZone.energyConsumption.toFixed(1)} kWh</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-gray-500">CO2:</span>
                <span className="font-medium text-gray-700">{hoveredZone.co2Emissions.toFixed(1)} kg</span>
              </div>
              <div className="flex items-center gap-1.5 col-span-2 mt-1">
                <span className="text-gray-500">Employees:</span>
                <span className="font-medium text-gray-700">{getEmployeesByZone(hoveredZone.id).length}</span>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            Select an employee to see their details or hover over a zone to view energy statistics.
          </p>
        )}
      </div>
    </div>
  );
};

export default OfficeMap;