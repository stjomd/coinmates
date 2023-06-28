import './Landing.scss'
import image from '../../assets/friends.svg'
import {Link} from 'react-router-dom'

function Landing() {
	return (
		<div className='flex-container'>
			<div className='left-part'>
				<h1 id='title'>coinmates</h1>
				<div className='description'>
					<p>
						track and split expenses with your friends and family. create an
						account for free to receive and send payments today.
					</p>
				</div>
				<div className='buttons'>
					<Link to='/login'>
						<button type='button' className='btn btn-primary'>
							Log in
						</button>
					</Link>
					<Link to='/register'>
						<button type='button' className='btn btn-primary'>
							Sign up
						</button>
					</Link>
				</div>
			</div>
			<img src={image} id='image' />
		</div>
	)
}

export default Landing
