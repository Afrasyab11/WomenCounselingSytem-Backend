import mongoose from 'mongoose';

const blogSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String }
},
{versionKey: false });

var blogsSchema = mongoose.model('blog', blogSchema);

export default blogsSchema;