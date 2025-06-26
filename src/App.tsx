import { Outlet } from "react-router"
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"

export default function App() {
  return (
    <>
      <Header />
      <div className="w-full max-w-6xl mx-auto px-4 sm:p-6">
        <Outlet />
      </div>
      <Footer />
    </>
  )
}