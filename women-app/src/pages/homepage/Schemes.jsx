import React, { useState, useEffect } from "react";
import {
  ExternalLink,
  CheckCircle,
  X,
  Search,
  Filter,
  Users,
  Book,
  Briefcase,
  Heart,
  Bookmark,
} from "lucide-react";

const CategoryBadge = ({ children, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
      active
        ? "bg-pink-300 text-white shadow-lg shadow-pink-200"
        : "bg-white text-gray-600 hover:bg-gray-100"
    }`}
  >
    {children}
  </button>
);

const Modal = ({ isOpen, onClose, scheme }) => {
  if (!isOpen || !scheme) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md px-4">
      {/* Clickable background overlay */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 md:px-8 animate-fadeIn scale-105">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-gray-500 hover:text-gray-700 transition"
        >
          <X size={26} />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold text-pink-700">{scheme.title}</h2>
          <p className="text-gray-500 text-lg mt-1">{scheme.description}</p>
        </div>

        {/* Key Details in a Grid */}
        <div className="bg-gray-100 rounded-lg p-4 grid grid-cols-2 gap-4 text-gray-700">
          <div className="flex items-center gap-2">
            <Bookmark size={20} className="text-pink-600" />
            <p className="font-medium">Category:</p>
            <p className="text-gray-900">{scheme.category}</p>
          </div>
          <div className="flex items-center gap-2">
            <Users size={20} className="text-pink-600" />
            <p className="font-medium">Eligibility:</p>
            <p className="text-gray-900">{scheme.eligibility}</p>
          </div>
        </div>

        {/* Benefits List */}
        <div className="mt-5">
          <h3 className="text-lg font-semibold text-gray-800">Benefits</h3>
          <ul className="mt-2 space-y-2">
            {scheme.benefits.map((benefit, index) => (
              <li key={index} className="flex items-center gap-2 text-gray-700">
                <CheckCircle size={18} className="text-green-600" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <div className="mt-6 text-center">
          <a
            href={scheme.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 text-white bg-pink-600 hover:bg-pink-700 transition-all py-2 px-4 rounded-lg shadow-lg text-md font-medium"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
};

const SchemeCard = ({ scheme, onClick }) => {
  const getIcon = () => {
    if (scheme.title.toLowerCase().includes("employment"))
      return <Briefcase className="w-6 h-6 text-purple-300" />;
    if (scheme.title.toLowerCase().includes("education"))
      return <Book className="w-6 h-6 text-green-300" />;
    if (scheme.title.toLowerCase().includes("health"))
      return <Heart className="w-6 h-6 text-red-300" />;
    return <Users className="w-6 h-6 text-pink-300" />;
  };

  return (
    <div
      onClick={onClick}
      className="group border rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer bg-white hover:bg-gray-50 relative overflow-hidden"
    >
      <div className=" w-full h-full flex flex-col justify-between transition-colors duration-300  ">
        <div className="flex flex-col gap-2">
          {getIcon()}
          <h3 className="text-xl font-semibold text-black group-hover:text-pink-600 transition-colors duration-300">
            {scheme.title}
          </h3>
          <p className="text-gray-600 mt-2 line-clamp-2 text-sm">
            {scheme.description}
          </p>
        </div>
        <div className="mt-4 flex items-center text-sm text-pink-600 font-medium">
          <span>View Details</span>
          <ExternalLink className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </div>
  );
};

const Schemes = ({ collapsed }) => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredSchemes, setFilteredSchemes] = useState([]);

  // Fetch schemes data
  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/schemes");
        if (!response.ok) {
          throw new Error("Failed to fetch schemes");
        }
        const data = await response.json();
        setSchemes(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchSchemes();
  }, []);

  const categories = [
    "All",
    "Healthcare",
    "Education",
    "Employment",
    "Social Welfare",
    "Agriculture",
    "Defence",
    "Housing",
    "Science and Technology",
    "Governance",
    "Legal",
    "Financial Inclusion",
    "Skill Development",
    "Infrastructure",
    "Transport",
    "E-commerce",
    "Corporate Governance",
    "Child Welfare",
  ];

  // Filter schemes based on search term and category
  useEffect(() => {
    const filtered = schemes.filter((scheme) => {
      // Match search term
      const matchesSearch =
        scheme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.description.toLowerCase().includes(searchTerm.toLowerCase());

      // Match category
      const matchesCategory =
        selectedCategory === "All" || scheme.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    setFilteredSchemes(filtered);
  }, [searchTerm, selectedCategory, schemes]);

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (error)
    return <div className="text-center py-12 text-red-500">{error}</div>;

  return (
    <div
      className="min-h-screen py-12 transition-all duration-300"
      style={{
        marginLeft: collapsed ? "80px" : "250px",
        width: collapsed ? "calc(100% - 80px)" : "calc(100% - 250px)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-pink-500 mb-6">
            Government Schemes for Women
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Explore various government initiatives designed to support and
            empower women across India through financial assistance, skill
            development, and social welfare programs.
          </p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search schemes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-300"
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <CategoryBadge
                key={category}
                active={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </CategoryBadge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchemes.map((scheme) => (
            <SchemeCard
              key={scheme.id}
              scheme={scheme}
              onClick={() => setSelectedScheme(scheme)}
            />
          ))}
        </div>

        {filteredSchemes.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No schemes found matching your criteria
            </p>
          </div>
        )}

        <Modal
          scheme={selectedScheme}
          isOpen={!!selectedScheme}
          onClose={() => setSelectedScheme(null)}
        />
      </div>
    </div>
  );
};

export default Schemes;
