
import dbConnect from "../../../../db/connect"
import Pusher from "pusher"


const pusher = new Pusher({
  appId: process.env.appId,
  key: process.env.key,
  secret: process.env.secret,
  cluster: process.env.cluster,
  encrypted: true,
});

export default async function handler(req, res) {
    // await dbConnect();
    const { message, sender } = req.body;
    await pusher.trigger("Reborn", "chat-event", {
      message,
      sender,
    });
  
    res.json({ message: "completed" });
  }
// export default async function handler(req, res) {
// await dbConnect();
// if(req.method === "POST"){
//     try {
//       const payload= req.body;
//       pusher.trigger(req.query.channel, "message", payload);
//       res.status(201).json({status: "data posted"})
//     } catch (error) {
//       console.log(error);
//       res.status(400).json({error: error.message})
//     }
//   }

