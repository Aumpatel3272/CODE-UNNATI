import React, { useState } from 'react';
import { MessageSquare, Send, Loader2, User, Bot, Heart, Brain, Moon, Salad } from 'lucide-react';

const HealthAssistant = () => {
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: 'Hello! I\'m your AI health assistant. Here are some important health tips to keep in mind:',
      cards: [
        {
          icon: <Heart className="w-6 h-6 text-red-500" />,
          title: "Physical Activity",
          content: "Aim for 150 minutes of moderate exercise or 75 minutes of vigorous exercise weekly. Regular movement improves heart health and mood.",
          color: "bg-red-50 border-red-200"
        },
        {
          icon: <Brain className="w-6 h-6 text-purple-500" />,
          title: "Mental Wellness",
          content: "Practice daily mindfulness or meditation. Take regular breaks and maintain a healthy work-life balance.",
          color: "bg-purple-50 border-purple-200"
        },
        {
          icon: <Moon className="w-6 h-6 text-blue-500" />,
          title: "Sleep Hygiene",
          content: "Get 7-9 hours of quality sleep. Maintain a consistent sleep schedule and create a relaxing bedtime routine.",
          color: "bg-blue-50 border-blue-200"
        },
        {
          icon: <Salad className="w-6 h-6 text-green-500" />,
          title: "Nutrition",
          content: "Eat a balanced diet rich in fruits, vegetables, and whole grains. Stay hydrated with 8 glasses of water daily.",
          color: "bg-green-50 border-green-200"
        }
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'I understand your concern. While I can provide general health information, please consult with a healthcare professional for personalized medical advice.'
      }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg border border-blue-100 mb-4">
          <div className="border-b border-blue-100 bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-t-lg">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-blue-500" />
              <h1 className="text-xl font-semibold text-blue-800">AI Health Assistant</h1>
            </div>
          </div>
          
          <div className="h-[600px] flex flex-col bg-gray-50 rounded-b-lg">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div key={index}>
                  <div className={`flex items-start gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {message.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Bot className="w-5 h-5 text-blue-600" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${
                        message.role === 'user'
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-tr-none'
                          : 'bg-white text-gray-800 rounded-tl-none border border-blue-100'
                      }`}
                    >
                      {message.content}
                    </div>
                    {message.role === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>
                  {message.cards && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 ml-10">
                      {message.cards.map((card, cardIndex) => (
                        <div 
                          key={cardIndex}
                          className={`p-4 rounded-lg border ${card.color} transition-transform duration-200 hover:scale-105`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            {card.icon}
                            <h3 className="font-semibold text-gray-800">{card.title}</h3>
                          </div>
                          <p className="text-sm text-gray-600">{card.content}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-blue-100 shadow-sm">
                    <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-blue-100 bg-white rounded-b-lg">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your health-related question..."
                  className="flex-1 p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-blue-50/50"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 shadow-sm"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Note: This AI assistant provides general health information only. 
                Always consult healthcare professionals for medical advice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthAssistant;