import { Pool } from 'pg'

let pool: Pool | null = null

export function getDbPool(): Pool {
  if (!pool) {
    if (process.env.DATABASE_URL) {
      const isLocal =
        process.env.DATABASE_URL.includes('localhost') ||
        process.env.DATABASE_URL.includes('127.0.0.1')
      pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: isLocal ? false : { rejectUnauthorized: false },
        max: 10,
        idleTimeoutMillis: 30000,
      })
    } else {
      pool = new Pool({
        user: process.env.PGUSER || 'postgres',
        host: process.env.PGHOST || 'localhost',
        database: process.env.PGDATABASE || 'duc_ngan_db',
        password: process.env.PGPASSWORD || '123456',
        port: Number(process.env.PGPORT || 5432),
        max: 10,
        idleTimeoutMillis: 30000,
      })
    }
  }
  return pool
}

export default getDbPool()
