import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Heart, 
  Stethoscope, 
  Baby, 
  Bone, 
  Eye, 
  Clipboard, 
  BrainCircuit, 
  HandCoins,
  ChevronRight
} from "lucide-react";
import { fetchDoctors } from "../../services/doctorService";

// Map of specialty names to their corresponding icons
const specialtyIcons = {
  "General Physician": Stethoscope,
  "Cardiologist": Heart,
  "Dermatologist": HandCoins,
  "Pediatrician": Baby,
  "Neurologist": BrainCircuit,
  "Orthopedic": Bone,
  "Family Medicine": Clipboard,
  "Ophthalmology": Eye
};

// Map of specialty descriptions
const specialtyDescriptions = {
  "General Physician": "Comprehensive medical care for adult patients",
  "Cardiologist": "Specialized care for heart and cardiovascular conditions",
  "Dermatologist": "Expert treatment for skin, hair and nail conditions",
  "Pediatrician": "Expert medical care for children from birth through adolescence",
  "Neurologist": "Specialized care for neurological disorders",
  "Orthopedic": "Treatment of musculoskeletal conditions and injuries",
  "Family Medicine": "Primary healthcare services for patients of all ages",
  "Ophthalmology": "Advanced eye care and vision correction procedures"
};

function Specialties() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [specialties, setSpecialties] = useState([]);

  useEffect(() => {
    const loadSpecialties = async () => {
      try {
        setIsLoading(true);
        const doctors = await fetchDoctors();
        
        // Count doctors by specialty
        const specialtyCounts = doctors.reduce((acc, doctor) => {
          acc[doctor.specialty] = (acc[doctor.specialty] || 0) + 1;
          return acc;
        }, {});

        // Create specialty objects with counts and icons
        const specialtyData = Object.entries(specialtyCounts).map(([name, count]) => ({
          name,
          icon: specialtyIcons[name] || Stethoscope, // Default to Stethoscope if no icon mapped
          description: specialtyDescriptions[name] || `Specialized care in ${name}`,
          count: `${count} Specialist${count === 1 ? '' : 's'}`
        }));

        setSpecialties(specialtyData);
        setError(null);
      } catch (err) {
        console.error('Error loading specialties:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadSpecialties();
  }, []);

  const handleSpecialtyClick = (specialty) => {
    navigate('/doctor/appointment', { state: { selectedSpecialty: specialty.name } });
  };

  if (error) {
    return (
      <div className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Specialties</h2>
            <div className="text-red-600">
              <p>Error loading specialties. Please try again later.</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Specialties</h2>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Our Specialties</h2>
          <p className="text-sm text-gray-600 mt-2">
            Find the right specialist for your needs
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {specialties.map((specialty, index) => {
            const Icon = specialty.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg border border-gray-100 hover:border-blue-100 hover:shadow-sm transition-all duration-300 cursor-pointer"
                onClick={() => handleSpecialtyClick(specialty)}
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                      <Icon className="h-4 w-4 text-blue-600" />
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-900 mb-1">
                    {specialty.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-2 line-clamp-2">
                    {specialty.description}
                  </p>
                  <p className="text-xs text-blue-600 font-medium">
                    {specialty.count}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Specialties;