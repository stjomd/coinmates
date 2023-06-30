import {UserService} from '../../services/UserService'
import './Header.scss'

import {Link} from 'react-router-dom'

function Header() {
	const user = UserService.getAuth()

	const userItem = () => {
		if (user == null) {
			return (
				<Link to='/login' className='header-link'>
					<p>Sign in</p>
				</Link>
			)
		} else {
			return (
				<p>
					{user.firstName} {user.lastName}
				</p>
			)
		}
	}

	return (
		<header>
			<Link to='/' style={{textDecoration: 'none'}}>
				<p className='logo header-logo'>coinmates</p>
			</Link>
			{userItem()}
		</header>
	)
}

export default Header
