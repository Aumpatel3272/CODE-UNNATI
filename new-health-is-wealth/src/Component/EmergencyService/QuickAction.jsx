/* eslint-disable react/prop-types */
import { Phone, Stethoscope, Pill } from "lucide-react"

export default function QuickActions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
      <QuickActionCard
        icon={<Phone size={24} />}
        title="Emergency Call"
        description="Call 911 for immediate assistance"
        action={() => (window.location.href = "tel:911")}
      />
      <QuickActionCard
        icon={<Stethoscope size={24} />}
        title="Find a Doctor"
        description="Search for nearby medical professionals"
        action={() => console.log("Find a Doctor")}
      />
      <QuickActionCard
        icon={<Pill size={24} />}
        title="Pharmacy Locator"
        description="Find 24/7 pharmacies in your area"
        action={() => console.log("Pharmacy Locator")}
      />
    </div>
  )
}

function QuickActionCard({ icon, title, description, action }) {
  return (
    <div
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 cursor-pointer animate-fade-in-up"
      onClick={action}
    >
      <div className="flex items-center mb-4">
        <div className="bg-red-100 p-3 rounded-full mr-4">{icon}</div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

