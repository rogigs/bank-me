type HeaderPage = {
  title: string;
};

export const HeaderPage = ({ title }: HeaderPage) => {
  return (
    <header className="mb-8">
      <h1 className="text-2xl font-bold">{title}</h1>
    </header>
  );
};
