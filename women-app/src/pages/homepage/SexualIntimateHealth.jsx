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
} from "lucide-react";
import s1 from "../../assets/SexualHealth/s1.png";
import s2 from "../../assets/SexualHealth/s2.png";
import s3 from "../../assets/SexualHealth/s3.png";
import d1 from "../../assets/SexualHealth/d1.png";
import d2 from "../../assets/SexualHealth/d2.png";

const SexualIntimateHealths = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [modalContent, setModalContent] = useState(null);
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Categories for women's health issues
  const categories = [
    { "id": "all", "name": "All Topics" },
    { "id": "sexual-intimate-health", "name": "Sexual & Intimate Health" },
    { "id": "dyspareunia", "name": "Dyspareunia (Pain During Sex)" },
    { "id": "low-libido", "name": "Low Libido & Sexual Dysfunction" },
  ];
  const [content, setContent] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/sexualintimate")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Data:", data);

        const mappedData = data.map((item) => {
          if (!item.imageUrl) {
            return item;
          }

          let imageUrl = item.imageUrl;

          if (imageUrl.includes("s1.png")) {
            imageUrl = s1;
          } else if (imageUrl.includes("s2.png")) {
            imageUrl = s2;
          } else if (imageUrl.includes("s3.png")) {
            imageUrl = s3;
          } else if (imageUrl.includes("d1.png")) {
            imageUrl = d1;
          } else if (imageUrl.includes("d2.png")) {
            imageUrl = d2;
          } else {
            console.warn("No matching image for:", item.imageUrl);
          }

          return {
            ...item,
            imageUrl,
          };
        });

        setContent(mappedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Filter content based on search, category, and tab
  const filteredContent = content.filter((item) => {
    const matchesSearch =
      item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;

    const matchesTab = activeTab === "all" || item.type === activeTab;

    return matchesSearch && matchesCategory && matchesTab;
  });

  // Calculate pagination values
  const totalPages = Math.ceil(filteredContent.length / itemsPerPage);
  
  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, activeTab, searchQuery]);
  
  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredContent.slice(indexOfFirstItem, indexOfLastItem);

  // Pagination controls
  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const featuredResources = [
    {
      "id": 23,
      "type": "video",
      "title": "5 Intimate Hygiene Tips For Women - Women's Sexual Health Advice By Dr. Seema Sharma Gynecologist",
      "category": "sexual-intimate-health",
      "author": "Dr. Seema Sharma",
      "duration": "6:30",
      "date": "2021-07-15",
      "description": "Dr. Seema Sharma, a gynecologist, shares five essential hygiene tips to maintain women's intimate health and promote sexual wellness.",
      "url": "https://youtu.be/ayn4f2HPE5A",
      "videoId": "ayn4f2HPE5A"
    },
    {
      "id": 24,
      "type": "video",
      "title": "8 Foods for a Happy and Healthy Vagina! | Sex Smarts Ep. 2 | soothingsista",
      "category": "sexual-intimate-health",
      "author": "soothingsista",
      "duration": "5:45",
      "date": "2019-09-20",
      "description": "Explores eight foods that support vaginal health, contributing to overall sexual and intimate wellness, in an engaging series format.",
      "url": "https://youtu.be/Nuusx7KjjnQ",
      "videoId": "Nuusx7KjjnQ"
    },
  ];

  function generateAllThumbnails(contents) {
    const thumbnails = {};
  
    contents.forEach((item) => {
      const key = `${item.type}${item.id}`;
      
      // Handle different content types
      if (item.type === 'video' && item.videoId) {
        thumbnails[key] = `https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`;
      } else if (item.type === 'blog' && item.imageUrl) {
        thumbnails[key] = item.imageUrl;
      } else if (item.type === 'article' && item.imageUrl) {
        thumbnails[key] = item.imageUrl;
      }
    });
  
    return thumbnails;
  }
  
  // Generate the thumbnails
  const allThumbnails = generateAllThumbnails(content);
  
  // Now add the thumbnails to the content array
  content.forEach((item) => {
    if (item.id && item.type) {
      item.thumbnail = allThumbnails[`${item.type}${item.id}`];
    }
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

  return (
    <div className="min-h-screen bg-gradient-to-br">
      {/* Header */}
      <div className="w-[250px]"></div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ml-[220px]">
      <h1 className="text-3xl font-bold text-purple-700 mb-4 text-left">
          Sexual and Intimate Health
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
                      src={`https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`}
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
            placeholder="Search for remedies, health topics, or specific concerns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
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
              onClick={() => setActiveTab("all")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "all"
                  ? "border-purple-600 text-purple-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              All Content
            </button>
            <button
              onClick={() => setActiveTab("article")}
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
              onClick={() => setActiveTab("blog")}
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
              onClick={() => setActiveTab("video")}
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

        {/* Content Grid */}
        {currentItems.length > 0 ? (
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
            
            {/* Pagination Controls */}
            <div className="mt-8 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredContent.length)} of {filteredContent.length} items
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className={`flex items-center px-3 py-2 rounded-md border ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </button>
                
                {/* Page Numbers */}
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    // For simplicity, show max 5 pages, with current page in the middle when possible
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
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-8 h-8 flex items-center justify-center rounded-md ${
                          currentPage === pageNum
                            ? "bg-purple-600 text-white"
                            : "bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`flex items-center px-3 py-2 rounded-md border ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg">
              No content found matching your criteria.
            </p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setActiveTab("all");
                setSearchQuery("");
              }}
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

export default SexualIntimateHealths;