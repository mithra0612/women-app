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
} from "lucide-react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Cs from "../../assets/cancer.jpg";
import Breast from "../../assets/breast.jpeg";
import Lung from "../../assets/lung.jpg";
import Immuno from "../../assets/immuno.jpg";
import Skin from "../../assets/skin.jpg";
import Collo from "../../assets/collo.webp";

const Cancers = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [modalContent, setModalContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Updated loading state name
  const [error, setError] = useState(null);
  const [content, setContent] = useState([]);

  const placeholderImage = (width, height) => {
    return `/api/placeholder/${width}/${height}`;
  };

  const categories = [
    { id: "all", name: "All Topics" },
    { id: "breast", name: "Breast Cancer" },
    { id: "lung", name: "Lung Cancer" },
    { id: "colon", name: "Colorectal Cancer" },
    { id: "prostate", name: "Prostate Cancer" },
    { id: "skin", name: "Skin Cancer" },
    { id: "treatment", name: "Treatment Options" },
    { id: "prevention", name: "Prevention" },
    { id: "support", name: "Support Resources" },
  ];

  const videoThumbnails = {
    video1: "https://img.youtube.com/vi/Tc1CO9D_kMs/maxresdefault.jpg",
    video2: "https://img.youtube.com/vi/H46Nhq62oTQ/maxresdefault.jpg",
    video3: "https://img.youtube.com/vi/v93bI-LBSAA/maxresdefault.jpg",
    video4: "https://img.youtube.com/vi/LrfE6JUwIms/maxresdefault.jpg",
    video5: "https://img.youtube.com/vi/olXAnrFbxkI/maxresdefault.jpg",
    video6: "https://img.youtube.com/vi/2DDGUOcPZO0/maxresdefault.jpg",
  };

  useEffect(() => {
    setIsLoading(true);
    fetch("https://women-app.onrender.com/api/cancer")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        const mappedData = data.map((item) => {
          let thumbnail = item.thumbnail;
          switch (true) {
            case item.title === "Understanding Cancer Staging and Grading":
              thumbnail = Cs;
              break;
            case item.title === "Breast Cancer Risk Factors and Prevention":
            case item.title === "Self-Breast Examination":
              thumbnail = Breast;
              break;
            case item.title === "Living with Lung Cancer: A Patient's Journey":
              thumbnail = Lung;
              break;
            case item.title === "Advances in Immunotherapy for Cancer Treatment":
            case item.title === "Cancer Immunotherapy: A Revolutionary Approach":
            case item.title === "Understanding Cancer Immunotherapy Breakthroughs":
            case item.title === "Coping with Cancer":
              thumbnail = Immuno;
              break;
            case item.title === "Sun Safety: Preventing Skin Cancer":
              thumbnail = Skin;
              break;
            case item.title === "Colorectal Cancer Screening Guidelines":
              thumbnail = Collo;
              break;
            case item.type === "video":
              thumbnail = item.thumbnail;
              break;
            default:
              thumbnail = item.thumbnail;
          }
          return { ...item, thumbnail };
        });
        setContent(mappedData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setIsLoading(false);
      });
  }, []);

  // Featured resources - Always display these
  const featuredResources = [
    {
      id: 101,
      type: "article",
      title: "Cancer Immunotherapy: A Revolutionary Approach",
      category: "treatment",
      author: "National Cancer Institute",
      thumbnail: Immuno,
      readTime: "15 min read",
      date: "Feb 10, 2025",
      description:
        "Explore how immunotherapy is transforming cancer treatment by harnessing the power of the body's immune system to fight cancer cells.",
      featured: true,
      url: "https://www.cancer.gov/about-cancer/treatment/types/immunotherapy",
    },
    {
      id: 102,
      type: "video",
      title: "Coping with Cancer",
      category: "treatment",
      author: "Mayo Clinic",
      thumbnail: videoThumbnails.video2,
      duration: "8 min watch",
      date: "Jan 22, 2025",
      description:
        "Experts explain how the revolutionary approach of immunotherapy is transforming cancer treatment by harnessing the body's own immune system.",
      featured: true,
      url: "https://www.youtube.com/watch?v=H46Nhq62oTQ",
      videoId: "H46Nhq62oTQ",
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

  // Skeleton Loader Component
  const SkeletonCard = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gray-200"></div>
      <div className="p-4">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
        <div className="flex justify-between">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );

  const Modal = ({ content, onClose }) => {
    if (!content) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">{content.title}</h2>
              <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
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
              <span>{content.type === "video" ? content.duration : content.readTime}</span>
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
      <div className="w-[250px]">
        <Sidebar />
      </div>
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ml-[220px]">
        <h1 className="text-3xl font-bold text-purple-700 mb-4 text-left">
          Cancer Awareness
        </h1>
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-purple-800">Featured Resources</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredResources.map((item) => (
              <div
                key={item.id}
                className="rounded-lg overflow-hidden cursor-pointer shadow-lg transition hover:shadow-xl"
                onClick={() => setModalContent(item)}
              >
                <div className="relative h-full" style={{ minHeight: "280px" }}>
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-700 via-purple-500 to-transparent opacity-50"></div>
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent opacity-30"></div>
                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="rounded-full bg-white bg-opacity-80 p-4">
                        <Play className="w-10 h-10 text-purple-700" />
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white z-10">
                    <div className="uppercase text-xs font-bold tracking-wider mb-2 bg-purple-600 bg-opacity-60 inline-block px-2 py-1 rounded-sm">
                      {item.type}
                    </div>
                    <h3 className="font-bold text-2xl mb-2">{item.title}</h3>
                    <div className="text-sm mb-2">
                      {item.author} • {item.type === "video" ? item.duration : item.readTime}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Search for cancer types, treatment options, or prevention resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
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
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : filteredContent.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContent.map((item) => (
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
                    <span>{item.type === "video" ? item.duration : item.readTime}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-800">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">{item.date}</span>
                    <div className="flex items-center text-purple-600 text-sm font-medium">
                      {item.type === "video" ? <span>Watch now</span> : <span>Read more</span>}
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
      <Modal content={modalContent} onClose={() => setModalContent(null)} />
    </div>
  );
};

export default Cancers;