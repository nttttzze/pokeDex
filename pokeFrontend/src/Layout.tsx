import { Navbar } from "./components/Navbar";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <>
      <Navbar />
      <div className="main-back"></div>
      <div className="main-content">
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}
