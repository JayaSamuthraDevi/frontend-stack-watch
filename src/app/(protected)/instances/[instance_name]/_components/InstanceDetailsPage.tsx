'use client'

import { useParams } from 'next/navigation'
import React from 'react'
import CpuUsageAreaChart from './CpuUsageAreaChart';
import DurationsButton from './DurationsButton';
import CPUGaugeChart from './CPUGaugeChart';
import MemoryUsageChart from './MemoryUsageChart';


const InstanceDetailsPage = () => {
  const params = useParams();
  const Instance_name = params?.instance_name?.toString();
 
  return (
    <div className='flex flex-col gap-4'>
      <h1 className='mb-2 text-capitalize'> {Instance_name}</h1>

      <DurationsButton />
      <CPUGaugeChart/>
      <CpuUsageAreaChart />
      <MemoryUsageChart />
    </div >
  )
}

export default InstanceDetailsPage