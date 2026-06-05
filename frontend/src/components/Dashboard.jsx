import React from 'react';
import StatsCards from './StatsCards.jsx';
import SeverityChart from './SeverityChart.jsx';
import BuildingList from './BuildingList.jsx';
import WorkOrderTable from './WorkOrderTable.jsx';

export default function Dashboard({ workOrders, assets, locations, onSelectWorkOrder }) {
  const nodes = workOrders?.nodes || [];

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>📋 Work Order Dashboard</h1>
          <p style={styles.subtitle}>
            225 West 24th School Portfolio — {nodes.length} work orders loaded
          </p>
        </div>
        <div style={styles.headerRight}>
          <div style={styles.badge}>Challenge 1 + 2</div>
          <div style={styles.timestamp}>
            Last refreshed: {new Date().toLocaleString()}
          </div>
        </div>
      </header>

      <StatsCards workOrders={nodes} />

      <div style={styles.row}>
        <div style={styles.chartPanel}>
          <SeverityChart workOrders={nodes} />
        </div>
        <div style={styles.buildingPanel}>
          <BuildingList workOrders={nodes} locations={locations} />
        </div>
      </div>

      <div style={styles.tableHint}>
        💡 Click any work order to open the AI Copilot — submit observations, view enrichment, and verify closure.
      </div>

      <WorkOrderTable workOrders={nodes} onSelect={onSelectWorkOrder} />
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 1400,
    margin: '0 auto',
    padding: '24px 32px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 32,
    borderBottom: '1px solid #27272a',
    paddingBottom: 20,
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: 700,
    color: '#f4f4f5',
  },
  subtitle: {
    fontSize: '0.95rem',
    color: '#71717a',
    marginTop: 4,
  },
  headerRight: {
    textAlign: 'right',
  },
  badge: {
    background: '#1e3a5f',
    color: '#93c5fd',
    padding: '4px 10px',
    borderRadius: 4,
    fontSize: '0.75rem',
    fontWeight: 600,
    marginBottom: 6,
    display: 'inline-block',
  },
  timestamp: {
    fontSize: '0.85rem',
    color: '#52525b',
    background: '#18181b',
    padding: '6px 12px',
    borderRadius: 6,
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 24,
    marginBottom: 32,
  },
  chartPanel: {
    background: '#18181b',
    borderRadius: 12,
    padding: 24,
    border: '1px solid #27272a',
  },
  buildingPanel: {
    background: '#18181b',
    borderRadius: 12,
    padding: 24,
    border: '1px solid #27272a',
  },
  tableHint: {
    background: '#1a1a2e',
    border: '1px solid #312e81',
    borderRadius: 8,
    padding: '10px 16px',
    fontSize: '0.85rem',
    color: '#a5b4fc',
    marginBottom: 16,
    textAlign: 'center',
  },
};
