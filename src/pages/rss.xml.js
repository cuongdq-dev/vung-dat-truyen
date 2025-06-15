import rss from "@astrojs/rss";
import { SITE } from "../lib/config";
import { getRss } from "../lib/api/xml";

export async function GET(context) {
  const articles = await getRss();
  console.log(
    articles.map((article) => ({
      title: article?.title,
      pubDate: article?.created_at,
      description: article?.meta_description,
      link: `/${article?.slug}/`,
    }))
  );
  return rss({
    title: SITE?.title,
    description: SITE?.description,
    site: context?.site,
    items: articles.map((article) => ({
      title: article?.title,
      pubDate: article?.created_at,
      description: article?.description,
      link: `/${article?.slug}/`,
    })),
  });
}
