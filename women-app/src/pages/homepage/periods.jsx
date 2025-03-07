import React, { useState, useRef, useEffect } from "react";
import Sidebar from '../../components/Sidebar/Sidebar';
const mythsAndFacts = [
  { myth: "During periods, girls are impure", fact: "Periods are just nature's way of saying you are growing up. There is nothing impure about that." },
  { myth: "Sanitary products should be kept private and covered in paper when purchasing", fact: "Buying sanitary products is like buying soap or toothpaste. They are personal hygiene products." },
  { myth: "Girls having their periods should not touch or go near plants the plant will die if they do so", fact: "Plants do not discriminate they thrive on good care like all of us irrespective of who it comes from." },
  { myth: "Foods like curd, tamarind and pickles disturb the menstrual flow", fact: "The food you eat does not decide the flow of your periods." },
  { myth: "Girls having periods should sleep in a separate shed or a different room", fact: "Menstruation is not contagious and causes no harm to anyone else in the same room." },
  { myth: "Any form of physical activity can disturb the flow", fact: "Exercise and playing sports can actually help relieve pain." },
  { myth: "A girl should not talk about her periods in public if she does so she will be shamed publicly", fact: "Do you think twice before you talk about your hair, eyeliner, the shade of your nail paint? Talking about periods is no different." },
  { myth: "Menstruating women should not enter temples or kitchens.", fact: "The idea that menstruating women are impure and should be restricted from religious or cooking activities is based on cultural beliefs, not scientific evidence." },
  { myth: "Menstruating women should not touch sour foods like pickles.", fact: "There is no scientific evidence that menstruation affects food preservation or quality." },
  { myth: "Menstrual blood is dangerous and can cause harm.", fact: "Menstrual blood is not harmful; it is simply the shedding of the uterine lining." },
  { myth: "Using cloth instead of sanitary pads is safe.", fact: "Many women in India use old cloth or unsafe materials, increasing the risk of infections. Proper menstrual hygiene products and sanitation are essential." },
  { myth: "Menstruation should not be openly discussed, especially with men.", fact: "Open discussions about menstruation are essential for breaking taboos, educating both men and women, and improving menstrual health awareness." }
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

const Periods = () => {
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

export default Periods;