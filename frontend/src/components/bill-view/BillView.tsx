import {useParams} from 'react-router-dom'
import './BillView.scss'
import {useEffect, useState} from 'react'
import {Bill} from '../../entities/Bill'
import {BillService} from '../../services/BillService'
import {AuthService} from '../../services/AuthService'

function BillView() {
	const user = AuthService.getAuth()
	const {id: billId} = useParams()
	const [bill, setBill] = useState<Bill>()

	// Load bill
	useEffect(() => {
		if (billId != null) {
			BillService.getBill(+billId)
				.then(setBill)
				.catch(() => window.location.replace('/error'))
		}
	}, [billId])

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
	 * Constructs the entries for the people list.
	 * @returns an array of JSX elements, containing entries for the people list.
	 */
	const peopleItems = () => {
		if (bill == null || user == null) {
			return
		}
		const items: JSX.Element[] = []
		items.push(
			<li
				key={bill.creator.id}
				className={personClassName(bill.creator.id, true)}
			>
				<div className='bv-person-box'>
					<span className='bv-person-user-name'>
						{bill.creator.firstName} {bill.creator.lastName}
					</span>
					<span>Receiver</span>
				</div>
			</li>
		)
		for (const person of bill.people) {
			const personPaid =
				bill.payments.filter(p => p.userId === person.id).length > 0
			items.push(
				<li key={person.id} className={personClassName(person.id, personPaid)}>
					<div className='bv-person-box'>
						<span>
							{person.firstName} {person.lastName}
						</span>
						{personPaid && <span>Paid</span>}
					</div>
				</li>
			)
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
