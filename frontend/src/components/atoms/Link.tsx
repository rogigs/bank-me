import LinkNext from "next/link";

type Link = {
  href: string;
  label: string;
};

export const Link = ({ href, label }: Link) => (
  <LinkNext href={href}>
    <span
      className={`text-primary-dark hover:underline hover:text-primary hover:font-bold`}
    >
      {label}
    </span>
  </LinkNext>
);
