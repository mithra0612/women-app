import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Info, Edit2, X, Save, Calendar as CalendarIcon, PlusCircle, AlertCircle, Activity, Moon, Heart } from 'lucide-react';
import Sidebar from '../../components/Sidebar/Sidebar';

const PeriodTrackers = () => {
  // State for tracking cycle information
  const [cycleView, setCycleView] = useState('daysUntil'); // 'daysUntil' or 'dayOfCycle'
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [isEditing, setIsEditing] = useState(false);
  const [dayOfCycle, setDayOfCycle] = useState(null);
  const [daysUntil, setDaysUntil] = useState(null); // <---- Add this
  const [showSymptomLogger, setShowSymptomLogger] = useState(false);
  const [showTips, setShowTips] = useState(false);
 
  // Sample cycle data
  const [cycleData, setCycleData] = useState({
    lastPeriodStart: new Date(2025, 2, 10), // March 10, 2025
    cycleLength: 28, // Average cycle length in days
    periodLength: 5, // Average period length in days
    fertileWindowStart: 11, // Days after cycle start
    fertileWindowLength: 5, // Length of fertile window in days
    ovulationDay: 14, // Day of ovulation in cycle
  });

  // Symptom tracking data
  const [symptoms, setSymptoms] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentSymptoms, setCurrentSymptoms] = useState({
    cramps: false, 
    headache: false,
    bloating: false,
    fatigue: false,
    moodSwings: false,
    backPain: false,
    breastTenderness: false,
    acne: false,
    appetiteChanges: false,
    nausea: false,
    intensity: 1, // 1-5 scale
    notes: ''
  });

  // Mood tracking
  const [moodHistory, setMoodHistory] = useState([]);
  const moods = ['Happy', 'Calm', 'Sad', 'Irritable', 'Anxious', 'Energetic', 'Tired'];

  // Temporary data for editing
  const [editData, setEditData] = useState({
    lastPeriodStart: cycleData.lastPeriodStart,
    cycleLength: cycleData.cycleLength
  });

  // Calculate days until next period
 // Fix for calculating days until next period - improved accuracy
const calculateDaysUntil = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to start of day
  
  const lastPeriod = new Date(cycleData.lastPeriodStart);
  lastPeriod.setHours(0, 0, 0, 0); // Normalize to start of day
  
  // Calculate days since the last period started
  const daysSinceLastPeriod = Math.floor((today - lastPeriod) / (1000 * 60 * 60 * 24));
  
  // Calculate which cycle we're in (0-indexed)
  const currentCycleNumber = Math.floor(daysSinceLastPeriod / cycleData.cycleLength);
  
  // Calculate the start date of the next period
  const nextPeriodStart = new Date(lastPeriod);
  nextPeriodStart.setDate(lastPeriod.getDate() + ((currentCycleNumber + 1) * cycleData.cycleLength));
  
  // Calculate days from today until the next period starts
  const daysUntilNextPeriod = Math.floor((nextPeriodStart - today) / (1000 * 60 * 60 * 24));
  
  return daysUntilNextPeriod;
};
const calculateDayOfCycle = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const lastPeriod = new Date(cycleData.lastPeriodStart);
  lastPeriod.setHours(0, 0, 0, 0);
  
  // Calculate days since the last period started
  const daysSinceLastPeriod = Math.floor((today - lastPeriod) / (1000 * 60 * 60 * 24));
  
  if (daysSinceLastPeriod < 0) {
    // If the last period hasn't started yet, return null or a special indicator
    return null;
  }
  
  // Calculate which cycle we're in (0-indexed)
  const currentCycleNumber = Math.floor(daysSinceLastPeriod / cycleData.cycleLength);
  
  // Calculate the start date of the current cycle
  const currentCycleStart = new Date(lastPeriod);
  currentCycleStart.setDate(lastPeriod.getDate() + (currentCycleNumber * cycleData.cycleLength));
  
  // Calculate days since the current cycle started
  const daysSinceCurrentCycleStart = Math.floor((today - currentCycleStart) / (1000 * 60 * 60 * 24));
  
  // Return the day of the current cycle (1-indexed)
  return daysSinceCurrentCycleStart + 1;
};

