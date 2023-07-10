import {serverUri} from '../Globals'
import {LoginDetails} from '../entities/LoginDetails'
import {User} from '../entities/User'
import {HttpService} from './HttpService'

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
