
import { useMemo } from "react";

interface ThresholdConfig {
  warning: number;
  danger: number;
  isHigherBetter?: boolean;
}

export type MetricStatus = "success" | "warning" | "danger";

/**
 * A hook to calculate the status of a metric based on thresholds
 */
export function useMetricStatus(
  value: number,
  thresholds: ThresholdConfig
): MetricStatus {
  return useMemo(() => {
    const { warning, danger, isHigherBetter = false } = thresholds;
    
    if (isHigherBetter) {
      // For metrics where higher values are better (like uptime)
      if (value >= danger) return "success";
      if (value >= warning) return "warning";
      return "danger";
    } else {
      // For metrics where lower values are better (like temperature)
      if (value >= danger) return "danger";
      if (value >= warning) return "warning";
      return "success";
    }
  }, [value, thresholds]);
}
