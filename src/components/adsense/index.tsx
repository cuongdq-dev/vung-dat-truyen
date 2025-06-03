import { useEffect } from "react";

interface AdsenseProps {
  pub?: string;
  slot_adsense?: { id?: string; name?: string };
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export const AdsenseMultiplex: React.FC<AdsenseProps> = ({
  pub,
  slot_adsense,
}) => {
  useEffect(() => {
    if (typeof window !== "undefined" && window.adsbygoogle) {
      window.adsbygoogle.push({});
    }
  }, []);

  if (!pub || !slot_adsense?.id) return null;

  return (
    <div className={`ad-container-${slot_adsense.name}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={`ca-${pub}`}
        data-ad-slot={slot_adsense.id}
        data-ad-format="autorelaxed"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export const AdsenseSquare: React.FC<AdsenseProps> = ({
  pub,
  slot_adsense,
}) => {
  useEffect(() => {
    if (typeof window !== "undefined" && window.adsbygoogle) {
      window.adsbygoogle.push({});
    }
  }, []);

  if (!pub || !slot_adsense?.id) return null;

  return (
    <div className={`ad-container-${slot_adsense.name}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={`ca-${pub}`}
        data-ad-slot={slot_adsense.id}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export const AdsenseHorizontal: React.FC<AdsenseProps> = ({
  pub,
  slot_adsense,
}) => {
  useEffect(() => {
    if (typeof window !== "undefined" && window.adsbygoogle) {
      window.adsbygoogle.push({});
    }
  }, []);

  if (!pub || !slot_adsense?.id) return null;

  return (
    <div className={`ad-container-${slot_adsense.name}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client={`ca-${pub}`}
        data-ad-slot={slot_adsense.id}
      ></ins>
    </div>
  );
};

export const AdsenseDetail: React.FC<AdsenseProps> = ({
  pub,
  slot_adsense,
}) => {
  useEffect(() => {
    if (typeof window !== "undefined" && window.adsbygoogle) {
      window.adsbygoogle.push({});
    }
  }, []);

  if (!pub || !slot_adsense?.id) return null;

  return (
    <div className={`ad-container-${slot_adsense.name}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client={`ca-${pub}`}
        data-ad-slot={slot_adsense.id}
      ></ins>
    </div>
  );
};
