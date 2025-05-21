import type {
  Adsense,
  Book,
  Chapter,
  HomeResponse,
  ListBookResponse,
  ReadingProgress,
  SiteSetting,
} from "./types";

// Simulated API calls with mock data
// In a real app, these would fetch from an actual API endpoint

const API_URL = process.env.SITE_API_URL!;
const AUTH_TOKEN = process.env.SITE_AUTH_TOKEN!;

export async function getAdsense(): Promise<Adsense | undefined> {
  try {
    const response = await fetch(`${API_URL}/book/adsense`, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
        "Content-Type": "application/json",
      },
      cache: "no-store", // Đảm bảo SSR
    });
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("getHome error:", error);
    return undefined;
  }
}
export async function getSiteSetting(): Promise<SiteSetting | undefined> {
  try {
    const response = await fetch(`${API_URL}/book/site-setting`, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
        "Content-Type": "application/json",
      },
      cache: "no-store", // Đảm bảo SSR
    });
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("getHome error:", error);
    return undefined;
  }
}

export async function getHome(): Promise<HomeResponse | undefined> {
  try {
    const response = await fetch(`${API_URL}/book`, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
        "Content-Type": "application/json",
      },
      cache: "no-store", // Đảm bảo SSR
    });
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("getHome error:", error);
    return undefined;
  }
}

const getSearch = (params?: {
  [key: string]: string | string[] | undefined;
}) => {
  if (!params) return "";
  else {
    const search = new URLSearchParams();

    for (const key in params) {
      const value = params[key];
      if (typeof value === "string") {
        search.set(key, value);
      } else if (Array.isArray(value)) {
        value.forEach((v) => search.append(key, v));
      }
    }

    return `?${search.toString()}`;
  }
};
export async function getBooks(params?: {
  [key: string]: string | string[] | undefined;
}): Promise<ListBookResponse | undefined> {
  try {
    const search = getSearch(params);
    const response = await fetch(`${API_URL}/book/list${search.toString()}`, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
        "Content-Type": "application/json",
      },
      cache: "no-store", // Đảm bảo SSR
    });
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("getHome error:", error);
    return undefined;
  }
}

export async function getBooksByCategory(
  slug: string,
  params?: {
    [key: string]: string | string[] | undefined;
  }
): Promise<ListBookResponse | undefined> {
  try {
    const search = getSearch(params);

    const response = await fetch(
      `${API_URL}/book/list/category/${slug}${search}`,
      {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
          "Content-Type": "application/json",
        },
        cache: "no-store", // Đảm bảo SSR
      }
    );
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("getHome error:", error);
    return undefined;
  }
}

export async function getBookById(
  slug: string
): Promise<{ data: Book; recommence?: Book[] } | undefined> {
  // Simulate API call delay
  try {
    const response = await fetch(`${API_URL}/book/detail/${slug}`, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
        "Content-Type": "application/json",
      },
      cache: "no-store", // Đảm bảo SSR
    });
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("getHome error:", error);
    return undefined;
  }
}

export async function getChapterContent(
  bookSlug: string,
  chapterNumber: number
): Promise<Chapter> {
  const response = await fetch(
    `${API_URL}/book/detail/${bookSlug}/chapter/${chapterNumber}`,
    {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );
  if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
  return await response.json();
}

export async function getContinueReading(): Promise<ReadingProgress> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 600));

  const books = await getBooks();

  return {
    book: {} as any,
    currentPage: 45,
    currentChapter: 2,
    lastReadAt: new Date().toISOString(),
  };
}
