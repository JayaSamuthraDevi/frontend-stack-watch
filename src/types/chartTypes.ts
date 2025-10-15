export interface DataPointType {
  group:string;
  timestamp: string;
  value: number;
}

export interface TimeSeriesDataType {
  instance: string;
  data: DataPointType[];
}

export interface ReusableAreaChartProps {
  title: string
  instanceName?: string
  data: DataPointType[]
  color?: string
  height?: number
  label?: string
}

export interface NetworkUsageChartDataType {
    timestamp: string;
    receive: number
    transmit: number
}
export interface ReusableDoubleLineChartProps {
  title: string
  instanceName?: string
  data: NetworkUsageChartDataType[]
  color?: string
  height?: number
  label?: string
}

export interface ReusableLineChartProps {
  title: string
  instanceName?: string
  data: DataPointType[]
  color?: string
  height?: number
  label?: string
}

export interface GaugeDataType {
  group: string;
  value: number;
}