// For the circle UI component, handle null values from calculateDayOfCycle
const renderCycleCircle = () => {
  return (
    <div 
      className="w-40 h-40 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 shadow-md flex flex-col items-center justify-center cursor-pointer transition-all hover:shadow-lg"
      onClick={toggleCycleView}
    >
      {cycleView === 'daysUntil' ? (
        <>
          <p className="text-4xl font-bold text-purple-800">{daysUntil}</p>
          <p className="text-purple-600 mt-2 text-center text-sm">days until<br/>next period</p>
        </>
      ) : (
        <>
          {dayOfCycle !== null ? (
            <>
              <p className="text-4xl font-bold text-purple-800">{dayOfCycle}</p>
              <p className="text-purple-600 mt-2 text-center text-sm">day of<br/>your cycle</p>
            </>
          ) : (
            <p className="text-purple-600 text-center text-sm">Cycle data<br/>not available</p>
          )}
        </>
      )}
    </div>
  );
};
const calculateNextPeriodDate = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const lastPeriod = new Date(cycleData.lastPeriodStart);
  lastPeriod.setHours(0, 0, 0, 0);
  
  // Calculate days since the last period started
  const daysSinceLastPeriod = Math.floor((today - lastPeriod) / (1000 * 60 * 60 * 24));
  
  // Calculate which cycle we're in (0-indexed)
  const currentCycleNumber = Math.floor(daysSinceLastPeriod / cycleData.cycleLength);
  
  // Calculate the start date of the next period
  const nextPeriodDate = new Date(lastPeriod);
  nextPeriodDate.setDate(lastPeriod.getDate() + ((currentCycleNumber + 1) * cycleData.cycleLength));
  
  return nextPeriodDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};
