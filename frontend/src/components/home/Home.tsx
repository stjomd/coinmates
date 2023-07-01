import {UserService} from '../../services/UserService'
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
				<div>
					<p>1 JUL You received 10,00 &euro; from Lucille (for the banana)</p>
				</div>
			</div>
		</div>
	)
}

export default Home
