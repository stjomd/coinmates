import {serverUri} from '../Globals.ts'
import {LoginDetails} from '../entities/LoginDetails.ts'
import {User} from '../entities/User.ts'
import {FetchError} from './FetchError.ts'

export class UserService {
	private static readonly uri: string = serverUri + '/user'

	static async authenticate(login: LoginDetails): Promise<number> {
		const response = await fetch(this.uri + '/auth', {
			method: 'POST',
			body: JSON.stringify(login),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
		})
		if (response.ok) {
			return response.json()
		} else {
			throw FetchError.fromResponseBody(await response.json())
		}
	}

	static async register(user: User): Promise<User> {
		const response = await fetch(this.uri, {
			method: 'POST',
			body: JSON.stringify(user),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
		})
		if (response.ok) {
			return response.json()
		} else {
			throw FetchError.fromResponseBody(await response.json())
		}
	}

	static storeAuth(user: User) {
		// TODO: make secure / store token
		localStorage.setItem('user', JSON.stringify(user))
	}

	static getAuth(): User | null {
		// TODO: make secure / store token
		const contents = localStorage.getItem('user')
		if (contents != null) {
			return JSON.parse(contents) as User
		} else {
			return null
		}
	}
}
