import React from 'react';

export default function StatsCards({ workOrders }) {
  const total = workOrders.length;
  const critical = workOrders.filter(wo => wo.severity === 'critical').length;
  const open = workOrders.filter(wo =>
    wo.workOrderStage?.name?.toLowerCase() !== 'completed' &&
    wo.workOrderStage?.name?.toLowerCase() !== 'closed'
  ).length;
  const highPriority = workOrders.filter(wo =>
    wo.executionPriority === 'high' || wo.executionPriority === 'urgent'
  ).length;

  const cards = [
    { label: 'Total Work Orders', value: total, color: '#3b82f6', icon: '📋' },
    { label: 'Critical Severity', value: critical, color: '#ef4444', icon: '🚨' },
    { label: 'Open / In Progress', value: open, color: '#f59e0b', icon: '🔧' },
    { label: 'High Priority', value: highPriority, color: '#8b5cf6', icon: '⚡' },
  ];

  return (
    <div style={styles.grid}>
      {cards.map((card) => (
        <div key={card.label} style={styles.card}>
          <div style={styles.iconRow}>
            <span style={{ fontSize: '1.5rem' }}>{card.icon}</span>
            <span style={{ ...styles.value, color: card.color }}>{card.value}</span>
          </div>
          <p style={styles.label}>{card.label}</p>
        </div>
      ))}
    </div>
  );
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 16,
    marginBottom: 32,
  },
  card: {
    background: '#18181b',
    border: '1px solid #27272a',
    borderRadius: 12,
    padding: '20px 24px',
  },
  iconRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  value: {
    fontSize: '2rem',
    fontWeight: 700,
  },
  label: {
    fontSize: '0.85rem',
    color: '#71717a',
    fontWeight: 500,
  },
};
