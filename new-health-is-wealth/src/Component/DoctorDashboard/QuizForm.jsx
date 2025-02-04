import { useState } from "react"
import {  Trash2, Edit2, Save,  Book, ListPlus } from "lucide-react"

export default function QuizForm() {
  const [quizzes, setQuizzes] = useState([])
  const [currentQuiz, setCurrentQuiz] = useState({
    id: Date.now(),
    title: "",
    description: "",
    questions: [],
  })
  const [currentQuestion, setCurrentQuestion] = useState({
    id: Date.now(),
    text: "",
    options: ["", "", "", ""],
    correctOption: 0,
  })
  const [showPreview, setShowPreview] = useState(false)

  const addQuestion = () => {
    if (!currentQuestion.text || currentQuestion.options.some(opt => !opt)) {
      alert("Please fill in all fields for the question")
      return
    }
    setCurrentQuiz({
      ...currentQuiz,
      questions: [...currentQuiz.questions, currentQuestion],
    })
    setCurrentQuestion({
      id: Date.now(),
      text: "",
      options: ["", "", "", ""],
      correctOption: 0,
    })
  }

  const saveQuiz = () => {
    if (!currentQuiz.title) {
      alert("Please add a quiz title")
      return
    }
    if (currentQuiz.questions.length === 0) {
      alert("Please add at least one question")
      return
    }
    setQuizzes([...quizzes, currentQuiz])
    setCurrentQuiz({
      id: Date.now(),
      title: "",
      description: "",
      questions: [],
    })
    setShowPreview(false)
  }

  const deleteQuiz = (quizId) => {
    setQuizzes(quizzes.filter(quiz => quiz.id !== quizId))
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Quiz Creation Form */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Book className="h-6 w-6 text-blue-600 mr-2" />
              <h3 className="text-xl font-semibold text-gray-900">Create Quiz</h3>
            </div>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-full hover:bg-blue-100"
            >
              {showPreview ? "Edit Mode" : "Preview"}
            </button>
          </div>

          {!showPreview ? (
            <div className="space-y-6">
              {/* Quiz Details */}
              <div className="grid gap-4">
                <div>
                  <label htmlFor="quiz-title" className="block text-sm font-medium text-gray-700 mb-1">
                    Quiz Title
                  </label>
                  <input
                    type="text"
                    id="quiz-title"
                    value={currentQuiz.title}
                    onChange={(e) => setCurrentQuiz({ ...currentQuiz, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter quiz title..."
                  />
                </div>
                <div>
                  <label htmlFor="quiz-description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description (Optional)
                  </label>
                  <textarea
                    id="quiz-description"
                    value={currentQuiz.description}
                    onChange={(e) => setCurrentQuiz({ ...currentQuiz, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="2"
                    placeholder="Add a description for your quiz..."
                  />
                </div>
              </div>

              {/* Current Question */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="mb-4">
                  <label htmlFor="question-text" className="block text-sm font-medium text-gray-700 mb-1">
                    Question
                  </label>
                  <input
                    type="text"
                    id="question-text"
                    value={currentQuestion.text}
                    onChange={(e) => setCurrentQuestion({ ...currentQuestion, text: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your question..."
                  />
                </div>

                <div className="grid gap-3">
                  {currentQuestion.options.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="flex-1">
                        <label
                          htmlFor={`option-${index}`}
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Option {index + 1}
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id={`option-${index}`}
                            value={option}
                            onChange={(e) => {
                              const newOptions = [...currentQuestion.options]
                              newOptions[index] = e.target.value
                              setCurrentQuestion({ ...currentQuestion, options: newOptions })
                            }}
                            className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder={`Option ${index + 1}...`}
                          />
                          <div className="absolute right-2 top-1/2 -translate-y-1/2">
                            <input
                              type="radio"
                              name="correct-option"
                              value={index}
                              checked={currentQuestion.correctOption === index}
                              onChange={() => setCurrentQuestion({ ...currentQuestion, correctOption: index })}
                              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    onClick={addQuestion}
                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <ListPlus className="h-5 w-5 mr-2" />
                    Add Question
                  </button>
                </div>
              </div>

              {/* Added Questions Preview */}
              {currentQuiz.questions.length > 0 && (
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Added Questions</h4>
                  <div className="space-y-3">
                    {currentQuiz.questions.map((question, qIndex) => (
                      <div key={question.id} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Q{qIndex + 1}: {question.text}</p>
                            <div className="mt-1 space-y-1">
                              {question.options.map((opt, oIndex) => (
                                <div key={oIndex} className="flex items-center">
                                  <span className={`w-4 h-4 mr-2 rounded-full ${
                                    question.correctOption === oIndex ? 'bg-green-500' : 'bg-gray-200'
                                  }`} />
                                  <span className="text-sm text-gray-600">{opt}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              const newQuestions = [...currentQuiz.questions]
                              newQuestions.splice(qIndex, 1)
                              setCurrentQuiz({ ...currentQuiz, questions: newQuestions })
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Save Quiz Button */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={saveQuiz}
                  className="inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <Save className="h-5 w-5 mr-2" />
                  Save Quiz
                </button>
              </div>
            </div>
          ) : (
            /* Quiz Preview Mode */
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{currentQuiz.title}</h2>
                {currentQuiz.description && (
                  <p className="mt-2 text-gray-600">{currentQuiz.description}</p>
                )}
              </div>
              
              <div className="space-y-6">
                {currentQuiz.questions.map((question, qIndex) => (
                  <div key={question.id} className="bg-gray-50 rounded-lg p-4">
                    <p className="font-medium text-gray-900 mb-4">
                      {qIndex + 1}. {question.text}
                    </p>
                    <div className="space-y-3">
                      {question.options.map((option, oIndex) => (
                        <label
                          key={oIndex}
                          className={`block p-3 border rounded-lg cursor-pointer transition-colors ${
                            question.correctOption === oIndex
                              ? 'bg-green-50 border-green-200'
                              : 'bg-white border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center">
                            <input
                              type="radio"
                              name={`question-${question.id}`}
                              value={oIndex}
                              disabled
                              checked={question.correctOption === oIndex}
                              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                            <span className="ml-3">{option}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Saved Quizzes */}
      {quizzes.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Saved Quizzes</h3>
            <div className="grid gap-4">
              {quizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <h4 className="font-medium text-gray-900">{quiz.title}</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      {quiz.questions.length} question{quiz.questions.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setCurrentQuiz(quiz)
                        setShowPreview(false)
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                      title="Edit Quiz"
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => deleteQuiz(quiz.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                      title="Delete Quiz"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
