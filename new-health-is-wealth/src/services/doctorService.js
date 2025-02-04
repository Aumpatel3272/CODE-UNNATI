// Fetch doctors data from the API
export const fetchDoctors = async () => {
  try {
    const response = await fetch('http://localhost:5000/doctors');
    if (!response.ok) {
      throw new Error('Failed to fetch doctor data');
    }
    const data = await response.json();
    // Return the data array directly if it's an array, otherwise return an empty array
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return []; // Return empty array on error
  }
};

// Get a single doctor by ID
export const getDoctorById = async (doctorId) => {
  try {
    const response = await fetch(`http://localhost:5000/doctors/${doctorId}`);
    if (!response.ok) {
      throw new Error('Doctor not found');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching doctor:', error);
    return null;
  }
};
