import 'dotenv/config';
import express from 'express';
import apiRouter from './routes/api.js';

export const app = express();

app.use(express.json());

// Request logging for audit trail demonstration
app.use((req, res, next) => {
  if (req.url.startsWith('/api')) {
    console.log(`[AICTE Gateway API] ${req.method} ${req.url}`);
  }
  next();
});

// Mount all AICTE API endpoints
app.use('/api', apiRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'HEALTHY',
    service: 'AICTE Security Deposit & FDR Management Gateway',
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 5000;
if (process.argv[1] && process.argv[1].endsWith('server.js')) {
  app.listen(PORT, () => {
    console.log(`AICTE Core Backend Gateway running on http://localhost:${PORT}`);
  });
}

export default app;
