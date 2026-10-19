import { SQL } from 'bun';

async function check() {
  const sql = new SQL('postgresql://postgres.ejwprgwguwktaoifxhux:Choiquychoi123!@aws-0-ap-southeast-2.pooler.supabase.com:6543/postgres', { max: 1 });
  
  const tables = await sql`SELECT id, name, slug FROM data_tables`;
  console.log('Tables in Instatic CMS:', tables);

  const rowCounts = await sql`SELECT table_id, count(*) FROM data_rows GROUP BY table_id`;
  console.log('Rows count per table in Instatic CMS:', rowCounts);

  await sql.close();
}

check().catch(console.error);
