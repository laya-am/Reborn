import dbConnect from "../../../../db/connect"
import Product from "../../../../db/models/Product"
import User from "../../../../db/models/User";

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  if(req.method === "GET"){
    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({ status: "Not Found" });
    }
    res.status(200).json(product);
  }
  if (req.method === "DELETE") {
    try{ 
    //delete the product from products 
    const productToDelete = await Product.findByIdAndDelete(id);

    // delete the product id from the product list of the corresponding user:
    const userId= req.headers.userid
    await User.updateOne({ _id: userId }, { $pull: { products: productToDelete._id } });
    res.status(201).json({status: "data deleted"})

  } catch (error) {
    console.log(error);
    res.status(400).json({error: error.message})
  }

  }
}
