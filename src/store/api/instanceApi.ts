import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './baseApi'
import { instanceSummaryListType } from '@/types/listTypes'
import { NetworkUsageChartDataType, TimeSeriesDataType, GaugeDataType } from '@/types/chartTypes'
import { InstanceListType } from '@/types/InstancesType'

export const instanceApi = createApi({
  reducerPath: 'instanceApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Instance'],
  endpoints: (build) => ({
    getInstancesList: build.query<InstanceListType, void>({
      query: () => 'instances/list',
      providesTags: ['Instance'],
    }),
    getInstanceSummary: build.query<instanceSummaryListType, void>({
      query: () => 'instances/status',
      providesTags: ['Instance'],
    }),
    getHighCPUUsage: build.query<TimeSeriesDataType, void>({
      query: () => 'high_cpu/usage',
    }),
    getCpuUsage: build.query<TimeSeriesDataType, { app_name: string, duration?: string }>({
      query: ({ app_name, duration = '1h' }) => `cpu_usage?app_name=${app_name}&duration=${duration}`,
    }),
    getIdleCpuUsage: build.query<GaugeDataType[], { app_name: string, duration?: string }>({
      query: ({ app_name, duration = '1h' }) => `idle_cpu_usage?app_name=${app_name}&duration=${duration}`,
    }),
    getMemoryUsageGraph: build.query<TimeSeriesDataType, { instance_name: string, duration?: string }>({
      query: ({ instance_name, duration = '1h' }) => `memory/graph?instance_name=${instance_name}&duration=${duration}`,
    }),
    getMemoryUsage: build.query<TimeSeriesDataType, { app_name: string, duration?: string }>({
      query: ({ app_name, duration = '1h' }) => `memory_usage?app_name=${app_name}&duration=${duration}`,
    }),
    getNetworkUsage: build.query<NetworkUsageChartDataType, { app_name: string, duration?: string }>({
      query: ({ app_name, duration = '1h' }) => `network_usage?app_name=${app_name}&duration=${duration}`,
    }),
    getDiskUsage: build.query<TimeSeriesDataType, { app_name: string, duration?: string }>({
      query: ({ app_name, duration = '1h' }) => `disk_usage?app_name=${app_name}&duration=${duration}`,
    }),
  }),
})

export const { useGetInstancesListQuery, useGetInstanceSummaryQuery, useGetHighCPUUsageQuery, useGetCpuUsageQuery, useGetIdleCpuUsageQuery, useGetMemoryUsageGraphQuery, useGetMemoryUsageQuery, useGetNetworkUsageQuery, useGetDiskUsageQuery } = instanceApi
