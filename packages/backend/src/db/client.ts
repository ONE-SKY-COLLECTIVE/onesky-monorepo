
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from './schema';
import dotenv from 'dotenv';
dotenv.config();


const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
 throw new Error('DATABASE_URL environment variable is required');
}

const client = postgres(process.env.DATABASE_URL!, { max: 1 });

// Create the Drizzle instance
export const db = drizzle(client, { schema });
