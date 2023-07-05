import {AuthService} from '../../services/AuthService'
import Payment from '../payment/Payment'
import './Home.scss'

function Home() {
	const user = AuthService.getAuth()

	return (
		<>
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
		</>
	)
}

export default Home
