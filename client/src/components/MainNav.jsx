// src/components/Navigation_bar.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useEcomStore from "../store/ecom-store";
import { ShoppingCart, ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { use } from "react";

const MainNav = () => {
  const carts = useEcomStore((state) => state.carts);
  const user = useEcomStore((state) => state.user);
  const logout = useEcomStore((state) => state.logout);
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  useEffect(() => {
    if (!user) setIsMenuOpen(false);
  },[user])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent tracking-wide"
          >
            LOGO
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative text-gray-700 font-medium transition-colors duration-300 hover:text-cyan-500 ${
                  location.pathname === link.path ? "text-cyan-600" : ""
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 -bottom-1 w-full h-[2px] bg-cyan-400 rounded-full"
                  />
                )}
              </Link>
            ))}

            {/* Cart */}
            <Link
              to="/cart"
              className="relative flex items-center gap-1 text-gray-700 hover:text-cyan-500 transition-colors duration-300"
            >
              <ShoppingCart size={20} />
              <span>Cart</span>
              {carts.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full"
                >
                  {carts.length}
                </motion.span>
              )}
            </Link>
          </div>

          {user ? (
            <div className="flex items-center gap-5">
              <button
                onClick={toggleMenu}
                className="flex items-center gap-2 hover:bg-gray-200 font-medium transition-colors duration-300 px-2 py-1.5 rounded-lg"
              >
                <img
                  className="w-9 h-9 rounded-full object-cover"
                  src="https://cdn.iconscout.com/icon/free/png-512/free-man-avatar-profile-account-human-person-people-icon-svg-download-png-20178.png?f=webp&w=512"
                />
                <ChevronDown />
              </button>

              {isMenuOpen && (
                <div className="absolute mt-16 top-4 bg-white border border-gray-200 rounded-lg shadow-lg py-4 w-40 left-auto right-6">
                  <Link
                    to="/user/history"
                    className="hover:bg-gray-100 block px-4 py-2 text-gray-700 font-medium transition-colors duration-300"
                  >
                    History
                  </Link>
                  <Link
                  to='/'
                  >
                  <button
                    onClick={() => logout()}
                    className="hover:bg-gray-100 block px-4 py-2 text-gray-700 font-medium transition-colors duration-300"
                  >
                    Logout
                  </button>
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-5">
              <Link
                to="/register"
                className="text-gray-600 hover:text-cyan-500 font-medium transition-colors duration-300"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="bg-gradient-to-r from-cyan-300 to-blue-200 text-gray-700 
                         px-4 py-1.5 rounded-lg font-semibold shadow-sm hover:shadow-md 
                         hover:scale-[1.03] transition-all duration-300"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
