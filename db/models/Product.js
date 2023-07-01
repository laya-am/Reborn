import mongoose from "mongoose";
import "./User";
const { Schema } = mongoose;

const productSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  image: String,
  date: String,
  location: String,
  coordinates: [{
    longitude: Number,
    latitude: Number,
  }],
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
