import './Login.scss';

import { useEffect, useState } from 'react';
import { UserService } from '../../services/UserService';
import { LoginDetails } from '../../entities/LoginDetails';
import { Link } from 'react-router-dom';

function Login() {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("")

	// Login DTO
	const login = new LoginDetails(email, password);
	useEffect(() => {
		login.email = email;
		login.password = password;
	})

	// Error message (from server)
	const [errorMessage, setErrorMessage] = useState<string>();

	// Validation error messages
	const [emailValidation, setEmailValidation] = useState<string>();
	const [passwordValidation, setPasswordValidation] = useState<string>();

	/**
	 * Validates input and if passed, attempts to login.
	 * @returns void.
	 */
	const authenticate = () => {
		setErrorMessage(undefined)
		setEmailValidation(undefined)
		setPasswordValidation(undefined)
		if (!validate()) {
			return
		}
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

	/**
	 * Validates the user input and updates the necessary state variables.
	 * @returns true, if validation has passed, or false otherwise.
	 */
	const validate = () => {
		let valid = true
		if (email.length < 1) {
			setEmailValidation('Please enter an email')
			valid = false
		} else if (email.split('@').length !== 2) {
			setEmailValidation('Please enter a correct email')
			valid = false
		} else {
			const regex = new RegExp(
				'^[a-zA-Z0-9.+_-]+@([a-zA-Z0-9+_-]+.)+[a-zA-Z0-9]+$'
			);
			if (!regex.test(email)) {
				setEmailValidation('Please enter a correct email')
				valid = false
			}
		}
		if (password.length < 1) {
			setPasswordValidation('Please enter a password')
			valid = false
		}
		return valid
	}

	/**
	 * Constructs an input field for email, if necessary with error messages.
	 * @returns the input field for email.
	 */
	const emailField = () => {
		let classes = 'form-control'
		if (emailValidation != null) {
			classes += ' is-invalid'
		}
		return (
			<>
				<input type="text" required
					placeholder='Email'
					className={classes}
					value={email}
					onChange={event => setEmail(event.target.value)}
				/>
				{ emailValidation != null &&
					<div className="invalid-feedback">
						{ emailValidation }
					</div>
				}
			</>
		);
	}

	/**
	 * Constructs an input field for password, if necessary with error messages.
	 * @returns the input field for password.
	 */
	const passwordField = () => {
		let classes = 'form-control'
		if (passwordValidation != null) {
			classes += ' is-invalid'
		}
		return (
			<>
				<input type="password" required
					placeholder='Password'
					className={classes}
					value={password}
					onChange={event => setPassword(event.target.value)}
				/>
				{ passwordValidation != null &&
					<div className="invalid-feedback">
						{ passwordValidation }
					</div>
				}
			</>
		);
	}

	return (
		<div className='login-box'>
			<Link to='/' style={{textDecoration: 'none'}}>
				<p className="title">coinmates</p>
			</Link>
			{ errorMessage !== undefined &&
				<div className="login-alert alert alert-danger" role="alert">
					{ errorMessage }
				</div>
			}
			<form onSubmit={e => e.preventDefault()}>
				{ emailField() }
				{ passwordField() }
			</form>
			<button
				type='button'
				className='btn btn-primary login-btn'
				onClick={authenticate}
			>
				Sign in
			</button>
			<p>Do not have an account? <Link to='/register'>Sign up</Link></p>
		</div>
	);

}

export default Login;
