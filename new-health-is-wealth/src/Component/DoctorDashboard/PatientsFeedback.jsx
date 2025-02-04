import { useState } from "react"
import { Star, MessageCircle, ThumbsUp } from "lucide-react"


export default function PatientFeedback() {
  const [feedbacks, setFeedbacks] = useState([
    { id: 1, patientName: "Alice Brown", date: "2025-03-14", rating: 5, comment: "Excellent care and attention!" },
    { id: 2, patientName: "Charlie Davis", date: "2025-03-13", rating: 4, comment: "Very good experience overall." },
    {
      id: 3,
      patientName: "Eva Green",
      date: "2025-03-12",
      rating: 5,
      comment: "Dr. Smith was very thorough and patient.",
    },
  ])

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Recent Patient Feedback</h2>
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="space-y-6">
            {feedbacks.map((feedback) => (
              <div key={feedback.id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{feedback.patientName}</span>
                  <span className="text-sm text-gray-500">{feedback.date}</span>
                </div>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < feedback.rating ? "text-yellow-400" : "text-gray-300"}`}
                      fill={i < feedback.rating ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-3">{feedback.comment}</p>
                <div className="flex items-center space-x-4">
                  <button className="flex items-center text-blue-600 hover:text-blue-800">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    <span className="text-sm">Reply</span>
                  </button>
                  <button className="flex items-center text-green-600 hover:text-green-800">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    <span className="text-sm">Thank</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">
              View All Feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

