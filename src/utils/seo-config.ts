export interface MetaTagsOptions {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article" | "book";
}

export const SEO_CONFIG = {
  site: {
    name: "Al-Qur'an Digital",
    description:
      "Baca Al-Qur'an digital lengkap dengan terjemahan Indonesia, tafsir, dan audio reciter berkualitas",
    url: "https://quranweb-digital.vercel.app",
    image: "https://quranweb-digital.vercel.app/logo.png",
    author: "Al-Qur'an Digital",
    keywords: [
      "Al-Qur'an digital",
      "baca Quran online",
      "tafsir Al-Qur'an",
      "audio Quran",
      "terjemahan Quran Indonesia",
      "Quran interaktif",
      "aplikasi Quran",
      "hafal Quran",
    ],
  },

  pages: {
    home: {
      title:
        "Al-Qur'an Digital - Baca & Dengarkan Quran Online Lengkap dengan Tafsir Indonesia",
      description:
        "Aplikasi Al-Qur'an digital interaktif dengan 114 surah, terjemahan Indonesia, tafsir lengkap, dan audio dari berbagai reciter profesional. Baca Quran kapan saja di perangkat Anda.",
      keywords: ["home", "beranda"],
    },
  },
};

export function updateMetaTags(options: MetaTagsOptions): void {
  const {
    title,
    description,
    keywords,
    image,
    url,
    type = "website",
  } = options;

  if (title) {
    document.title = title;
    updateOrCreateMetaTag("og:title", title);
    updateOrCreateMetaTag("twitter:title", title);
  }

  if (description) {
    updateOrCreateMetaTag("description", description);
    updateOrCreateMetaTag("og:description", description);
    updateOrCreateMetaTag("twitter:description", description);
  }

  if (keywords && keywords.length > 0) {
    updateOrCreateMetaTag("keywords", keywords.join(", "));
  }

  if (image) {
    updateOrCreateMetaTag("og:image", image);
    updateOrCreateMetaTag("twitter:image", image);
  }

  if (url) {
    updateOrCreateMetaTag("og:url", url);
    updateOrCanonical("canonical", url);
  }

  if (type) {
    updateOrCreateMetaTag("og:type", type);
  }
}

function updateOrCreateMetaTag(name: string, content: string): void {
  let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;

  if (!meta) {
    meta = document.querySelector(
      `meta[property="${name}"]`
    ) as HTMLMetaElement;
  }

  if (!meta) {
    meta = document.createElement("meta");
    const isProperty = name.startsWith("og:") || name.startsWith("twitter:");

    if (isProperty) {
      meta.setAttribute("property", name);
    } else {
      meta.setAttribute("name", name);
    }

    document.head.appendChild(meta);
  }

  meta.content = content;
}

function updateOrCanonical(rel: string, href: string): void {
  let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;

  if (!link) {
    link = document.createElement("link");
    link.rel = rel;
    document.head.appendChild(link);
  }

  link.href = href;
}

export function createSurahMetaTags(
  surahNumber: number,
  surahName: string,
  surahNameLatin: string,
  surahDescription: string,
  ayatCount: number
): MetaTagsOptions {
  const title = `Surat ${surahNameLatin} (${surahName}) - Al-Qur'an Digital | ${ayatCount} Ayat`;
  const description = `Baca Surat ${surahNameLatin} dengan ${ayatCount} ayat. ${surahDescription} Lengkap dengan terjemahan Indonesia dan tafsir.`;
  const url = `https://quranweb-digital.vercel.app/surah/${surahNumber}`;

  return {
    title,
    description,
    keywords: [
      `Surat ${surahNameLatin}`,
      surahName,
      "Qur'an",
      "tafsir",
      "terjemahan",
      `ayat ${ayatCount}`,
    ],
    image: SEO_CONFIG.site.image,
    url,
    type: "article",
  };
}

export function resetMetaTags(): void {
  updateMetaTags({
    title: `${SEO_CONFIG.site.name} - ${SEO_CONFIG.pages.home.title}`,
    description: SEO_CONFIG.pages.home.description,
    keywords: SEO_CONFIG.site.keywords,
    image: SEO_CONFIG.site.image,
    url: SEO_CONFIG.site.url,
  });
}

export function generateSurahStructuredData(
  surahNumber: number,
  _surahName: string,
  surahNameLatin: string,
  surahDescription: string,
  ayatCount: number,
  tempatTurun: "Mekah" | "Madinah"
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `Surat ${surahNameLatin}`,
    description: surahDescription,
    image: SEO_CONFIG.site.image,
    author: {
      "@type": "Organization",
      name: SEO_CONFIG.site.name,
      url: SEO_CONFIG.site.url,
    },
    publisher: {
      "@type": "Organization",
      name: SEO_CONFIG.site.name,
      logo: {
        "@type": "ImageObject",
        url: SEO_CONFIG.site.image,
      },
    },
    datePublished: new Date().toISOString(),
    mainEntity: {
      "@type": "CreativeWork",
      name: `Surat ${surahNameLatin}`,
      author: "Allah",
      dateCreated: "610-632",
      description: `Surat ke-${surahNumber} dalam Al-Qur'an dengan ${ayatCount} ayat. Diturunkan di ${tempatTurun}.`,
    },
  };
}

export function useSEOMeta(options: MetaTagsOptions) {
  return updateMetaTags(options);
}
