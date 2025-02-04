/* eslint-disable react/prop-types */
import { MapPin, Phone, Clock, List, Loader } from "lucide-react"

// interface Result {
//   id: number
//   name: string
//   address: string
//   phone: string
//   distance: string
//   waitTime: string
//   services: string[]
//   coordinates: { lat: number; lng: number }
// }

// interface ResultsListProps {
//   results: Result[]
//   loading: boolean
// }

export default function ResultsList({ results, loading }) {
  if (loading) {
    return (
      <div className="text-center text-gray-600 py-12 animate-pulse">
        <Loader size={48} className="mx-auto mb-4 animate-spin" />
        <p className="text-xl">Searching for nearby emergency services...</p>
      </div>
    )
  }

  return (
    <div className="animate-fade-in-up animation-delay-500">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Nearby Hospitals and Emergency Care</h2>
      {results.length === 0 ? (
        <p className="text-gray-600 text-center py-12">No results found. Please enter a location to search.</p>
      ) : (
        <ul className="space-y-8">
          {results.map((result, index) => (
            <li
              key={result.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h3 className="text-2xl font-semibold text-red-600 mb-4">{result.name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <p className="flex items-center gap-3 text-gray-600">
                    <MapPin size={20} className="text-red-500" />
                    {result.address}
                  </p>
                  <p className="flex items-center gap-3 text-gray-600">
                    <Phone size={20} className="text-red-500" />
                    {result.phone}
                  </p>
                  <p className="flex items-center gap-3 text-gray-600">
                    <Clock size={20} className="text-red-500" />
                    Estimated wait time: <span className="font-semibold">{result.waitTime}</span>
                  </p>
                </div>
                <div className="space-y-3">
                  <p className="text-gray-600">
                    Distance: <span className="font-semibold">{result.distance}</span>
                  </p>
                  <div className="flex items-start gap-3 text-gray-600">
                    <List size={20} className="mt-1 text-red-500" />
                    <ul className="list-disc list-inside">
                      {result.services.map((service, index) => (
                        <li key={index}>{service}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${result.coordinates.lat},${result.coordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300 shadow-md"
                >
                  View on Google Maps
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

