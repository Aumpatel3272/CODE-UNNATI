import React from "react";
import { Calendar, Brain, Book, Hospital } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

function Feature() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
    rootMargin: "50px"
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
        duration: 0.5
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.5
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    },
    hover: {
      scale: 1.2,
      rotate: 360,
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  const features = [
    {
      to: "/doctor/appointment",
      Icon: Calendar,
      title: "Doctor Appointments",
      description: "Book appointments with top healthcare professionals.",
      color: "blue"
    },
    {
      to: "/aipowered",
      Icon: Brain,
      title: "AI Health Assistant",
      description: "Get instant health insights and recommendations.",
      color: "purple"
    },
    {
      to: "/healthEdu",
      Icon: Book,
      title: "Health Education",
      description: "Access videos, blogs, and books about health.",
      color: "green"
    },
    {
      to: "/emergencyService",
      Icon: Hospital,
      title: "Emergency Services",
      description: "Find nearby hospitals and emergency care.",
      color: "red"
    }
  ];

  const getIconColor = (color) => {
    const colors = {
      blue: "text-blue-600",
      purple: "text-purple-600",
      green: "text-green-600",
      red: "text-red-600"
    };
    return colors[color] || colors.blue;
  };

  return (
    <section className="py-16 sm:py-20">
      <motion.div 
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <motion.h2 
          className="text-3xl font-bold text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          Our Features
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                scale: [1, 1.02, 1.01],
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.98 }}
              className="h-full"
            >
              <Link to={feature.to} className="h-full block">
                <motion.div 
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow h-full flex flex-col"
                  whileHover={{
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)"
                  }}
                >
                  <motion.div
                    variants={iconVariants}
                    whileHover="hover"
                    className="mb-4 flex justify-center"
                  >
                    <feature.Icon className={`w-12 h-12 ${getIconColor(feature.color)}`} />
                  </motion.div>
                  <motion.h3 
                    className="text-xl font-semibold mb-2 text-center sm:text-left"
                    whileHover={{ scale: 1.05 }}
                  >
                    {feature.title}
                  </motion.h3>
                  <motion.p 
                    className="text-gray-600 text-center sm:text-left mt-auto"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {feature.description}
                  </motion.p>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default Feature;
