import React, { useState } from "react";
import sampleChats from './sampleChats.json';
export default function ChatPreview() {
  const serverName = "Women Wellness Hub";
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteCopied, setInviteCopied] = useState(false);

  const discordInviteLink = "discord.gg/fBBpPS7n";

  const copyInviteLink = () => {
    navigator.clipboard.writeText(discordInviteLink).then(() => {
      setInviteCopied(true);
      setTimeout(() => setInviteCopied(false), 3000);
    });
  };

  const categories = [
    {
      name: "WELCOME & RULES",
      channels: ["welcome", "rules"],
    },
    {
      name: "GENERAL DISCUSSIONS",
      channels: [
        "general-chat",
        "daily-check-in",
        "book-club",
        "girls-ask-women-answer",
      ],
    },
    {
      name: "HEALTH & WELLNESS",
      channels: [
        "mental-health",
        "fitness",
        "nutrition",
        "self-care",
        "postpartum-support",
        "period-health",
        "pregnancy-care",
        "sleep-health",
        "gut-health",
      ],
    },
    {
      name: "CAREER WELLNESS",
      channels: [
        "job-hunting",
        "work-life-balance",
        "salary-negotiations",
        "workplace-issues",
      ],
    },
    {
      name: "SUPPORT & SAFE SPACES",
      channels: ["body-positivity", "relationship-talk", "vent-and-support"],
    },
  ];


  const communityPurpose = {
    title: "Our Purpose",
    description:
      "Women Wellness Hub is a nurturing community where women can connect, share experiences, and support each other on their wellness journeys. We believe in holistic wellness that encompasses physical, mental, and emotional health.",
    values: [
      "Authentic connection in a safe, judgment-free space",
      "Evidence-based health information and resources",
      "Celebration of all bodies, backgrounds, and experiences",
      "Empowerment through shared knowledge and compassion",
    ],
  };

  return (
    <div className="flex h-screen bg-purple-50">
      {/* Welcome Modal */}
      {showWelcomeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-purple-800">
                Welcome to {serverName}
              </h2>
              <button
                onClick={() => setShowWelcomeModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="mb-6">
              <p className="text-lg text-purple-900 mb-4">
                {communityPurpose.description}
              </p>

              <h3 className="font-bold text-pink-700 mb-2">Our Values:</h3>
              <ul className="space-y-2">
                {communityPurpose.values.map((value, index) => (
                  <li key={index} className="flex items-center">
                    <span className="text-pink-500 mr-2">✦</span>
                    <span className="text-purple-800">{value}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg mb-6">
              <p className="italic text-purple-900">
                "In this space, your voice matters. Your experiences are valid.
                Your journey is unique. Here, we grow together through
                understanding and support."
              </p>
            </div>

            <button
              onClick={() => {
                setShowWelcomeModal(false);
                setShowInviteModal(true);
              }}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-lg 
              hover:from-purple-700 hover:to-pink-600 transition duration-200 shadow-md"
            >
              Join Our Community
            </button>
          </div>
        </div>
      )}

      {/* Discord Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-purple-800">
                Join our Discord Server
              </h2>
              <button
                onClick={() => setShowInviteModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="mb-6">
              <p className="text-purple-900 mb-4">
                Use this invite link to join our Discord community:
              </p>

              <div className="flex items-center bg-gray-100 p-3 rounded-lg">
                <span className="flex-grow font-medium text-purple-800 mr-2">
                  {discordInviteLink}
                </span>
                <button
                  onClick={copyInviteLink}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm transition"
                >
                  {inviteCopied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowInviteModal(false)}
                className="flex-1 py-2 border border-purple-600 text-purple-700 font-medium rounded-lg 
                hover:bg-purple-50 transition duration-200"
              >
                Close
              </button>
              <a
                href={`https://${discordInviteLink}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium rounded-lg 
                hover:from-purple-700 hover:to-pink-600 transition duration-200 shadow-md text-center"
              >
                Open Discord
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Server sidebar */}
      <div className="w-16  bg-purple-900 flex flex-col items-center py-4 transform -translate-x-4 relative top-[-20px]">
        <div className="w-10 h-10 rounded-full bg-pink-600 flex items-center justify-center text-white font-bold mb-6">
          W
        </div>
        <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold mb-3">
          H
        </div>
        <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold mb-3">
          S
        </div>
        <div className="w-10 h-10 rounded-full bg-purple-700 flex items-center justify-center text-white font-bold">
          +
        </div>
      </div>

      {/* Channel sidebar */}
      <div className="w-64  bg-purple-800 text-purple-100 flex flex-col transform -translate-x-4 relative top-[-20px]">
        <div className="p-4 border-b border-purple-700 flex items-center justify-between">
          <h1
            className="font-bold text-white cursor-pointer"
            onClick={() => window.open("https://discord.gg/fBBpPS7n", "_blank")}
          >
            {serverName}
          </h1>
          <div className="w-4 h-4 rounded-full bg-green-400"></div>
        </div>

        {/* Community purpose summary */}
        <div className="p-3 bg-purple-700 mb-2">
          <p className="text-xs text-purple-200">
            A safe space for women to connect, share, and support each other on
            their wellness journeys.
          </p>
        </div>

        <div className="overflow-y-auto flex-grow">
          {categories.map((category) => (
            <div key={category.name} className="mt-3">
              <h2 className="px-4 text-xs font-semibold text-pink-300 tracking-wider">
                {category.name}
              </h2>
              <ul className="mt-1">
                {category.channels.map((channel) => (
                  <li
                    key={channel}
                    className={`px-4 py-1 mx-2 rounded ${
                      selectedChannel === channel
                        ? "bg-purple-600 text-white"
                        : "text-purple-300 hover:text-purple-100 hover:bg-purple-700 cursor-pointer"
                    }`}
                    onClick={() => setSelectedChannel(channel)}
                  >
                    # {channel}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Join Discord button */}
        <div className="p-3">
          <button
            onClick={() => setShowInviteModal(true)}
            className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded
            hover:from-purple-600 hover:to-pink-600 transition duration-200 shadow-md"
          >
            Join Discord
          </button>
        </div>

        <div className="p-3 bg-purple-900 flex items-center">
          <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold mr-2">
            U
          </div>
          <div>
            <div className="text-white text-sm font-medium">Username</div>
            <div className="text-purple-300 text-xs">#1234</div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="w-[1200px] mx-auto bg-white shadow-lg rounded-lg h-full">
        {/* Channel header */}
        {selectedChannel ? (
          <>
            <div className="h-14 bg-purple-700 border-b border-purple-600 flex items-center px-4">
              <div className="flex items-center">
                <span className="text-purple-200 mr-2">#</span>
                <h2 className="text-white font-medium">{selectedChannel}</h2>
              </div>
            </div>

            {/* Chat messages */}
            <div className="flex-grow overflow-y-auto p-4 bg-purple-100 w-[1200px] h-[575px] ">
              {sampleChats[selectedChannel] ? (
                <div className="space-y-4">
                  {sampleChats[selectedChannel].map((chat, index) => (
                    <div key={index} className="flex items-start">
                      <div
                        className={`w-10 h-10 rounded-full ${chat.color} flex items-center justify-center text-white font-bold mr-3 shadow-md`}
                      >
                        {chat.avatar}
                      </div>
                      <div className="flex-grow bg-white p-3 rounded-lg shadow-sm">
                        <div className="flex items-baseline">
                          <span className="font-medium text-purple-800 mr-2">
                            {chat.user}
                          </span>
                          <span className="text-xs text-purple-400">
                            {chat.time}
                          </span>
                        </div>
                        <p className="text-purple-900 mt-1">{chat.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-purple-500 mt-10">
                  <p>No messages in this channel yet.</p>
                  <p className="text-sm mt-2">
                    Be the first to start a conversation!
                  </p>
                </div>
              )}
            </div>

            {/* Message input */}
            <div className="p-4 bg-purple-200">
              <div className="bg-white rounded-lg p-2 shadow-md">
                <input
                  type="text"
                  placeholder={`Message #${selectedChannel}`}
                  className="bg-transparent w-full text-purple-900 outline-none"
                  onFocus={() =>
                    window.open("https://discord.gg/fBBpPS7n", "_blank")
                  }
                />
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full ">
            <div className="text-center max-w-md p-6 bg-white rounded-xl shadow-lg">
              <div className="text-5xl mb-4">💜</div>
              <h2 className="text-2xl font-bold text-purple-800 mb-4">
                Welcome to {serverName}!
              </h2>

              <p className="text-purple-700 mb-4">
                {communityPurpose.description}
              </p>

              <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg mb-6">
                <h3 className="font-bold text-pink-700 mb-2">
                  Our Community Offers:
                </h3>
                <ul className="text-left space-y-2">
                  <li className="flex items-start">
                    <span className="text-pink-500 mr-2 mt-1">✦</span>
                    <span className="text-purple-800">
                      Expert advice from health professionals
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-500 mr-2 mt-1">✦</span>
                    <span className="text-purple-800">
                      Daily check-ins and supportive conversations
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-500 mr-2 mt-1">✦</span>
                    <span className="text-purple-800">
                      Resources for all aspects of women's wellness
                    </span>
                  </li>
                </ul>
              </div>

              <p className="text-purple-600 mb-4">
                Select a channel to start chatting or explore our community!
              </p>

              <button
                onClick={() => setShowInviteModal(true)}
                className="py-2 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg
                hover:from-purple-600 hover:to-pink-600 transition duration-200 shadow-md"
              >
                Join Discord Server
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
