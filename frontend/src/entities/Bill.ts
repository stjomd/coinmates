import {Amount} from './Amount'
import {Payment} from './Payment'
import {UserShort} from './UserShort'

export class Bill {
	constructor(
		public id: number | null,
		public title: string,
		public description: string | null,
		public amount: Amount,
		public splitAmount: Amount,
		public creator: UserShort,
		public people: UserShort[],
		public creationDate: string,
		public status: Bill.Status,
		public payments: Payment[]
	) {}

	public static newEmpty(creatorId: number): Bill {
		return new Bill(
			null,
			'',
			null,
			new Amount(0, 0),
			new Amount(0, 0),
			new UserShort(creatorId, '', ''),
			[],
			new Date().toISOString(),
			Bill.Status.OPEN,
			[]
		)
	}
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Bill {
	export enum Status {
		OPEN = 'OPEN',
		CLOSED = 'CLOSED',
	}
}
