import {useEffect, useReducer, useState} from 'react'
import {Friend} from '../../entities/Friend'
import {UserService} from '../../services/UserService'
import './SplitBill.scss'
import {Bill} from '../../entities/Bill'

function SplitBill() {
	// ----- Properties ----------------------------------------------------------
	const [friends, setFriends] = useState(new Array<Friend>())
	const [selectedFriends, setSelectedFriends] = useState(new Array<Friend>())

	const [validationErrorMessage, setValidationErrorMessage] = useState<string>()
	const [loadingErrorMessage, setLoadingErrorMessage] = useState<string>()

	const [validationErrors, setValidationErrors] = useState<any>()

	// ----- Form & Validation ---------------------------------------------------

	/**
	 * Validates the form input.
	 * @param newBill the bill to be validated.
	 * @returns an object containing two fields: `dirty` is a boolean indicating
	 * 					if at least one input is invalid, and `errors` is an object
	 * 					containing error messages for the respective input fields.
	 */
	const validate = () => {
		const result: {dirty: boolean; errors: any} = {
			dirty: false,
			errors: {},
		}
		if (bill.title.length < 1) {
			result.errors.title = 'Please enter a title.'
			result.dirty = true
		}
		if (bill.description.length > 1000) {
			result.errors.description =
				'Description is too long (exceeds 1000 characters)'
			result.dirty = true
		}
		if (bill.amountFraction < 0 || bill.amountFraction > 99) {
			result.errors.amount = 'Please enter a valid amount of cents (0 to 99)'
			result.dirty = true
		}
		if (bill.amountInteger < 0) {
			result.errors.amount = 'Please enter a positive amount.'
			result.dirty = true
		}
		if (bill.amountInteger === 0 && bill.amountFraction === 0) {
			result.errors.amount = 'Please enter the amount.'
			result.dirty = true
		}
		if (bill.people.length === 0) {
			result.errors.people = 'Please select at least one friend.'
			result.dirty = true
		}
		setValidationErrors(result.errors)
		// return result
	}

	const [bill, updateBill] = useReducer((prev: Bill, next: any) => {
		return {...prev, ...next}
	}, new Bill())

	// ----- Logic ---------------------------------------------------------------

	// Load friends
	useEffect(() => {
		const loggedInUser = UserService.getAuth()
		if (loggedInUser == null || loggedInUser.id == null) {
			return
		}
		UserService.getFriends(loggedInUser.id)
			.then(res => setFriends(res))
			.catch(() => setLoadingErrorMessage('Sorry, but an error occurred.'))
	}, [])

	/**
	 * Adds a friend to the set of selected friends. Also updates the form's set
	 * of IDs.
	 * @param friend the selected friend.
	 */
	const addFriend = (friend: Friend) => {
		if (selectedFriends.includes(friend)) {
			return
		}
		const newList = [...selectedFriends, friend]
		setSelectedFriends(newList)
		updateBill({people: newList.map(item => item.id)})
	}

	/**
	 * Removes a friend to the set of selected friends. Also updates the form's
	 * set of IDs.
	 * @param friend the friend to be removed.
	 */
	const removeFriend = (friend: Friend) => {
		const newList = selectedFriends.filter(item => item.id !== friend.id)
		setSelectedFriends(newList)
		updateBill({people: newList.map(item => item.id)})
	}

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

	// ----- Component Elements --------------------------------------------------

	/**
	 * Constructs the items containing selected friends.
	 * @returns an array of `<li>` items.
	 */
	const selectedFriendItems = () => {
		if (selectedFriends.length === 0) {
			return [
				<li key={-2} className='list-group-item disabled sb-list-item-centered'>
					None selected (choose from the list below)
				</li>,
			]
		}
		const elements: JSX.Element[] = []
		for (const friend of selectedFriends) {
			elements.push(
				<li
					key={friend.id}
					className='list-group-item list-group-item-primary sb-list-item-selected'
					onClick={() => removeFriend(friend)}
				>
					<p>{`${friend.firstName} ${friend.lastName}`}</p>
				</li>
			)
		}
		return elements
	}

	/**
	 * Constructs the items containing UNselected friends.
	 * @returns an array of `<li>` items.
	 */
	const friendItems = () => {
		const elements: JSX.Element[] = []
		const unselectedFriends = friends.filter(
			item => !selectedFriends.includes(item)
		)
		for (const friend of unselectedFriends) {
			elements.push(
				<li
					key={friend.id}
					className='list-group-item sb-list-item-unselected'
					onClick={() => addFriend(friend)}
				>
					<p>{`${friend.firstName} ${friend.lastName}`}</p>
				</li>
			)
		}
		return elements
	}

	/**
	 * Constructs an alert with an error message.
	 * @param message the error message to be displayed.
	 * @returns a JSX element containing the alert.
	 */
	const errorAlert = (message: string) => {
		return (
			<div className='alert alert-danger unpadded-alert' role='alert'>
				{message}
			</div>
		)
	}

	// ----- Component -----------------------------------------------------------
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
						onChange={event => updateBill({title: event.target.value})}
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
						onChange={event => updateBill({description: event.target.value})}
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
						onChange={event => updateBill(parseAmount(event.target.value))}
					/>
				</div>
				{/* People */}
				<div className='mb-3'>
					<label htmlFor='splitb-people' className='form-label'>
						People
					</label>
					<ul className='list-group sb-list'>{selectedFriendItems()}</ul>
					{loadingErrorMessage != null ? (
						errorAlert(loadingErrorMessage)
					) : (
						<ul className='list-group sb-list'>{friendItems()}</ul>
					)}
				</div>
				<div className='sb-buttons-container'>
					<button
						type='button'
						className='btn btn-primary btn-whitetxt'
						onClick={validate}
					>
						Split Bill
					</button>
				</div>
			</div>
		</>
	)
}

export default SplitBill
