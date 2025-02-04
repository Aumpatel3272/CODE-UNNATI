/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users,
  User,
  MessageSquare,
  Bell,
  Home,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [totalPatients, setTotalPatients] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Close menu when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Fetch doctors and patients data
    const fetchData = async () => {
      try {
        const doctorsResponse = await fetch('./doctor.json');
        const doctorsData = await doctorsResponse.json();
        setTotalDoctors(doctorsData.doctors.length);

        const patientsResponse = await fetch('./user.json');
        const patientsData = await patientsResponse.json();
        setTotalPatients(patientsData.users.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const isActive = (path) => {
    if (path === '/admindashboard') {
      return location.pathname === '/admindashboard';
    }
    return location.pathname.startsWith(path);
  };

  const getLinkClass = (path) => {
    const baseClass = "flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors";
    const activeClass = "text-yellow-500 bg-yellow-50 font-medium";
    const inactiveClass = "text-gray-600 hover:bg-gray-50 hover:text-gray-900";
    return `${baseClass} ${isActive(path) ? activeClass : inactiveClass}`;
  };

  const getMobileLinkClass = (path) => {
    const baseClass = "flex items-center space-x-3 w-full px-4 py-3.5 rounded-lg transition-all duration-200";
    const activeClass = "text-yellow-500 bg-yellow-50 font-medium shadow-sm";
    const inactiveClass = "text-gray-600 hover:bg-gray-50";
    return `${baseClass} ${isActive(path) ? activeClass : inactiveClass}`;
  };

  const handleSignOut = () => {
    // Add your sign out logic here
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Top Navigation Bar */}
      <motion.div 
        className="bg-white/90 backdrop-blur-lg sticky top-0 z-50 border-b border-gray-100"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Brand and Mobile Menu Button */}
            <div className="flex items-center">
              <button 
                className="md:hidden p-2 rounded-lg hover:bg-gray-100/80 mr-2 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: isMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </motion.div>
              </button>
              <h2 className="text-xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h2>
            </div>

            {/* Navigation Links - Desktop */}
            <nav className="hidden md:flex space-x-2">
              <Link 
                to="/admindashboard" 
                className={getLinkClass('/admindashboard')}
              >
                <Home className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
              <Link 
                to="/admindashboard/patients" 
                className={getLinkClass('/admindashboard/patients')}
              >
                <Users className="w-5 h-5" />
                <span>Patients List ({totalPatients})</span>
              </Link>
              <Link 
                to="/admindashboard/doctors" 
                className={getLinkClass('/admindashboard/doctors')}
              >
                <User className="w-5 h-5" />
                <span>Doctors List ({totalDoctors})</span>
              </Link>
            </nav>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-gray-100/80 transition-colors relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="hidden md:block p-2 rounded-lg hover:bg-gray-100/80 transition-colors">
                <MessageSquare className="w-5 h-5 text-gray-600" />
              </button>
              <div className="hidden md:flex items-center space-x-3 border-l pl-4 ml-4">
                <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100/80 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 flex items-center justify-center text-white font-medium">
                    A
                  </div>
                  <span className="text-sm font-medium text-gray-700">Admin</span>
                </button>
                <button 
                  onClick={handleSignOut}
                  className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMenuOpen(false)}
            />
            
            <motion.nav 
              className="fixed inset-y-0 left-0 w-[280px] bg-white shadow-xl overflow-y-auto z-50 md:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="p-4 border-b">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 flex items-center justify-center text-white font-medium text-lg">
                      A
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Admin Panel</p>
                      <p className="text-sm text-gray-500">Manage your hospital</p>
                    </div>
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 p-4 space-y-1.5">
                  <Link 
                    to="/admindashboard" 
                    className={getMobileLinkClass('/admindashboard')}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Home className="w-5 h-5 flex-shrink-0" />
                    <span>Dashboard</span>
                  </Link>
                  <Link 
                    to="/admindashboard/patients" 
                    className={getMobileLinkClass('/admindashboard/patients')}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Users className="w-5 h-5 flex-shrink-0" />
                    <span>Patients List ({totalPatients})</span>
                  </Link>
                  <Link 
                    to="/admindashboard/doctors" 
                    className={getMobileLinkClass('/admindashboard/doctors')}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="w-5 h-5 flex-shrink-0" />
                    <span>Doctors List ({totalDoctors})</span>
                  </Link>
                </div>

                {/* Footer */}
                <div className="p-4 border-t">
                  <button 
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
