import {serverUri} from '../Globals'
import {Amount} from '../entities/Amount'
import {Bill} from '../entities/Bill'
import {HttpService} from './HttpService'

export abstract class BillService {
	private static readonly uri: string = serverUri + '/bills'

	/**
	 * Retrieves a preview of the split amount.
	 * @param amount the total amount.
	 * @param people the amount of people.
	 * @returns a promise containing the split amount.
	 */
	static async splitAmount(amount: Amount, people: number): Promise<Amount> {
		return HttpService.get(this.uri + '/split', {...amount, people: people})
	}

	static async getBill(id: number): Promise<Bill> {
		return HttpService.get(this.uri + `/${id}`)
	}

	static async createBill(bill: Bill): Promise<Bill> {
		return HttpService.post(this.uri, bill)
	}
}
