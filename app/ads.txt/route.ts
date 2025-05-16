// app/ads.txt/route.ts
import { getAdsense } from "@/lib/api";
import { NextResponse } from "next/server";

export async function GET() {
  const adsense = await getAdsense();
  console.log(adsense);
  if (!adsense?.adsense_client?.startsWith("pub-")) {
    return new NextResponse("No AdSense settings found", { status: 404 });
  }

  const adsTxtContent = `google.com, ${adsense.adsense_client}, DIRECT, f08c47fec0942fa0`;

  return new NextResponse(adsTxtContent, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
