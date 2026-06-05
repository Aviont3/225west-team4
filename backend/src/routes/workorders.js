import { Router } from 'express';
import { graphqlQuery } from '../api.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { limit = 50, severity } = req.query;

    const filter = {};
    if (severity && severity !== 'all') filter.severity = severity;

    const query = `query FetchWorkOrders($limit: Int, $filter: WorkOrderFilter) {
      workOrders(limit: $limit, filter: $filter) {
        totalCount
        nodes {
          id title description severity executionPriority createdAt updatedAt
          workOrderStage { name }
          assets { id name status category }
          locations { id locationName address }
        }
      }
    }`;

    const data = await graphqlQuery(query, {
      limit: parseInt(limit),
      filter: Object.keys(filter).length > 0 ? filter : undefined,
    });
    res.json(data.workOrders);
  } catch (err) {
    console.error('Error fetching work orders:', err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
