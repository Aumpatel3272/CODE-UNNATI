import React, { useState, useEffect } from "react";
import { MapPin, Star, Building2, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetchDoctors } from "../../services/doctorService";

function Doctor() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        setLoading(true);
        const doctorsData = await fetchDoctors();
        // Only take the first 3 doctors for the homepage section
        setDoctors(doctorsData.slice(0, 3));
      } catch (err) {
        console.error('Error loading doctors:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadDoctors();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-center mb-12">Our Doctors</h2>
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-center mb-12">Our Doctors</h2>
        <div className="text-center text-red-600">
          <p>Error loading doctors. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Our Doctors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={`/images/${doctor.photo}`}
                    alt={doctor.name}
                    className="h-20 w-20 rounded-full object-cover bg-gray-100"
                    onError={(e) => {
                      e.target.src = '/images/default-doctor.svg';
                    }}
                  />
                  <div className="flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {doctor.name}
                    </h3>
                    <p className="text-blue-600">{doctor.specialty}</p>
                    <div className="flex items-center text-gray-600 mt-1">
                      <Building2 className="h-4 w-4 mr-2" />
                      <span>{doctor.hospital}</span>
                    </div>
                    <div className="flex items-center text-gray-600 mt-1">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{doctor.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600 mt-1">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{doctor.experience} years experience</span>
                    </div>
                    <div className="flex items-center mt-2">
                      <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                      <span className="text-gray-600">{doctor.rating} / 5.0</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/doctor/DoctorProfile/${doctor.id}`)}
                  className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/doctor/appointment')}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            View All Doctors
          </button>
        </div>
      </div>
    </div>
  );
}

export default Doctor;
