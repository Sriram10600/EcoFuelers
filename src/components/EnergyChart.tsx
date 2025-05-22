import React, { useState, useEffect } from 'react';
import { Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';
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

interface EnergyChartProps {
  className?: string;
}

const EnergyChart: React.FC<EnergyChartProps> = ({ className = '' }) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('week');
  const [isLoading, setIsLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState<any[]>([]);
  
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call delay
    const timer = setTimeout(() => {
      const data = getAnalyticsData(timeRange);
      setAnalyticsData(data);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeRange]);

  if (isLoading || analyticsData.length === 0) {
    return (
      <div className={`bg-white rounded-xl shadow-sm p-4 ${className}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg font-semibold text-gray-800">
              {timeRange === 'day' ? 'Hourly' : 'Daily'} Energy Consumption
            </h2>
          </div>
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
            {(['day', 'week', 'month'] as TimeRange[]).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  timeRange === range
                    ? 'bg-white text-emerald-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="h-[300px] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
        </div>
      </div>
    );
  }
  
  // Get the latest data point
  const currentData = analyticsData[analyticsData.length - 1];
  const previousData = analyticsData[analyticsData.length - 2] || analyticsData[analyticsData.length - 1];
  
  // Calculate trends
  const consumptionTrend = ((currentData.actualConsumption - previousData.actualConsumption) / previousData.actualConsumption) * 100;
  const emissionsTrend = ((currentData.co2Emissions - previousData.co2Emissions) / previousData.co2Emissions) * 100;

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

  // Calculate category-wise data
  const categoryData = {
    lighting: analyticsData.map(data => data.actualConsumption * 0.3),
    ac: analyticsData.map(data => data.actualConsumption * 0.4),
    laptops: analyticsData.map(data => data.actualConsumption * 0.2),
    other: analyticsData.map(data => data.actualConsumption * 0.1)
  };

  const lineChartData = {
    labels,
    datasets: [
      {
        label: 'Lighting',
        data: categoryData.lighting,
        backgroundColor: 'rgba(16, 185, 129, 0.9)', // emerald-500
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 2,
        tension: 0.4,
      },
      {
        label: 'AC',
        data: categoryData.ac,
        backgroundColor: 'rgba(59, 130, 246, 0.9)', // blue-500
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
        tension: 0.4,
      },
      {
        label: 'Laptops',
        data: categoryData.laptops,
        backgroundColor: 'rgba(168, 85, 247, 0.9)', // purple-500
        borderColor: 'rgba(168, 85, 247, 1)',
        borderWidth: 2,
        tension: 0.4,
      },
      {
        label: 'Other',
        data: categoryData.other,
        backgroundColor: 'rgba(107, 114, 128, 0.9)', // gray-500
        borderColor: 'rgba(107, 114, 128, 1)',
        borderWidth: 2,
        tension: 0.4,
      }
    ],
  };

  const barChartData = {
    labels,
    datasets: [
      {
        label: 'Lighting',
        data: categoryData.lighting,
        backgroundColor: 'rgba(16, 185, 129, 0.9)', // emerald-500
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 1,
        borderRadius: 4,
      },
      {
        label: 'AC',
        data: categoryData.ac,
        backgroundColor: 'rgba(59, 130, 246, 0.9)', // blue-500
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
        borderRadius: 4,
      },
      {
        label: 'Laptops',
        data: categoryData.laptops,
        backgroundColor: 'rgba(168, 85, 247, 0.9)', // purple-500
        borderColor: 'rgba(168, 85, 247, 1)',
        borderWidth: 1,
        borderRadius: 4,
      },
      {
        label: 'Other',
        data: categoryData.other,
        backgroundColor: 'rgba(107, 114, 128, 0.9)', // gray-500
        borderColor: 'rgba(107, 114, 128, 1)',
        borderWidth: 1,
        borderRadius: 4,
      }
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: (context: any) => {
            const index = context[0].dataIndex;
            const date = new Date(analyticsData[index].date);
            return date.toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            });
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        stacked: false,
        title: {
          display: true,
          text: 'Energy (kWh)',
        },
      },
      x: {
        grid: {
          display: false
        }
      }
    },
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: (context: any) => {
            const index = context[0].dataIndex;
            const date = new Date(analyticsData[index].date);
            return date.toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
              hour12: true
            });
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Energy (kWh)',
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
    <div className={`bg-white rounded-xl shadow-sm p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-600" />
          <h2 className="text-lg font-semibold text-gray-800">
            {timeRange === 'day' ? 'Hourly' : 'Daily'} Energy Consumption
          </h2>
        </div>
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          {(['day', 'week', 'month'] as TimeRange[]).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                timeRange === range
                  ? 'bg-white text-emerald-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-sm text-gray-500 mb-1">Energy Consumption</div>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold text-gray-800">{currentData.actualConsumption.toFixed(1)}</span>
            <span className="text-sm text-gray-500">kWh</span>
            <span className={`ml-auto text-sm flex items-center ${consumptionTrend < 0 ? 'text-emerald-600' : 'text-red-500'}`}>
              {consumptionTrend < 0 ? <ArrowDownRight className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
              {Math.abs(consumptionTrend).toFixed(1)}%
            </span>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-sm text-gray-500 mb-1">CO2 Emissions</div>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold text-gray-800">{currentData.co2Emissions.toFixed(1)}</span>
            <span className="text-sm text-gray-500">kg</span>
            <span className={`ml-auto text-sm flex items-center ${emissionsTrend < 0 ? 'text-emerald-600' : 'text-red-500'}`}>
              {emissionsTrend < 0 ? <ArrowDownRight className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
              {Math.abs(emissionsTrend).toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      <div className="h-56">
        {timeRange === 'day' ? (
          <Bar data={barChartData} options={barChartOptions} />
        ) : (
          <Line data={lineChartData} options={lineChartOptions} />
        )}
      </div>

      <div className="grid grid-cols-4 gap-2 mt-4">
        <div className="bg-emerald-100 rounded-lg p-2 text-center border border-emerald-200">
          <div className="text-xs text-emerald-700">Lighting</div>
          <div className="text-sm font-medium text-emerald-800 mt-1">{(currentData.actualConsumption * 0.3).toFixed(1)} kWh</div>
        </div>
        <div className="bg-blue-100 rounded-lg p-2 text-center border border-blue-200">
          <div className="text-xs text-blue-700">AC</div>
          <div className="text-sm font-medium text-blue-800 mt-1">{(currentData.actualConsumption * 0.4).toFixed(1)} kWh</div>
        </div>
        <div className="bg-purple-100 rounded-lg p-2 text-center border border-purple-200">
          <div className="text-xs text-purple-700">Laptops</div>
          <div className="text-sm font-medium text-purple-800 mt-1">{(currentData.actualConsumption * 0.2).toFixed(1)} kWh</div>
        </div>
        <div className="bg-gray-100 rounded-lg p-2 text-center border border-gray-200">
          <div className="text-xs text-gray-700">Other</div>
          <div className="text-sm font-medium text-gray-800 mt-1">{(currentData.actualConsumption * 0.1).toFixed(1)} kWh</div>
        </div>
      </div>
    </div>
  );
};

export default EnergyChart;