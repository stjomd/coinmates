import {Amount} from './Amount'

export class Bill {
	constructor(
		public id: number | null,
		public title: string,
		public description: string | null,
		public amount: Amount,
		public creatorId: number,
		public peopleIds: number[],
		public creationDate: Date
	) {}

	public static newEmpty(creatorId: number): Bill {
		return new Bill(null, '', null, new Amount(0, 0), creatorId, [], new Date())
	}
}
