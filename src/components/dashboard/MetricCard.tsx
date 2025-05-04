
import React from "react";
import { cn } from "@/lib/utils";
import StatusIndicator from "./StatusIndicator";

interface MetricCardProps {
  title: string;
  value: number | string;
  unit?: string;
  status: "success" | "warning" | "danger";
  icon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit,
  status,
  icon,
  className,
  children,
}) => {
  return (
    <div className={cn("metric-card", className)}>
      <div className="flex items-center justify-between">
        <span className="metric-label">{title}</span>
        <StatusIndicator status={status} pulse />
      </div>
      <div className="flex items-end mt-2">
        <span className="metric-value">{value}</span>
        {unit && <span className="text-muted-foreground ml-1 mb-1">{unit}</span>}
      </div>
      {icon && (
        <div className="absolute top-4 right-4 text-muted-foreground/30">
          {icon}
        </div>
      )}
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
};

export default MetricCard;
