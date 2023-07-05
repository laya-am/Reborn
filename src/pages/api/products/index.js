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
      const newProduct= new Product(req.body);
      await newProduct.save();

      // add the product to the product list of the corresponding user:
      const userToUpdate = await User.findById(req.body.userId)
      if( userToUpdate.products ){
        await User.updateOne({ _id: req.body.userId }, { $push: { products: [newProduct._id] } });
      } else {
        await User.updateOne({ _id: req.body.userId }, { $set: { products: [newProduct._id] } });
      }
      res.status(201).json({status: "data posted"})

    } catch (error) {
      console.log(error);
      res.status(400).json({error: error.message})
    }
  }

  if(req.method === "PUT"){
    console.log(req.body);
    // await User.updateOne({ _id: req.body.userId }, { $set: { products: [newProduct._id] } });

  }

}
