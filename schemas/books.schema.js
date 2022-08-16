import mongoose from 'mongoose';

const booksSchema = new mongoose.Schema(
  {
    name: {
     type: String,
      required: true,
    },
    books: { type: String },
  }
);

const Media = mongoose.model("books", booksSchema);

export default Media;