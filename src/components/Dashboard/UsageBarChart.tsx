import "@carbon/charts/styles.css";
import { BarChartOptions, ScaleTypes, SimpleBarChart } from "@carbon/charts-react";
import { DataItem } from "@/types/chartsTypes";

const UsageBarChart: React.FC = () => {
  const data: DataItem[] = [
    { group: "Compute Instances", value: 42000 },
    { group: "Storage (Block/Object)", value: 30000 },
    { group: "Networking (Bandwidth/Load Balancing)", value: 15000 },
    { group: "Databases", value: 18000 },
    { group: "Monitoring & Logging", value: 8000 },
    { group: "Serverless Functions", value: 5000 },
    { group: "Container Services (Kubernetes, ECS)", value: 12000 },
    { group: "Security & IAM", value: 7000 }
  ];

  const options: BarChartOptions = {
    "title": "Usage Bar Chart",
    "axes": {
      "left": {
        "mapsTo": "group",
        "scaleType": "labels" as ScaleTypes,
      },
      "bottom": {
        "mapsTo": "value",
      }
    },
    "height": "400px"
  };

  return <SimpleBarChart data={data} options={options}></SimpleBarChart>
};
export default UsageBarChart