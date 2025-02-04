import React, { useState } from 'react';
import { 
  MapPin, 
  Building2, 
  GraduationCap, 
  Star, 
  DollarSign, 
  Clock, 
  Edit2, 
  Save,
  Stethoscope,
  Plus,
  Pencil
} from 'lucide-react';

const DoctorProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [doctorData, setDoctorData] = useState({
    name: "Dr. Sarah Smith",
    photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    specialty: "Cardiologist",
    hospital: "City General Hospital",
    location: "123 Medical Center Ave, New York, NY",
    experience: "15 years",
    rating: 4.8,
    appointmentCharge: 150,
    education: [
      {
        degree: "MD in Cardiology",
        institution: "Harvard Medical School",
        year: "2008"
      },
      {
        degree: "MBBS",
        institution: "Johns Hopkins University",
        year: "2005"
      }
    ],
    about: "Dr. Sarah Smith is a board-certified cardiologist with over 15 years of experience in treating cardiovascular diseases. She specializes in preventive cardiology and has been recognized for her patient-centered approach to healthcare."
  });

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => setIsEditing(false);
  const handleChange = (field, value) => {
    setDoctorData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* New Header Card */}
      <div className="bg-blue-900 rounded-lg shadow-lg overflow-hidden mb-6">
        <div className="p-4 sm:p-6">
          <div className="flex items-start gap-4">
            {/* Profile Photo */}
            <div className="relative">
              <img
                src={doctorData.photo}
                alt={doctorData.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover border-2 border-white"
              />
              {isEditing && (
                <label className="absolute bottom-0 right-0 p-1 bg-blue-600 rounded-full text-white cursor-pointer hover:bg-blue-700 shadow-lg">
                  <Edit2 className="w-3 h-3" />
                  <input type="file" className="hidden" onChange={(e) => handleChange('photo', URL.createObjectURL(e.target.files[0]))} />
                </label>
              )}
            </div>

            {/* Doctor Info */}
            <div className="flex-grow text-white">
              <h1 className="text-xl sm:text-2xl font-bold">{doctorData.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <Stethoscope className="w-4 h-4" />
                <span className="text-sm sm:text-base">{doctorData.specialty}</span>
              </div>
              <div className="flex items-center gap-1 mt-2">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`w-4 h-4 ${
                      index < Math.floor(doctorData.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-400'
                    }`}
                  />
                ))}
                <span className="ml-1 text-sm">{doctorData.rating}</span>
              </div>
            </div>
          </div>

          {/* Edit Profile Button */}
          <button
            onClick={handleEdit}
            className="w-full mt-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <Pencil className="w-4 h-4" />
            Edit Profile
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12">
            {/* Rest of the component remains the same... */}
            {/* Professional Info Section */}
            <div className="space-y-6 sm:space-y-8">
              <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                <h2 className="text-xl font-semibold mb-4 sm:mb-6 text-gray-800">Professional Information</h2>
                <div className="space-y-4 sm:space-y-6">
                  <InfoField
                    icon={Building2}
                    label="Hospital"
                    value={doctorData.hospital}
                    isEditing={isEditing}
                    onChange={(value) => handleChange('hospital', value)}
                  />
                  <InfoField
                    icon={MapPin}
                    label="Location"
                    value={doctorData.location}
                    isEditing={isEditing}
                    onChange={(value) => handleChange('location', value)}
                  />
                  <InfoField
                    icon={Clock}
                    label="Experience"
                    value={doctorData.experience}
                    isEditing={isEditing}
                    onChange={(value) => handleChange('experience', value)}
                  />
                  <InfoField
                    icon={DollarSign}
                    label="Appointment Charge"
                    value={`$${doctorData.appointmentCharge}`}
                    isEditing={isEditing}
                    type="number"
                    onChange={(value) => handleChange('appointmentCharge', value)}
                  />
                </div>
              </div>
            </div>

            {/* Education & About Sections */}
            <div className="space-y-6 sm:space-y-8">
              {/* Education Section */}
              <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                <h2 className="text-xl font-semibold mb-4 sm:mb-6 text-gray-800">Education</h2>
                <div className="space-y-4 sm:space-y-6">
                  {doctorData.education.map((edu, index) => (
                    <div key={index} className="flex items-start gap-4 bg-white p-3 sm:p-4 rounded-lg shadow-sm">
                      <GraduationCap className="w-6 h-6 text-blue-600 mt-1" />
                      <div className="flex-grow">
                        {isEditing ? (
                          <div className="space-y-3">
                            <input
                              type="text"
                              value={edu.degree}
                              onChange={(e) => {
                                const newEducation = [...doctorData.education];
                                newEducation[index].degree = e.target.value;
                                handleChange('education', newEducation);
                              }}
                              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                            <input
                              type="text"
                              value={edu.institution}
                              onChange={(e) => {
                                const newEducation = [...doctorData.education];
                                newEducation[index].institution = e.target.value;
                                handleChange('education', newEducation);
                              }}
                              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                            <input
                              type="text"
                              value={edu.year}
                              onChange={(e) => {
                                const newEducation = [...doctorData.education];
                                newEducation[index].year = e.target.value;
                                handleChange('education', newEducation);
                              }}
                              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        ) : (
                          <>
                            <h3 className="font-medium text-gray-900">{edu.degree}</h3>
                            <p className="text-gray-600">{edu.institution}</p>
                            <p className="text-sm text-gray-500">{edu.year}</p>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* About Section */}
              <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                <h2 className="text-xl font-semibold mb-4 sm:mb-6 text-gray-800">About</h2>
                {isEditing ? (
                  <textarea
                    value={doctorData.about}
                    onChange={(e) => handleChange('about', e.target.value)}
                    rows={4}
                    className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Write about yourself..."
                  />
                ) : (
                  <p className="text-gray-600 leading-relaxed">{doctorData.about}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoField = ({ icon: Icon, label, value, isEditing, onChange, type = "text" }) => (
  <div className="flex items-start gap-3 sm:gap-4">
    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mt-1" />
    <div className="flex-grow">
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      {isEditing ? (
        <input
          type={type}
          value={type === "number" ? value.replace("$", "") : value}
          onChange={(e) => onChange(type === "number" ? e.target.value : e.target.value)}
          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      ) : (
        <p className="font-medium text-gray-900">{value}</p>
      )}
    </div>
  </div>
);

export default DoctorProfile;