import { Router } from 'express';
import { sampleHandler } from '../controllers/sample.controller';

const router = Router();

router.get('/sample', sampleHandler);

export default router;
