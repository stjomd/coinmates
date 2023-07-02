import './App.scss'
import '../../styles/global.scss'

import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom'

import Landing from '../landing/Landing'
import Login from '../login/Login'
import Register from '../register/Register'
import Header from '../header/Header'
import {UserService} from '../../services/UserService'
import {ReactNode} from 'react'
import Home from '../home/Home'
import PersonView from '../person-view/PersonView'
import SplitBill from '../split-bill/SplitBill'

function App() {
	/**
	 * Determines if the component is shown to authenticated users. Use for login,
	 * registration, etc.
	 * @param url the URL to redirect the user to.
	 * @param element the element to render.
	 * @returns if the user is logged in, redirects to the specified URL.
	 * 					Otherwise renders the element.
	 */
	const renderIfNotLoggedIn = (url: string, element: ReactNode) => {
		if (UserService.getAuth() != null) {
			return <Navigate replace to={url} />
		} else {
			return element
		}
	}

	/**
	 * Determines if the component is shown to unauthenticated users.
	 * @param url the URL to redirect the user to.
	 * @param element the element to render.
	 * @returns if the user is NOT logged in, redirects to the specified URL.
	 * 					Otherwise renders the element.
	 */
	const renderIfLoggedIn = (url: string, element: ReactNode) => {
		if (UserService.getAuth() == null) {
			return <Navigate replace to={url} />
		} else {
			return element
		}
	}

	/**
	 * Constructs a header element. Determines if it is shown depending on the
	 * route.
	 * @returns the JSX element with the header.
	 */
	const header = () => {
		return (
			<Routes>
				{/* Do not show header on these routes */}
				<Route path='/' element={<></>} />
				<Route path='/login' element={<></>} />
				<Route path='/register' element={<></>} />
				{/* Show header on all other routes */}
				<Route path='*' element={<Header />} />
			</Routes>
		)
	}

	/**
	 * Constructs an element containing the contents of the page at specific
	 * routes. Uses <Routes> inside.
	 * @returns the JSX element with the contents.
	 */
	const content = () => {
		return (
			<Routes>
				{/* home page */}
				<Route
					path='/'
					element={renderIfNotLoggedIn(
						'/home',
						<div className='centered gradient'>
							<Landing />
						</div>
					)}
				/>
				{/* login form */}
				<Route
					path='/login'
					element={renderIfNotLoggedIn(
						'/home',
						<div className='centered'>
							<Login />
						</div>
					)}
				/>
				{/* register form */}
				<Route
					path='/register'
					element={renderIfNotLoggedIn(
						'/home',
						<div className='centered'>
							<Register />
						</div>
					)}
				/>
				{/* home dashboard */}
				<Route
					path='/home'
					element={renderIfLoggedIn(
						'/',
						<div className='horizcenter-top'>
							<Home />
						</div>
					)}
				/>
				{/* person view */}
				<Route
					path='/user/:id'
					element={
						<div className='centered'>
							<PersonView />
						</div>
					}
				/>
				{/* split bill */}
				<Route
					path='/bill'
					element={renderIfLoggedIn(
						'/',
						<div className='horizcenter-top'>
							<SplitBill />
						</div>
					)}
				/>
				{/* all other routes: 404 */}
				<Route path='*' element={<p>404</p>} />
			</Routes>
		)
	}

	/**
	 * Constructs a footer, displayed on every page.
	 * @returns the JSX element with the footer.
	 */
	const footer = () => {
		return <footer id='footer'>2023 coinmates</footer>
	}

	return (
		<Router>
			<div className='flexbox-container'>
				{header()}
				{content()}
				{footer()}
			</div>
		</Router>
	)
}

export default App
