const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: [{ type: String }],
    car_type: { type: String, required: true },   // e.g., Sedan, SUV, etc.
    company: { type: String, required: true },    // e.g., Toyota, Honda, etc.
    dealer: { type: String, required: true },     // e.g., name or ID of the dealer
    images: [{ type: String }],                   // Array of image URLs/paths
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true } // adds createdAt and updatedAt timestamps
);

module.exports = mongoose.model("Car", carSchema);
