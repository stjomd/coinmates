import './Register.scss'

import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {z as zod} from 'zod'
import {User} from '../../entities/User'

import PasswordHelper from '../password-helper/PasswordHelper'
import {UserService} from '../../services/UserService'
import {useState} from 'react'
import {FetchError} from '../../services/FetchError'
import {Link, NavLink} from 'react-router-dom'

function Register() {
	// Validation
	const schema = zod.object({
		email: zod.string().email('Please enter a valid email.').max(100),
		password: zod.string().min(1, 'Please enter a password.').max(50),
		firstName: zod.string().min(1, 'Please enter your first name.').max(100),
		lastName: zod.string().min(1, 'Please enter your last name.').max(100),
	})

	const [passwordIsStrong, setPasswordIsStrong] = useState(false)
	const [errorMessage, setErrorMessage] = useState<string>()
	const [showSignInLink, setShowSignInLink] = useState(false)

	// Form hook
	const {register, handleSubmit, formState, watch} = useForm({
		resolver: zodResolver(schema),
	})

	// Validation errors
	const {errors} = formState

	// Actions to perform on submit
	const onSubmit = handleSubmit(data => {
		setErrorMessage(undefined)
		setShowSignInLink(false)
		if (passwordIsStrong) {
			const user = Object.assign(new User(), data)
			UserService.register(user)
				.then(res => UserService.storeAuth(res as User, '/home'))
				.catch(err => {
					const error = err as FetchError
					if (error.status === 409) {
						setErrorMessage('Looks like you already have an account!')
						setShowSignInLink(true)
					} else {
						setErrorMessage('Sorry, but an error occurred. Please try again.')
					}
				})
		}
	})

	/**
	 * Constructs an email field for the form.
	 * @returns a JSX element, the email field.
	 */
	const emailField = () => {
		let classes = 'form-control'
		if (errors.email?.message) {
			classes += ' is-invalid'
		}
		return (
			<div className=''>
				<input
					{...register('email')}
					type='text'
					className={classes}
					id='email'
					placeholder='Email'
				/>
				{typeof errors.email?.message === 'string' && (
					<div className='invalid-feedback'>{errors.email?.message}</div>
				)}
			</div>
		)
	}

	/**
	 * Constructs a password field for the form.
	 * @returns a JSX element, the password field.
	 */
	const passwordField = () => {
		let classes = 'form-control'
		if (watch('password') != null) {
			if (errors.password?.message != null || !passwordIsStrong) {
				classes += ' is-invalid'
			}
		}
		return (
			<div className=''>
				<input
					{...register('password')}
					type='password'
					className={classes}
					id='password'
					placeholder='Password'
				/>
				{typeof errors.password?.message === 'string' && (
					<div className='invalid-feedback' style={{marginBottom: 0}}>
						{errors.password?.message}
					</div>
				)}
				{watch('password') != undefined && (
					<PasswordHelper
						password={watch('password')}
						fulfils={pass => setPasswordIsStrong(pass)}
					/>
				)}
			</div>
		)
	}

	/**
	 * Constructs a first name field for the form.
	 * @returns a JSX element, the first name field.
	 */
	const firstNameField = () => {
		let classes = 'form-control'
		if (errors.firstName?.message) {
			classes += ' is-invalid'
		}
		return (
			<div className=''>
				<input
					{...register('firstName')}
					type='text'
					className={classes}
					id='first-name'
					placeholder='First name'
				/>
				{typeof errors.firstName?.message === 'string' && (
					<div className='invalid-feedback'>{errors.firstName?.message}</div>
				)}
			</div>
		)
	}

	/**
	 * Constructs a last name field for the form.
	 * @returns a JSX element, the last name field.
	 */
	const lastNameField = () => {
		let classes = 'form-control'
		if (errors.lastName?.message) {
			classes += ' is-invalid'
		}
		return (
			<div className=''>
				<input
					{...register('lastName')}
					type='text'
					className={classes}
					id='last-name'
					placeholder='Last name'
				/>
				{typeof errors.lastName?.message === 'string' && (
					<div className='invalid-feedback'>{errors.lastName?.message}</div>
				)}
			</div>
		)
	}

	// Component
	return (
		<div className='register-box'>
			<span className='register-title'>Sign up to</span>
			<Link to='/' className='logo register-title'>
				coinmates
			</Link>
			{errorMessage != null && (
				<div className='alert alert-danger login-alert' role='alert'>
					{errorMessage}
					{showSignInLink && (
						<span>
							&nbsp;
							<NavLink to='/login' className='reg-link-dark'>
								Sign in
							</NavLink>
						</span>
					)}
				</div>
			)}
			<form onSubmit={onSubmit}>
				{emailField()}
				{passwordField()}
				{firstNameField()}
				{lastNameField()}
				<button type='submit' className='btn btn-primary login-btn mt-3'>
					Continue
				</button>
			</form>
			<p>
				Already have an account? <Link to='/login'>Sign in</Link>
			</p>
		</div>
	)
}

export default Register
