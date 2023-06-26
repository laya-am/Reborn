import User from "../../../../db/models/User";
import dbConnect from "../../../../db/connect";
import bcrypt from "bcryptjs";
import cookie from 'cookie';

export default async function handler(req, res) {
    await dbConnect();

    if(req.method === "POST"){
        const { email: inputEmail, password: inputPassword } = req.body;

        const user = await User.findOne({email: inputEmail});
        if(!user){
            return res.status(404).json({msg: "User Not Found"})
        }
        bcrypt.compare(inputPassword, user.password, function(err, results){
            if(err){
                return res.status(400).json({error: error.message})
             }
             if (results) {
                return res.status(200).json({ msg: "Login success" })
            } else {
                return res.status(401).json({ msg: "Invalid credentials" })
            }
           })
    }
}