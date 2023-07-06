import {useEffect, useReducer, useState} from 'react'
import {UserShort} from '../../entities/UserShort'
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
import {useDebouncedCallback} from 'use-debounce'
import {AuthService} from '../../services/AuthService'

function SplitBill() {
	// ----- Properties ----------------------------------------------------------
	const [friends, setFriends] = useState(new Array<UserShort>())
	const [selectedFriends, setSelectedFriends] = useState(new Array<UserShort>())

	const [loadingErrorMessage, setLoadingErrorMessage] = useState<string>()
	const [validationErrors, setValidationErrors] =
		useState<BillValidationMessages>({})

	const [amountString, setAmountString] = useState<string>('')
	const [splitAmount, updateSplitAmount] = useReducer(
		(_: string, update: Amount | null) => {
			if (update == null) {
				return '...'
			}
			return `${update.integer},${String(update.fraction).padEnd(2, '0')}`
		},
		'0.00'
	)

	const [bill, updateBill] = useReducer((prev: Bill, next: Partial<Bill>) => {
		return {...prev, ...next}
	}, Bill.newEmpty(AuthService.getAuth()!.id!))

	// ----- Logic ---------------------------------------------------------------

	// Keep amount string and bill's amount properties in sync
	useEffect(() => updateBill(parseAmount(amountString)), [amountString])

	// Load correct split amount from the server
	const loadSplitAmountPreview = useDebouncedCallback(() => {
		BillService.splitAmount(bill.amount, bill.peopleIds.length + 1)
			.then(amount => updateSplitAmount(amount))
			.catch(err => console.log(err))
	}, 1000)

	// Update split amount when bill's amount changed
	useEffect(() => {
		updateSplitAmount(null)
		if (bill.peopleIds.length == 0) {
			updateSplitAmount(bill.amount)
			return
		} else if (bill.amount.integer === 0 && bill.amount.fraction === 0) {
			updateSplitAmount(new Amount(0, 0))
			return
		}
		loadSplitAmountPreview()
	}, [bill.amount, bill.peopleIds, loadSplitAmountPreview])

	// Load friends
	useEffect(() => {
		const loggedInUser = AuthService.getAuth()
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
	const addFriend = (friend: UserShort) => {
		if (selectedFriends.includes(friend)) {
			return
		}
		const newList = [...selectedFriends, friend]
		setSelectedFriends(newList)
		updateBill({peopleIds: newList.map(item => item.id)})
	}

	/**
	 * Removes a friend to the set of selected friends. Also updates the form's
	 * set of IDs.
	 * @param friend the friend to be removed.
	 */
	const removeFriend = (friend: UserShort) => {
		const newList = selectedFriends.filter(item => item.id !== friend.id)
		setSelectedFriends(newList)
		updateBill({peopleIds: newList.map(item => item.id)})
	}

	/**
	 * Submits the form contents to the server.
	 */
	const submit = () => {
		const validation = validate(bill)
		if (validation.dirty) {
			setValidationErrors(validation.errors)
		} else {
			BillService.createBill(bill).then(console.log).catch(console.error)
		}
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
						<div
							className='alert alert-danger mt-3 unpadded-alert'
							role='alert'
						>
							{loadingErrorMessage}
						</div>
					) : (
						<ul className='list-group sb-list'>{friendItems()}</ul>
					)}
				</div>
				<div className='sb-buttons-container'>
					<button
						type='button'
						className='btn btn-primary btn-whitetxt'
						onClick={submit}
					>
						Split Bill
					</button>
				</div>
			</div>
		</>
	)
}

export default SplitBill
