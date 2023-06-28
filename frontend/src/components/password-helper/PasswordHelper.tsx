import "./PasswordHelper.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

interface PasswordHelperProps {
	password: string;
}

function PasswordHelper({ password }: PasswordHelperProps) {

	// ----- Checks --------------------------------------------------------------

	let [
		isLong, containsLowercase, containsUppercase, containsNumber,
		containsSpecialChar
	] = [
		false, false, false, false, false
	]
	if (password != null) {
		isLong = password.length >= 10
		containsLowercase = /[a-z]/.test(password)
		containsUppercase = /[A-Z]/.test(password)
		containsNumber = /[0-9]/.test(password)
		containsSpecialChar = /[!#$&*_-]/.test(password)
	}

	// ----- Pass/fail indicators ------------------------------------------------

	/**
	 * Determines the class to apply to color a hint.
	 * @param pass a boolean indicating if a check passed.
	 * @returns a className.
	 */
	const color = (pass: boolean) => {
		return pass ? 'password-ok' : 'password-bad'
	}

	/**
	 * Determines the classes to display the icon next to a hint.
	 * @param pass a boolean indicating if a check passed.
	 * @returns a className.
	 */
	const icon = (pass: boolean) => {
		return 'bi ' + (pass ? 'bi-check' : 'bi-x')
	}

	// ----- Hints/password requirements -----------------------------------------

	/**
	 * Constructs a hint for length.
	 * @returns a JSX element.
	 */
	const lengthHint = () => {
		return (
			<p className={color(isLong)}>
				<i className={icon(isLong)}/>
				has at least 10 characters
			</p>
		)
	}

	/**
	 * Constructs a hint for lowercase letters.
	 * @returns a JSX element.
	 */
	const lowercaseHint = () => {
		return (
			<p className={color(containsLowercase)}>
				<i className={icon(containsLowercase)}/>
				contains a lowercase letter
			</p>
		)
	}

	/**
	 * Constructs a hint for uppercase letters.
	 * @returns a JSX element.
	 */
	const uppercaseHint = () => {
		return (
			<p className={color(containsUppercase)}>
				<i className={icon(containsUppercase)}/>
				contains an uppercase letter
			</p>
		)
	}

	/**
	 * Constructs a hint for numbers.
	 * @returns a JSX element.
	 */
	const numberHint = () => {
		return (
			<p className={color(containsNumber)}>
				<i className={icon(containsNumber)}/>
				contains a number
			</p>
		)
	}

	/**
	 * Constructs a hint for special characters.
	 * @returns a JSX element.
	 */
	const specialCharsHint = () => {
		return (
			<p className={color(containsSpecialChar)}>
				<i className={icon(containsSpecialChar)}/>
				contains a special character: !#$&*_-
			</p>
		)
	}

	// ----- Progress bar properties ---------------------------------------------

	const fulfilment = [
		isLong, containsLowercase, containsUppercase, containsNumber,
		containsSpecialChar
	]
	const progress = fulfilment.filter(b => b === true).length / fulfilment.length
	const width = String(Math.max(5, progress * 100)) + '%'

	let barColor = 'progress-bar '
	if (progress * 100 >= 100) {
		barColor += 'bg-primary'
	} else if (progress * 100 >= 50) {
		barColor += 'bg-warning'
	} else {
		barColor += 'bg-danger'
	}

	// ----- Component -----------------------------------------------------------
	
	return (
		<div className="password-helper">
			<div className="password-bar">
				<p>Password strength: </p>
				<div className="progress" role="progressbar">
					<div
						className={barColor}
						style={{ width: width }}
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
