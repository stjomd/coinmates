import {serverUri} from '../Globals.ts'
import {AddFriend} from '../entities/AddFriend.ts'
import {UserShort} from '../entities/UserShort.ts'
import {LoginDetails} from '../entities/LoginDetails.ts'
import {User} from '../entities/User.ts'
import {HttpService} from './HttpService.ts'

export abstract class UserService {
	private static readonly uri: string = serverUri + '/users'

	/**
	 * Sends a request to the server to authenticate the user. Does not store
	 * authentication details in local storage – this must be performed
	 * separately.
	 * @param login the login details.
	 * @returns a promise containing the logged in user.
	 */
	static async authenticate(login: LoginDetails): Promise<User> {
		return HttpService.post(this.uri + '/auth', login)
	}

	/**
	 * Sends a request to the server to register a new user.
	 * @param user the (partially filled) user object. Email, password, first
	 * 				name, and last name fields must be set.
	 * @returns a promise containing the registered user.
	 */
	static async register(user: User): Promise<User> {
		return HttpService.post(this.uri, user)
	}

	/**
	 * Retrieves a user by the ID.
	 * @param id the ID of the user.
	 * @returns a promise containing the user.
	 */
	static async getUser(id: number): Promise<User> {
		return HttpService.get(this.uri + `/${id}`)
	}

	/**
	 * Retrieves the set of the user's friends.
	 * @param id the ID of the user.
	 * @returns the set of friends.
	 */
	static async getFriends(id: number): Promise<UserShort[]> {
		return HttpService.get(this.uri + `/${id}/friends`)
	}

	/**
	 * Sends a request to the server to establish a friends relationship between
	 * two users.
	 * @param id the ID of the user making the request.
	 * @param friendId the ID of the new friend.
	 * @returns a promise containing the set of friends of the user making the
	 * 					request.
	 */
	static async addFriend(
		id: number,
		friendId: number
	): Promise<Set<UserShort>> {
		return HttpService.patch(this.uri + `/${id}`, new AddFriend(friendId))
	}
}
