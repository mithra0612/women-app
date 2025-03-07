import React from 'react';
import { Phone, Shield, UserCheck, ShieldAlert, HelpCircle } from 'lucide-react';
import 'animate.css';

// Helpline data
const helplines = [
  {
    title: "Women In Distress",
    number: "1091",
    color: "bg-pink-100",
    description: "24/7 emergency helpline for women facing immediate threats or dangerous situations. Provides immediate assistance and connects to local authorities.",
    icon: <Shield className="h-6 w-6 text-pink-600" />
  },
  {
    title: "Women Helpline Domestic Abuse",
    number: "181",
    color: "bg-purple-100",
    description: "Dedicated helpline for victims of domestic violence. Offers counseling, legal advice, and connects survivors with support services.",
    icon: <ShieldAlert className="h-6 w-6 text-purple-600" />
  },
  {
    title: "Police",
    number: "112",
    secondaryNumber: "100",
    color: "bg-blue-100",
    description: "Emergency police response number. Call for immediate assistance in case of crime, emergency, or threat to life. Available 24/7 across India.",
    icon: <UserCheck className="h-6 w-6 text-blue-600" />
  },
  {
    title: "National Commission For Women",
    number: "7827170170",
    color: "bg-rose-100",
    description: "24/7 helpline specifically dedicated to handling cases of domestic violence, sexual harassment, and women's rights violations.",
    icon: <HelpCircle className="h-6 w-6 text-rose-600" />
  },
  {
    title: "Student / Child Helpline",
    number: "1098",
    color: "bg-yellow-100",
    description: "Free emergency phone service for children in need of care and protection. Responds to children facing abuse, harassment, or emergency situations.",
    icon: <Shield className="h-6 w-6 text-yellow-600" />
  },
  {
    title: "National Human Rights Commission",
    number: "011-23385368",
    secondaryNumber: "9810298900",
    color: "bg-green-100",
    description: "Official channel for reporting human rights violations. Handles complaints related to human rights abuses and provides legal assistance.",
    icon: <ShieldAlert className="h-6 w-6 text-green-600" />
  },
  {
    title: "Tamil Nadu Women Helpline",
    number: "044-28592750",
    color: "bg-orange-100",
    description: "State-specific helpline for women in Tamil Nadu. Provides local support, counseling, and immediate assistance in emergency situations.",
    icon: <UserCheck className="h-6 w-6 text-orange-600" />
  }
];

const handleCall = (number) => {
  window.location.href = `tel:${number}`;
};

const Supports = () => {
  return (
    <div className="flex pt-20">
      {/* Sidebar Space */}
      <div className="w-[250px]"></div>

      {/* Helplines Content */}
      <div className="flex-1 p-4 ml-[-270px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-[-85px]">
          {helplines.map((helpline, index) => (
            <div 
              key={index} 
              className={`animate__animated animate__fadeInUp ${helpline.color} rounded-lg shadow-xl p-5 flex flex-col justify-between transform hover:scale-105 hover:shadow-2xl hover:transition-all duration-300 ease-in-out`}
            >
              <div className="flex items-center mb-4">
                {helpline.icon}
                <h3 className="text-lg font-bold text-gray-800 ml-3">{helpline.title}</h3>
              </div>
              <p className="text-sm text-gray-700 mb-5">{helpline.description}</p>
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => handleCall(helpline.number)}
                  className="flex items-center justify-center gap-2 bg-white text-black rounded-lg p-4 shadow-lg hover:bg-green-100 hover:shadow-xl transition-all ease-in-out animate__animated animate__pulse animate__infinite"
                >
                  <Phone className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-md">{helpline.number}</span>
                </button>
                {helpline.secondaryNumber && (
                  <button
                    onClick={() => handleCall(helpline.secondaryNumber)}
                    className="flex items-center justify-center gap-2 bg-white text-black rounded-lg p-4 shadow-lg hover:bg-green-100 hover:shadow-xl transition-all ease-in-out animate__animated animate__pulse animate__infinite"
                  >
                    <Phone className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-md">{helpline.secondaryNumber}</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Supports;
