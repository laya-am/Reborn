import dbConnect from "../../../../db/connect"
import User from "../../../../db/models/User"

export default async function handler(req, res) {
  await dbConnect();
  const {id} = req.query;

  if(req.method === "GET"){
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ status: "Not Found" });
    }
    res.status(200).json(user);
  }
}
