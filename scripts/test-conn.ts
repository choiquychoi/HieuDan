import { SQL } from 'bun';

async function test() {
  const sql = new SQL('postgresql://postgres.ejwprgwguwktaoifxhux:Choiquychoi123!@aws-0-ap-southeast-2.pooler.supabase.com:6543/postgres', { max: 1 });
  const res = await sql`SELECT count(*) FROM products`;
  console.log('Products count on Supabase:', res);
  await sql.close();
}

test().catch(console.error);
