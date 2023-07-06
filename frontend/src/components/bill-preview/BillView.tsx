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
			<p>
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

	return (
		<>
			<h4>
				Bill <span className='badge rounded-pill bg-secondary'>Open</span>
			</h4>
			<h3 className='bv-title'>{bill?.title}</h3>
			{bill?.description != null ? (
				<p>{bill.description}</p>
			) : (
				<p>No description provided.</p>
			)}
			<p>
				Total: {bill?.amount.integer},{bill?.amount.fraction} &euro;
			</p>
			<ul className='list-group sb-list'>{peopleItems()}</ul>
			{creationDateElement()}
		</>
	)
}

export default BillView
