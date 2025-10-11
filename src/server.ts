import 'dotenv/config';
import express, { Request, Response } from 'express';
import { drizzle } from 'drizzle-orm/node-postgres';
import { sql } from 'drizzle-orm';

const db = drizzle(process.env.DATABASE_URL!);
const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Mnemo API!');
});

app.get('/test-db', async (req: Request, res: Response) => {
  try {
    const result = await db.execute(sql`SELECT 1 as test`);
    res.json({
      success: true,
      message: 'Database connection is working!',
      data: result.rows,
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

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
