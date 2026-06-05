import React from 'react';
import StatsCards from './StatsCards.jsx';
import SeverityChart from './SeverityChart.jsx';
import BuildingList from './BuildingList.jsx';
import WorkOrderTable from './WorkOrderTable.jsx';

export default function Dashboard({ workOrders, assets, locations }) {
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
        <div style={styles.timestamp}>
          Last refreshed: {new Date().toLocaleString()}
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

      <WorkOrderTable workOrders={nodes} />
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
};
