import React from "react";
import {
  Play,
  ThumbsUp,
  Share2,
  BookmarkPlus,
} from "lucide-react";

const VideoSection = () => {
  const videos = [
    {
      id: 1,
      title: "Understanding Heart Health",
      thumbnail:
        "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800",
      duration: "10:25",
      views: "2.5k",
      author: "Dr. Sarah Johnson",
    },
    {
      id: 2,
      title: "Stress Management Techniques",
      thumbnail:
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800",
      duration: "15:30",
      views: "1.8k",
      author: "Dr. Michael Chen",
    },
    {
      id: 3,
      title: "Nutrition Basics",
      thumbnail:
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800",
      duration: "12:45",
      views: "3.2k",
      author: "Dr. Emily Brown",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <div
          key={video.id}
          className="bg-white rounded-lg shadow-sm overflow-hidden"
        >
          <div className="relative">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
              {video.duration}
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-2">{video.title}</h3>
            <p className="text-gray-600 text-sm mb-3">{video.author}</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4" />
                <span>{video.views} views</span>
              </div>
              <div className="flex items-center gap-3">
                <button className="hover:text-gray-700">
                  <ThumbsUp className="w-4 h-4" />
                </button>
                <button className="hover:text-gray-700">
                  <Share2 className="w-4 h-4" />
                </button>
                <button className="hover:text-gray-700">
                  <BookmarkPlus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoSection;
