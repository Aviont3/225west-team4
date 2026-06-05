import React, { useState } from 'react';

export default function WorkOrderTable({ workOrders }) {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all'
    ? workOrders
    : workOrders.filter(wo => wo.severity === filter);

  const severityBadge = (severity) => {
    const colors = {
      critical: { bg: '#7f1d1d', text: '#fca5a5' },
      high: { bg: '#7c2d12', text: '#fdba74' },
      medium: { bg: '#713f12', text: '#fde047' },
      low: { bg: '#14532d', text: '#86efac' },
    };
    const c = colors[severity] || { bg: '#27272a', text: '#a1a1aa' };
    return (
      <span style={{
        background: c.bg,
        color: c.text,
        padding: '2px 8px',
        borderRadius: 4,
        fontSize: '0.75rem',
        fontWeight: 600,
        textTransform: 'uppercase',
      }}>
        {severity || 'N/A'}
      </span>
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.title}>All Work Orders</h3>
        <div style={styles.filters}>
          {['all', 'critical', 'high', 'medium', 'low'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                ...styles.filterBtn,
                ...(filter === f ? styles.filterActive : {}),
              }}
            >
              {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.tableWrap}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Title</th>
              <th style={styles.th}>Severity</th>
              <th style={styles.th}>Priority</th>
              <th style={styles.th}>Stage</th>
              <th style={styles.th}>Location</th>
              <th style={styles.th}>Asset</th>
            </tr>
          </thead>
          <tbody>
            {filtered.slice(0, 50).map((wo) => (
              <tr key={wo.id} style={styles.tr}>
                <td style={styles.td}>
                  <p style={styles.woTitle}>{wo.title}</p>
                  {wo.description && (
                    <p style={styles.woDesc}>
                      {wo.description.slice(0, 80)}{wo.description.length > 80 ? '...' : ''}
                    </p>
                  )}
                </td>
                <td style={styles.td}>{severityBadge(wo.severity)}</td>
                <td style={styles.td}>
                  <span style={styles.priority}>{wo.executionPriority || '—'}</span>
                </td>
                <td style={styles.td}>
                  <span style={styles.stage}>{wo.workOrderStage?.name || '—'}</span>
                </td>
                <td style={styles.td}>
                  <span style={styles.location}>
                    {wo.locations?.[0]?.locationName || '—'}
                  </span>
                </td>
                <td style={styles.td}>
                  <span style={styles.asset}>
                    {wo.assets?.[0]?.name || '—'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length > 50 && (
        <p style={styles.moreText}>Showing 50 of {filtered.length} work orders</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    background: '#18181b',
    borderRadius: 12,
    padding: 24,
    border: '1px solid #27272a',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: '1rem',
    fontWeight: 600,
    color: '#e4e4e7',
  },
  filters: {
    display: 'flex',
    gap: 6,
  },
  filterBtn: {
    background: '#27272a',
    border: 'none',
    color: '#a1a1aa',
    padding: '6px 12px',
    borderRadius: 6,
    fontSize: '0.8rem',
    cursor: 'pointer',
    fontWeight: 500,
  },
  filterActive: {
    background: '#3b82f6',
    color: '#fff',
  },
  tableWrap: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    textAlign: 'left',
    padding: '10px 12px',
    fontSize: '0.75rem',
    fontWeight: 600,
    color: '#71717a',
    textTransform: 'uppercase',
    borderBottom: '1px solid #27272a',
  },
  tr: {
    borderBottom: '1px solid #1f1f23',
  },
  td: {
    padding: '12px',
    verticalAlign: 'top',
  },
  woTitle: {
    fontSize: '0.9rem',
    fontWeight: 500,
    color: '#e4e4e7',
  },
  woDesc: {
    fontSize: '0.8rem',
    color: '#71717a',
    marginTop: 4,
  },
  priority: {
    fontSize: '0.8rem',
    color: '#a1a1aa',
  },
  stage: {
    fontSize: '0.8rem',
    color: '#a1a1aa',
    background: '#27272a',
    padding: '2px 8px',
    borderRadius: 4,
  },
  location: {
    fontSize: '0.8rem',
    color: '#a1a1aa',
  },
  asset: {
    fontSize: '0.8rem',
    color: '#a1a1aa',
  },
  moreText: {
    textAlign: 'center',
    color: '#52525b',
    fontSize: '0.85rem',
    marginTop: 16,
  },
};
