import React, { useState, useRef, useEffect } from "react";
import Sidebar from '../../components/Sidebar/Sidebar';
const mythsAndFacts = [
        {
          "myth": "If a person has a mental health condition, it means the person has low intelligence.",
          "fact": "Mental illness, like physical illness, can affect anyone regardless of intelligence, social class, or income level."
        },
        {
          "myth": "You only need to take care of your mental health if you have a mental health condition.",
          "fact": "Everyone can benefit from taking active steps to promote their well-being and improve their mental health."
        },
        {
          "myth": "Poor mental health is not a big issue for teenagers. They just have mood swings caused by hormonal fluctuations and act out due to a desire for attention.",
          "fact": "Fourteen percent of the world’s adolescents experience mental health problems, and suicide is a leading cause of death in teenagers."
        },
        {
          "myth": "Nothing can be done to protect people from developing mental health conditions.",
          "fact": "Many protective factors, such as strong social relationships and early support, can help prevent mental health conditions."
        },
        {
          "myth": "A mental health condition is a sign of weakness; if the person were stronger, they would not have this condition.",
          "fact": "Mental health conditions are not related to willpower or strength. Seeking help requires courage."
        },
        {
          "myth": "Adolescents who get good grades and have a lot of friends will not have mental health conditions because they have nothing to be depressed about.",
          "fact": "Depression can affect anyone regardless of academic success or social status."
        },
        {
          "myth": "Bad parenting causes mental conditions in adolescents.",
          "fact": "Multiple factors, including genetics and environment, contribute to adolescent mental health, not just parenting."
        },
        {
          "myth": "People with breast cancer always find a lump.",
          "fact": "Not all breast cancers cause lumps, and other symptoms may indicate the disease."
        },
        {
          "myth": "Wearing a bra can cause breast cancer.",
          "fact": "There is no scientific evidence linking bras to breast cancer."
        },
        {
          "myth": "Breast implants can raise your cancer risk.",
          "fact": "Research shows that breast implants do not increase breast cancer risk, but they may make mammograms harder to read."
        },
        {
          "myth": "Eating gassy foods will make a breastfeeding baby gassy.",
          "fact": "Breast milk is made from nutrients in the bloodstream, not the stomach, so most foods do not cause gassiness in babies."
        },
        {
          "myth": "Exercise will affect the taste of breast milk.",
          "fact": "There is no evidence that exercise changes the taste of breast milk."
        }
      
  ];


const ScratchCard = ({ myth, fact, onScratchComplete }) => {
  const [scratchProgress, setScratchProgress] = useState(0);
  const [isScratched, setIsScratched] = useState(false);
  const [isScratching, setIsScratching] = useState(false);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const scratchedAreasRef = useRef(new Set());

  // Initialize grid for tracking scratched areas
  const gridSize = 10; // Divide the card into 10x10 grid for tracking
  const totalGridCells = (400 / gridSize) * (300 / gridSize);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctxRef.current = ctx;
    ctx.fillStyle = "#d1a3ff"; // Initial violet color
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add some subtle pattern to make it look more like a scratch card
    ctx.strokeStyle = "#c990ff";
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 20) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }
  }, []);

  const startScratching = (e) => {
    if (isScratched) return;
    setIsScratching(true);
    handleScratch(e);
  };

  const stopScratching = () => {
    setIsScratching(false);
    lastPosRef.current = { x: 0, y: 0 }; // Reset last position
  };

  const handleScratch = (e) => {
    if (isScratched || !isScratching) return;
  
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    const rect = canvas.getBoundingClientRect();
  
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
  
    if (!clientX || !clientY) return;
  
    const currentX = clientX - rect.left;
    const currentY = clientY - rect.top;
  
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = "#f5e1ff";
  
    const brushSize = 50; // Increased for easier scratching
    ctx.beginPath();
    ctx.arc(currentX, currentY, brushSize, 0, 2 * Math.PI);
    ctx.fill();
  
    // Fill a small rectangle for better erasing
    ctx.fillRect(currentX - brushSize / 2, currentY - brushSize / 2, brushSize, brushSize);
  
    // Draw a connecting line for smoother scratching
    if (lastPosRef.current.x && lastPosRef.current.y) {
      ctx.beginPath();
      ctx.lineWidth = brushSize * 1.5;
      ctx.lineCap = "round";
      ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
      ctx.lineTo(currentX, currentY);
      ctx.stroke();
    }
  
    // Mark this area as scratched
    const gridX = Math.floor(currentX / gridSize);
    const gridY = Math.floor(currentY / gridSize);
    for (let i = -2; i <= 2; i++) {
      for (let j = -2; j <= 2; j++) {
        scratchedAreasRef.current.add(`${gridX + i},${gridY + j}`);
      }
    }
  
    lastPosRef.current = { x: currentX, y: currentY };
  
    checkScratchProgress();
  };
  const checkScratchProgress = () => {
    const progress = (scratchedAreasRef.current.size / totalGridCells) * 100;
    setScratchProgress(progress);
  
    if (progress >= 80 && !isScratched) { 
      setIsScratched(true);
    }
  };
    
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <p className="absolute z-10 text-lg font-bold text-violet-800 text-center px-4" style={{ opacity: scratchProgress >= 20 ? 1 : 0, transition: "opacity 0.5s ease-in-out" }}>
        Myth: {myth}
      </p>
      <canvas
        ref={canvasRef}
        width={400}
        height={300}
        className="absolute inset-0 z-20 cursor-pointer w-full h-full rounded-2xl"
        onMouseDown={startScratching}
        onMouseMove={handleScratch}
        onMouseUp={stopScratching}
        onMouseLeave={stopScratching}
        onTouchStart={(e) => {
          e.preventDefault();
          startScratching(e.touches[0]);
        }}
        onTouchMove={(e) => {
          e.preventDefault();
          handleScratch(e);
        }}
        onTouchEnd={stopScratching}
      />
      {isScratched && (
        <button
          onClick={onScratchComplete}
          className="absolute bottom-4 bg-violet-500 text-white px-6 py-2 rounded-full shadow-lg hover:bg-violet-600 transition-all z-30 font-bold"
        >
          Burst the Myth
        </button>
      )}
    </div>
  );
};

