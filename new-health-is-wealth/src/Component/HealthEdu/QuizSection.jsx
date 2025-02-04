import React, { useState } from 'react';
import { Award, Timer, BookOpen } from 'lucide-react';

const quizzes = [
    {
        id: 1,
        title: "Nutrition Knowledge",
        type: "nutrition",
        questions: [
            {
                question: "What is the recommended daily water intake for adults?",
                options: ["2-3 liters", "1 liter", "5 liters", "0.5 liters"],
                correct: 0,
            },
            {
                question: "Which of these is not a macronutrient?",
                options: ["Protein", "Vitamins", "Carbohydrates", "Fats"],
                correct: 1,
            },
            {
                question: "Which vitamin is produced when skin is exposed to sunlight?",
                options: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin E"],
                correct: 2,
            },
            {
                question: "Which food group should form the largest portion of your diet?",
                options: ["Proteins", "Fruits and Vegetables", "Grains", "Dairy"],
                correct: 1,
            },
            {
                question: "What is the main function of fiber in diet?",
                options: ["Energy source", "Digestive health", "Muscle building", "Brain function"],
                correct: 1,
            },
            {
                question: "Which nutrient is most important for blood cell formation?",
                options: ["Iron", "Calcium", "Sodium", "Potassium"],
                correct: 0,
            },
            {
                question: "How many calories should an average adult consume daily?",
                options: ["1000-1500", "2000-2500", "3000-3500", "4000-4500"],
                correct: 1,
            },
            {
                question: "Which food is the best source of omega-3 fatty acids?",
                options: ["Chicken", "Beef", "Fish", "Pork"],
                correct: 2,
            },
            {
                question: "What is the recommended daily protein intake for adults?",
                options: ["0.8g per kg", "2g per kg", "3g per kg", "4g per kg"],
                correct: 0,
            },
            {
                question: "Which meal is considered the most important of the day?",
                options: ["Breakfast", "Lunch", "Dinner", "Snacks"],
                correct: 0,
            }
        ],
    },
    {
        id: 2,
        title: "Exercise and Fitness",
        type: "exercise",
        questions: [
            {
                question: "How many minutes of moderate exercise is recommended weekly?",
                options: ["50 minutes", "150 minutes", "250 minutes", "350 minutes"],
                correct: 1,
            },
            {
                question: "What type of exercise builds muscle strength?",
                options: ["Aerobic", "Flexibility", "Resistance", "Balance"],
                correct: 2,
            },
            {
                question: "What is the best exercise for cardiovascular health?",
                options: ["Weight lifting", "Yoga", "Aerobic exercise", "Stretching"],
                correct: 2,
            },
            {
                question: "How often should you rest between strength training sessions?",
                options: ["24-48 hours", "1 hour", "1 week", "No rest needed"],
                correct: 0,
            },
            {
                question: "What is the purpose of warming up before exercise?",
                options: ["Prevent injury", "Build muscle", "Lose weight", "Save time"],
                correct: 0,
            },
            {
                question: "Which exercise is best for improving flexibility?",
                options: ["Running", "Weight lifting", "Yoga", "Swimming"],
                correct: 2,
            },
            {
                question: "What is the recommended duration for a warm-up?",
                options: ["5-10 minutes", "20-30 minutes", "45 minutes", "1 hour"],
                correct: 0,
            },
            {
                question: "Which is not a benefit of regular exercise?",
                options: ["Better sleep", "Improved mood", "Instant weight loss", "Stronger bones"],
                correct: 2,
            },
            {
                question: "What is the best time to exercise?",
                options: ["Morning", "Afternoon", "Evening", "Any time that suits you"],
                correct: 3,
            },
            {
                question: "How many steps per day are recommended for good health?",
                options: ["5,000", "10,000", "15,000", "20,000"],
                correct: 1,
            }
        ],
    },
    {
        id: 3,
        title: "Mental Health",
        type: "mental",
        questions: [
            {
                question: "What is mindfulness?",
                options: ["Future planning", "Past reflection", "Present moment awareness", "Sleeping technique"],
                correct: 2,
            },
            {
                question: "How many hours of sleep are recommended for adults?",
                options: ["4-5 hours", "6-7 hours", "7-9 hours", "10-12 hours"],
                correct: 2,
            },
            {
                question: "Which is a symptom of anxiety?",
                options: ["Rapid heartbeat", "Fever", "Rash", "Muscle growth"],
                correct: 0,
            },
            {
                question: "What is a good stress management technique?",
                options: ["Deep breathing", "Isolation", "Overworking", "Skipping meals"],
                correct: 0,
            },
            {
                question: "Which activity can improve mental health?",
                options: ["Social isolation", "Regular exercise", "Irregular sleep", "Skipping meals"],
                correct: 1,
            },
            {
                question: "What is emotional intelligence?",
                options: ["IQ score", "Managing emotions", "Mathematical ability", "Physical strength"],
                correct: 1,
            },
            {
                question: "Which is not a healthy coping mechanism?",
                options: ["Exercise", "Meditation", "Substance abuse", "Talking to friends"],
                correct: 2,
            },
            {
                question: "What is the first step in managing stress?",
                options: ["Ignoring it", "Identifying triggers", "Sleeping more", "Exercise"],
                correct: 1,
            },
            {
                question: "How often should you practice relaxation techniques?",
                options: ["Never", "Monthly", "Weekly", "Daily"],
                correct: 3,
            },
            {
                question: "What is a sign of good mental health?",
                options: ["Mood swings", "Resilience", "Isolation", "Perfectionism"],
                correct: 1,
            }
        ],
    }
];

