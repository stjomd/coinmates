import { serverUri } from '../Globals.ts';
import { LoginDetails } from '../entities/LoginDetails.ts';
import { FetchError } from './FetchError.ts';

export class UserService {

  private static readonly uri: string = serverUri + '/user';

	static async authenticate(login: LoginDetails): Promise<number> {
		const response = await fetch(this.uri + '/auth', {
			method: "POST",
			body: JSON.stringify(login),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
		if (response.ok) {
			return await response.json();
		} else {
			throw new FetchError(response.status, await response.text());
		}
	}

}
