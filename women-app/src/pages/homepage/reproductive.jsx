import React, { useState, useRef, useEffect } from "react";
import Sidebar from '../../components/Sidebar/Sidebar';
const mythsAndFacts = [
    { myth: "When someone is taking ‘the pill,’ they cannot contract an STI", fact: "Oral contraception cannot protect against contracting an STI." },
    { myth: "The withdrawal method prevents pregnancy", fact: "The withdrawal method is not a reliable way to prevent pregnancy. While it may reduce the chance, it is not foolproof." },
    { myth: "Using two condoms doubles the protection", fact: "It is actually riskier to use two or more condoms as friction can cause them to break." },
    { myth: "You can contract STIs from a toilet seat", fact: "STIs are spread through unprotected vaginal, anal, or oral sex, and by genital contact and sharing sex toys, not from toilet seats." },
    { myth: "Oral sex is safe sex", fact: "Oral sex might not cause pregnancy, but sexually transmitted infections can still be transmitted through oral sex." },
    { myth: "It is easy to tell if someone has a sexually transmitted infection", fact: "Many STIs do not show symptoms, and the only way to be sure is through testing." },
    { myth: "Condoms mean safe sex", fact: "Condoms help prevent pregnancy and STIs, but they must be used correctly, and breakage can still lead to pregnancy." },
    { myth: "HIV can be transmitted through any bodily fluids", fact: "HIV is transmitted through semen, blood, breast milk, and vaginal secretions, not through saliva, urine, or tears." },
    { myth: "Birth control pills make you gain weight", fact: "There is no consistent link between birth control pills and weight gain, though some women may experience minor water retention." },
    { myth: "Birth control methods are only effective if used immediately before or after sex", fact: "Many methods, like birth control pills, IUDs, and implants, are highly effective when used consistently, regardless of timing." },
    { myth: "Condoms are only necessary to prevent pregnancy", fact: "Condoms also protect against STIs, making them an essential barrier even if other contraceptives are used." },
    { myth: "You don't need birth control if you are breastfeeding", fact: "Breastfeeding can reduce fertility but is not a reliable form of birth control. Women can still ovulate and get pregnant." },
    { myth: "Using multiple forms of contraception is not necessary", fact: "Using more than one method, like condoms and birth control pills, increases pregnancy prevention and STI protection." },
    { myth: "Birth control pills protect against all STIs", fact: "Birth control pills do not protect against STIs. Only barrier methods, such as condoms, offer STI protection." },
    { myth: "You can't get pregnant if you have sex during your period", fact: "While less likely, it is still possible to become pregnant during menstruation due to sperm lifespan and ovulation timing." },
    { myth: "You need to take a break from birth control pills every once in a while", fact: "There is no medical need to take breaks from birth control pills. Continuous use can even provide health benefits." },
    { myth: "Birth control pills are only for preventing pregnancy", fact: "They also help manage menstrual cycles, reduce PMS symptoms, and treat acne." },
    { myth: "Abortion affects future fertility", fact: "Most medical and surgical abortions do not affect future fertility, despite common misconceptions." }
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

const Reproductives = () => {
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

export default Reproductives;