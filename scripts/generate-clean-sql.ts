import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { CATEGORIES } from '../src/data/categories';
import { PRODUCTS } from '../src/data/products';
import { ARTICLES } from '../src/data/news';

function escapeSql(str: string | null | undefined): string {
  if (str === null || str === undefined) return 'NULL';
  return `'${str.replace(/'/g, "''")}'`;
}

let sql = `-- ========================================================
-- BỘ CƠ SỞ DỮ LIỆU TINH GỌN (6 BẢNG) CHO SUPABASE
-- HIỆU ĐÀN ĐỨC NGÂN
-- ========================================================

-- Xóa các bảng cũ nếu đã tồn tại để làm sạch
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS articles CASCADE;
DROP TABLE IF EXISTS commitments CASCADE;
DROP TABLE IF EXISTS about CASCADE;
DROP TABLE IF EXISTS site_settings CASCADE;

-- 1. BẢNG DANH MỤC (CATEGORIES)
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  hero_subtitle VARCHAR(255),
  description TEXT,
  image_url TEXT,
  hero_order INTEGER DEFAULT 0
);

-- 2. BẢNG SẢN PHẨM (PRODUCTS)
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  price NUMERIC DEFAULT 0,
  image_url TEXT,
  material TEXT,
  origin VARCHAR(255) DEFAULT 'Hiệu Đàn Đức Ngân',
  dimensions VARCHAR(255),
  status VARCHAR(50) DEFAULT 'available',
  featured BOOLEAN DEFAULT false,
  description TEXT,
  code VARCHAR(50),
  craftsman VARCHAR(255) DEFAULT 'Nghệ nhân Đức Ngân',
  wood_process VARCHAR(255) DEFAULT 'Gỗ hong khô tự nhiên 5-10 năm',
  audio_url TEXT DEFAULT '',
  gallery_urls JSONB DEFAULT '[]'::jsonb,
  year_crafted INTEGER DEFAULT 2025,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. BẢNG BÀI VIẾT & KÝ SỰ (ARTICLES)
CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  category VARCHAR(100) DEFAULT 'Chuyện Nghề Chế Tác',
  excerpt TEXT,
  content TEXT,
  thumbnail TEXT,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(50) DEFAULT 'published',
  author VARCHAR(255) DEFAULT 'Nghệ nhân Đức Ngân'
);

-- 4. BẢNG GIỚI THIỆU XƯỞNG (ABOUT)
CREATE TABLE about (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  subtitle VARCHAR(255),
  content TEXT,
  image_url TEXT
);

-- 5. BẢNG CAM KẾT (COMMITMENTS)
CREATE TABLE commitments (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  short_label VARCHAR(100),
  description TEXT,
  image_url TEXT,
  icon VARCHAR(100),
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true
);

-- 6. BẢNG THÔNG TIN CỬA HÀNG (SITE_SETTINGS)
CREATE TABLE site_settings (
  id SERIAL PRIMARY KEY,
  hotline VARCHAR(50) DEFAULT '0903 990 020',
  address VARCHAR(255) DEFAULT '526 Điện Biên Phủ, Phường 11, Quận 10, TP. Hồ Chí Minh',
  working_hours VARCHAR(255) DEFAULT '08:00 - 20:30 (Tất cả các ngày trong tuần)',
  google_maps_url TEXT,
  google_maps_embed TEXT,
  email VARCHAR(100) DEFAULT 'sales@hieudanducngan.com',
  website_url VARCHAR(255) DEFAULT 'https://hieudanducngan.com'
);

-- ========================================================
-- CHÈN DỮ LIỆU BAN ĐẦU
-- ========================================================

`;

// Insert Categories
sql += `-- Chèn danh mục\nINSERT INTO categories (name, slug, hero_subtitle, description, image_url, hero_order) VALUES\n`;
const catRows = CATEGORIES.map((c, i) => {
  return `(${escapeSql(c.name)}, ${escapeSql(c.slug)}, ${escapeSql(c.subtitle)}, ${escapeSql(c.description)}, ${escapeSql(c.image)}, ${i + 1})`;
});
sql += catRows.join(',\n') + ';\n\n';

// Insert Products
sql += `-- Chèn sản phẩm\n`;
for (let i = 0; i < PRODUCTS.length; i++) {
  const p = PRODUCTS[i];
  const catSlug = p.categoryId;
  const gallery = JSON.stringify(p.images || [p.thumbnail]);
  const code = `DN-P${String(i + 1).padStart(2, '0')}`;
  const material = p.materials?.join(', ') || '';
  const price = p.price || 0;
  
  sql += `INSERT INTO products (name, slug, category_id, price, image_url, material, description, code, gallery_urls, featured, status)
VALUES (
  ${escapeSql(p.name)},
  ${escapeSql(p.slug)},
  (SELECT id FROM categories WHERE slug = ${escapeSql(catSlug)} LIMIT 1),
  ${price},
  ${escapeSql(p.thumbnail)},
  ${escapeSql(material)},
  ${escapeSql(p.description)},
  ${escapeSql(code)},
  ${escapeSql(gallery)}::jsonb,
  ${p.isFeatured ? 'true' : 'false'},
  'available'
);\n`;
}

