import React, { useState } from 'react';
import { CheckCircle, Circle, AlertCircle, ChevronLeft, ChevronRight, Info, Lightbulb, Recycle, Leaf, DropletOff, Heart } from 'lucide-react';
import Sidebar from '../../components/Sidebar/Sidebar'; // Import Sidebar

const Openwastes = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [showImpact, setShowImpact] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  
  const disposalSteps = [
    {
      icon: "alert",
      title: "Waste Becomes Unmanaged",
      description: "The pad is thrown into an open landfill or dumped on the streets. No proper waste segregation happens, and it mixes with other plastic waste.",
      impact: "It remains exposed to the environment, attracts stray animals, and poses a public health hazard.",
    },
    {
      icon: "alert",
      title: "Stray Animals Scatter the Waste",
      description: "Stray dogs, cows, or rodents tear the pad apart while searching for food. Used sanitary pads often contain blood and bodily fluids, which can spread infections.",
      impact: "Animals ingest plastic fibers, causing intestinal blockages or even death. The waste spreads to roads, parks, and water drains.",
    },
    {
      icon: "alert",
      title: "Microplastics Enter the Soil & Water",
      description: "Sanitary pads contain 90% plastic. Over time, exposure to sunlight, rain, and bacteria breaks them down into microplastics.",
      impact: "Microplastics contaminate soil and groundwater, making it unsafe for drinking and reducing soil fertility.",
    },
    {
      icon: "alert",
      title: "Polluted Soil Affects Agriculture",
      description: "Farmers unknowingly grow food in contaminated soil. Plastic toxins enter crops, vegetables, and fruits.",
      impact: "Food becomes less nutritious. Long-term exposure to toxins can cause hormonal imbalances, digestive issues, and other diseases.",
    },
    {
      icon: "alert",
      title: "Toxic Waste Ends Up in Oceans",
      description: "Rainwater washes microplastic particles into rivers and oceans, where marine life consumes them.",
      impact: "Plastic enters the food chain, affecting seafood consumers. It disrupts marine ecosystems and kills aquatic animals.",
    },
    {
      icon: "alert",
      title: "The Vicious Cycle Continues",
      description: "Because of improper disposal practices, the same process repeats, worsening pollution and health hazards.",
      impact: "More landfills overflow, leading to long-term health impacts on entire populations.",
    },
  ];

  const solutionSteps = [
    {
      icon: <Recycle className="w-8 h-8 text-green-600" />,
      title: "Proper Waste Segregation",
      description: "Wrap used sanitary pads in newspaper or biodegradable bags before disposal. Keep them separate from regular waste.",
      benefit: "Prevents exposure to the environment and reduces scattering by animals."
    },
    {
      icon: <Leaf className="w-8 h-8 text-green-600" />,
      title: "Switch to Eco-Friendly Alternatives",
      description: "Use biodegradable pads, menstrual cups, or cloth pads that have a much lower environmental impact.",
      benefit: "Reduces plastic waste by 90% and decreases your carbon footprint significantly."
    },
    {
      icon: <DropletOff className="w-8 h-8 text-blue-600" />,
      title: "Support Proper Disposal Infrastructure",
      description: "Advocate for proper sanitary waste collection and disposal facilities in your community.",
      benefit: "Creates systemic change and ensures waste is treated properly at scale."
    },
    {
      icon: <Heart className="w-8 h-8 text-red-600" />,
      title: "Spread Awareness",
      description: "Educate others about the environmental impact of improper sanitary waste disposal and share alternatives.",
      benefit: "Multiplies your positive impact and helps create a cultural shift toward sustainable practices."
    }
  ];

  const getIcon = (index) => {
    if (index < activeStep) {
      return <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-green-500" />;
    } else if (index === activeStep) {
      return <Circle className="w-6 h-6 md:w-8 md:h-8 text-blue-600 fill-blue-600" />;
    } else {
      return <AlertCircle className="w-6 h-6 md:w-8 md:h-8 text-gray-300" />;
    }
  };

  const nextStep = () => {
    if (activeStep < disposalSteps.length - 1) {
      setActiveStep(activeStep + 1);
      setShowImpact(false);
    }
  };

  const prevStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
      setShowImpact(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      {/* Sidebar Section */}
      <div className="w-[250px] bg-white shadow-md">
        <Sidebar />
      </div>

      {/* Main Content Section */}
      <div className="flex-1 flex flex-col justify-center items-center p-6">
        <div className="w-full max-w-5xl bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-xl p-6 border border-blue-100 mb-6">
          <h2 className="text-lg md:text-xl font-bold text-center text-blue-800 mb-6">
            Environmental Impact of Improper Disposal
          </h2>
          
          <div className="flex flex-col">
            {disposalSteps.map((step, index) => (
              <div key={index} className={`flex transition-all duration-300 ease-in-out ${index === activeStep ? 'scale-100' : 'scale-95 opacity-80'}`}>
                {/* Left side - icons and line */}
                <div className="flex flex-col items-center">
                  <div 
                    className={`flex justify-center items-center w-10 h-10 md:w-12 md:h-12 rounded-full shadow-md cursor-pointer transition-all duration-300 
                    ${index === activeStep ? 'bg-blue-100 ring-4 ring-blue-200' : (index < activeStep ? 'bg-green-100' : 'bg-gray-100')}`}
                    onClick={() => setActiveStep(index)}
                  >
                    {getIcon(index)}
                  </div>
                  {index < disposalSteps.length - 1 && (
                    <div className={`w-1 h-16 md:h-20 rounded-full transition-all duration-500 ${index < activeStep ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                  )}
                </div>
                
                {/* Right side - content */}
                <div 
                  className={`ml-3 md:ml-4 mb-4 p-2 md:p-3 rounded-lg cursor-pointer transition-all duration-300 flex-1
                    ${index === activeStep ? 'bg-white shadow-md border-l-4 border-blue-500' : 'hover:bg-white/50'}
                  `}
                  onClick={() => setActiveStep(index)}
                >
                  <h4 className={`text-sm md:text-base font-semibold ${index === activeStep ? 'text-blue-800' : 'text-gray-700'}`}>
                    {step.title}
                  </h4>
                  
                  {index === activeStep && (
                    <div className="mt-2 transition-all duration-500 ease-in-out">
                      <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                        {step.description}
                      </p>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setShowImpact(!showImpact); }} 
                        className="mt-2 md:mt-3 flex items-center text-xs md:text-sm font-medium text-blue-600 hover:text-blue-800"
                      >
                        <Info className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                        {showImpact ? 'Hide Impact' : 'Show Impact'}
                      </button>
                      {showImpact && (
                        <div className="mt-2 text-xs md:text-sm bg-red-50 p-2 md:p-3 rounded-md border-l-4 border-red-400 text-red-900">
                          <strong>Impact:</strong> {step.impact}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between items-center mt-4">
            <button 
              onClick={prevStep}
              disabled={activeStep === 0}
              className={`px-4 py-2 rounded-lg flex items-center text-sm transition-all duration-300
                ${activeStep === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'}`}
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Previous
            </button>

            <span className="text-sm font-medium text-gray-500">{activeStep + 1} of {disposalSteps.length}</span>

            <button 
              onClick={nextStep}
              disabled={activeStep === disposalSteps.length - 1}
              className={`px-4 py-2 rounded-lg flex items-center text-sm transition-all duration-300
                ${activeStep === disposalSteps.length - 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'}`}
            >
              Next
              <ChevronRight className="w-5 h-5 ml-1" />
            </button>
          </div>
        </div>
        
        {/* Bring a Change Button */}
        <button
          onClick={() => setShowSolution(!showSolution)}
          className="mx-auto px-6 py-3 mb-6 bg-gradient-to-r from-green-600 to-green-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center"
        >
          <Lightbulb className="w-5 h-5 mr-2" />
          {showSolution ? "Hide Solutions" : "Bring a Change"}
        </button>
        
        {/* Solutions Section */}
        {showSolution && (
          <div className="w-full max-w-5xl bg-gradient-to-br from-white to-green-50 rounded-xl shadow-xl p-6 border border-green-100 animate-fadeIn">
            <h2 className="text-lg md:text-xl font-bold text-center text-green-800 mb-6">
              Solutions for Responsible Waste Management
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {solutionSteps.map((solution, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-green-500 overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-center mb-3">
                      <div className="p-2 bg-green-50 rounded-full mr-3">
                        {solution.icon}
                      </div>
                      <h3 className="text-base md:text-lg font-semibold text-green-800">
                        {solution.title}
                      </h3>
                    </div>
                    
                    <p className="text-xs md:text-sm text-gray-700 mb-3">
                      {solution.description}
                    </p>
                    
                    <div className="bg-green-50 p-2 md:p-3 rounded-md text-xs md:text-sm text-green-800">
                      <strong>Benefit:</strong> {solution.benefit}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="text-md font-semibold text-blue-800 mb-2 flex items-center">
                <Info className="w-5 h-5 mr-2" />
                Start Today
              </h3>
              <p className="text-sm text-gray-700">
                Small changes in your daily habits can create a massive positive impact on the environment. Begin with one solution and gradually adopt more sustainable practices.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Openwastes;