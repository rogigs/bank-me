import ImageNext, { ImageProps } from "next/image";

export const Image = ({ ...props }: ImageProps) => {
  return <ImageNext loading="lazy" {...props} />;
};
