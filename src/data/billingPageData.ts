import { BillingRecordType } from "../types/billingTypes";

// Sample data - In real app, this comes from APIs
export const billingRecordsData: BillingRecordType[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2024-12-001',
    billingPeriod: 'December 2024',
    issueDate: '2024-12-01',
    dueDate: '2024-12-31',
    totalAmount: 1247.50,
    status: 'Paid',
    taxAmount: 124.75,
    paymentMethod: 'Credit Card ending in 4532',
    services: [
      { serviceName: 'Compute Engine', usage: '2,840 hours', cost: 568.00, unit: 'hours' },
      { serviceName: 'Cloud Storage', usage: '15 TB', cost: 450.00, unit: 'TB' },
      { serviceName: 'Database', usage: '500 GB', cost: 229.50, unit: 'GB' }
    ]
  },
  {
    id: '2',
    invoiceNumber: 'INV-2025-01-001',
    billingPeriod: 'January 2025',
    issueDate: '2025-01-01',
    dueDate: '2025-01-31',
    totalAmount: 987.25,
    status: 'Pending',
    taxAmount: 98.73,
    services: [
      { serviceName: 'Compute Engine', usage: '2,100 hours', cost: 420.00, unit: 'hours' },
      { serviceName: 'Cloud Storage', usage: '12 TB', cost: 360.00, unit: 'TB' },
      { serviceName: 'Database', usage: '380 GB', cost: 207.25, unit: 'GB' }
    ]
  }
];

export const currentMonthUsageData = {
  budgetLimit: 1200,
  currentSpend: 756.30,
  projectedSpend: 1100.45,
  percentUsed: 63
};