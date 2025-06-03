import sharp from "sharp";

const imageCache = new Map<
  string,
  { src: string; width: number; height: number }
>();

export async function base64ToWebP(
  base64String: string
): Promise<{ src: string; width: number; height: number } | null> {
  try {
    if (imageCache.has(base64String)) {
      return imageCache.get(base64String) as {
        src: string;
        width: number;
        height: number;
      };
    }

    const buffer = Buffer.from(base64String, "base64");

    const metadata = await sharp(buffer).metadata();

    const webpBuffer = await sharp(buffer).webp({ quality: 80 }).toBuffer();

    const webpBase64 = `data:image/webp;base64,${webpBuffer.toString(
      "base64"
    )}`;

    const processedImage = {
      src: webpBase64,
      width: metadata.width || 800,
      height: metadata.height || 600,
    };
    imageCache.set(base64String, processedImage);

    return processedImage;
  } catch (error) {
    console.error("Lỗi khi chuyển đổi ảnh:", error);
    return null;
  }
}
