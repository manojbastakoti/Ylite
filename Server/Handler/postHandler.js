const PostModel = require("../Models/Post");
const { imageValidation, uploadImage } = require("../utils");
const fs = require("fs");

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
    const id = req.params.id;
    const body = req.body;
    // console.log(req.user);
    // const blog = await BlogModel.findById(id);
    // console.log(blog)
    const edit = await PostModel.findByIdAndUpdate({ _id: id }, body, {
      new: true,
    });

    if (!edit)
      return res.json({
        success: false,
        message: "Post not found!",
      });
    console.log(edit.creator_id);
    console.log(req.user._id.toJSON());
    console.log(edit.creator_id !== req.user._id);

    if (edit.creator_id !== req.user._id.toJSON()) {
      return res.json({
        success: false,
        message: "Only author can edit!",
      });
    }

    if (req.files && req.files.image) {
      let imageFileName = null;
      const imageFile = req.files.image;
      if (!imageValidation(imageFile.mimetype, res)) {
        return false;
      }

      fs.unlink(edit.image, function (error) {
        console.log(error);
      });

      imageFileName = uploadImage("uploads", imageFile);
      edit.image = imageFileName ? `uploads/${imageFileName}` : null;
    }

    await edit.save();

    res.json({
      success: true,
      message: "Post updated successfully",
      edit,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addPost,
  editPost,
};
