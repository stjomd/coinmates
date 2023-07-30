import './FindFriends.scss'

function FindFriendsView() {
	return (
		<>
			<h4>Find friends</h4>
			<p>
				Search by name or email to find friends you want to split bills with.
			</p>
			<div className='mb-3'>
				<input type='text' className='form-control' placeholder='Search...' />
			</div>
		</>
	)
}

export default FindFriendsView
