import './Register.scss';

function Register() {
	return (
		<div className='register-box'>
			<p id='register-title'>Sign up</p>
			<form>
			<div className="form-floating">
				<input type='email' className='form-control' id='email' placeholder='s'/>
				<label htmlFor='email'>Email</label>
			</div>
			<div className="form-floating">
				<input type='password' className='form-control' id='password' placeholder='s'/>
				<label htmlFor='password'>Password</label>
			</div>
			<div className="form-floating">
				<input type='text' className='form-control' id='first-name' placeholder='s'/>
				<label htmlFor='first-name'>First name</label>
			</div>
			<div className="form-floating">
				<input type='text' className='form-control' id='last-name' placeholder='s'/>
				<label htmlFor='last-name'>Last name</label>
			</div>
			</form>
			<button
				type='button'
				className='btn btn-primary login-btn'
			>
				Sign up
			</button>
		</div>
	);
}

export default Register;
