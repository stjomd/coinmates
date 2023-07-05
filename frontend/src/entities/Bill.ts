import {Amount} from './Amount'

export class Bill {
	constructor(
		public title: string = '',
		public description: string = '',
		public amount: Amount = new Amount(0, 0),
		public people: number[] = []
	) {}
}
