"use client";

import { AdsenseUnit } from "@/components/ads/ad-unit";
import { useSetting } from "@/context/SettingContext";
import { useEffect, useState } from "react";

export const RandomAdsense = ({ index = 0 }: { index?: number }) => {
  const { adsense = { adsense_slots: [] } } = useSetting();
  const [loading, setLoading] = useState(true);
  const slot =
    index > 0
      ? adsense?.adsense_slots?.[index] ?? null
      : adsense?.adsense_slots?.find((slot) => slot.slot_type == "horizontal");

  useEffect(() => {
    if (adsense) setLoading(false);
    else setLoading(true);
  }, [adsense]);

  if (!adsense?.adsense_client || !slot) return <></>;
  if (loading) return <></>;
  return <AdsenseUnit {...adsense} slot={slot!} />;
};
