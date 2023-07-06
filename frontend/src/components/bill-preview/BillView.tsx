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
				<li className='list-group-item'>
					{person.firstName} {person.lastName}
				</li>
			)
		}
		return items
	}

	return (
		<>
			<h4>Bill</h4>
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
		</>
	)
}

export default BillView
