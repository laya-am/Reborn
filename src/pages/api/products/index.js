import dbConnect from "../../../../db/connect"
import Product from "../../../../db/models/Product"

export default async function handler(req, res) {
  await dbConnect();
  
  if(req.method === "GET"){
    const products = await Product.find();
    res.status(200).json(products);
  }
  if(req.method === "POST"){
    try {
      const productData= req.body;
      console.log("data received in server",productData);
      const newProduct= new Product(productData);
      await newProduct.save();
      res.status(201).json({status: "data posted"})
    } catch (error) {
      console.log(error);
      res.status(400).json({error: error.message})
    }
  }
}
