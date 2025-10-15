// import { GaugeChart } from '@carbon/charts-react';
// import options from '../../../../../util/GaugeChartOptions';
// import { useGetIdleCpuUsageQuery } from '@/store/api/instanceApi';
// import { InlineNotification } from '@carbon/react';
// import { useAppSelector } from '@/hooks/reduxtoolkit-hook';

// const CPUGaugeChart = () => {
//   const { duration, instance } = useAppSelector((state) => state.instances);
//   const { data, isLoading, isError, error } = useGetIdleCpuUsageQuery({ app_name: instance?.hostname ?? '', duration: duration })

//   // Clone the imported options and override loading
//   const chartOptions = {
//     ...options,
//     loading: isLoading,
//   }
//   if (isError) {
//     return (
//       <InlineNotification
//         kind="error"
//         title="Error loading chart"
//         subtitle={
//           typeof error === 'object' && error !== null && 'detail' in error
//             ? String(error.detail)
//             : 'Failed to load CPU usage data.'
//         }
//         lowContrast
//       />
//     )
//   }

//   return (
//     <GaugeChart
//       data={data ?? []}
//       options={chartOptions}
//     ></ GaugeChart>
//   )
// }

// export default CPUGaugeChart
'use client';

import { GaugeChart } from '@carbon/charts-react';
import options from '../../../../../util/GaugeChartOptions';
// import { useGetIdleCpuUsageQuery } from '@/store/api/instanceApi';
import { InlineNotification } from '@carbon/react';
import { GaugeDataType } from '@/types/chartTypes';
// import { useAppSelector } from '@/hooks/reduxtoolkit-hook';

// ✅ Mock fallback data for API failure or demo
const mockGaugeData: GaugeDataType[] = [
  { group: 'CPU Idle', value: 65 }
];

const CPUGaugeChart = () => {
  // const { duration, instance } = useAppSelector((state) => state.instances);
  // const { data, isLoading: apiLoading, isError, error } = useGetIdleCpuUsageQuery({
  //   app_name: instance?.hostname ?? '',
  //   duration,
  // });

  // 🔧 Mock API behavior for demo
  // const apiLoading = false;
  const isError = false;
  const error = null;
  const data = mockGaugeData;

  // ⏱️ Local loading state with 1s artificial delay

  const chartOptions = {
    ...options,
    loading: false,
  };

  if (isError) {
    return (
      <div>
        <InlineNotification
          kind="error"
          title="Error loading chart"
          subtitle={
            typeof error === 'object' && error !== null && 'detail' in error
              ? String(error)
              : 'Failed to load CPU usage data. Displaying mock data.'
          }
          lowContrast
          className="mb-4"
        />
        <GaugeChart data={mockGaugeData} options={chartOptions} />
      </div>
    );
  }

  // ✅ Final chart rendering (API or fallback)
  // const chartData = data && data.length > 0 ? data : mockGaugeData;
  // const chartData = mockGaugeData;

  return <GaugeChart data={data} options={chartOptions} />;
};

export default CPUGaugeChart;
