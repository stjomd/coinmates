import './Register.scss';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z as zod } from "zod";


function Register() {

	// Validation
	const schema = zod.object({
		email: zod.string().email(),
		password: zod.string().min(10),
		firstName: zod.string(),
		lastName: zod.string()
	})

	// Form hook
	const { register, handleSubmit, formState } = useForm({
		resolver: zodResolver(schema)
	})

	// Validation errors
	const { errors } = formState

	// Actions to perform on submit
	const onSubmit = (values: any) => {
		console.log(values)
	}

	return (
		<div className='register-box'>
			<p id='register-title'>Sign up</p>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="form-floating">
					<input {...register('email')}
						type='text'
						className='form-control'
						id='email'
						placeholder='s'
					/>
					<label htmlFor='email'>Email</label>
				</div>
				<div className="form-floating">
					<input {...register('password')}
						type='password'
						className='form-control'
						id='password'
						placeholder='s'
					/>
					<label htmlFor='password'>Password</label>
				</div>
				<div className="form-floating">
					<input {...register('firstName')}
						type='text'
						className='form-control'
						id='first-name'
						placeholder='s'
					/>
					<label htmlFor='first-name'>First name</label>
				</div>
				<div className="form-floating">
					<input {...register('lastName')}
						type='text'
						className='form-control'
						id='last-name'
						placeholder='s'
					/>
					<label htmlFor='last-name'>Last name</label>
				</div>
				<button type='submit' className='btn btn-primary login-btn'>
					Continue
				</button>
			</form>
		</div>
	);

}

export default Register;
