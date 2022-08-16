import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    videos: [{ type: String }],
  }
 
);

var Media = mongoose.model("video", videoSchema);

export default Media;