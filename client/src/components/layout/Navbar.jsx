import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-green-500 to-emerald-700 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-xl">
          College Events
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/" className="text-white hover:text-gray-200">
            Home
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/add-event" className="text-white hover:text-gray-200">
                Add Event
              </Link>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
              <span className="text-white">
                Welcome, {user?.name || 'User'}
              </span>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-white text-green-600 hover:bg-gray-100 px-4 py-2 rounded"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-green-600 mt-2 p-4">
          <Link
            to="/"
            className="block text-white hover:text-gray-200 py-2"
            onClick={toggleMenu}
          >
            Home
          </Link>
          {isAuthenticated ? (
            <>
              <Link
                to="/add-event"
                className="block text-white hover:text-gray-200 py-2"
                onClick={toggleMenu}
              >
                Add Event
              </Link>
              <button
                onClick={() => {
                  logout();
                  toggleMenu();
                }}
                className="block w-full text-left text-white hover:text-gray-200 py-2"
              >
                Logout
              </button>
              <span className="block text-white py-2">
                Welcome, {user?.name || 'User'}
              </span>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block text-white hover:text-gray-200 py-2"
                onClick={toggleMenu}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block text-white hover:text-gray-200 py-2"
                onClick={toggleMenu}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar; 