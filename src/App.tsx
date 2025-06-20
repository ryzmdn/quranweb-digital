import { Outlet } from "react-router"
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"

export default function App() {
  return (
    <>
      <Header />
      <div className="w-full max-w-6xl mx-auto py-8">
        <Outlet />
      </div>
      <Footer />
    </>
  )
}