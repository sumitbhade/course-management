import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "bg-gray-700" : "";
  };

  return (
    <nav className="bg-gray-800 text-gray-100 shadow-lg">
      <div className="max-w-full px-8">
        {" "}
        {/* Changed from container to max-w-full */}
        <div className="flex items-center justify-between h-20">
          {" "}
          {/* Increased height from h-16 to h-20 */}
          <Link
            to="/"
            className="text-2xl font-bold text-white hover:text-gray-200 transition-colors"
          >
            Course Management
          </Link>
          <div className="flex space-x-6">
            {" "}
            {/* Increased space between links */}
            <Link
              to="/courses"
              className={`px-6 py-3 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors ${isActive(
                "/courses"
              )}`}
            >
              Courses
            </Link>
            <Link
              to="/dashboard"
              className={`px-6 py-3 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors ${isActive(
                "/dashboard"
              )}`}
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
