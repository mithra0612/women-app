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
import o1 from "../../assets/HormonalDisorders/o1.png";
import o2 from "../../assets/HormonalDisorders/o2.png";
import o3 from "../../assets/HormonalDisorders/o3.png";
import o4 from "../../assets/HormonalDisorders/o4.png";
import th1 from "../../assets/HormonalDisorders/th1.png";
import th2 from "../../assets/HormonalDisorders/th2.png";
import th3 from "../../assets/HormonalDisorders/th3.png";
import th4 from "../../assets/HormonalDisorders/th4.png";
import h1 from "../../assets/HormonalDisorders/h1.png";
import h2 from "../../assets/HormonalDisorders/h2.png";
import menopause1 from "../../assets/reproductivePhenomena/menopause1.png";
import menopause2 from "../../assets/reproductivePhenomena/menopause2.png";
import menopause3 from "../../assets/reproductivePhenomena/menopause3.png";

const HormonalDisorders = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [modalContent, setModalContent] = useState(null);
  const [content, setContent] = useState([]);

  // Categories for women's health issues
  const categories = [
    { id: "all", name: "All Topics" },
    { id: "menopause", name: "Menopause & Perimenopause" },
    { id: "osteoporosis", name: "Osteoporosis & Bone Health" },
    { id: "hormonal-imbalances", name: "Hormonal Imbalances" },
    { id: "thyroid", name: "Thyroid Disorders" },
  ];
  
  useEffect(() => {
    fetch("http://localhost:5000/api/hormonaldisorders")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Data:", data); // Debugging log

        const mappedData = data.map((item) => {
          if (!item.imageUrl) {
            return item; // If no imageUrl, return item as is
          }

          let imageUrl = item.imageUrl;

          if (imageUrl.includes("o1.png")) {
            imageUrl = o1;
          } else if (imageUrl.includes("o2.png")) {
            imageUrl = o2;
          } else if (imageUrl.includes("o3.png")) {
            imageUrl = o3;
          } else if (imageUrl.includes("o4.png")) {
            imageUrl = o4;
          } else if (imageUrl.includes("th1.png")) {
            imageUrl = th1;
          } else if (imageUrl.includes("th2.png")) {
            imageUrl = th2;
          } else if (imageUrl.includes("th3.png")) {
            imageUrl = th3;
          } else if (imageUrl.includes("th4.png")) {
            imageUrl = th4;
          } else if (imageUrl.includes("h1.png")) {
            imageUrl = h1;
          } else if (imageUrl.includes("h2.png")) {
            imageUrl = h2;
          } else if (imageUrl.includes("menopause1.png")) {
            imageUrl = menopause1;
          } else if (imageUrl.includes("menopause2.png")) {
            imageUrl = menopause2;
          } else if (imageUrl.includes("menopause3.png")) {
            imageUrl = menopause3;
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
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;

    const matchesTab = activeTab === "all" || item.type === activeTab;

    return matchesSearch && matchesCategory && matchesTab;
  });

  const featuredResources = [
    {
      id: 11,
      type: "video",
      title:
        "Female Infertility: Causes & Diagnosis in Tamil | Dr. Archana S Ayyanathan",
      category: "infertility",
      author: "Dr. Archana S Ayyanathan",
      duration: "6:30",
      date: "2020-11-15",
      description:
        "Dr. Archana explains the causes and diagnosis of female infertility in Tamil for better accessibility.",
      url: "https://youtu.be/7EOaM2R6EbY",
      videoId: "7EOaM2R6EbY",
    },

    {
      id: 12,
      type: "video",
      title:
        "Pelvic Inflammatory Disease (PID) Signs & Symptoms (& Why They Occur)",
      category: "pid",
      author: "Unknown",
      duration: "4:55",
      date: "2021-02-28",
      description:
        "An overview of PID, focusing on its signs, symptoms, and the biological reasons behind them.",
      url: "https://youtu.be/CIKDjKY9mmY",
      videoId: "CIKDjKY9mmY",
    },
  ];

  function generateAllThumbnails(contents) {
    const thumbnails = {};

    contents.forEach((item) => {
      const key = `${item.type}${item.id}`;

      // Handle different content types
      if (item.type === "video" && item.videoId) {
        thumbnails[
          key
        ] = `https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`;
      } else if (item.type === "blog" && item.imageUrl) {
        thumbnails[key] = item.imageUrl;
      } else if (item.type === "article" && item.imageUrl) {
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
      {/* Main Content */}
      <Sidebar />
      <main className="max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px- ml-[220px]">
        {/* Main Heading - Moved to the top left and styled with purple color */}
        <h1 className="text-3xl font-bold text-purple-700 mb-4 text-left">Hormonal Disorders</h1>
        
        {/* Featured Resources Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-purple-800">
              Featured Resources
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredResources.map((item) => (
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
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-600 via-purple-300 to-transparent opacity-50"></div>

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
        {filteredContent.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 content-grid">
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
                      {categories.find((cat) => cat.id === item.category)?.name || item.category}
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

export default HormonalDisorders;