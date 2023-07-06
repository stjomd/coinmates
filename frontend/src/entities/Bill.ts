import {Amount} from './Amount'
import {UserShort} from './UserShort'

export class Bill {
	constructor(
		public id: number | null,
		public title: string,
		public description: string | null,
		public amount: Amount,
		public creator: UserShort,
		public people: UserShort[],
		public creationDate: Date
	) {}

	public static newEmpty(creatorId: number): Bill {
		return new Bill(
			null,
			'',
			null,
			new Amount(0, 0),
			new UserShort(creatorId, '', ''),
			[],
			new Date()
		)
	}
}
