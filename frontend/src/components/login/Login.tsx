import { useEffect, useState } from 'react';
import { UserService } from '../../services/UserService';
import { LoginDetails } from '../../entities/LoginDetails';

import './Login.scss';

function Login() {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("")
	const [errorMessage, setErrorMessage] = useState<string>();

	const login = new LoginDetails(email, password);

	useEffect(() => {
		login.email = email;
		login.password = password;
	})

	const authenticate = () => {
		UserService.authenticate(login)
			.then(id => console.log('Hello user ' + id))
			.catch(error => {
				if (error.status === 401) {
					setErrorMessage("Your email or password is incorrect, please retry.")
				} else {
					setErrorMessage(error.message)
				}
			})
	}

	return (
		<div className='login-box'>
			<p className="title">coinmates</p>
			{ errorMessage !== undefined &&
				<div className="login-alert alert alert-danger" role="alert">
					{errorMessage}
				</div>
			}
			<form onSubmit={e => e.preventDefault()}>
				<input type="text" required
					placeholder='Email'
					className='form-control'
					value={email}
					onChange={event => setEmail(event.target.value)}
				/>
				<input type="password" required
					placeholder='Password'
					className='form-control'
					value={password}
					onChange={event => setPassword(event.target.value)}
				/>
			</form>
			<button
				type='button'
				className='btn btn-primary login-btn'
				onClick={authenticate}
			>
				Sign in
			</button>
			<p>Do not have an account? Sign up</p>
		</div>
	);
}

export default Login;