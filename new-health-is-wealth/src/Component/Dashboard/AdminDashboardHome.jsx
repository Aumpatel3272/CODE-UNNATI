import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Calendar, Activity } from 'lucide-react';
import { AppointmentTracker } from './AppointmentTracker';

const AdminDashboardHome = () => {
  const [stats, setStats] = useState([
    { 
      title: 'Total Patients', 
      value: '0', 
      change: '0%',
      icon: Users,
      color: 'blue'
    },
    { 
      title: 'Appointments', 
      value: '0', 
      change: '0%',
      icon: Calendar,
      color: 'purple'
    },
    { 
      title: 'Active Doctors', 
      value: '0', 
      change: '0%',
      icon: Activity,
      color: 'green'
    }
  ]);

  const [recentActivities, setRecentActivities] = useState([]);

  // Define animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const doctorsResponse = await fetch('./doctor.json');
        const doctorsData = await doctorsResponse.json();
        const totalDoctors = doctorsData.doctors.length;

        const patientsResponse = await fetch('./user.json');
        const patientsData = await patientsResponse.json();
        const totalPatients = patientsData.users.length;

        const totalAppointments = patientsData.users.reduce((acc, user) => 
          acc + (user.appointments ? user.appointments.length : 0), 0
        );

        setStats([
          { 
            title: 'Total Patients', 
            value: totalPatients.toString(), 
            change: '+12.5%',
            icon: Users,
            color: 'blue'
          },
          { 
            title: 'Appointments', 
            value: totalAppointments.toString(), 
            change: '+8.2%',
            icon: Calendar,
            color: 'purple'
          },
          { 
            title: 'Active Doctors', 
            value: totalDoctors.toString(), 
            change: '+5.1%',
            icon: Activity,
            color: 'green'
          }
        ]);

        const recentActivities = patientsData.users
          .slice(0, 3)
          .map((user, index) => ({
            id: index + 1,
            user: user.appointments?.[0]?.doctorName || 'Dr. Unknown',
            action: 'Updated patient records',
            patient: user.name,
            time: '25 mins ago',
            avatar: '👨‍⚕️'
          }));

        setRecentActivities(recentActivities);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const getColorClass = (color) => {
    const colors = {
      blue: 'bg-blue-500',
      purple: 'bg-purple-500',
      green: 'bg-green-500',
      yellow: 'bg-yellow-500'
    };
    return colors[color] || colors.blue;
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-6 space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-500 text-sm">{stat.change}</span>
                </div>
              </div>
              <div className={`${getColorClass(stat.color)} p-4 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4">
                <span className="text-2xl">{activity.avatar}</span>
                <div>
                  <p className="text-sm">
                    <span className="font-medium">{activity.user}</span> {activity.action} for{' '}
                    <span className="font-medium">{activity.patient}</span>
                  </p>
                  <p className="text-gray-500 text-xs">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Appointment Tracker</h2>
          <AppointmentTracker />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminDashboardHome;