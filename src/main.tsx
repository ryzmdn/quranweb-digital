import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "@/App.tsx";
import Home from "@/pages/home.tsx";
import Surah from "@/pages/surah.tsx";
import { AudioProvider } from "@/context/AudioProvider.tsx";
import { ModalProvider } from "@/context/ModalProvider.tsx";
import { ThemeProvider } from "@/context/ThemeProvider.tsx";
import "@/globals.css";

createRoot(document.getElementById("root")!).render(
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
