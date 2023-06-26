import User from "../../../../db/models/User";
import dbConnect from "../../../../db/connect";
import bcrypt from "bcryptjs";
import cookie from 'cookie';
// only for iron-session
// import { withIronSessionApiRoute } from "iron-session/next";
// import { sessionOptions } from "lib/session";

export default async function handler(req, res) {
	await dbConnect();
	if (req.method === 'POST') {
		// retrieve a cookie
		console.log('this is the cookie in the post route: ', req.headers.cookie)
		const { email, password, name, location, profilePicture, bio } = req.body
		// hash the password
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(password, salt);
		// save the user to the database
		const user = await User.create({ name, email, password: hash,location, profilePicture, bio });

		// set the cookie
  		res.setHeader('Set-Cookie', cookie.serialize('auth', user._id, {
			httpOnly: true,
			secure: process.env.NODE_ENV !== 'development',
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 * 7, // 1 week
			path: '/'
		}))
		res.status(200).json({ email, password })
	}

}
// export default withIronSessionApiRoute(async (req, res) => {
// 	const { username } = await req.body;
  
// 	// try {
// 	//   const {
// 	// 	data: { login, avatar_url },
// 	//   } = await octokit.rest.users.getByUsername({ username });
  
// 	//   const user = { isLoggedIn: true, login, avatarUrl: avatar_url };
// 	  const user = {name: 'test', id: '1234'}
// 	  req.session.user = user;
// 	  await req.session.save();
// 	  console.log(req.session.user.id);
// 	//   res.json(user);
// 	// } catch (error) {
// 	//   res.status(500).json({ message: error.message });
// 	// }
//   }, sessionOptions);