const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

// Import all Mongoose models
const Maternal = require("./Models/Maternal"); 
const Blogs = require("./Models/Blogs");
const Cancer = require("./Models/Cancer");
const HormonalDisorder = require("./Models/HormonalDisorder");
const ReproductiveDisorder = require("./Models/ReproductiveDisorders");
const ReproductivePhenomena = require("./Models/ReproductivePhenomena");
const SexualIntimate = require("./Models/SexualIntimate");
const Schemes = require("./Models/Schemes");

// Gemini AI import
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/Blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Initialize Gemini AI (from first code)
const genAI = new GoogleGenerativeAI('AIzaSyB99Sd3oSU1NdjYbG6AXizqJJ4uvDspLEg');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Gemini API details (from second code)
const GEMINI_2_API_KEY = "AIzaSyBcmdSino5nfSwjB99RJ67mw55wkf-UyZQ";  
const GEMINI_2_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_2_API_KEY}`;

// Database Content Routes
app.get("/api/maternal", async (req, res) => {
  try {
    const maternalContent = await Maternal.find();
    res.json(maternalContent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/blogs", async (req, res) => {
  try {
    const blogContent = await Blogs.find();
    res.json(blogContent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/cancer", async (req, res) => {
  try {
    const blogContent = await Cancer.find();
    res.json(blogContent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/hormonaldisorders', async (req, res) => {
  try {
    const hormonaldisorder = await HormonalDisorder.find();
    res.json(hormonaldisorder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/reproductivedisorders', async (req, res) => {
  try {
    const reproductivedisorders = await ReproductiveDisorder.find();
    res.json(reproductivedisorders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/reproductivephenomena', async (req, res) => {
  try {
    const reproductivephenomena = await ReproductivePhenomena.find();
    res.json(reproductivephenomena);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/sexualintimate', async (req, res) => {
  try {
    const sexualintimate = await SexualIntimate.find();
    res.json(sexualintimate);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/schemes', async (req, res) => {
  try {
    const schemes = await Schemes.find();
    res.json(schemes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Gemini-1.5 API Routes (from first code)
app.post("/chat", async (req, res) => {
  try {
    const chatHistory = req.body.history || [];
    const msg = req.body.chat;
    
    const chat = model.startChat({
      history: chatHistory
    });

    const result = await chat.sendMessage(msg);
    const response = await result.response;
    const text = response.text();

    res.send({ "text": text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/stream", async (req, res) => {
  try {
    const chatHistory = req.body.history || [];
    const msg = req.body.chat;
  
    const chat = model.startChat({
      history: chatHistory
    });
  
    res.setHeader('Content-Type', 'text/plain');
    const result = await chat.sendMessageStream(msg);
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      res.write(chunkText);
    }
    res.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Function to get Gemini-2.0 response (from second code)
async function getGemini2Response(userMessage) {
  try {
    const response = await axios.post(
      GEMINI_2_API_URL,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: userMessage }],
          },
        ],
        generationConfig: {
          temperature: 1,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
          responseMimeType: "text/plain",
        },
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
  } catch (error) {
    console.error("🔴 Gemini API Error:", error.response?.data || error.message);
    return `Error: ${error.response?.data?.error?.message || error.message}`;
  }
}

// Gemini-2.0 Chat Route (from second code, but with modified endpoint)
app.post("/chat-gemini2", async (req, res) => {
  const userMessage = req.body.message;
  const reply = await getGemini2Response(userMessage);
  res.json({ reply });
});

app.get("/api/hospitals", async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: "Latitude and Longitude are required" });
  }

  try {
    const response = await axios.get("https://api.geoapify.com/v2/places", {
      params: {
        categories: "healthcare.hospital",
        filter: `circle:${lon},${lat},5000`, // 5km radius
        bias: `proximity:${lon},${lat}`,
        limit: 10,
        apiKey: process.env.GEOAPIFY_API_KEY, // Store your Geoapify API Key in .env
      },
    });

    const hospitals = response.data.features.map((hospital) => ({
      id: hospital.properties.place_id,
      name: hospital.properties.name,
      address: hospital.properties.formatted || "Address not available",
    }));

    res.json(hospitals);
  } catch (error) {
    console.error("Error fetching hospitals:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch hospital data" });
  }
});


// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});