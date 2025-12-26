import { Route, Routes } from "react-router";
import Home from "./pages/home";
import Surah from "./pages/surah";
import { MainLayout } from "./layouts/MainLayout";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/surat/:id" element={<Surah />} />
      </Route>
    </Routes>
  );
}

App.displayName = "App";
