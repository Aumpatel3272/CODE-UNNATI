import React, { useState } from 'react';
import { motion } from 'framer-motion';

const articles = [
    {
        id: 1,
        type: 'Nutrition',
        title: 'The Benefits of a Balanced Diet',
        summary: 'Discover how a well-balanced diet can improve your overall health and wellbeing.',
        content: 'A balanced diet provides your body with all the nutrients it needs to function properly...',
        imageUrl: '/images/balanced-diet.jpg',
    },
    {
        id: 2,
        type: 'Exercise',
        title: 'Getting Started with Home Workouts',
        summary: 'Learn effective exercises you can do at home without any equipment.',
        content: 'Home workouts are an excellent way to stay fit without needing a gym membership...',
        imageUrl: '/images/home-workout.jpg',
    },
    {
        id: 3,
        type: 'Mental Health',
        title: 'Stress Management Techniques',
        summary: 'Effective strategies to manage daily stress and improve mental wellness.',
        content: 'Managing stress is crucial for maintaining both mental and physical health...',
        imageUrl: '/images/stress-management.jpg',
    }
];

const ArticleSection = () => {
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [filter, setFilter] = useState('all');

    const filteredArticles = filter === 'all' 
        ? articles 
        : articles.filter(article => article.type.toLowerCase() === filter.toLowerCase());

    const handleReadMore = (article) => {
        setSelectedArticle(article);
    };

    const handleClose = () => {
        setSelectedArticle(null);
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
                {/* Filter Buttons */}
                <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded-full text-sm sm:text-base transition-colors ${
                            filter === 'all' 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        All Articles
                    </button>
                    {['Nutrition', 'Exercise', 'Mental Health'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setFilter(type)}
                            className={`px-4 py-2 rounded-full text-sm sm:text-base transition-colors ${
                                filter === type 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {filteredArticles.map((article) => (
                        <motion.div
                            key={article.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                        >
                            <div className="aspect-w-16 aspect-h-9">
                                <img
                                    src={article.imageUrl}
                                    alt={article.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-4 sm:p-6">
                                <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-2">
                                    {article.type}
                                </span>
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                                    {article.title}
                                </h3>
                                <p className="text-gray-600 text-sm sm:text-base mb-4">
                                    {article.summary}
                                </p>
                                <button
                                    onClick={() => handleReadMore(article)}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                                >
                                    Read More
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Article Modal */}
                {selectedArticle && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="relative">
                                <div className="aspect-w-16 aspect-h-9">
                                    <img
                                        src={selectedArticle.imageUrl}
                                        alt={selectedArticle.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <button
                                    onClick={handleClose}
                                    className="absolute top-4 right-4 p-2 rounded-full bg-white bg-opacity-80 text-gray-800 hover:bg-opacity-100 transition-colors"
                                >
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="p-4 sm:p-6">
                                <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-2">
                                    {selectedArticle.type}
                                </span>
                                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                                    {selectedArticle.title}
                                </h2>
                                <div className="prose prose-sm sm:prose max-w-none">
                                    <p className="text-gray-600">
                                        {selectedArticle.content}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ArticleSection;
