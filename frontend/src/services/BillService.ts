import {serverUri} from '../Globals'
import {Amount} from '../entities/Amount'
import {Bill} from '../entities/Bill'
import {Payment} from '../entities/Payment'
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

	/**
	 * Retrieves a bill by its ID.
	 * @param id the ID of the bill.
	 * @returns a promise containing the bill with the specified ID.
	 */
	static async getBill(id: number): Promise<Bill> {
		return HttpService.get(this.uri + `/${id}`)
	}

	/**
	 * Retrieves all bill for a specific user.
	 * @param userId the ID of the user.
	 * @returns a promise containing the bill with the specified ID.
	 */
	static async getAllBills(userId: number): Promise<Bill[]> {
		return HttpService.get(this.uri, {user: userId})
	}

	/**
	 * Creates a bill.
	 * @param id the bill entity.
	 * @returns a promise containing the created bill.
	 */
	static async createBill(bill: Bill): Promise<Bill> {
		return HttpService.post(this.uri, bill)
	}

	/**
	 * Creates a payment for a bill.
	 * @param payment the payment entity.
	 * @returns a promise containing the created payment.
	 */
	static async submitPayment(payment: Payment): Promise<Payment> {
		return HttpService.post(this.uri + `/${payment.billId}/payments`, payment)
	}
}
