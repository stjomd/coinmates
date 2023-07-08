import {Navigate, useParams} from 'react-router-dom'
import './PersonView.scss'
import {UserService} from '../../services/UserService'
import {useEffect, useState} from 'react'
import {User} from '../../entities/User'
import {AuthService} from '../../services/AuthService'

function PersonView() {
	const params = useParams()
	const [user, setUser] = useState<User>()
	const [signedInUser, setSignedInUser] = useState<User>()

	// Load user
	useEffect(() => {
		if (params.id == null) {
			return
		}
		UserService.getUser(+params.id)
			.then(res => setUser(res as User))
			.catch(err => {
				console.log(err)
			})
		const loggedInUser = AuthService.getAuth()
		if (loggedInUser != null) {
			setSignedInUser(loggedInUser)
		}
	}, [params])

	/**
	 * Sends a request to add this user to logged in user's friends.
	 */
	const addFriend = () => {
		if (signedInUser == null || signedInUser.id == null) {
			return
		}
		if (user == null || user.id == null) {
			return
		}
		UserService.addFriend(signedInUser.id, user.id)
			.then(res => console.log(res))
			.catch(err => console.error(err))
	}

	/**
	 * Redirect to home if this is the signed in user's page.
	 * @returns a JSX `<Navigate>` element.
	 */
	const redirectToHomeIfOwnPage = () => {
		if (user != null && signedInUser != null && user.id === signedInUser.id) {
			return <Navigate replace to='/home' />
		}
	}

	// The component
	return (
		<div className='pv-content'>
			{redirectToHomeIfOwnPage()}
			{user != null && (
				<>
					<div className='pv-top'>
						<p className='logo pv-name'>
							{`${user?.firstName} ${user?.lastName}`}
						</p>
						<p>
							says hello to you on <span className='logo'>coinmates</span>
						</p>
					</div>
					<div className='pv-bottom'>
						{signedInUser == null ? (
							<p>
								Sign in to add {user.firstName} as a friend and split bills with
								them.
							</p>
						) : (
							<>
								<p>
									Add {user.firstName} as a friend and split bills with them.
								</p>
								<button className='btn btn-primary pv-btn' onClick={addFriend}>
									Add to friends
								</button>
							</>
						)}
					</div>
				</>
			)}
			{user == null && <p>404</p>}
		</div>
	)
}

export default PersonView
