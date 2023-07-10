package at.stjomd.coinmatesserver.repository.refresh;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

public class RefreshableImpl implements Refreshable {

	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public void refresh(Object entity) {
		entityManager.refresh(entity);
	}

}
