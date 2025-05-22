import React, { useState } from 'react';
import { BarChart2, TrendingUp, Calendar, ArrowUpRight, ArrowDownRight, Download } from 'lucide-react';
import { TimeRange } from '../types';
import { getAnalyticsData } from '../data/mockData';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('day');
  const analyticsData = getAnalyticsData(timeRange);
  
  // Calculate overall trends
  const currentData = analyticsData[analyticsData.length - 1];
  const previousData = analyticsData[analyticsData.length - 2] || analyticsData[analyticsData.length - 1];
  const consumptionTrend = ((currentData.actualConsumption - previousData.actualConsumption) / previousData.actualConsumption) * 100;
  const emissionsTrend = ((currentData.co2Emissions - previousData.co2Emissions) / previousData.co2Emissions) * 100;
  const savingsTrend = ((currentData.costSavings - previousData.costSavings) / previousData.costSavings) * 100;

  // Format labels based on time range
  const formatLabel = (date: string) => {
    const dateObj = new Date(date);
    switch (timeRange) {
      case 'day':
        return dateObj.toLocaleTimeString('en-US', { 
          hour: 'numeric',
          minute: '2-digit',
          hour12: true 
        });
      case 'week':
        return dateObj.toLocaleDateString('en-US', { 
          weekday: 'short',
          month: 'short',
          day: 'numeric'
        });
      case 'month':
        return dateObj.toLocaleDateString('en-US', { 
          month: 'short',
          day: 'numeric'
        });
      default:
        return '';
    }
  };

  const labels = analyticsData.map(data => formatLabel(data.date));

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Actual Consumption',
        data: analyticsData.map(data => data.actualConsumption),
        backgroundColor: 'rgba(59, 130, 246, 0.9)', // blue-500
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
        tension: 0.4,
      },
      {
        label: 'Predicted Consumption',
        data: analyticsData.map(data => data.predictedConsumption),
        backgroundColor: 'rgba(147, 197, 253, 0.7)', // blue-200
        borderColor: 'rgba(147, 197, 253, 1)',
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: (context: any) => {
            const index = context[0].dataIndex;
            const date = new Date(analyticsData[index].date);
            switch (timeRange) {
              case 'day':
                return date.toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true
                });
              case 'week':
                return date.toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'short',
                  day: 'numeric'
                });
              case 'month':
                return date.toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                });
              default:
                return '';
            }
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Energy Consumption (kWh)',
        },
      },
      x: {
        grid: {
          display: false
        }
      }
    },
  };

  return (
    <div className="p-4 md:p-6 max-w-screen-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BarChart2 className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800">Analytics & Predictions</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
            {(['day', 'week', 'month'] as TimeRange[]).map((range) => (
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
            <span className="text-3xl font-bold text-gray-800">{currentData.actualConsumption.toFixed(1)}</span>
            <span className="text-gray-500 mb-1">kWh</span>
            <span className={`ml-auto text-sm flex items-center ${consumptionTrend < 0 ? 'text-emerald-500' : 'text-red-500'}`}>
              {consumptionTrend < 0 ? <ArrowDownRight className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
              {Math.abs(consumptionTrend).toFixed(1)}%
            </span>
          </div>
          
          <div className="mt-6">
            <div className="text-sm text-gray-500 mb-2">Predicted Next {timeRange}</div>
            <div className="text-xl font-semibold text-blue-600">{currentData.predictedConsumption.toFixed(1)} kWh</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">CO2 Emissions</h3>
            <TrendingUp className={`w-5 h-5 ${emissionsTrend < 0 ? 'text-emerald-500' : 'text-red-500'}`} />
          </div>
          
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-gray-800">{currentData.co2Emissions.toFixed(1)}</span>
            <span className="text-gray-500 mb-1">kg</span>
            <span className={`ml-auto text-sm flex items-center ${emissionsTrend < 0 ? 'text-emerald-500' : 'text-red-500'}`}>
              {emissionsTrend < 0 ? <ArrowDownRight className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
              {Math.abs(emissionsTrend).toFixed(1)}%
            </span>
          </div>
          
          <div className="mt-6">
            <div className="text-sm text-gray-500 mb-2">Predicted Next {timeRange}</div>
            <div className="text-xl font-semibold text-emerald-600">{currentData.predictedEmissions.toFixed(1)} kg</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Cost Savings</h3>
            <TrendingUp className={`w-5 h-5 ${savingsTrend > 0 ? 'text-emerald-500' : 'text-red-500'}`} />
          </div>
          
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-gray-800">${currentData.costSavings.toFixed(2)}</span>
            <span className={`ml-auto text-sm flex items-center ${savingsTrend > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
              {savingsTrend > 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              {Math.abs(savingsTrend).toFixed(1)}%
            </span>
          </div>
          
          <div className="mt-6">
            <div className="text-sm text-gray-500 mb-2">Predicted Next {timeRange}</div>
            <div className="text-xl font-semibold text-amber-600">${currentData.predictedSavings.toFixed(2)}</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">
            {timeRange === 'day' ? 'Hourly' : 'Daily'} Consumption Trends & Predictions
          </h3>
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

        <div className="h-80">
          {timeRange === 'day' ? (
            <Bar data={chartData} options={chartOptions} />
          ) : (
            <Line data={chartData} options={chartOptions} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;