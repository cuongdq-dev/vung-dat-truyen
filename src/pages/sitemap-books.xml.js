import { getSitemapBooks } from "../lib/api/xml";
import { SITE } from "../lib/config";

export async function GET() {
  const domain = new URL(SITE.url).hostname;

  const { perpage, total } = await getSitemapBooks(domain);
  if (!total) return new Response("No books found", { status: 404 });

  const totalSitemaps = Math.ceil(total / perpage);

  const sitemaps = Array.from(
    { length: totalSitemaps },
    (_, i) => `
    <sitemap>
      <loc>${SITE.url}/sitemap-books-${i + 1}.xml</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </sitemap>
  `
  ).join("\n");

  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemaps}
  </sitemapindex>`;

  return new Response(sitemapIndex, {
    headers: { "Content-Type": "application/xml" },
  });
}
