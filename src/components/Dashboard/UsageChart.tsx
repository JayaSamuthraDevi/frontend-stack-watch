import React, { useState } from "react";
import "@carbon/charts/styles.css";
import { ChartOptions, PieChart } from "@carbon/charts-react";
import { DataItem } from "@/types/chartsTypes";

const UsageChart: React.FC = () => {
  const [data] = useState<DataItem[]>([
    { group: "Compute Instances", value: 42000 },
    { group: "Storage (Block/Object)", value: 30000 },
    { group: "Networking (Bandwidth/Load Balancing)", value: 15000 },
    { group: "Databases", value: 18000 },
    { group: "Monitoring & Logging", value: 8000 },
    { group: "Serverless Functions", value: 5000 },
    { group: "Container Services (Kubernetes, ECS)", value: 12000 },
    { group: "Security & IAM", value: 7000 }
  ]);

  const [options] = useState<ChartOptions>({
    title: "Usage Chart",
    resizable: true,
    height: "400px",
    width: "300px"
  });

  return <PieChart data={data} options={options} />;
};
export default UsageChart