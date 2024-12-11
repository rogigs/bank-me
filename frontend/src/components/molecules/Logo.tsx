import { ComponentProps } from "react";
import LogoStatic from "../../assets/logo-bankme.png";
import { Image } from "../atoms/Image";

type Logo = Partial<ComponentProps<typeof Image>>;

export const Logo = ({ ...props }: Logo) => {
  return (
    <Image
      className="rounded-lg w-full h-auto"
      {...props}
      src={LogoStatic}
      alt="Logo da Bankme"
    />
  );
};
