import { TimeSeriesDataType } from "@/types/chartTypes";
import { InstanceType } from "@/types/InstancesType";

export const mockInstances: InstanceType[] = [
  {
    id: '1',
    instance: 'mock-instance-01',
    status: 'up',
    ip: '10.0.0.101',
    app: 'nginx',
    job: 'frontend',
    hostname: 'mock-host-01',
  },
  {
    id: '2',
    instance: 'mock-instance-02',
    status: 'down',
    ip: '10.0.0.102',
    app: 'postgres',
    job: 'database',
    hostname: 'mock-host-02',
  },
  {
    id: '3',
    instance: 'mock-instance-03',
    status: 'up',
    ip: '10.0.0.103',
    app: 'redis',
    job: 'cache',
    hostname: 'mock-host-03',
  },
];
export const mockInstanceSummary = {
  total_vm: 12,
  running_vm: 9,
  stopped_vm: 3,
};

export const mockCpuUsageData: TimeSeriesDataType = {
  instance: 'mock-instance',
  data: [
    { group: 'CPU Usage', timestamp: '2025-10-15T10:00:00Z', value: 30 },
    { group: 'CPU Usage', timestamp: '2025-10-15T10:01:00Z', value: 45 },
    { group: 'CPU Usage', timestamp: '2025-10-15T10:02:00Z', value: 50 },
    { group: 'CPU Usage', timestamp: '2025-10-15T10:03:00Z', value: 38 },
    { group: 'CPU Usage', timestamp: '2025-10-15T10:04:00Z', value: 60 },
    { group: 'CPU Usage', timestamp: '2025-10-15T10:05:00Z', value: 42 },
  ],
};

export const mockMemoryUsageData: TimeSeriesDataType = {
  instance: 'mock-instance',
  data: [
    { group: 'Used Memory', timestamp: '2025-10-15T10:00:00Z', value: 40 },
    { group: 'Used Memory', timestamp: '2025-10-15T10:01:00Z', value: 45 },
    { group: 'Used Memory', timestamp: '2025-10-15T10:02:00Z', value: 55 },
    { group: 'Used Memory', timestamp: '2025-10-15T10:03:00Z', value: 50 },
    { group: 'Used Memory', timestamp: '2025-10-15T10:04:00Z', value: 60 },
    { group: 'Used Memory', timestamp: '2025-10-15T10:05:00Z', value: 65 },
  ],
};
