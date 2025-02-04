/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  Calendar,
  User,
  Activity,
  Edit2,
  Plus,
  MapPin,
  Clock,
  CheckCircle,

} from "lucide-react";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("appointments");

  const user = {
    name: "John Doe",
    age: 35,
    bloodType: "A+",
    nextAppointment: "Feb 5, 2025",
    profileImage: "/api/placeholder/100/100",
    appointments: [
      {
        id: 1,
        doctorName: "Dr. Sarah Smith",
        specialty: "Cardiologist",
        date: "2025-02-05",
        time: "10:00 AM",
        status: "upcoming",
        location: "Heart Care Center",
      },
      {
        id: 2,
        doctorName: "Dr. Michael Chen",
        specialty: "General Physician",
        date: "2025-02-03",
        time: "2:30 PM",
        status: "completed",
        location: "Medical Plaza",
      },
    ],
    quizzes: {
      completed: [
        { topic: "Heart Health Quiz", score: 95, credits: 20, date: "2025-01-28" },
        { topic: "Nutrition Knowledge", score: 88, credits: 15, date: "2025-01-25" },
        { topic: "Mental Health Awareness", score: 92, credits: 18, date: "2025-01-20" },
      ],
      totalCredits: 53,
    },
  };

  const MenuTab = ({ label, isActive, onClick, icon: Icon }) => (
    <button
      onClick={onClick}
      className={`flex items-center justify-center px-6 py-4 transition-all duration-200 border-b-2 ${
        isActive
          ? "border-blue-600 text-blue-600 font-medium bg-blue-50/50"
          : "border-transparent text-gray-600 hover:text-blue-600 hover:border-blue-200"
      }`}
      title={label}
    >
      <Icon className="w-5 h-5" />
      <span className="ml-3 font-medium">{label}</span>
    </button>
  );

  const HealthMetricCard = ({ title, value, icon: Icon }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
      <div className="flex items-center space-x-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-xl">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-xl font-semibold text-gray-900 mt-1">{value}</p>
        </div>
      </div>
    </div>
  );

  const AppointmentCard = ({ appointment }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center gap-6">
        <div className="flex-1">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <User className="w-7 h-7 text-blue-600" />
            </div>
            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {appointment.doctorName}
                </h3>
                <p className="text-blue-600 font-medium">{appointment.specialty}</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="text-sm font-medium">{appointment.date}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="text-sm font-medium">{appointment.time}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="text-sm font-medium">{appointment.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 sm:flex-col">
          <span
            className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium ${
              appointment.status === "upcoming"
                ? "bg-blue-50 text-blue-700"
                : "bg-green-50 text-green-700"
            }`}
          >
            {appointment.status === "upcoming" ? "Upcoming" : "Completed"}
          </span>
          <button className="group p-2 rounded-xl hover:bg-gray-100 transition-colors">
            <Edit2 className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Overview */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex items-center">
              <div className="relative">
                <img
                  src={user.profileImage}
                  alt={user.name}
                  className="w-24 h-24 rounded-2xl object-cover ring-4 ring-blue-50"
                />
                <button className="absolute -bottom-2 -right-2 p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg">
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
              <div className="ml-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-3">
                  {user.name}
                </h1>
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                    Age: {user.age}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-50 text-red-700">
                    Blood Type: {user.bloodType}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
                    <Calendar className="w-4 h-4 mr-1.5" />
                    Next Visit: {user.nextAppointment}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors inline-flex items-center shadow-sm">
                <Plus className="w-5 h-5 mr-2" />
                Book Appointment
              </button>
              <button className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors inline-flex items-center shadow-sm">
                <Edit2 className="w-5 h-5 mr-2" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Health Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <HealthMetricCard
            title="Quizzes Completed"
            value={`${user.quizzes.completed.length} Quizzes`}
            icon={Activity}
          />
          <HealthMetricCard
            title="Appointments"
            value="2 Upcoming"
            icon={Calendar}
          />
          <HealthMetricCard
            title="Quiz Credits"
            value={`${user.quizzes.totalCredits} Points`}
            icon={CheckCircle}
          />
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
          {/* Navigation Tabs */}
          <nav className="flex border-b">
            <MenuTab
              label="Appointments"
              isActive={activeTab === "appointments"}
              onClick={() => setActiveTab("appointments")}
              icon={Calendar}
            />
          </nav>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === "appointments" && (
              <div className="space-y-6">
                {user.appointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
