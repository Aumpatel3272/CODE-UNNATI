import { useState } from "react"
import { Video, FileText, Lightbulb, Plus, Edit, Trash2 } from "lucide-react"
import QuizForm from "./QuizForm"


export default function HealthEducation() {
  const [educationItems, setEducationItems] = useState([
    { id: 1, type: "video", title: "Understanding Diabetes", content: "https://example.com/diabetes-video" },
    {
      id: 2,
      type: "article",
      title: "Benefits of Regular Exercise",
      content: "Regular exercise has numerous benefits for both physical and mental health.",
    },
    { id: 3, type: "tip", title: "Stay Hydrated", content: "Drink at least 8 glasses of water daily." },
  ])

  const [activeTab, setActiveTab] = useState("content")

  const getIcon = (type) => {
    switch (type) {
      case "video":
        return <Video className="h-6 w-6 text-blue-500" />
      case "article":
        return <FileText className="h-6 w-6 text-green-500" />
      case "tip":
        return <Lightbulb className="h-6 w-6 text-yellow-500" />
    }
  }

  const [newItem, setNewItem] = useState({
    type: "video",
    title: "",
    content: "",
  })

  const handleAddItem = (e) => {
    e.preventDefault()
    setEducationItems([...educationItems, { ...newItem, id: Date.now() }])
    setNewItem({ type: "video", title: "", content: "" })
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Health Education Resources</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab("content")}
            className={`px-4 py-2 rounded-md ${
              activeTab === "content" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Content
          </button>
          <button
            onClick={() => setActiveTab("quiz")}
            className={`px-4 py-2 rounded-md ${
              activeTab === "quiz" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Quizzes
          </button>
        </div>
      </div>

      {activeTab === "content" ? (
        <>
          <form onSubmit={handleAddItem} className="mb-6 bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  id="type"
                  value={newItem.type}
                  onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="video">Video</option>
                  <option value="article">Article</option>
                  <option value="tip">Health Tip</option>
                </select>
              </div>
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={newItem.title}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
              <textarea
                id="content"
                value={newItem.content}
                onChange={(e) => setNewItem({ ...newItem, content: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              ></textarea>
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Item
              </button>
            </div>
          </form>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {educationItems.map((item) => (
              <div key={item.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    {getIcon(item.type)}
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Edit className="h-5 w-5" />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-3">{item.content}</p>
                </div>
                <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
                  <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-800">
                    View details
                  </a>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <QuizForm />
      )}
    </div>
  )
}
