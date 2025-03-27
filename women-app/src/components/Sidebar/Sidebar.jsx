import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Book, ListChecks, ShieldCheck, Droplet, HeartPulse, Trash2, 
  MessageCircle, ChevronDown, ChevronRight, X,
  Landmark, Calendar, Baby, Heart, HelpCircle, Lightbulb, 
  Users, Activity, Flower, Apple
} from "lucide-react";

const Sidebar = () => {
  const [active, setActive] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    let newActive = "";
    const newExpandedSections = {};

    menuItems.forEach((section, sectionIndex) => {
      section.categories.forEach((category) => {
        if (!category.items) {
          if (category.path === path) {
            newActive = category.category;
            newExpandedSections[sectionIndex] = true;
          }
        } else {
          category.items.forEach((item) => {
            if (item.path === path) {
              newActive = item.name;
              newExpandedSections[sectionIndex] = true;
            }
          });
        }
      });
    });

    setActive(newActive);
    setExpandedSections(newExpandedSections);
  }, [location.pathname]);

  const toggleSection = (index) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleNavigation = (path, itemName) => {
    navigate(path);
    setActive(itemName);
  };

  const menuItems = [
    { 
      section: "Health & Wellness",
      icon: <Heart size={20} />,
      categories: [
        { 
          category: "Women's Wellness", 
          items: [
            { name: "Reproductive Health", icon: <Flower size={20} />, path: "/reproductive-phenomena" },
            { name: "Maternal Health", icon: <Baby size={20} />, path: "/maternal-health" },
            { name: "Sexual & Intimate Health", icon: <Heart size={20} />, path: "/sexual-intimate-health" }
          ]
        },
        { 
          category: "Diseases & Disorders", 
          items: [
            { name: "Mental Health", icon: <Book size={20} />, path: "/blogs" },
            { name: "Cancer Awareness", icon: <HeartPulse size={20} />, path: "/cancer" },
            { name: "Hormonal Disorders", icon: <Activity size={20} />, path: "/hormonal-disorders" },
            { name: "Reproductive Disorders", icon: <ListChecks size={20} />, path: "/reproductive-disorders" }
          ]
        },
        { 
          category: "Sanitary Guidance", 
          items: [
            { name: "Sanitary Products", icon: <Droplet size={20} />, path: "/sanitary" },
            { name: "Decomposition Techniques", icon: <Trash2 size={20} />, path: "/disposals" }
          ]
        }
      ]
    },
    { 
      section: "Tools & Trackers",
      icon: <Calendar size={20} />,
      categories: [
        { 
          category: "Trackers", 
          items: [
            { name: "Period Tracker", icon: <Calendar size={20} />, path: "/period-tracker" },
            { name: "Pregnancy Tracker", icon: <Baby size={20} />, path: "/pregnancy-tracker" }
          ]
        },
        { category: "AI Diet Planner", icon: <Apple size={20} />, path: "/ai-diet" },
        { category: "Home Remedies", icon: <ShieldCheck size={20} />, path: "/remedies" },
      ]
    },
    { 
      section: "Resources",
      icon: <Book size={20} />,
      categories: [
        { category: "Myths vs Facts", icon: <Lightbulb size={20} />, path: "/spinner" },
        { category: "Government Schemes", icon: <Landmark size={20} />, path: "/schemes" },
      ]
    },
    { 
      section: "Community & Support",
      icon: <Users size={20} />,
      categories: [
        { category: "Community Forum", icon: <MessageCircle size={20} />, path: "/community-forum" },
        { category: "Help Center", icon: <HelpCircle size={20} />, path: "/help" }
      ]
    }
  ];

  return (
    <div
      className={`fixed left-0 top-0 ${
        collapsed ? "w-[80px]" : "w-[250px]"
      } h-screen text-white shadow-lg flex flex-col transition-all duration-300 z-10`}
      style={{ 
        backgroundColor: "#2C3E50",
        backgroundImage: "linear-gradient(135deg, #2C3E50 0%, #1E2B3A 100%)"
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-gray-700 bg-opacity-20 bg-black shrink-0">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Heart size={24} className="text-pink-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">WellCare</span>
          </div>
        )}
        <button
          className={`p-2 rounded-full hover:bg-white hover:bg-opacity-10 transition-all ${collapsed ? "mx-auto" : ""}`}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight size={22} /> : <X size={22} />}
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto py-4">
        {menuItems.map((section, sectionIndex) => (
          <div key={section.section} className="mb-4">
            <div 
              className={`flex items-center ${collapsed ? "justify-center" : "justify-between px-4"} py-2 cursor-pointer hover:bg-white hover:bg-opacity-10`}
              onClick={() => toggleSection(sectionIndex)}
            >
              <div className="flex items-center gap-2">
                <div className="text-pink-400">{section.icon}</div>
                {!collapsed && (
                  <span className="text-sm uppercase tracking-wider text-gray-300 font-semibold">
                    {section.section}
                  </span>
                )}
              </div>
              {!collapsed && (
                <div className="text-gray-400">
                  {expandedSections[sectionIndex] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </div>
              )}
            </div>

            {(expandedSections[sectionIndex] || collapsed) && (
              <ul className={`${collapsed ? "mt-2" : "space-y-1"}`}>
                {section.categories.map((category) => (
                  <div key={category.category}>
                    {!collapsed && category.items && (
                      <h3 className="text-sm font-medium text-gray-400 px-6 py-2">
                        {category.category}
                      </h3>
                    )}
                    
                    {category.items ? (
                      category.items.map((item) => (
                        <li
                          key={item.name}
                          className={`flex items-center ${
                            collapsed ? "justify-center mx-2" : "gap-3 pl-9 pr-3"
                          } py-2 rounded-lg cursor-pointer transition-all ${
                            active === item.name 
                              ? "bg-white bg-opacity-15 text-white" 
                              : "hover:bg-white hover:bg-opacity-10 text-gray-300"
                          }`}
                          onClick={() => handleNavigation(item.path, item.name)}
                        >
                          <div className={active === item.name ? "text-pink-400" : ""}>{item.icon}</div>
                          {!collapsed && <span className="text-sm">{item.name}</span>}
                        </li>
                      ))
                    ) : (
                      <li
                        className={`flex items-center ${
                          collapsed ? "justify-center mx-2" : "gap-3 pl-6 pr-3"
                        } py-2 rounded-lg cursor-pointer transition-all ${
                          active === category.category 
                            ? "bg-white bg-opacity-15 text-white" 
                            : "hover:bg-white hover:bg-opacity-10 text-gray-300"
                        }`}
                        onClick={() => handleNavigation(category.path, category.category)}
                      >
                        <div className={active === category.category ? "text-pink-400" : ""}>{category.icon}</div>
                        {!collapsed && <span className="text-base font-medium">{category.category}</span>}
                      </li>
                    )}
                  </div>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;