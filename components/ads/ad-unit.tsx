import { Adsense, AdsenseSlot } from "@/lib/types";
import { useEffect } from "react";

export const AdsenseUnit = (adsense: Adsense & { slot: AdsenseSlot }) => {
  useEffect(() => {
    try {
      if (typeof window !== "undefined" && (window.adsbygoogle as any)) {
        (window.adsbygoogle as any).push({});
      }
    } catch (e) {
      console.warn("Adsense error", e);
    }
  }, []);

  const slot_id = adsense.slot.slot_id;
  const ca_pub = adsense.adsense_client;

  if (!adsense?.adsense_client || !adsense?.slot) return <></>;
  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client={`ca-${ca_pub}`}
      data-ad-slot={slot_id}
      data-ad-format="autorelaxed"
      data-full-width-responsive="true"
    ></ins>
  );
};
