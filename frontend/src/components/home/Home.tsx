import {AuthService} from '../../services/AuthService'
import BillCard from '../bill-card/BillCard'
import BillView from '../bill-view/BillView'
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
					<BillCard />
				</div>
			</div>
		</>
	)
}

export default Home
