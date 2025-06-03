import { getSitemapCategories } from "../lib/api/xml";
import { SITE } from "../lib/config";

export async function GET() {
  const domain = new URL(SITE.url).hostname;
  const categories = await getSitemapCategories(domain);

  if (!categories || categories.length === 0) {
    return new Response("No categories found", { status: 404 });
  }

  const sitemapContent = categories
    .map(
      (category) => `
    <url>
        <loc>${SITE.url}/danh-muc/${category.slug}</loc>
        <lastmod>${new Date(category.created_at).toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    `
    )
    .join("\n");

  const finalSitemap = `<?xml version="1.0" encoding="UTF-8"?>\n
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n
  ${sitemapContent}
  </urlset>`;

  return new Response(finalSitemap, {
    headers: { "Content-Type": "application/xml" },
  });
}
