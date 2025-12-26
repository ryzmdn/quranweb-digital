import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "@/App";
import Home from "@/pages/home";
import Surah from "@/pages/surah";
import { AudioProvider, ModalProvider, ThemeProvider } from "@/context";
import "@/styles/globals.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found");
}

createRoot(root).render(
  <StrictMode>
    <ThemeProvider>
      <ModalProvider>
        <AudioProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />}>
                <Route index element={<Home />} />
                <Route path="/surat/:id" element={<Surah />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AudioProvider>
      </ModalProvider>
    </ThemeProvider>
  </StrictMode>
);
