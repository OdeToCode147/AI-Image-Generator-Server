const mongoose = require("mongoose");

const Post = new mongoose.Schema({
  name: { type: String, required: true },
  prompt: { type: String, required: true },
  photo: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
});

const PostSchema = mongoose.model("Post", Post);

module.exports = PostSchema;
