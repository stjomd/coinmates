import './Register.scss'

import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {z as zod} from 'zod'
import {User} from '../../entities/User'

import PasswordHelper from '../password-helper/PasswordHelper'
import {UserService} from '../../services/UserService'
import {useState} from 'react'

function Register() {
	// Validation
	const schema = zod.object({
		email: zod.string().email('Please enter a valid email.'),
		password: zod.string().min(1, 'Please enter a password.'),
		firstName: zod.string().min(1, 'Please enter your first name.'),
		lastName: zod.string().min(1, 'Please enter your last name.'),
	})

	// Password meets requirements
	const [passwordIsStrong, setPasswordIsStrong] = useState(false)

	// Form hook
	const {register, handleSubmit, formState, watch} = useForm({
		resolver: zodResolver(schema),
	})

	// Validation errors
	const { errors } = formState

	// Actions to perform on submit
	const onSubmit = handleSubmit(data => {
		if (passwordIsStrong) {
			const user = Object.assign(new User(), data)
			UserService.register(user)
				.then(res => console.log(res))
				.catch(err => console.error(err))
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
			<div className='form-floating'>
				<input
					{...register('email')}
					type='text'
					className={classes}
					id='email'
					placeholder='s'
				/>
				<label htmlFor='email'>Email</label>
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
			<div className='form-floating'>
				<input
					{...register('password')}
					type='password'
					className={classes}
					id='password'
					placeholder='s'
				/>
				<label htmlFor='password'>Password</label>
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
			<div className='form-floating'>
				<input
					{...register('firstName')}
					type='text'
					className={classes}
					id='first-name'
					placeholder='s'
				/>
				<label htmlFor='first-name'>First name</label>
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
			<div className='form-floating'>
				<input
					{...register('lastName')}
					type='text'
					className={classes}
					id='last-name'
					placeholder='s'
				/>
				<label htmlFor='last-name'>Last name</label>
				{typeof errors.lastName?.message === 'string' && (
					<div className='invalid-feedback'>{errors.lastName?.message}</div>
				)}
			</div>
		)
	}

	// Component
	return (
		<div className='register-box'>
			<p id='register-title'>Sign up</p>
			<form onSubmit={onSubmit}>
				{emailField()}
				{passwordField()}
				{firstNameField()}
				{lastNameField()}
				<button type='submit' className='btn btn-primary login-btn mt-3'>
					Continue
				</button>
			</form>
		</div>
	)
}

export default Register
