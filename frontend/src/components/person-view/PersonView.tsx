import {Navigate, useParams} from 'react-router-dom'
import './PersonView.scss'
import {UserService} from '../../services/UserService'
import {ReactElement, useEffect, useState} from 'react'
import {User} from '../../entities/User'

function PersonView() {
	const params = useParams()
	const [user, setUser] = useState<User>()

	// Load user
	useEffect(() => {
		if (params.id == null) {
			return
		}
		UserService.getUser(+params.id)
			.then(res => setUser(res as User))
			.catch(err => {
				console.log(err)
			})
	}, [params])

	return (
		<>
			{user != null && (
				<div>
					<p className='logo pv-name'>{`${user?.firstName} ${user?.lastName}`}</p>
					<p>says hello</p>
				</div>
			)}
			{user == null && <p>404</p>}
		</>
	)
}

export default PersonView
