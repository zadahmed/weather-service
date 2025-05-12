import express from 'express';
import cors from 'cors';
import config from './config/index.js';

async function startServer() {
  const app = express();
  
  app.use(cors({
    origin: config.server.corsOrigin
  }));
  app.use(express.json());
  
  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
  });
  
  app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(500).json({
      error: 'Internal Server Error',
      message: config.server.nodeEnv === 'development' ? err.message : undefined
    });
  });
  
  const port = config.server.port;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
  
  return app;
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

export default startServer;