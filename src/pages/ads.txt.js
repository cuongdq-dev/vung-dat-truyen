import { getAdsense } from "../lib/api/home";

export async function GET() {
  const adsense = await getAdsense();
  if (!adsense?.adsense_client?.startsWith("pub-")) {
    return new Response("No AdSense settings found", { status: 404 });
  }

  const adsTxtContent = `google.com, ${adsense.adsense_client}, DIRECT, f08c47fec0942fa0`;

  return new Response(adsTxtContent, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
