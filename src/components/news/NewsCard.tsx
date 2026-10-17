import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import { Article } from "@/data/news";

interface NewsCardProps {
  article: Article;
}

export default function NewsCard({ article }: NewsCardProps) {
  return (
    <Link
      href={`/news/${article.slug}`}
      className="group flex flex-col transition-colors"
    >
      {/* 1. Landscape Thumbnail Image Frame with Catalogue Double-Border */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[2px] border border-[#D8CDBD]/80 bg-[#F5F0E7] p-0.5">
        <div className="relative h-full w-full overflow-hidden rounded-[1px]">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
          />

          {/* Small, Restrained Inset Category Badge */}
          <span className="absolute left-2.5 top-2.5 rounded-[2px] border border-[#D8CDBD]/80 bg-[#FFFCF5]/95 px-2.5 py-0.5 font-sans text-xs font-semibold uppercase tracking-wider text-[#8C6B3E] shadow-xs backdrop-blur-xs">
            {article.category}
          </span>
        </div>
      </div>

      {/* 2. Date & Read Time Metadata */}
      <div className="mt-3.5 flex items-center gap-2 text-xs sm:text-[13px] text-[#7D746A]">
        <span>{article.date}</span>
        <span>•</span>
        <div className="flex items-center gap-1">
          <Clock size={12} className="text-[#8C6B3E]" />
          <span>{article.readTime}</span>
        </div>
      </div>

      {/* 3. Article Title */}
      <h3 className="mt-2.5 font-display text-base sm:text-lg lg:text-xl font-bold leading-snug text-[#2B241F] transition-colors duration-200 group-hover:text-[#8C6B3E] line-clamp-2">
        {article.title}
      </h3>
    </Link>
  );
}
