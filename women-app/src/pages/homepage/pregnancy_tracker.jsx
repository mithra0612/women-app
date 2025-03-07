import React, { useState, useEffect } from "react";
import { LineChart, XAxis, YAxis, Tooltip, Legend, Line } from "recharts";
import Sidebar from "../../components/Sidebar/Sidebar";
import week4 from "../../assets/week4.png";
import week8 from "../../assets/week8.png";
import week12 from "../../assets/week12.png";
import week16 from "../../assets/week16.png";
import week20 from "../../assets/week20.jpg";
import week24 from "../../assets/week24.png";
import week28 from "../../assets/week28.png";
import week32 from "../../assets/week32.png";
import week36 from "../../assets/week36.png";
import week40 from "../../assets/week40.png";

const PregnancyTrackers = () => {
  // State management
  const [dueDate, setDueDate] = useState("");
  const [currentWeek, setCurrentWeek] = useState(0);
  const [currentTrimester, setCurrentTrimester] = useState("");
  const [babySize, setBabySize] = useState("");
  const [symptoms, setSymptoms] = useState([]);
  const [userSymptoms, setUserSymptoms] = useState([]);
  const [newSymptom, setNewSymptom] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    date: "",
    description: "",
    type: "checkup",
  });
  const [weightTracker, setWeightTracker] = useState([]);
  const [newWeight, setNewWeight] = useState({ date: "", weight: "" });
  const [notes, setNotes] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  // Baby size comparison by week
  const babySizeByWeek = {
    4: "a poppy seed",
    5: "a sesame seed",
    6: "a lentil",
    7: "a blueberry",
    8: "a kidney bean",
    9: "a grape",
    10: "a kumquat",
    11: "a fig",
    12: "a lime",
    13: "a lemon",
    14: "a peach",
    15: "an apple",
    16: "an avocado",
    17: "a pomegranate",
    18: "a bell pepper",
    19: "a mango",
    20: "a banana",
    21: "a carrot",
    22: "a spaghetti squash",
    23: "a large mango",
    24: "a corn on the cob",
    25: "a rutabaga",
    26: "a scallion",
    27: "a cauliflower",
    28: "an eggplant",
    29: "a butternut squash",
    30: "a cabbage",
    31: "a coconut",
    32: "a squash",
    33: "a pineapple",
    34: "a cantaloupe",
    35: "a honeydew",
    36: "a honeydew melon",
    37: "a winter melon",
    38: "a pumpkin",
    39: "a mini watermelon",
    40: "a small watermelon",
  };

  // Fetal development milestones by week
  const fetalDevelopmentByWeek = {
    4: "The embryo is forming the neural tube (future brain and spinal cord).",
    8: "All essential organs have begun to form. Tiny fingers and toes are developing.",
    12: "External genitalia are forming. The face is well-formed with eyes, ears, and nose.",
    16: "Baby can make facial expressions and may start sucking their thumb.",
    20: "Baby's movements become stronger. You might feel the first flutters.",
    24: "The baby's skin is wrinkled, translucent, and pink to red.",
    28: "Eyes can open and close. Baby can hiccup, which you might feel.",
    32: "Baby is practicing breathing movements and can respond to sounds.",
    36: "Baby is gaining weight rapidly and has less room to move around.",
    40: "Baby is fully developed and ready to meet you!",
  };

  const fetalImages = {
    4: week4,
    8: week8,
    12: week12,
    16: week16,
    20: week20,
    24: week24,
    28: week28,
    32: week32,
    36: week36,
    40: week40,
  };

  // Common symptoms by trimester
  const symptomsByTrimester = {
    first: [
      "Morning sickness",
      "Fatigue",
      "Breast tenderness",
      "Food aversions",
      "Frequent urination",
      "Bloating",
      "Mood swings",
      "Headaches",
    ],
    second: [
      "Baby movements",
      "Increased energy",
      "Nasal congestion",
      "Backache",
      "Growing belly",
      "Stretched skin/itchiness",
      "Leg cramps",
      "Heartburn",
    ],
    third: [
      "Shortness of breath",
      "Trouble sleeping",
      "Braxton Hicks",
      "Swelling",
      "Pelvic pressure",
      "Frequent urination",
      "Back pain",
      "Fatigue",
    ],
  };

  // Appointment types
  const appointmentTypes = [
    { value: "checkup", label: "Regular Checkup" },
    { value: "ultrasound", label: "Ultrasound" },
    { value: "test", label: "Lab Test" },
    { value: "specialist", label: "Specialist Visit" },
    { value: "class", label: "Birthing Class" },
    { value: "other", label: "Other" },
  ];

  // Calculate weeks and trimester when due date changes
  useEffect(() => {
    if (dueDate) {
      const due = new Date(dueDate);
      const today = new Date();

      // Pregnancy is counted from 2 weeks before conception
      const conception = new Date(due);
      conception.setDate(conception.getDate() - 280);

      // Calculate weeks
      const diffTime = Math.abs(today - conception);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const weeks = Math.floor(diffDays / 7);

      setCurrentWeek(weeks);

      // Set trimester
      if (weeks < 14) {
        setCurrentTrimester("first");
        setSymptoms(symptomsByTrimester.first);
      } else if (weeks < 28) {
        setCurrentTrimester("second");
        setSymptoms(symptomsByTrimester.second);
      } else {
        setCurrentTrimester("third");
        setSymptoms(symptomsByTrimester.third);
      }

      // Set baby size
      const sizeWeeks = Object.keys(babySizeByWeek).map(Number);
      const closestWeek = sizeWeeks.reduce((prev, curr) => {
        return Math.abs(curr - weeks) < Math.abs(prev - weeks) ? curr : prev;
      });
      setBabySize(babySizeByWeek[closestWeek]);
    }
  }, [dueDate]);

  // Get closest fetal image and development info
  const getClosestWeekData = (dataObject) => {
    if (!currentWeek) return null;

    const weeks = Object.keys(dataObject).map(Number);
    const closestWeek = weeks.reduce((prev, curr) => {
      return Math.abs(curr - currentWeek) < Math.abs(prev - currentWeek)
        ? curr
        : prev;
    });

    return { week: closestWeek, data: dataObject[closestWeek] };
  };

  // Handle due date change
  const handleDueDateChange = (e) => {
    setDueDate(e.target.value);
  };

  // Handle adding new symptom
  const handleAddSymptom = () => {
    if (newSymptom.trim() !== "") {
      setUserSymptoms([...userSymptoms, newSymptom]);
      setNewSymptom("");
    }
  };

  // Handle adding new appointment
  const handleAddAppointment = () => {
    if (newAppointment.date && newAppointment.description) {
      setAppointments([...appointments, newAppointment]);
      setNewAppointment({ date: "", description: "", type: "checkup" });
    }
  };

  // Handle adding new weight entry
  const handleAddWeight = () => {
    if (newWeight.date && newWeight.weight) {
      const newEntry = {
        ...newWeight,
        id: Date.now(), // Add unique id for each entry
      };
      setWeightTracker([...weightTracker, newEntry]);
      setNewWeight({ date: "", weight: "" });
    }
  };

  // Handle deleting weight entry
  const handleDeleteWeight = (id) => {
    setWeightTracker(weightTracker.filter((entry) => entry.id !== id));
  };

  // Get baby's current fetal image
  const fetalImageData = getClosestWeekData(fetalImages);
  const fetalDevelopmentData = getClosestWeekData(fetalDevelopmentByWeek);

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Filter upcoming appointments
  const upcomingAppointments = appointments
    .filter((apt) => new Date(apt.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // Calculate days remaining until due date
  const calculateDaysRemaining = () => {
    if (!dueDate) return null;

    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = Math.abs(due - today);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const daysRemaining = calculateDaysRemaining();
  return (
    <div className="h-screen bg-gradient-to-b  flex ml-64">
      <Sidebar />

      <div className="container mx-auto px-4 py-8 ">
        {/* Header */}
        <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold text-purple-800 mb-2">
              Bloom
            </h1>
            <p className="text-pink-600">
              Your Pregnancy Journey Companion
            </p>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto">
          {/* Due Date Input */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              When is your baby due?
            </h2>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <input
                type="date"
                value={dueDate}
                onChange={handleDueDateChange}
                className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition duration-300 w-full md:w-auto">
                Set Due Date
              </button>
            </div>
          </div>

          {dueDate && (
            <>
              {/* Progress Dashboard */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-pink-50 rounded-lg">
                    <h3 className="text-lg text-gray-600 mb-1">Current Week</h3>
                    <p className="text-4xl font-bold text-purple-700">
                      {currentWeek}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">of 40 weeks</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <h3 className="text-lg text-gray-600 mb-1">Trimester</h3>
                    <p className="text-2xl font-bold text-purple-700 capitalize">
                      {currentTrimester}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-pink-50 rounded-lg">
                    <h3 className="text-lg text-gray-600 mb-1">Baby Size</h3>
                    <p className="text-2xl font-bold text-purple-700">
                      {babySize}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <h3 className="text-lg text-gray-600 mb-1">
                      Days Remaining
                    </h3>
                    <p className="text-4xl font-bold text-purple-700">
                      {daysRemaining}
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-8">
                  <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-pink-400 to-purple-600 h-6 rounded-full"
                      style={{
                        width: `${Math.min((currentWeek / 40) * 100, 100)}%`,
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-2 text-sm text-gray-600">
                    <span>Week 1</span>
                    <span>Week 13</span>
                    <span>Week 27</span>
                    <span>Week 40</span>
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-gray-500">
                    <span>First Trimester</span>
                    <span className="ml-16">Second Trimester</span>
                    <span className="mr-8">Third Trimester</span>
                  </div>
                </div>
              </div>

              {/* Tabbed Interface */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                <div className="flex border-b">
                  <button
                    className={`px-6 py-3 font-medium ${
                      activeTab === "overview"
                        ? "bg-purple-100 text-purple-800 border-b-2 border-purple-600"
                        : "text-gray-600 hover:bg-purple-50"
                    }`}
                    onClick={() => setActiveTab("overview")}
                  >
                    Overview
                  </button>
                  <button
                    className={`px-6 py-3 font-medium ${
                      activeTab === "symptoms"
                        ? "bg-purple-100 text-purple-800 border-b-2 border-purple-600"
                        : "text-gray-600 hover:bg-purple-50"
                    }`}
                    onClick={() => setActiveTab("symptoms")}
                  >
                    Symptoms
                  </button>
                  <button
                    className={`px-6 py-3 font-medium ${
                      activeTab === "appointments"
                        ? "bg-purple-100 text-purple-800 border-b-2 border-purple-600"
                        : "text-gray-600 hover:bg-purple-50"
                    }`}
                    onClick={() => setActiveTab("appointments")}
                  >
                    Appointments
                  </button>
                  <button
                    className={`px-6 py-3 font-medium ${
                      activeTab === "weight"
                        ? "bg-purple-100 text-purple-800 border-b-2 border-purple-600"
                        : "text-gray-600 hover:bg-purple-50"
                    }`}
                    onClick={() => setActiveTab("weight")}
                  >
                    Weight
                  </button>
                  <button
                    className={`px-6 py-3 font-medium ${
                      activeTab === "notes"
                        ? "bg-purple-100 text-purple-800 border-b-2 border-purple-600"
                        : "text-gray-600 hover:bg-purple-50"
                    }`}
                    onClick={() => setActiveTab("notes")}
                  >
                    Notes
                  </button>
                </div>

                <div className="p-6">
                  {/* Overview Tab */}
                  {activeTab === "overview" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Fetal Development */}
                      <div>
                        <h2 className="text-2xl font-semibold text-purple-800 mb-4">
                          Baby at Week {fetalDevelopmentData?.week}
                        </h2>

                        <div className="mb-6 bg-purple-50 p-4 rounded-lg">
                          <img
                            src={fetalImageData?.data}
                            alt={`Fetal development at week ${fetalDevelopmentData?.week}`}
                            className="mx-auto rounded-lg shadow-md mb-4"
                          />
                          <div className="text-center text-sm text-gray-500 italic">
                            Illustration of fetal development at week{" "}
                            {fetalDevelopmentData?.week}
                          </div>
                        </div>

                        <div className="bg-pink-50 p-4 rounded-lg">
                          <h3 className="text-lg font-medium text-purple-700 mb-2">
                            Development Milestones
                          </h3>
                          <p className="text-gray-700">
                            {fetalDevelopmentData?.data}
                          </p>
                        </div>
                      </div>

                      {/* Quick Summary */}
                      <div>
                        <h2 className="text-2xl font-semibold text-purple-800 mb-4">
                          Your Pregnancy Summary
                        </h2>

                        {/* Due Date Info */}
                        <div className="bg-white border border-purple-100 rounded-lg p-4 mb-4 shadow-sm">
                          <h3 className="text-lg font-medium text-purple-700 mb-2">
                            Important Dates
                          </h3>
                          <p className="text-gray-700 mb-1">
                            <span className="font-medium">Due Date:</span>{" "}
                            {formatDate(dueDate)}
                          </p>
                          <p className="text-gray-700">
                            <span className="font-medium">Days Remaining:</span>{" "}
                            {daysRemaining}
                          </p>
                        </div>

                        {/* Next Appointment */}
                        <div className="bg-white border border-purple-100 rounded-lg p-4 mb-4 shadow-sm">
                          <h3 className="text-lg font-medium text-purple-700 mb-2">
                            Next Appointment
                          </h3>
                          {upcomingAppointments.length > 0 ? (
                            <div>
                              <p className="text-gray-700 mb-1">
                                <span className="font-medium">
                                  {formatDate(upcomingAppointments[0].date)}
                                </span>
                              </p>
                              <p className="text-gray-700">
                                {upcomingAppointments[0].description}
                              </p>
                              <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded mt-2">
                                {appointmentTypes.find(
                                  (type) =>
                                    type.value === upcomingAppointments[0].type
                                )?.label || "Appointment"}
                              </span>
                            </div>
                          ) : (
                            <p className="text-gray-500 italic">
                              No upcoming appointments
                            </p>
                          )}
                        </div>

                        {/* Recent Symptoms */}
                        <div className="bg-white border border-purple-100 rounded-lg p-4 mb-4 shadow-sm">
                          <h3 className="text-lg font-medium text-purple-700 mb-2">
                            Your Recent Symptoms
                          </h3>
                          {userSymptoms.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {userSymptoms.slice(-5).map((symptom, index) => (
                                <span
                                  key={index}
                                  className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm"
                                >
                                  {symptom}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <p className="text-gray-500 italic">
                              No symptoms recorded
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Symptoms Tab */}
                  {activeTab === "symptoms" && (
                    <div>
                      <h2 className="text-2xl font-semibold text-purple-800 mb-4">
                        Symptom Tracker
                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Common Symptoms */}
                        <div>
                          <h3 className="text-lg font-medium text-gray-700 mb-3">
                            Common Symptoms in{" "}
                            {currentTrimester.charAt(0).toUpperCase() +
                              currentTrimester.slice(1)}{" "}
                            Trimester
                          </h3>
                          <div className="bg-pink-50 p-4 rounded-lg mb-6">
                            <ul className="space-y-2">
                              {symptoms.map((symptom, index) => (
                                <li key={index} className="flex items-center">
                                  <span className="h-2 w-2 bg-pink-400 rounded-full mr-2"></span>
                                  {symptom}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <h3 className="text-lg font-medium text-gray-700 mb-3">
                            Add New Symptom
                          </h3>
                          <div className="flex mb-4">
                            <input
                              type="text"
                              value={newSymptom}
                              onChange={(e) => setNewSymptom(e.target.value)}
                              placeholder="Enter symptom..."
                              className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                            />
                            <button
                              onClick={handleAddSymptom}
                              className="bg-purple-600 text-white px-4 py-2 rounded-r-md hover:bg-purple-700 transition duration-300"
                            >
                              Add
                            </button>
                          </div>
                        </div>

                        {/* Your Symptoms */}
                        <div>
                          <h3 className="text-lg font-medium text-gray-700 mb-3">
                            Your Recorded Symptoms
                          </h3>
                          {userSymptoms.length > 0 ? (
                            <div className="bg-white border border-purple-100 rounded-lg p-4">
                              <ul className="space-y-2">
                                {userSymptoms.map((symptom, index) => (
                                  <li
                                    key={index}
                                    className="flex items-center justify-between bg-purple-50 p-3 rounded-md"
                                  >
                                    <div className="flex items-center">
                                      <span className="h-2 w-2 bg-purple-600 rounded-full mr-2"></span>
                                      {symptom}
                                    </div>
                                    <button
                                      onClick={() => {
                                        const updatedSymptoms = [
                                          ...userSymptoms,
                                        ];
                                        updatedSymptoms.splice(index, 1);
                                        setUserSymptoms(updatedSymptoms);
                                      }}
                                      className="text-red-500 hover:text-red-700"
                                    >
                                      ✕
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ) : (
                            <div className="bg-white border border-purple-100 rounded-lg p-8 text-center">
                              <p className="text-gray-500 italic">
                                No symptoms recorded yet
                              </p>
                              <p className="text-gray-500 text-sm mt-2">
                                Add your first symptom using the form on the
                                left
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Appointments Tab */}
                  {activeTab === "appointments" && (
                    <div>
                      <h2 className="text-2xl font-semibold text-purple-800 mb-4">
                        Appointment Tracker
                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Add Appointment */}
                        <div>
                          <h3 className="text-lg font-medium text-gray-700 mb-3">
                            Add New Appointment
                          </h3>
                          <div className="bg-white border border-purple-100 rounded-lg p-4">
                            <div className="space-y-4">
                              <div>
                                <label className="block text-gray-700 text-sm font-medium mb-1">
                                  Date
                                </label>
                                <input
                                  type="date"
                                  value={newAppointment.date}
                                  onChange={(e) =>
                                    setNewAppointment({
                                      ...newAppointment,
                                      date: e.target.value,
                                    })
                                  }
                                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                                />
                              </div>

                              <div>
                                <label className="block text-gray-700 text-sm font-medium mb-1">
                                  Type
                                </label>
                                <select
                                  value={newAppointment.type}
                                  onChange={(e) =>
                                    setNewAppointment({
                                      ...newAppointment,
                                      type: e.target.value,
                                    })
                                  }
                                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                                >
                                  {appointmentTypes.map((type) => (
                                    <option key={type.value} value={type.value}>
                                      {type.label}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div>
                                <label className="block text-gray-700 text-sm font-medium mb-1">
                                  Description
                                </label>
                                <input
                                  type="text"
                                  value={newAppointment.description}
                                  onChange={(e) =>
                                    setNewAppointment({
                                      ...newAppointment,
                                      description: e.target.value,
                                    })
                                  }
                                  placeholder="Enter details..."
                                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                                />
                              </div>

                              <button
                                onClick={handleAddAppointment}
                                className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-300"
                              >
                                Add Appointment
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Upcoming Appointments */}
                        <div>
                          <h3 className="text-lg font-medium text-gray-700 mb-3">
                            Upcoming Appointments
                          </h3>
                          {upcomingAppointments.length > 0 ? (
                            <div className="space-y-3">
                              {upcomingAppointments.map((apt, index) => (
                                <div
                                  key={index}
                                  className="bg-white border-l-4 border-pink-400 rounded-lg p-4 shadow-sm"
                                >
                                  <div className="flex justify-between">
                                    <p className="font-medium text-purple-800">
                                      {formatDate(apt.date)}
                                    </p>
                                    <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                                      {appointmentTypes.find(
                                        (type) => type.value === apt.type
                                      )?.label || "Appointment"}
                                    </span>
                                  </div>
                                  <p className="text-gray-700 mt-1">
                                    {apt.description}
                                  </p>
                                  <button
                                    onClick={() => {
                                      const updatedAppointments = [
                                        ...appointments,
                                      ];
                                      updatedAppointments.splice(index, 1);
                                      setAppointments(updatedAppointments);
                                    }}
                                    className="text-red-500 text-sm hover:text-red-700 mt-2"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="bg-white border border-purple-100 rounded-lg p-8 text-center">
                              <p className="text-gray-500 italic">
                                No upcoming appointments
                              </p>
                              <p className="text-gray-500 text-sm mt-2">
                                Add your first appointment using the form on the
                                left
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Weight Tab */}
                  {activeTab === "weight" && (
                    <div>
                      <h2 className="text-2xl font-semibold text-purple-800 mb-4">
                        Weight Tracker
                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Add Weight */}
                        <div>
                          <h3 className="text-lg font-medium text-gray-700 mb-3">
                            Add New Entry
                          </h3>
                          <div className="bg-white border border-purple-100 rounded-lg p-4">
                            <div className="space-y-4">
                              <div>
                                <label className="block text-gray-700 text-sm font-medium mb-1">
                                  Date
                                </label>
                                <input
                                  type="date"
                                  value={newWeight.date}
                                  onChange={(e) =>
                                    setNewWeight({
                                      ...newWeight,
                                      date: e.target.value,
                                    })
                                  }
                                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                                />
                              </div>

                              <div>
                                <label className="block text-gray-700 text-sm font-medium mb-1">
                                  Weight (lbs)
                                </label>
                                <input
                                  type="number"
                                  value={newWeight.weight}
                                  onChange={(e) =>
                                    setNewWeight({
                                      ...newWeight,
                                      weight: e.target.value,
                                    })
                                  }
                                  placeholder="Enter weight in pounds..."
                                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                                />
                              </div>

                              <button
                                onClick={handleAddWeight}
                                className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                              >
                                Save Entry
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Weight History */}
                        <div>
                          <h3 className="text-lg font-medium text-gray-700 mb-3">
                            Weight History
                          </h3>
                          <div className="bg-white border border-purple-100 rounded-lg p-4">
                            {weightTracker.length > 0 ? (
                              <div className="space-y-4">
                                {/* Weight Chart */}
                                <div className="h-64">
                                  <LineChart
                                    data={weightTracker}
                                    margin={{
                                      top: 5,
                                      right: 20,
                                      bottom: 20,
                                      left: 20,
                                    }}
                                  >
                                    <XAxis
                                      dataKey="date"
                                      tickFormatter={(date) =>
                                        new Date(date).toLocaleDateString()
                                      }
                                      label={{
                                        value: "Date",
                                        position: "bottom",
                                      }}
                                    />
                                    <YAxis
                                      label={{
                                        value: "Weight (lbs)",
                                        angle: -90,
                                        position: "left",
                                      }}
                                      domain={["auto", "auto"]}
                                    />
                                    <Tooltip
                                      formatter={(value) => [
                                        `${value} lbs`,
                                        "Weight",
                                      ]}
                                      labelFormatter={(date) =>
                                        new Date(date).toLocaleDateString()
                                      }
                                    />
                                    <Legend />
                                    <Line
                                      type="monotone"
                                      dataKey="weight"
                                      stroke="#8884d8"
                                      activeDot={{ r: 8 }}
                                    />
                                  </LineChart>
                                </div>

                                {/* Weight Table */}
                                <div className="mt-4">
                                  <h4 className="text-md font-medium text-gray-700 mb-2">
                                    Recent Entries
                                  </h4>
                                  <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                      <thead className="bg-gray-50">
                                        <tr>
                                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
                                          </th>
                                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Weight
                                          </th>
                                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Change
                                          </th>
                                          <th className="px-4 py-2"></th>
                                        </tr>
                                      </thead>
                                      <tbody className="bg-white divide-y divide-gray-200">
                                        {weightTracker
                                          .slice()
                                          .reverse()
                                          .slice(0, 5)
                                          .map((entry, index) => {
                                            const prevEntry =
                                              index > 0
                                                ? weightTracker
                                                    .slice()
                                                    .reverse()[index - 1]
                                                : null;
                                            const change = prevEntry
                                              ? (
                                                  entry.weight -
                                                  prevEntry.weight
                                                ).toFixed(1)
                                              : 0;
                                            const changeColor =
                                              change > 0
                                                ? "text-green-600"
                                                : change < 0
                                                ? "text-red-600"
                                                : "text-gray-600";

                                            return (
                                              <tr key={entry.id}>
                                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                                                  {new Date(
                                                    entry.date
                                                  ).toLocaleDateString()}
                                                </td>
                                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                                                  {entry.weight} lbs
                                                </td>
                                                <td
                                                  className={`px-4 py-2 whitespace-nowrap text-sm ${changeColor}`}
                                                >
                                                  {change > 0 ? "+" : ""}
                                                  {change} lbs
                                                </td>
                                                <td className="px-4 py-2 whitespace-nowrap text-right text-sm font-medium">
                                                  <button
                                                    onClick={() =>
                                                      handleDeleteWeight(
                                                        entry.id
                                                      )
                                                    }
                                                    className="text-red-600 hover:text-red-800"
                                                  >
                                                    Delete
                                                  </button>
                                                </td>
                                              </tr>
                                            );
                                          })}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="text-center py-8 text-gray-500">
                                <p>
                                  No weight entries yet. Add your first entry to
                                  start tracking!
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Weight Stats */}
                      {weightTracker.length > 0 && (
                        <div className="mt-8">
                          <h3 className="text-lg font-medium text-gray-700 mb-3">
                            Weight Summary
                          </h3>
                          <div className="bg-white border border-purple-100 rounded-lg p-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="p-4 bg-purple-50 rounded-lg">
                                <p className="text-sm text-gray-500">
                                  Starting Weight
                                </p>
                                <p className="text-xl font-semibold text-purple-800">
                                  {weightTracker.length > 0
                                    ? `${weightTracker[0].weight} lbs`
                                    : "—"}
                                </p>
                              </div>
                              <div className="p-4 bg-purple-50 rounded-lg">
                                <p className="text-sm text-gray-500">
                                  Current Weight
                                </p>
                                <p className="text-xl font-semibold text-purple-800">
                                  {weightTracker.length > 0
                                    ? `${
                                        weightTracker[weightTracker.length - 1]
                                          .weight
                                      } lbs`
                                    : "—"}
                                </p>
                              </div>
                              <div className="p-4 bg-purple-50 rounded-lg">
                                <p className="text-sm text-gray-500">
                                  Total Gain
                                </p>
                                <p className="text-xl font-semibold text-purple-800">
                                  {weightTracker.length > 1
                                    ? `${(
                                        weightTracker[weightTracker.length - 1]
                                          .weight - weightTracker[0].weight
                                      ).toFixed(1)} lbs`
                                    : "—"}
                                </p>
                              </div>
                            </div>

                            <div className="mt-4">
                              <h4 className="text-md font-medium text-gray-700 mb-2">
                                Recommended Weight Gain
                              </h4>
                              <p className="text-sm text-gray-500 mb-2">
                                Based on pre-pregnancy BMI, recommended weight
                                gain typically ranges:
                              </p>
                              <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                                <li>Underweight (BMI &lt; 18.5): 28-40 lbs</li>
                                <li>
                                  Normal weight (BMI 18.5-24.9): 25-35 lbs
                                </li>
                                <li>Overweight (BMI 25-29.9): 15-25 lbs</li>
                                <li>Obese (BMI &ge; 30): 11-20 lbs</li>
                              </ul>
                              <p className="text-sm text-gray-500 mt-2 italic">
                                Note: These are general guidelines. Always
                                consult with your healthcare provider for
                                personalized recommendations.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Notes Tab Content Would Go Here */}
                  {activeTab === "notes" && (
                    <div>
                      <h2 className="text-2xl font-semibold text-purple-800 mb-4">
                        Pregnancy Journal
                      </h2>
                      {/* Notes tab content implementation */}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default PregnancyTrackers;
