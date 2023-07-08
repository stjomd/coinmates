import {useParams} from 'react-router-dom'
import './BillView.scss'
import {useEffect, useState} from 'react'
import {Bill} from '../../entities/Bill'
import {BillService} from '../../services/BillService'

function BillView() {
	const {id: billId} = useParams()
	const [bill, setBill] = useState<Bill>()

	useEffect(() => {
		if (billId != null) {
			BillService.getBill(+billId)
				.then(setBill)
				.catch(() => window.location.replace('/error'))
		}
	}, [billId])

	const peopleItems = () => {
		if (bill == null) {
			return
		}
		const items: JSX.Element[] = []
		for (const person of bill.people) {
			items.push(
				<li key={person.id} className='list-group-item'>
					{person.firstName} {person.lastName}
				</li>
			)
		}
		return items
	}

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

	const badge = () => {
		console.log(bill)
		if (bill?.status === Bill.Status.OPEN) {
			return <span className='badge rounded-pill bg-secondary'>Open</span>
		} else if (bill?.status === Bill.Status.CLOSED) {
			return <span className='badge rounded-pill bg-primary'>Closed</span>
		}
	}

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
			<ul className='list-group mb-3'>
				<li
					key={bill?.creator.id}
					className='list-group-item list-group-item-primary'
				>
					You
				</li>
				{peopleItems()}
			</ul>
			{creationDateElement()}
		</>
	)
}

export default BillView
