import React, { useState, useRef, useEffect } from "react";
import Sidebar from '../../components/Sidebar/Sidebar';
const mythsAndFacts = [
    { myth: "You’re Eating for Two", fact: "“Eating for Two” is a popular phrase that shouldn’t be taken literally; a pregnant woman does not need to eat twice as much! In fact, doubling your caloric intake can lead to excess weight gain, which can cause issues later in the pregnancy." },
    { myth: "It’s Okay to Have an Occasional Glass of Wine", fact: "You should never drink any alcohol while pregnant. There is no safe amount or type of alcohol during pregnancy, and even moderate intake can lead to lifelong problems for your baby." },
    { myth: "It’s Dangerous if You’re Past Your Due Date", fact: "Your due date is a calculated estimate of when your baby will hit 40 weeks. It’s normal to give birth before or after your set due date. In fact, you must go two weeks past your due date to be considered a post-term pregnancy." },
    { myth: "If My Periods Are Irregular, I Will Not Be Able to Get Pregnant", fact: "Another pregnancy myth—irregular periods mean I am infertile. The occasional irregular cycle is more common than women think, and it does not mean you will struggle with infertility." },
    { myth: "All Bleeding During the First Trimester Means a Miscarriage", fact: "While any bleeding during any stage of pregnancy can be alarming and scary, it is not always associated with a miscarriage. In fact, vaginal bleeding is extremely common in the first trimester, occurring in 20% to 40% of women. However, it’s still important to talk to your OB-GYN if you experience any bleeding during pregnancy to assess what’s going on." },
    { myth: "If You’re Over 35, Then Your Pregnancy Will Be High-Risk", fact: "A pregnancy that begins after a woman is 35 is considered a “high-risk pregnancy” because certain risks are slightly higher, not inevitable. Most moms 35 or older have a normal pregnancy and healthy baby." },
    { myth: "Breastfeeding Comes Naturally", fact: "Many new mothers think breastfeeding is an instinct that comes naturally — this is not always true. While babies are born with a reflex to look for their mother’s breast, it’s completely normal for a mother to need coaching and support for positioning their baby for breastfeeding. Breastfeeding takes time and practice, and new mothers shouldn’t feel down or inadequate if it doesn’t immediately click." },
    { myth: " You Can’t Get Pregnant if You’re on Your Period", fact: "​​While it’s uncommon for a woman to get pregnant while she is on her period, it is not impossible. Sperm can survive in the uterus for up to five days, so if you have sex near the end of your period, there is a possibility that sperm can fertilize an egg after it's released during ovulation." },
    { myth: "You Shouldn’t Drink Coffee if You’re Pregnant", fact: "While a pregnant woman should not drink any alcohol, she can enjoy a cup of coffee. Although, this is where moderation is key. Research suggests moderate caffeine consumption (200 milligrams or less per day) does not cause miscarriage or preterm birth. This is equivalent to about a 12-ounce cup of coffee. If you do opt to enjoy a cup of coffee, it’s important to limit other caffeine consumption from soft drinks, tea, and chocolate." },
    { myth: "Once You Have a C-Section, You Will Have a C-Section For All Your Future Pregnancies", fact: "Many women believe that once they have delivered a baby by Cesarean section, or C-Section, they will have to schedule a C-Section for their future pregnancies. This is not always the case. A Vaginal Birth After a Cesarean (VBAC) is now considered an option for many women. Depending on your health history, the reason for the initial C-Section, and C-Section scar location, your OB-GYN may give the “OK” to try a VBAC." },
    { myth: "All Mothers are Blissful and Happy After Childbirth", fact: "Maternal bliss is a myth. While there will be moments of bliss in a mother’s journey, the idea that it will all come naturally and easily is not accurate. Having a baby is a significant life-altering experience, and it will take time and patience to adjust." }
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
    <div className="relative w-full h-full flex flex-col items-center justify-center ">
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

const Pregnancys = () => {
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-[1280px] mx-auto translate-x-[-10px] translate-y-[-20px] ">
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

export default Pregnancys;