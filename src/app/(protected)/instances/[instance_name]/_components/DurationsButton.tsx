import { useAppDispatch, useAppSelector } from '@/hooks/reduxtoolkit-hook';
import { setDuration } from '@/store/slices/instanceSlice';
import { Button } from '@carbon/react';
import React from 'react'


const durations = [
  { label: '1 hour', value: '1h' },
  { label: '6 hours', value: '6h' },
  { label: '12 hours', value: '12h' },
  { label: '24 hours', value: '24h' },
];

const DurationsButton = () => {
  const dispatch = useAppDispatch();
  const duration = useAppSelector((state) => state.instances.duration);

  const handleDurationChange = (value: string) => {
    dispatch(setDuration(value));
  }

  return (
    <div className="flex gap-3 center-container">
      Duration
      {durations.map(({ label, value }) => (
        <Button
          key={value}
          size="sm"
          kind={duration === value ? 'primary' : 'secondary'}
          onClick={() => handleDurationChange(value)}
        >
          {label}
        </Button>
      ))}
    </div>
  )
}

export default DurationsButton
