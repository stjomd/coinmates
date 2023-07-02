import {useEffect, useState} from 'react'
import {Friend} from '../../entities/Friend'
import {UserService} from '../../services/UserService'
import './SplitBill.scss'

function SplitBill() {
	const [friends, setFriends] = useState(new Set<Friend>())

	// Load users
	useEffect(() => {
		const loggedInUser = UserService.getAuth()
		if (loggedInUser == null || loggedInUser.id == null) {
			return
		}
		UserService.getFriends(loggedInUser.id)
			.then(res => {
				console.log(res)
				setFriends(res)
			})
			.catch(err => console.log(err))
	}, [])

	const friendSelections = () => {
		const elements: JSX.Element[] = []
		for (const friend of friends) {
			elements.push(
				<option key={friend.id}>
					{`${friend.firstName} ${friend.lastName}`}
				</option>
			)
		}
		return elements
	}

	return (
		<>
			<h4>Split Bills</h4>
			<p>
				Create a bill to split with your friends. Then they will be able to
				transfer money to you.
			</p>
			<div>
				{/* Title */}
				<div className='mb-3'>
					<label htmlFor='splitb-title' className='form-label'>
						Title
					</label>
					<input
						type='text'
						className='form-control'
						id='splitb-title'
						placeholder='Title'
					/>
				</div>
				{/* Description */}
				<div className='mb-3'>
					<label htmlFor='splitb-description' className='form-label'>
						Description
					</label>
					<textarea
						className='form-control'
						id='splitb-description'
						placeholder='Description'
					/>
				</div>
				{/* Amount */}
				<div className='mb-3'>
					<label htmlFor='splitb-amount' className='form-label'>
						Amount
					</label>
					<input
						type='text'
						className='form-control form-control-lg'
						id='splitb-amount'
						placeholder='0,00 &euro;'
					/>
				</div>
				{/* People */}
				<div className='mb-3'>
					<label htmlFor='splitb-people' className='form-label'>
						People
					</label>
					<select
						className='form-select'
						aria-label='Select people'
						defaultValue={-1}
					>
						<option key={-1}>Add friends...</option>
						{friendSelections()}
					</select>
				</div>
			</div>
		</>
	)
}

export default SplitBill
