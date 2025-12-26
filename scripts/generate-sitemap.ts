/**
 * Sitemap Generator untuk Al-Qur'an Digital
 * Jalankan: npx ts-node scripts/generate-sitemap.ts
 */

import fs from "fs";
import path from "path";

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority: number;
}

const SURAHS = 114; // Total surah dalam Al-Qur'an
const BASE_URL = "https://quranweb-digital.vercel.app";

function generateSitemap(): void {
  const urls: SitemapUrl[] = [];
  const today = new Date().toISOString().split("T")[0];

  // Halaman utama
  urls.push({
    loc: `${BASE_URL}/`,
    lastmod: today,
    changefreq: "daily",
    priority: 1.0,
  });

  // Halaman untuk setiap surah
  for (let i = 1; i <= SURAHS; i++) {
    urls.push({
      loc: `${BASE_URL}/surah/${i}`,
      lastmod: today,
      changefreq: "monthly",
      priority: 0.8,
    });
  }

  // Halaman about/info
  urls.push({
    loc: `${BASE_URL}/about`,
    lastmod: today,
    changefreq: "yearly",
    priority: 0.5,
  });

  // Generate XML
  const xml = generateSitemapXml(urls);

  // Simpan ke file
  const outputPath = path.join(__dirname, "../public/sitemap.xml");
  fs.writeFileSync(outputPath, xml);

  console.log(`✅ Sitemap generated: ${outputPath}`);
  console.log(`📊 Total URLs: ${urls.length}`);
}

function generateSitemapXml(urls: SitemapUrl[]): string {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml +=
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0">\n';

  for (const url of urls) {
    xml += "  <url>\n";
    xml += `    <loc>${escapeXml(url.loc)}</loc>\n`;
    xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
    xml += `    <priority>${url.priority}</priority>\n`;
    xml += "  </url>\n";
  }

  xml += "</urlset>";

  return xml;
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// Run generator
generateSitemap();
