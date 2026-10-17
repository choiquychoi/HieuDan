export interface Category {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  description: string;
  image: string;
  productCount?: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  categoryName: string;
  price: number | null;
  originalPrice?: number | null;
  thumbnail: string;
  images: string[];
  summary: string;
  description?: string;
  materials?: string[];
  isFeatured?: boolean;
  inStock?: boolean;
  badge?: "Mới" | "Nghệ nhân" | "Tiêu biểu" | "Bán chạy";
}

export interface InstrumentAudio {
  src: string;
  title: string;
  duration?: string;
}

export interface InstrumentHeroPresentation {
  cutoutScale?: number;
  offsetY?: string;
  offsetX?: string;
  shadowBottom: string;
  shadowX?: string;
  shadowWidth: string;
  shadowHeight?: string;
  shadowRotation?: string;
}

export interface Instrument {
  id: string;
  slug: string;
  name: string;
  alternateName?: string;
  shortDescription: string;
  soundDescription?: string;
  origin?: string;
  strings?: string;
  material?: string;
  characteristic?: string;
  image: string;
  audio?: InstrumentAudio | null;
  heroPresentation?: InstrumentHeroPresentation;
  categorySlug?: string;
  productSlug?: string | null;
}

export interface NavItem {
  name: string;
  href: string;
  children?: {
    name: string;
    slug: string;
    href: string;
    subtitle?: string;
  }[];
}

export interface ShowroomInfo {
  brandName: string;
  tagline: string;
  hotline: string;
  address: string;
  email: string;
  workingHours: string;
}
