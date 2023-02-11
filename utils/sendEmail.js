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
		const htmlTemplate = 
		`<td class="esd-stripe" align="center">
		<table class="es-content-body" style="border-left:1px solid transparent;border-right:1px solid transparent;border-top:1px solid transparent;border-bottom:1px solid transparent;" align="center" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff">
			<tbody>
				<tr>
					<td class="esd-structure es-p20t es-p40b es-p40r es-p40l" esd-custom-block-id="8537" align="left">
						<table width="100%" cellspacing="0" cellpadding="0">
							<tbody>
								<tr>
									<td class="esd-container-frame" align="left" width="518">
										<table width="100%" cellspacing="0" cellpadding="0">
											<tbody>
												<tr>
													<td class="esd-block-image es-m-txt-c es-p5b" align="center" style="font-size:0"><a target="_blank"><img src="https://i.ibb.co/PrxxsYC/yellow.png" alt="icon" style="display: block;" title="icon" width="30"></a></td>
												</tr>
												<tr>
													<td class="esd-block-text es-m-txt-c" align="center">
														<h2>Hey there!<br></h2>
													</td>
												</tr>
												<tr>
													<td class="esd-block-text es-m-txt-c es-p15t" align="center">
														<p>We received a request to set your email to ${email}. If this is correct, please confirm by clicking the button below. If you don’t know why you got this email, please tell us straight away so we can fix this for you.</p>
													</td>
												</tr>
												<tr>
													<td class="esd-block-button es-p20t es-p15b es-p10r es-p10l" align="center"><a href=${text}><span class="es-button-border">${subject === 'Verify Email' ? 'Confirm Email' : 'Change Password'}</span></a></td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
							</tbody>
						</table>
					</td>
				</tr>
			</tbody>
		</table>
		</td>`

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
		from: `${subject} <bepper777@gmail.com>`,
		to: email,
		subject: subject,
		text: text,
		html: htmlTemplate,
		};

		const result = await transport.sendMail(mailOptions);
		return result;
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return error;
	}
};