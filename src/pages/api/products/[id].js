import dbConnect from "../../../../db/connect"
import Product from "../../../../db/models/Product"

export default async function handler(req, res) {
  await dbConnect();
  const {id} = req.query;

  if(req.method === "GET"){
    const product = await Product.findById(id);
    
    if (!product) {
      return response.status(404).json({ status: "Not Found" });
    }
    res.status(200).json(product);
  }
}
