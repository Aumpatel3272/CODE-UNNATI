/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Cpu, Stethoscope, UserRoundPlus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path
      ? "text-blue-400"
      : "text-gray-500 hover:text-blue-700";
  };

  const navLinks = [
    { path: "/signup", label: "Patient Signup", icon: UserRoundPlus },
    { path: "/login", label: "Doctor Resgister", icon: Stethoscope },
  ];

  const logoVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  const mobileNavVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        when: "afterChildren",
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const mobileNavItemVariants = {
    closed: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.2,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  const menuIconVariants = {
    closed: { rotate: 0 },
    open: { rotate: 180 },
  };

  return (
    <motion.header
      className="bg-white text-blue-800 sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="w-full px-4 border-b border-gray-200">
        <div className="flex justify-between items-center h-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={logoVariants}
            className="lg:ml-0"
          >
            <Link to="/" className="text-xl font-bold">
              <div className="flex items-center space-x-2">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Cpu className="text-blue-800" />
                </motion.div>
                <span className="text-2xl font-bold text-blue-800">
                  HealthAI
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-8 mr-7">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                <Link
                  to={link.path}
                  className={`${isActive(
                    link.path
                  )} transition-colors duration-200`}
                >
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="flex items-center">
                      {link.icon && <link.icon className="w-7 h-7" />}
                      {link.label}
                    </span>
                  </motion.span>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Mobile menu button */}
          <motion.button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md hover:bg-gray-800"
            whileTap={{ scale: 0.95 }}
            variants={menuIconVariants}
            animate={isMenuOpen ? "open" : "closed"}
          >
            <motion.div
              initial={false}
              animate={{ rotate: isMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile navigation */}
        <AnimatePresence mode="wait">
          {isMenuOpen && (
            <motion.nav
              className="md:hidden"
              variants={mobileNavVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <motion.div
                className="py-4 space-y-4"
                variants={mobileNavVariants}
              >
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    variants={mobileNavItemVariants}
                    whileHover={{ x: 10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to={link.path}
                      className="block hover:bg-gray-200 px-3 py-2 rounded-md text-blue-700 hover:text-blue-900 transition-colors duration-200"
                      onClick={toggleMenu}
                    >
                      <span className="flex items-center">
                        {link.icon && <link.icon className="w-7 h-7" />}
                        {link.label}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

export default Header;
