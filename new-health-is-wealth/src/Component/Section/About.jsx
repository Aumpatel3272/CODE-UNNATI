import React from "react";
import image5  from "../../assets/image5.jpg"



function About() {
  return (
    <div>
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src={image5}
              alt="About HealthIsWealth"
              className="rounded-lg shadow-xl"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">About HealthIsWealth</h2>
            <p className="text-gray-600 mb-8">
              HealthIsWealth is your comprehensive healthcare platform that
              connects you with experienced medical professionals, provides
              AI-powered health insights, and offers extensive health education
              resources. Our mission is to make quality healthcare accessible to
              everyone, anywhere, anytime.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-600">100+</h4>
                <p className="text-sm text-gray-600">Expert Doctors</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-600">50k+</h4>
                <p className="text-sm text-gray-600">Happy Patients</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
