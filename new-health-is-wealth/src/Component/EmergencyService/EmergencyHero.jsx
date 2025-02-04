import { Ambulance, AmbulanceIcon as FirstAid } from "lucide-react"

export default function EmergencyHero() {
  return (
    <div className="bg-red-600 text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-up">
              Emergency Services at Your Fingertips
            </h1>
            <p className="text-xl mb-6 animate-fade-in-up animation-delay-200">
              Quick access to nearby hospitals, urgent care, and emergency facilities.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-64 h-64 animate-float">
              <div className="absolute inset-0 bg-white bg-opacity-20 rounded-full"></div>
              <div className="absolute inset-4 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                <Ambulance size={100} className="text-red-600" />
              </div>
              <FirstAid size={32} className="absolute top-0 right-0 animate-pulse" />
              <FirstAid size={32} className="absolute bottom-0 left-0 animate-pulse animation-delay-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

