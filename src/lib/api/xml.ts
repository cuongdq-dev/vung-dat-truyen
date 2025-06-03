const API_URL = import.meta.env.SITE_API_URL + "/book";
const AUTH_TOKEN = import.meta.env.SITE_AUTH_TOKEN;

export async function getSitemapCategories(
  domain: string
): Promise<CategoryItem[]> {
  try {
    const response = await fetch(
      `${API_URL}/sitemap-categories?domain=${domain}`,
      {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    return (await response.json()) as CategoryItem[];
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getSitemapBooks(
  domain: string
): Promise<{ total: number; perpage: number }> {
  try {
    const response = await fetch(
      `${API_URL}/sitemap-total-books?domain=${domain}`,
      {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    return (await response.json()) as { total: number; perpage: number };
  } catch (error) {
    console.log(error);
    return { total: 0, perpage: 50 };
  }
}

export async function getSitemapBooksByPage(
  domain: string,
  page: number
): Promise<BookItem[]> {
  try {
    const response = await fetch(
      `${API_URL}/sitemap-books?page=${page}&domain=${domain}`,
      {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    return (await response.json()) as BookItem[];
  } catch (error) {
    return [];
  }
}

export async function getRss(): Promise<BookItem[]> {
  try {
    const response = await fetch(`${API_URL + "/rss"}`, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    return (await response.json()) as BookItem[];
  } catch (error) {
    console.log(error);
    return [] as BookItem[];
  }
}
