//dashboard constants
import { ResourceType, TableHeadersType } from "../types/commonTypes";

export const appName = 'Stack Watch';
export const userName = 'John Doe';

export const monitoringHeaders: TableHeadersType[] = [
  { key: "instance", header: "Instance Name" },
  { key: "status", header: "Status" },
  { key: "ip", header: "IP Address" },
  { key: "app", header: "App" },
  { key: "job", header: "Job" },
];

//resource constants

export const resourcesData: ResourceType[] = [
  {
    id: "1",
    title: "Cloud API Reference",
    description: "Comprehensive guide to the Cloud API endpoints.",
    link: "https://developer.stackblitz.com/platform/api/javascript-sdk"
  },
  {
    id: "2",
    title: "User Guide",
    description: "How to use the Cloud Management Portal efficiently.",
    link: "https://developer.stackblitz.com/"
  },
  {
    id: "3",
    title: "Support Portal",
    description: "Visit our support page for help and ticket creation.",
    link: "https://clients.stackbill.com"
  }
];
