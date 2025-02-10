import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EventList from "./components/EventList";
import EventDetails from "./pages/EventDetails";

const App = () => {
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem("token");

  const hideNavbar =
    !isAuthenticated ||
    location.pathname === "/login" ||
    location.pathname === "/register";
  const hideFooter =
    !isAuthenticated ||
    location.pathname === "/login" ||
    location.pathname === "/register";
  return (
    <>
      <Toaster position="bottom-right" />
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/events/:id" element={<EventDetails />} />
      </Routes>
      {!hideFooter && <Footer />}
    </>
  );
};

export default App;
