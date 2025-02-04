/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import {
  Calendar,
  Users,
  BookOpen,
  Menu,
  X,
  Bell,
  UserCircle,
} from "lucide-react";
import AppointmentTracker from "../Component/DoctorDashboard/AppointmentTracker";
import PatientFeedback from "../Component/DoctorDashboard/PatientsFeedback";
import HealthEducation from "../Component/DoctorDashboard/HealthEducation";
import DoctorProfile from "../Component/DoctorDashboard/DoctorProfile";

export default function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const tabs = [
    { id: "profile", name: "My Profile", icon: UserCircle },
    { id: "appointments", name: "Appointments", icon: Calendar },
    { id: "feedback", name: "Patient Feedback", icon: Users },
    { id: "education", name: "Health Education", icon: BookOpen },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header with Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex-shrink-0">
                <span className="text-xl font-semibold text-blue-600">
                  Dr. Dashboard
                </span>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden sm:flex items-center space-x-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`${
                      activeTab === tab.id
                        ? "bg-blue-50 text-blue-600 border-blue-200"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    } flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out`}
                  >
                    <tab.icon
                      className={`h-5 w-5 mr-2 ${
                        activeTab === tab.id ? "text-blue-500" : "text-gray-400"
                      }`}
                    />
                    {tab.name}
                  </button>
                ))}
              </div>

              {/* Right side items */}
              <div className="flex items-center space-x-4">
                
                {/* Mobile menu button */}
                <div className="sm:hidden">
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                  >
                    {isMobileMenuOpen ? (
                      <X className="h-6 w-6" />
                    ) : (
                      <Menu className="h-6 w-6" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <div className={`sm:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}>
            <div className="px-4 pt-2 pb-3 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`${
                    activeTab === tab.id
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  } flex items-center w-full px-3 py-2 text-base font-medium rounded-lg`}
                >
                  <tab.icon
                    className={`h-5 w-5 mr-2 ${
                      activeTab === tab.id ? "text-blue-500" : "text-gray-400"
                    }`}
                  />
                  {tab.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-100">
        {activeTab === "profile" && <DoctorProfile />}
        {activeTab === "appointments" && <AppointmentTracker />}
        {activeTab === "feedback" && <PatientFeedback />}
        {activeTab === "education" && <HealthEducation />}
      </main>
    </div>
  );
}
