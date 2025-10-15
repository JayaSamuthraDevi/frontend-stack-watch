import { ScaleTypes } from '@carbon/charts/interfaces';

export default {
  title: 'CPU Usage Over Time',
  axes: {
    bottom: {
      title: 'Time',
      mapsTo: 'timestamp',
      scaleType: ScaleTypes.TIME,
      ticks: {
        formatter: (tick: number | Date) => {
          const date = new Date(tick)
          return date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })
        },
      },
    },
    left: {
      title: 'CPU Usage',
      mapsTo: 'value',
      scaleType: ScaleTypes.LINEAR,
    },
  },
  color: {
    gradient: {
      enabled: true
    }
  },
  points: {
    enabled: false,
  },
  tooltip: {
   showTotal:false,
  },
  height: '400px',
}
