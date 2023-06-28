import './Register.scss';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z as zod } from "zod";

function Register() {

	// Validation
	const schema = zod.object({
		email: zod.string().email('Please enter a valid email.'),
		password: zod.string().min(1, 'Please enter a password.'),
		firstName: zod.string().min(1, 'Please enter your first name.'),
		lastName: zod.string().min(1, 'Please enter your last name.')
	})

	// Form hook
	const { register, handleSubmit, formState } = useForm({
		resolver: zodResolver(schema)
	})

	// Validation errors
	const { errors } = formState

	// Actions to perform on submit
	const onSubmit = handleSubmit(data => {
		console.log(data)
	})

	// Email field
	const emailField = () => {
		let classes = 'form-control'
		if (errors.email?.message) {
			classes += ' is-invalid'
		}
		return (
			<div className="form-floating">
				<input
					{...register("email")}
					type="text"
					className={classes}
					id="email"
					placeholder="s"
				/>
				<label htmlFor="email">Email</label>
				{typeof errors.email?.message === "string" && (
					<div className="invalid-feedback">{errors.email?.message}</div>
				)}
			</div>
		);
	};

	// Password field
	const passwordField = () => {
		let classes = 'form-control'
		if (errors.password?.message) {
			classes += ' is-invalid'
		}
		return (
			<div className="form-floating">
				<input {...register('password')}
					type='password'
					className={classes}
					id='password'
					placeholder='s'
				/>
				<label htmlFor='password'>Password</label>
				{typeof errors.password?.message === "string" && (
					<div className="invalid-feedback">{errors.password?.message}</div>
				)}
			</div>
		)
	}

	// First name field
	const firstNameField = () => {
		let classes = 'form-control'
		if (errors.firstName?.message) {
			classes += ' is-invalid'
		}
		return (
			<div className="form-floating">
				<input {...register('firstName')}
					type='text'
					className={classes}
					id='first-name'
					placeholder='s'
				/>
				<label htmlFor='first-name'>First name</label>
				{typeof errors.firstName?.message === "string" && (
					<div className="invalid-feedback">{errors.firstName?.message}</div>
				)}
			</div>
		)
	}

	// Last name field
	const lastNameField = () => {
		let classes = 'form-control'
		if (errors.lastName?.message) {
			classes += ' is-invalid'
		}
		return (
			<div className="form-floating">
				<input {...register('lastName')}
					type='text'
					className={classes}
					id='last-name'
					placeholder='s'
				/>
				<label htmlFor='last-name'>Last name</label>
				{typeof errors.lastName?.message === "string" && (
					<div className="invalid-feedback">{errors.lastName?.message}</div>
				)}
			</div>
		)
	}

	return (
		<div className='register-box'>
			<p id='register-title'>Sign up</p>
			<form onSubmit={onSubmit}>
				{ emailField() }
				{ passwordField() }
				{ firstNameField() }
				{ lastNameField() }
				<button type='submit' className='btn btn-primary login-btn'>
					Continue
				</button>
			</form>
		</div>
	);

}

export default Register;
