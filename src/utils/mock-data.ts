import { Alert } from "@/components/dashboard/AlertContainer";

// Generate random number within a range
export function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate random decimal within a range, with specified precision
export function getRandomDecimal(min: number, max: number, precision = 1): number {
  const value = Math.random() * (max - min) + min;
  const multiplier = Math.pow(10, precision);
  return Math.round(value * multiplier) / multiplier;
}

// Format a date object as a time string (12:34:56)
export function formatTime(date: Date): string {
  return date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

// Generate a mock temperature value
export function generateTemperatureData(): number {
  // Simulated temperature between 20°C and 45°C
  return getRandomDecimal(20, 45, 1);
}

// Generate mock traffic data
export function generateTrafficData(): number {
  // Simulated traffic between 10 and 120 vehicles/min
  return getRandomNumber(10, 120);
}

// Generate mock visitor count
export function generateVisitorData(): number {
  // Simulated visitors between 5 and 120
  return getRandomNumber(5, 120);
}

// Generate an alert based on current metrics
export function generateAlert(
  temperature: number,
  traffic: number,
  visitors: number
): Alert | null {
  const alerts = [];
  const now = new Date();

  if (temperature > 40) {
    alerts.push({
      id: `temp-${now.getTime()}`,
      message: `High temperature detected: ${temperature}°C`,
      timestamp: formatTime(now),
      type: "danger",
    });
  } else if (temperature > 35) {
    alerts.push({
      id: `temp-${now.getTime()}`,
      message: `Temperature rising: ${temperature}°C`,
      timestamp: formatTime(now),
      type: "warning",
    });
  }

  if (traffic > 100) {
    alerts.push({
      id: `traffic-${now.getTime()}`,
      message: `Heavy traffic: ${traffic} vehicles/min`,
      timestamp: formatTime(now),
      type: "danger",
    });
  } else if (traffic > 80) {
    alerts.push({
      id: `traffic-${now.getTime()}`,
      message: `Increased traffic: ${traffic} vehicles/min`,
      timestamp: formatTime(now),
      type: "warning",
    });
  }

  if (visitors > 100) {
    alerts.push({
      id: `visitors-${now.getTime()}`,
      message: `High visitor count: ${visitors} active users`,
      timestamp: formatTime(now),
      type: "success",
    });
  }

  // Return a random alert if multiple were generated
  return alerts.length > 0 ? alerts[Math.floor(Math.random() * alerts.length)] : null;
}

// For chart data
export interface TimeSeriesDataPoint {
  time: string;
  value: number;
}

// Generate initial time series data for charts
export function generateInitialTimeSeriesData(
  count: number,
  minValue: number,
  maxValue: number
): TimeSeriesDataPoint[] {
  const data: TimeSeriesDataPoint[] = [];
  const now = new Date();
  
  for (let i = count - 1; i >= 0; i--) {
    const pastTime = new Date(now.getTime() - i * 1000);
    data.push({
      time: formatTime(pastTime),
      value: getRandomNumber(minValue, maxValue),
    });
  }
  
  return data;
}

// Add a new data point to time series data
export function addTimeSeriesDataPoint(
  data: TimeSeriesDataPoint[],
  newValue: number,
  maxPoints = 60
): TimeSeriesDataPoint[] {
  const now = new Date();
  const newData = [...data, { time: formatTime(now), value: newValue }];
  
  // Keep only the most recent points
  if (newData.length > maxPoints) {
    return newData.slice(-maxPoints);
  }
  
  return newData;
}
