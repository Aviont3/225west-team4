import React, { useState, useEffect } from 'react';
import { fetchWorkOrders, fetchAssets, fetchLocations } from './services/api.js';
import Dashboard from './components/Dashboard.jsx';
import WorkOrderDetail from './components/WorkOrderDetail.jsx';

export default function App() {
  const [workOrders, setWorkOrders] = useState(null);
  const [assets, setAssets] = useState(null);
  const [locations, setLocations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedWO, setSelectedWO] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [woData, assetData, locData] = await Promise.all([
          fetchWorkOrders({ limit: 100 }),
          fetchAssets({ limit: 200 }),
          fetchLocations(),
        ]);
        setWorkOrders(woData);
        setAssets(assetData);
        setLocations(locData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Pulling work orders from CriticalAsset...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.errorContainer}>
        <h2>⚠️ Connection Error</h2>
        <p>{error}</p>
        <p style={{ fontSize: '0.9rem', opacity: 0.7, marginTop: 8 }}>
          Make sure the backend is running on port 3001.
        </p>
      </div>
    );
  }

  return (
    <>
      <Dashboard
        workOrders={workOrders}
        assets={assets}
        locations={locations}
        onSelectWorkOrder={setSelectedWO}
      />
      {selectedWO && (
        <WorkOrderDetail
          workOrder={selectedWO}
          onClose={() => setSelectedWO(null)}
        />
      )}
    </>
  );
}

const styles = {
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    gap: 16,
  },
  spinner: {
    width: 40,
    height: 40,
    border: '3px solid #333',
    borderTop: '3px solid #3b82f6',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    fontSize: '1.1rem',
    color: '#a1a1aa',
  },
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    gap: 8,
    color: '#ef4444',
  },
};
