import pool from './db'
import { ARTICLES, Article } from '@/data/news'
import { CATEGORIES } from '@/data/categories'
import { PRODUCTS } from '@/data/products'
import { Category, Product } from '@/types'

/**
 * Ensures an image src passed to Next.js <Image /> is valid.
 * Must start with '/' or 'http://' or 'https://'. If it's an ID or invalid string,
 * falls back gracefully.
 */
function safeImageUrl(url: string | null | undefined, fallback: string): string {
  if (!url || typeof url !== 'string') return fallback
  const trimmed = url.trim()
  if (!trimmed) return fallback
  if (trimmed.startsWith('/') || trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed
  }
  return fallback
}

// 1. Articles (Tin tức & Ký sự)
export async function getLiveArticles(): Promise<Article[]> {
  try {
    const res = await pool.query('SELECT * FROM articles WHERE status = $1 ORDER BY id DESC', ['published'])
    if (res.rows.length > 0) {
      return res.rows.map((row) => {
        const staticArt = ARTICLES.find((a) => a.slug === row.slug)
        return {
          id: String(row.id),
          title: row.title,
          slug: row.slug,
          excerpt: row.excerpt || staticArt?.excerpt || '',
          summary: row.excerpt || staticArt?.summary || '',
          blocks: row.content
            ? [{ type: 'paragraph' as const, text: row.content }]
            : (staticArt?.blocks || [{ type: 'paragraph' as const, text: row.excerpt || '' }]),
          image: safeImageUrl(row.thumbnail, staticArt?.image || '/images/stories/ch1-timber.jpg'),
          coverImage: safeImageUrl(row.thumbnail, staticArt?.coverImage || '/images/stories/ch1-timber.jpg'),
          date: row.published_at ? new Date(row.published_at).toISOString().split('T')[0] : (staticArt?.date || '2026-10-01'),
          category: staticArt?.category || 'Chuyện Nghề Chế Tác',
          readTime: staticArt?.readTime || '5 phút đọc',
        }
      })
    }
  } catch (err) {
    console.error('[cmsData] Error fetching articles from database, falling back to static:', err)
  }
  return ARTICLES
}

export async function getLiveArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const res = await pool.query('SELECT * FROM articles WHERE slug = $1 LIMIT 1', [slug])
    if (res.rows.length > 0) {
      const row = res.rows[0]
      const staticArt = ARTICLES.find((a) => a.slug === row.slug)
      return {
        id: String(row.id),
        title: row.title,
        slug: row.slug,
        excerpt: row.excerpt || staticArt?.excerpt || '',
        summary: row.excerpt || staticArt?.summary || '',
        blocks: row.content
          ? [{ type: 'paragraph' as const, text: row.content }]
          : (staticArt?.blocks || [{ type: 'paragraph' as const, text: row.excerpt || '' }]),
        image: safeImageUrl(row.thumbnail, staticArt?.image || '/images/stories/ch1-timber.jpg'),
        coverImage: safeImageUrl(row.thumbnail, staticArt?.coverImage || '/images/stories/ch1-timber.jpg'),
        date: row.published_at ? new Date(row.published_at).toISOString().split('T')[0] : (staticArt?.date || '2026-10-01'),
        category: staticArt?.category || 'Chuyện Nghề Chế Tác',
        readTime: staticArt?.readTime || '5 phút đọc',
      }
    }
  } catch (err) {
    console.error('[cmsData] Error fetching article by slug, fallback to static:', err)
  }
  return ARTICLES.find((a) => a.slug === slug) || null
}

// 2. Categories (Danh mục nhạc cụ)
export async function getLiveCategories(): Promise<Category[]> {
  try {
    const res = await pool.query('SELECT * FROM categories ORDER BY COALESCE(hero_order, id) ASC')
    if (res.rows.length > 0) {
      return res.rows.map((r) => {
        const staticCat = CATEGORIES.find((c) => c.slug === r.slug)
        const fallbackImg = `/images/hero/${r.slug}.png`
        return {
          id: String(r.id),
          name: r.name,
          slug: r.slug,
          subtitle: r.hero_subtitle || staticCat?.subtitle || '',
          description: r.description || staticCat?.description || '',
          image: safeImageUrl(r.image_url, fallbackImg),
        }
      })
    }
  } catch (err) {
    console.error('[cmsData] Error fetching categories from database, fallback to static:', err)
  }
  return CATEGORIES
}

