import { response } from "express";
import React, { useContext, useState, useMemo } from "react";
// No longer need useNavigate, but will need NavLink:
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function RegisterPage() {
	//*Bring in register function from user context:
	const { register } = useContext(UserContext);
	//local pieces of state
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	// const [show, setShow] = useState(false);
	const [confirm, setConfirm] = useState("");
	//global pieces of state from context file
	const [show, setShow] = useState(false);

	//*Add error handling:
	//* You will wrap these in useMemo to store the results.
	//* 1) Check if password requirements met:
	const passError = useMemo(
		() => password.length < 8 || password.length > 30,
		[password],
	);
	//* 2) Check if username requirements are met
	const userError = useMemo(
		() => username.length < 4 || username.length > 20,
		[username],
	);
	//* 3) Check if password confirmation passed:
	const confirmError = useMemo(
		() => confirm !== password || passError,
		[confirm, password, passError],
	);
	return (
		<>
			<main className="main">
				<form>
					<div className="form-container">
						<div className="flex column form-element">
							<label htmlFor="user-name">Username</label>
							<input
								value={username}
								onChange={(e) => {
									setUsername(e.target.value);
								}}
								id="user-name"
								type="text"
								className="rounded-lg bg-white"
							/>
							<div
								id="username-error"
								className={userError ? "error form-text" : "form-text"}
							>
								Username Must Be between 4 and 20 characters.
							</div>
						</div>

						<div className="flex column form-element">
							<label htmlFor="password">Password</label>
							<input
								value={password}
								onChange={(e) => {
									setPassword(e.target.value);
								}}
								id="password"
								type={show === true ? "text" : "password"}
								className="rounded-lg"
							/>
							<span>
								<label htmlFor="check-box">Show Password</label>
								<input
									value={show}
									onChange={(e) => {
										setShow(e.target.checked);
									}}
									type="checkbox"
									name="register-checkbox"
									id="check-box"
								/>
							</span>
							<div
								id="password-error"
								className={passError ? "error form-text" : "form-text"}
							>
								Password Must Be between 8 and 30 characters
							</div>
						</div>

						<div className="flex column form-element">
							<label htmlFor="confirm">Confirm Password</label>
							<input
								value={confirm}
								onChange={(e) => {
									setConfirm(e.target.value);
								}}
								id="confirm"
								type={show ? "text" : "password"}
								className="rounded-lg"
							/>
							<div
								id="password-error"
								className={confirmError ? "error form-text" : "form-text"}
							>
								Passwords Must Match
							</div>
						</div>

						<div>
							<button
								//* If any errors, set the button to disabled:
								disabled={confirmError || passError || userError}
								onClick={(e) => {
									e.preventDefault();
									//* If no errors, allow register function to fire:
									if (!confirmError && !passError && !userError) {
										register(username, password);
									}
								}}
								type="submit"
							>
								Submit
							</button>
						</div>
						<div className="to-login form-element">
							<p>
								{response.data.success && (
									<NavLink to="/login">
										Thank you for registering?! Click here to login.
									</NavLink>
								)}
							</p>
						</div>
					</div>
				</form>
			</main>
		</>
	);
}

export default RegisterPage;
