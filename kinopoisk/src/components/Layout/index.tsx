// Layout.tsx
import { Header } from "../header";
import React from "react";
import { Main } from "../main/Main";
import { Footer } from "../footer";
import { Outlet } from "react-router";

export function Layout(): React.ReactElement {
  return (
    <div className="min-h-screen flex flex-col bg-[#0d0d0f] text-white">
      <Header />

      <Main>
        <Outlet />
      </Main>

      <Footer />
    </div>
  );
}