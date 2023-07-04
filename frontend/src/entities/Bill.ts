// For usage with useReducer
export interface BillProperties {
	title?: string
	description?: string
	amountInteger?: number
	amountFraction?: number
	people?: number[]
}

export class Bill implements BillProperties {
	constructor(
		public title: string = '',
		public description: string = '',
		public amountInteger: number = 0,
		public amountFraction: number = 0,
		public people: number[] = []
	) {}
}