useEffect(() => {
  if (cycleData) {
    setDayOfCycle(calculateDayOfCycle());
    setDaysUntil(calculateDaysUntil());
  }
}, [cycleData]); // Runs when cycleData changes


  // Toggle between "days until" and "day of cycle" views
  const toggleCycleView = () => {
    setCycleView(cycleView === 'daysUntil' ? 'dayOfCycle' : 'daysUntil');
  };

  // Start editing cycle data
  const handleStartEdit = () => {
    setEditData({
      lastPeriodStart: cycleData.lastPeriodStart,
      cycleLength: cycleData.cycleLength
    });
    setIsEditing(true);
  };
  
  // Save edited cycle data with auto-calculation of other values
  const handleSaveEdit = () => {
    // Automatically calculate other values based on cycle length
    const newCycleData = {
      ...cycleData,
      lastPeriodStart: editData.lastPeriodStart,
      cycleLength: editData.cycleLength,
      // Auto-calculate these values based on typical patterns
      periodLength: Math.min(7, Math.max(3, Math.round(editData.cycleLength * 0.18))),
      ovulationDay: Math.round(editData.cycleLength / 2),
      fertileWindowStart: Math.round(editData.cycleLength / 2) - 3,
      fertileWindowLength: 5
    };
    
    setCycleData(newCycleData);
    setIsEditing(false);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  // Handle input changes when editing
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'lastPeriodStart') {
      setEditData({
        ...editData,
        [name]: new Date(value)
      });
    } else {
      setEditData({
        ...editData,
        [name]: parseInt(value)
      });
    }
  };

  // Calendar navigation
  const previousMonth = () => {
    setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 1));
  };

  // Get the days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get the first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  // Build calendar days array
  const buildCalendarDays = () => {
    const year = selectedMonth.getFullYear();
    const month = selectedMonth.getMonth();
    
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    // Calculate previous month's overflow days
    const prevMonthDays = [];
    if (firstDayOfMonth > 0) {
      const prevMonth = month === 0 ? 11 : month - 1;
      const prevYear = month === 0 ? year - 1 : year;
      const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);
      
      for (let i = firstDayOfMonth - 1; i >= 0; i--) {
        prevMonthDays.push({
          day: daysInPrevMonth - i,
          month: prevMonth,
          year: prevYear,
          isCurrentMonth: false
        });
      }
    }
    
    // Current month days
    const currentMonthDays = [];
    for (let i = 1; i <= daysInMonth; i++) {
      currentMonthDays.push({
        day: i,
        month,
        year,
        isCurrentMonth: true
      });
    }
    
    // Next month overflow days
    const nextMonthDays = [];
    const totalDays = prevMonthDays.length + currentMonthDays.length;
    const nextDaysNeeded = 42 - totalDays; // 6 rows of 7 days
    
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;
    
    for (let i = 1; i <= nextDaysNeeded; i++) {
      nextMonthDays.push({
        day: i,
        month: nextMonth,
        year: nextYear,
        isCurrentMonth: false
      });
    }
    
    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  };

  // Determine day type (period, fertile, ovulation, expected)
  const getDayType = (day) => {
    const date = new Date(day.year, day.month, day.day);
    date.setHours(0, 0, 0, 0);
    
    const lastPeriod = new Date(cycleData.lastPeriodStart);
    lastPeriod.setHours(0, 0, 0, 0);
    
    // Calculate days since last period start
    const daysSinceLastPeriod = Math.floor((date - lastPeriod) / (1000 * 60 * 60 * 24));
    
    // If negative, this date is before the last period
    if (daysSinceLastPeriod < 0) return 'regular';
    
    // Calculate which cycle this date belongs to
    const cycleNumber = Math.floor(daysSinceLastPeriod / cycleData.cycleLength);
    
    // Calculate which day of the cycle this is (0-indexed)
    const cycleDay = daysSinceLastPeriod % cycleData.cycleLength;
    
    // Calculate the start of this cycle
    const cycleStart = new Date(lastPeriod);
    cycleStart.setDate(lastPeriod.getDate() + (cycleNumber * cycleData.cycleLength));
    
    // Period days
    if (cycleDay < cycleData.periodLength) return 'period';
    
    // Fertile window
    if (cycleDay >= cycleData.fertileWindowStart && 
        cycleDay < cycleData.fertileWindowStart + cycleData.fertileWindowLength) {
      // Ovulation day
      if (cycleDay === cycleData.ovulationDay - 1) return 'ovulation';
      return 'fertile';
    }
    
    // Expected next period (3 days before next cycle)
    if (cycleDay >= cycleData.cycleLength - 3) return 'expected';
    
    return 'regular';
  };

  // Get color based on day type
  const getDayColor = (dayType) => {
    switch (dayType) {
      case 'period': return 'bg-pink-100 text-pink-800';
      case 'fertile': return 'bg-purple-100 text-purple-800';
      case 'ovulation': return 'bg-violet-100 text-violet-800';
      case 'expected': return 'bg-red-50 text-red-800';
      default: return '';
    }
  };

  // Check if date is today
  const isToday = (day) => {
    const today = new Date();
    return day.day === today.getDate() && 
           day.month === today.getMonth() && 
           day.year === today.getFullYear();
  };

  // Check if date has logged symptoms
  const hasSymptoms = (day) => {
    return symptoms.some(symptom => {
      const symptomDate = new Date(symptom.date);
      return day.day === symptomDate.getDate() &&
             day.month === symptomDate.getMonth() &&
             day.year === symptomDate.getFullYear();
    });
  };

  // Format month name
  const formatMonth = (date) => {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  // Format date for input field
  const formatDateForInput = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Handle calendar day click
  const handleDayClick = (day) => {
    const clickedDate = new Date(day.year, day.month, day.day);
    setSelectedDate(clickedDate);
    
    // Check if there are symptoms for this date
    const existingSymptomIndex = symptoms.findIndex(symptom => {
      const symptomDate = new Date(symptom.date);
      return symptomDate.getDate() === clickedDate.getDate() &&
             symptomDate.getMonth() === clickedDate.getMonth() &&
             symptomDate.getFullYear() === clickedDate.getFullYear();
    });
    
    if (existingSymptomIndex !== -1) {
      setCurrentSymptoms(symptoms[existingSymptomIndex].data);
    } else {
      setCurrentSymptoms({
        cramps: false, 
        headache: false,
        bloating: false,
        fatigue: false,
        moodSwings: false,
        backPain: false,
        breastTenderness: false,
        acne: false,
        appetiteChanges: false,
        nausea: false,
        intensity: 1,
        notes: ''
      });
    }
    
    setShowSymptomLogger(true);
  };

  // Handle symptom checkbox change
  const handleSymptomChange = (symptom) => {
    setCurrentSymptoms({
      ...currentSymptoms,
      [symptom]: !currentSymptoms[symptom]
    });
  };

  // Handle intensity change
  const handleIntensityChange = (e) => {
    setCurrentSymptoms({
      ...currentSymptoms,
      intensity: parseInt(e.target.value)
    });
  };

  // Handle notes change
  const handleNotesChange = (e) => {
    setCurrentSymptoms({
      ...currentSymptoms,
      notes: e.target.value
    });
  };

  // Save symptoms
  const saveSymptoms = () => {
    const existingSymptomIndex = symptoms.findIndex(symptom => {
      const symptomDate = new Date(symptom.date);
      return symptomDate.getDate() === selectedDate.getDate() &&
             symptomDate.getMonth() === selectedDate.getMonth() &&
             symptomDate.getFullYear() === selectedDate.getFullYear();
    });
    
    if (existingSymptomIndex !== -1) {
      // Update existing symptoms
      const updatedSymptoms = [...symptoms];
      updatedSymptoms[existingSymptomIndex].data = currentSymptoms;
      setSymptoms(updatedSymptoms);
    } else {
      // Add new symptoms
      setSymptoms([
        ...symptoms,
        {
          date: selectedDate,
          data: currentSymptoms
        }
      ]);
    }
    
    setShowSymptomLogger(false);
    setShowTips(true);
  };

  // Get symptom tips based on current logged symptoms
  const getSymptomTips = () => {
    const tips = [];
    
    if (currentSymptoms.cramps) {
      tips.push({
        symptom: 'Cramps',
        tips: [
          'Apply a heating pad to your lower abdomen',
          'Try gentle stretching or yoga poses like child\'s pose',
          'Stay hydrated and avoid caffeine',
          'Consider over-the-counter pain relievers (consult with your doctor)'
        ]
      });
    }
    
    if (currentSymptoms.headache) {
      tips.push({
        symptom: 'Headache',
        tips: [
          'Stay hydrated and avoid skipping meals',
          'Try applying a cold or warm compress to your forehead',
          'Practice relaxation techniques like deep breathing',
          'Rest in a dark, quiet room if possible'
        ]
      });
    }
    
    if (currentSymptoms.bloating) {
      tips.push({
        symptom: 'Bloating',
        tips: [
          'Avoid salty foods and carbonated beverages',
          'Try eating smaller, more frequent meals',
          'Include potassium-rich foods like bananas and sweet potatoes',
          'Light exercise like walking can help reduce bloating'
        ]
      });
    }
    
    if (currentSymptoms.fatigue) {
      tips.push({
        symptom: 'Fatigue',
        tips: [
          'Prioritize getting 7-9 hours of sleep',
          'Consider taking a short 20-minute nap if needed',
          'Stay hydrated and maintain a balanced diet',
          'Light exercise can actually boost energy levels'
        ]
      });
    }
    
    if (currentSymptoms.moodSwings) {
      tips.push({
        symptom: 'Mood Swings',
        tips: [
          'Practice mindfulness meditation or deep breathing',
          'Regular physical activity can help regulate mood',
          'Journal your thoughts and feelings',
          'Connect with supportive friends or family'
        ]
      });
    }
    
    return tips;
  };

  // Save mood
  const saveMood = (mood) => {
    setMoodHistory([
      ...moodHistory,
      {
        date: new Date(),
        mood: mood
      }
    ]);
  };

  // Get current cycle phase
  const getCurrentPhase = () => {
    const cycleDay = calculateDayOfCycle();
    
    if (cycleDay <= cycleData.periodLength) {
      return 'Menstrual Phase';
    } else if (cycleDay < cycleData.fertileWindowStart) {
      return 'Follicular Phase';
    } else if (cycleDay <= cycleData.ovulationDay) {
      return 'Ovulatory Phase';
    } else {
      return 'Luteal Phase';
    }
  };

  // Get phase tips
  const getPhaseTips = () => {
    const phase = getCurrentPhase();
    
    switch(phase) {
      case 'Menstrual Phase':
        return {
          nutrition: 'Focus on iron-rich foods like leafy greens, lean meats, and beans.',
          exercise: 'Gentle movement like walking or light yoga.',
          wellness: 'Prioritize rest and self-care. Consider using a heating pad for cramps.'
        };
      case 'Follicular Phase':
        return {
          nutrition: 'Include complex carbs, fresh fruits, and vegetables.',
          exercise: 'Energy levels rise – good time for more intense workouts.',
          wellness: 'Great time to start new projects and socialize.'
        };
      case 'Ovulatory Phase':
        return {
          nutrition: 'Include calcium-rich foods and stay hydrated.',
          exercise: 'Your energy is at its peak – high-intensity workouts work well.',
          wellness: 'Best time for social activities and important conversations.'
        };
      case 'Luteal Phase':
        return {
          nutrition: 'Include magnesium-rich foods like nuts, seeds, and dark chocolate.',
          exercise: 'Shift to more moderate exercise like swimming or cycling.',
          wellness: 'Practice self-care and mindfulness to manage mood fluctuations.'
        };
      default:
        return {};
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br ">
      {/* Sidebar */}
      <div className="w-[250px] fixed left-0 top-0 h-full">
        <Sidebar />
      </div>
      
      {/* Main Content */}
      <div className="ml-[250px] p-6">
        <header className="mb-6">
          <div className="max-w-5xl mx-auto px-6 py-6">
            <h1 className="text-3xl font-bold text-purple-800">Period Tracker</h1>
            <p className="text-gray-600 mt-2">Track your cycle, fertility window, and symptoms</p>
          </div>
        </header>
        
        <div className="max-w-5xl mx-auto">
          {/* Insights Panel */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-lg font-semibold text-purple-800 mb-4">Cycle Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Cycle Day/Days Until Period Circle */}
              <div className="flex flex-col items-center">
                <div 
                  className="w-40 h-40 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 shadow-md flex flex-col items-center justify-center cursor-pointer transition-all hover:shadow-lg"
                  onClick={toggleCycleView}
                >
                  {cycleView === 'daysUntil' ? (
                    <>
                      <p className="text-4xl font-bold text-purple-800">{calculateDaysUntil()}</p>
                      <p className="text-purple-600 mt-2 text-center text-sm">days until<br/>next period</p>
                    </>
                  ) : (
                    <>
                      <p className="text-4xl font-bold text-purple-800">{calculateDayOfCycle()}</p>
                      <p className="text-purple-600 mt-2 text-center text-sm">day of<br/>your cycle</p>
                    </>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-2">Tap to switch view</p>
              </div>
              
              {/* Current Phase Info */}
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-medium text-purple-800 flex items-center">
                  <Moon className="h-4 w-4 mr-1" />
                  Current Phase
                </h4>
                <p className="text-xl font-bold text-purple-900 mt-2">{getCurrentPhase()}</p>
                <p className="text-sm text-purple-700 mt-1">Next period expected on {calculateNextPeriodDate()}</p>
              </div>
              
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-4">
           <h4 className="font-medium text-purple-800">Quick Actions</h4>
            <div className="mt-2 space-y-2">
          <button 
      onClick={() => setShowSymptomLogger(true)}
      className="w-full text-left px-5 py-4 mt-10 bg-white rounded-md shadow-sm text-purple-700 hover:bg-purple-50 transition flex items-center"
    >
      <PlusCircle className="h-4 w-4 mr-2" />
      Log Today's Symptoms
    </button>
  </div>
</div>
            </div>
          </div>
          
          {/* Calendar */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <button onClick={previousMonth} className="p-2 rounded-full hover:bg-gray-100">
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h2 className="text-xl font-semibold text-gray-800">
                {formatMonth(selectedMonth)}
              </h2>
              <button onClick={nextMonth} className="p-2 rounded-full hover:bg-gray-100">
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            
            {/* Day names */}
            <div className="grid grid-cols-7 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center text-gray-500 font-medium py-2">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-1">
              {buildCalendarDays().map((day, index) => {
                const dayType = getDayType(day);
                const colorClass = getDayColor(dayType);
                const todayClass = isToday(day) ? 'ring-2 ring-purple-500' : '';
                const hasLoggedSymptoms = hasSymptoms(day);
                
                return (
                  <div 
                    key={index} 
                    onClick={() => handleDayClick(day)}
                    className={`
                      relative h-12 flex items-center justify-center rounded-md cursor-pointer
                      ${day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}
                      ${colorClass}
                      ${todayClass}
                      hover:bg-gray-100 transition-colors
                    `}
                  >
                    <span className={`text-sm ${day.isCurrentMonth ? 'font-medium' : ''}`}>
                      {day.day}
                    </span>
                    
                    {/* Indicator for days with symptoms */}
                    {hasLoggedSymptoms && (
                      <div className="absolute bottom-1 w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Legend */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Legend</h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-pink-100 border border-pink-300 mr-2"></div>
                <span className="text-sm text-gray-700">Period</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-purple-100 border border-purple-300 mr-2"></div>
                <span className="text-sm text-gray-700">Fertile Window</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-violet-100 border border-violet-300 mr-2"></div>
                <span className="text-sm text-gray-700">Ovulation</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-red-50 border border-red-300 mr-2"></div>
                <span className="text-sm text-gray-700">Expected Period</span>
              </div>
            </div>
          </div>
          
          {/* Phase-based Wellness Tips */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Cycle Phase Tips</h3>
              <div className="text-purple-600 rounded-full bg-purple-50 px-3 py-1 text-sm font-medium">
                {getCurrentPhase()}
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="bg-pink-50 rounded-lg p-4">
                <h4 className="text-sm text-pink-700 font-medium mb-2">Nutrition</h4>
                <p className="text-gray-800">{getPhaseTips().nutrition}</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="text-sm text-purple-700 font-medium mb-2">Exercise</h4>
                <p className="text-gray-800">{getPhaseTips().exercise}</p>
              </div>
              <div className="bg-violet-50 rounded-lg p-4">
                <h4 className="text-sm text-violet-700 font-medium mb-2">Wellness</h4>
                <p className="text-gray-800">{getPhaseTips().wellness}</p>
              </div>
            </div>
          </div>
          
          {/* Mood Tracker */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">How are you feeling today?</h3>
            <div className="flex flex-wrap gap-2">
              {moods.map(mood => (
                <button
                  key={mood}
                  onClick={() => saveMood(mood)}
                  className="px-4 py-2 bg-purple-50 hover:bg-purple-100 rounded-full text-purple-800 text-sm transition-colors"
                >
                  {mood}
                </button>
              ))}
            </div>
            
            {moodHistory.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Moods</h4>
                <div className="flex flex-wrap gap-2">
                  {moodHistory.slice(-5).map((entry, index) => (
                    <div key={index} className="bg-gray-100 rounded-full px-3 py-1 text-xs flex items-center">
                      <span className="font-medium">{entry.mood}</span>
                      <span className="ml-2 text-gray-500">
                        {entry.date.toLocaleString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Your Cycle Stats</h3>
        {!isEditing ? (
          <button 
            className="text-purple-600 hover:text-purple-800 flex items-center text-sm"
            onClick={() => setIsEditing(true)}
          >
            ✏️ Edit
          </button>
        ) : (
          <button 
            className="text-red-600 hover:text-red-800 flex items-center text-sm"
            onClick={() => setIsEditing(false)}
          >
            ❌ Cancel
          </button>
        )}
      </div>

{!isEditing ? (
  <div>
    <p className="text-gray-700">
      <strong>Last Period Start:</strong> {cycleData.lastPeriodStart.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      })}
    </p>
    <p className="text-gray-700">
      <strong>Cycle Length:</strong> {cycleData.cycleLength} days
    </p>
  </div>
) : (
  <div className="space-y-3">
    <label className="block text-gray-700 font-semibold">📅 Last Period Start</label>
    <input
      type="date"
      className="border border-gray-300 p-2 w-full rounded-md focus:ring-2 focus:ring-purple-300"
      value={formatDateForInput(editData.lastPeriodStart)}
      onChange={(e) => handleEditChange({ target: { name: 'lastPeriodStart', value: e.target.value } })}
    />

    <label className="block text-gray-700 font-semibold">⏳ Cycle Length (days)</label>
    <input
      type="number"
      className="border border-gray-300 p-2 w-full rounded-md focus:ring-2 focus:ring-purple-300"
      placeholder="e.g. 28"
      name="cycleLength"
      value={editData.cycleLength}
      onChange={handleEditChange}
      min="21"
      max="45"
    />

    <button
      onClick={handleSaveEdit}
      className="bg-purple-500 text-white w-full px-4 py-2 rounded-md font-semibold hover:bg-purple-600 transition"
    >
      ✅ Save Changes
    </button>
  </div>
)}
{showSymptomLogger && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">
          Log Symptoms - {selectedDate.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })}
        </h3>
        <button 
          onClick={() => setShowSymptomLogger(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div 
            onClick={() => handleSymptomChange('cramps')}
            className={`p-3 rounded-lg border cursor-pointer flex items-center ${
              currentSymptoms.cramps ? 'bg-purple-100 border-purple-300' : 'bg-gray-50 border-gray-200'
            }`}
          >
            <input 
              type="checkbox"
              checked={currentSymptoms.cramps}
              onChange={() => {}}
              className="mr-2"
            />
            <span>Cramps</span>
          </div>
          <div 
            onClick={() => handleSymptomChange('headache')}
            className={`p-3 rounded-lg border cursor-pointer flex items-center ${
              currentSymptoms.headache ? 'bg-purple-100 border-purple-300' : 'bg-gray-50 border-gray-200'
            }`}
          >
            <input 
              type="checkbox"
              checked={currentSymptoms.headache}
              onChange={() => {}}
              className="mr-2"
            />
            <span>Headache</span>
          </div>
          <div 
            onClick={() => handleSymptomChange('bloating')}
            className={`p-3 rounded-lg border cursor-pointer flex items-center ${
              currentSymptoms.bloating ? 'bg-purple-100 border-purple-300' : 'bg-gray-50 border-gray-200'
            }`}
          >
            <input 
              type="checkbox"
              checked={currentSymptoms.bloating}
              onChange={() => {}}
              className="mr-2"
            />
            <span>Bloating</span>
          </div>
          <div 
            onClick={() => handleSymptomChange('fatigue')}
            className={`p-3 rounded-lg border cursor-pointer flex items-center ${
              currentSymptoms.fatigue ? 'bg-purple-100 border-purple-300' : 'bg-gray-50 border-gray-200'
            }`}
          >
            <input 
              type="checkbox"
              checked={currentSymptoms.fatigue}
              onChange={() => {}}
              className="mr-2"
            />
            <span>Fatigue</span>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Intensity
          </label>
          <input 
            type="range" 
            min="1" 
            max="5" 
            value={currentSymptoms.intensity}
            onChange={handleIntensityChange}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Mild</span>
            <span>Moderate</span>
            <span>Severe</span>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notes
          </label>
          <textarea
            value={currentSymptoms.notes}
            onChange={handleNotesChange}
            className="w-full border border-gray-300 rounded-md p-2 h-20"
            placeholder="Add any additional details..."
          />
        </div>
        
        <button
          onClick={saveSymptoms}
          className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
        >
          Save Symptoms
        </button>
      </div>
    </div>
  </div>
)}
{showTips && getSymptomTips().length > 0 && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800 flex items-center">
          <Info className="h-5 w-5 mr-2 text-purple-600" />
          Symptom Relief Tips
        </h3>
        <button 
          onClick={() => setShowTips(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <div className="space-y-4">
        {getSymptomTips().map((symptomTip, index) => (
          <div key={index} className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-medium text-purple-800 mb-2">{symptomTip.symptom}</h4>
            <ul className="space-y-1">
              {symptomTip.tips.map((tip, tipIndex) => (
                <li key={tipIndex} className="text-sm text-gray-700 flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        ))}
        
        <button
          onClick={() => setShowTips(false)}
          className="w-full bg-gray-100 text-gray-800 py-2 rounded-md hover:bg-gray-200 transition"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

    </div>
    </div>
    </div>
  </div>
  );
};
export default PeriodTrackers;

