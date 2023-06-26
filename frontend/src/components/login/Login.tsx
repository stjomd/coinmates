import { useEffect, useState } from 'react';
import './Login.scss';
import { UserService } from '../../services/UserService';
import { LoginDetails } from '../../entities/LoginDetails';

function Login() {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("")

	const login = new LoginDetails(email, password);

	useEffect(() => {
		login.email = email;
		login.password = password;
	})

	const authenticate = () => {
		UserService.authenticate(login)
			.then(id => console.log('Hello user ' + id))
			.catch(error => console.error(error))
	}

	return (
		<div className='login-box'>
			<p className="title">coinmates</p>
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