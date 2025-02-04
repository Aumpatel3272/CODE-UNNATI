import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format, addMonths, startOfMonth, eachDayOfInterval, endOfMonth, isToday, isBefore, addDays } from 'date-fns';
import { MapPin, GraduationCap, Clock, ArrowLeft, ChevronLeft, ChevronRight, X, Star, StarHalf, MessageCircle, DollarSign, CreditCard, Wallet } from 'lucide-react';
import { getDoctorById } from '../services/doctorService';

// Sample reviews data (in a real app, this would come from an API)
const sampleReviews = [
  {
    id: 1,
    patientName: "John Smith",
    rating: 5,
    comment: "Dr. Wilson is incredibly knowledgeable and caring. She took the time to explain everything thoroughly.",
    date: "2024-01-15"
  },
  {
    id: 2,
    patientName: "Sarah Johnson",
    rating: 4,
    comment: "Very professional and efficient. The wait time was minimal.",
    date: "2024-01-10"
  },
  {
    id: 3,
    patientName: "Michael Brown",
    rating: 5,
    comment: "Excellent doctor! Made me feel comfortable and answered all my questions.",
    date: "2024-01-05"
  }
];

function DoctorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviews, setReviews] = useState(sampleReviews);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ''
  });
  const [patientDetails, setPatientDetails] = useState({
    name: '',
    age: '',
    phone: '',
    email: '',
    address: '',
    paymentMethod: 'online' // Default to online payment
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const loadDoctor = async () => {
      try {
        setLoading(true);
        const doctorData = await getDoctorById(id);
        if (!doctorData) {
          throw new Error('Doctor not found');
        }
        setDoctor(doctorData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadDoctor();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading doctor profile...</p>
        </div>
      </div>
    );
  }

  if (error || !doctor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>Error: {error || 'Doctor not found'}</p>
          <button 
            onClick={() => navigate(-1)} 
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    const previousMonth = addMonths(currentMonth, -1);
    if (!isBefore(startOfMonth(previousMonth), startOfMonth(new Date()))) {
      setCurrentMonth(previousMonth);
    }
  };

  const getDayOfWeek = (date) => {
    return format(date, 'EEE');
  };

  const getAvailableSlots = (date) => {
    const dayOfWeek = format(date, 'EEE');
    return doctor.availableSlots[dayOfWeek] || [];
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!patientDetails.name.trim()) newErrors.name = 'Name is required';
    if (!patientDetails.age) newErrors.age = 'Age is required';
    if (!patientDetails.phone) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(patientDetails.phone)) {
      newErrors.phone = 'Invalid phone number';
    }
    if (!patientDetails.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(patientDetails.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!patientDetails.address.trim()) newErrors.address = 'Address is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBookAppointment = () => {
    if (validateForm()) {
      // Here you would typically make an API call to save the appointment
      alert('Appointment booked successfully!');
      setShowModal(false);
      navigate('/');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientDetails(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleAddReview = () => {
    if (!newReview.comment.trim()) {
      alert('Please enter a comment');
      return;
    }

    const review = {
      id: reviews.length + 1,
      patientName: "Anonymous User",
      rating: newReview.rating,
      comment: newReview.comment,
      date: format(new Date(), 'yyyy-MM-dd')
    };

    setReviews([review, ...reviews]);
    setNewReview({ rating: 5, comment: '' });
    setShowReviewModal(false);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <Star key={i} className="h-5 w-5 fill-current text-yellow-400" />
        );
      } else if (i - 0.5 === rating) {
        stars.push(
          <StarHalf key={i} className="h-5 w-5 fill-current text-yellow-400" />
        );
      } else {
        stars.push(
          <Star key={i} className="h-5 w-5 text-gray-300" />
        );
      }
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/doctor/appointment')}
          className="flex items-center text-gray-600 hover:text-blue-600 mb-8 group transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="font-medium">Back to Doctors</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Doctor Info Section */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="relative">
                <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
                  <img
                    src={`/images/${doctor.photo}`}
                    alt={doctor.name}
                    className="w-32 h-32 rounded-full object-cover bg-gray-100"
                    onError={(e) => {
                      e.target.src = '/images/default-doctor.svg';
                    }}
                  />
                </div>
                <div className="pt-16 text-center">
                  <h1 className="text-3xl font-bold text-gray-900 mb-1">{doctor.name}</h1>
                  <p className="text-lg text-blue-600 font-medium mb-2">{doctor.specialty}</p>
                  <div className="flex items-center justify-center mb-4">
                    {renderStars(doctor.rating)}
                    <span className="ml-2 text-gray-600 font-medium">{doctor.rating}/5</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mt-6">
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <span className="ml-3 text-gray-700">{doctor.location}</span>
                </div>
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span className="ml-3 text-gray-700">{doctor.experience} years experience</span>
                </div>
                <div className="flex items-center p-3 bg-green-50 rounded-lg">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <span className="ml-3 text-gray-700">Consultation Fee: ₹{doctor.appointmentCharge}</span>
                </div>
              </div>
            </div>

            {/* Education Card */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-xl font-bold mb-4 text-gray-900 flex items-center">
                <GraduationCap className="h-6 w-6 mr-2 text-blue-600" />
                Education
              </h2>
              <div className="space-y-4">
                {doctor.education.map((edu, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                    <p className="font-semibold text-gray-900">{edu}</p>
                    {/* <p className="text-blue-600">{edu.institution}</p>
                    <p className="text-sm text-gray-500">{edu.year}</p> */}
                  </div>
                ))}
              </div>
            </div>

            {/* About Card */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-xl font-bold mb-4 text-gray-900">About</h2>
              <p className="text-gray-600 leading-relaxed">{doctor.about}</p>
            </div>

            {/* Reviews Card */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Patient Reviews</h2>
                <button
                  onClick={() => setShowReviewModal(true)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Write a Review
                </button>
              </div>
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="group">
                    <div className="p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-all duration-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-900">{review.patientName}</span>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <div className="flex items-center mb-2">
                        {renderStars(review.rating)}
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Calendar Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Schedule Appointment</h2>
              
              {/* Calendar Navigation */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  {format(currentMonth, 'MMMM yyyy')}
                </h3>
                <div className="flex space-x-2">
                  <button
                    onClick={prevMonth}
                    className="p-2 hover:bg-blue-100 rounded-full transition-colors duration-200"
                  >
                    <ChevronLeft className="h-6 w-6 text-blue-600" />
                  </button>
                  <button
                    onClick={nextMonth}
                    className="p-2 hover:bg-blue-100 rounded-full transition-colors duration-200"
                  >
                    <ChevronRight className="h-6 w-6 text-blue-600" />
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2 mb-6">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center font-semibold text-gray-600 py-2">
                    {day}
                  </div>
                ))}
                {daysInMonth.map((date, i) => {
                  const dayOfWeek = getDayOfWeek(date);
                  const hasSlots = doctor.availableSlots[dayOfWeek]?.length > 0;
                  const isSelected = selectedDate && format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
                  const isPast = isBefore(date, addDays(new Date(), -1));

                  return (
                    <button
                      key={i}
                      onClick={() => !isPast && hasSlots && handleDateClick(date)}
                      disabled={isPast || !hasSlots}
                      className={`
                        p-3 rounded-lg text-center transition-all duration-200
                        ${isSelected ? 'bg-blue-600 text-white ring-2 ring-blue-300 transform scale-105' : ''}
                        ${isPast ? 'text-gray-300 cursor-not-allowed' : ''}
                        ${!isPast && hasSlots ? 'hover:bg-blue-50 hover:text-blue-600 cursor-pointer' : ''}
                        ${!hasSlots && !isPast ? 'text-gray-300 cursor-not-allowed' : ''}
                        ${isToday(date) ? 'ring-2 ring-blue-600 font-semibold' : ''}
                      `}
                    >
                      {format(date, 'd')}
                    </button>
                  );
                })}
              </div>

              {/* Time Slots */}
              {selectedDate && (
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">
                    Available Times for {format(selectedDate, 'MMMM d, yyyy')}
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {getAvailableSlots(selectedDate).map((time) => (
                      <button
                        key={time}
                        onClick={() => {
                          setSelectedTime(time);
                          setShowModal(true);
                        }}
                        className={`
                          p-3 rounded-lg text-center transition-all duration-200
                          ${selectedTime === time
                            ? 'bg-blue-600 text-white ring-2 ring-blue-300'
                            : 'bg-gray-50 hover:bg-blue-50 hover:text-blue-600'
                          }
                        `}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Patient Details Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full transition-all duration-200"
            >
              <X className="h-6 w-6" />
            </button>
            
            <h2 className="text-2xl font-bold mb-2 text-gray-900">Book Appointment</h2>
            <div className="flex items-center justify-between mb-6">
              <p className="text-blue-600 font-medium">
                {format(selectedDate, 'MMMM d, yyyy')} at {selectedTime}
              </p>
              <p className="text-green-600 font-medium bg-green-50 px-3 py-1 rounded-lg">
                Fee: ₹{doctor.appointmentCharge}
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={patientDetails.name}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={patientDetails.age}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.age ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your age"
                />
                {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={patientDetails.phone}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your phone number"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={patientDetails.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <textarea
                  name="address"
                  value={patientDetails.address}
                  onChange={handleInputChange}
                  rows="3"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.address ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your address"
                ></textarea>
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>

              {/* Payment Method Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Payment Method
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => handleInputChange({ target: { name: 'paymentMethod', value: 'online' }})}
                    className={`flex items-center justify-center p-4 border rounded-lg ${
                      patientDetails.paymentMethod === 'online'
                        ? 'border-blue-500 bg-blue-50 text-blue-600'
                        : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50'
                    }`}
                  >
                    <CreditCard className={`h-5 w-5 mr-2 ${
                      patientDetails.paymentMethod === 'online' ? 'text-blue-600' : 'text-gray-400'
                    }`} />
                    <span className={patientDetails.paymentMethod === 'online' ? 'font-medium' : ''}>
                      Pay Online
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInputChange({ target: { name: 'paymentMethod', value: 'cash' }})}
                    className={`flex items-center justify-center p-4 border rounded-lg ${
                      patientDetails.paymentMethod === 'cash'
                        ? 'border-blue-500 bg-blue-50 text-blue-600'
                        : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50'
                    }`}
                  >
                    <Wallet className={`h-5 w-5 mr-2 ${
                      patientDetails.paymentMethod === 'cash' ? 'text-blue-600' : 'text-gray-400'
                    }`} />
                    <span className={patientDetails.paymentMethod === 'cash' ? 'font-medium' : ''}>
                      Pay at Clinic
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <div>
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="text-lg font-semibold text-gray-900">₹{doctor.appointmentCharge}</p>
                </div>
                <button
                  onClick={handleBookAppointment}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 relative">
            <button
              onClick={() => setShowReviewModal(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full transition-all duration-200"
            >
              <X className="h-6 w-6" />
            </button>
            
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Write a Review</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating
                </label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setNewReview(prev => ({ ...prev, rating }))}
                      className="focus:outline-none transform hover:scale-110 transition-transform duration-200"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          rating <= newReview.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Review
                </label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Share your experience with this doctor..."
                />
              </div>

              <button
                onClick={handleAddReview}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DoctorProfile;