import React, { useState, useRef } from 'react';
import Image1 from '../../assets/image1.jpg';
import Image2 from '../../assets/image2.jpg';
import Image3 from '../../assets/image3.jpg';
import Image4 from '../../assets/image4.jpg';
import Image5 from '../../assets/image5.jpg';
import Image6 from '../../assets/image6.jpg';
import Image7 from '../../assets/image7.jpg';
import Image8 from '../../assets/image8.jpg';
import Step1 from '../../assets/step1.jpg';
import Step2 from '../../assets/step2.jpg';
import Step3 from '../../assets/step3.jpg';
import Step4 from '../../assets/step4.jpg';
import Step5 from '../../assets/step5.jpg';
import Step6 from '../../assets/step6.jpg';
import Step7 from '../../assets/step7.jpg';
import Step8 from '../../assets/step8.jpg';
import S1 from '../../assets/s1.jpg';
import S2 from '../../assets/s2.jpg';
import S3 from '../../assets/s3.jpg';
import S4 from '../../assets/s4.jpg';
import S5 from '../../assets/s5.jpg';
import S6 from '../../assets/s6.jpg';
import S7 from '../../assets/s7.jpg';
import I1 from '../../assets/i1.jpg';
import I2 from '../../assets/i2.jpg';
import I3 from '../../assets/i3.jpg';
import I4 from '../../assets/i4.jpg';
import I5 from '../../assets/i5.jpg';
import Sidebar from '../../components/Sidebar/Sidebar';

