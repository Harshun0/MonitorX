
import React, { useState, useEffect, useCallback } from "react";
import { Thermometer, Car, Users } from "lucide-react";

import MetricCard from "@/components/dashboard/MetricCard";
import StatusIndicator from "@/components/dashboard/StatusIndicator";
import ChartContainer from "@/components/dashboard/ChartContainer";
import VisitorChart from "@/components/dashboard/VisitorChart";
import AlertContainer, { Alert } from "@/components/dashboard/AlertContainer";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { useMetricStatus } from "@/hooks/use-metric-status";

import {
  generateTemperatureData,
  generateTrafficData,
  generateVisitorData,
  generateAlert,
  formatTime,
  TimeSeriesDataPoint,
  generateInitialTimeSeriesData,
  addTimeSeriesDataPoint,
} from "@/utils/mock-data";

const Index = () => {
  const [temperature, setTemperature] = useState(generateTemperatureData());
  const [traffic, setTraffic] = useState(generateTrafficData());
  const [visitors, setVisitors] = useState(generateVisitorData());
  const [visitorHistory, setVisitorHistory] = useState<TimeSeriesDataPoint[]>(
    generateInitialTimeSeriesData(30, 5, 120)
  );
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [lastUpdated, setLastUpdated] = useState(formatTime(new Date()));

  // Calculate statuses based on thresholds
  const temperatureStatus = useMetricStatus(temperature, {
    warning: 30,
    danger: 40,
  });
  
  const trafficStatus = useMetricStatus(traffic, {
    warning: 70,
    danger: 100,
  });
  
  const visitorStatus = useMetricStatus(visitors, {
    warning: 50,
    danger: 100,
    isHigherBetter: true,
  });

  // Handle dismissing alerts
  const handleDismissAlert = useCallback((id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  }, []);

  // Update data with random values at regular intervals
  useEffect(() => {
    const updateData = () => {
      // Generate new values
      const newTemperature = generateTemperatureData();
      const newTraffic = generateTrafficData();
      const newVisitors = generateVisitorData();
      const currentTime = formatTime(new Date());
      
      // Update state with new values
      setTemperature(newTemperature);
      setTraffic(newTraffic);
      setVisitors(newVisitors);
      setLastUpdated(currentTime);
      
      // Update visitor history for chart
      setVisitorHistory((prev) => 
        addTimeSeriesDataPoint(prev, newVisitors, 30)
      );
      
      // Check for alerts based on new values
      const newAlert = generateAlert(newTemperature, newTraffic, newVisitors);
      if (newAlert) {
        setAlerts((prev) => [...prev.slice(-19), newAlert]); // Keep last 20 alerts
      }
    };

    // Initial update
    updateData();
    
    // Set up interval for updating data
    const intervalId = setInterval(updateData, 3000);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader lastUpdated={lastUpdated} />
        
        {/* Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <MetricCard
            title="Temperature"
            value={temperature}
            unit="°C"
            status={temperatureStatus}
            icon={<Thermometer className="w-6 h-6" />}
          />
          
          <MetricCard
            title="Traffic"
            value={traffic}
            unit="vehicles/min"
            status={trafficStatus}
            icon={<Car className="w-6 h-6" />}
          />
          
          <MetricCard
            title="Website Visitors"
            value={visitors}
            unit="active users"
            status={visitorStatus}
            icon={<Users className="w-6 h-6" />}
          />
        </div>
        
        {/* Chart and Alerts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ChartContainer title="Visitor Trends (Last 30 updates)">
              <VisitorChart data={visitorHistory} />
            </ChartContainer>
          </div>
          
          <div>
            <AlertContainer alerts={alerts} onDismiss={handleDismissAlert} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
