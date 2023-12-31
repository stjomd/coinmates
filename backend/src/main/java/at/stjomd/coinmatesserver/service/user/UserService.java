package at.stjomd.coinmatesserver.service.user;

import java.util.Collection;
import java.util.Set;

import at.stjomd.coinmatesserver.entity.User;
import at.stjomd.coinmatesserver.exception.AccessForbiddenException;
import at.stjomd.coinmatesserver.exception.NotFoundException;

/**
 * A service responsible for all user actions, including authentication.
 */
public interface UserService {

	/**
	 * Retrieves the user with the specified ID.
	 * @param id the ID of the user.
	 * @return the user with the specified ID.
	 * @throws NotFoundException if no user with such ID exists.
	 */
	User getUser(Integer id) throws NotFoundException;

	/**
	 * Retrieves users whose IDs are contained in a collection.
	 * @param ids the ID of the user.
	 * @return the set of users whose IDs are contained in the collection ids.
	 */
	Set<User> getUsers(Collection<Integer> ids);

	/**
	 * Retrieves the user with the specified email.
	 * @param email the email of a user.
	 * @return the user with the specified email.
	 * @throws NotFoundException of no user with such email exists.
	 */
	User getUser(String email) throws NotFoundException;

	/**
	 * Retrieves the set of a user's friends.
	 * @param id the ID of the user.
	 * @param authenticatedUser the user currently authenticated.
	 * @return the set of the user's friends.
	 * @throws AccessForbiddenException if attempting to retrieve friends of
	 * 		   anyone else but the logged in user.
	 * @throws NotFoundException if the user with such ID does not exist.
	 */
	Set<User> getFriends(Integer id, User authenticatedUser)
	throws AccessForbiddenException, NotFoundException;

	/**
	 * Adds a friend relationship between two users.
	 * @param id the ID of the user making the request.
	 * @param friendId the ID of the other user.
	 * @param authenticatedUser the user currently authenticated.
	 * @return the updated set of friends of the user making the request.
	 * @throws AccessForbiddenException if attempting to add a friend to anyone
	 * 		   else but the logged in user.
	 * @throws NotFoundException if any of the two users could not be found.
	 */
	Set<User> addFriend(Integer id, Integer friendId, User authenticatedUser)
	throws AccessForbiddenException, NotFoundException;

	/**
	 * Resolves a search query and returns the results. The query is matched
	 * against first name, last name, or email. Case is ignored. The amount of
	 * results is limited to 10.
	 * @param query the search query.
	 * @return the set of users that match the query.
	 */
	Set<User> searchUsers(String query);

}
