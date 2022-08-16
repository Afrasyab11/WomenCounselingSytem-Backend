import mongoose from "mongoose";

var UserSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  cnic: {
    type: String,
    required: true,
   
   //match: ["^d{5}-d{7}-[2,4,6,8]{1}$"]
  },
  password: { type: String },
});

var UsersSchema = mongoose.model("User", UserSchema);

export default UsersSchema;