import {Navigate, useParams} from 'react-router-dom'
import './PersonView.scss'
import {UserService} from '../../services/UserService'
import {useEffect, useState} from 'react'
import {User} from '../../entities/User'
import {AuthService} from '../../services/AuthService'

function PersonView() {
	const params = useParams()
	const signedInUser = AuthService.getAuth()

	const [user, setUser] = useState<User>()
	const [friends, setFriends] = useState<User[]>()

	const [errorMessage, setErrorMessage] = useState<string>()

	// Load user
	useEffect(() => {
		if (params.id == null || signedInUser?.id == null) {
			return
		}
		UserService.getUser(+params.id)
			.then(res => setUser(res as User))
			.catch(() => window.location.replace('/error'))
		UserService.getFriends(signedInUser?.id)
			.then(setFriends)
			.catch(() => window.location.replace('/error'))
	}, [params, signedInUser?.id])

	/**
	 * Checks if signed in user is friends with the user whose page is shown.
	 * @returns a boolean indicating if signed in user is friends with this user.
	 */
	const isFriend = () => {
		if (friends == null || user == null) {
			return false
		}
		return friends.filter(f => f.id === user.id).length > 0
	}

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
			.then(() => window.location.reload())
			.catch(() => setErrorMessage('Could not add friend, please retry.'))
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
						) : !isFriend() ? (
							<>
								<p>
									Add {user.firstName} as a friend and split bills with them.
								</p>
								<button className='btn btn-primary pv-btn' onClick={addFriend}>
									Add to friends
								</button>
							</>
						) : (
							<p>You are friends with {user.firstName}!</p>
						)}
						{errorMessage != null && (
							<div
								className='alert alert-danger pv-alert unpadded-alert'
								role='alert'
							>
								{errorMessage}
							</div>
						)}
					</div>
				</>
			)}
		</div>
	)
}

export default PersonView
