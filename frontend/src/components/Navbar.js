import {
  Link,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem("token");
  const isEventListPage = location.pathname === "/events";
  const isHomePage = location.pathname === "/home";

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

  useEffect(() => {
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery });
    } else {
      setSearchParams({});
    }
  }, [searchQuery, setSearchParams]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleScroll = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      {isAuthenticated && (
        <nav className="bg-gray-800 text-white py-4 px-12 flex items-center justify-between">
          {/* Left section */}
          <Link
            to="/home"
            className="text-2xl font-bold px-3 hover:text-blue-500 transition-colors duration-300 ease-in-out"
          >
            E P S
          </Link>

          {/* Middle section - Search bar bar for events page only */}
          {isEventListPage && (
            <div className="flex items-center bg-gray-700 rounded-md px-4 py-1.5">
              <FaSearch className="text-gray-400" />
              <input
                type="text"
                className="bg-transparent outline-none ml-2 text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for events"
              />
            </div>
          )}

          {/* Right section */}
          <div className="flex items-center gap-5">
            {isHomePage && (
              <>
                <button
                  onClick={() => handleScroll("services-section")}
                  className="text-lg px-3 hover:text-blue-500 transition-colors duration-300 ease-in-out"
                >
                  Services
                </button>
                <button
                  onClick={() => handleScroll("testimonials-section")}
                  className="text-lg px-3 hover:text-blue-500 transition-colors duration-300 ease-in-out"
                >
                  Testimonials
                </button>
              </>
            )}
            <Link
              to="/events"
              className={`text-lg px-3 transition-colors duration-300 ${
                isEventListPage ? "text-blue-500" : "hover:text-blue-500"
              }`}
            >
              Events
            </Link>
            <button
              onClick={handleLogout}
              className="text-lg  bg-red-500 px-3 py-1 rounded hover:bg-red-700 transition-colors duration-300 ease-in-out"
            >
              Logout
            </button>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
