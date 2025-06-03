import { SITE } from "../lib/config";

export async function GET() {
  const lastmod = new Date().toISOString().split("T")[0]; // Lấy ngày hiện tại

  const sitemaps = [
    { loc: `${SITE.url}/sitemap-pages.xml`, lastmod },
    { loc: `${SITE.url}/sitemap-books.xml`, lastmod },
    { loc: `${SITE.url}/sitemap-categories.xml`, lastmod },
  ];

  const sitemapContent = sitemaps
    .map(
      (sitemap) => `
    <sitemap>
        <loc>${sitemap.loc}</loc>
        <lastmod>${sitemap.lastmod}</lastmod>
    </sitemap>`
    )
    .join("\n");

  const finalSitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapContent}\n</sitemapindex>`;

  return new Response(finalSitemap, {
    headers: { "Content-Type": "application/xml" },
  });
}
