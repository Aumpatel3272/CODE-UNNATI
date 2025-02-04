/* eslint-disable react/prop-types */
"use client"

import { useState } from "react"
import { Search, MapPin } from "lucide-react"

// interface SearchBarProps {
//   onSearch: (location: string) => void
// }

export default function SearchBar({ onSearch }) {
  const [location, setLocation] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(location)
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8 animate-fade-in-up animation-delay-300">
      <div className="relative">
        <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter your location"
          className="w-full pl-12 pr-24 py-4 rounded-full border-2 border-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent shadow-md text-lg"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition duration-300 ease-in-out flex items-center gap-2 shadow-md"
        >
          <Search size={20} />
          <span className="font-semibold">Search</span>
        </button>
      </div>
    </form>
  )
}

