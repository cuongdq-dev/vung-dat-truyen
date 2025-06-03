declare global {
  namespace App {
    interface Locals {
      categories: CategoryItem[];
      adsense: AdsenseResponse;
      home: {
        top: BookItem;
        recentBooks: BookItem[];
        featureBooks: BookItem[];
        otherBooks: BookItem[];
      };
    }
  }

  const socialIcons: Record<string, unknown>;

  type TagItem = {
    query?: string;
    slug?: string;
    count?: number;
  };

  type Site = {
    website: string;
    author: string;
    profile: string;
    desc: string;
    title: string;
    ogImage?: string;
    lightAndDarkMode: boolean;
    bookPerIndex: number;
    bookPerPage: number;
    scheduledPostMargin: number;
    showArchives?: boolean;
    editPost?: {
      url?: URL["href"];
      text?: string;
      appendFilePath?: boolean;
    };
    favicon: Favicon[];
  };

  type Favicon = {
    src: string;
    theme?: "light" | "dark";
    sizes?: string;
  };

  type SocialObjects = {
    name: keyof typeof socialIcons;
    href: string;
    active: boolean;
    linkTitle: string;
  }[];

  type ThumbnailItem = {
    url?: string;
    data?: string;
    slug?: string;
  };
  type CategoryItem = {
    id: string;
    name: string;
    slug: string;
    bookCount?: number;
  };

  type Chapter = {
    slug?: string;
    meta_description?: string;
    content?: string;
    keywords?: { query?: string; slug?: string }[];
    chapter_number?: number;
    title?: string;
    created_at?: Date;
    updated_at?: Date;
    book?: BookItem;
  };

  type BookItem = {
    id: string;
    title?: string;
    chapters?: Chapter[];
    //real data
    meta_description?: string;
    description?: string;
    author?: { name?: string; slug?: string };
    created_at?: string;
    slug?: string;
    status?: string;
    thumbnail?: ThumbnailItem;
    categories?: CategoryItem[];
    is_full?: boolean;
    is_hot?: boolean;
    is_new?: boolean;
    total_chapter?: number;
  };
  type HomeResponse = {
    adsense: AdsenseResponse;
    categories: CategoryItem[];
    home: {
      top: BookItem;
      recentBooks: BookItem[];
      featureBooks: BookItem[];
      otherBooks: BookItem[];
    };
  };

  type AdsenseResponse = {
    adsense_ga?: string;
    adsense_client?: string;
    adsense_slots?: {
      slot_name: string;
      slot_id: string;
      slot_type: "horizontal" | "vertical" | "square" | "detail" | "multiplex";
    }[];
  };

  type ListBookResponse = {
    data: BookItem[];
    meta: {
      itemsPerPage: number;
      totalItems: number;
      currentPage: number;
      totalPages: number;
    };
    links: {
      first?: string;
      previous?: string;
      current: string;
      next?: string;
      last?: string;
    };
  };

  type ListResponse = {
    category?: CategoryItem;
    tag?: { query?: string; slug?: string };
    data: BookItem[];
    meta: {
      itemsPerPage: number;
      totalItems: number;
      currentPage: number;
      totalPages: number;
    };
    links: {
      first?: string;
      previous?: string;
      current: string;
      next?: string;
      last?: string;
    };
  };
}

export {};
