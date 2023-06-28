import "./PasswordHelper.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

interface PasswordHelperProps {
	password: string;
}

function PasswordHelper({ password }: PasswordHelperProps) {

	// Validators
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

	// Singular hints/password requirements
	const lengthHint = () => {
		const pClass = (isLong()) ? 'password-ok' : 'password-bad'
		return (
			<p className={pClass}>
				<i className="bi bi-x"/>
				has at least 10 characters
			</p>
		)
	}
	const lowercaseHint = () => {
		const pClass = (containsLowercase()) ? 'password-ok' : 'password-bad'
		return (
			<p className={pClass}>
				<i className="bi bi-x"/>
				contains a lowercase letter
			</p>
		)
	}
	const uppercaseHint = () => {
		const pClass = (containsUppercase()) ? 'password-ok' : 'password-bad'
		return (
			<p className={pClass}>
				<i className="bi bi-x"/>
				contains an uppercase letter
			</p>
		)
	}
	const numberHint = () => {
		const pClass = (containsNumber()) ? 'password-ok' : 'password-bad'
		return (
			<p className={pClass}>
				<i className="bi bi-x"/>
				contains a number
			</p>
		)
	}
	const specialCharsHint = () => {
		const pClass = (containsSpecialChar()) ? 'password-ok' : 'password-bad'
		return (
			<p className={pClass}>
				<i className="bi bi-x"/>
				contains a special character: !#$&*_-
			</p>
		)
	}

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
