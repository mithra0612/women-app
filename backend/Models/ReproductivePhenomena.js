const mongoose = require("mongoose");

const ContentSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["video", "article"], // Ensures only these two types are allowed
  },
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: function () {
      return this.type === "video";
    },
  },
  videoId: {
    type: String,
    required: function () {
      return this.type === "video";
    },
  },
  imageUrl: {
    type: String,
    required: function () {
      return this.type === "article";
    },
  },
});

const Content = mongoose.model("reproductivephenomena", ContentSchema,"reproductivephenomena");

module.exports = Content;
