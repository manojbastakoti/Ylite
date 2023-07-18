const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    creator_id: {
      type: String,
      required: true,
    },
    creator: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    viewed: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const PostModel = mongoose.model("post", postSchema);

module.exports = PostModel;
