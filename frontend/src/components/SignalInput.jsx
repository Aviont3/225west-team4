import React, { useState } from 'react';

export default function SignalInput({ workOrder, onSubmit, result }) {
  const [observation, setObservation] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!observation.trim()) return;
    setSubmitting(true);
    try {
      await onSubmit(observation);
    } finally {
      setSubmitting(false);
    }
  };

  const suggestions = [
    "It's been like this for over a week",
    "The problem is worse in the afternoon",
    "Multiple classrooms are affected",
    "Students are complaining about headaches",
    "This was supposedly fixed last month but it's back",
  ];

  return (
    <div>
      <div style={styles.intro}>
        <h3 style={styles.title}>🎤 Submit a Field Observation</h3>
        <p style={styles.subtitle}>
          What are you seeing, hearing, or experiencing? One sentence is enough — AI will structure it.
        </p>
      </div>

      {!result ? (
        <>
          <div style={styles.inputContainer}>
            <textarea
              value={observation}
              onChange={e => setObservation(e.target.value)}
              placeholder="e.g., The hallway has been way too hot every day after lunch. Kids are getting headaches and we keep propping the door open..."
              style={styles.textarea}
              rows={4}
            />
            <button
              onClick={handleSubmit}
              disabled={!observation.trim() || submitting}
              style={{
                ...styles.submitBtn,
                opacity: !observation.trim() || submitting ? 0.5 : 1,
              }}
            >
              {submitting ? '🔄 Processing...' : '🧠 Analyze with AI'}
            </button>
          </div>

          <div style={styles.suggestionsSection}>
            <p style={styles.suggestLabel}>Quick observations:</p>
            <div style={styles.suggestionsGrid}>
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setObservation(prev => prev ? `${prev} ${s}.` : s)}
                  style={styles.suggestionChip}
                >
                  + {s}
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div style={styles.successBox}>
          <div style={styles.successIcon}>✅</div>
          <h4 style={styles.successTitle}>Signal captured and analyzed</h4>
          <p style={styles.successText}>
            Your observation has been structured by AI and attached to work order <strong>{workOrder.title}</strong>.
          </p>
          <div style={styles.observationQuote}>
            "{result.originalObservation}"
          </div>
          <p style={styles.hint}>Check the "Enrichment" tab to see the AI analysis →</p>
        </div>
      )}
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
  inputContainer: {
    marginBottom: 20,
  },
  textarea: {
    width: '100%',
    background: '#0f0f12',
    border: '1px solid #27272a',
    borderRadius: 10,
    color: '#e4e4e7',
    padding: '14px 16px',
    fontSize: '0.9rem',
    lineHeight: 1.5,
    resize: 'vertical',
    fontFamily: 'inherit',
    outline: 'none',
    marginBottom: 12,
  },
  submitBtn: {
    width: '100%',
    background: '#3b82f6',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    padding: '12px 24px',
    fontSize: '0.9rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'opacity 0.2s',
  },
  suggestionsSection: {
    borderTop: '1px solid #27272a',
    paddingTop: 16,
  },
  suggestLabel: {
    fontSize: '0.75rem',
    color: '#52525b',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: 8,
  },
  suggestionsGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 6,
  },
  suggestionChip: {
    background: '#27272a',
    border: '1px solid #3f3f46',
    color: '#a1a1aa',
    padding: '6px 12px',
    borderRadius: 20,
    fontSize: '0.75rem',
    cursor: 'pointer',
  },
  successBox: {
    textAlign: 'center',
    padding: '32px 20px',
  },
  successIcon: {
    fontSize: '2.5rem',
    marginBottom: 12,
  },
  successTitle: {
    fontSize: '1.1rem',
    fontWeight: 600,
    color: '#22c55e',
    marginBottom: 8,
  },
  successText: {
    color: '#a1a1aa',
    fontSize: '0.85rem',
    marginBottom: 16,
  },
  observationQuote: {
    background: '#0f0f12',
    borderLeft: '3px solid #3b82f6',
    padding: '12px 16px',
    borderRadius: 6,
    color: '#e4e4e7',
    fontSize: '0.85rem',
    fontStyle: 'italic',
    marginBottom: 16,
    textAlign: 'left',
  },
  hint: {
    color: '#3b82f6',
    fontSize: '0.8rem',
    fontWeight: 500,
  },
};
