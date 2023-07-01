import {UserService} from '../../services/UserService'
import Payment from '../payment/Payment'
import './Home.scss'

function Home() {
	const user = UserService.getAuth()

	return (
		<div className='home-container'>
			<div className='home-info-group'>
				<p className='home-name'>Hi, {user?.firstName}!</p>
				{/* <p className='home-balance'>0,00 &euro;</p> */}
				<p id='home-bal-ok'>Everything's good, you do not owe anyone.</p>
			</div>
			<div className='home-history'>
				<p className='home-name'>History</p>
				<hr />
				<div className='home-payments'>
					<Payment />
				</div>
			</div>
		</div>
	)
}

export default Home
