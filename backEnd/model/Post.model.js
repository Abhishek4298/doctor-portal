const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const postShema = new Schema(
  {
    isLike: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  },
  { versionKey: true }
);

const Post = mongoose.model("Post", postShema);

module.exports = Post;
