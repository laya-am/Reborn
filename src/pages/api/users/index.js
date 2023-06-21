import dbConnect from "../../../../db/connect"
import User from "../../../../db/models/User"

export default async function handler(req, res) {
  await dbConnect();

  if(req.method === "POST"){
    try {
      const userData= req.body;
      const newUser= new User(userData);
      await newUser.save();
      res.status(201).json({status: "data posted"})
    } catch (error) {
      console.log(error);
      res.status(400).json({error: error.message})
    }
  }
}
