
import React from "react";
import { BarChart2 } from "lucide-react";

interface DashboardHeaderProps {
  lastUpdated: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ lastUpdated }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center">
        <BarChart2 className="w-6 h-6 mr-2 text-primary" />
        <h1 className="text-xl font-semibold">Real-Time Monitoring Dashboard</h1>
      </div>
      <div className="text-sm text-muted-foreground">
        Last updated: <span className="font-semibold">{lastUpdated}</span>
      </div>
    </div>
  );
};

export default DashboardHeader;
