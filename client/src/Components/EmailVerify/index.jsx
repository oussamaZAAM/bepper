import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { Fragment } from "react/cjs/react.production.min";

import success from "../../images/success.png";
import styles from "./styles.module.css";

const EmailVerify = () => {
    const { REACT_APP_BASE_URL } = process.env;
	const [validUrl, setValidUrl] = useState(true);
	const param = useParams();

	const navigate = useNavigate();

	useEffect(() => {
		const verifyEmailUrl = async () => {
			try {
				const url = `${REACT_APP_BASE_URL}/api/users/${param.id}/verify/${param.token}`;
				const { data } = await axios.get(url);
				setValidUrl(true);
				// navigate("/completelogin"); 
			} catch (error) {
				console.log(error);
				setValidUrl(false);
			}
		};
		verifyEmailUrl();
	}, [param]);
	console.log(validUrl)

	return (
		<Fragment>
			{/* {validUrl ? ( */}
				<div className={styles.container}>
					<img src={success} alt="success_img" className={styles.success_img} />
					<h1>Email verified successfully</h1>
					<Link to="/login">
						<button className={styles.green_btn}>Login</button>
					</Link>
				</div>
			{/* ) : (
				<h1>404 Not Found</h1>
			)} */}
		</Fragment>
	);
};

export default EmailVerify;
