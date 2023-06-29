import './PasswordHelper.scss'
import 'bootstrap-icons/font/bootstrap-icons.css'

interface PasswordHelperProps {
	// the currently typed in password
	password: string
	// a function that accepts as argument a boolean indicating if all check pass
	fulfils?: (allValid: boolean) => void
}

function PasswordHelper({password, fulfils}: PasswordHelperProps) {
	// ----- Checks --------------------------------------------------------------

	const checks = {
		isLong: false,
		containsLowercase: false,
		containsUppercase: false,
		containsNumber: false,
		containsSpecialChar: false,
	}

	if (password != null) {
		checks.isLong = password.length >= 10
		checks.containsLowercase = /[a-z]/.test(password)
		checks.containsUppercase = /[A-Z]/.test(password)
		checks.containsNumber = /[0-9]/.test(password)
		checks.containsSpecialChar = /[!#$&*_-]/.test(password)
	}

	// Report if all checks passed to parent component
	if (fulfils != null) {
		const values = Object.values(checks)
		const passes = values.filter(bool => bool === true).length
		fulfils(passes === values.length)
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
			<p className={color(checks.isLong)}>
				<i className={icon(checks.isLong)} />
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
			<p className={color(checks.containsLowercase)}>
				<i className={icon(checks.containsLowercase)} />
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
			<p className={color(checks.containsUppercase)}>
				<i className={icon(checks.containsUppercase)} />
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
			<p className={color(checks.containsNumber)}>
				<i className={icon(checks.containsNumber)} />
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
			<p className={color(checks.containsSpecialChar)}>
				<i className={icon(checks.containsSpecialChar)} />
				contains a special character: !#$&*_-
			</p>
		)
	}

	// ----- Progress bar properties ---------------------------------------------

	const fulfilment = Object.values(checks)
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
		<div className='password-helper'>
			<div className='password-bar'>
				<p>Password strength: </p>
				<div className='progress' role='progressbar'>
					<div className={barColor} style={{width: width}}></div>
				</div>
			</div>
			<div className='password-requirements'>
				{lengthHint()}
				{lowercaseHint()}
				{uppercaseHint()}
				{numberHint()}
				{specialCharsHint()}
			</div>
		</div>
	)
}

export default PasswordHelper
