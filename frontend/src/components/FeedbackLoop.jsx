import React, { useState } from 'react';

export default function FeedbackLoop({ workOrder, onFeedback, result }) {
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleFeedback = async (status) => {
    setSubmitting(true);
    try {
      await onFeedback(status, comment);
    } finally {
      setSubmitting(false);
    }
  };

  if (result) {
    return (
      <div style={styles.resultContainer}>
        <div style={styles.resultIcon}>
          {result.status === 'fixed' && '✅'}
          {result.status === 'still_happening' && '⏳'}
          {result.status === 'worse' && '⚠️'}
        </div>
        <h3 style={styles.resultTitle}>
          {result.status === 'fixed' && 'Great — marked as resolved'}
          {result.status === 'still_happening' && 'Noted — issue persists'}
          {result.status === 'worse' && 'Escalated — condition worsening'}
        </h3>
        <p style={styles.resultText}>
          {result.status === 'fixed' && 'Thank you for confirming. This helps verify that the work order was truly completed.'}
          {result.status === 'still_happening' && 'Your feedback has been recorded. The maintenance team will be notified that this issue remains unresolved.'}
          {result.status === 'worse' && 'This work order has been flagged for immediate escalation. A supervisor will review within 2 hours.'}
        </p>
        {result.escalation && (
          <div style={styles.escalationAlert}>
            <strong>🚨 Escalation triggered:</strong> {result.escalation.message}
          </div>
        )}
        <p style={styles.timestamp}>Recorded: {new Date(result.timestamp).toLocaleString()}</p>
      </div>
    );
  }

  return (
    <div>
      <div style={styles.intro}>
        <h3 style={styles.title}>✅ Verification Loop</h3>
        <p style={styles.subtitle}>
          Has this issue actually been resolved? Your feedback prevents false closure and helps prioritize persistent problems.
        </p>
      </div>

      <div style={styles.currentStatus}>
        <span style={styles.statusLabel}>Current stage:</span>
        <span style={styles.statusValue}>{workOrder.workOrderStage?.name || 'Unknown'}</span>
      </div>

      <div style={styles.optionalComment}>
        <textarea
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder="Optional: add a quick note about what you're seeing now..."
          style={styles.commentInput}
          rows={2}
        />
      </div>

      <div style={styles.buttonGrid}>
        <button
          onClick={() => handleFeedback('fixed')}
          disabled={submitting}
          style={styles.fixedBtn}
        >
          <span style={styles.btnIcon}>✅</span>
          <span style={styles.btnLabel}>Fixed</span>
          <span style={styles.btnDesc}>It's better now</span>
        </button>

        <button
          onClick={() => handleFeedback('still_happening')}
          disabled={submitting}
          style={styles.persistsBtn}
        >
          <span style={styles.btnIcon}>⏳</span>
          <span style={styles.btnLabel}>Still Happening</span>
          <span style={styles.btnDesc}>No change yet</span>
        </button>

        <button
          onClick={() => handleFeedback('worse')}
          disabled={submitting}
          style={styles.worseBtn}
        >
          <span style={styles.btnIcon}>⚠️</span>
          <span style={styles.btnLabel}>Worse</span>
          <span style={styles.btnDesc}>Condition deteriorated</span>
        </button>
      </div>

      <p style={styles.privacyNote}>
        Your feedback is anonymous and helps ensure work orders reflect reality.
      </p>
    </div>
  );
}

const styles = {
  intro: {
    marginBottom: 20,
  },
  title: {
    fontSize: '1.1rem',
    fontWeight: 600,
    color: '#f4f4f5',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: '0.85rem',
    color: '#71717a',
    lineHeight: 1.4,
  },
  currentStatus: {
    background: '#0f0f12',
    padding: '10px 16px',
    borderRadius: 8,
    marginBottom: 16,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: '0.8rem',
    color: '#71717a',
  },
  statusValue: {
    fontSize: '0.85rem',
    color: '#e4e4e7',
    fontWeight: 600,
    background: '#27272a',
    padding: '3px 10px',
    borderRadius: 4,
  },
  optionalComment: {
    marginBottom: 20,
  },
  commentInput: {
    width: '100%',
    background: '#0f0f12',
    border: '1px solid #27272a',
    borderRadius: 8,
    color: '#e4e4e7',
    padding: '10px 14px',
    fontSize: '0.85rem',
    fontFamily: 'inherit',
    resize: 'none',
    outline: 'none',
  },
  buttonGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: 12,
    marginBottom: 20,
  },
  fixedBtn: {
    background: '#0f2a1f',
    border: '1px solid #166534',
    borderRadius: 12,
    padding: '20px 12px',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 6,
    transition: 'transform 0.1s',
  },
  persistsBtn: {
    background: '#1a1a2e',
    border: '1px solid #312e81',
    borderRadius: 12,
    padding: '20px 12px',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 6,
    transition: 'transform 0.1s',
  },
  worseBtn: {
    background: '#2a1a0f',
    border: '1px solid #92400e',
    borderRadius: 12,
    padding: '20px 12px',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 6,
    transition: 'transform 0.1s',
  },
  btnIcon: {
    fontSize: '1.5rem',
  },
  btnLabel: {
    fontSize: '0.85rem',
    fontWeight: 600,
    color: '#e4e4e7',
  },
  btnDesc: {
    fontSize: '0.7rem',
    color: '#71717a',
  },
  privacyNote: {
    textAlign: 'center',
    fontSize: '0.7rem',
    color: '#3f3f46',
  },
  resultContainer: {
    textAlign: 'center',
    padding: '32px 20px',
  },
  resultIcon: {
    fontSize: '3rem',
    marginBottom: 12,
  },
  resultTitle: {
    fontSize: '1.1rem',
    fontWeight: 600,
    color: '#f4f4f5',
    marginBottom: 8,
  },
  resultText: {
    color: '#a1a1aa',
    fontSize: '0.85rem',
    lineHeight: 1.5,
    marginBottom: 16,
  },
  escalationAlert: {
    background: '#451a03',
    border: '1px solid #92400e',
    borderRadius: 8,
    padding: '12px 16px',
    color: '#fde68a',
    fontSize: '0.85rem',
    marginBottom: 16,
    textAlign: 'left',
  },
  timestamp: {
    fontSize: '0.75rem',
    color: '#52525b',
  },
};
