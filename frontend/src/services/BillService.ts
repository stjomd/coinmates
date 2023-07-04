import {serverUri} from '../Globals'
import {Amount} from '../entities/Amount'
import {FetchError} from './FetchError'

export class BillService {
	private static readonly uri: string = serverUri + '/bills'

	static async splitAmount(amount: Amount, people: number): Promise<Amount> {
		const response = await fetch(
			this.uri +
				`/split?integer=${amount.integer}` +
				`&fraction=${amount.fraction}&people=${people}`,
			{
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
			}
		)
		if (response.ok) {
			return response.json()
		} else {
			throw FetchError.fromResponseBody(await response.json())
		}
	}
}
