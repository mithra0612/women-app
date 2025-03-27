import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Send, Utensils, Salad, Info } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // Add this import for GitHub Flavored Markdown (tables support)
import Sidebar from "../../components/Sidebar/Sidebar";

function Chatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [expandedMessage, setExpandedMessage] = useState(null);
  const [userInfo, setUserInfo] = useState({
    name: null,
    age: null,
    healthConditions: null,
    collectingData: false,
    dataStage: 0,
    mealPreference: null,
    isVegetarian: null,
  });
  const chatRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Function to start the user data collection process
  const startUserDataCollection = () => {
    const welcomeMessage = {
      sender: "bot",
      text: "Welcome! Let's create a personalized diet plan for you. Please provide some basic details:\n\nEnter your name:",
    };
    setMessages((prev) => [...prev, welcomeMessage]);
    setUserInfo((prev) => ({
      ...prev,
      collectingData: true,
      dataStage: 1,
    }));
  };

  // Function to process user data input
  const processUserDataInput = async (input) => {
    const { dataStage } = userInfo;

    if (dataStage === 1) {
      setUserInfo((prev) => ({
        ...prev,
        name: input,
        dataStage: 2,
      }));
      const agePrompt = {
        sender: "bot",
        text: `Thanks, ${input}! Please enter your age:`,
      };
      setMessages((prev) => [...prev, agePrompt]);
      return true;
    } else if (dataStage === 2) {
      const age = parseInt(input);
      if (isNaN(age)) {
        const invalidAgePrompt = {
          sender: "bot",
          text: "Please enter a valid age (e.g., 35):",
        };
        setMessages((prev) => [...prev, invalidAgePrompt]);
        return true;
      }

      setUserInfo((prev) => ({
        ...prev,
        age: age,
        dataStage: 3,
      }));
      const healthPrompt = {
        sender: "bot",
        text: "Do you have any health conditions? (If none, type 'Nil')",
      };
      setMessages((prev) => [...prev, healthPrompt]);
      return true;
    } else if (dataStage === 3) {
      setUserInfo((prev) => ({
        ...prev,
        healthConditions: input,
        dataStage: 4,
      }));

      const mealPrompt = {
        sender: "bot",
        text: "What kind of meal would you like recommendations for? (Breakfast, Lunch, Dinner, or Snack)",
      };
      setMessages((prev) => [...prev, mealPrompt]);
      return true;
    } else if (dataStage === 4) {
      // Validate meal type input
      const mealType = input.toLowerCase().trim();
      const validMeals = ["breakfast", "lunch", "dinner", "snack"];

      if (!validMeals.includes(mealType)) {
        const invalidMealPrompt = {
          sender: "bot",
          text: "Please select one of: Breakfast, Lunch, Dinner, or Snack",
        };
        setMessages((prev) => [...prev, invalidMealPrompt]);
        return true;
      }

      setUserInfo((prev) => ({
        ...prev,
        mealPreference: mealType,
        dataStage: 5,
      }));

      // Ask for vegetarian preference
      const vegPrompt = {
        sender: "bot",
        text: "Would you like vegetarian-only options or non-vegetarian options too? (Type 'Veg' or 'Non-Veg')",
      };
      setMessages((prev) => [...prev, vegPrompt]);
      return true;
    } else if (dataStage === 5) {
      // Process vegetarian preference
      const vegChoice = input.toLowerCase().trim();

      if (vegChoice !== "veg" && vegChoice !== "non-veg") {
        const invalidVegPrompt = {
          sender: "bot",
          text: "Please select either 'Veg' or 'Non-Veg':",
        };
        setMessages((prev) => [...prev, invalidVegPrompt]);
        return true;
      }

      setUserInfo((prev) => ({
        ...prev,
        isVegetarian: vegChoice === "veg",
        dataStage: 6,
        collectingData: false,
      }));

      await generateDietPlanFromAPI();
      return true;
    }

    return false;
  };

  // Function to generate a Tamil cuisine diet plan using Gemini 2.0 API
  const generateDietPlanFromAPI = async () => {
    const { name, age, healthConditions, mealPreference, isVegetarian } =
      userInfo;
    setIsThinking(true);
    setIsProcessing(true);

    try {
      // Explicitly specify vegetarian-only if the user selected "Veg"
      const vegPreference = isVegetarian
        ? "vegetarian-only"
        : "with both vegetarian and non-vegetarian";

      let prompt = `Generate a Tamil cuisine ${mealPreference} ${vegPreference} meal plan for ${name}, age ${age}.`;

      if (healthConditions && healthConditions.toLowerCase() !== "nil") {
        prompt += ` They have the following health condition: ${healthConditions}.`;
      }

      prompt +=
        " Provide traditional Tamil Nadu dishes specifically for this meal type. Add special recommendations based on their age and health conditions. Use Tamil terms with English translations. Format the response as a markdown table with columns for Dish Name (with Tamil name and English translation), Description, Ingredients, and Health Benefits. Keep the table compact with 4-5 dish options.";

      // Ensure vegetarian-only if the user selected "Veg"
      if (isVegetarian) {
        prompt += " Ensure all dishes are strictly vegetarian.";
      }

      const response = await axios.post("https://women-app.onrender.com/chat-gemini2", {
        message: prompt,
      });

      let botText = response.data.reply;

      // Add a follow-up message to the end of the diet plan
      botText +=
        "\n\nFeel free to ask any questions about these dishes, their ingredients, or other Tamil cuisine recommendations! I'm here to help.";

      setIsThinking(false);

      // Display the full message at once
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: botText, original: botText },
      ]);
      setIsProcessing(false);
    } catch (error) {
      console.error("Error:", error);
      setIsThinking(false);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "❌ I'm having trouble generating your diet plan. Please try again.",
        },
      ]);
      setIsProcessing(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isProcessing) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    const userInput = input.trim();
    setInput("");

    if (
      messages.length === 0 ||
      (messages.length === 1 && messages[0].sender === "user")
    ) {
      startUserDataCollection();
      return;
    }

    if (userInfo.collectingData) {
      if (await processUserDataInput(userInput)) {
        return;
      }
    }

    // Check if the user explicitly requests non-vegetarian options
    const isExplicitNonVegRequest =
      userInput.toLowerCase().includes("non-veg") ||
      userInput.toLowerCase().includes("non vegetarian");

    if (isExplicitNonVegRequest && userInfo.isVegetarian) {
      // Warn the user that they previously selected vegetarian-only
      const warningMessage = {
        sender: "bot",
        text: "You previously selected vegetarian-only options. If you'd like to include non-vegetarian dishes, please restart the process and select 'Non-Veg' when asked.",
      };
      setMessages((prev) => [...prev, warningMessage]);
      return;
    }

    setIsThinking(true);
    setIsProcessing(true);

    try {
      const requestData = {
        message: `${userInput} (Please provide information in the context of Tamil Nadu cuisine and traditional South Indian nutrition)`,
      };

      const response = await axios.post(
        "http://localhost:5000/chat-gemini2",
        requestData
      );
      const botText = response.data.reply;
      const originalText = botText;

      setIsThinking(false);

      // Display the full message at once
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: botText, original: originalText },
      ]);
      setIsProcessing(false);
    } catch (error) {
      console.error("Error:", error);
      setIsThinking(false);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "❌ I'm having trouble processing your request. Please try again.",
        },
      ]);
      setIsProcessing(false);
    }
  };
  const toggleMessageExpansion = (index) => {
    if (expandedMessage === index) {
      setExpandedMessage(null);
    } else {
      setExpandedMessage(index);
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      sendMessage();
    }
  };

  return (
    <div className="ml-[260px] flex h-screen bg-gradient-to-br from-green-50 to-indigo-50">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="bg-white shadow-sm p-4 border-b border-gray-200">
            <div className="max-w-screen-xl mx-auto">
              <div className="flex items-center justify-center gap-3">
                <Salad size={30} className="text-green-600" />
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-indigo-600">
                  Tamil Cuisine Diet Planner
                </h1>
                <Utensils size={26} className="text-indigo-600" />
              </div>
              <p className="text-center text-gray-600 italic text-sm mt-1">
                Your personal Tamil Nadu nutrition consultant
              </p>
            </div>
          </div>

          {/* Chat area - Takes up all available space */}
          <div className="flex-1 overflow-hidden flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={chatRef}>
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4 text-gray-500">
                  <div className="animate-pulse flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-green-400 to-indigo-400">
                    <Utensils size={32} className="text-white" />
                  </div>
                  <p className="font-medium">
                    Type 'hi' to start creating your personalized Tamil cuisine
                    diet plan!
                  </p>
                  <div className="flex flex-wrap gap-2 text-sm justify-center">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">
                      Traditional meals
                    </span>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full">
                      Health-focused
                    </span>
                    <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full">
                      Personalized plans
                    </span>
                  </div>
                </div>
              )}

              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`p-4 max-w-sm md:max-w-2xl lg:max-w-3xl rounded-2xl shadow-md text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                        : "bg-gradient-to-r from-green-100 to-green-50 border-green-200 border text-gray-800 relative"
                    }`}
                  >
                    <div className="markdown-content">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          // Custom components for markdown elements
                          table: ({ node, ...props }) => (
                            <div className="overflow-x-auto my-2">
                              <table
                                className="min-w-full border-collapse border border-green-200"
                                {...props}
                              />
                            </div>
                          ),
                          thead: ({ node, ...props }) => (
                            <thead className="bg-green-100" {...props} />
                          ),
                          th: ({ node, ...props }) => (
                            <th
                              className="border border-green-200 px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                              {...props}
                            />
                          ),
                          tr: ({ node, ...props }) => (
                            <tr className="hover:bg-green-50" {...props} />
                          ),
                          td: ({ node, ...props }) => (
                            <td
                              className="border border-green-200 px-4 py-2 text-sm text-gray-700"
                              {...props}
                            />
                          ),
                          strong: ({ node, ...props }) => (
                            <strong
                              className="font-bold text-emerald-700"
                              {...props}
                            />
                          ),
                          em: ({ node, ...props }) => (
                            <em className="italic text-indigo-600" {...props} />
                          ),
                          ul: ({ node, ...props }) => (
                            <ul
                              className="list-disc pl-5 space-y-1"
                              {...props}
                            />
                          ),
                          ol: ({ node, ...props }) => (
                            <ol
                              className="list-decimal pl-5 space-y-1"
                              {...props}
                            />
                          ),
                          li: ({ node, ...props }) => (
                            <li className="mb-1" {...props} />
                          ),
                          h1: ({ node, ...props }) => (
                            <h1
                              className="text-xl font-bold my-2 text-green-800"
                              {...props}
                            />
                          ),
                          h2: ({ node, ...props }) => (
                            <h2
                              className="text-lg font-bold my-2 text-green-700"
                              {...props}
                            />
                          ),
                          h3: ({ node, ...props }) => (
                            <h3
                              className="text-md font-bold my-2 text-green-600"
                              {...props}
                            />
                          ),
                        }}
                      >
                        {msg.sender === "bot" &&
                        msg.original &&
                        expandedMessage === index
                          ? msg.original
                          : msg.text}
                      </ReactMarkdown>
                    </div>

                    {msg.sender === "bot" &&
                      msg.original &&
                      msg.text !== msg.original && (
                        <button
                          onClick={() => toggleMessageExpansion(index)}
                          className="mt-2 text-xs flex items-center text-green-700 hover:text-green-900"
                        >
                          {expandedMessage === index ? (
                            <>
                              <span className="mr-1">–</span>
                              Show less
                            </>
                          ) : (
                            <>
                              <span className="mr-1">+</span>
                              Show full response
                            </>
                          )}
                        </button>
                      )}
                  </div>
                </div>
              ))}

              {isThinking && (
                <div className="flex justify-start">
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-green-100 to-green-50 border-green-200 border flex items-center gap-2">
                    <div className="flex gap-1">
                      <span
                        className="w-2 h-2 bg-green-600 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></span>
                      <span
                        className="w-2 h-2 bg-green-600 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></span>
                      <span
                        className="w-2 h-2 bg-green-600 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></span>
                    </div>
                    <span className="text-xs text-green-800">
                      Preparing Tamil cuisine diet advice ...
                    </span>
                  </div>
                </div>
              )}

              {/* This is where new messages will appear - scrolls here */}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area - Fixed at bottom */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="max-w-screen-xl mx-auto">
                <div className="flex bg-gray-50 rounded-xl overflow-hidden border border-gray-200 focus-within:ring-2 focus-within:ring-green-500 focus-within:border-transparent transition-all">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleInputKeyDown}
                    className="flex-1 p-4 bg-transparent focus:outline-none text-gray-800 placeholder-gray-500"
                    placeholder={
                      userInfo.collectingData
                        ? "Type your answer here..."
                        : "Type 'hi' to start or ask about Tamil cuisine..."
                    }
                  />
                  <button
                    onClick={sendMessage}
                    disabled={isProcessing}
                    className={`px-5 flex items-center justify-center ${
                      isProcessing
                        ? "bg-gray-400"
                        : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                    } text-white transition-all duration-200`}
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add some CSS for markdown content */}
      <style jsx global>{`
        .markdown-content table {
          border-collapse: collapse;
          margin: 10px 0;
          width: 100%;
        }

        .markdown-content th,
        .markdown-content td {
          border: 1px solid #d1fae5;
          padding: 8px;
          text-align: left;
        }

        .markdown-content th {
          background-color: #ecfdf5;
          font-weight: bold;
        }

        .markdown-content tr:nth-child(even) {
          background-color: #f8fafc;
        }

        .markdown-content ul,
        .markdown-content ol {
          padding-left: 20px;
          margin: 10px 0;
        }

        .markdown-content strong {
          font-weight: bold;
          color: #047857;
        }

        .markdown-content em {
          font-style: italic;
          color: #4f46e5;
        }

        .markdown-content h1,
        .markdown-content h2,
        .markdown-content h3 {
          margin-top: 16px;
          margin-bottom: 8px;
          font-weight: bold;
        }

        .markdown-content h1 {
          font-size: 1.5rem;
          color: #065f46;
        }

        .markdown-content h2 {
          font-size: 1.25rem;
          color: #047857;
        }

        .markdown-content h3 {
          font-size: 1.1rem;
          color: #059669;
        }
      `}</style>
    </div>
  );
}

export default Chatbot;
