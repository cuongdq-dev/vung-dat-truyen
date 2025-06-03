export const prerender = false;
import type { APIRoute } from "astro";
import { getBooks, getBooksByCategory } from "~/lib/api/book";

export const GET: APIRoute = async ({ url }) => {
  const params = Object.fromEntries(url?.searchParams?.entries());
  const response = params.category
    ? await getBooksByCategory(params.category, params)
    : await getBooks(params);

  if (response)
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  else
    return new Response(
      JSON.stringify({ message: "Missing required fields" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
};
