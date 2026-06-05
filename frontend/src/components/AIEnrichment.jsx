import React from 'react';

export default function AIEnrichment({ enrichment, signalResult }) {
  if (!enrichment) {
    return <p style={styles.empty}>No enrichment data available. Submit a signal first.</p>;
  }

  const { structuredFields, workflowRecommendation } = enrichment;
  const enrichData = enrichment.enrichment;

  return (
    <div>
      {/* Workflow Recommendation — the key "action" piece */}
      <div style={styles.recommendationBox}>
        <h3 style={styles.sectionTitle}>⚡ Recommended Next Steps</h3>
        <ol style={styles.stepList}>
          {workflowRecommendation?.nextSteps?.map((step, i) => (
            <li key={i} style={styles.step}>
              <span style={styles.stepNum}>{i + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
        {workflowRecommendation?.escalateIf && (
          <div style={styles.escalateBox}>
            <strong>⚠️ Escalate if:</strong> {workflowRecommendation.escalateIf}
          </div>
        )}
        <div style={styles.metaRow}>
          <span style={styles.metaChip}>
            ⏱ {workflowRecommendation?.estimatedResolution}
          </span>
          <span style={styles.metaChip}>
            👤 {workflowRecommendation?.assignTo}
          </span>
        </div>
      </div>

      {/* Enrichment Data */}
      <div style={styles.enrichmentSection}>
        <h3 style={styles.sectionTitle}>📚 Enrichment Context</h3>

        {/* Prior Work Orders */}
        {enrichData?.priorWorkOrders?.length > 0 && (
          <div style={styles.enrichBlock}>
            <h4 style={styles.enrichLabel}>Prior Work Orders on This Asset</h4>
            {enrichData.priorWorkOrders.map(wo => (
              <div key={wo.id} style={styles.priorWO}>
                <span style={styles.priorTitle}>{wo.title}</span>
                <span style={styles.priorMeta}>{wo.date} · {wo.status}</span>
              </div>
            ))}
          </div>
        )}

        {/* Asset History */}
        {enrichData?.assetHistory && (
          <div style={styles.enrichBlock}>
            <h4 style={styles.enrichLabel}>Asset History</h4>
            <p style={styles.enrichText}>{enrichData.assetHistory}</p>
          </div>
        )}

        {/* Public Data */}
        {enrichData?.publicData && (
          <div style={styles.enrichBlock}>
            <h4 style={styles.enrichLabel}>Public Data (NYC Open Data)</h4>
            <p style={styles.enrichText}>{enrichData.publicData}</p>
          </div>
        )}

        {/* Compliance */}
        {enrichData?.complianceNote && (
          <div style={styles.complianceBlock}>
            <h4 style={styles.enrichLabel}>📋 Compliance / Regulatory Context</h4>
            <p style={styles.enrichText}>{enrichData.complianceNote}</p>
          </div>
        )}
      </div>

      {/* AI Confidence Note */}
      <p style={styles.confidence}>
        🤖 AI-generated analysis based on work order context, asset history, and public data records. Verify on-site before acting.
      </p>
    </div>
  );
}

const styles = {
  empty: {
    color: '#71717a',
    textAlign: 'center',
    padding: 40,
  },
  sectionTitle: {
    fontSize: '1rem',
    fontWeight: 600,
    color: '#f4f4f5',
    marginBottom: 14,
  },
  recommendationBox: {
    background: '#0f2a1f',
    border: '1px solid #166534',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  stepList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  step: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 10,
    padding: '8px 0',
    color: '#d1fae5',
    fontSize: '0.85rem',
    lineHeight: 1.4,
  },
  stepNum: {
    background: '#166534',
    color: '#86efac',
    width: 22,
    height: 22,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.7rem',
    fontWeight: 700,
    flexShrink: 0,
  },
  escalateBox: {
    background: '#451a03',
    border: '1px solid #92400e',
    borderRadius: 8,
    padding: '10px 14px',
    marginTop: 14,
    fontSize: '0.8rem',
    color: '#fde68a',
    lineHeight: 1.4,
  },
  metaRow: {
    display: 'flex',
    gap: 8,
    marginTop: 14,
    flexWrap: 'wrap',
  },
  metaChip: {
    background: '#14532d',
    color: '#86efac',
    padding: '4px 10px',
    borderRadius: 6,
    fontSize: '0.75rem',
  },
  enrichmentSection: {
    marginBottom: 20,
  },
  enrichBlock: {
    background: '#0f0f12',
    borderRadius: 8,
    padding: '14px 16px',
    marginBottom: 10,
  },
  enrichLabel: {
    fontSize: '0.75rem',
    fontWeight: 600,
    color: '#71717a',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: 8,
  },
  enrichText: {
    fontSize: '0.85rem',
    color: '#a1a1aa',
    lineHeight: 1.5,
  },
  priorWO: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '6px 0',
    borderBottom: '1px solid #1f1f23',
  },
  priorTitle: {
    fontSize: '0.85rem',
    color: '#e4e4e7',
  },
  priorMeta: {
    fontSize: '0.75rem',
    color: '#52525b',
  },
  complianceBlock: {
    background: '#1a1a2e',
    border: '1px solid #312e81',
    borderRadius: 8,
    padding: '14px 16px',
    marginBottom: 10,
  },
  confidence: {
    fontSize: '0.75rem',
    color: '#52525b',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 16,
  },
};
