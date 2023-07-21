const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema(
  {
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    post: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const CommentsModel = mongoose.model("comment", commentsSchema);

module.exports = CommentsModel;
