import { User } from '../entities/User'

export abstract class AuthService {
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
