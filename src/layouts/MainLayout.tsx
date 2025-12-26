import { Outlet } from "react-router";
import { Header, Footer } from "@/components/common";

export function MainLayout() {
  return (
    <>
      <Header />
      <main className="w-full max-w-6xl mx-auto px-4 sm:p-6">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

MainLayout.displayName = "MainLayout";
