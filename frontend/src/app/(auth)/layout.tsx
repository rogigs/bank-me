import { Sidebar } from "@/components/organisms/Sidebar";

const DashboardLayout = ({
  children, // will be a page or nested layout
}: any) => {
  return (
    <section className="flex flex-wrap h-screen">
      <div className="w-1/3 lg:w-[20rem]">
        <Sidebar />
      </div>
      <div className="w-2/3 lg:flex-grow lg:pl-4 bg-slate-700">{children}</div>
    </section>
  );
};

export default DashboardLayout;
