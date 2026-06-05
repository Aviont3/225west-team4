import React from 'react';

export default function BuildingList({ workOrders, locations }) {
  // Count work orders by location
  const locationCounts = {};
  workOrders.forEach((wo) => {
    const locs = wo.locations || [];
    locs.forEach((loc) => {
      const name = loc.locationName || 'Unknown';
      if (!locationCounts[name]) {
        locationCounts[name] = { name, address: loc.address || '', count: 0 };
      }
      locationCounts[name].count++;
    });
  });

  // Sort by count descending, take top 5
  const top5 = Object.values(locationCounts)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const maxCount = top5[0]?.count || 1;

  return (
    <div>
      <h3 style={styles.title}>🏢 Top 5 Buildings by Open Work Orders</h3>
      {top5.length === 0 ? (
        <p style={styles.empty}>No location data available</p>
      ) : (
        <div style={styles.list}>
          {top5.map((loc, i) => (
            <div key={loc.name} style={styles.item}>
              <div style={styles.rank}>#{i + 1}</div>
              <div style={styles.info}>
                <p style={styles.name}>{loc.name}</p>
                {loc.address && <p style={styles.address}>{loc.address}</p>}
                <div style={styles.barContainer}>
                  <div
                    style={{
                      ...styles.bar,
                      width: `${(loc.count / maxCount) * 100}%`,
                    }}
                  />
                </div>
              </div>
              <div style={styles.count}>{loc.count}</div>
            </div>
          ))}
        </div>
      )}
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
  empty: {
    color: '#71717a',
    fontSize: '0.9rem',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  rank: {
    fontSize: '0.85rem',
    fontWeight: 700,
    color: '#52525b',
    width: 28,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: '0.9rem',
    fontWeight: 600,
    color: '#e4e4e7',
  },
  address: {
    fontSize: '0.75rem',
    color: '#71717a',
    marginTop: 2,
  },
  barContainer: {
    width: '100%',
    height: 4,
    background: '#27272a',
    borderRadius: 2,
    marginTop: 6,
  },
  bar: {
    height: 4,
    background: '#3b82f6',
    borderRadius: 2,
    transition: 'width 0.3s ease',
  },
  count: {
    fontSize: '1.2rem',
    fontWeight: 700,
    color: '#3b82f6',
    minWidth: 32,
    textAlign: 'right',
  },
};
