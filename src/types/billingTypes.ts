
export interface BillingRecordType {
  id: string;
  invoiceNumber: string;
  billingPeriod: string;
  issueDate: string;
  dueDate: string;
  totalAmount: number;
  status: 'Paid' | 'Pending' | 'Overdue' | 'Processing';
  services: ServiceUsageType[];
  paymentMethod?: string;
  taxAmount: number;
  downloadUrl?: string;
}

export interface ServiceUsageType {
  serviceName: string;
  usage: string;
  cost: number;
  unit: string;
}

export interface BillingAlertType {
  id: string;
  type: 'budget' | 'threshold' | 'anomaly';
  threshold: number;
  currentSpend: number;
  enabled: boolean;
  emailNotification: boolean;
}

export interface PaymentMethodType {
  id: string;
  type: 'credit_card' | 'bank_account' | 'paypal';
  lastFour: string;
  expiryDate?: string;
  isDefault: boolean;
}