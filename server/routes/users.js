const router = require("express").Router();
const { User, validate } = require("../models/user");
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");

router.get("/:id", async (req, res) => {
	try{
		const user = await User.findOne({_id: req.params.id});
		res.status(200).send(user);
	} catch(err){
		res.status(500).send({ message: "Internal Server Error" });
	}
})

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		let user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		user = await new User({ 
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			password: hashPassword,
			username: req.body.username,
			gender: req.body.gender,
			birthday: req.body.birthday,
			region: req.body.region,
		}).save();

		const token = await new Token({
			userId: user._id,
			token: crypto.randomBytes(32).toString("hex"),
		}).save();
		const url = `${process.env.BASE_URL}/users/${user.id}/verify/${token.token}`;
		await sendEmail(user.email, "Verify Email", url);

		res
			.status(201)
			.send({ message: "An Email sent to your account please verify" });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.get("/:id/verify/:token/", async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: "Invalid link no User" });

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid link no Token" });
		
		await User.updateOne({ _id: user._id},{ $set: { verified: true } });
		await token.remove();

		res.status(200).send({ message: "Email verified successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.put("/:id/completelogin", async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id});
		await User.updateOne({ _id: user._id}, { $set: { 
			username: req.body.username, 
			gender: req.body.gender,
			birthday: req.body.date,
			region: req.body.region
		 }});

		 res.status(200).send({ message: "Login Completed" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
})

module.exports = router;
