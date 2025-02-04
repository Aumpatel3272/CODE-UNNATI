import React, { useState } from "react";
import {
  Phone,
  ChevronRight,
  ChevronDown,
  Moon,
  AlertCircle,
  HeartIcon,
  Utensils,
  Brain
} from "lucide-react";

const HealthTipsSection = () => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [expandedTip, setExpandedTip] = useState(null);

  const healthCategories = [
    {
      id: "emergency",
      title: "Emergency First Aid",
      icon: <AlertCircle className="w-6 h-6 text-red-500" />,
      color: "red",
      tips: [
        {
          title: "CPR Steps",
          content: [
            "Check the scene for safety",
            "Check responsiveness",
            "Call emergency services (911)",
            "Check breathing",
            "Begin chest compressions",
            "30 compressions to 2 breaths ratio",
            "Continue until help arrives",
          ],
          urgency: "Critical",
          callToAction: "Call Emergency: 911",
        },
        {
          title: "Choking Response",
          content: [
            "Identify signs of choking",
            "Stand behind the person",
            "Wrap your arms around their waist",
            "Make a fist above their navel",
            "Give quick, upward thrusts",
            "Repeat until object is expelled",
          ],
          urgency: "Critical",
          callToAction: "Call Emergency: 911",
        },
        {
          title: "Severe Bleeding",
          content: [
            "Apply direct pressure",
            "Use clean cloth or gauze",
            "Elevate the injured area",
            "Apply pressure bandage",
            "Keep person warm and calm",
            "Monitor vital signs",
          ],
          urgency: "Critical",
          callToAction: "Seek Immediate Medical Care",
        },
      ],
    },
    {
      id: "daily",
      title: "Daily Wellness",
      icon: <HeartIcon className="w-6 h-6 text-pink-500" />,
      color: "pink",
      tips: [
        {
          title: "Morning Routine",
          content: [
            "Drink water upon waking",
            "Stretch for 5-10 minutes",
            "Eat a balanced breakfast",
            "Take prescribed medications",
            "Practice deep breathing",
          ],
        },
        {
          title: "Posture Care",
          content: [
            "Keep screen at eye level",
            "Shoulders back and relaxed",
            "Feet flat on the floor",
            "Take standing breaks hourly",
            "Stretch neck and shoulders",
          ],
        },
      ],
    },
    {
      id: "nutrition",
      title: "Nutrition Guide",
      icon: <Utensils className="w-6 h-6 text-green-500" />,
      color: "green",
      tips: [
        {
          title: "Balanced Plate",
          content: [
            "½ plate vegetables",
            "¼ plate lean protein",
            "¼ plate whole grains",
            "Include healthy fats",
            "Drink water with meals",
          ],
        },
        {
          title: "Healthy Snacking",
          content: [
            "Choose fruits and nuts",
            "Control portion sizes",
            "Avoid processed foods",
            "Stay hydrated",
            "Plan snacks ahead",
          ],
        },
      ],
    },
    {
      id: "mental",
      title: "Mental Health",
      icon: <Brain className="w-6 h-6 text-purple-500" />,
      color: "purple",
      tips: [
        {
          title: "Stress Management",
          content: [
            "Practice deep breathing",
            "Take regular breaks",
            "Connect with others",
            "Limit screen time",
            "Practice mindfulness",
          ],
        },
        {
          title: "Anxiety Relief",
          content: [
            "Use 5-4-3-2-1 grounding",
            "Progressive muscle relaxation",
            "Write your thoughts",
            "Talk to someone",
            "Practice self-care",
          ],
        },
      ],
    },
    {
      id: "sleep",
      title: "Sleep Hygiene",
      icon: <Moon className="w-6 h-6 text-blue-500" />,
      color: "blue",
      tips: [
        {
          title: "Bedtime Routine",
          content: [
            "Consistent sleep schedule",
            "Dark and cool room",
            "Avoid screens 1 hour before bed",
            "Relaxing activities",
            "Limit caffeine after 2 PM",
          ],
        },
      ],
    },
  ];

  const getCategoryColor = (color) => {
    const colors = {
      red: "bg-red-50 border-red-200 hover:bg-red-100",
      pink: "bg-pink-50 border-pink-200 hover:bg-pink-100",
      green: "bg-green-50 border-green-200 hover:bg-green-100",
      purple: "bg-purple-50 border-purple-200 hover:bg-purple-100",
      blue: "bg-blue-50 border-blue-200 hover:bg-blue-100",
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-6">
      {/* Emergency Contact Banner */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Phone className="w-6 h-6 text-red-500" />
          <div>
            <h3 className="font-semibold text-red-700">Emergency Services</h3>
            <p className="text-red-600">
              Call 911 for immediate medical assistance
            </p>
          </div>
        </div>
        <a
          href="tel:911"
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Call Now
        </a>
      </div>

      {/* Categories */}
      <div className="grid gap-6">
        {healthCategories.map((category) => (
          <div
            key={category.id}
            className="rounded-lg border shadow-sm overflow-hidden"
          >
            <button
              onClick={() =>
                setExpandedCategory(
                  expandedCategory === category.id ? null : category.id
                )
              }
              className={`w-full p-4 flex items-center justify-between text-left ${getCategoryColor(
                category.color
              )}`}
            >
              <div className="flex items-center gap-3">
                {category.icon}
                <h3 className="font-semibold text-gray-800">
                  {category.title}
                </h3>
              </div>
              {expandedCategory === category.id ? (
                <ChevronDown className="w-5 h-5" />
              ) : (
                <ChevronRight className="w-5 h-5" />
              )}
            </button>

            {expandedCategory === category.id && (
              <div className="bg-white p-4 space-y-4">
                {category.tips.map((tip, index) => (
                  <div
                    key={index}
                    className="border rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() =>
                        setExpandedTip(
                          expandedTip === `${category.id}-${index}`
                            ? null
                            : `${category.id}-${index}`
                        )
                      }
                      className="w-full p-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100"
                    >
                      <span className="font-medium">{tip.title}</span>
                      {expandedTip === `${category.id}-${index}` ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </button>

                    {expandedTip === `${category.id}-${index}` && (
                      <div className="p-4 space-y-2">
                        {tip.urgency && (
                          <div className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm inline-block mb-2">
                            {tip.urgency}
                          </div>
                        )}
                        <ul className="space-y-2">
                          {tip.content.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-gray-400 mt-1">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                        {tip.callToAction && (
                          <div className="mt-4">
                            <a
                              href={
                                tip.callToAction.toLowerCase().includes("911")
                                  ? "tel:911"
                                  : "#"
                              }
                              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 inline-block"
                            >
                              {tip.callToAction}
                            </a>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthTipsSection;
