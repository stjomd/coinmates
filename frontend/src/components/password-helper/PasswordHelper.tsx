import "./PasswordHelper.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

interface PasswordHelperProps {
	password: string;
}

function PasswordHelper({ password }: PasswordHelperProps) {

	// ----- Validators ----------------------------------------------------------
	const isLong = () => {
		if (password == null) {
			return false
		}
		return password.length >= 10
	}
	const containsLowercase = () => {
		if (password == null) {
			return false
		}
		return password !== password.toUpperCase()
	}
	const containsUppercase = () => {
		if (password == null) {
			return false
		}
		return password !== password.toLowerCase()
	}
	const containsNumber = () => {
		if (password == null) {
			return false
		}
		return /[0-9]/.test(password)
	}
	const containsSpecialChar = () => {
		if (password == null) {
			return false
		}
		return /[!#$&*_-]/.test(password)
	}

	// ----- Pass/fail indicators ------------------------------------------------
	const color = (pass: boolean) => {
		return pass ? 'password-ok' : 'password-bad'
	}
	const icon = (pass: boolean) => {
		return 'bi ' + (pass ? ' bi-check' : ' bi-x')
	}

	// ----- Hints/password requirements -----------------------------------------
	const lengthHint = () => {
		const pass = isLong()
		return (
			<p className={color(pass)}>
				<i className={icon(pass)}/>
				has at least 10 characters
			</p>
		)
	}
	const lowercaseHint = () => {
		const pass = containsLowercase()
		return (
			<p className={color(pass)}>
				<i className={icon(pass)}/>
				contains a lowercase letter
			</p>
		)
	}
	const uppercaseHint = () => {
		const pass = containsUppercase()
		return (
			<p className={color(pass)}>
				<i className={icon(pass)}/>
				contains an uppercase letter
			</p>
		)
	}
	const numberHint = () => {
		const pass = containsNumber()
		return (
			<p className={color(pass)}>
				<i className={icon(pass)}/>
				contains a number
			</p>
		)
	}
	const specialCharsHint = () => {
		const pass = containsSpecialChar()
		return (
			<p className={color(pass)}>
				<i className={icon(pass)}/>
				contains a special character: !#$&*_-
			</p>
		)
	}

	// ----- Component -----------------------------------------------------------
	return (
		<div className="password-helper">
			<div className="password-bar">
				<p>Password strength: </p>
				<div className="progress" role="progressbar">
					<div
						className="progress-bar bg-primary"
						style={{ width: "75%" }}
					></div>
				</div>
			</div>
			<div className="password-requirements">
				{ lengthHint() }
				{ lowercaseHint() }
				{ uppercaseHint() }
				{ numberHint() }
				{ specialCharsHint() }
			</div>
		</div>
	);

}

export default PasswordHelper;
