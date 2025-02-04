/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Component/Header/Header";
import Footer from "./Component/Footer/Footer";
import Sidebar from "./Component/Sidebar/Sidebar";
import LandingPage from "./Page/LandingPage";
import Appointment from "./Page/Appointment";
import DoctorProfile from "./Page/DoctorProfile";
import AiPowered from "./Page/AI-Power";
import HealthEdu from "./Page/HealthEdu";
import EmergencyService from "./Page/EmergencyService";
import AdminDaashboard from "./Page/AdminDaashboard";
import DoctorDashboard from "./Page/DoctorDashboard";
import UserProfile from "./Page/UserProfile";
import PatientsList from "./Component/Dashboard/PatientsList";
import DoctorsList from "./Component/Dashboard/DoctorsList";
import AdminDashboardHome from "./Component/Dashboard/AdminDashboardHome";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
        <Header />
        <div className="flex-grow flex">
          <Sidebar />
          <main className="flex-1 transition-all duration-300 ease-in-out">
            <div className="w-full">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/doctor/appointment" element={<Appointment />} />
                <Route path="/aipowered" element={<AiPowered />} />
                <Route path="/healthEdu" element={<HealthEdu />} />
                <Route path="/emergencyService" element={<EmergencyService />} />
                <Route path="/doctor/DoctorProfile/:id" element={<DoctorProfile />} />
                <Route path="/admindashboard" element={<AdminDaashboard />}>
                  <Route index element={<AdminDashboardHome />} />
                  <Route path="patients" element={<PatientsList />} />
                  <Route path="doctors" element={<DoctorsList />} />
                </Route>
                <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
                <Route path="/userprofile" element={<UserProfile />} />
              </Routes>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
