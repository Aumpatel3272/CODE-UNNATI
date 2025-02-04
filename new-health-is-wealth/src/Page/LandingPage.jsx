import React from "react";
import image4 from "../assets/image4.jpeg";
import { ChevronRight } from "lucide-react";
import Feature from "../Component/Section/Feature";
import Specialties from "../Component/Section/Specialties";
import About from "../Component/Section/About";
import Doctor from "../Component/Section/Doctor";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="bg-blue-900 text-white">
        <div className="container mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-6"
                variants={fadeIn}
                initial="initial"
                animate="animate"
              >
                Your Health Journey Starts Here
              </motion.h1>
              <motion.p 
                className="text-xl mb-8"
                variants={fadeIn}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.2 }}
              >
                Access top healthcare professionals, AI-powered health
                assistance, and emergency services all in one place.
              </motion.p>
              <motion.div 
                className="flex space-x-4"
                variants={staggerChildren}
                initial="initial"
                animate="animate"
              >
                <Link to="/doctor/appointment">
                  <motion.button 
                    className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Find a Doctor <ChevronRight className="ml-2" />
                  </motion.button>
                </Link>
                <Link to="/emergencyService">
                  <motion.button 
                    className="bg-transparent border-2 border-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Emergency Services
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
            <motion.div 
              className="hidden md:block"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src={image4}
                alt="Healthcare Professional"
                className="rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <motion.section 
        id="features" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Feature />
      </motion.section>

      {/* Specialties Section */}
      <motion.section 
        id="specialties" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Specialties />
      </motion.section>

      {/* About Section */}
      <motion.section 
        id="about" 
        className="py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <About />
      </motion.section>

      {/* Doctors Section */}
      <motion.section 
        id="doctors" 
        className="py-20 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Doctor />
      </motion.section>
    </div>
  );
};

export default LandingPage;
