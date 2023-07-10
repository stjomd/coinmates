import {Amount} from './Amount'

export class Payment {
	public constructor(
		public id: number,
		public userId: number,
		public billId: number,
		public amount: Amount,
		public date: string
	) {}
}
