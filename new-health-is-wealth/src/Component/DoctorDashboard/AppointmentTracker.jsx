import { useState } from "react"
import { Calendar, Clock, DollarSign, CheckCircle, XCircle, Search} from "lucide-react"

export default function AppointmentTracker() {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: "John Doe",
      date: "2025-03-15",
      time: "10:00 AM",
      status: "scheduled",
      paymentStatus: "pending",
      paymentMethod: "online"
    },
    {
      id: 2,
      patientName: "Jane Smith",
      date: "2025-03-15",
      time: "11:30 AM",
      status: "scheduled",
      paymentStatus: "paid",
      paymentMethod: "cash"
    },
    {
      id: 3,
      patientName: "Bob Johnson",
      date: "2025-03-14",
      time: "2:00 PM",
      status: "completed",
      paymentStatus: "paid",
      paymentMethod: "online"
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [paymentFilter, setPaymentFilter] = useState("all")

  const updateAppointmentStatus = (id, newStatus) => {
    setAppointments(appointments.map((apt) => (apt.id === id ? { ...apt, status: newStatus } : apt)))
  }

  const updatePaymentStatus = (id, newPaymentStatus) => {
    setAppointments(appointments.map((apt) => (apt.id === id ? { ...apt, paymentStatus: newPaymentStatus } : apt)))
  }

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = apt.patientName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || apt.status === statusFilter
    const matchesPayment = paymentFilter === "all" || apt.paymentStatus === paymentFilter
    return matchesSearch && matchesStatus && matchesPayment
  })

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-50 text-blue-700 ring-blue-600/20"
      case "completed":
        return "bg-green-50 text-green-700 ring-green-600/20"
      case "cancelled":
        return "bg-red-50 text-red-700 ring-red-600/20"
      default:
        return "bg-gray-50 text-gray-700 ring-gray-600/20"
    }
  }

  const getPaymentStatusClass = (status) => {
    return status === "paid" 
      ? "bg-green-50 text-green-700 ring-green-600/20"
      : "bg-yellow-50 text-yellow-700 ring-yellow-600/20"
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Appointments</h2>
          
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              
              <select
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              >
                <option value="all">All Payments</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
        </div>

        {/* Mobile View */}
        <div className="block lg:hidden space-y-4">
          {filteredAppointments.map((appointment) => (
            <div key={appointment.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium text-gray-900">{appointment.patientName}</h3>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    {appointment.date} at {appointment.time}
                  </div>
                </div>
                <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${getStatusBadgeClass(appointment.status)}`}>
                  {appointment.status}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${getPaymentStatusClass(appointment.paymentStatus)}`}>
                  <DollarSign className="h-3 w-3 mr-1" />
                  {appointment.paymentStatus} ({appointment.paymentMethod})
                </span>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => updateAppointmentStatus(appointment.id, "completed")}
                    className="p-1 rounded-full hover:bg-green-100 text-green-600"
                  >
                    <CheckCircle className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => updateAppointmentStatus(appointment.id, "cancelled")}
                    className="p-1 rounded-full hover:bg-red-100 text-red-600"
                  >
                    <XCircle className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => updatePaymentStatus(appointment.id, appointment.paymentStatus === "paid" ? "pending" : "paid")}
                    className={`p-1 rounded-full ${
                      appointment.paymentStatus === "paid"
                        ? "hover:bg-yellow-100 text-yellow-600"
                        : "hover:bg-green-100 text-green-600"
                    }`}
                  >
                    <DollarSign className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View */}
        <div className="hidden lg:block">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAppointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{appointment.patientName}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-2" />
                        {appointment.date}
                        <Clock className="h-4 w-4 mx-2" />
                        {appointment.time}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${getStatusBadgeClass(appointment.status)}`}>
                        {appointment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${getPaymentStatusClass(appointment.paymentStatus)}`}>
                        <DollarSign className="h-3 w-3 mr-1" />
                        {appointment.paymentStatus}
                        <span className="ml-1 text-gray-500">({appointment.paymentMethod})</span>
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateAppointmentStatus(appointment.id, "completed")}
                          className="p-1 rounded-full hover:bg-green-100 text-green-600"
                          title="Mark as Completed"
                        >
                          <CheckCircle className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => updateAppointmentStatus(appointment.id, "cancelled")}
                          className="p-1 rounded-full hover:bg-red-100 text-red-600"
                          title="Cancel Appointment"
                        >
                          <XCircle className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => updatePaymentStatus(appointment.id, appointment.paymentStatus === "paid" ? "pending" : "paid")}
                          className={`p-1 rounded-full ${
                            appointment.paymentStatus === "paid"
                              ? "hover:bg-yellow-100 text-yellow-600"
                              : "hover:bg-green-100 text-green-600"
                          }`}
                          title="Toggle Payment Status"
                        >
                          <DollarSign className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
