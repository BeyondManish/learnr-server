import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
}, { timestamps: true });

const Tag = mongoose.model("Tag", tagSchema);

export default Tag;
