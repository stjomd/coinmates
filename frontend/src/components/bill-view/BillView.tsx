import {useParams} from 'react-router-dom'
import './BillView.scss'
import {useEffect, useState} from 'react'
import {Bill} from '../../entities/Bill'
import {BillService} from '../../services/BillService'
import {AuthService} from '../../services/AuthService'
import {UserShort} from '../../entities/UserShort'
import {Payment} from '../../entities/Payment'

function BillView() {
	const user = AuthService.getAuth()
	const {id: billId} = useParams()
	const [bill, setBill] = useState<Bill>()

	const [isSubmitting, setIsSubmitting] = useState(false)
	const [didPay, setDidPay] = useState(false)

	// Load bill
	useEffect(() => {
		if (billId != null) {
			BillService.getBill(+billId)
				.then(res => {
					setBill(res)
					// Check if user has paid
					const paid =
						user?.id == null
							? false
							: res.payments.filter(p => p.id === user.id).length > 0
					setDidPay(paid)
				})
				.catch(() => window.location.replace('/error'))
		}
	}, [billId, user?.id])

	const pay = () => {
		setIsSubmitting(true)
		if (user == null || user.id == null || bill == null || bill.id == null) {
			return
		}
		const payment = new Payment(
			0,
			user.id,
			bill.id,
			bill.splitAmount,
			new Date().toISOString()
		)
		console.log(payment)
		BillService.submitPayment(payment)
			.then(() => {
				window.location.reload()
				setIsSubmitting(false)
			})
			.catch(err => {
				console.error(err)
				setIsSubmitting(false)
			})
	}

	/**
	 * Determines the class name of the list item corresponding to a person with
	 * the specified ID.
	 * @param personId the ID of the person of the list item.
	 * @param highlight indicates if the row should be highlighted in green.
	 * @returns the class name of the list item.
	 */
	const personClassName = (personId: number, highlight: boolean) => {
		if (bill == null) {
			return ''
		}
		let className = 'list-group-item '
		if (personId === user?.id) {
			className += 'bv-list-user '
		}
		if (highlight || personId === bill.creator.id) {
			className += 'list-group-item-primary '
		}
		return className
	}

	/**
	 * Constructs the element representing one single person entry.
	 * @param person the person.
	 * @param paid indicated if this person has paid.
	 * @param rightElement the element to insert on the right side of the entry.
	 * @returns
	 */
	const personItem = (
		person: UserShort,
		paid: boolean,
		rightElement?: JSX.Element
	) => {
		return (
			<li key={person.id} className={personClassName(person.id, paid)}>
				<div className='bv-person-box'>
					<span className='bv-person-user-name'>
						{person.firstName} {person.lastName}
					</span>
					{rightElement != null && rightElement}
				</div>
			</li>
		)
	}

	/**
	 * Constructs the entries for the people list.
	 * @returns an array of JSX elements, containing entries for the people list.
	 */
	const peopleItems = () => {
		if (bill == null || user == null) {
			return
		}
		const items: JSX.Element[] = []
		items.push(personItem(bill.creator, true, <span>Creator</span>))
		for (const person of bill.people) {
			const personPaid =
				bill.payments.filter(p => p.userId === person.id).length > 0
			let rightElement = <></>
			if (personPaid) {
				rightElement = <span>Paid</span>
			} else if (isSubmitting) {
				rightElement = <span>...</span>
			} else if (person.id === user.id) {
				rightElement = !didPay ? (
					<span className='bv-pay-link' onClick={pay}>
						Pay {bill.splitAmount.integer},
						{String(bill.splitAmount.fraction).padEnd(2, '0')} &euro;
					</span>
				) : (
					<span>Paid</span>
				)
			}
			items.push(personItem(person, personPaid, rightElement))
		}
		return items
	}

	/**
	 * Constructs a `<p>` element containing the creation date of the bill.
	 * @returns a `<p>` element with the creation date.
	 */
	const creationDateElement = () => {
		if (bill == null) {
			return
		}
		return (
			<p className='bv-small-txt'>
				Created on&nbsp;
				{new Date(bill.creationDate).toLocaleDateString('en-UK', {
					day: 'numeric',
					month: 'long',
					year: 'numeric',
					hour: 'numeric',
					minute: 'numeric',
				})}
			</p>
		)
	}

	/**
	 * Constructs a badge showing the bill's status.
	 * @returns a JSX element with the badge.
	 */
	const badge = () => {
		if (bill?.status === Bill.Status.OPEN) {
			return <span className='badge rounded-pill bg-secondary'>Open</span>
		} else if (bill?.status === Bill.Status.CLOSED) {
			return <span className='badge rounded-pill bg-primary'>Closed</span>
		}
	}

	// The component
	return (
		<>
			<h4>Bill</h4>
			<h3 className='bv-title'>
				{bill?.title} {badge()}
			</h3>
			{bill?.description != null ? (
				<p>{bill.description}</p>
			) : (
				<p>No description provided.</p>
			)}
			<div className='bv-amounts-box'>
				<div>
					<p className='bv-small-txt'>Total</p>
					<p className='logo bv-amount'>
						{bill?.amount.integer},{bill?.amount.fraction} &euro;
					</p>
				</div>
				<div>
					<p className='bv-small-txt'>Per person</p>
					<p className='logo bv-amount'>
						{bill?.splitAmount.integer},{bill?.splitAmount.fraction} &euro;
					</p>
				</div>
				<div>
					<p className='bv-small-txt'>Pending</p>
					<p className='logo bv-amount bv-amount-pending'>??,?? &euro;</p>
				</div>
			</div>
			<p className='bv-small-txt mb-1'>People assigned to this bill</p>
			<ul className='list-group mb-3'>{peopleItems()}</ul>
			{creationDateElement()}
		</>
	)
}

export default BillView
