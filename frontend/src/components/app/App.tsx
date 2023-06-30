import './App.scss'
import '../../styles/global.scss'

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Landing from '../landing/Landing'
import Login from '../login/Login'
import Register from '../register/Register'
import {UserService} from '../../services/UserService'
import Header from '../header/Header'

function App() {
	const loggedInUser = UserService.getAuth()
	console.log('logged user', loggedInUser)

	return (
		<Router>
			<div className='flexbox-container'>
				<Header />
				<Routes>
					{/* home page */}
					<Route
						path='/'
						element={
							<div className='centered gradient'>
								<Landing />
							</div>
						}
					/>
					{/* login form */}
					<Route
						path='/login'
						element={
							<div className='centered'>
								<Login />
							</div>
						}
					/>
					{/* register form */}
					<Route
						path='/register'
						element={
							<div className='centered'>
								<Register />
							</div>
						}
					/>
				</Routes>
				<footer id='footer'>2023 coinmates</footer>
			</div>
		</Router>
	)
}

export default App
