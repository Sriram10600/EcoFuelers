import React, { useState } from 'react';
import { BarChart2, TrendingUp, Calendar, ArrowUpRight, ArrowDownRight, Download } from 'lucide-react';
import { TimeRange } from '../types';
import { getAnalyticsData } from '../data/mockData';

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('month');
  const analyticsData = getAnalyticsData(timeRange);
  
  // Calculate overall trends
  const currentMonth = analyticsData[analyticsData.length - 1];
  const previousMonth = analyticsData[analyticsData.length - 2];
  const consumptionTrend = ((currentMonth.actualConsumption - previousMonth.actualConsumption) / previousMonth.actualConsumption) * 100;
  const emissionsTrend = ((currentMonth.co2Emissions - previousMonth.co2Emissions) / previousMonth.co2Emissions) * 100;
  const savingsTrend = ((currentMonth.costSavings - previousMonth.costSavings) / previousMonth.costSavings) * 100;

  return (
    <div className="p-4 md:p-6 max-w-screen-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BarChart2 className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800">Analytics & Predictions</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
            {(['week', 'month', 'year'] as TimeRange[]).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  timeRange === range
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>
          
          <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Energy Consumption</h3>
            <TrendingUp className={`w-5 h-5 ${consumptionTrend < 0 ? 'text-emerald-500' : 'text-red-500'}`} />
          </div>
          
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-gray-800">{currentMonth.actualConsumption.toFixed(1)}</span>
            <span className="text-gray-500 mb-1">kWh</span>
            <span className={`ml-auto text-sm flex items-center ${consumptionTrend < 0 ? 'text-emerald-500' : 'text-red-500'}`}>
              {consumptionTrend < 0 ? <ArrowDownRight className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
              {Math.abs(consumptionTrend).toFixed(1)}%
            </span>
          </div>
          
          <div className="mt-6">
            <div className="text-sm text-gray-500 mb-2">Predicted Next Month</div>
            <div className="text-xl font-semibold text-blue-600">{currentMonth.predictedConsumption.toFixed(1)} kWh</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">CO2 Emissions</h3>
            <TrendingUp className={`w-5 h-5 ${emissionsTrend < 0 ? 'text-emerald-500' : 'text-red-500'}`} />
          </div>
          
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-gray-800">{currentMonth.co2Emissions.toFixed(1)}</span>
            <span className="text-gray-500 mb-1">kg</span>
            <span className={`ml-auto text-sm flex items-center ${emissionsTrend < 0 ? 'text-emerald-500' : 'text-red-500'}`}>
              {emissionsTrend < 0 ? <ArrowDownRight className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
              {Math.abs(emissionsTrend).toFixed(1)}%
            </span>
          </div>
          
          <div className="mt-6">
            <div className="text-sm text-gray-500 mb-2">Predicted Next Month</div>
            <div className="text-xl font-semibold text-emerald-600">{currentMonth.predictedEmissions.toFixed(1)} kg</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Cost Savings</h3>
            <TrendingUp className={`w-5 h-5 ${savingsTrend > 0 ? 'text-emerald-500' : 'text-red-500'}`} />
          </div>
          
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-gray-800">${currentMonth.costSavings.toFixed(2)}</span>
            <span className={`ml-auto text-sm flex items-center ${savingsTrend > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
              {savingsTrend > 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              {Math.abs(savingsTrend).toFixed(1)}%
            </span>
          </div>
          
          <div className="mt-6">
            <div className="text-sm text-gray-500 mb-2">Predicted Next Month</div>
            <div className="text-xl font-semibold text-amber-600">${currentMonth.predictedSavings.toFixed(2)}</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Consumption Trends & Predictions</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Actual</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-200 rounded-full"></div>
              <span className="text-sm text-gray-600">Predicted</span>
            </div>
          </div>
        </div>

        <div className="h-80 relative">
          <div className="absolute inset-0 flex items-end justify-between">
            {analyticsData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="relative w-full px-1">
                  {/* Actual consumption bar */}
                  <div
                    className="w-full bg-blue-500 rounded-t transition-all duration-500"
                    style={{ height: `${(data.actualConsumption / 200) * 100}%`, opacity: 0.9 }}
                  />
                  {/* Predicted consumption bar */}
                  {data.predictedConsumption > 0 && (
                    <div
                      className="w-full bg-blue-200 rounded-t transition-all duration-500 mt-1"
                      style={{ height: `${(data.predictedConsumption / 200) * 100}%`, opacity: 0.7 }}
                    />
                  )}
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  {new Date(data.date).toLocaleDateString('en-US', { month: 'short' })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;