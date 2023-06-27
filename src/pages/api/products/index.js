import dbConnect from "../../../../db/connect"
import Product from "../../../../db/models/Product"
import User from "../../../../db/models/User"

export default async function handler(req, res) {
  await dbConnect(); 

    if(req.method === "GET"){
    const products = await Product.find();
    res.status(200).json(products);
  }
  if(req.method === "POST"){
    // post the new product to db:
    try {
      // console.log("posted data:" ,req.body);
      const newProduct= new Product(req.body);
      await newProduct.save();
      // console.log(newProduct);

      // add the product to the product list of the corresponding user:
      const userToUpdate = await User.findByIdAndUpdate(req.body.userId, {
        $set: { products: newProduct._id } ,
      });
      res.status(201).json({status: "data posted"})
      // return res.status(200).json(userToUpdate);
      console.log(userToUpdate);

    } catch (error) {
      console.log(error);
      res.status(400).json({error: error.message})
    }
    // try {
    // } catch (error) {
    //   res.status(400).json({error: error.message})
    // }
  }
}
