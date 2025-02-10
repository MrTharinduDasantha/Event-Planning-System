import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navLinks = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/add-event", label: "Add Event" },
    { path: "/events", label: "Events" },
    { path: "/bookings", label: "Bookings" },
    { path: "/users", label: "Users" },
  ];

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <div className="flex gap-6">
        {navLinks.map(({ path, label }) => (
          <Link
            key={path}
            to={path}
            className={`${
              location.pathname === path ? "text-blue-300" : "text-white"
            } hover:text-blue-300 transition-colors duration-300 ease-in-out`}
          >
            {label}
          </Link>
        ))}
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-500 px-3 py-1 rounded hover:bg-red-700 transition-colors duration-300 ease-in-out"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
