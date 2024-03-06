import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

const Nav = () => {
  return (
    <header className="bg-opacity-20 backdrop-blur-lg shadow mb-2">
      <div className="relative flex max-w-screen-xl flex-col overflow-hidden px-4 py-4 md:mx-auto md:flex-row md:items-center">
        <a
          href="#"
          className="flex items-center whitespace-nowrap text-2xl font-medium"
        >
          <span className="mr-2 text-4xl text-blue-600">{/* logo */}</span>
          <span className="text-slate-950">
            doGossip{" "}
            <sup>
              <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">
                Beta
              </span>
            </sup>
          </span>
        </a>

        {/* Toggle Mobile Navbar */}
        <input type="checkbox" className="peer hidden" id="navbar-open" />
        <label
          className="block peer-checked:hidden absolute top-5 right-7 cursor-pointer md:hidden"
          htmlFor="navbar-open"
        >
          <span className="sr-only">Toggle Navigation</span>
          <FontAwesomeIcon icon={faBars} />
        </label>
        <label
          className="hidden peer-checked:block absolute top-5 right-7 cursor-pointer md:hidden"
          htmlFor="navbar-open"
        >
          <span className="sr-only">Toggle Navigation</span>
          <FontAwesomeIcon icon={faClose} />
        </label>

        {/* Nav List Wrapper */}
        <nav
          aria-label="Header Navigation"
          className="peer-checked:mt-8 peer-checked:max-h-56 flex max-h-0 w-full flex-col items-center justify-between overflow-hidden transition-all md:ml-24 md:max-h-full md:flex-row md:items-start"
        >
          <ul className="w-max justify-between flex flex-col items-center space-y-2 md:ml-auto md:flex-row md:space-y-0">
            <ListItem children="Github" icon={faGithub} />
            <ListItem children="LinkedIn" icon={faLinkedinIn} />
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Nav;

const ListItem = ({ children, NavLink, icon }) => {
  return (
    <>
      <li className="cursor-pointer">
        <a
          href={NavLink}
          className="flex justify-center items-center h-8 py-2 text-base font-medium text-body-color hover:text-dark dark:text-dark-6 dark:hover:text-white lg:ml-12 lg:inline-flex"
        >
          <FontAwesomeIcon className="mr-2" icon={icon} />
          <span>{children}</span>
        </a>
      </li>
    </>
  );
};
