import { serverUri } from '../Globals.ts';
import { LoginDetails } from '../entities/LoginDetails.ts';

export class UserService {

  private static readonly uri: string = serverUri + '/user';

	static async authenticate(login: LoginDetails): Promise<number> {
		console.log('In authenticate')
		console.log(login)
		const response = await fetch(this.uri + '/auth', {
				method: "POST",
				body: JSON.stringify(login),
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				}
		})
		return await response.json();
	}

}
