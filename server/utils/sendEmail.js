const nodemailer = require("nodemailer");
const { google } = require('googleapis');
const dotenv = require('dotenv');

dotenv.config();

// These id's and secrets should come from .env file.
const CLIENT_ID = process.env.CLIENT_ID;
const CLEINT_SECRET = process.env.CLEINT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
	CLIENT_ID,
	CLEINT_SECRET,
	REDIRECT_URI
  );
  oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

module.exports = async (email, subject, text) => {
	try {
		// const transporter = nodemailer.createTransport({
		// 	service: process.env.SERVICE,
		// 	port: Number(process.env.EMAIL_PORT),
		// 	secure: Boolean(process.env.SECURE),
		// 	auth: {
		// 		user: process.env.USER,
		// 		pass: process.env.PASS,
		// 	},
		// });

		// await transporter.sendMail({
		// 	from: process.env.USER,
		// 	to: email,
		// 	subject: subject,
		// 	text: text,
		// });
		// console.log("email sent successfully");
		const accessToken = await oAuth2Client.getAccessToken();

		const transport = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			type: 'OAuth2',
			user: 'bepper777@gmail.com',
			clientId: CLIENT_ID,
			clientSecret: CLEINT_SECRET,
			refreshToken: REFRESH_TOKEN,
			accessToken: accessToken,
		},
		});

		const mailOptions = {
		from: 'Test <bepper777@gmail.com>',
		to: email,
		subject: subject,
		text: text,
		html: `<h1>${text}</h1>`,
		};

		const result = await transport.sendMail(mailOptions);
		return result;
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return error;
	}
};
