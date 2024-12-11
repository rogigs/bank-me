import LinkNext, { LinkProps } from "next/link";

type Link = LinkProps & {
  label: string;
};

export const Link = ({ label, ...props }: Link) => (
  <LinkNext {...props}>
    <span
      className={`text-primary-dark hover:underline hover:text-primary hover:font-bold`}
    >
      {label}
    </span>
  </LinkNext>
);
