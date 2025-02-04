/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MapPin, Star, Building2, Clock, DollarSign } from 'lucide-react';
import { fetchDoctors } from '../services/doctorService';

function DoctorList() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch doctors data
  useEffect(() => {
    const loadDoctors = async () => {
      try {
        setLoading(true);
        const doctorsData = await fetchDoctors();
        setDoctors(doctorsData || []); // Ensure we always have an array
        // Extract unique specialties from the fetched data
        const uniqueSpecialties = [...new Set((doctorsData || []).map(doctor => doctor.specialty))];
        setSpecialties(uniqueSpecialties);
      } catch (err) {
        console.error('Error loading doctors:', err);
        setError(err.message);
        setDoctors([]); // Set empty array on error
        setSpecialties([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    loadDoctors();
  }, []);

  // Set the selected specialty from navigation state
  useEffect(() => {
    if (location.state?.selectedSpecialty) {
      setSelectedSpecialty(location.state.selectedSpecialty);
    }
  }, [location.state]);

  const filteredDoctors = useMemo(() => {
    return doctors.filter(doctor => {
      const locationMatch = doctor.location.toLowerCase().includes(searchLocation.toLowerCase());
      const specialtyMatch = !selectedSpecialty || doctor.specialty === selectedSpecialty;
      return locationMatch && specialtyMatch;
    });
  }, [searchLocation, selectedSpecialty, doctors]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading doctors...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>Error: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Find a Doctor</h1>
        </div>
      </header>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by location..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              />
              <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="w-full md:w-64">
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
            >
              <option value="">All Specialties</option>
              {specialties.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.length === 0 ? (
            <div className="col-span-full text-center py-8 text-gray-500">
              No doctors found matching your criteria
            </div>
          ) : (
            filteredDoctors.map((doctor) => (
              <div key={doctor.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
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
                      <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
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
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center text-gray-600">
                          <Star className="h-4 w-4 mr-2 text-yellow-400 fill-current" />
                          <span>{doctor.rating} / 5.0</span>
                        </div>
                        <div className="flex items-center text-green-600 bg-green-50 px-2 py-1 rounded">
                          <DollarSign className="h-4 w-4 mr-1" />
                          <span>₹{doctor.appointmentCharge}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => navigate(`/doctor/DoctorProfile/${doctor.id}`)}
                    className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default DoctorList;