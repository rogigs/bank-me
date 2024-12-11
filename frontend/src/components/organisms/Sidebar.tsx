import { Children } from "@/types/children";
import { useLayoutEffect, useMemo, useState } from "react";
import {
  ArrowUturnLeftIcon,
  BanknotesIcon,
  Bars3Icon,
  UsersIcon,
  XMarkIcon,
} from "../atoms/Icons";
import { Logo } from "../molecules/Logo";

export const Sidebar = ({ children }: Children) => {
  const [isOpen, setIsOpen] = useState(false);

  useLayoutEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 1024);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const lines = useMemo(
    () => [
      {
        title: "Cedentes",
        icon: <UsersIcon />,
        link: "/assignor",
      },
      {
        title: "Pagáveis",
        icon: <BanknotesIcon />,
        link: "/payable",
      },

      {
        title: "Log Out",
        icon: <ArrowUturnLeftIcon />,
        link: "/logout",
      },
    ],
    []
  );

  return (
    <div className="relative min-h-screen">
      <button
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
        className="fixed top-4 left-4 z-50 h-8 w-8 p-2 bg-gray-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        {isOpen ? <XMarkIcon /> : <Bars3Icon />}
      </button>

      <aside
        className={`fixed top-0 left-0 z-40 min-h-screen h-screen transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0 w-full md:w-64" : "-translate-x-full w-64"
        } bg-gray-100 text-gray-800 shadow-lg`}
      >
        <nav className="h-full flex flex-col">
          <div className="py-16 px-4 w-fit">
            <Logo />
          </div>
          <ul className="space-y-4">
            {lines.map((item) => (
              <li key={item.title} className="hover:bg-gray-200 ">
                <a
                  href="#"
                  className="flex px-4  items-center space-x-3 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors duration-200"
                  aria-label={item.title}
                >
                  <span className="h-6 w-6">{item.icon}</span>
                  <span className="text-lg">{item.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main
        className={`p-4 ${
          isOpen ? "md:ml-64" : ""
        } transition-margin duration-300 ease-in-out`}
      >
        <div className="pt-8 md:p-8 mt-4 md:ml-4">{children}</div>
      </main>
    </div>
  );
};
