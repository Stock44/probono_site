import React from "react";
import Link from "next/link";

function Root({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full dark:bg-stone-800 flex p-4 gap-8 items-center justify-between text-md">
      <header className="dark:text-stone-200">
        <Link href="/">
          geostats <span className="dark:text-stone-400"> | </span> probono
        </Link>
      </header>
      {children}
    </div>
  );
}

function Navbar({ links }: { links: Array<[string, string]> }) {
  return (
    <nav className="flex items-center dark:text-stone-300 text-sm">
      {links.map(([label, href]) => {
        return (
          <Link href={href} key={href}>
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

function Toolbar({ children }: { children: React.ReactNode }) {
  return (
    <>
      <span className="flex-grow" />
      <menu className="flex gap-4">{children}</menu>
    </>
  );
}

export default {
  Root,
  Navbar,
  Toolbar,
};
