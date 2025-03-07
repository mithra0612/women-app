const mongoose = require("mongoose");

const maternalSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  type: { type: String, required: true, enum: ["article", "blog", "video"] },
  title: { type: String, required: true },
  category: { type: String, required: true },
  author: { type: String, required: true },
  thumbnail: { type: String, required: true }, 
  readTime: { type: String },
  duration: { type: String },
  date: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true },
  videoId: { type: String }, 
});

const Maternal = mongoose.model("Maternal", maternalSchema, "Maternal");
module.exports = Maternal;
