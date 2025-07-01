import { Request, Response } from 'express';
import { getSampleData } from '../services/sample.service';

export const sampleHandler = async (req: Request, res: Response) => {
  const data = await getSampleData();
  res.json({ data });
};
