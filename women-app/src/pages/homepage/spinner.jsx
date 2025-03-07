import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import Sidebar from "../../components/Sidebar/Sidebar";
import { Outlet } from 'react-router-dom';

const colors = [
  "#FFDDC1", "#FFABAB", "#FFC3A0", "#D5AAFF", "#85E3FF", "#B9FBC0", "#AFCBFF"
];

const labels = [
  "Menstruation", 
  "Pregnancy & Fertility", 
  "Hormonal Health", 
  "Reproductive Health", 
  "Breast Health", 
  "Mental Health", 
  "Menopause"
];

// Mapping labels to route paths
const paths = {
  "Menstruation": "/periods",
  "Pregnancy & Fertility": "/pregnancy",
  "Hormonal Health": "/hormonal",
  "Reproductive Health": "/reproductive",
  "Breast Health": "/breast",
  "Mental Health": "/mental",
  "Menopause": "/menopause"
};

const Spinners = () => {
  const [rotation, setRotation] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  const spinWheel = () => {
    const spins = Math.floor(Math.random() * 5) + 3;
    const extraRotation = Math.floor(Math.random() * 360);
    const newRotation = rotation + spins * 360 + extraRotation;

    setRotation(newRotation);

    setTimeout(() => {
      const finalAngle = newRotation % 360;
      const segmentAngle = 360 / labels.length;
      const correctedAngle = (360 - finalAngle + 90 + 180) % 360;
      const index = Math.floor(correctedAngle / segmentAngle) % labels.length;
      const chosenCategory = labels[index];

      // Show message
      setSelectedCategory(chosenCategory);

      // Navigate to the selected category after 20 seconds
      setTimeout(() => {
        navigate(paths[chosenCategory]);
      }, 1000); // 20 seconds delay
    }, 3000);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-white p-6 animate-fade-in">
      {/* Sidebar Component */}
      <div className="w-[250px]">
        <Sidebar />
      </div>
      
      <h1 className="text-2xl font-extrabold text-gray-800 mb-6 drop-shadow-xl ml-40">
        Burst the Myth: Spin to Know!
      </h1>

      {/* Spinning Wheel */}
      <div className="relative w-96 h-96 shadow-2xl rounded-full border-4 border-gray-500 overflow-hidden ml-40">
        <div
          className="absolute w-full h-full rounded-full transition-transform duration-[3s] ease-out"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {colors.map((color, index) => {
            const angle = (index * 2 * Math.PI) / labels.length;
            const midAngle = angle + Math.PI / labels.length;
            const textX = 50 + 25 * Math.cos(midAngle);
            const textY = 50 + 25 * Math.sin(midAngle);
            return (
              <div
                key={index}
                className="absolute w-full h-full opacity-90 hover:opacity-100 transition-opacity duration-200"
                style={{
                  backgroundColor: color,
                  clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos(angle)}% ${50 + 50 * Math.sin(angle)}%, ${50 + 50 * Math.cos(((index + 1) * 2 * Math.PI) / labels.length)}% ${50 + 50 * Math.sin(((index + 1) * 2 * Math.PI) / labels.length)}%)`
                }}
              >
                <span
                  className="absolute text-black text-xs font-semibold text-center"
                  style={{
                    top: `${textY}%`,
                    left: `${textX}%`,
                    transform: `translate(-50%, -50%) rotate(${(midAngle * 180) / Math.PI}deg)`,
                    whiteSpace: "nowrap"
                  }}
                >
                  {labels[index]}
                </span>
              </div>
            );
          })}
        </div>

        {/* Arrow Pointer */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[24px] border-transparent border-b-red-600"></div>
        </div>
      </div>

      {/* Spin Button */}
      <button
        onClick={spinWheel}
        className="mt-6 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-transform duration-200 active:scale-95 ml-40"
      >
        Spin
      </button>

      {/* Selected Category Message */}
      {selectedCategory && (
        <div className="mt-6 text-xl font-bold text-gray-700 animate-fade-in ml-40">
          You chose: <span className="text-purple-600">{selectedCategory}</span>

        </div>
      )}
      <Outlet />
    </div>
  );
};

export default Spinners;