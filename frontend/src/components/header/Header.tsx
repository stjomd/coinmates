import './Header.scss'

import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {AuthService} from '../../services/AuthService'

function Header() {
	const user = AuthService.getAuth()

	// Determines whether the dropdown is visible
	const [showDropdown, setShowDropdown] = useState(false)
	const [showBottomBar, setShowBottomBar] = useState(false)

	// Calculates the className for dropdown content based on showDropdown
	const dropdownClass = () => {
		const className = 'dropdown-menu dropdown-menu-end header-dropdown-content'
		if (!showDropdown) {
			return className
		} else {
			return className + ' header-dropdown-content-show'
		}
	}

	// Hides dropdown if user clicks outside
	const onClickEvent = (event: Event) => {
		const className = (event.target as Element).className
		// Ignore clicks on the button (handled by button's onClick)
		if (className.includes('header-dropdown-btn')) {
			return
		}
		// Dropdown is open; click outside should close it
		if (showDropdown && !className.includes('dropdown-item')) {
			setShowDropdown(false)
		}
	}

	// Attaches an event listener for clicks outside dropdown
	useEffect(() => {
		window.addEventListener('click', onClickEvent)
		return () => window.removeEventListener('click', onClickEvent)
	})

	// The 'user' element of the header (either sign in link, or dropdown)
	const userItem = () => {
		if (user == null) {
			// No user logged in: show link
			return (
				<Link to='/login' className='header-link'>
					<p>Sign in</p>
				</Link>
			)
		} else {
			// User logged in: show dropdown button
			return (
				<div className='header-dropdown'>
					<p
						className='header-dropdown-btn header-link dropdown-toggle'
						onClick={() => setShowDropdown(!showDropdown)}
					>
						{user.firstName} {user.lastName}
					</p>
					<ul className={dropdownClass()}>
						<li
							className='dropdown-item dropdown-item-danger'
							onClick={() => AuthService.logout()}
						>
							Log out
						</li>
					</ul>
				</div>
			)
		}
	}

	const headerLinks = () => {
		return [
			<Link key='1' to='/home' className='header-link'>
				<p>Home</p>
			</Link>,
			<Link key='2' to='/bill' className='header-link'>
				<p>Split Bills</p>
			</Link>,
			<Link key='3' to='/friends' className='header-link'>
				<p>Find Friends</p>
			</Link>,
		]
	}

	return (
		<header>
			<div className='header-top-bar'>
				<div className='header-left'>
					<Link to='/' style={{textDecoration: 'none'}}>
						<p className='logo header-logo'>coinmates</p>
					</Link>
				</div>
				<div className='header-right'>
					<div className='header-links'>{headerLinks()}</div>
					{userItem()}
				</div>
				<div className='header-right-collapsed'>
					<i
						className='bi bi-list'
						onClick={() => setShowBottomBar(!showBottomBar)}
					/>
				</div>
			</div>
			{showBottomBar && (
				<div className='header-bottom-bar'>
					{headerLinks()}
					<p
						className='header-link header-link-danger'
						onClick={() => AuthService.logout()}
					>
						Log out
					</p>
				</div>
			)}
		</header>
	)
}

export default Header
