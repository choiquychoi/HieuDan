import { SQL } from 'bun';

async function setupTrigger() {
  const sql = new SQL('postgresql://postgres.ejwprgwguwktaoifxhux:Choiquychoi123!@aws-0-ap-southeast-2.pooler.supabase.com:6543/postgres', { max: 1 });
  
  await sql`
    CREATE OR REPLACE FUNCTION public.sync_instatic_data_row_to_table() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    DECLARE
      c jsonb;
      cat_id integer;
      raw_img text;
    BEGIN
      c := NEW.cells_json;
      
      -- Sync Products
      IF NEW.table_id = 'products' AND NEW.deleted_at IS NULL THEN
        SELECT id INTO cat_id FROM categories WHERE id = NULLIF(c->>'category_id', '')::integer;
        IF cat_id IS NULL THEN
          SELECT id INTO cat_id FROM categories ORDER BY id ASC LIMIT 1;
        END IF;

        raw_img := COALESCE(c->>'featuredMedia', c->>'image_url', '/images/hero/dan-tranh.png');

        INSERT INTO products (
          name, slug, price, category_id, image_url, material, origin, dimensions, status, featured, description, updated_at
        ) VALUES (
          COALESCE(c->>'title', c->>'name', 'Nhạc cụ mới'),
          NEW.slug,
          COALESCE((c->>'price')::numeric, 0),
          cat_id,
          raw_img,
          COALESCE(c->>'material', ''),
          COALESCE(c->>'origin', 'Hiệu Đàn Đức Ngân'),
          COALESCE(c->>'dimensions', ''),
          COALESCE(c->>'status', 'available'),
          COALESCE((c->>'featured')::boolean, false),
          COALESCE(c->>'body', c->>'description', ''),
          NOW()
        )
        ON CONFLICT (slug) DO UPDATE SET
          name = EXCLUDED.name,
          price = EXCLUDED.price,
          category_id = EXCLUDED.category_id,
          image_url = EXCLUDED.image_url,
          material = EXCLUDED.material,
          origin = EXCLUDED.origin,
          dimensions = EXCLUDED.dimensions,
          status = EXCLUDED.status,
          featured = EXCLUDED.featured,
          description = EXCLUDED.description,
          updated_at = NOW();
      END IF;

      -- Sync Categories
      IF NEW.table_id = 'categories' AND NEW.deleted_at IS NULL THEN
        raw_img := COALESCE(c->>'image', c->>'image_url', '/images/hero/dan-bau.png');
        INSERT INTO categories (name, slug, hero_subtitle, description, image_url)
        VALUES (
          COALESCE(c->>'name', c->>'title', 'Danh mục mới'),
          NEW.slug,
          COALESCE(c->>'subtitle', ''),
          COALESCE(c->>'description', ''),
          raw_img
        )
        ON CONFLICT (slug) DO UPDATE SET
          name = EXCLUDED.name,
          hero_subtitle = EXCLUDED.hero_subtitle,
          description = EXCLUDED.description,
          image_url = EXCLUDED.image_url;
      END IF;

      -- Sync Articles
      IF NEW.table_id = 'articles' AND NEW.deleted_at IS NULL THEN
        raw_img := COALESCE(c->>'featuredMedia', c->>'thumbnail', '/images/stories/ch1-timber.jpg');
        INSERT INTO articles (title, slug, category, excerpt, content, thumbnail, status, author)
        VALUES (
          COALESCE(c->>'title', 'Bài viết mới'),
          NEW.slug,
          COALESCE(c->>'category', 'Chuyện Nghề Chế Tác'),
          COALESCE(c->>'excerpt', ''),
          COALESCE(c->>'body', c->>'content', ''),
          raw_img,
          COALESCE(NEW.status, 'published'),
          COALESCE(c->>'author', 'Nghệ nhân Đức Ngân')
        )
        ON CONFLICT (slug) DO UPDATE SET
          title = EXCLUDED.title,
          category = EXCLUDED.category,
          excerpt = EXCLUDED.excerpt,
          content = EXCLUDED.content,
          thumbnail = EXCLUDED.thumbnail,
          status = EXCLUDED.status,
          author = EXCLUDED.author;
      END IF;

      RETURN NEW;
    END;
    $$;
  `;

  await sql`DROP TRIGGER IF EXISTS trg_sync_instatic_data_row ON data_rows;`;
  await sql`
    CREATE TRIGGER trg_sync_instatic_data_row
    AFTER INSERT OR UPDATE ON data_rows
    FOR EACH ROW
    EXECUTE FUNCTION public.sync_instatic_data_row_to_table();
  `;

  console.log('Trigger synced successfully!');
  await sql.close();
}

setupTrigger().catch(console.error);
