import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, X, BotIcon, ArrowRight, ChevronLeft } from "lucide-react";
import axios from "axios";

// Enhanced text formatting function
const renderFormattedText = (text) => {
  // Render bold text (double asterisks)
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Render points/lists (single asterisk at start of line)
  text = text.replace(/^\* (.*)/gm, '<li>$1</li>');
  text = text.replace(/<\/li>\n<li>/g, '</li><li>');
  text = text.replace(/(<li>.*<\/li>)/s, '<ul class="list-disc pl-5">$1</ul>');
  
  // Render italics (single asterisks not at line start)
  text = text.replace(/(?<!^)\*(.*?)\*(?!$)/g, '<em>$1</em>');

  return <div dangerouslySetInnerHTML={{ __html: text }} />;
};

const formatTime = (timestamp) => new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [currentView, setCurrentView] = useState("categories");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const samplePrompts = [
    {
      category: "Physical Health",
      icon: "💪",
      prompts: [
        "What are the key health screenings I should get in my 30s?",
        "How can I maintain a healthy menstrual cycle?",
        "What exercises are best for women's overall fitness?",
        "Tips for managing PCOS symptoms naturally",
      ],
    },
    {
      category: "Mental Wellness",
      icon: "🧘‍♀️",
      prompts: [
        "How to manage stress and anxiety effectively",
        "Strategies for improving mental health and self-care",
        "Dealing with hormonal mood swings",
        "Building emotional resilience",
      ],
    },
    {
      category: "Nutrition & Lifestyle",
      icon: "🥗",
      prompts: [
        "Best diet for hormonal balance",
        "Nutrition tips for women's energy and wellness",
        "How sleep impacts overall health",
        "Supplements every woman should consider",
      ],
    },
    {
      category: "Reproductive Health",
      icon: "❤️",
      prompts: [
        "Understanding fertility and family planning",
        "Contraception options explained",
        "Signs of reproductive health issues",
        "Preparing for pregnancy",
      ],
    },
  ];

  // Format user message to request concise bullet-pointed responses
  const formatUserMessage = (messageText) => {
    return `${messageText} Please provide your response in short, easy-to-understand bullet points that are concise and readable.`;
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentView("prompts");
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setCurrentView("categories");
  };

  const handleSamplePromptClick = (selectedPrompt) => {
    setMessage(selectedPrompt);
    handleSendMessage(selectedPrompt);
  };

  const handleSendMessage = async (prefilledMessage = null) => {
    const messageToSend = prefilledMessage || message;

    if (!messageToSend.trim() || isLoading) return;

    // Store original message for display
    const originalMessage = messageToSend;
    // Format message with bullet point instruction for API
    const formattedMessage = formatUserMessage(messageToSend);

    const userMessage = {
      text: originalMessage, // Display original message to user
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await axios.post("https://women-app.onrender.com/chat-gemini", {
        chat: formattedMessage, // Send formatted message to API
        history: chatHistory,
      });

      const botMessage = {
        text: response.data.text,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setChatHistory((prev) => [
        ...prev,
        { role: "user", parts: [{ text: formattedMessage }] },
        { role: "model", parts: [{ text: response.data.text }] },
      ]);

      setMessage("");
      setCurrentView("categories");
      setSelectedCategory(null);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        text: "Sorry, there was an error processing your message.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen && (
        <div className="w-96 h-[550px] bg-white shadow-2xl rounded-xl border border-gray-200 flex flex-col transform transition-all duration-300 ease-in-out">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 flex justify-between items-center rounded-t-xl">
            <div className="flex items-center space-x-3">
              <BotIcon className="text-white" size={24} />
              <h3 className="font-semibold text-lg">Women's Health Assistant</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-blue-700 p-1 rounded-full transition-colors"
            >
              <X className="text-white" size={24} />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-gray-100">
            {messages.length === 0 && (
              <div className="mb-4">
                {currentView === "categories" && (
                  <>
                    <h4 className="text-sm font-semibold text-gray-600 mb-3">
                      Select a Health Category
                    </h4>
                    <div className="space-y-3">
                      {samplePrompts.map((category) => (
                        <button
                          key={category.category}
                          onClick={() => handleCategorySelect(category)}
                          className="w-full text-left p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-between"
                        >
                          <div className="flex items-center">
                            <span className="mr-3 text-xl">{category.icon}</span>
                            <span>{category.category}</span>
                          </div>
                          <ArrowRight size={16} />
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {currentView === "prompts" && selectedCategory && (
                  <>
                    <button
                      onClick={handleBackToCategories}
                      className="mb-3 text-blue-600 flex items-center hover:text-blue-800"
                    >
                      <ChevronLeft size={16} className="mr-1" />
                      Back to Categories
                    </button>
                    <h4 className="text-sm font-semibold text-gray-600 mb-3">
                      {selectedCategory.category} Questions
                    </h4>
                    <div className="space-y-2">
                      {selectedCategory.prompts.map((prompt) => (
                        <button
                          key={prompt}
                          onClick={() => handleSamplePromptClick(prompt)}
                          className="w-full text-left p-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-between"
                        >
                          <span className="truncate pr-2">{prompt}</span>
                          <ArrowRight size={16} />
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`
                    p-3 rounded-2xl max-w-[80%] relative
                    ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"}
                    shadow-sm prose prose-sm
                  `}
                >
                  {renderFormattedText(msg.text)}
                  <span className="text-xs block mt-1 opacity-70">
                    {formatTime(msg.timestamp)}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start">
                <div className="bg-gray-100 text-gray-800 p-3 rounded-2xl max-w-[80%]">Typing...</div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-gray-200 flex items-center space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask any health question..."
              className="flex-grow p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              disabled={isLoading}
            />
            <button
              onClick={() => handleSendMessage()}
              className="bg-blue-500 text-white p-2.5 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
              disabled={isLoading}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          ${!isOpen ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center" : ""}
        `}
      >
        {!isOpen ? <MessageCircle size={24} /> : null}
      </button>
    </div>
  );
};

export default FloatingChatbot;