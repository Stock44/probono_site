import React from "react";
import TopBar from "@/components/TopBar";
import PersonWidget from "@/components/PersonWidget";

export default async function Home() {
  return (
    <>
      <TopBar.Root>
        <TopBar.Navbar links={[["Organizaciones", "/organizations"]]} />
        <TopBar.Toolbar>
          <PersonWidget />
        </TopBar.Toolbar>
      </TopBar.Root>
      <div className="w-full min-h-screen flex gap-2 items-center justify-center"></div>
    </>
  );
}
