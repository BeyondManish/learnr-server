import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  description: {
    type: String,
  },
  tags: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Tag",
    }
  ],
  options: [
    {
      type: String,
    }
  ],
  correctOptions: [
    {
      type: String,
    }
  ],
  author: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, { timestamp: true });

const Question = mongoose.model('Question', QuestionSchema);

export default Question;