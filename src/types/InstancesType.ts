export interface InstanceType {
  id: string;
  instance: string;
  status: "up" | "down" | "error";
  job: string;
  ip: string;
  app: string;
  hostname?: string;
};

export interface InstanceListType {
  instances: InstanceType[];
}

export interface InstanceStateType {
  instance: InstanceType | null;
  duration: string;
  isLoading: boolean;
  error: string | null;
}