const CardItem = ({ myth, fact, index, onSelect }) => {
  return (
    <div 
      className="w-[380px] h-[250px] bg-violet-300 rounded-3xl overflow-hidden shadow-xl flex items-center justify-center m-4 cursor-pointer hover:scale-105 transition-all"
      onClick={() => onSelect(index)}
    >
      <p className="text-violet-800 font-bold text-center px-4">
        Click to reveal a myth
      </p>
    </div>
  );
};

const Mentals = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isCardScratched, setIsCardScratched] = useState(false);
  const [showFact, setShowFact] = useState(false);
  const [animatingCard, setAnimatingCard] = useState(false);

  const handleSelectCard = (index) => {
    setSelectedCard(index);
    setAnimatingCard(true);
    setIsCardScratched(false);
    setShowFact(false);
  };

  const handleScratchComplete = () => {
    setIsCardScratched(true);
    setShowFact(true);
  };

  const handleClosePopup = () => {
    setAnimatingCard(false);
    setTimeout(() => {
      setSelectedCard(null);
      setIsCardScratched(false);
      setShowFact(false);
    }, 400); // Wait for animation to complete
  };

  const handleCloseFact = () => {
    setShowFact(false);
  };

  return (
    <div className="min-h-screen flex overflow-hidden">
    {/* Sidebar Component */}
    <div className="w-[250px] flex-shrink-0">
      <Sidebar />
    </div>
    
    {/* Main Content */}
    <div className="flex-1 py-4 pl-4 h-screen overflow-x-hidden">
        <div className={`flex flex-wrap justify-center items-center transition-all duration-300 ${selectedCard !== null ? 'blur-md' : ''}`}>
          {/* Adjust max-width to fit 3 cards per row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-[1280px] mx-auto translate-x-[-3px] translate-y-[-20px]">
            {mythsAndFacts.map((item, index) => (
              <CardItem
                key={index}
                myth={item.myth}
                fact={item.fact}
                index={index}
                onSelect={handleSelectCard}
              />
            ))}
          </div>
        </div>

        {selectedCard !== null && (
          <div className="fixed inset-0 flex items-center justify-center z-40">
            <div className={`bg-white p-6 rounded-3xl shadow-2xl border-4 border-violet-400 w-[420px] h-[320px] relative transition-all duration-300 ${animatingCard ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}>
              <button 
                onClick={handleClosePopup} 
                className="absolute top-2 right-2 bg-violet-500 text-white w-8 h-8 rounded-full hover:bg-violet-600 transition-all z-50 flex items-center justify-center"
              >
                ×
              </button>
              <div className="w-full h-full rounded-2xl overflow-hidden border-2 border-violet-500">
                <ScratchCard 
                  myth={mythsAndFacts[selectedCard].myth} 
                  fact={mythsAndFacts[selectedCard].fact}
                  onScratchComplete={handleScratchComplete}
                />
              </div>
            </div>
          </div>
        )}

        {showFact && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
            <div className="bg-white p-8 rounded-3xl shadow-2xl border-4 border-violet-400 w-full max-w-2xl h-auto flex flex-col justify-center items-center text-center transform transition-all duration-300 scale-100">
              <h2 className="text-4xl font-bold text-violet-500 mb-4">Fact</h2>
              <p className="p-6 text-xl text-violet-800 font-semibold">{mythsAndFacts[selectedCard].fact}</p>
              <button onClick={handleCloseFact} className="mt-6 bg-violet-500 text-white px-8 py-3 rounded-lg hover:bg-violet-600 transition-all text-lg">Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mentals;