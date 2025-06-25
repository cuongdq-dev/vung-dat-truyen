"use client";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    const img = new Image();
    img.src = src!;
    img.onerror = () => {
      setImgSrc("/placeholder.svg");
    };
  }, [src]);
  return (
    <img
      src={imgSrc}
      width={width}
      height={height}
      alt={alt || "Image"}
      className={className}
    />
  );
};
