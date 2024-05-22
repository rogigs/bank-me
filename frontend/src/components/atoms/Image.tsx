import ImageNext from "next/image";

export const Image = ({ ...props }: any) => {
  return <ImageNext alt={props.alt} {...props} />;
};
