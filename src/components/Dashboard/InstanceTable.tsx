'use client';

import React, { useEffect, useState } from 'react';
import { monitoringHeaders } from '@/util/constants';
import { setCurrentInstance } from '@/store/slices/instanceSlice';
import { InstanceType } from '@/types/InstancesType';
import {
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Tag,
  DataTableSkeleton,
  InlineNotification,
} from '@carbon/react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/hooks/reduxtoolkit-hook';
import { mockInstances } from '@/mocks/mockdata';

const InstanceTable = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // 👇 Local loading + mock data simulation
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [instanceData, setInstanceData] = useState<{ instances: InstanceType[] }>({
    instances: [],
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        // Simulate successful API response
        setInstanceData({ instances: mockInstances });
        setIsError(false);
      } catch {
        // In real case, fallback to mock if fetch fails
        setInstanceData({ instances: mockInstances });
        setIsError(false);
      } finally {
        setInstanceData({ instances: mockInstances });
        setIsLoading(false);
      }
    }, 1000); // ⏱️ simulate 1 second loading

    return () => clearTimeout(timer);
  }, []);

  const statusTag = (status: InstanceType['status']) => {
    switch (status) {
      case 'up':
        return <Tag type="green">Running</Tag>;
      case 'down':
        return <Tag type="gray">Stopped</Tag>;
      case 'error':
        return <Tag type="red">Error</Tag>;
      default:
        return <Tag>{status}</Tag>;
    }
  };

  // 🦴 Skeleton loader during fake API load
  if (isLoading) {
    return (
      <DataTableSkeleton
        rowCount={5}
        columnCount={monitoringHeaders.length}
        zebra={false}
        compact={false}
        showHeader
        showToolbar={false}
      />
    );
  }

  return (
    <DataTable rows={instanceData.instances} headers={monitoringHeaders}>
      {({ rows, headers, getHeaderProps, getRowProps, getTableProps }) => (
        <TableContainer title="Instances Table">
          {isError && (
            <InlineNotification
              className="w-full mb-4"
              kind="error"
              title="Service Unavailable"
              subtitle="Using mock data due to failed API request."
              lowContrast
            />
          )}

          <Table {...getTableProps()}>
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableHeader
                    {...getHeaderProps({ header })}
                    key={header.key}
                  >
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row, rowIndex) => {
                const instanceValue = row.cells.find(
                  (cell) => cell.info.header === 'app'
                )?.value;

                return (
                  <TableRow
                    {...getRowProps({ row })}
                    key={row.id ?? `row-${rowIndex}`}
                    onClick={() => {
                      const rawInstance = instanceData.instances[rowIndex];
                      if (rawInstance) {
                        dispatch(setCurrentInstance(rawInstance));
                        router.push(
                          `/instances/${encodeURIComponent(instanceValue as string)}`
                        );
                      }
                    }}
                    className="cursor-pointer hover:bg-layer-hover"
                  >
                    {row.cells.map((cell, cellIndex) => (
                      <TableCell key={`${row.id ?? rowIndex}-cell-${cellIndex}`}>
                        {cell.info.header === 'status'
                          ? statusTag(cell.value as InstanceType['status'])
                          : cell.value}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </DataTable>
  );
};

export default InstanceTable;
