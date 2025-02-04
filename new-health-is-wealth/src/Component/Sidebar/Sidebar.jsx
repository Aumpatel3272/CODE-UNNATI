/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Brain, Book, Hospital, Home } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);

  const navigationItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Calendar, label: 'Appointments', path: '/doctor/appointment' },
    { icon: Brain, label: 'AI Health', path: '/aipowered' },
    { icon: Hospital, label: 'Emergency', path: '/emergencyService' },
    { icon: Book, label: 'Health Edu', path: '/healthEdu' },
  ];

  const sidebarVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  const labelVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.div
        className="hidden lg:flex flex-col fixed left-4 top-24 h-auto rounded-2xl backdrop-blur-md bg-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/20 z-40"
        style={{
          width: '70px',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
        variants={sidebarVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col items-center space-y-6 py-8">
          {navigationItems.map((item, index) => (
            <motion.div
              key={item.path}
              variants={itemVariants}
              className="relative"
              onHoverStart={() => setHoveredItem(item.path)}
              onHoverEnd={() => setHoveredItem(null)}
            >
              <Link
                to={item.path}
                className={`p-3 rounded-xl transition-all duration-300 relative ${
                  isActive(item.path)
                    ? 'bg-yellow-500/20 text-yellow-500'
                    : 'text-gray-600 hover:bg-yellow-500/10 hover:text-yellow-500'
                }`}
              >
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`${isActive(item.path) ? 'text-yellow-500' : 'text-gray-500'}`}
                >
                  <item.icon className="w-6 h-6" />
                </motion.div>

                {/* Floating Label */}
                <AnimatePresence>
                  {hoveredItem === item.path && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={labelVariants}
                      className="absolute left-16 top-1/2 -translate-y-1/2 bg-white px-3 py-2 rounded-lg shadow-lg text-sm font-medium text-gray-700 whitespace-nowrap z-50"
                    >
                      {item.label}
                      {/* Arrow */}
                      <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-white transform rotate-45" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Mobile Bottom Navigation */}
      <motion.div
        className="lg:hidden fixed bottom-0 left-0 right-0 backdrop-blur-md bg-white/80 shadow-[0_-8px_32px_0_rgba(31,38,135,0.1)] border-t border-white/20 z-40"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        style={{
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
      >
        <div className="flex justify-around items-center h-16">
          {navigationItems.map((item, index) => (
            <motion.div
              key={item.path}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={item.path}
                className={`flex flex-col items-center justify-center space-y-1 ${
                  isActive(item.path)
                    ? 'text-orange-500'
                    : 'text-gray-600'
                }`}
              >
                <motion.div
                  whileHover={{ rotate: 10 }}
                  animate={isActive(item.path) ? { scale: [1, 1.2, 1] } : {}}
                >
                  <item.icon className="w-5 h-5" />
                </motion.div>
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
