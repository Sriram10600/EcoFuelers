import React, { useState, useEffect } from 'react';
import { BarChart, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { EnergyData, TimeRange } from '../types';
import { getWeeklyEnergyData } from '../data/mockData';

interface EnergyChartProps {
  className?: string;
}

const EnergyChart: React.FC<EnergyChartProps> = ({ className = '' }) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('week');
  const [energyData, setEnergyData] = useState<EnergyData[]>([]);
  
  useEffect(() => {
    const data = getWeeklyEnergyData();
    const filteredData = timeRange === 'day' 
      ? data.slice(-1)
      : timeRange === 'week'
      ? data.slice(-7)
      : data.slice(-30);
    setEnergyData(filteredData);
  }, [timeRange]);
  
  // Get the latest data point
  const latestData = energyData[energyData.length - 1];
  const previousData = energyData[energyData.length - 2] || latestData;
  
  // Calculate change
  const consumptionChange = ((latestData?.totalConsumption - previousData?.totalConsumption) / previousData?.totalConsumption) * 100;
  const emissionsChange = ((latestData?.co2Emissions - previousData?.co2Emissions) / previousData?.co2Emissions) * 100;
  
  return (
    <div className={`bg-white rounded-xl shadow-sm p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-600" />
          <h2 className="text-lg font-semibold text-gray-800">Energy Consumption</h2>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setTimeRange('day')}
            className={`px-3 py-1 text-sm rounded-md ${timeRange === 'day' ? 'bg-emerald-100 text-emerald-700' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            Day
          </button>
          <button 
            onClick={() => setTimeRange('week')}
            className={`px-3 py-1 text-sm rounded-md ${timeRange === 'week' ? 'bg-emerald-100 text-emerald-700' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            Week
          </button>
          <button 
            onClick={() => setTimeRange('month')}
            className={`px-3 py-1 text-sm rounded-md ${timeRange === 'month' ? 'bg-emerald-100 text-emerald-700' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            Month
          </button>
        </div>
      </div>
      
      {latestData && (
        <>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-sm text-gray-500 mb-1">Energy Consumption</div>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold text-gray-800">{latestData.totalConsumption.toFixed(2)}</span>
                <span className="text-sm text-gray-500">kWh</span>
                <span className={`ml-auto text-sm flex items-center ${consumptionChange < 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                  {consumptionChange < 0 ? <ArrowDownRight className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                  {Math.abs(consumptionChange).toFixed(2)}%
                </span>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-sm text-gray-500 mb-1">CO2 Emissions</div>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold text-gray-800">{latestData.co2Emissions.toFixed(2)}</span>
                <span className="text-sm text-gray-500">kg</span>
                <span className={`ml-auto text-sm flex items-center ${emissionsChange < 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                  {emissionsChange < 0 ? <ArrowDownRight className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                  {Math.abs(emissionsChange).toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
          
          <div className="relative h-56 mt-6 mb-2">
            <div className="absolute bottom-0 inset-x-0 flex items-end justify-between h-40 gap-1">
              {energyData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-emerald-500 rounded-t-sm transition-all duration-500 ease-out" 
                    style={{ 
                      height: `${(data.totalConsumption / 160) * 100}%`,
                      opacity: 0.7 + (index / energyData.length) * 0.3
                    }}
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(data.timestamp).getDate()}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-2 mt-4">
            <div className="bg-emerald-50 rounded-lg p-2 text-center">
              <div className="text-xs text-gray-500">Lighting</div>
              <div className="text-sm font-medium text-gray-800 mt-1">{latestData.breakdown.lighting.toFixed(2)} kWh</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-2 text-center">
              <div className="text-xs text-gray-500">AC</div>
              <div className="text-sm font-medium text-gray-800 mt-1">{latestData.breakdown.ac.toFixed(2)} kWh</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-2 text-center">
              <div className="text-xs text-gray-500">Laptops</div>
              <div className="text-sm font-medium text-gray-800 mt-1">{latestData.breakdown.laptops.toFixed(2)} kWh</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-2 text-center">
              <div className="text-xs text-gray-500">Other</div>
              <div className="text-sm font-medium text-gray-800 mt-1">{latestData.breakdown.other.toFixed(2)} kWh</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EnergyChart;