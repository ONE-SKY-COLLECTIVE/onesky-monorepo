import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Get database URL from environment variable
const databaseUrl = process.env.DATABASE_URL || 'postgresql://postgres.vcsgmqjhtrzraepyvhct:\'60D0csUiJZ0x@aws-0-eu-central-1.pooler.supabase.com:5432/postgres'

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not set');
}

// Create postgres connection with SSL configuration for Supabase
const client = postgres(databaseUrl, {
  ssl: 'require',
  max: 10, // Maximum number of connections
  idle_timeout: 20, // Idle connection timeout in seconds
});

// Create drizzle instance
export const db = drizzle(client, { schema });

// Export schema for use in other files
export * from './schema'; 