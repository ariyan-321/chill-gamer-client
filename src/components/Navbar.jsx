import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { authContext } from '../provider/Provider';

export default function Navbar() {
  const { user, logOut } = useContext(authContext);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  // Apply the theme on load
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Toggle theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div>
      {/* Sticky Navbar */}
      <div className="navbar bg-gradient-to-r from-blue-900 via-purple-800 to-blue-900 text-white shadow-lg fixed top-0 w-full z-50 px-12">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden hover:bg-purple-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 lg:hidden"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-gray-800 text-white rounded-box z-[1] mt-3 w-52 p-2 shadow-lg"
            >
              <li>
                <Link className="hover:text-purple-400" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="hover:text-purple-400" to="/allReviews">
                  All Reviews
                </Link>
              </li>
              <li>
                <Link className="hover:text-purple-400" to="/aboutus">
                  AboutUs
                </Link>
              </li>
              <li>
                <Link className="hover:text-purple-400" to="/contact">
                  Contact
                </Link>
              </li>
              <li>
                <Link className="hover:text-purple-400" to="/support">
                  Support
                </Link>
              </li>
              {user && (
                <li>
                  <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="cursor-pointer">
                      My Profile
                    </label>
                    <ul
                      tabIndex={0}
                      className="menu menu-sm dropdown-content bg-gray-800 text-white rounded-box z-[1] mt-3 w-52 p-2 shadow-lg"
                    >
                      <li>
                        <Link className="hover:text-purple-400" to="/addReviews">
                          Add Review
                        </Link>
                      </li>
                      <li>
                        <Link className="hover:text-purple-400" to="/myReviews">
                          My Reviews
                        </Link>
                      </li>
                      <li>
                        <Link className="hover:text-purple-400" to="/gameWatchlist">
                          Game Watchlist
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              )}
            </ul>
          </div>
          <div className="cursor-pointer flex items-center">
            <Link className="logo flex flex-wrap justify-center items-center gap-3" to="/">
              <img
                className="w-[50px] rounded-full border-2 border-purple-500 shadow-md hidden md:block"
                src="/images/logo.png"
                alt="Logo"
              />
              <span className="text-2xl font-bold text-purple-400 tracking-wider">
                Chill Gamer
              </span>
            </Link>
          </div>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-6 font-semibold">
            <li>
              <Link className="hover:text-purple-400" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="hover:text-purple-400" to="/allReviews">
                All Reviews
              </Link>
            </li>
            <li>
              <Link className="hover:text-purple-400" to="/aboutus">
                AboutUs
              </Link>
            </li>
            <li>
              <Link className="hover:text-purple-400" to="/contact">
                Contact
              </Link>
            </li>

            {user && (
              <li>
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="cursor-pointer">
                    My Profile
                  </label>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-gradient-to-r from-blue-900 via-purple-800 to-gray-400 text-white rounded-box z-[1] mt-32 w-52 p-2 shadow-lg"
                  >
                    <li>
                      <Link className="hover:text-purple-400" to="/addReviews">
                        Add Review
                      </Link>
                    </li>
                    <li>
                      <Link className="hover:text-purple-400" to="/myReviews">
                        My Reviews
                      </Link>
                    </li>
                    <li>
                      <Link className="hover:text-purple-400" to="/gameWatchlist">
                        Game Watchlist
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
            )}
          </ul>
        </div>

        <div className="navbar-end flex items-center gap-4">
          {/* Theme Toggle */}
          <label className="swap swap-rotate">
            <input
              type="checkbox"
              checked={theme === 'dark'}
              onChange={toggleTheme}
            />
            {/* Sun Icon */}
            <svg
              className="swap-off h-10 w-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* Moon Icon */}
            <svg
              className="swap-on h-10 w-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>

          {user && user.email ? (
            <div className="flex items-center gap-4">
              <Link to="/" className="cursor-pointer" onClick={logOut}>
                Logout
              </Link>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-12 rounded-full border-2 border-purple-400 shadow-lg">
                    <img alt="User Avatar" src={user.photoURL} />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-gray-800 text-white rounded-box z-[1] mt-3 w-52 p-2 shadow-lg"
                >
                  <li className="font-semibold text-lg">Hello, {user.displayName}</li>
                  <li>
                    <Link className="hover:text-purple-400" to="/dashboard">
                      Dashboard
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <>
            <Link
              to="/login"
              className="btn bg-gradient-to-r from-purple-800 to-purple-600 text-white"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="btn bg-gradient-to-r from-purple-800 to-purple-600 text-white"
            >
              Register
            </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
