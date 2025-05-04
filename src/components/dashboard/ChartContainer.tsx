
import React from "react";
import { cn } from "@/lib/utils";

interface ChartContainerProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  children,
  className,
}) => {
  return (
    <div className={cn("dashboard-card", className)}>
      <h3 className="metric-label mb-4">{title}</h3>
      <div className="w-full h-[220px]">{children}</div>
    </div>
  );
};

export default ChartContainer;
