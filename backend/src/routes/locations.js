import { Router } from 'express';
import { graphqlQuery } from '../api.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const query = `{
      locations {
        id locationName address city state zipcode country locationType
      }
    }`;

    const data = await graphqlQuery(query);
    res.json(data.locations);
  } catch (err) {
    console.error('Error fetching locations:', err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
