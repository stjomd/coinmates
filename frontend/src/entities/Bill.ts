import {Amount} from './Amount'
import {Friend} from './Friend'

export class Bill {
	constructor(
		public id: number | null,
		public title: string,
		public description: string | null,
		public amount: Amount,
		public creator: Friend,
		public people: Friend[],
		public creationDate: Date
	) {}

	public static newEmpty(creatorId: number): Bill {
		return new Bill(
			null,
			'',
			null,
			new Amount(0, 0),
			new Friend(creatorId, '', ''),
			[],
			new Date()
		)
	}
}
