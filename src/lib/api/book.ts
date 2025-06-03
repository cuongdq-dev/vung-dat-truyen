const API_URL = import.meta.env.SITE_API_URL + "/book";
const AUTH_TOKEN = import.meta.env.SITE_AUTH_TOKEN;

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

export async function getBookById(
  slug: string
): Promise<{ data: BookItem; recommence?: BookItem[] } | undefined> {
  // Simulate API call delay
  try {
    const response = await fetch(`${API_URL}/detail/${slug}`, {
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
    `${API_URL}/detail/${bookSlug}/chapter/${chapterNumber}`,
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

export async function getBooksByCategory(
  slug: string,
  params?: {
    [key: string]: string | string[] | undefined;
  }
): Promise<ListBookResponse | undefined> {
  try {
    const search = getSearch(params);

    const response = await fetch(`${API_URL}/list/category/${slug}${search}`, {
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

export async function getBooks(params?: {
  [key: string]: string | string[] | undefined;
}): Promise<ListBookResponse | undefined> {
  try {
    const search = getSearch(params);
    const response = await fetch(`${API_URL}/list${search.toString()}`, {
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
