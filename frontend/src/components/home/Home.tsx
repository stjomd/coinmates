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
	const [errorMessage, setErrorMessage] = useState<string>()

	// Load user's bills
	useEffect(() => {
		if (user?.id != null) {
			BillService.getAllBills(user.id)
				.then(setBills)
				.catch(() =>
					setErrorMessage(
						'Sorry, an error occured while loading bills. Please refresh.'
					)
				)
		}
	}, [user?.id])

	/**
	 * Constructs bill cards.
	 * @returns an array of JSX elements containing bill cards.
	 */
	const billElements = () => {
		console.log(errorMessage)
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
				<p>
					Here's a list of recent bills you've created or been assigned to by
					your friends.
				</p>
			</div>
			<div className='home-history'>
				<div className='home-bills'>
					{errorMessage == null &&
						(bills.length > 0 ? (
							billElements()
						) : (
							<div className='home-no-bills'>
								You do not have any bills yet.
							</div>
						))}
					{errorMessage != null && (
						<div className='alert alert-danger unpadded-alert' role='alert'>
							{errorMessage}
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default Home
