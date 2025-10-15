import { ScaleTypes } from '@carbon/charts/interfaces';
import { bytesToHumanReadable } from './byteFormater';

export default {
  title: 'Memory Usage Over Time',
  axes: {
    bottom: {
      title: 'Time',
      mapsTo: 'timestamp',
      scaleType: ScaleTypes.TIME,
      ticks: {
        formatter: (tick: number | Date) => {
          const date = new Date(tick);
          return date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          });
        }
      },
    },
    left: {
      title: 'Memory Usage',
      mapsTo: 'value',
      scaleType: ScaleTypes.LINEAR,
      ticks: {
        formatter: (tick: number | Date) => {
          // Carbon might pass Date (for TIME axis), but left axis is LINEAR, so expect number.
          return typeof tick === "number"
            ? bytesToHumanReadable(tick)
            : bytesToHumanReadable((tick as any)?.valueOf?.() || 0);
        }
      }
    },
    points: {
      enabled: false
    },
    tooltip: {
      showTotal: false,
    },
  },
  height: '400px',
};
