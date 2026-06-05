import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import workordersRouter from './src/routes/workorders.js';
import assetsRouter from './src/routes/assets.js';
import locationsRouter from './src/routes/locations.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/workorders', workordersRouter);
app.use('/api/assets', assetsRouter);
app.use('/api/locations', locationsRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
