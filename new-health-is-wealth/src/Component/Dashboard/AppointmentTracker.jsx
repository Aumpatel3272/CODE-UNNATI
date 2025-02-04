/* eslint-disable no-unused-vars */
import React, { useState } from "react"
import { format } from "date-fns"
import { CreditCard, Wallet, CheckCircle, XCircle, Clock } from 'lucide-react';

const appointments = [
  {
    id: 1,
    patientName: "John Doe",
    doctorName: "Dr. Smith",
    date: new Date(),
    time: "10:00 AM",
    status: "confirmed",
    paymentStatus: "paid",
    paymentMethod: "online"
  },
  {
    id: 2,
    patientName: "Jane Doe",
    doctorName: "Dr. Jones",
    date: new Date(),
    time: "2:00 PM",
    status: "pending",
    paymentStatus: "unpaid",
    paymentMethod: "cash"
  },
  {
    id: 3,
    patientName: "Mike Johnson",
    doctorName: "Dr. Wilson",
    date: new Date(),
    time: "4:30 PM",
    status: "confirmed",
    paymentStatus: "paid",
    paymentMethod: "online"
  },
]

export function AppointmentTracker() {
  const [appointmentList, setAppointmentList] = useState(appointments)

  const handleDateChange = (id, newDate) => {
    setAppointmentList((prevList) =>
      prevList.map((appointment) => (appointment.id === id ? { ...appointment, date: newDate } : appointment)),
    )
  }

  const getStatusBadge = (status) => {
    const baseClass = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    switch (status) {
      case "confirmed":
        return `${baseClass} bg-green-100 text-green-800`;
      case "pending":
        return `${baseClass} bg-yellow-100 text-yellow-800`;
      case "rejected":
        return `${baseClass} bg-red-100 text-red-800`;
      default:
        return baseClass;
    }
  };

  const getPaymentStatusBadge = (status, method) => {
    const baseClass = "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium";
    if (status === "paid") {
      return (
        <span className={`${baseClass} bg-green-100 text-green-800`}>
          {method === "online" ? <CreditCard className="w-3 h-3" /> : <Wallet className="w-3 h-3" />}
          Paid
        </span>
      );
    }
    return (
      <span className={`${baseClass} bg-red-100 text-red-800`}>
        <XCircle className="w-3 h-3" />
        Unpaid
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg border">
      <div className="p-4 md:p-6">
        <h2 className="text-lg font-semibold mb-4">Appointment Tracker</h2>
        <div className="overflow-x-auto -mx-4 md:mx-0">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden md:rounded-lg">
              {/* Mobile View */}
              <div className="md:hidden space-y-4">
                {appointmentList.map((appointment) => (
                  <div key={appointment.id} className="bg-white p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{appointment.patientName}</h3>
                        <p className="text-sm text-gray-500">{appointment.doctorName}</p>
                      </div>
                      <div>
                        <span className={getStatusBadge(appointment.status)}>
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <input
                          type="date"
                          value={format(appointment.date, "yyyy-MM-dd")}
                          onChange={(e) => handleDateChange(appointment.id, new Date(e.target.value))}
                          className="border rounded px-2 py-1 text-sm"
                        />
                        <span className="text-sm text-gray-500">{appointment.time}</span>
                      </div>
                      <div className="flex justify-end items-center pt-2">
                        {getPaymentStatusBadge(appointment.paymentStatus, appointment.paymentMethod)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop View */}
              <table className="hidden md:table min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Patient Name</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Doctor Name</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Time</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Payment Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {appointmentList.map((appointment) => (
                    <tr key={appointment.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm">{appointment.patientName}</td>
                      <td className="py-3 px-4 text-sm">{appointment.doctorName}</td>
                      <td className="py-3 px-4 text-sm">
                        <input
                          type="date"
                          value={format(appointment.date, "yyyy-MM-dd")}
                          onChange={(e) => handleDateChange(appointment.id, new Date(e.target.value))}
                          className="border rounded px-2 py-1"
                        />
                      </td>
                      <td className="py-3 px-4 text-sm">{appointment.time}</td>
                      <td className="py-3 px-4 text-sm">
                        <span className={getStatusBadge(appointment.status)}>
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {getPaymentStatusBadge(appointment.paymentStatus, appointment.paymentMethod)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
