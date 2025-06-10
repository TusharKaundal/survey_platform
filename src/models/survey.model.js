const mongoose = require("mongoose");

const surveySchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["draft", "active", "completed"],
      required: true,
    },
    questions: {
      type: Array,
      required: true,
    },
    published_at: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

// Optional: Export model
const Survey = mongoose.model("Survey", surveySchema);
module.exports = Survey;
