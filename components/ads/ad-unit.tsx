"use client";
import { useSetting } from "@/context/SettingContext";
import { useEffect } from "react";

export const AdsenseUnit = () => {
  const { adsense } = useSetting();

  function getRandomItem<T>(arr: T[]): T | undefined {
    if (!arr.length) return undefined;
    return arr[Math.floor(Math.random() * arr.length)];
  }
  const adsenseSlot = getRandomItem(adsense?.adsense_slots!);

  useEffect(() => {
    if (typeof window !== "undefined" && window.adsbygoogle) {
      window.adsbygoogle.push({});
    }
  }, []);

  if (!adsense?.adsense_client || !adsenseSlot?.slot_id) return null;

  return (
    <ins
      className={`adsbygoogle ad-container-${adsenseSlot.slot_name}`}
      style={{ display: "block" }}
      data-ad-client={`ca-${adsense.adsense_client}`}
      data-ad-slot={adsenseSlot.slot_id}
      data-ad-format="autorelaxed"
      data-full-width-responsive="true"
    ></ins>
  );
};
