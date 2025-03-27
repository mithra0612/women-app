import React, { useState } from "react";

const Hospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchHospitals = () => {
    setError("");
    setHospitals([]);
    setLoading(true);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://women-app.onrender.com/api/hospitals?lat=${latitude}&lon=${longitude}`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch data. Please try again.");
          }

          const data = await response.json();

          if (!data || data.length === 0) {
            setError("No hospitals found nearby.");
          } else {
            setHospitals(data);
          }
        } catch (err) {
          console.error("Fetch error:", err);
          setError("Failed to fetch data. Please check your connection.");
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        setError("Unable to get location. Please enable location services.");
        setLoading(false);
      }
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-5 mt-10 ml-[-5px]">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Find Nearby Hospitals</h2>

      <div className="flex items-center justify-center mb-5">
        <button
          onClick={fetchHospitals}
          className="px-5 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Fetching..." : "Find Hospitals Near Me"}
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-600 font-semibold">{error}</p>}

      {/* Display Hospitals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 -ml-1">
        {hospitals.map((hospital) => (
          <div
            key={hospital.id}
            className="p-6 bg-pink-100 rounded-xl shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:rotate-2 hover:bg-pink-200 hover:shadow-2xl hover:opacity-95"
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">{hospital.name}</h3>
            <p className="text-gray-600">{hospital.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hospitals;
