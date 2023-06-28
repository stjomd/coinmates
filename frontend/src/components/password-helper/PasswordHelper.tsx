import "./PasswordHelper.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

interface PasswordHelperProps {
	password: string;
}

function PasswordHelper({ password }: PasswordHelperProps) {
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
				<p>
					<i className="bi bi-x"/>
					has at least 10 characters
				</p>
				<p>
					<i className="bi bi-x"/>
					contains a lowercase letter
				</p>
				<p>
					<i className="bi bi-x"/>
					contains an uppercase letter
				</p>
				<p>
					<i className="bi bi-x"/>
					contains a number
				</p>
				<p>
					<i className="bi bi-x"/>
					contains a special character: !#$&*_-
				</p>
			</div>
		</div>
	);
}

export default PasswordHelper;
