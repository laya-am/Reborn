import mongoose from "mongoose";
// import "./Review";
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  location: String,
  profilePicture: String,
  bio: String
//   reviews: { type: [Schema.Types.ObjectId], ref: "Review" },
});

const User =
  mongoose.models.User || mongoose.model("User", userSchema);

export default User;
