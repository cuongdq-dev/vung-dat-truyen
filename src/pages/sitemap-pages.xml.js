import { SITE } from "../lib/config";

export async function GET() {
  const pages = [
    { loc: `${SITE.url}/`, priority: "1.0", changefreq: "daily" },
    // TODO UPDATE
    // { loc: `${SITE.url}/bai-viet`, priority: "0.9", changefreq: "daily" },
  ];

  const sitemapContent = pages
    .map(
      (page) => `
    <url>
        <loc>${page.loc}</loc>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
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
