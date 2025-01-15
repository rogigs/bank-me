import { ComponentProps } from "react";
import { Image } from "../atoms/Image";

type Logo = Partial<ComponentProps<typeof Image>>;

export const Logo = ({ ...props }: Logo) => (
  <Image {...props} src="/images/logo-bankme.png" alt="Logo da Bankme" />
);
