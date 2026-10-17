import InstrumentHero from "@/components/home/InstrumentHero";
import Categories from "@/components/home/Categories/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts/FeaturedProducts";
import BrandStory from "@/components/home/BrandStory/BrandStory";
import NewsSection from "@/components/home/NewsSection/NewsSection";
import TrustSection from "@/components/home/TrustSection/TrustSection";
import Showroom from "@/components/home/Showroom/Showroom";
import Footer from "@/components/layout/Footer/Footer";
import {
  getLiveCategories,
  getLiveProducts,
  getLiveArticles,
  getLiveCommitments,
  getLiveSiteSettings,
  getLiveAbout,
} from "@/lib/cmsData";

export const revalidate = 0;

export default async function Home() {
  const [categories, products, articles, commitments, siteSettings, about] =
    await Promise.all([
      getLiveCategories(),
      getLiveProducts(),
      getLiveArticles(),
      getLiveCommitments(),
      getLiveSiteSettings(),
      getLiveAbout(),
    ]);

  return (
    <div className="min-h-screen bg-[#F5F0E7] text-[#2B241F]">
      <main>
        {/* 02. Signature Interactive Hero: "Chạm Vào Âm Sắc" */}
        <InstrumentHero />

        {/* 03. Minimal Category Directory List (Warm Ivory #FFFCF5) */}
        <Categories categories={categories} />

        {/* 04. Flagship Artisan Product Showcase (Rich Walnut Wood #3A2920) */}
        <FeaturedProducts products={products} />

        {/* 05. Brand Story & Craftsmanship (Warm Ivory #FFFCF5) */}
        <BrandStory about={about} />

        {/* 06. News & Craftsmanship Knowledge (Warm Ivory #FFFCF5) */}
        <NewsSection articles={articles} />

        {/* 07. Customer Commitments & Reassurance (Warm Ivory #FFFCF5) */}
        <TrustSection commitments={commitments} />

        {/* 08. Showroom & Google Maps — Final In-Person Conversion Endpoint (Rich Walnut Wood #3A2920) */}
        <Showroom settings={siteSettings} />
      </main>

      {/* 09. Global Footer (Deep Walnut #241711) */}
      <Footer />
    </div>
  );
}