import './FindFriends.scss'

import {useEffect, useState} from 'react'
import {UserService} from '../../services/UserService'
import {UserShort} from '../../entities/UserShort'
import {useDebouncedCallback} from 'use-debounce'

function FindFriendsView() {
	const [query, setQuery] = useState('')
	const [users, setUsers] = useState<UserShort[]>([])

	const [errorMessage, setErrorMessage] = useState<string>()

	const loadSearchResults = useDebouncedCallback((searchQuery: string) => {
		if (query.length > 0) {
			UserService.searchUsers(searchQuery)
				.then(response => setUsers(response))
				.catch(() =>
					setErrorMessage('Could not load results, please try again.')
				)
		}
	}, 1000)

	useEffect(() => {
		setErrorMessage(undefined)
		loadSearchResults(query)
	}, [loadSearchResults, query])

	const searchResultItems = () => {
		return users.map(user => (
			<li
				key={user.id}
				className='list-group-item'
				onClick={() => window.location.replace(`user/${user.id}`)}
			>
				{user.firstName} {user.lastName}
			</li>
		))
	}

	return (
		<>
			<h4>Find friends</h4>
			<p>
				Search by name or email to find friends you want to split bills with.
			</p>
			<div className='mb-3'>
				<input
					type='text'
					className='form-control'
					placeholder='Search...'
					value={query}
					onChange={event => setQuery(event.target.value)}
				/>
			</div>
			{errorMessage && (
				<div className='alert alert-danger unpadded-alert' role='alert'>
					{errorMessage}
				</div>
			)}
			{users.length > 0 ? (
				<ul className='list-group ff-results-list'>{searchResultItems()}</ul>
			) : (
				<div className='alert alert-secondary unpadded-alert' role='alert'>
					No users found. Try another query.
				</div>
			)}
		</>
	)
}

export default FindFriendsView
