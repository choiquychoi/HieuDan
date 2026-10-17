import React from "react";

export default function JsonLd() {
  const storeSchema = {
    "@context": "https://schema.org",
    "@type": ["MusicStore", "Store", "LocalBusiness"],
    "@id": "https://hieudanducngan.com/#organization",
    name: "Hiệu Đàn Đức Ngân",
    alternateName: "Nhạc Cụ Đức Ngân",
    url: "https://hieudanducngan.com",
    logo: "https://hieudanducngan.com/images/hero/logo.png",
    image: "https://hieudanducngan.com/images/trust/trust-01-experience.jpg",
    description:
      "Cơ sở chế tác và phân phối nhạc cụ dân tộc truyền thống Việt Nam uy tín từ 1999: Đàn Tranh, Đàn Bầu, Đàn Nguyệt/Kìm, Đàn Tỳ Bà, Đàn Sến, Đàn Violin tại TP. Hồ Chí Minh.",
    telephone: "+84903931723",
    email: "contact@hieudanducngan.com",
    priceRange: "$$ - $$$",
    currenciesAccepted: "VND",
    paymentAccepted: "Cash, Credit Card, Bank Transfer, VietQR",
    address: {
      "@type": "PostalAddress",
      streetAddress: "526 Điện Biên Phủ, Phường 11",
      addressLocality: "Quận 10",
      addressRegion: "Thành phố Hồ Chí Minh",
      postalCode: "700000",
      addressCountry: "VN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 10.7728,
      longitude: 106.6792,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "08:30",
        closes: "20:30",
      },
    ],
    sameAs: [
      "https://www.facebook.com/hieudanducngan",
      "https://www.youtube.com/@hieudanducngan",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Danh Mục Nhạc Cụ Truyền Thống Việt Nam",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Đàn Bầu",
        },
        {
          "@type": "OfferCatalog",
          name: "Đàn Tranh",
        },
        {
          "@type": "OfferCatalog",
          name: "Đàn Kìm",
        },
        {
          "@type": "OfferCatalog",
          name: "Đàn Tỳ Bà",
        },
        {
          "@type": "OfferCatalog",
          name: "Đàn Sến",
        },
        {
          "@type": "OfferCatalog",
          name: "Đàn Violin",
        },
      ],
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://hieudanducngan.com/#website",
    url: "https://hieudanducngan.com",
    name: "Hiệu Đàn Đức Ngân",
    description: "Nhạc cụ dân tộc truyền thống Việt Nam chế tác thủ công độc bản.",
    inLanguage: "vi-VN",
    publisher: {
      "@id": "https://hieudanducngan.com/#organization",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://hieudanducngan.com/products?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(storeSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