function defaultProductImage(slug: string = ''): string {
  const s = slug.toLowerCase()
  if (s.includes('bau')) return '/uploads/VDfGJEhDsas3LOhqTQCl8-dan-bau.png'
  if (s.includes('kim') || s.includes('nguyet')) return '/uploads/uhAzmSUehLvY_VsigkTQ4-dan-kim.png'
  if (s.includes('sen')) return '/uploads/4nl52C7dJFAAyFDC_SBg3-dan-sen.png'
  if (s.includes('ty-ba')) return '/uploads/yZp3e4xjOaAwdCMGFyufP-dan-ty-ba.png'
  if (s.includes('violin') || s.includes('violon')) return '/uploads/rkI8hkJEM8x_abaB52Spp-dan-violin.png'
  return '/uploads/GIPeclBWZITR3aCD1p6Ni-dan-tranh.png'
}

// 3. Products (Kho nhạc cụ)
export async function getLiveProducts(): Promise<Product[]> {
  try {
    const res = await pool.query(`
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      ORDER BY p.id DESC
    `)
    if (res.rows.length > 0) {
      return res.rows.map((r) => {
        const staticProd = PRODUCTS.find((p) => p.slug === r.slug)
        const img = safeImageUrl(r.image_url, staticProd?.thumbnail || defaultProductImage(r.slug))
        const rawDesc = r.description || staticProd?.description || ''
        const cleanSummary = staticProd?.summary || rawDesc.replace(/<[^>]+>/g, '').trim().slice(0, 160)
        const galleryImages = staticProd?.images?.length ? staticProd.images : [img]

        return {
          id: String(r.id),
          name: r.name,
          slug: r.slug,
          categoryId: r.category_slug || String(r.category_id),
          categoryName: r.category_name || staticProd?.categoryName || 'Nhạc cụ',
          price: r.price && Number(r.price) > 0 ? Number(r.price) : null,
          thumbnail: img,
          images: galleryImages,
          summary: cleanSummary,
          description: rawDesc,
          materials: r.material ? r.material.split(',').map((m: string) => m.trim()) : (staticProd?.materials || []),
          isFeatured: r.featured ?? staticProd?.isFeatured ?? false,
          inStock: r.status === 'available',
        }
      })
    }
  } catch (err) {
    console.error('[cmsData] Error fetching products from database:', err)
  }
  return PRODUCTS
}

export async function getLiveProductBySlug(slug: string): Promise<Product | null> {
  try {
    const res = await pool.query(`
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.slug = $1
      LIMIT 1
    `, [slug])
    if (res.rows.length > 0) {
      const r = res.rows[0]
      const staticProd = PRODUCTS.find((p) => p.slug === r.slug)
      const img = safeImageUrl(r.image_url, staticProd?.thumbnail || defaultProductImage(r.slug))
      const rawDesc = r.description || staticProd?.description || ''
      const cleanSummary = staticProd?.summary || rawDesc.replace(/<[^>]+>/g, '').trim().slice(0, 160)
      const galleryImages = staticProd?.images?.length ? staticProd.images : [img]

      return {
        id: String(r.id),
        name: r.name,
        slug: r.slug,
        categoryId: r.category_slug || String(r.category_id),
        categoryName: r.category_name || staticProd?.categoryName || 'Nhạc cụ',
        price: r.price && Number(r.price) > 0 ? Number(r.price) : null,
        thumbnail: img,
        images: galleryImages,
        summary: cleanSummary,
        description: rawDesc,
        materials: r.material ? r.material.split(',').map((m: string) => m.trim()) : (staticProd?.materials || []),
        isFeatured: r.featured ?? staticProd?.isFeatured ?? false,
        inStock: r.status === 'available',
      }
    }
  } catch (err) {
    console.error('[cmsData] Error fetching product by slug from database:', err)
  }
  return PRODUCTS.find((p) => p.slug === slug) || null
}

// 4. About (Giới thiệu xưởng)
export async function getLiveAbout() {
  try {
    const res = await pool.query('SELECT * FROM about ORDER BY id LIMIT 1')
    if (res.rows.length > 0) {
      return res.rows[0]
    }
  } catch (err) {
    console.error('[cmsData] Error fetching about from database:', err)
  }
  return null
}

// 5. Commitments (Cam kết)
export async function getLiveCommitments() {
  try {
    const res = await pool.query('SELECT * FROM commitments WHERE is_active = true ORDER BY sort_order ASC, id ASC')
    if (res.rows.length > 0) {
      return res.rows
    }
  } catch (err) {
    console.error('[cmsData] Error fetching commitments from database:', err)
  }
  return []
}

// 6. Site Settings (Thông tin liên hệ & Showroom)
export async function getLiveSiteSettings() {
  try {
    const res = await pool.query('SELECT * FROM site_settings ORDER BY id LIMIT 1')
    if (res.rows.length > 0) {
      return res.rows[0]
    }
  } catch (err) {
    console.error('[cmsData] Error fetching site settings from database:', err)
  }
  return null
}
