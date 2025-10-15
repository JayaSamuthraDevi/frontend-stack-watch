'use client'
import React, { useEffect, useState } from "react";
import {
  Cloud,
  Warning,
  CheckmarkOutline,
} from "@carbon/icons-react";
import UsageChart from "./UsageChart";
import UsageBarChart from "./UsageBarChart";
// import { useGetInstanceSummaryQuery } from "@/store/api/instanceApi";
import "./cloudDashboard.scss";
import { SkeletonText } from "@carbon/react";
import { mockInstanceSummary } from "@/mocks/mockdata";

const CloudDashboard: React.FC = () => {
  // const { data, isLoading, isError } = useGetInstanceSummaryQuery();

  // Fallback to mock data if API fails or data is undefined
  // const instanceData = isError || !data ? mockInstanceSummary : data;
   // Simulate loading for 1 second
  const [isLoading, setIsLoading] = useState(true);
  const [instanceData, setInstanceData] = useState<typeof mockInstanceSummary>(mockInstanceSummary);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        // Simulate successful API data fetch
        setInstanceData(mockInstanceSummary);
        setIsError(false);
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }, 1000); // ⏱️ 1-second simulated loading

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="cloud-dashboard">
      <div className="cloud-dashboard-card">
        {/* Total Instances */}
        <div className="mini-card">
          <Cloud />
          <h4 className="mb-1">Total Instances</h4>
          {isLoading ? (
            <SkeletonText lineCount={3} heading width="100%" />
          ) : (
            <p className="text-xl">{instanceData.total_vm}</p>
          )}
          {isError && (
            <p className="text-sm text-red-600">
              {"API failed. Showing mock data."}
            </p>
          )}
        </div>

        {/* Running Instances */}
        <div className="mini-card">
          <CheckmarkOutline fill="green" />
          <h4 className="mb-1">Running</h4>
          {isLoading ? (
            <SkeletonText lineCount={3} heading width="100%" />
          ) : (
            <p className="text-xl">{instanceData.running_vm}</p>
          )}
          {isError && (
            <p className="text-sm text-red-600">
              {"API failed. Showing mock data."}
            </p>
          )}
        </div>

        {/* Errors / Stopped Instances */}
        <div className="mini-card">
          <Warning fill="red" />
          <h4 className="mb-1">Errors</h4>
          {isLoading ? (
            <SkeletonText lineCount={3} heading width="100%" />
          ) : (
            <p className="text-xl">{instanceData.stopped_vm}</p>
          )}
          {isError && (
            <p className="text-sm text-red-600">
              {"API failed. Showing mock data."}
            </p>
          )}
        </div>
      </div>

      <div className="justify-space-around">
        <UsageChart />
        <UsageBarChart />
      </div>
    </div>
  );
};

export default CloudDashboard;
