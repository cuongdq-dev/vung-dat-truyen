export interface Book {
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
}

export interface Chapter {
  slug?: string;
  meta_description?: string;
  content?: string;
  keywords?: { query?: string; slug?: string }[];
  chapter_number?: number;
  title?: string;
  created_at?: Date;
  updated_at?: Date;
  book?: Book;
}

export type Favicon = {
  src: string;
  theme?: "light" | "dark";
  sizes?: string;
};

export type ThumbnailItem = {
  url?: string;
  data?: string;
  slug?: string;
  filename?: string;
};
export type CategoryItem = {
  id: string;
  name: string;
  slug: string;
  bookCount?: number;
};
export type Site = {
  website: string;
  author: string;
  profile: string;
  desc: string;
  title: string;
  ogImage?: string;
  lightAndDarkMode: boolean;
  bookPerIndex: number;
  bookPerPage: number;
  scheduledBookMargin: number;
  showArchives?: boolean;
  editBook?: {
    url?: URL["href"];
    text?: string;
    appendFilePath?: boolean;
  };
  favicon: Favicon[];
};

export interface ReadingProgress {
  book: Book;
  currentPage: number;
  currentChapter: number;
  lastReadAt: string;
}

export type HomeResponse = {
  categories: CategoryItem[];
  home: {
    top: Book;
    recentBooks: Book[];
    featureBooks: Book[];
    otherBooks: Book[];
  };
};

export type ListBookResponse = {
  data: Book[];
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

export type AdSlotType =
  | "horizontal"
  | "vertical"
  | "square"
  | "detail"
  | "mutiplex";

export type Adsense = {
  adsense_ga?: string;
  adsense_client?: string;
  adsense_slots?: {
    slot_name?: string;
    slot_id?: string;
    slot_type?: AdSlotType;
  }[];
};

export type SiteSetting = {
  categories?: CategoryItem[];
  adsense?: Adsense;
};
