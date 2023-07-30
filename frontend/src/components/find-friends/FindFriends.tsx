import {useEffect, useState} from 'react'
import './FindFriends.scss'
import {UserService} from '../../services/UserService'
import {UserShort} from '../../entities/UserShort'

function FindFriendsView() {
	const [query, setQuery] = useState('')
	const [users, setUsers] = useState<UserShort[]>([])

	useEffect(() => {
		UserService.searchUsers(query).then(response => {
			console.log(response)
			setUsers(response)
		})
	}, [query])

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
			{users.map(user => (
				<p>
					{user.firstName} {user.lastName}
				</p>
			))}
		</>
	)
}

export default FindFriendsView
