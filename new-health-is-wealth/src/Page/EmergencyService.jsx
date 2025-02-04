import { useState } from "react"
import SearchBar from "../Component/EmergencyService/SearchBar"
import ResultsList from "../Component/EmergencyService/ResultsList"
import EmergencyHero from "../Component/EmergencyService/EmergencyHero"
import QuickActions from "../Component/EmergencyService/QuickAction"

export default function EmergencyServices() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    setLoading(true)
    // Mock API call - replace with actual API call in production
    setTimeout(() => {
      const mockResults = [
        {
          id: 1,
          name: "City General Hospital",
          address: "123 Main St, Cityville, ST 12345",
          phone: "(555) 123-4567",
          distance: "1.2 miles",
          waitTime: "15 minutes",
          services: ["Emergency Room", "Trauma Center", "Pediatric Care"],
          coordinates: { lat: 40.7128, lng: -74.006 },
        },
        {
          id: 2,
          name: "County Emergency Care",
          address: "456 Oak Ave, Townsburg, ST 67890",
          phone: "(555) 987-6543",
          distance: "2.5 miles",
          waitTime: "30 minutes",
          services: ["Urgent Care", "X-ray", "Lab Services"],
          coordinates: { lat: 40.7282, lng: -73.9942 },
        },
        {
          id: 3,
          name: "Urgent Care Clinic",
          address: "789 Pine Rd, Villageton, ST 13579",
          phone: "(555) 246-8135",
          distance: "0.8 miles",
          waitTime: "5 minutes",
          services: ["Walk-in Clinic", "Vaccinations", "Minor Injuries"],
          coordinates: { lat: 40.7112, lng: -74.0154 },
        },
      ]
      setResults(mockResults)
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="bg-gradient-to-b from-red-50 to-white">
      <EmergencyHero />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8 text-gray-800 animate-fade-in-up">
            Find Nearby Emergency Services
          </h2>
          <SearchBar onSearch={handleSearch} />
          <QuickActions />
          <ResultsList results={results} loading={loading} />
        </div>
      </div>
    </div>
  )
}

