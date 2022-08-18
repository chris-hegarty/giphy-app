import React, { useContext, useState, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";// import {  } from "module";

function LoginPage() {
    //local pieces of state
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // const [show, setShow] = useState(false);
    //global pieces of state from context file
    const [show, setShow] = useState(false);
    const { login } = useContext(UserContext)

    //* Add error checking for username and password requirements:
      const passError = useMemo(
				() => password.length < 8 || password.length > 30,
				[password],
			);
			const userError = useMemo(
				() => username.length < 4 || username.length > 20,
				[username],
			);

    return (
			<>
				<div className="flex center">
					<form>
						<div>
							<label htmlFor="user-name">Username</label>
							<input
								value={username}
								onChange={(e) => {
									setUsername(e.target.value);
								}}
								id="user-name"
								type="text"
							/>
						</div>
						<div
							id="userHelp"
							className={userError ? "error form-text" : "form-text"}
						>
							Username Must Be between 4 and 20 characters
						</div>
						<div>
							<label htmlFor="password">Password</label>
							<input
								value={password}
								onChange={(e) => {
									setPassword(e.target.value);
								}}
								id="password"
								type={show === true ? "text" : "password"}
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
						</div>
						<div
							id="passwordHelp"
							className={passError ? "error form-text" : "form-text"}
						>
							Password Must Be between 8 and 30 characters
						</div>
						<div>
							<button
								disabled={passError || userError}
								onClick={(e) => {
									e.preventDefault();
									if (!passError && !userError) {
										login(username, password);
									}
								}}
							>
								Submit
							</button>
						</div>
						<div>
							<p>
								<NavLink to="/register">
									Don't have an account? Register here
								</NavLink>
							</p>
						</div>
					</form>
				</div>
			</>
		);
}

export default LoginPage