import mongoose from "mongoose";
import "./Product";
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  location: String,
  image: String,
  bio: String,
  products: { type: [Schema.Types.ObjectId], ref: "Product" },
  chatPartners: [String]
});

const User =
  mongoose.models.User || mongoose.model("User", userSchema);

export default User;
