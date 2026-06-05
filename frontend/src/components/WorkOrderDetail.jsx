import React, { useState, useEffect } from 'react';
import { getEnrichment, submitSignal, submitFeedback } from '../services/api.js';
import SignalInput from './SignalInput.jsx';
import AIEnrichment from './AIEnrichment.jsx';
import FeedbackLoop from './FeedbackLoop.jsx';

export default function WorkOrderDetail({ workOrder, onClose }) {
  const [enrichment, setEnrichment] = useState(null);
  const [signalResult, setSignalResult] = useState(null);
  const [feedbackResult, setFeedbackResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('overview');

  useEffect(() => {
    async function loadEnrichment() {
      try {
        const data = await getEnrichment(workOrder.id);
        setEnrichment(data);
      } catch (err) {
        console.error('Failed to load enrichment:', err);
      } finally {
        setLoading(false);
      }
    }
    loadEnrichment();
  }, [workOrder.id]);

  const handleSignalSubmit = async (observation) => {
    const result = await submitSignal(workOrder.id, observation);
    setSignalResult(result);
    setTab('enrichment');
  };

  const handleFeedback = async (status, comment) => {
    const result = await submitFeedback(workOrder.id, status, comment);
    setFeedbackResult(result);
  };

  const severityColor = {
    critical: '#ef4444',
    high: '#f97316',
    medium: '#f59e0b',
    low: '#22c55e',
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <span style={{
              ...styles.severityDot,
              background: severityColor[workOrder.severity] || '#71717a'
            }} />
            <h2 style={styles.title}>{workOrder.title}</h2>
          </div>
          <button onClick={onClose} style={styles.closeBtn}>✕</button>
        </div>

        {/* Work Order Info */}
        <div style={styles.metaRow}>
          <span style={styles.metaChip}>🏢 {workOrder.locations?.[0]?.locationName || 'N/A'}</span>
          <span style={styles.metaChip}>🔧 {workOrder.assets?.[0]?.name || 'N/A'}</span>
          <span style={styles.metaChip}>📋 {workOrder.workOrderStage?.name || 'N/A'}</span>
        </div>

        {workOrder.description && (
          <p style={styles.description}>{workOrder.description}</p>
        )}

        {/* Tabs */}
        <div style={styles.tabs}>
          {['overview', 'signal', 'enrichment', 'feedback'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                ...styles.tab,
                ...(tab === t ? styles.tabActive : {}),
              }}
            >
              {t === 'overview' && '📊 '}
              {t === 'signal' && '🎤 '}
              {t === 'enrichment' && '🧠 '}
              {t === 'feedback' && '✅ '}
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div style={styles.tabContent}>
          {tab === 'overview' && enrichment && !loading && (
            <div>
              <h3 style={styles.sectionTitle}>AI Analysis</h3>
              <div style={styles.fieldGrid}>
                <div style={styles.field}>
                  <label style={styles.fieldLabel}>Issue Type</label>
                  <p style={styles.fieldValue}>{enrichment.structuredFields?.issueType}</p>
                </div>
                <div style={styles.field}>
                  <label style={styles.fieldLabel}>Frequency</label>
                  <p style={styles.fieldValue}>{enrichment.structuredFields?.frequency}</p>
                </div>
                <div style={styles.field}>
                  <label style={styles.fieldLabel}>Impact</label>
                  <p style={styles.fieldValue}>{enrichment.structuredFields?.impact}</p>
                </div>
                <div style={styles.field}>
                  <label style={styles.fieldLabel}>Related Asset</label>
                  <p style={styles.fieldValue}>{enrichment.structuredFields?.relatedAsset}</p>
                </div>
              </div>

              <h3 style={{ ...styles.sectionTitle, marginTop: 20 }}>Possible Causes</h3>
              <ul style={styles.causeList}>
                {enrichment.structuredFields?.possibleCauses?.map((cause, i) => (
                  <li key={i} style={styles.causeItem}>• {cause}</li>
                ))}
              </ul>
            </div>
          )}

          {tab === 'overview' && loading && (
            <p style={styles.loading}>Loading AI analysis...</p>
          )}

          {tab === 'signal' && (
            <SignalInput
              workOrder={workOrder}
              onSubmit={handleSignalSubmit}
              result={signalResult}
            />
          )}

          {tab === 'enrichment' && (
            <AIEnrichment
              enrichment={enrichment}
              signalResult={signalResult}
            />
          )}

          {tab === 'feedback' && (
            <FeedbackLoop
              workOrder={workOrder}
              onFeedback={handleFeedback}
              result={feedbackResult}
            />
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0,0,0,0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: 20,
  },
  modal: {
    background: '#18181b',
    borderRadius: 16,
    border: '1px solid #27272a',
    width: '100%',
    maxWidth: 800,
    maxHeight: '90vh',
    overflow: 'auto',
    padding: 32,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  severityDot: {
    width: 12,
    height: 12,
    borderRadius: '50%',
    flexShrink: 0,
  },
  title: {
    fontSize: '1.3rem',
    fontWeight: 700,
    color: '#f4f4f5',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: '#71717a',
    fontSize: '1.5rem',
    cursor: 'pointer',
    padding: 4,
  },
  metaRow: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  metaChip: {
    background: '#27272a',
    color: '#a1a1aa',
    padding: '4px 10px',
    borderRadius: 6,
    fontSize: '0.8rem',
  },
  description: {
    color: '#a1a1aa',
    fontSize: '0.9rem',
    lineHeight: 1.5,
    marginBottom: 20,
    padding: '12px 16px',
    background: '#0f0f12',
    borderRadius: 8,
    borderLeft: '3px solid #3b82f6',
  },
  tabs: {
    display: 'flex',
    gap: 4,
    borderBottom: '1px solid #27272a',
    marginBottom: 20,
  },
  tab: {
    background: 'none',
    border: 'none',
    color: '#71717a',
    padding: '10px 16px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: 500,
    borderBottom: '2px solid transparent',
    transition: 'all 0.2s',
  },
  tabActive: {
    color: '#f4f4f5',
    borderBottom: '2px solid #3b82f6',
  },
  tabContent: {
    minHeight: 200,
  },
  sectionTitle: {
    fontSize: '0.95rem',
    fontWeight: 600,
    color: '#e4e4e7',
    marginBottom: 12,
  },
  fieldGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 12,
  },
  field: {
    background: '#0f0f12',
    padding: '12px 16px',
    borderRadius: 8,
  },
  fieldLabel: {
    fontSize: '0.7rem',
    fontWeight: 600,
    color: '#71717a',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  fieldValue: {
    fontSize: '0.85rem',
    color: '#e4e4e7',
    marginTop: 4,
  },
  causeList: {
    listStyle: 'none',
    padding: 0,
  },
  causeItem: {
    color: '#a1a1aa',
    fontSize: '0.85rem',
    padding: '4px 0',
  },
  loading: {
    color: '#71717a',
    textAlign: 'center',
    padding: 40,
  },
};
