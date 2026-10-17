import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/layout/Footer/Footer";
import ArticleDetailView from "@/components/news/ArticleDetailView";
import { Article } from "@/data/news";
import { getLiveArticleBySlug, getLiveArticles } from "@/lib/cmsData";

export const revalidate = 0;

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = await getLiveArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getLiveArticleBySlug(slug);

  if (!article) {
    return {
      title: "Không tìm thấy bài viết | Hiệu Đàn Đức Ngân",
    };
  }

  const title = `${article.title} | Hiệu Đàn Đức Ngân`;
  const description = article.summary || article.excerpt || "";
  const rawImage = article.coverImage || article.image;
  const imageUrl = rawImage.startsWith("http")
    ? rawImage
    : `https://hieudanducngan.com${rawImage}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/news/${article.slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      locale: "vi_VN",
      url: `https://hieudanducngan.com/news/${article.slug}`,
      siteName: "Hiệu Đàn Đức Ngân",
      publishedTime: article.date,
      authors: ["Hiệu Đàn Đức Ngân"],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
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

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const articles = await getLiveArticles();
  const currentIndex = articles.findIndex((a) => a.slug === slug);

  if (currentIndex === -1) {
    notFound();
  }

  const article: Article = articles[currentIndex];

  // Minimal previous and next articles
  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;

  // 3 compact related articles (excluding current)
  const relatedArticles = articles.filter((a) => a.id !== article.id).slice(0, 3);

  // JSON-LD NewsArticle & Breadcrumb Schema
  const rawImage = article.coverImage || article.image;
  const imageUrl = rawImage.startsWith("http")
    ? rawImage
    : `https://hieudanducngan.com${rawImage}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.summary,
    image: [imageUrl],
    datePublished: article.date,
    dateModified: article.date,
    author: {
      "@type": "Organization",
      name: "Hiệu Đàn Đức Ngân",
      url: "https://hieudanducngan.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Hiệu Đàn Đức Ngân",
      logo: {
        "@type": "ImageObject",
        url: "https://hieudanducngan.com/images/hero/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://hieudanducngan.com/news/${article.slug}`,
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
        name: "Giai Thoại & Ký Sự",
        item: "https://hieudanducngan.com/news",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `https://hieudanducngan.com/news/${article.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1F1610]">
      {/* Article & Breadcrumb JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* 01. Interactive Editorial Article View */}
      <ArticleDetailView
        article={article}
        prevArticle={prevArticle}
        nextArticle={nextArticle}
        relatedArticles={relatedArticles}
      />

      {/* 02. Global Footer */}
      <Footer />
    </div>
  );
}
