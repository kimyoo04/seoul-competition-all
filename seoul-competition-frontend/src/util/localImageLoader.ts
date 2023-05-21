import { ImageLoaderProps } from "next/image";

const localImageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `${process.env.NEXT_PUBLIC_ENV_API_DOMAIN}/${src}?w=${width}&q=${
    quality || 75
  }`;
};

export default localImageLoader;
