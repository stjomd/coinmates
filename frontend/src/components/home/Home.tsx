import {useEffect, useState} from 'react'
import {AuthService} from '../../services/AuthService'
import BillCard from '../bill-card/BillCard'
import './Home.scss'
import {Bill} from '../../entities/Bill'
import {BillService} from '../../services/BillService'
import {Link} from 'react-router-dom'

function Home() {
	const user = AuthService.getAuth()
	const [bills, setBills] = useState<Bill[]>([])

	// Load user's bills
	useEffect(() => {
		if (user?.id != null) {
			BillService.getAllBills(user.id).then(setBills).catch(console.error)
		}
	}, [user?.id])

	/**
	 * Constructs bill cards.
	 * @returns an array of JSX elements containing bill cards.
	 */
	const billElements = () => {
		const elements: JSX.Element[] = []
		for (const bill of bills) {
			elements.push(
				<Link key={bill.id} className='home-bill-link' to={`/bill/${bill.id}`}>
					<BillCard bill={bill} />
				</Link>
			)
		}
		return elements
	}

	// The component
	return (
		<>
			<div className='home-info-group'>
				<p className='home-name'>Hi, {user?.firstName}!</p>
				<p id='home-bal-ok'>Everything's good, you do not owe anyone.</p>
			</div>
			<div className='home-history'>
				<div className='home-bills'>{billElements()}</div>
			</div>
		</>
	)
}

export default Home
