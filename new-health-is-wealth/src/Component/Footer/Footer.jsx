/* eslint-disable no-unused-vars */
import React from "react";
import { Cpu } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const Footer = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    }
  };

  const linkVariants = {
    hover: {
      x: 10,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const quickLinks = [
    { href: "#features", text: "Features" },
    { href: "#about", text: "About" },
    { href: "#specialties", text: "Specialties" },
    { href: "#doctors", text: "Find a Doctor" }
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-12">
      <motion.div 
        ref={ref}
        className="w-full px-4"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          {/* Company Info */}
          <motion.div
            variants={itemVariants}
            className="text-center md:text-left"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-block"
            >
              <motion.h3 
                className="text-xl font-bold mb-4 inline-flex items-center"
                whileHover={{ color: "#60A5FA" }}
              >
                <Cpu className="mr-2" />
                HealthIsWealth
              </motion.h3>
            </motion.div>
            <motion.p 
              className="text-gray-400"
              variants={itemVariants}
            >
              Making healthcare accessible to everyone.
            </motion.p>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div
            variants={itemVariants}
            className="text-center md:text-left"
          >
            <motion.h4 
              className="text-lg font-semibold mb-4"
              whileHover={{ scale: 1.05 }}
            >
              Quick Links
            </motion.h4>
            <motion.ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="overflow-hidden"
                >
                  <motion.a
                    href={link.href}
                    className="text-gray-400 hover:text-white inline-block w-full sm:w-auto"
                    variants={linkVariants}
                  >
                    {link.text}
                  </motion.a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Emergency Contact */}
          <motion.div
            variants={itemVariants}
            className="text-center md:text-left"
          >
            <motion.h4 
              className="text-lg font-semibold mb-4"
              whileHover={{ scale: 1.05 }}
            >
              Emergency Contact
            </motion.h4>
            <motion.p 
              className="text-gray-400"
              variants={itemVariants}
            >
              24/7 Emergency Hotline:
            </motion.p>
            <motion.a 
              href="tel:1-800-HEALTH"
              className="text-white font-semibold inline-block"
              variants={itemVariants}
              whileHover={{
                scale: 1.1,
                color: "#60A5FA",
                transition: { duration: 0.2 }
              }}
            >
              1-800-HEALTH
            </motion.a>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div 
          className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400"
          variants={itemVariants}
        >
          <motion.p
            whileHover={{ color: "#60A5FA" }}
          >
            {currentYear} HealthIsWealth. All rights reserved.
          </motion.p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
