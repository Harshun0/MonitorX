
import React, { useRef, useEffect } from "react";
import AlertItem from "./AlertItem";

export interface Alert {
  id: string;
  message: string;
  timestamp: string;
  type: "success" | "warning" | "danger";
}

interface AlertContainerProps {
  alerts: Alert[];
  onDismiss: (id: string) => void;
}

const AlertContainer: React.FC<AlertContainerProps> = ({
  alerts,
  onDismiss,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom when new alerts come in
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [alerts.length]);

  return (
    <div className="dashboard-card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="metric-label">Alerts</h3>
        <span className="text-xs bg-muted rounded-full px-2 py-1">
          {alerts.length} {alerts.length === 1 ? "alert" : "alerts"}
        </span>
      </div>
      <div
        ref={containerRef}
        className="overflow-y-auto max-h-[300px] pr-1"
      >
        {alerts.length > 0 ? (
          alerts.map((alert) => (
            <AlertItem
              key={alert.id}
              id={alert.id}
              message={alert.message}
              timestamp={alert.timestamp}
              type={alert.type}
              onDismiss={onDismiss}
            />
          ))
        ) : (
          <div className="text-center text-muted-foreground p-4">
            No alerts to display
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertContainer;
