import 'dotenv/config';
import express from 'express';
import path from 'path';
import fs from 'fs';
import { tripsRouter } from './server/routes/trips';
import { destinationsRouter } from './server/routes/destinations';
import { bookingsRouter } from './server/routes/bookings';
import { inquiriesRouter } from './server/routes/inquiries';
import { reviewsRouter } from './server/routes/reviews';
import { calculatorRouter } from './server/routes/calculator';
import { aiRouter } from './server/routes/ai';
import { backendStore } from './server/store';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middlewares
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));

  // Request Logging
  app.use((req, res, next) => {
    if (req.path.startsWith('/api')) {
      console.log(`[API ${req.method}] ${req.path}`);
    }
    next();
  });

  // Health Endpoint for Cloud Run readiness and liveness probes
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'Yatri Backend API',
      version: '2.4.0',
      timestamp: new Date().toISOString(),
      database: {
        bookingsCount: backendStore.getAllBookings().length,
        reviewsCount: backendStore.getAllReviews().length,
        inquiriesCount: backendStore.getAllInquiries().length,
        persisted: true
      },
      capabilities: [
        'TRIP_MANAGEMENT',
        'REAL_PNR_BOOKINGS',
        'MOUNTAIN_TELEMETRY',
        'SERVER_GEMINI_AI',
        'EXPEDITION_INQUIRIES',
        'INR_CALCULATOR'
      ]
    });
  });

  // Mount API Routers
  app.use('/api/trips', tripsRouter);
  app.use('/api/destinations', destinationsRouter);
  app.use('/api/bookings', bookingsRouter);
  app.use('/api/inquiries', inquiriesRouter);
  app.use('/api/reviews', reviewsRouter);
  app.use('/api/calculator', calculatorRouter);
  app.use('/api/ai', aiRouter);

  // 404 for unmatched API routes
  app.all('/api/*', (req, res) => {
    res.status(404).json({
      success: false,
      error: `Endpoint ${req.method} ${req.path} not found on Yatri Server.`
    });
  });

  // Determine if running in local development mode or containerized/production mode
  const isDev =
    process.env.NODE_ENV !== 'production' &&
    !process.env.K_SERVICE &&
    !process.argv[1]?.endsWith('.cjs') &&
    !process.argv[1]?.includes('dist');

  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Robust path resolution for Cloud Run container
    const candidatePaths = [
      path.join(process.cwd(), 'dist'),
      process.cwd()
    ];
    const distPath = candidatePaths.find(p => fs.existsSync(path.join(p, 'index.html'))) || path.join(process.cwd(), 'dist');

    app.use(express.static(distPath, { maxAge: '1d', index: 'index.html' }));
    app.get('*', (req, res) => {
      const indexPath = path.join(distPath, 'index.html');
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        // Fallback for health checks if index.html is missing
        res.status(200).send('<!DOCTYPE html><html><head><meta charset="utf-8"/><title>Yatri</title></head><body><div id="root"></div></body></html>');
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Yatri Full-Stack Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
