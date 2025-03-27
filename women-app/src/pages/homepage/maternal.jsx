import React, { useState, useEffect } from "react";
import {
  Search,
  Play,
  FileText,
  BookOpen,
  ChevronRight,
  X,
  Star,
  ArrowRight,
  ChevronLeft,
  ChevronDown,
} from "lucide-react";
import Depression from "../../assets/depression.jpeg";
import Pregnancy from "../../assets/pregnancy.jpg";
import Postpartum from "../../assets/postpartum.jpg";
import Breastfeeding from "../../assets/breastfeeding.jpg";
import Care from "../../assets/care.jpg";
import Postdepression from "../../assets/postdepression.jpg";
import Sidebar from "../../components/Sidebar/Sidebar";

const Maternals = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [modalContent, setModalContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  // Categories for women's health issues
  const categories = [
    { id: "all", name: "All Topics" },
    { id: "postpartum", name: "Postpartum Care" },
    { id: "pregnancy", name: "Pregnancy" },
    { id: "breastfeeding", name: "Breastfeeding" },
    { id: "maternal", name: "Maternal Health" },
    { id: "recovery", name: "Recovery" },
    { id: "complications", name: "Complications" },
  ];

  // YouTube video thumbnails
  const videoThumbnails = {
    video1: "https://img.youtube.com/vi/JMPckx9kDuA/maxresdefault.jpg",
    video2: "https://img.youtube.com/vi/h3GJ7TqDGZw/maxresdefault.jpg",
    video3: "https://img.youtube.com/vi/uGQeX2t6un8/maxresdefault.jpg",
    video4: "https://img.youtube.com/vi/Y9j_oemy-0Y/maxresdefault.jpg",
    video5: "https://img.youtube.com/vi/_4gpfOudxQc/maxresdefault.jpg",
    video6: "https://img.youtube.com/vi/BLtFIi6d9Xw/maxresdefault.jpg",
  };

  const [content, setContent] = useState([]);

  useEffect(() => {
    fetch("https://women-app.onrender.com/api//maternal")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        // Map the data to replace image paths with imported images
        const mappedData = data.map((item) => {
          let thumbnail = item.thumbnail;
          if (item.thumbnail.includes("depression.jpeg")) {
            thumbnail = Depression;
          } else if (item.thumbnail.includes("pregnancy.jpg")) {
            thumbnail = Pregnancy;
          } else if (item.thumbnail.includes("postpartum.jpg")) {
            thumbnail = Postpartum;
          } else if (item.thumbnail.includes("breastfeeding.jpg")) {
            thumbnail = Breastfeeding;
          } else if (item.thumbnail.includes("care.jpg")) {
            thumbnail = Care;
          } else if (item.thumbnail.includes("postdepression.jpg")) {
            thumbnail = Postdepression;
          }

          return {
            ...item,
            thumbnail,
          };
        });

        setContent(mappedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  // Featured resources
  const featuredResources = [
    {
      id: 101,
      type: "article",
      title: "Optimizing Postpartum Care",
      category: "postpartum",
      author: "ACOG",
      thumbnail: Postdepression,
      readTime: "12 min read",
      date: "Jan 20, 2025",
      description:
        "Clinical guidance for healthcare providers on optimizing care for women in the postpartum period, emphasizing the importance of ongoing care.",
      featured: true,
      url: "https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2018/05/optimizing-postpartum-care?utm",
    },
    {
      id: 102,
      type: "video",
      title: "Common Breastfeeding Problems and Solutions",
      category: "breastfeeding",
      author: "La Leche League",
      thumbnail: videoThumbnails.video3,
      duration: "22 min watch",
      date: "Jan 18, 2025",
      description:
        "Lactation consultants discuss common breastfeeding challenges and provide practical solutions for new mothers experiencing difficulties.",
      featured: true,
      url: "https://www.youtube.com/watch?v=uGQeX2t6un8",
      videoId: "uGQeX2t6un8",
    },
  ];

  // Filter content based on search, category, and tab
  const filteredContent = content.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;

    const matchesTab = activeTab === "all" || item.type === activeTab;

    return matchesSearch && matchesCategory && matchesTab;
  });

  // Filter featured resources
  const filteredFeatured = featuredResources.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;

    const matchesTab = activeTab === "all" || item.type === activeTab;

    return matchesSearch && matchesCategory && matchesTab;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredContent.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredContent.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Go to previous page
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Go to next page
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  // Content type icon mapping
  const getTypeIcon = (type) => {
    switch (type) {
      case "video":
        return <Play className="w-5 h-5" />;
      case "article":
        return <FileText className="w-5 h-5" />;
      case "blog":
        return <BookOpen className="w-5 h-5" />;
      default:
        return null;
    }
  };

  // Reset filters
  const resetFilters = () => {
    setActiveCategory("all");
    setActiveTab("all");
    setSearchQuery("");
    setCurrentPage(1);
  };

  // Modal for viewing content
  const Modal = ({ content, onClose }) => {
    if (!content) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">{content.title}</h2>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {content.type === "video" ? (
              <div className="mb-4 relative pt-[56.25%] w-full">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${content.videoId}`}
                  title={content.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <div className="mb-4">
                <img
                  src={content.thumbnail}
                  alt={content.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            )}

            <div className="flex items-center gap-3 text-sm text-gray-600 mb-4">
              <span className="font-medium">{content.author}</span>
              <span>•</span>
              <span>{content.date}</span>
              <span>•</span>
              <span>
                {content.type === "video" ? content.duration : content.readTime}
              </span>
              {content.featured && (
                <>
                  <span>•</span>
                  <span className="flex items-center text-yellow-500">
                    <Star className="w-4 h-4 mr-1" />
                    Featured
                  </span>
                </>
              )}
            </div>

            <p className="text-gray-700 mb-6">{content.description}</p>

            <div className="flex justify-between items-center mb-6">
              <button
                onClick={onClose}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
              >
                Close
              </button>

              <a
                href={content.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-200 transition flex items-center"
              >
                Visit Original Source
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Pagination component
  const Pagination = () => {
    return (
      <div className="flex flex-col sm:flex-row justify-between items-center mt-8 mb-4">
        <div className="flex items-center mb-4 sm:mb-0">
          <span className="text-sm text-gray-600 mr-2">Show:</span>
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="bg-white border border-gray-300 rounded-md p-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value={6}>6</option>
            <option value={9}>9</option>
            <option value={12}>12</option>
            <option value={24}>24</option>
          </select>
          <span className="text-sm text-gray-600 ml-2">per page</span>
        </div>

        <div className="flex items-center">
          <span className="text-sm text-gray-600 mr-4">
            {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredContent.length)} of {filteredContent.length}
          </span>
          
          <div className="flex">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className={`p-2 mx-1 rounded-md ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-purple-600 hover:bg-purple-100"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="hidden sm:flex">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                // Logic to show pages around the current page
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => paginate(pageNum)}
                    className={`w-8 h-8 mx-1 flex items-center justify-center rounded-md ${
                      currentPage === pageNum
                        ? "bg-purple-600 text-white"
                        : "bg-white text-gray-700 hover:bg-purple-100"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              {totalPages > 5 && currentPage < totalPages - 2 && (
                <>
                  <span className="flex items-center px-2">...</span>
                  <button
                    onClick={() => paginate(totalPages)}
                    className="w-8 h-8 mx-1 flex items-center justify-center rounded-md bg-white text-gray-700 hover:bg-purple-100"
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>
            
            <div className="sm:hidden flex items-center">
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
            </div>
            
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={`p-2 mx-1 rounded-md ${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-purple-600 hover:bg-purple-100"
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br">
      {/* Header */}
      <div className="w-[250px]">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ml-[220px]">
        <h1 className="text-3xl font-bold text-purple-700 mb-4 text-left">
          Maternal Health
        </h1>
        {filteredFeatured.length > 0 && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-purple-800">
                Featured Resources
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredFeatured.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg overflow-hidden cursor-pointer shadow-lg transition hover:shadow-xl"
                  onClick={() => setModalContent(item)}
                >
                  <div
                    className="relative h-full"
                    style={{ minHeight: "280px" }}
                  >
                    {/* Background image */}
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Purple gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-700 via-purple-500 to-transparent opacity-50"></div>

                    {/* Add a dark gradient at the bottom for better text readability */}
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent opacity-30"></div>

                    {/* Video play button for video content */}
                    {item.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="rounded-full bg-white bg-opacity-80 p-4">
                          <Play className="w-10 h-10 text-purple-700" />
                        </div>
                      </div>
                    )}

                    {/* Content positioned at the bottom */}
                    <div className="absolute inset-x-0 bottom-0 p-6 text-white z-10">
                      {/* Content type badge */}
                      <div className="uppercase text-xs font-bold tracking-wider mb-2 bg-purple-600 bg-opacity-60 inline-block px-2 py-1 rounded-sm">
                        {item.type}
                      </div>

                      {/* Title */}
                      <h3 className="font-bold text-2xl mb-2">{item.title}</h3>

                      {/* Author and read time or duration */}
                      <div className="text-sm mb-2">
                        {item.author} •{" "}
                        {item.type === "video" ? item.duration : item.readTime}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Search Bar */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Search for postpartum care, breastfeeding resources, or pregnancy topics..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
          />
        </div>
        {/* Categories */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  setCurrentPage(1); // Reset to first page when changing category
                }}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  activeCategory === category.id
                    ? "bg-purple-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        {/* Content Type Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <div className="flex space-x-8">
            <button
              onClick={() => {
                setActiveTab("all");
                setCurrentPage(1); // Reset to first page when changing tab
              }}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "all"
                  ? "border-purple-600 text-purple-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              All Content
            </button>
            <button
              onClick={() => {
                setActiveTab("article");
                setCurrentPage(1); // Reset to first page when changing tab
              }}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === "article"
                  ? "border-purple-600 text-purple-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <FileText className="w-4 h-4 mr-2" />
              Articles
            </button>
            <button
              onClick={() => {
                setActiveTab("blog");
                setCurrentPage(1); // Reset to first page when changing tab
              }}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === "blog"
                  ? "border-purple-600 text-purple-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Blogs
            </button>
            <button
              onClick={() => {
                setActiveTab("video");
                setCurrentPage(1); // Reset to first page when changing tab
              }}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === "video"
                  ? "border-purple-600 text-purple-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <Play className="w-4 h-4 mr-2" />
              Videos
            </button>
          </div>
        </div>
        
        {/* Show results count and current filters */}
        <div className="mb-4 text-sm text-gray-600">
          <span>
            {filteredContent.length} {filteredContent.length === 1 ? 'result' : 'results'} found
          </span>
          {(activeCategory !== "all" || activeTab !== "all" || searchQuery) && (
            <button 
              onClick={resetFilters}
              className="ml-2 text-purple-600 hover:text-purple-800 underline"
            >
              Clear filters
            </button>
          )}
        </div>
        
        {/* Content Grid */}
        {filteredContent.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
                  onClick={() => setModalContent(item)}
                >
                  <div className="relative">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                    {item.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                        <div className="rounded-full bg-white bg-opacity-80 p-3">
                          <Play className="w-8 h-8 text-purple-700" />
                        </div>
                      </div>
                    )}
                    <div className="absolute top-2 right-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center text-xs text-gray-500 mb-2">
                      <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
                        {categories.find((cat) => cat.id === item.category)?.name}
                      </span>
                      <span className="mx-2">•</span>
                      <span>
                        {item.type === "video" ? item.duration : item.readTime}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-gray-800">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">{item.date}</span>
                      <div className="flex items-center text-purple-600 text-sm font-medium">
                        {item.type === "video" ? (
                          <span>Watch now</span>
                        ) : (
                          <span>Read more</span>
                        )}
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination controls */}
            {filteredContent.length > itemsPerPage && <Pagination />}
          </>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg">
              No content found matching your criteria.
            </p>
            <button
              onClick={resetFilters}
              className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

      {/* Modal */}
      <Modal content={modalContent} onClose={() => setModalContent(null)} />
    </div>
  );
};

export default Maternals;