export class Amount {
	constructor(public integer: number, public fraction: number) {}

	public toString() {
		return String(this.integer) + ',' + String(this.fraction).padEnd(2, '0')
	}
}
