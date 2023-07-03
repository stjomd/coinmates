import {serverUri} from '../Globals.ts'
import {AddFriend} from '../entities/AddFriend.ts'
import {Friend} from '../entities/Friend.ts'
import {LoginDetails} from '../entities/LoginDetails.ts'
import {User} from '../entities/User.ts'
import {FetchError} from './FetchError.ts'

export class UserService {
	private static readonly uri: string = serverUri + '/users'

	/**
	 * Sends a request to the server to authenticate the user. Does not store
	 * authentication details in local storage – this must be performed
	 * separately.
	 * @param login the login details.
	 * @returns a promise containing the logged in user.
	 */
	static async authenticate(login: LoginDetails): Promise<User> {
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

	/**
	 * Sends a request to the server to register a new user.
	 * @param user the (partially filled) user object. Email, password, first
	 * 				name, and last name fields must be set.
	 * @returns a promise containing the registered user.
	 */
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

	/**
	 * Retrieves a user by the ID.
	 * @param id the ID of the user.
	 * @returns a promise containing the user.
	 */
	static async getUser(id: number): Promise<User> {
		const response = await fetch(this.uri + `/${id}`, {
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

	/**
	 * Retrieves the set of the user's friends.
	 * @param id the ID of the user.
	 * @returns the set of friends.
	 */
	static async getFriends(id: number): Promise<Friend[]> {
		const response = await fetch(this.uri + `/${id}/friends`, {
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

	/**
	 * Sends a request to the server to establish a friends relationship between
	 * two users.
	 * @param id the ID of the user making the request.
	 * @param friendId the ID of the new friend.
	 * @returns a promise containing the set of friends of the user making the
	 * 					request.
	 */
	static async addFriend(id: number, friendId: number): Promise<Set<Friend>> {
		const body = new AddFriend(friendId)
		const response = await fetch(this.uri + `/${id}`, {
			method: 'PATCH',
			body: JSON.stringify(body),
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

	/**
	 * Saves authentication details into local storage, and reloads the page or
	 * redirect the user to a specified URL.
	 * @param user the user entity.
	 * @param url the URL to redirect to. If null, page is reloaded.
	 * @todo Make secure!
	 */
	static storeAuth(user: User, url?: string) {
		// TODO: make secure / store token
		localStorage.setItem('user', JSON.stringify(user))
		if (url == null) {
			window.location.reload()
		} else {
			window.location.replace(url)
		}
	}

	/**
	 * Retrieves authentication details from local storage.
	 * @returns the authentication details, or null if unauthenticated.
	 * @todo Make secure!
	 */
	static getAuth(): User | null {
		// TODO: make secure / store token
		const contents = localStorage.getItem('user')
		if (contents != null) {
			return JSON.parse(contents) as User
		} else {
			return null
		}
	}

	/**
	 * Removes authentication details from local storage, and redirect the user to
	 * the landing page.
	 * @todo Make secure!
	 */
	static deleteAuth() {
		localStorage.removeItem('user')
		window.location.replace('/')
	}
}
