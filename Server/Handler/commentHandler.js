const CommentsModel = require("../Models/Comment");
const PostModel = require("../Models/Post");

const addComment = async (req, res) => {
  try {
    const { post_id, comment } = req.body;

    if (!post_id || !comment)
      return res.json({
        success: false,
        message: "Insufficient data!",
      });
    console.log("user find", req.user);
    const user = req.user;
    console.log("user", user);

    const created = await CommentsModel.create({
      user,
      post: post_id,
      comment,
    });
    console.log(created);

    return res.json({
      success: true,
      message: "Comment added!",
      data: created,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Internal server error!",
    });
  }
};

const getComments = async (req, res) => {
  try {
    const postId = req.params.postId;
    // console.log(blogId);
    const post = await PostModel.findById(postId);
    if (!post)
      return res.json({
        success: false,
        message: "Post not found!",
      });
    // console.log(blog)

    const comments = await CommentsModel.find({
      post: postId,
    })
      .populate("user")
      .sort({ createdAt: -1 });

    console.log(comments);

    return res.json({
      success: true,
      message: `Comment list for ${postId}`,
      comments,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Internal server error!",
    });
  }
};

module.exports = {
  addComment,
  getComments,
};
