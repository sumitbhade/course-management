import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "bg-gray-700" : "";
  };

  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 px-4">
          {/* Logo/Title */}
          <Link
            to="/"
            className="text-lg md:text-xl font-bold tracking-wider hover:text-gray-300 transition-colors"
          >
            Course Management
          </Link>

          {/* Navigation Links - Always visible, adjusted for mobile */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              to="/courses"
              className={`px-2 sm:px-3 py-2 rounded-md text-sm font-medium transition-colors
                hover:bg-gray-700 hover:text-white whitespace-nowrap
                ${isActive("/courses")}`}
            >
              Courses
            </Link>
            <Link
              to="/dashboard"
              className={`px-2 sm:px-3 py-2 rounded-md text-sm font-medium transition-colors
                hover:bg-gray-700 hover:text-white whitespace-nowrap
                ${isActive("/dashboard")}`}
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
