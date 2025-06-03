import type { Link } from "../types";

export const SITE = {
  title: import.meta.env.SITE_TITLE || process.env.SITE_TITLE,
  description: import.meta.env.SITE_DESC || process.env.SITE_DESC,
  author: import.meta.env.SITE_AUTHOR || process.env.SITE_AUTHOR,
  keywords: import.meta.env.SITE_KEYWORDS || process.env.SITE_KEYWORDS,
  profile: import.meta.env.SITE_PROFILE || process.env.SITE_PROFILE,
  url: import.meta.env.SITE_WEBSITE || process.env.SITE_WEBSITE,
  ogImage: "favicon/news_logo_512.png",

  locale: "en-US",
  dir: "ltr",
  charset: "UTF-8",
  basePath: "/",
  postsPerPage: 4,
  favicon: [],
};

export const SOCIAL_LINKS: Link[] = [
  {
    href: "https://github.com",
    text: "GitHub",
    icon: "github",
  },
  {
    href: "httpe://www.t.me",
    text: "Telegram",
    icon: "telegram",
  },
  {
    href: "https://twitter.com",
    text: "Twitter",
    icon: "newTwitter",
  },
  {
    href: "https://www.facebook.com",
    text: "Facebook",
    icon: "facebook",
  },
];
