const router = require("express").Router();
const { User } = require("../models/user");
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body); 
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (!user)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		); 
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Email or Password" });

		if (!user.verified) {
			let token = await Token.findOne({ userId: user._id });
			if (!token) {
				token = await new Token({
					userId: user._id,
					token: crypto.randomBytes(32).toString("hex"),
				}).save();
				const url = `${process.env.BASE_URL}/users/${user.id}/verify/${token.token}`;
				await sendEmail(user.email, "Verify Email", url);
			}

			return res
				.status(400)
				.send({ message: "An Email sent to your account please verify" });
		}

		const token = user.generateAuthToken();
		res.status(200).send({ data: token, user: user._id, firstTime: user.firstTime, message: "logged in successfully" });
		await User.updateOne({ _id: user._id},{ $set: { firstTime: false } });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.put('/change-password', async (req, res) => {
	try {

		const user = await User.findOne({_id: req.body.userId})
		if (!user)
			return res.status(401).send({ message: "Error: User not Found" });

		const validPassword = await bcrypt.compare(
			req.body.current,
			user.password
		);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Password" });
		
		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.newOne, salt);
			
		await User.updateOne({_id: user._id}, {password: hashPassword});
		res.status(200).send('Password updated successfully')
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
})

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = router;
