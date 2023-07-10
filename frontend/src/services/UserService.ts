import {serverUri} from '../Globals.ts'
import {AddFriend} from '../entities/AddFriend.ts'
import {UserShort} from '../entities/UserShort.ts'
import {User} from '../entities/User.ts'
import {HttpService} from './HttpService.ts'

export abstract class UserService {
	private static readonly uri: string = serverUri + '/users'

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
