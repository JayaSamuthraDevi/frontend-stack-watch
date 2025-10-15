// 'use client'
// import { AreaChart } from '@carbon/charts-react';
// import { useGetMemoryUsageGraphQuery } from '@/store/api/instanceApi';
// import { InlineNotification } from '@carbon/react';
// import MemoryChartOptions from '@/util/MemoryChartOptions';
// import { useAppSelector } from '@/hooks/reduxtoolkit-hook';

// const MemoryUsageChart = () => {

//   const { duration, instance } = useAppSelector((state) => state.instances);

//   const { data, isLoading, isError, error } = useGetMemoryUsageGraphQuery({
//     instance_name: instance?.hostname ?? '', duration: duration
//   });

//   // Clone the imported options and override loading
//   const chartOptions = {
//     ...MemoryChartOptions,
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
//             : 'Failed to load Memory usage data.'
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

// export default MemoryUsageChart


'use client';

import { useEffect, useState } from 'react';
import { AreaChart } from '@carbon/charts-react';
import { InlineNotification, SkeletonText } from '@carbon/react';
// import { useAppSelector } from '@/hooks/reduxtoolkit-hook';
import MemoryChartOptions from '@/util/MemoryChartOptions';
import { mockMemoryUsageData } from '@/mocks/mockdata';

const MemoryUsageChart = () => {
  // const { duration, instance } = useAppSelector((state) => state.instances);
  // const { data, isLoading: apiLoading, isError, error } = useGetMemoryUsageGraphQuery({
  //   instance_name: instance?.hostname ?? '',
  //   duration,
  // });

  // const apiLoading = false;
  const isError = false;
  const error = null;
  // const data = mockMemoryUsageData;

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const chartOptions = {
    ...MemoryChartOptions,
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
              : 'Failed to load Memory usage data. Showing mock data.'
          }
          lowContrast
          className="mb-4"
        />
        <AreaChart data={mockMemoryUsageData.data} options={chartOptions} />
      </div>
    );
  }

  // const chartData = data?.data?.length ? data.data : mockMemoryUsageData.data;
  const chartData =  mockMemoryUsageData.data;

  return <AreaChart data={chartData} options={chartOptions} />;
};

export default MemoryUsageChart;
