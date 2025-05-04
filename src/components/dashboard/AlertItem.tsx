
import React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import StatusIndicator from "./StatusIndicator";

interface AlertItemProps {
  id: string;
  message: string;
  timestamp: string;
  type: "success" | "warning" | "danger";
  onDismiss: (id: string) => void;
}

const AlertItem: React.FC<AlertItemProps> = ({
  id,
  message,
  timestamp,
  type,
  onDismiss,
}) => {
  const colorClasses = {
    success: "border-dashboard-success bg-dashboard-success/10",
    warning: "border-dashboard-warning bg-dashboard-warning/10",
    danger: "border-dashboard-danger bg-dashboard-danger/10",
  };

  return (
    <div className={cn("alert-item", colorClasses[type])}>
      <div className="flex items-center gap-2">
        <StatusIndicator status={type} />
        <div>
          <div className="font-medium">{message}</div>
          <div className="text-xs text-muted-foreground">{timestamp}</div>
        </div>
      </div>
      <button
        onClick={() => onDismiss(id)}
        className="text-muted-foreground hover:text-foreground"
        aria-label="Dismiss alert"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default AlertItem;
