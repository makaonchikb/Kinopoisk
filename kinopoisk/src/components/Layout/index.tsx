import { Header } from "../header";
import React, { useEffect } from "react";
import { Main } from "../main/Main";
import { Footer } from "../footer";
import { Outlet } from "react-router";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchAboutUser } from "../../redux/auth-slice";

export function Layout(): React.ReactElement {
  const dispatch = useAppDispatch();
  const jwt = useAppSelector((state) => state.auth.jwt);

  useEffect(() => {
    if (jwt) {
      dispatch(fetchAboutUser());
    }
  }, [jwt, dispatch]);

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