// Insert Articles
sql += `\n-- Chèn bài viết\n`;
for (const a of ARTICLES) {
  const blocksText = a.blocks ? a.blocks.map(b => 'text' in b ? b.text : '').join('\n\n') : a.summary;
  sql += `INSERT INTO articles (title, slug, category, excerpt, content, thumbnail, status, author)
VALUES (
  ${escapeSql(a.title)},
  ${escapeSql(a.slug)},
  ${escapeSql(a.category)},
  ${escapeSql(a.summary)},
  ${escapeSql(blocksText)},
  ${escapeSql(a.image)},
  'published',
  'Nghệ nhân Đức Ngân'
);\n`;
}

// Insert About
sql += `\n-- Chèn thông tin giới thiệu\n`;
sql += `INSERT INTO about (title, subtitle, content, image_url) VALUES (
  'THƯƠNG HIỆU CỦA NHẠC CỤ DÂN TỘC',
  'HIỆU ĐÀN ĐỨC NGÂN',
  'Hiệu đàn Đức Ngân chuyên cung cấp và chế tác các loại nhạc cụ dân tộc truyền thống như Đàn Bầu, Đàn Tranh, Đàn Kìm (Nguyệt), Đàn Sến, Đàn Cò, Đàn Gáo, Đàn Tam Thập Lục, Đàn Guitar, Đàn Mandoline... được sử dụng tại các buổi nhạc hội dân tộc và không gian văn hóa nghệ thuật truyền thống.',
  '/images/aboutUs/image.png'
);\n`;

// Insert Commitments
sql += `\n-- Chèn 5 cam kết\n`;
sql += `INSERT INTO commitments (title, short_label, description, image_url, icon, sort_order) VALUES
('Trải nghiệm & thử đàn trực tiếp', 'Thử đàn trực tiếp', 'Đón tiếp quý khách lắng nghe âm sắc và cảm nhận phím cần trực tiếp tại không gian showroom 526 Điện Biên Phủ, Quận 10.', '/images/trust/trust-01-experience.jpg', 'Music2', 1),
('Tuyển chọn gỗ quý lâu năm', 'Gỗ quý trăm năm', 'Sử dụng gỗ Cẩm Lai, Mun Hoa, Trắc, Gõ Đỏ tự nhiên qua quy trình sấy ổn định, chống cong vênh và lưu giữ tiếng vang ngàn đời.', '/images/trust/trust-02-wood.jpg', 'Trees', 2),
('Giao hàng & đóng gói chuyên dụng', 'Đóng gói an toàn', 'Đóng thùng gỗ gia cố và bọc chống sốc đa lớp, niêm phong cẩn trọng, bảo hiểm an toàn 100% trên toàn quốc.', '/images/trust/trust-03-delivery.jpg', 'PackageCheck', 3),
('Tư vấn chọn đàn tận tâm', 'Tư vấn tận tâm', 'Đồng hành cùng người mới học và nghệ sĩ chuyên nghiệp chọn đúng chất gỗ, phím cần và độ căng dây phù hợp nhất.', '/images/trust/trust-04-consulting.jpg', 'Headphones', 4),
('Bảo hành âm thanh trọn đời', 'Bảo hành trọn đời', 'Cam kết đồng hành bảo dưỡng phím phím, căn chỉnh âm vực và bảo hành chất lượng mộc đàn trọn đời cho mọi tác phẩm.', '/images/trust/trust-05-warranty.jpg', 'ShieldCheck', 5);
\n`;

// Insert Site Settings
sql += `-- Chèn cấu hình showroom\n`;
sql += `INSERT INTO site_settings (hotline, address, working_hours, google_maps_url, google_maps_embed, email, website_url) VALUES (
  '0903 990 020',
  '526 Điện Biên Phủ, Phường 11, Quận 10, TP. Hồ Chí Minh',
  '08:00 - 20:30 (Tất cả các ngày trong tuần)',
  'https://www.google.com/maps/search/?api=1&query=Hi%E1%BB%87u+%C4%90%C3%A0n+%C4%90%E1%BB%A9c+Ng%C3%A2n+526+%C4%90i%E1%BB%87n+Bi%C3%AAn+Ph%E1%BB%A7',
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d979.8776465468188!2d106.67754796958994!3d10.772151316808397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f20ee3d384d%3A0xffc91ea52bb33dd2!2zSGnhu4d1IMSQw6BuIMSQ4bupYyBOZ8Oibg!5e0!3m2!1svi!2s!4v1787124408332!5m2!1svi!2s',
  'sales@hieudanducngan.com',
  'https://ducnganmusic.vercel.app'
);\n`;

const outPath = resolve(import.meta.dir, '..', 'supabase_duc_ngan_clean.sql');
writeFileSync(outPath, sql, 'utf8');
console.log('Successfully generated clean SQL file at:', outPath);
