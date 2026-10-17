import { Pool } from 'pg'

let pool: Pool | null = null

export function getDbPool(): Pool {
  if (!pool) {
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
  return pool
}

export default getDbPool()
