import './FindFriends.scss'

import {useEffect, useState} from 'react'
import {UserService} from '../../services/UserService'
import {UserShort} from '../../entities/UserShort'
import {useDebouncedCallback} from 'use-debounce'

function FindFriendsView() {
	const [query, setQuery] = useState('')
	const [users, setUsers] = useState<UserShort[]>([])

	const loadSearchResults = useDebouncedCallback((searchQuery: string) => {
		UserService.searchUsers(searchQuery).then(response => {
			setUsers(response)
		})
	}, 1000)

	useEffect(() => {
		loadSearchResults(query)
	}, [loadSearchResults, query])

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
			<ul className='list-group ff-results-list'>
				{users.map(user => (
					<li
						key={user.id}
						className='list-group-item'
						onClick={() => window.location.replace(`user/${user.id}`)}
					>
						{user.firstName} {user.lastName}
					</li>
				))}
			</ul>
		</>
	)
}

export default FindFriendsView
