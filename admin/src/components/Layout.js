import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  const location = useLocation();

  const hideLayout = location.pathname === "/login";
  return (
    <>
      {!hideLayout && <Navbar />}
      <main className="min-h-[80vh]">
        <Outlet />
      </main>
      {!hideLayout && <Footer />}
    </>
  );
};

export default Layout;
