const PostModel = require("../Models/Post");
const { imageValidation, uploadImage } = require("../utils");

const addPost = async (req, res) => {
  try {
    const body = req.body;
    const imageFile = req.files.image;
    // console.log(imageFile);
    if (!imageValidation(imageFile.mimetype, res)) {
      return false;
    }

    const imageFileName = await uploadImage("uploads", imageFile);

    const post = await PostModel.create({
      title: body.title,
      description: body.description,
      creator_id: body.creator_id,
      creator: body.creator,
      image: "uploads/" + imageFileName,
    });
    await post.save();
    res.json({
      success: true,
      message: "Post Added Successfully",
      post,
    });
  } catch (error) {
    console.log(error);
  }
};

const editPost = async (req, res) => {
  try {
  } catch (error) {}
};

module.exports = {
  addPost,
};
