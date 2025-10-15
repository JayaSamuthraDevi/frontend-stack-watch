// 'use client'
// import { AreaChart } from '@carbon/charts-react';
// import { useGetCpuUsageQuery } from '@/store/api/instanceApi';
// import { InlineNotification } from '@carbon/react';
// import options from '../../../../../util/AreaChartOptions';
// import { useAppSelector } from '@/hooks/reduxtoolkit-hook';

// const CpuUsageAreaChart = () => {
//   const { duration, instance } = useAppSelector((state) => state.instances);
//   const { data, isLoading, isError, error } = useGetCpuUsageQuery({ app_name: instance?.hostname ?? '', duration: duration })

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
//     <AreaChart
//       data={data?.data ?? []}
//       options={chartOptions}
//     ></ AreaChart>
//   )
// }

// export default CpuUsageAreaChart

'use client';

import { useEffect, useState } from 'react';
import { AreaChart } from '@carbon/charts-react';
import { InlineNotification, SkeletonText } from '@carbon/react';
// import { useAppSelector } from '@/hooks/reduxtoolkit-hook';
import options from '../../../../../util/AreaChartOptions';
import { mockCpuUsageData } from '@/mocks/mockdata';

const CpuUsageAreaChart = () => {
  // const { duration, instance } = useAppSelector((state) => state.instances);
  // const { data, isLoading: apiLoading, isError, error } = useGetCpuUsageQuery({
  //   app_name: instance?.hostname ?? '',
  //   duration,
  // });

  // const apiLoading = false;
  const isError = false;
  const error = null;
  const data = mockCpuUsageData;

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const chartOptions = {
    ...options,
    loading: isLoading,
  };

  if (isLoading) {
    return (
      <div
        style={{
          width: '100%',
          height: '280px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <SkeletonText heading width="60%" />
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <InlineNotification
          kind="error"
          title="Error loading chart"
          subtitle={
            typeof error === 'object' && error !== null && 'detail' in error
              ? String(error)
              : 'Failed to load CPU usage data. Showing mock data.'
          }
          lowContrast
          className="mb-4"
        />
        <AreaChart data={mockCpuUsageData.data} options={chartOptions} />
      </div>
    );
  }

  const chartData = data?.data?.length ? data.data : mockCpuUsageData.data;

  return <AreaChart data={chartData} options={chartOptions} />;
};

export default CpuUsageAreaChart;
