import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function SeverityChart({ workOrders }) {
  // Count by severity
  const severityCounts = workOrders.reduce((acc, wo) => {
    const sev = wo.severity || 'unknown';
    acc[sev] = (acc[sev] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(severityCounts)
    .map(([severity, count]) => ({ severity, count }))
    .sort((a, b) => b.count - a.count);

  const colorMap = {
    critical: '#ef4444',
    high: '#f97316',
    medium: '#f59e0b',
    low: '#22c55e',
    unknown: '#71717a',
  };

  return (
    <div>
      <h3 style={styles.title}>Work Orders by Severity</h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 10, right: 20, bottom: 20, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
          <XAxis
            dataKey="severity"
            tick={{ fill: '#a1a1aa', fontSize: 12 }}
            axisLine={{ stroke: '#27272a' }}
          />
          <YAxis
            tick={{ fill: '#a1a1aa', fontSize: 12 }}
            axisLine={{ stroke: '#27272a' }}
          />
          <Tooltip
            contentStyle={{ background: '#27272a', border: 'none', borderRadius: 8 }}
            labelStyle={{ color: '#f4f4f5' }}
          />
          <Bar dataKey="count" radius={[6, 6, 0, 0]}>
            {data.map((entry) => (
              <Cell key={entry.severity} fill={colorMap[entry.severity] || '#3b82f6'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

const styles = {
  title: {
    fontSize: '1rem',
    fontWeight: 600,
    color: '#e4e4e7',
    marginBottom: 16,
  },
};
