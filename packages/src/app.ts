import express from 'express';
import sampleRoutes from './routes/sample.route';
import { errorHandler } from './middlewares/error.middleware';

const app = express();
app.use(express.json());

app.use('/api', sampleRoutes);
app.use(errorHandler);

export default app;
