"use client";
import { useState } from "react";

export const ImageCustom = ({
  src,
  alt,
  className,
  width = 160,
  height = 240,
}: {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
}) => {
  const [imgSrc, setImgSrc] = useState(src || "/placeholder.svg");

  return (
    <img
      width={width}
      height={height}
      src={imgSrc!}
      alt={alt!}
      className={className}
      onError={() => setImgSrc("/placeholder.svg")}
    />
  );
};
