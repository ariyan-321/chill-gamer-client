import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { authContext } from '../provider/Provider';

export default function Navbar() {
  const { user, logOut } = useContext(authContext);

  return (
    <div>
      <div className="navbar bg-gradient-to-r from-blue-900 via-purple-800 to-blue text-white shadow-lg">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden hover:bg-purple-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
          <div className="cursor-pointer flex   items-center">
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

        <div className="navbar-end">
          {user && user.email ? (
            <div className="flex items-center gap-4">
              <Link to={"/"}
                      className="btn "
                      onClick={logOut}
                    >
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
                  <li className="font-semibold text-center text-lg">
                    {user.displayName}
                  </li>
                  <li>
                    <Link className="hover:text-purple-400" to="/">
                      Home page
                    </Link>
                  </li>
                  
                  <li>
                    <Link to={"/"}
                      className="hover:text-red-400 w-full text-left"
                      onClick={logOut}
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex gap-4 items-center">
              <Link
                to="/login"
                className="btn btn-outline btn-purple hover:bg-purple-600 hover:text-white"
              >
                Login
              </Link>
              <span className="text-sm">or</span>
              <Link
                to="/register"
                className="btn btn-primary bg-purple-600 hover:bg-purple-800"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
