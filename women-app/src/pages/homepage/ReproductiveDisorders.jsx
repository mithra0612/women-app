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
import r1 from "../../assets/ReproductiveDisorders/rd1.png";
import r2 from "../../assets/ReproductiveDisorders/rd2.png";
import r3 from "../../assets/ReproductiveDisorders/rd3.png";
import r4 from "../../assets/ReproductiveDisorders/rd4.png";
import r5 from "../../assets/ReproductiveDisorders/rd5.png";
import r6 from "../../assets/ReproductiveDisorders/rd6.png";
import r7 from "../../assets/ReproductiveDisorders/rd7.png";
import r8 from "../../assets/ReproductiveDisorders/rd8.png";
import r9 from "../../assets/ReproductiveDisorders/rd9.png";
import r10 from "../../assets/ReproductiveDisorders/rd10.png";
import r11 from "../../assets/ReproductiveDisorders/rd11.png";

const ReproductiveDisorders = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [modalContent, setModalContent] = useState(null);
  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Added loading state

  const categories = [
    { id: "all", name: "All Topics" },
    { id: "pcos", name: "Polycystic Ovary Syndrome (PCOS)" },
    { id: "endometriosis", name: "Endometriosis" },
    { id: "uterine-fibroids", name: "Uterine Fibroids" },
    { id: "infertility", name: "Infertility" },
    { id: "pid", name: "Pelvic Inflammatory Disease (PID)" },
    { id: "vaginal-infections", name: "Vaginal Infections" },
  ];

  useEffect(() => {
    setIsLoading(true);
    fetch("https://women-app.onrender.com/api/reproductivedisorders")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        const mappedData = data.map((item) => {
          if (!item.imageUrl) return item;

          let imageUrl = item.imageUrl;
          if (imageUrl.includes("rd1.png")) imageUrl = r1;
          else if (imageUrl.includes("rd2.png")) imageUrl = r2;
          else if (imageUrl.includes("rd3.png")) imageUrl = r3;
          else if (imageUrl.includes("rd4.png")) imageUrl = r4;
          else if (imageUrl.includes("rd5.png")) imageUrl = r5;
          else if (imageUrl.includes("rd6.png")) imageUrl = r6;
          else if (imageUrl.includes("rd7.png")) imageUrl = r7;
          else if (imageUrl.includes("rd8.png")) imageUrl = r8;
          else if (imageUrl.includes("rd9.png")) imageUrl = r9;
          else if (imageUrl.includes("rd10.png")) imageUrl = r10;
          else if (imageUrl.includes("rd11.png")) imageUrl = r11;
          else console.warn("No matching image for:", item.imageUrl);

          return { ...item, imageUrl };
        });
        setContent(mappedData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

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
      if (item.type === "video" && item.videoId) {
        thumbnails[
          key
        ] = `https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`;
      } else if ((item.type === "blog" || item.type === "article") && item.imageUrl) {
        thumbnails[key] = item.imageUrl;
      }
    });
    return thumbnails;
  }

  const allThumbnails = generateAllThumbnails(content);
  content.forEach((item) => {
    if (item.id && item.type) {
      item.thumbnail = allThumbnails[`${item.type}${item.id}`];
    }
  });

  const filteredFeatured = featuredResources.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || item.type === activeTab;
    return matchesSearch && matchesTab;
  });

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

  // Skeleton Component
  const SkeletonCard = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gray-200"></div>
      <div className="p-4">
        <div className="flex items-center text-xs text-gray-500 mb-2">
          <div className="h-6 w-24 bg-gray-200 rounded"></div>
          <span className="mx-2">•</span>
          <div className="h-4 w-12 bg-gray-200 rounded"></div>
        </div>
        <div className="h-6 w-3/4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 w-full bg-gray-200 rounded mb-4"></div>
        <div className="h-4 w-2/3 bg-gray-200 rounded mb-4"></div>
        <div className="flex justify-between items-center">
          <div className="h-4 w-16 bg-gray-200 rounded"></div>
          <div className="h-4 w-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br">
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ml-[220px]">
        <h1 className="text-3xl font-bold text-purple-700 mb-4 text-left">
          Reproductive Disorders
        </h1>

        {/* Featured Resources Section */}
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
                  <div className="relative h-full" style={{ minHeight: "280px" }}>
                    <img
                      src={`https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`}
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

      <Modal content={modalContent} onClose={() => setModalContent(null)} />
    </div>
  );
};

export default ReproductiveDisorders;