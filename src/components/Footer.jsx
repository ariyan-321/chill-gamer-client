import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="mt-[60vh]">
      <footer className="footer bg-gradient-to-r from-purple-900 via-black to-blue-900 text-white py-12 px-10">
        {/* Brand Section */}
        <aside className="flex flex-col items-start">
          <div className="flex items-center gap-4">
            <img
              className="w-14 h-14 rounded-full border-2 border-purple-500 shadow-lg"
              src="/images/logo.png"
              alt="Chill Gamer Logo"
            />
            <h3 className="text-3xl font-bold tracking-wider text-purple-400 hover:text-purple-300 transition-all">
              Chill Gamer
            </h3>
          </div>
          <p className="mt-5 text-sm leading-6 text-gray-300">
            Your ultimate destination for gaming reviews, watchlists, and community insights. 
            Elevate your gaming adventure with Chill Gamer!
          </p>
          <p className="mt-2 text-xs text-gray-400 opacity-70">© 2024 Chill Gamer. All Rights Reserved.</p>
        </aside>

        {/* Explore Section */}
        <nav>
          <h6 className="footer-title text-purple-300 text-lg font-semibold mb-4">
            Explore
          </h6>
          <Link to={"/"}
            className="link link-hover block text-white hover:text-purple-400 mb-2 transition-all"
          
          >
            Home
          </Link>
          <Link to={"/allReviews"}
            className="link link-hover block text-white hover:text-purple-400 mb-2 transition-all"
            
          >
            Game Reviews
          </Link>
          <Link to={"/gameWatchlist"}
            className="link link-hover block text-white hover:text-purple-400 mb-2 transition-all"
            
          >
            Watchlist
          </Link>
          <Link
            to={"/addReviews"}
            className="link link-hover block text-white hover:text-purple-400 mb-2 transition-all"
          
          >
            Add a Review
          </Link>
        </nav>

        {/* Community Section */}
        <nav>
          <h6 className="footer-title text-purple-300 text-lg font-semibold mb-4">
            Community
          </h6>
          <a
            className="link link-hover block text-white hover:text-purple-400 mb-2 transition-all"
            href="#"
          >
            About Us
          </a>
          <a
            className="link link-hover block text-white hover:text-purple-400 mb-2 transition-all"
            href="#"
          >
            Contact Us
          </a>
          <a
            className="link link-hover block text-white hover:text-purple-400 mb-2 transition-all"
            href="#"
          >
            Careers
          </a>
          <a
            className="link link-hover block text-white hover:text-purple-400 mb-2 transition-all"
            href="#"
          >
            Blog
          </a>
        </nav>

        {/* Legal Section */}
        <nav>
          <h6 className="footer-title text-purple-300 text-lg font-semibold mb-4">
            Legal
          </h6>
          <a
            className="link link-hover block text-white hover:text-purple-400 mb-2 transition-all"
            href="#"
          >
            Terms of Use
          </a>
          <a
            className="link link-hover block text-white hover:text-purple-400 mb-2 transition-all"
            href="#"
          >
            Privacy Policy
          </a>
          <a
            className="link link-hover block text-white hover:text-purple-400 mb-2 transition-all"
            href="#"
          >
            Cookie Policy
          </a>
        </nav>

        {/* Social Links Section */}
        <aside className="flex flex-col items-start">
          <h6 className="footer-title text-purple-300 text-lg font-semibold mb-4">
            Follow Us
          </h6>
          <div className="flex gap-4">
            <a
              className="hover:text-purple-400 text-white transition-all"
              href="#"
            >
              <i className="fab fa-facebook-f text-2xl"></i>
            </a>
            <a
              className="hover:text-purple-400 text-white transition-all"
              href="#"
            >
              <i className="fab fa-twitter text-2xl"></i>
            </a>
            <a
              className="hover:text-purple-400 text-white transition-all"
              href="#"
            >
              <i className="fab fa-instagram text-2xl"></i>
            </a>
            <a
              className="hover:text-purple-400 text-white transition-all"
              href="#"
            >
              <i className="fab fa-twitch text-2xl"></i>
            </a>
          </div>
        </aside>
      </footer>
    </div>
  );
}
