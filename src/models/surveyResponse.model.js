const mongoose = require("mongoose");

const surveyResponseSchema = new mongoose.Schema(
  {
    survey_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Survey",
      required: true,
    },
    respondent_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Respondent",
      required: true,
    },
    answers: {
      type: Object, // or Map if you want key-value pair control
      required: true,
    },
    completed_at: {
      type: Date,
      default: Date.now,
    },
    ip_address: {
      type: String,
      default: null,
    },
    user_agent: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: false, // completed_at is enough, no need for created_at/updated_at
  }
);

// Optional: Export model
const SurveyResponse = mongoose.model("SurveyResponse", surveyResponseSchema);
module.exports = SurveyResponse;
