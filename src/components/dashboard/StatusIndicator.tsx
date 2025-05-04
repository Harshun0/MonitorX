
import React from "react";
import { cn } from "@/lib/utils";

type StatusType = "success" | "warning" | "danger";

interface StatusIndicatorProps {
  status: StatusType;
  className?: string;
  pulse?: boolean;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  className,
  pulse = false,
}) => {
  return (
    <span
      className={cn(
        "status-indicator",
        {
          "bg-dashboard-success": status === "success",
          "bg-dashboard-warning": status === "warning",
          "bg-dashboard-danger": status === "danger",
          "animate-pulse-gentle": pulse,
        },
        className
      )}
    />
  );
};

export default StatusIndicator;
