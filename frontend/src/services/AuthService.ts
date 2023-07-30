import {serverUri} from '../Globals'
import {LoginDetails} from '../entities/LoginDetails'
import {User} from '../entities/User'
import {FetchError, HttpService} from './HttpService'

export abstract class AuthService {
	private static readonly uri: string = serverUri + '/auth'

	/**
	 * Sends a request for authentication.
	 * @param details login details.
	 * @returns a promise with the logged in user.
	 */
	static async login(details: LoginDetails): Promise<User> {
		return HttpService.post(this.uri + '/login', details)
	}

	/**
	 * Sends a request for registration.
	 * @param user the user entity with sign up info.
	 * @returns a promise with the registered user.
	 */
	static async register(user: Partial<User>): Promise<User> {
		return HttpService.post(this.uri + '/register', user)
	}

	/**
	 * Sends a request for logout, and if successful, removes data from local
	 * storage.
	 */
	static async logout() {
		// Use fetch here because this request returns no body (and HttpService
		// expects one)
		const response = await fetch(this.uri + '/logout', {
			method: 'POST',
			credentials: 'include',
		})
		if (response.ok) {
			this.deleteAuth()
		} else {
			throw (await response.json()) as FetchError
		}
	}

	/**
	 * Saves authentication details into local storage, and reloads the page or
	 * redirect the user to a specified URL.
	 * @param user the user entity.
	 * @param url the URL to redirect to. If null, page is reloaded.
	 */
	static storeAuth(user: User, url?: string) {
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
	 */
	static getAuth(): User | null {
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
	 */
	static deleteAuth() {
		localStorage.removeItem('user')
		window.location.replace('/')
	}
}
