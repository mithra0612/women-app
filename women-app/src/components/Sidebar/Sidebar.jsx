import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { 
  Book, ListChecks, ShieldCheck, Droplet, HeartPulse, Trash2, 
  MessageCircle, Menu, Landmark, Calendar, Baby, Heart,
  HelpCircle, Lightbulb, Users, Activity, Flower, Apple,
  ChevronDown, ChevronRight, X
} from "lucide-react";

const Sidebar = () => {
  const [active, setActive] = useState(""); 
  const [collapsed, setCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  // Auto-expand sections and set active based on current route
  useEffect(() => {
    const path = location.pathname;
    const initialExpandedSections = {...expandedSections}; // Preserve existing expanded state
    
    // Find matching item and set active + expand section
    menuItems.forEach((section, sectionIndex) => {
      section.categories.forEach((category) => {
        if (!category.items) {
          if (category.path === path) {
            setActive(category.category);
          }
        } else {
          category.items.forEach((item) => {
            if (item.path === path) {
              setActive(item.name);
              initialExpandedSections[sectionIndex] = true; // Only expand the section if needed
            }
          });
        }
      });
    });
    
    setExpandedSections(initialExpandedSections);
  }, [location]);
  
  const toggleSection = (index) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Handle navigation without collapsing sidebar
  const handleNavigation = (path, itemName) => {
    navigate(path);
    setActive(itemName);
    // No need to modify collapsed state here
  };

  // Restructured menu items with logical grouping
  const menuItems = [
    // Health & Wellness Section
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
            { name: "Decomposition Techniques", icon: <Trash2 size={20} />, path: "/" }
          ]
        }
      ]
    },
    
    // Tools & Trackers Section
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
    
    // Resources Section
    { 
      section: "Resources",
      icon: <Book size={20} />,
      categories: [
        { category: "Myths vs Facts", icon: <Lightbulb size={20} />, path: "/spinner" },
        { category: "Government Schemes", icon: <Landmark size={20} />, path: "/schemes" },
      ]
    },
    
    // Community Section
    { 
      section: "Community & Support",
      icon: <Users size={20} />,
      categories: [
        { category: "Community Forum", icon: <MessageCircle size={20} />, path: "/community-forum" },
        { category: "Help & Support", icon: <HelpCircle size={20} />, path: "/help" }
      ]
    }
  ];

  return (
    <div
      className={`absolute left-0 top-0 ${
        collapsed ? "w-[80px]" : "w-[250px]"
      } min-h-screen text-white shadow-lg flex flex-col transition-all duration-300 z-10`}
      style={{ 
        backgroundColor: "#2C3E50",
        backgroundImage: "linear-gradient(135deg, #2C3E50 0%, #1E2B3A 100%)"
      }}
    >
      {/* Header with Logo and Toggle */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-gray-700 bg-opacity-20 bg-black">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Heart size={24} className="text-pink-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">WellCare</span>
          </div>
        )}
        
        <button
          className={`p-2 rounded-full hover:bg-white hover:bg-opacity-10 transition-all ${
            collapsed ? "mx-auto" : ""
          }`}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight size={22} /> : <X size={22} />}
        </button>
      </div>

      {/* Navigation Sections */}
      <div className="overflow-y-auto flex-1 py-4">
        {menuItems.map((section, sectionIndex) => (
          <div key={`section-${sectionIndex}`} className="mb-4">
            {/* Section Header - Only show if not collapsed */}
            {!collapsed ? (
              <div 
                className="flex items-center justify-between px-4 py-2 cursor-pointer group"
                onClick={() => toggleSection(sectionIndex)}
              >
                <div className="flex items-center gap-2">
                  <div className="text-pink-400">{section.icon}</div>
                  <span className="text-sm uppercase tracking-wider text-gray-300 font-semibold group-hover:text-white transition-colors">
                    {section.section}
                  </span>
                </div>
                <div className="text-gray-400">
                  {expandedSections[sectionIndex] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </div>
              </div>
            ) : (
              <div className="flex justify-center py-2 border-b border-gray-700 mx-2 mb-2">
                <div className="text-pink-400">{section.icon}</div>
              </div>
            )}

            {/* Categories within Section - Show only if section is expanded or in collapsed mode */}
            {(!collapsed || (collapsed && expandedSections[sectionIndex])) && (
              <ul className={`space-y-1 ${!collapsed && !expandedSections[sectionIndex] ? "hidden" : ""}`}>
                {section.categories.map((category, categoryIndex) => (
                  <div key={`category-${sectionIndex}-${categoryIndex}`}>
                    {/* Direct navigation for categories without subitems */}
                    {!category.items ? (
                      <li
                        className={`flex items-center ${
                          collapsed ? "justify-center mx-2" : "gap-3 pl-6 pr-3"
                        } py-3 rounded-lg cursor-pointer transition-all ${
                          active === category.category 
                            ? "bg-white bg-opacity-15 text-white" 
                            : "hover:bg-white hover:bg-opacity-10 text-gray-300 hover:text-white"
                        }`}
                        onClick={() => handleNavigation(category.path, category.category)}
                      >
                        <div className={active === category.category ? "text-pink-400" : ""}>{category.icon}</div>
                        {!collapsed && (
                          <span className="text-base font-medium">{category.category}</span>
                        )}
                      </li>
                    ) : (
                      <>
                        {/* Non-clickable category header for items with subitems */}
                        {!collapsed && (
                          <h3 className="text-sm font-medium text-gray-400 px-6 py-2 mt-2">
                            {category.category}
                          </h3>
                        )}

                        {/* Render subitems */}
                        {category.items.map((item, itemIndex) => (
                          <li
                            key={`item-${sectionIndex}-${categoryIndex}-${itemIndex}`}
                            className={`flex items-center ${
                              collapsed ? "justify-center mx-2" : "gap-3 pl-9 pr-3"
                            } py-2 rounded-lg cursor-pointer transition-all ${
                              active === item.name 
                                ? "bg-white bg-opacity-15 text-white" 
                                : "hover:bg-white hover:bg-opacity-10 text-gray-300 hover:text-white"
                            }`}
                            onClick={() => handleNavigation(item.path, item.name)}
                          >
                            <div className={active === item.name ? "text-pink-400" : ""}>{item.icon}</div>
                            {!collapsed && (
                              <span className="text-sm">{item.name}</span>
                            )}
                          </li>
                        ))}
                      </>
                    )}
                  </div>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      
      {/* Footer */}
      {!collapsed && (
        <div className="mt-auto border-t border-gray-700 p-4">
          <div className="bg-white bg-opacity-5 rounded-lg p-3">
            <p className="text-sm text-gray-300 mb-2">Need assistance?</p>
            <button 
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg px-4 py-2 w-full text-sm font-medium hover:from-pink-600 hover:to-purple-600 transition-all"
              onClick={() => handleNavigation('/help', 'Help & Support')}
            >
              Contact Support
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;