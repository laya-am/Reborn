import dbConnect from "../../../../db/connect"
import User from "../../../../db/models/User"

export default async function handler(req, res) {
  await dbConnect();
  const {id} = req.query;

  if (req.method === "PATCH") {
    const userToUpdate = await User.findByIdAndUpdate(id, {
      $set: req.body,
    });
    return res.status(200).json(userToUpdate);
  }

  if(req.method === "GET"){
    const user = await User.findById(id).populate("products");

    if (!user) {
      return res.status(404).json({ status: "Not Found" });
    }
    return res.status(200).json(user);
  }

  if(req.method === "POST"){
    try {
      const {sellerId, buyerId}= req.body;
      await User.updateOne({ _id: buyerId }, { $set: { chatPartners: [sellerId] }  });
      await User.updateOne({ _id: sellerId }, { $set: { chatPartners: [buyerId] }  });
      res.status(201).json({status: "data posted"})
    } catch (error) {
      console.log(error);
      res.status(400).json({error: error.message})
    }
  }
}
