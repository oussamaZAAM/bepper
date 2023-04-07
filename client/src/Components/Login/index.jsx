import React, { useState } from "react";
import { useCookies } from 'react-cookie'
import { Link } from "react-router-dom";
import axios from "axios";

import styles from "./styles.module.css";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
	const [cookie, setCookie, removeCookie] = useCookies("token");
    const REACT_APP_BASE_URL = "https://bepper.cyclic.app";
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const google = () => {
		window.open(REACT_APP_BASE_URL+"/auth/google", "_self");
	};

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = REACT_APP_BASE_URL+"/api/auth";
			const { data: res } = await axios.post(url, data);
			setCookie("token", res.data);
			setCookie("user", res.user);
			res.firstTime ? window.location = "/completelogin" : window.location = "/";
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<div className={styles.login_container}>
			<div className={'m-3 row '+styles.login_form_container}>
				<div className={'col-12 col-md-8 '+styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1 className="text-center">Login to Your Account</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						<div className={styles.forgotpassword}>
							<Link to="/forgot-password" style={{alignSelf: 'flex-start'}}>
								<p style={{ padding: "0 15px" }}>Forgot Password ?</p>
							</Link>
						</div>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Sing In
						</button>
						<div className={styles.orSeparator}>
							<b>OR</b>
						</div>
						<div className={styles.google} onClick={google}>
							<FcGoogle size={20}/>
							Sign up using Google Account
						</div>
					</form>
				</div>
				<div className={'col-12 col-md-4 '+styles.right}>
					<h1>New Here ?</h1>
					<Link to="/signup">
						<button type="button" className={styles.white_btn}>
							Sing Up
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
