const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: [
        "short-text",
        "long-text",
        "single-choice",
        "multiple-choice",
        "rating",
        "nps",
      ],
      required: true,
    },
    options: {
      type: [String],
      required: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

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
      default: "draft",
    },
    questions: {
      type: [questionSchema],
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

surveySchema.index({ user_id: 1, status: 1, created_at: -1 });

surveySchema.index({ title: "text", description: "text" });

surveySchema.index({ user_id: 1, title: 1 }, { unique: true });

const Survey = mongoose.model("Survey", surveySchema);
module.exports = Survey;
