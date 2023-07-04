import {useEffect, useReducer, useState} from 'react'
import {Friend} from '../../entities/Friend'
import {UserService} from '../../services/UserService'
import './SplitBill.scss'
import {Bill} from '../../entities/Bill'
import {
	BillValidationMessages,
	filterAmountField,
	parseAmount,
	validate,
} from './SplitBillLogic'
import {BillService} from '../../services/BillService'
import {Amount} from '../../entities/Amount'

function SplitBill() {
	// ----- Properties ----------------------------------------------------------
	const [friends, setFriends] = useState(new Array<Friend>())
	const [selectedFriends, setSelectedFriends] = useState(new Array<Friend>())

	const [loadingErrorMessage, setLoadingErrorMessage] = useState<string>()
	const [validationErrors, setValidationErrors] =
		useState<BillValidationMessages>({})

	const [amountString, setAmountString] = useState<string>('')
	const [splitAmount, setSplitAmount] = useState(0)

	const [bill, updateBill] = useReducer((prev: Bill, next: Partial<Bill>) => {
		return {...prev, ...next}
	}, new Bill())

	// ----- Logic ---------------------------------------------------------------

	// Keep amount string and bill's amount properties in sync
	useEffect(() => updateBill(parseAmount(amountString)), [amountString])

	// Keep amount and split amount in sync
	useEffect(() => {
		if (bill.people.length == 0) {
			setSplitAmount(bill.amountInteger + bill.amountFraction / 100)
			return
		} else if (bill.amountInteger === 0 && bill.amountFraction === 0) {
			setSplitAmount(0)
			return
		}
		BillService.splitAmount(
			new Amount(bill.amountInteger, bill.amountFraction),
			bill.people.length + 1
		)
			.then(res => setSplitAmount(res.integer + res.fraction / 100))
			.catch(err => console.log(err))
	}, [bill.amountInteger, bill.amountFraction, bill.people])

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

	// ----- Component Elements --------------------------------------------------

	/**
	 * Constructs the items containing selected friends.
	 * @returns an array of `<li>` items.
	 */
	const selectedFriendItems = () => {
		if (selectedFriends.length === 0) {
			return [
				<li key={-2} className='list-group-item disabled sb-list-item-centered'>
					No friends selected (choose from the list below)
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
					<div className='sb-list-item-contents'>
						<p>{`${friend.firstName} ${friend.lastName}`}</p>
						<span className='sb-split-amt'>{splitAmount} &euro;</span>
					</div>
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
					{`${friend.firstName} ${friend.lastName}`}
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

	/**
	 * Determines the class names for `<input>` elements. If validation failed
	 * for a property, appends a class name that displays fields as invalid.
	 * @param className the class name(s) that must always apply.
	 * @param property the property validated against.
	 * @returns a string of class names.
	 */
	const inputClassName = (
		className: string,
		property: keyof BillValidationMessages
	) => {
		if (validationErrors[property] != null) {
			return className + ' is-invalid'
		} else {
			return className
		}
	}

	// ----- Component -----------------------------------------------------------
	return (
		<>
			<h4>Split Bills</h4>
			<p>
				Create a bill to split with your friends. Then they will be able to
				transfer money to you.
			</p>
			<div className='sb-form'>
				{/* Title */}
				<div className='mb-3'>
					<label htmlFor='splitb-title' className='form-label'>
						Title
					</label>
					<input
						type='text'
						className={inputClassName('form-control', 'title')}
						id='splitb-title'
						placeholder='Title'
						onChange={event => updateBill({title: event.target.value})}
					/>
					<div className='invalid-feedback'>{validationErrors.title}</div>
				</div>
				{/* Description */}
				<div className='mb-3'>
					<label htmlFor='splitb-description' className='form-label'>
						Description
					</label>
					<textarea
						className={inputClassName('form-control', 'description')}
						id='splitb-description'
						placeholder='Description'
						onChange={event => updateBill({description: event.target.value})}
					/>
					<div className='invalid-feedback'>{validationErrors.description}</div>
				</div>
				{/* Amount */}
				<label htmlFor='splitb-amount' className='form-label'>
					Amount
				</label>
				<div className='input-group'>
					<span className='input-group-text'>&euro;</span>
					<input
						type='text'
						className={inputClassName('form-control form-control-lg', 'amount')}
						id='splitb-amount'
						placeholder='0,00'
						value={amountString}
						onChange={event => setAmountString(event.target.value)}
						onKeyDown={event => filterAmountField(amountString, event)}
					/>
				</div>
				<div className='sb-invalid'>{validationErrors.amount}</div>
				{/* People */}
				<div className='mb-3 mt-3'>
					<label htmlFor='splitb-people' className='form-label'>
						People
					</label>
					<ul className={inputClassName('list-group sb-list', 'people')}>
						<li className='list-group-item list-group-item-primary'>
							<div className='sb-list-item-contents'>
								<p>You</p>
								<span className='sb-split-amt'>{splitAmount} &euro;</span>
							</div>
						</li>
						{selectedFriendItems()}
					</ul>
					<div className='sb-invalid'>{validationErrors.people}</div>
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
						onClick={() => {
							setValidationErrors(validate(bill).errors)
						}}
					>
						Split Bill
					</button>
				</div>
			</div>
		</>
	)
}

export default SplitBill
