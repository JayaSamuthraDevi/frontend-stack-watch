'use client'
import React, { useState } from 'react';
import {
  Grid,
  Column,
  Heading,
  Button,
  DataTable,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  Tag,
  Modal,
  Select,
  SelectItem,
  InlineNotification,
  Tile,
  ProgressBar,
  Tabs,
  Tab,
  OverflowMenu,
  OverflowMenuItem,
  Toggle,
  NumberInput
} from '@carbon/react';
import {
  Add,
  Download,
  Settings,
} from '@carbon/react/icons';
import './cloudBillings.scss';
import { BillingAlertType, BillingRecordType, PaymentMethodType } from '../../../types/billingTypes';
import { billingRecordsData, currentMonthUsageData } from '@/data/billingPageData';


const CloudBillingPage: React.FC = () => {
  // State management
  const [records, setRecords] = useState<BillingRecordType[]>(billingRecordsData);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<BillingRecordType | null>(null);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
  } | null>(null);

  // Alert settings
  const [budgetAlert, setBudgetAlert] = useState<BillingAlertType>({
    id: '1',
    type: 'budget',
    threshold: 1000,
    currentSpend: currentMonthUsageData.currentSpend,
    enabled: true,
    emailNotification: true
  });

  // Payment method state
  const [paymentMethods] = useState<PaymentMethodType[]>([
    { id: '1', type: 'credit_card', lastFour: '4532', expiryDate: '12/26', isDefault: true },
    { id: '2', type: 'bank_account', lastFour: '7890', isDefault: false }
  ]);

  const showNotification = (type: 'success' | 'error' | 'info' | 'warning', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  // Realistic billing operations
  const downloadInvoice = (record: BillingRecordType) => {
    // In real app, this would trigger actual PDF download
    showNotification('info', `Downloading invoice ${record.invoiceNumber}...`);
    // Simulate download delay
    setTimeout(() => {
      showNotification('success', `Invoice ${record.invoiceNumber} downloaded successfully!`);
    }, 2000);
  };

  const payInvoice = (record: BillingRecordType) => {
    if (record.status === 'Paid') {
      showNotification('info', 'This invoice has already been paid.');
      return;
    }

    setSelectedRecord(record);
    setIsPaymentModalOpen(true);
  };

  const processPayment = () => {
    if (!selectedRecord) return;

    // Simulate payment processing
    showNotification('info', 'Processing payment...');

    setTimeout(() => {
      // Update record status
      setRecords(prev =>
        prev.map(record =>
          record.id === selectedRecord.id
            ? { ...record, status: 'Paid' as const }
            : record
        )
      );

      setIsPaymentModalOpen(false);
      setSelectedRecord(null);
      showNotification('success', `Payment processed successfully for ${selectedRecord.invoiceNumber}!`);
    }, 3000);
  };

  const updateBillingAlert = () => {
    showNotification('success', 'Billing alerts updated successfully!');
    setIsAlertModalOpen(false);
  };

  const exportBillingData = () => {
    showNotification('info', 'Exporting billing data to CSV...');
    setTimeout(() => {
      showNotification('success', 'Billing data exported successfully!');
    }, 2000);
  };

  // Table configuration
  const billingHeaders = [
    { key: 'invoiceNumber', header: 'Invoice Number' },
    { key: 'billingPeriod', header: 'Billing Period' },
    { key: 'issueDate', header: 'Issue Date' },
    { key: 'totalAmount', header: 'Total Amount' },
    { key: 'status', header: 'Status' },
    { key: 'actions', header: 'Actions' }
  ];

  const tableRows = records.map(record => ({
    id: record.id,
    invoiceNumber: record.invoiceNumber,
    billingPeriod: record.billingPeriod,
    issueDate: new Date(record.issueDate).toLocaleDateString(),
    totalAmount: `$${record.totalAmount.toFixed(2)}`,
    status: record.status,
    actions: record
  }));

  return (
    <Grid className='billing-page'>
      <Column sm={4} md={8} lg={16}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <Heading>Cloud Billing Dashboard</Heading>
            <p>Monitor your cloud spending, manage payments, and track usage across all services.</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Button
              kind="secondary"
              renderIcon={Download}
              onClick={exportBillingData}
            >
              Export Data
            </Button>
            <Button
              kind="tertiary"
              renderIcon={Settings}
              onClick={() => setIsAlertModalOpen(true)}
            >
              Billing Alerts
            </Button>
          </div>
        </div>

        {/* Notifications */}
        {notification && (
          <InlineNotification
            kind={notification.type}
            title={notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
            subtitle={notification.message}
            onCloseButtonClick={() => setNotification(null)}
            style={{ marginBottom: '1rem' }}
          />
        )}

        {/* Current Month Overview */}
        <div style={{ marginBottom: '2rem' }}>
          <Heading style={{ marginBottom: '1rem' }}>Current Month Overview</Heading>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            <Tile>
              <h4>Current Spend</h4>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0f62fe' }}>
                ${currentMonthUsageData.currentSpend.toFixed(2)}
              </div>
              <ProgressBar
                value={currentMonthUsageData.percentUsed}
                max={100}
                label={`${currentMonthUsageData.percentUsed}% of budget used`}
              />
            </Tile>

            <Tile>
              <h4>Monthly Budget</h4>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                ${currentMonthUsageData.budgetLimit.toFixed(2)}
              </div>
              <p>Projected: ${currentMonthUsageData.projectedSpend.toFixed(2)}</p>
            </Tile>
          </div>
        </div>

        {/* Billing Records Table */}
        <div className="">
          <Tabs>
            <Tab
              id="tab-1"
              as="div"
              title="Invoice History"
            >
              <DataTable rows={tableRows} headers={billingHeaders} isSortable>
                {({
                  rows,
                  headers,
                  getHeaderProps,
                  getRowProps,
                }) => (
                  <TableContainer title="Billing Records">
                    <Table>
                      <TableHead>
                        <TableRow>
                          {headers.map((header) => (
                            <TableHeader {...getHeaderProps({ header })} key={header.key}>
                              {header.header}
                            </TableHeader>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <TableRow {...getRowProps({ row })} key={row.id}>
                            {row.cells.map((cell) => (
                              <TableCell key={cell.id}>
                                {cell.info.header === 'status' ? (
                                  <Tag type={
                                    cell.value === 'Paid' ? 'green' :
                                      cell.value === 'Pending' ? 'blue' :
                                        cell.value === 'Processing' ? 'purple' : 'red'
                                  }>
                                    {cell.value}
                                  </Tag>
                                ) : cell.info.header === 'actions' ? (
                                  <OverflowMenu flipped>
                                    <OverflowMenuItem
                                      itemText="Download Invoice"
                                      onClick={() => downloadInvoice(cell.value)}
                                    />
                                    {cell.value.status !== 'Paid' && (
                                      <OverflowMenuItem
                                        itemText="Pay Now"
                                        onClick={() => payInvoice(cell.value)}
                                      />
                                    )}
                                    <OverflowMenuItem
                                      itemText="View Details"
                                      onClick={() => showNotification('info', 'Opening invoice details...')}
                                    />
                                  </OverflowMenu>
                                ) : (
                                  cell.value
                                )}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </DataTable>
            </Tab>
            <Tab as="div" id="tab 2" title='Payment Methods'>
              <div style={{ padding: '1rem 0' }}>
                <h4>Saved Payment Methods</h4>
                {paymentMethods.map(method => (
                  <Tile key={method.id} style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <strong>
                          {method.type === 'credit_card' ? 'Credit Card' :
                            method.type === 'bank_account' ? 'Bank Account' : 'PayPal'}
                        </strong>
                        <p>****{method.lastFour} {method.expiryDate && `Expires ${method.expiryDate}`}</p>
                        {method.isDefault && <Tag type="blue">Default</Tag>}
                      </div>
                      <Button kind="ghost" size="sm">Edit</Button>
                    </div>
                  </Tile>
                ))}
                <Button kind="primary" renderIcon={Add}>
                  Add Payment Method
                </Button>
              </div>
            </Tab>
            <Tab as="div" id=' tab 3' title='Usage Details'>
              <div style={{ padding: '1rem 0' }}>
                <h4>Current Month Service Usage</h4>
                {records[1]?.services.map((service, index) => (
                  <Tile key={index} style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <strong>{service.serviceName}</strong>
                        <p>{service.usage} {service.unit}</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <strong>${service.cost.toFixed(2)}</strong>
                      </div>
                    </div>
                  </Tile>
                ))}
              </div>
            </Tab>
          </Tabs>
        </div>

        {/* Payment Modal */}
        <Modal
          open={isPaymentModalOpen}
          onRequestClose={() => {
            setIsPaymentModalOpen(false);
            setSelectedRecord(null);
          }}
          modalHeading="Process Payment"
          primaryButtonText="Pay Now"
          secondaryButtonText="Cancel"
          onRequestSubmit={processPayment}
          size="md"
        >
          {selectedRecord && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <p><strong>Invoice:</strong> {selectedRecord.invoiceNumber}</p>
              <p><strong>Amount:</strong> ${selectedRecord.totalAmount.toFixed(2)}</p>
              <p><strong>Due Date:</strong> {new Date(selectedRecord.dueDate).toLocaleDateString()}</p>

              <Select
                id="payment-method"
                labelText="Payment Method"
                defaultValue={paymentMethods.find(pm => pm.isDefault)?.id}
              >
                {paymentMethods.map(method => (
                  <SelectItem
                    key={method.id}
                    value={method.id}
                    text={`${method.type === 'credit_card' ? 'Card' : 'Bank'} ****${method.lastFour}`}
                  />
                ))}
              </Select>
            </div>
          )}
        </Modal>

        {/* Billing Alerts Modal */}
        <Modal
          open={isAlertModalOpen}
          onRequestClose={() => setIsAlertModalOpen(false)}
          modalHeading="Billing Alerts & Notifications"
          primaryButtonText="Save Settings"
          secondaryButtonText="Cancel"
          onRequestSubmit={updateBillingAlert}
          size="md"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <NumberInput
              id="budget-threshold"
              label="Budget Alert Threshold ($)"
              value={budgetAlert.threshold}
              onChange={(e) => setBudgetAlert(prev => ({ ...prev, threshold: 0 }))}
              min={0}
              step={100}
            />

            <Toggle
              id="enable-alerts"
              labelText="Enable Budget Alerts"
              toggled={budgetAlert.enabled}
              onToggle={(toggled) => setBudgetAlert(prev => ({ ...prev, enabled: toggled }))}
            />

            <Toggle
              id="email-notifications"
              labelText="Email Notifications"
              toggled={budgetAlert.emailNotification}
              onToggle={(toggled) => setBudgetAlert(prev => ({ ...prev, emailNotification: toggled }))}
            />
          </div>
        </Modal>
      </Column>
    </Grid>
  );
};

export default CloudBillingPage;