const QuizSection = () => {
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [currentQuiz, setCurrentQuiz] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);

    const handleTopicSelect = (quiz) => {
        setSelectedTopic(quiz);
        setCurrentQuiz(quiz);
        setCurrentQuestionIndex(0);
        setScore(0);
        setShowResults(false);
        setSelectedAnswer(null);
    };

    const handleAnswer = (answerIndex) => {
        setSelectedAnswer(answerIndex);
    };

    const handleNext = () => {
        if (selectedAnswer === currentQuiz.questions[currentQuestionIndex].correct) {
            setScore(score + 1);
        }

        if (currentQuestionIndex === currentQuiz.questions.length - 1) {
            setShowResults(true);
        } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
        }
    };

    const handleRetry = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setShowResults(false);
        setSelectedAnswer(null);
    };

    const handleNewQuiz = () => {
        setSelectedTopic(null);
        setCurrentQuiz(null);
        setCurrentQuestionIndex(0);
        setScore(0);
        setShowResults(false);
        setSelectedAnswer(null);
    };

    if (!selectedTopic) {
        return (
            <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="p-4 sm:p-6 md:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
                            Choose a Quiz Topic
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {quizzes.map((quiz) => (
                                <button
                                    key={quiz.id}
                                    onClick={() => handleTopicSelect(quiz)}
                                    className="p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all text-left"
                                >
                                    <BookOpen className="w-8 h-8 text-blue-500 mb-3" />
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        {quiz.title}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {quiz.questions.length} questions
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (showResults) {
        return (
            <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="p-4 sm:p-6 md:p-8 text-center">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Award className="w-8 h-8 sm:w-10 sm:h-10 text-green-500" />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-semibold mb-2">
                            Quiz Completed!
                        </h2>
                        <p className="text-gray-600 text-lg mb-6">
                            You scored {score} out of {currentQuiz.questions.length}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={handleRetry}
                                className="inline-flex items-center px-6 py-3 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                            >
                                Try Again
                            </button>
                            <button
                                onClick={handleNewQuiz}
                                className="inline-flex items-center px-6 py-3 rounded-lg font-medium bg-gray-600 text-white hover:bg-gray-700 transition-colors"
                            >
                                Choose New Topic
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const currentQuestion = currentQuiz.questions[currentQuestionIndex];

    return (
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 sm:p-6 md:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
                            {currentQuiz.title}
                        </h2>
                        <div className="flex items-center gap-2 text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                            <Timer className="w-4 h-4" />
                            <span className="text-sm">
                                Question {currentQuestionIndex + 1}/{currentQuiz.questions.length}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-lg sm:text-xl text-gray-800 font-medium">
                            {currentQuestion.question}
                        </h3>

                        <div className="space-y-3">
                            {currentQuestion.options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAnswer(index)}
                                    className={`w-full p-4 text-left rounded-lg border transition-all ${
                                        selectedAnswer === index
                                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                    }`}
                                >
                                    <span className="block text-base sm:text-lg">{option}</span>
                                </button>
                            ))}
                        </div>

                        <div className="flex justify-between items-center">
                            <button
                                onClick={handleNewQuiz}
                                className="text-gray-600 hover:text-gray-900"
                            >
                                Choose Different Topic
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={selectedAnswer === null}
                                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                                    selectedAnswer === null
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-blue-600 text-white hover:bg-blue-700'
                                }`}
                            >
                                {currentQuestionIndex === currentQuiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizSection;
