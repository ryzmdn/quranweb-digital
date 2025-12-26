import { Outlet } from "react-router";
import { Header, Footer } from "@/components/common";

/**
 * Root layout component
 */
export default function App() {
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

App.displayName = "App";