const Sanitarys = () => {
  const [activeTab, setActiveTab] = useState('videos');
  const [activeGuide, setActiveGuide] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const scrollRef = useRef(null);

  const educationalVideos = [
    {
      id: 'J6bZsI1pi_o',
      title: 'Understanding Menstrual Products',
      thumbnail: "https://img.youtube.com/vi/J6bZsI1pi_o/maxresdefault.jpg",
      category: 'Getting Started'
    },
    {
      id: '6UykBMEEtRw',
      title: 'How to Use Tampons',
      thumbnail: "https://img.youtube.com/vi/6UykBMEEtRw/maxresdefault.jpg",
      category: 'Product Types'
    },
    {
      id: 'o9fPUfm-uYE',
      title: 'Menstrual cup Usage Guide',
      thumbnail: "https://img.youtube.com/vi/o9fPUfm-uYE/maxresdefault.jpg",
      category: 'How-To Guides'
    },
    {
      id: 'Xmh1GfY3k2E',
      title: 'Menstrual cup & Disc Usage Guide',
      thumbnail: "https://img.youtube.com/vi/Xmh1GfY3k2E/maxresdefault.jpg",
      category: 'How-To Guides'
    },
    {
      id: 'oAuvNxCnWOw',
      title: 'Sustainable Period Products',
      thumbnail: "https://img.youtube.com/vi/oAuvNxCnWOw/maxresdefault.jpg",
      category: 'Product Types'
    },
    {
      id: 'Dgo7oF5Nkoc',
      title: 'Best period products',
      thumbnail: "https://img.youtube.com/vi/Dgo7oF5Nkoc/maxresdefault.jpg",
      category: 'Wellness Tips'
    }
  ];

  const infographicGuides = [
    {
      id: 'pads',
      title: 'How to Use Pads',
      description: 'A step-by-step guide for using menstrual pads properly',
      image: Image1,
      color: 'from-pink-400 to-purple-500',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4M12 4v16" />
        </svg>
      ),
      steps: [
        { id: 1, title: "Choose the Right Pad", description: "Choose a pad of the appropriate thickness, absorbency, shape and style.", image: Image1, tips: ["Different flows need different absorbencies", "Consider wings for better protection", "Overnight pads are longer for sleeping positions"] },
        { id: 2, title: "Get in Position", description: "Get in a comfortable position that gives you access to place the pad.", image: Image2, tips: ["Sitting on a toilet works well", "Standing with one foot elevated is another option", "Make sure you have enough privacy and time"] },
        { id: 3, title: "Unwrap the Pad", description: "Remove any wrappers or boxes from the pad.", image: Image3, tips: ["Keep the wrapper for disposal later", "Be careful not to tear the pad", "Some pads have pull tabs to make unwrapping easier"] },
        { id: 4, title: "Prepare the Pad", description: "Unfold the wings and take off the backing that covers the adhesive on the center.", image: Image4, tips: ["Don't remove wing adhesive backings yet", "Make sure pad is fully unfolded", "Check that the pad isn't twisted"] },
        { id: 5, title: "Attach to Underwear", description: "Stick the adhesive parts to your underwear.", image: Image5, tips: ["Center the pad in the underwear", "Press firmly to secure adhesive", "Wrap wings around the underwear edges and stick"] },
        { id: 6, title: "Wear Normally", description: "Wear your underwear as usual.", image: Image6, tips: ["Make sure the pad feels secure", "Adjust if it feels uncomfortable", "The wider end typically goes toward the back"] },
        { id: 7, title: "Choose Comfortable Clothes", description: "Opt for more comfortable clothes.", image: Image8, tips: ["Loose-fitting clothes reduce pad visibility", "Dark-colored bottoms can help with leak anxiety", "Cotton fabrics are breathable and comfortable"] },
        { id: 8, title: "Always Wash Your Hands", description: "Wash your hands before and after changing your pad.", image: Image7, tips: ["Use soap and warm water", "Wash for at least 20 seconds", "This prevents spreading germs and infections"] }
      ]
    },
    {
      id: 'tampons',
      title: 'How to Use Tampons',
      description: 'Learn the proper way to insert and remove tampons safely',
      image: Step8,
      color: 'from-blue-400 to-indigo-500',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ),
      steps: [
        { id: 1, title: "Wash Your Hands", description: "Wash your hands before opening the tampon wrapper.", image: Step1, tips: ["Use soap and warm water", "Wash for at least 20 seconds", "This prevents introducing bacteria"] },
        { id: 2, title: "Get Comfortable", description: "Sit or stand in a comfortable position.", image: Step2, tips: ["Try sitting on the toilet with knees apart", "Some prefer standing with one foot on the toilet", "Find what works best for you"] },
        { id: 3, title: "Hold the Tampon Correctly", description: "Hold the tampon with the fingers you write with.", image: Step3, tips: ["Grip the middle of the applicator", "Hold it at the grip marks if present", "Make sure the string hangs down freely"] },
        { id: 4, title: "Find Your Vagina", description: "Explore your body with your fingers to find your vagina.", image: Step4, tips: ["The vaginal opening is between the urethra and anus", "Using a mirror can help locate it", "Take your time and be gentle"] },
        { id: 5, title: "Insert the Tampon", description: "Press the tip of the tampon into your vagina.", image: Step5, tips: ["Aim toward your lower back, not straight up", "Insert at a slight angle", "Relax your muscles to make insertion easier"] },
        { id: 6, title: "Push the Plunger", description: "Push the plunger in with your index finger.", image: Step6, tips: ["Push it all the way in", "This moves the tampon into the correct position", "The outer tube should be inside the vaginal opening before pushing"] },
        { id: 7, title: "Remove the Applicator", description: "Take out the applicator with your thumb and middle finger.", image: Step7, tips: ["The string should hang outside your body", "You shouldn't feel the tampon if it's in correctly", "Dispose of the applicator in the trash"] }
      ]
    },
    {
      id: 'cups',
      title: 'How to Use Menstrual Cups',
      description: 'Master the techniques for using menstrual cups effectively',
      image: S1, // Updated from placeholder
      color: 'from-green-400 to-teal-500',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      steps: [
        { id: 1, title: "Wash Your Hands", description: "Wash your hands thoroughly before touching the cup.", image: S1, tips: ["Use soap and warm water", "Wash for at least 20 seconds", "This prevents introducing bacteria"] },
        { id: 2, title: "Wash the Cup", description: "Wash your cup with a mild soap before using it the first time.", image: S2, tips: ["Use unscented, mild soap", "Rinse thoroughly to remove all soap residue", "Boil the cup for 5 minutes before first use for sterilization"] },
        { id: 3, title: "Get Into Position", description: "Squat or raise one leg up on the toilet.", image: S3, tips: ["Squatting helps open the vaginal canal", "You can also try sitting on the toilet", "Find a comfortable position that works for you"] },
        { id: 4, title: "Fold the Cup", description: "Fold the cup to make it easier to insert.", image: S4, tips: ["Try the C-fold or Punch-down fold", "Hold it firmly to keep the fold in place", "Experiment with different folds to find the easiest one for you"] },
        { id: 5, title: "Relax Your Muscles", description: "Relax your muscles as much as you can.", image: S5, tips: ["Tension can make insertion more difficult", "Take deep breaths to stay calm", "Try inserting the cup in the shower for added comfort"] },
        { id: 6, title: "Insert the Cup", description: "Insert the cup into your vagina, angling it toward your tailbone.", image: S6, tips: ["Push it in gently until the entire cup is inside", "Make sure the stem is not sticking out too much", "You may need to wiggle it slightly to adjust placement"] },
        { id: 7, title: "Ensure a Proper Seal", description: "Twist the cup to make sure it seals properly.", image: S7, tips: ["Rotate the cup slightly to ensure it's fully open", "Run a finger around the base to check for folds", "A sealed cup prevents leaks and stays in place"] }
      ]
    },
    {
      id: 'period-underwear',
      title: 'How to dispose a used pad',
      description: 'Tips for disposing pads in a correct way',
      image: I1, // Updated from placeholder
      color: 'from-yellow-400 to-orange-500',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      steps: [
        { id: 1, title: "Remove the Used Pad", description: "Remove the used pad from your underwear and roll it up.", image: I1, tips: ["Peel the pad off gently to avoid tearing", "Fold it in half with the sticky side inside", "This makes disposal easier"] },
        { id: 2, title: "Wrap the Pad", description: "Wrap the pad in a piece of paper.", image: I2, tips: ["Use toilet paper or the wrapper from a new pad", "Wrapping helps contain any odor", "Avoid flushing the pad as it can clog drains"] },
        { id: 3, title: "Dispose of the Pad", description: "Put the wrapped pad in the garbage can.", image: I3, tips: ["Use a bin with a lid to minimize odor", "Dispose of it in a designated sanitary waste bin if available", "Avoid throwing it in an open trash can"] },
        { id: 4, title: "Wash Your Hands", description: "Wash your hands when you are done.", image: I4, tips: ["Use soap and warm water", "Wash for at least 20 seconds", "This helps prevent the spread of bacteria"] },
        { id: 5, title: "Take Out the Trash", description: "Take out the garbage bag with the used pad in it as soon as possible.", image: I5, tips: ["Dispose of the trash regularly to prevent odor", "Use a small bag that can be changed frequently", "Consider using biodegradable disposal bags"] }
      ]
    }
  ];

  const getVideosByCategory = (category) => {
    return educationalVideos.filter(video => video.category === category);
  };

  const categories = [...new Set(educationalVideos.map(video => video.category))];

  const openVideo = (videoId) => {
    setSelectedVideo(videoId);
    document.body.style.overflow = 'hidden';
  };

  const closeVideo = () => {
    setSelectedVideo(null);
    document.body.style.overflow = 'auto';
  };

  const openGuide = (guideId) => {
    setActiveGuide(guideId);
    setCurrentStep(1);
    document.body.style.overflow = 'hidden';
  };

  const closeGuide = () => {
    setActiveGuide(null);
    document.body.style.overflow = 'auto';
  };

  const getCurrentGuide = () => {
    return infographicGuides.find(guide => guide.id === activeGuide) || null;
  };

  const nextStep = () => {
    const guide = getCurrentGuide();
    if (guide && currentStep < guide.steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getCurrentStep = () => {
    const guide = getCurrentGuide();
    return guide?.steps.find(step => step.id === currentStep) || null;
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <Sidebar />
      <div className="flex-1 p-6 ml-40">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-purple-800 mb-2">Sanitary Products Education</h1>
          <p className="text-gray-600 mb-6">Learn everything you need to know about menstrual products and how to use them.</p>
          
          <div className="flex space-x-2 mb-6">
            <button
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${activeTab === 'videos' ? 'bg-purple-600 text-white shadow-md' : 'bg-white text-purple-600 hover:bg-purple-100'}`}
              onClick={() => setActiveTab('videos')}
            >
              Video Guides
            </button>
            <button
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${activeTab === 'infographic' ? 'bg-purple-600 text-white shadow-md' : 'bg-white text-purple-600 hover:bg-purple-100'}`}
              onClick={() => setActiveTab('infographic')}
            >
              Product Guides
            </button>
          </div>

          {activeTab === 'videos' && (
            <div className="mt-6 transition-all duration-500 ease-in-out">
              {categories.map(category => (
                <div key={category} className="mb-10">
                  <h2 className="text-xl font-semibold text-purple-700 mb-4">{category}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getVideosByCategory(category).map(video => (
                      <div key={video.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 transition-transform duration-300 group">
                        <div className="relative pb-[56.25%] overflow-hidden">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="absolute w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button
                              className="bg-white bg-opacity-90 text-purple-700 rounded-full p-3 transform hover:scale-110 transition-transform duration-300 scale-75 group-hover:scale-100"
                              onClick={() => openVideo(video.id)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div
                          className="p-4 cursor-pointer"
                          onClick={() => openVideo(video.id)}
                        >
                          <h3 className="font-medium text-lg text-purple-800 mb-2">{video.title}</h3>
                          <p className="text-gray-600 text-sm">Learn about proper usage techniques and health tips</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'infographic' && (
            <div className="mx-auto transition-all duration-500 ease-in-out">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {infographicGuides.map(guide => (
                  <div
                    key={guide.id}
                    className="relative h-64 rounded-2xl overflow-hidden shadow-lg cursor-pointer transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl group"
                    onClick={() => guide.steps.length > 0 && openGuide(guide.id)}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${guide.color} opacity-90`}></div>
                    <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-2xl font-bold mb-2">{guide.title}</h3>
                          <p className="text-white text-opacity-90">{guide.description}</p>
                        </div>
                        <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                          {guide.icon}
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="bg-white text-gray-800 rounded-full px-4 py-1 text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                          {guide.steps.length > 0 ? 'Start Guide' : 'Coming Soon'}
                        </span>
                        <span className="bg-white bg-opacity-20 rounded-full flex items-center justify-center w-10 h-10 group-hover:bg-white group-hover:text-purple-600 transition-all duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-5xl max-h-screen">
            <div className="flex justify-end mb-4">
              <button
                className="text-white hover:text-purple-300 focus:outline-none transition-colors duration-300"
                onClick={closeVideo}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-xl">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {activeGuide && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-6xl max-h-screen overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-purple-800">{getCurrentGuide()?.title}</h2>
              <button
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={closeGuide}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto" ref={scrollRef}>
              {getCurrentStep() && (
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2 h-64 md:h-auto relative">
                    <img
                      src={getCurrentStep().image}
                      alt={getCurrentStep().title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 md:hidden">
                      <h3 className="text-white text-xl font-bold">{getCurrentStep().title}</h3>
                    </div>
                  </div>
                  <div className="md:w-1/2 p-6 bg-gradient-to-br from-purple-50 to-pink-50">
                    <div className="bg-white rounded-xl shadow-md p-6">
                      <span className="inline-block bg-purple-100 text-purple-800 rounded-full px-3 py-1 text-sm font-semibold mb-3">
                        Step {currentStep} of {getCurrentGuide().steps.length}
                      </span>
                      <h3 className="text-2xl font-bold text-purple-900 mb-4 hidden md:block">{getCurrentStep().title}</h3>
                      <p className="text-gray-700 mb-6 text-lg">{getCurrentStep().description}</p>
                      <div className="bg-purple-50 rounded-lg p-4 mb-6">
                        <h4 className="font-medium text-purple-800 mb-2">Helpful Tips</h4>
                        <ul className="space-y-2">
                          {getCurrentStep().tips.map((tip, index) => (
                            <li key={index} className="flex items-start">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              <span className="text-gray-700">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex justify-between">
                        <button
                          className={`px-4 py-2 rounded-lg flex items-center ${currentStep === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-purple-700 hover:bg-purple-100'}`}
                          onClick={prevStep}
                          disabled={currentStep === 1}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Previous
                        </button>
                        {currentStep < getCurrentGuide().steps.length ? (
                          <button
                            className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-purple-700"
                            onClick={nextStep}
                          >
                            Next
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                          </button>
                        ) : (
                          <button
                            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700"
                            onClick={closeGuide}
                          >
                            Finish
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / getCurrentGuide()?.steps.length) * 100}%` }}
                ></div>
              </div>
              <div className="flex mt-3 overflow-x-auto pb-2">
                {getCurrentGuide()?.steps.map(step => (
                  <button
                    key={step.id}
                    onClick={() => setCurrentStep(step.id)}
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-2 transition-all duration-300 ${
                      currentStep === step.id
                        ? 'bg-purple-600 text-white'
                        : step.id < currentStep
                          ? 'bg-purple-100 text-purple-600'
                          : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step.id}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sanitarys;