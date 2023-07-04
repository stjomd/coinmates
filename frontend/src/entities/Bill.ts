export class Bill {
	constructor(
		public title: string = '',
		public description: string = '',
		public amountInteger: number = 0,
		public amountFraction: number = 0,
		public people: number[] = []
	) {}
}
