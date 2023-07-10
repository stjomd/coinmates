package at.stjomd.coinmatesserver.repository.refresh;

/**
 * Provides a refresh method to update nested objects of an entity.
 */
public interface Refreshable {

	/**
	 * See {@link jakarta.persistence.EntityManager#refresh(Object)}.
	 * @param entity the entity to refresh.
	 */
	void refresh(Object entity);

}
