import 'dotenv/config';
import express, { Request, Response } from 'express';
import { db } from './db';
import { sql } from 'drizzle-orm';
import techniquesRouter from './routes/techniques';
import resourcesRouter from './routes/resources';
import useCasesRouter from './routes/useCases';
import effectivenessStatsRouter from './routes/effectivenessStats';
import { logger } from './middleware/logger';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const port = 3000;

app.use(express.json());
app.use(logger);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Mnemo API!');
});

app.use('/api/techniques', techniquesRouter);
app.use('/api/resources', resourcesRouter);
app.use('/api/use-cases', useCasesRouter);
app.use('/api/effectiveness-stats', effectivenessStatsRouter);

app.get('/test-db', async (req: Request, res: Response) => {
  try {
    const result = await db.execute(sql`SELECT 1 as test`);
    res.json({
      success: true,
      message: 'Database connection is working!',
      data: result,
    });
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).json({
      success: false,
      message: 'Database connection failed',
      error: (error as Error).message,
    });
  }
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
