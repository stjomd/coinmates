import './Register.scss';

import { useForm } from 'react-hook-form';


function Register() {

	const { register, handleSubmit } = useForm()

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
					Sign up
				</button>
			</form>
		</div>
	);

}

export default Register;
