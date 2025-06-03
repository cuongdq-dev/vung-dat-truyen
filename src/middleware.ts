import { defineMiddleware } from "astro:middleware";
import { getHome } from "./lib/api/home";

const cache = new Map();
const CACHE_DURATION = { home: 60 * 1000, page: 60 * 1000 }; // 60s cache
const STALE_REVALIDATE_THRESHOLD = 20 * 1000; // 10s trước khi hết hạn

async function getCachedData(
  key: string,
  fetchFunction: () => Promise<any>,
  duration: number
) {
  const now = Date.now();
  if (cache.has(key)) {
    const { data, expires, isRefreshing } = cache.get(key);

    // Nếu cache còn hạn -> Trả về ngay lập tức
    if (now < expires) {
      // Nếu cache sắp hết hạn, bắt đầu fetch ngầm
      if (expires - now < STALE_REVALIDATE_THRESHOLD && !isRefreshing) {
        cache.set(key, { data, expires, isRefreshing: true }); // Đánh dấu đang fetch
        fetchFunction()
          .then((newData) => {
            cache.set(key, {
              data: newData,
              expires: now + duration,
              isRefreshing: false,
            });
          })
          .catch(() => cache.set(key, { data, expires, isRefreshing: false }));
      }
      return data;
    }
  }

  // Fetch dữ liệu nếu cache hết hạn
  const data = await fetchFunction();
  cache.set(key, { data, expires: now + duration, isRefreshing: false });
  return data;
}

export const onRequest = defineMiddleware(async (context, next) => {
  const url = context.url.pathname;

  if (
    url.includes("xml") ||
    url.includes("sitemap") ||
    url.endsWith("robots.txt") ||
    url.endsWith("ads.txt")
  ) {
    return next(); // Không cache, gọi API trực tiếp
  }

  // **1️⃣ Check cache response trước**
  if (url != "/" && cache.has(url)) {
    const { data, expires, isRefreshing } = cache.get(url);
    if (Date.now() < expires) {
      // Fetch ngầm nếu cache sắp hết hạn
      if (expires - Date.now() < STALE_REVALIDATE_THRESHOLD && !isRefreshing) {
        cache.set(url, { data, expires, isRefreshing: true });
        next()
          .then((newResponse) => {
            newResponse
              .clone()
              .text()
              .then((text) => {
                cache.set(url, {
                  data: text,
                  expires: Date.now() + CACHE_DURATION.page,
                  isRefreshing: false,
                });
              });
          })
          .catch(() => cache.set(url, { data, expires, isRefreshing: false }));
      }

      return new Response(data, {
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }
  }

  // **2️⃣ Lấy dữ liệu từ API & cache**
  const cacheKeys = { home: "home" };
  const { adsense, categories, home } = await getCachedData(
    cacheKeys.home,
    getHome,
    CACHE_DURATION.home
  );

  Object.assign(context.locals, { adsense, categories, home });

  // **3️⃣ Gọi tiếp request**
  const response = await next();

  // **4️⃣ Cache toàn bộ response HTML nếu thành công**
  if (response.status === 200) {
    const clonedResponse = response.clone();
    const text = await clonedResponse.text();
    cache.set(url, {
      data: text,
      expires: Date.now() + CACHE_DURATION.page,
      isRefreshing: false,
    });
  }

  return response;
});
