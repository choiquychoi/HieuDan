import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/layout/Footer/Footer";
import ProductDossierView from "@/components/products/ProductDossierView";
import { INSTRUMENTS } from "@/data/instruments";
import { getLiveProductBySlug, getLiveProducts } from "@/lib/cmsData";

export const revalidate = 0;

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const products = await getLiveProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getLiveProductBySlug(slug);

  if (!product) {
    return {
      title: "Sản phẩm không tìm thấy",
    };
  }

  const title = `${product.name} | Hiệu Đàn Đức Ngân`;
  const description = `${product.summary} — Tuyệt phẩm nhạc cụ truyền thống chế tác thủ công từ gỗ quý lâu năm tại xưởng Đức Ngân 526 Điện Biên Phủ, Quận 10, TP.HCM.`;
  const imageUrl = product.thumbnail.startsWith("http")
    ? product.thumbnail
    : `https://hieudanducngan.com${product.thumbnail}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/products/${product.slug}`,
    },
    openGraph: {
      type: "website",
      locale: "vi_VN",
      url: `https://hieudanducngan.com/products/${product.slug}`,
      siteName: "Hiệu Đàn Đức Ngân",
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getLiveProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const allProducts = await getLiveProducts();

  // Find matching instrument by category or slug
  const instrument =
    INSTRUMENTS.find((inst) => inst.categorySlug === product.categoryId || inst.slug === product.slug) ||
    null;

  // Find related products in the same category (or other featured items if alone)
  const relatedProducts = allProducts.filter(
    (p) => p.id !== product.id && p.categoryId === product.categoryId
  ).slice(0, 4);

  // If less than 4 related items in same category, pad with other products
  if (relatedProducts.length < 4) {
    const additional = allProducts.filter(
      (p) => p.id !== product.id && !relatedProducts.some((r) => r.id === p.id)
    ).slice(0, 4 - relatedProducts.length);
    relatedProducts.push(...additional);
  }

  // JSON-LD Product & Breadcrumb Schema
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: [product.thumbnail.startsWith("http") ? product.thumbnail : `https://hieudanducngan.com${product.thumbnail}`],
    description: product.summary,
    sku: product.id,
    mpn: product.id,
    brand: {
      "@type": "Brand",
      name: "Hiệu Đàn Đức Ngân",
    },
    category: product.categoryName,
    offers: {
      "@type": "Offer",
      url: `https://hieudanducngan.com/products/${product.slug}`,
      priceCurrency: "VND",
      price: product.price ?? 0,
      priceValidUntil: "2027-12-31",
      itemCondition: "https://schema.org/NewCondition",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "Hiệu Đàn Đức Ngân",
      },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Trang chủ",
        item: "https://hieudanducngan.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Nhạc cụ",
        item: "https://hieudanducngan.com/products",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.categoryName,
        item: `https://hieudanducngan.com/products?category=${product.categoryId}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: product.name,
        item: `https://hieudanducngan.com/products/${product.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1F1610]">
      {/* Product JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* 01. Interactive Product Dossier */}
      <ProductDossierView
        key={product.id}
        product={product}
        instrument={instrument}
        relatedProducts={relatedProducts}
      />

      {/* 02. Global Footer */}
      <Footer />
    </div>
  );
}
