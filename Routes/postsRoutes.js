const express = require("express");
const dotenv = require("dotenv");
var cloudinary = require("cloudinary").v2;
const Post = require("../Database/Models/post");

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//Get all posts

router.route("/").get(async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: ["Fetching posts failed, please try again", error],
    });
  }
});

//Create a post

router.route("/").post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    const result = await cloudinary.uploader.upload(photo, {});

    const newPost = await Post.create({
      name,
      prompt,
      photo: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });

    res.status(200).json({ success: true, data: newPost });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: ["Unable to create a post, please try again", err],
    });
  }
});

module.exports = router;
