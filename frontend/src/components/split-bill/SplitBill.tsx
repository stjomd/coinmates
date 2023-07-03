import {useEffect, useReducer, useState} from 'react'
import {Friend} from '../../entities/Friend'
import {UserService} from '../../services/UserService'
import './SplitBill.scss'
import {Bill} from '../../entities/Bill'

function SplitBill() {
	const [friends, setFriends] = useState(new Set<Friend>())
	const [errorMessage, setErrorMessage] = useState<string>()

	// Load friends
	useEffect(() => {
		setErrorMessage(undefined)
		const loggedInUser = UserService.getAuth()
		if (loggedInUser == null || loggedInUser.id == null) {
			return
		}
		UserService.getFriends(loggedInUser.id)
			.then(res => setFriends(res))
			.catch(() => setErrorMessage('Sorry, but an error occurred.'))
	}, [])

	// Bill form
	const [form, dispatchForm] = useReducer((prev: Bill, next: any) => {
		const newBill: Bill = {...prev, ...next}
		if (newBill.title.length < 1) {
			// invalid
		}
		if (newBill.amountInteger < 0) {
			// invalid
		}
		if (newBill.amountFraction < 0 || newBill.amountFraction > 99) {
			// invalid
		}
		console.log(newBill)
		return newBill
	}, new Bill())

	/**
	 * Parses an input string for the amount and returns an object containing
	 * the integer and fraction part, to be used in the dispatch function.
	 * Allowed separators: comma `,` and period `.`.
	 * @param input the input string of the amount field.
	 * @returns an object with two keys, `amountInteger` and `amountFraction`, if
	 * 					parsing was successful, or an empty object otherwise.
	 */
	const parseAmount = (input: string) => {
		const separators = [',', '.']
		// Check if input string contains no separators (implicit integer)
		let isInteger = true
		for (const separator of separators) {
			if (input.includes(separator)) {
				isInteger = false
				break
			}
		}
		// If integer, return updater right away
		if (isInteger) {
			return {amountInteger: Number(input), amountFraction: 0}
		}
		// Otherwise split string (try all separators)
		for (const separator of separators) {
			const parts = input.split(separator)
			if (parts.length == 2) {
				const [integer, fraction] = [Number(parts[0]), Number(parts[1])]
				return !isNaN(integer) && !isNaN(fraction)
					? {amountInteger: integer, amountFraction: fraction}
					: {}
			}
		}
		return {}
	}

	/**
	 * Constructs an array of friends to use in a `<select>`.
	 * @returns an array of `<option>`s containing friends.
	 */
	const friendItems = () => {
		if (errorMessage != null) {
			return [
				<li
					key={-1}
					className='list-group-item list-group-item-danger sb-list-error'
				>
					{errorMessage}
				</li>,
			]
		}
		const elements: JSX.Element[] = []
		for (const friend of friends) {
			elements.push(
				<li key={friend.id} className='list-group-item'>
					{`${friend.firstName} ${friend.lastName}`}
				</li>
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
						onChange={event => dispatchForm({title: event.target.value})}
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
						onChange={event => dispatchForm({description: event.target.value})}
					/>
				</div>
				{/* Amount */}
				<label htmlFor='splitb-amount' className='form-label'>
					Amount
				</label>
				<div className='input-group mb-3'>
					<span className='input-group-text' id='basic-addon1'>
						&euro;
					</span>
					<input
						type='text'
						className='form-control form-control-lg'
						id='splitb-amount'
						placeholder='0,00'
						onChange={event => dispatchForm(parseAmount(event.target.value))}
					/>
				</div>
				{/* People */}
				<div className='mb-3'>
					<label htmlFor='splitb-people' className='form-label'>
						People
					</label>
					<ul className='list-group'>{friendItems()}</ul>
				</div>
			</div>
		</>
	)
}

export default SplitBill
