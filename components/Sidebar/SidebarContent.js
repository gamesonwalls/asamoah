import React from "react";
import { useRouter } from "next/router";
import routes from "../../routes/sidebar";
import Link from "next/link";
import SidebarSubmenu from "./SidebarSubmenu";
import { Button } from "@windmill/react-ui";
import * as Icons from "../../icons";

function Icon({ icon, ...props }) {
  const Icon = Icons[icon];
  return <Icon {...props} />;
}

function SidebarContent() {
  const { asPath } = useRouter();
  return (
    <div className="py-4 text-gray-500 dark:text-gray-400 ">
      <Link href="/app">
        <a className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200">
          LOGO HERE
        </a>
      </Link>
      <ul className="mt-6">
        {routes.map((route) =>
          route.routes ? (
            <SidebarSubmenu route={route} key={route.name} />
          ) : (
            <li className="relative px-6 py-3" key={route.name}>
              <Link href={route.path}>
                <a
                  className={`inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 ${
                    asPath == route.path
                      ? "dark:text-gray-100 text-gray-800"
                      : ""
                  }`}
                >
                  {asPath == route.path && (
                    <span
                      className="absolute inset-y-0 right-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                      aria-hidden="true"
                    ></span>
                  )}

                  <Icon
                    className="w-5 h-5"
                    aria-hidden="true"
                    icon={route.icon}
                  />
                  <span className="ml-4">{route.name}</span>
                </a>
              </Link>
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export default SidebarContent;
