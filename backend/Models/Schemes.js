const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  benefits: {
    type: [String], // Array of strings
    required: true
  },
  eligibility: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  }
});

// Create the model
const Scheme = mongoose.model('schemes', schemeSchema,'schemes');

module.exports = Scheme;