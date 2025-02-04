import React, { useState } from 'react';
import ArticleSection from '../Component/HealthEdu/ArticleSection';
import VideoSection from '../Component/HealthEdu/VideoSection';
import HealthTipsSection from '../Component/HealthEdu/HealthTipsSection';
import QuizSection from '../Component/HealthEdu/QuizSection';

function HealthEdu() {
  const [activeTab, setActiveTab] = useState('articles');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const tabs = [
    { id: 'articles', label: 'Articles' },
    { id: 'videos', label: 'Videos' },
    { id: 'tips', label: 'Health Tips' },
    { id: 'quiz', label: 'Quiz' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'articles':
        return <ArticleSection />;
      case 'videos':
        return <VideoSection />;
      case 'tips':
        return <HealthTipsSection />;
      case 'quiz':
        return <QuizSection />;
      default:
        return <ArticleSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Responsive for all screens */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Health Education Center
            </h1>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden ${
          isMenuOpen ? 'block' : 'hidden'
        } bg-white border-b border-gray-200`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setIsMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:block bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-4 py-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default HealthEdu;