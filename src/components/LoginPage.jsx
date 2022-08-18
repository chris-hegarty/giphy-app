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
        ()=> username.length < 4 || username.length > 20,
        [username]
    )

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
							<div>
									<button
										//* If any errors, set the button to disabled:
										disabled={passError || userError}
										onClick={(e) => {
											e.preventDefault();
											//* If no errors, allow register function to fire:
											if (!passError && !userError) {
												login(username, password);
											}
										}}
										type="submit"
									>
										Submit
									</button>
								</div>


								
								<div className="to-login form-element">
									<p>
										<NavLink to="/register">
											Don't have an account? Register here
										</NavLink>
									</p>
								</div>
							
						</div>
					</form>
				</main>
			</>
		);
}

export default LoginPage