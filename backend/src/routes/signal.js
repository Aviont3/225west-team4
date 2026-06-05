import { Router } from 'express';
import { mockWorkOrders } from '../mockData.js';
import { processStudentSignal, getEnrichment } from '../aiEnrichments.js';

const router = Router();

// In-memory store for signals and feedback
const signals = [];
const feedback = {};

/**
 * POST /api/signal
 * Student submits a field observation tied to a work order.
 * Body: { workOrderId, observation }
 */
router.post('/', (req, res) => {
  try {
    const { workOrderId, observation } = req.body;

    if (!workOrderId || !observation) {
      return res.status(400).json({ error: 'workOrderId and observation are required' });
    }

    const workOrder = mockWorkOrders.nodes.find(wo => wo.id === workOrderId);
    if (!workOrder) {
      return res.status(404).json({ error: 'Work order not found' });
    }

    // Process through "AI"
    const result = processStudentSignal(observation, workOrder);

    // Store the signal
    const signal = {
      id: `sig_${Date.now()}`,
      workOrderId,
      ...result,
    };
    signals.push(signal);

    res.json(signal);
  } catch (err) {
    console.error('Error processing signal:', err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /api/signal/:workOrderId
 * Get all signals submitted for a work order.
 */
router.get('/:workOrderId', (req, res) => {
  const woSignals = signals.filter(s => s.workOrderId === req.params.workOrderId);
  res.json(woSignals);
});

/**
 * GET /api/signal/enrich/:workOrderId
 * Get AI enrichment for a work order (without submitting a new signal).
 */
router.get('/enrich/:workOrderId', (req, res) => {
  try {
    const workOrder = mockWorkOrders.nodes.find(wo => wo.id === req.params.workOrderId);
    if (!workOrder) {
      return res.status(404).json({ error: 'Work order not found' });
    }

    const enrichment = getEnrichment(workOrder);
    res.json({ workOrder, ...enrichment });
  } catch (err) {
    console.error('Error enriching work order:', err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/signal/feedback
 * Student provides feedback: fixed, still_happening, or worse.
 * Body: { workOrderId, status, comment? }
 */
router.post('/feedback', (req, res) => {
  try {
    const { workOrderId, status, comment } = req.body;

    if (!workOrderId || !status) {
      return res.status(400).json({ error: 'workOrderId and status are required' });
    }

    if (!['fixed', 'still_happening', 'worse'].includes(status)) {
      return res.status(400).json({ error: 'status must be: fixed, still_happening, or worse' });
    }

    const entry = {
      id: `fb_${Date.now()}`,
      workOrderId,
      status,
      comment: comment || null,
      timestamp: new Date().toISOString(),
    };

    if (!feedback[workOrderId]) feedback[workOrderId] = [];
    feedback[workOrderId].push(entry);

    // If "worse", flag for escalation
    const response = { ...entry };
    if (status === 'worse') {
      response.escalation = {
        flagged: true,
        message: 'This work order has been flagged for escalation. A supervisor will be notified.',
        reason: 'End-user reports condition has worsened since last update.'
      };
    }

    res.json(response);
  } catch (err) {
    console.error('Error recording feedback:', err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /api/signal/feedback/:workOrderId
 * Get all feedback entries for a work order.
 */
router.get('/feedback/:workOrderId', (req, res) => {
  const woFeedback = feedback[req.params.workOrderId] || [];
  res.json(woFeedback);
});

export default router;
