import { Router } from 'express';
import { graphqlQuery } from '../api.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { limit = 100, status } = req.query;

    const filter = {};
    if (status) filter.status = status;

    const query = `query FetchAssets($limit: Int, $filter: AssetFilterInput) {
      assets(limit: $limit, filter: $filter) {
        total
        assets {
          id name status description locationAddress createdAt updatedAt
          locations { id locationName address }
        }
      }
    }`;

    const data = await graphqlQuery(query, {
      limit: parseInt(limit),
      filter: Object.keys(filter).length > 0 ? filter : undefined,
    });
    res.json(data.assets);
  } catch (err) {
    console.error('Error fetching assets:', err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
